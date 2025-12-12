// ============================================
// TOURNAMENT PREPARATION - TYPE DEFINITIONS
// Structured preparation for competitive play
// ============================================

// ============================================
// TOURNAMENT CONFIGURATION
// ============================================

export type TournamentFormat = 'classical' | 'rapid' | 'blitz';

export type PrepPhase = 
  | 'deep'      // 14-8 days out: Heavy training, new lines
  | 'sharpen'   // 7-3 days out: Speed work, pattern drilling
  | 'taper'     // 2-1 days out: Light review, mental prep, REST
  | 'gameday'   // Day of: Pre-game routine only
  | 'complete'; // Tournament finished

export interface Tournament {
  id: string;
  name: string;
  startDate: number;           // Timestamp
  endDate?: number;            // Optional end date for multi-day
  format: TournamentFormat;
  timeControl?: string;        // e.g., "90+30", "15+10", "3+2"
  rounds?: number;
  location?: string;
  notes?: string;
  
  // Preparation focus
  priorityOpenings: {
    id: string;
    name: string;
    color: 'white' | 'black';
    priority: 'critical' | 'important' | 'backup';
  }[];
  
  focusWeaknesses: string[];   // Pattern types to work on
  
  // Pre-game routine
  warmupRoutine: WarmupStep[];
  affirmation: string;
  
  // Progress tracking
  prepDaysCompleted: number;
  dailyLogs: DailyPrepLog[];
  
  // Status
  status: 'preparing' | 'active' | 'complete';
  createdAt: number;
}

// ============================================
// WARMUP ROUTINE
// ============================================

export type WarmupStepType = 
  | 'breathing'
  | 'meditation'
  | 'visualization'
  | 'puzzles'
  | 'openingReview'
  | 'affirmation'
  | 'stretch'
  | 'custom';

export interface WarmupStep {
  id: string;
  type: WarmupStepType;
  label: string;
  duration: number;            // Seconds
  config?: {
    puzzleCount?: number;
    puzzleDifficulty?: 'easy' | 'medium';
    openingIds?: string[];
    customText?: string;
  };
  completed?: boolean;
}

// ============================================
// DAILY PREPARATION
// ============================================

export interface DailyPrepPlan {
  date: string;                // YYYY-MM-DD
  phase: PrepPhase;
  daysUntilTournament: number;
  
  // Recommended activities
  activities: PrepActivity[];
  
  // Intensity guidance
  totalMinutes: number;
  intensity: 'high' | 'medium' | 'low' | 'rest';
  
  // Mental focus
  mentalFocus: string;         // Daily mental theme
  
  // Completed
  completed: boolean;
}

export interface PrepActivity {
  id: string;
  type: 'opening' | 'tactics' | 'patterns' | 'endgame' | 'analysis' | 'mental' | 'rest';
  title: string;
  description: string;
  duration: number;            // Minutes
  priority: 'required' | 'recommended' | 'optional';
  completed: boolean;
  
  // For navigation
  route?: string;
  actionData?: Record<string, unknown>;
}

export interface DailyPrepLog {
  date: string;
  activitiesCompleted: string[];
  minutesSpent: number;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'tired' | 'stressed';
  confidence?: 1 | 2 | 3 | 4 | 5;
}

// ============================================
// PHASE CONFIGURATION
// ============================================

export interface PhaseConfig {
  phase: PrepPhase;
  daysRange: { min: number; max: number };
  intensity: 'high' | 'medium' | 'low' | 'rest';
  dailyMinutes: number;
  focus: string[];
  mentalThemes: string[];
  description: string;
  icon: string;
  color: string;
}

export const PHASE_CONFIGS: Record<PrepPhase, PhaseConfig> = {
  deep: {
    phase: 'deep',
    daysRange: { min: 8, max: 999 },
    intensity: 'high',
    dailyMinutes: 90,
    focus: ['openings', 'tactics', 'analysis', 'endgames'],
    mentalThemes: [
      'Building confidence through preparation',
      'Embracing the challenge ahead',
      'Finding joy in deep work',
    ],
    description: 'Deep preparation phase. Build your opening repertoire, study complex positions, and address weaknesses.',
    icon: '🔬',
    color: '#a855f7',
  },
  sharpen: {
    phase: 'sharpen',
    daysRange: { min: 3, max: 7 },
    intensity: 'medium',
    dailyMinutes: 60,
    focus: ['patterns', 'tactics', 'opening-drills', 'time-pressure'],
    mentalThemes: [
      'Trust your instincts',
      'Speed comes from pattern recognition',
      'Stay sharp, stay calm',
    ],
    description: 'Sharpening phase. Focus on speed, pattern recognition, and drilling your repertoire.',
    icon: '⚔️',
    color: '#f59e0b',
  },
  taper: {
    phase: 'taper',
    daysRange: { min: 1, max: 2 },
    intensity: 'low',
    dailyMinutes: 30,
    focus: ['light-review', 'mental-prep', 'rest'],
    mentalThemes: [
      'Trust your preparation',
      'Rest is part of performance',
      'Calm mind, clear vision',
    ],
    description: 'Taper phase. Light review only. Focus on rest, mental preparation, and building confidence.',
    icon: '🧘',
    color: '#22c55e',
  },
  gameday: {
    phase: 'gameday',
    daysRange: { min: 0, max: 0 },
    intensity: 'rest',
    dailyMinutes: 15,
    focus: ['warmup-routine', 'mental-prep'],
    mentalThemes: [
      'One move at a time',
      'I am prepared. I am ready.',
      'Play with joy and presence',
    ],
    description: 'Game day. Follow your pre-game routine. Trust yourself.',
    icon: '🏆',
    color: '#3b82f6',
  },
  complete: {
    phase: 'complete',
    daysRange: { min: -999, max: -1 },
    intensity: 'rest',
    dailyMinutes: 0,
    focus: [],
    mentalThemes: [],
    description: 'Tournament complete.',
    icon: '✅',
    color: '#6b7280',
  },
};

// ============================================
// DEFAULT WARMUP ROUTINES
// ============================================

export const DEFAULT_WARMUP_ROUTINES: Record<TournamentFormat, WarmupStep[]> = {
  classical: [
    { id: 'w1', type: 'breathing', label: 'Box Breathing', duration: 180 },
    { id: 'w2', type: 'visualization', label: 'Visualize Success', duration: 120 },
    { id: 'w3', type: 'puzzles', label: 'Easy Warmup Puzzles', duration: 300, config: { puzzleCount: 5, puzzleDifficulty: 'easy' } },
    { id: 'w4', type: 'openingReview', label: 'Opening Quick Review', duration: 300 },
    { id: 'w5', type: 'affirmation', label: 'Read Affirmation', duration: 30 },
  ],
  rapid: [
    { id: 'w1', type: 'breathing', label: 'Quick Breathing', duration: 120 },
    { id: 'w2', type: 'puzzles', label: 'Speed Puzzles', duration: 180, config: { puzzleCount: 3, puzzleDifficulty: 'easy' } },
    { id: 'w3', type: 'affirmation', label: 'Read Affirmation', duration: 30 },
  ],
  blitz: [
    { id: 'w1', type: 'breathing', label: 'Quick Breathing', duration: 60 },
    { id: 'w2', type: 'puzzles', label: 'Blitz Puzzles', duration: 120, config: { puzzleCount: 3, puzzleDifficulty: 'easy' } },
    { id: 'w3', type: 'affirmation', label: 'Read Affirmation', duration: 15 },
  ],
};

export const DEFAULT_AFFIRMATIONS = [
  "I trust my preparation. I play one move at a time.",
  "I am calm, focused, and ready to play my best chess.",
  "Every position is an opportunity. I embrace the challenge.",
  "I see clearly. I calculate accurately. I play with confidence.",
  "Win or learn. Every game makes me stronger.",
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPhaseFromDays(daysUntil: number): PrepPhase {
  if (daysUntil < 0) return 'complete';
  if (daysUntil === 0) return 'gameday';
  if (daysUntil <= 2) return 'taper';
  if (daysUntil <= 7) return 'sharpen';
  return 'deep';
}

export function getDaysUntil(timestamp: number): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(timestamp);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatTimeControl(format: TournamentFormat, timeControl?: string): string {
  if (timeControl) return timeControl;
  switch (format) {
    case 'classical': return '90+30';
    case 'rapid': return '15+10';
    case 'blitz': return '3+2';
  }
}

export function getPhaseProgress(phase: PrepPhase, daysUntil: number): number {
  const config = PHASE_CONFIGS[phase];
  if (phase === 'complete') return 100;
  if (phase === 'gameday') return 95;
  
  const range = config.daysRange.max - config.daysRange.min;
  const progress = ((config.daysRange.max - daysUntil) / range) * 100;
  
  // Map to overall progress
  switch (phase) {
    case 'deep': return Math.min(35, progress * 0.35);
    case 'sharpen': return 35 + Math.min(35, progress * 0.35);
    case 'taper': return 70 + Math.min(25, progress * 0.25);
    default: return 0;
  }
}












