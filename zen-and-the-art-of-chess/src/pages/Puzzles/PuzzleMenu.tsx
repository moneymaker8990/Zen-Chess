import type { PatternType } from '@/lib/types';
import { AgentWatching, ContextualAgentTip } from '@/components/AgentPresence';
import { BackButton } from '@/components/BackButton';
import type { PuzzleMode, PuzzleStats, TierLevel } from './types';
import { TIER_CONFIG, THEME_LABELS } from './constants';

interface PuzzleMenuProps {
  stats: PuzzleStats;
  puzzleCount: number;
  levelInfo: { level: number; currentXp: number; xpForNextLevel: number };
  progressPercent: number;
  startMode: (mode: PuzzleMode) => void;
  setMode: (mode: PuzzleMode) => void;
}

export function PuzzleMenu({ stats, puzzleCount, levelInfo, progressPercent, startMode, setMode }: PuzzleMenuProps) {
  const tierConfig = TIER_CONFIG[stats.tier];
  const nextTier = getNextTier(stats.tier);
  const nextTierConfig = nextTier ? TIER_CONFIG[nextTier] : null;
  const progressToNextTier = nextTierConfig
    ? ((stats.rating - tierConfig.minRating) / (nextTierConfig.minRating - tierConfig.minRating)) * 100
    : 100;

  const accuracy = stats.puzzlesSolved + stats.puzzlesFailed > 0
    ? Math.round((stats.puzzlesSolved / (stats.puzzlesSolved + stats.puzzlesFailed)) * 100)
    : 0;

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Back Button */}
      <BackButton fallback="/" className="mb-2" />

      {/* Hero Header */}
      <section className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-1 sm:mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            Puzzle Training
          </h1>
          <span className="hidden sm:inline"><AgentWatching agents={['training', 'pattern']} /></span>
        </div>
        <p className="text-sm sm:text-lg" style={{ color: 'var(--text-tertiary)' }}>
          {puzzleCount.toLocaleString()}+ puzzles to master
        </p>
      </section>

      {/* Agent Tip - hidden on mobile */}
      <div className="hidden sm:block">
        <ContextualAgentTip currentPage="/train" />
      </div>

      {/* Rating & Level Card */}
      <div className="card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Level Badge - Chess.com style */}
            <div
              className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
              }}
            >
              <span className="text-white">{levelInfo.level}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-sm mb-0.5" style={{ color: 'var(--text-muted)' }}>Rating</div>
              <div className="text-xl sm:text-3xl font-display font-bold truncate" style={{ color: tierConfig.color }}>
                {stats.rating.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-sm mt-0.5 break-words" style={{ color: tierConfig.color }}>
                {tierConfig.name} • Level {levelInfo.level}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="stat-value text-gradient text-lg sm:text-2xl">{stats.puzzlesSolved}</div>
            <div className="stat-label text-[10px] sm:text-xs">Solved</div>
          </div>
        </div>

        {/* XP Progress to next level - Chess.com style */}
        <div className="mb-3 sm:mb-4 px-1">
          <div className="flex justify-between text-xs mb-1.5 sm:mb-2" style={{ color: 'var(--text-muted)' }}>
            <span>Level {levelInfo.level}</span>
            <span>{levelInfo.currentXp}/{levelInfo.xpForNextLevel} XP</span>
          </div>
          <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(to right, #4ade80, #22c55e)'
              }}
            />
          </div>
          <div className="text-right text-xs mt-1 sm:mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {levelInfo.xpForNextLevel - levelInfo.currentXp} XP to Level {levelInfo.level + 1}
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTierConfig && (
          <div className="pt-3 sm:pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex justify-between text-xs mb-1.5 sm:mb-2 px-1" style={{ color: 'var(--text-muted)' }}>
              <span className="truncate">{tierConfig.name}</span>
              <span className="ml-2 whitespace-nowrap">{nextTierConfig.name} ({nextTierConfig.minRating})</span>
            </div>
            <div className="progress-bar h-2 sm:h-2.5">
              <div
                className="progress-bar-fill h-full"
                style={{ width: `${Math.min(100, progressToNextTier)}%`, background: tierConfig.color }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        <div className="stat-card p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]">
          <div className="stat-value text-base sm:text-xl mb-1" style={{ color: '#4ade80' }}>{accuracy}%</div>
          <div className="stat-label text-[10px] sm:text-xs text-center">ACCURACY</div>
        </div>
        <div className="stat-card p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]">
          <div className="stat-value text-base sm:text-xl text-gradient mb-1">{stats.currentStreak}</div>
          <div className="stat-label text-[10px] sm:text-xs text-center">STREAK</div>
        </div>
        <div className="stat-card p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]">
          <div className="stat-value text-base sm:text-xl mb-1" style={{ color: '#f59e0b' }}>{stats.bestStreak}</div>
          <div className="stat-label text-[10px] sm:text-xs text-center">BEST</div>
        </div>
        <div className="stat-card p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]">
          <div className="stat-value text-base sm:text-xl mb-1" style={{ color: '#ec4899' }}>{stats.rushHighScore}</div>
          <div className="stat-label text-[10px] sm:text-xs text-center">RUSH</div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4" role="group" aria-label="Puzzle mode selection">
        {/* Rated Puzzles */}
        <button
          onClick={() => startMode('rated')}
          className="card-interactive p-4 sm:p-6 text-left group min-h-[120px] sm:min-h-[160px]"
          aria-label="Rated puzzles - adaptive difficulty based on your skill level"
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
              style={{ background: 'rgba(74, 222, 128, 0.1)' }}
            >
              ♟️
            </div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#4ade80' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-base sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
            Rated
          </h3>
          <p className="text-xs sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#4ade80' }}>
            Adaptive
          </p>
          <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
            Puzzles adapt to your skill level
          </p>
        </button>

        {/* Puzzle Rush */}
        <button
          onClick={() => startMode('rush')}
          className="card-interactive p-4 sm:p-6 text-left group min-h-[120px] sm:min-h-[160px]"
          aria-label="Puzzle Rush - 3 minute time limit, 3 strikes allowed"
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
              style={{ background: 'rgba(249, 115, 22, 0.1)' }}
            >
              🔥
            </div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f97316' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-base sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
            Rush
          </h3>
          <p className="text-xs sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#f97316' }}>
            3 min, 3 strikes
          </p>
          <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
            Race against time!
          </p>
        </button>

        {/* Puzzle Streak */}
        <button
          onClick={() => startMode('streak')}
          className="card-interactive p-4 sm:p-6 text-left group min-h-[120px] sm:min-h-[160px]"
          aria-label="Puzzle Streak - one mistake ends your streak"
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
              style={{ background: 'rgba(236, 72, 153, 0.1)' }}
            >
              ⚡
            </div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ec4899' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-base sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
            Streak
          </h3>
          <p className="text-xs sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#ec4899' }}>
            Don't fail!
          </p>
          <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
            One mistake ends it
          </p>
        </button>

        {/* Daily Puzzle */}
        <button
          onClick={() => startMode('daily')}
          className="card-interactive p-4 sm:p-6 text-left group min-h-[120px] sm:min-h-[160px]"
          disabled={stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0]}
          aria-label={`Daily puzzle - ${stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0] ? 'already completed today' : 'fresh challenge every day'}`}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
              style={{ background: 'rgba(99, 102, 241, 0.1)' }}
            >
              📅
            </div>
            {stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0] ? (
              <span className="badge badge-green text-xs sm:text-sm shrink-0">✓</span>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6366f1' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
          <h3 className="text-base sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
            Daily
          </h3>
          <p className="text-xs sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#6366f1' }}>
            New daily
          </p>
          <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
            Fresh challenge every day
          </p>
        </button>

        {/* Custom Puzzles */}
        <button
          onClick={() => setMode('custom')}
          className="card-interactive p-6 text-left group"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(139, 92, 246, 0.1)' }}
            >
              🎯
            </div>
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#8b5cf6' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            Custom Puzzles
          </h3>
          <p className="text-sm font-display italic mb-2" style={{ color: '#8b5cf6' }}>
            Practice specific themes
          </p>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Filter by tactical theme or difficulty to focus your training.
          </p>
        </button>
      </div>

      {/* Empty State - No Puzzles Available */}
      {puzzleCount === 0 && (
        <div className="card p-8 text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
            style={{ background: 'rgba(99, 102, 241, 0.1)' }}
          >
            🧩
          </div>
          <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            No Puzzles Available
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
            Unable to load puzzles from the database. This may be due to a connection issue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      )}

      {/* Theme Performance */}
      <div className="card p-6">
        <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          Theme Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(THEME_LABELS) as PatternType[]).slice(0, 8).map(theme => {
            const themeStats = stats.themeStats[theme] || { solved: 0, failed: 0 };
            const total = themeStats.solved + themeStats.failed;
            const acc = total > 0 ? Math.round((themeStats.solved / total) * 100) : 0;

            return (
              <div key={theme} className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {THEME_LABELS[theme]}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {themeStats.solved}/{total}
                  </span>
                  <span className="text-xs font-mono" style={{ color: acc >= 70 ? '#4ade80' : acc >= 50 ? '#f59e0b' : '#ef4444' }}>
                    {acc}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getNextTier(tier: TierLevel): TierLevel | null {
  const tiers: TierLevel[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER'];
  const idx = tiers.indexOf(tier);
  return idx < tiers.length - 1 ? tiers[idx + 1] : null;
}
