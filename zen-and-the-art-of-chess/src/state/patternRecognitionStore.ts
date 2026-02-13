/**
 * PATTERN RECOGNITION STORE
 *
 * Track pattern recognition proficiency for tactical themes.
 * Records attempts, maintains profiles, identifies weak/strong patterns.
 * Persisted to localStorage as 'zen-chess-patterns'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  TacticalPattern,
  PatternAttempt,
  PatternProfile,
} from '@/lib/trainingTypes';

interface PatternRecognitionState {
  attempts: PatternAttempt[];
  profiles: PatternProfile[];
  
  recordAttempt: (attempt: Omit<PatternAttempt, 'id' | 'timestamp'>) => void;
  getPatternProfile: (pattern: TacticalPattern) => PatternProfile | undefined;
  getWeakPatterns: () => PatternProfile[];
  getStrongPatterns: () => PatternProfile[];
  updateProfiles: () => void;
}

export const usePatternRecognitionStore = create<PatternRecognitionState>()(
  persist(
    (set, get) => ({
      attempts: [],
      profiles: [],
      
      recordAttempt: (attemptData) => {
        const attempt: PatternAttempt = {
          ...attemptData,
          id: `attempt_${Date.now()}`,
          timestamp: Date.now(),
        };
        set((state) => ({ attempts: [attempt, ...state.attempts] }));
        get().updateProfiles();
      },
      
      getPatternProfile: (pattern) => {
        return get().profiles.find((p) => p.patternType === pattern);
      },
      
      getWeakPatterns: () => {
        return get().profiles
          .filter((p) => p.successRate < 0.6 || p.needsPractice)
          .sort((a, b) => a.successRate - b.successRate);
      },
      
      getStrongPatterns: () => {
        return get().profiles
          .filter((p) => p.successRate >= 0.8)
          .sort((a, b) => b.successRate - a.successRate);
      },
      
      updateProfiles: () => {
        const attempts = get().attempts;
        const patternGroups: Record<string, PatternAttempt[]> = {};
        
        attempts.forEach((a) => {
          if (!patternGroups[a.patternType]) {
            patternGroups[a.patternType] = [];
          }
          patternGroups[a.patternType].push(a);
        });
        
        const profiles: PatternProfile[] = Object.entries(patternGroups).map(
          ([pattern, patternAttempts]) => {
            const solved = patternAttempts.filter((a) => a.solved);
            const instinctive = patternAttempts.filter((a) => a.wasInstinctive && a.solved);
            const avgTime = solved.length > 0
              ? solved.reduce((sum, a) => sum + a.timeToSolve, 0) / solved.length
              : 0;
            
            // Calculate trend from last 20 attempts
            const recent = patternAttempts.slice(0, 20);
            const older = patternAttempts.slice(20, 40);
            const recentRate = recent.filter((a) => a.solved).length / recent.length;
            const olderRate = older.length > 0
              ? older.filter((a) => a.solved).length / older.length
              : recentRate;
            
            let trend: 'IMPROVING' | 'STABLE' | 'DECLINING' = 'STABLE';
            if (recentRate - olderRate > 0.1) trend = 'IMPROVING';
            if (recentRate - olderRate < -0.1) trend = 'DECLINING';
            
            return {
              patternType: pattern as TacticalPattern,
              totalAttempts: patternAttempts.length,
              successRate: solved.length / patternAttempts.length,
              averageTime: avgTime,
              instinctiveRate: instinctive.length / (solved.length || 1),
              trend,
              lastAttempt: patternAttempts[0]?.timestamp || 0,
              needsPractice: solved.length / patternAttempts.length < 0.7,
            };
          }
        );
        
        set({ profiles });
      },
    }),
    { name: 'zen-chess-patterns' }
  )
);
