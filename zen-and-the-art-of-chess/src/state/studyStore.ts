import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudySession, DailyStats } from '@/lib/notesTypes';

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
  
  // Auto-tracking methods
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
