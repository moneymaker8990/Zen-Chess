// ============================================
// SMART PUZZLES HOOK
// AI-powered puzzle selection and adaptation
// Works silently behind the scenes
// ============================================

import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useAIIntelligence, useIntelligentDefaults } from '@/lib/aiIntelligence';
import { puzzles } from '@/data/puzzles';
import type { ChessPuzzle, PatternType } from '@/lib/types';

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
  currentPuzzle: ChessPuzzle | null;
  /** AI-determined difficulty for this puzzle */
  effectiveDifficulty: number;
  /** Why this puzzle was selected */
  selectionReason: string;
  /** Is the AI in adaptive mode */
  adaptiveMode: boolean;
  /** Puzzles seen this session (to avoid repetition) */
  seenCount: number;
}

interface SmartPuzzleActions {
  /** Get next puzzle with AI selection */
  getNextPuzzle: () => ChessPuzzle;
  /** Record puzzle result for learning */
  recordResult: (solved: boolean, timeSeconds: number, usedHint: boolean) => void;
  /** Skip current puzzle (records as skipped) */
  skipPuzzle: () => void;
  /** Reset session (clears seen puzzles) */
  resetSession: () => void;
}

// ============================================
// SMART PUZZLE SELECTION LOGIC
// ============================================

function selectSmartPuzzle(
  allPuzzles: ChessPuzzle[],
  seenIds: Set<string>,
  targetDifficulty: number,
  targetTheme: string | null,
  mode: SmartPuzzleConfig['mode'],
  userStrengths: string[],
  userWeaknesses: string[],
): { puzzle: ChessPuzzle; reason: string } {
  // Filter out seen puzzles
  let pool = allPuzzles.filter(p => !seenIds.has(p.id));
  
  // If we've seen too many, reset
  if (pool.length < 10) {
    pool = allPuzzles;
  }
  
  // Apply difficulty filter (with tolerance)
  const difficultyRange = mode === 'streak' ? 0 : 1; // Streak mode is more strict
  pool = pool.filter(p => 
    p.difficulty >= targetDifficulty - difficultyRange && 
    p.difficulty <= targetDifficulty + difficultyRange
  );
  
  // If too few puzzles, widen the range
  if (pool.length < 5) {
    pool = allPuzzles.filter(p => !seenIds.has(p.id));
  }
  
  // Apply theme filtering based on mode
  let reason = 'Random selection';
  
  if (mode === 'weakness' && userWeaknesses.length > 0) {
    // Target weaknesses
    const weaknessPool = pool.filter(p => 
      p.themes.some(t => userWeaknesses.includes(t))
    );
    if (weaknessPool.length > 0) {
      pool = weaknessPool;
      reason = `Targeting weakness: ${userWeaknesses[0]}`;
    }
  } else if (targetTheme) {
    // Specific theme requested
    const themePool = pool.filter(p => p.themes.includes(targetTheme as PatternType));
    if (themePool.length > 0) {
      pool = themePool;
      reason = `Theme focus: ${targetTheme}`;
    }
  } else if (mode === 'practice') {
    // Mix of strengths and weaknesses - smart practice
    const rand = Math.random();
    if (rand < 0.3 && userWeaknesses.length > 0) {
      // 30% chance to target a weakness
      const weakness = userWeaknesses[Math.floor(Math.random() * userWeaknesses.length)];
      const weaknessPool = pool.filter(p => p.themes.includes(weakness as PatternType));
      if (weaknessPool.length > 0) {
        pool = weaknessPool;
        reason = `Building up: ${weakness}`;
      }
    } else if (rand < 0.5 && userStrengths.length > 0) {
      // 20% chance to reinforce a strength
      const strength = userStrengths[Math.floor(Math.random() * userStrengths.length)];
      const strengthPool = pool.filter(p => p.themes.includes(strength as PatternType));
      if (strengthPool.length > 0) {
        pool = strengthPool;
        reason = `Reinforcing: ${strength}`;
      }
    } else {
      reason = 'Balanced practice';
    }
  } else if (mode === 'rated') {
    // Rated mode - pure difficulty matching
    reason = `Difficulty: ${targetDifficulty}★`;
  } else if (mode === 'rush') {
    // Rush mode - slightly easier, focus on speed
    pool = pool.filter(p => p.difficulty <= targetDifficulty);
    reason = 'Speed challenge';
  } else if (mode === 'streak') {
    // Streak mode - gradually harder
    reason = `Streak difficulty: ${targetDifficulty}★`;
  }
  
  // Select random from pool
  const puzzle = pool[Math.floor(Math.random() * pool.length)] || allPuzzles[0];
  
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
    session,
    adaptiveDifficultyEnabled,
  } = useAIIntelligence();
  
  // Local state
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle | null>(null);
  const [selectionReason, setSelectionReason] = useState('');
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
  
  // Get next puzzle with smart selection
  const getNextPuzzle = useCallback(() => {
    const { puzzle, reason } = selectSmartPuzzle(
      puzzles,
      seenPuzzles.current,
      effectiveDifficulty,
      effectiveTheme,
      mode,
      patterns.puzzleStrengths,
      patterns.puzzleWeaknesses,
    );
    
    seenPuzzles.current.add(puzzle.id);
    setCurrentPuzzle(puzzle);
    setSelectionReason(reason);
    puzzleStartTime.current = Date.now();
    
    return puzzle;
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




