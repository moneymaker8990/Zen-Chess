import { useRef, useState, useEffect, ReactNode } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import type { BoardOrientation } from 'react-chessboard/dist/chessboard/types';

interface ResponsiveBoardProps {
  position: string; // FEN string
  boardOrientation?: BoardOrientation;
  onSquareClick?: (square: Square) => void;
  onPieceDrop?: (sourceSquare: Square, targetSquare: Square) => boolean;
  customSquareStyles?: Record<string, React.CSSProperties>;
  customDarkSquareStyle?: React.CSSProperties;
  customLightSquareStyle?: React.CSSProperties;
  animationDuration?: number;
  arePiecesDraggable?: boolean;
  maxWidth?: number;
  minWidth?: number;
  children?: ReactNode; // For overlays
  showCoordinates?: boolean;
  onPieceClick?: (piece: string, square: Square) => void;
  onPieceDragBegin?: (piece: string, square: Square) => void;
  onPieceDragEnd?: (piece: string, square: Square) => void;
  customPieces?: Record<string, ReactNode>;
  customArrowColor?: string;
  customArrows?: Square[][];
  boardId?: string;
  snapToCursor?: boolean;
}

/**
 * A responsive chessboard wrapper that automatically sizes to fit its container
 * and prevents overflow on mobile devices.
 */
export function ResponsiveBoard({
  position,
  boardOrientation = 'white',
  onSquareClick,
  onPieceDrop,
  customSquareStyles,
  customDarkSquareStyle,
  customLightSquareStyle,
  animationDuration = 200,
  arePiecesDraggable = true,
  maxWidth = 520,
  minWidth = 280,
  children,
  showCoordinates = true,
  onPieceClick,
  onPieceDragBegin,
  onPieceDragEnd,
  customPieces,
  customArrowColor,
  customArrows,
  boardId,
  snapToCursor = true,
}: ResponsiveBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(Math.min(maxWidth, 400));

  useEffect(() => {
    const calculateSize = () => {
      if (!containerRef.current) return;
      
      // Get container width
      const containerWidth = containerRef.current.offsetWidth;
      
      // Calculate board size with padding considerations
      const padding = 0; // Container handles padding
      const availableWidth = containerWidth - padding;
      
      // Clamp to min/max
      const newWidth = Math.max(minWidth, Math.min(maxWidth, availableWidth));
      
      setBoardWidth(newWidth);
    };

    // Initial calculation
    calculateSize();

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to avoid layout thrashing
      requestAnimationFrame(calculateSize);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen for window resize as a fallback
    window.addEventListener('resize', calculateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
    };
  }, [maxWidth, minWidth]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-full overflow-hidden"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div className="relative" style={{ width: `${boardWidth}px`, maxWidth: '100%', margin: '0 auto' }}>
        <Chessboard
          id={boardId}
          position={position}
          boardOrientation={boardOrientation}
          onSquareClick={onSquareClick}
          onPieceDrop={onPieceDrop}
          customSquareStyles={customSquareStyles}
          customDarkSquareStyle={customDarkSquareStyle}
          customLightSquareStyle={customLightSquareStyle}
          animationDuration={animationDuration}
          arePiecesDraggable={arePiecesDraggable}
          boardWidth={boardWidth}
          showBoardNotation={showCoordinates}
          onPieceClick={onPieceClick}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDragEnd={onPieceDragEnd}
          customPieces={customPieces}
          customArrowColor={customArrowColor}
          customArrows={customArrows}
          snapToCursor={snapToCursor}
        />
        {/* Overlay container for feedback, completion, etc. */}
        {children}
      </div>
    </div>
  );
}

export default ResponsiveBoard;





