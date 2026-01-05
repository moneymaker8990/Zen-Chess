// ============================================
// NAVIGATION HISTORY STORE
// Tracks navigation history for proper back button behavior
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationHistoryState {
  history: string[];
  push: (path: string) => void;
  pop: () => string | null;
  canGoBack: () => boolean;
  clear: () => void;
}

export const useNavigationHistory = create<NavigationHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      
      /**
       * Push a new path to history
       * Ignores if it's the same as the current top
       */
      push: (path: string) => {
        set((state) => {
          const currentTop = state.history[state.history.length - 1];
          // Don't add duplicate consecutive entries
          if (currentTop === path) return state;
          
          return {
            history: [...state.history, path],
          };
        });
      },
      
      /**
       * Pop the top path from history and return it
       * Returns null if history is empty
       */
      pop: () => {
        const state = get();
        if (state.history.length === 0) return null;
        
        // Remove current path
        const newHistory = [...state.history];
        newHistory.pop();
        
        // Get previous path
        const previousPath = newHistory[newHistory.length - 1] || null;
        
        // Remove previous path too so we don't go back to it again
        if (previousPath && newHistory.length > 0) {
          newHistory.pop();
        }
        
        set({ history: newHistory });
        return previousPath;
      },
      
      /**
       * Check if we can go back
       */
      canGoBack: () => {
        return get().history.length > 1;
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

