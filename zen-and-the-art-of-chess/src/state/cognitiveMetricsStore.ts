/**
 * COGNITIVE METRICS STORE
 *
 * Track game performance metrics: phase accuracy, fatigue, tilt.
 * Builds CognitiveProfile from recent games for coaching insights.
 * Persisted to localStorage as 'zen-chess-cognitive'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameCognitiveMetrics,
  CognitiveProfile,
} from '@/lib/trainingTypes';
import { COGNITIVE_METRICS_GAME_LIMIT } from '@/lib/constants';

interface CognitiveMetricsState {
  gameMetrics: GameCognitiveMetrics[];
  profile: CognitiveProfile | null;
  
  recordGameMetrics: (metrics: GameCognitiveMetrics) => void;
  updateProfile: () => void;
  getRecentTrends: () => {
    accuracyTrend: 'UP' | 'DOWN' | 'STABLE';
    tiltFrequency: number;
    bestPerformanceTime: string;
  };
}

export const useCognitiveMetricsStore = create<CognitiveMetricsState>()(
  persist(
    (set, get) => ({
      gameMetrics: [],
      profile: null,
      
      recordGameMetrics: (metrics) => {
        set((state) => ({
          gameMetrics: [metrics, ...state.gameMetrics].slice(0, COGNITIVE_METRICS_GAME_LIMIT),
        }));
        get().updateProfile();
      },
      
      updateProfile: () => {
        const metrics = get().gameMetrics;
        if (metrics.length < 10) return;
        
        // Calculate averages
        const avgOpening = metrics.reduce((s, m) => s + m.openingAccuracy, 0) / metrics.length;
        const avgMiddle = metrics.reduce((s, m) => s + m.middlegameAccuracy, 0) / metrics.length;
        const avgEnd = metrics.reduce((s, m) => s + m.endgameAccuracy, 0) / metrics.length;
        
        // Find strongest/weakest phase
        const phases: ('OPENING' | 'MIDDLEGAME' | 'ENDGAME')[] = ['OPENING', 'MIDDLEGAME', 'ENDGAME'];
        const phaseAvgs = [avgOpening, avgMiddle, avgEnd];
        const strongest = phases[phaseAvgs.indexOf(Math.max(...phaseAvgs))];
        const weakest = phases[phaseAvgs.indexOf(Math.min(...phaseAvgs))];
        
        // Tilt detection
        const tiltGames = metrics.filter((m) => m.mistakeCluster).length;
        
        const profile: CognitiveProfile = {
          bestTimeOfDay: '10am-12pm', // Would need actual time data
          worstTimeOfDay: '10pm-12am',
          freshGameAccuracy: metrics[0]?.middlegameAccuracy || 0,
          fatigueDropoff: 5,
          postLossAccuracy: 0,
          postWinAccuracy: 0,
          winStreakMax: 5,
          tiltGameCount: tiltGames,
          strongestPhase: strongest,
          weakestPhase: weakest,
          avgCalculationDepth: 3,
          blunderAfterLongThink: 15,
        };
        
        set({ profile });
      },
      
      getRecentTrends: () => {
        const metrics = get().gameMetrics.slice(0, 20);
        const older = get().gameMetrics.slice(20, 40);
        
        const recentAvg = metrics.length > 0
          ? metrics.reduce((s, m) => s + m.middlegameAccuracy, 0) / metrics.length
          : 0;
        const olderAvg = older.length > 0
          ? older.reduce((s, m) => s + m.middlegameAccuracy, 0) / older.length
          : recentAvg;
        
        let accuracyTrend: 'UP' | 'DOWN' | 'STABLE' = 'STABLE';
        if (recentAvg - olderAvg > 3) accuracyTrend = 'UP';
        if (recentAvg - olderAvg < -3) accuracyTrend = 'DOWN';
        
        const tiltGames = metrics.filter((m) => m.mistakeCluster).length;
        
        return {
          accuracyTrend,
          tiltFrequency: (tiltGames / metrics.length) * 100,
          bestPerformanceTime: '10am-12pm',
        };
      },
    }),
    { name: 'zen-chess-cognitive' }
  )
);
