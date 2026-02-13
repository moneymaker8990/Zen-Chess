import { useProgressStore } from '@/state/useStore';

export function ProgressSection() {
  const { progress } = useProgressStore();

  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-serif text-zen-200 mb-6">Progress</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zen-800/40 rounded-lg p-4">
          <div className="text-3xl font-serif text-gold-400">{progress.currentDay}</div>
          <div className="text-zen-400 text-sm">Current Day</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-4">
          <div className="text-3xl font-serif text-emerald-400">{progress.completedDays.length}</div>
          <div className="text-zen-400 text-sm">Days Completed</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-4">
          <div className="text-3xl font-serif text-blue-400">{progress.puzzlesSolved}</div>
          <div className="text-zen-400 text-sm">Puzzles Solved</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-4">
          <div className="text-3xl font-serif text-violet-400">{progress.meditationMinutes}</div>
          <div className="text-zen-400 text-sm">Minutes Meditated</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            if (confirm('Reset progress to Day 1? This cannot be undone.')) {
              useProgressStore.setState({
                progress: {
                  ...progress,
                  currentDay: 1,
                  completedDays: [],
                  streakDays: 0,
                }
              });
            }
          }}
          className="zen-button text-sm"
        >
          Reset Progress
        </button>
        <button
          onClick={() => {
            if (confirm('Clear all data including puzzles and meditation? This cannot be undone.')) {
              localStorage.removeItem('zen-chess-progress');
              window.location.reload();
            }
          }}
          className="zen-button text-sm text-red-400 border-red-500/30 hover:border-red-500/50"
        >
          Clear All Data
        </button>
      </div>
    </section>
  );
}
