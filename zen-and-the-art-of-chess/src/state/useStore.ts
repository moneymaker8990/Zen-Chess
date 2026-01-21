/**
 * CORE GAME STATE STORES
 *
 * This file contains the primary Zustand stores for game and progress management.
 *
 * Stores:
 * - useGameStore: Current chess game state, move history, board orientation
 * - useProgressStore: User progress, streaks, XP, achievements (persisted to localStorage)
 *
 * Related stores:
 * - boardSettingsStore: Visual board preferences (theme, pieces, hints)
 * - trainingStore: Pattern training and mistake tracking
 * - coachStore: AI coaching history and preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameState,
  UserProgress,
  TiltLevel,
  GameMode,
  EngineEvaluation,
  MoveInfo
} from '@/lib/types';

// ============================================
// GAME STORE
// Manages current chess position, move history, and analysis state
// ============================================

interface GameStore {
  // State
  gameState: GameState;
  evaluation: EngineEvaluation | null;
  isAnalyzing: boolean;
  isPuzzleMode: boolean;
  puzzleSolved: boolean;
  
  // Actions
  setFen: (fen: string) => void;
  makeMove: (move: MoveInfo) => void;
  undoMove: () => void;
  goToMove: (index: number) => void;
  setOrientation: (orientation: 'white' | 'black') => void;
  setGameMode: (mode: GameMode) => void;
  setEvaluation: (eval_: EngineEvaluation | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  resetGame: () => void;
  loadPuzzle: (fen: string, solution: string[]) => void;
  checkPuzzleMove: (move: string) => boolean;
}

const initialGameState: GameState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  pgn: '',
  history: [],
  currentMoveIndex: -1,
  orientation: 'white',
  gameMode: 'FREE_PLAY',
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: initialGameState,
  evaluation: null,
  isAnalyzing: false,
  isPuzzleMode: false,
  puzzleSolved: false,

  setFen: (fen) => set((state) => ({
    gameState: { ...state.gameState, fen }
  })),

  makeMove: (move) => set((state) => {
    const newHistory = [
      ...state.gameState.history.slice(0, state.gameState.currentMoveIndex + 1),
      move
    ];
    return {
      gameState: {
        ...state.gameState,
        fen: move.fen,
        history: newHistory,
        currentMoveIndex: newHistory.length - 1,
      }
    };
  }),

  undoMove: () => set((state) => {
    if (state.gameState.currentMoveIndex < 0) return state;
    const newIndex = state.gameState.currentMoveIndex - 1;
    const fen = newIndex >= 0 
      ? state.gameState.history[newIndex].fen 
      : initialGameState.fen;
    return {
      gameState: {
        ...state.gameState,
        fen,
        currentMoveIndex: newIndex,
      }
    };
  }),

  goToMove: (index) => set((state) => {
    if (index < -1 || index >= state.gameState.history.length) return state;
    const fen = index >= 0 
      ? state.gameState.history[index].fen 
      : initialGameState.fen;
    return {
      gameState: {
        ...state.gameState,
        fen,
        currentMoveIndex: index,
      }
    };
  }),

  setOrientation: (orientation) => set((state) => ({
    gameState: { ...state.gameState, orientation }
  })),

  setGameMode: (gameMode) => set((state) => ({
    gameState: { ...state.gameState, gameMode }
  })),

  setEvaluation: (evaluation) => set({ evaluation }),

  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  resetGame: () => set({
    gameState: initialGameState,
    evaluation: null,
    isPuzzleMode: false,
    puzzleSolved: false,
  }),

  loadPuzzle: (fen, _solution) => set({
    gameState: {
      ...initialGameState,
      fen,
      gameMode: 'PUZZLE',
    },
    isPuzzleMode: true,
    puzzleSolved: false,
  }),

  checkPuzzleMove: (_move) => {
    // This will be implemented with puzzle solution checking
    return false;
  },
}));

// ============================================
// USER PROGRESS STORE
// ============================================
//
// SUPABASE PERSISTENCE IMPLEMENTATION NOTES (2026-01-19):
// =======================================================
// Currently: Progress is stored in localStorage via Zustand persist
//
// TO ADD SUPABASE CLOUD SYNC:
// 1. Database Schema (create in Supabase SQL Editor):
//    ```sql
//    CREATE TABLE user_progress (
//      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
//      current_day INTEGER DEFAULT 1,
//      completed_days INTEGER[] DEFAULT '{}',
//      puzzles_solved INTEGER DEFAULT 0,
//      puzzles_failed INTEGER DEFAULT 0,
//      streak_days INTEGER DEFAULT 0,
//      last_active_date DATE,
//      meditation_minutes INTEGER DEFAULT 0,
//      settings JSONB DEFAULT '{}',
//      completed_openings TEXT[] DEFAULT '{}',
//      opening_streak INTEGER DEFAULT 0,
//      last_opening_date DATE,
//      updated_at TIMESTAMPTZ DEFAULT NOW(),
//      UNIQUE(user_id)
//    );
//
//    -- Enable RLS
//    ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
//
//    -- Policy: Users can only access their own data
//    CREATE POLICY "Users can CRUD own progress"
//      ON user_progress FOR ALL
//      USING (auth.uid() = user_id)
//      WITH CHECK (auth.uid() = user_id);
//    ```
//
// 2. Sync Logic (add to this store):
//    - On login: Fetch from Supabase, merge with localStorage
//    - On change: Debounced upsert to Supabase
//    - On logout: Keep localStorage copy
//    - Conflict resolution: Server wins (more recent updated_at)
//
// 3. Use supabase.from('user_progress').upsert() for syncing
// ============================================

interface ProgressStore {
  progress: UserProgress;
  
  // Actions
  setCurrentDay: (day: number) => void;
  completeDay: (day: number) => void;
  recordPuzzle: (solved: boolean) => void;
  recordTilt: (level: TiltLevel, trigger?: string) => void;
  addMeditationMinutes: (minutes: number) => void;
  updateStreak: () => void;
  updateSettings: (settings: Partial<UserProgress['settings']>) => void;
  completeOpening: (openingId: string) => void;
  getOpeningStreak: () => number;
}

const initialProgress: UserProgress = {
  currentDay: 1,
  completedDays: [],
  puzzlesSolved: 0,
  puzzlesFailed: 0,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  tiltEvents: [],
  meditationMinutes: 0,
  settings: {
    theme: 'dark',
    boardTheme: 'zen',
    pieceSet: 'cburnett',
    soundEnabled: true,
    autoAnalysis: true,
    calmPlayDelay: 3,
    engineStrength: 10,
  },
  completedOpenings: new Set<string>(),
  openingStreak: 0,
  lastOpeningDate: undefined,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      setCurrentDay: (day) => set((state) => ({
        progress: { ...state.progress, currentDay: day }
      })),

      completeDay: (day) => set((state) => {
        if (state.progress.completedDays.includes(day)) return state;
        return {
          progress: {
            ...state.progress,
            completedDays: [...state.progress.completedDays, day],
          }
        };
      }),

      recordPuzzle: (solved) => set((state) => ({
        progress: {
          ...state.progress,
          puzzlesSolved: solved 
            ? state.progress.puzzlesSolved + 1 
            : state.progress.puzzlesSolved,
          puzzlesFailed: !solved 
            ? state.progress.puzzlesFailed + 1 
            : state.progress.puzzlesFailed,
        }
      })),

      recordTilt: (level, trigger) => set((state) => ({
        progress: {
          ...state.progress,
          tiltEvents: [
            ...state.progress.tiltEvents,
            {
              date: new Date().toISOString(),
              level,
              trigger,
              resolved: false,
            }
          ],
        }
      })),

      addMeditationMinutes: (minutes) => set((state) => ({
        progress: {
          ...state.progress,
          meditationMinutes: state.progress.meditationMinutes + minutes,
        }
      })),

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActiveDate, streakDays } = get().progress;
        
        if (lastActiveDate === today) return;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const newStreak = lastActiveDate === yesterdayStr 
          ? streakDays + 1 
          : 1;
        
        set((state) => ({
          progress: {
            ...state.progress,
            lastActiveDate: today,
            streakDays: newStreak,
          }
        }));
      },

      updateSettings: (settings) => set((state) => ({
        progress: {
          ...state.progress,
          settings: { ...state.progress.settings, ...settings },
        }
      })),

      completeOpening: (openingId) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const completedOpenings = state.progress.completedOpenings || new Set<string>();
        const lastOpeningDate = state.progress.lastOpeningDate;
        
        // Update streak if completed today, otherwise reset
        const newStreak = lastOpeningDate === today 
          ? (state.progress.openingStreak || 0) + 1 
          : 1;
        
        // Add to completed set
        const newCompleted = new Set(completedOpenings);
        newCompleted.add(openingId);
        
        return {
          progress: {
            ...state.progress,
            completedOpenings: newCompleted,
            openingStreak: newStreak,
            lastOpeningDate: today,
          }
        };
      }),

      getOpeningStreak: () => {
        const { progress } = get();
        const today = new Date().toISOString().split('T')[0];
        
        // Return streak only if completed today
        if (progress.lastOpeningDate === today) {
          return progress.openingStreak || 0;
        }
        return 0;
      },
    }),
    {
      name: 'zen-chess-progress',
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as { progress?: UserProgress };

        // Version 0 -> 1: Add missing fields with defaults
        if (version < 1) {
          if (state.progress) {
            // Ensure all required fields exist with defaults
            state.progress.puzzlesFailed = state.progress.puzzlesFailed ?? 0;
            state.progress.meditationMinutes = state.progress.meditationMinutes ?? 0;
            state.progress.tiltEvents = state.progress.tiltEvents ?? [];
            state.progress.completedOpenings = state.progress.completedOpenings ?? new Set<string>();
            state.progress.openingStreak = state.progress.openingStreak ?? 0;
            state.progress.settings = {
              ...initialProgress.settings,
              ...state.progress.settings,
            };
          }
        }

        return state as ProgressStore;
      },
    }
  )
);

// ============================================
// UI STORE
// ============================================

interface UIStore {
  isSidebarOpen: boolean;
  currentTilt: TiltLevel;
  showBreathingOverlay: boolean;
  showMeditationPanel: boolean;
  calmPlayActive: boolean;
  calmPlayWaiting: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setTiltLevel: (level: TiltLevel) => void;
  toggleBreathingOverlay: () => void;
  toggleMeditationPanel: () => void;
  setCalmPlayActive: (active: boolean) => void;
  setCalmPlayWaiting: (waiting: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  currentTilt: 'CALM',
  showBreathingOverlay: false,
  showMeditationPanel: false,
  calmPlayActive: false,
  calmPlayWaiting: false,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTiltLevel: (currentTilt) => set({ currentTilt }),
  toggleBreathingOverlay: () => set((state) => ({ 
    showBreathingOverlay: !state.showBreathingOverlay 
  })),
  toggleMeditationPanel: () => set((state) => ({ 
    showMeditationPanel: !state.showMeditationPanel 
  })),
  setCalmPlayActive: (calmPlayActive) => set({ calmPlayActive }),
  setCalmPlayWaiting: (calmPlayWaiting) => set({ calmPlayWaiting }),
}));

