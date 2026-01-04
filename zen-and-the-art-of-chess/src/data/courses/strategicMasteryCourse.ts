/**
 * STRATEGIC MASTERY COURSE
 * 5 chapters on strategic thinking
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const imbalances = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'SACRIFICE']);
const formingPlans = puzzlesByThemeToVariations(verifiedPuzzles, ['QUIET_MOVE', 'TACTICAL']);
const prophylaxis = puzzlesByThemeToVariations(verifiedPuzzles, ['DEFLECTION', 'TACTICAL']);
const convertingAdvantages = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'MATE_PATTERN']);
const deepCalculation = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'MATE_PATTERN']);

// ============================================
// THE COURSE
// ============================================

export const strategicMastery: Course = {
  id: 'strategic-mastery',
  title: 'Strategic Mastery',
  author: 'Zen Chess Academy',
  description: 'Think like a Grandmaster. Learn to recognize imbalances, form plans, prevent opponent ideas, and calculate variations deeply.',
  coverImage: '🧠',
  coverColor: 'from-blue-500 to-cyan-600',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['strategy', 'planning', 'imbalances', 'prophylaxis', 'calculation'],
  chapters: [
    {
      id: 'ch-imbalances',
      title: 'Recognizing Imbalances',
      subtitle: 'The Foundation of Strategic Play',
      description: 'Every position has imbalances - material, space, pawn structure. Learn to identify and exploit them.',
      estimatedMinutes: 35,
      variations: imbalances,
      keyLessons: [
        'Material imbalances: pieces vs pawns, quality',
        'Structural imbalances: weak squares, pawn islands',
        'Dynamic imbalances: activity, initiative, time',
      ],
    },
    {
      id: 'ch-planning',
      title: 'Forming Plans',
      subtitle: 'From Position to Action',
      description: 'Transform evaluation into concrete plans. Ask "What does the position want?"',
      estimatedMinutes: 45,
      variations: formingPlans,
      keyLessons: [
        'Every position suggests a plan',
        'Base plans on concrete evaluation',
        'Flexible planning - adjust as the game evolves',
      ],
    },
    {
      id: 'ch-prophylaxis',
      title: 'Prophylactic Thinking',
      subtitle: 'Preventing Opponent Plans',
      description: 'Before executing your plan, ask: "What does my opponent want?"',
      estimatedMinutes: 40,
      variations: prophylaxis,
      keyLessons: [
        'Always ask: what is my opponent threatening?',
        'Prevent before you attack',
        'Restriction is a powerful strategy',
      ],
    },
    {
      id: 'ch-conversion',
      title: 'Converting Advantages',
      subtitle: 'Turning Advantage into Victory',
      description: 'Having an advantage is not enough - you must convert it.',
      estimatedMinutes: 40,
      variations: convertingAdvantages,
      keyLessons: [
        'Convert space advantage to piece activity',
        'Convert piece activity to threats',
        'Convert threats to material or checkmate',
      ],
    },
    {
      id: 'ch-calculation',
      title: 'Deep Calculation',
      subtitle: 'Seeing Further Than Your Opponent',
      description: 'Sharpen your calculation with challenging positions. See 4-6 moves ahead.',
      estimatedMinutes: 40,
      variations: deepCalculation,
      keyLessons: [
        'Calculate forcing moves first',
        'Consider all candidate moves before calculating',
        'Verify your calculation - blunder check!',
      ],
    },
  ],
};

export default strategicMastery;


