import type { PatternType } from '@/lib/types';

export type PuzzleMode = 'menu' | 'rated' | 'rush' | 'streak' | 'daily' | 'custom';

export interface PuzzleStats {
  rating: number;
  puzzlesSolved: number;
  puzzlesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  tier: TierLevel;
  dailyPuzzleDate: string | null;
  dailyPuzzleSolved: boolean;
  rushHighScore: number;
  themeStats: Record<PatternType, { solved: number; failed: number }>;
}

export type TierLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'MASTER';

export type FeedbackType = 'correct' | 'incorrect' | 'complete' | null;

export type HintLevel = 0 | 1 | 2;
