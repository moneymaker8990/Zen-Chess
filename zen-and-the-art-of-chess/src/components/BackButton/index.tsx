import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

interface BackButtonProps {
  fallback?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A reliable back button that handles navigation history properly.
 * - If there's history, it goes back
 * - If no history (direct link), it navigates to the fallback route
 */
export function BackButton({ 
  fallback = '/', 
  label = 'Back',
  className = '',
  style = {}
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = useCallback(() => {
    // Check if we have history to go back to
    // window.history.length > 2 means there's actual navigation history
    // (browser starts with length 1 or 2 depending on browser)
    if (window.history.length > 2 && document.referrer) {
      navigate(-1);
    } else {
      // No history - navigate to fallback
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback]);

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 text-sm transition-colors duration-150 
        hover:opacity-100 active:scale-[0.98] ${className}`}
      style={{ color: 'var(--text-tertiary)', ...style }}
      type="button"
    >
      <svg 
        className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>{label}</span>
    </button>
  );
}

/**
 * Hook for programmatic back navigation with fallback
 */
export function useBackNavigation(fallback: string = '/') {
  const navigate = useNavigate();
  
  return useCallback(() => {
    if (window.history.length > 2 && document.referrer) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback]);
}

export default BackButton;









