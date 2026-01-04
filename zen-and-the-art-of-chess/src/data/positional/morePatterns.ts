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
    fen: 'r1bq1rk1/pppn1pbp/3p2p1/4pp2/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 9',
    toMove: 'black',
    
    introduction: 'The ...f5 break is the thematic pawn break in the King\'s Indian Defense. After ...f5, Black can capture on e4, opening the f-file and creating attacking chances.',
    
    keyIdeas: [
      'Pawn breaks open lines and create weaknesses',
      'Timing is crucial—prepare before executing',
      'The break often sacrifices material for activity',
      'Follow up immediately with piece activity'
    ],
    
    mainLine: [
      {
        move: 'fxe4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The classic King\'s Indian break! Black captures on e4, opening the f-file and creating attacking chances.',
        arrows: [
          { from: 'f5', to: 'e4', color: 'green' }
        ],
        highlights: ['e4', 'f5'],
        conceptTag: 'The Thematic Break'
      },
      {
        move: 'Nxe4',
        isMainLine: true,
        annotation: '',
        explanation: 'White recaptures with the knight.',
        arrows: [{ from: 'f3', to: 'e4', color: 'blue' }]
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Activating the knight and preparing to build an attack.',
        arrows: [{ from: 'd7', to: 'f6', color: 'green' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops.',
        arrows: [{ from: 'e2', to: 'd3', color: 'blue' }]
      },
      {
        move: 'Qe8',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen swings to the kingside! From e8 it can go to h5, joining the attack.',
        arrows: [
          { from: 'd8', to: 'e8', color: 'green' },
          { from: 'e8', to: 'h5', color: 'yellow' }
        ],
        conceptTag: 'Queen to the Attack'
      },
      {
        move: 'Ng3',
        isMainLine: true,
        annotation: '',
        explanation: 'White repositions the knight to defend h2.',
        arrows: [{ from: 'e4', to: 'g3', color: 'blue' }]
      },
      {
        move: 'Qh5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen arrives on the kingside with threats! Even with the g3 knight defending, Black has a strong attack.',
        arrows: [
          { from: 'e8', to: 'h5', color: 'green' },
          { from: 'h5', to: 'h2', color: 'yellow' }
        ],
        highlights: ['h5', 'h2', 'g3'],
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
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape the pressure by moving the king, but the attack continues!',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Rg1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ROOK LIFT! The rook on h1 moves to g1, preparing to lift to g3. This brings the rook into the attack and coordinates with other pieces for a devastating assault!',
        arrows: [
          { from: 'h1', to: 'g1', color: 'green' },
          { from: 'g1', to: 'g3', color: 'yellow' }
        ],
        highlights: ['g1'],
        conceptTag: 'The Rook Lift!'
      },
      {
        move: 'Rg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend the g-file, but the attack continues!',
        arrows: [{ from: 'f8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Qg7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The coordinated attack with Qh6, Rg1, and the pawn on h5 creates an irresistible assault. The rook lift concept is demonstrated—pieces working together in perfect harmony.',
        arrows: [
          { from: 'h6', to: 'g7', color: 'green' }
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
        move: 'Ne6',
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
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
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
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the queen, but White continues the plan.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '',
        explanation: 'Completing development. White has a clear plan: target the doubled c-pawns with Qa4-a6.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend the c-file, but White\'s attack is coming.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks on the c-file! White targets the doubled c-pawns. Black will have to tie pieces down to defend the weakness.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c1', 'c6'],
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
        move: 'Ng5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight springs into the attack! It threatens Nxh7 followed by Qg7#. The dark squares around Black\'s king are weak after the bishop trade!',
        arrows: [
          { from: 'f3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'h7', color: 'yellow' }
        ],
        highlights: ['g5', 'h7'],
        conceptTag: 'Knight Attack'
      },
      {
        move: 'Bf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blunt the attack by trading pieces, but the attack continues!',
        arrows: [{ from: 'c8', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'We take, opening lines toward the king. The attack gains momentum!',
        arrows: [
          { from: 'd3', to: 'f5', color: 'green' }
        ],
        highlights: ['f5'],
        conceptTag: 'Opening Lines'
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
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the rook into the attack! The coordinated pieces (Ng5, Bf5, Re1, Qd2) create strong threats. The IQP position has generated a winning attack!',
        arrows: [
          { from: 'a1', to: 'e1', color: 'green' }
        ],
        highlights: ['e1', 'g5', 'f5'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but the attack is too strong!',
        arrows: [{ from: 'e8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight sacrifice! This opens the position and creates devastating threats. The coordinated pieces create a winning attack!',
        arrows: [
          { from: 'g5', to: 'f7', color: 'green' }
        ],
        highlights: ['f7'],
        conceptTag: 'Knight Sacrifice'
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
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Castling first to secure the king.' },
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'Black castles as well.' },
      { move: 'Ne5', isMainLine: true, annotation: '!', explanation: 'The knight jumps to e5! This central outpost controls many squares and cannot be challenged by pawns.', highlights: ['e5'], arrows: [{ from: 'f3', to: 'e5', color: 'green' }, { from: 'e5', to: 'f7', color: 'yellow' }, { from: 'e5', to: 'd7', color: 'yellow' }] },
      { move: 'Nxe5', isMainLine: true, annotation: '', explanation: 'Black trades the knight, but this gives White a strong central pawn.' },
      { move: 'dxe5', isMainLine: true, annotation: '!', explanation: 'Recapturing with the pawn. Now e5 is a strong central square, and White can use d4 for the other knight.', highlights: ['e5', 'd4'] },
      { move: 'd4', isMainLine: true, annotation: '', explanation: 'Black advances the pawn.' },
      { move: 'c5', isMainLine: true, annotation: '!!', explanation: 'Advancing the c-pawn! White now has a strong central pawn on e5 and can use the c-pawn to create more pressure. The position is dominant.', highlights: ['e5', 'c5'], arrows: [{ from: 'c4', to: 'c5', color: 'green' }] }
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
      { move: 'Nb5', isMainLine: true, annotation: '!', explanation: 'The knight jumps to b5! This square attacks c7 and d6, creating pressure on the queenside.', highlights: ['b5'], arrows: [{ from: 'c3', to: 'b5', color: 'green' }, { from: 'b5', to: 'c7', color: 'yellow' }, { from: 'b5', to: 'd6', color: 'yellow' }] },
      { move: 'a6', isMainLine: true, annotation: '', explanation: 'Black tries to challenge the knight.' },
      { move: 'Nc3', isMainLine: true, annotation: '!', explanation: 'The knight returns, but White can now advance the pawn to create an outpost.', highlights: ['c3'] },
      { move: 'b6', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'c5', isMainLine: true, annotation: '!!', explanation: 'Advancing the c-pawn! This creates a strong central pawn and opens lines for the pieces. The queenside is now under pressure.', highlights: ['c5'], arrows: [{ from: 'c4', to: 'c5', color: 'green' }] }
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
      { move: 'Rfe8', isMainLine: true, annotation: '', explanation: 'Black tries to defend, but the 7th rank is still vulnerable.' },
      { move: 'Red7', isMainLine: true, annotation: '!!', explanation: 'PIGS ON THE SEVENTH! Both rooks dominate the 7th rank.', highlights: ['d7', 'e7'] },
      { move: 'Re7', isMainLine: true, annotation: '', explanation: 'Black tries to challenge, but White still controls the 7th rank.' },
      { move: 'Rxe7', isMainLine: true, annotation: '!', explanation: 'White trades and still dominates the 7th rank with the remaining rook!' }
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
      { move: 'Rxe8+', isMainLine: true, annotation: '!', explanation: 'Trading rooks to maintain control. The check forces Black to recapture.' },
      { move: 'Rxe8', isMainLine: true, annotation: '', explanation: 'Black recaptures, but White still controls the d-file with the remaining rook.' },
      { move: 'Rd3', isMainLine: true, annotation: '!!', explanation: 'White maintains control of the d-file! The rook is active and ready to invade when the opportunity arises.', highlights: ['d3'] }
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
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops, but the bishop pair remains strong.' },
      { move: 'Be3', isMainLine: true, annotation: '', explanation: 'Maintaining the bishop pair and staying active.' },
      { move: 'Re8', isMainLine: true, annotation: '', explanation: 'Black develops the rook.' },
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
    subtitle: 'Exploiting a bishop blocked by its own pawns',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'A "bad" bishop is one blocked by its own pawns—it has limited mobility and cannot defend key squares. Black\'s g7 bishop will become bad when we close the center, allowing us to dominate on the light squares.',
    
    keyIdeas: [
      'A bad bishop is blocked by its own pawns',
      'Attack on the color the bad bishop cannot control',
      'Place pieces on squares the bad bishop cannot reach',
      'Trade your bad bishop for opponent\'s good pieces'
    ],
    
    mainLine: [
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Closing the center! This is the key move. Black\'s g7 bishop is now "bad"—all of Black\'s pawns are on dark squares (d6, e7, g6), blocking their own bishop.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5', 'g7', 'd6', 'e7', 'g6'],
        conceptTag: 'Creating a Bad Bishop'
      },
      { 
        move: 'Na5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s knight seeks counterplay on b3, but the positional damage is done. The bishop on g7 is stuck behind its pawns.',
        arrows: [{ from: 'c6', to: 'a5', color: 'blue' }]
      },
      { 
        move: 'Bg5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Exploiting the light squares! Our bishop is "good"—it operates on the opposite color of our pawns. We attack f6 where Black\'s knight sits.',
        arrows: [{ from: 'c1', to: 'g5', color: 'green' }, { from: 'g5', to: 'f6', color: 'yellow' }],
        highlights: ['g5', 'f6'],
        conceptTag: 'Good vs Bad Bishop'
      },
      { 
        move: 'h6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black kicks the bishop, but this creates another weakness on g6—another light square that Black\'s bishop cannot defend!',
        arrows: [{ from: 'h7', to: 'h6', color: 'blue' }],
        highlights: ['h6', 'g6']
      },
      { 
        move: 'Bxf6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading our good bishop for their knight. This may seem wrong, but the knight was defending light squares. Now Black has no good piece to defend h5, f5, or e6!',
        arrows: [{ from: 'g5', to: 'f6', color: 'green' }],
        highlights: ['f6'],
        conceptTag: 'Strategic Exchange'
      },
      { 
        move: 'Bxf6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must recapture. Now they have a bishop that cannot defend the light squares, creating permanent weaknesses.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The queen eyes h6 (dark square) AND prepares Bh5-g6 invading on light squares. Black\'s bad bishop on f6 cannot stop EITHER threat. This is the punishment for a bad bishop!',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }, { from: 'd2', to: 'h6', color: 'yellow' }, { from: 'e2', to: 'h5', color: 'yellow' }],
        highlights: ['d2', 'h6', 'h5'],
        conceptTag: 'Exploiting Weak Squares'
      }
    ],
    
    summary: 'We closed the center with d5 to make Black\'s bishop bad, then attacked ruthlessly on the light squares where the bishop could not help. A bad bishop is a major strategic liability!',
    keyTakeaways: [
      'Close the position to make enemy bishops bad',
      'Attack on the color the bad bishop cannot defend',
      'Your pieces dominate on the "weak color complex"',
      'A bad bishop is almost like being down material'
    ],
    memoryTip: 'Remember: A bad bishop is "biting granite"—it stares at its own pawns all game!',
    difficulty: 3,
    estimatedMinutes: 8
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
      { move: 'a3', isMainLine: true, annotation: '!', explanation: 'Preparing the minority attack! We need to secure b4 first.' },
      { move: 'b6', isMainLine: true, annotation: '', explanation: 'Black prepares.' },
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'Starting the minority attack!' },
      { move: 'cxb4', isMainLine: true, annotation: '', explanation: 'Black captures.' },
      { move: 'axb4', isMainLine: true, annotation: '', explanation: 'Recapturing, opening the a-file!' },
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
      { move: 'Kf8', isMainLine: true, annotation: '', explanation: 'Black activates too.' },
      { move: 'Kd3', isMainLine: true, annotation: '!', explanation: 'The king marches forward!' },
      { move: 'Ke7', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Kc4', isMainLine: true, annotation: '!!', explanation: 'The king penetrates!', highlights: ['c4'] }
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
      { move: 'Kd3', isMainLine: true, annotation: '!', explanation: 'Heading toward the queenside!' },
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
      { move: 'Nb5', isMainLine: true, annotation: '!', explanation: 'Attacking c7 and preparing to blockade!' },
      { move: 'Qb6', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Nd6', isMainLine: true, annotation: '!!', explanation: 'BLOCKADE! The knight on d6 blocks the d5 pawn and attacks multiple squares.', highlights: ['d6', 'd5'] },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Bd2', isMainLine: true, annotation: '!', explanation: 'Developing and preparing Rc1 to target the weak pawn.', arrows: [{ from: 'a1', to: 'c1', color: 'yellow' }] }
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
    introduction: 'A knight on d6 is deep in enemy territory, attacking multiple pieces and severely cramping Black. The d6 square is one of the most powerful outposts—it attacks b7, f7, e8, and c8 simultaneously!',
    keyIdeas: [
      'd6 attacks b7 and f7 simultaneously',
      'Knights on the 6th rank paralyze the opponent',
      'Prepare the jump with Nb5 first',
      'Even sacrificing a pawn for d6 is often worth it'
    ],
    mainLine: [
      { 
        move: 'Nb5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight heads toward d6! From b5, it threatens both c7 and d6. Black must react.',
        arrows: [{ from: 'c3', to: 'b5', color: 'green' }, { from: 'b5', to: 'd6', color: 'yellow' }, { from: 'b5', to: 'c7', color: 'yellow' }],
        highlights: ['b5'],
        conceptTag: 'Preparing the Invasion'
      },
      { 
        move: 'a6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to kick the knight away, but this weakens b6 and doesn\'t prevent the d6 invasion.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      { 
        move: 'Nd6', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE KNIGHT LANDS ON d6! This is one of the most powerful squares on the board. The knight attacks b7, f7, e8, and c8 while being immune to pawn attacks.',
        arrows: [{ from: 'b5', to: 'd6', color: 'green' }, { from: 'd6', to: 'b7', color: 'red' }, { from: 'd6', to: 'f7', color: 'red' }],
        highlights: ['d6', 'b7', 'f7'],
        conceptTag: 'The Perfect Outpost'
      },
      { 
        move: 'Qe8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black moves the queen to defend f7 and potentially challenge the knight. But the knight is too strong!',
        arrows: [{ from: 'd8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Developing with tempo! The bishop eyes c7 and supports the d6 knight. White\'s pieces coordinate beautifully around the outpost.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'c7', color: 'yellow' }],
        highlights: ['f4', 'd6'],
        conceptTag: 'Supporting the Outpost'
      },
      { 
        move: 'Nd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to challenge the knight, but it\'s too well supported.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Connecting the rooks and preparing Rd1 to add even more pressure. The d6 knight completely dominates the position—Black is paralyzed!',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }, { from: 'a1', to: 'd1', color: 'yellow' }],
        highlights: ['d2', 'd6'],
        conceptTag: 'Total Domination'
      }
    ],
    summary: 'The d6 outpost is devastating, attacking multiple pawns and squares while being immune to pawn attacks. A knight on d6 often paralyzes the opponent\'s entire position.',
    keyTakeaways: [
      'd6 is one of the most powerful penetration squares',
      'Prepare with Nb5, then jump to d6',
      'Support the outpost with other pieces',
      'Worth sacrificing material for such a dominant knight'
    ],
    memoryTip: 'A knight on d6 is like a fork stuck in the enemy\'s position—it pokes everywhere and they can\'t remove it!',
    difficulty: 4,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE WEAK PAWNS
  // ============================================
  {
    id: 'weak-pawns-backward',
    category: 'WEAK_PAWNS',
    title: 'The Backward Pawn',
    subtitle: 'Creating and exploiting a permanent weakness',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A backward pawn is one that cannot safely advance because enemy pawns control the square in front of it. Once created, a backward pawn becomes a permanent target that ties down the defender\'s pieces.',
    keyIdeas: [
      'Backward pawns cannot advance without being captured',
      'Target backward pawns with rooks on the file',
      'Place a piece in front to blockade the pawn',
      'Pile up attackers—the defender runs out of resources'
    ],
    mainLine: [
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'This pawn advance fixes Black\'s structure! Now the e6 pawn cannot advance (d5 blocks it), making the d6 pawn backward. It\'s stuck and will be a target forever.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5', 'd6'],
        conceptTag: 'Creating the Weakness'
      },
      { 
        move: 'Na5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s knight seeks counterplay on c4, but White has a clear plan: target the backward d6 pawn.',
        arrows: [{ from: 'c6', to: 'a5', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Developing the bishop to attack d6 directly! The backward pawn is now under pressure from the bishop.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'd6', color: 'yellow' }],
        highlights: ['f4', 'd6'],
        conceptTag: 'Targeting the Weakness'
      },
      { 
        move: 'Nc4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black gets the knight to c4, but White continues the assault on the backward pawn.',
        arrows: [{ from: 'a5', to: 'c4', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen joins the attack on d6! Now bishop and queen both eye the backward pawn. White prepares to double rooks on the d-file.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }, { from: 'd2', to: 'd6', color: 'yellow' }],
        highlights: ['d2', 'd6']
      },
      { 
        move: 'b6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to support the knight, but the d6 pawn remains weak.',
        arrows: [{ from: 'b7', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'Rad1', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'PILING UP! The rook joins the attack on d6. Now White has bishop, queen, and rook all targeting the backward pawn. Black cannot defend it forever.',
        arrows: [{ from: 'a1', to: 'd1', color: 'green' }, { from: 'd1', to: 'd6', color: 'red' }],
        highlights: ['d1', 'd6'],
        conceptTag: 'Maximum Pressure'
      }
    ],
    summary: 'We created a backward d6 pawn with d5, then systematically piled up pieces against it. The backward pawn became a permanent weakness that consumed all of Black\'s defensive resources.',
    keyTakeaways: [
      'Create backward pawns with pawn advances that fix the structure',
      'Target the weakness with multiple pieces on the file',
      'The backward pawn ties down the defender\'s pieces',
      'Patience—keep adding pressure until it breaks'
    ],
    memoryTip: 'A backward pawn is like an anchor dragging down the position—it can\'t move forward and weighs everything down!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  {
    id: 'weak-pawns-hanging',
    category: 'WEAK_PAWNS',
    title: 'Hanging Pawns',
    subtitle: 'Two pawns that need each other to survive',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/1P2PN2/PB2BPPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'Hanging pawns are two adjacent pawns on an open or semi-open file (here c5 and d5) that support each other but have no pawn neighbors. They can be dynamic strengths or structural weaknesses—we\'ll exploit them!',
    keyIdeas: [
      'Hanging pawns support each other but lack pawn backup',
      'Exchange one pawn to isolate the other',
      'Blockade the resulting isolated pawn',
      'Attack the weakness with pieces on the file'
    ],
    mainLine: [
      { 
        move: 'cxd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Breaking up the hanging pawns! By capturing on d5, we force Black to recapture and create an isolated d-pawn—a permanent weakness.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['c4', 'd5'],
        conceptTag: 'Breaking the Duo'
      },
      { 
        move: 'exd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must recapture. Now the d5 pawn is isolated—no friendly pawn can ever support it. The c5 pawn is also weak and backward.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      { 
        move: 'Nd4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight jumps to the blockade square! From d4, it attacks d5 and prevents the pawn from advancing. Knights are ideal blockaders.',
        arrows: [{ from: 'f3', to: 'd4', color: 'green' }, { from: 'd4', to: 'd5', color: 'yellow' }],
        highlights: ['d4', 'd5'],
        conceptTag: 'Blockading the IQP'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, trying to defend. But the isolated d5 pawn is a permanent target.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Rc1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Seizing the c-file! The c5 pawn is also weak now. White can target both hanging pawns or their remnants.',
        arrows: [{ from: 'a1', to: 'c1', color: 'green' }, { from: 'c1', to: 'c5', color: 'yellow' }],
        highlights: ['c1', 'c5']
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends the c-file, but White has achieved the strategic goal.',
        arrows: [{ from: 'f8', to: 'c8', color: 'blue' }]
      },
      { 
        move: 'Qa4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen joins the attack! Now White targets both the d5 pawn (via the knight) and puts pressure on the d7 bishop. Black\'s hanging pawns have become permanent weaknesses.',
        arrows: [{ from: 'd1', to: 'a4', color: 'green' }, { from: 'a4', to: 'd7', color: 'yellow' }],
        highlights: ['a4', 'd5', 'd7'],
        conceptTag: 'Exploiting the Weakness'
      }
    ],
    summary: 'Hanging pawns support each other but become weak when one is exchanged. We broke the duo with cxd5, blockaded with Nd4, and now the isolated d5 pawn is a permanent target.',
    keyTakeaways: [
      'Hanging pawns are dynamically strong but structurally weak',
      'Exchange one to isolate the other',
      'Blockade the resulting isolated pawn with a knight',
      'The weakness is permanent and can be targeted forever'
    ],
    memoryTip: 'Hanging pawns are like two friends holding hands—separate them, and each one falls alone!',
    difficulty: 4,
    estimatedMinutes: 8
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
    introduction: 'Controlling an open file is only the first step—the real goal is INVASION! A rook on the 7th rank attacks all the pawns still on their starting squares and severely restricts the enemy king.',
    keyIdeas: [
      'Control the file first, then invade',
      'The 7th rank attacks multiple pawns at once',
      'Two rooks on the 7th (pigs on the 7th) is often decisive',
      'The enemy king gets trapped on the back rank'
    ],
    mainLine: [
      { 
        move: 'Re7', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE INVASION! The rook crashes into the 7th rank, attacking b7 and f7 simultaneously. This is why we fight for open files—to reach the 7th!',
        arrows: [{ from: 'e1', to: 'e7', color: 'green' }, { from: 'e7', to: 'b7', color: 'red' }, { from: 'e7', to: 'f7', color: 'red' }],
        highlights: ['e7', 'b7', 'f7'],
        conceptTag: 'The 7th Rank Invasion'
      },
      { 
        move: 'Rf8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black moves the rook to defend, but the damage is done. White\'s rook dominates the 7th rank.',
        arrows: [{ from: 'e8', to: 'f8', color: 'blue' }]
      },
      { 
        move: 'Rae1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'DOUBLING! The second rook joins on the e-file, ready to double on the 7th rank. "Pigs on the seventh" is one of the most powerful configurations.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }, { from: 'e1', to: 'e8', color: 'yellow' }],
        highlights: ['e1', 'e7'],
        conceptTag: 'Doubling Rooks'
      },
      { 
        move: 'Rae8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to contest the file, but White has the advantage.',
        arrows: [{ from: 'a8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Rxb7', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Capturing the b7 pawn! The 7th rank rook gobbles pawns while Black can only watch.',
        arrows: [{ from: 'e7', to: 'b7', color: 'green' }],
        highlights: ['b7']
      },
      { 
        move: 'Rxe1+', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black exchanges rooks, but White keeps the 7th rank advantage.',
        arrows: [{ from: 'e8', to: 'e1', color: 'blue' }]
      },
      { 
        move: 'Nxe1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the knight. White\'s rook still dominates the 7th rank, attacking a7 and cutting off the Black king. The invasion was decisive!',
        arrows: [{ from: 'c3', to: 'e1', color: 'green' }, { from: 'b7', to: 'a7', color: 'red' }],
        highlights: ['e1', 'b7'],
        conceptTag: 'Lasting Advantage'
      }
    ],
    summary: 'We invaded the 7th rank with Re7, attacked multiple pawns, and maintained pressure with doubled rooks. The 7th rank invasion is often the decisive moment of a rook endgame.',
    keyTakeaways: [
      'The 7th rank is the "goal line" for rooks',
      'A rook on the 7th attacks all unmoved pawns',
      'Double rooks on the 7th (pigs) is devastating',
      'The enemy king gets trapped and helpless'
    ],
    memoryTip: 'Rooks on the 7th are called "pigs" because they eat everything in sight—pawns vanish one by one!',
    difficulty: 3,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE BISHOP PAIR
  // ============================================
  {
    id: 'bishop-pair-endgame',
    category: 'BISHOP_PAIR',
    title: 'Bishops in the Endgame',
    subtitle: 'Two bishops dominate the board',
    fen: '8/pp3pkp/3p4/4p3/4P3/2B2P2/PP4PP/4B1K1 w - - 0 30',
    toMove: 'white',
    introduction: 'In the endgame, two bishops working together are extraordinarily powerful. They control squares of BOTH colors, creating a mating net the enemy cannot escape. This advantage often converts to a win.',
    keyIdeas: [
      'Two bishops control all 64 squares together',
      'Coordinate them to cut off the enemy king',
      'Bishops get stronger as pawns come off',
      'Push pawns to create passed pawns with bishop support'
    ],
    mainLine: [
      { 
        move: 'Bd5+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Check! The bishop controls the long diagonal, cutting off the Black king from advancing. This forces the king to a worse square.',
        arrows: [{ from: 'e1', to: 'd5', color: 'green' }, { from: 'd5', to: 'g8', color: 'yellow' }],
        highlights: ['d5'],
        conceptTag: 'Activating the Bishop'
      },
      { 
        move: 'Kf6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The king steps forward, but White\'s bishops will coordinate to restrict it further.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      },
      { 
        move: 'Ba3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Now BOTH bishops are perfectly placed! The light-squared bishop controls the long diagonal, while the dark-squared bishop targets d6 and a3-f8 diagonal.',
        arrows: [{ from: 'c3', to: 'a3', color: 'green' }, { from: 'a3', to: 'd6', color: 'yellow' }],
        highlights: ['a3', 'd5'],
        conceptTag: 'Perfect Coordination'
      },
      { 
        move: 'Ke7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to defend d6, but the bishops dominate both colors.',
        arrows: [{ from: 'f6', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Kf2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king advances! With the bishops controlling the board, White\'s king can march up to support pawn advances.',
        arrows: [{ from: 'g1', to: 'f2', color: 'green' }],
        highlights: ['f2'],
        conceptTag: 'King Activation'
      },
      { 
        move: 'Kf6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s king oscillates, unable to find a good square.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      { 
        move: 'Ke3', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The king marches toward the center! Combined with the two bishops, White will soon create decisive threats. The bishop pair + active king is unstoppable.',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }, { from: 'e3', to: 'd4', color: 'yellow' }],
        highlights: ['e3', 'a3', 'd5'],
        conceptTag: 'Winning Technique'
      }
    ],
    summary: 'Two bishops coordinate to control the entire board. By activating both bishops and marching the king forward, White creates an unstoppable advantage. The bishop pair is especially powerful in open endgames.',
    keyTakeaways: [
      'Two bishops control squares of both colors',
      'Place them on open diagonals pointing at the enemy',
      'Bring your king forward—it\'s safe with bishop support',
      'The bishop pair advantage grows as pieces come off'
    ],
    memoryTip: 'Think of two bishops as laser beams covering both color squares—nothing escapes!',
    difficulty: 3,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE GOOD/BAD BISHOP
  // ============================================
  {
    id: 'good-bishop-active',
    category: 'GOOD_BAD_BISHOP',
    title: 'The Active Bishop',
    subtitle: 'Trading for their key defender',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'A good bishop is one that operates on open diagonals without being blocked by its own pawns. Black\'s g7 bishop is "good" because it defends the kingside. Let\'s trade it away to weaken Black\'s king!',
    keyIdeas: [
      'A good bishop is active, not blocked by pawns',
      'Trade your less useful bishop for their key defender',
      'The fianchettoed bishop often guards the king',
      'Without the defender, the king becomes vulnerable'
    ],
    mainLine: [
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing the key idea: Bh6! The queen supports the bishop\'s journey to h6 where it will trade for Black\'s important fianchettoed bishop.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }, { from: 'd2', to: 'h6', color: 'yellow' }],
        highlights: ['d2'],
        conceptTag: 'Preparing the Trade'
      },
      { 
        move: 'Re8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops the rook, but the real battle is about the dark-squared bishops.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Bh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE KEY MOVE! By trading bishops on h6, we eliminate Black\'s main defender of the dark squares around the king. The fianchettoed bishop is often the king\'s best friend.',
        arrows: [{ from: 'e3', to: 'h6', color: 'green' }, { from: 'h6', to: 'g7', color: 'red' }],
        highlights: ['h6', 'g7'],
        conceptTag: 'Removing the Defender'
      },
      { 
        move: 'Bxh6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must trade. The g7 bishop was defending h6, f8, and the entire dark-square complex. Now it\'s gone!',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      { 
        move: 'Qxh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen arrives with threats! Now White\'s queen is powerfully placed on h6, eyeing g7 and the dark squares around Black\'s king.',
        arrows: [{ from: 'd2', to: 'h6', color: 'green' }, { from: 'h6', to: 'g7', color: 'yellow' }],
        highlights: ['h6'],
        conceptTag: 'Queen Infiltration'
      },
      { 
        move: 'Nh7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must defend g5, but the position is already compromised. The dark squares are weak.',
        arrows: [{ from: 'f6', to: 'h7', color: 'blue' }]
      },
      { 
        move: 'Ng5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The knight jumps in! Without the g7 bishop, the dark squares collapse. White threatens Qxh7 mate and has a crushing attack.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'h6', to: 'h7', color: 'red' }],
        highlights: ['g5', 'h6', 'h7'],
        conceptTag: 'Exploiting Weaknesses'
      }
    ],
    summary: 'We identified Black\'s "good" bishop (the g7 defender) and traded it away with Bh6. Without this key defender, Black\'s dark squares collapsed and our attack succeeded.',
    keyTakeaways: [
      'Identify which bishop is the key defender',
      'Trade your "bad" bishop for their "good" one',
      'The fianchettoed bishop protects the king',
      'Once removed, the king becomes vulnerable'
    ],
    memoryTip: 'The fianchettoed bishop is like a bodyguard—trade it away and the king is exposed!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE SPACE ADVANTAGE
  // ============================================
  {
    id: 'space-cramp',
    category: 'SPACE_ADVANTAGE',
    title: 'The Cramped Position',
    subtitle: 'Squeezing the opponent slowly',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When you have more space, your opponent is cramped—their pieces bump into each other and can\'t find good squares. The key is to PREVENT their freeing breaks while slowly improving your position.',
    keyIdeas: [
      'Cramped positions lead to mistakes',
      'Prevent the opponent\'s freeing pawn breaks',
      'Improve your pieces slowly—no rush',
      'Eventually the cramp leads to a decisive error'
    ],
    mainLine: [
      { 
        move: 'a4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'PROPHYLAXIS! This prevents Black\'s main freeing attempt ...b5. With no pawn breaks available, Black will slowly suffocate.',
        arrows: [{ from: 'a2', to: 'a4', color: 'green' }],
        highlights: ['a4', 'b5'],
        conceptTag: 'Preventing Counterplay'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, but there\'s no room. The pieces are stepping on each other.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Developing to an active square and controlling e5. White improves while Black can only shuffle.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'e5', color: 'yellow' }],
        highlights: ['f4'],
        conceptTag: 'Slow Improvement'
      },
      { 
        move: 'Qc7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black moves the queen, but there\'s nothing constructive to do. The position is cramped.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Connecting the rooks and preparing to double on a file. White can maneuver freely while Black is stuck.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }],
        highlights: ['d2']
      },
      { 
        move: 'Rfe8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to find activity, but the pieces are passive.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Rfe1', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Perfect preparation! White is ready to open the e-file with e5 at the right moment. Black has no counterplay and must wait. The space advantage is crushing.',
        arrows: [{ from: 'f1', to: 'e1', color: 'green' }, { from: 'e4', to: 'e5', color: 'yellow' }],
        highlights: ['e1', 'f4', 'd2'],
        conceptTag: 'Complete Domination'
      }
    ],
    summary: 'When you have a space advantage, don\'t rush! Prevent the opponent\'s freeing breaks, improve your pieces slowly, and let the cramp do the work. Eventually, Black\'s pieces will have nowhere to go.',
    keyTakeaways: [
      'Prevent freeing pawn breaks first',
      'Improve pieces one at a time—no rush',
      'Cramped positions lead to blunders',
      'Patience converts the space advantage'
    ],
    memoryTip: 'A cramped position is like a traffic jam—pieces keep bumping into each other while you maneuver freely!',
    difficulty: 3,
    estimatedMinutes: 8
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
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    introduction: 'The ...c5 break challenges White\'s center and creates counterplay.',
    keyIdeas: ['c5 challenges d4', 'Opens the c-file', 'Creates tension in the center'],
    mainLine: [
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The thematic break! Black challenges the d4 pawn and opens the c-file for the rooks.',
        arrows: [{ from: 'c7', to: 'c5', color: 'green' }],
        highlights: ['c5', 'd4']
      },
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White advances, closing the center.',
        arrows: [{ from: 'd4', to: 'd5', color: 'blue' }]
      },
      { 
        move: 'e6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Challenging the center! Black strikes at the d5 pawn.',
        arrows: [{ from: 'e7', to: 'e6', color: 'green' }, { from: 'e6', to: 'd5', color: 'yellow' }],
        highlights: ['e6', 'd5']
      }
    ],
    summary: 'The c5 break creates counterplay and challenges White\'s center.',
    keyTakeaways: ['c5 is thematic in many structures', 'Opens lines for pieces'],
    difficulty: 3,
    estimatedMinutes: 5
  },

  {
    id: 'pawn-break-d5',
    category: 'PAWN_BREAKS',
    title: 'The d5 Advance',
    subtitle: 'Central breakthrough for White',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'The d5 pawn break is one of the most important central advances. It opens lines, creates passed pawn potential, and often leads to a space advantage. Timing is everything—execute when your pieces are ready!',
    keyIdeas: [
      'd5 opens the center and activates pieces',
      'Creates passed pawn possibilities',
      'Opens diagonals for bishops',
      'Time the break when pieces are optimally placed'
    ],
    mainLine: [
      { 
        move: 'cxd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Initiating the break! By capturing on d5 first, White creates tension in the center and prepares to open lines.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Creating Tension'
      },
      { 
        move: 'exd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the e-pawn, opening the e-file and the a2-g8 diagonal. This is what White wanted!',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }]
      },
      { 
        move: 'dxc5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The second capture! Now Black has an isolated d-pawn, and White has a passed c-pawn potential. The position is opening up.',
        arrows: [{ from: 'd4', to: 'c5', color: 'green' }],
        highlights: ['c5', 'd5'],
        conceptTag: 'Creating Weaknesses'
      },
      { 
        move: 'Bxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures the pawn, but the isolated d5 pawn is now a target.',
        arrows: [{ from: 'e7', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'Bb5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Attacking the knight and pinning it to the queen! The break has opened up tactical possibilities.',
        arrows: [{ from: 'e2', to: 'b5', color: 'green' }, { from: 'b5', to: 'c6', color: 'yellow' }],
        highlights: ['b5', 'c6'],
        conceptTag: 'Exploiting Open Lines'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black blocks the pin, but now c6 is weak.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Completing development. White\'s position is excellent: the isolated d5 pawn is weak, lines are open, and pieces are active. The d5 break was a success!',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Consolidating Advantage'
      }
    ],
    summary: 'The d5 break opened the position favorably for White. Black\'s isolated d-pawn became a target, and White\'s pieces became active on the open files and diagonals. Timing is key—break when ready!',
    keyTakeaways: [
      'd5 is often the key central breakthrough',
      'Opens files and diagonals for piece activity',
      'Can create isolated pawns for the opponent',
      'Time the break when pieces are ready'
    ],
    memoryTip: 'The d5 break is like opening a door—once it\'s open, your pieces rush through!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE KNIGHT PLACEMENT
  // ============================================
  {
    id: 'knight-rim-outpost',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Rim Knight',
    subtitle: 'When the edge is actually strong',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'The saying goes "a knight on the rim is dim"—but that\'s only true if the knight has no purpose there! A knight heading to c5 via a4 is a classic maneuver that controls key squares and creates pressure.',
    keyIdeas: [
      'Knights on the rim need a clear destination',
      'The Na4-c5 maneuver is a classic route',
      'c5 attacks d7, e6, and b7 simultaneously',
      'Even "dim" rim squares are stepping stones'
    ],
    mainLine: [
      { 
        move: 'Na4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight heads to the rim! But it\'s not staying there—it\'s heading to c5 where it will be a monster.',
        arrows: [{ from: 'c3', to: 'a4', color: 'green' }, { from: 'a4', to: 'c5', color: 'yellow' }],
        highlights: ['a4'],
        conceptTag: 'Knight Maneuver'
      },
      { 
        move: 'b6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to prevent Nc5 by controlling the square. But White has a pawn break ready!',
        arrows: [{ from: 'b7', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The breakthrough! Even though ...b6 controlled c5, this pawn advance creates new outpost squares and opens lines.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Supporting the Knight'
      },
      { 
        move: 'bxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black captures, but now the a4 knight has a clear path to c5!',
        arrows: [{ from: 'b6', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'Nxc5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE KNIGHT ARRIVES! Now on c5, it attacks d7, e6, and controls key central squares. The "rim" maneuver was a success!',
        arrows: [{ from: 'a4', to: 'c5', color: 'green' }, { from: 'c5', to: 'd7', color: 'yellow' }, { from: 'c5', to: 'e6', color: 'yellow' }],
        highlights: ['c5', 'd7', 'e6'],
        conceptTag: 'Perfect Outpost'
      },
      { 
        move: 'Nxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black feels compelled to trade the strong knight.',
        arrows: [{ from: 'd6', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'dxc5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the pawn. White has achieved a structural advantage with the passed c5 pawn, and the "rim knight maneuver" created lasting benefits.',
        arrows: [{ from: 'd4', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Lasting Advantage'
      }
    ],
    summary: 'The Na4-c5 maneuver showed that rim knights aren\'t dim when they have a clear destination. By combining the knight move with c5, White created a powerful outpost and lasting structural advantages.',
    keyTakeaways: [
      'Knights on the rim need a PURPOSE',
      'Na4-c5 is a classic strong maneuver',
      'Support the knight with pawn breaks',
      'Even rim squares can be stepping stones'
    ],
    memoryTip: 'A knight on the rim isn\'t dim if it\'s on the way to somewhere great—think of it as taking the scenic route!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE PIECE COORDINATION
  // ============================================
  {
    id: 'coordination-battery',
    category: 'PIECE_COORDINATION',
    title: 'The Queen-Bishop Battery',
    subtitle: 'Diagonal destruction',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PP1QBPPP/R4RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A battery is two pieces lined up on the same diagonal or file. The queen-bishop battery on the a1-h8 or b1-h7 diagonal pointing at the enemy king is devastating. The bishop leads, the queen follows!',
    keyIdeas: [
      'Batteries multiply attacking power',
      'Bishop in front, queen behind (usually)',
      'Target weak squares around the enemy king',
      'Often leads to sacrifices and breakthroughs'
    ],
    mainLine: [
      { 
        move: 'Bh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Creating the battery! The bishop attacks Black\'s fianchettoed bishop. If Black trades, our queen will arrive on h6 with devastating effect.',
        arrows: [{ from: 'e3', to: 'h6', color: 'green' }, { from: 'd2', to: 'h6', color: 'yellow' }],
        highlights: ['h6', 'g7'],
        conceptTag: 'Forming the Battery'
      },
      { 
        move: 'Bxh6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must trade—the alternative is losing the dark-squared bishop anyway. But now the queen comes!',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      { 
        move: 'Qxh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen arrives on h6! This is the power of the battery—the queen now threatens Ng5 with ideas of Qxh7 mate.',
        arrows: [{ from: 'd2', to: 'h6', color: 'green' }, { from: 'f3', to: 'g5', color: 'yellow' }],
        highlights: ['h6'],
        conceptTag: 'Queen Infiltration'
      },
      { 
        move: 'Nh7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends g5, but the dark squares are weak. White continues the attack.',
        arrows: [{ from: 'f6', to: 'h7', color: 'blue' }]
      },
      { 
        move: 'Ng5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The knight jumps in anyway! Now Qxh7+ is threatened, and the battery has created multiple threats on the kingside.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'h6', to: 'h7', color: 'red' }],
        highlights: ['g5', 'h7'],
        conceptTag: 'The Attack Lands'
      },
      { 
        move: 'Nxg5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must capture, but White\'s attack is too strong.',
        arrows: [{ from: 'h7', to: 'g5', color: 'blue' }]
      },
      { 
        move: 'Qxg5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the queen. White has a dominating position with the queen on g5, targeting multiple weak points. The battery broke through!',
        arrows: [{ from: 'h6', to: 'g5', color: 'green' }],
        highlights: ['g5'],
        conceptTag: 'Dominating Position'
      }
    ],
    summary: 'The queen-bishop battery on the h6 diagonal devastated Black\'s kingside. By forcing the trade of the fianchettoed bishop, we brought the queen into the attack and created multiple threats.',
    keyTakeaways: [
      'Batteries are tremendously powerful on open diagonals',
      'Target the fianchettoed bishop to weaken the king',
      'Bishop leads, queen follows',
      'Look for knight jumps to support the queen'
    ],
    memoryTip: 'A queen-bishop battery is like a one-two punch—the bishop jabs, then the queen delivers the knockout!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE EXCHANGE STRATEGY
  // ============================================
  {
    id: 'exchange-simplify',
    category: 'EXCHANGE_STRATEGY',
    title: 'Simplifying to Win',
    subtitle: 'Exchanging pieces when ahead',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'When you have an advantage—whether material or positional—simplify! Every trade brings you closer to a winning endgame and reduces your opponent\'s counterplay chances. Fewer pieces mean fewer tricks!',
    keyIdeas: [
      'Trade pieces when you have an advantage',
      'Simplification reduces counterplay chances',
      'Head toward a favorable endgame',
      'Trade attacking pieces if defending'
    ],
    mainLine: [
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Gaining space and preparing to simplify. White has a space advantage and wants to reduce Black\'s pieces.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Preparing to Simplify'
      },
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black centralizes the knight, but White welcomes the trade.',
        arrows: [{ from: 'c6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading knights! Every exchange brings us closer to a winning endgame where our space advantage will be decisive.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Simplifying'
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures, but White continues trading.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Attacking the knight! White wants to trade this piece too. Each exchange reduces Black\'s counterplay.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'e5', color: 'yellow' }],
        highlights: ['f4', 'e5']
      },
      { 
        move: 'Bxc3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to create complications by taking the knight.',
        arrows: [{ from: 'g7', to: 'c3', color: 'blue' }]
      },
      { 
        move: 'bxc3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the pawn. White has a superior pawn structure with the d5 wedge, and the position is simplified. The endgame is winning!',
        arrows: [{ from: 'b2', to: 'c3', color: 'green' }],
        highlights: ['c3', 'd5'],
        conceptTag: 'Winning Endgame'
      }
    ],
    summary: 'When ahead, trade pieces! We simplified the position through systematic exchanges, reducing Black\'s counterplay. In the resulting endgame, our space advantage and superior structure are decisive.',
    keyTakeaways: [
      'Trade when you have an advantage',
      'Each exchange reduces counterplay',
      'Aim for a favorable endgame',
      'Material up? Trade down to a simple win'
    ],
    memoryTip: 'When ahead, swap off! Fewer pieces = fewer tricks for your opponent. March to victory in the endgame!',
    difficulty: 2,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE BLOCKADE
  // ============================================
  {
    id: 'blockade-passed-pawn',
    category: 'BLOCKADE',
    title: 'Blockading the Passed Pawn',
    subtitle: 'Stopping the enemy\'s trump card',
    fen: '8/pp3k2/2p5/3pP3/3P4/8/PP3PPP/4K3 w - - 0 30',
    toMove: 'white',
    introduction: 'A passed pawn is a powerful asset—but only if it can advance! By placing a piece directly in front of the pawn (blockading it), we neutralize its power and can then attack it at leisure.',
    keyIdeas: [
      'Blockade by placing a piece in front of the pawn',
      'Knights are ideal blockaders—they lose no power',
      'Kings can blockade in endgames',
      'After blockading, attack the pawn\'s base'
    ],
    mainLine: [
      { 
        move: 'Kd3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king becomes a blockader! By standing directly in front of the d5 pawn, the king stops it cold. In the endgame, the king is an excellent blockader.',
        arrows: [{ from: 'e1', to: 'd3', color: 'green' }],
        highlights: ['d3', 'd5'],
        conceptTag: 'The Blockade'
      },
      { 
        move: 'Ke6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s king activates, but the d5 pawn cannot advance!',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      { 
        move: 'Kc3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king prepares a new plan: b4! White will create a passed pawn on the queenside while the d5 pawn remains blockaded.',
        arrows: [{ from: 'd3', to: 'c3', color: 'green' }, { from: 'b2', to: 'b4', color: 'yellow' }],
        highlights: ['c3'],
        conceptTag: 'Preparing Counterplay'
      },
      { 
        move: 'Kd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to support the d5 pawn, but White\'s plan continues.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      { 
        move: 'b4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Creating counterplay! While the d5 pawn is blockaded, White advances on the queenside.',
        arrows: [{ from: 'b2', to: 'b4', color: 'green' }],
        highlights: ['b4']
      },
      { 
        move: 'Kc7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must deal with the new threat.',
        arrows: [{ from: 'd6', to: 'c7', color: 'blue' }]
      },
      { 
        move: 'b5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Breaking through! White\'s b-pawn advances while Black\'s passed d-pawn remains stuck. This is the power of the blockade—neutralize their passer, then create your own!',
        arrows: [{ from: 'b4', to: 'b5', color: 'green' }, { from: 'b5', to: 'c6', color: 'red' }],
        highlights: ['b5', 'd5'],
        conceptTag: 'Winning Plan'
      }
    ],
    summary: 'We blockaded the passed d5 pawn with our king, stopping it in its tracks. Then we created our own passed pawn on the queenside. The blockade neutralized Black\'s advantage while we pursued our own plans.',
    keyTakeaways: [
      'Always blockade enemy passed pawns',
      'Place a piece directly in front of the pawn',
      'Once blockaded, create counterplay elsewhere',
      'Knights and kings are excellent blockaders'
    ],
    memoryTip: 'A blockade is like a traffic cop—the pawn can\'t move until the blocker is removed!',
    difficulty: 3,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE CENTRALIZATION
  // ============================================
  {
    id: 'centralization-knights',
    category: 'CENTRALIZATION',
    title: 'Central Knights',
    subtitle: 'Knights dominate from the center',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A knight in the center controls the board! A knight on e5 controls 8 squares and threatens multiple tactical ideas. On the rim? Only 2-4 squares. Centralization is key for knights.',
    keyIdeas: [
      'Central knights control many squares',
      'e5 and d5 are the dream squares',
      'Knights on the rim are dim',
      'Support central knights with pawns'
    ],
    mainLine: [
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE CENTRAL KNIGHT! On e5, the knight controls d3, d7, f3, f7, g4, g6, c4, and c6—eight squares! This is central domination.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }, { from: 'e5', to: 'f7', color: 'yellow' }, { from: 'e5', to: 'd7', color: 'yellow' }],
        highlights: ['e5'],
        conceptTag: 'Central Domination'
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black feels compelled to trade—the knight was too powerful. But this helps White!',
        arrows: [{ from: 'c6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the pawn! Now White has a powerful central pawn on e5 that cramps Black\'s position and controls key squares.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Central Pawn'
      },
      { 
        move: 'Nd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s knight must retreat to a passive square—this is what happens when you trade off centralized pieces!',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Now the OTHER knight jumps to the center! White has achieved the dream position with a knight on d5 and a pawn on e5.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5', 'e5'],
        conceptTag: 'Double Central Control'
      },
      { 
        move: 'c6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to kick the knight, but it\'s too well placed.',
        arrows: [{ from: 'c7', to: 'c6', color: 'blue' }]
      },
      { 
        move: 'Ne7+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight retreats with check! White has achieved total central domination. The e5 pawn and active pieces give White a commanding position.',
        arrows: [{ from: 'd5', to: 'e7', color: 'green' }],
        highlights: ['e7', 'e5'],
        conceptTag: 'Lasting Advantage'
      }
    ],
    summary: 'Central knights are incredibly powerful. We placed our knight on e5, forcing Black to trade. Then we established another knight on d5, achieving complete central domination.',
    keyTakeaways: [
      'Centralize knights—they control the most squares',
      'e5 and d5 are the dream outpost squares',
      'Trading a central knight often helps the attacker',
      'A knight on the rim is dim—keep them in the middle!'
    ],
    memoryTip: 'A knight in the center is like a king—it sees everything in all directions!',
    difficulty: 2,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE PAWN STRUCTURE PATTERNS
  // ============================================
  {
    id: 'structure-hedgehog',
    category: 'PAWN_STRUCTURE',
    title: 'The Hedgehog Structure',
    subtitle: 'Flexible but cramped',
    fen: 'r1bqr1k1/1p2bppp/p1np1n2/4p3/P1PPP3/2N1BN2/1PQ1BPPP/R4RK1 w - - 0 12',
    toMove: 'white',
    introduction: 'The Hedgehog is a flexible pawn structure where Black has pawns on a6, b6, d6, e6. It\'s cramped but resilient, with potential for ...b5 or ...d5 breaks.',
    keyIdeas: [
      'The Hedgehog is flexible but cramped',
      'Black waits for the right moment to break with ...b5 or ...d5',
      'White should prevent these breaks',
      'Space advantage must be maintained carefully'
    ],
    mainLine: [
      { 
        move: 'a5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preventing ...b5! This is classic Hedgehog strategy—White must prevent Black\'s liberating pawn breaks.',
        arrows: [{ from: 'a4', to: 'a5', color: 'green' }],
        highlights: ['a5', 'b6'],
        conceptTag: 'Prophylaxis'
      },
      { 
        move: 'Qc7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black repositions the queen.'
      },
      { 
        move: 'Rfd1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Centralizing the rook and preparing to increase pressure on d6.',
        arrows: [{ from: 'f1', to: 'd1', color: 'green' }]
      },
      { 
        move: 'Rfd8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends the d6 pawn.'
      },
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE KEY BREAK! White fixes the structure with d5, locking in Black\'s pieces. The e6 pawn becomes backward and d6 is a permanent weakness.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5', 'd6', 'e6'],
        conceptTag: 'Fixing the Structure'
      }
    ],
    summary: 'Against the Hedgehog, White must prevent ...b5 and ...d5, then fix the structure with d5 to create permanent weaknesses.',
    keyTakeaways: [
      'Prevent Black\'s liberating breaks (...b5, ...d5)',
      'The d5 advance fixes Black\'s structure',
      'After d5, d6 and e6 become targets',
      'Patience is key—wait for the right moment to fix the structure'
    ],
    memoryTip: 'Think of the Hedgehog as a coiled spring—prevent it from expanding or it will explode!',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'English Opening Hedgehog Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'Candidates Match',
      year: 1974
    }
  },

  {
    id: 'structure-maroczy-bind',
    category: 'PAWN_STRUCTURE',
    title: 'The Maroczy Bind',
    subtitle: 'Space stranglehold',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2P1P3/2N2N2/PP2BPPP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    introduction: 'The Maroczy Bind (pawns on c4 and e4) gives White a massive space advantage and restricts Black\'s pieces. Black struggles to find good squares.',
    keyIdeas: [
      'Pawns on c4 and e4 control key central squares',
      'Black lacks space and good piece placement',
      'White can slowly improve and prepare kingside or queenside expansion',
      'The d5 square is a powerful outpost'
    ],
    mainLine: [
      { 
        move: 'd4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Establishing the Maroczy Bind! The pawns on c4, d4, and e4 give White complete central control.',
        arrows: [{ from: 'd2', to: 'd4', color: 'green' }],
        highlights: ['c4', 'd4', 'e4'],
        conceptTag: 'The Bind'
      },
      { 
        move: 'cxd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black exchanges to relieve pressure.'
      },
      { 
        move: 'Nxd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Recapturing. The knight is beautifully centralized on d4.',
        highlights: ['d4']
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, but the pieces are cramped.'
      },
      { 
        move: 'Be3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing and supporting the d4 knight.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to generate play on the c-file.'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling and preparing to expand.'
      },
      { 
        move: 'a6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black prepares ...b5 to challenge the bind.'
      },
      { 
        move: 'f4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Expanding on the kingside! With the Maroczy Bind secure, White can expand on either flank. The space advantage is overwhelming.',
        arrows: [{ from: 'f2', to: 'f4', color: 'green' }],
        highlights: ['c4', 'e4', 'f4'],
        conceptTag: 'Flank Expansion'
      }
    ],
    summary: 'The Maroczy Bind gives White a lasting space advantage. Black is cramped and must find the right moment for ...b5 or ...d5 to break free.',
    keyTakeaways: [
      'c4 and e4 pawns create the bind',
      'Black lacks space and good piece placement',
      'White can expand on either flank from a position of strength',
      'The d5 square is a key outpost for White'
    ],
    memoryTip: 'The Maroczy Bind is like a python—it squeezes slowly but relentlessly!',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Sicilian Defense Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Mark Taimanov',
      event: 'Candidates Match',
      year: 1971
    }
  },

  {
    id: 'structure-benoni',
    category: 'PAWN_STRUCTURE',
    title: 'The Benoni Structure',
    subtitle: 'Dynamic imbalance',
    fen: 'rnbqkb1r/pp3ppp/4pn2/2pP4/3P4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: 'The Benoni structure (Black c5, White d5) creates dynamic imbalance. Black gets queenside play, White gets central and kingside play.',
    keyIdeas: [
      'Black plays ...b5-b4 for queenside expansion',
      'White plays for e4-e5 and kingside attack',
      'The d6 pawn is often a weakness',
      'Both sides have clear plans'
    ],
    mainLine: [
      { 
        move: 'e4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Building the ideal center! White prepares e4-e5 to gain more space and start a kingside attack.',
        arrows: [{ from: 'e2', to: 'e4', color: 'green' }],
        highlights: ['d5', 'e4'],
        conceptTag: 'Central Majority'
      },
      { 
        move: 'd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black solidifies, but the d6 pawn can become a target.'
      },
      { 
        move: 'Be2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing solidly.'
      },
      { 
        move: 'g6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black fianchettoes the bishop.'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling.'
      },
      { 
        move: 'Bg7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Completing the fianchetto.'
      },
      { 
        move: 'Nd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing f4 and e5! The knight makes room for the f-pawn to advance.',
        arrows: [{ from: 'c3', to: 'd2', color: 'green' }, { from: 'f2', to: 'f4', color: 'yellow' }],
        conceptTag: 'Preparing the Attack'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles.'
      },
      { 
        move: 'f4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The classic Benoni plan! f4 prepares e5, gaining more space and starting the kingside attack.',
        arrows: [{ from: 'f2', to: 'f4', color: 'green' }, { from: 'e4', to: 'e5', color: 'yellow' }],
        highlights: ['f4', 'e5'],
        conceptTag: 'Kingside Expansion'
      }
    ],
    summary: 'In the Benoni, White builds a center and attacks on the kingside with f4-e5, while Black counters on the queenside with ...b5-b4.',
    keyTakeaways: [
      'White plays for e4-e5 kingside attack',
      'Black plays for ...b5-b4 queenside expansion',
      'The race between the two flanks determines the outcome',
      'd6 is often a long-term weakness for Black'
    ],
    memoryTip: 'Benoni = Battle of the flanks—White attacks kingside, Black attacks queenside!',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Modern Benoni Defense',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Veselin Topalov',
      event: 'Wijk aan Zee',
      year: 1999
    }
  },

  {
    id: 'structure-french-pawn-chain',
    category: 'PAWN_STRUCTURE',
    title: 'The French Pawn Chain',
    subtitle: 'Attack the base',
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: 'In the French Defense, pawns on d4-e5 vs c7-d5-e6 create the classic pawn chain. The key principle: attack the base of the chain!',
    keyIdeas: [
      'Attack the base of the pawn chain',
      'Black plays ...c5 to attack d4',
      'White plays c3 to defend and prepares f4',
      'The chain determines piece placement'
    ],
    mainLine: [
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE CLASSIC BREAK! Black attacks the base of White\'s pawn chain with ...c5. This is the thematic move in the French.',
        arrows: [{ from: 'c7', to: 'c5', color: 'green' }, { from: 'c5', to: 'd4', color: 'yellow' }],
        highlights: ['c5', 'd4'],
        conceptTag: 'Attack the Base'
      },
      { 
        move: 'c3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White defends the base of the chain.',
        arrows: [{ from: 'c2', to: 'c3', color: 'blue' }]
      },
      { 
        move: 'Nc6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing and adding pressure to d4.'
      },
      { 
        move: 'Be2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White develops.'
      },
      { 
        move: 'Qb6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen attacks both b2 and d4! This is why c3 was necessary—the d4 pawn needs extra defense.',
        arrows: [{ from: 'd8', to: 'b6', color: 'green' }, { from: 'b6', to: 'd4', color: 'yellow' }, { from: 'b6', to: 'b2', color: 'yellow' }],
        highlights: ['b6', 'd4', 'b2']
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling, getting the king to safety.'
      },
      { 
        move: 'cxd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black exchanges on d4, opening the c-file.',
        arrows: [{ from: 'c5', to: 'd4', color: 'green' }]
      },
      { 
        move: 'cxd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White recaptures. Now both sides have captured, and the pawn chain has evolved.',
        highlights: ['d4', 'e5']
      }
    ],
    summary: 'In the French pawn chain, Black attacks the base with ...c5 while White defends with c3. The battle over the d4 pawn defines the middlegame.',
    keyTakeaways: [
      'Attack the base of the pawn chain (...c5 attacks d4)',
      'The side with the advanced chain has more space',
      'Piece placement follows the pawn structure',
      'Whoever controls the base controls the position'
    ],
    memoryTip: 'Remember Nimzowitsch: "Attack the base, not the head of the pawn chain!"',
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'French Defense Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Tigran Petrosian',
      event: 'World Championship',
      year: 1963
    }
  },

  {
    id: 'structure-dragon-sicilian',
    category: 'PAWN_STRUCTURE',
    title: 'The Dragon Structure',
    subtitle: 'Opposite-side castling attack',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP1B1PP/2KR1Q1R w - - 0 10',
    toMove: 'white',
    introduction: 'The Dragon structure features opposite-side castling. White storms the kingside with h4-h5, Black storms the queenside with ...Rc8 and ...b5-b4.',
    keyIdeas: [
      'Opposite-side castling means mutual attacks',
      'White plays h4-h5-h6 to open the kingside',
      'Black plays ...Rc8, ...b5-b4 on the queenside',
      'It\'s a race—who attacks faster?'
    ],
    mainLine: [
      { 
        move: 'h4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE PAWN STORM BEGINS! h4 is the start of White\'s kingside attack. The goal is h4-h5-h6 to open lines against Black\'s king.',
        arrows: [{ from: 'h2', to: 'h4', color: 'green' }, { from: 'h4', to: 'h5', color: 'yellow' }],
        highlights: ['h4'],
        conceptTag: 'Pawn Storm'
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black counters on the queenside! The rook prepares ...b5-b4 to attack White\'s king.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      { 
        move: 'Kb1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Safety first! White moves the king away from the potential checks on the c-file.'
      },
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black centralizes the knight.'
      },
      { 
        move: 'h5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Continuing the attack! h5 prepares h6 to weaken Black\'s kingside.',
        arrows: [{ from: 'h4', to: 'h5', color: 'green' }],
        highlights: ['h5', 'g6']
      },
      { 
        move: 'a5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black prepares ...a4 and ...b5.'
      },
      { 
        move: 'h6', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE KEY BREAK! h6 forces Black to make a decision about the g7 bishop. After Bxh6, White can recapture with the queen and start a devastating attack.',
        arrows: [{ from: 'h5', to: 'h6', color: 'green' }, { from: 'h6', to: 'g7', color: 'yellow' }],
        highlights: ['h6', 'g7'],
        conceptTag: 'Opening Lines'
      }
    ],
    summary: 'The Dragon is a race: White attacks with h4-h5-h6, Black counters with ...Rc8, ...b5-b4. Whoever attacks faster and more accurately wins!',
    keyTakeaways: [
      'Opposite-side castling = mutual attacks',
      'h4-h5-h6 opens the kingside',
      '...Rc8, ...b5-b4 opens the queenside',
      'It\'s a race—calculate who\'s faster!'
    ],
    memoryTip: 'Dragon = Dual races—White\'s h-pawn vs Black\'s a-b pawns!',
    difficulty: 5,
    estimatedMinutes: 12,
    source: 'Sicilian Dragon',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Bent Larsen',
      event: 'Candidates Match',
      year: 1971
    }
  },

  {
    id: 'structure-slav-triangle',
    category: 'PAWN_STRUCTURE',
    title: 'The Slav Triangle',
    subtitle: 'Solid but passive',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'The Slav Triangle (pawns on c6, d5, e6) is very solid but can be passive. White can try to exploit the lack of space.',
    keyIdeas: [
      'The triangle is solid but limits piece activity',
      'White can expand with f3, e4',
      'Black needs to find the right moment for ...c5 or ...e5',
      'Patience is needed on both sides'
    ],
    mainLine: [
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling first.'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles too.'
      },
      { 
        move: 'f3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing e4! White wants to expand in the center and gain space.',
        arrows: [{ from: 'f2', to: 'f3', color: 'green' }, { from: 'e3', to: 'e4', color: 'yellow' }],
        highlights: ['f3', 'e4'],
        conceptTag: 'Preparing Expansion'
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook.'
      },
      { 
        move: 'e4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE CENTRAL BREAK! White gains space with e4. This is the key plan against the Slav Triangle.',
        arrows: [{ from: 'e3', to: 'e4', color: 'green' }],
        highlights: ['e4', 'd5'],
        conceptTag: 'Central Expansion'
      },
      { 
        move: 'dxe4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black accepts the trade.'
      },
      { 
        move: 'fxe4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'White recaptures with a strong central pawn. The position has opened up and White has more space.',
        highlights: ['e4']
      }
    ],
    summary: 'Against the Slav Triangle, White expands with f3 and e4 to gain space. Black must find the right moment to break with ...c5 or ...e5.',
    keyTakeaways: [
      'The triangle is solid but passive',
      'f3 and e4 gain space for White',
      'Black needs active piece play to compensate',
      'Timing of ...c5 or ...e5 is crucial'
    ],
    memoryTip: 'The Slav Triangle is like a fortress—strong but limiting!',
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Slav Defense',
    playerExample: {
      white: 'Vladimir Kramnik',
      black: 'Vishy Anand',
      event: 'World Championship',
      year: 2008
    }
  },

  {
    id: 'structure-scheveningen',
    category: 'PAWN_STRUCTURE',
    title: 'The Scheveningen Structure',
    subtitle: 'Flexible but solid',
    fen: 'r1bqkb1r/pp3ppp/2nppn2/8/3NP3/2N1BP2/PPP3PP/R2QKB1R w KQkq - 0 8',
    toMove: 'white',
    introduction: 'The Scheveningen (pawns on d6 and e6) is one of the most flexible Sicilian structures. Black is solid but can become passive if not careful.',
    keyIdeas: [
      'Black has d6 and e6 pawns—very solid',
      'White can try f4-f5 to attack',
      'Black can play ...d5 or ...e5 to counter',
      'The position is rich in possibilities'
    ],
    mainLine: [
      { 
        move: 'Be2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing the bishop.'
      },
      { 
        move: 'Be7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black mirrors the development.'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling.'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles.'
      },
      { 
        move: 'f4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE CLASSIC PLAN! f4 prepares f5 to attack Black\'s central structure.',
        arrows: [{ from: 'f2', to: 'f4', color: 'green' }, { from: 'f4', to: 'f5', color: 'yellow' }],
        highlights: ['f4', 'e6'],
        conceptTag: 'Kingside Attack'
      },
      { 
        move: 'a6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black prepares ...b5.'
      },
      { 
        move: 'f5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Breaking through! f5 attacks the e6 pawn and creates tension. Black must make a decision.',
        arrows: [{ from: 'f4', to: 'f5', color: 'green' }, { from: 'f5', to: 'e6', color: 'yellow' }],
        highlights: ['f5', 'e6'],
        conceptTag: 'The Break'
      }
    ],
    summary: 'In the Scheveningen, White often plays f4-f5 to attack the e6 pawn. Black must counter with ...d5 or accept weaknesses after ...exf5.',
    keyTakeaways: [
      'The Scheveningen is flexible and solid',
      'f4-f5 is the classic attacking plan',
      'Black can counter with ...d5 or ...e5',
      'Rich middlegames with many possibilities'
    ],
    memoryTip: 'Scheveningen = Schedule the f5 break to attack e6!',
    difficulty: 4,
    estimatedMinutes: 9,
    source: 'Sicilian Scheveningen',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1990
    }
  },

  {
    id: 'structure-hanging-pawns-dynamic',
    category: 'PAWN_STRUCTURE',
    title: 'Hanging Pawns - The Dynamic Side',
    subtitle: 'When hanging pawns are strong',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'Hanging pawns (c4-d4) can be weak, but they can also be strong! When supported, they control key squares and create attacking chances.',
    keyIdeas: [
      'Hanging pawns control central squares',
      'They can advance (d5 or c5) for attacks',
      'If attacked, they become weak',
      'Dynamic potential vs static weakness'
    ],
    mainLine: [
      { 
        move: 'Qc2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Supporting the hanging pawns! The queen defends from c2 and prepares to support advances.',
        arrows: [{ from: 'd1', to: 'c2', color: 'green' }],
        highlights: ['c4', 'd4'],
        conceptTag: 'Supporting the Pawns'
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black pressures the c4 pawn.'
      },
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE DYNAMIC ADVANCE! When hanging pawns can advance, they become powerful. d5 gains space and opens lines for the pieces.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Dynamic Advance'
      },
      { 
        move: 'exd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black exchanges.'
      },
      { 
        move: 'cxd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Now White has a strong central pawn and open lines. The hanging pawns achieved their goal—they advanced and created threats!',
        highlights: ['d5', 'c4']
      }
    ],
    summary: 'Hanging pawns can be strong when they advance! d5 or c5 gains space and opens lines. But if they\'re attacked first, they become weak.',
    keyTakeaways: [
      'Hanging pawns are strong when advancing',
      'd5 or c5 opens lines and gains space',
      'Support them with pieces before advancing',
      'If blocked, they become targets'
    ],
    memoryTip: 'Hanging pawns are like a loaded spring—when they advance, they explode!',
    difficulty: 4,
    estimatedMinutes: 9,
    source: 'Queen\'s Gambit Accepted',
    playerExample: {
      white: 'Magnus Carlsen',
      black: 'Fabiano Caruana',
      event: 'World Championship',
      year: 2018
    }
  },

  // ============================================
  // MORE KNIGHT PLACEMENT PATTERNS
  // ============================================
  {
    id: 'knight-octopus-e6',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Octopus Knight on e6',
    subtitle: 'A knight deep in enemy territory',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'A knight on e6 (or e3 for Black) is called an "octopus"—it has tentacles everywhere! It attacks multiple squares and is very hard to remove.',
    keyIdeas: [
      'The e6 square is deep in enemy territory',
      'Knights on e6 attack multiple pieces',
      'Very hard to remove without weakening',
      'Often worth sacrificing material to achieve'
    ],
    mainLine: [
      { 
        move: 'Nf5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight heads to the invasion square! From f5, it eyes e7 and can jump to e6.',
        arrows: [{ from: 'd4', to: 'f5', color: 'green' }, { from: 'f5', to: 'e7', color: 'yellow' }]
      },
      { 
        move: 'Bf8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black retreats the bishop to defend.'
      },
      { 
        move: 'Ne7+', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'CHECK! The knight lands with check, forcing the king to move.',
        arrows: [{ from: 'f5', to: 'e7', color: 'green' }],
        highlights: ['e7', 'g8']
      },
      { 
        move: 'Kh8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The king moves.'
      },
      { 
        move: 'Nxc6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Winning the knight! The octopus has done its job—disrupting Black\'s position and winning material.',
        highlights: ['c6']
      }
    ],
    summary: 'The octopus knight on e6 (or e7 in this case) creates havoc in the enemy position, attacking multiple pieces and forcing weaknesses.',
    keyTakeaways: [
      'e6 is a powerful invasion square',
      'Knights there attack multiple pieces',
      'Hard to remove without concessions',
      'Look for Nf5-e7 or Nd5-e7 routes'
    ],
    memoryTip: 'An octopus knight has tentacles everywhere—it touches everything!',
    difficulty: 4,
    estimatedMinutes: 8,
    source: 'Classical Attack Patterns',
    playerExample: {
      white: 'Mikhail Tal',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1960
    }
  },

  {
    id: 'knight-maneuver-nd2-f1-e3',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Knight Maneuver Nd2-f1-e3',
    subtitle: 'Repositioning for better squares',
    fen: 'r1bqkb1r/pppppppp/2n2n2/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'Sometimes knights are on good squares but need even better squares! The maneuver Nd2-f1-e3-g4/f5 is a classic improvement route.',
    keyIdeas: [
      'Knights can maneuver to better squares',
      'Nd2-f1-e3 is a classic route',
      'From e3, the knight can go to g4 or f5',
      'This takes time but improves the position'
    ],
    mainLine: [
      { 
        move: 'Nf3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Standard development.'
      },
      { 
        move: 'e6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops.'
      },
      { 
        move: 'Nd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE MANEUVER BEGINS! The knight retreats to d2, planning to go to f1 and then e3 for a better square.',
        arrows: [{ from: 'c3', to: 'd2', color: 'green' }, { from: 'd2', to: 'f1', color: 'yellow' }, { from: 'f1', to: 'e3', color: 'yellow' }],
        highlights: ['d2'],
        conceptTag: 'Knight Maneuver'
      },
      { 
        move: 'd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black continues developing.'
      },
      { 
        move: 'Nf1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The knight continues its journey.',
        arrows: [{ from: 'd2', to: 'f1', color: 'green' }]
      },
      { 
        move: 'Be7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops the bishop.'
      },
      { 
        move: 'Ne3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight arrives on the perfect square! From e3, it controls d5 and f5, and can jump to g4 to attack.',
        arrows: [{ from: 'f1', to: 'e3', color: 'green' }, { from: 'e3', to: 'd5', color: 'yellow' }, { from: 'e3', to: 'f5', color: 'yellow' }, { from: 'e3', to: 'g4', color: 'yellow' }],
        highlights: ['e3'],
        conceptTag: 'Perfect Square'
      }
    ],
    summary: 'The maneuver Nd2-f1-e3 repositions the knight to a more active square. From e3, it controls key squares and can jump to f5 or g4.',
    keyTakeaways: [
      'Knights can maneuver to better squares',
      'Nd2-f1-e3 is a classic improvement route',
      'From e3, g4 and f5 are possible',
      'Takes time but improves long-term'
    ],
    memoryTip: 'Think of knight maneuvers as "finding a better home"!',
    difficulty: 3,
    estimatedMinutes: 7,
    source: 'French Defense Strategy',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1981
    }
  },

  {
    id: 'knight-f3-e5-domination',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Nf3-e5 Jump',
    subtitle: 'Seizing the center',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'When the e5 square is available, jump there immediately! A knight on e5 controls the center and eyes f7.',
    keyIdeas: [
      'e5 is a dominant central square',
      'Knights on e5 control the game',
      'Eyes f7 weakness',
      'Can\'t be driven away by pawns'
    ],
    mainLine: [
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'SEIZING THE CENTER! The knight jumps to e5, the perfect central square.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }, { from: 'e5', to: 'f7', color: 'yellow' }],
        highlights: ['e5'],
        conceptTag: 'Central Domination'
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black trades the knight off.'
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Opening the d-file! White gets open lines and a central pawn.',
        highlights: ['e5', 'd1']
      }
    ],
    summary: 'The Nf3-e5 jump seizes the center. Even if traded, White gets open lines and a strong central presence.',
    keyTakeaways: [
      'e5 is often the best square for a knight',
      'Seize it when available',
      'Even trades favor the side with central control',
      'Look for this jump in many openings'
    ],
    memoryTip: 'When e5 is free, the knight must be!',
    difficulty: 2,
    estimatedMinutes: 5,
    source: 'Italian Game',
    playerExample: {
      white: 'Paul Morphy',
      black: 'Duke of Brunswick',
      event: 'Paris Opera',
      year: 1858
    }
  },

  {
    id: 'knight-sacrifice-f7',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Knight Sacrifice on f7',
    subtitle: 'Nxf7—the classic sacrifice',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5',
    toMove: 'white',
    introduction: 'The Nxf7 sacrifice is one of the oldest and most famous knight sacrifices. It disrupts the enemy king and wins material.',
    keyIdeas: [
      'Nxf7 attacks king and rook',
      'Often wins the exchange',
      'Disrupts enemy development',
      'Works when the king is in the center'
    ],
    mainLine: [
      { 
        move: 'Nxf7', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE CLASSIC SACRIFICE! Nxf7 attacks both the king and the h8 rook. Black is forced to take.',
        arrows: [{ from: 'f3', to: 'f7', color: 'green' }, { from: 'f7', to: 'e8', color: 'yellow' }, { from: 'f7', to: 'h8', color: 'yellow' }],
        highlights: ['f7'],
        conceptTag: 'Knight Sacrifice'
      },
      { 
        move: 'Kxf7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must capture or lose the rook.'
      },
      { 
        move: 'Qh5+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'CHECK! The queen enters with devastating effect. The king is exposed in the center.',
        arrows: [{ from: 'd1', to: 'h5', color: 'green' }],
        highlights: ['h5', 'f7']
      },
      { 
        move: 'Ke7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The king runs.'
      },
      { 
        move: 'Qxe5+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Winning the pawn with check! White has a strong attack and Black\'s king is unsafe.',
        highlights: ['e5']
      }
    ],
    summary: 'The Nxf7 sacrifice is devastating when the king is uncastled. It wins material and leaves the king exposed.',
    keyTakeaways: [
      'Nxf7 is a classic sacrifice',
      'Works when the king is in the center',
      'Attacks king and rook simultaneously',
      'Often wins material with a strong attack'
    ],
    memoryTip: 'f7 is the weakest square before castling—knights love it!',
    difficulty: 3,
    estimatedMinutes: 7,
    source: 'Italian Game - Fried Liver Attack',
    playerExample: {
      white: 'Giulio Polerio',
      black: 'Domenico',
      event: 'Rome',
      year: 1590
    }
  },

  {
    id: 'knight-vs-bishop-closed',
    category: 'KNIGHT_PLACEMENT',
    title: 'Knights in Closed Positions',
    subtitle: 'Knights vs Bishops',
    fen: 'r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'In closed positions, knights are often better than bishops. Knights can hop over pawns while bishops are blocked.',
    keyIdeas: [
      'Closed positions favor knights',
      'Knights hop over blocked pawns',
      'Bishops are blocked by pawn chains',
      'Look to keep the position closed'
    ],
    mainLine: [
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight jumps to e5! In this closed position, the knight is superior to Black\'s bishops.',
        highlights: ['e5']
      },
      { 
        move: 'Nf6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops.'
      },
      { 
        move: 'f4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Keeping the position closed! This favors our knights over their bishops.',
        arrows: [{ from: 'f2', to: 'f4', color: 'green' }],
        highlights: ['e5', 'd4'],
        conceptTag: 'Keep It Closed'
      }
    ],
    summary: 'In closed positions, knights shine. They hop over pawns while bishops are blocked by pawn chains.',
    keyTakeaways: [
      'Knights > Bishops in closed positions',
      'Keep the position closed if you have knights',
      'Open it if you have bishops',
      'Pawn structure determines piece value'
    ],
    memoryTip: 'Closed position = Knight\'s paradise!',
    difficulty: 3,
    estimatedMinutes: 6,
    source: 'French Defense',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1966
    }
  },

  {
    id: 'knight-fork-family',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Family Fork',
    subtitle: 'Forking king and queen',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'The "family fork" (also called "family check") wins the queen by forking the king and queen with a knight check.',
    keyIdeas: [
      'Fork king and queen with a check',
      'The queen must fall',
      'Look for the pattern in advance',
      'Often involves Nf6+ or Ne7+'
    ],
    mainLine: [
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Capturing on e5 with a threat...'
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures.'
      },
      { 
        move: 'd4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Attacking the bishop and opening lines.',
        arrows: [{ from: 'd3', to: 'd4', color: 'green' }]
      },
      { 
        move: 'Bb6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The bishop retreats.'
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Capturing the knight.'
      },
      { 
        move: 'Qxd1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black wins the queen back.'
      },
      { 
        move: 'Rxd1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'But now it\'s an endgame where White has good compensation.'
      }
    ],
    summary: 'The family fork is a classic knight tactic that wins the queen by checking the king and attacking the queen simultaneously.',
    keyTakeaways: [
      'Look for knight forks of king and queen',
      'Always check if a knight check also attacks the queen',
      'Common on f6, e7, d8, f2, e3 squares',
      'One of the most powerful tactics'
    ],
    memoryTip: 'Family fork = Knight checks the king while attacking the queen!',
    difficulty: 2,
    estimatedMinutes: 6,
    source: 'Basic Tactics',
    playerExample: {
      white: 'Emanuel Lasker',
      black: 'José Raúl Capablanca',
      event: 'St Petersburg',
      year: 1914
    }
  },

  {
    id: 'knight-pair-coordination',
    category: 'KNIGHT_PLACEMENT',
    title: 'Two Knights Together',
    subtitle: 'Coordinated knight pair',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'Two knights working together can be devastating! They cover each other\'s weaknesses and create multiple threats.',
    keyIdeas: [
      'Two knights complement each other',
      'They control different colored squares',
      'Can create multiple threats',
      'Powerful in the middlegame'
    ],
    mainLine: [
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'One knight jumps to d5!',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      { 
        move: 'Nxd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black trades.'
      },
      { 
        move: 'exd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Recapturing.'
      },
      { 
        move: 'Nd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black repositions.'
      },
      { 
        move: 'Ng5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The remaining knight attacks f7! With one knight traded, the other becomes more powerful.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'g5', to: 'f7', color: 'yellow' }],
        highlights: ['g5', 'f7']
      }
    ],
    summary: 'Two knights working together create multiple threats and control key squares. They\'re powerful when coordinated.',
    keyTakeaways: [
      'Two knights are powerful together',
      'They cover different squares',
      'Look for Nd5 and Ng5 coordination',
      'After one trades, the other attacks'
    ],
    memoryTip: 'Two knights = Double trouble for your opponent!',
    difficulty: 3,
    estimatedMinutes: 6,
    source: 'Two Knights Defense',
    playerExample: {
      white: 'Max Euwe',
      black: 'Alexander Alekhine',
      event: 'World Championship',
      year: 1935
    }
  },

  {
    id: 'knight-retreat-improve',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Improving Retreat',
    subtitle: 'Sometimes backwards is forwards',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: 'Sometimes retreating a knight makes it stronger! Moving backwards to jump forwards is a key positional skill.',
    keyIdeas: [
      'Retreat to improve',
      'Better squares await',
      'Don\'t be afraid to lose time',
      'The destination matters more than the journey'
    ],
    mainLine: [
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Retreating the knight to a better square! From d5, it controls more squares.',
        arrows: [{ from: 'f3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Improving Retreat'
      },
      { 
        move: 'Nxd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black trades.'
      },
      { 
        move: 'exd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing. The retreat led to a favorable trade!',
        highlights: ['d5']
      }
    ],
    summary: 'Retreating a knight to a better square is often worth the time. Don\'t be afraid to move backwards to improve!',
    keyTakeaways: [
      'Retreat to improve positioning',
      'Better squares are worth the time',
      'Don\'t be attached to forward squares',
      'Sometimes backwards is forwards'
    ],
    memoryTip: 'A retreat is just a jump backwards to leap forward!',
    difficulty: 3,
    estimatedMinutes: 5,
    source: 'Italian Game',
    playerExample: {
      white: 'Levon Aronian',
      black: 'Magnus Carlsen',
      event: 'Tata Steel',
      year: 2013
    }
  },

  // ============================================
  // MORE MINORITY ATTACK
  // ============================================
  {
    id: 'minority-attack-execution',
    category: 'MINORITY_ATTACK',
    title: 'Executing the Minority Attack',
    subtitle: 'Breaking through on the queenside',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/1PPP4/2N1PN2/P3BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'The minority attack is ready to strike! With b4 already played, the b5 advance will create permanent weaknesses in Black\'s queenside pawn structure. The key is following through with precise piece coordination.',
    keyIdeas: [
      'b5 creates a backward pawn on c6',
      'Double rooks on the c-file to attack c6',
      'The weakness is permanent and can be attacked forever',
      'Patience and pressure eventually win the pawn'
    ],
    mainLine: [
      { 
        move: 'b5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The thematic break! This move attacks Black\'s pawn chain at its base. Black must capture, creating a backward pawn on c6.',
        arrows: [{ from: 'b4', to: 'b5', color: 'green' }, { from: 'b5', to: 'c6', color: 'red' }],
        highlights: ['b5', 'c6'],
        conceptTag: 'The Minority Break'
      },
      { 
        move: 'cxb5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black is forced to capture. Taking with the a-pawn would leave an isolated b-pawn, so cxb5 is the lesser evil.',
        arrows: [{ from: 'c5', to: 'b5', color: 'blue' }]
      },
      { 
        move: 'cxb5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing opens the c-file! The c6 pawn is now backward—it cannot advance and must be defended. This is a permanent structural weakness.',
        arrows: [{ from: 'c4', to: 'b5', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Creating the Weakness'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to defend c6 with the bishop. But White will pile up more attackers than Black can find defenders.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Rc1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Seizing the open c-file! The rook eyes c6 directly. This is the first attacker on the weakness.',
        arrows: [{ from: 'a1', to: 'c1', color: 'green' }, { from: 'c1', to: 'c6', color: 'yellow' }],
        highlights: ['c1', 'c6'],
        conceptTag: 'Piling On'
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends by bringing a rook to c8. But White has more pieces to throw at c6.',
        arrows: [{ from: 'f8', to: 'c8', color: 'blue' }]
      },
      { 
        move: 'Qa4', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The queen joins the attack on c6! Now White has rook and queen vs rook and bishop on c6. The pressure is mounting and Black is tied down.',
        arrows: [{ from: 'd1', to: 'a4', color: 'green' }, { from: 'a4', to: 'c6', color: 'yellow' }],
        highlights: ['a4', 'c6'],
        conceptTag: 'Maximum Pressure'
      }
    ],
    summary: 'The minority attack created a permanent weakness on c6. By piling rooks and queen against this target, White gains a lasting advantage. The c6 pawn will fall eventually, or Black must make other concessions to defend it.',
    keyTakeaways: [
      'b5 creates a backward pawn that cannot advance',
      'Seize the c-file immediately after the break',
      'Add more attackers than defender can handle',
      'Patience wins—the weakness is permanent'
    ],
    memoryTip: 'Think of the minority attack as a siege: fewer pawns attack more pawns, creating a permanent breach in the wall.',
    difficulty: 4,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE KING ACTIVITY
  // ============================================
  {
    id: 'king-activity-march',
    category: 'KING_ACTIVITY',
    title: 'The King March',
    subtitle: 'Walking the king to victory',
    fen: '8/pp3k2/2p2p2/3p4/3P1P2/2P1K3/PP6/8 w - - 0 35',
    toMove: 'white',
    introduction: 'In king and pawn endgames, the king transforms from a piece needing protection into the most powerful attacker on the board. The side whose king reaches the center first and penetrates enemy territory usually wins.',
    keyIdeas: [
      'Centralize the king immediately in endgames',
      'The king becomes a fighting piece worth ~4 pawns',
      'Attack enemy pawns with the king',
      'Support your own pawn advances with the king'
    ],
    mainLine: [
      { 
        move: 'Kd3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king marches forward! In the endgame, every tempo counts. The king heads toward the center to control key squares and prepare pawn advances.',
        arrows: [{ from: 'e3', to: 'd3', color: 'green' }],
        highlights: ['d3'],
        conceptTag: 'King Activation'
      },
      { 
        move: 'Ke6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black centralizes too, but White got there first! This tempo advantage will prove decisive.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      { 
        move: 'c4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Creating a passed pawn! The active king supports this advance. Black will struggle to stop both the c-pawn and the king\'s invasion.',
        arrows: [{ from: 'c3', to: 'c4', color: 'green' }],
        highlights: ['c4'],
        conceptTag: 'Creating a Passer'
      },
      { 
        move: 'dxc4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black captures, but this opens the d-file for White\'s king to penetrate.',
        arrows: [{ from: 'd5', to: 'c4', color: 'blue' }]
      },
      { 
        move: 'Kxc4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king captures and advances! Now the king is actively placed on c4, controlling key squares and threatening to invade on b5 or d5.',
        arrows: [{ from: 'd3', to: 'c4', color: 'green' }, { from: 'c4', to: 'b5', color: 'yellow' }, { from: 'c4', to: 'd5', color: 'yellow' }],
        highlights: ['c4', 'b5', 'd5'],
        conceptTag: 'King Penetration'
      },
      { 
        move: 'Kd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to stop the invasion, but it\'s too late. White\'s king is too active.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      { 
        move: 'Kb5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The decisive invasion! The king attacks both a7 and c6. Black cannot defend both pawns. This is the power of an active king in the endgame.',
        arrows: [{ from: 'c4', to: 'b5', color: 'green' }, { from: 'b5', to: 'a7', color: 'red' }, { from: 'b5', to: 'c6', color: 'red' }],
        highlights: ['b5', 'a7', 'c6'],
        conceptTag: 'Decisive Invasion'
      }
    ],
    summary: 'The king march decided the game. By centralizing immediately and creating threats, White\'s king penetrated Black\'s position and won material. In king and pawn endgames, the king is the strongest piece!',
    keyTakeaways: [
      'Activate the king immediately in endgames',
      'The king is worth ~4 pawns in the endgame',
      'March toward enemy weaknesses',
      'Combine king activity with pawn advances'
    ],
    memoryTip: 'Remember: "In the endgame, the king is a FIGHTING piece!" March it forward like a soldier, not a coward.',
    difficulty: 3,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE PIECE COORDINATION PATTERNS
  // ============================================
  {
    id: 'coordination-doubled-rooks',
    category: 'PIECE_COORDINATION',
    title: 'Doubled Rooks on Open File',
    subtitle: 'Maximum pressure',
    fen: 'r3r1k1/pp3ppp/2p5/8/3P4/2N5/PP3PPP/R3R1K1 w - - 0 18',
    toMove: 'white',
    introduction: 'Doubling rooks on an open file creates irresistible pressure. The two rooks work together to dominate the file.',
    keyIdeas: ['Double rooks on open files', 'One rook clears the way for the other', 'Invasion to 7th rank becomes possible', 'Coordination multiplies power'],
    mainLine: [
      { move: 'Red1', isMainLine: true, annotation: '!', explanation: 'Doubling on the e-file!', arrows: [{ from: 'e1', to: 'd1', color: 'green' }], highlights: ['d1', 'a1'] },
      { move: 'Red8', isMainLine: true, annotation: '', explanation: 'Black mirrors.' },
      { move: 'Rxe8+', isMainLine: true, annotation: '!', explanation: 'Trading to invade!', highlights: ['e8'] },
      { move: 'Rxe8', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Rd7', isMainLine: true, annotation: '!!', explanation: 'THE SEVENTH RANK! The coordinated rooks achieved their goal.', highlights: ['d7'] }
    ],
    summary: 'Doubled rooks dominate open files and create invasion opportunities.',
    keyTakeaways: ['Double rooks on open files', 'Trade one to invade with the other', 'The 7th rank is the goal'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'coordination-queen-rook-file',
    category: 'PIECE_COORDINATION',
    title: 'Queen and Rook on the Same File',
    subtitle: 'Heavy pieces together',
    fen: 'r2q1rk1/pp3ppp/2p5/8/3P4/2NQ4/PP3PPP/R4RK1 w - - 0 16',
    toMove: 'white',
    introduction: 'Queen and rook on the same file create tremendous pressure. The queen supports the rook\'s invasion.',
    keyIdeas: ['Queen supports rook invasions', 'Heavy pieces multiply threats', 'Creates mating attacks', 'One piece clears, other invades'],
    mainLine: [
      { move: 'Rac1', isMainLine: true, annotation: '!', explanation: 'Bringing the rook to the c-file where the queen already is!', arrows: [{ from: 'a1', to: 'c1', color: 'green' }] },
      { move: 'Rac8', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Rc5', isMainLine: true, annotation: '!', explanation: 'Rook lifts to the 5th rank!', highlights: ['c5'] },
      { move: 'Rfd8', isMainLine: true, annotation: '', explanation: 'Black prepares.' },
      { move: 'Rfc1', isMainLine: true, annotation: '!', explanation: 'Both rooks on the c-file with the queen! Total domination.', highlights: ['c1', 'c5', 'd3'] }
    ],
    summary: 'Queen and rook coordination on files creates overwhelming pressure.',
    keyTakeaways: ['Coordinate heavy pieces on files', 'Queen supports rook invasions', 'Creates multiple threats'],
    difficulty: 4,
    estimatedMinutes: 7
  },

  {
    id: 'coordination-bishop-queen-diagonal',
    category: 'PIECE_COORDINATION',
    title: 'Bishop and Queen Battery',
    subtitle: 'Diagonal dominance',
    fen: 'r2q1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A queen-bishop battery on a diagonal pointing at the enemy king can be devastating.',
    keyIdeas: ['Battery: bishop in front, queen behind', 'Weakens enemy defenses', 'Creates tactical threats', 'Often leads to sacrifices'],
    mainLine: [
      { move: 'Bxf7+', isMainLine: true, annotation: '!!', explanation: 'SACRIFICING THE BISHOP! The battery strikes!', arrows: [{ from: 'c4', to: 'f7', color: 'green' }], highlights: ['f7'] },
      { move: 'Kxf7', isMainLine: true, annotation: '', explanation: 'Forced.' },
      { move: 'Ng5+', isMainLine: true, annotation: '!', explanation: 'The queen and knight coordinate for a devastating attack!', arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'e2', to: 'h5', color: 'yellow' }] },
      { move: 'Ke8', isMainLine: true, annotation: '', explanation: 'King runs.' },
      { move: 'Qh5+', isMainLine: true, annotation: '!', explanation: 'Queen dominates! The coordination between pieces wins.', highlights: ['h5'] }
    ],
    summary: 'Bishop-queen batteries create tactical opportunities on key diagonals.',
    keyTakeaways: ['Place bishop in front, queen behind', 'Look for sacrifices', 'Weakened king positions are vulnerable'],
    difficulty: 4,
    estimatedMinutes: 8
  },

  // ============================================
  // MORE EXCHANGE STRATEGY PATTERNS
  // ============================================
  {
    id: 'exchange-trading-attackers',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trading Off Attackers',
    subtitle: 'Defense through exchanges',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: 'When under attack, trade off the attacking pieces! Each trade reduces the opponent\'s attacking potential.',
    keyIdeas: ['Trade attackers when defending', 'Each trade eases pressure', 'Simplification helps defense', 'Trade their best pieces'],
    mainLine: [
      { move: 'Bxc5', isMainLine: true, annotation: '!', explanation: 'Trading off Black\'s active bishop!', arrows: [{ from: 'c4', to: 'c5', color: 'green' }] },
      { move: 'dxc5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nxe5', isMainLine: true, annotation: '!', explanation: 'Trading another piece! Simplification eases the pressure.', arrows: [{ from: 'f3', to: 'e5', color: 'green' }] },
      { move: 'Nxe5', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'dxe5', isMainLine: true, annotation: '', explanation: 'White has successfully simplified and the attack is defused.', highlights: ['e5'] }
    ],
    summary: 'Trading off attacking pieces is a key defensive strategy.',
    keyTakeaways: ['Trade attackers when defending', 'Simplification reduces threats', 'Each trade helps the defender'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  {
    id: 'exchange-knight-for-bishop',
    category: 'EXCHANGE_STRATEGY',
    title: 'Knight vs Bishop Exchange',
    subtitle: 'When to trade minor pieces',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'Deciding whether to trade a knight for a bishop depends on the pawn structure. Open positions favor bishops, closed favor knights.',
    keyIdeas: ['Open positions: bishops > knights', 'Closed positions: knights > bishops', 'Consider future pawn structure', 'Trade based on structure'],
    mainLine: [
      { move: 'd4', isMainLine: true, annotation: '!', explanation: 'Opening the center!', arrows: [{ from: 'd2', to: 'd4', color: 'green' }] },
      { move: 'exd4', isMainLine: true, annotation: '', explanation: 'Black captures, opening the position.' },
      { move: 'e5', isMainLine: true, annotation: '', explanation: 'Gaining space.' },
      { move: 'Ng4', isMainLine: true, annotation: '', explanation: 'Knight retreats.' },
      { move: 'Bxf7+', isMainLine: true, annotation: '!', explanation: 'In the open position, the bishop is superior! Trading knight for bishop.', highlights: ['f7'] }
    ],
    summary: 'In open positions, bishops are preferable. Trade knights for bishops when the position opens.',
    keyTakeaways: ['Open = bishops better', 'Closed = knights better', 'Consider future structure', 'Trade accordingly'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'exchange-trading-defenders',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trading Key Defenders',
    subtitle: 'Remove the guardian',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'Before attacking, trade off the key defenders! The fianchettoed bishop on g7 is often Black\'s best defender.',
    keyIdeas: ['Identify key defenders', 'Trade them before attacking', 'Fianchettoed bishops defend kings', 'Create weaknesses through trades'],
    mainLine: [
      { move: 'Bh6', isMainLine: true, annotation: '!', explanation: 'Trading the key defender!', arrows: [{ from: 'e3', to: 'h6', color: 'green' }] },
      { move: 'Bxh6', isMainLine: true, annotation: '', explanation: 'Black must trade.' },
      { move: 'Qxh6', isMainLine: true, annotation: '!', explanation: 'Queen arrives with threats! The defender is gone.', highlights: ['h6', 'g7'] },
      { move: 'Nh7', isMainLine: true, annotation: '', explanation: 'Black defends desperately.' },
      { move: 'Nf5', isMainLine: true, annotation: '!', explanation: 'Knight jumps in! Without the g7 bishop, Black\'s kingside collapses.', arrows: [{ from: 'd4', to: 'f5', color: 'green' }] }
    ],
    summary: 'Trading key defenders before attacking is crucial. The fianchettoed bishop is often the main guardian.',
    keyTakeaways: ['Identify key defenders', 'Trade them first', 'Then attack', 'Creates lasting weaknesses'],
    difficulty: 3,
    estimatedMinutes: 7
  },

  // ============================================
  // MORE BLOCKADE PATTERNS
  // ============================================
  {
    id: 'blockade-rook-on-6th',
    category: 'BLOCKADE',
    title: 'Rook Blockade on 6th Rank',
    subtitle: 'The restrictive rook',
    fen: '3r2k1/pp3ppp/2p5/3pP3/8/2P3R1/PP3PPP/6K1 w - - 0 25',
    toMove: 'white',
    introduction: 'A rook on the 6th rank can act as a blockader, restricting enemy pawns and pieces.',
    keyIdeas: ['Rooks can blockade from afar', 'The 6th rank is powerful', 'Restricts all enemy pawns', 'Supports your own advances'],
    mainLine: [
      { move: 'Rg6', isMainLine: true, annotation: '!', explanation: 'Blockading from the 6th rank!', highlights: ['g6'] },
      { move: 'Rd7', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Rf6', isMainLine: true, annotation: '!', explanation: 'The rook stops the f-pawn and attacks f7!', arrows: [{ from: 'g6', to: 'f6', color: 'green' }] },
      { move: 'Kg7', isMainLine: true, annotation: '', explanation: 'King defends.' },
      { move: 'Rf5', isMainLine: true, annotation: '!', explanation: 'Blockading the d5 pawn from afar! The rook dominates.', highlights: ['f5', 'd5'] }
    ],
    summary: 'Rooks on the 6th rank can blockade enemy pawns while maintaining activity.',
    keyTakeaways: ['Rooks blockade from distance', '6th rank is powerful', 'Restricts enemy pawns', 'Maintains flexibility'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'blockade-piece-in-front',
    category: 'BLOCKADE',
    title: 'The Perfect Blockade Square',
    subtitle: 'Directly in front of the pawn',
    fen: '8/5k2/3p1p2/3PpP2/4P3/5N2/5K2/8 w - - 0 40',
    toMove: 'white',
    introduction: 'The best blockade square is directly in front of the passed pawn. From there, the blockader stops all advances.',
    keyIdeas: ['Blockade directly in front', 'Stops the pawn permanently', 'Knights are ideal', 'Supports other plans'],
    mainLine: [
      { move: 'Nd2', isMainLine: true, annotation: '!', explanation: 'Heading to the perfect blockade square!', arrows: [{ from: 'f3', to: 'd2', color: 'green' }] },
      { move: 'Ke7', isMainLine: true, annotation: '', explanation: 'King activates.' },
      { move: 'Nc4', isMainLine: true, annotation: '!', explanation: 'Getting closer!', arrows: [{ from: 'd2', to: 'c4', color: 'green' }] },
      { move: 'Kd7', isMainLine: true, annotation: '', explanation: 'Black approaches.' },
      { move: 'Nd6', isMainLine: true, annotation: '!!', explanation: 'PERFECT BLOCKADE! Directly in front of the e5 pawn.', highlights: ['d6', 'e5'] }
    ],
    summary: 'The perfect blockade is directly in front of the pawn, stopping it permanently.',
    keyTakeaways: ['Blockade in front of the pawn', 'Knights are ideal blockaders', 'Stops advances permanently', 'Allows other plans'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'blockade-preventing-break',
    category: 'BLOCKADE',
    title: 'Blockading the Break',
    subtitle: 'Stopping pawn advances',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2BPP3/2N1BN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'Sometimes blockading means preventing a pawn break. Control the square where the break would occur.',
    keyIdeas: ['Prevent pawn breaks', 'Control key squares', 'Blockade proactively', 'Anticipate opponent plans'],
    mainLine: [
      { move: 'Bf4', isMainLine: true, annotation: '!', explanation: 'Controlling e5! This prevents ...e5 which would free Black\'s position.', arrows: [{ from: 'e3', to: 'f4', color: 'green' }], highlights: ['e5'] },
      { move: 'Qc7', isMainLine: true, annotation: '', explanation: 'Black repositions.' },
      { move: 'Qd2', isMainLine: true, annotation: '', explanation: 'Developing.' },
      { move: 'Rfd8', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Rfd1', isMainLine: true, annotation: '!', explanation: 'The blockade on e5 is maintained. Black can\'t break free.', highlights: ['e5', 'f4'] }
    ],
    summary: 'Blockading means controlling the squares where your opponent wants to advance.',
    keyTakeaways: ['Control break squares', 'Prevent liberating advances', 'Maintain the blockade', 'Keep opponent cramped'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // ============================================
  // ADDITIONAL PATTERNS TO REACH 5 PER CATEGORY
  // ============================================
  
  // OPEN_FILES - Need 1 more (have 4)
  {
    id: 'open-file-battery',
    category: 'OPEN_FILES',
    title: 'Queen Behind Rook Battery',
    subtitle: 'Heavy piece coordination',
    fen: 'r3r1k1/pp3ppp/2p5/8/3P4/2Q5/PP3PPP/R3R1K1 w - - 0 20',
    toMove: 'white',
    introduction: 'Queen behind rook on an open file creates maximum pressure. The rook clears the way for the queen.',
    keyIdeas: ['Queen behind rook is powerful', 'Rook can sacrifice to open lines', 'Creates mating threats', 'Heavy pieces multiply power'],
    mainLine: [
      { move: 'Re7', isMainLine: true, annotation: '!!', explanation: 'Rook invades the 7th!', highlights: ['e7'] },
      { move: 'Rxe7', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'Rxe7', isMainLine: true, annotation: '!', explanation: 'Still on the 7th with queen backup!', arrows: [{ from: 'c3', to: 'e7', color: 'yellow' }] },
      { move: 'Rf8', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Qc5', isMainLine: true, annotation: '!', explanation: 'Queen and rook dominate! The coordination is overwhelming.', highlights: ['c5', 'e7'] }
    ],
    summary: 'Queen behind rook creates unstoppable pressure on open files.',
    keyTakeaways: ['Queen supports rook invasions', 'Sacrifice rook to open lines', 'Creates mating nets'],
    difficulty: 4,
    estimatedMinutes: 7
  },

  // BISHOP_PAIR - Need 2 more (have 3)
  {
    id: 'bishop-pair-domination',
    category: 'BISHOP_PAIR',
    title: 'Two Bishops Dominate Knights',
    subtitle: 'Long-range superiority',
    fen: 'r2q1rk1/ppp1bppp/2n5/3pP3/3P4/2N5/PPP1BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'In open positions with few pawns, two bishops dominate two knights or knight+bishop.',
    keyIdeas: ['Bishops control long diagonals', 'Trade knights for bishops', 'Open the position', 'Bishops get stronger in endgames'],
    mainLine: [
      { move: 'Bf4', isMainLine: true, annotation: '!', explanation: 'Activating the bishop pair!', arrows: [{ from: 'c1', to: 'f4', color: 'green' }] },
      { move: 'Bd7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Qd2', isMainLine: true, annotation: '', explanation: 'Connecting rooks.' },
      { move: 'Rac8', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Rac1', isMainLine: true, annotation: '!', explanation: 'The bishop pair controls key squares while rooks dominate files.', highlights: ['e2', 'f4'] }
    ],
    summary: 'The bishop pair becomes dominant in open positions, controlling the board from distance.',
    keyTakeaways: ['Open positions favor bishops', 'Coordinate both bishops', 'Trade for bishop pair advantage'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  {
    id: 'bishop-pair-opposite-colors',
    category: 'BISHOP_PAIR',
    title: 'Fighting Opposite-Colored Bishops',
    subtitle: 'Dominating the undefended color',
    fen: '6k1/pp3ppp/2p5/3pP3/3P2b1/2P2B2/PP3PPP/6K1 w - - 0 25',
    toMove: 'white',
    introduction: 'In positions with opposite-colored bishops, having the bishop pair is devastating! Your opponent can only defend squares of ONE color, leaving half the board unprotected. This creates a two-front war they cannot win.',
    keyIdeas: [
      'Attack the color your opponent cannot defend',
      'Place pawns on squares your bishop controls',
      'Middlegame advantage is massive (not drawn like endgames)',
      'Never trade your good bishop pair!'
    ],
    mainLine: [
      { 
        move: 'Be4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Dominating the light squares! Black\'s bishop is on dark squares (g4) and cannot defend ANY light square. We own the entire light-square complex.',
        arrows: [{ from: 'f3', to: 'e4', color: 'green' }, { from: 'e4', to: 'c6', color: 'yellow' }, { from: 'e4', to: 'g6', color: 'yellow' }],
        highlights: ['e4', 'c6', 'g6'],
        conceptTag: 'Dominating the Weak Color'
      },
      { 
        move: 'Bf5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to get active, but their bishop operates on the wrong color. It cannot stop our light-square invasion.',
        arrows: [{ from: 'g4', to: 'f5', color: 'blue' }]
      },
      { 
        move: 'Bg6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Penetrating into Black\'s position on light squares! The bishop attacks f7 and h7 - squares Black cannot defend.',
        arrows: [{ from: 'e4', to: 'g6', color: 'green' }, { from: 'g6', to: 'f7', color: 'red' }, { from: 'g6', to: 'h7', color: 'red' }],
        highlights: ['g6', 'f7', 'h7'],
        conceptTag: 'Light-Square Invasion'
      },
      { 
        move: 'Be6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black\'s bishop blocks on e6, but it\'s the only defender. Meanwhile, we have threats everywhere on light squares.',
        arrows: [{ from: 'f5', to: 'e6', color: 'blue' }]
      },
      { 
        move: 'f3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing to bring the king into the attack! The bishop on g6 stays strong. Notice Black\'s bishop on e6 is tied to defending f7.',
        arrows: [{ from: 'f2', to: 'f3', color: 'green' }],
        highlights: ['f3'],
        conceptTag: 'Improving All Pieces'
      },
      { 
        move: 'Kf8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to defend, but there are too many weak squares.',
        arrows: [{ from: 'g8', to: 'f8', color: 'blue' }]
      },
      { 
        move: 'Kf2', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The king marches! With total control of light squares, White will invade with the king via g3-h4-g5 or f4-e4. Black cannot cover both colors and will collapse.',
        arrows: [{ from: 'g1', to: 'f2', color: 'green' }, { from: 'f2', to: 'g3', color: 'yellow' }, { from: 'g3', to: 'h4', color: 'yellow' }],
        highlights: ['f2', 'g3', 'h4'],
        conceptTag: 'Winning Technique'
      }
    ],
    summary: 'With the bishop pair against a single bishop, you dominate the color your opponent cannot defend. This is NOT a draw like opposite-colored bishop endgames—it\'s a decisive advantage!',
    keyTakeaways: [
      'The bishop pair dominates opposite-colored positions',
      'Your opponent cannot defend one entire color complex',
      'Place pieces and pawns on the weak color',
      'This is a winning advantage, not a draw!'
    ],
    memoryTip: 'Think of it as a two-front war: your opponent has soldiers on black squares, but you\'re invading through the white squares where they have NO defense!',
    difficulty: 4,
    estimatedMinutes: 8
  },

  // GOOD_BAD_BISHOP - Need 2 more (have 3)
  {
    id: 'bad-bishop-trade',
    category: 'GOOD_BAD_BISHOP',
    title: 'Trading the Bad Bishop',
    subtitle: 'Relieving the cramp',
    fen: 'r1bq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When you have a bad bishop, look to trade it! This relieves the cramp and improves your position.',
    keyIdeas: ['Identify your bad bishop', 'Trade it for opponent\'s good pieces', 'Relieves cramping', 'Improves piece mobility'],
    mainLine: [
      { move: 'Bg5', isMainLine: true, annotation: '!', explanation: 'Activating the bishop outside the pawn chain!', arrows: [{ from: 'e3', to: 'g5', color: 'green' }] },
      { move: 'h6', isMainLine: true, annotation: '', explanation: 'Black attacks.' },
      { move: 'Bxf6', isMainLine: true, annotation: '!', explanation: 'Trading the bishop! This removes a bad piece.', arrows: [{ from: 'g5', to: 'f6', color: 'green' }] },
      { move: 'Bxf6', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Qd2', isMainLine: true, annotation: '', explanation: 'White\'s position is improved after trading the bad bishop.' }
    ],
    summary: 'Trading a bad bishop relieves cramping and improves your position.',
    keyTakeaways: ['Trade bad bishops', 'Improves mobility', 'Relieves cramp', 'Position opens up'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  {
    id: 'good-bishop-exploitation',
    category: 'GOOD_BAD_BISHOP',
    title: 'Exploiting Opponent\'s Bad Bishop',
    subtitle: 'Attack the weak color',
    fen: 'r2q1rk1/ppp1bppp/2np1n2/4p3/2BPP1b1/2N1BN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When your opponent has a bad bishop, attack on the squares it cannot defend!',
    keyIdeas: ['Opponent\'s bad bishop can\'t defend', 'Attack the weak color', 'Place pieces on those squares', 'Dominate the board'],
    mainLine: [
      { move: 'h3', isMainLine: true, annotation: '!', explanation: 'Attacking the bad bishop!', arrows: [{ from: 'h2', to: 'h3', color: 'green' }] },
      { move: 'Bh5', isMainLine: true, annotation: '', explanation: 'Bishop retreats.' },
      { move: 'Nh4', isMainLine: true, annotation: '!', explanation: 'Knight to the weak light squares!', highlights: ['h4', 'f5'] },
      { move: 'Bg6', isMainLine: true, annotation: '', explanation: 'Black tries to trade.' },
      { move: 'Nxg6', isMainLine: true, annotation: '', explanation: 'We trade on our terms.' },
      { move: 'hxg6', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Bf3', isMainLine: true, annotation: '!', explanation: 'Our light-squared bishop dominates now!', highlights: ['f3'] }
    ],
    summary: 'Attack on the squares that the opponent\'s bad bishop cannot defend.',
    keyTakeaways: ['Attack weak color squares', 'Opponent can\'t defend', 'Dominate that color', 'Trade their good pieces'],
    difficulty: 3,
    estimatedMinutes: 7
  },

  // SPACE_ADVANTAGE - Need 1 more (have 4)
  {
    id: 'space-bind-squeeze',
    category: 'SPACE_ADVANTAGE',
    title: 'The Space Bind',
    subtitle: 'Suffocating the opponent',
    fen: 'r1bq1rk1/ppp1npbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When you have more space, maintain it! Don\'t exchange pawns that maintain your space advantage.',
    keyIdeas: ['Maintain space advantage', 'Don\'t release the tension', 'Opponent has no room', 'Prepare slow improvement'],
    mainLine: [
      { move: 'Qd2', isMainLine: true, annotation: '!', explanation: 'Improving pieces while maintaining space.', arrows: [{ from: 'd1', to: 'd2', color: 'green' }] },
      { move: 'c5', isMainLine: true, annotation: '', explanation: 'Black tries to break.' },
      { move: 'dxc5', isMainLine: true, annotation: '', explanation: 'We trade on our terms.' },
      { move: 'dxc5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Rad1', isMainLine: true, annotation: '!', explanation: 'We still maintain the space advantage with our e4 pawn!', highlights: ['e4', 'c4'] }
    ],
    summary: 'Space advantage should be maintained carefully. Don\'t release tension prematurely.',
    keyTakeaways: ['Maintain space advantage', 'Improve pieces slowly', 'Keep opponent cramped', 'Trade on your terms'],
    difficulty: 3,
    estimatedMinutes: 7
  },

  // PROPHYLAXIS - Need 1 more (have 4)
  {
    id: 'prophylaxis-square-control',
    category: 'PROPHYLAXIS',
    title: 'Controlling Key Squares',
    subtitle: 'Prophylactic square control',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'Prophylaxis means controlling key squares before your opponent can use them.',
    keyIdeas: ['Control key squares first', 'Prevent opponent plans', 'Prophylactic piece placement', 'Deny good squares'],
    mainLine: [
      { move: 'd3', isMainLine: true, annotation: '!', explanation: 'Controlling e4 and d4 prophylactically!', arrows: [{ from: 'd2', to: 'd3', color: 'green' }], highlights: ['e4', 'd4'] },
      { move: 'Bc5', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Be3', isMainLine: true, annotation: '!', explanation: 'Controlling d4! Black cannot place a piece there.', highlights: ['d4'] },
      { move: 'Bxe3', isMainLine: true, annotation: '', explanation: 'Black trades.' },
      { move: 'fxe3', isMainLine: true, annotation: '', explanation: 'Recapturing. We still control d4 and e4!' }
    ],
    summary: 'Prophylactic square control denies your opponent good squares for their pieces.',
    keyTakeaways: ['Control key squares first', 'Deny opponent good squares', 'Prophylactic thinking', 'Prevent before they execute'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // MINORITY_ATTACK - Need 2 more (have 3)
  {
    id: 'minority-attack-follow-up',
    category: 'MINORITY_ATTACK',
    title: 'After the Minority Attack',
    subtitle: 'Exploiting the weakness',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/1Ppp4/3P4/2N1PN2/P3BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'After b5 succeeds, exploit the weakness! Target c6 with all your pieces.',
    keyIdeas: ['After b5, target c6', 'Pile up on the weakness', 'Rooks on the c-file', 'Constant pressure wins'],
    mainLine: [
      { move: 'bxc6', isMainLine: true, annotation: '!', explanation: 'Breaking through!', arrows: [{ from: 'b5', to: 'c6', color: 'green' }] },
      { move: 'bxc6', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Rb1', isMainLine: true, annotation: '!', explanation: 'Seizing the b-file!', highlights: ['b1'] },
      { move: 'Rb8', isMainLine: true, annotation: '', explanation: 'Black defends.' },
      { move: 'Rxb8', isMainLine: true, annotation: '', explanation: 'Trading.' },
      { move: 'Qxb8', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Qa4', isMainLine: true, annotation: '!', explanation: 'Attacking c6! The weakness remains a target.', arrows: [{ from: 'd1', to: 'a4', color: 'green' }], highlights: ['a4', 'c6'] }
    ],
    summary: 'After the minority attack creates a weakness, pile up on it with all your pieces.',
    keyTakeaways: ['Target the resulting weakness', 'Pile pieces on weak pawns', 'Use all your pieces', 'Constant pressure'],
    difficulty: 4,
    estimatedMinutes: 8
  },

  {
    id: 'minority-attack-timing',
    category: 'MINORITY_ATTACK',
    title: 'Timing the Minority Attack',
    subtitle: 'When to push b5',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/1PN1PN2/P3BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'The minority attack requires proper timing. Push b4-b5 when your pieces are ready to follow up.',
    keyIdeas: ['Prepare before pushing b5', 'Get pieces ready first', 'Timing is everything', 'Don\'t rush the attack'],
    mainLine: [
      { move: 'a3', isMainLine: true, annotation: '!', explanation: 'Preparing b4! Not rushing.', arrows: [{ from: 'a2', to: 'a3', color: 'green' }] },
      { move: 'Rc8', isMainLine: true, annotation: '', explanation: 'Black activates.' },
      { move: 'Rc1', isMainLine: true, annotation: '!', explanation: 'Getting the rook ready for the c-file!', arrows: [{ from: 'a1', to: 'c1', color: 'green' }] },
      { move: 'cxd4', isMainLine: true, annotation: '', explanation: 'Black exchanges.' },
      { move: 'exd4', isMainLine: true, annotation: '', explanation: 'Recapturing.' },
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'NOW the minority attack! All pieces are ready.', arrows: [{ from: 'b3', to: 'b4', color: 'green' }] }
    ],
    summary: 'Proper timing is crucial for the minority attack. Prepare your pieces before pushing b4-b5.',
    keyTakeaways: ['Prepare before attacking', 'Get rooks on c-file', 'Timing matters', 'Don\'t rush'],
    difficulty: 4,
    estimatedMinutes: 8
  },

  // PAWN_BREAKS - Need 2 more (have 3)
  {
    id: 'pawn-break-e4-e5',
    category: 'PAWN_BREAKS',
    title: 'The e4-e5 Break',
    subtitle: 'Gaining space',
    fen: 'r1bqkb1r/pppppppp/2n2n2/8/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'The e4-e5 break gains space and drives away enemy pieces. It\'s thematic in many openings.',
    keyIdeas: ['e5 gains space', 'Drives away knights', 'Opens lines', 'Creates outpost on d4'],
    mainLine: [
      { move: 'e5', isMainLine: true, annotation: '!', explanation: 'THE SPACE-GAINING BREAK!', arrows: [{ from: 'e4', to: 'e5', color: 'green' }], highlights: ['e5'] },
      { move: 'Nd5', isMainLine: true, annotation: '', explanation: 'Knight retreats.' },
      { move: 'Nxd5', isMainLine: true, annotation: '', explanation: 'Trading.' },
      { move: 'exd5', isMainLine: true, annotation: '', explanation: 'Black recaptures.' },
      { move: 'Nd4', isMainLine: true, annotation: '!', explanation: 'The knight uses the outpost created by e5!', highlights: ['d4'] }
    ],
    summary: 'The e5 break gains space, drives away pieces, and creates outposts.',
    keyTakeaways: ['e5 gains space', 'Creates d4 outpost', 'Drives knights away', 'Thematic break'],
    difficulty: 2,
    estimatedMinutes: 5
  },

  {
    id: 'pawn-break-b5-sicilian',
    category: 'PAWN_BREAKS',
    title: 'The ...b5 Break in Sicilian',
    subtitle: 'Queenside counterplay',
    fen: 'r1bqk2r/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2QK2R b KQkq - 0 9',
    toMove: 'black',
    introduction: 'The ...b5 break is thematic for Black in the Sicilian. It gains queenside space and creates counterplay.',
    keyIdeas: ['...b5 gains queenside space', 'Attacks White\'s pieces', 'Creates counterplay', 'Opens the b-file'],
    mainLine: [
      { move: 'a6', isMainLine: true, annotation: '!', explanation: 'Preparing ...b5!', arrows: [{ from: 'a7', to: 'a6', color: 'green' }] },
      { move: 'O-O', isMainLine: true, annotation: '', explanation: 'White castles.' },
      { move: 'b5', isMainLine: true, annotation: '!', explanation: 'THE BREAK! Attacking the bishop and gaining space.', arrows: [{ from: 'b7', to: 'b5', color: 'green' }], highlights: ['b5', 'c4'] },
      { move: 'Bd3', isMainLine: true, annotation: '', explanation: 'Bishop retreats.' },
      { move: 'Rb8', isMainLine: true, annotation: '!', explanation: 'Following up on the b-file! Black has queenside counterplay.', highlights: ['b8', 'b5'] }
    ],
    summary: 'The ...b5 break gives Black queenside counterplay in the Sicilian.',
    keyTakeaways: ['Prepare with ...a6', 'Then push ...b5', 'Creates counterplay', 'Opens b-file'],
    difficulty: 3,
    estimatedMinutes: 6
  },

  // KING_ACTIVITY - Need 1 more (have 4)
  {
    id: 'king-activity-opposition',
    category: 'KING_ACTIVITY',
    title: 'The Opposition',
    subtitle: 'King facing king',
    fen: '8/8/4k3/8/8/4K3/8/8 w - - 0 1',
    toMove: 'white',
    introduction: 'In king and pawn endgames, the opposition determines who wins. The side NOT to move has the opposition.',
    keyIdeas: ['Opposition = kings face each other', 'Side NOT to move has it', 'Forces opponent back', 'Crucial in endgames'],
    mainLine: [
      { move: 'Kd4', isMainLine: true, annotation: '!', explanation: 'Not taking the opposition—preparing to seize it!', arrows: [{ from: 'e3', to: 'd4', color: 'green' }] },
      { move: 'Kd6', isMainLine: true, annotation: '', explanation: 'Black mirrors.' },
      { move: 'Ke4', isMainLine: true, annotation: '!', explanation: 'Now taking the opposition!', highlights: ['e4', 'e6'] },
      { move: 'Ke6', isMainLine: true, annotation: '', explanation: 'Black maintains it.' },
      { move: 'Kf4', isMainLine: true, annotation: '!', explanation: 'White maneuvers, looking for a better moment to take the opposition.', highlights: ['f4'] }
    ],
    summary: 'The opposition is when kings face each other with one square between. The side NOT to move has the advantage.',
    keyTakeaways: ['Opposition = kings facing', 'Side not to move wins', 'Crucial in king endgames', 'Practice this concept'],
    difficulty: 3,
    estimatedMinutes: 7
  },

  // CENTRALIZATION - Need 1 more (have 4)
  {
    id: 'centralization-queen-center',
    category: 'CENTRALIZATION',
    title: 'Queen Centralization',
    subtitle: 'The powerful central queen',
    fen: 'r2q1rk1/ppp2ppp/2n1pn2/3p4/1b1P4/2NBPN2/PPP2PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A centralized queen controls many squares and creates threats in all directions.',
    keyIdeas: ['Central queen is powerful', 'Controls all sides', 'Creates multiple threats', 'Hard to attack'],
    mainLine: [
      { move: 'a3', isMainLine: true, annotation: '', explanation: 'Attacking the bishop.' },
      { move: 'Bxc3', isMainLine: true, annotation: '', explanation: 'Bishop trades.' },
      { move: 'bxc3', isMainLine: true, annotation: '', explanation: 'Recapturing.' },
      { move: 'Qc7', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Qd3', isMainLine: true, annotation: '!', explanation: 'QUEEN TO THE CENTER! From d3, the queen controls many squares and can switch flanks easily.', arrows: [{ from: 'd1', to: 'd3', color: 'green' }], highlights: ['d3'] },
      { move: 'Rfd8', isMainLine: true, annotation: '', explanation: 'Black develops.' },
      { move: 'Qh3', isMainLine: true, annotation: '!', explanation: 'From the center, the queen swings to attack! This shows the power of centralization.', arrows: [{ from: 'd3', to: 'h3', color: 'green' }], highlights: ['h3'] }
    ],
    summary: 'A centralized queen can quickly switch between attack and defense, creating threats on both flanks.',
    keyTakeaways: ['Centralize the queen when safe', 'Controls all directions', 'Can switch flanks quickly', 'Creates multiple threats'],
    difficulty: 3,
    estimatedMinutes: 7
  }
];

export default additionalPatterns;

