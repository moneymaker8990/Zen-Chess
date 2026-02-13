import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameMentalLog, MentalPattern } from '@/lib/notesTypes';

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
