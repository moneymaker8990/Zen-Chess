// ============================================
// CARD COMPONENT
// Flexible card container with variants
// ============================================

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';

// ============================================
// TYPES
// ============================================

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive' | 'glass';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card visual variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: CardPadding;
  /** Make card hoverable/clickable */
  hoverable?: boolean;
  /** Full height of container */
  fullHeight?: boolean;
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title text or element */
  title?: ReactNode;
  /** Subtitle or description */
  subtitle?: ReactNode;
  /** Action elements (buttons, etc.) */
  action?: ReactNode;
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Align content */
  align?: 'left' | 'center' | 'right' | 'between';
  children: ReactNode;
}

// ============================================
// STYLE DEFINITIONS
// ============================================

const VARIANT_STYLES: Record<CardVariant, {
  bg: string;
  border?: string;
  shadow?: string;
  backdrop?: string;
}> = {
  default: {
    bg: 'var(--bg-card)',
    border: 'var(--border-subtle)',
  },
  elevated: {
    bg: 'var(--bg-card)',
    border: 'var(--border-subtle)',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  outlined: {
    bg: 'transparent',
    border: 'var(--border-default)',
  },
  interactive: {
    bg: 'var(--bg-card)',
    border: 'var(--border-subtle)',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    backdrop: 'blur(12px)',
  },
};

const PADDING_STYLES: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

// ============================================
// CARD COMPONENT
// ============================================

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  fullHeight = false,
  children,
  className = '',
  style = {},
  ...props
}, ref) => {
  const variantStyle = VARIANT_STYLES[variant];
  const paddingStyle = PADDING_STYLES[padding];

  return (
    <div
      ref={ref}
      className={`
        rounded-xl overflow-hidden
        ${paddingStyle}
        ${fullHeight ? 'h-full' : ''}
        ${hoverable ? 'transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer' : ''}
        ${variant === 'interactive' ? 'hover:border-[var(--accent-primary)] hover:shadow-lg transition-all duration-200' : ''}
        ${className}
      `}
      style={{
        backgroundColor: variantStyle.bg,
        border: variantStyle.border ? `1px solid ${variantStyle.border}` : undefined,
        boxShadow: variantStyle.shadow,
        backdropFilter: variantStyle.backdrop,
        WebkitBackdropFilter: variantStyle.backdrop,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// ============================================
// CARD HEADER
// ============================================

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  title,
  subtitle,
  action,
  children,
  className = '',
  ...props
}, ref) => {
  // If children provided, render them directly
  if (children) {
    return (
      <div
        ref={ref}
        className={`mb-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`flex items-start justify-between gap-4 mb-4 ${className}`}
      {...props}
    >
      <div className="min-w-0">
        {title && (
          <h3
            className="font-display font-medium text-lg truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h3>
        )}
        {subtitle && (
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// ============================================
// CARD FOOTER
// ============================================

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  align = 'right',
  children,
  className = '',
  ...props
}, ref) => {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      ref={ref}
      className={`
        flex items-center gap-3 mt-4 pt-4 border-t
        ${alignStyles[align]}
        ${className}
      `}
      style={{ borderColor: 'var(--border-subtle)' }}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

// ============================================
// CARD CONTENT (for semantic structure)
// ============================================

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  children,
  className = '',
  ...props
}, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export default Card;
