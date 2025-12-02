// ============================================
// ZEN AND THE ART OF CHESS - TYPE DEFINITIONS
// ============================================

export type Tradition = 
  | 'VIJNANA' 
  | 'TAO' 
  | 'UPANISHADS' 
  | 'GITA' 
  | 'ASHTAVAKRA' 
  | 'YOGA_SUTRAS' 
  | 'SHIVA_SUTRAS'
  | 'ZEN'
  | 'STOIC'
  | 'ART_OF_WAR';

export type ExerciseType = 
  | 'PUZZLE' 
  | 'CALM_PLAY' 
  | 'PATTERN' 
  | 'ANALYSIS' 
  | 'MINDFUL_GAME'
  | 'VISUALIZATION'
  | 'ENDGAME';

export type PatternType = 
  | 'FORK'
  | 'PIN'
  | 'SKEWER'
  | 'DISCOVERY'
  | 'DEFLECTION'
  | 'DECOY'
  | 'QUIET_MOVE'
  | 'ZWISCHENZUG'
  | 'BACK_RANK'
  | 'MATE_PATTERN'
  | 'SACRIFICE'
  | 'CHECK'
  | 'CAPTURE'
  | 'TACTICAL';

export type Phase = 
  | 'CALM_MIND'           // Days 1-60
  | 'PATTERN_RECOGNITION' // Days 61-120
  | 'STRATEGY_PLANNING'   // Days 121-200
  | 'FLOW_INTUITION'      // Days 201-260
  | 'EGO_TRANSCENDENCE'   // Days 261-300
  | 'EFFORTLESS_ACTION';  // Days 301-365

export type TiltLevel = 'CALM' | 'MILD' | 'MODERATE' | 'HIGH';

// ============================================
// SACRED TEXT STRUCTURE
// ============================================

export interface SacredText {
  tradition: Tradition;
  quote: string;
  commentary: string;
  context?: string; // Origin/background of the tradition
  whyThisMatters?: string;
}

// ============================================
// MEDITATION STRUCTURE
// ============================================

export interface MeditationInstruction {
  title: string;
  steps: string[];
  suggestedMinutes: number;
  context?: string; // Why this practice today
}

// ============================================
// BREATHING EXERCISE
// ============================================

export interface BreathingExercise {
  name: string;
  pattern: BreathingPattern;
  cycles: number;
  purpose: string;
}

export interface BreathingPattern {
  inhale: number;
  hold?: number;
  exhale: number;
  holdEmpty?: number;
}

// ============================================
// DAILY CURRICULUM - FULL DEPTH
// ============================================

export interface ZenChessDay {
  dayNumber: number;
  title: string;
  theme: string;
  phase: Phase;

  // Sacred Texts - Multiple traditions per day
  sacredTexts: SacredText[];

  // Integrated Reflection - Weaving all teachings together
  integratedReflection: {
    title: string;
    body: string;
  };

  // Meditation
  meditation: MeditationInstruction;

  // Prayer/Intention
  prayer: string;

  // Daily Action
  dailyAction: {
    instruction: string;
    context?: string;
  };

  // Chess Integration
  chessConcept: string;
  chessApplication: string;
  chessWisdom?: string; // How the spiritual teaching applies to chess

  // Daily Chess Exercise
  exerciseType: ExerciseType;
  fen?: string;
  solution?: string[];
  exerciseInstructions: string;
  exerciseContext?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;

  // Tilt Training
  tiltSignal?: string;
  tiltReframe?: string;

  // Optional breathing exercise
  breathingExercise?: BreathingExercise;
}

// ============================================
// PUZZLES
// ============================================

export interface ChessPuzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: PatternType[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  title?: string;
  explanation?: string;
  source?: string; // Origin game reference
  // Setup move - opponent's move that leads to the puzzle position (for animation)
  beforeFen?: string; // Position before opponent's move
  setupMove?: { from: string; to: string }; // Opponent's last move
}

// ============================================
// ENGINE & ANALYSIS
// ============================================

export interface EngineEvaluation {
  depth: number;
  score: number;
  mate?: number;
  bestMove: string;
  pv: string[];
}

export interface EngineSettings {
  depth: number;
  skill: number;
  multiPV: number;
  threads: number;
}

// ============================================
// GAME STATE
// ============================================

export interface GameState {
  fen: string;
  pgn: string;
  history: MoveInfo[];
  currentMoveIndex: number;
  orientation: 'white' | 'black';
  gameMode: GameMode;
}

export interface MoveInfo {
  san: string;
  uci: string;
  fen: string;
  evaluation?: EngineEvaluation;
}

export type GameMode = 
  | 'FREE_PLAY'
  | 'VS_ENGINE'
  | 'ANALYSIS'
  | 'PUZZLE'
  | 'CALM_PLAY'
  | 'PATTERN_TRAINING';

// ============================================
// USER PROGRESS
// ============================================

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  puzzlesSolved: number;
  puzzlesFailed: number;
  streakDays: number;
  lastActiveDate: string;
  tiltEvents: TiltEvent[];
  meditationMinutes: number;
  settings: UserSettings;
}

export interface TiltEvent {
  date: string;
  level: TiltLevel;
  trigger?: string;
  reframeUsed?: string;
  resolved: boolean;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  boardTheme: string;
  pieceSet: string;
  soundEnabled: boolean;
  autoAnalysis: boolean;
  calmPlayDelay: number;
  engineStrength: number;
}

// ============================================
// NAVIGATION
// ============================================

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}
