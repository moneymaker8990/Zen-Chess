import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  MistakeEntry,
  MistakeType,
  TacticalPattern,
  RootCause,
  PatternAttempt,
  PatternProfile,
  OpeningRepertoire,
  RepertoireLine,
  SparringPosition,
  GameCognitiveMetrics,
  CognitiveProfile,
} from '@/lib/trainingTypes';

// ============================================
// MISTAKE LIBRARY STORE
// ============================================

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

// ============================================
// PATTERN RECOGNITION STORE
// ============================================

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

// ============================================
// OPENING REPERTOIRE STORE
// ============================================

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

// ============================================
// POSITION SPARRING STORE
// ============================================

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

// ============================================
// COGNITIVE METRICS STORE
// ============================================

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
          gameMetrics: [metrics, ...state.gameMetrics].slice(0, 500), // Keep last 500 games
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

