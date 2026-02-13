import { useNavigate } from 'react-router-dom';

interface NotFoundStateProps {
  title: string;
  description?: string;
  backTo: string;
  backLabel?: string;
}

export function NotFoundState({ title, description, backTo, backLabel = 'Go Back' }: NotFoundStateProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-xl font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm mb-6 max-w-md" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      )}
      <button
        onClick={() => navigate(backTo)}
        className="btn-primary px-6 py-2 rounded-lg text-sm"
      >
        {backLabel}
      </button>
    </div>
  );
}
