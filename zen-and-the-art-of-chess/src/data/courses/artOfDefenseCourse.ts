/**
 * THE ART OF DEFENSE
 * 5 chapters on defensive chess
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations, puzzlesToVariations } from './courseConverter';
import { verifiedPuzzles, defensivePuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const defensiveResources = puzzlesToVariations(defensivePuzzles);
const counterAttack = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'DISCOVERY']);
const savingLost = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'SACRIFICE']);
const fortressBuilding = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'QUIET_MOVE']);
const practicalDefense = puzzlesToVariations(defensivePuzzles);

// ============================================
// THE COURSE
// ============================================

export const artOfDefense: Course = {
  id: 'art-of-defense',
  title: 'The Art of Defense',
  author: 'Zen Chess Academy',
  description: 'Defense is an art! Learn to hold difficult positions, find resources under pressure, and turn defense into counter-attack.',
  coverImage: '🛡️',
  coverColor: 'from-blue-600 to-blue-800',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['defense', 'saving games', 'counter-attack', 'fortress', 'resilience'],
  chapters: [
    {
      id: 'ch-defensive-resources',
      title: 'Defensive Resources',
      subtitle: 'Finding Saving Moves',
      description: 'Learn the defensive resources: blocking, counterattack, fortress.',
      estimatedMinutes: 20,
      variations: defensiveResources,
      keyLessons: [
        'Defense is not passive',
        'Look for counter-threats',
        'Use all defensive resources',
      ],
    },
    {
      id: 'ch-counter-attack',
      title: 'Counter-Attack',
      subtitle: 'Defense Through Attack',
      description: 'The best defense is often a counter-attack. Strike back!',
      estimatedMinutes: 15,
      variations: counterAttack,
      keyLessons: [
        'Counter-attack is often stronger than pure defense',
        'Create your own threats',
        'Attackers can become defenders',
      ],
    },
    {
      id: 'ch-saving-lost',
      title: 'Saving Lost Positions',
      subtitle: 'Never Give Up',
      description: 'Even lost positions have resources. Find the trick!',
      estimatedMinutes: 15,
      variations: savingLost,
      keyLessons: [
        'Never resign until you see the mate',
        'Stalemate is a resource',
        'Perpetual check can save the day',
      ],
    },
    {
      id: 'ch-fortress',
      title: 'Fortress Building',
      subtitle: 'Impenetrable Defense',
      description: 'Build a fortress that cannot be breached.',
      estimatedMinutes: 15,
      variations: fortressBuilding,
      keyLessons: [
        'Some positions are fortresses',
        'Wrong bishop + wrong rook pawn',
        'Blockade the passed pawn',
      ],
    },
    {
      id: 'ch-practical-defense',
      title: 'Practical Defense',
      subtitle: 'Real Game Situations',
      description: 'Apply defensive skills to real situations.',
      estimatedMinutes: 15,
      variations: practicalDefense,
      keyLessons: [
        'Stay calm under pressure',
        'Look for active defense',
        'Psychology: make them prove it',
      ],
    },
  ],
};

export default artOfDefense;
