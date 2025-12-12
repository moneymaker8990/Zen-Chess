// ============================================
// AI INTELLIGENCE SERVICE
// The behind-the-scenes brain that makes everything feel intelligent
// No popups, no interruptions - just seamless adaptation
// ============================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================

export interface UserPattern {
  // Time patterns
  preferredPlayTimes: number[]; // Hours of day (0-23)
  averageSessionLength: number; // minutes
  typicalBreakFrequency: number; // puzzles/games before natural pause
  
  // Skill patterns
  puzzleStrengths: string[]; // Tactical themes they excel at
  puzzleWeaknesses: string[]; // Themes needing work
  openingPreferences: string[]; // Openings they gravitate toward
  playStyle: 'aggressive' | 'positional' | 'balanced' | 'unknown';
  
  // Behavioral patterns
  tiltThreshold: number; // How many losses before they show tilt signs
  recoveryPattern: 'quick' | 'needs-break' | 'needs-change' | 'unknown';
  learningStyle: 'visual' | 'analytical' | 'practice-heavy' | 'unknown';
  
  // Engagement patterns
  prefersVariety: boolean; // Do they like switching activities or deep diving
  completionRate: number; // 0-1 how often they finish what they start
  hintUsageRate: number; // 0-1 how often they use hints
}

export interface SessionContext {
  // Current state
  minutesActive: number;
  activitiesCompleted: number;
  currentActivity: 'idle' | 'puzzle' | 'game' | 'study' | 'opening' | 'review';
  activityStreak: number; // How many of same activity in a row
  
  // Performance this session
  puzzlesAttempted: number;
  puzzlesSolved: number;
  averageSolveTime: number; // seconds
  accuracyTrend: 'improving' | 'stable' | 'declining';
  
  // Momentum
  momentum: 'building' | 'peak' | 'cooling' | 'low';
  flowState: boolean;
  lastMistakeMinutesAgo: number;
  
  // Energy
  estimatedEnergy: 'high' | 'medium' | 'low';
  shouldSuggestBreak: boolean;
  optimalActivityNow: string;
}

export interface AIDecision {
  type: string;
  value: unknown;
  confidence: number; // 0-1
  reason: string;
}

export interface IntelligentDefaults {
  // Puzzle defaults
  puzzleDifficulty: number; // 1-5
  puzzleThemeFocus: string | null;
  showHintsAfterAttempts: number;
  
  // Game defaults
  engineStrength: number; // 1-20
  suggestedTimeControl: string;
  
  // Training defaults
  sessionLength: 'short' | 'medium' | 'long';
  activityMix: Array<{ activity: string; weight: number }>;
  
  // UI defaults
  boardHighlighting: 'minimal' | 'moderate' | 'helpful';
  explanationDepth: 'brief' | 'standard' | 'detailed';
}

// ============================================
// AI INTELLIGENCE STORE
// Centralized state for all AI decisions
// ============================================

interface AIIntelligenceState {
  // Learned patterns
  patterns: UserPattern;
  
  // Current session
  session: SessionContext;
  
  // Computed defaults
  defaults: IntelligentDefaults;
  
  // Decision history (for learning)
  recentDecisions: AIDecision[];
  
  // Feature flags
  adaptiveDifficultyEnabled: boolean;
  smartPacingEnabled: boolean;
  predictiveNavigationEnabled: boolean;
  
  // Learning state
  totalInteractions: number;
  confidenceLevel: 'learning' | 'developing' | 'confident';
}

interface AIIntelligenceStore extends AIIntelligenceState {
  // === SESSION TRACKING ===
  startSession: () => void;
  recordActivity: (activity: SessionContext['currentActivity']) => void;
  recordPuzzleAttempt: (solved: boolean, timeSeconds: number, usedHint: boolean) => void;
  recordGameResult: (result: 'win' | 'loss' | 'draw', accuracy: number) => void;
  updateSessionContext: (updates: Partial<SessionContext>) => void;
  
  // === PATTERN LEARNING ===
  learnFromBehavior: (event: BehaviorEvent) => void;
  updatePatterns: (updates: Partial<UserPattern>) => void;
  
  // === INTELLIGENT DECISIONS ===
  getOptimalNextActivity: () => string;
  getSmartPuzzleDifficulty: () => number;
  getSmartPuzzleTheme: () => string | null;
  shouldShowHint: (attempts: number, timeSpent: number) => boolean;
  getOptimalEngineStrength: () => number;
  estimateBestSessionLength: () => 'short' | 'medium' | 'long';
  
  // === MOMENTUM & FLOW ===
  detectMomentum: () => SessionContext['momentum'];
  detectFlowState: () => boolean;
  shouldSuggestBreak: () => boolean;
  shouldSuggestActivityChange: () => string | null;
  
  // === DEFAULTS COMPUTATION ===
  recomputeDefaults: () => void;
}

// ============================================
// BEHAVIOR EVENTS
// ============================================

type BehaviorEvent = 
  | { type: 'puzzle_complete'; solved: boolean; time: number; theme: string; usedHint: boolean }
  | { type: 'game_complete'; result: 'win' | 'loss' | 'draw'; duration: number; accuracy: number }
  | { type: 'activity_switch'; from: string; to: string; afterMinutes: number }
  | { type: 'session_end'; duration: number; activities: string[] }
  | { type: 'hint_used'; after_attempts: number; after_seconds: number }
  | { type: 'break_taken'; after_activities: number }
  | { type: 'tilt_detected'; trigger: string }
  | { type: 'flow_achieved'; activity: string; duration: number };

// ============================================
// INITIAL STATE
// ============================================

const DEFAULT_PATTERNS: UserPattern = {
  preferredPlayTimes: [],
  averageSessionLength: 30,
  typicalBreakFrequency: 10,
  puzzleStrengths: [],
  puzzleWeaknesses: [],
  openingPreferences: [],
  playStyle: 'unknown',
  tiltThreshold: 3,
  recoveryPattern: 'unknown',
  learningStyle: 'unknown',
  prefersVariety: true,
  completionRate: 0.5,
  hintUsageRate: 0.3,
};

const DEFAULT_SESSION: SessionContext = {
  minutesActive: 0,
  activitiesCompleted: 0,
  currentActivity: 'idle',
  activityStreak: 0,
  puzzlesAttempted: 0,
  puzzlesSolved: 0,
  averageSolveTime: 30,
  accuracyTrend: 'stable',
  momentum: 'low',
  flowState: false,
  lastMistakeMinutesAgo: 0,
  estimatedEnergy: 'high',
  shouldSuggestBreak: false,
  optimalActivityNow: 'puzzle',
};

const DEFAULT_DEFAULTS: IntelligentDefaults = {
  puzzleDifficulty: 2,
  puzzleThemeFocus: null,
  showHintsAfterAttempts: 3,
  engineStrength: 10,
  suggestedTimeControl: '10+0',
  sessionLength: 'medium',
  activityMix: [
    { activity: 'puzzle', weight: 0.4 },
    { activity: 'study', weight: 0.3 },
    { activity: 'game', weight: 0.3 },
  ],
  boardHighlighting: 'moderate',
  explanationDepth: 'standard',
};

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useAIIntelligence = create<AIIntelligenceStore>()(
  persist(
    (set, get) => ({
      // Initial state
      patterns: DEFAULT_PATTERNS,
      session: DEFAULT_SESSION,
      defaults: DEFAULT_DEFAULTS,
      recentDecisions: [],
      adaptiveDifficultyEnabled: true,
      smartPacingEnabled: true,
      predictiveNavigationEnabled: true,
      totalInteractions: 0,
      confidenceLevel: 'learning',
      
      // ==========================================
      // SESSION TRACKING
      // ==========================================
      
      startSession: () => {
        const hour = new Date().getHours();
        set((state) => ({
          session: {
            ...DEFAULT_SESSION,
            estimatedEnergy: hour >= 22 || hour < 6 ? 'low' : 
                            hour >= 9 && hour < 12 ? 'high' : 'medium',
          },
          patterns: {
            ...state.patterns,
            preferredPlayTimes: [...new Set([...state.patterns.preferredPlayTimes, hour])].slice(-10),
          },
        }));
      },
      
      recordActivity: (activity) => {
        set((state) => {
          const isNewActivity = activity !== state.session.currentActivity;
          return {
            session: {
              ...state.session,
              currentActivity: activity,
              activitiesCompleted: state.session.activitiesCompleted + (isNewActivity ? 1 : 0),
              activityStreak: isNewActivity ? 1 : state.session.activityStreak + 1,
            },
            totalInteractions: state.totalInteractions + 1,
          };
        });
      },
      
      recordPuzzleAttempt: (solved, timeSeconds, usedHint) => {
        set((state) => {
          const newAttempted = state.session.puzzlesAttempted + 1;
          const newSolved = state.session.puzzlesSolved + (solved ? 1 : 0);
          const newAvgTime = (state.session.averageSolveTime * (newAttempted - 1) + timeSeconds) / newAttempted;
          
          // Update trend based on recent performance
          const recentRate = newAttempted > 3 ? newSolved / newAttempted : 0.5;
          let trend: SessionContext['accuracyTrend'] = 'stable';
          if (recentRate > 0.7) trend = 'improving';
          else if (recentRate < 0.4) trend = 'declining';
          
          // Update hint usage pattern
          const newHintRate = (state.patterns.hintUsageRate * state.totalInteractions + (usedHint ? 1 : 0)) / 
                             (state.totalInteractions + 1);
          
          return {
            session: {
              ...state.session,
              puzzlesAttempted: newAttempted,
              puzzlesSolved: newSolved,
              averageSolveTime: newAvgTime,
              accuracyTrend: trend,
              lastMistakeMinutesAgo: solved ? state.session.lastMistakeMinutesAgo : 0,
            },
            patterns: {
              ...state.patterns,
              hintUsageRate: newHintRate,
            },
            totalInteractions: state.totalInteractions + 1,
          };
        });
        
        // Trigger defaults recomputation
        get().recomputeDefaults();
      },
      
      recordGameResult: (result, accuracy) => {
        set((state) => {
          // Detect tilt pattern
          let tiltThreshold = state.patterns.tiltThreshold;
          if (result === 'loss') {
            // Track consecutive losses pattern
            const consecutiveLosses = state.recentDecisions.filter(
              d => d.type === 'game_result' && d.value === 'loss'
            ).length;
            if (consecutiveLosses >= 2) {
              tiltThreshold = Math.min(tiltThreshold, consecutiveLosses);
            }
          }
          
          return {
            patterns: {
              ...state.patterns,
              tiltThreshold,
            },
            session: {
              ...state.session,
              lastMistakeMinutesAgo: result === 'loss' ? 0 : state.session.lastMistakeMinutesAgo,
            },
            recentDecisions: [
              { type: 'game_result', value: result, confidence: 1, reason: 'recorded' },
              ...state.recentDecisions.slice(0, 20),
            ],
          };
        });
      },
      
      updateSessionContext: (updates) => {
        set((state) => ({
          session: { ...state.session, ...updates },
        }));
      },
      
      // ==========================================
      // PATTERN LEARNING
      // ==========================================
      
      learnFromBehavior: (event) => {
        const state = get();
        
        switch (event.type) {
          case 'puzzle_complete': {
            const themes = event.solved 
              ? [...state.patterns.puzzleStrengths, event.theme].slice(-20)
              : state.patterns.puzzleStrengths;
            const weaknesses = !event.solved
              ? [...state.patterns.puzzleWeaknesses, event.theme].slice(-20)
              : state.patterns.puzzleWeaknesses;
            
            set({ patterns: { ...state.patterns, puzzleStrengths: themes, puzzleWeaknesses: weaknesses } });
            break;
          }
          
          case 'session_end': {
            const avgLength = (state.patterns.averageSessionLength + event.duration) / 2;
            set({ patterns: { ...state.patterns, averageSessionLength: avgLength } });
            break;
          }
          
          case 'break_taken': {
            const breakFreq = (state.patterns.typicalBreakFrequency + event.after_activities) / 2;
            set({ patterns: { ...state.patterns, typicalBreakFrequency: breakFreq } });
            break;
          }
          
          case 'tilt_detected': {
            set({ 
              patterns: { 
                ...state.patterns, 
                recoveryPattern: 'needs-break',
              } 
            });
            break;
          }
          
          case 'flow_achieved': {
            set({
              patterns: {
                ...state.patterns,
                learningStyle: 'practice-heavy',
              },
            });
            break;
          }
        }
        
        // Update confidence level based on total interactions
        const total = state.totalInteractions;
        let confidence: AIIntelligenceState['confidenceLevel'] = 'learning';
        if (total > 50) confidence = 'developing';
        if (total > 200) confidence = 'confident';
        
        set({ confidenceLevel: confidence });
      },
      
      updatePatterns: (updates) => {
        set((state) => ({
          patterns: { ...state.patterns, ...updates },
        }));
      },
      
      // ==========================================
      // INTELLIGENT DECISIONS
      // ==========================================
      
      getOptimalNextActivity: () => {
        const { session, patterns, defaults } = get();
        
        // If in flow with puzzles, keep going
        if (session.flowState && session.currentActivity === 'puzzle') {
          return 'puzzle';
        }
        
        // If declining accuracy, suggest a break or switch
        if (session.accuracyTrend === 'declining' && session.puzzlesAttempted > 5) {
          return patterns.recoveryPattern === 'needs-change' ? 'study' : 'break';
        }
        
        // If been doing same activity too long, suggest variety
        if (session.activityStreak > patterns.typicalBreakFrequency && patterns.prefersVariety) {
          const options = ['puzzle', 'study', 'opening', 'game'];
          return options.find(o => o !== session.currentActivity) || 'puzzle';
        }
        
        // Use weighted defaults
        const weights = defaults.activityMix;
        const rand = Math.random();
        let cumulative = 0;
        for (const { activity, weight } of weights) {
          cumulative += weight;
          if (rand < cumulative) return activity;
        }
        
        return 'puzzle';
      },
      
      getSmartPuzzleDifficulty: () => {
        const { session, patterns, defaults, adaptiveDifficultyEnabled } = get();
        
        if (!adaptiveDifficultyEnabled) return defaults.puzzleDifficulty;
        
        // Base difficulty
        let difficulty = defaults.puzzleDifficulty;
        
        // Adjust based on current performance
        if (session.puzzlesSolved > 3) {
          const successRate = session.puzzlesSolved / session.puzzlesAttempted;
          
          if (successRate > 0.85 && session.averageSolveTime < 20) {
            // Too easy - increase
            difficulty = Math.min(5, difficulty + 1);
          } else if (successRate < 0.4) {
            // Too hard - decrease
            difficulty = Math.max(1, difficulty - 1);
          }
        }
        
        // Adjust based on energy level
        if (session.estimatedEnergy === 'low') {
          difficulty = Math.max(1, difficulty - 1);
        }
        
        // If in flow state, don't change difficulty
        if (session.flowState) {
          return defaults.puzzleDifficulty;
        }
        
        return difficulty;
      },
      
      getSmartPuzzleTheme: () => {
        const { patterns, session } = get();
        
        // If doing well, occasionally target weaknesses
        if (session.accuracyTrend === 'improving' && Math.random() > 0.7) {
          const weakness = patterns.puzzleWeaknesses[Math.floor(Math.random() * patterns.puzzleWeaknesses.length)];
          if (weakness) return weakness;
        }
        
        // Otherwise, let them play to strengths or random
        if (Math.random() > 0.5 && patterns.puzzleStrengths.length > 0) {
          return patterns.puzzleStrengths[Math.floor(Math.random() * patterns.puzzleStrengths.length)];
        }
        
        return null; // Random theme
      },
      
      shouldShowHint: (attempts, timeSpent) => {
        const { patterns, defaults, session } = get();
        
        // If user rarely uses hints, don't suggest
        if (patterns.hintUsageRate < 0.1) return false;
        
        // If struggling (many attempts or long time)
        const struggleThreshold = defaults.showHintsAfterAttempts;
        const timeThreshold = session.averageSolveTime * 2;
        
        if (attempts >= struggleThreshold || timeSpent >= timeThreshold) {
          return true;
        }
        
        return false;
      },
      
      getOptimalEngineStrength: () => {
        const { defaults, session, patterns } = get();
        
        let strength = defaults.engineStrength;
        
        // Adjust based on recent game performance
        const recentGames = patterns.completionRate;
        if (recentGames < 0.3) {
          // Losing too much - reduce
          strength = Math.max(1, strength - 2);
        } else if (recentGames > 0.8) {
          // Winning easily - increase
          strength = Math.min(20, strength + 2);
        }
        
        // Adjust for energy
        if (session.estimatedEnergy === 'low') {
          strength = Math.max(1, strength - 3);
        }
        
        return strength;
      },
      
      estimateBestSessionLength: () => {
        const { patterns, session } = get();
        
        const avgLength = patterns.averageSessionLength;
        const energy = session.estimatedEnergy;
        
        if (avgLength < 15 || energy === 'low') return 'short';
        if (avgLength > 45 && energy === 'high') return 'long';
        return 'medium';
      },
      
      // ==========================================
      // MOMENTUM & FLOW DETECTION
      // ==========================================
      
      detectMomentum: () => {
        const { session } = get();
        
        if (session.puzzlesAttempted < 3) return 'building';
        
        const successRate = session.puzzlesSolved / session.puzzlesAttempted;
        const recentTrend = session.accuracyTrend;
        
        if (successRate > 0.7 && recentTrend === 'improving') return 'peak';
        if (successRate > 0.5 && recentTrend !== 'declining') return 'building';
        if (recentTrend === 'declining') return 'cooling';
        
        return 'low';
      },
      
      detectFlowState: () => {
        const { session } = get();
        
        // Flow indicators:
        // - Consistent solve times (not too fast = guessing, not too slow = struggling)
        // - Good success rate
        // - Multiple activities completed
        const inGoodRhythm = session.averageSolveTime > 10 && session.averageSolveTime < 60;
        const goodSuccess = session.puzzlesSolved / Math.max(1, session.puzzlesAttempted) > 0.6;
        const sustained = session.puzzlesAttempted > 5;
        
        return inGoodRhythm && goodSuccess && sustained;
      },
      
      shouldSuggestBreak: () => {
        const { session, patterns, smartPacingEnabled } = get();
        
        if (!smartPacingEnabled) return false;
        
        // Time-based
        if (session.minutesActive > patterns.averageSessionLength * 1.5) return true;
        
        // Performance-based
        if (session.accuracyTrend === 'declining' && session.puzzlesAttempted > 10) return true;
        
        // Activity count based
        if (session.activitiesCompleted > patterns.typicalBreakFrequency * 1.5) return true;
        
        return false;
      },
      
      shouldSuggestActivityChange: () => {
        const { session, patterns } = get();
        
        // If stuck in declining trend
        if (session.accuracyTrend === 'declining' && session.activityStreak > 5) {
          const options = ['study', 'opening', 'review'];
          return options.find(o => o !== session.currentActivity) || null;
        }
        
        // If done a lot of one thing
        if (session.activityStreak > patterns.typicalBreakFrequency && patterns.prefersVariety) {
          return session.currentActivity === 'puzzle' ? 'game' : 'puzzle';
        }
        
        return null;
      },
      
      // ==========================================
      // DEFAULTS COMPUTATION
      // ==========================================
      
      recomputeDefaults: () => {
        const state = get();
        const { patterns, session } = state;
        
        // Compute puzzle difficulty
        let puzzleDifficulty = 2;
        if (patterns.puzzleStrengths.length > 10) puzzleDifficulty = 3;
        if (session.accuracyTrend === 'improving') puzzleDifficulty = Math.min(5, puzzleDifficulty + 1);
        
        // Compute explanation depth based on learning style
        let explanationDepth: IntelligentDefaults['explanationDepth'] = 'standard';
        if (patterns.learningStyle === 'analytical') explanationDepth = 'detailed';
        if (patterns.learningStyle === 'practice-heavy') explanationDepth = 'brief';
        
        // Compute board highlighting based on skill
        let boardHighlighting: IntelligentDefaults['boardHighlighting'] = 'moderate';
        if (patterns.hintUsageRate > 0.5) boardHighlighting = 'helpful';
        if (patterns.hintUsageRate < 0.1 && state.confidenceLevel === 'confident') {
          boardHighlighting = 'minimal';
        }
        
        // Session length
        const sessionLength = state.estimateBestSessionLength();
        
        set({
          defaults: {
            ...state.defaults,
            puzzleDifficulty,
            explanationDepth,
            boardHighlighting,
            sessionLength,
          },
        });
      },
    }),
    {
      name: 'zen-chess-ai-intelligence',
      version: 1,
      partialize: (state) => ({
        patterns: state.patterns,
        defaults: state.defaults,
        totalInteractions: state.totalInteractions,
        confidenceLevel: state.confidenceLevel,
        adaptiveDifficultyEnabled: state.adaptiveDifficultyEnabled,
        smartPacingEnabled: state.smartPacingEnabled,
        predictiveNavigationEnabled: state.predictiveNavigationEnabled,
      }),
    }
  )
);

// ============================================
// CONVENIENCE HOOKS
// ============================================

/** Get current intelligent defaults */
export function useIntelligentDefaults() {
  return useAIIntelligence((s) => s.defaults);
}

/** Get smart puzzle difficulty */
export function useSmartPuzzleDifficulty() {
  return useAIIntelligence((s) => s.getSmartPuzzleDifficulty());
}

/** Get optimal next activity suggestion */
export function useOptimalActivity() {
  return useAIIntelligence((s) => s.getOptimalNextActivity());
}

/** Get session momentum */
export function useSessionMomentum() {
  return useAIIntelligence((s) => s.detectMomentum());
}

/** Check if in flow state */
export function useFlowState() {
  return useAIIntelligence((s) => s.detectFlowState());
}

/** Hook that suggests when to show hints */
export function useSmartHints(attempts: number, timeSpent: number) {
  return useAIIntelligence((s) => s.shouldShowHint(attempts, timeSpent));
}

/** Hook for session pacing suggestions */
export function useSessionPacing() {
  const shouldBreak = useAIIntelligence((s) => s.shouldSuggestBreak());
  const activityChange = useAIIntelligence((s) => s.shouldSuggestActivityChange());
  return { shouldBreak, suggestedChange: activityChange };
}

// ============================================
// INTEGRATION HOOK - Use in App.tsx
// ============================================

/** Main hook to initialize and maintain AI intelligence */
export function useAIIntelligenceTracking() {
  const { 
    startSession, 
    recordActivity, 
    updateSessionContext,
    learnFromBehavior,
    recomputeDefaults,
    session,
  } = useAIIntelligence();
  
  const sessionStartRef = useRef<number>(Date.now());
  
  // Start session on mount
  useEffect(() => {
    startSession();
    sessionStartRef.current = Date.now();
    
    // Update session time every minute
    const interval = setInterval(() => {
      const minutesActive = Math.floor((Date.now() - sessionStartRef.current) / 60000);
      updateSessionContext({ minutesActive });
      
      // Recompute defaults periodically
      recomputeDefaults();
    }, 60000);
    
    return () => {
      clearInterval(interval);
      // Record session end
      learnFromBehavior({
        type: 'session_end',
        duration: Math.floor((Date.now() - sessionStartRef.current) / 60000),
        activities: [], // Would be populated from history
      });
    };
  }, []);
  
  return {
    recordActivity,
    session,
  };
}

// ============================================
// PREDICTIVE NAVIGATION
// ============================================

interface NavigationPrediction {
  destination: string;
  confidence: number;
  reason: string;
}

/** Predicts what the user might want to do next */
export function usePredictiveNavigation(): NavigationPrediction | null {
  const { session, patterns, predictiveNavigationEnabled } = useAIIntelligence();
  
  return useMemo(() => {
    if (!predictiveNavigationEnabled) return null;
    
    const current = session.currentActivity;
    const momentum = session.momentum;
    const trend = session.accuracyTrend;
    
    // High momentum in puzzles - suggest more puzzles or rush mode
    if (current === 'puzzle' && momentum === 'peak') {
      return {
        destination: '/train',
        confidence: 0.8,
        reason: "You're on fire! Keep the momentum going.",
      };
    }
    
    // Declining in puzzles - suggest study or break
    if (current === 'puzzle' && trend === 'declining' && session.puzzlesAttempted > 5) {
      return {
        destination: '/study',
        confidence: 0.7,
        reason: 'Time to reinforce some concepts.',
      };
    }
    
    // Idle for a while - suggest based on patterns
    if (current === 'idle' && patterns.puzzleWeaknesses.length > 0) {
      return {
        destination: '/train',
        confidence: 0.6,
        reason: `Practice your ${patterns.puzzleWeaknesses[0]} patterns.`,
      };
    }
    
    return null;
  }, [session, patterns, predictiveNavigationEnabled]);
}







