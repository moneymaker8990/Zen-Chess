/**
 * ESSENTIAL ENDGAME MASTERY
 * 5 chapters on endgame technique
 */

import type { Course } from './courseTypes';
import { puzzlesToVariations, puzzlesByThemeToVariations } from './courseConverter';
import { endgamePuzzles, verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const pawnEndgames = puzzlesToVariations(endgamePuzzles);
const rookEndgames = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'BACK_RANK']);
const minorPieceEndgames = puzzlesByThemeToVariations(verifiedPuzzles, ['PIN', 'SKEWER']);
const queenEndgames = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'MATE_PATTERN']);
const practicalEndgames = puzzlesToVariations(endgamePuzzles);

// ============================================
// THE COURSE
// ============================================

export const endgameMastery: Course = {
  id: 'endgame-mastery',
  title: 'Essential Endgame Mastery',
  author: 'Zen Chess Academy',
  description: 'Master the endgame - where games are won and lost. From pawn endgames to complex rook endings, learn essential technique.',
  coverImage: '♚',
  coverColor: 'from-gray-600 to-gray-800',
  totalMinutes: 150,
  difficulty: 'intermediate',
  tags: ['endgame', 'technique', 'pawn endings', 'rook endings', 'conversion'],
  chapters: [
    {
      id: 'ch-pawn-endgames',
      title: 'Pawn Endgames',
      subtitle: 'The Purest Test of Skill',
      description: 'King and pawn endgames are the foundation. Master opposition, key squares, and pawn races.',
      estimatedMinutes: 30,
      variations: pawnEndgames,
      keyLessons: [
        'The opposition is everything',
        'Key squares determine pawn promotion',
        'Count carefully in pawn races',
      ],
    },
    {
      id: 'ch-rook-endgames',
      title: 'Rook Endgames',
      subtitle: 'The Most Common Endings',
      description: 'Rook endgames occur in over half of all games. Learn Lucena, Philidor, and practical technique.',
      estimatedMinutes: 40,
      variations: rookEndgames,
      keyLessons: [
        'Rooks belong behind passed pawns',
        'Lucena position - the winning technique',
        'Philidor position - the drawing technique',
      ],
    },
    {
      id: 'ch-minor-piece',
      title: 'Minor Piece Endgames',
      subtitle: 'Bishop vs Knight, Same Color Bishops',
      description: 'Learn when bishops are better than knights and vice versa. Master opposite-color bishop endings.',
      estimatedMinutes: 30,
      variations: minorPieceEndgames,
      keyLessons: [
        'Bishops are better in open positions',
        'Knights are better in closed positions',
        'Opposite-color bishops favor the attacker',
      ],
    },
    {
      id: 'ch-queen-endgames',
      title: 'Queen Endgames',
      subtitle: 'The Most Complex Endings',
      description: 'Queen endgames are notoriously tricky. Learn perpetual check, stalemate traps, and conversion.',
      estimatedMinutes: 25,
      variations: queenEndgames,
      keyLessons: [
        'Perpetual check is always a threat',
        'Centralize the queen in queen endings',
        'Beware of stalemate tricks',
      ],
    },
    {
      id: 'ch-practical-endgames',
      title: 'Practical Endgames',
      subtitle: 'Real Game Situations',
      description: 'Apply endgame knowledge to practical situations. Convert advantages, save draws, and win.',
      estimatedMinutes: 25,
      variations: practicalEndgames,
      keyLessons: [
        'Activate the king in the endgame',
        'Create passed pawns',
        'Trade pieces when ahead, avoid trades when behind',
      ],
    },
  ],
};

export default endgameMastery;


