import { ReactNode, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import type { BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { useBoardSize } from '@/hooks/useBoardSize';

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
 * 
 * Uses ResizeObserver to measure actual container width.
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
  maxWidth = 480,
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
  const boardWidth = useBoardSize(containerRef, maxWidth);

  return (
    <div className="board-container" ref={containerRef}>
      <div className="board-wrapper">
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
          boardWidth={boardWidth || 320}
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
