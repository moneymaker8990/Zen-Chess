import { useRef, useState, useCallback, useEffect } from 'react';
import { Square } from 'chess.js';

interface UseChessboardDragProps {
  boardRef: React.RefObject<HTMLDivElement>;
  orientation: 'white' | 'black';
  onDrop: (from: Square, to: Square) => boolean;
  disabled?: boolean;
  canDragPiece?: (square: Square) => boolean;
}

interface DragState {
  isDragging: boolean;
  fromSquare: Square | null;
  currentX: number;
  currentY: number;
  offsetX: number;
  offsetY: number;
  piece: string | null;
}

/**
 * Custom drag hook using Pointer Events for accurate coordinate mapping.
 * Fixes mobile touch offset issues by using board-local coordinates.
 */
export function useChessboardDrag({
  boardRef,
  orientation,
  onDrop,
  disabled = false,
  canDragPiece,
}: UseChessboardDragProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    fromSquare: null,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    piece: null,
  });

  const pointerIdRef = useRef<number | null>(null);

  /**
   * Convert pointer coordinates to board square
   */
  const pointerToSquare = useCallback(
    (clientX: number, clientY: number): Square | null => {
      if (!boardRef.current) return null;

      const rect = boardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Check if pointer is within board bounds
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return null;
      }

      const squareSize = rect.width / 8;
      let file = Math.floor(x / squareSize);
      let rank = 7 - Math.floor(y / squareSize);

      // Flip for black orientation
      if (orientation === 'black') {
        file = 7 - file;
        rank = 7 - rank;
      }

      // Clamp to valid range
      file = Math.max(0, Math.min(7, file));
      rank = Math.max(0, Math.min(7, rank));

      return `${'abcdefgh'[file]}${rank + 1}` as Square;
    },
    [boardRef, orientation]
  );

  /**
   * Get the piece element at a given square
   */
  const getPieceElement = useCallback((square: Square): HTMLElement | null => {
    if (!boardRef.current) return null;
    
    // Try to find piece by data attribute or class
    const pieceEl = boardRef.current.querySelector(`[data-square="${square}"]`);
    return pieceEl as HTMLElement | null;
  }, [boardRef]);

  /**
   * Handle pointer down - start drag
   */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || !boardRef.current) return;

      const square = pointerToSquare(e.clientX, e.clientY);
      if (!square) return;

      // Check if we can drag this piece
      if (canDragPiece && !canDragPiece(square)) return;

      const pieceEl = getPieceElement(square);
      if (!pieceEl) return;

      // Get piece data from element
      const piece = pieceEl.getAttribute('data-piece') || '';
      if (!piece) return;

      // Calculate offset from pointer to piece center
      const rect = boardRef.current.getBoundingClientRect();
      const squareSize = rect.width / 8;
      const pieceRect = pieceEl.getBoundingClientRect();
      const centerX = pieceRect.left + pieceRect.width / 2;
      const centerY = pieceRect.top + pieceRect.height / 2;

      // Capture pointer for reliable tracking
      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;

      setDragState({
        isDragging: true,
        fromSquare: square,
        currentX: e.clientX,
        currentY: e.clientY,
        offsetX: e.clientX - centerX,
        offsetY: e.clientY - centerY,
        piece,
      });

      e.preventDefault();
      e.stopPropagation();
    },
    [disabled, boardRef, pointerToSquare, getPieceElement, canDragPiece]
  );

  /**
   * Handle pointer move - update drag position
   */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragState.isDragging || pointerIdRef.current !== e.pointerId) return;

      setDragState((prev) => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY,
      }));

      e.preventDefault();
      e.stopPropagation();
    },
    [dragState.isDragging]
  );

  /**
   * Handle pointer up - complete drag
   */
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragState.isDragging || !dragState.fromSquare || pointerIdRef.current !== e.pointerId) {
        return;
      }

      const toSquare = pointerToSquare(e.clientX, e.clientY);
      
      // Release pointer capture
      const target = e.currentTarget as HTMLElement;
      if (pointerIdRef.current !== null) {
        target.releasePointerCapture(pointerIdRef.current);
      }
      pointerIdRef.current = null;

      // Reset drag state
      setDragState({
        isDragging: false,
        fromSquare: null,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        piece: null,
      });

      // Execute move if valid target square
      if (toSquare && toSquare !== dragState.fromSquare) {
        onDrop(dragState.fromSquare, toSquare);
      }

      e.preventDefault();
      e.stopPropagation();
    },
    [dragState, pointerToSquare, onDrop]
  );

  /**
   * Handle pointer cancel (touch interrupted)
   */
  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current === e.pointerId) {
        const target = e.currentTarget as HTMLElement;
        target.releasePointerCapture(e.pointerId);
        pointerIdRef.current = null;
      }

      setDragState({
        isDragging: false,
        fromSquare: null,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        piece: null,
      });
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pointerIdRef.current = null;
    };
  }, []);

  return {
    dragState,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}

