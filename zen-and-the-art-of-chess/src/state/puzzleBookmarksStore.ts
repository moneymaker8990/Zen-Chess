import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// PUZZLE BOOKMARKS STORE
// ============================================

export interface BookmarkedPuzzle {
  puzzleId: string;
  fen: string;
  solution: string[];
  rating: number;
  themes: string[];
  bookmarkedAt: number;
  note?: string;
  solved: boolean;
  attempts: number;
}

interface PuzzleBookmarksState {
  bookmarks: BookmarkedPuzzle[];

  addBookmark: (puzzle: Omit<BookmarkedPuzzle, 'bookmarkedAt' | 'attempts'>) => void;
  removeBookmark: (puzzleId: string) => void;
  isBookmarked: (puzzleId: string) => boolean;
  updateBookmarkNote: (puzzleId: string, note: string) => void;
  recordAttempt: (puzzleId: string) => void;
  getBookmarksByTheme: (theme: string) => BookmarkedPuzzle[];
  getUnsolvedBookmarks: () => BookmarkedPuzzle[];
  getAllBookmarks: () => BookmarkedPuzzle[];
  clearBookmarks: () => void;
}

export const usePuzzleBookmarksStore = create<PuzzleBookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (puzzle) => {
        const existing = get().bookmarks.find((b) => b.puzzleId === puzzle.puzzleId);
        if (existing) return;

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
