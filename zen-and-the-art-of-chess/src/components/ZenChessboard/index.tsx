// ============================================
// ZEN CHESSBOARD
// Unified chessboard wrapper with sounds, consistent styling,
// and world-class UX across all pages
// ============================================

import { useCallback, useEffect, useRef, useState } from 'react';
import { Chessboard, Square as BoardSquare } from 'react-chessboard';
import { Chess, Square, Move } from 'chess.js';
import { useBoardStyles, useMoveOptions } from '@/state/boardSettingsStore';
import { ChessSounds } from '@/lib/soundSystem';
import { BOARD_COLORS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

interface ZenChessboardProps {
  // Core props
  position: string;
  onMove?: (from: Square, to: Square, promotion?: string) => boolean | void;
  onSquareClick?: (square: Square) => void;
  onSquareRightClick?: (square: Square) => void;
  
  // Display options
  orientation?: 'white' | 'black';
  boardWidth?: number;
  showBoardNotation?: boolean;
  arePiecesDraggable?: boolean;
  
  // Highlighting
  lastMove?: { from: Square; to: Square } | null;
  selectedSquare?: Square | null;
  highlightSquares?: Record<string, React.CSSProperties>;
  optionSquares?: Record<string, React.CSSProperties>;
  
  // Feedback states
  feedbackState?: 'correct' | 'incorrect' | 'check' | null;
  
  // Arrows and annotations
  arrows?: [BoardSquare, BoardSquare][];
  
  // Advanced
  customSquareStyles?: Record<string, React.CSSProperties>;
  animationDuration?: number;
  
  // Game reference for sound detection
  game?: Chess;
  
  // Disable sounds (for specific use cases)
  disableSounds?: boolean;
}

// ============================================
// SOUND HELPER
// ============================================

function playMoveSound(
  game: Chess,
  from: Square,
  to: Square,
  isCapture: boolean
): void {
  // Check for special moves
  const piece = game.get(to);
  
  if (game.isCheckmate()) {
    ChessSounds.checkmate();
    return;
  }
  
  if (game.inCheck()) {
    ChessSounds.check();
    return;
  }
  
  // Check for castling (king moved 2+ squares)
  if (piece?.type === 'k') {
    const fromFile = from.charCodeAt(0);
    const toFile = to.charCodeAt(0);
    if (Math.abs(toFile - fromFile) >= 2) {
      ChessSounds.castle();
      return;
    }
  }
  
  // Check for promotion
  if (piece?.type !== 'p' && from[1] === (piece?.color === 'w' ? '7' : '2')) {
    // Might be a promotion - the original piece was a pawn
    ChessSounds.promote();
    return;
  }
  
  if (isCapture) {
    ChessSounds.capture();
  } else {
    ChessSounds.move();
  }
}

// ============================================
// COMPONENT
// ============================================

export function ZenChessboard({
  position,
  onMove,
  onSquareClick,
  onSquareRightClick,
  orientation = 'white',
  boardWidth = 480,
  showBoardNotation = true,
  arePiecesDraggable = true,
  lastMove = null,
  selectedSquare = null,
  highlightSquares = {},
  optionSquares: externalOptionSquares,
  feedbackState = null,
  arrows = [],
  customSquareStyles: externalCustomStyles = {},
  animationDuration: customAnimationDuration,
  game,
  disableSounds = false,
}: ZenChessboardProps) {
  // Get centralized board styles
  const boardStyles = useBoardStyles();
  const { getMoveOptionsStyle, showMoveHints } = useMoveOptions();
  
  // Local state for option squares if not externally controlled
  const [internalOptionSquares, setInternalOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [rightClickedSquares, setRightClickedSquares] = useState<Record<string, React.CSSProperties>>({});
  
  // Track previous position for animation
  const prevPositionRef = useRef(position);
  
  // Determine option squares (external or internal)
  const optionSquares = externalOptionSquares ?? internalOptionSquares;
  
  // Animation duration - use custom, then settings, then default
  const animationDuration = customAnimationDuration ?? boardStyles.animationDuration ?? 200;
  
  // ============================================
  // MOVE OPTION DOTS (Purple dots for legal moves)
  // ============================================
  
  const getMoveOptions = useCallback((square: Square, currentGame: Chess) => {
    if (!showMoveHints) {
      setInternalOptionSquares({});
      return false;
    }
    
    const moves = currentGame.moves({ square, verbose: true });
    if (moves.length === 0) {
      setInternalOptionSquares({});
      return false;
    }
    
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      const isCapture = !!currentGame.get(move.to as Square);
      newSquares[move.to] = getMoveOptionsStyle(isCapture);
    });
    
    // Highlight the selected square
    newSquares[square] = { 
      backgroundColor: BOARD_COLORS.selected,
    };
    
    setInternalOptionSquares(newSquares);
    return true;
  }, [showMoveHints, getMoveOptionsStyle]);
  
  // Clear options when externally controlled
  const clearOptions = useCallback(() => {
    if (!externalOptionSquares) {
      setInternalOptionSquares({});
    }
  }, [externalOptionSquares]);
  
  // ============================================
  // SQUARE CLICK HANDLING
  // ============================================
  
  const handleSquareClick = useCallback((square: Square) => {
    // Handle right-clicked squares toggle
    if (rightClickedSquares[square]) {
      setRightClickedSquares(prev => {
        const next = { ...prev };
        delete next[square];
        return next;
      });
    }
    
    // Call external handler
    onSquareClick?.(square);
  }, [onSquareClick, rightClickedSquares]);
  
  // ============================================
  // RIGHT CLICK (ANNOTATIONS)
  // ============================================
  
  const handleSquareRightClick = useCallback((square: Square) => {
    setRightClickedSquares(prev => {
      if (prev[square]) {
        const next = { ...prev };
        delete next[square];
        return next;
      }
      return {
        ...prev,
        [square]: { backgroundColor: BOARD_COLORS.hint },
      };
    });
    
    onSquareRightClick?.(square);
  }, [onSquareRightClick]);
  
  // ============================================
  // PIECE DROP HANDLING (with sound)
  // ============================================
  
  const handlePieceDrop = useCallback((
    sourceSquare: BoardSquare,
    targetSquare: BoardSquare,
    piece: string
  ): boolean => {
    if (!onMove) return false;
    
    // Check if it's a capture before the move
    let isCapture = false;
    if (game) {
      isCapture = !!game.get(targetSquare as Square);
    }
    
    // Determine promotion piece
    const promotion = piece[1]?.toLowerCase() === 'p' 
      ? (targetSquare[1] === '8' || targetSquare[1] === '1' ? 'q' : undefined)
      : undefined;
    
    // Execute move through callback
    const result = onMove(sourceSquare as Square, targetSquare as Square, promotion);
    
    // If move was successful, play sound
    if (result !== false && !disableSounds && game) {
      // Create a copy to check the resulting position
      const gameCopy = new Chess(game.fen());
      try {
        gameCopy.move({ 
          from: sourceSquare as Square, 
          to: targetSquare as Square, 
          promotion: promotion as 'q' | 'r' | 'b' | 'n' | undefined
        });
        playMoveSound(gameCopy, sourceSquare as Square, targetSquare as Square, isCapture);
      } catch {
        // Move was valid via callback but we couldn't replay it - still play a sound
        if (isCapture) {
          ChessSounds.capture();
        } else {
          ChessSounds.move();
        }
      }
    }
    
    clearOptions();
    return result !== false;
  }, [onMove, game, disableSounds, clearOptions]);
  
  // ============================================
  // COMBINED SQUARE STYLES
  // ============================================
  
  const combinedSquareStyles: Record<string, React.CSSProperties> = {
    // Option squares (move hints - purple dots)
    ...optionSquares,
    
    // Right-clicked annotation squares
    ...rightClickedSquares,
    
    // Last move highlighting (purple)
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: BOARD_COLORS.lastMove },
      [lastMove.to]: { backgroundColor: BOARD_COLORS.highlight },
    }),
    
    // Selected square (if any)
    ...(selectedSquare && {
      [selectedSquare]: { backgroundColor: BOARD_COLORS.selected },
    }),
    
    // Custom highlights passed in
    ...highlightSquares,
    
    // Feedback states
    ...(feedbackState === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: BOARD_COLORS.correctMove },
    }),
    ...(feedbackState === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: BOARD_COLORS.incorrectMove },
    }),
    ...(feedbackState === 'check' && lastMove && {
      [lastMove.to]: { 
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        boxShadow: 'inset 0 0 0 3px rgba(239, 68, 68, 0.8)',
      },
    }),
    
    // External custom styles (highest priority)
    ...externalCustomStyles,
  };
  
  return (
    <div className="zen-chessboard relative" style={{ width: boardWidth, maxWidth: '100%' }}>
      <Chessboard
        position={position}
        onSquareClick={handleSquareClick}
        onSquareRightClick={handleSquareRightClick}
        onPieceDrop={handlePieceDrop}
        boardOrientation={orientation}
        customSquareStyles={combinedSquareStyles}
        customDarkSquareStyle={boardStyles.customDarkSquareStyle}
        customLightSquareStyle={boardStyles.customLightSquareStyle}
        animationDuration={animationDuration}
        arePiecesDraggable={arePiecesDraggable}
        boardWidth={boardWidth}
        showBoardNotation={showBoardNotation && boardStyles.showCoordinates}
        customArrows={arrows}
      />
    </div>
  );
}

// ============================================
// HOOK: useZenChessboard
// Complete state management for chess games
// ============================================

interface UseZenChessboardOptions {
  initialFen?: string;
  orientation?: 'white' | 'black';
  onMove?: (move: Move) => void;
  onGameOver?: (result: 'checkmate' | 'stalemate' | 'draw' | 'threefold' | 'insufficient') => void;
  disableSounds?: boolean;
}

export function useZenChessboard({
  initialFen,
  orientation = 'white',
  onMove,
  onGameOver,
  disableSounds = false,
}: UseZenChessboardOptions = {}) {
  const [game, setGame] = useState(() => new Chess(initialFen));
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  
  const { getMoveOptionsStyle, showMoveHints } = useMoveOptions();
  
  // Reset game when initial FEN changes
  useEffect(() => {
    if (initialFen) {
      setGame(new Chess(initialFen));
      setMoveFrom(null);
      setOptionSquares({});
      setLastMove(null);
    }
  }, [initialFen]);
  
  // Get legal moves for a square
  const getMoveOptions = useCallback((square: Square) => {
    if (!showMoveHints) {
      setOptionSquares({});
      return game.moves({ square, verbose: true }).length > 0;
    }
    
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      const isCapture = !!game.get(move.to as Square);
      newSquares[move.to] = getMoveOptionsStyle(isCapture);
    });
    newSquares[square] = { backgroundColor: BOARD_COLORS.selected };
    setOptionSquares(newSquares);
    return true;
  }, [game, showMoveHints, getMoveOptionsStyle]);
  
  // Handle square click (click-to-move)
  const handleSquareClick = useCallback((square: Square) => {
    // If no piece selected, try to select
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }
    
    // Clicking same square deselects
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }
    
    // Try to make the move
    try {
      const isCapture = !!game.get(square);
      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });
      
      if (move) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        // Play sound
        if (!disableSounds) {
          playMoveSound(game, moveFrom, square, isCapture);
        }
        
        setGame(new Chess(game.fen()));
        setLastMove({ from: moveFrom, to: square });
        onMove?.(move);
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        // Check for game over
        if (game.isGameOver()) {
          if (game.isCheckmate()) {
            onGameOver?.('checkmate');
          } else if (game.isStalemate()) {
            onGameOver?.('stalemate');
          } else if (game.isDraw()) {
            if (game.isThreefoldRepetition()) {
              onGameOver?.('threefold');
            } else if (game.isInsufficientMaterial()) {
              onGameOver?.('insufficient');
            } else {
              onGameOver?.('draw');
            }
          }
        }
      }
    } catch {
      // Invalid move - try to select new piece
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
        return;
      }
    }
    
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, getMoveOptions, onMove, onGameOver, disableSounds]);
  
  // Handle piece drop (drag-and-drop)
  const handleMove = useCallback((from: Square, to: Square, promotion?: string): boolean => {
    try {
      const isCapture = !!game.get(to);
      const move = game.move({
        from,
        to,
        promotion: promotion as 'q' | 'r' | 'b' | 'n' | undefined,
      });
      
      if (move) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        if (!disableSounds) {
          playMoveSound(game, from, to, isCapture);
        }
        
        setGame(new Chess(game.fen()));
        setLastMove({ from, to });
        setMoveFrom(null);
        setOptionSquares({});
        onMove?.(move);
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        // Check for game over
        if (game.isGameOver()) {
          if (game.isCheckmate()) {
            onGameOver?.('checkmate');
          } else if (game.isStalemate()) {
            onGameOver?.('stalemate');
          } else if (game.isDraw()) {
            onGameOver?.('draw');
          }
        }
        
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, onMove, onGameOver, disableSounds]);
  
  // Make a move programmatically (for puzzles, engine, etc.)
  const makeMove = useCallback((move: string | { from: Square; to: Square; promotion?: string }): boolean => {
    try {
      let from: Square;
      let to: Square;
      let isCapture = false;
      
      if (typeof move === 'string') {
        // SAN or UCI notation
        const result = game.move(move);
        if (result) {
          from = result.from as Square;
          to = result.to as Square;
          isCapture = result.captured !== undefined;
          
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          if (!disableSounds) {
            playMoveSound(game, from, to, isCapture);
          }
          
          setGame(new Chess(game.fen()));
          setLastMove({ from, to });
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
          return true;
        }
      } else {
        from = move.from;
        to = move.to;
        isCapture = !!game.get(to);
        
        const result = game.move({
          from,
          to,
          promotion: move.promotion as 'q' | 'r' | 'b' | 'n' | undefined,
        });
        
        if (result) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          if (!disableSounds) {
            playMoveSound(game, from, to, isCapture);
          }
          
          setGame(new Chess(game.fen()));
          setLastMove({ from, to });
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
          return true;
        }
      }
    } catch {
      return false;
    }
    return false;
  }, [game, disableSounds]);
  
  // Reset to a position
  const reset = useCallback((fen?: string) => {
    setGame(new Chess(fen ?? initialFen));
    setMoveFrom(null);
    setOptionSquares({});
    setLastMove(null);
  }, [initialFen]);
  
  // Undo last move
  const undo = useCallback(() => {
    const move = game.undo();
    if (move) {
      setGame(new Chess(game.fen()));
      setLastMove(null);
      return true;
    }
    return false;
  }, [game]);
  
  return {
    // State
    game,
    position: game.fen(),
    moveFrom,
    optionSquares,
    lastMove,
    turn: game.turn(),
    isCheck: game.inCheck(),
    isCheckmate: game.isCheckmate(),
    isStalemate: game.isStalemate(),
    isDraw: game.isDraw(),
    isGameOver: game.isGameOver(),
    history: game.history(),
    
    // Actions
    handleSquareClick,
    handleMove,
    makeMove,
    reset,
    undo,
    getMoveOptions,
    clearOptions: () => {
      setMoveFrom(null);
      setOptionSquares({});
    },
  };
}

export default ZenChessboard;

