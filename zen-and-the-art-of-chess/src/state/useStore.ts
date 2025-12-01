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
    }),
    {
      name: 'zen-chess-progress',
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

