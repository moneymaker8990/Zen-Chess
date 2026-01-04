/**
 * THE POSITIONAL CHESS PATTERNS MANUAL
 * 5 chapters on positional patterns
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const outposts = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'TACTICAL']);
const weakSquares = puzzlesByThemeToVariations(verifiedPuzzles, ['PIN', 'TACTICAL']);
const openFiles = puzzlesByThemeToVariations(verifiedPuzzles, ['BACK_RANK', 'SKEWER']);
const diagonals = puzzlesByThemeToVariations(verifiedPuzzles, ['PIN', 'SKEWER']);
const pawnStructures = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'QUIET_MOVE']);

// ============================================
// THE COURSE
// ============================================

export const positionalPatterns: Course = {
  id: 'positional-patterns',
  title: 'The Positional Chess Patterns Manual',
  author: 'Zen Chess Academy',
  description: 'A comprehensive guide to positional patterns. Outposts, weak squares, open files, diagonals, and pawn structures.',
  coverImage: '♟️',
  coverColor: 'from-green-500 to-emerald-600',
  totalMinutes: 280,
  difficulty: 'intermediate',
  tags: ['positional', 'patterns', 'outposts', 'weak squares', 'pawn structure'],
  chapters: [
    {
      id: 'ch-outposts',
      title: 'Outposts & Piece Placement',
      subtitle: 'Strong Squares for Pieces',
      description: 'Learn to identify and occupy outposts - squares that cannot be attacked by pawns.',
      estimatedMinutes: 20,
      variations: outposts,
      keyLessons: [
        'Knights thrive on outposts',
        'Outposts are protected by pawns',
        'Trade pieces to use outposts',
      ],
    },
    {
      id: 'ch-weak-squares',
      title: 'Weak Squares',
      subtitle: 'Targeting Enemy Weaknesses',
      description: 'Identify and exploit weak squares in the opponent\'s position.',
      estimatedMinutes: 20,
      variations: weakSquares,
      keyLessons: [
        'Weak squares can\'t be defended by pawns',
        'Occupy weak squares with pieces',
        'Create weak squares with pawn moves',
      ],
    },
    {
      id: 'ch-open-files',
      title: 'Open Files & Ranks',
      subtitle: 'Rook Highways',
      description: 'Control open files with rooks. Penetrate with heavy pieces.',
      estimatedMinutes: 20,
      variations: openFiles,
      keyLessons: [
        'Rooks belong on open files',
        'Double rooks on the file',
        'Penetrate to the 7th rank',
      ],
    },
    {
      id: 'ch-diagonals',
      title: 'Diagonals',
      subtitle: 'Bishop Power',
      description: 'Master diagonal play. Long diagonals are powerful.',
      estimatedMinutes: 20,
      variations: diagonals,
      keyLessons: [
        'Bishops love open diagonals',
        'The long diagonal is powerful',
        'Bishop pair in open positions',
      ],
    },
    {
      id: 'ch-pawn-structures',
      title: 'Pawn Structures',
      subtitle: 'The Skeleton of Position',
      description: 'Understand how pawn structures dictate plans.',
      estimatedMinutes: 20,
      variations: pawnStructures,
      keyLessons: [
        'Pawn structure is permanent',
        'Weaknesses can be exploited',
        'Pawn breaks change the structure',
      ],
    },
  ],
};

export default positionalPatterns;


