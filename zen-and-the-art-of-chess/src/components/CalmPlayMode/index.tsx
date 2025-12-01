import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { stockfish } from '@/engine/stockfish';

interface CalmPlayModeProps {
  onExit?: () => void;
}

export function CalmPlayMode({ onExit }: CalmPlayModeProps) {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showReminder, setShowReminder] = useState(false);

  const engineInitialized = useRef(false);

  // Initialize engine
  useEffect(() => {
    if (!engineInitialized.current) {
      engineInitialized.current = true;
      stockfish.init().then((ready) => {
        setEngineReady(ready);
        if (ready) {
          stockfish.setStrength(1); // Easiest level
        }
      });
    }
  }, []);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Gentle reminder every 5 moves
  useEffect(() => {
    if (moveCount > 0 && moveCount % 5 === 0) {
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 3000);
    }
  }, [moveCount]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Make engine move
  const makeEngineMove = useCallback((currentGame: Chess) => {
    if (!engineReady || currentGame.isGameOver()) return;

    setIsThinking(true);
    
    stockfish.playMove(currentGame.fen(), (bestMove) => {
      try {
        const from = bestMove.slice(0, 2) as Square;
        const to = bestMove.slice(2, 4) as Square;
        const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
        
        const gameCopy = new Chess(currentGame.fen());
        const move = gameCopy.move({ from, to, promotion });
        
        if (move) {
          setGame(gameCopy);
          setLastMove({ from, to });
        }
      } catch (e) {
        console.error('Engine move error:', e);
      } finally {
        setIsThinking(false);
      }
    });
  }, [engineReady]);

  // Get possible moves
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
          : 'rgba(251, 191, 36, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(251, 191, 36, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle square click (chess.com style - improved)
  const onSquareClick = useCallback((square: Square) => {
    if (isThinking) return;
    if (game.turn() !== 'w') return; // Player is white

    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === 'w') {
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

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });

      if (move) {
        setGame(gameCopy);
        setLastMove({ from: moveFrom, to: square });
        setMoveCount(prev => prev + 1);
        setMoveFrom(null);
        setOptionSquares({});
        
        if (!gameCopy.isGameOver()) {
          setTimeout(() => makeEngineMove(gameCopy), 300);
        }
      }
    } catch {
      const piece = game.get(square);
      if (piece && piece.color === 'w') {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    }
  }, [game, moveFrom, isThinking, getMoveOptions, makeEngineMove]);

  // Handle drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (isThinking || game.turn() !== 'w') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        setGame(gameCopy);
        setLastMove({ from: sourceSquare, to: targetSquare });
        setMoveCount(prev => prev + 1);
        setMoveFrom(null);
        setOptionSquares({});
        
        if (!gameCopy.isGameOver()) {
          setTimeout(() => makeEngineMove(gameCopy), 300);
        }
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, isThinking, makeEngineMove]);

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(251, 191, 36, 0.3)' },
      [lastMove.to]: { backgroundColor: 'rgba(251, 191, 36, 0.4)' },
    }),
  };

  // New game
  const handleNewGame = () => {
    setGame(new Chess());
    setMoveFrom(null);
    setOptionSquares({});
    setLastMove(null);
    setMoveCount(0);
  };

  return (
    <div className="min-h-screen bg-zen-950 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif text-zen-100 mb-1">
              Calm Play
            </h1>
            <p className="text-zen-500 text-sm">
              Play at your own pace. No pressure. No judgment.
            </p>
          </div>
          <button
            onClick={onExit}
            className="zen-button-ghost text-zen-500"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_280px] gap-8">
        {/* Chess board */}
        <div className="relative">
          {/* Gentle reminder - non-blocking */}
          {showReminder && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-zen-800/90 text-zen-300 text-sm animate-fade-in">
              ☯ Take a breath if you'd like
            </div>
          )}

          {/* Engine thinking */}
          {isThinking && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-zen-900/20 rounded-lg pointer-events-none">
              <div className="w-6 h-6 border-2 border-zen-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Engine loading */}
          {!engineReady && (
            <div className="absolute top-2 left-2 z-10 glass-card-subtle px-3 py-1 text-xs text-zen-500">
              Loading engine...
            </div>
          )}

          <Chessboard
            position={game.fen()}
            onSquareClick={onSquareClick}
            onPieceDrop={onDrop}
            boardOrientation="white"
            customSquareStyles={customSquareStyles}
            customDarkSquareStyle={{ backgroundColor: '#4a6670' }}
            customLightSquareStyle={{ backgroundColor: '#8ba4a8' }}
            animationDuration={200}
            arePiecesDraggable={!isThinking && game.turn() === 'w'}
            boardWidth={480}
          />

          {/* Game over */}
          {game.isGameOver() && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-zen-800/90 text-zen-200 text-sm">
              {game.isCheckmate() 
                ? `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins`
                : 'Draw'}
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Session stats */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-medium text-zen-400 mb-4 uppercase tracking-wider">
              Session
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zen-500">Duration</span>
                <span className="text-zen-200 font-mono">
                  {formatDuration(sessionDuration)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zen-500">Moves</span>
                <span className="text-zen-200 font-mono">{moveCount}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="glass-card p-5">
            <button
              onClick={handleNewGame}
              className="zen-button w-full mb-2"
            >
              New Game
            </button>
          </div>

          {/* Mindfulness reminder */}
          <div className="glass-card-subtle p-5">
            <p className="text-zen-400 text-sm font-serif italic leading-relaxed">
              "Between stimulus and response there is a space. In that space 
              is our power to choose our response."
            </p>
            <p className="text-zen-600 text-xs mt-2">— Viktor Frankl</p>
          </div>

          {/* Principles */}
          <div className="glass-card-subtle p-5">
            <h3 className="text-sm font-medium text-zen-500 mb-3 uppercase tracking-wider">
              Remember
            </h3>
            <ul className="space-y-2 text-sm text-zen-500">
              <li className="flex items-start gap-2">
                <span className="text-gold-500/60">•</span>
                <span>There's no clock. Take your time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500/60">•</span>
                <span>Win or lose, the practice is the point.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500/60">•</span>
                <span>Notice your breath. Notice the position.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalmPlayMode;
