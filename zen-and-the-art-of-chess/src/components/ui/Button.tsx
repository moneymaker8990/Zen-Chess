// ============================================
// BUTTON COMPONENT
// Accessible button with auto-contrast text color
// ============================================

import { forwardRef, useMemo, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { getContrastTextColor } from '@/lib/theme';

// ============================================
// TYPES
// ============================================

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon to show before text */
  leftIcon?: ReactNode;
  /** Icon to show after text */
  rightIcon?: ReactNode;
  /** Custom background color (text color will auto-contrast) */
  bgColor?: string;
  children: ReactNode;
}

// ============================================
// STYLE DEFINITIONS
// ============================================

const VARIANT_STYLES: Record<ButtonVariant, {
  base: string;
  bg: string;
  textColor?: string;
  border?: string;
  hover: string;
}> = {
  primary: {
    base: 'font-medium shadow-lg',
    bg: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
    textColor: '#ffffff',
    hover: 'hover:shadow-xl hover:scale-[1.02]',
  },
  secondary: {
    base: 'font-medium border',
    bg: 'var(--bg-tertiary)',
    border: 'var(--border-default)',
    hover: 'hover:bg-[var(--bg-hover)]',
  },
  destructive: {
    base: 'font-medium shadow-lg',
    bg: 'var(--error)',
    textColor: '#ffffff',
    hover: 'hover:brightness-110',
  },
  ghost: {
    base: 'font-medium',
    bg: 'transparent',
    hover: 'hover:bg-[var(--bg-tertiary)]',
  },
  outline: {
    base: 'font-medium border',
    bg: 'transparent',
    border: 'var(--border-default)',
    hover: 'hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]',
  },
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

// ============================================
// COMPONENT
// ============================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  bgColor,
  disabled,
  className = '',
  style = {},
  children,
  ...props
}, ref) => {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  
  // Compute text color for custom bgColor or specific variants
  const computedTextColor = useMemo(() => {
    if (bgColor) {
      // Use auto-contrast for custom background colors
      return getContrastTextColor(bgColor);
    }
    if (variantStyle.textColor) {
      return variantStyle.textColor;
    }
    // Default to primary text color
    return 'var(--text-primary)';
  }, [bgColor, variantStyle.textColor]);
  
  // Build combined class names
  const combinedClassName = [
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]',
    variantStyle.base,
    variantStyle.hover,
    sizeStyle,
    fullWidth ? 'w-full' : '',
    loading ? 'cursor-wait' : '',
    className,
  ].filter(Boolean).join(' ');
  
  // Build combined styles
  const combinedStyle = {
    background: bgColor || variantStyle.bg,
    color: computedTextColor,
    borderColor: variantStyle.border,
    ...style,
  };
  
  return (
    <button
      ref={ref}
      className={combinedClassName}
      style={combinedStyle}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      
      {/* Left icon */}
      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      
      {/* Button text */}
      <span>{children}</span>
      
      {/* Right icon */}
      {rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

// ============================================
// ICON BUTTON VARIANT
// ============================================

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  /** Icon to display */
  icon: ReactNode;
  /** Accessible label for the button */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const iconSizes: Record<ButtonSize, string> = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <Button
      ref={ref}
      size={size}
      className={`${iconSizes[size]} !p-0 ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

// ============================================
// BUTTON GROUP
// ============================================

export interface ButtonGroupProps {
  children: ReactNode;
  /** Stack buttons vertically on mobile */
  responsive?: boolean;
  /** Gap between buttons */
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ButtonGroup({ 
  children, 
  responsive = false,
  gap = 'md',
  className = '',
}: ButtonGroupProps) {
  const gapSizes = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };
  
  return (
    <div className={`
      flex 
      ${responsive ? 'flex-col sm:flex-row' : 'flex-row'} 
      ${gapSizes[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
}

export default Button;



