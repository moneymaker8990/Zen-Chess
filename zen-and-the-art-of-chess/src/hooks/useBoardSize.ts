import { useState, useEffect } from 'react';

/**
 * Hook to calculate responsive chessboard size based on container and viewport.
 * Returns the optimal board width in pixels.
 */
export function useBoardSize(
  maxWidth: number = 520,
  padding: number = 32
): number {
  const [boardSize, setBoardSize] = useState(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 400);
    return Math.min(maxWidth, window.innerWidth - padding);
  });

  useEffect(() => {
    const calculateSize = () => {
      const viewportWidth = window.innerWidth;
      
      // Mobile: use almost full width
      if (viewportWidth < 640) {
        setBoardSize(Math.min(maxWidth, viewportWidth - padding));
      }
      // Tablet: constrained width
      else if (viewportWidth < 1024) {
        setBoardSize(Math.min(maxWidth, viewportWidth - 48, 480));
      }
      // Desktop: use max width
      else {
        setBoardSize(maxWidth);
      }
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [maxWidth, padding]);

  return boardSize;
}

/**
 * Hook for board size that responds to a container ref.
 * Useful when the board is in a flex/grid container.
 */
export function useContainerBoardSize(
  containerRef: React.RefObject<HTMLElement>,
  maxWidth: number = 520,
  padding: number = 16
): number {
  const [boardSize, setBoardSize] = useState(Math.min(maxWidth, 400));

  useEffect(() => {
    const calculateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setBoardSize(Math.min(maxWidth, containerWidth - padding));
      } else {
        const viewportWidth = window.innerWidth;
        setBoardSize(Math.min(maxWidth, viewportWidth - 32));
      }
    };

    calculateSize();
    
    // Use ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(calculateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', calculateSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
    };
  }, [containerRef, maxWidth, padding]);

  return boardSize;
}

export default useBoardSize;

