// ============================================
// BADGE COMPONENT
// Status badges and labels with variants
// ============================================

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';

// ============================================
// TYPES
// ============================================

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant/color */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Make badge pill-shaped */
  pill?: boolean;
  /** Icon to show before text */
  icon?: ReactNode;
  /** Dot indicator instead of icon */
  dot?: boolean;
  children: ReactNode;
}

// ============================================
// STYLE DEFINITIONS
// ============================================

const VARIANT_STYLES: Record<BadgeVariant, {
  bg: string;
  text: string;
  border?: string;
}> = {
  default: {
    bg: 'var(--bg-tertiary)',
    text: 'var(--text-secondary)',
    border: 'var(--border-subtle)',
  },
  primary: {
    bg: 'rgba(139, 92, 246, 0.15)',
    text: 'var(--accent-primary)',
  },
  secondary: {
    bg: 'var(--bg-tertiary)',
    text: 'var(--text-muted)',
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.15)',
    text: '#22c55e',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.15)',
    text: '#f59e0b',
  },
  error: {
    bg: 'rgba(239, 68, 68, 0.15)',
    text: '#ef4444',
  },
  info: {
    bg: 'rgba(59, 130, 246, 0.15)',
    text: '#3b82f6',
  },
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const DOT_SIZES: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

// ============================================
// COMPONENT
// ============================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  pill = false,
  icon,
  dot = false,
  children,
  className = '',
  style = {},
  ...props
}, ref) => {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const dotSize = DOT_SIZES[size];

  return (
    <span
      ref={ref}
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${sizeStyle}
        ${pill ? 'rounded-full' : 'rounded-md'}
        ${className}
      `}
      style={{
        backgroundColor: variantStyle.bg,
        color: variantStyle.text,
        border: variantStyle.border ? `1px solid ${variantStyle.border}` : undefined,
        ...style,
      }}
      {...props}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className={`${dotSize} rounded-full flex-shrink-0`}
          style={{ backgroundColor: variantStyle.text }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      {!dot && icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Text */}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

// ============================================
// BADGE GROUP
// ============================================

export interface BadgeGroupProps {
  children: ReactNode;
  /** Gap between badges */
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BadgeGroup({
  children,
  gap = 'sm',
  className = '',
}: BadgeGroupProps) {
  const gapSizes = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <div className={`flex flex-wrap ${gapSizes[gap]} ${className}`}>
      {children}
    </div>
  );
}

export default Badge;
