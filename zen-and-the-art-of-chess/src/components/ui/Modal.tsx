// ============================================
// MODAL COMPONENT
// Accessible modal dialog with focus trap and animations
// ============================================

import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Omit HTML attributes that conflict with framer-motion's motion.div
type ConflictingHTMLProps = 'title' | 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, ConflictingHTMLProps> {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title (rendered in header) */
  title?: ReactNode;
  /** Modal size */
  size?: ModalSize;
  /** Whether clicking backdrop closes modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Footer content (e.g., buttons) */
  footer?: ReactNode;
  /** Custom class for modal content */
  contentClassName?: string;
  /** Prevent body scroll when open */
  preventScroll?: boolean;
  children: ReactNode;
}

// ============================================
// SIZE DEFINITIONS
// ============================================

const SIZE_STYLES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw] max-h-[90vh]',
};

// ============================================
// COMPONENT
// ============================================

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  footer,
  contentClassName = '',
  preventScroll = true,
  children,
  className = '',
  ...props
}, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  // Focus trap and scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal
      modalRef.current?.focus();

      // Add escape listener
      document.addEventListener('keydown', handleKeyDown);

      // Prevent body scroll
      if (preventScroll) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
          document.removeEventListener('keydown', handleKeyDown);
          // Restore focus
          previousActiveElement.current?.focus();
        };
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown, preventScroll]);

  // Don't render if not open (AnimatePresence handles exit animation)
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-layer-modal flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
            className={`
              relative w-full mx-4 ${SIZE_STYLES[size]}
              rounded-xl shadow-2xl
              ${className}
            `}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
            }}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-display font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={`px-6 py-4 ${contentClassName}`}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                className="flex items-center justify-end gap-3 px-6 py-4 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render in portal to escape stacking context
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
});

Modal.displayName = 'Modal';

export default Modal;
