// ============================================
// UNIFIED PUZZLE SYSTEM HOOK
// Chess.com-style adaptive puzzle system
// Works offline with localStorage, syncs with Supabase when available
// ============================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  getPuzzleStats,
  submitPuzzleResult,
  getNextPuzzleFromSupabase,
  getLocalPuzzleData,
  recordLocalPuzzleAttempt,
  calculateEloChange,
  type PuzzleWithMeta,
  type UserPuzzleData,
  type RatingUpdate,
} from '@/lib/puzzleService';
import {
  selectLocalPuzzle,
  getDailyPuzzle,
  getStreakPuzzle,
  getRushPuzzle,
  getOriginalPuzzle,
} from '@/lib/puzzlePool';
import { logger } from '@/lib/logger';

// ============================================
// TYPES
// ============================================

export type PuzzleMode = 'menu' | 'rated' | 'streak' | 'rush' | 'daily' | 'custom';

export interface PuzzleState {
  // Current puzzle
  currentPuzzle: PuzzleWithMeta | null;
  puzzleRating: number;
  
  // User stats
  userRating: number;
  highestRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  
  // Last result
  lastRatingChange: number | null;
  
  // Mode-specific
  mode: PuzzleMode;
  
  // Streak mode
  streakCount: number;
  streakActive: boolean;
  
  // Rush mode
  rushScore: number;
  rushStrikes: number;
  rushActive: boolean;
  rushTimer: number;
  
  // Loading state
  isLoading: boolean;
  error: string | null;
}

export interface PuzzleActions {
  // Navigation
  setMode: (mode: PuzzleMode) => void;
  startMode: (mode: PuzzleMode) => void;
  backToMenu: () => void;
  
  // Puzzle flow
  getNextPuzzle: () => Promise<void>;
  submitResult: (solved: boolean, timeTakenMs?: number, hintsUsed?: number) => Promise<RatingUpdate>;
  
  // Rush mode
  tickRushTimer: () => void;
  addRushStrike: () => void;
  
  // Streak mode
  endStreak: () => void;
  
  // Custom mode
  setCustomTheme: (theme: string | null) => void;
  setCustomDifficulty: (difficulty: number | null) => void;
}

// ============================================
// INITIAL STATE
// ============================================

const DEFAULT_STATE: PuzzleState = {
  currentPuzzle: null,
  puzzleRating: 1000,
  userRating: 1000,
  highestRating: 1000,
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastRatingChange: null,
  mode: 'menu',
  streakCount: 0,
  streakActive: false,
  rushScore: 0,
  rushStrikes: 0,
  rushActive: false,
  rushTimer: 180,
  isLoading: false,
  error: null,
};

// ============================================
// HOOK
// ============================================

export function usePuzzleSystem(): PuzzleState & PuzzleActions {
  const [state, setState] = useState<PuzzleState>(DEFAULT_STATE);
  const [userId, setUserId] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState<string | null>(null);
  const [customDifficulty, setCustomDifficulty] = useState<number | null>(null);
  
  const seenPuzzleIds = useRef<Set<string>>(new Set());
  const puzzleStartTime = useRef<number>(Date.now());
  
  // ============================================
  // AUTH & INITIAL LOAD
  // ============================================
  
  useEffect(() => {
    // Load initial stats
    const loadStats = async () => {
      // Check for logged in user
      if (isSupabaseConfigured) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      }
      
      // Load puzzle stats
      const stats = await getPuzzleStats(userId || undefined);
      setState(prev => ({
        ...prev,
        userRating: stats.rating,
        highestRating: stats.highestRating,
        gamesPlayed: stats.gamesPlayed,
        wins: stats.wins,
        losses: stats.losses,
        currentStreak: stats.currentStreak,
        bestStreak: stats.bestStreak,
      }));
      
      // Load seen puzzle IDs from localStorage
      const localData = getLocalPuzzleData();
      seenPuzzleIds.current = new Set(localData.recentPuzzleIds);
    };
    
    loadStats();
  }, [userId]);
  
  // ============================================
  // PUZZLE SELECTION
  // ============================================
  
  const getNextPuzzle = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      let puzzle: PuzzleWithMeta | null = null;
      
      // Try Supabase first if available and user is logged in
      if (userId && isSupabaseConfigured) {
        puzzle = await getNextPuzzleFromSupabase(
          userId,
          state.userRating,
          state.mode === 'rated' ? [] : undefined
        );
      }
      
      // Fall back to local puzzle pool
      if (!puzzle) {
        switch (state.mode) {
          case 'daily':
            puzzle = getDailyPuzzle();
            break;
          case 'streak':
            puzzle = getStreakPuzzle(state.streakCount);
            break;
          case 'rush':
            puzzle = getRushPuzzle(state.userRating);
            break;
          case 'custom':
            puzzle = selectLocalPuzzle({
              userRating: state.userRating,
              theme: customTheme || undefined,
              difficulty: customDifficulty || undefined,
              excludeIds: Array.from(seenPuzzleIds.current),
              mode: 'custom',
            });
            break;
          case 'rated':
          default:
            puzzle = selectLocalPuzzle({
              userRating: state.userRating,
              excludeIds: Array.from(seenPuzzleIds.current),
              mode: 'rated',
            });
        }
      }
      
      if (!puzzle) {
        throw new Error('No puzzles available');
      }
      
      // Track this puzzle as seen
      seenPuzzleIds.current.add(puzzle.id);
      
      // Reset seen puzzles if we've seen too many
      if (seenPuzzleIds.current.size > 150) {
        seenPuzzleIds.current.clear();
        seenPuzzleIds.current.add(puzzle.id);
      }
      
      // Record puzzle start time
      puzzleStartTime.current = Date.now();
      
      setState(prev => ({
        ...prev,
        currentPuzzle: puzzle,
        puzzleRating: puzzle!.rating,
        lastRatingChange: null,
        isLoading: false,
      }));
    } catch (err) {
      logger.error('Failed to get next puzzle:', err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load puzzle. Please try again.',
      }));
    }
  }, [state.mode, state.userRating, state.streakCount, userId, customTheme, customDifficulty]);
  
  // ============================================
  // SUBMIT RESULT
  // ============================================
  
  const submitResult = useCallback(async (
    solved: boolean,
    timeTakenMs?: number,
    hintsUsed?: number
  ): Promise<RatingUpdate> => {
    if (!state.currentPuzzle) {
      throw new Error('No current puzzle');
    }
    
    const result = await submitPuzzleResult(
      {
        puzzleId: state.currentPuzzle.id,
        puzzleRating: state.currentPuzzle.rating,
        solved,
        timeTakenMs: timeTakenMs || (Date.now() - puzzleStartTime.current),
        hintsUsed: hintsUsed || 0,
        mode: state.mode === 'streak' ? 'streak' : state.mode === 'rush' ? 'rush' : 'rated',
      },
      userId || undefined
    );
    
    // Update state with result
    setState(prev => ({
      ...prev,
      userRating: result.newRating,
      highestRating: Math.max(prev.highestRating, result.newRating),
      gamesPlayed: prev.gamesPlayed + 1,
      wins: prev.wins + (solved ? 1 : 0),
      losses: prev.losses + (solved ? 0 : 1),
      currentStreak: result.newStreak,
      bestStreak: Math.max(prev.bestStreak, result.newStreak),
      lastRatingChange: result.ratingChange,
    }));
    
    return result;
  }, [state.currentPuzzle, state.mode, userId]);
  
  // ============================================
  // MODE MANAGEMENT
  // ============================================
  
  const setMode = useCallback((mode: PuzzleMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);
  
  const startMode = useCallback((mode: PuzzleMode) => {
    // Reset mode-specific state
    const modeState: Partial<PuzzleState> = {
      mode,
      currentPuzzle: null,
      lastRatingChange: null,
    };
    
    if (mode === 'streak') {
      modeState.streakCount = 0;
      modeState.streakActive = true;
      seenPuzzleIds.current.clear();
    } else if (mode === 'rush') {
      modeState.rushScore = 0;
      modeState.rushStrikes = 0;
      modeState.rushActive = true;
      modeState.rushTimer = 180;
      seenPuzzleIds.current.clear();
    } else if (mode === 'rated' || mode === 'custom') {
      seenPuzzleIds.current.clear();
    }
    
    setState(prev => ({ ...prev, ...modeState }));
    
    // Auto-fetch first puzzle
    setTimeout(() => getNextPuzzle(), 0);
  }, [getNextPuzzle]);
  
  const backToMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'menu',
      currentPuzzle: null,
      streakActive: false,
      rushActive: false,
      lastRatingChange: null,
    }));
  }, []);
  
  // ============================================
  // RUSH MODE
  // ============================================
  
  const tickRushTimer = useCallback(() => {
    setState(prev => {
      if (!prev.rushActive || prev.rushTimer <= 0) {
        return { ...prev, rushActive: false };
      }
      return { ...prev, rushTimer: prev.rushTimer - 1 };
    });
  }, []);
  
  const addRushStrike = useCallback(() => {
    setState(prev => {
      const newStrikes = prev.rushStrikes + 1;
      if (newStrikes >= 3) {
        return { ...prev, rushStrikes: newStrikes, rushActive: false };
      }
      return { ...prev, rushStrikes: newStrikes };
    });
  }, []);
  
  // ============================================
  // STREAK MODE
  // ============================================
  
  const endStreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      streakActive: false,
      bestStreak: Math.max(prev.bestStreak, prev.streakCount),
    }));
  }, []);
  
  const incrementStreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      streakCount: prev.streakCount + 1,
    }));
  }, []);
  
  // ============================================
  // RETURN
  // ============================================
  
  return {
    ...state,
    setMode,
    startMode,
    backToMenu,
    getNextPuzzle,
    submitResult,
    tickRushTimer,
    addRushStrike,
    endStreak,
    setCustomTheme,
    setCustomDifficulty,
  };
}

// ============================================
// UTILITY EXPORTS
// ============================================

export { calculateEloChange, getOriginalPuzzle };
export type { PuzzleWithMeta, RatingUpdate };

