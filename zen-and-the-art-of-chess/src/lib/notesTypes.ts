// ============================================
// MASTER NOTEBOOK - TYPE DEFINITIONS
// Personal chess notes, insights, and study system
// ============================================

// Note categories for organization
export type NoteCategory = 
  | 'OPENING'
  | 'MIDDLEGAME'
  | 'ENDGAME'
  | 'TACTICS'
  | 'STRATEGY'
  | 'PSYCHOLOGY'
  | 'TIME_MANAGEMENT'
  | 'BLUNDER_ANALYSIS'
  | 'PATTERN'
  | 'INSIGHT'
  | 'GAME_REVIEW'
  | 'STUDY_SESSION'
  | 'BOOK_NOTE'
  | 'LESSON'
  | 'REFLECTION';

// Tactical themes for tagging
export type TacticalTheme =
  | 'FORK'
  | 'PIN'
  | 'SKEWER'
  | 'DISCOVERY'
  | 'DOUBLE_CHECK'
  | 'BACK_RANK'
  | 'DEFLECTION'
  | 'DECOY'
  | 'OVERLOADING'
  | 'INTERFERENCE'
  | 'CLEARANCE'
  | 'ZWISCHENZUG'
  | 'QUIET_MOVE'
  | 'SACRIFICE'
  | 'TRAPPED_PIECE'
  | 'MATE_PATTERN';

// Blunder types for weakness analysis
export type BlunderType =
  | 'HUNG_PIECE'
  | 'MISSED_TACTIC'
  | 'CALCULATION_ERROR'
  | 'PATTERN_BLINDNESS'
  | 'TUNNEL_VISION'
  | 'TIME_PRESSURE'
  | 'OPENING_MISTAKE'
  | 'ENDGAME_ERROR'
  | 'POSITIONAL_MISJUDGMENT'
  | 'PREMATURE_ATTACK'
  | 'PASSIVE_PLAY'
  | 'MISSED_DEFENSE'
  | 'MOUSE_SLIP'
  | 'EMOTIONAL_DECISION';

// Psychology/Mental tags
export type MentalTag =
  | 'TILT'
  | 'OVERCONFIDENCE'
  | 'FEAR'
  | 'IMPATIENCE'
  | 'FATIGUE'
  | 'FOCUS_LOSS'
  | 'ANXIETY'
  | 'FRUSTRATION'
  | 'REVENGE_PLAY'
  | 'RESIGNATION_TOO_EARLY'
  | 'TIME_PANIC';

// Position diagram attached to a note
export interface PositionDiagram {
  fen: string;
  arrows?: { from: string; to: string; color?: string }[];
  highlights?: { square: string; color: string }[];
  caption?: string;
}

// A single chess note
export interface ChessNote {
  id: string;
  createdAt: number;
  updatedAt: number;
  
  // Content
  title: string;
  content: string;  // Markdown supported
  
  // Categorization
  category: NoteCategory;
  tags: string[];  // Custom user tags
  tacticalThemes?: TacticalTheme[];
  blunderTypes?: BlunderType[];
  mentalTags?: MentalTag[];
  
  // Chess data
  positions?: PositionDiagram[];
  pgn?: string;
  opening?: string;
  
  // Source tracking
  sourceType?: 'GAME' | 'PUZZLE' | 'STUDY' | 'BOOK' | 'VIDEO' | 'COACH' | 'MANUAL';
  sourceGameId?: string;
  sourceMoveNumber?: number;
  
  // Priority & review
  importance: 1 | 2 | 3 | 4 | 5;  // 5 = highest
  needsReview?: boolean;
  lastReviewedAt?: number;
  reviewCount?: number;
  
  // Linking
  linkedNoteIds?: string[];
  linkedWeaknessId?: string;
}

// ============================================
// WEAKNESS DETECTION SYSTEM
// ============================================

export interface DetectedWeakness {
  id: string;
  detectedAt: number;
  
  // What weakness
  type: BlunderType | TacticalTheme | 'OPENING_GAP' | 'ENDGAME_GAP';
  description: string;
  
  // Evidence
  occurrences: number;
  gameIds: string[];
  examplePositions: PositionDiagram[];
  
  // Severity
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedRatingImpact?: number;  // Estimated ELO cost
  
  // Training
  prescribedDrills?: PrescribedDrill[];
  drillsCompleted: number;
  improvementScore?: number;  // 0-100, how much they've improved
  
  // Status
  status: 'ACTIVE' | 'IMPROVING' | 'RESOLVED';
  lastOccurrence: number;
}

export interface PrescribedDrill {
  id: string;
  type: 'PUZZLE' | 'POSITION_PRACTICE' | 'ENDGAME' | 'ENGINE_SPAR' | 'TIMED_DRILL';
  title: string;
  description: string;
  fen?: string;
  puzzleIds?: string[];
  targetTime?: number;  // seconds
  repetitions: number;
  completedCount: number;
}

// ============================================
// MENTAL GAME TRACKER
// ============================================

export type MoodLevel = 1 | 2 | 3 | 4 | 5;  // 1 = very bad, 5 = excellent
export type FocusLevel = 1 | 2 | 3 | 4 | 5;
export type TiltLevel = 0 | 1 | 2 | 3 | 4;  // 0 = none, 4 = severe

export interface GameMentalLog {
  gameId: string;
  timestamp: number;
  
  // Pre-game state
  preGameMood: MoodLevel;
  preGameFocus: FocusLevel;
  preGameNotes?: string;
  
  // During game
  peakTilt: TiltLevel;
  tiltMoments?: { moveNumber: number; trigger: string }[];
  timePressureMistakes?: number;
  emotionalDecisions?: number;
  
  // Post-game reflection
  postGameMood: MoodLevel;
  postGameReflection?: string;
  lessonsLearned?: string[];
  
  // Patterns detected
  triggersIdentified?: string[];
}

export interface MentalPattern {
  id: string;
  pattern: string;
  description: string;
  occurrences: number;
  impactOnPerformance: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  suggestedIntervention?: string;
}

// ============================================
// STUDY TIMELINE / TRAINING LOG
// ============================================

export interface StudySession {
  id: string;
  date: string;  // YYYY-MM-DD
  startTime: number;
  endTime?: number;
  
  // What was done
  gamesPlayed: number;
  gamesReviewed: number;
  puzzlesSolved: number;
  puzzlesFailed: number;
  endgamesPracticed: number;
  openingsStudied: string[];
  drillsCompleted: string[];
  
  // Notes created
  notesCreated: number;
  noteIds: string[];
  
  // Weaknesses worked on
  weaknessesAddressed: string[];
  
  // Mental tracking
  overallFocus: FocusLevel;
  overallMood: MoodLevel;
  
  // Reflection
  sessionNotes?: string;
  keyInsights?: string[];
  tomorrowGoals?: string[];
}

export interface DailyStats {
  date: string;
  
  // Activity
  totalTimeMinutes: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  
  // Improvement metrics
  puzzleAccuracy: number;
  averageAccuracy: number;
  blundersPerGame: number;
  
  // Streaks
  currentStreak: number;
  
  // Mental
  averageMood: number;
  averageFocus: number;
  tiltIncidents: number;
}

// ============================================
// GAME REVIEW SYSTEM
// ============================================

export interface GameReview {
  gameId: string;
  reviewedAt: number;
  
  // Game metadata
  white: string;
  black: string;
  result: string;
  timeControl: string;
  opening: string;
  pgn: string;
  
  // Analysis results
  whiteAccuracy: number;
  blackAccuracy: number;
  blunders: AnnotatedMove[];
  mistakes: AnnotatedMove[];
  brilliancies: AnnotatedMove[];
  missedWins: AnnotatedMove[];
  
  // User annotations
  userAnnotations: MoveAnnotation[];
  
  // Critical moments
  criticalMoments: CriticalMoment[];
  
  // Extracted insights
  extractedNoteIds: string[];
  weaknessesDetected: string[];
  
  // Mental log
  mentalLog?: GameMentalLog;
}

export interface AnnotatedMove {
  moveNumber: number;
  move: string;
  fen: string;
  evaluation: number;
  bestMove?: string;
  evalDiff?: number;
}

export interface MoveAnnotation {
  moveNumber: number;
  color: 'white' | 'black';
  userNote: string;
  tags: (BlunderType | TacticalTheme | MentalTag)[];
  addedToNotes: boolean;
}

export interface CriticalMoment {
  moveNumber: number;
  fen: string;
  type: 'TURNING_POINT' | 'MISSED_WIN' | 'BLUNDER' | 'BRILLIANCY' | 'KEY_DECISION';
  description: string;
  bestLine?: string[];
  actualMove: string;
  evalSwing: number;
}

// ============================================
// PERSONALIZED TRAINING
// ============================================

export interface TrainingPlan {
  id: string;
  createdAt: number;
  
  // Focus areas
  primaryWeaknesses: string[];
  secondaryGoals: string[];
  
  // Daily structure
  dailyTimeTarget: number;  // minutes
  puzzleTarget: number;
  gameTarget: number;
  
  // Weekly breakdown
  weeklyPlan: {
    monday: DayPlan;
    tuesday: DayPlan;
    wednesday: DayPlan;
    thursday: DayPlan;
    friday: DayPlan;
    saturday: DayPlan;
    sunday: DayPlan;
  };
  
  // Progress
  weekNumber: number;
  completionRate: number;
}

export interface DayPlan {
  focus: string;
  activities: {
    type: 'PUZZLE' | 'DRILL' | 'GAME' | 'REVIEW' | 'ENDGAME' | 'OPENING' | 'STUDY';
    duration: number;  // minutes
    description: string;
    targetWeakness?: string;
  }[];
}












