// ============================================
// ZEN CHESS AI COACH STORE
// Zustand store for the personalized AI coach
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CoachState,
  CoachRecommendation,
  BehavioralEvent,
  EventType,
  EventContext,
  CoachConfig,
  CoachInsight,
  DailyCoachingPlan,
  SessionMood,
  FlowState,
  TimeOfDay,
  AccuracyData,
  MoveTimingData,
  GameResult,
} from '@/lib/coachTypes';
import {
  createInitialCoachState,
  createEmptyProfile,
  getTimeOfDay,
  DEFAULT_COACH_CONFIG,
  createGameMetrics,
} from '@/lib/coachTypes';
import {
  createCoachEngine,
  updateEmotionalProfile,
} from '@/lib/coachEngine';

// ============================================
// STORE INTERFACE
// ============================================

interface CoachStore {
  // ==========================================
  // STATE
  // ==========================================
  state: CoachState;
  config: CoachConfig;
  
  // ==========================================
  // SESSION MANAGEMENT
  // ==========================================
  
  /** Start a new session (call on app open) */
  startSession: () => void;
  
  /** End current session (call on app close/background) */
  endSession: () => void;
  
  /** Check if session is stale and needs restart */
  checkSessionFreshness: () => void;
  
  // ==========================================
  // EVENT RECORDING
  // ==========================================
  
  /** Record any behavioral event */
  recordEvent: (type: EventType, metadata?: Record<string, unknown>) => void;
  
  /** Record a completed game with full metrics */
  recordGame: (params: {
    result: GameResult;
    totalMoves: number;
    durationMinutes: number;
    accuracy: AccuracyData;
    timing: MoveTimingData;
    tacticalMisses?: string[];
    positionalErrors?: string[];
    blundersAfterBlunders?: number;
    resignedEarly?: boolean;
    timeScramble?: boolean;
  }) => void;
  
  /** Record a puzzle attempt */
  recordPuzzle: (solved: boolean, timeSeconds: number, hintsUsed: number) => void;
  
  /** Record meditation/breathing completion */
  recordMindfulness: (type: 'meditation' | 'breathing', durationMinutes: number) => void;
  
  /** Record a reflection submission */
  recordReflection: (content: string) => void;
  
  // ==========================================
  // RECOMMENDATIONS
  // ==========================================
  
  /** Get current recommendations from the coach */
  getRecommendations: () => CoachRecommendation[];
  
  /** Dismiss a recommendation */
  dismissRecommendation: (id: string) => void;
  
  /** Mark a recommendation as acted upon */
  actOnRecommendation: (id: string) => void;
  
  /** Provide feedback on whether a recommendation was helpful */
  rateRecommendation: (id: string, wasHelpful: boolean) => void;
  
  /** Clear expired recommendations */
  clearExpiredRecommendations: () => void;
  
  // ==========================================
  // INSIGHTS & PLANNING
  // ==========================================
  
  /** Get analytical insights about the player */
  getInsights: () => CoachInsight[];
  
  /** Get today's personalized coaching plan */
  getDailyPlan: () => DailyCoachingPlan;
  
  /** Get a specific insight by type */
  getInsight: (type: 'time' | 'tilt' | 'phase' | 'session') => string | null;
  
  // ==========================================
  // MOOD & FLOW
  // ==========================================
  
  /** Get current detected mood */
  getCurrentMood: () => SessionMood;
  
  /** Get current flow state */
  getCurrentFlow: () => FlowState;
  
  /** Update mood and flow (called automatically) */
  updateMoodAndFlow: () => void;
  
  // ==========================================
  // PROFILE MANAGEMENT
  // ==========================================
  
  /** Force profile update from recent games */
  updateProfile: () => void;
  
  /** Get profile confidence level */
  getProfileConfidence: () => 'LOW' | 'MEDIUM' | 'HIGH';
  
  /** Get total games tracked */
  getTotalGamesTracked: () => number;
  
  /** Reset profile (for testing/new user) */
  resetProfile: () => void;
  
  // ==========================================
  // CONFIG
  // ==========================================
  
  /** Update coach configuration */
  updateConfig: (updates: Partial<CoachConfig>) => void;
  
  // ==========================================
  // STATS & QUERIES
  // ==========================================
  
  /** Get today's stats */
  getTodayStats: () => {
    gamesPlayed: number;
    wins: number;
    losses: number;
    puzzlesSolved: number;
    meditationMinutes: number;
    averageAccuracy: number;
  };
  
  /** Get recent performance trend */
  getPerformanceTrend: () => 'IMPROVING' | 'STABLE' | 'DECLINING';
  
  /** Get best time of day to play */
  getBestTimeToPlay: () => TimeOfDay;
  
  /** Check if user is at risk of tilting */
  isTiltRisk: () => boolean;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function createEventContext(state: CoachState): EventContext {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todayGames = state.recentGames.filter(g => g.timestamp > todayStart.getTime());
  const todayPuzzles = state.recentEvents.filter(
    e => e.type === 'PUZZLE_COMPLETE' && e.timestamp > todayStart.getTime()
  );
  
  const lastEvent = state.recentEvents[0];
  const lastActivityMinutesAgo = lastEvent 
    ? (now - lastEvent.timestamp) / 60000 
    : 0;
  
  return {
    timeOfDay: getTimeOfDay(),
    dayOfWeek: new Date().getDay(),
    sessionDurationMinutes: (now - state.sessionStartTime) / 60000,
    gamesPlayedToday: todayGames.length,
    puzzlesSolvedToday: todayPuzzles.length,
    currentStreak: 0, // Would integrate with progress store
    lastActivityMinutesAgo,
    recentTiltLevel: 'CALM', // Would integrate with tilt detection
    isFirstActivityOfDay: todayGames.length === 0 && todayPuzzles.length === 0,
  };
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useCoachStore = create<CoachStore>()(
  persist(
    (set, get) => ({
      // ==========================================
      // INITIAL STATE
      // ==========================================
      state: createInitialCoachState(),
      config: DEFAULT_COACH_CONFIG,
      
      // ==========================================
      // SESSION MANAGEMENT
      // ==========================================
      
      startSession: () => {
        const now = Date.now();
        set((store) => ({
          state: {
            ...store.state,
            sessionStartTime: now,
            lastActivityTime: now,
            currentMood: 'FRESH',
            currentFlow: 'NONE',
            gamesThisSession: 0,
            winsThisSession: 0,
            lossesThisSession: 0,
            puzzlesThisSession: 0,
            meditationMinutesThisSession: 0,
          },
        }));
        
        // Record session start event
        get().recordEvent('SESSION_START');
      },
      
      endSession: () => {
        get().recordEvent('SESSION_END');
        
        // Update profile before ending
        get().updateProfile();
      },
      
      checkSessionFreshness: () => {
        const { state } = get();
        const hoursSinceStart = (Date.now() - state.sessionStartTime) / (1000 * 60 * 60);
        
        // If more than 4 hours, start fresh session
        if (hoursSinceStart > 4) {
          get().startSession();
        }
      },
      
      // ==========================================
      // EVENT RECORDING
      // ==========================================
      
      recordEvent: (type, metadata = {}) => {
        const { state, config } = get();
        
        const event: BehavioralEvent = {
          id: generateEventId(),
          timestamp: Date.now(),
          type,
          context: createEventContext(state),
          metadata,
        };
        
        set((store) => ({
          state: {
            ...store.state,
            lastActivityTime: Date.now(),
            recentEvents: [event, ...store.state.recentEvents].slice(0, config.maxEventsToKeep),
            totalInteractions: store.state.totalInteractions + 1,
          },
        }));
      },
      
      recordGame: (params) => {
        const { state, config } = get();
        const previousGame = state.recentGames[0];
        
        // Create enhanced game metrics
        const gameMetrics = createGameMetrics({
          result: params.result,
          totalMoves: params.totalMoves,
          durationMinutes: params.durationMinutes,
          accuracy: params.accuracy,
          timing: params.timing,
          previousGame,
          gamesPlayedToday: state.recentGames.filter(
            g => g.timestamp > new Date().setHours(0, 0, 0, 0)
          ).length,
          gameNumberInSession: state.gamesThisSession + 1,
        });
        
        // Add optional fields
        if (params.tacticalMisses) {
          gameMetrics.tacticalMisses = params.tacticalMisses;
        }
        if (params.positionalErrors) {
          gameMetrics.positionalErrors = params.positionalErrors;
        }
        if (params.blundersAfterBlunders !== undefined) {
          gameMetrics.emotionalSignals.blundersAfterBlunders = params.blundersAfterBlunders;
        }
        if (params.resignedEarly !== undefined) {
          gameMetrics.emotionalSignals.resignedEarly = params.resignedEarly;
        }
        if (params.timeScramble !== undefined) {
          gameMetrics.emotionalSignals.timeScramble = params.timeScramble;
        }
        
        // Update state
        set((store) => ({
          state: {
            ...store.state,
            lastActivityTime: Date.now(),
            recentGames: [gameMetrics, ...store.state.recentGames].slice(0, config.maxGamesToKeep),
            gamesThisSession: store.state.gamesThisSession + 1,
            winsThisSession: params.result === 'WIN' 
              ? store.state.winsThisSession + 1 
              : store.state.winsThisSession,
            lossesThisSession: params.result === 'LOSS' 
              ? store.state.lossesThisSession + 1 
              : store.state.lossesThisSession,
          },
        }));
        
        // Record event
        get().recordEvent('GAME_END', { 
          result: params.result,
          accuracy: params.accuracy.overall,
        });
        
        // Update mood and flow
        get().updateMoodAndFlow();
        
        // Update profile every 5 games
        if ((state.gamesThisSession + 1) % 5 === 0) {
          get().updateProfile();
        }
      },
      
      recordPuzzle: (solved, timeSeconds, hintsUsed) => {
        const eventType: EventType = solved ? 'PUZZLE_COMPLETE' : 'PUZZLE_FAILED';
        
        get().recordEvent(eventType, {
          solved,
          timeSeconds,
          hintsUsed,
        });
        
        if (solved) {
          set((store) => ({
            state: {
              ...store.state,
              puzzlesThisSession: store.state.puzzlesThisSession + 1,
            },
          }));
        }
      },
      
      recordMindfulness: (type, durationMinutes) => {
        const eventType: EventType = type === 'meditation' 
          ? 'MEDITATION_COMPLETE' 
          : 'BREATHING_EXERCISE';
        
        get().recordEvent(eventType, { durationMinutes });
        
        set((store) => ({
          state: {
            ...store.state,
            meditationMinutesThisSession: store.state.meditationMinutesThisSession + durationMinutes,
          },
        }));
      },
      
      recordReflection: (content) => {
        get().recordEvent('REFLECTION_SUBMITTED', {
          contentLength: content.length,
          // Don't store actual content for privacy
        });
      },
      
      // ==========================================
      // RECOMMENDATIONS
      // ==========================================
      
      getRecommendations: () => {
        const { state, config } = get();
        
        // Check if we should generate new recommendations
        const timeSinceLastRec = (Date.now() - state.lastRecommendationTime) / 60000;
        
        if (timeSinceLastRec >= config.minTimeBetweenRecommendations || 
            state.activeRecommendations.length === 0) {
          const engine = createCoachEngine(state, config);
          const newRecs = engine.generateRecommendations();
          
          set((store) => ({
            state: {
              ...store.state,
              activeRecommendations: newRecs,
              lastRecommendationTime: Date.now(),
            },
          }));
          
          return newRecs;
        }
        
        return state.activeRecommendations;
      },
      
      dismissRecommendation: (id) => {
        set((store) => ({
          state: {
            ...store.state,
            dismissedRecommendationIds: [...store.state.dismissedRecommendationIds, id],
            activeRecommendations: store.state.activeRecommendations.map(r =>
              r.id === id ? { ...r, dismissedAt: Date.now() } : r
            ),
          },
        }));
      },
      
      actOnRecommendation: (id) => {
        set((store) => ({
          state: {
            ...store.state,
            activeRecommendations: store.state.activeRecommendations.map(r =>
              r.id === id ? { ...r, actedOnAt: Date.now() } : r
            ),
          },
        }));
      },
      
      rateRecommendation: (id, wasHelpful) => {
        set((store) => ({
          state: {
            ...store.state,
            activeRecommendations: store.state.activeRecommendations.map(r =>
              r.id === id ? { ...r, wasHelpful } : r
            ),
            helpfulRecommendations: wasHelpful 
              ? store.state.helpfulRecommendations + 1 
              : store.state.helpfulRecommendations,
          },
        }));
      },
      
      clearExpiredRecommendations: () => {
        const now = Date.now();
        set((store) => ({
          state: {
            ...store.state,
            activeRecommendations: store.state.activeRecommendations.filter(
              r => !r.expiresAt || r.expiresAt > now
            ),
          },
        }));
      },
      
      // ==========================================
      // INSIGHTS & PLANNING
      // ==========================================
      
      getInsights: () => {
        const { state, config } = get();
        const engine = createCoachEngine(state, config);
        return engine.generateInsights();
      },
      
      getDailyPlan: () => {
        const { state, config } = get();
        const engine = createCoachEngine(state, config);
        return engine.generateDailyPlan();
      },
      
      getInsight: (type) => {
        const { state } = get();
        const profile = state.emotionalProfile;
        
        switch (type) {
          case 'time':
            if (profile.confidence === 'LOW') return null;
            return `You perform best during ${profile.timeProfile.bestTimeOfDay.toLowerCase().replace('_', ' ')} and struggle during ${profile.timeProfile.worstTimeOfDay.toLowerCase().replace('_', ' ')}.`;
          
          case 'tilt':
            if (profile.tiltProfile.postLossAccuracyDrop < 3) return null;
            return `After a loss, your accuracy typically drops ${profile.tiltProfile.postLossAccuracyDrop.toFixed(1)}%. You usually recover after ${profile.tiltProfile.tiltRecoveryGames} games.`;
          
          case 'phase':
            return `Your strongest phase is ${profile.chessProfile.strongestPhase.toLowerCase()}, while ${profile.chessProfile.weakestPhase.toLowerCase()} needs the most work.`;
          
          case 'session':
            return `Your optimal session length is around ${profile.sessionProfile.optimalSessionLengthMinutes} minutes. Performance tends to decline after ${profile.sessionProfile.fatigueThresholdGames} games.`;
          
          default:
            return null;
        }
      },
      
      // ==========================================
      // MOOD & FLOW
      // ==========================================
      
      getCurrentMood: () => {
        const { state, config } = get();
        const engine = createCoachEngine(state, config);
        return engine.detectCurrentMood();
      },
      
      getCurrentFlow: () => {
        const { state, config } = get();
        const engine = createCoachEngine(state, config);
        return engine.detectFlowState();
      },
      
      updateMoodAndFlow: () => {
        const mood = get().getCurrentMood();
        const flow = get().getCurrentFlow();
        
        set((store) => ({
          state: {
            ...store.state,
            currentMood: mood,
            currentFlow: flow,
          },
        }));
      },
      
      // ==========================================
      // PROFILE MANAGEMENT
      // ==========================================
      
      updateProfile: () => {
        const { state } = get();
        
        if (state.recentGames.length < 3) return; // Not enough data
        
        const updatedProfile = updateEmotionalProfile(
          state.emotionalProfile,
          state.recentGames
        );
        
        set((store) => ({
          state: {
            ...store.state,
            emotionalProfile: updatedProfile,
            lastProfileUpdate: Date.now(),
          },
        }));
      },
      
      getProfileConfidence: () => {
        return get().state.emotionalProfile.confidence;
      },
      
      getTotalGamesTracked: () => {
        return get().state.recentGames.length;
      },
      
      resetProfile: () => {
        set((store) => ({
          state: {
            ...store.state,
            emotionalProfile: createEmptyProfile(),
            recentGames: [],
            recentEvents: [],
            lastProfileUpdate: 0,
          },
        }));
      },
      
      // ==========================================
      // CONFIG
      // ==========================================
      
      updateConfig: (updates) => {
        set((store) => ({
          config: { ...store.config, ...updates },
        }));
      },
      
      // ==========================================
      // STATS & QUERIES
      // ==========================================
      
      getTodayStats: () => {
        const { state } = get();
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        
        const todayGames = state.recentGames.filter(
          g => g.timestamp > todayStart.getTime()
        );
        
        const todayPuzzles = state.recentEvents.filter(
          e => e.type === 'PUZZLE_COMPLETE' && e.timestamp > todayStart.getTime()
        );
        
        const todayMeditation = state.recentEvents
          .filter(e => 
            (e.type === 'MEDITATION_COMPLETE' || e.type === 'BREATHING_EXERCISE') && 
            e.timestamp > todayStart.getTime()
          )
          .reduce((sum, e) => sum + ((e.metadata.durationMinutes as number) || 0), 0);
        
        const avgAccuracy = todayGames.length > 0
          ? todayGames.reduce((s, g) => s + g.accuracy.overall, 0) / todayGames.length
          : 0;
        
        return {
          gamesPlayed: todayGames.length,
          wins: todayGames.filter(g => g.result === 'WIN').length,
          losses: todayGames.filter(g => g.result === 'LOSS').length,
          puzzlesSolved: todayPuzzles.length,
          meditationMinutes: todayMeditation,
          averageAccuracy: avgAccuracy,
        };
      },
      
      getPerformanceTrend: () => {
        const { state } = get();
        const games = state.recentGames;
        
        if (games.length < 10) return 'STABLE';
        
        const recent = games.slice(0, 10);
        const older = games.slice(10, 20);
        
        if (older.length < 5) return 'STABLE';
        
        const recentAvg = recent.reduce((s, g) => s + g.accuracy.overall, 0) / recent.length;
        const olderAvg = older.reduce((s, g) => s + g.accuracy.overall, 0) / older.length;
        
        const diff = recentAvg - olderAvg;
        
        if (diff > 5) return 'IMPROVING';
        if (diff < -5) return 'DECLINING';
        return 'STABLE';
      },
      
      getBestTimeToPlay: () => {
        return get().state.emotionalProfile.timeProfile.bestTimeOfDay;
      },
      
      isTiltRisk: () => {
        const { state } = get();
        const recentGames = state.recentGames.slice(0, 5);
        
        // Count consecutive losses
        let consecutiveLosses = 0;
        for (const game of recentGames) {
          if (game.result === 'LOSS') consecutiveLosses++;
          else break;
        }
        
        const threshold = state.emotionalProfile.tiltProfile.consecutiveLossThreshold;
        return consecutiveLosses >= threshold - 1;
      },
    }),
    {
      name: 'zen-chess-coach',
      version: 1,
      // Only persist essential data, not derived state
      partialize: (state) => ({
        state: {
          ...state.state,
          // Don't persist these - they're recalculated
          activeRecommendations: [],
        },
        config: state.config,
      }),
    }
  )
);

// ============================================
// HOOKS FOR COMMON USE CASES
// ============================================

/** 
 * Hook to get current recommendations.
 * NOTE: Call refreshRecommendations() when you want to regenerate.
 * This hook just returns the cached recommendations to avoid re-renders.
 */
export function useCoachRecommendations(): CoachRecommendation[] {
  return useCoachStore((state) => state.state.activeRecommendations);
}

/** Hook to refresh recommendations (call on user action, not in render) */
export function useRefreshRecommendations(): () => CoachRecommendation[] {
  return useCoachStore((state) => state.getRecommendations);
}

/** Hook to get today's stats */
export function useTodayStats() {
  const state = useCoachStore((s) => s.state);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todayGames = state.recentGames.filter(
    g => g.timestamp > todayStart.getTime()
  );
  
  const todayPuzzles = state.recentEvents.filter(
    e => e.type === 'PUZZLE_COMPLETE' && e.timestamp > todayStart.getTime()
  );
  
  const todayMeditation = state.recentEvents
    .filter(e => 
      (e.type === 'MEDITATION_COMPLETE' || e.type === 'BREATHING_EXERCISE') && 
      e.timestamp > todayStart.getTime()
    )
    .reduce((sum, e) => sum + ((e.metadata.durationMinutes as number) || 0), 0);
  
  const avgAccuracy = todayGames.length > 0
    ? todayGames.reduce((s, g) => s + g.accuracy.overall, 0) / todayGames.length
    : 0;
  
  return {
    gamesPlayed: todayGames.length,
    wins: todayGames.filter(g => g.result === 'WIN').length,
    losses: todayGames.filter(g => g.result === 'LOSS').length,
    puzzlesSolved: todayPuzzles.length,
    meditationMinutes: todayMeditation,
    averageAccuracy: avgAccuracy,
  };
}

/** Hook to get current mood */
export function useCurrentMood(): SessionMood {
  return useCoachStore((state) => state.state.currentMood);
}

/** Hook to get current flow state */
export function useCurrentFlow(): FlowState {
  return useCoachStore((state) => state.state.currentFlow);
}

/** Hook to check tilt risk */
export function useTiltRisk(): boolean {
  const state = useCoachStore((s) => s.state);
  const recentGames = state.recentGames.slice(0, 5);
  
  // Count consecutive losses
  let consecutiveLosses = 0;
  for (const game of recentGames) {
    if (game.result === 'LOSS') consecutiveLosses++;
    else break;
  }
  
  const threshold = state.emotionalProfile.tiltProfile.consecutiveLossThreshold;
  return consecutiveLosses >= threshold - 1;
}

/** Hook to get profile confidence */
export function useProfileConfidence(): 'LOW' | 'MEDIUM' | 'HIGH' {
  return useCoachStore((state) => state.state.emotionalProfile.confidence);
}

// ============================================
// INITIALIZATION HELPER
// ============================================

/** Call this on app startup */
export function initializeCoach(): void {
  const store = useCoachStore.getState();
  store.checkSessionFreshness();
  store.clearExpiredRecommendations();
  store.updateMoodAndFlow();
}

