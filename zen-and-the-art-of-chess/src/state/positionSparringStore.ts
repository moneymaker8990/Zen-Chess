/**
 * POSITION SPARRING STORE
 *
 * Manage practice positions for sparring against engine.
 * CRUD, result tracking, and recommendations by source/weakness.
 * Persisted to localStorage as 'zen-chess-sparring'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SparringPosition } from '@/lib/trainingTypes';

interface PositionSparringState {
  positions: SparringPosition[];
  
  addPosition: (position: Omit<SparringPosition, 'id' | 'timesPlayed' | 'timesSucceeded' | 'lastPlayed'>) => string;
  updatePosition: (id: string, updates: Partial<SparringPosition>) => void;
  deletePosition: (id: string) => void;
  recordResult: (id: string, succeeded: boolean) => void;
  getPositionsBySource: (source: SparringPosition['source']) => SparringPosition[];
  getRecommendedPositions: () => SparringPosition[];
}

export const usePositionSparringStore = create<PositionSparringState>()(
  persist(
    (set, get) => ({
      positions: [],
      
      addPosition: (positionData) => {
        const id = `spar_${Date.now()}`;
        const position: SparringPosition = {
          ...positionData,
          id,
          timesPlayed: 0,
          timesSucceeded: 0,
          lastPlayed: 0,
        };
        set((state) => ({ positions: [position, ...state.positions] }));
        return id;
      },
      
      updatePosition: (id, updates) => {
        set((state) => ({
          positions: state.positions.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
      
      deletePosition: (id) => {
        set((state) => ({
          positions: state.positions.filter((p) => p.id !== id),
        }));
      },
      
      recordResult: (id, succeeded) => {
        set((state) => ({
          positions: state.positions.map((p) =>
            p.id === id
              ? {
                  ...p,
                  timesPlayed: p.timesPlayed + 1,
                  timesSucceeded: succeeded ? p.timesSucceeded + 1 : p.timesSucceeded,
                  lastPlayed: Date.now(),
                }
              : p
          ),
        }));
      },
      
      getPositionsBySource: (source) => {
        return get().positions.filter((p) => p.source === source);
      },
      
      getRecommendedPositions: () => {
        // Prioritize: low success rate, not played recently, from weaknesses
        return [...get().positions].sort((a, b) => {
          const aSuccessRate = a.timesPlayed > 0 ? a.timesSucceeded / a.timesPlayed : 0;
          const bSuccessRate = b.timesPlayed > 0 ? b.timesSucceeded / b.timesPlayed : 0;
          
          // From weakness = priority
          if (a.source === 'WEAKNESS' && b.source !== 'WEAKNESS') return -1;
          if (b.source === 'WEAKNESS' && a.source !== 'WEAKNESS') return 1;
          
          // Lower success rate = priority
          if (aSuccessRate !== bSuccessRate) return aSuccessRate - bSuccessRate;
          
          // Not played recently = priority
          return a.lastPlayed - b.lastPlayed;
        });
      },
    }),
    { name: 'zen-chess-sparring' }
  )
);
