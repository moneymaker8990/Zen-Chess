import type { PuzzleMode, PuzzleStats } from './types';

interface PuzzleGameOverProps {
  isRushOver: boolean;
  rushStrikes: number;
  rushScore: number;
  streakCount: number;
  stats: PuzzleStats;
  startMode: (mode: PuzzleMode) => void;
  onBackToMenu: () => void;
}

export function PuzzleGameOver({
  isRushOver,
  rushStrikes,
  rushScore,
  streakCount,
  stats,
  startMode,
  onBackToMenu,
}: PuzzleGameOverProps) {
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center animate-fade-in">
      <div className="card p-8 text-center max-w-md">
        <div className="text-5xl mb-4">{isRushOver ? '🏆' : '⚡'}</div>
        <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
          {isRushOver ? (rushStrikes >= 3 ? 'Game Over!' : "Time's Up!") : 'Streak Ended!'}
        </h2>
        <div className="text-4xl font-display font-bold mb-4" style={{ color: isRushOver ? '#4ade80' : '#ec4899' }}>
          {isRushOver ? `${rushScore} Puzzles` : `${streakCount} in a row`}
        </div>
        {isRushOver && rushScore === stats.rushHighScore && rushScore > 0 && (
          <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New High Score!</p>
        )}
        {!isRushOver && streakCount >= stats.bestStreak && (
          <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New Best Streak!</p>
        )}
        <div className="flex gap-4 justify-center">
          <button onClick={() => isRushOver ? startMode('rush') : startMode('streak')} className="btn-primary">
            Play Again
          </button>
          <button onClick={onBackToMenu} className="btn-ghost">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
