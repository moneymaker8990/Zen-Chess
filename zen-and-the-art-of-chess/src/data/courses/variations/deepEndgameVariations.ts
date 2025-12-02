// ============================================
// DEEP ENDGAME VARIATIONS
// Professional-grade endgame technique
// Each variation shows precise calculation
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// KING AND PAWN ENDGAMES - COMPLETE TECHNIQUE
// ============================================

export const deepKingPawnVariations: CourseVariation[] = [
  {
    id: 'kp-opposition-key-1',
    title: 'Opposition and Key Squares - Complete',
    fen: '8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',
    toMove: 'white',
    concept: 'Using opposition to reach key squares',
    keyTakeaway: 'If you control a key square (d5, e5, or f5), you promote.',
    difficulty: 3,
    moves: [
      { 
        move: 'Kf3', 
        annotation: '!', 
        explanation: 'Taking the opposition! Kings face each other with one square between.',
        arrows: [{ from: 'e3', to: 'f3', color: 'green' }],
        highlights: ['f3', 'e5']
      },
      { 
        move: 'Kf5', 
        explanation: 'Black tries to stop our advance.',
        alternatives: [
          { move: 'Kd5', evaluation: 'good', explanation: 'Ke3 and White still has the opposition.' }
        ]
      },
      { 
        move: 'e3', 
        annotation: '!', 
        explanation: 'Waiting move! Passing the move to Black.',
        arrows: [{ from: 'e2', to: 'e3', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Black steps back.' },
      { 
        move: 'Ke3', 
        annotation: '!', 
        explanation: 'Regaining the opposition.',
        arrows: [{ from: 'f3', to: 'e3', color: 'green' }]
      },
      { move: 'Kf5', explanation: 'Trying again.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'Outflanking! Now we threaten to reach e5.',
        arrows: [{ from: 'e3', to: 'd4', color: 'green' }],
        highlights: ['e5']
      },
      { move: 'Ke6', explanation: 'Defending.' },
      { 
        move: 'Ke4', 
        annotation: '!', 
        explanation: 'Opposition again!',
        arrows: [{ from: 'd4', to: 'e4', color: 'green' }]
      },
      { move: 'Kd6', explanation: 'Black must give way.' },
      { 
        move: 'Kf5!', 
        annotation: '!!', 
        explanation: 'Key square reached! Promotion is guaranteed.',
        arrows: [{ from: 'e4', to: 'f5', color: 'red' }],
        highlights: ['f5', 'e8']
      }
    ]
  },

  {
    id: 'kp-triangulation-1',
    title: 'Triangulation Technique',
    fen: '8/8/3pk3/8/3KP3/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Losing a tempo through triangulation',
    keyTakeaway: 'When you need to pass the move, make a triangle with your king.',
    difficulty: 4,
    moves: [
      { 
        move: 'Kc4', 
        annotation: '!', 
        explanation: 'Step 1 of the triangle.',
        arrows: [{ from: 'd4', to: 'c4', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Black mirrors.' },
      { 
        move: 'Kc5', 
        annotation: '!', 
        explanation: 'Step 2 - continuing the triangle.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }]
      },
      { move: 'Ke6', explanation: 'Black must retreat.' },
      { 
        move: 'Kd4!', 
        annotation: '!!', 
        explanation: 'Step 3 - back to d4 but now it\'s Black\'s move! Triangulation complete.',
        arrows: [{ from: 'c5', to: 'd4', color: 'red' }],
        highlights: ['d4']
      },
      { move: 'Ke5', explanation: 'Black returns.' },
      { 
        move: 'e5', 
        annotation: '!', 
        explanation: 'Now this tempo gain is decisive!',
        arrows: [{ from: 'e4', to: 'e5', color: 'green' }]
      },
      { move: 'Ke6', explanation: 'Blocking.' },
      { 
        move: 'Kc5', 
        explanation: 'Going around.',
        arrows: [{ from: 'd4', to: 'c5', color: 'green' }]
      },
      { move: 'Kxe5', explanation: 'Taking the pawn.' },
      { 
        move: 'Kxd6', 
        annotation: '!', 
        explanation: 'But White wins Black\'s pawn too - draw? No! Opposition!',
        arrows: [{ from: 'c5', to: 'd6', color: 'green' }]
      }
    ]
  },

  {
    id: 'kp-breakthrough-1',
    title: 'The Pawn Breakthrough',
    fen: '8/8/4k3/ppp5/PPP5/4K3/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Sacrificing pawns to create a passed pawn',
    keyTakeaway: 'Sometimes you must sacrifice pawns to create a passer.',
    difficulty: 4,
    moves: [
      { 
        move: 'b5!', 
        annotation: '!!', 
        explanation: 'The breakthrough sacrifice! Creating a passed pawn by force.',
        arrows: [{ from: 'b4', to: 'b5', color: 'red' }],
        highlights: ['b5']
      },
      { 
        move: 'cxb5', 
        explanation: 'Black takes.',
        alternatives: [
          { move: 'axb5', evaluation: 'bad', explanation: 'c5! and the c-pawn queens.' }
        ]
      },
      { 
        move: 'a5!', 
        annotation: '!!', 
        explanation: 'Second sacrifice!',
        arrows: [{ from: 'a4', to: 'a5', color: 'red' }]
      },
      { move: 'bxa5', explanation: 'Taking.' },
      { 
        move: 'c5!', 
        annotation: '!!', 
        explanation: 'The third pawn! Now it promotes.',
        arrows: [{ from: 'c4', to: 'c5', color: 'red' }],
        highlights: ['c5', 'c8']
      },
      { move: 'Kd7', explanation: 'Trying to catch it.' },
      { 
        move: 'c6+', 
        explanation: 'With check!',
        arrows: [{ from: 'c5', to: 'c6', color: 'green' }]
      },
      { move: 'Kc7', explanation: 'Blocking.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'Supporting the pawn.',
        arrows: [{ from: 'e3', to: 'd4', color: 'green' }]
      },
      { move: 'Kxc6', explanation: 'Taking.' },
      { 
        move: 'Kc4', 
        annotation: '!', 
        explanation: 'Now White wins the b-pawn and the a-pawn - winning!',
        arrows: [{ from: 'd4', to: 'c4', color: 'green' }],
        highlights: ['b5', 'a5']
      }
    ]
  },

  {
    id: 'kp-outside-passer-1',
    title: 'Outside Passed Pawn',
    fen: '8/pp3k2/8/P7/8/5P2/5K2/8 w - - 0 1',
    toMove: 'white',
    concept: 'The outside passed pawn as a decoy',
    keyTakeaway: 'An outside passer distracts the enemy king while you win on the other side.',
    difficulty: 3,
    moves: [
      { 
        move: 'a6!', 
        annotation: '!!', 
        explanation: 'The outside passer advances! Black must deal with it.',
        arrows: [{ from: 'a5', to: 'a6', color: 'green' }],
        highlights: ['a6', 'a8']
      },
      { 
        move: 'bxa6', 
        explanation: 'Black captures.',
        alternatives: [
          { move: 'Ke7', evaluation: 'bad', explanation: 'axb7 and the pawn promotes.' }
        ]
      },
      { 
        move: 'Ke3', 
        annotation: '!', 
        explanation: 'While Black\'s king is far, our king marches!',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }]
      },
      { move: 'Ke6', explanation: 'Coming back.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'Gaining ground.',
        arrows: [{ from: 'e3', to: 'd4', color: 'green' }]
      },
      { move: 'Kd6', explanation: 'Defending.' },
      { 
        move: 'f4', 
        explanation: 'Advancing the kingside pawn.',
        arrows: [{ from: 'f3', to: 'f4', color: 'green' }]
      },
      { move: 'a5', explanation: 'Trying to create counterplay.' },
      { 
        move: 'f5', 
        annotation: '!', 
        explanation: 'Pushing!',
        arrows: [{ from: 'f4', to: 'f5', color: 'green' }]
      },
      { move: 'a4', explanation: 'Advancing.' },
      { 
        move: 'f6!', 
        annotation: '!!', 
        explanation: 'The f-pawn promotes first!',
        arrows: [{ from: 'f5', to: 'f6', color: 'red' }],
        highlights: ['f6', 'f8']
      }
    ]
  }
];

// ============================================
// ROOK ENDGAMES - DEEP TECHNIQUE
// ============================================

export const deepRookEndgameVariations: CourseVariation[] = [
  {
    id: 'lucena-complete-1',
    title: 'Lucena Position - Building the Bridge',
    fen: '1K6/1P2k3/8/8/8/8/r7/4R3 w - - 0 1',
    toMove: 'white',
    concept: 'The Lucena winning technique',
    keyTakeaway: 'Build a bridge: Re4-Kc7-Re8-Rd4-Kd6.',
    difficulty: 4,
    moves: [
      { 
        move: 'Re4!', 
        annotation: '!!', 
        explanation: 'Step 1: Rook to the 4th rank - building the bridge!',
        arrows: [{ from: 'e1', to: 'e4', color: 'green' }],
        highlights: ['e4']
      },
      { move: 'Kd7', explanation: 'Black tries to stay close.' },
      { 
        move: 'Kc7', 
        annotation: '!', 
        explanation: 'Step 2: King out!',
        arrows: [{ from: 'b8', to: 'c7', color: 'green' }]
      },
      { move: 'Rc2+', explanation: 'Checking from behind.' },
      { 
        move: 'Kb6', 
        annotation: '!', 
        explanation: 'King escapes to the side.',
        arrows: [{ from: 'c7', to: 'b6', color: 'green' }]
      },
      { move: 'Rb2+', explanation: 'Continuing checks.' },
      { 
        move: 'Ka6', 
        explanation: 'Getting closer to the a-file.',
        arrows: [{ from: 'b6', to: 'a6', color: 'green' }]
      },
      { move: 'Ra2+', explanation: 'Still checking.' },
      { 
        move: 'Kb5', 
        explanation: 'The king continues.',
        arrows: [{ from: 'a6', to: 'b5', color: 'green' }]
      },
      { move: 'Rb2+', explanation: 'Check.' },
      { 
        move: 'Rb4!', 
        annotation: '!!', 
        explanation: 'The bridge is complete! Rook blocks the check.',
        arrows: [{ from: 'e4', to: 'b4', color: 'red' }],
        highlights: ['b4']
      }
    ]
  },

  {
    id: 'philidor-defense-1',
    title: 'Philidor Defense - Drawing Technique',
    fen: '8/5k2/R7/5PK1/8/8/r7/8 w - - 0 1',
    toMove: 'white',
    concept: 'The Philidor drawing technique',
    keyTakeaway: 'Keep the rook on the 6th rank until the pawn advances, then go to the back rank.',
    difficulty: 4,
    moves: [
      { 
        move: 'f6', 
        explanation: 'White pushes the pawn.',
        arrows: [{ from: 'f5', to: 'f6', color: 'green' }]
      },
      { 
        move: 'Ra1!', 
        annotation: '!!', 
        explanation: 'Now the back rank defense! Unlimited checks from behind.',
        arrows: [{ from: 'a2', to: 'a1', color: 'red' }],
        highlights: ['a1']
      },
      { move: 'Kh6', explanation: 'Trying to escape checks.' },
      { 
        move: 'Rh1+', 
        annotation: '!', 
        explanation: 'Checking!',
        arrows: [{ from: 'a1', to: 'h1', color: 'green' }]
      },
      { move: 'Kg6', explanation: 'Blocking with the king.' },
      { 
        move: 'Rg1+', 
        explanation: 'More checks!',
        arrows: [{ from: 'h1', to: 'g1', color: 'green' }]
      },
      { move: 'Kf5', explanation: 'Running.' },
      { 
        move: 'Rf1+', 
        explanation: 'Continuing the harassment.',
        arrows: [{ from: 'g1', to: 'f1', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Still trying.' },
      { 
        move: 'Re1+', 
        annotation: '!', 
        explanation: 'The checks never end! This is a draw.',
        arrows: [{ from: 'f1', to: 'e1', color: 'green' }],
        highlights: ['e1']
      }
    ]
  },

  {
    id: 'rook-activity-1',
    title: 'Rook Activity in Endgames',
    fen: '8/p4k2/1p6/1P2K3/8/8/r7/R7 w - - 0 1',
    toMove: 'white',
    concept: 'Active rook vs passive rook',
    keyTakeaway: 'An active rook is worth almost a full piece more than a passive one.',
    difficulty: 3,
    moves: [
      { 
        move: 'Ra6!', 
        annotation: '!!', 
        explanation: 'Attacking both pawns! Maximum activity.',
        arrows: [{ from: 'a1', to: 'a6', color: 'green' }],
        highlights: ['a7', 'b6']
      },
      { move: 'Rb2', explanation: 'Attacking our pawn.' },
      { 
        move: 'Rxb6', 
        annotation: '!', 
        explanation: 'Taking a pawn.',
        arrows: [{ from: 'a6', to: 'b6', color: 'green' }]
      },
      { move: 'Rxb5+', explanation: 'Trading pawns.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'Active king!',
        arrows: [{ from: 'e5', to: 'd4', color: 'green' }]
      },
      { move: 'Ra5', explanation: 'Defending.' },
      { 
        move: 'Kc4', 
        annotation: '!', 
        explanation: 'Continuing to advance.',
        arrows: [{ from: 'd4', to: 'c4', color: 'green' }]
      },
      { move: 'Ke7', explanation: 'Black\'s king tries to help.' },
      { 
        move: 'Kb4', 
        annotation: '!', 
        explanation: 'Attacking the rook.',
        arrows: [{ from: 'c4', to: 'b4', color: 'green' }]
      },
      { move: 'Ra1', explanation: 'Retreating.' },
      { 
        move: 'Rxa7+', 
        annotation: '!!', 
        explanation: 'Winning the pawn! King and rook coordinate.',
        arrows: [{ from: 'b6', to: 'a7', color: 'red' }],
        highlights: ['a7']
      }
    ]
  },

  {
    id: 'tarrasch-rule-1',
    title: 'Tarrasch Rule - Rook Behind Passed Pawn',
    fen: '8/8/8/3Pk3/8/8/1R6/3rK3 w - - 0 1',
    toMove: 'white',
    concept: 'Rooks belong behind passed pawns',
    keyTakeaway: 'Whether yours or enemy\'s - place rook behind!',
    difficulty: 3,
    moves: [
      { 
        move: 'd6', 
        annotation: '!', 
        explanation: 'The pawn advances!',
        arrows: [{ from: 'd5', to: 'd6', color: 'green' }],
        highlights: ['d6', 'd8']
      },
      { move: 'Ke6', explanation: 'Attacking the pawn.' },
      { 
        move: 'Rb8!', 
        annotation: '!!', 
        explanation: 'Tarrasch Rule! Rook behind the passed pawn.',
        arrows: [{ from: 'b2', to: 'b8', color: 'green' }],
        highlights: ['b8', 'd8']
      },
      { move: 'Kxd6', explanation: 'Taking the pawn.' },
      { 
        move: 'Rd8+!', 
        annotation: '!!', 
        explanation: 'Winning the Black rook!',
        arrows: [{ from: 'b8', to: 'd8', color: 'red' }],
        highlights: ['d8', 'd1']
      },
      { move: 'Kc5', explanation: 'Running.' },
      { 
        move: 'Rxd1', 
        annotation: '!', 
        explanation: 'We win the rook!',
        arrows: [{ from: 'd8', to: 'd1', color: 'green' }]
      }
    ]
  }
];

// ============================================
// MINOR PIECE ENDGAMES
// ============================================

export const deepMinorPieceVariations: CourseVariation[] = [
  {
    id: 'bishop-vs-knight-open-1',
    title: 'Bishop vs Knight - Open Position',
    fen: '8/pp3k2/2p5/3p4/3B4/8/PP3K2/4n3 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop dominates knight in open positions',
    keyTakeaway: 'In open positions, the bishop\'s long range wins.',
    difficulty: 4,
    moves: [
      { 
        move: 'Ke3', 
        annotation: '!', 
        explanation: 'Centralizing the king.',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }]
      },
      { move: 'Nc2+', explanation: 'Knight checks.' },
      { 
        move: 'Kd2', 
        annotation: '!', 
        explanation: 'Attacking the knight.',
        arrows: [{ from: 'e3', to: 'd2', color: 'green' }]
      },
      { move: 'Na3', explanation: 'Knight escapes.' },
      { 
        move: 'Bc5!', 
        annotation: '!!', 
        explanation: 'Cutting off the knight!',
        arrows: [{ from: 'd4', to: 'c5', color: 'red' }],
        highlights: ['a3', 'b4']
      },
      { move: 'Ke6', explanation: 'King comes to help.' },
      { 
        move: 'Kc3', 
        annotation: '!', 
        explanation: 'Attacking the knight.',
        arrows: [{ from: 'd2', to: 'c3', color: 'green' }]
      },
      { move: 'Nb5', explanation: 'Knight jumps.' },
      { 
        move: 'Bb4!', 
        annotation: '!!', 
        explanation: 'Restricting the knight further.',
        arrows: [{ from: 'c5', to: 'b4', color: 'green' }],
        highlights: ['a3', 'c7', 'd6']
      },
      { move: 'Kd6', explanation: 'Trying to help.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'Our king is better placed. Bishop dominates knight!',
        arrows: [{ from: 'c3', to: 'd4', color: 'green' }],
        highlights: ['d4', 'd5']
      }
    ]
  },

  {
    id: 'two-bishops-mate-1',
    title: 'Two Bishops Checkmate',
    fen: '8/8/8/4k3/8/4K3/8/2BB4 w - - 0 1',
    toMove: 'white',
    concept: 'Mating with two bishops',
    keyTakeaway: 'Drive the king to the corner with bishops and king.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bd2', 
        annotation: '!', 
        explanation: 'Preparing to create a diagonal barrier.',
        arrows: [{ from: 'c1', to: 'd2', color: 'green' }]
      },
      { move: 'Kd5', explanation: 'King stays central.' },
      { 
        move: 'Bc3', 
        annotation: '!', 
        explanation: 'First diagonal barrier established.',
        arrows: [{ from: 'd2', to: 'c3', color: 'green' }],
        highlights: ['a1', 'h8']
      },
      { move: 'Ke5', explanation: 'Black stays in the center.' },
      { 
        move: 'Ke2', 
        explanation: 'King supports the bishops.',
        arrows: [{ from: 'e3', to: 'e2', color: 'green' }]
      },
      { move: 'Kf5', explanation: 'Running.' },
      { 
        move: 'Bd3+', 
        annotation: '!', 
        explanation: 'Pushing the king with check.',
        arrows: [{ from: 'd1', to: 'd3', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Back to center.' },
      { 
        move: 'Bd4+', 
        annotation: '!', 
        explanation: 'Another push!',
        arrows: [{ from: 'c3', to: 'd4', color: 'green' }]
      },
      { move: 'Kf4', explanation: 'King moves.' },
      { 
        move: 'Kf2!', 
        annotation: '!!', 
        explanation: 'King coordinates - now Black is being pushed to the edge.',
        arrows: [{ from: 'e2', to: 'f2', color: 'green' }]
      }
    ]
  },

  {
    id: 'opposite-bishops-1',
    title: 'Opposite Colored Bishops - Drawing',
    fen: '8/p4k2/1p3p2/8/1P3P2/P4K2/4B3/4b3 w - - 0 1',
    toMove: 'white',
    concept: 'Opposite colored bishops tend to draw',
    keyTakeaway: 'With opposite bishops, the defender can blockade on opposite color squares.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bb5', 
        annotation: '!', 
        explanation: 'Trying to restrict Black\'s king.',
        arrows: [{ from: 'e2', to: 'b5', color: 'green' }]
      },
      { move: 'Ke6', explanation: 'King centralizes.' },
      { 
        move: 'Ke4', 
        annotation: '!', 
        explanation: 'Our king also centralizes.',
        arrows: [{ from: 'f3', to: 'e4', color: 'green' }]
      },
      { move: 'Bb4!', explanation: 'Black\'s bishop controls the light squares from dark!' },
      { 
        move: 'f5+', 
        annotation: '!', 
        explanation: 'Trying to advance.',
        arrows: [{ from: 'f4', to: 'f5', color: 'green' }]
      },
      { move: 'Kf7', explanation: 'Blocking.' },
      { 
        move: 'Kd5', 
        annotation: '!', 
        explanation: 'King penetrates.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }]
      },
      { move: 'Bc3', explanation: 'Blockading the a-pawn.' },
      { 
        move: 'Kc6', 
        annotation: '!', 
        explanation: 'Attacking b6.',
        arrows: [{ from: 'd5', to: 'c6', color: 'green' }],
        highlights: ['b6']
      },
      { move: 'Bb2', explanation: 'Still blockading.' },
      { 
        move: 'Kxb6', 
        explanation: 'But Black\'s bishop covers the queening square - likely draw!',
        arrows: [{ from: 'c6', to: 'b6', color: 'green' }]
      }
    ]
  }
];

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
  },

  {
    id: 'queen-centralization-1',
    title: 'Queen Centralization and Perpetual',
    fen: '8/8/4q3/3k4/8/8/4K3/4Q3 w - - 0 1',
    toMove: 'white',
    concept: 'Using the queen\'s power to give perpetual check',
    keyTakeaway: 'A centralized queen can often force perpetual check.',
    difficulty: 3,
    moves: [
      { 
        move: 'Qd1+', 
        annotation: '!', 
        explanation: 'Check!',
        arrows: [{ from: 'e1', to: 'd1', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Running to the center.' },
      { 
        move: 'Qg1+', 
        annotation: '!', 
        explanation: 'Check from the other side!',
        arrows: [{ from: 'd1', to: 'g1', color: 'green' }]
      },
      { move: 'Kf5', explanation: 'Escaping.' },
      { 
        move: 'Qf1+', 
        annotation: '!', 
        explanation: 'Continuing the checks.',
        arrows: [{ from: 'g1', to: 'f1', color: 'green' }]
      },
      { move: 'Ke5', explanation: 'Back.' },
      { 
        move: 'Qb1+', 
        annotation: '!', 
        explanation: 'Changing diagonal.',
        arrows: [{ from: 'f1', to: 'b1', color: 'green' }]
      },
      { move: 'Kf6', explanation: 'Trying to escape.' },
      { 
        move: 'Qf1+', 
        annotation: '!', 
        explanation: 'The queen keeps giving checks - perpetual!',
        arrows: [{ from: 'b1', to: 'f1', color: 'green' }]
      }
    ]
  }
];

// ============================================
// PRACTICAL ENDGAMES
// ============================================

export const deepPracticalEndgameVariations: CourseVariation[] = [
  {
    id: 'converting-extra-pawn-1',
    title: 'Converting an Extra Pawn',
    fen: '8/pp3k2/8/3P4/8/5P2/PP3K2/8 w - - 0 1',
    toMove: 'white',
    concept: 'Converting a material advantage',
    keyTakeaway: 'Advance your pawns, activate your king, create a passed pawn.',
    difficulty: 3,
    moves: [
      { 
        move: 'Ke3', 
        annotation: '!', 
        explanation: 'Centralizing the king first!',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }]
      },
      { move: 'Ke7', explanation: 'Black defends.' },
      { 
        move: 'Kd4', 
        annotation: '!', 
        explanation: 'King to the center.',
        arrows: [{ from: 'e3', to: 'd4', color: 'green' }]
      },
      { move: 'Kd7', explanation: 'Blocking.' },
      { 
        move: 'f4', 
        annotation: '!', 
        explanation: 'Creating a passed pawn possibility.',
        arrows: [{ from: 'f3', to: 'f4', color: 'green' }]
      },
      { move: 'Kd6', explanation: 'Attacking d5.' },
      { 
        move: 'Kc4', 
        annotation: '!', 
        explanation: 'Defending the pawn while preparing to advance.',
        arrows: [{ from: 'd4', to: 'c4', color: 'green' }]
      },
      { move: 'Kd7', explanation: 'Waiting.' },
      { 
        move: 'b4', 
        annotation: '!', 
        explanation: 'Creating threats on the queenside.',
        arrows: [{ from: 'b2', to: 'b4', color: 'green' }]
      },
      { move: 'Kd6', explanation: 'Trying to blockade.' },
      { 
        move: 'd6!', 
        annotation: '!!', 
        explanation: 'Breakthrough! The pawn advances with tempo.',
        arrows: [{ from: 'd5', to: 'd6', color: 'red' }],
        highlights: ['d6', 'd8']
      }
    ]
  },

  {
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
  ...deepPracticalEndgameVariations,
];

export default allDeepEndgameVariations;

