// ============================================
// APP-WIDE CONSTANTS
// Centralized configuration for consistency
// ============================================

// Standard Chessboard Colors (Zen Purple Theme)
export const BOARD_COLORS = {
  light: '#e8e4f0',
  dark: '#7c6b9e',
  highlight: 'rgba(168, 85, 247, 0.4)',
  selected: 'rgba(124, 58, 237, 0.5)',
  lastMove: 'rgba(168, 85, 247, 0.35)',
  correctMove: 'rgba(74, 222, 128, 0.5)',
  incorrectMove: 'rgba(239, 68, 68, 0.5)',
  hint: 'rgba(251, 191, 36, 0.5)',
} as const;

// Board Color Themes
export const BOARD_THEMES = {
  zen: {
    name: 'Zen Purple',
    light: '#e8e4f0',
    dark: '#7c6b9e',
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

// Move Hint Styles
export const MOVE_HINT_STYLES = {
  dots: { 
    name: 'Dots', 
    description: 'Chess.com style dots',
    getStyle: (isCapture: boolean) => ({
      background: isCapture
        ? 'radial-gradient(transparent 0%, transparent 79%, rgba(0,0,0,0.3) 80%)'
        : 'radial-gradient(rgba(0,0,0,0.2) 19%, transparent 20%)',
      borderRadius: '50%',
    })
  },
  highlights: { 
    name: 'Highlights', 
    description: 'Full square highlights',
    getStyle: (isCapture: boolean) => ({
      backgroundColor: isCapture 
        ? 'rgba(239, 68, 68, 0.4)' 
        : 'rgba(129, 182, 76, 0.3)',
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

