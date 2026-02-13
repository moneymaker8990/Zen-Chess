import type { PuzzleMode, PuzzleStats } from './types';

interface PuzzleStatsBarProps {
  mode: PuzzleMode;
  rushActive: boolean;
  rushTimer: number;
  rushStrikes: number;
  rushScore: number;
  streakActive: boolean;
  streakCount: number;
  streakDifficulty: number;
  stats: PuzzleStats;
  lastRatingChange: number | null;
  solveTimer: number;
  levelInfo: { level: number; currentXp: number; xpForNextLevel: number };
  progressPercent: number;
  justLeveledUp: boolean;
  xpGained: number | null;
}

export function PuzzleStatsBar({
  mode,
  rushActive,
  rushTimer,
  rushStrikes,
  rushScore,
  streakActive,
  streakCount,
  streakDifficulty,
  stats,
  lastRatingChange,
  solveTimer,
  levelInfo,
  progressPercent,
  justLeveledUp,
  xpGained,
}: PuzzleStatsBarProps) {
  return (
    <div className="px-4 py-3 shrink-0" style={{ background: 'var(--bg-card)' }}>
      {/* Rush Mode Stats */}
      {mode === 'rush' && rushActive && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold" style={{ color: rushTimer < 30 ? '#ef4444' : 'var(--text-primary)' }}>
                {Math.floor(rushTimer / 60)}:{(rushTimer % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{ background: i < rushStrikes ? '#ef4444' : 'var(--bg-hover)' }}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold" style={{ color: '#4ade80' }}>
              {rushScore}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
          </div>
        </div>
      )}

      {/* Streak Mode Stats */}
      {mode === 'streak' && streakActive && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-mono font-bold" style={{ color: '#ec4899' }}>
              ⚡ {streakCount}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(d => (
                <div
                  key={d}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: d <= streakDifficulty ? '#ec4899' : 'var(--bg-hover)' }}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm" style={{ color: '#f59e0b' }}>Best: {stats.bestStreak}</span>
          </div>
        </div>
      )}

      {/* Standard Mode Stats (Rated/Daily/Custom) */}
      {mode !== 'rush' && mode !== 'streak' && (
        <>
          <div className="flex items-center justify-between mb-2">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats.rating.toLocaleString()}
              </span>
              {lastRatingChange !== null && lastRatingChange !== 0 && (
                <span
                  className="text-sm font-bold animate-fade-in"
                  style={{ color: lastRatingChange > 0 ? '#4ade80' : '#ef4444' }}
                >
                  {lastRatingChange > 0 ? '+' : ''}{lastRatingChange}
                </span>
              )}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono text-sm">
                {Math.floor(solveTimer / 60)}:{(solveTimer % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Level Badge */}
            <div className="flex items-center gap-2">
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{
                  background: justLeveledUp
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: justLeveledUp ? '0 0 20px rgba(251, 191, 36, 0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <span className="text-white">{levelInfo.level}</span>
                {justLeveledUp && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs animate-bounce">
                    ↑
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* XP Progress Bar - Chess.com style */}
          <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(to right, #4ade80, #22c55e)'
              }}
            />
            {xpGained && (
              <div
                className="absolute top-0 h-full rounded-full animate-pulse"
                style={{
                  width: `${(xpGained / levelInfo.xpForNextLevel) * 100}%`,
                  left: `${Math.max(0, progressPercent - (xpGained / levelInfo.xpForNextLevel) * 100)}%`,
                  background: 'rgba(251, 191, 36, 0.5)'
                }}
              />
            )}
          </div>

          {/* XP Text */}
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {levelInfo.currentXp}/{levelInfo.xpForNextLevel} XP
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Level {levelInfo.level + 1}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
