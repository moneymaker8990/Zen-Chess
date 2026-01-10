import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Hook to calculate responsive chessboard size by MEASURING the actual container.
 * 
 * This is the Lichess approach: let the container determine the size,
 * don't guess based on viewport width.
 * 
 * @param containerRef - Ref to the container element that holds the board
 * @param maxWidth - Maximum board size (default 480)
 * @returns Board width in pixels that fits the container
 */
export function useBoardSize(
  containerRef: RefObject<HTMLElement>,
  maxWidth: number = 480
): number {
  const [size, setSize] = useState(Math.min(maxWidth, 320));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      
      // Use clientWidth to get the actual available space (excludes scrollbars/borders)
      const containerWidth = containerRef.current.clientWidth;
      // Subtract a small buffer (8px) to ensure board never exceeds container
      const availableWidth = containerWidth - 8;
      // Use the smaller of available width or maxWidth
      const newSize = Math.min(availableWidth, maxWidth);
      
      // Only update if changed to prevent unnecessary re-renders
      setSize(prev => prev !== newSize ? newSize : prev);
    };

    // Initial measurement after mount
    // Use RAF to ensure DOM has painted
    rafRef.current = requestAnimationFrame(() => {
      measure();
    });

    // ResizeObserver for container changes
    const observer = new ResizeObserver(() => {
      // Debounce with RAF
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also listen for window resize as backup
    window.addEventListener('resize', measure);
    
    // Handle orientation changes
    const handleOrientation = () => {
      setTimeout(measure, 100);
    };
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, [containerRef, maxWidth]);

  return size;
}

/**
 * Legacy hook for backward compatibility.
 * Provides a viewport-based fallback when no container ref is available.
 * 
 * @deprecated Use useBoardSize with containerRef instead
 */
export function useBoardSizeViewport(maxWidth: number = 480): number {
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') return Math.min(maxWidth, 320);
    const vw = window.innerWidth;
    if (vw < 400) return Math.min(maxWidth, vw - 48);
    if (vw < 640) return Math.min(maxWidth, vw - 64);
    if (vw < 1024) return Math.min(maxWidth, vw - 80, 480);
    return maxWidth;
  });

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth;
      let newSize: number;
      if (vw < 400) newSize = Math.min(maxWidth, vw - 48);
      else if (vw < 640) newSize = Math.min(maxWidth, vw - 64);
      else if (vw < 1024) newSize = Math.min(maxWidth, vw - 80, 480);
      else newSize = maxWidth;
      setSize(newSize);
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [maxWidth]);

  return size;
}

export default useBoardSize;
