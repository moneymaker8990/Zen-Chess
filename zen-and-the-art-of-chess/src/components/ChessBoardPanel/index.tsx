import { useState, useCallback, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useGameStore } from '@/state/useStore';
import { useStudyStore } from '@/state/notesStore';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { stockfish } from '@/engine/stockfish';
import { playSmartMoveSound, UISounds } from '@/lib/soundSystem';
import type { MoveInfo, EngineEvaluation } from '@/lib/types';

interface ChessBoardPanelProps {
  initialFen?: string;
  puzzleMode?: boolean;
  puzzleSolution?: string[];
  // Setup move data - shows opponent's last move when puzzle loads
  beforeFen?: string;
  setupMove?: { from: string; to: string };
  onPuzzleSolved?: () => void;
  onPuzzleFailed?: () => void;
  showHints?: boolean;
  allowMoves?: boolean;
  vsEngine?: boolean;
  engineStrength?: number;
  playerColor?: 'white' | 'black';
  onGameOver?: (result: string) => void;
}

export function ChessBoardPanel({
  initialFen,
  puzzleMode = false,
  puzzleSolution = [],
  beforeFen,
  setupMove,
  onPuzzleSolved,
  onPuzzleFailed,
  showHints = false,
  allowMoves = true,
  vsEngine = false,
  engineStrength = 1,
  playerColor = 'white',
  onGameOver,
}: ChessBoardPanelProps) {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [rightClickedSquares, setRightClickedSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [puzzleMoveIndex, setPuzzleMoveIndex] = useState(0);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveResult, setMoveResult] = useState<'correct' | 'incorrect' | 'solved' | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [isAnimatingSetup, setIsAnimatingSetup] = useState(false);
  const boardSize = useBoardSize(480, 32);

  const { gameState, setEvaluation, makeMove } = useGameStore();
  const { recordGamePlayed, recordPuzzleSolved, recordPuzzleFailed } = useStudyStore();
  const engineInitialized = useRef(false);

  // Initialize engine for vs engine mode
  useEffect(() => {
    if (vsEngine && !engineInitialized.current) {
      engineInitialized.current = true;
      console.log('Initializing engine for ChessBoardPanel...');
      stockfish.init().then((ready) => {
        console.log('Engine ready:', ready);
        setEngineReady(ready);
        if (ready) {
          stockfish.setStrength(engineStrength);
        }
      });
    }
  }, [vsEngine, engineStrength]);

  // Update engine strength when it changes
  useEffect(() => {
    if (vsEngine && engineReady) {
      stockfish.setStrength(engineStrength);
    }
  }, [engineStrength, vsEngine, engineReady]);

  // Reset game when FEN changes - with setup move animation for puzzles
  useEffect(() => {
    if (initialFen) {
      setPuzzleMoveIndex(0);
      setMoveResult(null);
      setIsThinking(false);
      setWaitingForOpponent(false);
      setMoveCount(0);
      
      // If puzzle has setup move data, animate the opponent's last move
      if (puzzleMode && beforeFen && setupMove) {
        setIsAnimatingSetup(true);
        // Start with position before opponent's move
        setGame(new Chess(beforeFen));
        setLastMove(null);
        
        // After a brief delay, show the opponent's move
        setTimeout(() => {
          setGame(new Chess(initialFen));
          // Highlight the opponent's last move so user sees what just happened
          setLastMove({
            from: setupMove.from as Square,
            to: setupMove.to as Square
          });
          setIsAnimatingSetup(false);
        }, 600);
      } else {
        // No setup move - just show the puzzle position
        setGame(new Chess(initialFen));
        setLastMove(null);
        setIsAnimatingSetup(false);
      }
    }
  }, [initialFen, puzzleMode, beforeFen, setupMove]);

  // If playing as black, make engine's first move
  useEffect(() => {
    if (vsEngine && playerColor === 'black' && engineReady && game.history().length === 0) {
      makeEngineMove(game);
    }
  }, [vsEngine, playerColor, engineReady, game]);

  // Make engine move
  const makeEngineMove = useCallback((currentGame: Chess) => {
    if (!engineReady || currentGame.isGameOver()) {
      if (currentGame.isGameOver()) {
        const result = currentGame.isCheckmate() 
          ? (currentGame.turn() === 'w' ? 'Black wins' : 'White wins')
          : 'Draw';
        recordGamePlayed(); // Auto-track
        onGameOver?.(result);
      }
      return;
    }

    setIsThinking(true);
    console.log('Engine thinking...');
    
    stockfish.playMove(currentGame.fen(), (bestMove) => {
      console.log('Engine plays:', bestMove);
      try {
        const from = bestMove.slice(0, 2) as Square;
        const to = bestMove.slice(2, 4) as Square;
        const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
        
        const gameCopy = new Chess(currentGame.fen());
        const isCapture = !!gameCopy.get(to);
        const move = gameCopy.move({ from, to, promotion });
        
        if (move) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          // Play engine's move sound
          playSmartMoveSound(gameCopy, move, { isCapture });
          
          setGame(gameCopy);
          setLastMove({ from, to });
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
          
          if (gameCopy.isGameOver()) {
            const result = gameCopy.isCheckmate() 
              ? (gameCopy.turn() === 'w' ? 'Black wins' : 'White wins')
              : 'Draw';
            recordGamePlayed(); // Auto-track
            onGameOver?.(result);
          }
        }
      } catch (e) {
        console.error('Engine move error:', e);
      } finally {
        setIsThinking(false);
      }
    });
  }, [engineReady, onGameOver, recordGamePlayed]);

  // Get possible moves for a square
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: game.get(move.to) 
          ? 'rgba(255, 0, 0, 0.4)' 
          : 'rgba(147, 112, 219, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(147, 112, 219, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Check if it's player's turn
  const isPlayerTurn = useCallback(() => {
    if (!vsEngine) return true;
    const turn = game.turn();
    return (playerColor === 'white' && turn === 'w') || (playerColor === 'black' && turn === 'b');
  }, [vsEngine, game, playerColor]);

  // Handle square click (chess.com style - improved)
  const onSquareClick = useCallback((square: Square) => {
    if (!allowMoves) return;
    if (isAnimatingSetup || isThinking || waitingForOpponent) return;
    if (moveResult === 'solved') return;
    if (vsEngine && !isPlayerTurn()) return;

    // If no piece is selected, try to select one
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
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
    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });

      if (move) {
        executeMove(gameCopy, move, moveFrom, square);
        setMoveFrom(null);
        setOptionSquares({});
      }
    } catch {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    }
  }, [game, moveFrom, allowMoves, isAnimatingSetup, isThinking, waitingForOpponent, moveResult, vsEngine, isPlayerTurn, getMoveOptions]);

  // Execute a move
  const executeMove = useCallback((
    newGame: Chess, 
    move: { san: string; from: string; to: string; captured?: string }, 
    from: Square, 
    to: Square
  ) => {
    // Play move sound
    const isCapture = !!move.captured || !!game.get(to);
    playSmartMoveSound(newGame, { from, to, san: move.san, captured: move.captured }, { isCapture });
    
    // Check if puzzle mode
    if (puzzleMode && puzzleSolution.length > 0) {
      const expectedMove = puzzleSolution[puzzleMoveIndex];
      
      const playerMove = move.san;
      const playerUCI = `${from}${to}`;
      const playerUCIPromo = `${from}${to}q`;
      
      const isCorrect = playerMove === expectedMove || 
                        playerUCI === expectedMove ||
                        playerUCIPromo === expectedMove ||
                        expectedMove?.toLowerCase() === playerMove.toLowerCase();
      
      if (isCorrect) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        setGame(newGame);
        setLastMove({ from, to });
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        const isLastPlayerMove = puzzleMoveIndex >= puzzleSolution.length - 1 || 
                                  puzzleMoveIndex + 2 > puzzleSolution.length - 1;
        
        if (isLastPlayerMove) {
          setMoveResult('solved');
          recordPuzzleSolved(); // Auto-track
          UISounds.puzzleCorrect();
          onPuzzleSolved?.();
        } else {
          setMoveResult('correct');
          setWaitingForOpponent(true);
          
          const opponentMoveIndex = puzzleMoveIndex + 1;
          if (puzzleSolution[opponentMoveIndex]) {
            setTimeout(() => {
              const opponentMove = puzzleSolution[opponentMoveIndex];
              try {
                const opponentCapture = !!newGame.get(opponentMove.slice(2, 4) as Square);
                const response = newGame.move(opponentMove);
                if (response) {
                  // Preserve scroll position
                  const scrollY = window.scrollY;
                  
                  // Play opponent's move sound
                  playSmartMoveSound(newGame, response, { isCapture: opponentCapture });
                  
                  setGame(new Chess(newGame.fen()));
                  setLastMove({ 
                    from: response.from as Square, 
                    to: response.to as Square 
                  });
                  setPuzzleMoveIndex(puzzleMoveIndex + 2);
                  setMoveResult(null);
                  
                  // Restore scroll position
                  requestAnimationFrame(() => window.scrollTo(0, scrollY));
                }
              } catch (e) {
                console.error('Invalid opponent move in solution:', opponentMove, e);
              } finally {
                setWaitingForOpponent(false);
              }
            }, 600);
          } else {
            setWaitingForOpponent(false);
          }
        }
      } else {
        setMoveResult('incorrect');
        recordPuzzleFailed(); // Auto-track
        UISounds.puzzleWrong();
        onPuzzleFailed?.();
        setTimeout(() => setMoveResult(null), 1500);
      }
    } else {
      // Normal move or vs engine
      // Preserve scroll position
      const scrollY = window.scrollY;
      
      setGame(newGame);
      setLastMove({ from, to });
      setMoveCount(prev => prev + 1);
      
      // Restore scroll position
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
      
      const moveInfo: MoveInfo = {
        san: move.san,
        uci: `${from}${to}`,
        fen: newGame.fen(),
      };
      makeMove(moveInfo);
      
      if (newGame.isGameOver()) {
        const result = newGame.isCheckmate() 
          ? (newGame.turn() === 'w' ? 'Black wins' : 'White wins')
          : 'Draw';
        recordGamePlayed(); // Auto-track
        onGameOver?.(result);
        return;
      }
      
      // If vs engine, make engine respond
      if (vsEngine && engineReady) {
        setTimeout(() => makeEngineMove(newGame), 300);
      }
      
      if (gameState.gameMode === 'ANALYSIS') {
        stockfish.analyzePosition(newGame.fen(), (evaluation: EngineEvaluation) => {
          setEvaluation(evaluation);
        });
      }
    }

    setMoveFrom(null);
    setOptionSquares({});
  }, [puzzleMode, puzzleSolution, puzzleMoveIndex, makeMove, gameState.gameMode, setEvaluation, onPuzzleSolved, onPuzzleFailed, vsEngine, engineReady, makeEngineMove, onGameOver]);

  // Handle drag and drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (!allowMoves) return false;
    if (isAnimatingSetup || isThinking || waitingForOpponent) return false;
    if (moveResult === 'solved') return false;
    if (vsEngine && !isPlayerTurn()) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        executeMove(gameCopy, move, sourceSquare, targetSquare);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, allowMoves, isAnimatingSetup, isThinking, waitingForOpponent, moveResult, vsEngine, isPlayerTurn, executeMove]);

  // Right click for arrows
  const onSquareRightClick = useCallback((square: Square) => {
    const color = 'rgba(147, 112, 219, 0.5)';
    setRightClickedSquares((prev) => ({
      ...prev,
      [square]: prev[square] ? undefined! : { backgroundColor: color },
    }));
  }, []);

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...rightClickedSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.3)' },
      [lastMove.to]: { backgroundColor: 'rgba(147, 112, 219, 0.4)' },
    }),
    ...(moveResult === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(moveResult === 'solved' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(moveResult === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.5)' },
    }),
  };

  // Use centralized board settings
  const boardStyles = useBoardStyles();
  const customDarkSquareStyle = boardStyles.customDarkSquareStyle;
  const customLightSquareStyle = boardStyles.customLightSquareStyle;
  const boardOrientation = vsEngine ? playerColor : gameState.orientation;

  return (
    <div className="chessboard-container relative">
      {/* Engine thinking overlay */}
      {isThinking && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zen-900/30 rounded-lg pointer-events-none">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-zen-400 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
            <p className="text-zen-500 text-xs">Thinking...</p>
          </div>
        </div>
      )}

      {/* Waiting for opponent move in puzzle */}
      {waitingForOpponent && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zen-900/30 rounded-lg pointer-events-none">
          <div className="text-center">
            <p className="text-emerald-400 text-sm">✓ Correct!</p>
          </div>
        </div>
      )}

      {/* Hint overlay */}
      {showHints && puzzleSolution[puzzleMoveIndex] && moveResult !== 'solved' && (
        <div className="absolute top-2 right-2 z-10 glass-card-subtle px-3 py-1 text-sm text-gold-400">
          Hint available
        </div>
      )}

      {/* Engine status for vs engine mode */}
      {vsEngine && !engineReady && (
        <div className="absolute top-2 left-2 z-10 glass-card-subtle px-3 py-1 text-xs text-zen-500">
          Loading engine...
        </div>
      )}

      <Chessboard
        position={game.fen()}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPieceDrop={onDrop}
        boardOrientation={boardOrientation}
        customSquareStyles={customSquareStyles}
        customDarkSquareStyle={customDarkSquareStyle}
        customLightSquareStyle={customLightSquareStyle}
        animationDuration={200}
        arePiecesDraggable={allowMoves && !isAnimatingSetup && !isThinking && !waitingForOpponent && moveResult !== 'solved'}
        boardWidth={boardSize}
      />

      {/* Puzzle solved message */}
      {puzzleMode && moveResult === 'solved' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-center">
          <p className="font-medium">✓ Puzzle Complete!</p>
        </div>
      )}

      {/* Incorrect move feedback */}
      {puzzleMode && moveResult === 'incorrect' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
          ✗ Try again
        </div>
      )}

      {/* Game over message */}
      {!puzzleMode && game.isGameOver() && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-zen-800/90 text-zen-200 text-sm">
          {game.isCheckmate() 
            ? `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins`
            : game.isDraw() 
              ? 'Draw'
              : 'Game over'}
        </div>
      )}

      {/* Gentle mindfulness reminder for calm play - non-blocking */}
      {vsEngine && moveCount > 0 && moveCount % 5 === 0 && !isThinking && !game.isGameOver() && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-zen-800/80 text-zen-400 text-xs animate-fade-in">
          ☯ Breathe
        </div>
      )}
    </div>
  );
}

export default ChessBoardPanel;
