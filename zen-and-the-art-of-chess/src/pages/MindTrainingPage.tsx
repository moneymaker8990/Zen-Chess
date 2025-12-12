import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// MIND TRAINING PAGE - REDIRECTS TO DAY
// The Mind Training and Daily Practice pages have been merged
// into a single unified page at /day
// ============================================

export function MindTrainingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the unified day page which now includes meditation
    navigate('/day', { replace: true });
  }, [navigate]);

  // Show a brief loading state while redirecting
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-t-transparent border-[var(--accent-primary)] rounded-full animate-spin mx-auto mb-4" />
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to Daily Practice...</p>
      </div>
    </div>
  );
}

export default MindTrainingPage;
