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
  // Initial size based on viewport to prevent flicker - will be updated by measurement
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') return 300;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // On mobile, constrain by both width and height
    // Use at most 55% of viewport height to leave room for UI elements
    // This accounts for: header, page headers, controls, info panels, and padding
    if (vw < 640) {
      const widthBased = vw - 48;
      const heightBased = Math.floor(vh * 0.55);
      return Math.min(widthBased, heightBased, maxWidth);
    }
    return Math.min(maxWidth, 400);
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;

      // Use clientWidth to get the actual available space
      const containerWidth = containerRef.current.clientWidth;

      // Get viewport dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Calculate the maximum safe width on mobile
      // Account for Layout p-4 padding (32px total) plus some buffer
      const mobileSafeMaxWidth = vw < 640 ? vw - 32 : vw;

      // Calculate height-based constraint on mobile
      // Use at most 55% of viewport height to leave room for UI
      let mobileSafeMaxHeight = vh;
      if (vw < 640) {
        // Primary constraint: percentage of viewport
        const percentBased = Math.floor(vh * 0.55);
        // Secondary constraint: based on container position (if board is lower on page, make it smaller)
        const rect = containerRef.current.getBoundingClientRect();
        const positionBased = vh - rect.top - 180; // Leave 180px for content below board
        mobileSafeMaxHeight = Math.min(percentBased, positionBased);
      }

      // Use the smaller of: container width, mobile safe max width, mobile safe max height, or maxWidth
      // Subtract 4px for sub-pixel rendering issues
      const constrainedWidth = Math.min(containerWidth, mobileSafeMaxWidth, mobileSafeMaxHeight, maxWidth);
      const newSize = Math.max(Math.floor(constrainedWidth - 4), 200);

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
    const vh = window.innerHeight;
    // On mobile, use at most 55% of viewport height
    const heightBased = Math.floor(vh * 0.55);
    if (vw < 400) return Math.min(maxWidth, vw - 48, heightBased);
    if (vw < 640) return Math.min(maxWidth, vw - 64, heightBased);
    if (vw < 1024) return Math.min(maxWidth, vw - 80, 480);
    return maxWidth;
  });

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const heightBased = Math.floor(vh * 0.55);
      let newSize: number;
      // On mobile, use at most 55% of viewport height
      if (vw < 400) newSize = Math.min(maxWidth, vw - 48, heightBased);
      else if (vw < 640) newSize = Math.min(maxWidth, vw - 64, heightBased);
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
