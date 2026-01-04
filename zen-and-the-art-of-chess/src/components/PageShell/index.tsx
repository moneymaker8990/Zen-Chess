// ============================================
// PAGE SHELL COMPONENT
// Consistent layout wrapper with safe areas and spacing
// ============================================

import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Page title for accessibility */
  title?: string;
  /** Whether to include max-width constraint (default: true) */
  constrained?: boolean;
  /** Custom max width (default: max-w-6xl) */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
  /** Whether to add extra bottom padding for bottom nav (default: false) */
  withBottomNav?: boolean;
  /** Horizontal padding level */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-2 sm:px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
};

/**
 * PageShell provides consistent layout wrapping for all pages:
 * - Safe area padding for notched devices
 * - Consistent horizontal padding (responsive)
 * - Max content width constraint
 * - Proper spacing from system UI
 */
export function PageShell({
  children,
  className = '',
  title,
  constrained = true,
  maxWidth = '6xl',
  withBottomNav = false,
  padding = 'md',
}: PageShellProps) {
  return (
    <div
      className={`
        w-full
        min-h-0
        ${paddingClasses[padding]}
        ${constrained ? `${maxWidthClasses[maxWidth]} mx-auto` : ''}
        ${withBottomNav ? 'pb-20' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role={title ? 'region' : undefined}
      aria-label={title}
    >
      {children}
    </div>
  );
}

/**
 * Section component for consistent vertical spacing within pages
 */
interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Vertical spacing (gap between elements) */
  spacing?: 'sm' | 'md' | 'lg';
  /** Add top margin for separation from previous section */
  marginTop?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
};

const marginTopClasses = {
  none: '',
  sm: 'mt-4',
  md: 'mt-6',
  lg: 'mt-8',
};

export function Section({
  children,
  className = '',
  spacing = 'md',
  marginTop = 'none',
}: SectionProps) {
  return (
    <section
      className={`
        ${spacingClasses[spacing]}
        ${marginTopClasses[marginTop]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </section>
  );
}

/**
 * PageHeader component for consistent page titles
 */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Breadcrumb items (optional) */
  breadcrumbs?: Array<{ label: string; href?: string }>;
  /** Actions to display on the right side */
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-4" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
              {crumb.href ? (
                <a 
                  href={crumb.href} 
                  className="hover:text-white transition-colors"
                  style={{ color: index === breadcrumbs.length - 1 ? 'var(--text-secondary)' : 'var(--text-muted)' }}
                >
                  {crumb.label}
                </a>
              ) : (
                <span style={{ color: index === breadcrumbs.length - 1 ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p 
              className="mt-1 sm:mt-2 text-sm sm:text-lg"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * ContentGrid for responsive grid layouts
 */
interface ContentGridProps {
  children: ReactNode;
  /** Number of columns at different breakpoints */
  cols?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export function ContentGrid({
  children,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = '',
}: ContentGridProps) {
  const gridCols = `
    grid-cols-${cols.default || 1}
    ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''}
    ${cols.md ? `md:grid-cols-${cols.md}` : ''}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
  `;

  return (
    <div className={`grid ${gridCols} ${gapClasses[gap]} ${className}`.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  );
}

export default PageShell;



