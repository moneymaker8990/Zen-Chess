import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useChessboardDrag } from '@/hooks/useChessboardDrag';

interface CustomDragChessboardProps {
  position: string;
  onPieceDrop: (from: Square, to: Square) => boolean;
  boardOrientation?: 'white' | 'black';
  boardWidth: number;
  customDarkSquareStyle?: React.CSSProperties;
  customLightSquareStyle?: React.CSSProperties;
  customSquareStyles?: Record<string, React.CSSProperties>;
  animationDuration?: number;
  arePiecesDraggable?: boolean;
  snapToCursor?: boolean;
  arePremovesAllowed?: boolean;
  onPieceDragBegin?: () => void;
  onPieceDragEnd?: () => void;
  onSquareClick?: (square: Square) => void;
}

/**
 * Custom drag chessboard that uses Pointer Events for accurate mobile touch handling.
 * Fixes coordinate offset issues on mobile by using board-local coordinate mapping.
 */
export function CustomDragChessboard({
  position,
  onPieceDrop,
  boardOrientation = 'white',
  boardWidth,
  customDarkSquareStyle,
  customLightSquareStyle,
  customSquareStyles,
  animationDuration = 200,
  arePiecesDraggable = true,
  onPieceDragBegin,
  onPieceDragEnd,
  onSquareClick,
}: CustomDragChessboardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const game = useMemo(() => new Chess(position), [position]);

  // Check if a piece can be dragged (must be the side to move)
  const canDragPiece = useCallback(
    (square: Square): boolean => {
      if (!arePiecesDraggable) return false;
      const piece = game.get(square);
      return piece !== undefined && piece !== null && piece.color === game.turn();
    },
    [game, arePiecesDraggable]
  );

  // Custom drag hook
  const { dragState, handlers } = useChessboardDrag({
    boardRef,
    orientation: boardOrientation,
    onDrop: (from, to) => {
      const result = onPieceDrop(from, to);
      return result;
    },
    disabled: !arePiecesDraggable,
    canDragPiece,
  });

  // Call drag begin/end callbacks
  useEffect(() => {
    if (dragState.isDragging && onPieceDragBegin) {
      onPieceDragBegin();
    } else if (!dragState.isDragging && onPieceDragEnd) {
      onPieceDragEnd();
    }
  }, [dragState.isDragging, onPieceDragBegin, onPieceDragEnd]);

  // Prevent scrolling while dragging
  useEffect(() => {
    if (!dragState.isDragging) return;

    const preventDefault = (e: Event) => e.preventDefault();
    
    // Prevent scroll and zoom on mobile while dragging
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('gesturestart', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('gesturestart', preventDefault);
    };
  }, [dragState.isDragging]);

  return (
    <div
      ref={boardRef}
      className="relative select-none"
      style={{
        width: boardWidth,
        height: boardWidth,
        touchAction: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        position: 'relative',
      }}
      {...handlers}
    >
      {/* The actual chessboard - drag disabled, we handle it ourselves */}
      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        customDarkSquareStyle={customDarkSquareStyle as any}
        customLightSquareStyle={customLightSquareStyle as any}
        customSquareStyles={customSquareStyles}
        animationDuration={animationDuration}
        arePiecesDraggable={false} // Disable built-in drag
        onSquareClick={onSquareClick}
        arePremovesAllowed={false}
      />

      {/* Custom drag layer - floating piece that follows pointer */}
      {dragState.isDragging && dragState.piece && boardRef.current && (
        <div
          style={{
            position: 'fixed',
            left: dragState.currentX - dragState.offsetX,
            top: dragState.currentY - dragState.offsetY,
            width: boardWidth / 8,
            height: boardWidth / 8,
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0.8,
            transform: 'scale(1.1)',
            transition: 'none',
          }}
        >
          {/* Render the piece image/svg */}
          <img
            src={getPieceSvgUrl(dragState.piece)}
            alt={dragState.piece}
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Get SVG URL for a piece (using react-chessboard's piece set)
 */
function getPieceSvgUrl(piece: string): string {
  // react-chessboard uses this CDN for pieces
  const baseUrl = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150';
  
  // Piece format: wP, bN, etc.
  const color = piece[0]; // 'w' or 'b'
  const pieceType = piece[1]; // 'P', 'N', 'B', 'R', 'Q', 'K'
  
  return `${baseUrl}/${color}${pieceType}.png`;
}

export default CustomDragChessboard;

