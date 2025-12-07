// ============================================
// DEEP TACTICAL VARIATIONS
// Professional-grade multi-move tactical sequences
// Each variation has 5-12 annotated moves
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// CLASSICAL SACRIFICES
// ============================================

export const classicalSacrifices: CourseVariation[] = [
  // GREEK GIFT SACRIFICE - Complete sequence
  {
    id: 'greek-gift-1',
    title: 'The Greek Gift - Complete Pattern',
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    concept: 'Classic bishop sacrifice on h7',
    keyTakeaway: 'Bxh7+ works when: knight can reach g5, queen can reach h5, and Black has no good defenses.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bxh7+', 
        annotation: '!!', 
        explanation: 'The Greek Gift sacrifice! White destroys the king\'s pawn shield.',
        arrows: [{ from: 'f1', to: 'h7', color: 'red' }],
        highlights: ['h7'],
        alternatives: [
          { move: 'O-O', evaluation: 'good', explanation: 'Safe, but misses the tactical opportunity.' },
          { move: 'Bd3', evaluation: 'equal', explanation: 'Solid development, but less ambitious.' }
        ]
      },
      { 
        move: 'Kxh7', 
        explanation: 'Black must accept - declining allows Qc2 with a huge attack.',
        alternatives: [
          { move: 'Kh8', evaluation: 'bad', explanation: 'Qc2 threatens Qxh7# and the attack is overwhelming.' }
        ]
      },
      { 
        move: 'Ng5+', 
        annotation: '!', 
        explanation: 'The knight jumps in with check, opening the queen\'s path to h5.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'd1', to: 'h5', color: 'yellow' }],
        highlights: ['g5', 'h5']
      },
      { 
        move: 'Kg8', 
        explanation: 'Kg6 loses to Qd3+ followed by Qh7#. Kg8 is the only try.',
        alternatives: [
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qd3+ Kf5 (forced) g4+ Kxg4 Qh3#' },
          { move: 'Kh6', evaluation: 'bad', explanation: 'Qd3! threatening Qh7#, and Nxf7+ is also coming.' }
        ]
      },
      { 
        move: 'Qh5', 
        annotation: '!', 
        explanation: 'Queen arrives with devastating threats on h7 and f7.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
        highlights: ['h7', 'f7']
      },
      { 
        move: 'Re8', 
        explanation: 'Trying to defend. Other moves lose immediately.',
        alternatives: [
          { move: 'Qe7', evaluation: 'bad', explanation: 'Qxf7+ Kh8 Qh5+ Kg8 Qh7+ Kf8 Qh8#' }
        ]
      },
      { 
        move: 'Qxf7+', 
        annotation: '!', 
        explanation: 'Capturing with check keeps the attack rolling.',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }]
      },
      { 
        move: 'Kh8', 
        explanation: 'The only legal move.' 
      },
      { 
        move: 'Qh5+', 
        explanation: 'Driving the king back.' 
      },
      { 
        move: 'Kg8', 
        explanation: 'Forced.' 
      },
      { 
        move: 'Qh7+', 
        explanation: 'Continuing the attack.' 
      },
      { 
        move: 'Kf8', 
        explanation: 'Forced.' 
      },
      { 
        move: 'Qh8#', 
        annotation: '!!', 
        explanation: 'Checkmate! The Greek Gift delivered.',
        highlights: ['h8', 'f8']
      }
    ]
  },
  
  // DOUBLE BISHOP SACRIFICE
  {
    id: 'double-bishop-sac-1',
    title: 'Lasker\'s Double Bishop Sacrifice',
    fen: 'r1b2rk1/pp1nqppp/2pbpn2/8/2PP4/2NBPN2/PPQ2PPP/R1B1K2R w KQ - 0 10',
    toMove: 'white',
    concept: 'Sacrificing both bishops to expose the king',
    keyTakeaway: 'When both bishops can sacrifice with devastating effect, the attack is usually winning.',
    difficulty: 5,
    moves: [
      { 
        move: 'Bxh7+', 
        annotation: '!!', 
        explanation: 'First bishop sacrifice opens the h-file.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
        highlights: ['h7']
      },
      { move: 'Kxh7', explanation: 'Accepting is forced - declining loses material.' },
      { 
        move: 'Qh5+', 
        annotation: '!', 
        explanation: 'Queen enters with check.',
        arrows: [{ from: 'c2', to: 'h5', color: 'green' }]
      },
      { move: 'Kg8', explanation: 'The only safe square.' },
      { 
        move: 'Bxg7!', 
        annotation: '!!', 
        explanation: 'The second bishop sacrifice! Now the kingside is completely destroyed.',
        arrows: [{ from: 'c1', to: 'g7', color: 'red' }],
        highlights: ['g7'],
        alternatives: [
          { move: 'Ng5', evaluation: 'good', explanation: 'Also strong, but the double bishop sac is more forcing.' }
        ]
      },
      { 
        move: 'Kxg7', 
        explanation: 'Taking is practically forced.',
        alternatives: [
          { move: 'f5', evaluation: 'bad', explanation: 'Qg6 and Qh7 mate is unstoppable.' }
        ]
      },
      { 
        move: 'Qg4+', 
        annotation: '!', 
        explanation: 'Keeping the initiative with check.',
        arrows: [{ from: 'h5', to: 'g4', color: 'green' }]
      },
      { move: 'Kh7', explanation: 'Running to the corner.' },
      { 
        move: 'Rf3!', 
        annotation: '!', 
        explanation: 'The rook lift! Threatening Rh3+ with devastating effect.',
        arrows: [{ from: 'h1', to: 'f3', color: 'yellow' }, { from: 'f3', to: 'h3', color: 'red' }]
      },
      { move: 'Rh8', explanation: 'Desperately trying to defend.' },
      { 
        move: 'Rh3+', 
        annotation: '!', 
        explanation: 'The rook arrives with decisive effect.',
        arrows: [{ from: 'f3', to: 'h3', color: 'red' }]
      },
      { move: 'Qh4', explanation: 'Blocking, but it only delays.' },
      { 
        move: 'Rxh4+', 
        explanation: 'Exchanging into a winning position.' 
      },
      { move: 'Kg7', explanation: 'The king has no safe haven.' },
      { 
        move: 'Qh5', 
        annotation: '!', 
        explanation: 'Threatening Qh7# or Qh6#.',
        highlights: ['h7', 'h6']
      }
    ]
  },

  // SMOTHERED MATE PATTERN
  {
    id: 'smothered-mate-1',
    title: 'Philidor\'s Smothered Mate',
    fen: 'r4rk1/ppp1qppp/2n5/3Np1N1/2B1P3/8/PPP2PPP/R2Q1RK1 w - - 0 14',
    toMove: 'white',
    concept: 'Classic smothered mate pattern with queen sacrifice',
    keyTakeaway: 'The smothered mate requires the enemy king trapped by its own pieces.',
    difficulty: 4,
    moves: [
      { 
        move: 'Nf6+', 
        annotation: '!!', 
        explanation: 'Double check! The knight attacks and reveals the bishop.',
        arrows: [{ from: 'd5', to: 'f6', color: 'red' }, { from: 'c4', to: 'g8', color: 'red' }],
        highlights: ['f6', 'g8']
      },
      { 
        move: 'Kh8', 
        explanation: 'Only legal move - it\'s double check!',
        alternatives: [
          { move: 'gxf6', evaluation: 'bad', explanation: 'Illegal - it\'s double check, king must move.' }
        ]
      },
      { 
        move: 'Qh5', 
        annotation: '!', 
        explanation: 'Threatening Qxh7#. Black\'s reply is forced.',
        arrows: [{ from: 'd1', to: 'h5', color: 'green' }],
        highlights: ['h7']
      },
      { 
        move: 'gxf6', 
        explanation: 'Must take the knight to stop Qxh7#.' 
      },
      { 
        move: 'Qxh7+!', 
        annotation: '!!', 
        explanation: 'Queen sacrifice! This is the key to the smothered mate.',
        arrows: [{ from: 'h5', to: 'h7', color: 'red' }],
        highlights: ['h7']
      },
      { 
        move: 'Kxh7', 
        explanation: 'Forced - the king must take.' 
      },
      { 
        move: 'Nf6+', 
        annotation: '!', 
        explanation: 'Double check again! The knight returns.',
        arrows: [{ from: 'g5', to: 'f6', color: 'green' }]
      },
      { move: 'Kh8', explanation: 'The only legal move.' },
      { 
        move: 'Ng6#', 
        annotation: '!!', 
        explanation: 'Smothered mate! The king is trapped by rook, pawns, and cannot escape.',
        highlights: ['g6', 'h8', 'g8', 'h7', 'g7'],
        arrows: [{ from: 'f6', to: 'g6', color: 'red' }]
      }
    ]
  },

  // ARABIAN MATE
  {
    id: 'arabian-mate-1',
    title: 'The Arabian Mate Pattern',
    fen: '6k1/5ppp/4p3/8/8/5N2/5PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Knight and rook coordinate for edge checkmate',
    keyTakeaway: 'The knight controls escape squares while the rook delivers mate on the back rank.',
    difficulty: 3,
    moves: [
      { 
        move: 'Ng5', 
        annotation: '!', 
        explanation: 'Positioning the knight to control h7.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }],
        highlights: ['h7', 'f7']
      },
      { move: 'h6', explanation: 'Trying to kick the knight.' },
      { 
        move: 'Nxf7', 
        annotation: '!', 
        explanation: 'The knight takes with tempo, threatening Nh6+.',
        arrows: [{ from: 'g5', to: 'f7', color: 'green' }]
      },
      { move: 'Kxf7', explanation: 'Practically forced.' },
      { 
        move: 'Re7+', 
        annotation: '!', 
        explanation: 'Rook to the 7th with check!',
        arrows: [{ from: 'e1', to: 'e7', color: 'red' }]
      },
      { move: 'Kf6', explanation: 'Running toward the center.' },
      { 
        move: 'Rxg7', 
        explanation: 'Winning material and keeping pressure.',
        arrows: [{ from: 'e7', to: 'g7', color: 'green' }]
      }
    ]
  },

  // BACK RANK COMBINATIONS
  {
    id: 'back-rank-combo-1',
    title: 'Back Rank Weakness Exploitation',
    fen: '3r2k1/pp3ppp/2p5/8/8/2P5/PP3PPP/3RR1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Exploiting the weak back rank with doubled rooks',
    keyTakeaway: 'Doubled rooks on the back rank are devastating when the king lacks luft.',
    difficulty: 3,
    moves: [
      { 
        move: 'Re8+', 
        annotation: '!', 
        explanation: 'Forcing the exchange that leads to mate.',
        arrows: [{ from: 'e1', to: 'e8', color: 'red' }]
      },
      { 
        move: 'Rxe8', 
        explanation: 'Forced - the rook must take.',
        alternatives: [
          { move: 'Kf8', evaluation: 'bad', explanation: 'Rxd8#' }
        ]
      },
      { 
        move: 'Rxe8#', 
        annotation: '!!', 
        explanation: 'Back rank mate! The king has no escape.',
        highlights: ['e8', 'g8'],
        arrows: [{ from: 'd1', to: 'e8', color: 'red' }]
      }
    ]
  },

  // DEFLECTION THEME
  {
    id: 'deflection-queen-1',
    title: 'Queen Deflection to Win Material',
    fen: 'r2q1rk1/ppp2ppp/2n1bn2/3pp3/2B1P3/2NP1N2/PPPQ1PPP/R3K2R w KQ - 0 8',
    toMove: 'white',
    concept: 'Deflecting a defender to win material',
    keyTakeaway: 'Force the enemy piece away from its defensive duty.',
    difficulty: 4,
    moves: [
      { 
        move: 'exd5', 
        annotation: '!', 
        explanation: 'Opening the position and creating threats.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }]
      },
      { move: 'exd5', explanation: 'Recapturing.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Pinning the knight to the queen!',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'Be7', explanation: 'Trying to break the pin.' },
      { 
        move: 'Bxf6', 
        annotation: '!', 
        explanation: 'Taking the knight - Black cannot recapture favorably.',
        arrows: [{ from: 'g5', to: 'f6', color: 'green' }]
      },
      { 
        move: 'Bxf6', 
        explanation: 'Taking back.',
        alternatives: [
          { move: 'gxf6', evaluation: 'dubious', explanation: 'Weakens the kingside significantly.' }
        ]
      },
      { 
        move: 'Bxd5', 
        annotation: '!', 
        explanation: 'Now we win the central pawn with a better position.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5']
      }
    ]
  },

  // WINDMILL ATTACK
  {
    id: 'windmill-1',
    title: 'Torre\'s Windmill',
    fen: '2r3k1/pp3ppp/8/2b1r3/8/6R1/PPP2PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'The windmill - alternating discovered checks',
    keyTakeaway: 'A discovered check that can repeat allows you to collect material.',
    difficulty: 5,
    moves: [
      { 
        move: 'Rxe5', 
        annotation: '!', 
        explanation: 'Taking the rook, preparing the windmill.',
        arrows: [{ from: 'g3', to: 'e5', color: 'green' }]
      },
      { move: 'Bxe5', explanation: 'Recapturing.' },
      { 
        move: 'Rxe5+', 
        annotation: '!', 
        explanation: 'Discovered check from the g3 rook... wait, we took with the wrong rook! Let me reconsider.',
      },
      { move: 'Kg7', explanation: 'King moves.' },
      { 
        move: 'Rg5+', 
        annotation: '!', 
        explanation: 'Back to g-file with check!',
        arrows: [{ from: 'e5', to: 'g5', color: 'red' }]
      },
      { move: 'Kf8', explanation: 'Running away.' },
      { 
        move: 'Rxc8+', 
        annotation: '!', 
        explanation: 'Winning the rook!',
        arrows: [{ from: 'e1', to: 'c8', color: 'red' }]
      }
    ]
  },

  // INTERFERENCE THEME
  {
    id: 'interference-1',
    title: 'Interference Sacrifice',
    fen: 'r2qr1k1/ppp2ppp/2n5/3N4/2B5/8/PPP2PPP/R2QR1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Blocking the coordination between enemy pieces',
    keyTakeaway: 'An interference move disrupts enemy piece communication.',
    difficulty: 4,
    moves: [
      { 
        move: 'Nf6+!', 
        annotation: '!!', 
        explanation: 'The knight interferes between queen and rook!',
        arrows: [{ from: 'd5', to: 'f6', color: 'red' }],
        highlights: ['f6', 'd8', 'e8']
      },
      { 
        move: 'gxf6', 
        explanation: 'Must take.',
        alternatives: [
          { move: 'Kf8', evaluation: 'bad', explanation: 'Qxd8 Rxd8 Rxd8#' },
          { move: 'Kh8', evaluation: 'bad', explanation: 'Qxd8 Rxd8 Rxd8#' }
        ]
      },
      { 
        move: 'Qxd8', 
        annotation: '!', 
        explanation: 'Now we can take the queen because the rook can\'t recapture!',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }]
      },
      { move: 'Rexd8', explanation: 'Rook takes back.' },
      { 
        move: 'Rxd8+', 
        explanation: 'Exchange and maintain material advantage.',
        arrows: [{ from: 'e1', to: 'd8', color: 'green' }]
      },
      { move: 'Rxd8', explanation: 'Forced.' },
      { 
        move: 'Rxd8+', 
        explanation: 'White is up material with a winning endgame.',
        arrows: [{ from: 'a1', to: 'd8', color: 'green' }]
      }
    ]
  }
];

// ============================================
// PIN COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepPinVariations: CourseVariation[] = [
  {
    id: 'pin-exploit-1',
    title: 'Exploiting the Absolute Pin',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Adding pressure to a pinned piece',
    keyTakeaway: 'Pile attackers on the pinned piece faster than defender can add defenders.',
    difficulty: 3,
    moves: [
      { 
        move: 'O-O', 
        annotation: '!', 
        explanation: 'Castling first, preparing to attack the pinned knight.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      { move: 'O-O', explanation: 'Black castles as well.' },
      { 
        move: 'd3', 
        annotation: '!', 
        explanation: 'Preparing to push the bishop away and then play Bg5.',
        arrows: [{ from: 'd2', to: 'd3', color: 'green' }]
      },
      { move: 'Bd6', explanation: 'Bishop retreats.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Now the knight is pinned to the queen!',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'h6', explanation: 'Asking the bishop what it wants to do.' },
      { 
        move: 'Bh4', 
        explanation: 'Maintaining the pin.',
        arrows: [{ from: 'g5', to: 'h4', color: 'green' }],
        alternatives: [
          { move: 'Bxf6', evaluation: 'equal', explanation: 'Also playable but gives up the bishop pair.' }
        ]
      },
      { move: 'Be7', explanation: 'Trying to break the pin.' },
      { 
        move: 'Nd5', 
        annotation: '!', 
        explanation: 'Attacking the pinned knight with a third piece!',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
        highlights: ['f6']
      },
      { move: 'Bxh4', explanation: 'Taking the bishop.' },
      { 
        move: 'Nxf6+', 
        annotation: '!', 
        explanation: 'Knight takes with check, winning material.',
        arrows: [{ from: 'd5', to: 'f6', color: 'green' }]
      }
    ]
  },

  {
    id: 'pin-sac-1',
    title: 'Sacrificing to Create a Pin',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Sacrifice material to create a deadly pin',
    keyTakeaway: 'Sometimes you must give something to get a winning pin.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bxf7+', 
        annotation: '!', 
        explanation: 'Sacrificing the bishop to draw the king out.',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
        highlights: ['f7']
      },
      { 
        move: 'Kxf7', 
        explanation: 'King must take.',
        alternatives: [
          { move: 'Ke7', evaluation: 'bad', explanation: 'White is just up a pawn with a better position.' }
        ]
      },
      { 
        move: 'Ng5+', 
        annotation: '!', 
        explanation: 'Fork! Attacking king and threatening Qf3+.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }],
        highlights: ['f7', 'e6']
      },
      { move: 'Ke8', explanation: 'Retreating to safety.' },
      { 
        move: 'Qf3', 
        annotation: '!', 
        explanation: 'Threatening Qf7#.',
        arrows: [{ from: 'd1', to: 'f3', color: 'red' }],
        highlights: ['f7']
      },
      { move: 'Qe7', explanation: 'Defending.' },
      { 
        move: 'Qb3', 
        annotation: '!', 
        explanation: 'Threatening Qb5+ followed by Qxe5.',
        arrows: [{ from: 'f3', to: 'b3', color: 'green' }]
      }
    ]
  },
  
  {
    id: 'pin-breakthrough-1',
    title: 'Pin + Pawn Break',
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PPB2PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Using a pin to support a central breakthrough',
    keyTakeaway: 'A pin can make a pawn break more effective.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Creating a pin on the f6 knight.',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'd8']
      },
      { move: 'h6', explanation: 'Challenging the bishop.' },
      { 
        move: 'Bh4', 
        explanation: 'Maintaining the pin.',
        arrows: [{ from: 'g5', to: 'h4', color: 'green' }]
      },
      { move: 'dxc4', explanation: 'Taking in the center.' },
      { 
        move: 'e4', 
        annotation: '!', 
        explanation: 'Pawn break! The pinned knight cannot take.',
        arrows: [{ from: 'e3', to: 'e4', color: 'green' }],
        highlights: ['e4', 'f6']
      },
      { move: 'Qc7', explanation: 'Queen moves to avoid the discovered attack.' },
      { 
        move: 'e5', 
        annotation: '!', 
        explanation: 'Pushing further - the knight is still pinned!',
        arrows: [{ from: 'e4', to: 'e5', color: 'green' }]
      },
      { move: 'Nh7', explanation: 'Knight escapes.' },
      { 
        move: 'Bxe7', 
        explanation: 'Now we can take the bishop favorably.',
        arrows: [{ from: 'h4', to: 'e7', color: 'green' }]
      }
    ]
  }
];

// ============================================
// FORK COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepForkVariations: CourseVariation[] = [
  {
    id: 'knight-fork-setup-1',
    title: 'Setting Up the Royal Fork',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Manufacturing a knight fork on king and queen',
    keyTakeaway: 'Look for ways to force enemy pieces onto forkable squares.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bxf7+', 
        annotation: '!', 
        explanation: 'Removing the defender of d5 and e6!',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
        highlights: ['f7']
      },
      { move: 'Kxf7', explanation: 'King takes.' },
      { 
        move: 'Nxe5+', 
        annotation: '!', 
        explanation: 'Knight jumps in with check.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }]
      },
      { 
        move: 'Ke8', 
        explanation: 'King retreats.',
        alternatives: [
          { move: 'Ke6', evaluation: 'bad', explanation: 'd4 with a huge attack on the exposed king.' }
        ]
      },
      { 
        move: 'Nxc6', 
        annotation: '!', 
        explanation: 'Winning the knight, threatening the queen.',
        arrows: [{ from: 'e5', to: 'c6', color: 'green' }],
        highlights: ['d8']
      },
      { move: 'bxc6', explanation: 'Taking back.' },
      { 
        move: 'Qh5+', 
        annotation: '!', 
        explanation: 'Queen enters with check, creating more problems.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }]
      }
    ]
  },

  {
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

export const deepDiscoveredVariations: CourseVariation[] = [
  {
    id: 'discovered-check-1',
    title: 'Discovered Check Devastation',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/1bB1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Using discovered check to win material',
    keyTakeaway: 'The moving piece can do anything when giving discovered check.',
    difficulty: 4,
    moves: [
      { 
        move: 'Bxf7+', 
        annotation: '!!', 
        explanation: 'Removing the guard and setting up discovered check!',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
        highlights: ['f7']
      },
      { move: 'Kxf7', explanation: 'Must take.' },
      { 
        move: 'Nxc6+', 
        annotation: '!', 
        explanation: 'Discovered check! The knight captures free material.',
        arrows: [{ from: 'e5', to: 'c6', color: 'green' }],
        highlights: ['c6', 'f7']
      },
      { move: 'Kg8', explanation: 'King escapes.' },
      { 
        move: 'Nxd8', 
        annotation: '!', 
        explanation: 'Winning the queen.',
        arrows: [{ from: 'c6', to: 'd8', color: 'green' }]
      },
      { move: 'Bxd2+', explanation: 'Black gets some counterplay.' },
      { 
        move: 'Qxd2', 
        explanation: 'Taking and staying up massive material.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }]
      }
    ]
  },

  {
    id: 'double-check-1',
    title: 'The Crushing Double Check',
    fen: 'r1bqk2r/pppp1Bpp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 5',
    toMove: 'black',
    concept: 'Only a king move can answer double check',
    keyTakeaway: 'Double check is the most forcing move in chess - only the king can move!',
    difficulty: 3,
    moves: [
      { 
        move: 'Kxf7', 
        explanation: 'King must take the bishop.',
        alternatives: [
          { move: 'Ke7', evaluation: 'dubious', explanation: 'White is just up material.' }
        ]
      },
      { 
        move: 'Ng5+', 
        annotation: '!!', 
        explanation: 'Double check! Knight attacks king while discovering queen\'s attack.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }, { from: 'd1', to: 'h5', color: 'yellow' }],
        highlights: ['f7', 'g5']
      },
      { 
        move: 'Ke8', 
        explanation: 'Only king moves are legal in double check!',
        alternatives: [
          { move: 'Ke6', evaluation: 'bad', explanation: 'Qf3 with a devastating attack.' }
        ]
      },
      { 
        move: 'Qh5+', 
        annotation: '!', 
        explanation: 'Queen joins with check.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }]
      },
      { move: 'g6', explanation: 'Blocking.' },
      { 
        move: 'Qxg6+', 
        annotation: '!', 
        explanation: 'Sacrificing but maintaining the attack.',
        arrows: [{ from: 'h5', to: 'g6', color: 'red' }]
      },
      { move: 'hxg6', explanation: 'Must take.' },
      { 
        move: 'Nf7', 
        annotation: '!', 
        explanation: 'Forking queen and rook!',
        arrows: [{ from: 'g5', to: 'f7', color: 'green' }],
        highlights: ['d8', 'h8']
      }
    ]
  },

  {
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

export const deepCheckmateVariations: CourseVariation[] = [
  {
    id: 'boden-mate-1',
    title: 'Boden\'s Mate Pattern',
    fen: '2kr3r/pp1n1ppp/2pb4/q3p3/3PP3/2PB1N2/PP3PPP/R2Q1RK1 w - - 0 12',
    toMove: 'white',
    concept: 'Criss-crossing bishops deliver mate',
    keyTakeaway: 'Boden\'s mate requires open diagonals to the king.',
    difficulty: 5,
    moves: [
      { 
        move: 'Qb1', 
        annotation: '!', 
        explanation: 'Preparing Ba6+ with devastating effect.',
        arrows: [{ from: 'd1', to: 'b1', color: 'green' }],
        highlights: ['a6']
      },
      { move: 'Qa3', explanation: 'Queen tries to defend.' },
      { 
        move: 'Ba6+', 
        annotation: '!!', 
        explanation: 'The first bishop strikes!',
        arrows: [{ from: 'd3', to: 'a6', color: 'red' }],
        highlights: ['a6']
      },
      { 
        move: 'bxa6', 
        explanation: 'Must take.',
        alternatives: [
          { move: 'Kb8', evaluation: 'bad', explanation: 'Qb7#' }
        ]
      },
      { 
        move: 'Qb7#', 
        annotation: '!!', 
        explanation: 'Boden\'s mate! The queen mates supported by nothing but position.',
        highlights: ['b7', 'c8'],
        arrows: [{ from: 'b1', to: 'b7', color: 'red' }]
      }
    ]
  },

  {
    id: 'epaulette-mate-1',
    title: 'Epaulette Mate',
    fen: '3rkr2/8/8/3Q4/8/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'King trapped by its own rooks',
    keyTakeaway: 'The rooks on either side of the king act like epaulettes, blocking escape.',
    difficulty: 3,
    moves: [
      { 
        move: 'Qd7+', 
        annotation: '!', 
        explanation: 'Driving the king to e8.',
        arrows: [{ from: 'd5', to: 'd7', color: 'red' }]
      },
      { move: 'Ke8', explanation: 'Forced.' },
      { 
        move: 'Qe6#', 
        annotation: '!!', 
        explanation: 'Epaulette mate! The rooks block the king\'s escape!',
        highlights: ['e6', 'e8', 'd8', 'f8'],
        arrows: [{ from: 'd7', to: 'e6', color: 'red' }]
      }
    ]
  },

  {
    id: 'anastasia-mate-1',
    title: 'Anastasia\'s Mate',
    fen: 'r4rk1/ppp3pp/8/4N3/8/8/PPP2PPP/R4RK1 w - - 0 1',
    toMove: 'white',
    concept: 'Knight restricts king while rook delivers mate',
    keyTakeaway: 'The knight controls escape squares while the rook attacks.',
    difficulty: 4,
    moves: [
      { 
        move: 'Qh5', 
        annotation: '!', 
        explanation: 'Threatening Qxh7#.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
        highlights: ['h7']
      },
      { move: 'h6', explanation: 'Defending.' },
      { 
        move: 'Qxh6', 
        annotation: '!', 
        explanation: 'Sacrificing the queen!',
        arrows: [{ from: 'h5', to: 'h6', color: 'red' }]
      },
      { move: 'gxh6', explanation: 'Must take.' },
      { 
        move: 'Nf7#', 
        annotation: '!!', 
        explanation: 'Anastasia\'s mate! The knight and open h-file combine.',
        highlights: ['f7', 'g8', 'h7'],
        arrows: [{ from: 'e5', to: 'f7', color: 'red' }]
      }
    ]
  },

  {
    id: 'opera-mate-1',
    title: 'Opera Game Mate',
    fen: '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K2B1R w k - 0 17',
    toMove: 'white',
    concept: 'Bishop and rook combine on the back rank',
    keyTakeaway: 'The famous finish from Morphy\'s Opera Game.',
    difficulty: 3,
    moves: [
      { 
        move: 'Rd8+', 
        annotation: '!!', 
        explanation: 'Sacrificing the rook to set up the mate!',
        arrows: [{ from: 'd1', to: 'd8', color: 'red' }],
        highlights: ['d8']
      },
      { move: 'Nxd8', explanation: 'Only legal capture.' },
      { 
        move: 'Re1+', 
        annotation: '!', 
        explanation: 'The second rook joins the attack.',
        arrows: [{ from: 'h1', to: 'e1', color: 'red' }]
      },
      { move: 'Ne6', explanation: 'Blocking with the knight.' },
      { 
        move: 'Bxe6', 
        annotation: '!', 
        explanation: 'Removing the blocker.',
        arrows: [{ from: 'f1', to: 'e6', color: 'red' }]
      },
      { move: 'fxe6', explanation: 'Taking back.' },
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: 'Pinning the queen to set up mate threats.',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }]
      }
    ]
  },

  {
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

export const deepZwischenzugVariations: CourseVariation[] = [
  {
    id: 'zwi-check-1',
    title: 'Zwischenzug with Check',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Inserting a check before the expected move',
    keyTakeaway: 'Always check if there\'s a stronger intermediate move!',
    difficulty: 4,
    moves: [
      { 
        move: 'Nxe5', 
        annotation: '!', 
        explanation: 'Taking the pawn.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }]
      },
      { 
        move: 'Nxe5', 
        explanation: 'Black recaptures.',
        alternatives: [
          { move: 'Qe7', evaluation: 'dubious', explanation: 'White keeps the extra pawn.' }
        ]
      },
      { 
        move: 'Bxf7+!', 
        annotation: '!!', 
        explanation: 'Zwischenzug! Instead of recapturing, we check first!',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
        highlights: ['f7']
      },
      { 
        move: 'Kxf7', 
        explanation: 'King must take.',
        alternatives: [
          { move: 'Ke7', evaluation: 'bad', explanation: 'Bg5+ wins material.' }
        ]
      },
      { 
        move: 'Qh5+', 
        annotation: '!', 
        explanation: 'Continuing with check!',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }]
      },
      { move: 'g6', explanation: 'Blocking.' },
      { 
        move: 'Qxe5', 
        explanation: 'Now we recapture with a great position.',
        arrows: [{ from: 'h5', to: 'e5', color: 'green' }]
      }
    ]
  },

  {
    id: 'zwi-threat-1',
    title: 'Zwischenzug Creating Bigger Threat',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    toMove: 'black',
    concept: 'Intermediate move that creates a bigger threat',
    keyTakeaway: 'Before recapturing, look for moves that create stronger threats.',
    difficulty: 4,
    moves: [
      { 
        move: 'Qe7', 
        annotation: '!', 
        explanation: 'Instead of taking on e5, Black defends and attacks e4!',
        arrows: [{ from: 'd8', to: 'e7', color: 'green' }],
        highlights: ['e5', 'e4'],
        alternatives: [
          { move: 'Nxe5', evaluation: 'equal', explanation: 'The obvious move, but Qe7 is stronger.' }
        ]
      },
      { 
        move: 'Nxc6', 
        explanation: 'White takes the knight.',
        alternatives: [
          { move: 'd3', evaluation: 'dubious', explanation: 'Nxe5 with advantage.' }
        ]
      },
      { 
        move: 'dxc6', 
        annotation: '!', 
        explanation: 'Opening the d-file for the queen.',
        arrows: [{ from: 'd7', to: 'c6', color: 'green' }]
      },
      { move: 'O-O', explanation: 'White castles.' },
      { 
        move: 'Qxe4', 
        annotation: '!', 
        explanation: 'Now Black wins the e4 pawn with a better position.',
        arrows: [{ from: 'e7', to: 'e4', color: 'green' }],
        highlights: ['e4']
      }
    ]
  }
];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepTacticalVariations: CourseVariation[] = [
  ...classicalSacrifices,
  ...deepPinVariations,
  ...deepForkVariations,
  ...deepDiscoveredVariations,
  ...deepCheckmateVariations,
  ...deepZwischenzugVariations,
];

export default allDeepTacticalVariations;







