import { useState, useCallback, useMemo } from 'react';
import { 
  enhancedPatterns, 
  categoryInfo, 
  getPatternsByCategory,
  getAllCategories,
  type PositionalCategory,
  type EnhancedPattern 
} from '@/data/positional/enhancedPatterns';
import { MoveTrainer } from '@/components/MoveTrainer/MoveTrainer';
import {
  loadPatternProgress,
  savePatternProgress,
  updateCard,
  getPatternStats,
  getDueCount,
  getReviewQueue,
  calculateQuality,
  type PatternProgress,
} from '@/lib/spacedRepetition';

// ============================================
// TYPES & CONSTANTS
// ============================================

type ViewMode = 'categories' | 'patterns' | 'training';
type TrainingMode = 'learn' | 'test' | 'review';

// Category styling with rich visuals
const CATEGORY_STYLES: Record<PositionalCategory, { 
  gradient: string;
  accent: string;
  bgGlow: string;
}> = {
  OUTPOSTS: {
    gradient: 'from-emerald-500 to-green-600',
    accent: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
  },
  WEAK_PAWNS: {
    gradient: 'from-red-500 to-rose-600',
    accent: '#ef4444',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
  },
  PAWN_STRUCTURE: {
    gradient: 'from-amber-500 to-orange-600',
    accent: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
  },
  OPEN_FILES: {
    gradient: 'from-blue-500 to-indigo-600',
    accent: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
  },
  BISHOP_PAIR: {
    gradient: 'from-violet-500 to-purple-600',
    accent: '#8b5cf6',
    bgGlow: 'rgba(139, 92, 246, 0.15)',
  },
  GOOD_BAD_BISHOP: {
    gradient: 'from-slate-500 to-gray-600',
    accent: '#6b7280',
    bgGlow: 'rgba(107, 114, 128, 0.15)',
  },
  KNIGHT_PLACEMENT: {
    gradient: 'from-orange-500 to-amber-600',
    accent: '#f97316',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
  },
  SPACE_ADVANTAGE: {
    gradient: 'from-teal-500 to-cyan-600',
    accent: '#14b8a6',
    bgGlow: 'rgba(20, 184, 166, 0.15)',
  },
  PIECE_COORDINATION: {
    gradient: 'from-pink-500 to-rose-600',
    accent: '#ec4899',
    bgGlow: 'rgba(236, 72, 153, 0.15)',
  },
  PROPHYLAXIS: {
    gradient: 'from-indigo-500 to-purple-600',
    accent: '#6366f1',
    bgGlow: 'rgba(99, 102, 241, 0.15)',
  },
  MINORITY_ATTACK: {
    gradient: 'from-lime-500 to-green-600',
    accent: '#84cc16',
    bgGlow: 'rgba(132, 204, 22, 0.15)',
  },
  PAWN_BREAKS: {
    gradient: 'from-fuchsia-500 to-pink-600',
    accent: '#d946ef',
    bgGlow: 'rgba(217, 70, 239, 0.15)',
  },
  KING_ACTIVITY: {
    gradient: 'from-yellow-500 to-amber-600',
    accent: '#eab308',
    bgGlow: 'rgba(234, 179, 8, 0.15)',
  },
  EXCHANGE_STRATEGY: {
    gradient: 'from-cyan-500 to-blue-600',
    accent: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.15)',
  },
  BLOCKADE: {
    gradient: 'from-stone-500 to-neutral-600',
    accent: '#78716c',
    bgGlow: 'rgba(120, 113, 108, 0.15)',
  },
  CENTRALIZATION: {
    gradient: 'from-blue-600 to-indigo-700',
    accent: '#2563eb',
    bgGlow: 'rgba(37, 99, 235, 0.15)',
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export function PatternsManualPage() {
  // Navigation State
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<PositionalCategory | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<EnhancedPattern | null>(null);
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('learn');
  
  // Progress State
  const [progress, setProgress] = useState<PatternProgress>(() => loadPatternProgress());

  // Get all pattern IDs for SRS calculations
  const allPatternIds = useMemo(() => enhancedPatterns.map(p => p.id), []);

  // Stats
  const stats = useMemo(() => getPatternStats(progress, allPatternIds), [progress, allPatternIds]);
  const dueCount = useMemo(() => getDueCount(progress, allPatternIds), [progress, allPatternIds]);

  // Get patterns for selected category with SRS info
  const categoryPatterns = useMemo(() => {
    if (!selectedCategory) return [];
    return getPatternsByCategory(selectedCategory).map(pattern => ({
      ...pattern,
      card: progress.cards[pattern.id],
    }));
  }, [selectedCategory, progress]);

  // Get category-level stats
  const getCategoryStats = useCallback((category: PositionalCategory) => {
    const patterns = getPatternsByCategory(category);
    const categoryPatternIds = patterns.map(p => p.id);
    let mastered = 0;
    let learning = 0;
    let newCount = 0;
    let due = 0;
    const now = Date.now();

    patterns.forEach(p => {
      const card = progress.cards[p.id];
      if (!card) {
        newCount++;
      } else if (card.status === 'mastered') {
        mastered++;
        if (card.nextReview <= now) due++;
      } else if (card.status === 'learning' || card.status === 'review') {
        learning++;
        if (card.nextReview <= now) due++;
      } else {
        newCount++;
      }
    });

    return { total: patterns.length, mastered, learning, newCount, due };
  }, [progress]);

  // Start training a pattern
  const startTraining = useCallback((pattern: EnhancedPattern, mode: TrainingMode) => {
    setSelectedPattern(pattern);
    setTrainingMode(mode);
    setViewMode('training');
  }, []);

  // Handle training completion
  const handleTrainingComplete = useCallback((success: boolean, trainingStats: { correctMoves: number; incorrectMoves: number; hintsUsed: number }) => {
    if (!selectedPattern) return;

    const quality = calculateQuality(
      trainingStats.correctMoves,
      trainingStats.incorrectMoves,
      trainingStats.hintsUsed,
      selectedPattern.mainLine.length
    );

    const updatedProgress = updateCard(progress, selectedPattern.id, quality);
    setProgress(updatedProgress);
    savePatternProgress(updatedProgress);
  }, [selectedPattern, progress]);

  // Handle exit from training
  const handleTrainingExit = useCallback(() => {
    setViewMode('patterns');
    setSelectedPattern(null);
  }, []);

  // ============================================
  // RENDER: TRAINING VIEW
  // ============================================
  if (viewMode === 'training' && selectedPattern) {
    return (
      <MoveTrainer
        pattern={selectedPattern}
        mode={trainingMode}
        onComplete={handleTrainingComplete}
        onExit={handleTrainingExit}
      />
    );
  }

  // ============================================
  // RENDER: CATEGORY SELECTION VIEW
  // ============================================
  if (viewMode === 'categories') {
    const categories = getAllCategories();
    
    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        {/* Hero Header */}
        <section className="text-center lg:text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
              📚
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
                Positional Patterns
              </h1>
              <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
                Master strategic chess through spaced repetition
              </p>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
            <div className="relative">
              <div className="text-3xl font-bold text-gradient mb-1">{enhancedPatterns.length}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Patterns</div>
            </div>
          </div>
          <div className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            <div className="relative">
              <div className="text-3xl font-bold mb-1" style={{ color: '#4ade80' }}>{stats.mastered}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Mastered</div>
            </div>
          </div>
          <div className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
            <div className="relative">
              <div className="text-3xl font-bold mb-1" style={{ color: '#f59e0b' }}>{dueCount}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Due Today</div>
            </div>
          </div>
          <div className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
            <div className="relative">
              <div className="text-3xl font-bold mb-1" style={{ color: '#22d3ee' }}>{progress.streakDays}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Day Streak</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {dueCount > 0 && (
          <div className="card p-6" style={{ 
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 211, 238, 0.1))',
            borderColor: 'rgba(74, 222, 128, 0.3)'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  You have {dueCount} pattern{dueCount > 1 ? 's' : ''} due for review
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Keep your streak going! Review now to reinforce your learning.
                </p>
              </div>
              <button 
                onClick={() => {
                  const queue = getReviewQueue(progress, allPatternIds);
                  const nextPatternId = queue.learningCards[0] || queue.reviewCards[0];
                  if (nextPatternId) {
                    const pattern = enhancedPatterns.find(p => p.id === nextPatternId);
                    if (pattern) {
                      startTraining(pattern, 'test');
                    }
                  }
                }}
                className="btn-primary whitespace-nowrap"
              >
                Start Review →
              </button>
            </div>
          </div>
        )}

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map(category => {
            const info = categoryInfo[category];
            const style = CATEGORY_STYLES[category];
            const catStats = getCategoryStats(category);
            const progressPercent = catStats.total > 0 
              ? Math.round((catStats.mastered / catStats.total) * 100) 
              : 0;
            
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setViewMode('patterns');
                }}
                className="card p-6 text-left group transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  borderColor: 'transparent',
                  background: `linear-gradient(135deg, ${style.bgGlow}, transparent)`
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${style.gradient} shadow-lg`}
                    style={{ boxShadow: `0 8px 24px ${style.accent}33` }}
                  >
                    {info.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-medium px-2 py-1 rounded" style={{ 
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-muted)'
                    }}>
                      {catStats.total} patterns
                    </span>
                    {catStats.due > 0 && (
                      <span className="text-xs font-medium px-2 py-1 rounded" style={{ 
                        background: 'rgba(245, 158, 11, 0.2)',
                        color: '#f59e0b'
                      }}>
                        {catStats.due} due
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-medium mb-2 group-hover:text-white transition-colors" 
                  style={{ color: 'var(--text-primary)' }}>
                  {info.name}
                </h3>
                
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                  {info.description}
                </p>

                {/* Master Quote */}
                {info.masterQuote && (
                  <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                    <p className="text-sm italic mb-1" style={{ color: 'var(--text-secondary)' }}>
                      "{info.masterQuote.text}"
                    </p>
                    <p className="text-xs" style={{ color: style.accent }}>
                      — {info.masterQuote.author}
                    </p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ color: style.accent }}>{progressPercent}% mastered</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${style.gradient} transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center justify-end">
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ color: style.accent }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* XP Footer */}
        <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Total XP earned: <span className="font-bold text-gradient">{progress.totalXP}</span>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PATTERN LIST VIEW
  // ============================================
  if (viewMode === 'patterns' && selectedCategory) {
    const info = categoryInfo[selectedCategory];
    const style = CATEGORY_STYLES[selectedCategory];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setViewMode('categories')}
            className="hover:text-white transition-colors flex items-center gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Categories
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{info.name}</span>
        </div>

        {/* Category Header */}
        <div 
          className="card p-8 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${style.bgGlow}, transparent)`,
            borderColor: `${style.accent}33`
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{
            background: `radial-gradient(circle, ${style.accent}, transparent 70%)`
          }} />
          
          <div className="relative flex items-start gap-6">
            <div 
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${style.gradient} shadow-xl flex-shrink-0`}
              style={{ boxShadow: `0 12px 32px ${style.accent}44` }}
            >
              {info.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {info.name}
              </h1>
              <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                {info.description}
              </p>
              
              {info.masterQuote && (
                <blockquote className="border-l-4 pl-4 py-2" style={{ borderColor: style.accent }}>
                  <p className="italic mb-1" style={{ color: 'var(--text-secondary)' }}>
                    "{info.masterQuote.text}"
                  </p>
                  <cite className="text-sm" style={{ color: style.accent }}>
                    — {info.masterQuote.author}
                  </cite>
                </blockquote>
              )}
            </div>
          </div>
        </div>

        {/* Pattern Cards */}
        <div className="space-y-3">
          {categoryPatterns.map((pattern, index) => {
            const card = pattern.card;
            const status = card?.status || 'new';
            const isDue = card && card.nextReview <= Date.now();
            
            return (
              <div 
                key={pattern.id} 
                className="card p-5 hover:border-[var(--border-strong)] transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Pattern Number */}
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg bg-gradient-to-br ${style.gradient} shadow-lg flex-shrink-0`}
                    style={{ boxShadow: `0 4px 12px ${style.accent}33` }}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Pattern Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                        {pattern.title}
                      </h3>
                      
                      {/* Status badges */}
                      {status === 'mastered' && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                          background: 'rgba(74, 222, 128, 0.2)',
                          color: '#4ade80'
                        }}>
                          ✓ Mastered
                        </span>
                      )}
                      {status === 'learning' && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                          background: 'rgba(168, 85, 247, 0.2)',
                          color: '#a855f7'
                        }}>
                          Learning
                        </span>
                      )}
                      {status === 'review' && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6'
                        }}>
                          Review
                        </span>
                      )}
                      {isDue && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                          background: 'rgba(245, 158, 11, 0.2)',
                          color: '#f59e0b'
                        }}>
                          Due!
                        </span>
                      )}
                    </div>
                    
                    {pattern.subtitle && (
                      <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                        {pattern.subtitle}
                      </p>
                    )}
                    
                    <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                      {pattern.introduction}
                    </p>
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>
                        {'★'.repeat(pattern.difficulty)}{'☆'.repeat(5 - pattern.difficulty)}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        ~{pattern.estimatedMinutes} min
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {pattern.mainLine.length} moves
                      </span>
                      {pattern.playerExample && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {pattern.playerExample.white} vs {pattern.playerExample.black}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => startTraining(pattern, 'learn')}
                      className="btn-secondary text-sm px-4 py-2"
                      style={{ borderColor: `${style.accent}44`, color: style.accent }}
                    >
                      📖 Learn
                    </button>
                    <button
                      onClick={() => startTraining(pattern, 'test')}
                      className="btn-ghost text-sm px-4 py-2"
                    >
                      🎯 Test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if no patterns */}
        {categoryPatterns.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Patterns In Progress
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              New patterns for this category will be added in future updates.
            </p>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => setViewMode('categories')}
          className="btn-ghost"
        >
          ← Back to Categories
        </button>
      </div>
    );
  }

  return null;
}

export default PatternsManualPage;
