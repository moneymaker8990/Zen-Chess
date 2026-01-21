// ============================================
// NAVIGATION HISTORY STORE
// Tracks navigation history for proper back button behavior
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Maximum history entries to prevent unbounded growth
const MAX_HISTORY_SIZE = 50;

interface NavigationHistoryState {
  history: string[];
  push: (path: string) => void;
  pop: () => string | null;
  canGoBack: () => boolean;
  clear: () => void;
  peek: () => string | null;
}

export const useNavigationHistory = create<NavigationHistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      /**
       * Push a new path to history
       * Ignores if it's the same as the current top
       * Trims old entries if exceeding MAX_HISTORY_SIZE
       */
      push: (path: string) => {
        set((state) => {
          const currentTop = state.history[state.history.length - 1];
          // Don't add duplicate consecutive entries
          if (currentTop === path) return state;

          let newHistory = [...state.history, path];

          // Trim old entries if exceeding max size
          if (newHistory.length > MAX_HISTORY_SIZE) {
            newHistory = newHistory.slice(-MAX_HISTORY_SIZE);
          }

          return { history: newHistory };
        });
      },

      /**
       * Pop the current path and return the previous path to navigate to.
       * Returns null if no previous path exists.
       */
      pop: () => {
        const state = get();

        // Need at least 2 entries: current + previous
        if (state.history.length < 2) return null;

        const newHistory = [...state.history];
        // Remove current path
        newHistory.pop();
        // Get the previous path (will become current after navigation)
        const previousPath = newHistory[newHistory.length - 1];

        set({ history: newHistory });
        return previousPath;
      },

      /**
       * Check if we can go back (need at least 2 entries)
       */
      canGoBack: () => {
        return get().history.length >= 2;
      },

      /**
       * Peek at the previous path without modifying history
       */
      peek: () => {
        const history = get().history;
        if (history.length < 2) return null;
        return history[history.length - 2];
      },

      /**
       * Clear all history
       */
      clear: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'navigation-history',
      // Use sessionStorage so history clears when browser closes
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

