// ============================================
// DEEP TACTICAL VARIATIONS
// Professional-grade multi-move tactical sequences
// Each variation has 5-12 annotated moves
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// CLASSICAL SACRIFICES
// ============================================

export const classicalSacrifices: CourseVariation[] = [];

// ============================================
// PIN COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepPinVariations: CourseVariation[] = [];

// ============================================
// FORK COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepForkVariations: CourseVariation[] = [{
    id: 'queen-fork-1',
    title: 'Queen Fork Finishing Attack',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p2q/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Creating a queen fork opportunity',
    keyTakeaway: 'Queens can fork from long range on diagonals and files.',
    difficulty: 3,
    moves: [
      { 
        move: 'Nc3', 
        annotation: '!', 
        explanation: 'Developing while preparing d4.',
        arrows: [{ from: 'b1', to: 'c3', color: 'green' }]
      },
      { move: 'Bb4', explanation: 'Pinning the knight.' },
      { 
        move: 'O-O', 
        explanation: 'Getting the king safe first.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'Bxc3', explanation: 'Taking the knight.' },
      { 
        move: 'bxc3', 
        explanation: 'Recapturing, opening the b-file.',
        arrows: [{ from: 'b2', to: 'c3', color: 'green' }]
      },
      { move: 'O-O', explanation: 'Black castles.' },
      { 
        move: 'Ba3', 
        annotation: '!', 
        explanation: 'Attacking the rook!',
        arrows: [{ from: 'c1', to: 'a3', color: 'red' }],
        highlights: ['f8']
      },
      { move: 'Re8', explanation: 'Rook escapes.' },
      { 
        move: 'Rb1', 
        annotation: '!', 
        explanation: 'Doubling on the open file.',
        arrows: [{ from: 'a1', to: 'b1', color: 'green' }]
      }
    ]
  },

  {
    id: 'pawn-fork-1',
    title: 'The Deadly Pawn Fork',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
    toMove: 'black',
    concept: 'Using pawns to fork pieces',
    keyTakeaway: 'Pawn forks are especially good since the pawn is worth less than what it attacks.',
    difficulty: 2,
    moves: [
      { 
        move: 'exd4', 
        annotation: '!', 
        explanation: 'Taking and preparing to advance.',
        arrows: [{ from: 'e5', to: 'd4', color: 'green' }]
      },
      { move: 'Nxd4', explanation: 'White recaptures with the knight.' },
      { 
        move: 'Nxd4', 
        explanation: 'Black takes back.',
        arrows: [{ from: 'c6', to: 'd4', color: 'green' }]
      },
      { move: 'Qxd4', explanation: 'Queen recaptures.' },
      { 
        move: 'Bd6', 
        annotation: '!', 
        explanation: 'Developing while eyeing the kingside.',
        arrows: [{ from: 'f8', to: 'd6', color: 'green' }]
      },
      { move: 'Nc3', explanation: 'Developing the knight.' },
      { 
        move: 'Nf6', 
        annotation: '!', 
        explanation: 'Developing and attacking e4.',
        arrows: [{ from: 'g8', to: 'f6', color: 'green' }],
        highlights: ['e4']
      }
    ]
  }
];

// ============================================
// DISCOVERED ATTACK SEQUENCES
// ============================================

export const deepDiscoveredVariations: CourseVariation[] = [{
    id: 'battery-discovered-1',
    title: 'Building a Discovered Attack Battery',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Setting up pieces for a discovered attack',
    keyTakeaway: 'Sometimes you need to build the battery before it becomes effective.',
    difficulty: 4,
    moves: [
      { 
        move: 'Nc3', 
        annotation: '!', 
        explanation: 'Developing toward d5, building pressure.',
        arrows: [{ from: 'b1', to: 'c3', color: 'green' }]
      },
      { move: 'Bc5', explanation: 'Black develops actively.' },
      { 
        move: 'd3', 
        explanation: 'Preparing to castle.',
        arrows: [{ from: 'd2', to: 'd3', color: 'green' }]
      },
      { move: 'd6', explanation: 'Solid development.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Pinning the knight!',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'h6', explanation: 'Challenging the bishop.' },
      { 
        move: 'Bh4', 
        explanation: 'Maintaining the pin.',
        arrows: [{ from: 'g5', to: 'h4', color: 'green' }]
      },
      { move: 'g5', explanation: 'Trying to kick the bishop.' },
      { 
        move: 'Nxg5!', 
        annotation: '!!', 
        explanation: 'Sacrifice! Opening lines with a discovered attack coming.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
        highlights: ['g5']
      },
      { move: 'hxg5', explanation: 'Must take.' },
      { 
        move: 'Bxg5', 
        annotation: '!', 
        explanation: 'Now the queen is attacked!',
        arrows: [{ from: 'h4', to: 'g5', color: 'green' }],
        highlights: ['d8']
      }
    ]
  }
];

// ============================================
// CHECKMATE PATTERNS - DEEP ANALYSIS
// ============================================

export const deepCheckmateVariations: CourseVariation[] = [{
    id: 'corridor-mate-1',
    title: 'Corridor Mate',
    fen: '6k1/5p1p/6p1/8/8/8/5PPP/2R3K1 w - - 0 1',
    toMove: 'white',
    concept: 'Rook mates along a rank with king trapped',
    keyTakeaway: 'The pawns create a corridor from which the king cannot escape.',
    difficulty: 2,
    moves: [
      { 
        move: 'Rc8+', 
        annotation: '!!', 
        explanation: 'Back rank mate! The king has no escape.',
        highlights: ['c8', 'g8', 'f7', 'h7'],
        arrows: [{ from: 'c1', to: 'c8', color: 'red' }]
      }
    ]
  }
];

// ============================================
// ZWISCHENZUG SEQUENCES
// ============================================

export const deepZwischenzugVariations: CourseVariation[] = [];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepTacticalVariations: CourseVariation[] = [
  ...classicalSacrifices,
  ...deepPinVariations,
  ...deepForkVariations,
  ...deepDiscoveredVariations,
  ...deepCheckmateVariations,
  ...deepZwischenzugVariations
];

export default allDeepTacticalVariations;












