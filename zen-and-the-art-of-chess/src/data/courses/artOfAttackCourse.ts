/**
 * THE ART OF ATTACK COURSE
 * 5 chapters on attacking chess
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const whenToAttack = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL']);
const classicalSacrifices = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'DECOY']);
const kingHunt = puzzlesByThemeToVariations(verifiedPuzzles, ['MATE_PATTERN', 'CHECK']);
const pieceCoordination = puzzlesByThemeToVariations(verifiedPuzzles, ['DISCOVERY', 'FORK']);
const romanticMasterpieces = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'MATE_PATTERN']);

// ============================================
// THE COURSE
// ============================================

export const artOfAttack: Course = {
  id: 'art-of-attack',
  title: 'The Art of Attack',
  author: 'Zen Chess Academy',
  description: 'Learn to attack like the great masters! Study sacrifices, king hunts, and devastating attacks. Master the art of the assault.',
  coverImage: '⚔️',
  coverColor: 'from-red-600 to-orange-500',
  totalMinutes: 220,
  difficulty: 'intermediate',
  tags: ['attack', 'tactics', 'sacrifices', 'king hunt', 'romantic chess'],
  chapters: [
    {
      id: 'ch-when-to-attack',
      title: 'When to Attack',
      subtitle: 'Prerequisites for a Successful Attack',
      description: 'Before attacking, ensure you have the prerequisites: development lead, central control, and target weaknesses.',
      estimatedMinutes: 35,
      variations: whenToAttack,
      keyLessons: [
        'Develop all pieces before attacking',
        'Control the center to support attacks',
        'Attack only when you have a lead in development',
      ],
    },
    {
      id: 'ch-classical-sacrifices',
      title: 'Classical Sacrifices',
      subtitle: 'Greek Gift, Double Bishop, Exchange Sac',
      description: 'Study the timeless sacrificial patterns from legendary games.',
      estimatedMinutes: 45,
      variations: classicalSacrifices,
      keyLessons: [
        'Greek Gift requires Ng5+ and Qh5 follow-up',
        'Double Bishop Sac tears open the kingside',
        'Exchange sacrifices open files for attack',
      ],
    },
    {
      id: 'ch-king-hunt',
      title: 'The King Hunt',
      subtitle: 'Chasing the King Across the Board',
      description: 'When the king leaves its safe haven, hunt it down!',
      estimatedMinutes: 50,
      variations: kingHunt,
      keyLessons: [
        'An exposed king justifies material sacrifice',
        'Keep checking - the king cannot escape',
        'Coordinate all pieces in the hunt',
      ],
    },
    {
      id: 'ch-attack-coordination',
      title: 'Piece Coordination in Attack',
      subtitle: 'Making Your Pieces Work Together',
      description: 'Attacks succeed when pieces coordinate. Rook lifts, queen-knight batteries, and more.',
      estimatedMinutes: 45,
      variations: pieceCoordination,
      keyLessons: [
        'Every piece should participate in the attack',
        'Rook lifts bring rooks to attacking squares',
        'Queen + Knight is the most dangerous duo',
      ],
    },
    {
      id: 'ch-romantic-masterpieces',
      title: 'Romantic Masterpieces',
      subtitle: 'The Greatest Attacking Games',
      description: 'Study complete attacking masterpieces with brilliant sacrifices and combinations.',
      estimatedMinutes: 55,
      variations: romanticMasterpieces,
      keyLessons: [
        'Beauty in chess comes from harmony of attack',
        'Material is meaningless if the king falls',
        'The initiative, once seized, must not be surrendered',
      ],
    },
  ],
};

export default artOfAttack;


