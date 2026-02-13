import { useNavigate } from 'react-router-dom';

export function LegalSection() {
  const navigate = useNavigate();

  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-serif text-zen-200 mb-4">Legal</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate('/privacy')}
          className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => navigate('/terms')}
          className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
        >
          Terms of Service
        </button>
      </div>
      <p className="text-zen-600 text-xs mt-4">
        Version 1.0.0 • © 2025 Zen Chess
      </p>
    </section>
  );
}
