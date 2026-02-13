import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DetectedWeakness, PositionDiagram } from '@/lib/notesTypes';

// ============================================
// WEAKNESS DETECTION STORE
// ============================================

interface WeaknessState {
  weaknesses: DetectedWeakness[];
  
  addWeakness: (weakness: Omit<DetectedWeakness, 'id' | 'detectedAt'>) => string;
  updateWeakness: (id: string, updates: Partial<DetectedWeakness>) => void;
  recordOccurrence: (id: string, gameId: string, position?: PositionDiagram) => void;
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
