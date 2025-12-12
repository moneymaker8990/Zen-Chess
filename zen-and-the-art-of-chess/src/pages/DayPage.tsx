import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// DAY PAGE - REDIRECTS TO MIND TRAINING
// The Daily Practice and Mind Training pages have been merged
// into a single unified page at /mind
// ============================================

export function DayPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the unified mind training page which includes daily practice
    navigate('/mind', { replace: true });
  }, [navigate]);

  // Show a brief loading state while redirecting
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-t-transparent border-[var(--accent-primary)] rounded-full animate-spin mx-auto mb-4" />
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to Mind Training...</p>
      </div>
    </div>
  );
}

export default DayPage;
