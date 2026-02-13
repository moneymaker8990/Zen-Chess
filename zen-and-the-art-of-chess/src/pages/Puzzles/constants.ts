import type { PatternType } from '@/lib/types';
import type { TierLevel, PuzzleStats } from './types';

export const TIER_CONFIG: Record<TierLevel, { name: string; minRating: number; color: string; icon: string }> = {
  BRONZE: { name: 'Bronze', minRating: 0, color: '#cd7f32', icon: '🥉' },
  SILVER: { name: 'Silver', minRating: 800, color: '#c0c0c0', icon: '🥈' },
  GOLD: { name: 'Gold', minRating: 1200, color: '#ffd700', icon: '🥇' },
  PLATINUM: { name: 'Platinum', minRating: 1600, color: '#e5e4e2', icon: '💎' },
  DIAMOND: { name: 'Diamond', minRating: 2000, color: '#b9f2ff', icon: '💠' },
  MASTER: { name: 'Master', minRating: 2400, color: '#ff6b6b', icon: '👑' },
};

export const THEME_LABELS: Record<PatternType, string> = {
  FORK: 'Fork',
  PIN: 'Pin',
  SKEWER: 'Skewer',
  DISCOVERY: 'Discovery',
  DEFLECTION: 'Deflection',
  DECOY: 'Decoy',
  QUIET_MOVE: 'Quiet Move',
  ZWISCHENZUG: 'Zwischenzug',
  BACK_RANK: 'Back Rank',
  MATE_PATTERN: 'Checkmate',
  SACRIFICE: 'Sacrifice',
  CHECK: 'Check',
  CAPTURE: 'Capture',
  TACTICAL: 'Tactical',
};

export const DEFAULT_STATS: PuzzleStats = {
  rating: 1000,
  puzzlesSolved: 0,
  puzzlesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalPoints: 0,
  tier: 'BRONZE',
  dailyPuzzleDate: null,
  dailyPuzzleSolved: false,
  rushHighScore: 0,
  themeStats: {} as Record<PatternType, { solved: number; failed: number }>,
};
