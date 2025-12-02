// ============================================
// ZEN CHESS AI COACH - TYPE DEFINITIONS
// The foundation for a personalized AI coach agent
// ============================================

import type { TiltLevel } from './types';

// ============================================
// TIME & CONTEXT
// ============================================

export type TimeOfDay = 
  | 'EARLY_MORNING'   // 5-8am
  | 'MORNING'         // 8-12pm
  | 'AFTERNOON'       // 12-5pm
  | 'EVENING'         // 5-9pm
  | 'NIGHT'           // 9pm-12am
  | 'LATE_NIGHT';     // 12-5am

export type SessionMood = 
  | 'FRESH'           // Just started, clean slate
  | 'WARMING_UP'      // First few activities
  | 'FOCUSED'         // In the groove
  | 'FATIGUED'        // Been at it a while
  | 'TILTED';         // Emotional state compromised

export type FlowState = 
  | 'NONE'            // No flow detected
  | 'BUILDING'        // Starting to get into it
  | 'IN_FLOW'         // Peak performance state
  | 'DISRUPTED';      // Flow was broken

// ============================================
// BEHAVIORAL EVENT TRACKING
// Every meaningful action the user takes
// ============================================

export type EventType =
  | 'SESSION_START'
  | 'SESSION_END'
  | 'GAME_START'
  | 'GAME_END'
  | 'MOVE_MADE'
  | 'PUZZLE_START'
  | 'PUZZLE_ATTEMPT'
  | 'PUZZLE_COMPLETE'
  | 'PUZZLE_FAILED'
  | 'TRAINING_START'
  | 'TRAINING_COMPLETE'
  | 'MEDITATION_START'
  | 'MEDITATION_COMPLETE'
  | 'BREATHING_EXERCISE'
  | 'TILT_DETECTED'
  | 'TILT_RESOLVED'
  | 'REFLECTION_SUBMITTED'
  | 'CALM_PLAY_START'
  | 'CALM_PLAY_END'
  | 'PATTERN_LEARNED'
  | 'PATTERN_REVIEWED'
  | 'PATTERN_PRACTICE_START'
  | 'PATTERN_COMPLETE'
  | 'MISTAKE_RECORDED'
  | 'LESSON_VIEWED';

export interface EventContext {
  timeOfDay: TimeOfDay;
  dayOfWeek: number;                  // 0 = Sunday, 6 = Saturday
  sessionDurationMinutes: number;     // Minutes since session start
  gamesPlayedToday: number;
  puzzlesSolvedToday: number;
  currentStreak: number;              // Day streak
  lastActivityMinutesAgo: number;
  recentTiltLevel: TiltLevel;
  isFirstActivityOfDay: boolean;
}

export interface BehavioralEvent {
  id: string;
  timestamp: number;
  type: EventType;
  context: EventContext;
  metadata: Record<string, unknown>;
}

// ============================================
// ENHANCED GAME METRICS
// Rich data from each game played
// ============================================

export type GameResult = 'WIN' | 'LOSS' | 'DRAW' | 'ABANDONED';

export interface MoveTimingData {
  averageMoveTime: number;          // Milliseconds
  fastMoves: number;                // Under 3 seconds
  mediumMoves: number;              // 3-30 seconds
  slowMoves: number;                // 30-60 seconds
  veryFastMoves: number;            // Under 1 second (potential impulsive)
  verySlowMoves: number;            // Over 60 seconds (long thinks)
  moveTimeVariance: number;         // Standard deviation
  moveTimeTrend: 'SPEEDING_UP' | 'SLOWING_DOWN' | 'CONSISTENT';
}

export interface AccuracyData {
  overall: number;
  opening: number;                  // First 10 moves
  middlegame: number;               // Moves 11-30
  endgame: number;                  // Moves 31+
  firstHalf: number;                // First half of game
  secondHalf: number;               // Second half (fatigue indicator)
}

export interface EmotionalSignals {
  blundersAfterBlunders: number;    // Cascade mistakes (tilt indicator)
  accuracyDropoff: number;          // Difference between first/second half
  resignedEarly: boolean;           // Gave up before mate/clear loss
  timeScramble: boolean;            // Ran very low on time
  longPauseBeforeResign: boolean;   // Hesitation before giving up
  rapidFireMoves: number;           // Sequences of very fast moves
}

export interface GameContextData {
  wasAfterLoss: boolean;
  wasAfterWin: boolean;
  wasAfterDraw: boolean;
  wasFirstGameOfDay: boolean;
  minutesSinceLastGame: number;
  gameNumberInSession: number;
  gameNumberToday: number;
  opponentType: 'ENGINE' | 'HUMAN' | 'PUZZLE';
}

export interface EnhancedGameMetrics {
  id: string;
  timestamp: number;
  
  // Time context
  timeOfDay: TimeOfDay;
  dayOfWeek: number;
  
  // Result
  result: GameResult;
  totalMoves: number;
  durationMinutes: number;
  
  // Performance data
  accuracy: AccuracyData;
  timing: MoveTimingData;
  emotionalSignals: EmotionalSignals;
  context: GameContextData;
  
  // Key moments
  biggestBlunder?: {
    moveNumber: number;
    evalDrop: number;
    phase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  };
  
  // Patterns detected
  tacticalMisses: string[];         // Patterns we missed
  positionalErrors: string[];       // Positional themes we got wrong
}

// ============================================
// PLAYER EMOTIONAL PROFILE
// Long-term patterns about the player
// ============================================

export interface TimePerformanceProfile {
  bestTimeOfDay: TimeOfDay;
  worstTimeOfDay: TimeOfDay;
  bestDayOfWeek: number;
  worstDayOfWeek: number;
  performanceByTime: Record<TimeOfDay, {
    gamesPlayed: number;
    averageAccuracy: number;
    winRate: number;
  }>;
}

export interface TiltProfile {
  postLossAccuracyDrop: number;     // Percentage drop after a loss
  postWinAccuracyChange: number;    // Change after a win (could be overconfidence)
  tiltRecoveryGames: number;        // Games needed to return to baseline
  consecutiveLossThreshold: number; // Losses before tilt typically sets in
  commonTiltTriggers: TiltTrigger[];
}

export interface TiltTrigger {
  trigger: string;                  // "Missed tactic", "Time pressure", etc.
  frequency: number;                // How often this triggers tilt
  averageSeverity: number;          // 1-10 scale
  averageRecoveryMinutes: number;
}

export interface SessionProfile {
  optimalSessionLengthMinutes: number;
  warmupGames: number;              // Games to reach peak performance
  fatigueThresholdGames: number;    // Games before noticeable decline
  fatigueAccuracyDrop: number;      // How much accuracy drops with fatigue
  breakBenefitMinutes: number;      // Optimal break length
}

export interface FlowIndicator {
  indicator: string;                // "3+ wins", "Consistent move times", etc.
  correlationStrength: number;      // How strongly this predicts good performance
  frequency: number;                // How often we see this
}

export interface StrengthWeaknessProfile {
  strongestPhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  weakestPhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  strongestPatterns: string[];
  weakestPatterns: string[];
  improvingAreas: string[];
  decliningAreas: string[];
}

export interface EmotionalProfile {
  // Time-based patterns
  timeProfile: TimePerformanceProfile;
  
  // Emotional resilience
  tiltProfile: TiltProfile;
  
  // Session patterns
  sessionProfile: SessionProfile;
  
  // Flow state patterns
  flowIndicators: FlowIndicator[];
  
  // Chess-specific strengths/weaknesses
  chessProfile: StrengthWeaknessProfile;
  
  // Meta
  lastUpdated: number;
  dataPoints: number;               // Games analyzed to build this profile
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';  // Based on data points
}

// ============================================
// COACH RECOMMENDATIONS
// Personalized suggestions from the AI coach
// ============================================

export type RecommendationType =
  | 'TRAINING_FOCUS'        // "Work on rook endgames today"
  | 'TIMING_SUGGESTION'     // "You play best in the morning"
  | 'TILT_PREVENTION'       // "Consider taking a break"
  | 'TILT_INTERVENTION'     // "I notice you might be tilting"
  | 'STREAK_ENCOURAGEMENT'  // "Keep the momentum going!"
  | 'WEAKNESS_ALERT'        // "Pattern recognition declining"
  | 'MILESTONE'             // "You've mastered 50 patterns!"
  | 'MINDFULNESS_NUDGE'     // "Start with breathing today"
  | 'RECOVERY_PLAN'         // "After yesterday's tough session..."
  | 'INSIGHT'               // "Interesting: you never blunder knights"
  | 'CHALLENGE'             // "Ready for the next level?"
  | 'SESSION_OPTIMAL'       // "Great time to play!"
  | 'SESSION_WARNING'       // "Consider stopping soon"
  | 'WARMUP_SUGGESTION'     // "Start with some easy puzzles"
  | 'FLOW_STATE'            // "You're in the zone!"
  | 'PATTERN_DUE';          // "5 patterns need review"

export type ActionType =
  | 'START_TRAINING'
  | 'START_PUZZLE'
  | 'START_PUZZLES'
  | 'START_MEDITATION'
  | 'START_BREATHING'
  | 'START_CALM_PLAY'
  | 'START_GAME'
  | 'START_PATTERN_REVIEW'
  | 'START_SPARRING'
  | 'REVIEW_MISTAKES'
  | 'REVIEW_PATTERNS'
  | 'PLAY_GAME'
  | 'TAKE_BREAK'
  | 'VIEW_STATS'
  | 'VIEW_MISTAKES'
  | 'VIEW_OPENINGS'
  | 'VIEW_PROGRESS'
  | 'VIEW_NOTES'
  | 'VIEW_STUDY_PLAN'
  | 'SET_INTENTION'
  | 'VIEW_INSIGHT'
  | 'NONE';

export type RecommendationPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface CoachRecommendation {
  id: string;
  timestamp: number;
  
  // Content
  type: RecommendationType;
  priority: RecommendationPriority;
  title: string;
  message: string;
  reasoning: string;              // Why the coach is suggesting this
  
  // Action
  actionType: ActionType;
  actionData?: Record<string, unknown>;
  actionLabel?: string;           // Button text
  
  // Lifecycle
  expiresAt?: number;             // Time-sensitive recommendations
  dismissedAt?: number;
  actedOnAt?: number;
  
  // Tracking
  wasHelpful?: boolean;           // User feedback
}

// ============================================
// COACH STATE
// Current state of the AI coach
// ============================================

export interface CoachState {
  // Current session awareness
  sessionStartTime: number;
  lastActivityTime: number;
  currentMood: SessionMood;
  currentFlow: FlowState;
  
  // Real-time metrics
  gamesThisSession: number;
  winsThisSession: number;
  lossesThisSession: number;
  puzzlesThisSession: number;
  meditationMinutesThisSession: number;
  
  // Active recommendations
  activeRecommendations: CoachRecommendation[];
  dismissedRecommendationIds: string[];
  lastRecommendationTime: number;
  
  // Historical data (rolling window)
  recentEvents: BehavioralEvent[];        // Last 200 events
  recentGames: EnhancedGameMetrics[];     // Last 100 games
  
  // Player profile
  emotionalProfile: EmotionalProfile;
  
  // ADVANCED FEATURES
  // Learning velocity tracking
  learningVelocity: LearningVelocity;
  
  // Chess personality profile
  chessPersonality: ChessPersonality;
  
  // Goals and achievements
  activeGoals: PlayerGoal[];
  completedGoals: PlayerGoal[];
  achievements: Achievement[];
  achievementProgress: AchievementProgress;
  
  // Coach meta
  totalInteractions: number;
  helpfulRecommendations: number;
  lastProfileUpdate: number;
}

// ============================================
// COACH INSIGHTS
// Deep analytical insights about the player
// ============================================

export interface CoachInsight {
  id: string;
  category: 'PERFORMANCE' | 'EMOTIONAL' | 'TACTICAL' | 'TIMING' | 'PROGRESS';
  title: string;
  description: string;
  dataPoints: number;             // How much data supports this
  confidence: number;             // 0-100%
  trend?: 'IMPROVING' | 'STABLE' | 'DECLINING';
  actionable: boolean;
  suggestedAction?: string;
  discoveredAt: number;
}

// ============================================
// LEARNING VELOCITY
// Track improvement speed across different areas
// ============================================

export interface LearningVelocity {
  // Overall metrics
  overallTrend: 'ACCELERATING' | 'STEADY' | 'PLATEAUING' | 'DECLINING';
  weeklyImprovementRate: number;     // Percentage change
  
  // Per-area velocity
  tacticsVelocity: VelocityMetric;
  accuracyVelocity: VelocityMetric;
  timeManagementVelocity: VelocityMetric;
  tiltControlVelocity: VelocityMetric;
  
  // Breakthrough tracking
  lastBreakthrough?: {
    area: string;
    date: number;
    description: string;
  };
  
  // Plateau detection
  currentPlateau?: {
    area: string;
    startedAt: number;
    durationDays: number;
    suggestedIntervention: string;
  };
}

export interface VelocityMetric {
  trend: 'UP' | 'FLAT' | 'DOWN';
  changePercent: number;
  dataPoints: number;
  confidence: number;  // 0-100
}

// ============================================
// CHESS PERSONALITY
// Profile the player's chess style
// ============================================

export type ChessPersonalityTrait = 
  | 'AGGRESSIVE'
  | 'DEFENSIVE' 
  | 'TACTICAL'
  | 'POSITIONAL'
  | 'RISK_TAKER'
  | 'SOLID'
  | 'INTUITIVE'
  | 'CALCULATING'
  | 'RAPID_PLAYER'
  | 'SLOW_PLAYER';

export interface ChessPersonality {
  // Primary traits (highest two)
  primaryTraits: ChessPersonalityTrait[];
  
  // Trait scores (0-100)
  traitScores: Record<ChessPersonalityTrait, number>;
  
  // Style analysis
  preferredTimeOfDay: TimeOfDay;
  optimalSessionLength: number;      // Minutes
  bestGamePhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  weakestGamePhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  
  // Emotional patterns
  tiltProneness: 'LOW' | 'MEDIUM' | 'HIGH';
  recoverySpeed: 'FAST' | 'MEDIUM' | 'SLOW';
  flowStateAbility: 'EASY' | 'MODERATE' | 'DIFFICULT';
  
  // Preference detection
  prefersPuzzles: boolean;
  prefersGames: boolean;
  prefersMindfulness: boolean;
  
  // Confidence in analysis
  profileConfidence: number;         // 0-100
  lastUpdated: number;
}

// ============================================
// GOAL SYSTEM
// Player goals with tracking
// ============================================

export type GoalTimeframe = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
export type GoalCategory = 
  | 'PUZZLES'
  | 'GAMES'
  | 'ACCURACY'
  | 'STREAK'
  | 'MINDFULNESS'
  | 'PATTERN_MASTERY'
  | 'TILT_CONTROL'
  | 'CUSTOM';

export interface PlayerGoal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  timeframe: GoalTimeframe;
  
  // Target
  targetValue: number;
  currentValue: number;
  unit: string;                      // "puzzles", "games", "%", "minutes", etc.
  
  // Timeline
  createdAt: number;
  deadline?: number;
  completedAt?: number;
  
  // Status
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'ABANDONED';
  
  // Progress tracking
  progressHistory: {
    date: number;
    value: number;
  }[];
  
  // AI-suggested adjustments
  suggestedAdjustment?: {
    newTarget: number;
    reason: string;
  };
}

// ============================================
// ACHIEVEMENT SYSTEM
// Milestones and celebrations
// ============================================

export type AchievementRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;                      // Emoji
  rarity: AchievementRarity;
  
  // Unlock criteria
  criteria: {
    type: string;
    value: number;
    comparison: 'gte' | 'lte' | 'eq';
  };
  
  // Status
  unlockedAt?: number;
  progress?: number;                 // 0-100 for tracking
  
  // Celebration
  celebrationMessage: string;
  xpReward: number;
}

export interface AchievementProgress {
  totalUnlocked: number;
  totalAvailable: number;
  recentUnlocks: Achievement[];      // Last 5
  nextAchievement?: Achievement;     // Closest to unlock
  
  // Stats
  commonUnlocked: number;
  uncommonUnlocked: number;
  rareUnlocked: number;
  epicUnlocked: number;
  legendaryUnlocked: number;
}

// ============================================
// SMART SESSION PLANNING
// Intelligent session recommendations
// ============================================

export interface SmartSessionPlan {
  // Available time detection
  estimatedAvailableMinutes: number;
  
  // Recommended activities
  activities: SessionActivity[];
  
  // Energy management
  currentEnergyLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestedIntensity: 'INTENSE' | 'MODERATE' | 'LIGHT';
  
  // Break recommendations
  suggestedBreaks: {
    afterMinutes: number;
    duration: number;
    type: 'SHORT_REST' | 'STRETCH' | 'BREATHING' | 'WALK';
  }[];
  
  // Session goals
  sessionGoals: {
    description: string;
    achievable: boolean;
    confidence: number;
  }[];
  
  // Warnings
  warnings: string[];
}

export interface SessionActivity {
  type: ActionType;
  suggestedDuration: number;         // Minutes
  priority: 'PRIMARY' | 'SECONDARY' | 'OPTIONAL';
  reason: string;
  energyCost: 'HIGH' | 'MEDIUM' | 'LOW';
}

// ============================================
// DAILY COACHING PLAN
// Structured plan for the day
// ============================================

export interface DailyCoachingPlan {
  date: string;                   // YYYY-MM-DD
  
  // Personalized greeting
  greeting: string;
  
  // Today's focus
  primaryFocus: {
    area: string;
    reason: string;
    activities: ActionType[];
  };
  
  // Suggested schedule
  suggestedActivities: {
    activity: ActionType;
    duration: number;             // Minutes
    reason: string;
  }[];
  
  // Warnings/considerations
  considerations: string[];
  
  // Goals for the day
  goals: {
    description: string;
    metric: string;
    target: number;
  }[];
  
  // Based on
  basedOn: string[];              // What data informed this plan
}

// ============================================
// UTILITY TYPES
// ============================================

export interface CoachConfig {
  // Recommendation frequency
  minTimeBetweenRecommendations: number;  // Minutes
  maxActiveRecommendations: number;
  
  // Thresholds
  tiltDetectionSensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  fatigueWarningThreshold: number;        // Minutes
  
  // Preferences
  enableMindfulnessNudges: boolean;
  enableTiltInterventions: boolean;
  enableSessionWarnings: boolean;
  
  // Data retention
  maxEventsToKeep: number;
  maxGamesToKeep: number;
}

export const DEFAULT_COACH_CONFIG: CoachConfig = {
  minTimeBetweenRecommendations: 5,
  maxActiveRecommendations: 3,
  tiltDetectionSensitivity: 'MEDIUM',
  fatigueWarningThreshold: 60,
  enableMindfulnessNudges: true,
  enableTiltInterventions: true,
  enableSessionWarnings: true,
  maxEventsToKeep: 200,
  maxGamesToKeep: 100,
};

// ============================================
// HELPER FUNCTIONS FOR TYPES
// ============================================

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 8) return 'EARLY_MORNING';
  if (hour >= 8 && hour < 12) return 'MORNING';
  if (hour >= 12 && hour < 17) return 'AFTERNOON';
  if (hour >= 17 && hour < 21) return 'EVENING';
  if (hour >= 21 && hour < 24) return 'NIGHT';
  return 'LATE_NIGHT';
}

export function formatTimeOfDay(time: TimeOfDay): string {
  const map: Record<TimeOfDay, string> = {
    'EARLY_MORNING': 'early morning (5-8am)',
    'MORNING': 'morning (8am-12pm)',
    'AFTERNOON': 'afternoon (12-5pm)',
    'EVENING': 'evening (5-9pm)',
    'NIGHT': 'night (9pm-12am)',
    'LATE_NIGHT': 'late night (12-5am)',
  };
  return map[time];
}

export function createEmptyProfile(): EmotionalProfile {
  return {
    timeProfile: {
      bestTimeOfDay: 'MORNING',
      worstTimeOfDay: 'LATE_NIGHT',
      bestDayOfWeek: 6,
      worstDayOfWeek: 1,
      performanceByTime: {
        EARLY_MORNING: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
        MORNING: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
        AFTERNOON: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
        EVENING: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
        NIGHT: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
        LATE_NIGHT: { gamesPlayed: 0, averageAccuracy: 0, winRate: 0 },
      },
    },
    tiltProfile: {
      postLossAccuracyDrop: 0,
      postWinAccuracyChange: 0,
      tiltRecoveryGames: 3,
      consecutiveLossThreshold: 3,
      commonTiltTriggers: [],
    },
    sessionProfile: {
      optimalSessionLengthMinutes: 45,
      warmupGames: 1,
      fatigueThresholdGames: 8,
      fatigueAccuracyDrop: 5,
      breakBenefitMinutes: 15,
    },
    flowIndicators: [],
    chessProfile: {
      strongestPhase: 'MIDDLEGAME',
      weakestPhase: 'ENDGAME',
      strongestPatterns: [],
      weakestPatterns: [],
      improvingAreas: [],
      decliningAreas: [],
    },
    lastUpdated: Date.now(),
    dataPoints: 0,
    confidence: 'LOW',
  };
}

export function createInitialCoachState(): CoachState {
  return {
    // Session awareness
    sessionStartTime: Date.now(),
    lastActivityTime: Date.now(),
    currentMood: 'FRESH',
    currentFlow: 'NONE',
    
    // Real-time metrics
    gamesThisSession: 0,
    winsThisSession: 0,
    lossesThisSession: 0,
    puzzlesThisSession: 0,
    meditationMinutesThisSession: 0,
    
    // Recommendations
    activeRecommendations: [],
    dismissedRecommendationIds: [],
    lastRecommendationTime: 0,
    
    // Historical data
    recentEvents: [],
    recentGames: [],
    
    // Profile
    emotionalProfile: createEmptyProfile(),
    
    // Learning velocity
    learningVelocity: createInitialLearningVelocity(),
    
    // Chess personality
    chessPersonality: createInitialChessPersonality(),
    
    // Goals and achievements
    activeGoals: [],
    completedGoals: [],
    achievements: [],
    achievementProgress: createInitialAchievementProgress(),
    
    // Meta
    totalInteractions: 0,
    helpfulRecommendations: 0,
    lastProfileUpdate: 0,
  };
}

// ============================================
// LEARNING VELOCITY FACTORY
// ============================================

export function createInitialLearningVelocity(): LearningVelocity {
  const defaultMetric: VelocityMetric = {
    trend: 'FLAT',
    changePercent: 0,
    dataPoints: 0,
    confidence: 0,
  };
  
  return {
    overallTrend: 'STEADY',
    weeklyImprovementRate: 0,
    tacticsVelocity: { ...defaultMetric },
    accuracyVelocity: { ...defaultMetric },
    timeManagementVelocity: { ...defaultMetric },
    tiltControlVelocity: { ...defaultMetric },
  };
}

// ============================================
// CHESS PERSONALITY FACTORY
// ============================================

export function createInitialChessPersonality(): ChessPersonality {
  const defaultScores: Record<ChessPersonalityTrait, number> = {
    AGGRESSIVE: 50,
    DEFENSIVE: 50,
    TACTICAL: 50,
    POSITIONAL: 50,
    RISK_TAKER: 50,
    SOLID: 50,
    INTUITIVE: 50,
    CALCULATING: 50,
    RAPID_PLAYER: 50,
    SLOW_PLAYER: 50,
  };
  
  return {
    primaryTraits: [],
    traitScores: defaultScores,
    preferredTimeOfDay: 'EVENING',
    optimalSessionLength: 30,
    bestGamePhase: 'MIDDLEGAME',
    weakestGamePhase: 'ENDGAME',
    tiltProneness: 'MEDIUM',
    recoverySpeed: 'MEDIUM',
    flowStateAbility: 'MODERATE',
    prefersPuzzles: true,
    prefersGames: true,
    prefersMindfulness: false,
    profileConfidence: 0,
    lastUpdated: Date.now(),
  };
}

// ============================================
// ACHIEVEMENT PROGRESS FACTORY
// ============================================

export function createInitialAchievementProgress(): AchievementProgress {
  return {
    totalUnlocked: 0,
    totalAvailable: 0,
    recentUnlocks: [],
    commonUnlocked: 0,
    uncommonUnlocked: 0,
    rareUnlocked: 0,
    epicUnlocked: 0,
    legendaryUnlocked: 0,
  };
}

// ============================================
// DEFAULT ACHIEVEMENTS
// ============================================

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  // Puzzle achievements
  { id: 'puzzle_10', title: 'Puzzle Beginner', description: 'Solve 10 puzzles', icon: '🧩', rarity: 'COMMON', criteria: { type: 'puzzles_solved', value: 10, comparison: 'gte' }, celebrationMessage: 'Your tactical eye is awakening!', xpReward: 50 },
  { id: 'puzzle_100', title: 'Puzzle Enthusiast', description: 'Solve 100 puzzles', icon: '🎯', rarity: 'UNCOMMON', criteria: { type: 'puzzles_solved', value: 100, comparison: 'gte' }, celebrationMessage: 'Patterns are becoming second nature!', xpReward: 200 },
  { id: 'puzzle_500', title: 'Puzzle Master', description: 'Solve 500 puzzles', icon: '👁️', rarity: 'RARE', criteria: { type: 'puzzles_solved', value: 500, comparison: 'gte' }, celebrationMessage: 'Your vision pierces through complexity!', xpReward: 500 },
  { id: 'puzzle_1000', title: 'Puzzle Legend', description: 'Solve 1000 puzzles', icon: '🏆', rarity: 'EPIC', criteria: { type: 'puzzles_solved', value: 1000, comparison: 'gte' }, celebrationMessage: 'A tactical virtuoso emerges!', xpReward: 1000 },
  
  // Game achievements
  { id: 'game_first', title: 'First Steps', description: 'Complete your first game', icon: '♟️', rarity: 'COMMON', criteria: { type: 'games_played', value: 1, comparison: 'gte' }, celebrationMessage: 'The journey of a thousand games begins!', xpReward: 25 },
  { id: 'game_10', title: 'Game Player', description: 'Play 10 games', icon: '🎮', rarity: 'COMMON', criteria: { type: 'games_played', value: 10, comparison: 'gte' }, celebrationMessage: 'Experience is your teacher!', xpReward: 75 },
  { id: 'win_streak_3', title: 'Hot Streak', description: 'Win 3 games in a row', icon: '🔥', rarity: 'UNCOMMON', criteria: { type: 'win_streak', value: 3, comparison: 'gte' }, celebrationMessage: 'You\'re on fire!', xpReward: 150 },
  { id: 'win_streak_7', title: 'Unstoppable', description: 'Win 7 games in a row', icon: '⚡', rarity: 'RARE', criteria: { type: 'win_streak', value: 7, comparison: 'gte' }, celebrationMessage: 'Nothing can stop you now!', xpReward: 400 },
  
  // Streak achievements
  { id: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '📆', rarity: 'UNCOMMON', criteria: { type: 'day_streak', value: 7, comparison: 'gte' }, celebrationMessage: 'Consistency breeds excellence!', xpReward: 200 },
  { id: 'streak_30', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🗓️', rarity: 'RARE', criteria: { type: 'day_streak', value: 30, comparison: 'gte' }, celebrationMessage: 'Discipline defines the champion!', xpReward: 500 },
  { id: 'streak_100', title: 'Century Club', description: 'Maintain a 100-day streak', icon: '💯', rarity: 'EPIC', criteria: { type: 'day_streak', value: 100, comparison: 'gte' }, celebrationMessage: 'Your dedication is legendary!', xpReward: 1500 },
  { id: 'streak_365', title: 'Year of Zen', description: 'Maintain a 365-day streak', icon: '🎊', rarity: 'LEGENDARY', criteria: { type: 'day_streak', value: 365, comparison: 'gte' }, celebrationMessage: 'A year of mastery - you have transcended!', xpReward: 5000 },
  
  // Mindfulness achievements
  { id: 'meditate_first', title: 'Inner Peace', description: 'Complete your first meditation', icon: '🧘', rarity: 'COMMON', criteria: { type: 'meditations', value: 1, comparison: 'gte' }, celebrationMessage: 'Stillness brings clarity!', xpReward: 50 },
  { id: 'meditate_10', title: 'Mind Explorer', description: 'Complete 10 meditations', icon: '🌊', rarity: 'UNCOMMON', criteria: { type: 'meditations', value: 10, comparison: 'gte' }, celebrationMessage: 'Your mind grows calmer!', xpReward: 150 },
  { id: 'calm_play_5', title: 'Calm Player', description: 'Complete 5 Calm Play sessions', icon: '☯️', rarity: 'UNCOMMON', criteria: { type: 'calm_play_sessions', value: 5, comparison: 'gte' }, celebrationMessage: 'Balance between thought and feeling!', xpReward: 175 },
  
  // Accuracy achievements
  { id: 'accuracy_85', title: 'Sharp Eye', description: 'Achieve 85% accuracy in a game', icon: '🎯', rarity: 'UNCOMMON', criteria: { type: 'game_accuracy', value: 85, comparison: 'gte' }, celebrationMessage: 'Precision defines your play!', xpReward: 200 },
  { id: 'accuracy_95', title: 'Near Perfect', description: 'Achieve 95% accuracy in a game', icon: '💎', rarity: 'RARE', criteria: { type: 'game_accuracy', value: 95, comparison: 'gte' }, celebrationMessage: 'Approaching perfection!', xpReward: 400 },
  { id: 'accuracy_100', title: 'Perfect Game', description: 'Achieve 100% accuracy', icon: '👑', rarity: 'LEGENDARY', criteria: { type: 'game_accuracy', value: 100, comparison: 'gte' }, celebrationMessage: 'Absolute mastery achieved!', xpReward: 2000 },
  
  // Tilt control achievements
  { id: 'no_tilt_session', title: 'Zen Mind', description: 'Complete a session without tilt', icon: '🧠', rarity: 'COMMON', criteria: { type: 'tilt_free_sessions', value: 1, comparison: 'gte' }, celebrationMessage: 'Emotional mastery begins!', xpReward: 75 },
  { id: 'tilt_recovery', title: 'Bounce Back', description: 'Win after experiencing tilt', icon: '🔄', rarity: 'UNCOMMON', criteria: { type: 'tilt_recoveries', value: 1, comparison: 'gte' }, celebrationMessage: 'From chaos to clarity!', xpReward: 150 },
];

// ============================================
// GAME METRICS FACTORY
// Helper to create EnhancedGameMetrics from raw data
// ============================================

export function createGameMetrics(params: {
  result: GameResult;
  totalMoves: number;
  durationMinutes: number;
  accuracy: AccuracyData;
  timing: MoveTimingData;
  previousGame?: EnhancedGameMetrics;
  gamesPlayedToday?: number;
  gameNumberInSession?: number;
}): EnhancedGameMetrics {
  const now = Date.now();
  const previousGame = params.previousGame;
  
  return {
    id: `game_${now}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: now,
    timeOfDay: getTimeOfDay(),
    dayOfWeek: new Date().getDay(),
    result: params.result,
    totalMoves: params.totalMoves,
    durationMinutes: params.durationMinutes,
    accuracy: params.accuracy,
    timing: params.timing,
    emotionalSignals: {
      blundersAfterBlunders: 0, // Would be calculated from move analysis
      accuracyDropoff: params.accuracy.firstHalf - params.accuracy.secondHalf,
      resignedEarly: false,
      timeScramble: false,
      longPauseBeforeResign: false,
      rapidFireMoves: params.timing.veryFastMoves,
    },
    context: {
      wasAfterLoss: previousGame?.result === 'LOSS',
      wasAfterWin: previousGame?.result === 'WIN',
      wasAfterDraw: previousGame?.result === 'DRAW',
      wasFirstGameOfDay: (params.gamesPlayedToday ?? 0) === 0,
      minutesSinceLastGame: previousGame 
        ? (now - previousGame.timestamp) / 60000 
        : 0,
      gameNumberInSession: params.gameNumberInSession ?? 1,
      gameNumberToday: (params.gamesPlayedToday ?? 0) + 1,
      opponentType: 'ENGINE',
    },
    tacticalMisses: [],
    positionalErrors: [],
  };
}

// ============================================
// SIMPLE GAME METRICS FACTORY
// Create game metrics from simple inputs (for easy integration)
// ============================================

export function createSimpleGameMetrics(params: {
  result: 'win' | 'loss' | 'draw' | 'abandoned';
  duration: number;          // milliseconds
  moveCount: number;
  accuracy?: number;         // 0-100
  blunders?: number;
  mistakes?: number;
  averageMoveTime?: number;  // milliseconds
  timeScramble?: boolean;
  openingName?: string;
  wasResigned?: boolean;
  wasFlagged?: boolean;
}): EnhancedGameMetrics {
  const now = Date.now();
  const durationMinutes = params.duration / 60000;
  
  // Convert simple result to GameResult
  const resultMap: Record<string, GameResult> = {
    win: 'WIN',
    loss: 'LOSS',
    draw: 'DRAW',
    abandoned: 'ABANDONED',
  };
  const result = resultMap[params.result];
  
  // Build accuracy data from simple accuracy
  const simpleAccuracy = params.accuracy ?? 50;
  const accuracy: AccuracyData = {
    overall: simpleAccuracy,
    opening: Math.min(100, simpleAccuracy + 10),
    middlegame: simpleAccuracy,
    endgame: Math.max(0, simpleAccuracy - 5),
    firstHalf: Math.min(100, simpleAccuracy + 5),
    secondHalf: Math.max(0, simpleAccuracy - 5),
  };
  
  // Build timing data from simple inputs
  const avgMoveTime = params.averageMoveTime ?? 5000;
  const fastMoves = avgMoveTime < 3000 ? Math.floor(params.moveCount * 0.3) : 0;
  const timing: MoveTimingData = {
    averageMoveTime: avgMoveTime,
    fastMoves: Math.floor(params.moveCount * 0.2),
    mediumMoves: Math.floor(params.moveCount * 0.5),
    slowMoves: Math.floor(params.moveCount * 0.3),
    veryFastMoves: fastMoves,
    verySlowMoves: 0,
    moveTimeVariance: avgMoveTime * 0.5,
    moveTimeTrend: 'CONSISTENT',
  };
  
  return {
    id: `game_${now}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: now,
    timeOfDay: getTimeOfDay(),
    dayOfWeek: new Date().getDay(),
    result,
    totalMoves: params.moveCount,
    durationMinutes,
    accuracy,
    timing,
    emotionalSignals: {
      blundersAfterBlunders: params.blunders && params.blunders > 1 ? params.blunders - 1 : 0,
      accuracyDropoff: 5,
      resignedEarly: params.wasResigned ?? false,
      timeScramble: params.timeScramble ?? false,
      longPauseBeforeResign: false,
      rapidFireMoves: fastMoves,
    },
    context: {
      wasAfterLoss: false,
      wasAfterWin: false,
      wasAfterDraw: false,
      wasFirstGameOfDay: false,
      minutesSinceLastGame: 0,
      gameNumberInSession: 1,
      gameNumberToday: 1,
      opponentType: 'ENGINE',
    },
    tacticalMisses: [],
    positionalErrors: [],
  };
}

