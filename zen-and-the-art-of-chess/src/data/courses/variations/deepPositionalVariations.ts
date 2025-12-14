// ============================================
// DEEP POSITIONAL VARIATIONS
// Professional-grade strategic sequences
// Each variation demonstrates complete plans
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// OUTPOST MASTERY - COMPLETE PLANS
// ============================================

export const deepOutpostVariations: CourseVariation[] = [{
    id: 'outpost-bishop-vs-knight',
    title: 'Trading Bishop for Knight on Outpost',
    fen: 'r1bq1rk1/pp1nppbp/2p2np1/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Eliminating a piece that could challenge your outpost',
    keyTakeaway: 'Sometimes trade your bishop to keep a permanent knight on the outpost.',
    difficulty: 4,
    moves: [
      { 
        move: 'b3', 
        annotation: '!', 
        explanation: 'Preparing Ba3 to pressure the dark squares.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }]
      },
      { move: 'Re8', explanation: 'Rook to the open file.' },
      { 
        move: 'Ba3', 
        annotation: '!', 
        explanation: 'Bishop to a powerful diagonal.',
        arrows: [{ from: 'c1', to: 'a3', color: 'green' }],
        highlights: ['f8']
      },
      { move: 'e6', explanation: 'Solid.' },
      { 
        move: 'Qc2', 
        explanation: 'Connecting rooks and eyeing the kingside.',
        arrows: [{ from: 'd1', to: 'c2', color: 'green' }]
      },
      { move: 'Bf8', explanation: 'Retreating the bishop.' },
      { 
        move: 'Bxf8', 
        annotation: '!', 
        explanation: 'Eliminating the bishop that could challenge our knight.',
        arrows: [{ from: 'a3', to: 'f8', color: 'green' }]
      },
      { move: 'Rxf8', explanation: 'Taking back.' },
      { 
        move: 'cxd5', 
        annotation: '!', 
        explanation: 'Opening the c-file and creating an outpost on c5.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['c5']
      },
      { move: 'cxd5', explanation: 'Recapturing.' },
      { 
        move: 'Nb5!', 
        annotation: '!!', 
        explanation: 'Heading for c7 or d6 - permanent outposts!',
        arrows: [{ from: 'c3', to: 'b5', color: 'red' }],
        highlights: ['c7', 'd6']
      }
    ]
  }
];

// ============================================
// WEAK PAWN EXPLOITATION
// ============================================

export const deepWeakPawnVariations: CourseVariation[] = [{
    id: 'backward-pawn-1',
    title: 'Targeting the Backward Pawn',
    fen: 'r1bq1rk1/pp1n1ppp/2pb1n2/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Exploiting a backward pawn on an open file',
    keyTakeaway: 'Put heavy pieces on the semi-open file to pressure the backward pawn.',
    difficulty: 4,
    moves: [
      { 
        move: 'd5', 
        annotation: '!', 
        explanation: 'Creating the backward pawn on d6!',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d6']
      },
      { move: 'Bc5', explanation: 'Bishop becomes active.' },
      { 
        move: 'Be3', 
        annotation: '!', 
        explanation: 'Trading to weaken d6 further.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      { move: 'Bxe3', explanation: 'Taking.' },
      { 
        move: 'fxe3', 
        explanation: 'Recapturing and opening the f-file.',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }]
      },
      { move: 'Qe7', explanation: 'Connecting.' },
      { 
        move: 'Qd2', 
        annotation: '!', 
        explanation: 'Preparing Rad1 to pressure d6.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }],
        highlights: ['d6']
      },
      { move: 'Rfd8', explanation: 'Defending d6.' },
      { 
        move: 'Rad1', 
        annotation: '!', 
        explanation: 'Maximum pressure on d6.',
        arrows: [{ from: 'a1', to: 'd1', color: 'red' }],
        highlights: ['d6']
      },
      { move: 'Nf8', explanation: 'Trying to defend.' },
      { 
        move: 'b3!', 
        annotation: '!', 
        explanation: 'Preventing any Bc4 ideas and preparing to improve pieces.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }]
      }
    ]
  }
];

// ============================================
// PAWN STRUCTURE TRANSFORMATIONS
// ============================================

export const deepPawnStructureVariations: CourseVariation[] = [{
    id: 'french-advance-1',
    title: 'French Advance - Attacking the Chain',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Fighting for the center in the French Advance',
    keyTakeaway: 'Attack the base of the pawn chain (d4) or the head (e5).',
    difficulty: 4,
    moves: [
      { 
        move: 'Bd3', 
        annotation: '!', 
        explanation: 'The most active square for the bishop.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }]
      },
      { move: 'cxd4', explanation: 'Exchanging in the center.' },
      { 
        move: 'Nxd4', 
        explanation: 'Recapturing with the knight.',
        arrows: [{ from: 'c3', to: 'd4', color: 'green' }]
      },
      { move: 'Bc5', explanation: 'Pinning.' },
      { 
        move: 'Nxc6', 
        annotation: '!', 
        explanation: 'Trading to damage Black\'s structure.',
        arrows: [{ from: 'd4', to: 'c6', color: 'green' }]
      },
      { move: 'bxc6', explanation: 'Recapturing.' },
      { 
        move: 'O-O', 
        annotation: '!', 
        explanation: 'King to safety.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'O-O', explanation: 'Black castles.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Pinning the knight to the queen.',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'h6', explanation: 'Challenging.' },
      { 
        move: 'Bh4', 
        explanation: 'Maintaining the pin.',
        arrows: [{ from: 'g5', to: 'h4', color: 'green' }]
      }
    ]
  },

  {
    id: 'sicilian-maroczy-1',
    title: 'Maroczy Bind - Space Control',
    fen: 'r1bqkb1r/pp1ppp1p/2n3pn/8/2P1P3/2N5/PP2BPPP/R1BQK1NR w KQkq - 0 6',
    toMove: 'white',
    concept: 'Using the Maroczy Bind to restrict Black',
    keyTakeaway: 'The c4+e4 pawns control d5 and give a lasting space advantage.',
    difficulty: 4,
    moves: [
      { 
        move: 'Nf3', 
        annotation: '!', 
        explanation: 'Natural development.',
        arrows: [{ from: 'g1', to: 'f3', color: 'green' }]
      },
      { move: 'Bg7', explanation: 'Fianchettoing.' },
      { 
        move: 'O-O', 
        explanation: 'Castling.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'O-O', explanation: 'Black castles.' },
      { 
        move: 'Be3', 
        annotation: '!', 
        explanation: 'Controlling d4 and preparing Qd2.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      { move: 'd6', explanation: 'Typical.' },
      { 
        move: 'Qd2', 
        annotation: '!', 
        explanation: 'Connecting rooks and preparing Bh6.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }]
      },
      { move: 'Bd7', explanation: 'Developing.' },
      { 
        move: 'Rac1', 
        annotation: '!', 
        explanation: 'Controlling the c-file.',
        arrows: [{ from: 'a1', to: 'c1', color: 'green' }]
      },
      { move: 'a6', explanation: 'Preparing b5.' },
      { 
        move: 'Nd5!', 
        annotation: '!!', 
        explanation: 'The knight reaches the dream square! Black can never play ...d5.',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
        highlights: ['d5']
      }
    ]
  }
];

// ============================================
// PIECE COORDINATION
// ============================================

export const deepCoordinationVariations: CourseVariation[] = [];

// ============================================
// SPACE ADVANTAGE
// ============================================

export const deepSpaceVariations: CourseVariation[] = [];

// ============================================
// PROPHYLAXIS
// ============================================

export const deepProphylaxisVariations: CourseVariation[] = [
  {
    id: 'prophylaxis-karpov-1',
    title: 'Karpov\'s Prophylactic Method',
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Preventing opponent\'s plan before executing your own',
    keyTakeaway: 'Ask: What does my opponent want? Then stop it!',
    difficulty: 5,
    moves: [
      { 
        move: 'h3', 
        annotation: '!', 
        explanation: 'Prophylaxis! Preventing ...Bg4 which would pin the knight.',
        arrows: [{ from: 'h2', to: 'h3', color: 'green' }]
      },
      { move: 'e5', explanation: 'Black tries to break out.' },
      { 
        move: 'dxe5', 
        explanation: 'Opening the position.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { 
        move: 'Qxd8', 
        annotation: '!', 
        explanation: 'Simplifying - White\'s advantage is structural.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }]
      },
      { move: 'Rxd8', explanation: 'Taking back.' },
      { 
        move: 'Nd5!', 
        annotation: '!!', 
        explanation: 'The knight lands on its dream square!',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
        highlights: ['d5']
      },
      { move: 'Nxd5', explanation: 'Must trade.' },
      { 
        move: 'cxd5', 
        annotation: '!', 
        explanation: 'Now the c-pawn is a strong passer.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      { move: 'Rd6', explanation: 'Attacking the pawn.' },
      { 
        move: 'Be3', 
        annotation: '!', 
        explanation: 'Defending d4 and preparing Rac1.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      }
    ]
  }
];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepPositionalVariations: CourseVariation[] = [
  ...deepOutpostVariations,
  ...deepWeakPawnVariations,
  ...deepPawnStructureVariations,
  ...deepCoordinationVariations,
  ...deepSpaceVariations,
  ...deepProphylaxisVariations
];

export default allDeepPositionalVariations;












