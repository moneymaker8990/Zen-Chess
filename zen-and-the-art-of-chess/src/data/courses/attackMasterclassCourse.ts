/**
 * THE ATTACK MASTERCLASS
 * 5 chapters on advanced attacking chess
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const openingAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'SACRIFICE']);
const middlegameAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'DISCOVERY']);
const matingAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['MATE_PATTERN', 'BACK_RANK']);
const sacrificialAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'DECOY']);
const winningAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['MATE_PATTERN', 'SACRIFICE']);

// ============================================
// THE COURSE
// ============================================

export const attackMasterclass: Course = {
  id: 'attack-masterclass',
  title: 'The Attack Masterclass',
  author: 'Zen Chess Academy',
  description: 'Advanced attacking techniques for serious improvers. Master the art of the attack from opening to endgame.',
  coverImage: '⚔️',
  coverColor: 'from-orange-500 to-red-600',
  totalMinutes: 240,
  difficulty: 'advanced',
  tags: ['attack', 'advanced', 'sacrifice', 'combinations', 'masterclass'],
  chapters: [
    {
      id: 'ch-opening-attacks',
      title: 'Opening Attacks',
      subtitle: 'Early Aggression',
      description: 'Learn to attack from the opening. f7/f2 attacks, gambits, and quick development.',
      estimatedMinutes: 20,
      variations: openingAttacks,
      keyLessons: [
        'Development before attack',
        'f7/f2 is the weakest point',
        'Gambits for initiative',
      ],
    },
    {
      id: 'ch-middlegame-attacks',
      title: 'Middlegame Attacks',
      subtitle: 'The Main Battle',
      description: 'Attack in the middlegame when pieces are fully developed.',
      estimatedMinutes: 25,
      variations: middlegameAttacks,
      keyLessons: [
        'Coordinate all pieces before attacking',
        'Target weaknesses relentlessly',
        'Control key squares and files',
      ],
    },
    {
      id: 'ch-mating-attacks',
      title: 'Mating Attacks',
      subtitle: 'Going for the Kill',
      description: 'When the king is exposed, go for checkmate.',
      estimatedMinutes: 25,
      variations: matingAttacks,
      keyLessons: [
        'Look for mating patterns',
        'Sacrifice to expose the king',
        'Coordinate pieces for the final blow',
      ],
    },
    {
      id: 'ch-sacrificial-attacks',
      title: 'Sacrificial Attacks',
      subtitle: 'Material for Initiative',
      description: 'Master the art of sacrifice. Give to get more.',
      estimatedMinutes: 20,
      variations: sacrificialAttacks,
      keyLessons: [
        'Calculate before you sacrifice',
        'Initiative can be worth material',
        'Keep attacking after the sacrifice',
      ],
    },
    {
      id: 'ch-winning-attacks',
      title: 'Winning Attacks',
      subtitle: 'Converting the Attack',
      description: 'Convert attacking advantages into wins.',
      estimatedMinutes: 10,
      variations: winningAttacks,
      keyLessons: [
        'Finish the attack decisively',
        'Don\'t let the opponent escape',
        'Material gains should be converted',
      ],
    },
  ],
};

export default attackMasterclass;


