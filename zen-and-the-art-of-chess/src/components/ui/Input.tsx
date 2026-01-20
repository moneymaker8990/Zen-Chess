// ============================================
// INPUT COMPONENT
// Accessible form input with variants and states
// ============================================

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================
// TYPES
// ============================================

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

interface BaseInputProps {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Icon to show at start */
  startIcon?: ReactNode;
  /** Icon to show at end */
  endIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  /** Number of visible rows */
  rows?: number;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

// ============================================
// STYLE DEFINITIONS
// ============================================

const SIZE_STYLES: Record<InputSize, {
  input: string;
  label: string;
  icon: string;
}> = {
  sm: {
    input: 'px-3 py-1.5 text-sm rounded-md',
    label: 'text-xs mb-1',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'px-4 py-2.5 text-base rounded-lg',
    label: 'text-sm mb-1.5',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'px-5 py-3 text-lg rounded-lg',
    label: 'text-base mb-2',
    icon: 'w-6 h-6',
  },
};

const VARIANT_STYLES: Record<InputVariant, {
  bg: string;
  border: string;
  focus: string;
}> = {
  default: {
    bg: 'var(--bg-primary)',
    border: 'var(--border-default)',
    focus: 'var(--accent-primary)',
  },
  filled: {
    bg: 'var(--bg-tertiary)',
    border: 'transparent',
    focus: 'var(--accent-primary)',
  },
  outlined: {
    bg: 'transparent',
    border: 'var(--border-default)',
    focus: 'var(--accent-primary)',
  },
};

// ============================================
// INPUT COMPONENT
// ============================================

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  size = 'md',
  variant = 'default',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled,
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const sizeStyles = SIZE_STYLES[size];
  const variantStyles = VARIANT_STYLES[variant];
  const hasError = !!error;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-medium ${sizeStyles.label}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Start icon */}
        {startIcon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${sizeStyles.icon}`}
            style={{ color: 'var(--text-muted)' }}
          >
            {startIcon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`
            w-full border transition-all duration-200
            ${sizeStyles.input}
            ${startIcon ? 'pl-10' : ''}
            ${endIcon ? 'pr-10' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${className}
          `}
          style={{
            backgroundColor: variantStyles.bg,
            borderColor: hasError ? 'var(--error)' : variantStyles.border,
            color: 'var(--text-primary)',
            // Focus ring color
            '--tw-ring-color': hasError ? 'var(--error)' : variantStyles.focus,
          } as React.CSSProperties}
          {...props}
        />

        {/* End icon */}
        {endIcon && (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${sizeStyles.icon}`}
            style={{ color: 'var(--text-muted)' }}
          >
            {endIcon}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm"
          style={{ color: 'var(--error)' }}
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// ============================================
// TEXTAREA COMPONENT
// ============================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  error,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  rows = 4,
  autoResize = false,
  disabled,
  className = '',
  id,
  onInput,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const sizeStyles = SIZE_STYLES[size];
  const variantStyles = VARIANT_STYLES[variant];
  const hasError = !!error;

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const target = e.currentTarget;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
    onInput?.(e);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-medium ${sizeStyles.label}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        onInput={handleInput}
        className={`
          w-full border transition-all duration-200 resize-vertical
          ${sizeStyles.input}
          ${autoResize ? 'resize-none overflow-hidden' : ''}
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${className}
        `}
        style={{
          backgroundColor: variantStyles.bg,
          borderColor: hasError ? 'var(--error)' : variantStyles.border,
          color: 'var(--text-primary)',
          '--tw-ring-color': hasError ? 'var(--error)' : variantStyles.focus,
        } as React.CSSProperties}
        {...props}
      />

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm"
          style={{ color: 'var(--error)' }}
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;
