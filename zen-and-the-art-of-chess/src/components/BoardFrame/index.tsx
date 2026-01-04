// ============================================
// BOARD FRAME COMPONENT
// Ensures chess boards fit within viewport bounds
// Maintains square aspect ratio and handles responsive sizing
// ============================================

import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from 'react';

// ============================================
// TYPES
// ============================================

export interface BoardFrameProps {
  /** Maximum board size in pixels */
  maxSize?: number;
  /** Minimum board size in pixels */
  minSize?: number;
  /** Padding around the board */
  padding?: number;
  /** Whether to constrain to viewport height as well */
  constrainToViewportHeight?: boolean;
  /** Additional height to reserve (for controls below board) */
  reservedHeight?: number;
  /** Custom CSS classes */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Child render function that receives computed board size */
  children: (boardSize: number) => ReactNode;
}

// ============================================
// COMPONENT
// ============================================

/**
 * BoardFrame ensures chess boards fit within their container and viewport.
 * It calculates the optimal board size based on available space and constraints.
 * 
 * Usage:
 * ```tsx
 * <BoardFrame maxSize={480}>
 *   {(size) => <Chessboard boardWidth={size} ... />}
 * </BoardFrame>
 * ```
 */
export function BoardFrame({
  maxSize = 480,
  minSize = 240,
  padding = 0,
  constrainToViewportHeight = true,
  reservedHeight = 0,
  className = '',
  style,
  children,
}: BoardFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(Math.min(maxSize, 360));
  
  useEffect(() => {
    const calculateSize = () => {
      if (!containerRef.current) return;
      
      // Get container dimensions
      const containerWidth = containerRef.current.offsetWidth;
      
      // Calculate available width (subtract padding)
      const availableWidth = containerWidth - (padding * 2);
      
      // Calculate available height if constraining to viewport
      let availableHeight = Infinity;
      if (constrainToViewportHeight) {
        // Use dvh if supported, otherwise vh
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        
        // Available height = viewport - top position - reserved - safe area - padding
        const safeAreaBottom = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--safe-bottom') || '0'
        ) || 0;
        
        availableHeight = viewportHeight - containerTop - reservedHeight - safeAreaBottom - (padding * 2);
      }
      
      // Board size is the minimum of available width, available height, and maxSize
      // (board is always square)
      let newSize = Math.min(availableWidth, availableHeight, maxSize);
      
      // Enforce minimum size
      newSize = Math.max(newSize, minSize);
      
      // Round to avoid subpixel rendering issues
      newSize = Math.floor(newSize);
      
      setBoardSize(newSize);
    };
    
    // Initial calculation
    calculateSize();
    
    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateSize);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Also listen for window resize and orientation change
    window.addEventListener('resize', calculateSize);
    window.addEventListener('orientationchange', calculateSize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
      window.removeEventListener('orientationchange', calculateSize);
    };
  }, [maxSize, minSize, padding, constrainToViewportHeight, reservedHeight]);
  
  return (
    <div
      ref={containerRef}
      className={`board-frame w-full ${className}`}
      style={{
        maxWidth: `${maxSize}px`,
        ...style,
      }}
    >
      <div
        className="board-frame-inner relative mx-auto"
        style={{
          width: `${boardSize}px`,
          height: `${boardSize}px`,
          maxWidth: '100%',
          aspectRatio: '1',
          overflow: 'hidden',
        }}
      >
        {children(boardSize)}
      </div>
    </div>
  );
}

// ============================================
// HOOK: useBoardSize
// For cases where you need the size but not the wrapper
// ============================================

export interface UseBoardSizeOptions {
  maxSize?: number;
  minSize?: number;
  padding?: number;
  constrainToViewportHeight?: boolean;
  reservedHeight?: number;
}

/**
 * Hook version for getting optimal board size without the wrapper component.
 * 
 * Usage:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const boardSize = useOptimalBoardSize(containerRef, { maxSize: 480 });
 * ```
 */
export function useOptimalBoardSize(
  containerRef: React.RefObject<HTMLElement>,
  options: UseBoardSizeOptions = {}
): number {
  const {
    maxSize = 480,
    minSize = 240,
    padding = 0,
    constrainToViewportHeight = true,
    reservedHeight = 0,
  } = options;
  
  const [boardSize, setBoardSize] = useState(Math.min(maxSize, 360));
  
  useEffect(() => {
    const calculateSize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const availableWidth = containerWidth - (padding * 2);
      
      let availableHeight = Infinity;
      if (constrainToViewportHeight) {
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const safeAreaBottom = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--safe-bottom') || '0'
        ) || 0;
        
        availableHeight = viewportHeight - containerTop - reservedHeight - safeAreaBottom - (padding * 2);
      }
      
      let newSize = Math.min(availableWidth, availableHeight, maxSize);
      newSize = Math.max(newSize, minSize);
      newSize = Math.floor(newSize);
      
      setBoardSize(newSize);
    };
    
    calculateSize();
    
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateSize);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', calculateSize);
    window.addEventListener('orientationchange', calculateSize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
      window.removeEventListener('orientationchange', calculateSize);
    };
  }, [containerRef, maxSize, minSize, padding, constrainToViewportHeight, reservedHeight]);
  
  return boardSize;
}

export default BoardFrame;



