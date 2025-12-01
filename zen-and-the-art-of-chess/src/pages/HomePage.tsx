import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { phaseInfo, getDayByNumber } from '@/data/days';
import { useState, useMemo } from 'react';

// ============================================
// ENHANCED HOME PAGE - Chess.com Style Dashboard
// ============================================

interface GameRecord {
  id: string;
  date: number;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  accuracy?: number;
  mode: string;
  timeControl?: string;
}

export function HomePage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  
  const currentDayData = getDayByNumber(progress.currentDay);
  const currentPhase = currentDayData?.phase || 'CALM_MIND';
  const phaseData = phaseInfo[currentPhase];

  // Load game history from localStorage
  const [gameHistory] = useState<GameRecord[]>(() => {
    const saved = localStorage.getItem('zenChessGameHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Load puzzle stats
  const puzzleStats = useMemo(() => {
    const saved = localStorage.getItem('zenChessPuzzleStats');
    if (!saved) return { rating: 1000, currentStreak: 0, bestStreak: 0, puzzlesSolved: 0, rushHighScore: 0 };
    return JSON.parse(saved);
  }, []);

  const getPhaseProgress = () => {
    const phaseRanges: Record<string, [number, number]> = {
      CALM_MIND: [1, 60],
      PATTERN_RECOGNITION: [61, 120],
      STRATEGY_PLANNING: [121, 200],
      FLOW_INTUITION: [201, 260],
      EGO_TRANSCENDENCE: [261, 300],
      EFFORTLESS_ACTION: [301, 365],
    };
    const [start, end] = phaseRanges[currentPhase] || [1, 60];
    const progressInPhase = progress.currentDay - start;
    const phaseLength = end - start + 1;
    return Math.round((progressInPhase / phaseLength) * 100);
  };

  // Calculate overall accuracy from game history
  const overallAccuracy = useMemo(() => {
    const gamesWithAccuracy = gameHistory.filter(g => g.accuracy !== undefined);
    if (gamesWithAccuracy.length === 0) return 0;
    return Math.round(gamesWithAccuracy.reduce((acc, g) => acc + (g.accuracy || 0), 0) / gamesWithAccuracy.length);
  }, [gameHistory]);

  // Recent activity (last 5)
  const recentGames = gameHistory.slice(0, 5);

  // Calculate XP for journey
  const totalXP = progress.puzzlesSolved + progress.currentDay;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
            Welcome back
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Continue your journey to chess mastery
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
            <span className="text-xl">🔥</span>
            <span className="font-bold text-lg" style={{ color: '#f59e0b' }}>{progress.streakDays}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>day streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
            <span className="text-xl">⭐</span>
            <span className="font-bold text-lg" style={{ color: 'var(--accent-primary)' }}>{totalXP}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>XP</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Primary Actions Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Play Chess Card */}
            <button
              onClick={() => navigate('/play')}
              className="card-interactive p-6 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(129, 182, 76, 0.1) 0%, rgba(129, 182, 76, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(129, 182, 76, 0.2)' }}
                >
                  ♟️
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                    Play Chess
                  </h3>
                  <p className="text-sm" style={{ color: '#81b64c' }}>
                    vs Engine or Analyze
                  </p>
                </div>
                <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#81b64c' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Puzzles Card */}
            <button
              onClick={() => navigate('/train')}
              className="card-interactive p-6 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                >
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                    Solve Puzzles
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>
                      {puzzleStats.puzzlesSolved.toLocaleString()}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>solved</span>
                    {puzzleStats.currentStreak > 0 && (
                      <span className="text-sm" style={{ color: '#f59e0b' }}>
                        🔥 {puzzleStats.currentStreak}
                      </span>
                    )}
                  </div>
                </div>
                <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f59e0b' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Today's Lesson Card */}
          {currentDayData && (
            <div className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}
                  >
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge badge-purple">Day {progress.currentDay}</span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{phaseData.name}</span>
                    </div>
                    <h2 className="text-lg font-display font-medium" style={{ color: 'var(--text-primary)' }}>
                      {currentDayData.title}
                    </h2>
                    <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                      "{currentDayData.theme}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/day')}
                  className="btn-primary"
                >
                  Begin Lesson →
                </button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--text-muted)' }}>Phase Progress</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{getPhaseProgress()}%</span>
                </div>
                <div className="progress-bar h-1.5">
                  <div className="progress-bar-fill purple" style={{ width: `${getPhaseProgress()}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/journey')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all group"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Journey</span>
            </button>
            <button
              onClick={() => navigate('/openings')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all group"
            >
              <div className="text-2xl mb-2">📚</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Openings</span>
            </button>
            <button
              onClick={() => navigate('/patterns')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all group"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Patterns</span>
            </button>
            <button
              onClick={() => navigate('/greats')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all group"
            >
              <div className="text-2xl mb-2">👑</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Legends</span>
            </button>
          </div>

          {/* Mental Game Quick Access */}
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/mind')}
              className="card-interactive p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(6, 182, 212, 0.12)' }}
                >
                  🧘
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Mind Training</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {progress.meditationMinutes} min meditated
                  </p>
                </div>
              </div>
            </button>
            <button
              onClick={() => navigate('/calm-play')}
              className="card-interactive p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(236, 72, 153, 0.12)' }}
                >
                  ❤️
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Calm Play Mode</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Anti-tilt with breathing</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="card p-6">
            <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Puzzle Rating</span>
                <span className="font-bold text-lg" style={{ color: '#f59e0b' }}>{puzzleStats.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Best Streak</span>
                <span className="font-bold" style={{ color: '#ec4899' }}>{puzzleStats.bestStreak}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Rush High Score</span>
                <span className="font-bold" style={{ color: '#8b5cf6' }}>{puzzleStats.rushHighScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Journey Day</span>
                <span className="font-bold" style={{ color: '#4ade80' }}>{progress.currentDay}/365</span>
              </div>
              {overallAccuracy > 0 && (
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Game Accuracy</span>
                  <span className="font-bold" style={{ color: overallAccuracy >= 80 ? '#4ade80' : overallAccuracy >= 60 ? '#f59e0b' : '#ef4444' }}>
                    {overallAccuracy}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {recentGames.length > 0 && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Recent Games
                </h3>
                <button 
                  onClick={() => navigate('/games')}
                  className="text-xs" 
                  style={{ color: 'var(--accent-primary)' }}
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentGames.map(game => (
                  <div key={game.id} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ 
                        background: game.result === 'win' ? 'rgba(74, 222, 128, 0.2)' : 
                                   game.result === 'loss' ? 'rgba(239, 68, 68, 0.2)' : 
                                   'rgba(251, 191, 36, 0.2)',
                        color: game.result === 'win' ? '#4ade80' : 
                               game.result === 'loss' ? '#ef4444' : '#fbbf24'
                      }}
                    >
                      {game.result === 'win' ? 'W' : game.result === 'loss' ? 'L' : 'D'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        vs {game.opponent}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {game.mode}
                      </div>
                    </div>
                    {game.accuracy && (
                      <span 
                        className="text-sm font-mono"
                        style={{ color: game.accuracy >= 80 ? '#4ade80' : game.accuracy >= 60 ? '#f59e0b' : '#ef4444' }}
                      >
                        {game.accuracy}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspirational Quote */}
          <div className="card p-6">
            <blockquote className="font-serif italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              "Between stimulus and response there is a space. In that space is our 
              power to choose our response."
            </blockquote>
            <footer className="text-sm mt-3 not-italic" style={{ color: 'var(--text-muted)' }}>
              — Viktor Frankl
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
