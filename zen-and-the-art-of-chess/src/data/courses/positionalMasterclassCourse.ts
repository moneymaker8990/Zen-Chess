/**
 * POSITIONAL CHESS MASTERCLASS
 * 5 chapters on positional chess
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations, puzzlesToVariations } from './courseConverter';
import { verifiedPuzzles, endgamePuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const pawnStructure = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL']);
const pieceCoordination = puzzlesByThemeToVariations(verifiedPuzzles, ['FORK', 'DISCOVERY']);
const spaceControl = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'QUIET_MOVE']);
const endgameTechnique = puzzlesToVariations(endgamePuzzles);
const strategicPlanning = puzzlesByThemeToVariations(verifiedPuzzles, ['QUIET_MOVE', 'TACTICAL']);

// ============================================
// THE COURSE
// ============================================

export const positionalMasterclass: Course = {
  id: 'positional-masterclass',
  title: 'Positional Chess Masterclass',
  author: 'Zen Chess Academy',
  description: 'Master positional chess through the games of the legends. Learn pawn structures, piece coordination, space control, and strategic planning.',
  coverImage: '♟️',
  coverColor: 'from-emerald-500 to-teal-600',
  totalMinutes: 240,
  difficulty: 'intermediate',
  tags: ['positional', 'strategy', 'pawn structure', 'endgame', 'planning'],
  chapters: [
    {
      id: 'ch-pawn-structure',
      title: 'Pawn Structure Mastery',
      subtitle: 'The Skeleton of Your Position',
      description: 'Learn how pawn structure dictates plans. Study isolated pawns, pawn chains, and structural transformations.',
      estimatedMinutes: 45,
      variations: pawnStructure,
      keyLessons: [
        'Pawns cannot move backward - every push is permanent',
        'Pawn structure determines piece placement',
        'Create passed pawns in the endgame',
      ],
    },
    {
      id: 'ch-piece-activity',
      title: 'Piece Coordination',
      subtitle: 'Harmony Between Pieces',
      description: 'Study how pieces work together. Rook lifts, knight outposts, bishop pairs.',
      estimatedMinutes: 50,
      variations: pieceCoordination,
      keyLessons: [
        'Active pieces are worth more than passive pieces',
        'Coordinate pieces before attacking',
        'Knights need outposts, bishops need diagonals',
      ],
    },
    {
      id: 'ch-space-control',
      title: 'Space & Control',
      subtitle: 'Restricting Your Opponent',
      description: 'Master the art of space advantage. Restrict enemy pieces and control key squares.',
      estimatedMinutes: 40,
      variations: spaceControl,
      keyLessons: [
        'Space restricts enemy piece mobility',
        'Control the center before expanding',
        'Space advantage leads to attacking chances',
      ],
    },
    {
      id: 'ch-endgame-technique',
      title: 'Endgame Technique',
      subtitle: 'Converting Advantages',
      description: 'Study endgame technique. King activity, pawn promotion, and converting advantages.',
      estimatedMinutes: 50,
      variations: endgameTechnique,
      keyLessons: [
        'King activity is crucial in endgames',
        'Create passed pawns on opposite sides',
        'The principle of two weaknesses',
      ],
    },
    {
      id: 'ch-strategic-planning',
      title: 'Strategic Planning',
      subtitle: 'Thinking in Plans',
      description: 'Form and execute strategic plans. Evaluate positions and choose the right path.',
      estimatedMinutes: 55,
      variations: strategicPlanning,
      keyLessons: [
        'Every position suggests a plan',
        'Short-term tactics serve long-term strategy',
        'Flexibility - adjust plans as the position changes',
      ],
    },
  ],
};

export default positionalMasterclass;
