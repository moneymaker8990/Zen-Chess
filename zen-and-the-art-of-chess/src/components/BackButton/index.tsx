import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useNavigationHistory } from '@/state/navigationHistoryStore';

interface BackButtonProps {
  fallback?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A reliable back button that handles navigation history properly.
 * - Uses navigation history store to track actual route changes
 * - If there's history, it goes back to the previous route
 * - If no history (direct link), it navigates to the fallback route
 */
export function BackButton({ 
  fallback = '/', 
  label = 'Back',
  className = '',
  style = {}
}: BackButtonProps) {
  const navigate = useNavigate();
  const { pop: popHistory } = useNavigationHistory();

  const handleBack = useCallback(() => {
    const previousPath = popHistory();
    if (previousPath) {
      navigate(previousPath, { replace: true });
    } else {
      // No history - navigate to fallback
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback, popHistory]);

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
  const { pop: popHistory } = useNavigationHistory();
  
  return useCallback(() => {
    const previousPath = popHistory();
    if (previousPath) {
      navigate(previousPath, { replace: true });
    } else {
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback, popHistory]);
}

export default BackButton;















