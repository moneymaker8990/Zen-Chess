// ============================================
// NOT FOUND PAGE
// 404 error page with helpful navigation
// ============================================

import { useNavigate, useLocation } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Suggest pages based on the attempted URL
  const getSuggestions = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('puzzle') || path.includes('train')) {
      return [
        { path: '/train', label: 'Puzzles', icon: '🧩' },
        { path: '/daily-challenges', label: 'Daily Challenges', icon: '📅' },
      ];
    }
    if (path.includes('play') || path.includes('game')) {
      return [
        { path: '/play', label: 'Play vs Engine', icon: '♟️' },
        { path: '/play/friend', label: 'Play with Friend', icon: '👥' },
      ];
    }
    if (path.includes('learn') || path.includes('course') || path.includes('study')) {
      return [
        { path: '/courses', label: 'Courses', icon: '📚' },
        { path: '/beginner', label: 'Beginner Guide', icon: '🌱' },
        { path: '/learn/basics', label: 'Chess Basics', icon: '📖' },
      ];
    }
    if (path.includes('open')) {
      return [
        { path: '/openings', label: 'Opening Explorer', icon: '📖' },
      ];
    }
    if (path.includes('legend') || path.includes('great')) {
      return [
        { path: '/greats', label: 'Play the Greats', icon: '👑' },
      ];
    }
    
    // Default suggestions
    return [
      { path: '/', label: 'Home', icon: '🏠' },
      { path: '/train', label: 'Puzzles', icon: '🧩' },
      { path: '/play', label: 'Play', icon: '♟️' },
      { path: '/courses', label: 'Courses', icon: '📚' },
    ];
  };

  const suggestions = getSuggestions();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      {/* Error Icon */}
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
        style={{ background: 'rgba(168, 85, 247, 0.15)' }}
      >
        🔍
      </div>

      {/* Error Message */}
      <h1 className="text-3xl font-display font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
        Page Not Found
      </h1>
      <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
        We couldn't find what you were looking for.
      </p>
      <p className="text-sm mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        {location.pathname}
      </p>

      {/* Suggestions */}
      <div className="w-full max-w-md">
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          Maybe you were looking for:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.path}
              onClick={() => navigate(suggestion.path)}
              className="card p-4 hover:border-[var(--accent-primary)]/50 transition-all hover:scale-[1.02] text-left"
            >
              <span className="text-2xl mb-2 block">{suggestion.icon}</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {suggestion.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary px-6 py-2"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-primary px-6 py-2"
        >
          Go Home
        </button>
      </div>

      {/* Fun Chess Fact */}
      <div className="mt-12 p-4 rounded-xl max-w-md" style={{ background: 'var(--bg-tertiary)' }}>
        <p className="text-sm italic" style={{ color: 'var(--text-tertiary)' }}>
          "In chess, even a pawn can become a queen." 
          <br />
          <span className="text-xs">— Unknown</span>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;




