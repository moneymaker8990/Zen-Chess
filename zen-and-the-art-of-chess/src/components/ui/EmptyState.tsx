import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionPath,
  onAction,
}: EmptyStateProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="text-6xl mb-4" role="img" aria-hidden="true">
        {icon}
      </div>
      <h3
        className="text-xl font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm max-w-md mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        {description}
      </p>
      {(actionLabel && (actionPath || onAction)) && (
        <button
          onClick={handleAction}
          className="btn-primary px-6 py-3"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}

export default EmptyState;
