import { useState, useCallback, useMemo, useEffect } from 'react';
import { BackButton } from '@/components/BackButton';
import {
  enhancedEndgamePatterns,
  endgameCategoryInfo,
  getEndgamePatternsByCategory,
  getAllEndgameCategories,
  ENDGAME_CATEGORY_STYLES,
  type EndgameCategory,
  type EnhancedEndgamePattern,
} from '@/data/endgames/enhancedEndgamePatterns';
import type { EnhancedPattern } from '@/data/positional/enhancedPatterns';
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
import { logger } from '@/lib/logger';

// ============================================
// TYPES & CONSTANTS
// ============================================

type ViewMode = 'categories' | 'patterns' | 'training';
type TrainingMode = 'learn' | 'test' | 'review';

// Storage key specific to endgames
const ENDGAME_STORAGE_KEY = 'zen-chess-srs-endgames';

// ============================================
// LOCAL STORAGE HELPERS FOR ENDGAMES
// ============================================

function loadEndgameProgress(): PatternProgress {
  try {
    const saved = localStorage.getItem(ENDGAME_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    logger.error('Failed to load endgame progress:', e);
  }
  return {
    cards: {},
    lastSession: 0,
    totalXP: 0,
    streakDays: 0,
    lastStreakDate: '',
  };
}

function saveEndgameProgress(progress: PatternProgress): void {
  try {
    localStorage.setItem(ENDGAME_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    logger.error('Failed to save endgame progress:', e);
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export function EndgamesPage() {
  // Navigation State
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<EndgameCategory | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<EnhancedEndgamePattern | null>(null);
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('learn');

  // Queue State for flow navigation
  const [patternQueue, setPatternQueue] = useState<EnhancedEndgamePattern[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);

  // Progress State
  const [progress, setProgress] = useState<PatternProgress>(() => loadEndgameProgress());

  // Get all pattern IDs for SRS calculations
  const allPatternIds = useMemo(() => enhancedEndgamePatterns.map(p => p.id), []);

  // Stats
  const stats = useMemo(() => getPatternStats(progress, allPatternIds), [progress, allPatternIds]);
  const dueCount = useMemo(() => getDueCount(progress, allPatternIds), [progress, allPatternIds]);

  // Get patterns for selected category with SRS info
  const categoryPatterns = useMemo(() => {
    if (!selectedCategory) return [];
    return getEndgamePatternsByCategory(selectedCategory).map(pattern => ({
      ...pattern,
      card: progress.cards[pattern.id],
    }));
  }, [selectedCategory, progress]);

  // Get category-level stats
  const getCategoryStats = useCallback((category: EndgameCategory) => {
    const patterns = getEndgamePatternsByCategory(category);
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

  // Initialize queue when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const patterns = getEndgamePatternsByCategory(selectedCategory);
      setPatternQueue(patterns);
      if (selectedPattern) {
        const index = patterns.findIndex(p => p.id === selectedPattern.id);
        setCurrentQueueIndex(index >= 0 ? index : 0);
      } else {
        setCurrentQueueIndex(0);
      }
    }
  }, [selectedCategory, selectedPattern]);

  // Start training a pattern
  const startTraining = useCallback((pattern: EnhancedEndgamePattern, mode: TrainingMode) => {
    setSelectedPattern(pattern);
    setTrainingMode(mode);
    setViewMode('training');
  }, []);

  // Navigate to next pattern in queue
  const goToNextPattern = useCallback(() => {
    if (currentQueueIndex < patternQueue.length - 1) {
      const nextPattern = patternQueue[currentQueueIndex + 1];
      setSelectedPattern(nextPattern);
      setCurrentQueueIndex(prev => prev + 1);
      setViewMode('training');
    } else {
      setViewMode('patterns');
      setSelectedPattern(null);
    }
  }, [currentQueueIndex, patternQueue]);

  // Navigate to previous pattern in queue
  const goToPreviousPattern = useCallback(() => {
    if (currentQueueIndex > 0) {
      const prevPattern = patternQueue[currentQueueIndex - 1];
      setSelectedPattern(prevPattern);
      setCurrentQueueIndex(prev => prev - 1);
      setViewMode('training');
    }
  }, [currentQueueIndex, patternQueue]);

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
    saveEndgameProgress(updatedProgress);
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
    // Convert endgame pattern to format expected by MoveTrainer (EnhancedPattern)
    const trainerPattern: EnhancedPattern = {
      ...selectedPattern,
      category: selectedPattern.category as unknown as EnhancedPattern['category'],
    };

    return (
      <MoveTrainer
        key={selectedPattern.id}
        pattern={trainerPattern}
        mode={trainingMode}
        onComplete={handleTrainingComplete}
        onExit={handleTrainingExit}
        onNextPattern={goToNextPattern}
        onPreviousPattern={goToPreviousPattern}
        hasNextPattern={currentQueueIndex < patternQueue.length - 1}
        hasPreviousPattern={currentQueueIndex > 0}
        currentPatternIndex={currentQueueIndex}
        totalPatterns={patternQueue.length}
      />
    );
  }

  // ============================================
  // RENDER: CATEGORY SELECTION VIEW
  // ============================================
  if (viewMode === 'categories') {
    const categories = getAllEndgameCategories();

    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        <BackButton fallback="/" className="mb-4" />

        {/* Hero Header */}
        <section className="text-center lg:text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
              ♚
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
                Endgame Mastery
              </h1>
              <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
                Master the art of converting advantages and saving draws
              </p>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
            <div className="relative">
              <div className="text-3xl font-bold text-gradient mb-1">{enhancedEndgamePatterns.length}</div>
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
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.1))',
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  You have {dueCount} endgame{dueCount > 1 ? 's' : ''} due for review
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Solidify your endgame technique with a quick review session.
                </p>
              </div>
              <button
                onClick={() => {
                  const queue = getReviewQueue(progress, allPatternIds);
                  const nextPatternId = queue.learningCards[0] || queue.reviewCards[0];
                  if (nextPatternId) {
                    const pattern = enhancedEndgamePatterns.find(p => p.id === nextPatternId);
                    if (pattern) {
                      setSelectedCategory(pattern.category);
                      startTraining(pattern, 'test');
                    }
                  }
                }}
                className="btn-primary whitespace-nowrap"
              >
                Start Review
              </button>
            </div>
          </div>
        )}

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map(category => {
            const info = endgameCategoryInfo[category];
            const style = ENDGAME_CATEGORY_STYLES[category];
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
                      - {info.masterQuote.author}
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
          Total Endgame XP: <span className="font-bold text-gradient">{progress.totalXP}</span>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PATTERN LIST VIEW
  // ============================================
  if (viewMode === 'patterns' && selectedCategory) {
    const info = endgameCategoryInfo[selectedCategory];
    const style = ENDGAME_CATEGORY_STYLES[selectedCategory];

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
                    - {info.masterQuote.author}
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
              <button
                key={pattern.id}
                onClick={() => startTraining(pattern, 'learn')}
                className="card p-5 hover:border-[var(--border-strong)] transition-all cursor-pointer text-left w-full group relative"
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
                          Mastered
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
                      {pattern.source && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {pattern.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state if no patterns */}
        {categoryPatterns.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">♚</div>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Patterns Coming Soon
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              New endgame patterns for this category will be added in future updates.
            </p>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => setViewMode('categories')}
          className="btn-ghost"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return null;
}

export default EndgamesPage;
