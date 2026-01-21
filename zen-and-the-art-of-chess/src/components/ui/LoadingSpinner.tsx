import { motion } from 'framer-motion';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses: Record<SpinnerSize, { spinner: string; text: string }> = {
  xs: { spinner: 'w-3 h-3', text: 'text-xs' },
  sm: { spinner: 'w-4 h-4', text: 'text-xs' },
  md: { spinner: 'w-8 h-8', text: 'text-sm' },
  lg: { spinner: 'w-12 h-12', text: 'text-base' },
  xl: { spinner: 'w-16 h-16', text: 'text-lg' },
};

export function LoadingSpinner({
  size = 'md',
  label,
  className = '',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const { spinner: spinnerSize, text: textSize } = sizeClasses[size];

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <svg
        className={`animate-spin ${spinnerSize}`}
        fill="none"
        viewBox="0 0 24 24"
        style={{ color: 'var(--accent-primary)' }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {label && (
        <p className={textSize} style={{ color: 'var(--text-muted)' }}>
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

export default LoadingSpinner;
