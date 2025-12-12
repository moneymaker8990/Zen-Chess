// ============================================
// SPACED REPETITION SYSTEM (SRS)
// For Puzzle Training (SpacedRepetitionPage)
// Based on SM-2 algorithm with chess-specific modifications
// 
// NOTE: This module includes puzzle-specific features (FEN, solutions, themes).
// For simpler pattern training SRS, see spacedRepetition.ts
// ============================================

// ============================================
// TYPES
// ============================================

export interface SRSCard {
  id: string;
  fen: string;
  solution: string[];
  themes: string[];
  difficulty: number;
  
  // Setup move - opponent's last move that leads to the puzzle position
  beforeFen?: string;
  setupMove?: { from: string; to: string };
  
  // SRS Data
  easeFactor: number;     // 1.3 - 2.5, affects interval growth
  interval: number;       // Days until next review
  repetitions: number;    // Successful reviews in a row
  nextReview: string;     // ISO date string
  lastReview: string;     // ISO date string
  
  // Performance tracking
  totalReviews: number;
  correctReviews: number;
  averageTime: number;    // Average solve time in seconds
  fastestTime: number;
  
  // State
  status: 'new' | 'learning' | 'review' | 'mastered';
  streak: number;
}

export interface SRSReviewResult {
  quality: 0 | 1 | 2 | 3 | 4 | 5;  // 0-2: fail, 3: hard, 4: good, 5: easy
  timeSpent: number;               // Seconds
  hintsUsed: number;
}

export interface SRSStats {
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  masteredCards: number;
  dueToday: number;
  reviewedToday: number;
  correctToday: number;
  streak: number;
  lastStudyDate: string | null;
}

export interface SRSDailySettings {
  newCardsPerDay: number;
  maxReviewsPerDay: number;
  learnSteps: number[];        // Minutes between learning steps
  graduatingInterval: number;  // Days
  easyInterval: number;        // Days
  masterThreshold: number;     // Days interval to be considered mastered
}

// ============================================
// CONSTANTS & DEFAULTS
// ============================================

const DEFAULT_SETTINGS: SRSDailySettings = {
  newCardsPerDay: 10,
  maxReviewsPerDay: 50,
  learnSteps: [1, 10],        // 1 min, 10 min
  graduatingInterval: 1,      // 1 day
  easyInterval: 4,            // 4 days
  masterThreshold: 21         // 21+ days = mastered
};

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

// ============================================
// SRS ALGORITHM (Modified SM-2)
// ============================================

export function calculateNextReview(
  card: SRSCard,
  result: SRSReviewResult,
  settings: SRSDailySettings = DEFAULT_SETTINGS
): Partial<SRSCard> {
  const now = new Date();
  const quality = result.quality;
  
  // If failed (quality < 3), reset to learning
  if (quality < 3) {
    return {
      easeFactor: Math.max(MIN_EASE_FACTOR, card.easeFactor - 0.2),
      interval: 0,
      repetitions: 0,
      nextReview: addMinutes(now, settings.learnSteps[0]).toISOString(),
      lastReview: now.toISOString(),
      totalReviews: card.totalReviews + 1,
      correctReviews: card.correctReviews,
      averageTime: updateAverage(card.averageTime, result.timeSpent, card.totalReviews),
      status: 'learning',
      streak: 0
    };
  }
  
  // Successful review
  let newInterval: number;
  let newEaseFactor = card.easeFactor;
  let newRepetitions = card.repetitions + 1;
  let newStatus = card.status;
  
  // Adjust ease factor based on quality
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  newEaseFactor = newEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEaseFactor = Math.max(MIN_EASE_FACTOR, newEaseFactor);
  
  if (card.status === 'new' || card.status === 'learning') {
    // Learning phase
    if (quality === 5) {
      // Easy - graduate immediately with easy interval
      newInterval = settings.easyInterval;
      newStatus = 'review';
    } else if (newRepetitions >= settings.learnSteps.length) {
      // Graduate to review
      newInterval = settings.graduatingInterval;
      newStatus = 'review';
    } else {
      // Stay in learning
      const nextStepMinutes = settings.learnSteps[Math.min(newRepetitions, settings.learnSteps.length - 1)];
      return {
        easeFactor: newEaseFactor,
        interval: 0,
        repetitions: newRepetitions,
        nextReview: addMinutes(now, nextStepMinutes).toISOString(),
        lastReview: now.toISOString(),
        totalReviews: card.totalReviews + 1,
        correctReviews: card.correctReviews + 1,
        averageTime: updateAverage(card.averageTime, result.timeSpent, card.totalReviews),
        status: 'learning',
        streak: card.streak + 1
      };
    }
  } else {
    // Review phase - calculate new interval
    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(card.interval * newEaseFactor);
    }
    
    // Adjust for quality
    if (quality === 3) {
      // Hard - interval * 1.2
      newInterval = Math.max(card.interval + 1, Math.round(newInterval * 0.8));
    } else if (quality === 5) {
      // Easy - interval * ease * 1.3
      newInterval = Math.round(newInterval * 1.3);
    }
    
    // Check for mastery
    if (newInterval >= settings.masterThreshold) {
      newStatus = 'mastered';
    }
  }
  
  const nextReviewDate = addDays(now, newInterval);
  
  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview: nextReviewDate.toISOString(),
    lastReview: now.toISOString(),
    totalReviews: card.totalReviews + 1,
    correctReviews: card.correctReviews + 1,
    averageTime: updateAverage(card.averageTime, result.timeSpent, card.totalReviews),
    fastestTime: result.timeSpent < card.fastestTime ? result.timeSpent : card.fastestTime,
    status: newStatus,
    streak: card.streak + 1
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function updateAverage(currentAvg: number, newValue: number, count: number): number {
  if (count === 0) return newValue;
  return (currentAvg * count + newValue) / (count + 1);
}

export function isDueToday(card: SRSCard): boolean {
  const now = new Date();
  const reviewDate = new Date(card.nextReview);
  return reviewDate <= now;
}

export function isDueWithinDays(card: SRSCard, days: number): boolean {
  const future = addDays(new Date(), days);
  const reviewDate = new Date(card.nextReview);
  return reviewDate <= future;
}

// ============================================
// CARD MANAGEMENT
// ============================================

export function createSRSCard(
  id: string,
  fen: string,
  solution: string[],
  themes: string[],
  difficulty: number,
  beforeFen?: string,
  setupMove?: { from: string; to: string }
): SRSCard {
  const now = new Date().toISOString();
  
  return {
    id,
    fen,
    solution,
    themes,
    difficulty,
    beforeFen,
    setupMove,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReview: now,
    lastReview: now,
    totalReviews: 0,
    correctReviews: 0,
    averageTime: 0,
    fastestTime: Infinity,
    status: 'new',
    streak: 0
  };
}

export function getCardsForToday(
  cards: SRSCard[],
  settings: SRSDailySettings = DEFAULT_SETTINGS,
  reviewedTodayCount: number = 0
): { newCards: SRSCard[]; reviewCards: SRSCard[]; learningCards: SRSCard[] } {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  
  // Get due cards
  const dueCards = cards.filter(c => isDueToday(c));
  
  // Separate by status
  const newCards = dueCards
    .filter(c => c.status === 'new')
    .slice(0, settings.newCardsPerDay);
  
  const learningCards = dueCards
    .filter(c => c.status === 'learning');
  
  const reviewCards = dueCards
    .filter(c => c.status === 'review' || c.status === 'mastered')
    .slice(0, Math.max(0, settings.maxReviewsPerDay - reviewedTodayCount));
  
  return { newCards, reviewCards, learningCards };
}

export function getNextCardToReview(
  cards: SRSCard[],
  settings: SRSDailySettings = DEFAULT_SETTINGS
): SRSCard | null {
  const { newCards, reviewCards, learningCards } = getCardsForToday(cards, settings);
  
  // Priority: learning > review > new
  if (learningCards.length > 0) {
    // Return the one due soonest
    return learningCards.sort((a, b) => 
      new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
    )[0];
  }
  
  if (reviewCards.length > 0) {
    // Return the most overdue
    return reviewCards.sort((a, b) => 
      new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
    )[0];
  }
  
  if (newCards.length > 0) {
    return newCards[0];
  }
  
  return null;
}

// ============================================
// STATISTICS
// ============================================

export function calculateSRSStats(
  cards: SRSCard[],
  reviewedTodayIds: string[]
): SRSStats {
  const stats: SRSStats = {
    totalCards: cards.length,
    newCards: cards.filter(c => c.status === 'new').length,
    learningCards: cards.filter(c => c.status === 'learning').length,
    reviewCards: cards.filter(c => c.status === 'review').length,
    masteredCards: cards.filter(c => c.status === 'mastered').length,
    dueToday: cards.filter(c => isDueToday(c)).length,
    reviewedToday: reviewedTodayIds.length,
    correctToday: 0, // Would need to track this separately
    streak: 0,
    lastStudyDate: null
  };
  
  return stats;
}

export function getRetentionRate(cards: SRSCard[]): number {
  const totalReviews = cards.reduce((sum, c) => sum + c.totalReviews, 0);
  const correctReviews = cards.reduce((sum, c) => sum + c.correctReviews, 0);
  
  if (totalReviews === 0) return 0;
  return Math.round((correctReviews / totalReviews) * 100);
}

export function getAverageDifficulty(cards: SRSCard[]): number {
  if (cards.length === 0) return 0;
  return cards.reduce((sum, c) => sum + c.difficulty, 0) / cards.length;
}

export function getWeakThemes(cards: SRSCard[]): string[] {
  const themeStats: Record<string, { correct: number; total: number }> = {};
  
  cards.forEach(card => {
    card.themes.forEach(theme => {
      if (!themeStats[theme]) {
        themeStats[theme] = { correct: 0, total: 0 };
      }
      themeStats[theme].total += card.totalReviews;
      themeStats[theme].correct += card.correctReviews;
    });
  });
  
  // Return themes with < 70% success rate
  return Object.entries(themeStats)
    .filter(([_, stats]) => stats.total > 5 && (stats.correct / stats.total) < 0.7)
    .map(([theme, _]) => theme);
}

export function getForecast(cards: SRSCard[], days: number = 7): number[] {
  const forecast: number[] = new Array(days).fill(0);
  const now = new Date();
  
  cards.forEach(card => {
    const reviewDate = new Date(card.nextReview);
    const daysUntilDue = Math.floor((reviewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue >= 0 && daysUntilDue < days) {
      forecast[daysUntilDue]++;
    } else if (daysUntilDue < 0) {
      forecast[0]++; // Overdue counts as today
    }
  });
  
  return forecast;
}

// ============================================
// QUALITY ASSESSMENT HELPERS
// ============================================

export function assessQuality(
  solved: boolean,
  timeSpent: number,
  hintsUsed: number,
  expectedTime: number = 30
): SRSReviewResult['quality'] {
  if (!solved) {
    // Failed
    if (hintsUsed > 1) return 0;  // Complete fail
    if (hintsUsed === 1) return 1; // Fail with help
    return 2;                      // Fail without help
  }
  
  // Solved
  if (hintsUsed > 0) return 3;     // Hard (needed help)
  
  // No hints
  if (timeSpent < expectedTime * 0.5) return 5;  // Easy (very fast)
  if (timeSpent < expectedTime * 1.5) return 4;  // Good (reasonable time)
  return 3;                                       // Hard (slow)
}

// ============================================
// EXPORT DEFAULT SETTINGS
// ============================================

export { DEFAULT_SETTINGS };




