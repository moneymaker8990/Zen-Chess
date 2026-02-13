import type { FeedbackType, HintLevel } from './types';

interface PuzzleControlsProps {
  feedback: FeedbackType;
  hintLevel: HintLevel;
  onHint: () => void;
  onReset: () => void;
  onForwardOrNext: () => void;
}

export function PuzzleControls({
  feedback,
  hintLevel,
  onHint,
  onReset,
  onForwardOrNext,
}: PuzzleControlsProps) {
  return (
    <div className="flex items-center justify-around py-3 border-t shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-primary)' }}>
      {/* Hint Button */}
      <button
        onClick={onHint}
        disabled={feedback === 'complete'}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
        style={{ color: hintLevel > 0 ? '#fbbf24' : 'var(--text-secondary)' }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-xs">Hint</span>
      </button>

      {/* Back/Reset Button */}
      <button
        onClick={onReset}
        disabled={feedback === 'complete'}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
        style={{ color: 'var(--text-secondary)' }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-xs">Back</span>
      </button>

      {/* Forward/Next Button */}
      <button
        onClick={onForwardOrNext}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors"
        style={{ color: feedback === 'complete' ? '#4ade80' : 'var(--text-secondary)' }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-xs">{feedback === 'complete' ? 'Next' : 'Forward'}</span>
      </button>
    </div>
  );
}
