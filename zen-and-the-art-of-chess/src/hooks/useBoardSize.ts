import { useState, useEffect, useCallback, useRef } from 'react';

// UI heights to account for when calculating board size
const HEADER_HEIGHT = 64; // Mobile header
const BOTTOM_NAV_HEIGHT = 80; // Bottom nav + safe area estimate
const CONTROLS_HEIGHT = 120; // Move controls, status, etc.

/**
 * Hook to calculate responsive chessboard size based on container and viewport.
 * Returns the optimal board width in pixels.
 * 
 * Now accounts for BOTH width AND height constraints to prevent:
 * - Horizontal overflow (board wider than viewport)
 * - Vertical clipping (board taller than available space)
 */
export function useBoardSize(
  maxWidth: number = 520,
  padding: number = 32
): number {
  const calculateInitialSize = useCallback(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 300);
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Calculate available height (viewport - header - nav - controls)
    const availableHeight = vh - HEADER_HEIGHT - BOTTOM_NAV_HEIGHT - CONTROLS_HEIGHT;
    
    // Mobile-first: VERY conservative to prevent any overflow
    let widthBased: number;
    if (vw < 400) {
      widthBased = vw - 48; // Very small screens
    } else if (vw < 480) {
      widthBased = vw - 40;
    } else if (vw < 640) {
      widthBased = vw - 32;
    } else if (vw < 1024) {
      widthBased = Math.min(vw - 48, 480);
    } else {
      widthBased = maxWidth;
    }
    
    // Board must fit BOTH width and height constraints
    // Use the smaller of width-based and height-based calculations
    const heightBased = Math.max(280, availableHeight - 32);
    
    return Math.min(maxWidth, widthBased, heightBased);
  }, [maxWidth]);

  const [boardSize, setBoardSize] = useState(calculateInitialSize);

  useEffect(() => {
    const calculateSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate available height
      const availableHeight = viewportHeight - HEADER_HEIGHT - BOTTOM_NAV_HEIGHT - CONTROLS_HEIGHT;
      
      let widthBased: number;
      
      // Mobile: VERY conservative width - must fit within viewport with all margins/padding
      if (viewportWidth < 400) {
        // Very small screens (320-400px) - max padding reduction
        widthBased = viewportWidth - 48;
      }
      else if (viewportWidth < 480) {
        // Small screens (400-480px)
        widthBased = viewportWidth - 40;
      }
      else if (viewportWidth < 640) {
        // Small mobile (480-640px)
        widthBased = viewportWidth - 32;
      }
      // Tablet: constrained width
      else if (viewportWidth < 1024) {
        widthBased = Math.min(viewportWidth - 48, 480);
      }
      // Desktop: use max width
      else {
        widthBased = maxWidth;
      }
      
      // Height constraint: board should fit in available vertical space
      const heightBased = Math.max(280, availableHeight - 32);
      
      // Use the minimum of width, height, and max constraints
      const finalSize = Math.min(maxWidth, widthBased, heightBased);
      
      setBoardSize(finalSize);
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    
    // Also handle orientation changes for mobile
    const handleOrientationChange = () => {
      setTimeout(calculateSize, 150); // Wait for orientation change to complete
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle visual viewport changes (keyboard, etc)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateSize);
    }
    
    return () => {
      window.removeEventListener('resize', calculateSize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateSize);
      }
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
  // Initialize to 0 to indicate container hasn't mounted yet
  const [boardSize, setBoardSize] = useState(0);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const calculateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Ensure we never get negative values - use minimum of 280px
        const calculatedSize = Math.max(280, Math.min(maxWidth, containerWidth - padding));
        setBoardSize(calculatedSize);
      } else {
        const viewportWidth = window.innerWidth;
        const calculatedSize = Math.max(280, Math.min(maxWidth, viewportWidth - 32));
        setBoardSize(calculatedSize);
      }
    };

    // Small delay to ensure container is mounted
    const timeoutId = setTimeout(calculateSize, 0);
    
    // Use ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(() => {
      // Clear any pending debounce timeout before creating a new one
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      // Debounce resize calculations
      debounceTimeoutRef.current = setTimeout(calculateSize, 10);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', calculateSize);
    return () => {
      clearTimeout(timeoutId);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
    };
  }, [containerRef, maxWidth, padding]);

  return boardSize;
}

export default useBoardSize;

