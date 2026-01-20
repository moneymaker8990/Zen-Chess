/**
 * LiveRegion - Screen reader announcement component
 *
 * Provides an aria-live region for announcing dynamic content changes
 * to screen reader users. Use the `announce` function to trigger announcements.
 *
 * Usage:
 * const { announce, LiveRegion } = useLiveRegion();
 *
 * // In your component:
 * <LiveRegion />
 *
 * // To announce:
 * announce('Your move was correct!');
 */

import { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

interface LiveRegionProps {
  /** Politeness level for announcements */
  'aria-live'?: 'polite' | 'assertive';
  /** Additional class name */
  className?: string;
}

export interface LiveRegionHandle {
  announce: (message: string) => void;
}

/**
 * Visually hidden but accessible live region component
 */
export const LiveRegion = forwardRef<LiveRegionHandle, LiveRegionProps>(
  function LiveRegion({ 'aria-live': ariaLive = 'polite', className }, ref) {
    const [message, setMessage] = useState('');
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const announce = useCallback((newMessage: string) => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear message first to ensure re-announcement works
      setMessage('');

      // Set new message after a brief delay
      requestAnimationFrame(() => {
        setMessage(newMessage);
      });

      // Clear message after announcement
      timeoutRef.current = setTimeout(() => {
        setMessage('');
      }, 3000);
    }, []);

    useImperativeHandle(ref, () => ({
      announce,
    }), [announce]);

    return (
      <div
        role="status"
        aria-live={ariaLive}
        aria-atomic="true"
        className={className}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {message}
      </div>
    );
  }
);

/**
 * Hook for managing live region announcements
 */
export function useLiveRegion() {
  const ref = useRef<LiveRegionHandle>(null);

  const announce = useCallback((message: string) => {
    ref.current?.announce(message);
  }, []);

  const LiveRegionComponent = useCallback(
    (props: Omit<LiveRegionProps, 'ref'>) => <LiveRegion ref={ref} {...props} />,
    []
  );

  return {
    announce,
    LiveRegion: LiveRegionComponent,
    ref,
  };
}

export default LiveRegion;
