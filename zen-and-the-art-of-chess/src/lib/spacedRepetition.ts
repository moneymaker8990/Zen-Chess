// ============================================
// SM-2 SPACED REPETITION ALGORITHM
// Based on SuperMemo 2 algorithm by Piotr Wozniak
// Optimized for chess pattern learning
// ============================================

import { logger } from './logger';

export interface SRSCard {
  id: string;
  easeFactor: number;      // 1.3 to 2.5, default 2.5
  interval: number;        // Days until next review
  repetitions: number;     // Consecutive correct responses
  nextReview: number;      // Timestamp of next review
  lastReview: number;      // Timestamp of last review
  lapses: number;          // Times the card was forgotten
  totalReviews: number;    // Total review count
  status: 'new' | 'learning' | 'review' | 'mastered';
}

export interface ReviewResult {
  quality: 0 | 1 | 2 | 3 | 4 | 5;  // 0=complete blackout, 5=perfect response
}

// Quality mappings for chess patterns
export const QUALITY_MAPPINGS = {
  COMPLETE_BLACKOUT: 0,      // Couldn't find the move at all
  WRONG_MOVE: 1,             // Made incorrect move(s)
  WRONG_BUT_REMEMBERED: 2,   // Wrong initially, but recognized after hint
  CORRECT_WITH_DIFFICULTY: 3, // Correct but took a while
  CORRECT_WITH_HESITATION: 4, // Correct with minor hesitation
  PERFECT: 5                  // Instant recall
} as const;

// ============================================
// SM-2 ALGORITHM IMPLEMENTATION
// ============================================

export function calculateNextReview(
  card: SRSCard,
  quality: number
): SRSCard {
  // Clone the card to avoid mutations
  const newCard = { ...card };
  newCard.totalReviews++;
  newCard.lastReview = Date.now();

  // If quality < 3, the response was a failure
  if (quality < 3) {
    newCard.repetitions = 0;
    newCard.interval = 1; // Reset to 1 day
    newCard.lapses++;
    newCard.status = 'learning';
    
    // Decrease ease factor (but not below 1.3)
    newCard.easeFactor = Math.max(1.3, newCard.easeFactor - 0.2);
  } else {
    // Successful recall
    if (newCard.repetitions === 0) {
      newCard.interval = 1;
    } else if (newCard.repetitions === 1) {
      newCard.interval = 6;
    } else {
      newCard.interval = Math.round(newCard.interval * newCard.easeFactor);
    }
    
    newCard.repetitions++;
    
    // Update ease factor using SM-2 formula
    newCard.easeFactor = Math.max(
      1.3,
      newCard.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
    
    // Update status
    if (newCard.repetitions >= 5 && newCard.interval >= 21) {
      newCard.status = 'mastered';
    } else if (newCard.repetitions >= 2) {
      newCard.status = 'review';
    } else {
      newCard.status = 'learning';
    }
  }

  // Calculate next review date
  newCard.nextReview = Date.now() + (newCard.interval * 24 * 60 * 60 * 1000);

  return newCard;
}

// ============================================
// PATTERN PROGRESS STORAGE
// ============================================

const STORAGE_KEY = 'zen-chess-srs-patterns';

export interface PatternProgress {
  cards: Record<string, SRSCard>;
  lastSession: number;
  totalXP: number;
  streakDays: number;
  lastStreakDate: string;
}

export function loadPatternProgress(): PatternProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    logger.error('Failed to load pattern progress:', e);
  }
  
  return {
    cards: {},
    lastSession: 0,
    totalXP: 0,
    streakDays: 0,
    lastStreakDate: '',
  };
}

export function savePatternProgress(progress: PatternProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    logger.error('Failed to save pattern progress:', e);
  }
}

export function getOrCreateCard(progress: PatternProgress, patternId: string): SRSCard {
  if (progress.cards[patternId]) {
    return progress.cards[patternId];
  }
  
  return {
    id: patternId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
    lapses: 0,
    totalReviews: 0,
    status: 'new',
  };
}

export function updateCard(
  progress: PatternProgress,
  patternId: string,
  quality: number
): PatternProgress {
  const card = getOrCreateCard(progress, patternId);
  const updatedCard = calculateNextReview(card, quality);
  
  // Calculate XP earned
  let xpEarned = 0;
  if (quality >= 3) {
    xpEarned = 10 + (quality - 3) * 5; // 10-20 XP for correct answers
    if (updatedCard.status === 'mastered' && card.status !== 'mastered') {
      xpEarned += 50; // Bonus for mastering
    }
  } else {
    xpEarned = 2; // Small XP for attempt
  }
  
  // Update streak
  const today = new Date().toDateString();
  let newStreakDays = progress.streakDays;
  
  if (progress.lastStreakDate !== today) {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    if (progress.lastStreakDate === yesterday) {
      newStreakDays++;
    } else if (progress.lastStreakDate !== today) {
      newStreakDays = 1;
    }
  }
  
  return {
    ...progress,
    cards: {
      ...progress.cards,
      [patternId]: updatedCard,
    },
    lastSession: Date.now(),
    totalXP: progress.totalXP + xpEarned,
    streakDays: newStreakDays,
    lastStreakDate: today,
  };
}

// ============================================
// QUEUE MANAGEMENT
// ============================================

export interface ReviewQueue {
  newCards: string[];
  learningCards: string[];
  reviewCards: string[];
  masteredCards: string[];
}

export function getReviewQueue(
  progress: PatternProgress,
  allPatternIds: string[]
): ReviewQueue {
  const now = Date.now();
  
  const queue: ReviewQueue = {
    newCards: [],
    learningCards: [],
    reviewCards: [],
    masteredCards: [],
  };
  
  allPatternIds.forEach(id => {
    const card = progress.cards[id];
    
    if (!card) {
      queue.newCards.push(id);
    } else {
      switch (card.status) {
        case 'new':
          queue.newCards.push(id);
          break;
        case 'learning':
          if (card.nextReview <= now) {
            queue.learningCards.push(id);
          }
          break;
        case 'review':
          if (card.nextReview <= now) {
            queue.reviewCards.push(id);
          }
          break;
        case 'mastered':
          if (card.nextReview <= now) {
            queue.masteredCards.push(id);
          }
          break;
      }
    }
  });
  
  return queue;
}

export function getDueCount(progress: PatternProgress, allPatternIds: string[]): number {
  const queue = getReviewQueue(progress, allPatternIds);
  return queue.learningCards.length + queue.reviewCards.length;
}

export function getNextPatternToStudy(
  progress: PatternProgress,
  allPatternIds: string[],
  category?: string
): string | null {
  const queue = getReviewQueue(progress, allPatternIds);
  
  // Priority: learning > review > new > mastered
  if (queue.learningCards.length > 0) return queue.learningCards[0];
  if (queue.reviewCards.length > 0) return queue.reviewCards[0];
  if (queue.newCards.length > 0) return queue.newCards[0];
  if (queue.masteredCards.length > 0) return queue.masteredCards[0];
  
  return null;
}

// ============================================
// STATISTICS
// ============================================

export interface PatternStats {
  total: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  dueToday: number;
  averageEase: number;
}

export function getPatternStats(
  progress: PatternProgress,
  allPatternIds: string[]
): PatternStats {
  const queue = getReviewQueue(progress, allPatternIds);
  
  let totalEase = 0;
  let easeCount = 0;
  
  Object.values(progress.cards).forEach(card => {
    if (card.status !== 'new') {
      totalEase += card.easeFactor;
      easeCount++;
    }
  });
  
  return {
    total: allPatternIds.length,
    new: queue.newCards.length,
    learning: Object.values(progress.cards).filter(c => c.status === 'learning').length,
    review: Object.values(progress.cards).filter(c => c.status === 'review').length,
    mastered: Object.values(progress.cards).filter(c => c.status === 'mastered').length,
    dueToday: queue.learningCards.length + queue.reviewCards.length,
    averageEase: easeCount > 0 ? totalEase / easeCount : 2.5,
  };
}

// ============================================
// QUALITY CALCULATION HELPERS
// ============================================

export function calculateQuality(
  correctMoves: number,
  incorrectMoves: number,
  hintsUsed: number,
  totalMoves: number
): number {
  // Perfect: no mistakes, no hints
  if (incorrectMoves === 0 && hintsUsed === 0) {
    return 5;
  }
  
  // Very good: no mistakes, maybe used hints
  if (incorrectMoves === 0 && hintsUsed <= 1) {
    return 4;
  }
  
  // Good: few mistakes
  if (incorrectMoves <= 1) {
    return 3;
  }
  
  // Difficult: several mistakes but completed
  if (incorrectMoves <= 3) {
    return 2;
  }
  
  // Failure: too many mistakes
  if (incorrectMoves <= totalMoves / 2) {
    return 1;
  }
  
  // Complete blackout
  return 0;
}







