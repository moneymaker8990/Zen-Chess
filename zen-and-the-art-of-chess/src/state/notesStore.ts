import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ChessNote,
  NoteCategory,
  DetectedWeakness,
  GameMentalLog,
  MentalPattern,
  StudySession,
  DailyStats,
  GameReview,
} from '@/lib/notesTypes';

// ============================================
// NOTES STORE
// ============================================

interface NotesState {
  notes: ChessNote[];
  
  // CRUD
  addNote: (note: Omit<ChessNote, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateNote: (id: string, updates: Partial<ChessNote>) => void;
  deleteNote: (id: string) => void;
  
  // Search & Filter
  searchNotes: (query: string) => ChessNote[];
  getNotesByCategory: (category: NoteCategory) => ChessNote[];
  getNotesByTag: (tag: string) => ChessNote[];
  getNotesNeedingReview: () => ChessNote[];
  
  // Linking
  linkNotes: (noteId1: string, noteId2: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (noteData) => {
        const id = `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = Date.now();
        const note: ChessNote = {
          ...noteData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ notes: [note, ...state.notes] }));
        return id;
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: Date.now() }
              : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      searchNotes: (query) => {
        const q = query.toLowerCase();
        return get().notes.filter(
          (note) =>
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q) ||
            note.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      },
      
      getNotesByCategory: (category) => {
        return get().notes.filter((note) => note.category === category);
      },
      
      getNotesByTag: (tag) => {
        const t = tag.toLowerCase();
        return get().notes.filter((note) =>
          note.tags.some((noteTag) => noteTag.toLowerCase() === t)
        );
      },
      
      getNotesNeedingReview: () => {
        return get().notes.filter((note) => note.needsReview);
      },
      
      linkNotes: (noteId1, noteId2) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId1) {
              return {
                ...note,
                linkedNoteIds: [...(note.linkedNoteIds || []), noteId2],
                updatedAt: Date.now(),
              };
            }
            if (note.id === noteId2) {
              return {
                ...note,
                linkedNoteIds: [...(note.linkedNoteIds || []), noteId1],
                updatedAt: Date.now(),
              };
            }
            return note;
          }),
        }));
      },
    }),
    { name: 'zen-chess-notes' }
  )
);

// ============================================
// WEAKNESS DETECTION STORE
// ============================================

interface WeaknessState {
  weaknesses: DetectedWeakness[];
  
  addWeakness: (weakness: Omit<DetectedWeakness, 'id' | 'detectedAt'>) => string;
  updateWeakness: (id: string, updates: Partial<DetectedWeakness>) => void;
  recordOccurrence: (id: string, gameId: string, position?: any) => void;
  markDrillComplete: (weaknessId: string, drillId: string) => void;
  getActiveWeaknesses: () => DetectedWeakness[];
  getMostCritical: () => DetectedWeakness[];
}

export const useWeaknessStore = create<WeaknessState>()(
  persist(
    (set, get) => ({
      weaknesses: [],
      
      addWeakness: (weaknessData) => {
        const id = `weakness_${Date.now()}`;
        const weakness: DetectedWeakness = {
          ...weaknessData,
          id,
          detectedAt: Date.now(),
        };
        set((state) => ({ weaknesses: [weakness, ...state.weaknesses] }));
        return id;
      },
      
      updateWeakness: (id, updates) => {
        set((state) => ({
          weaknesses: state.weaknesses.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        }));
      },
      
      recordOccurrence: (id, gameId, position) => {
        set((state) => ({
          weaknesses: state.weaknesses.map((w) => {
            if (w.id === id) {
              return {
                ...w,
                occurrences: w.occurrences + 1,
                gameIds: [...w.gameIds, gameId],
                lastOccurrence: Date.now(),
                examplePositions: position
                  ? [...w.examplePositions.slice(-4), position]
                  : w.examplePositions,
              };
            }
            return w;
          }),
        }));
      },
      
      markDrillComplete: (weaknessId, drillId) => {
        set((state) => ({
          weaknesses: state.weaknesses.map((w) => {
            if (w.id === weaknessId) {
              return {
                ...w,
                drillsCompleted: w.drillsCompleted + 1,
                prescribedDrills: w.prescribedDrills?.map((d) =>
                  d.id === drillId
                    ? { ...d, completedCount: d.completedCount + 1 }
                    : d
                ),
              };
            }
            return w;
          }),
        }));
      },
      
      getActiveWeaknesses: () => {
        return get().weaknesses.filter((w) => w.status === 'ACTIVE');
      },
      
      getMostCritical: () => {
        return get()
          .weaknesses
          .filter((w) => w.status !== 'RESOLVED')
          .sort((a, b) => {
            const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
            return severityOrder[a.severity] - severityOrder[b.severity];
          })
          .slice(0, 5);
      },
    }),
    { name: 'zen-chess-weaknesses' }
  )
);

// ============================================
// MENTAL GAME STORE
// ============================================

interface MentalGameState {
  gameLogs: GameMentalLog[];
  patterns: MentalPattern[];
  
  logGame: (log: Omit<GameMentalLog, 'timestamp'>) => void;
  updateGameLog: (gameId: string, updates: Partial<GameMentalLog>) => void;
  addPattern: (pattern: Omit<MentalPattern, 'id'>) => void;
  getRecentLogs: (count: number) => GameMentalLog[];
  getAverageMood: (days: number) => number;
  getTiltFrequency: (days: number) => number;
}

export const useMentalGameStore = create<MentalGameState>()(
  persist(
    (set, get) => ({
      gameLogs: [],
      patterns: [],
      
      logGame: (logData) => {
        const log: GameMentalLog = {
          ...logData,
          timestamp: Date.now(),
        };
        set((state) => ({ gameLogs: [log, ...state.gameLogs] }));
      },
      
      updateGameLog: (gameId, updates) => {
        set((state) => ({
          gameLogs: state.gameLogs.map((log) =>
            log.gameId === gameId ? { ...log, ...updates } : log
          ),
        }));
      },
      
      addPattern: (patternData) => {
        const id = `pattern_${Date.now()}`;
        set((state) => ({
          patterns: [...state.patterns, { ...patternData, id }],
        }));
      },
      
      getRecentLogs: (count) => {
        return get().gameLogs.slice(0, count);
      },
      
      getAverageMood: (days) => {
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        const recentLogs = get().gameLogs.filter((l) => l.timestamp > cutoff);
        if (recentLogs.length === 0) return 3;
        const avg =
          recentLogs.reduce((sum, l) => sum + l.preGameMood, 0) /
          recentLogs.length;
        return Math.round(avg * 10) / 10;
      },
      
      getTiltFrequency: (days) => {
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        const recentLogs = get().gameLogs.filter((l) => l.timestamp > cutoff);
        if (recentLogs.length === 0) return 0;
        const tiltGames = recentLogs.filter((l) => l.peakTilt >= 2).length;
        return Math.round((tiltGames / recentLogs.length) * 100);
      },
    }),
    { name: 'zen-chess-mental' }
  )
);

// ============================================
// STUDY SESSION STORE
// ============================================

interface StudyState {
  sessions: StudySession[];
  dailyStats: DailyStats[];
  currentSession: StudySession | null;
  
  startSession: () => string;
  endSession: (notes?: string) => void;
  updateCurrentSession: (updates: Partial<StudySession>) => void;
  
  // Auto-tracking methods - call these from other components
  recordGamePlayed: () => void;
  recordGameReviewed: () => void;
  recordPuzzleSolved: () => void;
  recordPuzzleFailed: () => void;
  recordNoteCreated: () => void;
  
  recordDailyStats: (stats: Omit<DailyStats, 'date'>) => void;
  getSessionsByDateRange: (start: string, end: string) => StudySession[];
  getStreak: () => number;
  getTotalStudyTime: (days: number) => number;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      sessions: [],
      dailyStats: [],
      currentSession: null,
      
      startSession: () => {
        const id = `session_${Date.now()}`;
        const session: StudySession = {
          id,
          date: new Date().toISOString().split('T')[0],
          startTime: Date.now(),
          gamesPlayed: 0,
          gamesReviewed: 0,
          puzzlesSolved: 0,
          puzzlesFailed: 0,
          endgamesPracticed: 0,
          openingsStudied: [],
          drillsCompleted: [],
          notesCreated: 0,
          noteIds: [],
          weaknessesAddressed: [],
          overallFocus: 3,
          overallMood: 3,
        };
        set({ currentSession: session });
        return id;
      },
      
      endSession: (notes) => {
        const current = get().currentSession;
        if (!current) return;
        
        const completed: StudySession = {
          ...current,
          endTime: Date.now(),
          sessionNotes: notes,
        };
        
        set((state) => ({
          sessions: [completed, ...state.sessions],
          currentSession: null,
        }));
      },
      
      updateCurrentSession: (updates) => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, ...updates }
            : null,
        }));
      },
      
      // Auto-tracking: call these when activities happen
      recordGamePlayed: () => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, gamesPlayed: state.currentSession.gamesPlayed + 1 }
            : null,
        }));
      },
      
      recordGameReviewed: () => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, gamesReviewed: state.currentSession.gamesReviewed + 1 }
            : null,
        }));
      },
      
      recordPuzzleSolved: () => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, puzzlesSolved: state.currentSession.puzzlesSolved + 1 }
            : null,
        }));
      },
      
      recordPuzzleFailed: () => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, puzzlesFailed: state.currentSession.puzzlesFailed + 1 }
            : null,
        }));
      },
      
      recordNoteCreated: () => {
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, notesCreated: state.currentSession.notesCreated + 1 }
            : null,
        }));
      },
      
      recordDailyStats: (stats) => {
        const date = new Date().toISOString().split('T')[0];
        const fullStats: DailyStats = { ...stats, date };
        set((state) => ({
          dailyStats: [
            fullStats,
            ...state.dailyStats.filter((s) => s.date !== date),
          ],
        }));
      },
      
      getSessionsByDateRange: (start, end) => {
        return get().sessions.filter((s) => s.date >= start && s.date <= end);
      },
      
      getStreak: () => {
        const stats = get().dailyStats.sort((a, b) => b.date.localeCompare(a.date));
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        
        for (let i = 0; i < stats.length; i++) {
          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);
          const expected = expectedDate.toISOString().split('T')[0];
          
          if (stats[i]?.date === expected) {
            streak++;
          } else {
            break;
          }
        }
        return streak;
      },
      
      getTotalStudyTime: (days) => {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const cutoffStr = cutoff.toISOString().split('T')[0];
        
        return get()
          .sessions
          .filter((s) => s.date >= cutoffStr)
          .reduce((sum, s) => {
            const duration = s.endTime
              ? (s.endTime - s.startTime) / 60000
              : 0;
            return sum + duration;
          }, 0);
      },
    }),
    { name: 'zen-chess-study' }
  )
);

// ============================================
// GAME REVIEW STORE
// ============================================

interface GameReviewState {
  reviews: GameReview[];
  
  addReview: (review: GameReview) => void;
  getReview: (gameId: string) => GameReview | undefined;
  addAnnotation: (gameId: string, annotation: any) => void;
  getRecentReviews: (count: number) => GameReview[];
}

export const useGameReviewStore = create<GameReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      
      addReview: (review) => {
        set((state) => ({
          reviews: [review, ...state.reviews.filter((r) => r.gameId !== review.gameId)],
        }));
      },
      
      getReview: (gameId) => {
        return get().reviews.find((r) => r.gameId === gameId);
      },
      
      addAnnotation: (gameId, annotation) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.gameId === gameId
              ? { ...r, userAnnotations: [...r.userAnnotations, annotation] }
              : r
          ),
        }));
      },
      
      getRecentReviews: (count) => {
        return get().reviews.slice(0, count);
      },
    }),
    { name: 'zen-chess-reviews' }
  )
);

// ============================================
// LEGEND GAME REVIEW TRACKING
// ============================================

export interface LegendGameReview {
  legendId: string;
  gameId: string;
  reviewedAt: number;
  score: number; // 0-100 from guess the move session
  movesGuessed: number;
  totalMoves: number;
  weaknessTags: string[];
}

interface LegendGameReviewState {
  reviewedGames: LegendGameReview[];
  
  // Mark a game as reviewed
  markGameReviewed: (review: Omit<LegendGameReview, 'reviewedAt'>) => void;
  
  // Check if a game has been reviewed
  isGameReviewed: (legendId: string, gameId: string) => boolean;
  
  // Get review for a specific game
  getGameReview: (legendId: string, gameId: string) => LegendGameReview | undefined;
  
  // Get all reviewed games for a legend
  getReviewedGamesForLegend: (legendId: string) => LegendGameReview[];
  
  // Get review stats for a legend
  getLegendStats: (legendId: string) => {
    totalReviewed: number;
    averageScore: number;
    bestScore: number;
    commonWeaknesses: string[];
  };
  
  // Clear all reviews (for testing)
  clearAllReviews: () => void;
}

export const useLegendGameReviewStore = create<LegendGameReviewState>()(
  persist(
    (set, get) => ({
      reviewedGames: [],
      
      markGameReviewed: (review) => {
        const existing = get().reviewedGames.find(
          r => r.legendId === review.legendId && r.gameId === review.gameId
        );
        
        if (existing) {
          // Update existing review
          set((state) => ({
            reviewedGames: state.reviewedGames.map(r =>
              r.legendId === review.legendId && r.gameId === review.gameId
                ? { ...review, reviewedAt: Date.now() }
                : r
            ),
          }));
        } else {
          // Add new review
          set((state) => ({
            reviewedGames: [
              { ...review, reviewedAt: Date.now() },
              ...state.reviewedGames,
            ],
          }));
        }
      },
      
      isGameReviewed: (legendId, gameId) => {
        return get().reviewedGames.some(
          r => r.legendId === legendId && r.gameId === gameId
        );
      },
      
      getGameReview: (legendId, gameId) => {
        return get().reviewedGames.find(
          r => r.legendId === legendId && r.gameId === gameId
        );
      },
      
      getReviewedGamesForLegend: (legendId) => {
        return get().reviewedGames.filter(r => r.legendId === legendId);
      },
      
      getLegendStats: (legendId) => {
        const reviews = get().reviewedGames.filter(r => r.legendId === legendId);
        
        if (reviews.length === 0) {
          return {
            totalReviewed: 0,
            averageScore: 0,
            bestScore: 0,
            commonWeaknesses: [],
          };
        }
        
        const scores = reviews.map(r => r.score);
        const allTags = reviews.flatMap(r => r.weaknessTags);
        const tagCounts: Record<string, number> = {};
        allTags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        const sortedTags = Object.entries(tagCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([tag]) => tag);
        
        return {
          totalReviewed: reviews.length,
          averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
          bestScore: Math.max(...scores),
          commonWeaknesses: sortedTags,
        };
      },
      
      clearAllReviews: () => {
        set({ reviewedGames: [] });
      },
    }),
    { name: 'zen-chess-legend-reviews' }
  )
);

// ============================================
// PUZZLE BOOKMARKS STORE
// ============================================

export interface BookmarkedPuzzle {
  puzzleId: string;
  fen: string;
  solution: string[];  // Array of moves in SAN
  rating: number;
  themes: string[];
  bookmarkedAt: number;
  note?: string;       // User note about why they saved it
  solved: boolean;     // Whether user solved it when bookmarking
  attempts: number;    // Number of times user has attempted
}

interface PuzzleBookmarksState {
  bookmarks: BookmarkedPuzzle[];

  // Add a bookmark
  addBookmark: (puzzle: Omit<BookmarkedPuzzle, 'bookmarkedAt' | 'attempts'>) => void;

  // Remove a bookmark
  removeBookmark: (puzzleId: string) => void;

  // Check if puzzle is bookmarked
  isBookmarked: (puzzleId: string) => boolean;

  // Update note on bookmark
  updateBookmarkNote: (puzzleId: string, note: string) => void;

  // Increment attempt count
  recordAttempt: (puzzleId: string) => void;

  // Get bookmarks by theme
  getBookmarksByTheme: (theme: string) => BookmarkedPuzzle[];

  // Get unsolved bookmarks
  getUnsolvedBookmarks: () => BookmarkedPuzzle[];

  // Get all bookmarks sorted by date
  getAllBookmarks: () => BookmarkedPuzzle[];

  // Clear all bookmarks
  clearBookmarks: () => void;
}

export const usePuzzleBookmarksStore = create<PuzzleBookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (puzzle) => {
        const existing = get().bookmarks.find((b) => b.puzzleId === puzzle.puzzleId);
        if (existing) return; // Already bookmarked

        set((state) => ({
          bookmarks: [
            { ...puzzle, bookmarkedAt: Date.now(), attempts: 0 },
            ...state.bookmarks,
          ],
        }));
      },

      removeBookmark: (puzzleId) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.puzzleId !== puzzleId),
        }));
      },

      isBookmarked: (puzzleId) => {
        return get().bookmarks.some((b) => b.puzzleId === puzzleId);
      },

      updateBookmarkNote: (puzzleId, note) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.puzzleId === puzzleId ? { ...b, note } : b
          ),
        }));
      },

      recordAttempt: (puzzleId) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.puzzleId === puzzleId ? { ...b, attempts: b.attempts + 1 } : b
          ),
        }));
      },

      getBookmarksByTheme: (theme) => {
        return get().bookmarks.filter((b) => b.themes.includes(theme));
      },

      getUnsolvedBookmarks: () => {
        return get().bookmarks.filter((b) => !b.solved);
      },

      getAllBookmarks: () => {
        return [...get().bookmarks].sort((a, b) => b.bookmarkedAt - a.bookmarkedAt);
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    { name: 'zen-chess-puzzle-bookmarks' }
  )
);

