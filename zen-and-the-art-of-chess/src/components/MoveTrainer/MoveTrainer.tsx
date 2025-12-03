// ============================================
// MOVETRAINER COMPONENT
// Step-by-step interactive chess learning
// With spaced repetition and visual annotations
// ============================================

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useBoardStyles, useMoveOptions } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import type { EnhancedPattern, AnnotatedMove } from '@/data/positional/enhancedPatterns';

// ============================================
// TYPES
// ============================================

type TrainingMode = 'learn' | 'test' | 'review';
type TrainingPhase = 'intro' | 'playing' | 'move_explanation' | 'summary' | 'complete';

interface MoveTrainerProps {
  pattern: EnhancedPattern;
  mode: TrainingMode;
  onComplete: (success: boolean, stats: TrainingStats) => void;
  onExit: () => void;
}

interface TrainingStats {
  correctMoves: number;
  incorrectMoves: number;
  hintsUsed: number;
  timeSpent: number;
}

// SM-2 Algorithm State
interface SRSState {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

// ============================================
// MOVETRAINER COMPONENT
// ============================================

export function MoveTrainer({ pattern, mode, onComplete, onExit }: MoveTrainerProps) {
  const boardSize = useBoardSize(480, 32);
  
  // Game State
  const [game, setGame] = useState(() => new Chess(pattern.fen));
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [phase, setPhase] = useState<TrainingPhase>('intro');
  
  // Interaction State
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  
  // Training Stats
  const [stats, setStats] = useState<TrainingStats>({
    correctMoves: 0,
    incorrectMoves: 0,
    hintsUsed: 0,
    timeSpent: 0,
  });
  const startTime = useRef(Date.now());
  
  // Auto-advance for opponent moves
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimeout = useRef<ReturnType<typeof setTimeout>>();
  
  // Board settings
  const boardStyles = useBoardStyles();

  // Current move from the main line
  const currentMove: AnnotatedMove | undefined = pattern.mainLine[currentMoveIndex];
  const isUserMove = useMemo(() => {
    // In test mode: user plays all moves matching their color
    // In learn mode: we show everything, user just follows along
    if (mode === 'learn') return false;
    
    // Determine if it's user's turn based on starting position
    const isWhiteToStart = pattern.toMove === 'white';
    const moveParity = currentMoveIndex % 2;
    return isWhiteToStart ? moveParity === 0 : moveParity === 1;
  }, [mode, currentMoveIndex, pattern.toMove]);

  // ============================================
  // ARROW GENERATION
  // ============================================
  
  const customArrows = useMemo(() => {
    if (!currentMove) return [];
    
    const arrows: [Square, Square, string][] = [];
    
    // Show arrows from the current move annotation
    if (currentMove.arrows && (mode === 'learn' || showHint || phase === 'move_explanation')) {
      currentMove.arrows.forEach(arrow => {
        const color = arrow.color || 'rgba(74, 222, 128, 0.8)';
        arrows.push([arrow.from as Square, arrow.to as Square, color]);
      });
    }
    
    // In learn mode or after showing explanation, show the move arrow
    if (mode === 'learn' || phase === 'move_explanation') {
      try {
        const tempGame = new Chess(game.fen());
        const moveResult = tempGame.move(currentMove.move);
        if (moveResult) {
          arrows.push([moveResult.from as Square, moveResult.to as Square, 'rgba(74, 222, 128, 0.9)']);
        }
      } catch {
        // Invalid move, skip arrow
      }
    }
    
    return arrows;
  }, [currentMove, mode, showHint, phase, game]);

  // ============================================
  // SQUARE HIGHLIGHTING
  // ============================================
  
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, { backgroundColor: string }> = {};
    
    // Add option squares for piece movement
    Object.assign(styles, optionSquares);
    
    // Highlight key squares from the pattern
    if (currentMove?.highlights && (mode === 'learn' || showHint || phase === 'move_explanation')) {
      currentMove.highlights.forEach(sq => {
        styles[sq] = { backgroundColor: 'rgba(234, 179, 8, 0.4)' };
      });
    }
    
    // Feedback coloring
    if (feedback === 'correct') {
      styles[moveFrom || ''] = { backgroundColor: 'rgba(34, 197, 94, 0.5)' };
    }
    
    return styles;
  }, [optionSquares, currentMove, mode, showHint, phase, feedback, moveFrom]);

  // ============================================
  // MOVE HANDLING
  // ============================================
  
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: game.get(move.to as Square) 
          ? 'rgba(239, 68, 68, 0.4)' 
          : 'rgba(168, 85, 247, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(168, 85, 247, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  const executeMove = useCallback((move: string) => {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return true;
      }
    } catch {
      // Invalid move
    }
    return false;
  }, [game]);

  const handleUserMove = useCallback((from: Square, to: Square) => {
    if (!currentMove || phase !== 'playing') return false;
    
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;
      
      // Check if this matches the expected move
      const expectedMove = currentMove.move;
      const isCorrect = 
        result.san === expectedMove ||
        result.san.replace(/[+#]/g, '') === expectedMove.replace(/[+#]/g, '') ||
        `${from}${to}` === expectedMove;
      
      if (isCorrect) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        setGame(gameCopy);
        setFeedback('correct');
        setStats(prev => ({ ...prev, correctMoves: prev.correctMoves + 1 }));
        setPhase('move_explanation');
        setShowHint(false);
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        setTimeout(() => {
          setFeedback(null);
        }, 500);
        
        return true;
      } else {
        // Gentle feedback - no shake
        setShowIncorrectFeedback(true);
        setStats(prev => ({ ...prev, incorrectMoves: prev.incorrectMoves + 1 }));
        
        setTimeout(() => {
          setShowIncorrectFeedback(false);
        }, 1500);
        
        return false;
      }
    } catch {
      return false;
    }
  }, [currentMove, phase, game]);

  const onSquareClick = useCallback((square: Square) => {
    if (phase !== 'playing' || !isUserMove) return;
    
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }
    
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }
    
    handleUserMove(moveFrom, square);
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, phase, isUserMove, getMoveOptions, handleUserMove]);

  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (phase !== 'playing' || !isUserMove) return false;
    return handleUserMove(sourceSquare, targetSquare);
  }, [phase, isUserMove, handleUserMove]);

  // ============================================
  // NAVIGATION
  // ============================================
  
  const advanceMove = useCallback(() => {
    if (currentMoveIndex >= pattern.mainLine.length - 1) {
      setPhase('summary');
      return;
    }
    
    // Execute the current move if in learn mode
    if (mode === 'learn' && currentMove) {
      executeMove(currentMove.move);
    }
    
    setCurrentMoveIndex(prev => prev + 1);
    setPhase('playing');
    setShowHint(false);
    setShowAlternatives(false);
  }, [currentMoveIndex, pattern.mainLine.length, mode, currentMove, executeMove]);

  const goBack = useCallback(() => {
    if (currentMoveIndex <= 0) return;
    
    // Rebuild position from start
    const newGame = new Chess(pattern.fen);
    for (let i = 0; i < currentMoveIndex - 1; i++) {
      newGame.move(pattern.mainLine[i].move);
    }
    
    setGame(newGame);
    setCurrentMoveIndex(prev => prev - 1);
    setPhase('playing');
    setShowHint(false);
    setShowAlternatives(false);
  }, [currentMoveIndex, pattern.fen, pattern.mainLine]);

  const startTraining = useCallback(() => {
    setPhase('playing');
    setCurrentMoveIndex(0);
    setGame(new Chess(pattern.fen));
    setStats({ correctMoves: 0, incorrectMoves: 0, hintsUsed: 0, timeSpent: 0 });
    startTime.current = Date.now();
  }, [pattern.fen]);

  const useHint = useCallback(() => {
    if (!showHint) {
      setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    }
    setShowHint(true);
  }, [showHint]);

  const completeTraining = useCallback(() => {
    const finalStats = {
      ...stats,
      timeSpent: Math.round((Date.now() - startTime.current) / 1000),
    };
    onComplete(stats.incorrectMoves === 0, finalStats);
  }, [stats, onComplete]);

  // Auto-play opponent moves in test mode
  useEffect(() => {
    if (mode === 'test' && phase === 'move_explanation' && !isUserMove) {
      // Wait a moment then execute opponent's move
      autoPlayTimeout.current = setTimeout(() => {
        if (currentMove) {
          executeMove(currentMove.move);
        }
        advanceMove();
      }, 1500);
    }
    
    return () => {
      if (autoPlayTimeout.current) {
        clearTimeout(autoPlayTimeout.current);
      }
    };
  }, [mode, phase, isUserMove, currentMove, executeMove, advanceMove]);

  // ============================================
  // BOARD ORIENTATION
  // ============================================
  
  const boardOrientation = pattern.toMove === 'white' ? 'white' : 'black';

  // ============================================
  // RENDER: INTRO PHASE
  // ============================================
  
  if (phase === 'intro') {
    return (
      <div className="animate-fade-in space-y-6">
        {/* Pattern Header */}
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            {pattern.title}
          </h1>
          {pattern.subtitle && (
            <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
              {pattern.subtitle}
            </p>
          )}
        </div>

        {/* Introduction Card */}
        <div className="card p-8">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {pattern.introduction}
            </p>
          </div>
        </div>

        {/* Key Ideas */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            What You'll Learn
          </h3>
          <ul className="space-y-3">
            {pattern.keyIdeas.map((idea, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{idea}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Difficulty & Time */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-muted)' }}>Difficulty:</span>
            <span style={{ color: 'var(--accent-gold)' }}>
              {'★'.repeat(pattern.difficulty)}{'☆'.repeat(5 - pattern.difficulty)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-muted)' }}>Time:</span>
            <span style={{ color: 'var(--text-secondary)' }}>~{pattern.estimatedMinutes} min</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center gap-4">
          <button onClick={onExit} className="btn-ghost">
            ← Back
          </button>
          <button onClick={startTraining} className="btn-primary text-lg px-8 py-3">
            {mode === 'learn' ? '📖 Start Learning' : '🎯 Start Test'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: SUMMARY PHASE
  // ============================================
  
  if (phase === 'summary') {
    const isSuccess = stats.incorrectMoves === 0;
    
    return (
      <div className="animate-fade-in space-y-6">
        {/* Success/Failure Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">{isSuccess ? '🎉' : '📚'}</div>
          <h1 className="text-2xl font-display font-medium mb-2" style={{ color: isSuccess ? '#4ade80' : 'var(--text-primary)' }}>
            {isSuccess ? 'Pattern Mastered!' : 'Good Effort!'}
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: '#4ade80' }}>{stats.correctMoves}</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Correct</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: stats.incorrectMoves > 0 ? '#ef4444' : 'var(--text-muted)' }}>
              {stats.incorrectMoves}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Mistakes</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--text-secondary)' }}>{stats.hintsUsed}</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Hints</div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Summary
          </h3>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {pattern.summary}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Key Takeaways
          </h3>
          <ul className="space-y-2">
            {pattern.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: '#4ade80' }}>✓</span>
                <span style={{ color: 'var(--text-secondary)' }}>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Memory Tip */}
        {pattern.memoryTip && (
          <div className="card p-6" style={{ background: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-medium mb-1" style={{ color: 'var(--accent-gold)' }}>Memory Tip</h4>
                <p className="italic" style={{ color: 'var(--text-secondary)' }}>{pattern.memoryTip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button onClick={onExit} className="btn-secondary">
            ← Back to Patterns
          </button>
          <button onClick={startTraining} className="btn-ghost">
            🔄 Practice Again
          </button>
          <button onClick={completeTraining} className="btn-primary">
            Complete →
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: MAIN TRAINING VIEW
  // ============================================
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="btn-ghost text-sm">
          ← Exit
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Move {currentMoveIndex + 1} of {pattern.mainLine.length}
          </span>
          <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentMoveIndex + 1) / pattern.mainLine.length) * 100}%`,
                background: 'linear-gradient(90deg, #4ade80, #22d3ee)'
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {mode === 'test' && (
            <span className="badge badge-purple">Test Mode</span>
          )}
          {mode === 'learn' && (
            <span className="badge badge-blue">Learn Mode</span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[minmax(300px,520px)_1fr] gap-4 lg:gap-6 items-start px-2 sm:px-0">
        {/* Board Section */}
        <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
          {/* Chessboard */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Chessboard
                position={game.fen()}
                onSquareClick={onSquareClick}
                onPieceDrop={onDrop}
                boardOrientation={boardOrientation}
                customSquareStyles={customSquareStyles}
                customArrows={customArrows}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                animationDuration={boardStyles.animationDuration}
                arePiecesDraggable={phase === 'playing' && isUserMove}
                boardWidth={boardSize}
              />
            </div>
            
            {/* Correct Move Feedback */}
            {feedback === 'correct' && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-bounce-in" 
                   style={{ background: 'rgba(34, 197, 94, 0.9)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}>
                <span className="text-white font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Correct!
                </span>
              </div>
            )}
            
            {/* Gentle incorrect feedback - no shake */}
            {showIncorrectFeedback && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-fade-in" 
                   style={{ background: 'rgba(239, 68, 68, 0.8)', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)' }}>
                <span className="text-white text-sm">Not quite — try again</span>
              </div>
            )}
            
            {/* Whose turn indicator */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
              style={{ 
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-default)',
                color: game.turn() === 'w' ? 'white' : 'var(--text-muted)'
              }}
            >
              {game.turn() === 'w' ? '⬜ White' : '⬛ Black'} to move
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={goBack}
              disabled={currentMoveIndex === 0}
              className="w-12 h-12 rounded-lg flex items-center justify-center disabled:opacity-30 transition-all hover:bg-[var(--bg-hover)]"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {mode === 'test' && isUserMove && phase === 'playing' && (
              <button 
                onClick={useHint}
                className="px-4 h-12 rounded-lg flex items-center gap-2 transition-all hover:bg-[var(--bg-hover)]"
                style={{ background: 'var(--bg-elevated)', color: 'var(--accent-gold)' }}
              >
                💡 Hint
              </button>
            )}
            
            {(mode === 'learn' || phase === 'move_explanation') && (
              <button 
                onClick={advanceMove}
                disabled={currentMoveIndex >= pattern.mainLine.length - 1 && phase === 'move_explanation'}
                className="px-6 h-12 rounded-lg flex items-center gap-2 font-medium transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
                  color: '#000'
                }}
              >
                Next Move
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            <button 
              onClick={() => setPhase('summary')}
              className="px-4 h-12 rounded-lg flex items-center gap-2 transition-all hover:bg-[var(--bg-hover)]"
              style={{ background: 'var(--bg-elevated)' }}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Explanation Panel */}
        <div className="space-y-4">
          {/* Move Display */}
          {currentMove && (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="text-2xl font-mono font-bold"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      {Math.floor(currentMoveIndex / 2) + 1}.{currentMoveIndex % 2 === 0 ? '' : '..'} {currentMove.move}
                    </span>
                    {currentMove.annotation && (
                      <span 
                        className="text-xl"
                        style={{ 
                          color: currentMove.annotation.includes('!') ? '#4ade80' : 
                                 currentMove.annotation.includes('?') ? '#ef4444' : 
                                 'var(--text-muted)'
                        }}
                      >
                        {currentMove.annotation}
                      </span>
                    )}
                  </div>
                  {currentMove.conceptTag && (
                    <span className="badge text-xs" style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}>
                      {currentMove.conceptTag}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Explanation */}
              {(mode === 'learn' || phase === 'move_explanation' || showHint) && (
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {currentMove.explanation}
                </p>
              )}
              
              {/* Prompt for test mode */}
              {mode === 'test' && phase === 'playing' && isUserMove && !showHint && (
                <p className="italic" style={{ color: 'var(--text-muted)' }}>
                  Find the best move for {game.turn() === 'w' ? 'White' : 'Black'}...
                </p>
              )}
            </div>
          )}

          {/* Alternative Moves */}
          {currentMove?.alternativeMoves && currentMove.alternativeMoves.length > 0 && (mode === 'learn' || phase === 'move_explanation') && (
            <div className="card p-4">
              <button 
                onClick={() => setShowAlternatives(!showAlternatives)}
                className="w-full flex items-center justify-between"
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  Alternative Moves ({currentMove.alternativeMoves.length})
                </span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showAlternatives ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showAlternatives && (
                <div className="mt-4 space-y-3">
                  {currentMove.alternativeMoves.map((alt, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                          {alt.move}
                        </span>
                        <span 
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ 
                            background: alt.evaluation === 'good' || alt.evaluation === 'better' ? 'rgba(74, 222, 128, 0.2)' :
                                       alt.evaluation === 'equal' ? 'rgba(168, 85, 247, 0.2)' :
                                       'rgba(239, 68, 68, 0.2)',
                            color: alt.evaluation === 'good' || alt.evaluation === 'better' ? '#4ade80' :
                                  alt.evaluation === 'equal' ? '#a855f7' :
                                  '#ef4444'
                          }}
                        >
                          {alt.evaluation}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {alt.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Move History */}
          <div className="card p-4">
            <h4 className="text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Move History
            </h4>
            <div className="flex flex-wrap gap-1">
              {pattern.mainLine.slice(0, currentMoveIndex + 1).map((move, i) => (
                <span 
                  key={i}
                  className={`px-2 py-1 rounded text-sm font-mono ${i === currentMoveIndex ? 'font-bold' : ''}`}
                  style={{ 
                    background: i === currentMoveIndex ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                    color: i === currentMoveIndex ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  {i % 2 === 0 && `${Math.floor(i / 2) + 1}. `}{move.move}
                </span>
              ))}
            </div>
          </div>

          {/* Pattern Info */}
          <div className="card p-4">
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Pattern:</span>
              <span style={{ color: 'var(--text-secondary)' }}>{pattern.title}</span>
            </div>
            {pattern.playerExample && (
              <div className="flex items-center justify-between text-sm mt-2 pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>From:</span>
                <span style={{ color: 'var(--text-tertiary)' }}>
                  {pattern.playerExample.white} vs {pattern.playerExample.black}
                  {pattern.playerExample.year && ` (${pattern.playerExample.year})`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoveTrainer;

