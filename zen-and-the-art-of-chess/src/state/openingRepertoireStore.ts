/**
 * OPENING REPERTOIRE STORE
 *
 * Manage opening study progress with spaced repetition (SM-2).
 * CRUD for repertoires and lines, quiz functionality.
 * Persisted to localStorage as 'zen-chess-repertoires'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  OpeningRepertoire,
  RepertoireLine,
} from '@/lib/trainingTypes';

interface OpeningRepertoireState {
  repertoires: OpeningRepertoire[];
  
  // CRUD
  createRepertoire: (name: string, color: 'white' | 'black') => string;
  deleteRepertoire: (id: string) => void;
  addLine: (repertoireId: string, line: Omit<RepertoireLine, 'id' | 'lastReviewed' | 'nextReview' | 'ease' | 'interval' | 'repetitions' | 'timesPlayed' | 'timesCorrect' | 'deviations'>) => void;
  updateLine: (repertoireId: string, lineId: string, updates: Partial<RepertoireLine>) => void;
  
  // Spaced repetition
  getDueLines: (repertoireId: string) => RepertoireLine[];
  reviewLine: (repertoireId: string, lineId: string, quality: 1 | 2 | 3 | 4 | 5) => void;
  
  // Quiz
  getQuizPositions: (repertoireId: string, count: number) => RepertoireLine[];
  recordQuizResult: (repertoireId: string, lineId: string, correct: boolean) => void;
}

export const useOpeningRepertoireStore = create<OpeningRepertoireState>()(
  persist(
    (set, get) => ({
      repertoires: [],
      
      createRepertoire: (name, color) => {
        const id = `rep_${Date.now()}`;
        const repertoire: OpeningRepertoire = {
          id,
          name,
          color,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lines: [],
          totalPositions: 0,
          masteredPositions: 0,
          gamesPlayed: 0,
          winRate: 0,
        };
        set((state) => ({ repertoires: [...state.repertoires, repertoire] }));
        return id;
      },
      
      deleteRepertoire: (id) => {
        set((state) => ({
          repertoires: state.repertoires.filter((r) => r.id !== id),
        }));
      },
      
      addLine: (repertoireId, lineData) => {
        set((state) => ({
          repertoires: state.repertoires.map((r) => {
            if (r.id !== repertoireId) return r;
            
            const line: RepertoireLine = {
              ...lineData,
              id: `line_${Date.now()}`,
              lastReviewed: 0,
              nextReview: Date.now(),
              ease: 2.5,
              interval: 1,
              repetitions: 0,
              timesPlayed: 0,
              timesCorrect: 0,
              deviations: [],
            };
            
            return {
              ...r,
              lines: [...r.lines, line],
              totalPositions: r.totalPositions + 1,
              updatedAt: Date.now(),
            };
          }),
        }));
      },
      
      updateLine: (repertoireId, lineId, updates) => {
        set((state) => ({
          repertoires: state.repertoires.map((r) => {
            if (r.id !== repertoireId) return r;
            return {
              ...r,
              lines: r.lines.map((l) =>
                l.id === lineId ? { ...l, ...updates } : l
              ),
              updatedAt: Date.now(),
            };
          }),
        }));
      },
      
      getDueLines: (repertoireId) => {
        const rep = get().repertoires.find((r) => r.id === repertoireId);
        if (!rep) return [];
        const now = Date.now();
        return rep.lines.filter((l) => l.nextReview <= now);
      },
      
      reviewLine: (repertoireId, lineId, quality) => {
        // SM-2 algorithm for spaced repetition
        set((state) => ({
          repertoires: state.repertoires.map((r) => {
            if (r.id !== repertoireId) return r;
            
            return {
              ...r,
              lines: r.lines.map((l) => {
                if (l.id !== lineId) return l;
                
                let { ease, interval, repetitions } = l;
                
                if (quality < 3) {
                  // Failed - reset
                  repetitions = 0;
                  interval = 1;
                } else {
                  // Passed
                  if (repetitions === 0) {
                    interval = 1;
                  } else if (repetitions === 1) {
                    interval = 6;
                  } else {
                    interval = Math.round(interval * ease);
                  }
                  repetitions++;
                }
                
                // Update ease factor
                ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
                if (ease < 1.3) ease = 1.3;
                
                const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
                
                return {
                  ...l,
                  ease,
                  interval,
                  repetitions,
                  lastReviewed: Date.now(),
                  nextReview,
                };
              }),
              updatedAt: Date.now(),
            };
          }),
        }));
      },
      
      getQuizPositions: (repertoireId, count) => {
        const rep = get().repertoires.find((r) => r.id === repertoireId);
        if (!rep) return [];
        
        // Prioritize due lines, then least reviewed
        const sorted = [...rep.lines].sort((a, b) => {
          const aDue = a.nextReview <= Date.now() ? 0 : 1;
          const bDue = b.nextReview <= Date.now() ? 0 : 1;
          if (aDue !== bDue) return aDue - bDue;
          return a.timesPlayed - b.timesPlayed;
        });
        
        return sorted.slice(0, count);
      },
      
      recordQuizResult: (repertoireId, lineId, correct) => {
        set((state) => ({
          repertoires: state.repertoires.map((r) => {
            if (r.id !== repertoireId) return r;
            
            return {
              ...r,
              lines: r.lines.map((l) => {
                if (l.id !== lineId) return l;
                return {
                  ...l,
                  timesPlayed: l.timesPlayed + 1,
                  timesCorrect: correct ? l.timesCorrect + 1 : l.timesCorrect,
                };
              }),
            };
          }),
        }));
      },
    }),
    { name: 'zen-chess-repertoires' }
  )
);
