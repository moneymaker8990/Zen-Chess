import type { ZenChessDay } from '@/lib/types';
import { phase1Days } from './phase1';
import { phase2Days } from './phase2';
import { phase3Days } from './phase3';
import { phase4Days } from './phase4';
import { phase5Days } from './phase5';
import { phase6Days } from './phase6';

// ============================================
// 365-DAY CURRICULUM INDEX
// ============================================

export const allDays: ZenChessDay[] = [
  ...phase1Days,  // Days 1-60: Calm Mind & Blunder Prevention
  ...phase2Days,  // Days 61-120: Pattern Recognition & Tactical Awareness
  ...phase3Days,  // Days 121-200: Strategy, Planning, Quiet Moves
  ...phase4Days,  // Days 201-260: Flow, Confidence, Intuition
  ...phase5Days,  // Days 261-300: Ego Transcendence & Psychological Mastery
  ...phase6Days,  // Days 301-365: Whole-Board Awareness & Effortless Action
];

export const getDayByNumber = (dayNumber: number): ZenChessDay | undefined => {
  return allDays.find(day => day.dayNumber === dayNumber);
};

export const getPhaseForDay = (dayNumber: number): string => {
  if (dayNumber <= 60) return 'CALM_MIND';
  if (dayNumber <= 120) return 'PATTERN_RECOGNITION';
  if (dayNumber <= 200) return 'STRATEGY_PLANNING';
  if (dayNumber <= 260) return 'FLOW_INTUITION';
  if (dayNumber <= 300) return 'EGO_TRANSCENDENCE';
  return 'EFFORTLESS_ACTION';
};

export const phaseInfo = {
  CALM_MIND: {
    name: 'Calm Mind & Blunder Prevention',
    days: '1-60',
    description: 'Foundation of awareness. Learning to see clearly without reactivity.',
    traditions: ['TAO', 'YOGA_SUTRAS', 'STOIC'],
  },
  PATTERN_RECOGNITION: {
    name: 'Pattern Recognition & Tactical Awareness',
    days: '61-120',
    description: 'Training the eye to see patterns. Developing tactical intuition.',
    traditions: ['VIJNANA', 'ZEN'],
  },
  STRATEGY_PLANNING: {
    name: 'Strategy, Planning & Quiet Moves',
    days: '121-200',
    description: 'Thinking beyond the immediate. Prophylaxis and positional understanding.',
    traditions: ['GITA', 'TAO'],
  },
  FLOW_INTUITION: {
    name: 'Flow, Confidence & Intuition',
    days: '201-260',
    description: 'Trusting your preparation. Playing from a place of inner stillness.',
    traditions: ['UPANISHADS', 'SHIVA_SUTRAS'],
  },
  EGO_TRANSCENDENCE: {
    name: 'Ego Transcendence & Psychological Mastery',
    days: '261-300',
    description: 'Separating self-worth from results. Playing without fear.',
    traditions: ['ASHTAVAKRA', 'VIJNANA'],
  },
  EFFORTLESS_ACTION: {
    name: 'Whole-Board Awareness & Effortless Action',
    days: '301-365',
    description: 'Integration of all learning. Wu-wei on the chessboard.',
    traditions: ['TAO', 'ZEN', 'SHIVA_SUTRAS'],
  },
};

export { phase1Days, phase2Days, phase3Days, phase4Days, phase5Days, phase6Days };










