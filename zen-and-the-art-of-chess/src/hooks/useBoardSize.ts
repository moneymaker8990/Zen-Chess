import { useState, useEffect } from 'react';

/**
 * Hook to calculate responsive chessboard size based on container and viewport.
 * Returns the optimal board width in pixels.
 * 
 * Properly accounts for mobile viewports with safe margins to prevent overflow.
 */
export function useBoardSize(
  maxWidth: number = 520,
  padding: number = 32
): number {
  const [boardSize, setBoardSize] = useState(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 300);
    const vw = window.innerWidth;
    // Mobile-first: VERY conservative to prevent any overflow
    if (vw < 400) {
      return Math.min(maxWidth, vw - 72);
    }
    if (vw < 480) {
      return Math.min(maxWidth, vw - 68);
    }
    if (vw < 640) {
      return Math.min(maxWidth, vw - 64);
    }
    return Math.min(maxWidth, vw - padding);
  });

  useEffect(() => {
    const calculateSize = () => {
      const viewportWidth = window.innerWidth;
      
      // Mobile: VERY conservative width - must fit within viewport with all margins/padding
      // Account for: Layout p-4 (32px) + page px-2 (16px) + scrollbar (~8px) + safety buffer (16px) = ~72px minimum
      if (viewportWidth < 400) {
        // Very small screens - be very conservative
        setBoardSize(Math.min(maxWidth, viewportWidth - 72));
      }
      else if (viewportWidth < 480) {
        // Small screens - still very conservative  
        setBoardSize(Math.min(maxWidth, viewportWidth - 68));
      }
      else if (viewportWidth < 640) {
        // Small mobile - conservative
        setBoardSize(Math.min(maxWidth, viewportWidth - 64));
      }
      // Tablet: constrained width
      else if (viewportWidth < 1024) {
        setBoardSize(Math.min(maxWidth, viewportWidth - 56, 480));
      }
      // Desktop: use max width
      else {
        setBoardSize(maxWidth);
      }
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    
    // Also handle orientation changes for mobile
    const handleOrientationChange = () => {
      setTimeout(calculateSize, 100); // Wait for orientation change to complete
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
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

