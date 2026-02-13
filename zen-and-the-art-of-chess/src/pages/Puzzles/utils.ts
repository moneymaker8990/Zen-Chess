import type { PuzzleWithMeta } from '@/lib/puzzleService';
import { getThemeLabel } from '@/lib/puzzleService';
import type { TierLevel } from './types';

// ============================================
// LEVEL SYSTEM - Chess.com style progress
// ============================================

// XP needed per level (increases each level)
export const getXpForLevel = (level: number): number => {
  if (level <= 5) return 50;
  if (level <= 10) return 75;
  if (level <= 20) return 100;
  if (level <= 30) return 150;
  return 200;
};

// Calculate total XP needed to reach a level
export const getTotalXpForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXpForLevel(i);
  }
  return total;
};

// Calculate level from total XP
export const getLevelFromXp = (totalXp: number): { level: number; currentXp: number; xpForNextLevel: number } => {
  let level = 1;
  let remainingXp = totalXp;

  while (remainingXp >= getXpForLevel(level)) {
    remainingXp -= getXpForLevel(level);
    level++;
  }

  return {
    level,
    currentXp: remainingXp,
    xpForNextLevel: getXpForLevel(level),
  };
};

// XP reward for solving a puzzle
export const getXpReward = (puzzleRating: number, userRating: number, solved: boolean): number => {
  if (!solved) return 0;
  const ratingDiff = puzzleRating - userRating;
  if (ratingDiff > 200) return 20;
  if (ratingDiff > 100) return 15;
  if (ratingDiff > 0) return 12;
  return 10;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTierFromRating(rating: number): TierLevel {
  if (rating >= 2400) return 'MASTER';
  if (rating >= 2000) return 'DIAMOND';
  if (rating >= 1600) return 'PLATINUM';
  if (rating >= 1200) return 'GOLD';
  if (rating >= 800) return 'SILVER';
  return 'BRONZE';
}

export function getNextTier(tier: TierLevel): TierLevel | null {
  const tiers: TierLevel[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER'];
  const idx = tiers.indexOf(tier);
  return idx < tiers.length - 1 ? tiers[idx + 1] : null;
}

// Get puzzle rating (Lichess puzzles always have rating)
export function getPuzzleRating(puzzle: PuzzleWithMeta): number {
  return puzzle.rating;
}

// Get solution moves as array (Lichess puzzles use UCI format)
export function getSolutionMoves(puzzle: PuzzleWithMeta): string[] {
  return puzzle.solutionMoves;
}

// Get themes
export function getThemes(puzzle: PuzzleWithMeta): string[] {
  return puzzle.themes || [];
}

// Get puzzle title from themes
export function getPuzzleTitle(puzzle: PuzzleWithMeta): string {
  const themes = getThemes(puzzle);
  if (themes.length > 0) {
    return getThemeLabel(themes[0]);
  }
  return 'Find the Best Move';
}

// Get difficulty (1-5 scale) from rating
export function getPuzzleDifficulty(puzzle: PuzzleWithMeta): number {
  const rating = puzzle.rating;
  if (rating < 1000) return 1;
  if (rating < 1300) return 2;
  if (rating < 1600) return 3;
  if (rating < 1900) return 4;
  return 5;
}

// Get puzzle explanation from themes
export function getPuzzleExplanation(puzzle: PuzzleWithMeta): string | null {
  const themes = puzzle.themes || [];
  if (themes.length === 0) return null;

  const themeExplanations: Record<string, string> = {
    'fork': 'Look for a piece that can attack two enemy pieces simultaneously.',
    'pin': 'Find a way to pin an enemy piece to a more valuable piece behind it.',
    'skewer': 'Attack a valuable piece that must move, exposing a piece behind it.',
    'discovery': 'Move a piece to reveal an attack from another piece behind it.',
    'deflection': 'Force an enemy piece away from a key defensive square.',
    'decoy': 'Lure an enemy piece to a vulnerable square.',
    'sacrifice': 'Give up material to gain a decisive advantage.',
    'back_rank': 'Exploit the weakness of the back rank.',
    'mate_in_1': 'Deliver checkmate in one move.',
    'mate_in_2': 'Find the forcing sequence to checkmate in two moves.',
    'mate_in_3': 'Calculate the three-move checkmate.',
    'quiet_move': 'Sometimes the best move is a subtle one that improves your position.',
    'zwischenzug': 'Insert an intermediate move before the expected continuation.',
    'promotion': 'Push your pawn to promotion.',
    'exposed_king': 'Take advantage of the poorly protected enemy king.',
    'double_check': 'Deliver check with two pieces simultaneously.',
  };

  for (const theme of themes) {
    const lowerTheme = theme.toLowerCase().replace(/-/g, '_');
    if (themeExplanations[lowerTheme]) {
      return themeExplanations[lowerTheme];
    }
  }

  return null;
}

// Convert UCI move (e.g., "e2e4") to from/to squares
export function parseUciMove(uci: string): { from: string; to: string; promotion?: string } | null {
  if (uci.length < 4) return null;
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length > 4 ? uci[4] : undefined,
  };
}

// Check if a move matches the expected UCI move
export function moveMatchesUci(move: { from: string; to: string; promotion?: string }, uci: string): boolean {
  const expected = parseUciMove(uci);
  if (!expected) return false;
  if (move.from !== expected.from || move.to !== expected.to) return false;
  if (expected.promotion && move.promotion !== expected.promotion) return false;
  return true;
}
