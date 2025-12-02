// ============================================
// ADDITIONAL ENHANCED PATTERNS
// More patterns for comprehensive coverage
// ============================================

import type { EnhancedPattern } from './enhancedPatterns';

export const additionalPatterns: EnhancedPattern[] = [
  // ============================================
  // BLOCKADE PATTERNS
  // ============================================
  {
    id: 'blockade-nimzo-knight',
    category: 'BLOCKADE',
    title: 'The Nimzowitsch Blockade',
    subtitle: 'Knights as eternal blockaders',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3pP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Nimzowitsch taught that the blockade is a powerful strategic weapon. By placing a piece—ideally a knight—in front of an enemy pawn, we neutralize its advance and turn it into a permanent weakness.',
    
    keyIdeas: [
      'A blockaded pawn loses all dynamic potential',
      'Knights are ideal blockaders—they don\'t lose power blocking a pawn',
      'Bishops and rooks make poor blockaders—their lines are cut',
      'First restrain, then blockade, then destroy (Nimzowitsch\'s mantra)'
    ],
    
    mainLine: [
      {
        move: 'Nd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight retreats to prepare the maneuver Nd2-f1-e3-d5 (or f5). This is a classic Nimzowitsch-style knight tour toward the blockade square!',
        arrows: [
          { from: 'f3', to: 'd2', color: 'green' },
          { from: 'd2', to: 'f1', color: 'yellow' },
          { from: 'f1', to: 'e3', color: 'yellow' }
        ],
        conceptTag: 'Knight Maneuver'
      },
      {
        move: 'b6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop. White continues the plan.',
        arrows: [{ from: 'b7', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Nf1',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight continues its journey. f1 is a transit square on the way to e3 and then the blockade on d4.',
        arrows: [
          { from: 'd2', to: 'f1', color: 'green' },
          { from: 'f1', to: 'e3', color: 'yellow' }
        ]
      },
      {
        move: 'Bb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop to the long diagonal. But the blockade is coming!',
        arrows: [{ from: 'c8', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Ne3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight arrives at its staging post. From e3, it eyes d5 and f5—both excellent blockading squares!',
        arrows: [
          { from: 'f1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd5', color: 'yellow' },
          { from: 'e3', to: 'f5', color: 'yellow' }
        ],
        highlights: ['e3', 'd5'],
        conceptTag: 'Approaching the Blockade'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to generate queenside activity.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Nf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BLOCKADE! The knight lands on f5, an unassailable square in front of the e6 pawn. This knight cannot be driven away and paralyzes Black\'s entire position.',
        arrows: [{ from: 'e3', to: 'f5', color: 'green' }],
        highlights: ['f5', 'e6'],
        conceptTag: 'The Perfect Blockade'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s bishop retreats, trying to challenge the knight. But the blockade holds!',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting the knight! The bishop eyes h7 and ensures the f5 knight cannot be dislodged. Black is completely paralyzed.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'f5', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        conceptTag: 'Supporting the Blockade'
      }
    ],
    
    summary: 'We executed Nimzowitsch\'s classic knight maneuver Nd2-f1-e3-f5 to establish an immovable blockade on f5. The knight cannot be driven away and Black\'s entire position is paralyzed.',
    
    keyTakeaways: [
      'Knights make the best blockaders—they remain fully active',
      'Plan the knight\'s route to the blockade square in advance',
      'Support the blockading piece with other pieces',
      'A successful blockade paralyzes the opponent\'s entire position'
    ],
    
    memoryTip: 'Remember Nimzowitsch\'s mantra: "First restrain, then blockade, then destroy!"',
    
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Nimzowitsch\'s My System',
    playerExample: {
      white: 'Aron Nimzowitsch',
      black: 'Saemisch',
      event: 'Copenhagen',
      year: 1923
    }
  },

  // ============================================
  // PAWN BREAKS
  // ============================================
  {
    id: 'pawn-break-f5-kings-indian',
    category: 'PAWN_BREAKS',
    title: 'The King\'s Indian ...f5 Break',
    subtitle: 'Exploding the kingside',
    fen: 'r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    
    introduction: 'The ...f5 break is the thematic pawn break in the King\'s Indian Defense. It opens the f-file, activates the f8 rook, and creates attacking chances against White\'s king.',
    
    keyIdeas: [
      'Pawn breaks open lines and create weaknesses',
      'Timing is crucial—prepare before executing',
      'The break often sacrifices a pawn for activity',
      'Follow up immediately with piece activity'
    ],
    
    mainLine: [
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The classic King\'s Indian break! Black strikes in the center, opening the f-file and creating attacking chances. This move changes the entire character of the game.',
        arrows: [
          { from: 'f7', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e4', color: 'red' }
        ],
        highlights: ['f5'],
        conceptTag: 'The Thematic Break',
        alternativeMoves: [
          {
            move: 'Nf6',
            evaluation: 'equal',
            explanation: 'Solid, but passive. The f5 break is what makes the King\'s Indian come alive!'
          }
        ]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures. Now Black must follow up energetically!',
        arrows: [{ from: 'e4', to: 'f5', color: 'blue' }]
      },
      {
        move: 'gxf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the g-pawn is strongest! It opens the g-file for the rook and keeps the center flexible.',
        arrows: [
          { from: 'g6', to: 'f5', color: 'green' },
          { from: 'g8', to: 'g1', color: 'yellow' }
        ],
        highlights: ['g8'],
        conceptTag: 'Open the G-file',
        alternativeMoves: [
          {
            move: 'Rxf5',
            evaluation: 'equal',
            explanation: 'Also possible, but gxf5 is more aggressive, opening the g-file for attack.'
          }
        ]
      },
      {
        move: 'Ng5',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to exploit the weakened kingside with Ng5.',
        arrows: [{ from: 'f3', to: 'g5', color: 'blue' }]
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Defending while activating the knight. Black\'s pieces are coordinating for an attack.',
        arrows: [{ from: 'd7', to: 'f6', color: 'green' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, eyeing f5.',
        arrows: [{ from: 'e2', to: 'd3', color: 'blue' }]
      },
      {
        move: 'Qe8',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen swings to the kingside! From e8 it can go to g6 or h5, joining the attack. This is the follow-up to the break.',
        arrows: [
          { from: 'd8', to: 'e8', color: 'green' },
          { from: 'e8', to: 'g6', color: 'yellow' },
          { from: 'e8', to: 'h5', color: 'yellow' }
        ],
        conceptTag: 'Queen to the Attack'
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures the f5 pawn.',
        arrows: [{ from: 'd3', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Qg6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen arrives on the kingside with terrifying threats. The g-file is a highway for Black\'s attack. ...Bh3 and ...Ng4 are coming!',
        arrows: [
          { from: 'e8', to: 'g6', color: 'green' },
          { from: 'f6', to: 'g4', color: 'yellow' },
          { from: 'c8', to: 'h3', color: 'yellow' }
        ],
        highlights: ['g6', 'h3', 'g4'],
        conceptTag: 'Full Attack'
      }
    ],
    
    summary: 'The ...f5 break opened lines on the kingside and transformed Black\'s position from passive to aggressive. The key was following up immediately with piece activity.',
    
    keyTakeaways: [
      'Pawn breaks must be followed up with piece activity',
      'The g-file becomes a highway for rooks after ...gxf5',
      'The queen often swings to the kingside via e8-g6 or e8-h5',
      'Timing is everything—prepare before breaking'
    ],
    
    memoryTip: 'Think of ...f5 as "opening the floodgates"—once you break, the pieces pour through!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'King\'s Indian Attack Patterns',
    playerExample: {
      white: 'Viktor Korchnoi',
      black: 'Bobby Fischer',
      event: 'Sousse Interzonal',
      year: 1967
    }
  },

  // ============================================
  // PIECE COORDINATION
  // ============================================
  {
    id: 'coordination-rook-lift',
    category: 'PIECE_COORDINATION',
    title: 'The Devastating Rook Lift',
    subtitle: 'Rg3 and total coordination',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 10',
    toMove: 'white',
    
    introduction: 'When attacking in opposite-side castling, piece coordination is everything. The rook lift (Rg1-g3) is a powerful technique that brings the rook into the attack without using the open file.',
    
    keyIdeas: [
      'Rook lifts bring rooks into the attack via the 3rd rank',
      'In opposite castling, coordinate pieces toward the enemy king',
      'Multiple pieces attacking together create irresistible threats',
      'The lift often combines with pawn storms'
    ],
    
    mainLine: [
      {
        move: 'h4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Starting the pawn storm! h4-h5 will open lines against Black\'s king. The rook on h1 will swing into the attack.',
        arrows: [
          { from: 'h2', to: 'h4', color: 'green' },
          { from: 'h4', to: 'h5', color: 'yellow' }
        ],
        conceptTag: 'Pawn Storm'
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries counterplay in the center.',
        arrows: [{ from: 'f6', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Targeting Black\'s key defensive bishop! Trading it removes a crucial defender of the king.',
        arrows: [
          { from: 'e3', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Remove the Defender'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades bishops. The dark squares around the king are now weak!',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'The queen arrives on the kingside with menacing threats.',
        arrows: [{ from: 'd2', to: 'h6', color: 'green' }],
        highlights: ['h6']
      },
      {
        move: 'Qe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prepares ...f6 to defend.',
        arrows: [{ from: 'd8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'h5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Continuing the storm! The h-file is about to burst open.',
        arrows: [{ from: 'h4', to: 'h5', color: 'green' }]
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Defending g4.',
        arrows: [{ from: 'e5', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Rdg1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ROOK LIFT! The rook swings from d1 to g1, then will lift to g3. Both rooks will coordinate on the g-file and 3rd rank for a devastating attack!',
        arrows: [
          { from: 'd1', to: 'g1', color: 'green' },
          { from: 'g1', to: 'g3', color: 'yellow' }
        ],
        highlights: ['g1'],
        conceptTag: 'The Rook Lift!'
      },
      {
        move: 'Qf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend.',
        arrows: [{ from: 'e8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Rg3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook lift is complete! The rook on g3 can swing to h3 or double on the g-file. Combined with Rhg1 and Qh6, the attack is irresistible.',
        arrows: [
          { from: 'g1', to: 'g3', color: 'green' },
          { from: 'g3', to: 'h3', color: 'yellow' },
          { from: 'h1', to: 'g1', color: 'yellow' }
        ],
        highlights: ['g3', 'h1', 'h6'],
        conceptTag: 'Full Coordination'
      }
    ],
    
    summary: 'We coordinated our pieces beautifully: h4-h5 opened lines, Bxh6 removed a defender, and the rook lift Rdg1-g3 brought maximum firepower against Black\'s king.',
    
    keyTakeaways: [
      'Rook lifts (Rg1-g3-h3) bring rooks into the attack without needing open files',
      'Remove key defenders before the final assault',
      'Coordinate multiple pieces toward the enemy king',
      'Pawn storms (h4-h5) open lines for the attack'
    ],
    
    memoryTip: 'Think of the rook lift as "going over the top"—the rook climbs up to the 3rd rank and swings over to the attack!',
    
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Yugoslav Attack Patterns',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Veselin Topalov',
      event: 'Wijk aan Zee',
      year: 1999
    }
  },

  // ============================================
  // EXCHANGE STRATEGY
  // ============================================
  {
    id: 'exchange-good-for-bad',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trading Your Best for Their Best',
    subtitle: 'When to exchange active pieces',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2N5/3PP3/2N2P2/PP4PP/R1BQKB1R w KQ - 0 9',
    toMove: 'white',
    
    introduction: 'Exchange strategy is the art of knowing which pieces to trade. Sometimes trading your active piece for the opponent\'s active piece leaves you with superior remaining pieces.',
    
    keyIdeas: [
      'Trade active pieces for active pieces when your remaining pieces are better',
      'After trades, evaluate who has the better minor pieces',
      'Fewer pieces can mean less counterplay for your opponent',
      'Trade attackers when you\'re defending, defenders when you\'re attacking'
    ],
    
    mainLine: [
      {
        move: 'Nxe6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Sacrificing the exchange? No—this is strategic trading! We take the strong e6 knight and force Black to recapture badly.',
        arrows: [
          { from: 'c5', to: 'e6', color: 'green' }
        ],
        highlights: ['e6'],
        conceptTag: 'Strategic Exchange',
        alternativeMoves: [
          {
            move: 'Nb3',
            evaluation: 'good',
            explanation: 'Safe retreat, but misses the chance to create lasting damage to Black\'s structure.'
          }
        ]
      },
      {
        move: 'fxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the f-pawn. Now Black has doubled e-pawns and the f-file is half-open for White!',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }],
        highlights: ['e6', 'e7']
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing while preparing to castle queenside. White\'s position is harmonious.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions the knight. Now watch our exchange strategy unfold.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading the dark-squared bishops! After this exchange, Black\'s king will be vulnerable on the dark squares.',
        arrows: [
          { from: 'e3', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        conceptTag: 'Trade Defenders'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to trade. The fianchettoed bishop was a key defender.',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Our queen arrives on a powerful square, eyeing the weakened dark squares around Black\'s king.',
        arrows: [{ from: 'd1', to: 'h6', color: 'green' }],
        highlights: ['h6', 'g7', 'f8']
      },
      {
        move: 'Rf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the rook.',
        arrows: [{ from: 'f8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'O-O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling queenside and connecting the rooks. White has a beautiful position: the queen on h6, the dark squares are weak, and the doubled e-pawns are targets.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
        conceptTag: 'Superior Position'
      }
    ],
    
    summary: 'We made two key exchanges: Nxe6 damaged Black\'s pawn structure, and Bxh6 removed a key defender. The result: a dominant position with lasting advantages.',
    
    keyTakeaways: [
      'Exchange strategy requires evaluating what\'s left after trades',
      'Trade your opponent\'s defenders when preparing to attack',
      'Structural damage can last forever—piece activity is temporary',
      'Sometimes "good" trades are based on what they leave behind'
    ],
    
    memoryTip: 'Think of exchanges as "subtraction"—what remains after the trade determines who benefits!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Sicilian Dragon Strategy',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // KNIGHT PLACEMENT
  // ============================================
  {
    id: 'knight-eternal-outpost',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Eternal Knight',
    subtitle: 'A knight that cannot be removed',
    fen: 'r1bqr1k1/pp1n1ppp/2pb1n2/8/2BNP3/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 11',
    toMove: 'white',
    
    introduction: 'Some knight outposts are so strong that the knight becomes virtually a winning advantage by itself. We\'ll learn how to recognize and create these "eternal" knights.',
    
    keyIdeas: [
      'An eternal knight is on a square that can never be attacked by pawns',
      'The knight should be supported by pawns or pieces',
      'Once established, the knight dominates the position',
      'Trade off pieces that could challenge the knight'
    ],
    
    mainLine: [
      {
        move: 'Nf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight leaps to the perfect square! On f5, it cannot be attacked by any pawn (the e6 and g6 pawns don\'t exist), and it attacks multiple key squares.',
        arrows: [
          { from: 'd4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e7', color: 'yellow' },
          { from: 'f5', to: 'g7', color: 'yellow' },
          { from: 'f5', to: 'h6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'The Eternal Outpost',
        alternativeMoves: [
          {
            move: 'Nde2',
            evaluation: 'good',
            explanation: 'Repositioning, but why retreat when f5 is available?'
          }
        ]
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the knight by maneuvering ...Bf8-g7 or ...Bf8-e7-f6.',
        arrows: [{ from: 'd6', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qg4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen joins the attack! Combined with the knight on f5, White threatens Qh5 or Nh6+ creating havoc.',
        arrows: [
          { from: 'd1', to: 'g4', color: 'green' },
          { from: 'g4', to: 'h5', color: 'yellow' }
        ],
        conceptTag: 'Queen to the Attack'
      },
      {
        move: 'Nb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black attacks the bishop, trying to gain counterplay.',
        arrows: [{ from: 'd7', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Bb3',
        isMainLine: true,
        annotation: '',
        explanation: 'The bishop simply retreats, staying on the a2-g8 diagonal. White maintains all the attacking chances.',
        arrows: [{ from: 'c4', to: 'b3', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the f5 knight.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Nh6+',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight strikes! This fork wins material immediately. The eternal knight has delivered a decisive blow.',
        arrows: [{ from: 'f5', to: 'h6', color: 'green' }],
        highlights: ['h6', 'g8', 'f7'],
        conceptTag: 'The Knight Strikes!'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'The only legal move.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Nxf7+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the pawn with check, and the queen on d8 is falling. The eternal knight delivered a knockout!',
        arrows: [{ from: 'h6', to: 'f7', color: 'green' }],
        conceptTag: 'Decisive Combination'
      }
    ],
    
    summary: 'The knight on f5 was an "eternal" piece—immune to pawn attacks and dominating the position. From there, it delivered a decisive tactical blow.',
    
    keyTakeaways: [
      'Look for squares where knights cannot be attacked by pawns',
      'Once established, the knight creates constant threats',
      'Support the knight with your other pieces',
      'An eternal knight often leads to tactical opportunities'
    ],
    
    memoryTip: 'An eternal knight is like a "thorn in the side"—it hurts and cannot be removed!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Classical Middlegame Play',
    playerExample: {
      white: 'Magnus Carlsen',
      black: 'Vishy Anand',
      event: 'World Championship',
      year: 2014
    }
  },

  // ============================================
  // WEAK PAWNS - DOUBLED PAWNS
  // ============================================
  {
    id: 'weak-doubled-pawns',
    category: 'WEAK_PAWNS',
    title: 'Exploiting Doubled Pawns',
    subtitle: 'Creating and targeting doubled pawns',
    fen: 'r1bqkb1r/pp1ppppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Doubled pawns are a classic weakness—they cannot support each other and often leave holes in the pawn structure. We\'ll learn how to create and exploit them.',
    
    keyIdeas: [
      'Doubled pawns cannot defend each other',
      'Create doubled pawns with strategic exchanges',
      'The square in front of doubled pawns is often weak',
      'Target the base of doubled pawns'
    ],
    
    mainLine: [
      {
        move: 'Nxc6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading on c6 to create doubled pawns! After ...bxc6, Black will have doubled c-pawns which are a permanent weakness.',
        arrows: [
          { from: 'd4', to: 'c6', color: 'green' }
        ],
        conceptTag: 'Create the Weakness',
        alternativeMoves: [
          {
            move: 'Nc3',
            evaluation: 'good',
            explanation: 'Solid development, but Nxc6 creates a lasting advantage in the pawn structure.'
          }
        ]
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the b-pawn. Now the c6 and c7 pawns are doubled, and d5 is a hole!',
        arrows: [{ from: 'b7', to: 'c6', color: 'blue' }],
        highlights: ['c6', 'c7', 'd5']
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing the bishop to an active diagonal, controlling important squares.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }]
      },
      {
        move: 'd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the dark-squared bishop.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling and getting the king safe. White will soon target the doubled pawns.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing the knight to its ideal square, eyeing d5.',
        arrows: [
          { from: 'b1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d5']
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '',
        explanation: 'Completing development. White has a clear plan: target the doubled c-pawns with Qa4-a6.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop actively.',
        arrows: [{ from: 'c8', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Qa4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen springs into action! From a4, it attacks the c6-pawn directly. Black will have to tie pieces down to defend.',
        arrows: [
          { from: 'd1', to: 'a4', color: 'green' },
          { from: 'a4', to: 'c6', color: 'yellow' }
        ],
        highlights: ['a4', 'c6'],
        conceptTag: 'Attack the Weakness'
      }
    ],
    
    summary: 'We created doubled pawns with Nxc6, then developed harmoniously before targeting them with Qa4. The doubled c-pawns are a permanent weakness that ties down Black\'s pieces.',
    
    keyTakeaways: [
      'Trading to create doubled pawns is often worth it',
      'Doubled pawns create holes in the pawn structure',
      'Don\'t rush to win the doubled pawns—first restrict them',
      'Tie down opponent\'s pieces to defending the weakness'
    ],
    
    memoryTip: 'Doubled pawns are like "two soldiers who can\'t help each other"—target the weak one first!',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Sicilian Defense Strategy',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Samuel Reshevsky',
      event: 'US Championship',
      year: 1966
    }
  },

  // ============================================
  // PAWN STRUCTURE - ISOLATED PAWN DYNAMIC
  // ============================================
  {
    id: 'structure-iqp-attack',
    category: 'PAWN_STRUCTURE',
    title: 'IQP Attack: Dynamic Play',
    subtitle: 'Using the isolated pawn for attack',
    fen: 'r1bq1rk1/pp2ppbp/2n3p1/3p4/3P1B2/2PBPN2/PP3PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    
    introduction: 'The Isolated Queen Pawn (IQP) is not just a weakness—it\'s a dynamic weapon! The d4 and e5 squares become launching pads for attacks. We\'ll learn to use the IQP aggressively.',
    
    keyIdeas: [
      'The IQP gives space and open lines',
      'd5 and e5 are strong squares for pieces',
      'Attack before the position simplifies',
      'The bishop pair often accompanies the IQP'
    ],
    
    mainLine: [
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen prepares to join the kingside attack! From d2, it can swing to h6 or support piece play on the h-file.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        conceptTag: 'Queen to the Attack',
        alternativeMoves: [
          {
            move: 'Qe2',
            evaluation: 'good',
            explanation: 'Also possible, preparing Re1 and e4, but Qd2 is more aggressive.'
          }
        ]
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the rook to the e-file.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading Black\'s fianchettoed bishop! This removes a key defender and weakens the dark squares around Black\'s king.',
        arrows: [
          { from: 'f4', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        conceptTag: 'Remove the Defender'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is practically forced to recapture.',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'The queen arrives on h6, a menacing square. Now Ng5 is a major threat.',
        arrows: [{ from: 'd2', to: 'h6', color: 'green' }],
        highlights: ['h6']
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends f6.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ng5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight springs into the attack! It threatens Nxh7 followed by Qg7#. The IQP on d4 supports this entire attacking setup.',
        arrows: [
          { from: 'f3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'h7', color: 'yellow' }
        ],
        highlights: ['g5', 'h7'],
        conceptTag: 'Knight Attack'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends h7.',
        arrows: [{ from: 'd7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the last piece into the attack! The rook will support e4-e5 or simply add pressure to the e-file.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
        conceptTag: 'All Pieces Attacking'
      },
      {
        move: 'Bf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blunt the attack by trading pieces.',
        arrows: [{ from: 'c8', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'We take, opening lines toward the king.',
        arrows: [{ from: 'd3', to: 'f5', color: 'green' }]
      },
      {
        move: 'gxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing. Now the g-file is open!',
        arrows: [{ from: 'g6', to: 'f5', color: 'blue' }],
        highlights: ['g8', 'g1']
      },
      {
        move: 'Re3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lift! From e3, the rook will swing to g3 or h3, delivering checkmate threats. The IQP position has generated a winning attack!',
        arrows: [
          { from: 'e1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'g3', color: 'yellow' }
        ],
        conceptTag: 'Rook Lift for Mate'
      }
    ],
    
    summary: 'The IQP gave us space and open lines for our pieces. We attacked aggressively with Bh6, Ng5, and the rook lift Re3-g3. This is the dynamic way to play with an isolated pawn.',
    
    keyTakeaways: [
      'The IQP gives space and active piece play',
      'Attack before the position simplifies into an endgame',
      'Use the outposts on d5 and e5 for your pieces',
      'Remove defenders of the enemy king first'
    ],
    
    memoryTip: 'Think of the IQP as a "battering ram"—it opens doors for your pieces to storm through!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'IQP Middlegame Attacks',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1985
    }
  },

  // ============================================
  // MORE OUTPOST PATTERNS
  // ============================================
  {
    id: 'outpost-e5-sicilian',
    category: 'OUTPOSTS',
    title: 'The e5 Outpost in Sicilian',
    subtitle: 'A knight on e5 controls the game',
    fen: 'r1bqk2r/pp2bppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    
    introduction: 'The e5 square is often a dream outpost in many openings. A knight on e5 controls the center and eyes the enemy position.',
    
    keyIdeas: [
      'Knights on e5 control 8 squares',
      'The e5 knight often eyes f7',
      'Support the outpost with pawns',
      'Trade pieces that challenge the knight'
    ],
    
    mainLine: [
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Castling first.' },
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Black castles.' },
      { move: 'e4', isMainLine: true, annotation: '!', explanation: 'Gaining space and preparing Ne5.', highlights: ['e4'] },
      { move: 'dxe4', isMainLine: true, annotation: '', explanation: 'Black captures.' },
      { move: 'Nxe4', isMainLine: true, annotation: '', explanation: 'Recapturing with the knight.' },
      { move: 'Nxe4', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'Bxe4', isMainLine: true, annotation: '!', explanation: 'The bishop controls the diagonal.' },
      { move: 'Bf6', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Ne5', isMainLine: true, annotation: '!!', explanation: 'THE OUTPOST! The knight on e5 cannot be challenged by pawns.', highlights: ['e5'] }
    ],
    
    summary: 'We established a powerful knight on e5, controlling the center and threatening the enemy position.',
    keyTakeaways: ['e5 is often the strongest central outpost', 'Prepare the outpost with pawn play'],
    difficulty: 3,
    estimatedMinutes: 8
  },

  {
    id: 'outpost-c5-queenside',
    category: 'OUTPOSTS',
    title: 'The c5 Outpost',
    subtitle: 'Queenside outpost domination',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The c5 outpost is particularly strong when attacking Black\'s queenside. A knight on c5 attacks b7 and e6.',
    
    keyIdeas: [
      'c5 attacks b7 and e6 simultaneously',
      'Knights on the rim can be strong outposts',
      'Support with d4 or b4 pawns'
    ],
    
    mainLine: [
      { move: 'd4', isMainLine: true, annotation: '!', explanation: 'Preparing Nc5 via e3 or directly.' },
      { move: 'e5', isMainLine: true, annotation: '', explanation: 'Black challenges.' },
      { move: 'd5', isMainLine: true, annotation: '', explanation: 'Closing the center.' },
      { move: 'Nb8', isMainLine: true, annotation: '', explanation: 'Knight repositions.' },
      { move: 'Nc5', isMainLine: true, annotation: '!!', explanation: 'The knight lands on c5 - dominating the queenside!', highlights: ['c5'], arrows: [{ from: 'c5', to: 'b7', color: 'red' }] }
    ],
    
    summary: 'The c5 outpost gives complete control over the queenside.',
    keyTakeaways: ['c5 outpost is strong in many structures', 'Eyes b7 and e6'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // ============================================
  // OPEN FILES PATTERNS
  // ============================================
  {
    id: 'open-file-seventh-rank',
    category: 'OPEN_FILES',
    title: 'The Seventh Rank',
    subtitle: 'Rooks on the 7th are devastating',
    fen: 'r4rk1/1p2Rppp/p1p5/4p3/4P3/2N5/PPP2PPP/R5K1 w - - 0 15',
    toMove: 'white',
    
    introduction: 'A rook on the 7th rank is one of the most powerful pieces on the board. It attacks pawns and restricts the enemy king.',
    
    keyIdeas: [
      'The 7th rank attacks multiple pawns',
      'Two rooks on the 7th often force mate',
      'The enemy king is restricted'
    ],
    
    mainLine: [
      { move: 'Rd1', isMainLine: true, annotation: '!', explanation: 'Preparing to double rooks!' },
      { move: 'Rf7', isMainLine: true, annotation: '', explanation: 'Black tries to defend.' },
      { move: 'Rd7', isMainLine: true, annotation: '!!', explanation: 'PIGS ON THE SEVENTH! Both rooks dominate.', highlights: ['d7', 'e7'] },
      { move: 'Rxd7', isMainLine: true, annotation: '', explanation: 'Forced trade.' },
      { move: 'Rxd7', isMainLine: true, annotation: '', explanation: 'White dominates the 7th rank.' }
    ],
    
    summary: 'The rook on the 7th rank is devastatingly powerful.',
    keyTakeaways: ['The 7th rank is the "goal line" for rooks', 'Double rooks when possible'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'open-file-control',
    category: 'OPEN_FILES',
    title: 'Controlling the Open File',
    subtitle: 'Double before invading',
    fen: 'r3r1k1/pp3ppp/2p2n2/8/3P4/2N2N2/PP3PPP/R3R1K1 w - - 0 15',
    toMove: 'white',
    
    introduction: 'Before invading on an open file, you must first gain complete control. Double your rooks to dominate.',
    
    keyIdeas: [
      'Control the file before invading',
      'Double rooks on open files',
      'Contest enemy rooks first'
    ],
    
    mainLine: [
      { move: 'Rad1', isMainLine: true, annotation: '!', explanation: 'Seizing the d-file!' },
      { move: 'Rad8', isMainLine: true, annotation: '', explanation: 'Black contests.' },
      { move: 'Rxd8', isMainLine: true, annotation: '', explanation: 'Trading.' },
      { move: 'Rxd8', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Rd1', isMainLine: true, annotation: '!!', explanation: 'Now White controls the only open file!', highlights: ['d1'] }
    ],
    
    summary: 'Control the open file by doubling rooks and trading when advantageous.',
    keyTakeaways: ['The player who controls the open file wins it', 'Double before invading'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  // ============================================
  // BISHOP PAIR PATTERNS
  // ============================================
  {
    id: 'bishop-pair-open-position',
    category: 'BISHOP_PAIR',
    title: 'Bishops in Open Positions',
    subtitle: 'The bishops dominate',
    fen: 'r1bq1rk1/pp2ppbp/2n3p1/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The two bishops are particularly strong in open positions where they can control long diagonals.',
    
    keyIdeas: [
      'Open the position for bishops',
      'Bishops control more squares than knights in open play',
      'Coordinate the bishops to cover both colors'
    ],
    
    mainLine: [
      { move: 'Bf4', isMainLine: true, annotation: '!', explanation: 'Developing actively.' },
      { move: 'Nh5', isMainLine: true, annotation: '', explanation: 'Black attacks the bishop.' },
      { move: 'Be3', isMainLine: true, annotation: '', explanation: 'Retreating but staying active.' },
      { move: 'Nf6', isMainLine: true, annotation: '', explanation: 'Knight returns.' },
      { move: 'Qd2', isMainLine: true, annotation: '!', explanation: 'Connecting rooks and preparing Bh6.', arrows: [{ from: 'd2', to: 'h6', color: 'yellow' }] }
    ],
    
    summary: 'The bishop pair controls the open board beautifully.',
    keyTakeaways: ['Bishops love open positions', 'Coordinate both bishops'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // ============================================
  // GOOD VS BAD BISHOP
  // ============================================
  {
    id: 'good-bad-bishop-blocked',
    category: 'GOOD_BAD_BISHOP',
    title: 'The Bad Bishop',
    subtitle: 'Blocked by own pawns',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'A bad bishop is blocked by its own pawns. We exploit this by attacking squares of the opposite color.',
    
    keyIdeas: [
      'A bad bishop is blocked by its own pawns',
      'Attack squares the bad bishop cannot defend',
      'Trade bad bishops for good ones'
    ],
    
    mainLine: [
      { move: 'd5', isMainLine: true, annotation: '!', explanation: 'Closing the center. Black\'s bishop is now "bad" - blocked by pawns on dark squares!' },
      { move: 'Na5', isMainLine: true, annotation: '', explanation: 'Black seeks counterplay.' },
      { move: 'Bg5', isMainLine: true, annotation: '!', explanation: 'Exploiting the light squares!', highlights: ['g5', 'h6'] }
    ],
    
    summary: 'We exploited the bad bishop by controlling the squares it cannot reach.',
    keyTakeaways: ['A bad bishop is blocked by its pawns', 'Attack the weak color complex'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // SPACE ADVANTAGE PATTERNS
  // ============================================
  {
    id: 'space-advantage-pawn-chain',
    category: 'SPACE_ADVANTAGE',
    title: 'Space Through Pawn Advance',
    subtitle: 'Controlling territory',
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    
    introduction: 'Space advantage comes from advanced pawns that restrict enemy pieces. More space means more maneuvering room.',
    
    keyIdeas: [
      'Advanced pawns restrict enemy pieces',
      'Space allows piece maneuvers',
      'Use space to prepare attacks'
    ],
    
    mainLine: [
      { move: 'e5', isMainLine: true, annotation: '!', explanation: 'Gaining space! Black\'s pieces are cramped.' },
      { move: 'Nd7', isMainLine: true, annotation: '', explanation: 'Knight retreats.' },
      { move: 'Bf4', isMainLine: true, annotation: '', explanation: 'Developing with control.' },
      { move: 'f6', isMainLine: true, annotation: '', explanation: 'Black tries to challenge.' },
      { move: 'Qd2', isMainLine: true, annotation: '!', explanation: 'Preparing to exploit the space advantage.', highlights: ['e5', 'd4'] }
    ],
    
    summary: 'Space advantage restricts the opponent and gives room for maneuvers.',
    keyTakeaways: ['Advanced pawns create space', 'Use space to maneuver'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'space-advantage-restrict',
    category: 'SPACE_ADVANTAGE',
    title: 'Restricting the Opponent',
    subtitle: 'Squeeze them slowly',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'When you have a space advantage, slowly squeeze the opponent. Restrict their pieces and expand.',
    
    keyIdeas: [
      'Prevent counterplay first',
      'Expand slowly on both wings',
      'Keep the opponent cramped'
    ],
    
    mainLine: [
      { move: 'd5', isMainLine: true, annotation: '!', explanation: 'Closing the center and gaining more space!' },
      { move: 'Ne5', isMainLine: true, annotation: '', explanation: 'Black seeks activity.' },
      { move: 'Nxe5', isMainLine: true, annotation: '', explanation: 'Trading.' },
      { move: 'Bxe5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'f4', isMainLine: true, annotation: '!', explanation: 'Pushing the bishop back and gaining more space!', highlights: ['d5', 'e4', 'f4'] }
    ],
    
    summary: 'We slowly squeezed Black with d5 and f4, gaining complete control.',
    keyTakeaways: ['Use space to squeeze slowly', 'Prevent counterplay'],
    difficulty: 4,
    estimatedMinutes: 7
  },

  // ============================================
  // PROPHYLAXIS PATTERNS
  // ============================================
  {
    id: 'prophylaxis-prevent-break',
    category: 'PROPHYLAXIS',
    title: 'Preventing Enemy Plans',
    subtitle: 'Stop them before they start',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'Prophylaxis means preventing your opponent\'s plans. Ask "what does my opponent want?" before making your move.',
    
    keyIdeas: [
      'Think about what opponent wants',
      'Prevent their best ideas',
      'Improve your position while preventing theirs'
    ],
    
    mainLine: [
      { move: 'h3', isMainLine: true, annotation: '!', explanation: 'Prophylaxis! Preventing ...Bg4 which would pin the knight.', conceptTag: 'Prophylaxis' },
      { move: 'e5', isMainLine: true, annotation: '', explanation: 'Black challenges.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Taking.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nd5', isMainLine: true, annotation: '!', explanation: 'Now the knight goes to d5 without being pinned!' }
    ],
    
    summary: 'h3 was prophylactic - it prevented ...Bg4 before it could happen.',
    keyTakeaways: ['Always ask what opponent wants', 'Prevent before they execute'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'prophylaxis-nimzo',
    category: 'PROPHYLAXIS',
    title: 'Nimzowitsch\'s Prophylaxis',
    subtitle: 'Restraint and control',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Nimzowitsch taught that prophylaxis is essential. Control what your opponent wants to do.',
    
    keyIdeas: [
      'Restrain enemy pawn breaks',
      'Control key squares prophylactically',
      'Limit opponent\'s options'
    ],
    
    mainLine: [
      { move: 'e3', isMainLine: true, annotation: '!', explanation: 'Solid and prophylactic - preventing ...c5-c4.' },
      { move: 'Bd6', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Bd3', isMainLine: true, annotation: '', explanation: 'Developing.' },
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Black castles.' },
      { move: 'O-O', isMainLine: true, annotation: '!', explanation: 'White has a harmonious position with no weaknesses.' }
    ],
    
    summary: 'Prophylaxis creates a solid, controlled position.',
    keyTakeaways: ['Restrain before attacking', 'Control limits options'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MINORITY ATTACK
  // ============================================
  {
    id: 'minority-attack-classic',
    category: 'MINORITY_ATTACK',
    title: 'The Classic Minority Attack',
    subtitle: 'b4-b5 to create weakness',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The minority attack uses fewer pawns to attack more pawns. b4-b5 creates weaknesses in Black\'s queenside.',
    
    keyIdeas: [
      'Use fewer pawns to attack more',
      'b5 creates a weakness on c6',
      'Target the resulting weakness'
    ],
    
    mainLine: [
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'Starting the minority attack!' },
      { move: 'cxb4', isMainLine: true, annotation: '', explanation: 'Black captures.' },
      { move: 'axb4', isMainLine: true, annotation: '', explanation: 'Recapturing.' },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'b5', isMainLine: true, annotation: '!', explanation: 'Breaking through! c6 will be weak.', arrows: [{ from: 'b5', to: 'c6', color: 'red' }] }
    ],
    
    summary: 'The minority attack creates permanent weaknesses.',
    keyTakeaways: ['b4-b5 is the classic minority attack', 'Creates c6 weakness'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // ============================================
  // KING ACTIVITY PATTERNS
  // ============================================
  {
    id: 'king-activity-endgame',
    category: 'KING_ACTIVITY',
    title: 'The Active King',
    subtitle: 'In endgames, the king fights',
    fen: '8/5pk1/6p1/4p1P1/4P3/8/5K2/8 w - - 0 40',
    toMove: 'white',
    
    introduction: 'In endgames, the king becomes a powerful fighting piece. Centralize it immediately!',
    
    keyIdeas: [
      'The king is strong in endgames',
      'Centralize the king early',
      'Use the king to attack pawns'
    ],
    
    mainLine: [
      { move: 'Ke3', isMainLine: true, annotation: '!', explanation: 'Centralizing the king!' },
      { move: 'Kf7', isMainLine: true, annotation: '', explanation: 'Black activates too.' },
      { move: 'Kd4', isMainLine: true, annotation: '!', explanation: 'The king marches forward!' },
      { move: 'Ke6', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Kc5', isMainLine: true, annotation: '!!', explanation: 'The king penetrates!', highlights: ['c5'] }
    ],
    
    summary: 'The active king won the game by penetrating into enemy territory.',
    keyTakeaways: ['Activate the king in endgames', 'March toward weak pawns'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  {
    id: 'king-activity-attack',
    category: 'KING_ACTIVITY',
    title: 'King Leads the Attack',
    subtitle: 'The king as attacker',
    fen: '8/pp3k2/2p2p2/4pPp1/2P1P1P1/1P6/P4K2/8 w - - 0 35',
    toMove: 'white',
    
    introduction: 'When all the pieces are gone, the king becomes a powerful attacking piece.',
    
    keyIdeas: [
      'King penetration is often decisive',
      'Use king to support pawn advances',
      'The king can attack from multiple directions'
    ],
    
    mainLine: [
      { move: 'Ke3', isMainLine: true, annotation: '!', explanation: 'King advances!' },
      { move: 'Ke7', isMainLine: true, annotation: '', explanation: 'Black mirrors.' },
      { move: 'Kd4', isMainLine: true, annotation: '!', explanation: 'Heading to c5!' },
      { move: 'Kd6', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'Creating a passed pawn!' }
    ],
    
    summary: 'The king led the attack by marching forward.',
    keyTakeaways: ['King attacks in endgames', 'Support pawn advances'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // CENTRALIZATION PATTERNS
  // ============================================
  {
    id: 'centralization-pieces',
    category: 'CENTRALIZATION',
    title: 'Piece Centralization',
    subtitle: 'Central pieces dominate',
    fen: 'r1bq1rk1/pp2ppbp/2n2np1/3p4/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'Central pieces control more squares and have more power. Centralize before attacking.',
    
    keyIdeas: [
      'Central pieces control more squares',
      'Centralize before attacking',
      'Knights love the center'
    ],
    
    mainLine: [
      { move: 'Re1', isMainLine: true, annotation: '!', explanation: 'Centralizing the rook!' },
      { move: 'e5', isMainLine: true, annotation: '', explanation: 'Black challenges.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Taking.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nd5', isMainLine: true, annotation: '!!', explanation: 'THE KNIGHT CENTRALIZES! It dominates from d5.', highlights: ['d5'] }
    ],
    
    summary: 'Centralization gives pieces maximum power.',
    keyTakeaways: ['Centralize pieces before attacking', 'Knights love central squares'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  {
    id: 'centralization-queen',
    category: 'CENTRALIZATION',
    title: 'The Centralized Queen',
    subtitle: 'Queen in the center',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A centralized queen controls many squares and creates threats in all directions.',
    
    keyIdeas: [
      'Central queen controls both wings',
      'Time the queen entry correctly',
      'Don\'t centralize too early'
    ],
    
    mainLine: [
      { move: 'Qd3', isMainLine: true, annotation: '!', explanation: 'Centralizing the queen!' },
      { move: 'Re8', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Rd1', isMainLine: true, annotation: '', explanation: 'Connecting rooks.' },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Qd4', isMainLine: true, annotation: '!', explanation: 'The queen dominates from d4!', highlights: ['d4'] }
    ],
    
    summary: 'The centralized queen creates threats everywhere.',
    keyTakeaways: ['Central queen is powerful', 'Time the centralization correctly'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE WEAK PAWNS
  // ============================================
  {
    id: 'weak-pawns-isolated',
    category: 'WEAK_PAWNS',
    title: 'The Isolated d-Pawn',
    subtitle: 'Blockade and attack',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The isolated d-pawn (IQP) can be a weakness in the endgame. Blockade it and attack it.',
    
    keyIdeas: [
      'Blockade the isolated pawn',
      'Target it with rooks',
      'Trade pieces to reach a favorable endgame'
    ],
    
    mainLine: [
      { move: 'Nb5', isMainLine: true, annotation: '!', explanation: 'Attacking c7 and preparing Nd4!' },
      { move: 'Qb6', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Nd4', isMainLine: true, annotation: '!!', explanation: 'BLOCKADE! The knight blocks the IQP.', highlights: ['d4', 'd5'] },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Bd2', isMainLine: true, annotation: '!', explanation: 'Developing and preparing Rc1.' }
    ],
    
    summary: 'We blockaded the isolated pawn and prepared to attack it.',
    keyTakeaways: ['Blockade isolated pawns', 'Knights make great blockaders'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // ============================================
  // MORE PAWN STRUCTURE
  // ============================================
  {
    id: 'pawn-structure-carlsbad',
    category: 'PAWN_STRUCTURE',
    title: 'Carlsbad Structure',
    subtitle: 'The minority attack',
    fen: 'r1bqk2r/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w kq - 0 8',
    toMove: 'white',
    
    introduction: 'The Carlsbad structure arises from the Exchange QGD. White plays a minority attack on the queenside.',
    
    keyIdeas: [
      'b4-b5 creates queenside weaknesses',
      'Target the c6 pawn after b5',
      'Black counterattacks on the kingside'
    ],
    
    mainLine: [
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Castling first.' },
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Black castles.' },
      { move: 'a3', isMainLine: true, annotation: '!', explanation: 'Preparing b4!' },
      { move: 'Re8', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'The minority attack begins!', arrows: [{ from: 'b4', to: 'b5', color: 'green' }] }
    ],
    
    summary: 'The Carlsbad structure leads to a minority attack.',
    keyTakeaways: ['Learn the Carlsbad plans', 'b4-b5 creates weaknesses'],
    difficulty: 4,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE OUTPOSTS
  // ============================================
  {
    id: 'outpost-d6-penetration',
    category: 'OUTPOSTS',
    title: 'The d6 Penetration',
    subtitle: 'Deep outpost in enemy territory',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BPP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A knight on d6 is deep in enemy territory, attacking multiple pieces and severely cramping Black.',
    keyIdeas: ['d6 attacks b7 and f7', 'Knights on the 6th rank are powerful', 'Prepare with Nb5'],
    mainLine: [
      { move: 'Nb5', isMainLine: true, annotation: '!', explanation: 'Heading to d6!' },
      { move: 'a6', isMainLine: true, annotation: '', explanation: 'Black tries to kick.' },
      { move: 'Nd6', isMainLine: true, annotation: '!!', explanation: 'THE KNIGHT LANDS! It attacks b7 and f7.', highlights: ['d6'] }
    ],
    summary: 'The d6 outpost is devastating, attacking multiple pawns.',
    keyTakeaways: ['d6 is a powerful penetration square', 'Worth sacrificing material for'],
    difficulty: 4,
    estimatedMinutes: 6
  },

  // ============================================
  // MORE WEAK PAWNS
  // ============================================
  {
    id: 'weak-pawns-backward',
    category: 'WEAK_PAWNS',
    title: 'The Backward Pawn',
    subtitle: 'A permanent target',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A backward pawn cannot advance safely and becomes a target. We create and exploit this weakness.',
    keyIdeas: ['Backward pawns cannot advance', 'Target with rooks on the file', 'Blockade the pawn'],
    mainLine: [
      { move: 'd5', isMainLine: true, annotation: '!', explanation: 'Fixing Black\'s structure. The c6-pawn is now backward!', highlights: ['c6'] },
      { move: 'Na5', isMainLine: true, annotation: '', explanation: 'Black tries counterplay.' },
      { move: 'Rc1', isMainLine: true, annotation: '!', explanation: 'Targeting the weak c-file!' }
    ],
    summary: 'We created a backward c6-pawn and targeted it.',
    keyTakeaways: ['Create backward pawns with pawn advances', 'Target on the file'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'weak-pawns-hanging',
    category: 'WEAK_PAWNS',
    title: 'Hanging Pawns',
    subtitle: 'Two pawns, double target',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/1P2PN2/PB2BPPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'Hanging pawns on c5 and d5 can be attacked from multiple sides.',
    keyIdeas: ['Hanging pawns support each other but are weak', 'Attack the base', 'Force one to advance'],
    mainLine: [
      { move: 'cxd5', isMainLine: true, annotation: '!', explanation: 'Breaking up the hanging pawns!' },
      { move: 'exd5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nc3', isMainLine: true, annotation: '!', explanation: 'Now attacking d5!', arrows: [{ from: 'c3', to: 'd5', color: 'red' }] }
    ],
    summary: 'We broke up the hanging pawns to create weaknesses.',
    keyTakeaways: ['Hanging pawns can become weak after exchanges', 'Attack systematically'],
    difficulty: 4,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE OPEN FILES
  // ============================================
  {
    id: 'open-file-invasion',
    category: 'OPEN_FILES',
    title: 'Rook Invasion',
    subtitle: 'Penetrating to the 7th rank',
    fen: 'r3r1k1/pp3ppp/2p5/8/3P4/2N5/PP3PPP/R3R1K1 w - - 0 18',
    toMove: 'white',
    introduction: 'Once you control an open file, invade! The 7th rank is the goal.',
    keyIdeas: ['Control first, then invade', 'The 7th rank attacks pawns', 'Two rooks on 7th often wins'],
    mainLine: [
      { move: 'Re7', isMainLine: true, annotation: '!!', explanation: 'THE 7TH RANK! The rook dominates.', highlights: ['e7'] },
      { move: 'Rf8', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Rae1', isMainLine: true, annotation: '!', explanation: 'Doubling to dominate!' }
    ],
    summary: 'Rook invasion to the 7th rank is decisive.',
    keyTakeaways: ['The 7th rank is the "goal line"', 'Double rooks when possible'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE BISHOP PAIR
  // ============================================
  {
    id: 'bishop-pair-endgame',
    category: 'BISHOP_PAIR',
    title: 'Bishops in the Endgame',
    subtitle: 'Two bishops dominate',
    fen: '8/pp3pkp/3p4/4p3/4P3/2B2P2/PP4PP/4B1K1 w - - 0 30',
    toMove: 'white',
    introduction: 'In the endgame, two bishops can dominate a knight or single bishop.',
    keyIdeas: ['Bishops control long diagonals', 'Coordinate both bishops', 'Restrict the enemy king'],
    mainLine: [
      { move: 'Bd5+', isMainLine: true, annotation: '!', explanation: 'Check and dominating the long diagonal!' },
      { move: 'Kf6', isMainLine: true, annotation: '', explanation: 'King moves.' },
      { move: 'Ba3', isMainLine: true, annotation: '!', explanation: 'Both bishops are active!', highlights: ['a3', 'd5'] }
    ],
    summary: 'Two bishops coordinate beautifully in endgames.',
    keyTakeaways: ['Bishops are strong in open endgames', 'Coordinate both colors'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE GOOD/BAD BISHOP
  // ============================================
  {
    id: 'good-bishop-active',
    category: 'GOOD_BAD_BISHOP',
    title: 'The Active Bishop',
    subtitle: 'Outside the pawn chain',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A good bishop is one that is not blocked by its own pawns and has active diagonals.',
    keyIdeas: ['Place pawns on opposite color to your bishop', 'Keep diagonals open', 'Activate passive bishops'],
    mainLine: [
      { move: 'Qd2', isMainLine: true, annotation: '!', explanation: 'Preparing Bh6 to trade bishops!' },
      { move: 'Nh5', isMainLine: true, annotation: '', explanation: 'Black attacks.' },
      { move: 'Bh6', isMainLine: true, annotation: '!', explanation: 'Trading the good bishop for Black\'s!', arrows: [{ from: 'e3', to: 'h6', color: 'green' }] }
    ],
    summary: 'We activated our bishop by trading it for Black\'s good one.',
    keyTakeaways: ['Trade bad bishops for good ones', 'Activate passive pieces'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE SPACE ADVANTAGE
  // ============================================
  {
    id: 'space-cramp',
    category: 'SPACE_ADVANTAGE',
    title: 'The Cramped Position',
    subtitle: 'No room to maneuver',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When your opponent is cramped, prevent counterplay and slowly squeeze.',
    keyIdeas: ['Cramped positions lead to errors', 'Prevent pawn breaks', 'Expand slowly'],
    mainLine: [
      { move: 'a4', isMainLine: true, annotation: '!', explanation: 'Preventing ...b5 and gaining more space!' },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black is cramped.' },
      { move: 'Bf4', isMainLine: true, annotation: '!', explanation: 'Controlling key squares.' }
    ],
    summary: 'We maintained our space advantage by preventing counterplay.',
    keyTakeaways: ['Prevent pawn breaks', 'Expand when space is yours'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE PROPHYLAXIS
  // ============================================
  {
    id: 'prophylaxis-karpov',
    category: 'PROPHYLAXIS',
    title: 'Karpov\'s Prophylaxis',
    subtitle: 'Preventing before improving',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'Karpov was the master of prophylaxis. Always ask what your opponent wants.',
    keyIdeas: ['Ask what opponent wants', 'Prevent before they execute', 'Small improvements add up'],
    mainLine: [
      { move: 'Be3', isMainLine: true, annotation: '!', explanation: 'Preventing ...Ng4 and supporting d4.' },
      { move: 'e5', isMainLine: true, annotation: '', explanation: 'Black challenges.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Taking.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nd5', isMainLine: true, annotation: '!', explanation: 'Now the knight jumps in!', highlights: ['d5'] }
    ],
    summary: 'Prophylaxis prepared our position before executing.',
    keyTakeaways: ['Think prophylactically', 'Small moves have big effects'],
    difficulty: 4,
    estimatedMinutes: 6
  },

  // ============================================
  // MORE PAWN BREAKS
  // ============================================
  {
    id: 'pawn-break-c5',
    category: 'PAWN_BREAKS',
    title: 'The c5 Break',
    subtitle: 'Challenging the center',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    introduction: 'The ...c5 break challenges White\'s center and creates counterplay.',
    keyIdeas: ['c5 challenges d4', 'Opens the c-file', 'Creates hanging pawns'],
    mainLine: [
      { move: 'c5', isMainLine: true, annotation: '!', explanation: 'The thematic break!' },
      { move: 'd5', isMainLine: true, annotation: '', explanation: 'White advances.' },
      { move: 'e6', isMainLine: true, annotation: '!', explanation: 'Challenging the center!' }
    ],
    summary: 'The c5 break creates counterplay.',
    keyTakeaways: ['c5 is thematic in many structures', 'Opens lines for pieces'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  {
    id: 'pawn-break-d5',
    category: 'PAWN_BREAKS',
    title: 'The d5 Advance',
    subtitle: 'Central breakthrough',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'The d5 advance opens lines and creates passed pawns.',
    keyIdeas: ['d5 opens the position', 'Creates passed pawn potential', 'Opens diagonals for bishops'],
    mainLine: [
      { move: 'd5', isMainLine: true, annotation: '!', explanation: 'Breaking through!' },
      { move: 'exd5', isMainLine: true, annotation: '', explanation: 'Black captures.' },
      { move: 'cxd5', isMainLine: true, annotation: '!', explanation: 'Passed pawn!', highlights: ['d5'] }
    ],
    summary: 'd5 creates a powerful passed pawn.',
    keyTakeaways: ['d5 is often the key central break', 'Creates passed pawns'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE KNIGHT PLACEMENT
  // ============================================
  {
    id: 'knight-rim-outpost',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Rim Knight',
    subtitle: 'When the rim is right',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A knight on the rim is usually dim, but outposts on a5 or h5 can be strong.',
    keyIdeas: ['Rim knights need outposts', 'a5/h5 can be powerful', 'Support with other pieces'],
    mainLine: [
      { move: 'Na4', isMainLine: true, annotation: '!', explanation: 'Heading to c5!' },
      { move: 'b6', isMainLine: true, annotation: '', explanation: 'Black prevents.' },
      { move: 'c5', isMainLine: true, annotation: '!', explanation: 'Breaking through anyway!' }
    ],
    summary: 'The rim knight headed to a powerful square.',
    keyTakeaways: ['Rim knights need strong destinations', 'a5/c5 maneuver is common'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE PIECE COORDINATION
  // ============================================
  {
    id: 'coordination-battery',
    category: 'PIECE_COORDINATION',
    title: 'The Queen-Bishop Battery',
    subtitle: 'Diagonal power',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PP1QBPPP/R4RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A queen and bishop on the same diagonal create powerful threats.',
    keyIdeas: ['Batteries multiply attacking power', 'Queen behind bishop', 'Target weak points'],
    mainLine: [
      { move: 'Bh6', isMainLine: true, annotation: '!', explanation: 'Creating the battery!' },
      { move: 'Bxh6', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'Qxh6', isMainLine: true, annotation: '!', explanation: 'Queen arrives with threats!', highlights: ['h6'] }
    ],
    summary: 'The queen-bishop battery created threats.',
    keyTakeaways: ['Batteries are powerful on open diagonals', 'Coordinate major and minor pieces'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE EXCHANGE STRATEGY
  // ============================================
  {
    id: 'exchange-simplify',
    category: 'EXCHANGE_STRATEGY',
    title: 'Simplifying to Win',
    subtitle: 'Trade when ahead',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'When you have an advantage, simplify! Fewer pieces means fewer counterchances.',
    keyIdeas: ['Trade when ahead', 'Reduce counterplay', 'Head toward winning endgame'],
    mainLine: [
      { move: 'Nxf6+', isMainLine: true, annotation: '!', explanation: 'Trading pieces when ahead!' },
      { move: 'Bxf6', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Bf4', isMainLine: true, annotation: '!', explanation: 'Continuing development.' }
    ],
    summary: 'We simplified to reduce Black\'s chances.',
    keyTakeaways: ['Trade when ahead', 'Simplification reduces counterplay'],
    difficulty: 2,
    estimatedMinutes: 4
  },

  // ============================================
  // MORE BLOCKADE
  // ============================================
  {
    id: 'blockade-passed-pawn',
    category: 'BLOCKADE',
    title: 'Blockading the Passed Pawn',
    subtitle: 'Stop it cold',
    fen: '8/pp3k2/2p5/3pP3/3P4/8/PP3PPP/4K3 w - - 0 30',
    toMove: 'white',
    introduction: 'A passed pawn must be blockaded before it becomes dangerous.',
    keyIdeas: ['Knights are ideal blockaders', 'Blockade on the pawn\'s path', 'Then attack the base'],
    mainLine: [
      { move: 'Kd3', isMainLine: true, annotation: '!', explanation: 'King blockades!' },
      { move: 'Ke6', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Kc3', isMainLine: true, annotation: '!', explanation: 'Preparing b4!', arrows: [{ from: 'b2', to: 'b4', color: 'yellow' }] }
    ],
    summary: 'We blockaded the passed pawn with the king.',
    keyTakeaways: ['Blockade first, then attack', 'Kings can be blockaders in endgames'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  // ============================================
  // MORE CENTRALIZATION
  // ============================================
  {
    id: 'centralization-knights',
    category: 'CENTRALIZATION',
    title: 'Central Knights',
    subtitle: 'Knights in the middle',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'Central knights control the board. e5 and d5 are dream squares.',
    keyIdeas: ['Central knights control many squares', 'Support with pawns', 'Jump to outposts'],
    mainLine: [
      { move: 'Ne5', isMainLine: true, annotation: '!', explanation: 'Central domination!' },
      { move: 'Nxe5', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'dxe5', isMainLine: true, annotation: '!', explanation: 'Passed pawn potential!', highlights: ['e5'] }
    ],
    summary: 'Central knights lead to great positions.',
    keyTakeaways: ['Centralize knights first', 'e5 and d5 are key squares'],
    difficulty: 2,
    estimatedMinutes: 4
  },

  // ============================================
  // MORE MINORITY ATTACK
  // ============================================
  {
    id: 'minority-attack-execution',
    category: 'MINORITY_ATTACK',
    title: 'Executing the Minority Attack',
    subtitle: 'Breaking through',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/1PPP4/2N1PN2/P3BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'After b4-b5, we must follow through and target the weakness.',
    keyIdeas: ['b5 creates weakness on c6', 'Double rooks on c-file', 'Pressure relentlessly'],
    mainLine: [
      { move: 'b5', isMainLine: true, annotation: '!', explanation: 'Breaking through!' },
      { move: 'cxb5', isMainLine: true, annotation: '', explanation: 'Black captures.' },
      { move: 'cxb5', isMainLine: true, annotation: '!', explanation: 'Now c6 is weak!', arrows: [{ from: 'a1', to: 'c1', color: 'green' }], highlights: ['c6'] }
    ],
    summary: 'The minority attack created a permanent weakness.',
    keyTakeaways: ['Follow through after b5', 'Target the resulting weakness'],
    difficulty: 4,
    estimatedMinutes: 6
  },

  // ============================================
  // MORE KING ACTIVITY
  // ============================================
  {
    id: 'king-activity-march',
    category: 'KING_ACTIVITY',
    title: 'The King March',
    subtitle: 'Walk to victory',
    fen: '8/pp3k2/2p2p2/3p4/3P1P2/2P1K3/PP6/8 w - - 0 35',
    toMove: 'white',
    introduction: 'In king and pawn endgames, the king must be active. March toward the enemy pawns!',
    keyIdeas: ['Centralize immediately', 'Attack enemy pawns', 'Create passed pawns'],
    mainLine: [
      { move: 'Kd4', isMainLine: true, annotation: '!', explanation: 'King marches forward!' },
      { move: 'Ke6', isMainLine: true, annotation: '', explanation: 'Black centralizes too.' },
      { move: 'Kc5', isMainLine: true, annotation: '!', explanation: 'Threatening the queenside!', highlights: ['c5'] }
    ],
    summary: 'The king march decided the game.',
    keyTakeaways: ['Kings are powerful in endgames', 'March toward weaknesses'],
    difficulty: 3,
    estimatedMinutes: 5
  }
];

export default additionalPatterns;

