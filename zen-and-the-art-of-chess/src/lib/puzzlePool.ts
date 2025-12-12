// ============================================
// LOCAL PUZZLE POOL
// Manages puzzle selection for offline/anonymous users
// Uses the existing static puzzle data
// ============================================

import { allPuzzles } from '@/data/puzzles';
import { logger } from './logger';
import type { ChessPuzzle } from './types';
import {
  getLocalPuzzleData,
  updateLastThemes,
  isThemeOverused,
  type PuzzleWithMeta,
} from './puzzleService';

// ============================================
// CONVERT LOCAL PUZZLES TO LICHESS FORMAT
// ============================================

/**
 * Convert difficulty (1-5) to approximate Elo rating
 * Matches the old getPuzzleRating function but with better distribution
 */
function difficultyToRating(difficulty: number): number {
  const ratings: Record<number, number> = {
    1: 800,   // Beginner
    2: 1100,  // Easy
    3: 1400,  // Intermediate
    4: 1700,  // Advanced
    5: 2000,  // Master
  };
  return ratings[difficulty] || 1000;
}

/**
 * Convert our internal themes to lowercase format
 */
function normalizeThemes(themes: string[]): string[] {
  return themes.map(t => t.toLowerCase().replace(/_/g, '_'));
}

/**
 * Convert a ChessPuzzle to PuzzleWithMeta format
 */
function convertToPuzzleWithMeta(puzzle: ChessPuzzle): PuzzleWithMeta {
  return {
    id: puzzle.id,
    fen: puzzle.fen,
    solutionMoves: puzzle.solution,
    rating: difficultyToRating(puzzle.difficulty),
    themes: normalizeThemes(puzzle.themes),
  };
}

// ============================================
// PUZZLE SELECTION
// ============================================

interface SelectionConfig {
  userRating: number;
  ratingRange?: number;
  excludeIds?: string[];
  excludeThemes?: string[];
  mode?: 'rated' | 'streak' | 'rush' | 'daily' | 'custom';
  theme?: string;
  difficulty?: number;
}

/**
 * Select a puzzle from the local pool based on user rating and preferences
 * Implements chess.com-style selection:
 * - Rating-matched puzzles
 * - No recent repeats
 * - Theme variety
 */
export function selectLocalPuzzle(config: SelectionConfig): PuzzleWithMeta | null {
  const {
    userRating,
    ratingRange = 200,
    excludeIds = [],
    excludeThemes = [],
    mode = 'rated',
    theme,
    difficulty,
  } = config;
  
  // Get local data for history
  const localData = getLocalPuzzleData();
  const recentIds = new Set([...excludeIds, ...localData.recentPuzzleIds]);
  
  // Build exclusion set for themes
  const themesToAvoid = new Set(excludeThemes);
  localData.lastThemes.forEach(t => {
    if (isThemeOverused(t, localData.lastThemes)) {
      themesToAvoid.add(t);
    }
  });
  
  // Filter puzzles
  let pool = allPuzzles.filter(puzzle => {
    // Don't repeat recent puzzles
    if (recentIds.has(puzzle.id)) return false;
    
    // Filter by difficulty if specified
    if (difficulty !== undefined && puzzle.difficulty !== difficulty) {
      return false;
    }
    
    // Filter by theme if specified
    if (theme && !puzzle.themes.some(t => t.toLowerCase() === theme.toLowerCase())) {
      return false;
    }
    
    // Filter by rating range (unless in streak/rush mode where we use difficulty)
    if (mode === 'rated' || mode === 'custom') {
      const puzzleRating = difficultyToRating(puzzle.difficulty);
      if (puzzleRating < userRating - ratingRange || puzzleRating > userRating + ratingRange) {
        return false;
      }
    }
    
    return true;
  });
  
  // Apply theme variety (avoid recently seen primary themes)
  if (pool.length > 5 && themesToAvoid.size > 0) {
    const variedPool = pool.filter(puzzle => {
      const primaryTheme = normalizeThemes(puzzle.themes)[0];
      return !themesToAvoid.has(primaryTheme);
    });
    
    // Only use varied pool if we still have options
    if (variedPool.length > 0) {
      pool = variedPool;
    }
  }
  
  // If pool is empty, expand range
  if (pool.length === 0) {
    pool = allPuzzles.filter(p => !recentIds.has(p.id));
  }
  
  // If still empty, allow repeats but prefer unseen
  if (pool.length === 0) {
    pool = allPuzzles;
    logger.warn('Puzzle pool exhausted, allowing repeats');
  }
  
  // Random selection from pool
  const selectedPuzzle = pool[Math.floor(Math.random() * pool.length)];
  
  if (selectedPuzzle) {
    // Update last themes for variety tracking
    updateLastThemes(normalizeThemes(selectedPuzzle.themes));
    return convertToPuzzleWithMeta(selectedPuzzle);
  }
  
  return null;
}

/**
 * Get a daily puzzle (deterministic based on date)
 */
export function getDailyPuzzle(): PuzzleWithMeta {
  const today = new Date().toISOString().split('T')[0];
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0);
  const index = seed % allPuzzles.length;
  return convertToPuzzleWithMeta(allPuzzles[index]);
}

/**
 * Get a puzzle for streak mode (progressively harder)
 */
export function getStreakPuzzle(streakCount: number): PuzzleWithMeta | null {
  // Increase difficulty every 3 puzzles
  const targetDifficulty = Math.min(5, Math.floor(streakCount / 3) + 1);
  
  return selectLocalPuzzle({
    userRating: difficultyToRating(targetDifficulty),
    ratingRange: 300,  // Wider range for streak
    mode: 'streak',
    difficulty: targetDifficulty,
  });
}

/**
 * Get a puzzle for rush mode (timed, slightly easier)
 */
export function getRushPuzzle(userRating: number): PuzzleWithMeta | null {
  return selectLocalPuzzle({
    userRating: userRating - 100,  // Slightly easier for speed
    ratingRange: 250,
    mode: 'rush',
  });
}

/**
 * Get puzzles by theme for custom training
 */
export function getPuzzlesByTheme(theme: string, count: number = 10): PuzzleWithMeta[] {
  const matching = allPuzzles.filter(p => 
    p.themes.some(t => t.toLowerCase() === theme.toLowerCase())
  );
  
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(convertToPuzzleWithMeta);
}

/**
 * Get puzzles by difficulty for custom training
 */
export function getPuzzlesByDifficulty(difficulty: number, count: number = 10): PuzzleWithMeta[] {
  const matching = allPuzzles.filter(p => p.difficulty === difficulty);
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(convertToPuzzleWithMeta);
}

// ============================================
// PUZZLE POOL STATS
// ============================================

export interface PuzzlePoolStats {
  totalPuzzles: number;
  byDifficulty: Record<number, number>;
  byTheme: Record<string, number>;
  ratingRange: { min: number; max: number };
}

/**
 * Get statistics about the local puzzle pool
 */
export function getPuzzlePoolStats(): PuzzlePoolStats {
  const byDifficulty: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const byTheme: Record<string, number> = {};
  
  allPuzzles.forEach(puzzle => {
    byDifficulty[puzzle.difficulty] = (byDifficulty[puzzle.difficulty] || 0) + 1;
    puzzle.themes.forEach(theme => {
      const normalized = theme.toLowerCase();
      byTheme[normalized] = (byTheme[normalized] || 0) + 1;
    });
  });
  
  return {
    totalPuzzles: allPuzzles.length,
    byDifficulty,
    byTheme,
    ratingRange: {
      min: difficultyToRating(1),
      max: difficultyToRating(5),
    },
  };
}

// ============================================
// ORIGINAL PUZZLE DATA ACCESS
// ============================================

/**
 * Get the original ChessPuzzle object by ID
 */
export function getOriginalPuzzle(id: string): ChessPuzzle | undefined {
  return allPuzzles.find(p => p.id === id);
}

/**
 * Check if a puzzle ID exists in the local pool
 */
export function puzzleExists(id: string): boolean {
  return allPuzzles.some(p => p.id === id);
}



