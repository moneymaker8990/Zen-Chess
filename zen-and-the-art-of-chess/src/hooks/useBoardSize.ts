import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Calculate mobile-safe board size based on viewport width.
 * This is the SINGLE SOURCE OF TRUTH for board sizing.
 */
function getMobileSize(vw: number, maxWidth: number): number {
  if (vw < 400) {
    // Small phones: 32px total margin (16px each side)
    return Math.min(maxWidth, vw - 32);
  }
  if (vw < 640) {
    // Standard mobile: 48px total margin
    return Math.min(maxWidth, vw - 48);
  }
  if (vw < 1024) {
    // Tablet: 64px margin, cap at 480
    return Math.min(maxWidth, vw - 64, 480);
  }
  // Desktop: use max width
  return maxWidth;
}

/**
 * Hook to calculate responsive chessboard size based on viewport.
 * Returns the optimal board width in pixels.
 * 
 * @param maxWidth - Maximum board size (default 520)
 * @returns Board width in pixels that fits the current viewport
 */
export function useBoardSize(maxWidth: number = 520): number {
  const getSize = useCallback(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 320);
    return getMobileSize(window.innerWidth, maxWidth);
  }, [maxWidth]);

  const [boardSize, setBoardSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setBoardSize(getMobileSize(window.innerWidth, maxWidth));
    };

    // Calculate on mount
    handleResize();
    
    // Listen for resize
    window.addEventListener('resize', handleResize);
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
      // Delay to let orientation change complete
      setTimeout(handleResize, 100);
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]);

  return boardSize;
}

/**
 * Hook for board size that responds to a container ref.
 * Uses the smaller of: container width or viewport-safe size.
 */
export function useContainerBoardSize(
  containerRef: React.RefObject<HTMLElement>,
  maxWidth: number = 520,
  padding: number = 16
): number {
  const [boardSize, setBoardSize] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const calculateSize = () => {
      const vw = window.innerWidth;
      const mobileMax = getMobileSize(vw, maxWidth);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - padding;
        // Use the smaller of container width or mobile-safe size
        setBoardSize(Math.max(200, Math.min(containerWidth, mobileMax)));
      } else {
        // Fallback to viewport-based
        setBoardSize(mobileMax);
      }
    };

    // Initial calculation with small delay for mount
    const timeoutId = setTimeout(calculateSize, 0);
    
    // ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(calculateSize, 10);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', calculateSize);
    
    return () => {
      clearTimeout(timeoutId);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
    };
  }, [containerRef, maxWidth, padding]);

  return boardSize;
}

export default useBoardSize;
