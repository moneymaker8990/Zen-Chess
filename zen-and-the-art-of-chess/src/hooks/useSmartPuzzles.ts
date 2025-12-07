// ============================================
// SMART PUZZLES HOOK
// AI-powered puzzle selection and adaptation
// Works silently behind the scenes
// ============================================

import { useCallback, useMemo, useRef, useState } from 'react';
import { useAIIntelligence, useIntelligentDefaults } from '@/lib/aiIntelligence';
import { getNextPuzzleAnonymous, getPuzzlesByTheme, type PuzzleWithMeta } from '@/lib/puzzleService';
import type { PatternType } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface SmartPuzzleConfig {
  /** Force a specific difficulty (overrides AI) */
  forcedDifficulty?: number;
  /** Force a specific theme (overrides AI) */
  forcedTheme?: PatternType;
  /** Puzzle mode affects selection strategy */
  mode: 'rated' | 'rush' | 'streak' | 'practice' | 'weakness';
}

interface SmartPuzzleState {
  /** Currently selected puzzle */
  currentPuzzle: PuzzleWithMeta | null;
  /** AI-determined difficulty for this puzzle */
  effectiveDifficulty: number;
  /** Why this puzzle was selected */
  selectionReason: string;
  /** Is the AI in adaptive mode */
  adaptiveMode: boolean;
  /** Puzzles seen this session (to avoid repetition) */
  seenCount: number;
  /** Loading state */
  isLoading: boolean;
}

interface SmartPuzzleActions {
  /** Get next puzzle with AI selection */
  getNextPuzzle: () => Promise<PuzzleWithMeta | null>;
  /** Record puzzle result for learning */
  recordResult: (solved: boolean, timeSeconds: number, usedHint: boolean) => void;
  /** Skip current puzzle (records as skipped) */
  skipPuzzle: () => void;
  /** Reset session (clears seen puzzles) */
  resetSession: () => void;
}

// ============================================
// SMART PUZZLE SELECTION LOGIC (Async, uses Supabase)
// ============================================

async function selectSmartPuzzle(
  seenIds: Set<string>,
  targetDifficulty: number,
  targetTheme: string | null,
  mode: SmartPuzzleConfig['mode'],
  userStrengths: string[],
  userWeaknesses: string[],
): Promise<{ puzzle: PuzzleWithMeta | null; reason: string }> {
  // Convert difficulty (1-5) to rating (600-2100)
  const targetRating = 600 + (targetDifficulty * 300);
  const ratingRange = mode === 'streak' ? 150 : 200;
  const excludeIds = Array.from(seenIds);
  
  let reason = 'Random selection';
  let puzzle: PuzzleWithMeta | null = null;
  
  try {
    if (mode === 'weakness' && userWeaknesses.length > 0) {
      // Target weaknesses
      const weakness = userWeaknesses[0].toLowerCase();
      const themePuzzles = await getPuzzlesByTheme(weakness, 20, targetRating);
      const unseen = themePuzzles.filter(p => !seenIds.has(p.id));
      if (unseen.length > 0) {
        puzzle = unseen[Math.floor(Math.random() * unseen.length)];
        reason = `Targeting weakness: ${userWeaknesses[0]}`;
      }
    } else if (targetTheme) {
      // Specific theme requested
      const themePuzzles = await getPuzzlesByTheme(targetTheme.toLowerCase(), 20, targetRating);
      const unseen = themePuzzles.filter(p => !seenIds.has(p.id));
      if (unseen.length > 0) {
        puzzle = unseen[Math.floor(Math.random() * unseen.length)];
        reason = `Theme focus: ${targetTheme}`;
      }
    } else if (mode === 'practice') {
      // Mix of strengths and weaknesses
      const rand = Math.random();
      if (rand < 0.3 && userWeaknesses.length > 0) {
        const weakness = userWeaknesses[Math.floor(Math.random() * userWeaknesses.length)];
        const themePuzzles = await getPuzzlesByTheme(weakness.toLowerCase(), 20, targetRating);
        const unseen = themePuzzles.filter(p => !seenIds.has(p.id));
        if (unseen.length > 0) {
          puzzle = unseen[Math.floor(Math.random() * unseen.length)];
          reason = `Building up: ${weakness}`;
        }
      } else if (rand < 0.5 && userStrengths.length > 0) {
        const strength = userStrengths[Math.floor(Math.random() * userStrengths.length)];
        const themePuzzles = await getPuzzlesByTheme(strength.toLowerCase(), 20, targetRating);
        const unseen = themePuzzles.filter(p => !seenIds.has(p.id));
        if (unseen.length > 0) {
          puzzle = unseen[Math.floor(Math.random() * unseen.length)];
          reason = `Reinforcing: ${strength}`;
        }
      }
      if (!puzzle) {
        reason = 'Balanced practice';
      }
    }
    
    // Fallback to rating-based selection
    if (!puzzle) {
      puzzle = await getNextPuzzleAnonymous(targetRating, excludeIds, { ratingRange });
      
      if (mode === 'rated') {
        reason = `Difficulty: ${targetDifficulty}★`;
      } else if (mode === 'rush') {
        reason = 'Speed challenge';
      } else if (mode === 'streak') {
        reason = `Streak difficulty: ${targetDifficulty}★`;
      }
    }
  } catch (err) {
    console.error('Failed to select puzzle:', err);
  }
  
  return { puzzle, reason };
}

// ============================================
// MAIN HOOK
// ============================================

export function useSmartPuzzles(config: SmartPuzzleConfig): SmartPuzzleState & SmartPuzzleActions {
  const { mode, forcedDifficulty, forcedTheme } = config;
  
  // AI Intelligence integration
  const defaults = useIntelligentDefaults();
  const { 
    getSmartPuzzleDifficulty, 
    getSmartPuzzleTheme,
    recordPuzzleAttempt,
    learnFromBehavior,
    patterns,
    adaptiveDifficultyEnabled,
  } = useAIIntelligence();
  
  // Local state
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleWithMeta | null>(null);
  const [selectionReason, setSelectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const seenPuzzles = useRef<Set<string>>(new Set());
  const puzzleStartTime = useRef<number>(Date.now());
  
  // Compute effective difficulty
  const effectiveDifficulty = useMemo(() => {
    if (forcedDifficulty !== undefined) return forcedDifficulty;
    return adaptiveDifficultyEnabled ? getSmartPuzzleDifficulty() : defaults.puzzleDifficulty;
  }, [forcedDifficulty, adaptiveDifficultyEnabled, getSmartPuzzleDifficulty, defaults.puzzleDifficulty]);
  
  // Compute effective theme
  const effectiveTheme = useMemo(() => {
    if (forcedTheme !== undefined) return forcedTheme;
    return getSmartPuzzleTheme();
  }, [forcedTheme, getSmartPuzzleTheme]);
  
  // Get next puzzle with smart selection (async)
  const getNextPuzzle = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const { puzzle, reason } = await selectSmartPuzzle(
        seenPuzzles.current,
        effectiveDifficulty,
        effectiveTheme,
        mode,
        patterns.puzzleStrengths,
        patterns.puzzleWeaknesses,
      );
      
      if (puzzle) {
        seenPuzzles.current.add(puzzle.id);
        // Reset seen if too many
        if (seenPuzzles.current.size > 100) {
          seenPuzzles.current.clear();
          seenPuzzles.current.add(puzzle.id);
        }
        setCurrentPuzzle(puzzle);
        setSelectionReason(reason);
        puzzleStartTime.current = Date.now();
      }
      
      return puzzle;
    } finally {
      setIsLoading(false);
    }
  }, [effectiveDifficulty, effectiveTheme, mode, patterns]);
  
  // Record puzzle result
  const recordResult = useCallback((solved: boolean, timeSeconds: number, usedHint: boolean) => {
    if (!currentPuzzle) return;
    
    // Record to AI Intelligence
    recordPuzzleAttempt(solved, timeSeconds, usedHint);
    
    // Learn from the theme
    currentPuzzle.themes.forEach(theme => {
      learnFromBehavior({
        type: 'puzzle_complete',
        solved,
        time: timeSeconds,
        theme,
        usedHint,
      });
    });
  }, [currentPuzzle, recordPuzzleAttempt, learnFromBehavior]);
  
  // Skip puzzle
  const skipPuzzle = useCallback(() => {
    // Record as failed attempt with 0 time (indicates skip)
    recordPuzzleAttempt(false, 0, false);
  }, [recordPuzzleAttempt]);
  
  // Reset session
  const resetSession = useCallback(() => {
    seenPuzzles.current.clear();
    setCurrentPuzzle(null);
    setSelectionReason('');
  }, []);
  
  return {
    // State
    currentPuzzle,
    effectiveDifficulty,
    selectionReason,
    adaptiveMode: adaptiveDifficultyEnabled,
    seenCount: seenPuzzles.current.size,
    isLoading,
    
    // Actions
    getNextPuzzle,
    recordResult,
    skipPuzzle,
    resetSession,
  };
}

// ============================================
// CONVENIENCE HOOKS
// ============================================

/** Hook for rated puzzle mode */
export function useRatedPuzzles() {
  return useSmartPuzzles({ mode: 'rated' });
}

/** Hook for practice mode with AI adaptation */
export function usePracticePuzzles() {
  return useSmartPuzzles({ mode: 'practice' });
}

/** Hook for targeting weaknesses */
export function useWeaknessPuzzles() {
  return useSmartPuzzles({ mode: 'weakness' });
}

/** Hook for rush mode (easier, speed-focused) */
export function useRushPuzzles() {
  return useSmartPuzzles({ mode: 'rush' });
}

/** Hook for streak mode (progressive difficulty) */
export function useStreakPuzzles() {
  return useSmartPuzzles({ mode: 'streak' });
}

// ============================================
// SMART HINT TIMING
// ============================================

/** 
 * Hook that determines when to show hint suggestion
 * Returns true when AI thinks user needs a hint
 */
export function useSmartHintTiming(attempts: number, timeSpentSeconds: number) {
  const { shouldShowHint } = useAIIntelligence();
  const { defaults, patterns } = useAIIntelligence();
  
  return useMemo(() => {
    // Don't suggest if user rarely uses hints
    if (patterns.hintUsageRate < 0.1) return false;
    
    // Check AI decision
    return shouldShowHint(attempts, timeSpentSeconds);
  }, [attempts, timeSpentSeconds, shouldShowHint, patterns.hintUsageRate]);
}

// ============================================
// SMART DIFFICULTY INDICATOR
// ============================================

/**
 * Hook that provides difficulty calibration info
 */
export function useDifficultyCalibration() {
  const { session, patterns, defaults, confidenceLevel } = useAIIntelligence();
  
  return useMemo(() => {
    const currentSuccess = session.puzzlesAttempted > 0 
      ? session.puzzlesSolved / session.puzzlesAttempted 
      : 0;
    
    return {
      currentDifficulty: defaults.puzzleDifficulty,
      sessionSuccessRate: currentSuccess,
      aiConfidence: confidenceLevel,
      isCalibrated: confidenceLevel !== 'learning',
      shouldIncrease: currentSuccess > 0.85,
      shouldDecrease: currentSuccess < 0.4,
    };
  }, [session, defaults, confidenceLevel]);
}

export default useSmartPuzzles;





