/**
 * TACTICAL PATTERN TRAINING COURSE
 * 7 chapters covering fundamental tactical patterns
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const pinsAndSkewers = puzzlesByThemeToVariations(verifiedPuzzles, ['PIN', 'SKEWER']);
const forksAndDoubleAttacks = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK']);
const backRankTactics = puzzlesByThemeToVariations(verifiedPuzzles, ['BACK_RANK']);
const discoveriesAndDeflections = puzzlesByThemeToVariations(verifiedPuzzles, ['DISCOVERY', 'DEFLECTION']);
const checkmatePatterns = puzzlesByThemeToVariations(verifiedPuzzles, ['MATE_PATTERN']);
const tacticalSacrifices = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE']);
const zwischenzugAndQuiet = puzzlesByThemeToVariations(verifiedPuzzles, ['ZWISCHENZUG', 'QUIET_MOVE']);

// ============================================
// THE COURSE
// ============================================

export const tacticalPatternTraining: Course = {
  id: 'tactical-patterns',
  title: 'Tactical Pattern Training',
  author: 'Zen Chess Academy',
  description: 'Master tactical patterns through carefully curated puzzles. From simple forks to complex sacrifices, build your pattern recognition with quality positions.',
  coverImage: '⚔️',
  coverColor: 'from-red-500 to-orange-600',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['tactics', 'patterns', 'puzzles', 'combinations', 'calculation'],
  chapters: [
    {
      id: 'ch-pins-skewers',
      title: 'Pins & Skewers',
      subtitle: 'The Art of the Line Attack',
      description: 'Master pins and skewers - attacking two pieces on the same line. Absolute pins, relative pins, and devastating skewers.',
      estimatedMinutes: 25,
      variations: pinsAndSkewers,
      keyLessons: [
        'Absolute pins freeze pieces completely',
        'Pile up on pinned pieces to win material',
        'Skewers attack the more valuable piece first',
      ],
    },
    {
      id: 'ch-forks',
      title: 'Forks & Double Attacks',
      subtitle: 'Attacking Two Targets at Once',
      description: 'Knight forks, queen forks, pawn forks - learn to attack multiple pieces simultaneously.',
      estimatedMinutes: 30,
      variations: forksAndDoubleAttacks,
      keyLessons: [
        'Knights are the ultimate forking piece',
        'Royal forks (king + queen) are decisive',
        'Set up forks by forcing pieces to vulnerable squares',
      ],
    },
    {
      id: 'ch-back-rank',
      title: 'Back Rank Tactics',
      subtitle: 'Exploiting the Trapped King',
      description: 'Back rank checkmates and the tactics that lead to them. Learn to spot and execute back rank combinations.',
      estimatedMinutes: 25,
      variations: backRankTactics,
      keyLessons: [
        'The pawns can trap their own king',
        'Rooks on the back rank are deadly',
        'Always check for back rank weaknesses',
      ],
    },
    {
      id: 'ch-discoveries',
      title: 'Discoveries & Deflections',
      subtitle: 'Hidden Attacks and Removing Defenders',
      description: 'Discovered attacks, discovered checks, and deflection sacrifices. The art of revealing hidden threats.',
      estimatedMinutes: 25,
      variations: discoveriesAndDeflections,
      keyLessons: [
        'The moving piece can go anywhere - attack!',
        'Double check is the most forcing move',
        'Remove the defender to win material',
      ],
    },
    {
      id: 'ch-checkmates',
      title: 'Checkmate Patterns',
      subtitle: 'The Ultimate Goal',
      description: 'From simple mates to complex patterns - Scholar\'s Mate, Back Rank, Smothered Mate, and more.',
      estimatedMinutes: 35,
      variations: checkmatePatterns,
      keyLessons: [
        'Pattern recognition speeds up calculation',
        'Classic mates: back rank, smothered, anastasia',
        'Always look for forcing sequences to mate',
      ],
    },
    {
      id: 'ch-sacrifices',
      title: 'Tactical Sacrifices',
      subtitle: 'Material for Initiative',
      description: 'Learn when to give up material for attack. Greek Gift, piece sacrifices, and exchange sacrifices.',
      estimatedMinutes: 35,
      variations: tacticalSacrifices,
      keyLessons: [
        'Greek Gift: Bxh7+ with Ng5+ follow-up',
        'Sacrifice to expose the enemy king',
        'Calculate the compensation before sacrificing',
      ],
    },
    {
      id: 'ch-zwischenzug',
      title: 'Zwischenzug & Quiet Moves',
      subtitle: 'The In-Between and the Unexpected',
      description: 'Master the art of the intermediate move and the powerful quiet move that wins.',
      estimatedMinutes: 25,
      variations: zwischenzugAndQuiet,
      keyLessons: [
        'Check before recapturing',
        'The quiet move is often the strongest',
        'In-between moves change everything',
      ],
    },
  ],
};

export default tacticalPatternTraining;


