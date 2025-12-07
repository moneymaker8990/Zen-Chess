import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { phaseInfo, getDayByNumber } from '@/data/days';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TodaysFocusWidget } from '@/components/CoachDashboard';
import { AgentQuickActions, AgentWatching } from '@/components/AgentPresence';
import { useAgentTrigger, useAgentMessages, useAgentStore } from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import type { ActionType } from '@/lib/coachTypes';
import { useAutoTutorial, TutorialModal, TutorialButton } from '@/components/Tutorial';

// ============================================
// ENHANCED HOME PAGE - Chess.com Style Dashboard
// ============================================

// Agent Insight Banner - Shows top agent message
function AgentInsightBanner() {
  const navigate = useNavigate();
  const messages = useAgentMessages();
  const { markActedOn, dismissMessage } = useAgentStore();
  
  // Get most important unread message
  const topMessage = useMemo(() => {
    const unread = messages.filter(m => !m.readAt && !m.dismissedAt);
    if (unread.length === 0) return null;
    
    // Priority order
    const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
    return unread.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])[0];
  }, [messages]);
  
  if (!topMessage) return null;
  
  const personality = AGENT_PERSONALITIES[topMessage.agentId];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
      style={{ 
        background: `linear-gradient(135deg, ${personality.color}15, ${personality.color}05)`,
        border: `1px solid ${personality.color}30`,
      }}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0"
          style={{ background: `${personality.color}25` }}
        >
          {personality.icon}
        </div>
        <div className="flex-1 min-w-0 sm:hidden">
          <span className="font-medium text-sm" style={{ color: personality.color }}>
            {personality.name}
          </span>
          {topMessage.priority === 'urgent' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 ml-2">
              Urgent
            </span>
          )}
        </div>
        <button
          onClick={() => dismissMessage(topMessage.id)}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10 sm:hidden"
          style={{ color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <div className="hidden sm:flex items-center gap-2 mb-1">
          <span className="font-medium text-sm" style={{ color: personality.color }}>
            {personality.name}
          </span>
          {topMessage.priority === 'urgent' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
              Urgent
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {topMessage.body.length > 80 ? topMessage.body.slice(0, 80) + '...' : topMessage.body}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
        {topMessage.primaryAction && (
          <button
            onClick={() => {
              markActedOn(topMessage.id);
              if (topMessage.primaryAction?.route) {
                navigate(topMessage.primaryAction.route);
              }
            }}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105"
            style={{ 
              background: personality.color,
              color: 'white',
            }}
          >
            {topMessage.primaryAction.label}
          </button>
        )}
        <button
          onClick={() => dismissMessage(topMessage.id)}
          className="hidden sm:block p-2 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

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
  
  // Auto-show tutorial for first-time visitors
  const { showTutorial, closeTutorial } = useAutoTutorial('home');
  
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
    <>
      {/* First-time tutorial */}
      <TutorialModal
        tutorialId="home"
        isOpen={showTutorial}
        onClose={closeTutorial}
      />
      
      <div className="space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-0">
      {/* Welcome Header */}
      <section className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Welcome back
            </h1>
            <p className="text-sm sm:text-lg" style={{ color: 'var(--text-tertiary)' }}>
              Continue your journey to chess mastery
            </p>
          </div>
          <TutorialButton tutorialId="home" />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
            <span className="text-base sm:text-xl">🔥</span>
            <span className="font-bold text-sm sm:text-lg" style={{ color: '#f59e0b' }}>{progress.streakDays}</span>
            <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>streak</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
            <span className="text-base sm:text-xl">⭐</span>
            <span className="font-bold text-sm sm:text-lg" style={{ color: 'var(--accent-primary)' }}>{totalXP}</span>
            <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>XP</span>
          </div>
        </div>
      </section>

      {/* Agent Message - If there's something important */}
      <AgentInsightBanner />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Learning First */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* 🔥 DAILY CHALLENGE - Hero Spot */}
          <button
            onClick={() => navigate('/daily-challenges')}
            className="w-full card-interactive p-4 sm:p-6 text-left group relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(234, 88, 12, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)' }}
          >
            <div className="absolute top-2 right-2 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold" style={{ background: '#f59e0b', color: 'black' }}>
              NEW TODAY
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <div 
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}
              >
                📅
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-display font-semibold mb-0.5 sm:mb-1" style={{ color: 'var(--text-primary)' }}>
                  Today's Challenge
                </h2>
                <p className="text-xs sm:text-base mb-1 sm:mb-2 truncate" style={{ color: '#fbbf24' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}: {
                    ['Endgame', 'Tactics', 'Visualization', 'GM Analysis', 'Speed Rush', 'Legends Study', 'Legends Study'][new Date().getDay()]
                  }
                </p>
                <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  <span>🔥 New puzzles every day</span>
                  <span>•</span>
                  <span>Compete on leaderboard</span>
                </div>
              </div>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f59e0b' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* 🎓 ACADEMY SECTION - The Competitive Content */}
          <div className="card p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🎓</span>
                <h2 className="text-lg sm:text-xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Zen Chess Academy
                </h2>
              </div>
              <span className="badge text-[10px] sm:text-xs" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a855f7' }}>
                2,400+ Lessons
              </span>
            </div>
            
            {/* Core Learning Features */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
              {/* Courses */}
              <button
                onClick={() => navigate('/courses')}
                className="p-3 sm:p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                    📖
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Courses</h3>
                    <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: '#a855f7' }}>Chessable-style</p>
                  </div>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Tactics</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Positional</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--text-tertiary)' }}>Endgames</span>
                </div>
              </button>

              {/* Thinking System */}
              <button
                onClick={() => navigate('/thinking-system')}
                className="p-3 sm:p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
                    🧠
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Thinking</h3>
                    <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: '#22d3ee' }}>5-step framework</p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                  Systematic approach to evaluate any position
                </p>
              </button>

              {/* Flash Training */}
              <button
                onClick={() => navigate('/flash-training')}
                className="p-3 sm:p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                    ⚡
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Flash</h3>
                    <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: '#f87171' }}>Pattern recognition</p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                  Builds GM-level intuition
                </p>
              </button>

              {/* Spaced Repetition */}
              <button
                onClick={() => navigate('/spaced-repetition')}
                className="p-3 sm:p-4 rounded-xl text-left transition-all hover:scale-[1.02] group"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                    🔄
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Review</h3>
                    <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: '#4ade80' }}>Smart scheduling</p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                  Science-backed retention
                </p>
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button onClick={() => navigate('/openings')} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                📚 Openings
              </button>
              <button onClick={() => navigate('/patterns')} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                🏛️ Patterns
              </button>
              <button onClick={() => navigate('/greats')} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                👑 Legends
              </button>
              <button onClick={() => navigate('/study-plan')} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-all hover:bg-[var(--bg-hover)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                📋 Plan
              </button>
            </div>
          </div>

          {/* Play & Train Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {/* Play Chess Card */}
            <button
              onClick={() => navigate('/play')}
              className="card-interactive p-3 sm:p-5 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(129, 182, 76, 0.1) 0%, rgba(129, 182, 76, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div 
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                  style={{ background: 'rgba(129, 182, 76, 0.2)' }}
                >
                  ♟️
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-lg font-display mb-0.5 sm:mb-1" style={{ color: 'var(--text-primary)' }}>
                    Play Chess
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: '#81b64c' }}>
                    vs Engine
                  </p>
                </div>
              </div>
            </button>

            {/* Puzzles Card */}
            <button
              onClick={() => navigate('/train')}
              className="card-interactive p-3 sm:p-5 text-left group"
              style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div 
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                  style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                >
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-lg font-display mb-0.5 sm:mb-1" style={{ color: 'var(--text-primary)' }}>
                    Puzzles
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#f59e0b' }}>
                      {puzzleStats.puzzlesSolved.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm hidden sm:inline" style={{ color: 'var(--text-muted)' }}>solved</span>
                    {puzzleStats.currentStreak > 0 && (
                      <span className="text-xs sm:text-sm" style={{ color: '#f59e0b' }}>
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
            <div className="card p-3 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}
                  >
                    📖
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="badge badge-purple text-[10px] sm:text-xs">Day {progress.currentDay}</span>
                      <span className="text-[10px] sm:text-xs truncate" style={{ color: 'var(--text-muted)' }}>{phaseData.name}</span>
                    </div>
                    <h2 className="font-display font-medium text-sm sm:text-base truncate" style={{ color: 'var(--text-primary)' }}>
                      {currentDayData.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/day')}
                  className="btn-secondary text-xs sm:text-sm w-full sm:w-auto"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Mental Game & Tools */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/beginner')}
              className="card p-2 sm:p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
              style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)', border: '1px solid rgba(74, 222, 128, 0.2)' }}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌱</div>
              <span className="text-xs sm:text-sm font-medium block truncate" style={{ color: '#4ade80' }}>Beginner</span>
              <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block" style={{ color: 'var(--text-muted)' }}>Start here</p>
            </button>
            <button
              onClick={() => navigate('/mind')}
              className="card p-2 sm:p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🧘</div>
              <span className="text-xs sm:text-sm font-medium block truncate" style={{ color: 'var(--text-primary)' }}>Mind</span>
              <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block" style={{ color: 'var(--text-muted)' }}>{progress.meditationMinutes}m</p>
            </button>
            <button
              onClick={() => navigate('/calm-play')}
              className="card p-2 sm:p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">❤️</div>
              <span className="text-xs sm:text-sm font-medium block truncate" style={{ color: 'var(--text-primary)' }}>Calm</span>
              <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block" style={{ color: 'var(--text-muted)' }}>Anti-tilt</p>
            </button>
            <button
              onClick={() => navigate('/coach')}
              className="card p-2 sm:p-4 text-center hover:border-[var(--accent-primary)]/30 transition-all"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✨</div>
              <span className="text-xs sm:text-sm font-medium block truncate" style={{ color: 'var(--text-primary)' }}>Coach</span>
              <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block" style={{ color: 'var(--text-muted)' }}>AI Guide</p>
            </button>
          </div>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-4 sm:space-y-6">
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
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }}>
              Your Stats
            </h3>
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Puzzle Rating</span>
                <span className="font-bold text-sm sm:text-lg" style={{ color: '#f59e0b' }}>{puzzleStats.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Best Streak</span>
                <span className="font-bold text-sm" style={{ color: '#ec4899' }}>{puzzleStats.bestStreak}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Rush High</span>
                <span className="font-bold text-sm" style={{ color: '#8b5cf6' }}>{puzzleStats.rushHighScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Journey</span>
                <span className="font-bold text-sm" style={{ color: '#4ade80' }}>{progress.currentDay}/365</span>
              </div>
              {overallAccuracy > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Accuracy</span>
                  <span className="font-bold text-sm" style={{ color: overallAccuracy >= 80 ? '#4ade80' : overallAccuracy >= 60 ? '#f59e0b' : '#ef4444' }}>
                    {overallAccuracy}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity - Hidden on mobile to save space */}
          {recentGames.length > 0 && (
            <div className="card p-4 sm:p-6 hidden sm:block">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
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
              <div className="space-y-2 sm:space-y-3">
                {recentGames.slice(0, 3).map(game => (
                  <div key={game.id} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                    <div 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
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
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        vs {game.opponent}
                      </div>
                      <div className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                        {game.mode}
                      </div>
                    </div>
                    {game.accuracy && (
                      <span 
                        className="text-xs sm:text-sm font-mono shrink-0"
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

          {/* Inspirational Quote - Hidden on mobile */}
          <div className="card p-4 sm:p-6 hidden lg:block">
            <blockquote className="font-serif italic leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
              "Between stimulus and response there is a space. In that space is our 
              power to choose our response."
            </blockquote>
            <footer className="text-xs sm:text-sm mt-2 sm:mt-3 not-italic" style={{ color: 'var(--text-muted)' }}>
              — Viktor Frankl
            </footer>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
