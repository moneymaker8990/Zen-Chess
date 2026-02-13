interface DataStorageSectionProps {
  sessionCount: number;
  noteCount: number;
  mistakeCount: number;
  weaknessCount: number;
  sparringCount: number;
  streakDays: number;
}

export function DataStorageSection({
  sessionCount,
  noteCount,
  mistakeCount,
  weaknessCount,
  sparringCount,
  streakDays,
}: DataStorageSectionProps) {
  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-serif text-zen-200 mb-4">📦 Your Data</h2>
      <p className="text-zen-400 text-sm mb-4">
        All your data is stored locally in your browser. No account or database needed!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{sessionCount}</div>
          <div className="text-zen-600 text-xs">Study Sessions</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{noteCount}</div>
          <div className="text-zen-600 text-xs">Notes</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{mistakeCount}</div>
          <div className="text-zen-600 text-xs">Mistakes</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{weaknessCount}</div>
          <div className="text-zen-600 text-xs">Weaknesses</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{sparringCount}</div>
          <div className="text-zen-600 text-xs">Spar Positions</div>
        </div>
        <div className="bg-zen-800/40 rounded-lg p-3 text-center">
          <div className="text-xl font-mono text-zen-200">{streakDays}</div>
          <div className="text-zen-600 text-xs">Day Streak</div>
        </div>
      </div>

      <div className="text-xs text-zen-600 space-y-1">
        <p>⚠️ Data is stored in your browser's localStorage.</p>
        <p>• Clearing browser data will erase your progress</p>
        <p>• Using incognito/private mode won't save data</p>
        <p>• Data is specific to this browser on this device</p>
      </div>
    </section>
  );
}
