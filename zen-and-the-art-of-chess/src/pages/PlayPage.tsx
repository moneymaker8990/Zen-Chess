import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { EvaluationBar } from '@/components/EvaluationBar';
import { TiltTracker } from '@/components/TiltTracker';
import { TiltIntervention } from '@/components/TiltIntervention';
import { useProgressStore } from '@/state/useStore';
import { useTiltDetection } from '@/hooks/useTiltDetection';
import { useCoachStore } from '@/state/coachStore';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { createSimpleGameMetrics } from '@/lib/coachTypes';
import { stockfish } from '@/engine/stockfish';
import { useAgentTrigger } from '@/lib/agents/agentOrchestrator';
import { AgentWatching, ContextualAgentTip } from '@/components/AgentPresence';
import { ChessSounds, playSmartMoveSound } from '@/lib/soundSystem';
import { parseUciMove } from '@/lib/moveValidation';
import type { GameMode, EngineEvaluation } from '@/lib/types';
import type { Square } from 'chess.js';

// Blunder threshold in centipawns (e.g., losing 150+ cp is a blunder)
const BLUNDER_THRESHOLD = 150;

export function PlayPage() {
  const navigate = useNavigate();
  const boardSize = useBoardSize(480, 32);
  const [engineReady, setEngineReady] = useState(false);
  const [engineLoading, setEngineLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState<GameMode>('FREE_PLAY');
  const [customFen, setCustomFen] = useState('');
  const [game, setGame] = useState(new Chess());
  const [evaluation, setEvaluation] = useState<EngineEvaluation | null>(null);
  const [prevEvaluation, setPrevEvaluation] = useState<number | null>(null);
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isThinking, setIsThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [showIntervention, setShowIntervention] = useState(false);
  
  const engineInitialized = useRef(false);
  const moveStartTime = useRef<number>(Date.now());
  const gameStartTime = useRef<number>(Date.now());
  const moveTimes = useRef<number[]>([]);
  const blunderCount = useRef<number>(0);
  const mistakeCount = useRef<number>(0);
  const { progress } = useProgressStore();
  const { recordEvent, recordGame } = useCoachStore();
  const boardStyles = useBoardStyles();
  const triggerAgent = useAgentTrigger();

  // Tilt detection system (gentle awareness)
  const {
    tiltState,
    enabled: awarenessEnabled,
    toggleEnabled: toggleAwareness,
    recordMove,
    recordImpulseClick,
    reportTilt,
    completeIntervention,
    resetSession,
  } = useTiltDetection();

  // Show intervention when required
  useEffect(() => {
    if (tiltState.interventionRequired && tiltState.interventionType !== 'NONE') {
      setShowIntervention(true);
      // Fire agent trigger for tilt
      triggerAgent({ type: 'TILT_DETECTED', severity: tiltState.score });
    }
  }, [tiltState.interventionRequired, tiltState.interventionType, tiltState.score, triggerAgent]);

  // Initialize engine
  useEffect(() => {
    if (engineInitialized.current) return;
    engineInitialized.current = true;

    const initEngine = async () => {
      setEngineLoading(true);
      try {
        const ready = await stockfish.init();
        setEngineReady(ready);
        if (ready) {
          stockfish.setStrength(progress.settings.engineStrength);
          console.log('Engine initialized successfully');
        } else {
          console.error('Engine failed to initialize');
        }
      } catch (error) {
        console.error('Failed to initialize engine:', error);
      } finally {
        setEngineLoading(false);
      }
    };
    initEngine();

    return () => {
      stockfish.stop();
    };
  }, [progress.settings.engineStrength]);

  // Auto-analyze when in analysis mode
  useEffect(() => {
    if (selectedMode === 'ANALYSIS' && engineReady) {
      stockfish.analyzePosition(game.fen(), (eval_) => {
        setEvaluation(eval_);
      });
    }
  }, [game.fen(), selectedMode, engineReady]);

  // Track move timing when a piece is selected
  useEffect(() => {
    if (moveFrom) {
      moveStartTime.current = Date.now();
    }
  }, [moveFrom]);

  // Check for blunders when evaluation changes
  useEffect(() => {
    if (evaluation && prevEvaluation !== null) {
      const playerColor = orientation === 'white' ? 1 : -1;
      const evalChange = (evaluation.score - prevEvaluation) * playerColor;
      
      // Significant drop in evaluation for the player = blunder
      if (evalChange < -BLUNDER_THRESHOLD && moveHistory.length > 0) {
        const moveTime = Date.now() - moveStartTime.current;
        recordMove(moveTime, true); // Record as blunder
        blunderCount.current += 1;
      } else if (evalChange < -50 && moveHistory.length > 0) {
        // Track mistakes (less severe than blunders)
        mistakeCount.current += 1;
      }
    }
    setPrevEvaluation(evaluation?.score ?? null);
  }, [evaluation, prevEvaluation, orientation, moveHistory.length, recordMove]);

  // Detect game end and record to coach
  useEffect(() => {
    if (selectedMode !== 'VS_ENGINE') return;
    
    if (game.isGameOver()) {
      const duration = Date.now() - gameStartTime.current;
      const playerColor = orientation === 'white' ? 'w' : 'b';
      
      let result: 'win' | 'loss' | 'draw' = 'draw';
      if (game.isCheckmate()) {
        // If it's checkmate and it's the player's turn, they lost
        result = game.turn() === playerColor ? 'loss' : 'win';
      }
      
      // Calculate accuracy (simplified - based on blunders/mistakes per move)
      const totalMoves = Math.floor(moveHistory.length / 2); // Player's moves
      const accuracy = totalMoves > 0 
        ? Math.max(0, 100 - (blunderCount.current * 15) - (mistakeCount.current * 5))
        : 0;
      
      // Calculate average move time
      const avgMoveTime = moveTimes.current.length > 0
        ? moveTimes.current.reduce((a, b) => a + b, 0) / moveTimes.current.length
        : 0;
      
      // Record the game with full metrics
      const metrics = createSimpleGameMetrics({
        result,
        duration,
        moveCount: moveHistory.length,
        accuracy,
        blunders: blunderCount.current,
        mistakes: mistakeCount.current,
        averageMoveTime: avgMoveTime,
        timeScramble: false, // No time control in this mode
        openingName: 'Unknown',
        wasResigned: false,
        wasFlagged: false,
      });
      
      recordGame(metrics);
      recordEvent('GAME_END', { result, mode: 'vs_engine' });
      
      // Fire agent triggers for game result
      triggerAgent({ type: 'GAME_END', result, accuracy });
      
      // Check for losing streak
      const recentGames = JSON.parse(localStorage.getItem('zen-chess-coach') || '{}')?.state?.state?.recentGames || [];
      const consecutiveLosses = recentGames.filter((g: any, i: number) => {
        if (i >= 3) return false;
        return g.result === 'LOSS';
      }).length;
      
      if (result === 'loss' && consecutiveLosses >= 2) {
        triggerAgent({ type: 'LOSING_STREAK', count: consecutiveLosses + 1 });
      }
      if (result === 'win') {
        const consecutiveWins = recentGames.filter((g: any, i: number) => {
          if (i >= 5) return false;
          return g.result === 'WIN';
        }).length;
        if (consecutiveWins >= 2) {
          triggerAgent({ type: 'WINNING_STREAK', count: consecutiveWins + 1 });
        }
      }
      
      // Check for low accuracy
      if (accuracy < 50) {
        triggerAgent({ type: 'ACCURACY_LOW', accuracy });
      } else if (accuracy > 85) {
        triggerAgent({ type: 'ACCURACY_HIGH', accuracy });
      }
    }
  }, [game, selectedMode, orientation, moveHistory.length, recordGame, recordEvent, triggerAgent]);

  // Get possible moves for a square
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      // Better visual feedback - captures are more visible
      newSquares[move.to] = {
        backgroundColor: game.get(move.to) 
          ? 'rgba(168, 85, 247, 0.6)' // Capture - more visible
          : 'rgba(168, 85, 247, 0.35)', // Regular move - subtle
      };
    });
    // Highlight the selected piece more prominently
    newSquares[square] = { backgroundColor: 'rgba(168, 85, 247, 0.5)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle square click (chess.com style - improved)
  const onSquareClick = useCallback((square: Square) => {
    if (isThinking) {
      recordImpulseClick(); // Track impulse click while engine is thinking
      return;
    }
    
    // In vs engine mode, only allow moves when it's the player's turn
    if (selectedMode === 'VS_ENGINE') {
      const playerColor = orientation === 'white' ? 'w' : 'b';
      if (game.turn() !== playerColor) {
        recordImpulseClick(); // Track impulse click during engine turn
        return;
      }
    }

    // If no piece is selected, try to select one
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
        moveStartTime.current = Date.now(); // Start timing
      }
      return;
    }

    // If clicking the same square, deselect (chess.com behavior)
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    // Try to make a move
    try {
      const moveTime = Date.now() - moveStartTime.current;
      const isCapture = !!game.get(square);
      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });

      if (move) {
        // Preserve scroll position to prevent jump after state updates
        const scrollY = window.scrollY;
        
        // Play the appropriate sound
        playSmartMoveSound(game, move, { isCapture });
        
        setGame(new Chess(game.fen()));
        setLastMove({ from: moveFrom, to: square });
        setMoveHistory([...moveHistory, move.san]);
        setMoveFrom(null);
        setOptionSquares({});
        
        // Restore scroll position after React re-renders
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
        
        // Record move for tilt detection (blunder detection happens via evaluation)
        recordMove(moveTime, false);
        
        // Track move time for coach
        moveTimes.current.push(moveTime);
        
        // In vs engine mode, make engine move
        if (selectedMode === 'VS_ENGINE' && !game.isGameOver()) {
          makeEngineMove();
        }
      }
    } catch {
      // Invalid move, try selecting new piece
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
        moveStartTime.current = Date.now();
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    }
  }, [game, moveFrom, isThinking, selectedMode, orientation, getMoveOptions, moveHistory, recordMove, recordImpulseClick]);

  // Handle drag and drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (isThinking) {
      recordImpulseClick();
      return false;
    }
    
    // In vs engine mode, only allow moves when it's the player's turn
    if (selectedMode === 'VS_ENGINE') {
      const playerColor = orientation === 'white' ? 'w' : 'b';
      if (game.turn() !== playerColor) {
        recordImpulseClick();
        return false;
      }
    }

    try {
      const moveTime = Date.now() - moveStartTime.current;
      const isCapture = !!game.get(targetSquare);
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        // Preserve scroll position to prevent jump after state updates
        const scrollY = window.scrollY;
        
        // Play the appropriate sound
        playSmartMoveSound(game, move, { isCapture });
        
        setGame(new Chess(game.fen()));
        setLastMove({ from: sourceSquare, to: targetSquare });
        setMoveHistory([...moveHistory, move.san]);
        setMoveFrom(null);
        setOptionSquares({});
        
        // Restore scroll position after React re-renders
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
        
        // Record move for tilt detection
        recordMove(moveTime, false);
        
        // Track move time for coach
        moveTimes.current.push(moveTime);
        
        // In vs engine mode, make engine move
        if (selectedMode === 'VS_ENGINE' && !game.isGameOver()) {
          setTimeout(() => makeEngineMove(), 300);
        }
        
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, isThinking, selectedMode, orientation, moveHistory, recordMove, recordImpulseClick]);

  // Make engine move with proper validation
  const makeEngineMove = useCallback(async () => {
    if (!engineReady || game.isGameOver()) return;
    
    setIsThinking(true);
    
    stockfish.playMove(game.fen(), (bestMove) => {
      try {
        // Validate UCI move format
        const parsed = parseUciMove(bestMove);
        if (!parsed) {
          console.error('Invalid move format from engine:', bestMove);
          setIsThinking(false);
          return;
        }
        
        const isCapture = !!game.get(parsed.to);
        const move = game.move({ 
          from: parsed.from, 
          to: parsed.to, 
          promotion: parsed.promotion 
        });
        
        if (move) {
          // Preserve scroll position to prevent jump after state updates
          const scrollY = window.scrollY;
          
          // Play sound for engine's move
          playSmartMoveSound(game, move, { isCapture });
          
          setGame(new Chess(game.fen()));
          setLastMove({ from: parsed.from, to: parsed.to });
          setMoveHistory(prev => [...prev, move.san]);
          moveStartTime.current = Date.now(); // Reset timer for player's move
          
          // Restore scroll position after React re-renders
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
          });
        } else {
          console.error('Engine move was not legal:', bestMove, 'in position', game.fen());
        }
      } catch (e) {
        console.error('Engine move error:', e);
      } finally {
        setIsThinking(false);
      }
    });
  }, [engineReady, game]);

  // Start engine's first move if playing as black
  useEffect(() => {
    if (selectedMode === 'VS_ENGINE' && orientation === 'black' && game.history().length === 0 && engineReady) {
      makeEngineMove();
    }
  }, [selectedMode, orientation, engineReady, game, makeEngineMove]);

  const handleModeChange = useCallback((mode: GameMode) => {
    setSelectedMode(mode);
    resetGame();
    setEvaluation(null);
    stockfish.stop();
    
    // Record game start for coach
    if (mode === 'VS_ENGINE') {
      gameStartTime.current = Date.now();
      moveTimes.current = [];
      blunderCount.current = 0;
      mistakeCount.current = 0;
      recordEvent('GAME_START', { mode: 'vs_engine' });
    }
  }, [recordEvent]);

  const resetGame = useCallback(() => {
    // If there was an ongoing game, record it as abandoned
    if (selectedMode === 'VS_ENGINE' && moveHistory.length > 4 && !game.isGameOver()) {
      const duration = Date.now() - gameStartTime.current;
      const metrics = createSimpleGameMetrics({
        result: 'abandoned',
        duration,
        moveCount: moveHistory.length,
        accuracy: 0,
        wasResigned: true,
      });
      recordGame(metrics);
      recordEvent('GAME_END', { result: 'abandoned', mode: 'vs_engine' });
    }
    
    setGame(new Chess());
    setMoveHistory([]);
    setLastMove(null);
    setMoveFrom(null);
    setOptionSquares({});
    setEvaluation(null);
    setPrevEvaluation(null);
    setIsThinking(false);
    stockfish.reset();
    resetSession(); // Reset tilt detection
    
    // Reset game tracking
    gameStartTime.current = Date.now();
    moveTimes.current = [];
    blunderCount.current = 0;
    mistakeCount.current = 0;
  }, [resetSession, selectedMode, moveHistory.length, game, recordGame, recordEvent]);

  const handleLoadFen = useCallback(() => {
    if (customFen.trim()) {
      try {
        const newGame = new Chess(customFen.trim());
        setGame(newGame);
        setMoveHistory([]);
        setLastMove(null);
        setCustomFen('');
      } catch (e) {
        console.error('Invalid FEN:', e);
        alert('Invalid FEN position');
      }
    }
  }, [customFen]);

  const flipBoard = useCallback(() => {
    setOrientation(o => o === 'white' ? 'black' : 'white');
  }, []);

  const handleInterventionComplete = useCallback(() => {
    setShowIntervention(false);
    completeIntervention();
  }, [completeIntervention]);

  const handleInterventionExit = useCallback(() => {
    setShowIntervention(false);
    completeIntervention();
    navigate('/');
  }, [completeIntervention, navigate]);

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(168, 85, 247, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(168, 85, 247, 0.4)' },
    }),
  };

  const modes: { mode: GameMode; label: string; icon: string; description: string }[] = [
    { mode: 'FREE_PLAY', label: 'Free Play', icon: '♟️', description: 'Move pieces freely' },
    { mode: 'ANALYSIS', label: 'Analysis', icon: '🔍', description: 'Engine evaluation' },
    { mode: 'VS_ENGINE', label: 'vs Engine', icon: '🤖', description: 'Play against Stockfish' },
  ];

  // Game status
  const getGameStatus = () => {
    if (game.isCheckmate()) return { text: `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins`, type: 'end' };
    if (game.isDraw()) return { text: 'Draw', type: 'end' };
    if (game.isStalemate()) return { text: 'Stalemate', type: 'end' };
    if (game.isCheck()) return { text: 'Check', type: 'check' };
    if (isThinking) return { text: 'Engine thinking...', type: 'thinking' };
    return { text: game.turn() === 'w' ? 'White to move' : 'Black to move', type: 'normal' };
  };

  const status = getGameStatus();

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-0">
      {/* Tilt Intervention Overlay */}
      {showIntervention && tiltState.interventionType !== 'NONE' && (
        <TiltIntervention
          level={tiltState.level}
          triggers={tiltState.triggers}
          interventionType={tiltState.interventionType as 'GENTLE_REMINDER' | 'BREATHE' | 'PAUSE' | 'BREAK'}
          tradition="TAO"
          onComplete={handleInterventionComplete}
          onExit={handleInterventionExit}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>Play</h1>
            <span className="hidden sm:inline"><AgentWatching agents={['coach', 'inner-compass']} /></span>
          </div>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {engineLoading ? 'Loading...' : engineReady ? '✓ Ready' : '✗ Error'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/play/friend')}
            className="btn-primary text-xs sm:text-sm px-2 sm:px-4"
          >
            <span>👥</span>
            <span className="hidden sm:inline">Play Friend</span>
          </button>
          <button
            onClick={() => navigate('/calm-play')}
            className="btn-secondary text-xs sm:text-sm px-2 sm:px-4"
          >
            <span>☯</span>
            <span className="hidden sm:inline">Calm Play</span>
          </button>
        </div>
      </div>

      {/* Contextual Agent Tip - hidden on mobile */}
      <div className="hidden sm:block">
        <ContextualAgentTip currentPage="/play" />
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {modes.map(({ mode, label, icon, description }) => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`card p-2 sm:p-4 text-left transition-all flex items-center gap-2 sm:gap-4 ${
              selectedMode === mode ? 'ring-2' : ''
            }`}
            style={{ 
              borderColor: selectedMode === mode ? 'var(--accent-primary)' : 'transparent',
              background: selectedMode === mode ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-secondary)'
            }}
          >
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0"
              style={{ background: selectedMode === mode ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-elevated)' }}
            >
              {icon}
            </div>
            <div>
              <div className="font-medium text-xs sm:text-sm" style={{ color: selectedMode === mode ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                {label}
              </div>
              <div className="text-[10px] sm:text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>{description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr_320px] gap-4 sm:gap-6">
        {/* Evaluation bar (analysis mode only) - visible on mobile too */}
        {selectedMode === 'ANALYSIS' && (
          <div className="order-first lg:order-none">
            {/* Mobile: horizontal bar at top */}
            <div className="lg:hidden mb-4">
              <EvaluationBar 
                evaluation={evaluation}
                orientation={orientation}
                horizontal
              />
            </div>
            {/* Desktop: vertical bar on side */}
            <div className="hidden lg:block">
              <EvaluationBar 
                evaluation={evaluation}
                orientation={orientation}
              />
            </div>
          </div>
        )}

        {/* Chessboard */}
        <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">
          {/* Game status */}
          <div 
            className="text-sm px-4 py-2 rounded-lg font-medium"
            style={{ 
              background: status.type === 'end' ? 'rgba(168, 85, 247, 0.15)' 
                : status.type === 'thinking' ? 'rgba(59, 130, 246, 0.15)'
                : status.type === 'check' ? 'rgba(239, 68, 68, 0.15)'
                : 'var(--bg-elevated)',
              color: status.type === 'end' ? 'var(--accent-primary)' 
                : status.type === 'thinking' ? '#3b82f6'
                : status.type === 'check' ? '#ef4444'
                : 'var(--text-secondary)'
            }}
          >
            {status.text}
          </div>

          <div className="w-full flex justify-center" style={{ maxWidth: `${boardSize}px`, margin: '0 auto' }}>
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              onPieceDrop={onDrop}
              boardOrientation={orientation}
              customSquareStyles={customSquareStyles}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              animationDuration={boardStyles.animationDuration}
              arePiecesDraggable={!isThinking}
              boardWidth={Math.min(boardSize, window.innerWidth - 32)}
            />
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="card p-4">
            <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Controls
            </h3>
            <div className="space-y-2">
              <button
                onClick={resetGame}
                className="btn-primary w-full"
              >
                New Game
              </button>
              <button
                onClick={flipBoard}
                className="btn-ghost w-full"
              >
                🔄 Flip Board
              </button>
            </div>
          </div>

          {/* FEN loader */}
          <div className="card p-4">
            <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Load Position
            </h3>
            <input
              type="text"
              value={customFen}
              onChange={(e) => setCustomFen(e.target.value)}
              placeholder="Paste FEN..."
              className="w-full text-sm px-3 py-2 rounded-lg mb-2"
              style={{ 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              onClick={handleLoadFen}
              disabled={!customFen.trim()}
              className="btn-secondary w-full text-sm disabled:opacity-50"
            >
              Load FEN
            </button>
          </div>

          {/* Analysis info */}
          {selectedMode === 'ANALYSIS' && evaluation && (
            <div className="card p-4">
              <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Engine Analysis
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Evaluation</span>
                  <span className="font-mono font-medium" style={{ 
                    color: evaluation.score > 50 ? '#4ade80' : 
                    evaluation.score < -50 ? '#ef4444' : 'var(--text-secondary)'
                  }}>
                    {evaluation.mate !== undefined 
                      ? `M${Math.abs(evaluation.mate)}` 
                      : (evaluation.score / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Depth</span>
                  <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{evaluation.depth}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Best Move</span>
                  <span className="font-mono" style={{ color: 'var(--accent-primary)' }}>{evaluation.bestMove}</span>
                </div>
                {evaluation.pv.length > 0 && (
                  <div className="pt-2 mt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Principal Variation</span>
                    <div className="font-mono text-xs mt-1 break-all" style={{ color: 'var(--text-tertiary)' }}>
                      {evaluation.pv.slice(0, 5).join(' ')}
                      {evaluation.pv.length > 5 && '...'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Engine strength (vs engine mode) */}
          {selectedMode === 'VS_ENGINE' && (
            <div className="card p-4">
              <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Engine Strength
              </h3>
              <input
                type="range"
                min="0"
                max="20"
                value={progress.settings.engineStrength}
                onChange={(e) => {
                  const strength = parseInt(e.target.value);
                  useProgressStore.getState().updateSettings({ engineStrength: strength });
                  stockfish.setStrength(strength);
                }}
                className="w-full accent-[#a855f7]"
              />
              <div className="text-center text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                Level {progress.settings.engineStrength}
              </div>
              <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
                {progress.settings.engineStrength <= 5 ? 'Beginner' :
                 progress.settings.engineStrength <= 10 ? 'Intermediate' :
                 progress.settings.engineStrength <= 15 ? 'Advanced' : 'Master'}
              </p>
            </div>
          )}

          {/* Tilt tracker with detection integration */}
          <TiltTracker 
            currentTilt={tiltState.level}
            tiltScore={tiltState.score}
            autoTriggers={tiltState.triggers}
            onTiltReport={reportTilt}
            enabled={awarenessEnabled}
            onToggle={toggleAwareness}
          />
        </div>
      </div>

      {/* Move history */}
      {moveHistory.length > 0 && (
        <div className="card p-4">
          <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
            Move History
          </h3>
          <div className="move-history flex flex-wrap gap-1">
            {moveHistory.map((move, index) => (
              <span key={index} className="flex items-center">
                {index % 2 === 0 && (
                  <span className="move-number" style={{ color: 'var(--text-muted)' }}>{Math.floor(index / 2) + 1}.</span>
                )}
                <span className="px-2 py-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {move}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayPage;
