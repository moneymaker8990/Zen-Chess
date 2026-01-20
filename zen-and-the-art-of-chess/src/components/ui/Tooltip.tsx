// ============================================
// TOOLTIP COMPONENT
// Accessible tooltip with positioning and animations
// ============================================

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content */
  content: ReactNode;
  /** Position relative to trigger */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Trigger element */
  children: ReactNode;
  /** Max width of tooltip */
  maxWidth?: number;
}

// ============================================
// POSITION CALCULATIONS
// ============================================

function getTooltipPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
  gap: number = 8
): { x: number; y: number } {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (position) {
    case 'top':
      return {
        x: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
        y: triggerRect.top + scrollY - tooltipRect.height - gap,
      };
    case 'bottom':
      return {
        x: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
        y: triggerRect.bottom + scrollY + gap,
      };
    case 'left':
      return {
        x: triggerRect.left + scrollX - tooltipRect.width - gap,
        y: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      };
    case 'right':
      return {
        x: triggerRect.right + scrollX + gap,
        y: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      };
  }
}

// ============================================
// COMPONENT
// ============================================

export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  disabled = false,
  children,
  maxWidth = 250,
  className = '',
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Calculate position when tooltip becomes visible
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const pos = getTooltipPosition(triggerRect, tooltipRect, position);
      setCoords(pos);
    }
  }, [isVisible, position]);

  const showTooltip = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay, disabled]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Animation variants based on position
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      ...(position === 'top' && { y: 4 }),
      ...(position === 'bottom' && { y: -4 }),
      ...(position === 'left' && { x: 4 }),
      ...(position === 'right' && { x: -4 }),
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.15 }}
          role="tooltip"
          className={`fixed z-[9999] px-3 py-2 text-sm rounded-lg shadow-lg pointer-events-none ${className}`}
          style={{
            left: coords.x,
            top: coords.y,
            maxWidth,
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
          }}
          {...props}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  );
}

export default Tooltip;
