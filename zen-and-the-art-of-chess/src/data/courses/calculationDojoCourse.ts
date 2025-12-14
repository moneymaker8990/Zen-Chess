/**
 * THE CALCULATION DOJO
 * 5 chapters on calculation depth
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const twoMoveCalc = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'PIN']);
const threeMoveCalc = puzzlesByThemeToVariations(verifiedPuzzles, ['MATE_PATTERN', 'SACRIFICE']);
const fourMoveCalc = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'DISCOVERY']);
const fivePlusCalc = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'MATE_PATTERN']);
const complexCalc = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'ZWISCHENZUG']);

// ============================================
// THE COURSE
// ============================================

export const calculationDojo: Course = {
  id: 'calculation-dojo',
  title: 'The Calculation Dojo',
  author: 'Zen Chess Academy',
  description: 'Train your calculation like a martial artist trains their body. From 2-move tactics to deep combinations.',
  coverImage: '🧮',
  coverColor: 'from-purple-500 to-pink-600',
  totalMinutes: 220,
  difficulty: 'advanced',
  tags: ['calculation', 'tactics', 'visualization', 'deep thinking', 'training'],
  chapters: [
    {
      id: 'ch-two-move',
      title: '2-Move Calculations',
      subtitle: 'Building the Foundation',
      description: 'Start with clear 2-move combinations. Build your calculation muscle.',
      estimatedMinutes: 25,
      variations: twoMoveCalc,
      keyLessons: [
        'See the whole line before moving',
        'Visualize the final position',
        'Check all captures and checks',
      ],
    },
    {
      id: 'ch-three-move',
      title: '3-Move Calculations',
      subtitle: 'Extending Your Vision',
      description: 'Push your calculation to 3 moves. Mate in 3, tactical combinations.',
      estimatedMinutes: 25,
      variations: threeMoveCalc,
      keyLessons: [
        'Start with forcing moves',
        'Consider opponent responses',
        'Double-check the final position',
      ],
    },
    {
      id: 'ch-four-move',
      title: '4-Move Calculations',
      subtitle: 'Deepening Your Analysis',
      description: 'Calculate 4 moves ahead with precision. Longer combinations.',
      estimatedMinutes: 25,
      variations: fourMoveCalc,
      keyLessons: [
        'Tree of variations - organize your thinking',
        'Eliminate bad branches early',
        'Focus on critical variations',
      ],
    },
    {
      id: 'ch-five-plus',
      title: '5+ Move Calculations',
      subtitle: 'Master-Level Depth',
      description: 'Calculate like a master - 5 or more moves ahead.',
      estimatedMinutes: 15,
      variations: fivePlusCalc,
      keyLessons: [
        'Trust your visualization',
        'Look for forcing sequences',
        'Verify with backward checking',
      ],
    },
    {
      id: 'ch-complex',
      title: 'Complex Calculations',
      subtitle: 'Multiple Forcing Lines',
      description: 'Handle positions with multiple candidate moves and complex variations.',
      estimatedMinutes: 10,
      variations: complexCalc,
      keyLessons: [
        'Candidate moves first',
        'Calculate most forcing lines first',
        'Compare final positions objectively',
      ],
    },
  ],
};

export default calculationDojo;
