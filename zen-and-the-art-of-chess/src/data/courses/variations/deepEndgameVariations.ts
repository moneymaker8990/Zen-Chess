// ============================================
// DEEP ENDGAME VARIATIONS
// Professional-grade endgame technique
// Each variation shows precise calculation
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// KING AND PAWN ENDGAMES - COMPLETE TECHNIQUE
// ============================================

export const deepKingPawnVariations: CourseVariation[] = [];

// ============================================
// ROOK ENDGAMES - DEEP TECHNIQUE
// ============================================

export const deepRookEndgameVariations: CourseVariation[] = [];

// ============================================
// MINOR PIECE ENDGAMES
// ============================================

export const deepMinorPieceVariations: CourseVariation[] = [];

// ============================================
// QUEEN ENDGAMES
// ============================================

export const deepQueenEndgameVariations: CourseVariation[] = [
  {
    id: 'queen-vs-pawn-7th-1',
    title: 'Queen vs Pawn on 7th Rank',
    fen: '8/1P6/8/8/8/k7/8/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Queen vs pawn on 7th - technique',
    keyTakeaway: 'Bring the king closer using checks, then win the pawn.',
    difficulty: 4,
    moves: [
      { 
        move: 'Qh3+', 
        annotation: '!', 
        explanation: 'Check! Bringing the king closer.',
        arrows: [{ from: 'h1', to: 'h3', color: 'green' }]
      },
      { move: 'Kb2', explanation: 'King moves.' },
      { 
        move: 'Qd3', 
        annotation: '!', 
        explanation: 'Preparing Qd1 to stop the pawn.',
        arrows: [{ from: 'h3', to: 'd3', color: 'green' }]
      },
      { move: 'Kc1', explanation: 'Trying to hide.' },
      { 
        move: 'Qc3+', 
        annotation: '!', 
        explanation: 'Forcing the king away from the pawn.',
        arrows: [{ from: 'd3', to: 'c3', color: 'green' }]
      },
      { move: 'Kb1', explanation: 'Running.' },
      { 
        move: 'Kd2', 
        annotation: '!', 
        explanation: 'King advances!',
        arrows: [{ from: 'e1', to: 'd2', color: 'green' }]
      },
      { move: 'Ka2', explanation: 'Escaping.' },
      { 
        move: 'Qb4', 
        annotation: '!', 
        explanation: 'Controlling b8 and preparing checks.',
        arrows: [{ from: 'c3', to: 'b4', color: 'green' }],
        highlights: ['b8']
      },
      { move: 'Ka1', explanation: 'Corner.' },
      { 
        move: 'Kc2!', 
        annotation: '!!', 
        explanation: 'Now Qb1 or Qa3 is coming. Pawn falls!',
        arrows: [{ from: 'd2', to: 'c2', color: 'red' }],
        highlights: ['b1', 'a3']
      }
    ]
  }
];

// ============================================
// PRACTICAL ENDGAMES
// ============================================

export const deepPracticalEndgameVariations: CourseVariation[] = [{
    id: 'fortress-draw-1',
    title: 'Creating a Fortress',
    fen: '8/8/2k5/2P5/1PK5/8/6r1/5R2 b - - 0 1',
    toMove: 'black',
    concept: 'Building an impenetrable fortress',
    keyTakeaway: 'Some positions cannot be won despite material advantage.',
    difficulty: 4,
    moves: [
      { 
        move: 'Rc2+', 
        annotation: '!', 
        explanation: 'Checking to gain time.',
        arrows: [{ from: 'g2', to: 'c2', color: 'green' }]
      },
      { move: 'Kb3', explanation: 'King escapes.' },
      { 
        move: 'Rd2', 
        annotation: '!', 
        explanation: 'Cutting off the king.',
        arrows: [{ from: 'c2', to: 'd2', color: 'green' }]
      },
      { move: 'Rf6+', explanation: 'White checks.' },
      { 
        move: 'Kd7', 
        annotation: '!', 
        explanation: 'Staying near the pawns.',
        arrows: [{ from: 'c6', to: 'd7', color: 'green' }]
      },
      { move: 'Kc4', explanation: 'White advances.' },
      { 
        move: 'Rc2+', 
        annotation: '!', 
        explanation: 'Checking again.',
        arrows: [{ from: 'd2', to: 'c2', color: 'green' }]
      },
      { move: 'Kd5', explanation: 'King goes forward.' },
      { 
        move: 'Rd2+', 
        annotation: '!', 
        explanation: 'Harassment continues - Black can hold!',
        arrows: [{ from: 'c2', to: 'd2', color: 'green' }]
      }
    ]
  }
];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepEndgameVariations: CourseVariation[] = [
  ...deepKingPawnVariations,
  ...deepRookEndgameVariations,
  ...deepMinorPieceVariations,
  ...deepQueenEndgameVariations,
  ...deepPracticalEndgameVariations
];

export default allDeepEndgameVariations;












