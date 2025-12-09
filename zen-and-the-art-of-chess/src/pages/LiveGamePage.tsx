// ============================================
// LIVE GAME PAGE
// Real-time multiplayer chess game interface
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
import { useAuthStore } from '@/state/useAuthStore';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { ChessSounds, playSmartMoveSound } from '@/lib/soundSystem';
import {
  MultiplayerGameEngine,
  formatTime,
  formatTimeWithTenths,
  getColorName,
  type MultiplayerGame,
  type GameResult,
  type GameTermination,
} from '@/lib/multiplayer';

// ============================================
// COMPONENT
// ============================================

export function LiveGamePage() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuthStore();
  const boardStyles = useBoardStyles();
  const boardSize = useBoardSize(500, 32);

  // Game engine
  const engineRef = useRef<MultiplayerGameEngine | null>(null);
  
  // Game state
  const [game, setGame] = useState<MultiplayerGame | null>(null);
  const [position, setPosition] = useState('start');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Time
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  // UI state
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverData, setGameOverData] = useState<{ result: GameResult; termination: GameTermination } | null>(null);

  // Modals
  const [showResignConfirm, setShowResignConfirm] = useState(false);
  const [showDrawOffer, setShowDrawOffer] = useState(false);
  const [pendingDrawOffer, setPendingDrawOffer] = useState(false);

  // Chess instance for local move validation
  const chessRef = useRef(new Chess());

  // Initialize game
  useEffect(() => {
    if (!gameId || !user) return;

    const engine = new MultiplayerGameEngine(gameId, user.id);
    engineRef.current = engine;

    // Set up event handlers
    engine.onUpdate((updatedGame) => {
      setGame(updatedGame);
      setPosition(updatedGame.fen);
      chessRef.current.load(updatedGame.fen);
      
      // Update last move from moves array
      if (updatedGame.moves.length > 0) {
        const lastGameMove = updatedGame.moves[updatedGame.moves.length - 1];
        setLastMove({ from: lastGameMove.from as Square, to: lastGameMove.to as Square });
      }

      // Check for draw offer
      if (updatedGame.drawOfferFrom && updatedGame.drawOfferFrom !== user.id) {
        setPendingDrawOffer(true);
      } else {
        setPendingDrawOffer(false);
      }
    });

    engine.onTimeChange((white, black) => {
      setWhiteTime(white);
      setBlackTime(black);
    });

    engine.onEnd((result, termination) => {
      setGameOverData({ result, termination });
      setShowGameOver(true);
    });

    engine.onErrorOccurred((err) => {
      setError(err.message);
    });

    // Initialize
    const init = async () => {
      setIsLoading(true);
      const initialGame = await engine.initialize();
      
      if (initialGame) {
        setGame(initialGame);
        setPosition(initialGame.fen);
        chessRef.current.load(initialGame.fen);
        setWhiteTime(initialGame.whiteTimeRemainingMs || 0);
        setBlackTime(initialGame.blackTimeRemainingMs || 0);

        if (initialGame.moves.length > 0) {
          const lastGameMove = initialGame.moves[initialGame.moves.length - 1];
          setLastMove({ from: lastGameMove.from as Square, to: lastGameMove.to as Square });
        }
      } else {
        setError('Failed to load game');
      }
      
      setIsLoading(false);
    };

    init();

    return () => {
      engine.disconnect();
    };
  }, [gameId, user]);

  // Get move options for a square
  const getMoveOptions = useCallback((square: Square) => {
    const chess = chessRef.current;
    const moves = chess.moves({ square, verbose: true });
    
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: chess.get(move.to) 
          ? 'rgba(168, 85, 247, 0.6)' 
          : 'rgba(168, 85, 247, 0.35)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(168, 85, 247, 0.5)' };
    setOptionSquares(newSquares);
    return true;
  }, []);

  // Handle square click
  const onSquareClick = useCallback((square: Square) => {
    const engine = engineRef.current;
    if (!engine || !game) return;

    // Check if it's our turn
    if (!engine.isMyTurn) return;

    const chess = chessRef.current;

    // If no piece selected, select one
    if (!moveFrom) {
      const piece = chess.get(square);
      if (piece && piece.color === chess.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }

    // If clicking same square, deselect
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    // Try to make move
    handleMove(moveFrom, square);
  }, [game, moveFrom, getMoveOptions]);

  // Handle piece drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    const engine = engineRef.current;
    if (!engine || !engine.isMyTurn) return false;

    return handleMove(sourceSquare, targetSquare);
  }, []);

  // Make a move
  const handleMove = async (from: string, to: string): Promise<boolean> => {
    const engine = engineRef.current;
    if (!engine) return false;

    // Check for promotion
    const chess = chessRef.current;
    const piece = chess.get(from as Square);
    const isPromotion = piece?.type === 'p' && 
      ((piece.color === 'w' && to[1] === '8') || (piece.color === 'b' && to[1] === '1'));

    const promotion = isPromotion ? 'q' : undefined;

    const result = await engine.makeMove(from, to, promotion);
    
    if (result.success) {
      // Update local state
      setPosition(engine.position);
      chessRef.current.load(engine.position);
      setLastMove({ from: from as Square, to: to as Square });
      setMoveFrom(null);
      setOptionSquares({});
      
      // Play sound
      const move = chess.move({ from: from as Square, to: to as Square, promotion });
      if (move) {
        playSmartMoveSound(chess, move, { isCapture: !!chess.get(to as Square) });
      }
      
      return true;
    } else {
      // Try selecting new piece
      const piece = chess.get(to as Square);
      if (piece && piece.color === chess.turn()) {
        setMoveFrom(to as Square);
        getMoveOptions(to as Square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
      return false;
    }
  };

  // Game actions
  const handleResign = async () => {
    const engine = engineRef.current;
    if (engine) {
      await engine.resign();
      setShowResignConfirm(false);
    }
  };

  const handleOfferDraw = async () => {
    const engine = engineRef.current;
    if (engine) {
      await engine.offerDraw();
      setShowDrawOffer(false);
    }
  };

  const handleAcceptDraw = async () => {
    const engine = engineRef.current;
    if (engine) {
      await engine.acceptDraw();
      setPendingDrawOffer(false);
    }
  };

  const handleDeclineDraw = async () => {
    const engine = engineRef.current;
    if (engine) {
      await engine.declineDraw();
      setPendingDrawOffer(false);
    }
  };

  const handleRematch = async () => {
    const engine = engineRef.current;
    if (engine) {
      const newGameId = await engine.acceptRematch();
      if (newGameId) {
        navigate(`/play/live/${newGameId}`);
      }
    }
  };

  const handleOfferRematch = async () => {
    const engine = engineRef.current;
    if (engine) {
      await engine.offerRematch();
    }
  };

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(168, 85, 247, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(168, 85, 247, 0.4)' },
    }),
  };

  // Determine orientation based on player color
  const orientation = engineRef.current?.myColor === 'b' ? 'black' : 'white';
  const isWhite = engineRef.current?.myColor === 'w';
  const isMyTurn = engineRef.current?.isMyTurn || false;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: 'var(--text-muted)' }}>Please sign in to view this game</p>
          <button onClick={() => navigate('/auth')} className="btn-primary mt-4">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">♟️</div>
          <p style={{ color: 'var(--text-muted)' }}>Loading game...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p style={{ color: 'var(--text-primary)' }}>{error || 'Game not found'}</p>
          <button onClick={() => navigate('/play/friend')} className="btn-primary mt-4">
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/play/friend')}
          className="btn-ghost text-sm"
        >
          ← Back to Lobby
        </button>
        <div className="flex items-center gap-2">
          <span 
            className={`px-3 py-1 rounded-lg text-sm font-medium ${isMyTurn ? 'animate-pulse' : ''}`}
            style={{ 
              background: isMyTurn ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-tertiary)',
              color: isMyTurn ? 'var(--accent-primary)' : 'var(--text-muted)'
            }}
          >
            {isMyTurn ? 'Your turn' : "Opponent's turn"}
          </span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left Side - Player Info & Clock (Opponent) */}
        <div className="w-full lg:w-48 space-y-4">
          <PlayerClock
            player={isWhite ? game.blackPlayer : game.whitePlayer}
            time={isWhite ? blackTime : whiteTime}
            isActive={!isMyTurn && game.status === 'active'}
            color={isWhite ? 'b' : 'w'}
          />
        </div>

        {/* Center - Board */}
        <div className="flex flex-col items-center">
          <div style={{ maxWidth: `${boardSize}px`, width: '100%' }}>
            <Chessboard
              position={position}
              onSquareClick={onSquareClick}
              onPieceDrop={onDrop}
              boardOrientation={orientation}
              customSquareStyles={customSquareStyles}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              animationDuration={150}
              arePiecesDraggable={isMyTurn}
              boardWidth={boardSize}
            />
          </div>
        </div>

        {/* Right Side - Player Info & Clock (You) + Actions */}
        <div className="w-full lg:w-48 space-y-4">
          <PlayerClock
            player={isWhite ? game.whitePlayer : game.blackPlayer}
            time={isWhite ? whiteTime : blackTime}
            isActive={isMyTurn && game.status === 'active'}
            color={isWhite ? 'w' : 'b'}
            isYou
          />

          {/* Game Actions */}
          {game.status === 'active' && (
            <div className="card p-4 space-y-2">
              <button
                onClick={() => setShowDrawOffer(true)}
                className="btn-secondary w-full text-sm"
              >
                ½ Offer Draw
              </button>
              <button
                onClick={() => setShowResignConfirm(true)}
                className="btn-ghost w-full text-sm hover:text-red-500"
              >
                🏳️ Resign
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Move History */}
      {game.moves.length > 0 && (
        <div className="card p-4">
          <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
            Moves
          </h3>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {game.moves.map((move, index) => (
              <span key={index} className="flex items-center">
                {index % 2 === 0 && (
                  <span className="text-xs mr-1" style={{ color: 'var(--text-muted)' }}>
                    {Math.floor(index / 2) + 1}.
                  </span>
                )}
                <span className="px-1.5 py-0.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {move.san}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Draw Offer Received */}
      <AnimatePresence>
        {pendingDrawOffer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 card p-4 flex items-center gap-4 shadow-lg"
            style={{ background: 'var(--bg-primary)' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>
              Opponent offers a draw
            </span>
            <div className="flex gap-2">
              <button onClick={handleAcceptDraw} className="btn-primary text-sm">
                Accept
              </button>
              <button onClick={handleDeclineDraw} className="btn-ghost text-sm">
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resign Confirmation */}
      <AnimatePresence>
        {showResignConfirm && (
          <ConfirmModal
            title="Resign Game?"
            message="Are you sure you want to resign? This will count as a loss."
            confirmLabel="Resign"
            confirmVariant="danger"
            onConfirm={handleResign}
            onCancel={() => setShowResignConfirm(false)}
          />
        )}
      </AnimatePresence>

      {/* Draw Offer Confirmation */}
      <AnimatePresence>
        {showDrawOffer && (
          <ConfirmModal
            title="Offer Draw?"
            message="Your opponent can accept or decline the draw offer."
            confirmLabel="Offer Draw"
            onConfirm={handleOfferDraw}
            onCancel={() => setShowDrawOffer(false)}
          />
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showGameOver && gameOverData && (
          <GameOverModal
            result={gameOverData.result}
            termination={gameOverData.termination}
            game={game}
            isWhite={isWhite}
            onRematch={game.rematchOfferedBy ? handleRematch : handleOfferRematch}
            rematchOffered={!!game.rematchOfferedBy}
            onClose={() => navigate('/play/friend')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function PlayerClock({ 
  player, 
  time, 
  isActive, 
  color,
  isYou = false
}: { 
  player?: { username: string | null; displayName: string | null; rating: number } | null;
  time: number;
  isActive: boolean;
  color: 'w' | 'b';
  isYou?: boolean;
}) {
  const isLowTime = time < 60000; // Less than 1 minute
  const displayTime = isLowTime ? formatTimeWithTenths(time) : formatTime(time);

  return (
    <div 
      className={`card p-4 transition-all ${isActive ? 'ring-2' : ''}`}
      style={{ 
        background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-secondary)',
        borderColor: isActive ? 'var(--accent-primary)' : 'transparent'
      }}
    >
      {/* Player Info */}
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ 
            background: color === 'w' ? '#f0f0f0' : '#2d2d2d',
            color: color === 'w' ? '#2d2d2d' : '#f0f0f0'
          }}
        >
          {color === 'w' ? '♔' : '♚'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {isYou ? 'You' : player?.displayName || player?.username || 'Opponent'}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {player?.rating || '?'} • {getColorName(color)}
          </div>
        </div>
      </div>

      {/* Clock */}
      <div 
        className={`text-3xl font-mono font-bold text-center py-2 rounded-lg ${
          isLowTime && isActive ? 'animate-pulse' : ''
        }`}
        style={{ 
          color: isLowTime ? '#ef4444' : (isActive ? 'var(--accent-primary)' : 'var(--text-primary)'),
          background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-tertiary)'
        }}
      >
        {displayTime}
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="card p-6 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          {message}
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-ghost flex-1">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className={`flex-1 ${confirmVariant === 'danger' ? 'btn-ghost hover:bg-red-500/20 hover:text-red-500' : 'btn-primary'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GameOverModal({
  result,
  termination,
  game,
  isWhite,
  onRematch,
  rematchOffered,
  onClose,
}: {
  result: GameResult;
  termination: GameTermination;
  game: MultiplayerGame;
  isWhite: boolean;
  onRematch: () => void;
  rematchOffered: boolean;
  onClose: () => void;
}) {
  const didWin = (result === 'white_wins' && isWhite) || (result === 'black_wins' && !isWhite);
  const isDraw = result === 'draw';
  
  const terminationLabels: Record<GameTermination, string> = {
    checkmate: 'by checkmate',
    resignation: 'by resignation',
    timeout: 'on time',
    stalemate: 'by stalemate',
    insufficient_material: 'by insufficient material',
    fifty_move_rule: 'by fifty-move rule',
    threefold_repetition: 'by threefold repetition',
    agreement: 'by agreement',
    abandonment: 'by abandonment',
    aborted: 'game aborted',
  };

  // Rating change
  const myRatingBefore = isWhite ? game.whiteRatingBefore : game.blackRatingBefore;
  const myRatingAfter = isWhite ? game.whiteRatingAfter : game.blackRatingAfter;
  const ratingChange = myRatingAfter && myRatingBefore ? myRatingAfter - myRatingBefore : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="card p-8 max-w-md w-full text-center"
      >
        {/* Result Icon */}
        <div className="text-6xl mb-4">
          {isDraw ? '🤝' : didWin ? '🏆' : '😔'}
        </div>

        {/* Result Text */}
        <h2 
          className="text-2xl font-display font-bold mb-2"
          style={{ 
            color: isDraw ? 'var(--text-primary)' : didWin ? '#4ade80' : '#ef4444'
          }}
        >
          {isDraw ? 'Draw!' : didWin ? 'Victory!' : 'Defeat'}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          {terminationLabels[termination]}
        </p>

        {/* Rating Change */}
        {ratingChange !== null && (
          <div className="mb-6">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Rating</div>
            <div className="flex items-center justify-center gap-2">
              <span style={{ color: 'var(--text-secondary)' }}>{myRatingBefore}</span>
              <span>→</span>
              <span 
                className="font-bold"
                style={{ color: ratingChange > 0 ? '#4ade80' : ratingChange < 0 ? '#ef4444' : 'var(--text-primary)' }}
              >
                {myRatingAfter}
              </span>
              <span 
                className="text-sm"
                style={{ color: ratingChange > 0 ? '#4ade80' : '#ef4444' }}
              >
                ({ratingChange > 0 ? '+' : ''}{ratingChange})
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={onRematch} 
            className="btn-primary w-full"
          >
            {rematchOffered ? '♻️ Accept Rematch' : '♻️ Offer Rematch'}
          </button>
          <button onClick={onClose} className="btn-ghost w-full">
            Back to Lobby
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LiveGamePage;






