// ============================================
// SOCIAL PAGE
// Share progress, challenges, and connect
// ============================================

import { useState, useEffect } from 'react';
import { useProgressStore } from '@/state/useStore';
import { CHALLENGE_TYPES, SHARE_TEMPLATES, XP_REWARDS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

interface Challenge {
  id: string;
  type: keyof typeof CHALLENGE_TYPES;
  createdAt: number;
  expiresAt: number;
  progress: number;
  target: number;
  completed: boolean;
}

interface SharedMoment {
  id: string;
  type: 'puzzle' | 'lesson' | 'achievement' | 'streak' | 'challenge';
  title: string;
  description: string;
  timestamp: number;
  xp: number;
}

// ============================================
// STORAGE HELPERS
// ============================================

function loadChallenges(): Challenge[] {
  try {
    const stored = localStorage.getItem('zen-chess-challenges');
    return stored ? JSON.parse(stored) : generateDailyChallenges();
  } catch {
    return generateDailyChallenges();
  }
}

function saveChallenges(challenges: Challenge[]) {
  localStorage.setItem('zen-chess-challenges', JSON.stringify(challenges));
}

function loadSharedMoments(): SharedMoment[] {
  try {
    const stored = localStorage.getItem('zen-chess-shared-moments');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSharedMoments(moments: SharedMoment[]) {
  localStorage.setItem('zen-chess-shared-moments', JSON.stringify(moments));
}

function generateDailyChallenges(): Challenge[] {
  const now = Date.now();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  return [
    {
      id: `daily-${now}`,
      type: 'daily',
      createdAt: now,
      expiresAt: endOfDay.getTime(),
      progress: 0,
      target: 1,
      completed: false,
    },
    {
      id: `tactical-${now}`,
      type: 'tactical',
      createdAt: now,
      expiresAt: endOfDay.getTime(),
      progress: 0,
      target: 10,
      completed: false,
    },
    {
      id: `study-${now}`,
      type: 'study',
      createdAt: now,
      expiresAt: endOfDay.getTime(),
      progress: 0,
      target: 30,
      completed: false,
    },
  ];
}

// ============================================
// SHARE UTILITIES
// ============================================

async function shareToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

async function shareNative(title: string, text: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return true;
    } catch {
      return false;
    }
  }
  return shareToClipboard(text);
}

// ============================================
// COMPONENT
// ============================================

export function SocialPage() {
  const { progress } = useProgressStore();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [sharedMoments, setSharedMoments] = useState<SharedMoment[]>([]);
  const [activeTab, setActiveTab] = useState<'challenges' | 'share' | 'activity'>('challenges');
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load data on mount
  useEffect(() => {
    setChallenges(loadChallenges());
    setSharedMoments(loadSharedMoments());
    
    // Check for expired challenges and regenerate
    const stored = loadChallenges();
    const now = Date.now();
    const hasExpired = stored.some(c => c.expiresAt < now);
    
    if (hasExpired) {
      const newChallenges = generateDailyChallenges();
      setChallenges(newChallenges);
      saveChallenges(newChallenges);
    }
  }, []);

  // Handle share action
  const handleShare = async (template: string) => {
    const success = await shareNative('Zen Chess', template);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate total XP available from challenges
  const availableXP = challenges
    .filter(c => !c.completed)
    .reduce((sum, c) => sum + CHALLENGE_TYPES[c.type].xp, 0);

  const completedToday = challenges.filter(c => c.completed).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Social Hub
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
          Challenge yourself, share your progress, connect with others
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-value text-gradient">{progress.streakDays}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{progress.puzzlesSolved}</div>
          <div className="stat-label">Puzzles Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4ade80' }}>{completedToday}</div>
          <div className="stat-label">Challenges Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>{availableXP}</div>
          <div className="stat-label">XP Available</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="flex gap-2">
        {(['challenges', 'share', 'activity'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-transparent'
            }`}
          >
            {tab === 'challenges' && '🎯 '}{tab === 'share' && '📤 '}{tab === 'activity' && '📊 '}
            {tab}
          </button>
        ))}
      </nav>

      {/* ==================== CHALLENGES TAB ==================== */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {/* Daily Challenges */}
          <div className="space-y-4">
            <div className="section-header">
              <div>
                <h2 className="section-title">Today's Challenges</h2>
                <p className="section-subtitle">Complete challenges to earn XP</p>
              </div>
              <div className="badge badge-gold">{availableXP} XP available</div>
            </div>

            <div className="grid gap-4">
              {challenges.map(challenge => {
                const config = CHALLENGE_TYPES[challenge.type];
                const progressPercent = Math.min(100, (challenge.progress / challenge.target) * 100);
                
                return (
                  <div 
                    key={challenge.id} 
                    className={`challenge-card ${challenge.completed ? 'active' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ 
                          background: challenge.completed 
                            ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))' 
                            : 'var(--bg-tertiary)' 
                        }}
                      >
                        {challenge.completed ? '✓' : config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {config.name}
                          </h3>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: challenge.completed ? '#4ade80' : 'var(--accent-gold)' }}
                          >
                            +{config.xp} XP
                          </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                          {config.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 progress-bar">
                            <div 
                              className={`progress-bar-fill ${challenge.completed ? 'green' : 'gold'}`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="card p-6" style={{ 
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), transparent)',
            borderColor: 'rgba(168, 85, 247, 0.2)'
          }}>
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}
              >
                🏆
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                    Weekly Challenge
                  </h3>
                  <span className="badge badge-green">+100 XP</span>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  Complete all daily challenges for 7 days straight
                </p>
                <div className="flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        i < Math.min(progress.streakDays, 7) ? 'bg-[#4ade80]/20 text-[#4ade80]' : ''
                      }`}
                      style={{ background: i >= Math.min(progress.streakDays, 7) ? 'var(--bg-tertiary)' : undefined }}
                    >
                      {i < Math.min(progress.streakDays, 7) ? '✓' : i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SHARE TAB ==================== */}
      {activeTab === 'share' && (
        <div className="space-y-6">
          {/* Share Options */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Share Streak */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                  🔥
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Share Your Streak</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{progress.streakDays} day streak</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(SHARE_TEMPLATES.dailyStreak(progress.streakDays))}
                className="w-full btn-secondary"
              >
                {copied ? '✓ Copied!' : '📤 Share'}
              </button>
            </div>

            {/* Share Puzzles */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                  🧩
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Share Puzzle Stats</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{progress.puzzlesSolved} puzzles solved</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(SHARE_TEMPLATES.puzzleSolved(1200, progress.streakDays))}
                className="w-full btn-secondary"
              >
                📤 Share
              </button>
            </div>

            {/* Share Achievement */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(74, 222, 128, 0.15)' }}>
                  🏆
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Share Achievement</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Latest milestone</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(SHARE_TEMPLATES.achievement('First Week Completed!'))}
                className="w-full btn-secondary"
              >
                📤 Share
              </button>
            </div>

            {/* Create Challenge */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
                  ⚔️
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Challenge a Friend</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Send a puzzle challenge</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(SHARE_TEMPLATES.challenge('Beat my daily puzzle time!'))}
                className="w-full btn-secondary"
              >
                📤 Create Challenge
              </button>
            </div>
          </div>

          {/* Custom Share */}
          <div className="card p-6">
            <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Custom Message</h3>
            <textarea
              value={shareMessage || ''}
              onChange={(e) => setShareMessage(e.target.value)}
              placeholder="Write your own message to share..."
              className="zen-textarea h-24 mb-4"
            />
            <button
              onClick={() => shareMessage && handleShare(shareMessage)}
              disabled={!shareMessage}
              className="btn-primary w-full"
            >
              📤 Share Custom Message
            </button>
          </div>
        </div>
      )}

      {/* ==================== ACTIVITY TAB ==================== */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          {/* Activity Feed */}
          <div className="section-header">
            <div>
              <h2 className="section-title">Recent Activity</h2>
              <p className="section-subtitle">Your chess journey</p>
            </div>
          </div>

          {sharedMoments.length > 0 ? (
            <div className="space-y-3">
              {sharedMoments.slice(0, 10).map(moment => (
                <div key={moment.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      {moment.type === 'puzzle' && '🧩'}
                      {moment.type === 'lesson' && '📚'}
                      {moment.type === 'achievement' && '🏆'}
                      {moment.type === 'streak' && '🔥'}
                      {moment.type === 'challenge' && '⚔️'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {moment.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {moment.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>
                        +{moment.xp} XP
                      </span>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(moment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state card p-12">
              <div className="empty-state-icon">📊</div>
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                No activity yet
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Start solving puzzles and completing lessons to build your activity feed!
              </p>
            </div>
          )}

          {/* Stats Summary */}
          <div className="card p-6">
            <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              All-Time Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  {progress.puzzlesSolved}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Puzzles</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  {progress.completedDays.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Lessons</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  {progress.streakDays}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Best Streak</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  {progress.meditationMinutes}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Min Meditation</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialPage;

