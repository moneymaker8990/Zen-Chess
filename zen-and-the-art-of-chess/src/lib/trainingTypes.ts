// ============================================
// ADVANCED TRAINING SYSTEM TYPES
// The "Renaissance Periodization" of Chess
// ============================================

// ============================================
// MISTAKE LIBRARY
// ============================================

export interface MistakeEntry {
  id: string;
  timestamp: number;
  gameId: string;
  
  // Position
  fen: string;
  moveNumber: number;
  playerColor: 'white' | 'black';
  
  // The mistake
  playedMove: string;
  bestMove: string;
  evaluation: number;      // Eval before
  evalAfter: number;       // Eval after blunder
  evalDrop: number;        // How much was lost
  
  // Classification
  mistakeType: MistakeType;
  tacticalTheme?: TacticalPattern;
  positionalTheme?: PositionalPattern;
  
  // Root cause analysis
  rootCause: RootCause;
  timeSpentSeconds?: number;
  timeRemaining?: number;
  
  // Learning
  explanation?: string;    // Why it was wrong
  lesson?: string;         // What to learn
  drillCreated?: boolean;
  timesReviewed: number;
  lastReviewed?: number;
  
  // Improvement tracking
  retested: boolean;
  retestedCorrect?: boolean;
}

export type MistakeType = 
  | 'BLUNDER'      // Loses significant material or game
  | 'MISTAKE'      // Loses advantage
  | 'INACCURACY'   // Suboptimal but not losing
  | 'MISSED_WIN'   // Failed to find winning move
  | 'MISSED_TACTIC' // Missed tactical opportunity
  | 'POSITIONAL'   // Positional misjudgment
  | 'TIME_TROUBLE' // Mistake under time pressure
  | 'MOUSE_SLIP';  // Intended different move

export type TacticalPattern =
  | 'FORK'
  | 'PIN'
  | 'SKEWER'
  | 'DISCOVERY'
  | 'DOUBLE_ATTACK'
  | 'BACK_RANK'
  | 'DEFLECTION'
  | 'DECOY'
  | 'OVERLOADING'
  | 'INTERFERENCE'
  | 'CLEARANCE'
  | 'ZWISCHENZUG'
  | 'TRAPPED_PIECE'
  | 'MATE_PATTERN'
  | 'REMOVE_DEFENDER'
  | 'X_RAY'
  | 'WINDMILL';

export type PositionalPattern =
  | 'WEAK_SQUARE'
  | 'OUTPOST'
  | 'PAWN_STRUCTURE'
  | 'PIECE_ACTIVITY'
  | 'KING_SAFETY'
  | 'SPACE'
  | 'BAD_BISHOP'
  | 'OPEN_FILE'
  | 'PASSED_PAWN'
  | 'BLOCKADE'
  | 'PROPHYLAXIS'
  | 'OVEREXTENSION';

export type RootCause =
  | 'CALCULATION'      // Didn't calculate deep enough
  | 'PATTERN_BLIND'    // Didn't see the pattern
  | 'TUNNEL_VISION'    // Focused on wrong part of board
  | 'TIME_PRESSURE'    // Rushed due to clock
  | 'IMPATIENCE'       // Moved too fast (not time related)
  | 'FATIGUE'          // Mental exhaustion
  | 'TILT'             // Emotional decision
  | 'KNOWLEDGE_GAP'    // Didn't know the idea
  | 'OVERCONFIDENCE'   // Assumed position was winning
  | 'FEAR'             // Played safe when attack was needed
  | 'COMPLEXITY'       // Position too complicated
  | 'OPPONENT_PRESSURE'; // Opponent's good play

// ============================================
// PATTERN RECOGNITION TRACKING
// ============================================

export interface PatternAttempt {
  id: string;
  timestamp: number;
  patternType: TacticalPattern;
  fen: string;
  
  // Performance
  solved: boolean;
  timeToSolve: number;  // milliseconds
  
  // Classification
  difficulty: 1 | 2 | 3 | 4 | 5;
  wasInstinctive: boolean;  // Solved in < 3 seconds
  wasCalculated: boolean;   // Took > 30 seconds
  
  // If failed
  playerMove?: string;
  correctMove?: string;
}

export interface PatternProfile {
  patternType: TacticalPattern;
  totalAttempts: number;
  successRate: number;
  averageTime: number;      // ms
  instinctiveRate: number;  // % solved < 3 seconds
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  lastAttempt: number;
  needsPractice: boolean;
}

// ============================================
// TIME MANAGEMENT ANALYSIS
// ============================================

export interface MoveTimeData {
  moveNumber: number;
  timeSpent: number;     // seconds
  timeRemaining: number; // seconds
  evaluation: number;
  wasBlunder: boolean;
  positionComplexity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface TimeManagementProfile {
  // Averages
  avgTimePerMove: number;
  avgTimeOpening: number;    // Moves 1-10
  avgTimeMiddlegame: number; // Moves 11-30
  avgTimeEndgame: number;    // Moves 31+
  
  // Patterns
  panicThreshold: number;    // Time remaining when mistakes spike
  rushMoveRate: number;      // % of moves under 5 seconds
  overthinkRate: number;     // % of moves over 2 minutes
  
  // Correlations
  accuracyWhenRushing: number;
  accuracyWhenOverthinking: number;
  blunderRateUnder1Min: number;
  blunderRateUnder30Sec: number;
  
  // Time trouble stats
  gamesWithTimeScramble: number;  // % ending with < 30 seconds
  pointsLostToTime: number;
}

export interface TimePressureSimulation {
  id: string;
  fen: string;
  timeAllowed: number;  // seconds
  difficulty: 1 | 2 | 3 | 4 | 5;
  themes: TacticalPattern[];
}

// ============================================
// OPENING REPERTOIRE
// ============================================

export interface OpeningRepertoire {
  id: string;
  name: string;
  color: 'white' | 'black';
  createdAt: number;
  updatedAt: number;
  
  // Lines
  lines: RepertoireLine[];
  
  // Stats
  totalPositions: number;
  masteredPositions: number;
  gamesPlayed: number;
  winRate: number;
}

export interface RepertoireLine {
  id: string;
  name: string;
  eco: string;
  moves: string[];
  fen: string;  // Final position of line
  
  // Spaced repetition
  lastReviewed: number;
  nextReview: number;
  ease: number;  // 1-5, like Anki
  interval: number;  // days until next review
  repetitions: number;
  
  // Stats from games
  timesPlayed: number;
  timesCorrect: number;
  deviations: OpeningDeviation[];
  
  // Notes
  notes: string;
  keyIdeas: string[];
  typicalPlans: string[];
}

export interface OpeningDeviation {
  moveNumber: number;
  expectedMove: string;
  playedMove: string;
  gameId: string;
  result: 'win' | 'loss' | 'draw';
  wasTheory: boolean;  // Was opponent's move theory or a mistake?
}

export interface OpeningQuiz {
  fen: string;
  correctMove: string;
  lineId: string;
  lineName: string;
  moveNumber: number;
}

// ============================================
// POSITION SPARRING
// ============================================

export interface SparringPosition {
  id: string;
  name: string;
  fen: string;
  playerColor: 'white' | 'black';
  
  // Source
  source: 'GAME' | 'WEAKNESS' | 'ENDGAME' | 'CUSTOM' | 'OPENING';
  sourceGameId?: string;
  weaknessId?: string;
  
  // Training config
  engineStrength: number;  // 0-20
  thinkTime?: number;      // seconds for engine
  
  // Goals
  objective: 'WIN' | 'DRAW' | 'HOLD' | 'ATTACK' | 'DEFEND' | 'CONVERT';
  targetEval?: number;     // e.g., maintain +2
  
  // Stats
  timesPlayed: number;
  timesSucceeded: number;
  lastPlayed: number;
  
  // Notes
  notes: string;
  keyMoves: string[];
}

// ============================================
// COGNITIVE METRICS
// ============================================

export interface GameCognitiveMetrics {
  gameId: string;
  timestamp: number;
  
  // By phase
  openingAccuracy: number;
  middlegameAccuracy: number;
  endgameAccuracy: number;
  
  // Cognitive patterns
  accuracyAfterBlunder: number;  // Next 5 moves after a blunder
  accuracyAfterOpponentSpeed: number;  // When opponent moves fast
  accuracyUnderTimePressure: number;
  
  // Fatigue detection
  move20PlusAccuracy: number;
  move30PlusAccuracy: number;
  accuracyDrop: number;  // First 15 moves vs last 15 moves
  
  // Tilt detection
  mistakeCluster: boolean;  // 3+ mistakes in 10 moves
  clusterStartMove?: number;
}

export interface CognitiveProfile {
  // Time of day patterns
  bestTimeOfDay: string;  // e.g., "10am-12pm"
  worstTimeOfDay: string;
  
  // Game number patterns
  freshGameAccuracy: number;   // First game of session
  fatigueDropoff: number;      // % accuracy drop by game 5+
  
  // Psychological patterns
  postLossAccuracy: number;
  postWinAccuracy: number;
  winStreakMax: number;
  tiltGameCount: number;  // Games with obvious tilt
  
  // Strengths and weaknesses
  strongestPhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  weakestPhase: 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  
  // Calculation
  avgCalculationDepth: number;  // Estimated from puzzle solve times
  blunderAfterLongThink: number;  // % of blunders after >1min think
}

// ============================================
// TRAINING PLAN
// ============================================

export interface TrainingCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  
  // Goals
  primaryGoal: string;
  targetRating?: number;
  weeklyHours: number;
  
  // Schedule
  weeks: WeeklyPlan[];
  
  // Progress
  currentWeek: number;
  completionRate: number;
}

export interface WeeklyPlan {
  weekNumber: number;
  theme: string;
  focus: ('TACTICS' | 'OPENINGS' | 'ENDGAMES' | 'GAMES' | 'ANALYSIS' | 'REST')[];
  
  days: {
    day: string;
    activities: TrainingActivity[];
    completed: boolean;
  }[];
  
  weeklyTest?: {
    positions: string[];
    targetScore: number;
    actualScore?: number;
  };
}

export interface TrainingActivity {
  type: 'PUZZLE' | 'DRILL' | 'GAME' | 'REVIEW' | 'ENDGAME' | 'OPENING' | 'STUDY' | 'SPARRING';
  duration: number;
  description: string;
  targetWeakness?: string;
  completed: boolean;
  performance?: number;  // 0-100
}











