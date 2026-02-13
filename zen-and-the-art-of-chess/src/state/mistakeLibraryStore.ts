/**
 * MISTAKE LIBRARY STORE
 *
 * Track and analyze game mistakes for targeted improvement.
 * CRUD, analysis, stats, and learning helpers.
 * Persisted to localStorage as 'zen-chess-mistakes'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  MistakeEntry,
  MistakeType,
  TacticalPattern,
  RootCause,
} from '@/lib/trainingTypes';

interface MistakeLibraryState {
  mistakes: MistakeEntry[];
  
  // CRUD
  addMistake: (mistake: Omit<MistakeEntry, 'id' | 'timestamp' | 'timesReviewed' | 'retested'>) => string;
  updateMistake: (id: string, updates: Partial<MistakeEntry>) => void;
  deleteMistake: (id: string) => void;
  
  // Analysis
  getMistakesByType: (type: MistakeType) => MistakeEntry[];
  getMistakesByPattern: (pattern: TacticalPattern) => MistakeEntry[];
  getMistakesByCause: (cause: RootCause) => MistakeEntry[];
  getUnreviewedMistakes: () => MistakeEntry[];
  
  // Stats
  getMistakeStats: () => {
    total: number;
    byType: Record<MistakeType, number>;
    byPattern: Record<string, number>;
    byCause: Record<RootCause, number>;
    avgEvalDrop: number;
    mostCommonPattern: string;
    mostCommonCause: RootCause;
  };
  
  // Learning
  markReviewed: (id: string) => void;
  markRetested: (id: string, correct: boolean) => void;
}

export const useMistakeLibraryStore = create<MistakeLibraryState>()(
  persist(
    (set, get) => ({
      mistakes: [],
      
      addMistake: (mistakeData) => {
        const id = `mistake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const mistake: MistakeEntry = {
          ...mistakeData,
          id,
          timestamp: Date.now(),
          timesReviewed: 0,
          retested: false,
        };
        set((state) => ({ mistakes: [mistake, ...state.mistakes] }));
        return id;
      },
      
      updateMistake: (id, updates) => {
        set((state) => ({
          mistakes: state.mistakes.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));
      },
      
      deleteMistake: (id) => {
        set((state) => ({
          mistakes: state.mistakes.filter((m) => m.id !== id),
        }));
      },
      
      getMistakesByType: (type) => {
        return get().mistakes.filter((m) => m.mistakeType === type);
      },
      
      getMistakesByPattern: (pattern) => {
        return get().mistakes.filter((m) => m.tacticalTheme === pattern);
      },
      
      getMistakesByCause: (cause) => {
        return get().mistakes.filter((m) => m.rootCause === cause);
      },
      
      getUnreviewedMistakes: () => {
        return get().mistakes.filter((m) => m.timesReviewed === 0);
      },
      
      getMistakeStats: () => {
        const mistakes = get().mistakes;
        const byType: Record<string, number> = {};
        const byPattern: Record<string, number> = {};
        const byCause: Record<string, number> = {};
        
        mistakes.forEach((m) => {
          byType[m.mistakeType] = (byType[m.mistakeType] || 0) + 1;
          if (m.tacticalTheme) {
            byPattern[m.tacticalTheme] = (byPattern[m.tacticalTheme] || 0) + 1;
          }
          byCause[m.rootCause] = (byCause[m.rootCause] || 0) + 1;
        });
        
        const avgEvalDrop = mistakes.length > 0
          ? mistakes.reduce((sum, m) => sum + m.evalDrop, 0) / mistakes.length
          : 0;
        
        const mostCommonPattern = Object.entries(byPattern)
          .sort(([, a], [, b]) => b - a)[0]?.[0] || 'NONE';
        
        const mostCommonCause = (Object.entries(byCause)
          .sort(([, a], [, b]) => b - a)[0]?.[0] || 'CALCULATION') as RootCause;
        
        return {
          total: mistakes.length,
          byType: byType as Record<MistakeType, number>,
          byPattern,
          byCause: byCause as Record<RootCause, number>,
          avgEvalDrop,
          mostCommonPattern,
          mostCommonCause,
        };
      },
      
      markReviewed: (id) => {
        set((state) => ({
          mistakes: state.mistakes.map((m) =>
            m.id === id
              ? { ...m, timesReviewed: m.timesReviewed + 1, lastReviewed: Date.now() }
              : m
          ),
        }));
      },
      
      markRetested: (id, correct) => {
        set((state) => ({
          mistakes: state.mistakes.map((m) =>
            m.id === id
              ? { ...m, retested: true, retestedCorrect: correct }
              : m
          ),
        }));
      },
    }),
    { name: 'zen-chess-mistakes' }
  )
);
