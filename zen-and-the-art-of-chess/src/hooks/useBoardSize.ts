import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to calculate responsive chessboard size based on viewport.
 * Returns the optimal board width in pixels.
 * 
 * Mobile-first approach with conservative breakpoints to prevent overflow.
 */
export function useBoardSize(
  maxWidth: number = 520,
  padding: number = 32
): number {
  const calculateInitialSize = useCallback(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 300);
    
    const vw = window.innerWidth;
    
    // Mobile-first: VERY conservative to prevent any overflow
    // Removed height constraints - they were causing issues on mobile
    let size: number;
    
    if (vw < 360) {
      // Very small phones (iPhone SE, small Android)
      size = vw - 40;
    } else if (vw < 400) {
      // Small screens (360-400px)
      size = vw - 36;
    } else if (vw < 480) {
      // Standard small mobile (400-480px)
      size = vw - 32;
    } else if (vw < 640) {
      // Large mobile (480-640px) - account for card padding
      size = vw - 48;
    } else if (vw < 1024) {
      // Tablet
      size = Math.min(vw - 64, 480);
    } else {
      // Desktop: use max width
      size = maxWidth;
    }
    
    return Math.min(maxWidth, size);
  }, [maxWidth]);

  const [boardSize, setBoardSize] = useState(calculateInitialSize);

  useEffect(() => {
    const calculateSize = () => {
      const viewportWidth = window.innerWidth;
      
      let size: number;
      
      // Mobile: VERY conservative width - must fit within viewport with all margins/padding
      if (viewportWidth < 360) {
        // Very small phones - maximum margin
        size = viewportWidth - 40;
      }
      else if (viewportWidth < 400) {
        // Small screens (360-400px)
        size = viewportWidth - 36;
      }
      else if (viewportWidth < 480) {
        // Standard small mobile (400-480px)
        size = viewportWidth - 32;
      }
      else if (viewportWidth < 640) {
        // Large mobile (480-640px) - account for card padding
        size = viewportWidth - 48;
      }
      // Tablet: constrained width
      else if (viewportWidth < 1024) {
        size = Math.min(viewportWidth - 64, 480);
      }
      // Desktop: use max width
      else {
        size = maxWidth;
      }
      
      // Apply max width constraint
      const finalSize = Math.min(maxWidth, size);
      
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
 * 
 * Mobile-optimized: uses viewport-based fallback with conservative margins.
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
        // Subtract padding and ensure minimum size
        const calculatedSize = Math.min(maxWidth, containerWidth - padding);
        
        // For mobile, also check viewport constraints to prevent overflow
        const vw = window.innerWidth;
        let mobileMax: number;
        
        if (vw < 360) {
          mobileMax = vw - 40;
        } else if (vw < 400) {
          mobileMax = vw - 36;
        } else if (vw < 480) {
          mobileMax = vw - 32;
        } else if (vw < 640) {
          mobileMax = vw - 48;
        } else {
          mobileMax = maxWidth;
        }
        
        // Use the smaller of container-based and mobile constraints
        const finalSize = Math.min(calculatedSize, mobileMax);
        
        // Only set if we have a valid positive size
        if (finalSize > 0) {
          setBoardSize(finalSize);
        }
      } else {
        // Fallback to viewport-based calculation
        const viewportWidth = window.innerWidth;
        let size: number;
        
        if (viewportWidth < 360) {
          size = viewportWidth - 40;
        } else if (viewportWidth < 400) {
          size = viewportWidth - 36;
        } else if (viewportWidth < 480) {
          size = viewportWidth - 32;
        } else if (viewportWidth < 640) {
          size = viewportWidth - 48;
        } else {
          size = Math.min(maxWidth, viewportWidth - 64);
        }
        
        setBoardSize(Math.min(maxWidth, size));
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

