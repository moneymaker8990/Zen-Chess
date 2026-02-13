// ============================================
// APP-WIDE CONSTANTS
// Centralized configuration for consistency
// ============================================

// Standard Chessboard Colors (Purple accent theme - Zen default)
export const BOARD_COLORS = {
  // Base colors (Zen theme - harmonizes with dark UI)
  light: '#d4cce0',  // Muted warm purple-gray
  dark: '#6b5b7a',   // Deeper cool purple
  // Accent colors - Purple theme for all highlights
  highlight: 'rgba(168, 85, 247, 0.45)',      // App accent purple
  selected: 'rgba(138, 43, 226, 0.45)',       // Blue violet
  lastMove: 'rgba(168, 85, 247, 0.35)',       // Subtle purple for last move
  correctMove: 'rgba(74, 222, 128, 0.5)',     // Green for correct
  incorrectMove: 'rgba(239, 68, 68, 0.4)',    // Red for incorrect
  hint: 'rgba(168, 85, 247, 0.5)',            // Purple for hints (legal moves)
  hintTarget: 'rgba(74, 222, 128, 0.5)',      // Green for hint destination
  check: 'rgba(239, 68, 68, 0.5)',            // Red for check highlight
} as const;

// Board Color Themes
export const BOARD_THEMES = {
  zen: {
    name: 'Zen Purple',
    light: '#d4cce0',  // Muted warm purple-gray (harmonizes with dark UI)
    dark: '#6b5b7a',   // Deeper cool purple
  },
  classic: {
    name: 'Classic Green',
    light: '#ebecd0',
    dark: '#779556',
  },
  calm: {
    name: 'Calm Blue',
    light: '#dee3ed',
    dark: '#5d7494',
  },
  wood: {
    name: 'Wood',
    light: '#f0d9b5',
    dark: '#b58863',
  },
  ice: {
    name: 'Ice',
    light: '#d4e4ed',
    dark: '#6b8a99',
  },
  coral: {
    name: 'Coral',
    light: '#f5e6e0',
    dark: '#c57b6b',
  },
  emerald: {
    name: 'Emerald',
    light: '#e8f5e9',
    dark: '#4caf50',
  },
  slate: {
    name: 'Slate',
    light: '#e2e8f0',
    dark: '#475569',
  },
} as const;

// Piece Styles (supported by react-chessboard)
export const PIECE_STYLES = {
  cburnett: { name: 'Classic', description: 'Clean and traditional' },
  merida: { name: 'Merida', description: 'Elegant serif style' },
  alpha: { name: 'Alpha', description: 'Modern flat design' },
  cardinal: { name: 'Cardinal', description: 'Bold tournament style' },
  chessnut: { name: 'Chessnut', description: 'Wooden carved look' },
  companion: { name: 'Companion', description: 'Friendly rounded pieces' },
  dubrovny: { name: 'Dubrovny', description: 'Historical Dubrovny set' },
  fantasy: { name: 'Fantasy', description: 'Decorative fantasy style' },
  fresca: { name: 'Fresca', description: 'Fresh modern design' },
  gioco: { name: 'Gioco', description: 'Italian style pieces' },
  governor: { name: 'Governor', description: 'Stately formal pieces' },
  horsey: { name: 'Horsey', description: 'Fun cartoon style' },
  kosal: { name: 'Kosal', description: 'Contemporary minimalist' },
  leipzig: { name: 'Leipzig', description: 'Classic German style' },
  letter: { name: 'Letter', description: 'Typographic letters' },
  libra: { name: 'Libra', description: 'Balanced proportions' },
  maestro: { name: 'Maestro', description: 'Professional tournament' },
  mono: { name: 'Mono', description: 'Monochrome outline' },
  pirouetti: { name: 'Pirouetti', description: 'Graceful curves' },
  pixel: { name: 'Pixel', description: 'Retro pixel art' },
  shapes: { name: 'Shapes', description: 'Geometric shapes' },
  spatial: { name: 'Spatial', description: '3D perspective' },
  staunty: { name: 'Staunty', description: 'Staunton standard' },
  tatiana: { name: 'Tatiana', description: 'Feminine elegant' },
} as const;

// Move Hint Styles - Purple themed (matches app accent)
export const MOVE_HINT_STYLES = {
  dots: { 
    name: 'Dots', 
    description: 'Purple dots for moves',
    getStyle: (isCapture: boolean) => ({
      background: isCapture
        ? 'radial-gradient(transparent 0%, transparent 79%, rgba(168, 85, 247, 0.7) 80%)'
        : 'radial-gradient(rgba(168, 85, 247, 0.5) 22%, transparent 23%)',
      borderRadius: '50%',
    })
  },
  highlights: { 
    name: 'Highlights', 
    description: 'Purple square highlights',
    getStyle: (isCapture: boolean) => ({
      backgroundColor: isCapture 
        ? 'rgba(168, 85, 247, 0.5)' 
        : 'rgba(168, 85, 247, 0.3)',
    })
  },
  none: { 
    name: 'None', 
    description: 'No move hints',
    getStyle: () => ({})
  },
} as const;

// Video sources for lesson integration
export const VIDEO_PROVIDERS = {
  youtube: {
    embedUrl: (id: string) => `https://www.youtube.com/embed/${id}`,
    thumbnailUrl: (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  },
  vimeo: {
    embedUrl: (id: string) => `https://player.vimeo.com/video/${id}`,
    thumbnailUrl: (id: string) => '', // Vimeo requires API for thumbnails
  },
} as const;

// Spaced Repetition Settings
export const SRS_CONFIG = {
  initialInterval: 1,       // First interval in days
  easeFactor: 2.5,         // Starting ease factor
  minEaseFactor: 1.3,      // Minimum ease factor
  easyBonus: 1.3,          // Multiplier for "easy" responses
  intervalModifier: 1.0,    // Global interval modifier
  maxInterval: 365,         // Maximum interval in days
  graduatingInterval: 1,    // Interval when card graduates
  lapseInterval: 1,        // Interval after lapse
} as const;

// Challenge Types
export const CHALLENGE_TYPES = {
  daily: {
    id: 'daily',
    name: 'Daily Puzzle',
    description: 'Complete today\'s puzzle',
    xp: 10,
    icon: '🎯',
  },
  streak: {
    id: 'streak',
    name: 'Streak Challenge',
    description: 'Maintain your streak',
    xp: 15,
    icon: '🔥',
  },
  tactical: {
    id: 'tactical',
    name: 'Tactical Training',
    description: 'Solve 10 puzzles today',
    xp: 50,
    icon: '⚔️',
  },
  study: {
    id: 'study',
    name: 'Study Session',
    description: 'Complete 30 minutes of study',
    xp: 30,
    icon: '📚',
  },
  review: {
    id: 'review',
    name: 'Review Master',
    description: 'Review 20 patterns',
    xp: 40,
    icon: '🔄',
  },
} as const;

// Social Share Templates
export const SHARE_TEMPLATES = {
  puzzleSolved: (rating: number, streak: number) => 
    `🧩 Solved puzzle at ${rating} rating! Current streak: ${streak} 🔥\n#ZenChess #Chess`,
  lessonComplete: (lessonName: string, xp: number) =>
    `📚 Just completed "${lessonName}" and earned ${xp} XP!\n#ZenChess #ChessLearning`,
  achievement: (achievementName: string) =>
    `🏆 Unlocked achievement: ${achievementName}!\n#ZenChess #Chess`,
  dailyStreak: (days: number) =>
    `🔥 ${days} day streak on Zen Chess!\n#ZenChess #ChessStreak`,
  challenge: (challengeName: string) =>
    `⚔️ Challenge me: ${challengeName}\n#ZenChess #ChessChallenge`,
} as const;

// Study Plan Presets
export const STUDY_PLAN_PRESETS = {
  beginner: {
    id: 'beginner',
    name: 'Beginner\'s Path',
    description: 'Perfect for those new to chess',
    duration: 30, // minutes per day
    focusAreas: ['basics', 'tactics', 'endgames'],
    icon: '🌱',
  },
  intermediate: {
    id: 'intermediate',
    name: 'Rising Player',
    description: 'Build a solid foundation',
    duration: 45,
    focusAreas: ['openings', 'tactics', 'strategy', 'endgames'],
    icon: '📈',
  },
  advanced: {
    id: 'advanced',
    name: 'Tournament Ready',
    description: 'Serious competitive preparation',
    duration: 90,
    focusAreas: ['openings', 'middlegame', 'endgames', 'analysis'],
    icon: '🏆',
  },
  tactical: {
    id: 'tactical',
    name: 'Tactical Beast',
    description: 'Focus on combinations and tactics',
    duration: 30,
    focusAreas: ['tactics', 'calculation', 'patterns'],
    icon: '⚔️',
  },
  positional: {
    id: 'positional',
    name: 'Strategic Mind',
    description: 'Master positional play',
    duration: 45,
    focusAreas: ['strategy', 'pawn-structures', 'piece-play'],
    icon: '🧠',
  },
} as const;

// XP Rewards
export const XP_REWARDS = {
  puzzleSolved: 5,
  puzzleStreakBonus: 2,    // Per puzzle in streak
  lessonCompleted: 15,
  courseChapterCompleted: 25,
  courseCompleted: 100,
  dailyLogin: 5,
  streakDay: 10,
  challengeCompleted: 20,
  patternMastered: 10,
  gameAnalyzed: 15,
} as const;

// ============================================
// PUZZLE GAME CONSTANTS
// ============================================

export const PUZZLE_RUSH_TIME_LIMIT = 180; // seconds
export const PUZZLE_STREAK_MAX_STRIKES = 3;

export const PUZZLE_TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 800,
  GOLD: 1200,
  PLATINUM: 1600,
  DIAMOND: 2000,
  MASTER: 2400,
} as const;

// ============================================
// APP LIMITS
// ============================================

export const NAVIGATION_HISTORY_MAX_SIZE = 50;
export const COGNITIVE_METRICS_GAME_LIMIT = 500;

// Export types
export type BoardTheme = keyof typeof BOARD_THEMES;
export type PieceStyle = keyof typeof PIECE_STYLES;
export type MoveHintStyle = keyof typeof MOVE_HINT_STYLES;
export type ChallengeType = keyof typeof CHALLENGE_TYPES;
export type StudyPlanPreset = keyof typeof STUDY_PLAN_PRESETS;

// Helper to get board colors
export function getBoardColors(theme: BoardTheme) {
  return BOARD_THEMES[theme];
}

// Helper to get move hint style
export function getMoveHintStyle(style: MoveHintStyle, isCapture: boolean) {
  return MOVE_HINT_STYLES[style].getStyle(isCapture);
}

