// ============================================
// DEEP POSITIONAL VARIATIONS
// Professional-grade strategic sequences
// Each variation demonstrates complete plans
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// OUTPOST MASTERY - COMPLETE PLANS
// ============================================

export const deepOutpostVariations: CourseVariation[] = [
  {
    id: 'outpost-creation-1',
    title: 'Creating and Occupying an Outpost',
    fen: 'r2q1rk1/pp1bppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Systematic outpost creation through pawn exchanges',
    keyTakeaway: 'First create the outpost, then transfer a piece to occupy it.',
    difficulty: 4,
    moves: [
      { 
        move: 'Be2', 
        annotation: '!', 
        explanation: 'Developing and preparing to castle. The plan is Nd5.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }]
      },
      { move: 'Rc8', explanation: 'Black develops the rook.' },
      { 
        move: 'O-O', 
        annotation: '!', 
        explanation: 'King to safety before beginning the plan.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'Ne5', explanation: 'Black occupies e5.' },
      { 
        move: 'Nxe5', 
        explanation: 'Trading to weaken d6.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }],
        alternatives: [
          { move: 'Rad1', evaluation: 'good', explanation: 'Also reasonable, but the trade is thematic.' }
        ]
      },
      { move: 'Nxe5', explanation: 'Recapturing.' },
      { 
        move: 'f4', 
        annotation: '!', 
        explanation: 'Kicking the knight and gaining space.',
        arrows: [{ from: 'f3', to: 'f4', color: 'green' }],
        highlights: ['e5']
      },
      { move: 'Nc6', explanation: 'Knight retreats.' },
      { 
        move: 'Bf3', 
        annotation: '!', 
        explanation: 'Preparing Nd5, the key outpost.',
        arrows: [{ from: 'e2', to: 'f3', color: 'green' }],
        highlights: ['d5']
      },
      { move: 'Be6', explanation: 'Trying to prevent Nd5.' },
      { 
        move: 'Nd5!', 
        annotation: '!!', 
        explanation: 'The dream! Knight on the ultimate outpost.',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
        highlights: ['d5']
      },
      { move: 'Bxd5', explanation: 'Must trade.' },
      { 
        move: 'exd5', 
        annotation: '!', 
        explanation: 'Now White has a protected passed pawn and pressure on e7!',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d5', 'e7']
      }
    ]
  },

  {
    id: 'outpost-knight-king-attack',
    title: 'Outpost Knight Leading to King Attack',
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Using an outpost as a launching pad for attack',
    keyTakeaway: 'A knight on an outpost near the enemy king is worth a rook!',
    difficulty: 5,
    moves: [
      { 
        move: 'h3', 
        annotation: '!', 
        explanation: 'Prophylaxis! Preventing ...Bg4 before starting our plan.',
        arrows: [{ from: 'h2', to: 'h3', color: 'green' }]
      },
      { move: 'e5', explanation: 'Black fights for the center.' },
      { 
        move: 'dxe5', 
        explanation: 'Opening the d-file.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { 
        move: 'Qxd8', 
        explanation: 'Simplifying to reach a good endgame.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }]
      },
      { move: 'Rxd8', explanation: 'Taking back.' },
      { 
        move: 'Nd5!', 
        annotation: '!!', 
        explanation: 'The knight reaches its dream square!',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
        highlights: ['d5']
      },
      { move: 'Nxd5', explanation: 'Must trade.' },
      { 
        move: 'cxd5', 
        annotation: '!', 
        explanation: 'The c-pawn becomes a strong passer.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      { move: 'Nd7', explanation: 'Knight regroups.' },
      { 
        move: 'Nd2', 
        annotation: '!', 
        explanation: 'Heading for c4, then d6 - another outpost!',
        arrows: [{ from: 'f3', to: 'd2', color: 'green' }, { from: 'd2', to: 'c4', color: 'yellow' }, { from: 'c4', to: 'd6', color: 'yellow' }],
        highlights: ['c4', 'd6']
      }
    ]
  },

  {
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

export const deepWeakPawnVariations: CourseVariation[] = [
  {
    id: 'iqp-attack-1',
    title: 'IQP - Using It For Attack',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Using the isolated queen pawn for active piece play',
    keyTakeaway: 'The IQP gives active pieces and attacking chances - use them before the endgame!',
    difficulty: 4,
    moves: [
      { 
        move: 'Qe2', 
        annotation: '!', 
        explanation: 'Connecting rooks and preparing the minority attack.',
        arrows: [{ from: 'd1', to: 'e2', color: 'green' }]
      },
      { move: 'b6', explanation: 'Preparing Bb7.' },
      { 
        move: 'Rd1', 
        annotation: '!', 
        explanation: 'Rook behind the IQP, ready to support d5.',
        arrows: [{ from: 'f1', to: 'd1', color: 'green' }],
        highlights: ['d4', 'd5']
      },
      { move: 'Bb7', explanation: 'Developing.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Pinning and creating tension.',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'Rc8', explanation: 'Getting out of the pin.' },
      { 
        move: 'Ne5!', 
        annotation: '!!', 
        explanation: 'The thematic IQP move! Knight goes to the strong square.',
        arrows: [{ from: 'f3', to: 'e5', color: 'red' }],
        highlights: ['e5']
      },
      { move: 'Nxe5', explanation: 'Must trade.' },
      { 
        move: 'Bxe5', 
        explanation: 'Recapturing with the bishop, maintaining pressure.',
        arrows: [{ from: 'g5', to: 'e5', color: 'green' }]
      },
      { move: 'Qd6', explanation: 'Defending.' },
      { 
        move: 'Bb1!', 
        annotation: '!', 
        explanation: 'The Alekhine gun! Queen, bishop, and rook all on the same diagonal.',
        arrows: [{ from: 'd3', to: 'b1', color: 'green' }],
        highlights: ['b1', 'h7']
      }
    ]
  },

  {
    id: 'iqp-blockade-1',
    title: 'IQP - Blockading Strategy',
    fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 b - - 0 10',
    toMove: 'black',
    concept: 'Playing against the IQP through blockade',
    keyTakeaway: 'Block the IQP, exchange pieces, reach an endgame where it\'s a weakness.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bf4', 
        annotation: '!', 
        explanation: 'Exchanging pieces to reduce White\'s attacking potential.',
        arrows: [{ from: 'd6', to: 'f4', color: 'green' }]
      },
      { move: 'exf4', explanation: 'Recapturing.' },
      { 
        move: 'Nd7', 
        annotation: '!', 
        explanation: 'Preparing ...Nf6 to blockade d5.',
        arrows: [{ from: 'c6', to: 'd7', color: 'green' }]
      },
      { move: 'Qe2', explanation: 'White develops.' },
      { 
        move: 'Nf6', 
        annotation: '!', 
        explanation: 'Double attack preparation.',
        arrows: [{ from: 'f6', to: 'f6', color: 'green' }]
      },
      { move: 'Rfe1', explanation: 'Rook to the open file.' },
      { 
        move: 'Rc8', 
        annotation: '!', 
        explanation: 'Contesting the c-file.',
        arrows: [{ from: 'a8', to: 'c8', color: 'green' }]
      },
      { move: 'Rad1', explanation: 'Doubling rooks.' },
      { 
        move: 'Nd5!', 
        annotation: '!!', 
        explanation: 'The blockade is complete! Knight on d5 is untouchable.',
        arrows: [{ from: 'f6', to: 'd5', color: 'red' }],
        highlights: ['d5', 'd4']
      },
      { move: 'Bxd5', explanation: 'White must trade.' },
      { 
        move: 'Qxd5', 
        annotation: '!', 
        explanation: 'Queen blockades! Now the d4 pawn is permanently weak.',
        arrows: [{ from: 'f6', to: 'd5', color: 'green' }],
        highlights: ['d5', 'd4']
      }
    ]
  },

  {
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
  },

  {
    id: 'doubled-pawns-1',
    title: 'Exploiting Doubled Pawns',
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
    toMove: 'white',
    concept: 'Creating and exploiting doubled pawns',
    keyTakeaway: 'Doubled pawns create weak squares and targets.',
    difficulty: 3,
    moves: [
      { 
        move: 'Bd3', 
        annotation: '!', 
        explanation: 'Developing and preparing to castle.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }]
      },
      { move: 'Bxc3+', explanation: 'Creating doubled pawns.' },
      { 
        move: 'bxc3', 
        explanation: 'Accepting the doubled pawns but getting the bishop pair.',
        arrows: [{ from: 'b2', to: 'c3', color: 'green' }],
        highlights: ['c3', 'c4']
      },
      { move: 'O-O', explanation: 'Castling.' },
      { 
        move: 'O-O', 
        explanation: 'Getting the king safe.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'dxc4', explanation: 'Taking the pawn.' },
      { 
        move: 'Bxc4', 
        annotation: '!', 
        explanation: 'Recapturing with the bishop, keeping the center.',
        arrows: [{ from: 'd3', to: 'c4', color: 'green' }]
      },
      { move: 'Qd5', explanation: 'Attacking the bishop.' },
      { 
        move: 'Qe2', 
        annotation: '!', 
        explanation: 'Defending and preparing Rd1.',
        arrows: [{ from: 'd1', to: 'e2', color: 'green' }]
      },
      { move: 'Qxc4', explanation: 'Taking the pawn.' },
      { 
        move: 'Qxc4', 
        explanation: 'Equal material but White has the bishop pair and active pieces!',
        arrows: [{ from: 'e2', to: 'c4', color: 'green' }]
      }
    ]
  }
];

// ============================================
// PAWN STRUCTURE TRANSFORMATIONS
// ============================================

export const deepPawnStructureVariations: CourseVariation[] = [
  {
    id: 'carlsbad-minority-1',
    title: 'Carlsbad Structure - Minority Attack',
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'The classic minority attack in the Carlsbad structure',
    keyTakeaway: 'b4-b5 creates a weak pawn on c6 or an isolated pawn on d5.',
    difficulty: 4,
    moves: [
      { 
        move: 'b4', 
        annotation: '!', 
        explanation: 'Starting the minority attack! The b-pawn will march to b5.',
        arrows: [{ from: 'b2', to: 'b4', color: 'green' }, { from: 'b4', to: 'b5', color: 'yellow' }],
        highlights: ['b4', 'b5', 'c6']
      },
      { move: 'a6', explanation: 'Preparing to meet b5.' },
      { 
        move: 'Rb1', 
        annotation: '!', 
        explanation: 'Supporting the b-pawn advance.',
        arrows: [{ from: 'a1', to: 'b1', color: 'green' }]
      },
      { move: 'Re8', explanation: 'Centralizing.' },
      { 
        move: 'a4', 
        annotation: '!', 
        explanation: 'Supporting b5.',
        arrows: [{ from: 'a2', to: 'a4', color: 'green' }]
      },
      { move: 'Bf8', explanation: 'Regrouping.' },
      { 
        move: 'b5!', 
        annotation: '!!', 
        explanation: 'The break! Now Black must decide how to recapture.',
        arrows: [{ from: 'b4', to: 'b5', color: 'red' }],
        highlights: ['b5', 'c6']
      },
      { 
        move: 'axb5', 
        explanation: 'One option.',
        alternatives: [
          { move: 'cxb5', evaluation: 'equal', explanation: 'Creates an isolated d5 pawn instead.' }
        ]
      },
      { 
        move: 'axb5', 
        explanation: 'Recapturing, opening the a-file.',
        arrows: [{ from: 'a4', to: 'b5', color: 'green' }]
      },
      { move: 'cxb5', explanation: 'Taking.' },
      { 
        move: 'Nxb5', 
        annotation: '!', 
        explanation: 'Knight to the outpost on b5, pressuring d6 and c7!',
        arrows: [{ from: 'c3', to: 'b5', color: 'red' }],
        highlights: ['d6', 'c7']
      }
    ]
  },

  {
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

export const deepCoordinationVariations: CourseVariation[] = [
  {
    id: 'rook-lift-1',
    title: 'The Rook Lift Attack',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Lifting the rook to the third rank for attack',
    keyTakeaway: 'Rooks can swing from the rook file to join a kingside attack.',
    difficulty: 4,
    moves: [
      { 
        move: 'g4', 
        annotation: '!', 
        explanation: 'Starting the kingside attack!',
        arrows: [{ from: 'g2', to: 'g4', color: 'green' }]
      },
      { move: 'Nc5', explanation: 'Attacking e4.' },
      { 
        move: 'g5', 
        annotation: '!', 
        explanation: 'Pushing the knight away.',
        arrows: [{ from: 'g4', to: 'g5', color: 'green' }]
      },
      { move: 'Nh5', explanation: 'Knight goes to h5.' },
      { 
        move: 'Rg1', 
        annotation: '!', 
        explanation: 'Preparing to lift the rook.',
        arrows: [{ from: 'h1', to: 'g1', color: 'green' }]
      },
      { move: 'a6', explanation: 'Creating luft.' },
      { 
        move: 'Rg3!', 
        annotation: '!!', 
        explanation: 'The rook lift! Now Rh3 or Qh6 is coming.',
        arrows: [{ from: 'g1', to: 'g3', color: 'red' }, { from: 'g3', to: 'h3', color: 'yellow' }],
        highlights: ['h3', 'h7']
      },
      { move: 'Ne6', explanation: 'Trying to get counterplay.' },
      { 
        move: 'Nf5!', 
        annotation: '!!', 
        explanation: 'Sacrificing the exchange for a crushing attack!',
        arrows: [{ from: 'd4', to: 'f5', color: 'red' }],
        highlights: ['f5', 'g7', 'h6']
      },
      { move: 'Nxf5', explanation: 'Must take.' },
      { 
        move: 'exf5', 
        annotation: '!', 
        explanation: 'The e-file opens and the attack is overwhelming.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }]
      }
    ]
  },

  {
    id: 'queen-knight-attack-1',
    title: 'Queen + Knight Attacking Duo',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Queen and knight coordinate for attack',
    keyTakeaway: 'Queen + Knight is the best attacking combination!',
    difficulty: 4,
    moves: [
      { 
        move: 'O-O-O', 
        annotation: '!', 
        explanation: 'Castling queenside to launch a kingside attack.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }]
      },
      { move: 'Rc8', explanation: 'Putting rook on the open file.' },
      { 
        move: 'h4', 
        annotation: '!', 
        explanation: 'Starting the pawn storm.',
        arrows: [{ from: 'h2', to: 'h4', color: 'green' }]
      },
      { move: 'Ne5', explanation: 'Centralizing.' },
      { 
        move: 'h5!', 
        annotation: '!!', 
        explanation: 'Breaking open the kingside.',
        arrows: [{ from: 'h4', to: 'h5', color: 'red' }]
      },
      { move: 'Nxc3', explanation: 'Taking the knight.' },
      { 
        move: 'Qxc3', 
        annotation: '!', 
        explanation: 'Queen recaptures, eyeing c7 and the long diagonal.',
        arrows: [{ from: 'd2', to: 'c3', color: 'green' }],
        highlights: ['c7', 'g7']
      },
      { move: 'gxh5', explanation: 'Taking.' },
      { 
        move: 'Nf5!', 
        annotation: '!!', 
        explanation: 'The knight and queen coordinate perfectly!',
        arrows: [{ from: 'd4', to: 'f5', color: 'red' }],
        highlights: ['f5', 'g7', 'h6']
      },
      { move: 'Bxf5', explanation: 'Must take.' },
      { 
        move: 'exf5', 
        annotation: '!', 
        explanation: 'Opening the e-file while keeping pressure.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }]
      }
    ]
  }
];

// ============================================
// SPACE ADVANTAGE
// ============================================

export const deepSpaceVariations: CourseVariation[] = [
  {
    id: 'space-squeeze-1',
    title: 'Converting Space Advantage',
    fen: 'r1bqk2r/pp1nbppp/2p1pn2/3pP3/3P4/2N1BN2/PPP2PPP/R2QKB1R w KQkq - 0 7',
    toMove: 'white',
    concept: 'Using space to restrict and then attack',
    keyTakeaway: 'Space restricts enemy pieces. Then attack!',
    difficulty: 4,
    moves: [
      { 
        move: 'Bd3', 
        annotation: '!', 
        explanation: 'Active development, eyeing h7.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }],
        highlights: ['h7']
      },
      { move: 'c5', explanation: 'Challenging the center.' },
      { 
        move: 'O-O', 
        annotation: '!', 
        explanation: 'King to safety.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'cxd4', explanation: 'Trading.' },
      { 
        move: 'Bxd4', 
        explanation: 'Recapturing actively.',
        arrows: [{ from: 'e3', to: 'd4', color: 'green' }]
      },
      { move: 'Nc5', explanation: 'Attacking the bishop.' },
      { 
        move: 'Bc2', 
        annotation: '!', 
        explanation: 'Retreating but maintaining the diagonal.',
        arrows: [{ from: 'd3', to: 'c2', color: 'green' }]
      },
      { move: 'Qc7', explanation: 'Connecting.' },
      { 
        move: 'Qd2', 
        annotation: '!', 
        explanation: 'Preparing Bh6 or Rad1.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }]
      },
      { move: 'Be7', explanation: 'Developing.' },
      { 
        move: 'Bh6!', 
        annotation: '!!', 
        explanation: 'Trading the dark-squared bishop to weaken the king.',
        arrows: [{ from: 'd4', to: 'h6', color: 'red' }],
        highlights: ['g7']
      }
    ]
  }
];

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
  ...deepProphylaxisVariations,
];

export default allDeepPositionalVariations;












