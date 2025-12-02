import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { phaseInfo, getDayByNumber } from '@/data/days';
import { useState, useMemo } from 'react';
import { TodaysFocusWidget } from '@/components/CoachDashboard';
import type { ActionType } from '@/lib/coachTypes';

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
        {/* Left Column - Learning First */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 🔥 DAILY CHALLENGE - Hero Spot */}
          <button
            onClick={() => navigate('/daily-challenges')}
            className="w-full card-interactive p-6 text-left group relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(234, 88, 12, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)' }}
          >
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold" style={{ background: '#f59e0b', color: 'black' }}>
              NEW TODAY
            </div>
            <div className="flex items-center gap-5">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}
              >
                📅
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Today's Challenge
                </h2>
                <p className="text-base mb-2" style={{ color: '#fbbf24' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}'s Theme: {
                    ['Endgame', 'Tactics', 'Visualization', 'GM Analysis', 'Speed Rush', 'Legends Study', 'Legends Study'][new Date().getDay()]
                  }
                </p>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  <span>🔥 New puzzles every day</span>
                  <span>•</span>
                  <span>Compete on leaderboard</span>
                </div>
              </div>
              <svg className="w-8 h-8 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f59e0b' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* 🎓 ACADEMY SECTION - The Competitive Content */}
          <div className="card p-6" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <h2 className="text-xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Zen Chess Academy
                </h2>
              </div>
              <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a855f7' }}>
                2,400+ Lessons
              </span>
            </div>
            
            {/* Core Learning Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {/* Courses */}
              <button
                onClick={() => navigate('/courses')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                    📖
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Courses</h3>
                    <p className="text-xs" style={{ color: '#a855f7' }}>Chessable-style learning</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Tactics</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Positional</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Endgames</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Strategy</span>
                </div>
              </button>

              {/* Thinking System */}
              <button
                onClick={() => navigate('/thinking-system')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
                    🧠
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Thinking System</h3>
                    <p className="text-xs" style={{ color: '#22d3ee' }}>5-step decision framework</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Learn the systematic approach used by masters to evaluate any position
                </p>
              </button>

              {/* Flash Training */}
              <button
                onClick={() => navigate('/flash-training')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                    ⚡
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Flash Training</h3>
                    <p className="text-xs" style={{ color: '#f87171' }}>Rapid pattern recognition</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  See position for 3 seconds, then answer. Builds GM-level intuition.
                </p>
              </button>

              {/* Spaced Repetition */}
              <button
                onClick={() => navigate('/spaced-repetition')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                    🔄
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Spaced Review</h3>
                    <p className="text-xs" style={{ color: '#4ade80' }}>Smart puzzle scheduling</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Never forget what you learn. Science-backed retention system.
                </p>
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => navigate('/openings')} className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                📚 Openings
              </button>
              <button onClick={() => navigate('/patterns')} className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                🏛️ Patterns
              </button>
              <button onClick={() => navigate('/greats')} className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                👑 Legends
              </button>
              <button onClick={() => navigate('/study-plan')} className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                📋 Study Plan
              </button>
            </div>
          </div>

          {/* Play & Train Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Play Chess Card */}
            <button
              onClick={() => navigate('/play')}
              className="card-interactive p-5 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(129, 182, 76, 0.1) 0%, rgba(129, 182, 76, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(129, 182, 76, 0.2)' }}
                >
                  ♟️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                    Play Chess
                  </h3>
                  <p className="text-sm" style={{ color: '#81b64c' }}>
                    vs Engine or Analyze
                  </p>
                </div>
              </div>
            </button>

            {/* Puzzles Card */}
            <button
              onClick={() => navigate('/train')}
              className="card-interactive p-5 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                >
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display mb-1" style={{ color: 'var(--text-primary)' }}>
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
              </div>
            </button>
          </div>

          {/* Today's Lesson Card - Daily Journey */}
          {currentDayData && (
            <div className="card p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}
                  >
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge badge-purple">Day {progress.currentDay}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{phaseData.name}</span>
                    </div>
                    <h2 className="font-display font-medium" style={{ color: 'var(--text-primary)' }}>
                      {currentDayData.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/day')}
                  className="btn-secondary text-sm"
                >
                  Continue Journey
                </button>
              </div>
            </div>
          )}

          {/* Mental Game & Tools */}
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/mind')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-2xl mb-2">🧘</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Mind Training</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{progress.meditationMinutes}m</p>
            </button>
            <button
              onClick={() => navigate('/calm-play')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-2xl mb-2">❤️</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Calm Play</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Anti-tilt</p>
            </button>
            <button
              onClick={() => navigate('/coach')}
              className="card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-2xl mb-2">✨</div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>AI Coach</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Personal guidance</p>
            </button>
          </div>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-6">
          {/* AI Coach - Today's Focus */}
          <TodaysFocusWidget 
            onAction={(actionType: ActionType) => {
              // Navigate based on action type
              const actionRoutes: Partial<Record<ActionType, string>> = {
                START_TRAINING: '/train',
                START_PUZZLE: '/train',
                START_PUZZLES: '/train',
                START_MEDITATION: '/mind',
                START_BREATHING: '/mind',
                START_CALM_PLAY: '/calm-play',
                START_GAME: '/play',
                START_PATTERN_REVIEW: '/patterns',
                START_SPARRING: '/sparring',
                REVIEW_MISTAKES: '/mistakes',
                REVIEW_PATTERNS: '/patterns',
                VIEW_MISTAKES: '/mistakes',
                VIEW_OPENINGS: '/openings',
                VIEW_PROGRESS: '/journey',
                VIEW_NOTES: '/notes',
                VIEW_STUDY_PLAN: '/study-plan',
                PLAY_GAME: '/play',
                VIEW_STATS: '/hub',
                SET_INTENTION: '/calm-play',
                VIEW_INSIGHT: '/coach',
              };
              const route = actionRoutes[actionType];
              if (route) {
                navigate(route);
              }
            }}
          />

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
