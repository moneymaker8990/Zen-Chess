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
        explanation: 'Supporting the knight! The bishop eyes h7 and ensures the f5 knight cannot be dislodged.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'f5', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        conceptTag: 'Supporting the Blockade'
      },
      {
        move: 'g6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to drive away the knight, but this creates new weaknesses.',
        arrows: [{ from: 'g7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'Nh6+',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps away with check! It\'s still on a powerful square and Black\'s kingside is weakened.',
        arrows: [{ from: 'f5', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Flexible Knight'
      },
      {
        move: 'Kg7',
        isMainLine: true,
        annotation: '',
        explanation: 'The king steps out of check.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qg4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen joins the attack on the weakened kingside! The blockade strategy has created opportunities for a direct attack.',
        arrows: [{ from: 'd1', to: 'g4', color: 'green' }, { from: 'g4', to: 'g6', color: 'yellow' }],
        highlights: ['g4'],
        conceptTag: 'Attack Formation'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nf5+',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight returns to f5 with check! Now it\'s even stronger because g6 is weakened. The blockading knight has also become an attacking piece.',
        arrows: [{ from: 'h6', to: 'f5', color: 'green' }],
        highlights: ['f5'],
        conceptTag: 'Knight Returns!'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king retreats.',
        arrows: [{ from: 'g7', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Qh4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Threatening Qxh7#! The blockade knight on f5 and the queen on h4 create a deadly attack. This is Nimzowitsch\'s vision fulfilled—the blockade leads to complete domination.',
        arrows: [{ from: 'g4', to: 'h4', color: 'green' }, { from: 'h4', to: 'h7', color: 'yellow' }],
        highlights: ['h4', 'h7'],
        conceptTag: 'Winning Attack'
      }
    ],
    
    summary: 'We executed Nimzowitsch\'s classic knight maneuver Nd2-f1-e3-f5 to establish an immovable blockade on f5. Black\'s attempt to dislodge it (g6) only created more weaknesses. The knight returned to f5 even stronger, leading to a winning attack.',
    
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
  // BLOCKADE - CHAPTER 2: BLOCKADING PASSED PAWNS
  // ============================================
  {
    id: 'blockade-passed-pawn-deep',
    category: 'BLOCKADE',
    title: 'Blockading the Passed Pawn',
    subtitle: 'Stopping the dangerous passer',
    // Position with passed pawn that needs blockading
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A passed pawn is dangerous—it threatens to promote. The best way to stop it is with a blockade! Place a piece (ideally a knight) directly in front of the passed pawn. This prevents it from advancing and turns it into a weakness. This pattern shows how to establish and maintain a blockade against a passed pawn.',
    
    keyIdeas: [
      'Blockade passed pawns immediately—don\'t let them advance',
      'Knights are ideal blockaders—they remain active while blocking',
      'Place the blockader directly in front of the pawn',
      'Support the blockader with other pieces',
      'A blockaded passed pawn becomes a weakness'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black creates a passed pawn! The d5 pawn is now a dangerous threat that must be blockaded immediately.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BLOCKADE! The knight jumps to d4, directly in front of the passed pawn. This prevents the pawn from advancing and turns it into a weakness. The knight is the perfect blockader—it remains fully active while blocking the pawn.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd5', color: 'red' }
        ],
        highlights: ['d4', 'd5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the passed pawn is now blockaded and harmless.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the blockading knight and adding pressure to the d5 pawn. The blockade is now well-supported.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Supporting the Blockade'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also supports the pawn, but White\'s blockade is stronger.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker to the blockaded pawn. White is piling up on the weakness.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but the blockade remains strong.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the blockaded pawn. The passed pawn has become a permanent weakness.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces attacking.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The blockaded passed pawn has fallen. The blockade has done its job—it prevented the pawn from advancing and allowed White to win it.',
        arrows: [{ from: 'd4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White has won the pawn and has a completely winning position. The blockade has been a complete success.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Advantage'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White has won material! The blockaded passed pawn has been eliminated, and White has a winning endgame. This demonstrates the power of the blockade—it turns a dangerous passed pawn into a weakness that can be won.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Endgame'
      }
    ],
    
    summary: 'We blockaded the passed d5 pawn with Nd4, preventing it from advancing. Then we piled up pieces (Rfd1, Bf4, Rad1) to attack the blockaded pawn. Eventually, we won it with Nxd5. The blockade turned a dangerous passed pawn into a weakness that White could exploit.',
    
    keyTakeaways: [
      'Blockade passed pawns immediately—don\'t let them advance',
      'Knights are ideal blockaders—they remain active while blocking',
      'Place the blockader directly in front of the pawn',
      'Support the blockader with other pieces',
      'A blockaded passed pawn becomes a weakness you can attack'
    ],
    
    memoryTip: 'Think of the blockade as "putting a wall in front of the pawn"—it can\'t advance, so it becomes a target!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Blockade Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'blockade-pawn-chain-deep',
    category: 'BLOCKADE',
    title: 'Blockading the Pawn Chain',
    subtitle: 'Stopping multiple pawns at once',
    // Position with pawn chain that needs blockading
    fen: 'r1bq1rk1/pp2bppp/2np1np1/3p4/2PP4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Sometimes you need to blockade not just one pawn, but an entire pawn chain. By placing a piece in front of the chain, you can stop multiple pawns from advancing and create lasting weaknesses. The blockader becomes a powerful piece that controls the entire chain. This pattern shows how to establish and maintain a blockade against a pawn chain.',
    
    keyIdeas: [
      'Blockading a pawn chain stops multiple pawns at once',
      'Place the blockader in front of the base of the chain',
      'The blockader controls all the pawns in the chain',
      'Support the blockader with other pieces',
      'A blockaded pawn chain becomes a permanent weakness'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, creating a pawn chain with d5, e6, and f7. This chain needs to be blockaded immediately.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'e6', 'f7']
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BLOCKADE! The knight jumps to d4, directly in front of the pawn chain. This prevents the d5, e6, and f7 pawns from advancing. The knight is the perfect blockader—it controls all the pawns in the chain.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd5', color: 'red' },
          { from: 'd4', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d4', 'd5', 'e6'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the pawn chain is now blockaded and cannot advance.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the blockading knight and adding pressure to the d5 pawn. The blockade is now well-supported.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Supporting the Blockade'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also supports the pawn, but White\'s blockade is stronger.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker to the blockaded pawn chain. White is piling up on the weakness.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but the blockade remains strong.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the blockaded pawn chain. The pawns cannot advance and have become permanent weaknesses.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces attacking.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nxe6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a pawn! The blockaded pawn chain has been broken. The blockade has done its job—it prevented the pawns from advancing and allowed White to win material.',
        arrows: [{ from: 'd4', to: 'e6', color: 'green' }],
        highlights: ['e6'],
        conceptTag: 'Breaking the Chain'
      },
      {
        move: 'fxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but now the chain is broken and White has won material.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the d5 pawn! The blockaded pawn chain has been completely destroyed. White has won material and has a winning position.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won the pawn and has a completely winning position. The blockade has been a complete success—it prevented the pawn chain from advancing and allowed White to win material.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White has won material! The blockaded pawn chain has been eliminated, and White has a winning endgame. This demonstrates the power of the blockade—it turns a dangerous pawn chain into a weakness that can be won.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We blockaded the pawn chain (d5, e6, f7) with Nd4, preventing all the pawns from advancing. Then we piled up pieces (Rfd1, Bf4, Rad1) to attack the blockaded chain. Eventually, we broke it with Nxe6 and won material. The blockade turned a dangerous pawn chain into a weakness that White could exploit.',
    
    keyTakeaways: [
      'Blockading a pawn chain stops multiple pawns at once',
      'Place the blockader in front of the base of the chain',
      'The blockader controls all the pawns in the chain',
      'Support the blockader with other pieces',
      'A blockaded pawn chain becomes a weakness you can attack'
    ],
    
    memoryTip: 'Think of the blockade as "putting a wall in front of the chain"—all the pawns are stopped, so they become targets!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Strategic Blockade Theory',
    playerExample: {
      white: 'Aron Nimzowitsch',
      black: 'Alexander Alekhine',
      event: 'San Remo',
      year: 1930
    }
  },

  {
    id: 'blockade-bishop-blockade-deep',
    category: 'BLOCKADE',
    title: 'Bishop as Blockader',
    subtitle: 'Using the bishop to blockade',
    // Position where bishop blockade is effective
    fen: 'r1bq1rk1/pp2bppp/2np1np1/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'While knights are ideal blockaders, bishops can also be effective blockaders in certain positions! A bishop on a long diagonal can blockade multiple pawns and remain active. This pattern shows how to use a bishop as a blockader effectively.',
    
    keyIdeas: [
      'Bishops can be effective blockaders on long diagonals',
      'A bishop can blockade multiple pawns at once',
      'Bishops remain active while blockading',
      'Place the bishop on a diagonal that controls the pawns',
      'Bishop blockades are especially effective against pawn chains'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, creating a passed pawn that needs to be blockaded.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BISHOP BLOCKADE! The bishop moves to f4, controlling the d6 square and preventing the d5 pawn from advancing. The bishop is an effective blockader on this diagonal!',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'red' }
        ],
        highlights: ['f4', 'd5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the passed pawn is now blockaded and harmless.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the blockading bishop and adding pressure to the d5 pawn. The blockade is now well-supported.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Supporting the Blockade'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also supports the pawn, but White\'s blockade is stronger.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to d3, adding another attacker to the blockaded pawn. White is piling up on the weakness.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but the blockade remains strong.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the blockaded pawn. The bishop blockade has been a complete success.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces attacking.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures the d5 pawn! The blockaded passed pawn has fallen. The bishop blockade has done its job—it prevented the pawn from advancing and allowed White to win it.',
        arrows: [{ from: 'd3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won the pawn and has a completely winning position. The bishop blockade has been a complete success.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White has won material! The blockaded passed pawn has been eliminated, and White has a winning endgame. This demonstrates the power of the bishop blockade—it can be just as effective as a knight blockade in the right position.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We blockaded the passed d5 pawn with Bf4, preventing it from advancing. Then we piled up pieces (Rfd1, Bd3, Rad1) to attack the blockaded pawn. Eventually, we won it with Bxd5. The bishop blockade turned a dangerous passed pawn into a weakness that White could exploit.',
    
    keyTakeaways: [
      'Bishops can be effective blockaders on long diagonals',
      'A bishop can blockade multiple pawns at once',
      'Bishops remain active while blockading',
      'Place the bishop on a diagonal that controls the pawns',
      'Bishop blockades are especially effective against pawn chains'
    ],
    
    memoryTip: 'Think of the bishop blockade as "a sniper on a long diagonal"—it can block multiple pawns from far away!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Blockade Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  {
    id: 'blockade-rook-blockade-deep',
    category: 'BLOCKADE',
    title: 'Rook as Blockader',
    subtitle: 'Using the rook to blockade',
    // Position where rook blockade is effective
    fen: 'r1bq1rk1/pp2bppp/2np1np1/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'While knights are ideal blockaders, rooks can also be effective blockaders in certain positions! A rook on a file can blockade a passed pawn and remain active. This pattern shows how to use a rook as a blockader effectively.',
    
    keyIdeas: [
      'Rooks can be effective blockaders on files',
      'A rook can blockade a passed pawn and remain active',
      'Place the rook directly in front of the pawn',
      'Rooks on files can blockade while controlling the file',
      'Rook blockades are especially effective against central pawns'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, creating a passed pawn that needs to be blockaded.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      {
        move: 'Rd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ROOK BLOCKADE! The rook moves to d1, controlling the d-file and preventing the d5 pawn from advancing. The rook is an effective blockader on this file!',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'red' }
        ],
        highlights: ['d1', 'd5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the passed pawn is now blockaded and harmless.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the blockading rook and adding pressure to the d5 pawn. The blockade is now well-supported.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Supporting the Blockade'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also supports the pawn, but White\'s blockade is stronger.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the blockaded pawn. The rooks are perfectly placed to maintain the blockade.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubled Rooks'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, adding another attacker to the blockaded pawn. White is piling up on the weakness.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces attacking.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook captures the d5 pawn! The blockaded passed pawn has fallen. The rook blockade has done its job—it prevented the pawn from advancing and allowed White to win it.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won the pawn and has a completely winning position. The rook blockade has been a complete success.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The blockaded passed pawn has been eliminated, and White has a winning endgame. This demonstrates the power of the rook blockade—it can be just as effective as a knight blockade in the right position.',
        arrows: [{ from: 'd2', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We blockaded the passed d5 pawn with Rd1, preventing it from advancing. Then we piled up pieces (Bf4, Rad1, Qd2) to attack the blockaded pawn. Eventually, we won it with Rxd5. The rook blockade turned a dangerous passed pawn into a weakness that White could exploit.',
    
    keyTakeaways: [
      'Rooks can be effective blockaders on files',
      'A rook can blockade a passed pawn and remain active',
      'Place the rook directly in front of the pawn',
      'Rooks on files can blockade while controlling the file',
      'Rook blockades are especially effective against central pawns'
    ],
    
    memoryTip: 'Think of the rook blockade as "a wall on the file"—it stops the pawn and controls the entire file!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Blockade Theory',
    playerExample: {
      white: 'Aron Nimzowitsch',
      black: 'Alexander Alekhine',
      event: 'San Remo',
      year: 1930
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
        move: 'Rxg8+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Exchanging rooks to open up Black\'s king. The attack continues with full force.',
        arrows: [{ from: 'g1', to: 'g8', color: 'green' }],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'Kxg8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king must recapture.',
        arrows: [{ from: 'h8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Rg1+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The second rook enters with check! This is the power of piece coordination—when all pieces work together, the attack is unstoppable.',
        arrows: [{ from: 'd1', to: 'g1', color: 'green' }],
        highlights: ['g1'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king flees, but there\'s no escape.',
        arrows: [{ from: 'g8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qh8+',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen delivers check, driving the king further into the open. The coordinated attack has demolished Black\'s defenses. This is the power of the rook lift combined with piece coordination!',
        arrows: [{ from: 'h6', to: 'h8', color: 'green' }],
        highlights: ['h8'],
        conceptTag: 'Decisive Attack'
      }
    ],
    
    summary: 'We coordinated our pieces beautifully: h4-h5 opened lines, Bxh6 removed a defender, and the rook lift Rg1 brought maximum firepower against Black\'s king. The combination of pawn storm, bishop trade, and rook lift created an irresistible attack.',
    
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
  // PIECE COORDINATION - CHAPTER 2: QUEEN-BISHOP BATTERY
  // ============================================
  {
    id: 'coordination-queen-bishop-battery',
    category: 'PIECE_COORDINATION',
    title: 'The Queen-Bishop Battery',
    subtitle: 'Diagonal destruction with coordinated pieces',
    // Position where queen-bishop battery can be formed
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PP1QBPPP/R4RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A battery is two pieces lined up on the same diagonal or file. The queen-bishop battery on the a1-h8 or b1-h7 diagonal pointing at the enemy king is devastating. The bishop leads, the queen follows! This pattern shows how to create and exploit queen-bishop batteries.',
    
    keyIdeas: [
      'A battery is two pieces on the same line (diagonal or file)',
      'Queen-bishop batteries on long diagonals are especially powerful',
      'The bishop can sacrifice itself to open lines for the queen',
      'Batteries create multiple mating threats',
      'Coordinate heavy pieces for maximum effect'
    ],
    
    mainLine: [
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to h6, preparing to form a battery with the queen. This bishop will lead the attack.',
        arrows: [
          { from: 'e3', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Preparing the Battery'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades to remove the threat, but this weakens the dark squares.',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures! Now the queen is on h6, eyeing the weak dark squares around Black\'s king. The battery is forming.',
        arrows: [
          { from: 'e2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Queen to h6'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White continues building the battery.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BATTERY! The bishop moves to f4, and now Qh6 and Bf4 form a battery on the b8-h2 diagonal! The bishop can sacrifice itself to open lines for the queen.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'h6', color: 'yellow' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['f4', 'h6'],
        conceptTag: 'The Battery!'
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the battery creates unstoppable threats.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the rook into play! White has multiple pieces coordinating toward the kingside. The battery is the focal point.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
        highlights: ['e1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to improve, but White has a devastating continuation.',
        arrows: [{ from: 'c6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BATTERY STRIKES! The bishop sacrifices itself to open the h-file for the queen. This is the power of the battery—the bishop clears the way for the queen to deliver the final blow.',
        arrows: [
          { from: 'f4', to: 'g7', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g7'],
        conceptTag: 'Battery Sacrifice'
      },
      {
        move: 'Kxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but now the h-file is open and the king is exposed.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }],
        highlights: ['h6', 'h8']
      },
      {
        move: 'Qh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen invades on the open h-file. The battery has done its job—the bishop cleared the way for the queen.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Queen Invasion'
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king flees, but there\'s no escape.',
        arrows: [{ from: 'g7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qh8+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Another check! The queen continues the attack. The battery has created a winning position.',
        arrows: [{ from: 'h7', to: 'h8', color: 'green' }],
        highlights: ['h8'],
        conceptTag: 'Pursuing the King'
      },
      {
        move: 'Ke7',
        isMainLine: true,
        annotation: '',
        explanation: 'The king moves to e7, but White has more threats.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Re3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to the third rank! Combined with the queen on h8, White has a winning attack. The queen-bishop battery has transformed into a complete attacking formation. This is the power of piece coordination—batteries multiply the effectiveness of both pieces.',
        arrows: [
          { from: 'e1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'e7', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Complete Coordination'
      }
    ],
    
    summary: 'We created a queen-bishop battery on the long diagonal (Bf4-Qh6). The bishop sacrificed itself (Bxg7) to open lines for the queen, which then invaded on the h-file. The battery coordinated both pieces perfectly, creating an unstoppable attack.',
    
    keyTakeaways: [
      'Batteries are two pieces on the same line (diagonal or file)',
      'Queen-bishop batteries on long diagonals are devastating',
      'The bishop can sacrifice to open lines for the queen',
      'Batteries create multiple mating threats',
      'Coordinate heavy pieces for maximum attacking power'
    ],
    
    memoryTip: 'Think of a battery as "two cannons firing together"—the combined firepower is unstoppable!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'Attacking Chess Patterns',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1985
    }
  },

  // ============================================
  // PIECE COORDINATION - CHAPTER 3: DOUBLED ROOKS
  // ============================================
  {
    id: 'coordination-doubled-rooks-deep',
    category: 'PIECE_COORDINATION',
    title: 'The Power of Doubled Rooks',
    subtitle: 'Two rooks working together',
    // Position where doubled rooks can be created
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Doubled rooks are one of the most powerful formations in chess! Two rooks on the same file create irresistible pressure. They support each other, can trade favorably, and often lead to material gains or decisive attacks. This pattern shows how to create and exploit doubled rooks.',
    
    keyIdeas: [
      'Doubled rooks on a file create maximum pressure',
      'Two rooks support each other and can trade favorably',
      'Doubled rooks often lead to material gains',
      'Use doubled rooks to penetrate the enemy position',
      'The front rook can sacrifice itself to open lines for the back rook'
    ],
    
    mainLine: [
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, preparing to double on the d-file. This is the first step in creating doubled rooks.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Preparing to Double'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the file, but White continues the plan.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'DOUBLED ROOKS! The second rook moves to d1, creating doubled rooks on the d-file. This creates maximum pressure and is one of the most powerful formations in chess!',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubled Rooks!'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen joins the attack! Now White has doubled rooks AND the queen all on the d-file. This creates overwhelming pressure.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Tripling'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has too many pieces on the file.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The front rook sacrifices itself! By trading, White opens the file for the back rook. This is the power of doubled rooks—they can trade favorably.',
        arrows: [{ from: 'd1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Front Rook Sacrifice'
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but now the file is open for White\'s back rook.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The back rook recaptures! Now White has a rook on the 7th rank, attacking pawns and restricting Black\'s king. The doubled rooks have been a complete success!',
        arrows: [
          { from: 'd1', to: 'd7', color: 'green' },
          { from: 'd7', to: 'b7', color: 'yellow' },
          { from: 'd7', to: 'f7', color: 'yellow' }
        ],
        highlights: ['d7'],
        conceptTag: '7th Rank!'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures! White has won a rook and has a completely winning position. The doubled rooks have paid off!',
        arrows: [{ from: 'd2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning another pawn! White has a completely winning position. The doubled rooks have created a decisive material advantage. This demonstrates the power of doubled rooks—they create irresistible pressure that leads to material gains.',
        arrows: [{ from: 'd7', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We created doubled rooks on the d-file, then tripled with the queen. The front rook sacrificed itself to open the file, and the back rook invaded the 7th rank, winning material. The doubled rooks created irresistible pressure that led to a winning position.',
    
    keyTakeaways: [
      'Doubled rooks on a file create maximum pressure',
      'Two rooks support each other and can trade favorably',
      'The front rook can sacrifice to open lines for the back rook',
      'Doubled rooks often lead to material gains',
      'Use doubled rooks to penetrate the enemy position'
    ],
    
    memoryTip: 'Think of doubled rooks as "two tanks rolling down the same road"—they\'re unstoppable!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Rook Coordination Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'coordination-queen-knight-battery-deep',
    category: 'PIECE_COORDINATION',
    title: 'Queen and Knight Battery',
    subtitle: 'The powerful queen-knight combination',
    // Position where queen-knight battery is powerful
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A queen and knight working together create one of the most dangerous combinations in chess! The queen provides long-range power while the knight adds tactical threats. Together, they can create devastating attacks. This pattern shows how to coordinate a queen and knight battery.',
    
    keyIdeas: [
      'Queen and knight complement each other perfectly',
      'The queen provides long-range power',
      'The knight adds tactical threats and forks',
      'Place the knight on a strong square near the queen',
      'Queen-knight batteries often lead to mating attacks'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to d5, a powerful central square! From d5, it prepares to coordinate with the queen.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Knight Placement'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to d2, creating a queen-knight battery! The queen supports the knight on d5, and together they create powerful threats. This is a dangerous combination!',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2', 'd5'],
        conceptTag: 'Queen-Knight Battery'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker. White\'s pieces are coordinating beautifully—the queen, knight, and bishop all work together.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s queen-knight battery is too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, joining the attack! Combined with the knight on d5, White has a powerful attack on the kingside. The queen-knight battery is creating devastating threats.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Queen Attack'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Nf6+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight checks on f6! The queen-knight battery has created a winning tactical opportunity. The knight fork is devastating!',
        arrows: [
          { from: 'd5', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g8', color: 'yellow' },
          { from: 'f6', to: 'h7', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Knight Fork'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Qxh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen captures on h7, using the knight\'s support. The queen-knight battery has created a winning attack.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Winning Attack'
      },
      {
        move: 'Kg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has mate.',
        arrows: [{ from: 'h8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Qh8#',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Checkmate! The queen-knight battery has created a perfect mating attack. The queen and knight worked together perfectly to deliver checkmate. This demonstrates the power of queen-knight coordination.',
        arrows: [{ from: 'h7', to: 'h8', color: 'green' }],
        highlights: ['h8'],
        conceptTag: 'Checkmate'
      }
    ],
    
    summary: 'We placed the knight on d5 and the queen on d2, creating a queen-knight battery. The battery coordinated perfectly to create a winning attack (Qh6, Nf6+, Qxh7+, Qh8#). The queen-knight combination is one of the most dangerous in chess.',
    
    keyTakeaways: [
      'Queen and knight complement each other perfectly',
      'The queen provides long-range power',
      'The knight adds tactical threats and forks',
      'Place the knight on a strong square near the queen',
      'Queen-knight batteries often lead to mating attacks'
    ],
    
    memoryTip: 'Think of the queen-knight battery as "a sniper and a ninja"—long-range power plus tactical threats!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Piece Coordination Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'coordination-bishop-knight-battery-deep',
    category: 'PIECE_COORDINATION',
    title: 'Bishop and Knight Battery',
    subtitle: 'The powerful bishop-knight combination',
    // Position where bishop-knight battery is powerful
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A bishop and knight working together create one of the most versatile combinations in chess! The bishop provides long-range power while the knight adds tactical threats. Together, they can control both color complexes and create devastating attacks. This pattern shows how to coordinate a bishop and knight battery.',
    
    keyIdeas: [
      'Bishop and knight complement each other perfectly',
      'The bishop provides long-range power',
      'The knight adds tactical threats and forks',
      'Place the knight on a strong square near the bishop',
      'Bishop-knight batteries often lead to material gains or attacks'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to d5, a powerful central square! From d5, it prepares to coordinate with the bishop.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Knight Placement'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to f4, creating a bishop-knight battery! The bishop supports the knight on d5, and together they create powerful threats. This is a dangerous combination!',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' },
          { from: 'f4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['f4', 'd5'],
        conceptTag: 'Bishop-Knight Battery'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s battery is too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, adding another attacker. White\'s pieces are coordinating beautifully—the bishop, knight, and queen all work together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nf6+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight checks on f6! The bishop-knight battery has created a winning tactical opportunity. The knight fork is devastating!',
        arrows: [
          { from: 'd5', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g8', color: 'yellow' },
          { from: 'f6', to: 'h7', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Knight Fork'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures on d6! The bishop-knight battery has created a winning opportunity. White has won material.',
        arrows: [{ from: 'f4', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The bishop-knight battery has been a complete success.',
        arrows: [{ from: 'd2', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook captures! White has won material and has a completely winning position. The bishop-knight battery has created irresistible pressure that led to material gains.',
        arrows: [{ from: 'd1', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We placed the knight on d5 and the bishop on f4, creating a bishop-knight battery. The battery coordinated perfectly to create winning tactics (Nf6+, Bxd6) that led to material gains. The bishop-knight combination is one of the most versatile in chess.',
    
    keyTakeaways: [
      'Bishop and knight complement each other perfectly',
      'The bishop provides long-range power',
      'The knight adds tactical threats and forks',
      'Place the knight on a strong square near the bishop',
      'Bishop-knight batteries often lead to material gains or attacks'
    ],
    
    memoryTip: 'Think of the bishop-knight battery as "a sniper and a ninja"—long-range power plus tactical threats!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Piece Coordination Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
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
        explanation: 'Castling queenside and connecting the rooks. White has a beautiful position with pressure on the dark squares.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
        conceptTag: 'King Safety'
      },
      {
        move: 'Qf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to exchange queens to relieve the pressure.',
        arrows: [{ from: 'd8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qg5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen retreats to g5, staying active and avoiding the trade. White wants to keep the queens on to exploit the dark square weaknesses.',
        arrows: [{ from: 'h6', to: 'g5', color: 'green' }],
        highlights: ['g5'],
        conceptTag: 'Avoiding Bad Trades'
      },
      {
        move: 'Qf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries again to exchange.',
        arrows: [{ from: 'f8', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen returns to h6! White keeps the pressure on. Trading queens would ease Black\'s defensive burden, so we avoid it.',
        arrows: [{ from: 'g5', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Maintaining Pressure'
      },
      {
        move: 'Rf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions.',
        arrows: [{ from: 'f7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing f5 to open more lines! The strategic exchanges earlier (Nxe6 and Bxh6) have given White a dominating position. This is the reward of good exchange strategy—trade the right pieces and you end up with a superior position.',
        arrows: [{ from: 'f3', to: 'f4', color: 'green' }, { from: 'f4', to: 'f5', color: 'yellow' }],
        highlights: ['f4'],
        conceptTag: 'Opening Lines'
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
  // EXCHANGE STRATEGY - CHAPTER 2: SIMPLIFYING WHEN AHEAD
  // ============================================
  {
    id: 'exchange-simplify-ahead-deep',
    category: 'EXCHANGE_STRATEGY',
    title: 'Simplifying When Ahead',
    subtitle: 'Trading down to a winning endgame',
    // Position where White is ahead and should simplify
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'When you have an advantage, simplify! Trade pieces to reduce your opponent\'s counterplay and convert your advantage into a winning endgame. The fewer pieces on the board, the harder it is for the opponent to create complications. This pattern shows how to simplify correctly when ahead.',
    
    keyIdeas: [
      'When ahead, trade pieces to reduce counterplay',
      'Trade queens when you have a material or positional advantage',
      'Simplify to endgames where your advantage is clearer',
      'Fewer pieces make it harder for the opponent to create complications',
      'Trade active pieces to prevent counterattacks'
    ],
    
    mainLine: [
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading knights! White has a slight advantage, so simplifying is correct. Fewer pieces reduce Black\'s counterplay.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        conceptTag: 'Simplifying'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures. The position is simplified, and White\'s advantage remains.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading the bishop for the knight! White continues simplifying. The position is becoming clearer.',
        arrows: [{ from: 'e3', to: 'd5', color: 'green' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures. White\'s advantage persists.',
        arrows: [{ from: 'e7', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading the queen! This is the key simplification—when ahead, trade queens to eliminate counterplay. The endgame will be much easier to win.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        conceptTag: 'Trading Queens'
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture. The position is now simplified to an endgame where White\'s advantage is clearer.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, targeting the queen. White continues to simplify.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Qxd1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades queens, further simplifying. This is exactly what White wants!',
        arrows: [{ from: 'd5', to: 'd1', color: 'blue' }]
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White has successfully simplified to an endgame. The advantage is now much easier to convert.',
        arrows: [{ from: 'a1', to: 'd1', color: 'green' }],
        highlights: ['d1'],
        conceptTag: 'Endgame Reached'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black doubles rooks, but White has a winning endgame.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading rooks! White continues simplifying. The fewer pieces, the easier to convert.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures. The position is now very simplified.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading the last rooks! White has simplified to a pure endgame. The advantage is now easy to convert—fewer pieces mean less counterplay.',
        arrows: [{ from: 'f1', to: 'd8', color: 'green' }],
        highlights: ['d8'],
        conceptTag: 'Complete Simplification'
      },
      {
        move: 'Bxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures. White has a winning endgame with the bishop pair.',
        arrows: [{ from: 'c8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops! White has successfully simplified to a winning endgame. The bishop pair and space advantage are decisive. This demonstrates the power of simplifying when ahead—trade pieces to reduce counterplay and convert your advantage.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Winning Endgame'
      }
    ],
    
    summary: 'We systematically simplified by trading knights, bishops, queens, and rooks. Each trade reduced Black\'s counterplay and made White\'s advantage clearer. The final endgame with the bishop pair is easily winning. This shows the power of simplifying when ahead—fewer pieces mean less counterplay.',
    
    keyTakeaways: [
      'When ahead, trade pieces to reduce counterplay',
      'Trade queens when you have an advantage—endgames are easier to win',
      'Simplify to positions where your advantage is clearer',
      'Fewer pieces make it harder for the opponent to create complications',
      'Trade active pieces to prevent counterattacks'
    ],
    
    memoryTip: 'Think of simplifying as "clearing the board"—fewer pieces mean fewer complications!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Conversion Technique',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'exchange-create-weaknesses-deep',
    category: 'EXCHANGE_STRATEGY',
    title: 'Exchanging to Create Weaknesses',
    subtitle: 'Trading pieces to expose weaknesses',
    // Position where exchanging creates weaknesses
    fen: 'r1bq1rk1/pp2bppp/2np1np1/2N5/3PP3/2N2P2/PP4PP/R1BQKB1R w KQ - 0 9',
    toMove: 'white',
    
    introduction: 'Sometimes the best exchange is one that creates lasting weaknesses in your opponent\'s position. By trading pieces strategically, you can expose weak squares, create bad pawns, or remove key defenders. The weaknesses created by exchanges often last longer than temporary piece activity. This pattern shows how to use exchanges to create permanent weaknesses.',
    
    keyIdeas: [
      'Exchanges can create lasting weaknesses in the opponent\'s position',
      'Trade pieces to expose weak squares or create bad pawns',
      'Remove defenders to create weaknesses around the king',
      'Structural weaknesses last longer than temporary piece activity',
      'Evaluate what weaknesses remain after the exchange'
    ],
    
    mainLine: [
      {
        move: 'Nxe6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading the knight! This exchange will create doubled pawns in Black\'s position. The e6 square will be weak, and Black\'s pawn structure will be damaged.',
        arrows: [
          { from: 'c5', to: 'e6', color: 'green' },
          { from: 'e6', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'Creating Weaknesses'
      },
      {
        move: 'fxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture with the f-pawn. Now Black has doubled e-pawns—a permanent weakness! The e6 pawn is weak and cannot be defended by another pawn.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }],
        highlights: ['e6', 'e7']
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the bishop and preparing to attack the weak e6 pawn. The exchange has created a target that White can attack.',
        arrows: [
          { from: 'c1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'e6', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Targeting Weakness'
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions the knight, but the weak e6 pawn remains.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading the dark-squared bishops! This exchange will remove Black\'s key defender (the fianchettoed bishop) and create dark square weaknesses around Black\'s king.',
        arrows: [
          { from: 'e3', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Removing Defender'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must trade. The fianchettoed bishop was a key defender of the dark squares around the king. Now those squares are weak!',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }],
        highlights: ['g7', 'h6', 'f8']
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! Now White has a powerful queen on h6, eyeing the weakened dark squares around Black\'s king. The exchange has created lasting weaknesses.',
        arrows: [
          { from: 'd1', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' },
          { from: 'h6', to: 'f8', color: 'yellow' }
        ],
        highlights: ['h6', 'g7', 'f8'],
        conceptTag: 'Exploiting Weaknesses'
      },
      {
        move: 'Rf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the rook, but White has more threats.',
        arrows: [{ from: 'f8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'O-O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling queenside and connecting the rooks. White\'s position is harmonious, and the weaknesses created by the exchanges are becoming more apparent.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
        highlights: ['c1'],
        conceptTag: 'King Safety'
      },
      {
        move: 'Qf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to exchange queens to relieve the pressure, but White can avoid the trade.',
        arrows: [{ from: 'd8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qg5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen retreats to g5, staying active and avoiding the trade. White wants to keep the queens on to exploit the dark square weaknesses created by the exchange.',
        arrows: [
          { from: 'h6', to: 'g5', color: 'green' },
          { from: 'g5', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Maintaining Pressure'
      },
      {
        move: 'Qf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries again to exchange, but White has better options.',
        arrows: [{ from: 'f8', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen returns to h6! White keeps the pressure on the weakened dark squares. The exchange has created permanent weaknesses that White can exploit.',
        arrows: [
          { from: 'g5', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Persistent Pressure'
      },
      {
        move: 'Rf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions, but the weaknesses remain.',
        arrows: [{ from: 'f7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing f5 to open more lines! The strategic exchanges (Nxe6 and Bxh6) have created lasting weaknesses—doubled pawns and dark square weaknesses. White can now attack on multiple fronts.',
        arrows: [
          { from: 'f3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'e5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to block, but White has more threats.',
        arrows: [{ from: 'e6', to: 'e5', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Opening the f-file! The exchanges have created weaknesses that White can now exploit. The f-file is open, the dark squares are weak, and White has a winning attack. This demonstrates the power of exchanging to create weaknesses—the structural damage lasts forever.',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'Two key exchanges created lasting weaknesses: Nxe6 created doubled pawns, and Bxh6 removed a key defender and created dark square weaknesses. These weaknesses lasted throughout the game and gave White a winning position. This shows the power of exchanging to create permanent weaknesses.',
    
    keyTakeaways: [
      'Exchanges can create lasting weaknesses in the opponent\'s position',
      'Trade pieces to expose weak squares or create bad pawns',
      'Remove defenders to create weaknesses around the king',
      'Structural weaknesses last longer than temporary piece activity',
      'Evaluate what weaknesses remain after the exchange'
    ],
    
    memoryTip: 'Think of exchanges as "sculpting"—each trade shapes the position and creates lasting weaknesses!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Strategic Exchange Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1985
    }
  },

  {
    id: 'exchange-avoiding-bad-trade-deep',
    category: 'EXCHANGE_STRATEGY',
    title: 'Avoiding Bad Exchanges',
    subtitle: 'Knowing when NOT to trade',
    // Position where avoiding a bad exchange is key
    fen: 'r1bq1rk1/pp2bppp/2np1np1/2N5/3PP3/2N2P2/PP4PP/R1BQKB1R w KQ - 0 9',
    toMove: 'white',
    
    introduction: 'Exchange strategy isn\'t just about trading—it\'s also about knowing when NOT to trade! Sometimes avoiding an exchange is the best move. If your piece is more active than your opponent\'s, or if trading would help your opponent, avoid the trade. This pattern shows how to recognize and avoid bad exchanges.',
    
    keyIdeas: [
      'Avoid trading when your piece is more active',
      'Don\'t trade if it helps your opponent',
      'Keep active pieces on the board',
      'Trading can sometimes equalize the position',
      'Evaluate the position after the trade before committing'
    ],
    
    mainLine: [
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks. White avoids trading the active knight on c5, which is more valuable than Black\'s passive pieces.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'c5', to: 'c5', color: 'yellow' }
        ],
        highlights: ['d2', 'c5'],
        conceptTag: 'Avoiding Bad Trade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues avoiding trades.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, maintaining piece activity. White avoids trading the active pieces, keeping the initiative.',
        arrows: [
          { from: 'c1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'c5', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Maintaining Activity'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more active pieces.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'O-O-O',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Castling queenside! White avoids trading active pieces and maintains the initiative. The active pieces are worth more than material.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
        highlights: ['c1'],
        conceptTag: 'Maintaining Initiative'
      },
      {
        move: 'Bxc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to force a trade, but White has a better response.',
        arrows: [{ from: 'd7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'Bxc5',
        isMainLine: true,
        annotation: '!',
        explanation: 'White recaptures, but now the bishop is active on c5. The trade was acceptable because White maintained piece activity.',
        arrows: [{ from: 'e3', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Acceptable Trade'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, joining the attack! White avoided bad trades and maintained active pieces, which now create a winning attack.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Active Pieces Attack'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures on g7, breaking through! White\'s active pieces have created a winning attack. Avoiding bad trades has paid off.',
        arrows: [{ from: 'c5', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Breakthrough'
      },
      {
        move: 'Kxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but the king is now exposed.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qxh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen captures on h7, using the active pieces. White has a completely winning attack.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Winning Attack'
      },
      {
        move: 'Kg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has mate.',
        arrows: [{ from: 'g7', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Qh8#',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Checkmate! Avoiding bad trades and maintaining active pieces has created a winning attack. This demonstrates the power of knowing when NOT to trade.',
        arrows: [{ from: 'h7', to: 'h8', color: 'green' }],
        highlights: ['h8'],
        conceptTag: 'Checkmate'
      }
    ],
    
    summary: 'We avoided bad trades and maintained active pieces (Qd2, Be3, O-O-O). The active pieces created a winning attack (Qh6, Bxg7, Qxh7+, Qh8#). Avoiding bad exchanges is just as important as making good ones.',
    
    keyTakeaways: [
      'Avoid trading when your piece is more active',
      'Don\'t trade if it helps your opponent',
      'Keep active pieces on the board',
      'Trading can sometimes equalize the position',
      'Evaluate the position after the trade before committing'
    ],
    
    memoryTip: 'Think of avoiding bad trades as "keeping your best players on the field"—don\'t trade away your active pieces!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Exchange Strategy Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  {
    id: 'exchange-strategy-winning-endgame-deep',
    category: 'EXCHANGE_STRATEGY',
    title: 'Exchanging to a Winning Endgame',
    subtitle: 'Trading down to convert advantages',
    // Position where exchanging leads to winning endgame
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'When you have an advantage, exchanging pieces can simplify the position and make your advantage clearer. By trading down to an endgame, you can convert material or positional advantages into wins. This pattern shows how to exchange correctly to reach a winning endgame.',
    
    keyIdeas: [
      'Exchange pieces when you have an advantage',
      'Trading down simplifies the position',
      'Endgames make advantages clearer',
      'Trade active pieces to prevent counterplay',
      'Convert advantages into winning endgames'
    ],
    
    mainLine: [
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading knights! White has a slight advantage, so simplifying is correct. Fewer pieces reduce Black\'s counterplay.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        conceptTag: 'Simplifying'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and now the position is simpler.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading bishops! White continues simplifying. The position is becoming clearer.',
        arrows: [{ from: 'e3', to: 'd5', color: 'green' }],
        conceptTag: 'More Simplification'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and the position is even simpler.',
        arrows: [{ from: 'e7', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading queens! White has an advantage, so trading queens simplifies to an endgame where the advantage is clearer. This is the key exchange.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Trading Queens'
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and now we\'re in an endgame.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading rooks! White continues simplifying. The endgame is becoming clearer, and White\'s advantage is more obvious.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Trading Rooks'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and we\'re in a simplified endgame.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The final trade! White has simplified to an endgame where the advantage is clear. The exchanges have been a complete success.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Endgame'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and White has a winning endgame.',
        arrows: [{ from: 'f8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! White has won material and has a completely winning endgame. The exchanges have simplified the position and made White\'s advantage decisive.',
        arrows: [{ from: 'e2', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Kf1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves forward, preparing to support the pawns. White has won material and has a completely winning endgame. The exchanges have been a complete success.',
        arrows: [
          { from: 'g1', to: 'f1', color: 'green' },
          { from: 'f1', to: 'e2', color: 'yellow' }
        ],
        highlights: ['f1'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We systematically simplified by trading knights, bishops, queens, and rooks. Each trade reduced Black\'s counterplay and made White\'s advantage clearer. The final endgame with material advantage is easily winning. This shows the power of exchanging to convert advantages.',
    
    keyTakeaways: [
      'Exchange pieces when you have an advantage',
      'Trading down simplifies the position',
      'Endgames make advantages clearer',
      'Trade active pieces to prevent counterplay',
      'Convert advantages into winning endgames'
    ],
    
    memoryTip: 'Think of exchanging to an endgame as "clearing the board to show your advantage"—simpler positions make advantages clearer!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Conversion Technique',
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
      },
      {
        move: 'Kg8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king moves back, but the damage is done.',
        arrows: [{ from: 'h8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Nxd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the queen! White has won decisive material thanks to the eternal knight on f5. The knight that started the attack has now won the queen.',
        arrows: [{ from: 'f7', to: 'd8', color: 'green' }],
        highlights: ['d8'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White is up a queen for a knight.',
        arrows: [{ from: 'e8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the rook to the open file! White is completely winning—material advantage plus active pieces. This is the reward for establishing the eternal knight.',
        arrows: [{ from: 'a1', to: 'd1', color: 'green' }],
        highlights: ['d1'],
        conceptTag: 'Converting the Advantage'
      },
      {
        move: 'Rxa8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black grabs a rook, but White\'s advantage is overwhelming.',
        arrows: [{ from: 'd8', to: 'a8', color: 'blue' }]
      },
      {
        move: 'Qf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen takes control! White threatens Qf7+ and has complete dominance. The eternal knight created the conditions for this crushing victory.',
        arrows: [{ from: 'g4', to: 'f5', color: 'green' }, { from: 'f5', to: 'f7', color: 'yellow' }],
        highlights: ['f5'],
        conceptTag: 'Total Control'
      }
    ],
    
    summary: 'The knight on f5 was an "eternal" piece—immune to pawn attacks and dominating the position. From there, it delivered a decisive tactical blow that won the queen. This is the power of a well-placed knight on an outpost.',
    
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
  // KNIGHT PLACEMENT - CHAPTER 2: THE OCTOPUS KNIGHT
  // ============================================
  {
    id: 'knight-octopus-e6-deep',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Octopus Knight on e6',
    subtitle: 'A knight deep in enemy territory',
    // Position where White can establish knight on e6
    fen: 'r1bq1rk1/pp2bppp/2nppn2/4N3/2B1P3/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    
    introduction: 'A knight on e6 (or e3 for Black) is called an "octopus"—it has tentacles everywhere! It attacks multiple squares and is very hard to remove. The octopus knight is one of the most powerful knight placements in chess. This pattern shows how to establish and exploit an octopus knight.',
    
    keyIdeas: [
      'An octopus knight is deep in enemy territory (e6 for White, e3 for Black)',
      'It attacks 8 squares simultaneously—like an octopus with 8 tentacles',
      'It\'s hard to remove—often requires multiple pieces to challenge it',
      'Use it to create multiple threats and dominate the position',
      'Support it with pawns and pieces to make it permanent'
    ],
    
    mainLine: [
      {
        move: 'Nxe6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OCTOPUS! The knight captures on e6, establishing itself deep in Black\'s territory. From e6, it attacks c7, d8, f8, g7, g5, f4, d4, and c5—8 squares at once! This is the octopus knight.',
        arrows: [
          { from: 'e5', to: 'e6', color: 'green' },
          { from: 'e6', to: 'c7', color: 'yellow' },
          { from: 'e6', to: 'd8', color: 'yellow' },
          { from: 'e6', to: 'f8', color: 'yellow' },
          { from: 'e6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'The Octopus'
      },
      {
        move: 'Bxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but now the e6 square is available for White\'s other knight!',
        arrows: [{ from: 'e7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting the e5 square! This pawn advance prepares to establish another knight on e5, or supports a future e5 advance. White is building pressure.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Pawn Support'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the queen, but White continues the plan.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5! Now White has a powerful central knight that controls many squares. Combined with the threat of Ne6, Black\'s position is under severe pressure.',
        arrows: [
          { from: 'c3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'c6', color: 'yellow' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Central Knight'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the knight, but White has a strong response.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Nxd6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading the knight for the bishop! This opens the e-file and gives White a strong central pawn on e5. The octopus knight has done its job.',
        arrows: [{ from: 'e5', to: 'd6', color: 'green' }],
        conceptTag: 'Favorable Trade'
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now the e-file is open and White has a strong central pawn.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }],
        highlights: ['e5']
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn advances! This opens more lines and creates threats. White\'s position is becoming overwhelming.',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Pawn Break'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but this opens the e-file completely.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the e-file! Now White\'s rooks can invade. The octopus knight has transformed the position.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }],
        highlights: ['f5', 'e1']
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to contest the file, but White has more pieces.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook enters the game! White controls the e-file and has a strong central pawn. The octopus knight has created lasting advantages.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e8', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Rxe1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades to relieve pressure, but White recaptures with advantage.',
        arrows: [{ from: 'e8', to: 'e1', color: 'blue' }]
      },
      {
        move: 'Rxe1',
        isMainLine: true,
        annotation: '!',
        explanation: 'White has complete control! The octopus knight on e6 (now traded) created the conditions for this dominant position. This is the power of deep knight placement—it transforms the entire game.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
        highlights: ['e1', 'f5'],
        conceptTag: 'Total Control'
      }
    ],
    
    summary: 'The octopus knight on e6 attacked 8 squares simultaneously, creating multiple threats that Black couldn\'t handle. Even after it was traded, the resulting position favored White with open files and a strong central pawn. The octopus knight is one of the most powerful knight placements in chess.',
    
    keyTakeaways: [
      'An octopus knight attacks 8 squares at once—like an octopus with 8 tentacles',
      'It\'s deep in enemy territory and very hard to remove',
      'Use it to create multiple threats simultaneously',
      'Support it with pawns and pieces to make it permanent',
      'Even when traded, it often leaves a favorable position'
    ],
    
    memoryTip: 'Think of the octopus knight as a "spider in the center of a web"—it controls everything around it!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'Advanced Knight Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  // ============================================
  // KNIGHT PLACEMENT - CHAPTER 3: THE KNIGHT MANEUVER
  // ============================================
  {
    id: 'knight-maneuver-nd2-f1-e3-deep',
    category: 'KNIGHT_PLACEMENT',
    title: 'The Knight Maneuver',
    subtitle: 'Nd2-f1-e3 to reach the ideal square',
    // Position where knight maneuver is needed
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Sometimes the knight needs to take a roundabout route to reach its ideal square. The maneuver Nd2-f1-e3 (or similar) is a classic technique to reposition the knight without losing time. This pattern shows how to execute knight maneuvers effectively.',
    
    keyIdeas: [
      'Knights can maneuver to better squares via roundabout routes',
      'Nd2-f1-e3 is a common maneuver to reach e3',
      'Knight maneuvers don\'t lose time if they improve the position',
      'Plan the knight\'s route to its ideal square',
      'Support the maneuver with other pieces'
    ],
    
    mainLine: [
      {
        move: 'Nd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight begins its maneuver! From d2, it prepares to move to f1 and then e3. This roundabout route will bring the knight to its ideal square.',
        arrows: [
          { from: 'c3', to: 'd2', color: 'green' },
          { from: 'd2', to: 'f1', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Beginning the Maneuver'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the maneuver.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nf1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight moves to f1, a transit square. From f1, it can jump to e3, reaching the ideal square. The maneuver is progressing.',
        arrows: [
          { from: 'd2', to: 'f1', color: 'green' },
          { from: 'f1', to: 'e3', color: 'yellow' }
        ],
        highlights: ['f1'],
        conceptTag: 'Transit Square'
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Ne3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE IDEAL SQUARE! The knight lands on e3, its perfect destination. From e3, it controls d5, f5, c4, and g4—dominating the position. The maneuver has been a complete success!',
        arrows: [
          { from: 'f1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd5', color: 'yellow' },
          { from: 'e3', to: 'f5', color: 'yellow' },
          { from: 'e3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Ideal Square Reached'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to improve, but White\'s knight is perfectly placed.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating with the well-placed knight. White\'s pieces are harmoniously arranged.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White continues building pressure.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the knight and adding pressure. White\'s position is becoming overwhelming.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the file, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d5! From the ideal e3 square, the knight can now occupy d5, a powerful outpost. The maneuver has allowed the knight to reach its full potential.',
        arrows: [
          { from: 'e3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Outpost Achieved'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black feels compelled to trade, but White recaptures with advantage.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the e-pawn! White has a powerful central pawn and a completely winning position. The knight maneuver has transformed the position completely.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge, but White has too many advantages.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops! White has a completely winning position thanks to the knight maneuver. The roundabout route (Nd2-f1-e3-d5) has been a complete success.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We executed the knight maneuver Nd2-f1-e3, bringing the knight to its ideal square. From e3, it could jump to d5, creating a powerful outpost. Even after it was traded, White gained a strong central pawn. This shows the power of knight maneuvers—sometimes the roundabout route is the best route.',
    
    keyTakeaways: [
      'Knights can maneuver to better squares via roundabout routes',
      'Nd2-f1-e3 is a common maneuver to reach e3',
      'Knight maneuvers don\'t lose time if they improve the position',
      'Plan the knight\'s route to its ideal square',
      'A well-placed knight is worth the maneuver'
    ],
    
    memoryTip: 'Think of knight maneuvers as "taking the scenic route"—sometimes the longer path leads to a better destination!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Knight Maneuver Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'knight-coordination-pair-deep',
    category: 'KNIGHT_PLACEMENT',
    title: 'Knight Coordination',
    subtitle: 'Two knights working together',
    // Position where knight coordination is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'When you have two knights, they can work together to create powerful threats. Two knights on adjacent squares can control many squares and create tactical opportunities. This pattern shows how to coordinate two knights effectively.',
    
    keyIdeas: [
      'Two knights can control many squares together',
      'Place knights on adjacent squares for maximum coverage',
      'Knights can create forks and tactical threats together',
      'Coordinate knights to attack weak squares',
      'Two knights are often stronger than one knight and one bishop'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to d5, a powerful central square! From d5, it controls many squares and prepares to coordinate with the other knight.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'First Knight'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The second knight jumps to e5! Now both knights are on powerful central squares (d5 and e5), controlling many squares together. The knight coordination is perfect!',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'd5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['e5', 'd5'],
        conceptTag: 'Knight Coordination'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s knights are too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Nxc7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight on d5 captures on c7! The coordinated knights have created a winning tactical opportunity. The knight coordination has paid off!',
        arrows: [{ from: 'd5', to: 'c7', color: 'green' }],
        highlights: ['c7'],
        conceptTag: 'Tactical Opportunity'
      },
      {
        move: 'Qxc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but White has won material.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Nxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight on e5 captures on d7! The coordinated knights have won material. The knight coordination has been a complete success!',
        arrows: [{ from: 'e5', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c7', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! White has won material and has a completely winning position. The knight coordination has transformed the position completely.',
        arrows: [{ from: 'e2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the position. White has a winning advantage.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The knight coordination has been a complete success—two knights working together created winning tactical opportunities.',
        arrows: [{ from: 'd2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We placed both knights on powerful central squares (Nd5, Ne5), creating perfect coordination. The coordinated knights created tactical opportunities (Nxc7, Nxd7) that led to material gains. Knight coordination is a powerful technique when two knights work together.',
    
    keyTakeaways: [
      'Two knights can control many squares together',
      'Place knights on adjacent squares for maximum coverage',
      'Knights can create forks and tactical threats together',
      'Coordinate knights to attack weak squares',
      'Two knights are often stronger than one knight and one bishop'
    ],
    
    memoryTip: 'Think of two knights as "two dancers"—when they coordinate, they create beautiful tactical patterns!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Knight Coordination Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  {
    id: 'knight-centralization-deep',
    category: 'KNIGHT_PLACEMENT',
    title: 'Centralizing the Knight',
    subtitle: 'The power of a centralized knight',
    // Position where knight centralization is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A centralized knight is one of the most powerful pieces in chess! A knight in the center controls more squares, can quickly reach both flanks, and often becomes the key to the position. This pattern shows how to centralize a knight and use it as a dominant force.',
    
    keyIdeas: [
      'Centralized knights control more squares',
      'A knight in the center can reach both flanks quickly',
      'Centralized knights often become the key to the position',
      'Place knights on central squares (d4, d5, e4, e5)',
      'Centralized knights coordinate with other pieces perfectly'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE CENTRALIZATION! The knight jumps to d5, a perfect central square! From d5, it controls many squares (b6, c7, e7, f6, f4, b4) and can quickly reach both flanks. This is the ideal knight placement.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' },
          { from: 'd5', to: 'b6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'The Centralization'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized knight is already powerful.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the centralized knight and adding pressure. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Support'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s centralized knight maintains pressure.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating with the centralized knight. White\'s pieces are all working together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the centralized knight and adding pressure. White has complete control of the center.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles rooks, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nf6+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight checks on f6! The centralized knight has created a winning tactical opportunity. The knight fork is devastating!',
        arrows: [
          { from: 'd5', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g8', color: 'yellow' },
          { from: 'f6', to: 'h7', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Knight Fork'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Nxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight captures on d7! The centralized knight has won material. The centralization has paid off—the knight was perfectly placed to create winning tactics.',
        arrows: [{ from: 'f6', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The centralized knight has transformed the position completely.',
        arrows: [{ from: 'd2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook captures! White has won material and has a completely winning position. The centralized knight has been a complete success—it controlled the center, created tactics, and won material.',
        arrows: [{ from: 'd1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We centralized the knight on d5, which controlled many squares and coordinated with other pieces. The centralized knight created winning tactics (Nf6+, Nxd7) that led to material gains. The centralized knight was the key to the position.',
    
    keyTakeaways: [
      'Centralized knights control more squares',
      'A knight in the center can reach both flanks quickly',
      'Centralized knights often become the key to the position',
      'Place knights on central squares (d4, d5, e4, e5)',
      'Centralized knights coordinate with other pieces perfectly'
    ],
    
    memoryTip: 'Think of a centralized knight as "a spider in the center of its web"—it controls everything and can strike in any direction!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Knight Strategy Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
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
    
    introduction: 'The Isolated Queen Pawn (IQP) is not just a weakness—it\'s a dynamic weapon! While the isolated pawn can be a liability in the endgame, in the middlegame it provides space, open lines, and strong squares for pieces. The d4 and e5 squares become launching pads for attacks. We\'ll learn to use the IQP aggressively before the position simplifies.',
    
    keyIdeas: [
      'The IQP gives space and open lines—use them before trading pieces',
      'd5 and e5 are strong squares for knights and bishops',
      'Attack before the position simplifies—the IQP is stronger with more pieces on the board',
      'The bishop pair often accompanies the IQP and creates powerful attacking chances',
      'Time is crucial—strike while the position is dynamic, not in the endgame'
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
    
    introduction: 'In many Sicilian structures, the e5 square becomes an ideal outpost for White\'s knight. Once established, a knight on e5 cannot be driven away by pawns and controls critical central squares, often becoming the focal point of White\'s entire strategy.',
    
    keyIdeas: [
      'The e5 square is immune to pawn attacks in this structure',
      'A knight on e5 controls 8 squares, including the critical f7 and d7 squares',
      'Even if traded, recapturing with the d-pawn creates a powerful central pawn',
      'The e5 outpost often leads to space advantage and attacking chances'
    ],
    
    mainLine: [
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling first to secure the king before launching the attack. Safety first!',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        conceptTag: 'King Safety'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles as well, completing development. Now both sides are ready for the middlegame battle.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight jumps to the dream square! On e5, it controls critical squares including f7, d7, c6, g6, f3, d3, c4, and g4. Most importantly, Black cannot challenge this knight with any pawn—it\'s a permanent feature of the position.',
        highlights: ['e5'], 
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' }, 
          { from: 'e5', to: 'f7', color: 'yellow' }, 
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'c6', color: 'yellow' }
        ],
        conceptTag: 'Outpost Occupation',
        alternativeMoves: [
          {
            move: 'Bd3',
            evaluation: 'good',
            explanation: 'Developing the bishop is solid, but Ne5 is more ambitious and seizes the initiative immediately.'
          }
        ]
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black feels compelled to trade off this powerful knight. While this removes the immediate threat, it comes at a cost—White will recapture toward the center, creating a strong central pawn.',
        arrows: [{ from: 'c6', to: 'e5', color: 'blue' }],
        conceptTag: 'Defensive Trade'
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing toward the center! The e5-pawn now becomes a powerful wedge that restricts Black\'s pieces, especially the f6-knight which has limited mobility. This pawn also controls d6, another potential outpost square.',
        highlights: ['e5', 'd6'], 
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }],
        conceptTag: 'Central Pawn Wedge'
      },
      { 
        move: 'd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black advances the d-pawn, trying to create counterplay in the center. But White has a powerful response.',
        arrows: [{ from: 'd5', to: 'd4', color: 'blue' }]
      },
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Advancing the c-pawn! This move demonstrates the power of the e5 pawn—White now has a strong central pawn duo on c5 and e5, creating enormous pressure. The c5 pawn also opens lines for the pieces and further restricts Black\'s position. White\'s space advantage is decisive.',
        highlights: ['e5', 'c5'], 
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        conceptTag: 'Pawn Expansion'
      }
    ],
    
    summary: 'We established a powerful knight on e5 that controlled the center and threatened Black\'s position. Even after the trade, recapturing with the d-pawn created a strong central pawn that led to a dominant space advantage.',
    
    keyTakeaways: [
      'e5 is often the strongest central outpost in Sicilian structures—seize it when available',
      'Even if your knight is traded, recapturing toward the center creates long-term advantages',
      'A strong central pawn can become the foundation for a space advantage and attacking chances',
      'Outposts aren\'t just about the piece—they create weak squares that persist even after trades'
    ],
    
    memoryTip: 'Think of e5 as the "commanding height"—once your knight sits there, you control the entire battlefield!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Sicilian Defense Strategy'
  },

  {
    id: 'outpost-c5-queenside',
    category: 'OUTPOSTS',
    title: 'The c5 Outpost',
    subtitle: 'Queenside outpost domination',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'While central outposts like e5 and d5 are famous, the c5 square can be equally devastating when attacking Black\'s queenside. A knight on c5 attacks the weak b7-pawn and eyes e6, creating constant pressure. This pattern shows how to manufacture and exploit the c5 outpost.',
    
    keyIdeas: [
      'The c5 square attacks b7 and e6 simultaneously—two critical weak points',
      'Queenside outposts are particularly strong when Black has castled kingside',
      'Prepare the outpost by advancing the c-pawn, which opens lines for rooks',
      'Even if the knight is traded, the c5-pawn becomes a powerful wedge'
    ],
    
    mainLine: [
      { 
        move: 'Nb5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight jumps to b5! This square attacks c7 and d6, creating immediate pressure on the queenside. Black must react, which gives White the initiative.',
        highlights: ['b5'], 
        arrows: [
          { from: 'c3', to: 'b5', color: 'green' }, 
          { from: 'b5', to: 'c7', color: 'yellow' }, 
          { from: 'b5', to: 'd6', color: 'yellow' }
        ],
        conceptTag: 'Creating Pressure',
        alternativeMoves: [
          {
            move: 'c5',
            evaluation: 'good',
            explanation: 'Advancing c5 immediately is also possible, but Nb5 first creates more immediate threats and forces Black to react.'
          }
        ]
      },
      { 
        move: 'a6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to challenge the knight, but this weakens b6 and doesn\'t prevent White\'s plan. The a6 pawn can become a target later.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }],
        highlights: ['b6']
      },
      { 
        move: 'Nc3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight returns to c3, but now White can advance the c-pawn with tempo! The Nb5 maneuver has achieved its goal—forcing ...a6, which weakens b6 and prepares the c5 advance.',
        highlights: ['c3'], 
        arrows: [{ from: 'b5', to: 'c3', color: 'green' }],
        conceptTag: 'Preparing the Break'
      },
      { 
        move: 'b6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops the bishop and tries to solidify the queenside, but White\'s attack is already prepared.',
        arrows: [{ from: 'b7', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Advancing the c-pawn! This creates a powerful central pawn on c5 and opens the c-file for the rooks. Most importantly, it creates the c5 outpost for White\'s knight. Black\'s b6 and a6 pawns are now potential targets, and the c5 square cannot be challenged by any pawn.',
        highlights: ['c5'], 
        arrows: [
          { from: 'c4', to: 'c5', color: 'green' },
          { from: 'c5', to: 'b6', color: 'yellow' },
          { from: 'c5', to: 'a6', color: 'yellow' }
        ],
        conceptTag: 'The Outpost Created'
      }
    ],
    
    summary: 'By maneuvering Nb5 and then advancing c5, we created a powerful outpost on c5 that attacks Black\'s weak queenside pawns and opens lines for our pieces. The c5 square cannot be challenged by pawns and becomes a permanent source of pressure.',
    
    keyTakeaways: [
      'Queenside outposts like c5 are particularly effective when targeting weak b-pawns',
      'Prepare outposts with piece maneuvers (like Nb5) to force weaknesses before advancing pawns',
      'Even "rim" squares like c5 can be powerful outposts when they attack multiple weaknesses',
      'The c5 outpost often combines with open files to create devastating attacks'
    ],
    
    memoryTip: 'Think of c5 as the "queenside command post"—once established, it attacks everything on Black\'s flank!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Queenside Attack Strategy'
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
    
    introduction: 'A rook on the 7th rank is one of the most powerful placements in chess. It attacks all the pawns still on their starting squares (a7, b7, c7, f7, g7, h7) and severely restricts the enemy king, often trapping it on the back rank. Two rooks on the 7th rank—famously called "pigs on the seventh"—can often force checkmate or win decisive material.',
    
    keyIdeas: [
      'The 7th rank attacks multiple pawns simultaneously—often 3-4 pawns at once',
      'Two rooks on the 7th rank (doubled rooks) are usually winning—they create unstoppable threats',
      'The enemy king gets trapped on the back rank, unable to escape',
      'Rooks on the 7th rank often lead to back-rank mate threats',
      'Open files are the highways that lead to the 7th rank'
    ],
    
    mainLine: [
      { 
        move: 'Rd1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing to double rooks on the 7th rank! The rook on d1 will join the rook on e7, creating the devastating "pigs on the seventh" formation.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1', 'e7'],
        conceptTag: 'Preparing to Double'
      },
      { 
        move: 'Rfe8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to defend by bringing the other rook to the e-file, but it\'s too late—White\'s rook is already on the 7th rank and causing havoc.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Red7', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'PIGS ON THE SEVENTH! Both rooks now dominate the 7th rank. This is one of the most powerful formations in chess. The rooks attack b7, c7, f7, and g7 simultaneously, while the enemy king is trapped on the back rank. Black\'s position is collapsing!',
        highlights: ['d7', 'e7'], 
        arrows: [
          { from: 'd1', to: 'd7', color: 'green' },
          { from: 'd7', to: 'b7', color: 'red' },
          { from: 'd7', to: 'c7', color: 'red' },
          { from: 'e7', to: 'f7', color: 'red' },
          { from: 'e7', to: 'g7', color: 'red' }
        ],
        conceptTag: 'The Pigs on the Seventh'
      },
      { 
        move: 'Re7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to challenge by placing a rook on e7, but White still controls the 7th rank with the rook on d7. The doubled rooks are too powerful.',
        arrows: [{ from: 'e8', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Rxe7', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'White trades rooks, but still dominates the 7th rank with the remaining rook on d7! The 7th rank is so powerful that even one rook there is often enough to win. Black\'s pawns remain under attack and the king is still trapped.',
        arrows: [{ from: 'e7', to: 'e7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Maintaining Control'
      }
    ],
    
    summary: 'The rook on the 7th rank is devastatingly powerful, attacking multiple pawns and restricting the enemy king. Two rooks on the 7th rank (pigs on the seventh) create unstoppable threats that often lead to checkmate or decisive material gain.',
    
    keyTakeaways: [
      'The 7th rank is the "goal line" for rooks—always aim to reach it',
      'Double rooks on the 7th rank when possible—this is usually winning',
      'A single rook on the 7th rank is often worth a pawn or more',
      'Open files are the highways that lead to the 7th rank—control them first',
      'Rooks on the 7th rank create back-rank mate threats and trap the enemy king'
    ],
    
    memoryTip: 'Remember Tal\'s famous quote: "Rooks on the seventh rank are pigs"—they devour everything in their path!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Classical Rook Theory'
  },

  {
    id: 'open-file-control',
    category: 'OPEN_FILES',
    title: 'Controlling the Open File',
    subtitle: 'Double before invading',
    fen: 'r3r1k1/pp3ppp/2p2n2/8/3P4/2N2N2/PP3PPP/R3R1K1 w - - 0 15',
    toMove: 'white',
    
    introduction: 'Before invading on an open file, you must first gain complete control. An open file is like a highway—both sides want to use it, but only one can dominate it. The key principle: double your rooks on the open file before attempting to invade. This ensures you maintain control even after trades.',
    
    keyIdeas: [
      'Control the file before invading—don\'t rush to the 7th rank prematurely',
      'Double rooks on open files to establish dominance',
      'Contest enemy rooks first—trade if necessary to maintain control',
      'The player who controls the open file usually wins the game',
      'Patience is key—build up control, then strike'
    ],
    
    mainLine: [
      { 
        move: 'Rad1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Seizing the open d-file! The rook moves to d1, preparing to double with the other rook. This is the first step in controlling the file.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'e1', to: 'd1', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Seizing the File'
      },
      { 
        move: 'Rad8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black contests the file by bringing their rook to d8. This is expected—both sides want control of the open file. Now comes the critical moment.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }],
        highlights: ['d8']
      },
      { 
        move: 'Rxe8+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading rooks to maintain control! The check forces Black to recapture, and after the trade, White will still have a rook on d1 controlling the file. This is the correct way to handle file contests—trade when it maintains your control.',
        arrows: [
          { from: 'e1', to: 'e8', color: 'green' },
          { from: 'e8', to: 'e8', color: 'yellow' }
        ],
        conceptTag: 'Maintaining Control'
      },
      { 
        move: 'Rxe8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures, but White still controls the d-file with the remaining rook on d1. The trade was favorable because White maintains file control while reducing Black\'s attacking potential.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Rd3', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'White maintains control of the d-file! The rook on d3 is active and ready to invade to d7 or d8 when the opportunity arises. More importantly, White can now double rooks with Red1, creating complete dominance of the open file.',
        highlights: ['d3'], 
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'a1', to: 'd1', color: 'yellow' }
        ],
        conceptTag: 'File Domination'
      }
    ],
    
    summary: 'Control the open file by doubling rooks and trading when advantageous. The player who controls the open file usually wins the game, so fight for it systematically—seize it, double on it, then invade.',
    
    keyTakeaways: [
      'The player who controls the open file wins it—fight for it from the start',
      'Double before invading—establish complete control before penetrating',
      'Trade rooks when it maintains your file control',
      'Open files are highways to the 7th rank—control them first, then use them',
      'Patience pays off—build up control systematically rather than rushing'
    ],
    
    memoryTip: 'Think of the open file as a highway—you need to control both lanes (double rooks) before you can drive to your destination (the 7th rank)!',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Classical Rook Theory'
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
    
    introduction: 'Space advantage comes from advanced pawns that restrict enemy pieces. More space means more maneuvering room for your pieces and less room for your opponent\'s pieces. When you have a space advantage, your pieces can move freely while your opponent\'s pieces are cramped and bump into each other. This is a powerful positional advantage that can be converted into a winning attack.',
    
    keyIdeas: [
      'Advanced pawns restrict enemy pieces—each advanced pawn takes away squares from the opponent',
      'Space allows piece maneuvers—with more space, you can improve your pieces while the opponent cannot',
      'Use space to prepare attacks—the extra maneuvering room lets you coordinate your pieces for a decisive attack',
      'Maintain the space advantage—don\'t exchange pawns that maintain your space advantage',
      'Cramped positions lead to mistakes—the opponent will eventually make an error when they have no room'
    ],
    
    mainLine: [
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Gaining space! The e5 pawn advances, claiming more territory and restricting Black\'s pieces. Black\'s knight on f6 is now pushed back, and the e5 pawn controls important squares in the center.',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd6', color: 'yellow' },
          { from: 'e5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Pawn Advance'
      },
      { 
        move: 'Nd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Knight retreats. The knight must move back because e5 is now controlled by White\'s pawn. This is the power of space—Black\'s pieces are being pushed back.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing with control. The bishop develops to f4, controlling important squares and supporting the e5 pawn. White continues to improve while Black remains cramped.',
        arrows: [
          { from: 'e2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ]
      },
      { 
        move: 'f6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to challenge the e5 pawn, but this weakens the kingside and creates more targets for White to attack.',
        arrows: [{ from: 'f7', to: 'f6', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing to exploit the space advantage. The queen moves to d2, connecting the rooks and preparing to attack on the kingside. White\'s space advantage allows for coordinated piece play, while Black remains cramped.',
        highlights: ['e5', 'd4'], 
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        conceptTag: 'Exploiting Space'
      }
    ],
    
    summary: 'Space advantage restricts the opponent and gives room for maneuvers. By advancing the e5 pawn, White gains space and restricts Black\'s pieces. This space advantage allows White to improve pieces and prepare attacks while Black remains cramped.',
    
    keyTakeaways: [
      'Advanced pawns create space—each advanced pawn takes away squares from the opponent',
      'Use space to maneuver—with more space, you can improve your pieces while the opponent cannot',
      'Maintain the space advantage—don\'t exchange pawns that maintain your space advantage',
      'Cramped positions lead to mistakes—the opponent will eventually make an error when they have no room',
      'Space advantage can be converted into a winning attack—use the extra maneuvering room to coordinate your pieces'
    ],
    
    memoryTip: 'Think of space as "real estate"—the more space you control, the more room your pieces have to maneuver and attack!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Space Advantage Theory'
  },

  {
    id: 'space-advantage-restrict',
    category: 'SPACE_ADVANTAGE',
    title: 'Restricting the Opponent',
    subtitle: 'Squeeze them slowly',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'When you have a space advantage, slowly squeeze the opponent. Restrict their pieces and expand on both wings. The key is to prevent counterplay first—don\'t rush. With a space advantage, you have time to improve your position slowly while the opponent remains cramped. Eventually, the cramped position will lead to mistakes, and you can convert your space advantage into a winning attack.',
    
    keyIdeas: [
      'Prevent counterplay first—don\'t rush when you have a space advantage, you have time',
      'Expand slowly on both wings—use your space advantage to push pawns on both sides',
      'Keep the opponent cramped—don\'t let them free their position with pawn breaks',
      'Close the center when ahead in space—this prevents counterplay and maintains the advantage',
      'The cramped position will eventually crack—patience is key, the opponent will make mistakes'
    ],
    
    mainLine: [
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Closing the center and gaining more space! The d5 pawn advance closes the center, preventing Black from creating counterplay. This is a key principle—when you have a space advantage, close the center to maintain it.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c6', color: 'yellow' },
          { from: 'd5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Closing the Center'
      },
      { 
        move: 'Ne5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black seeks activity. The knight moves to e5, trying to find a good square, but White\'s space advantage makes it difficult for Black to coordinate.',
        arrows: [{ from: 'f6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Trading. White exchanges the knight, maintaining the space advantage and simplifying the position. This is a good trade—White keeps the space advantage.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'e5', color: 'yellow' }
        ]
      },
      { 
        move: 'Bxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. The position is simplified, but White still maintains the space advantage with the advanced pawns.',
        arrows: [{ from: 'g7', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'f4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Pushing the bishop back and gaining more space! The f4 pawn advance pushes Black\'s bishop back and gains even more space on the kingside. This is the squeeze—White expands on both wings while Black remains cramped.',
        highlights: ['d5', 'e4', 'f4'], 
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e5', color: 'yellow' }
        ],
        conceptTag: 'Expanding on Both Wings'
      }
    ],
    
    summary: 'We slowly squeezed Black with d5 and f4, gaining complete control. By closing the center with d5 and expanding on the kingside with f4, White maintains and increases the space advantage while Black remains cramped. This is the power of space—slowly squeeze the opponent until they crack.',
    
    keyTakeaways: [
      'Use space to squeeze slowly—don\'t rush, you have time when you have a space advantage',
      'Prevent counterplay—close the center and prevent the opponent from freeing their position',
      'Expand on both wings—use your space advantage to push pawns on both sides',
      'Keep the opponent cramped—don\'t let them free their position with pawn breaks',
      'The cramped position will eventually crack—patience is key, the opponent will make mistakes'
    ],
    
    memoryTip: 'Think of space advantage as "squeezing a lemon"—apply pressure slowly and consistently, and eventually the opponent will crack!',
    
    difficulty: 4,
    estimatedMinutes: 9,
    source: 'Space Advantage Theory'
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
    
    introduction: 'Prophylaxis—a term coined by Nimzowitsch—means preventing your opponent\'s plans before they can execute them. Instead of only thinking about what you want to do, always ask "what does my opponent want?" and stop it proactively. This defensive thinking often leads to the best moves.',
    
    keyIdeas: [
      'Think about what opponent wants—put yourself in their shoes',
      'Prevent their best ideas before they can execute them',
      'Improve your position while preventing theirs—killing two birds with one stone',
      'Prophylactic moves often look passive but are actually very strong',
      'Small preventive moves can have huge effects on the game'
    ],
    
    mainLine: [
      { 
        move: 'h3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Prophylaxis! This move prevents ...Bg4, which would pin the knight on f3 and create tactical threats. By playing h3 now, we stop Black\'s plan before it can even start. This is a classic prophylactic move—it looks small, but it\'s very important.',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'c8', to: 'g4', color: 'red' }
        ],
        highlights: ['h3', 'g4'],
        conceptTag: 'Prophylaxis',
        alternativeMoves: [
          {
            move: 'Nd5',
            evaluation: 'dubious',
            explanation: 'Playing Nd5 immediately allows ...Bg4, pinning the knight and creating problems. Prophylaxis first!'
          }
        ]
      },
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black challenges the center, but this doesn\'t change the fact that ...Bg4 is now prevented.',
        arrows: [{ from: 'e7', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Taking the pawn. The position opens up slightly, but our prophylactic h3 move remains valuable.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. The position is now more open, and our knight is ready to jump.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Now the knight goes to d5 without being pinned! This is the reward for prophylaxis—we prevented ...Bg4, so now we can play our active move without worry. The knight on d5 is strong and cannot be challenged by ...Bg4.',
        arrows: [
          { from: 'f3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Active After Prevention'
      }
    ],
    
    summary: 'h3 was prophylactic—it prevented ...Bg4 before it could happen. By thinking about what Black wanted to do and stopping it proactively, we improved our position and enabled our knight to jump to d5 without being pinned. Prophylaxis creates opportunities!',
    
    keyTakeaways: [
      'Always ask what opponent wants—think from their perspective before making your move',
      'Prevent before they execute—stop their plans proactively, not reactively',
      'Prophylactic moves often look small but have huge effects',
      'Improve your position while preventing theirs—the best moves do both',
      'Prevention creates opportunities—by stopping their plan, you enable your own'
    ],
    
    memoryTip: 'Think of prophylaxis as "cutting the wire before the bomb goes off"—prevent the threat before it becomes dangerous!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Nimzowitsch\'s My System'
  },

  {
    id: 'prophylaxis-nimzo',
    category: 'PROPHYLAXIS',
    title: 'Nimzowitsch\'s Prophylaxis',
    subtitle: 'Restraint and control',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Nimzowitsch, the father of modern chess strategy, taught that prophylaxis is essential. Instead of always attacking, sometimes the best move is to prevent your opponent from doing what they want. Control what your opponent wants to do, and you control the game. This pattern demonstrates classic Nimzowitsch prophylaxis—restraining the opponent before they can break free.',
    
    keyIdeas: [
      'Restrain enemy pawn breaks—prevent them from freeing their position',
      'Control key squares prophylactically—occupy them before your opponent can',
      'Limit opponent\'s options—the fewer choices they have, the easier it is to play',
      'Prophylaxis often looks passive but is actually very strong',
      'Build a solid foundation before launching attacks'
    ],
    
    mainLine: [
      { 
        move: 'e3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Solid and prophylactic! This move prevents ...c5-c4, which would give Black counterplay and free their position. By playing e3, we control the c4 square and maintain our space advantage. This is classic Nimzowitsch—restrain before attacking.',
        arrows: [
          { from: 'e2', to: 'e3', color: 'green' },
          { from: 'c5', to: 'c4', color: 'red' }
        ],
        highlights: ['e3', 'c4'],
        conceptTag: 'Prophylactic Restraint',
        alternativeMoves: [
          {
            move: 'e4',
            evaluation: 'dubious',
            explanation: 'Playing e4 immediately allows ...c5-c4, giving Black counterplay. Prophylaxis first!'
          }
        ]
      },
      { 
        move: 'Bd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops the bishop, but our prophylactic e3 move has already prevented their main plan. Black\'s position remains cramped.',
        arrows: [{ from: 'f8', to: 'd6', color: 'blue' }]
      },
      { 
        move: 'Bd3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing the bishop to a natural square. White\'s position is solid and harmonious, with no weaknesses.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }]
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles, completing development. But White\'s prophylactic play has limited Black\'s options.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'White has a harmonious position with no weaknesses! The prophylactic e3 move has prevented Black\'s counterplay, and now White can slowly improve the position. This is the power of prophylaxis—it creates a solid foundation from which to build.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        highlights: ['e3', 'd3', 'c4'],
        conceptTag: 'Harmonious Position'
      }
    ],
    
    summary: 'Prophylaxis creates a solid, controlled position. By preventing Black\'s ...c5-c4 break with e3, White maintained the space advantage and limited Black\'s options. This is classic Nimzowitsch—restrain before attacking, control before expanding.',
    
    keyTakeaways: [
      'Restrain before attacking—prevent enemy pawn breaks and counterplay',
      'Control limits options—the fewer choices your opponent has, the easier the game',
      'Prophylactic moves often look passive but are actually very strong',
      'Build a solid foundation before launching attacks',
      'Think about what your opponent wants and stop it proactively'
    ],
    
    memoryTip: 'Remember Nimzowitsch\'s principle: "First restrain, then blockade, then destroy!" Prophylaxis is the first step.',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Nimzowitsch\'s My System'
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
    
    introduction: 'The minority attack is one of chess\'s most elegant strategic concepts: use fewer pawns to attack more pawns! In the Carlsbad structure (pawns on c4-d4 vs c7-d6), White has only two queenside pawns (a2, b2) against Black\'s three (a7, b7, c5). Paradoxically, we\'ll attack with our minority to create permanent weaknesses in Black\'s majority. The b4-b5 advance is the key move.',
    
    keyIdeas: [
      'Use fewer pawns to attack more—the minority attacks the majority',
      'b5 creates a weakness on c6—after ...cxb5, the c6 pawn becomes backward',
      'The weakness is permanent—once created, it can be attacked forever',
      'Target the resulting weakness with all your pieces—rooks on the c-file are especially powerful',
      'Timing is crucial—prepare with a3 before pushing b4-b5'
    ],
    
    mainLine: [
      { 
        move: 'a3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing the minority attack! We need to secure b4 first. The a3 move prevents Black from playing ...a5 in response to b4, which would interrupt our plan. This is the first step in the minority attack.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b2', to: 'b4', color: 'yellow' }
        ],
        highlights: ['a3'],
        conceptTag: 'Preparing the Attack',
        alternativeMoves: [
          {
            move: 'b4',
            evaluation: 'dubious',
            explanation: 'Playing b4 immediately allows ...a5, interrupting the minority attack. Prepare first!'
          }
        ]
      },
      { 
        move: 'b6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black prepares by developing the bishop, but this doesn\'t prevent White\'s minority attack plan.',
        arrows: [{ from: 'b7', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'b4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Starting the minority attack! The b4 pawn will advance to b5, attacking Black\'s pawn chain at its base. This is the thematic move in the Carlsbad structure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Attack Begins'
      },
      { 
        move: 'cxb4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black captures, but this opens the a-file for White\'s rooks. The minority attack is working!',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }],
        highlights: ['a1', 'a8']
      },
      { 
        move: 'axb4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Recapturing, opening the a-file! Now White has an open file for the rooks, and the b4 pawn is ready to advance to b5. The minority attack is progressing perfectly.',
        arrows: [
          { from: 'a3', to: 'b4', color: 'green' },
          { from: 'a1', to: 'a8', color: 'yellow' }
        ],
        highlights: ['a1', 'b4'],
        conceptTag: 'Opening the File'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, trying to create counterplay, but White\'s minority attack is already in motion.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'b5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Breaking through! The b5 advance attacks Black\'s pawn chain at its base. After ...cxb5, the c6 pawn becomes backward and weak. This is the culmination of the minority attack—creating a permanent weakness that can be attacked forever.',
        arrows: [
          { from: 'b4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c6', color: 'red' }
        ],
        highlights: ['b5', 'c6'],
        conceptTag: 'The Breakthrough'
      }
    ],
    
    summary: 'The minority attack creates permanent weaknesses. By advancing b4-b5 with fewer pawns, we attack Black\'s majority and force them to create a backward pawn on c6. This weakness is permanent and can be targeted with all our pieces.',
    
    keyTakeaways: [
      'b4-b5 is the classic minority attack in the Carlsbad structure',
      'Creates c6 weakness—after ...cxb5, the c6 pawn becomes backward and weak',
      'Prepare with a3 first—this prevents ...a5 interruptions',
      'The weakness is permanent—once created, it can be attacked forever',
      'Target the weakness with all your pieces—rooks on the c-file are especially powerful'
    ],
    
    memoryTip: 'Think of the minority attack as "David vs Goliath"—fewer pawns attacking more, but creating permanent weaknesses!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Carlsbad Structure Theory'
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
    
    introduction: 'In endgames, the king transforms from a piece needing protection into a powerful fighting piece worth approximately 4 pawns! When most pieces are traded, the king becomes one of the strongest pieces on the board. Centralize it immediately and use it to attack enemy pawns and support your own pawn advances. King activity often determines who wins endgames.',
    
    keyIdeas: [
      'The king is strong in endgames—worth approximately 4 pawns when active',
      'Centralize the king early—don\'t wait, activate it as soon as it\'s safe',
      'Use the king to attack pawns—it can capture weak pawns and create threats',
      'Support your own pawn advances with the king—the king helps pawns promote',
      'King activity often determines endgame outcomes—the more active king usually wins'
    ],
    
    mainLine: [
      { 
        move: 'Ke3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Centralizing the king! In the endgame, every tempo counts. The king heads toward the center to control key squares and prepare to attack Black\'s pawns.',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'e5', color: 'yellow' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'King Activation'
      },
      { 
        move: 'Kf8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates too, but White got there first! This tempo advantage will prove decisive in the endgame.',
        arrows: [{ from: 'g7', to: 'f8', color: 'blue' }]
      },
      { 
        move: 'Kd3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The king marches forward! From d3, the king eyes Black\'s pawns on e5 and can continue to c4 to penetrate deeper into Black\'s position. This is how you use the king in endgames—actively!',
        arrows: [
          { from: 'e3', to: 'd3', color: 'green' },
          { from: 'd3', to: 'e5', color: 'yellow' },
          { from: 'd3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['d3', 'e5'],
        conceptTag: 'King Penetration'
      },
      { 
        move: 'Ke7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends by moving the king to e7, but White\'s king is already more active and can continue the attack.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Kc4', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'The king penetrates! From c4, the king attacks Black\'s pawn on e5 and controls key squares. This is the power of an active king—it can penetrate deep into enemy territory and create winning threats. The active king has won the game!',
        highlights: ['c4'], 
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'e5', color: 'red' },
          { from: 'c4', to: 'b5', color: 'yellow' }
        ],
        conceptTag: 'Deep Penetration'
      }
    ],
    
    summary: 'The active king won the game by penetrating into enemy territory. By centralizing early and marching forward, White\'s king became a powerful attacking piece that could attack Black\'s pawns and create winning threats. This is the power of king activity in endgames.',
    
    keyTakeaways: [
      'Activate the king in endgames—it becomes a powerful fighting piece worth ~4 pawns',
      'March toward weak pawns—use the king to attack enemy pawns',
      'Centralize early—don\'t wait, activate the king as soon as it\'s safe',
      'Support pawn advances—the king helps your pawns promote',
      'King activity often determines endgame outcomes—the more active king usually wins'
    ],
    
    memoryTip: 'Think of the endgame king as a "warrior"—it transforms from needing protection to being the strongest piece on the board!',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Endgame Theory'
  },

  {
    id: 'king-activity-attack',
    category: 'KING_ACTIVITY',
    title: 'King Leads the Attack',
    subtitle: 'The king as attacker',
    fen: '8/pp3k2/2p2p2/4pPp1/2P1P1P1/1P6/P4K2/8 w - - 0 35',
    toMove: 'white',
    
    introduction: 'When all the pieces are gone, the king becomes a powerful attacking piece. In king and pawn endgames, the king is not just a defender—it\'s the primary attacker! The side whose king is more active and can support pawn advances usually wins. This pattern shows how the king leads the attack in endgames.',
    
    keyIdeas: [
      'King penetration is often decisive—the king that reaches enemy territory first usually wins',
      'Use king to support pawn advances—the king helps pawns become passed pawns',
      'The king can attack from multiple directions—it\'s more mobile than pawns',
      'Centralize the king first, then march it toward the action',
      'The active king creates threats that passive kings cannot defend against'
    ],
    
    mainLine: [
      { 
        move: 'Ke3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'King advances! The king moves toward the center, preparing to support the pawn advances on the queenside. In endgames, the king must be active!',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' },
          { from: 'e3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'King Activation'
      },
      { 
        move: 'Ke7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black mirrors by centralizing, but White\'s king is already more active and can continue the attack.',
        arrows: [{ from: 'f7', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Kd3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Heading toward the queenside! The king marches to d3, preparing to support the b4 and c4 pawn advances. This is how the king leads the attack—by supporting pawn advances.',
        arrows: [
          { from: 'e3', to: 'd3', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' },
          { from: 'd3', to: 'b4', color: 'yellow' }
        ],
        highlights: ['d3', 'b3', 'c4'],
        conceptTag: 'Supporting Pawns'
      },
      { 
        move: 'Kd6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends by moving the king to d6, but White\'s king is already in position to support the pawn break.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      { 
        move: 'b4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Creating a passed pawn! With the king on d3 supporting the advance, White can push b4, creating a passed pawn that the king will help promote. This is the power of an active king—it supports pawn advances and creates winning threats.',
        arrows: [
          { from: 'b3', to: 'b4', color: 'green' },
          { from: 'd3', to: 'b4', color: 'yellow' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4', 'd3'],
        conceptTag: 'Creating Passed Pawn'
      }
    ],
    
    summary: 'The king led the attack by marching forward. By centralizing and then moving to support pawn advances, White\'s king became the primary attacker, helping create a passed pawn that will win the game. This is how the king leads the attack in endgames.',
    
    keyTakeaways: [
      'King attacks in endgames—it becomes a powerful attacking piece when pieces are traded',
      'Support pawn advances—the king helps pawns become passed pawns',
      'Centralize first, then march toward the action',
      'The active king creates threats that passive kings cannot defend',
      'King activity often determines endgame outcomes—activate your king!'
    ],
    
    memoryTip: 'Think of the endgame king as a "general leading the charge"—it marches forward and supports the pawns!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Endgame Theory'
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
    
    introduction: 'Central pieces control more squares and have more power than pieces on the edge. A knight in the center controls 8 squares, while a knight on the rim controls only 2-4 squares. Centralization is one of the most fundamental principles in chess—pieces in the center can influence the entire board and attack in all directions. Always centralize before attacking!',
    
    keyIdeas: [
      'Central pieces control more squares—a knight in the center controls 8 squares vs 2-4 on the rim',
      'Centralize before attacking—centralized pieces can attack both flanks simultaneously',
      'Knights love the center—they reach maximum power when centralized',
      'Rooks and bishops also benefit from centralization—they control more lines',
      'Control e4, d4, e5, d5 for maximum influence—these are the most powerful squares'
    ],
    
    mainLine: [
      { 
        move: 'Re1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Centralizing the rook! The rook moves to e1, controlling the e-file and preparing to support central pawn advances. Centralized rooks are much more powerful than rooks on the edge.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e8', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook Centralization'
      },
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black challenges the center, but this opens the position and creates opportunities for White\'s centralized pieces.',
        arrows: [{ from: 'e7', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Taking the pawn. The position opens up, which favors centralized pieces.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. The position is now open, and White\'s centralized pieces are ready to dominate.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE KNIGHT CENTRALIZES! It dominates from d5. From this central square, the knight controls c7, e7, f6, b6, f4, b4, c3, and e3—eight squares! This is the power of centralization—the knight can attack in all directions and influence the entire board.',
        highlights: ['d5'], 
        arrows: [
          { from: 'f3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' },
          { from: 'd5', to: 'b6', color: 'yellow' }
        ],
        conceptTag: 'Central Domination'
      }
    ],
    
    summary: 'Centralization gives pieces maximum power. By centralizing the rook and knight, White\'s pieces control more squares and can attack in all directions. This is the power of centralization—centralized pieces dominate the board.',
    
    keyTakeaways: [
      'Centralize pieces before attacking—centralized pieces can attack both flanks simultaneously',
      'Knights love central squares—they reach maximum power when centralized (8 squares vs 2-4 on the rim)',
      'Rooks and bishops also benefit from centralization—they control more lines',
      'Control e4, d4, e5, d5 for maximum influence—these are the most powerful squares',
      'Centralized pieces can influence the entire board and attack in all directions'
    ],
    
    memoryTip: 'Remember: "A knight in the center is a king, a knight on the rim is dim!" Centralize your pieces for maximum power.',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Fundamental Chess Principles'
  },

  {
    id: 'centralization-queen',
    category: 'CENTRALIZATION',
    title: 'The Centralized Queen',
    subtitle: 'Queen in the center',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A centralized queen controls many squares and creates threats in all directions. From the center, the queen can attack both flanks simultaneously and switch between attack and defense instantly. However, timing is crucial—centralize the queen when it\'s safe and when your other pieces are developed. Don\'t centralize too early, or the queen becomes a target.',
    
    keyIdeas: [
      'Central queen controls both wings—from the center, it can attack kingside and queenside simultaneously',
      'Time the queen entry correctly—centralize when safe and when other pieces are developed',
      'Don\'t centralize too early—an early queen centralization can become a target for enemy pieces',
      'The centralized queen can switch flanks quickly—it can attack one side, then switch to the other',
      'Centralized queens create multiple threats—they can attack, defend, and coordinate with other pieces'
    ],
    
    mainLine: [
      { 
        move: 'Qd3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Centralizing the queen! From d3, the queen controls many squares and can attack both flanks. This is the right time to centralize—the other pieces are developed, and the queen is safe.',
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'h7', color: 'yellow' },
          { from: 'd3', to: 'a6', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Queen Centralization'
      },
      { 
        move: 'Re8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, but White\'s centralized queen continues to control the board.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Rd1', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Connecting rooks and supporting the centralized queen. The queen and rooks work together beautifully.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd3', color: 'yellow' }
        ]
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, but White\'s centralized queen continues to dominate the position.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Qd4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen dominates from d4! From this central square, the queen controls even more squares and can attack both flanks. The centralized queen is one of the most powerful pieces on the board—it creates threats everywhere and can switch between attack and defense instantly.',
        highlights: ['d4'], 
        arrows: [
          { from: 'd3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'h8', color: 'yellow' },
          { from: 'd4', to: 'a7', color: 'yellow' },
          { from: 'd4', to: 'g7', color: 'yellow' }
        ],
        conceptTag: 'Maximum Centralization'
      }
    ],
    
    summary: 'The centralized queen creates threats everywhere. By placing the queen on d4, White controls many squares and can attack both flanks simultaneously. This is the power of centralization—the queen becomes a dominant force that influences the entire board.',
    
    keyTakeaways: [
      'Central queen is powerful—it controls many squares and can attack both flanks simultaneously',
      'Time the centralization correctly—centralize when safe and when other pieces are developed',
      'Don\'t centralize too early—an early queen centralization can become a target',
      'The centralized queen can switch flanks quickly—it can attack one side, then switch to the other',
      'Centralized queens create multiple threats—they can attack, defend, and coordinate with other pieces'
    ],
    
    memoryTip: 'Think of the centralized queen as a "command center"—from the center, it can direct attacks in all directions!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Centralization Theory'
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
    
    introduction: 'The isolated d5-pawn (IQP) is one of chess\'s most famous weaknesses. Unlike normal pawns that can support each other, an isolated pawn has no friendly pawn neighbors. This means it can never be defended by another pawn, making it a permanent target. We\'ll learn the classic technique: blockade first, then attack with all your pieces.',
    
    keyIdeas: [
      'Isolated pawns cannot be defended by other pawns—they\'re permanent weaknesses',
      'Blockade the square in front of the isolated pawn—this prevents it from advancing',
      'Knights are ideal blockaders because they don\'t lose power when placed in front of a pawn',
      'After blockading, pile up attackers—rooks on the file, pieces targeting the pawn',
      'Trade pieces to reach an endgame where the weakness becomes more significant'
    ],
    
    mainLine: [
      { 
        move: 'Nb5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The knight heads toward the blockade square! From b5, it threatens to jump to d6 (the ideal blockading square) while also creating pressure on c7. This forces Black to react.',
        arrows: [
          { from: 'c3', to: 'b5', color: 'green' },
          { from: 'b5', to: 'd6', color: 'yellow' },
          { from: 'b5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['b5', 'd6'],
        conceptTag: 'Preparing the Blockade',
        alternativeMoves: [
          {
            move: 'Nd4',
            evaluation: 'good',
            explanation: 'Blockading immediately is also good, but Nb5 first creates more immediate threats and gives Black fewer defensive options.'
          }
        ]
      },
      { 
        move: 'Qb6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends c7 with the queen, but this doesn\'t prevent White\'s plan. The knight can still reach d6 via a different route, or White can build up pressure first.',
        arrows: [{ from: 'd8', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'Nd6', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE BLOCKADE! The knight lands on d6, the perfect blockading square. From here, it prevents the d5-pawn from ever advancing (if d5-d4, Nxd5 wins the pawn). The knight also attacks multiple squares (b7, f7, e8, c8) and cannot be driven away by any pawn. This is the classic Nimzowitsch blockade!',
        highlights: ['d6', 'd5'], 
        arrows: [
          { from: 'b5', to: 'd6', color: 'green' },
          { from: 'd6', to: 'b7', color: 'yellow' },
          { from: 'd6', to: 'f7', color: 'yellow' }
        ],
        conceptTag: 'The Perfect Blockade'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to develop and create counterplay, but the blockaded d5-pawn remains a permanent weakness that ties down Black\'s pieces.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Bd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Developing the bishop and preparing to double rooks on the d-file! White will pile up attackers on the weak d5-pawn. Rc1-d1 will create massive pressure, and Black will struggle to defend the pawn with limited piece coordination.',
        arrows: [
          { from: 'c1', to: 'd2', color: 'green' },
          { from: 'a1', to: 'c1', color: 'yellow' },
          { from: 'c1', to: 'd1', color: 'yellow' }
        ],
        highlights: ['d2', 'd5'],
        conceptTag: 'Piling Up'
      }
    ],
    
    summary: 'We blockaded Black\'s isolated d5-pawn by placing a knight on d6, then prepared to attack it with all our pieces. The blockade prevents the pawn from advancing while our pieces pile up for the final assault.',
    
    keyTakeaways: [
      'Always blockade isolated pawns—place a piece (ideally a knight) in front of them',
      'Knights are perfect blockaders because they remain fully active in front of a pawn',
      'After blockading, attack the pawn with multiple pieces—rooks on the file are especially powerful',
      'Trade pieces to reach endgames where the isolated pawn becomes even weaker',
      'The blockading square (d4 for d5-pawn) is often worth a piece sacrifice'
    ],
    
    memoryTip: 'Remember Nimzowitsch\'s rule: "First restrain, then blockade, then destroy!" The isolated pawn is like a sitting duck—blockade it, then surround and capture it!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Nimzowitsch\'s Blockade Theory'
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
    
    introduction: 'The Carlsbad structure, named after the city where it was first analyzed in detail, arises from the Exchange Queen\'s Gambit Declined. This structure features White\'s pawns on c4 and d4 against Black\'s pawns on c7 and d6, with Black having a pawn on e6. White\'s classic plan is the minority attack—advancing the b-pawn to b4 and then b5 to create permanent weaknesses in Black\'s queenside.',
    
    keyIdeas: [
      'The minority attack (b4-b5) creates permanent weaknesses on c6 or a6',
      'After b5, Black must capture (cxb5 or axb5), leaving an isolated or backward pawn',
      'Black counterattacks on the kingside with ...e5 or ...f5-f4',
      'The game becomes a race: White attacks queenside, Black attacks kingside',
      'Timing is crucial—prepare b4-b5 with a3 and good piece placement'
    ],
    
    mainLine: [
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Castling first to secure the king. In the Carlsbad structure, both sides castle kingside, so Black will counterattack on that side while White attacks on the queenside.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        conceptTag: 'King Safety'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black castles as well, completing development. Both sides are now ready to execute their plans.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      { 
        move: 'a3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing the minority attack! The a3 move secures the b4 square, preventing Black from playing ...a5 in response. Now b4-b5 can be executed without interference.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b2', to: 'b4', color: 'yellow' }
        ],
        highlights: ['a3'],
        conceptTag: 'Preparing the Break'
      },
      { 
        move: 'Re8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, preparing for kingside counterplay with ...e5 or ...f5. Black\'s plan is to attack on the kingside while White attacks on the queenside.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'b4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE MINORITY ATTACK BEGINS! This is the thematic move in the Carlsbad structure. The b4 pawn will advance to b5, attacking the c6 pawn. After ...cxb5 or axb5, Black will have a weak pawn on c6 or a6 that can be targeted forever.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b4', 'c6'],
        conceptTag: 'The Minority Attack'
      }
    ],
    
    summary: 'The Carlsbad structure leads to a classic race: White executes the minority attack (b4-b5) to create permanent queenside weaknesses, while Black counterattacks on the kingside. The side that executes their plan faster usually wins.',
    
    keyTakeaways: [
      'The minority attack (b4-b5) is White\'s standard plan in the Carlsbad structure',
      'Prepare b4 with a3 to prevent ...a5 interruptions',
      'After b5, Black\'s recapture creates an isolated or backward pawn on c6 or a6',
      'Black\'s counterplay comes on the kingside—be aware of ...e5 or ...f5-f4',
      'This structure requires precise timing—don\'t rush, but don\'t delay either'
    ],
    
    memoryTip: 'Think of the Carlsbad as a "split-screen attack"—White attacks queenside with pawns, Black attacks kingside with pieces. The first to break through wins!',
    
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Classical Pawn Structure Theory'
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
    introduction: 'Karpov was the master of prophylaxis—his games are filled with small, preventive moves that stop his opponents\' plans before they could start. His style was to always ask "what does my opponent want?" and prevent it, then slowly improve his position. This pattern demonstrates Karpov\'s prophylactic thinking—prevent first, improve second.',
    keyIdeas: [
      'Ask what opponent wants—think from their perspective before every move',
      'Prevent before they execute—stop their plans proactively',
      'Small improvements add up—each prophylactic move strengthens your position',
      'Prophylaxis creates opportunities—by preventing their plan, you enable your own',
      'Karpov\'s style: solid, controlled, and preventive'
    ],
    mainLine: [
      { 
        move: 'Be3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preventing ...Ng4 and supporting d4! This is classic Karpov prophylaxis. The move Be3 does two things: it prevents Black\'s knight from jumping to g4 (which would create threats), and it supports the d4 pawn. This is the essence of prophylaxis—improve your position while preventing your opponent\'s plans.',
        arrows: [
          { from: 'c1', to: 'e3', color: 'green' },
          { from: 'f6', to: 'g4', color: 'red' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3', 'g4', 'd4'],
        conceptTag: 'Prophylactic Development',
        alternativeMoves: [
          {
            move: 'Nd5',
            evaluation: 'dubious',
            explanation: 'Playing Nd5 immediately allows ...Ng4, creating tactical threats. Prophylaxis first!'
          }
        ]
      },
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black challenges the center, but our prophylactic Be3 move has already prevented ...Ng4. Black\'s options are limited.',
        arrows: [{ from: 'e7', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Taking the pawn. The position opens up, but our prophylactic play has already secured our position.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. The position is now more open, and our pieces are ready to become active.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Now the knight jumps in! This is the reward for prophylaxis—we prevented ...Ng4, so now we can play our active move without worry. The knight on d5 is strong and creates threats. This is Karpov\'s style: prevent first, then improve.',
        arrows: [
          { from: 'f3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Active After Prevention'
      }
    ],
    summary: 'Prophylaxis prepared our position before executing. By preventing ...Ng4 with Be3, we secured our position and enabled our knight to jump to d5 without worry. This is Karpov\'s style: prevent first, improve second, then attack.',
    keyTakeaways: [
      'Think prophylactically—always ask what your opponent wants before making your move',
      'Small moves have big effects—preventive moves often look small but are very important',
      'Prevent before improving—stop their plan, then execute your own',
      'Prophylaxis creates opportunities—by preventing their threat, you enable your active moves',
      'Karpov\'s style: solid, controlled, and preventive—learn from the master!'
    ],
    memoryTip: 'Think like Karpov: "What does my opponent want? Stop it. Then improve my position. Then attack."',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Karpov\'s Games',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Garry Kasparov',
      event: 'World Championship',
      year: 1985
    }
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
    introduction: 'The ...c5 break is one of Black\'s most important pawn breaks in many structures. It challenges White\'s central pawn on d4, opens the c-file for rooks, and creates counterplay. This break is thematic in the King\'s Indian, Benoni, and many other openings where Black needs to challenge White\'s central control.',
    keyIdeas: [
      'c5 challenges d4—forces White to make a decision about the center',
      'Opens the c-file for rooks—after exchanges, the c-file becomes a highway for Black\'s rooks',
      'Creates tension in the center—forces White to react and commit',
      'Timing is crucial—prepare with piece development before breaking',
      'The break often leads to open positions where Black\'s pieces become active'
    ],
    mainLine: [
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The thematic break! Black challenges the d4 pawn and opens the c-file for the rooks. This move creates immediate tension in the center and forces White to react. The c5 break is one of Black\'s main sources of counterplay in these structures.',
        arrows: [
          { from: 'c7', to: 'c5', color: 'green' },
          { from: 'c5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c5', 'd4'],
        conceptTag: 'The Central Break',
        alternativeMoves: [
          {
            move: 'e5',
            evaluation: 'good',
            explanation: 'Also possible, but c5 is more thematic and creates immediate pressure on d4.'
          }
        ]
      },
      { 
        move: 'd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White advances, closing the center. This is one option, but Black has prepared for this and will continue with ...e6 to challenge d5.',
        arrows: [{ from: 'd4', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      { 
        move: 'e6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Challenging the center! Black strikes at the d5 pawn with ...e6, creating more tension. The c5 break has achieved its goal—opening lines and creating active play for Black\'s pieces.',
        arrows: [
          { from: 'e7', to: 'e6', color: 'green' },
          { from: 'e6', to: 'd5', color: 'yellow' }
        ],
        highlights: ['e6', 'd5'],
        conceptTag: 'Following Up'
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
    introduction: 'Doubling rooks on an open file creates irresistible pressure. The two rooks work together to dominate the file—one rook supports the other, and together they can force an invasion to the 7th rank. This is one of the most powerful coordination techniques in chess. When you have doubled rooks on an open file, your opponent must constantly defend against the threat of invasion.',
    
    keyIdeas: [
      'Double rooks on open files—two rooks on the same file multiply their power',
      'One rook clears the way for the other—the front rook can trade to allow the back rook to invade',
      'Invasion to 7th rank becomes possible—doubled rooks can force an invasion to the 7th rank',
      'Coordination multiplies power—two rooks working together are much stronger than one',
      'The 7th rank is the goal—once a rook reaches the 7th rank, it attacks the opponent\'s pawns and king'
    ],
    
    mainLine: [
      { 
        move: 'Red1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Doubling on the e-file! The rook moves from e1 to d1, placing both rooks on the e-file. This creates tremendous pressure—the two rooks work together to dominate the file.',
        arrows: [
          { from: 'e1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'e8', color: 'yellow' },
          { from: 'a1', to: 'e1', color: 'yellow' }
        ], 
        highlights: ['d1', 'a1'],
        conceptTag: 'Doubling Rooks'
      },
      { 
        move: 'Red8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black mirrors White\'s move, doubling rooks on the e-file to defend. But White has a plan to break through.',
        arrows: [
          { from: 'e8', to: 'd8', color: 'blue' },
          { from: 'a8', to: 'e8', color: 'blue' }
        ]
      },
      { 
        move: 'Rxe8+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading to invade! White trades one rook for Black\'s rook, but this allows the other rook to invade to the 7th rank. This is the power of doubled rooks—one rook clears the way for the other.',
        highlights: ['e8'], 
        arrows: [
          { from: 'd1', to: 'e8', color: 'green' },
          { from: 'e8', to: 'e8', color: 'yellow' }
        ],
        conceptTag: 'Trading to Invade'
      },
      { 
        move: 'Rxe8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. Now White\'s remaining rook can invade to the 7th rank, attacking Black\'s pawns and king.',
        arrows: [{ from: 'd8', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Rd7', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'THE SEVENTH RANK! The coordinated rooks achieved their goal. The rook invades to d7, attacking Black\'s pawns on the 7th rank. This is the power of doubled rooks—they can force an invasion to the 7th rank, creating devastating threats.',
        highlights: ['d7'], 
        arrows: [
          { from: 'e1', to: 'd7', color: 'green' },
          { from: 'd7', to: 'b7', color: 'yellow' },
          { from: 'd7', to: 'f7', color: 'yellow' }
        ],
        conceptTag: '7th Rank Invasion'
      }
    ],
    
    summary: 'Doubled rooks dominate open files and create invasion opportunities. By doubling rooks on the e-file, White creates tremendous pressure. When Black mirrors, White trades one rook to allow the other to invade to the 7th rank. This is the power of coordination—two rooks working together are much stronger than one.',
    
    keyTakeaways: [
      'Double rooks on open files—two rooks on the same file multiply their power',
      'Trade one to invade with the other—the front rook can trade to allow the back rook to invade',
      'The 7th rank is the goal—once a rook reaches the 7th rank, it attacks the opponent\'s pawns and king',
      'Coordination multiplies power—two rooks working together are much stronger than one',
      'Doubled rooks create irresistible pressure—your opponent must constantly defend against the threat of invasion'
    ],
    
    memoryTip: 'Remember: "Two rooks on a file are like a battering ram—they can break through any defense!"',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Rook Coordination Theory'
  },

  {
    id: 'coordination-queen-rook-file',
    category: 'PIECE_COORDINATION',
    title: 'Queen and Rook on the Same File',
    subtitle: 'Heavy pieces together',
    fen: 'r2q1rk1/pp3ppp/2p5/8/3P4/2NQ4/PP3PPP/R4RK1 w - - 0 16',
    toMove: 'white',
    introduction: 'Queen and rook on the same file create tremendous pressure. The queen supports the rook\'s invasion, and together they can create overwhelming threats. This is one of the most powerful coordination techniques in chess—when heavy pieces work together, they multiply their attacking power. The queen can support the rook\'s invasion, and the rook can clear the way for the queen to attack.',
    
    keyIdeas: [
      'Queen supports rook invasions—the queen on the file supports the rook\'s invasion to the 7th rank',
      'Heavy pieces multiply threats—queen and rook together create multiple threats that are hard to defend',
      'Creates mating attacks—the coordination between queen and rook can lead to devastating mating attacks',
      'One piece clears, other invades—the rook can trade to allow the queen to invade, or vice versa',
      'Total domination of the file—queen and rook together completely dominate the file'
    ],
    
    mainLine: [
      { 
        move: 'Rac1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Bringing the rook to the c-file where the queen already is! The rook moves to c1, joining the queen on the c-file. This creates tremendous pressure—the two heavy pieces work together to dominate the file.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c8', color: 'yellow' },
          { from: 'd3', to: 'c8', color: 'yellow' }
        ],
        highlights: ['c1', 'd3'],
        conceptTag: 'Heavy Piece Coordination'
      },
      { 
        move: 'Rac8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends by doubling rooks on the c-file. But White has a plan to break through with a rook lift.',
        arrows: [
          { from: 'a8', to: 'c8', color: 'blue' },
          { from: 'f8', to: 'c8', color: 'blue' }
        ]
      },
      { 
        move: 'Rc5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Rook lifts to the 5th rank! The rook moves to c5, lifting off the file to create new threats. This is a powerful technique—the rook can attack from the side while the queen continues to pressure the file.',
        highlights: ['c5'], 
        arrows: [
          { from: 'c1', to: 'c5', color: 'green' },
          { from: 'c5', to: 'c8', color: 'yellow' },
          { from: 'c5', to: 'f5', color: 'yellow' }
        ],
        conceptTag: 'Rook Lift'
      },
      { 
        move: 'Rfd8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black prepares to defend, but White\'s coordination is too strong. The queen and rook work together to create multiple threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      { 
        move: 'Rfc1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Both rooks on the c-file with the queen! Total domination. The second rook joins the first rook and queen on the c-file, creating overwhelming pressure. This is the power of coordination—three heavy pieces working together completely dominate the file.',
        highlights: ['c1', 'c5', 'd3'], 
        arrows: [
          { from: 'f1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c8', color: 'yellow' },
          { from: 'c5', to: 'c8', color: 'yellow' },
          { from: 'd3', to: 'c8', color: 'yellow' }
        ],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'Queen and rook coordination on files creates overwhelming pressure. By placing the queen and rook on the same file, White creates tremendous pressure. The rook can lift to create new threats, and both rooks can join the queen on the file for total domination. This is the power of coordination—heavy pieces working together multiply their attacking power.',
    
    keyTakeaways: [
      'Coordinate heavy pieces on files—queen and rook together create overwhelming pressure',
      'Queen supports rook invasions—the queen on the file supports the rook\'s invasion to the 7th rank',
      'Creates multiple threats—the coordination between queen and rook creates threats that are hard to defend',
      'Rook lifts create new threats—the rook can lift off the file to attack from the side',
      'Total domination of the file—queen and rooks together completely dominate the file'
    ],
    
    memoryTip: 'Think of queen and rook coordination as "heavy artillery"—when they work together, they can break through any defense!',
    
    difficulty: 4,
    estimatedMinutes: 9,
    source: 'Heavy Piece Coordination'
  },

  {
    id: 'coordination-bishop-queen-diagonal',
    category: 'PIECE_COORDINATION',
    title: 'Bishop and Queen Battery',
    subtitle: 'Diagonal dominance',
    fen: 'r2q1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'A queen-bishop battery on a diagonal pointing at the enemy king can be devastating. The bishop and queen work together to create overwhelming pressure on the enemy king. The bishop typically goes in front, and the queen follows behind, creating a "battery" that multiplies their attacking power. This coordination often leads to sacrifices and tactical breakthroughs.',
    
    keyIdeas: [
      'Battery: bishop in front, queen behind—the bishop leads the attack, the queen follows',
      'Weakens enemy defenses—the battery creates pressure that weakens the enemy king\'s defenses',
      'Creates tactical threats—the coordination between bishop and queen creates tactical opportunities',
      'Often leads to sacrifices—the battery can lead to sacrifices that break through the enemy defenses',
      'Diagonal dominance—the battery completely dominates the diagonal, creating multiple threats'
    ],
    
    mainLine: [
      { 
        move: 'Bxf7+', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'SACRIFICING THE BISHOP! The battery strikes! The bishop sacrifices itself on f7, breaking through Black\'s defenses. This is a classic sacrifice—the bishop clears the way for the queen to attack. The coordination between bishop and queen creates a devastating attack.',
        arrows: [
          { from: 'c4', to: 'f7', color: 'green' },
          { from: 'e2', to: 'f7', color: 'yellow' }
        ], 
        highlights: ['f7'],
        conceptTag: 'Bishop Sacrifice'
      },
      { 
        move: 'Kxf7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Forced. Black must capture the bishop, but this exposes the king and allows White to continue the attack with the queen and knight.',
        arrows: [{ from: 'g8', to: 'f7', color: 'blue' }]
      },
      { 
        move: 'Ng5+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The queen and knight coordinate for a devastating attack! The knight moves to g5 with check, attacking the exposed king. The queen is ready to join the attack, and the coordination between pieces creates overwhelming threats.',
        arrows: [
          { from: 'f3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'f7', color: 'yellow' },
          { from: 'e2', to: 'h5', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Piece Coordination'
      },
      { 
        move: 'Ke8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'King runs. Black\'s king must retreat, but White\'s attack continues. The coordination between pieces is too strong.',
        arrows: [{ from: 'f7', to: 'e8', color: 'blue' }]
      },
      { 
        move: 'Qh5+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Queen dominates! The coordination between pieces wins. The queen moves to h5 with check, continuing the attack. The battery has done its job—the bishop sacrifice opened the way for the queen to attack, and now the queen and knight work together to create a winning attack.',
        highlights: ['h5'], 
        arrows: [
          { from: 'e2', to: 'h5', color: 'green' },
          { from: 'h5', to: 'e8', color: 'yellow' },
          { from: 'h5', to: 'f7', color: 'yellow' }
        ],
        conceptTag: 'Winning Attack'
      }
    ],
    
    summary: 'Bishop-queen batteries create tactical opportunities on key diagonals. By sacrificing the bishop on f7, White breaks through Black\'s defenses. The queen and knight then coordinate to create a devastating attack. This is the power of coordination—pieces working together multiply their attacking power and create winning attacks.',
    
    keyTakeaways: [
      'Place bishop in front, queen behind—the bishop leads the attack, the queen follows',
      'Look for sacrifices—the battery can lead to sacrifices that break through the enemy defenses',
      'Weakened king positions are vulnerable—the battery creates pressure that weakens the enemy king\'s defenses',
      'Coordination multiplies power—pieces working together create overwhelming threats',
      'Diagonal dominance wins games—the battery completely dominates the diagonal, creating multiple threats'
    ],
    
    memoryTip: 'Think of the bishop-queen battery as "artillery fire"—the bishop fires first, and the queen follows with devastating effect!',
    
    difficulty: 4,
    estimatedMinutes: 9,
    source: 'Battery Coordination'
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
    introduction: 'When under attack, trade off the attacking pieces! This is one of the most important defensive principles in chess. Each trade reduces your opponent\'s attacking potential and brings you closer to safety. By trading their active, attacking pieces, you simplify the position and make it easier to defend. This pattern shows how to defend through strategic exchanges.',
    keyIdeas: [
      'Trade attackers when defending—eliminate their active pieces to reduce threats',
      'Each trade eases pressure—fewer attacking pieces mean fewer threats',
      'Simplification helps defense—the fewer pieces on the board, the easier to defend',
      'Trade their best pieces—prioritize trading their most active, dangerous pieces',
      'Defense through exchanges is often more effective than passive defense'
    ],
    mainLine: [
      { 
        move: 'Bxc5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading off Black\'s active bishop! The bishop on c5 is one of Black\'s main attacking pieces. By trading it, we eliminate a key attacker and simplify the position. This is the first step in defending through exchanges.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Trading the Attacker'
      },
      { 
        move: 'dxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the pawn. The trade is complete—we\'ve eliminated one attacker, but Black still has other pieces.',
        arrows: [{ from: 'd6', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading another piece! By trading the knight on e5, we continue the simplification process. Each trade reduces Black\'s attacking potential and makes the position easier to defend.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Continuing Simplification'
      },
      { 
        move: 'Nxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black trades. The position is becoming simpler, which favors the defender.',
        arrows: [{ from: 'f6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White has successfully simplified and the attack is defused! By trading off Black\'s attacking pieces, we\'ve reduced their attacking potential to almost nothing. The position is now much easier to defend, and White can even start thinking about counterplay.',
        highlights: ['e5'],
        conceptTag: 'Attack Defused'
      }
    ],
    summary: 'Trading off attacking pieces is a key defensive strategy. By systematically trading Black\'s active, attacking pieces, White simplified the position and defused the attack. This is defense through exchanges—eliminate the attackers, and the attack disappears.',
    keyTakeaways: [
      'Trade attackers when defending—eliminate their active pieces to reduce threats',
      'Simplification reduces threats—fewer pieces mean fewer ways for the opponent to attack',
      'Each trade helps the defender—systematically trade off their attacking pieces',
      'Prioritize trading their best pieces—focus on their most active, dangerous pieces',
      'Defense through exchanges is often more effective than passive defense'
    ],
    memoryTip: 'Think of trading attackers as "disarming the enemy"—each trade removes a weapon from their arsenal!',
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Defensive Strategy'
  },

  {
    id: 'exchange-knight-for-bishop',
    category: 'EXCHANGE_STRATEGY',
    title: 'Knight vs Bishop Exchange',
    subtitle: 'When to trade minor pieces',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    introduction: 'Deciding whether to trade a knight for a bishop is one of the most important strategic decisions in chess. The answer depends entirely on the pawn structure: open positions favor bishops (they can control long diagonals), while closed positions favor knights (they can jump over pawns). This pattern shows how to make the right decision based on the position.',
    keyIdeas: [
      'Open positions: bishops > knights—bishops control long diagonals and see the entire board',
      'Closed positions: knights > bishops—knights can jump over pawns while bishops are blocked',
      'Consider future pawn structure—will the position open up or stay closed?',
      'Trade based on structure—make the decision based on the current and future pawn structure',
      'The bishop pair is especially strong in open positions'
    ],
    mainLine: [
      { 
        move: 'd4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Opening the center! This move creates an open position where bishops will be superior to knights. By opening the position, we\'re setting up the conditions for a favorable bishop vs knight trade.',
        arrows: [{ from: 'd2', to: 'd4', color: 'green' }],
        highlights: ['d4', 'e5'],
        conceptTag: 'Opening the Position'
      },
      { 
        move: 'exd4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black captures, opening the position. Now the position is open, and bishops will be more valuable than knights.',
        arrows: [{ from: 'e5', to: 'd4', color: 'blue' }]
      },
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Gaining space and further opening the position. The more open the position becomes, the stronger the bishops become.',
        arrows: [{ from: 'e4', to: 'e5', color: 'green' }]
      },
      { 
        move: 'Ng4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Knight retreats, but in this open position, the knight is less effective than a bishop would be.',
        arrows: [{ from: 'f6', to: 'g4', color: 'blue' }]
      },
      { 
        move: 'Bxf7+', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'In the open position, the bishop is superior! By trading the knight for the bishop, we gain a material advantage (bishop + pawn for knight) and maintain the bishop pair. This is the right decision because the position is open and bishops are stronger than knights here.',
        highlights: ['f7'], 
        arrows: [
          { from: 'c4', to: 'f7', color: 'green' },
          { from: 'f7', to: 'e8', color: 'yellow' }
        ],
        conceptTag: 'The Right Trade'
      }
    ],
    summary: 'In open positions, bishops are preferable. By opening the center with d4 and then trading the knight for the bishop, White gained a material advantage and maintained the superior bishop pair. This is the right exchange strategy based on the pawn structure.',
    keyTakeaways: [
      'Open = bishops better—bishops control long diagonals and see the entire board',
      'Closed = knights better—knights can jump over pawns while bishops are blocked',
      'Consider future structure—will the position open up or stay closed?',
      'Trade accordingly—make the decision based on the current and future pawn structure',
      'The bishop pair is especially strong in open positions—try to maintain it'
    ],
    memoryTip: 'Remember: "Bishops love open roads, knights love closed doors!" Trade based on the pawn structure.',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Exchange Strategy Theory'
  },

  {
    id: 'exchange-trading-defenders',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trading Key Defenders',
    subtitle: 'Remove the guardian',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'Before attacking, trade off the key defenders! This is one of the most important attacking principles in chess. The fianchettoed bishop on g7 is often Black\'s best defender of the kingside—it guards critical squares around the king. By trading it away before launching your attack, you remove the main guardian and create lasting weaknesses. This pattern shows how to attack by first eliminating the defenders.',
    keyIdeas: [
      'Identify key defenders—find the pieces that protect the area you want to attack',
      'Trade them before attacking—eliminate the defenders first, then launch the attack',
      'Fianchettoed bishops defend kings—the g7 bishop is often the main guardian of the kingside',
      'Create weaknesses through trades—trading defenders creates holes that cannot be filled',
      'The attack becomes much stronger after removing the key defenders'
    ],
    mainLine: [
      { 
        move: 'Bh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading the key defender! The bishop moves to h6, forcing Black to trade the fianchettoed bishop on g7. This is the first step in the attack—remove the main defender before launching the assault.',
        arrows: [
          { from: 'e3', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Removing the Defender'
      },
      { 
        move: 'Bxh6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black must trade. The fianchettoed bishop, Black\'s main defender, is gone. This creates a critical weakness—the dark squares around Black\'s king are now unprotected.',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }],
        highlights: ['g7', 'h7', 'f7']
      },
      { 
        move: 'Qxh6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Queen arrives with threats! The queen recaptures on h6, and now Black\'s kingside is severely weakened. Without the g7 bishop, the dark squares (g7, h7, f7) are vulnerable. The attack is beginning!',
        highlights: ['h6', 'g7'], 
        arrows: [
          { from: 'd1', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'red' },
          { from: 'h6', to: 'h7', color: 'red' }
        ],
        conceptTag: 'The Attack Begins'
      },
      { 
        move: 'Nh7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends desperately by moving the knight to h7, but the damage is done. The dark squares are weak, and White\'s attack is just getting started.',
        arrows: [{ from: 'f6', to: 'h7', color: 'blue' }]
      },
      { 
        move: 'Nf5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Knight jumps in! Without the g7 bishop, Black\'s kingside collapses. The knight on f5 attacks h6 (supporting the queen) and threatens to jump to g7 or h6. The attack is overwhelming because the key defender is gone!',
        arrows: [
          { from: 'd4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'h6', color: 'yellow' },
          { from: 'f5', to: 'g7', color: 'red' }
        ],
        highlights: ['f5', 'g7', 'h6'],
        conceptTag: 'The Attack Succeeds'
      }
    ],
    summary: 'Trading key defenders before attacking is crucial. By trading the fianchettoed bishop on g7, White removed Black\'s main defender and created lasting weaknesses on the dark squares. The attack that followed was overwhelming because the key guardian was gone. This is attacking through exchanges—remove the defenders, then attack.',
    keyTakeaways: [
      'Identify key defenders—find the pieces that protect the area you want to attack',
      'Trade them first—eliminate the defenders before launching the attack',
      'Then attack—once the defenders are gone, the attack becomes much stronger',
      'Creates lasting weaknesses—trading defenders creates holes that cannot be filled',
      'The fianchettoed bishop is often the main guardian—trade it away to weaken the kingside'
    ],
    memoryTip: 'Think of trading defenders as "cutting the guard wires"—remove the security system, then break in!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Attacking Strategy'
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
    introduction: 'A rook on the 6th rank can act as a powerful blockader, restricting enemy pawns and pieces from a distance. Unlike knights that must stand directly in front of a pawn, rooks can blockade from afar while maintaining their activity. The 6th rank is especially powerful because it attacks all the pawns still on their starting squares.',
    keyIdeas: [
      'Rooks can blockade from afar—they don\'t need to stand directly in front of the pawn',
      'The 6th rank is powerful—it attacks all enemy pawns on the 7th rank',
      'Restricts all enemy pawns—a rook on the 6th rank stops multiple pawns from advancing',
      'Supports your own advances—while blockading enemy pawns, the rook supports your own pawn advances',
      'Maintains flexibility—rooks can move along the rank while still blockading'
    ],
    mainLine: [
      { 
        move: 'Rg6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Blockading from the 6th rank! The rook moves to g6, where it attacks Black\'s pawns on g7 and h7 while also restricting the f-pawn. This is the power of rook blockades—they can control multiple pawns from a distance.',
        highlights: ['g6'], 
        arrows: [
          { from: 'g3', to: 'g6', color: 'green' },
          { from: 'g6', to: 'g7', color: 'red' },
          { from: 'g6', to: 'h7', color: 'red' },
          { from: 'g6', to: 'f7', color: 'yellow' }
        ],
        conceptTag: 'Rook Blockade'
      },
      { 
        move: 'Rd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, but White\'s rook on the 6th rank continues to restrict Black\'s pawns.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Rf6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The rook stops the f-pawn and attacks f7! By moving to f6, the rook blockades the f-pawn (preventing f7-f6) while also attacking f7. This shows the flexibility of rook blockades—they can move along the rank while maintaining the blockade.',
        arrows: [
          { from: 'g6', to: 'f6', color: 'green' },
          { from: 'f6', to: 'f7', color: 'red' },
          { from: 'f6', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f6', 'f7'],
        conceptTag: 'Flexible Blockade'
      },
      { 
        move: 'Kg7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'King defends f7, but the rook on f6 continues to restrict Black\'s pawns and maintain the blockade.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      { 
        move: 'Rf5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Blockading the d5 pawn from afar! The rook moves to f5, where it blockades the d5 pawn (preventing d5-d4) while maintaining activity. This demonstrates the power of rook blockades—they can control pawns from a distance while staying active.',
        highlights: ['f5', 'd5'], 
        arrows: [
          { from: 'f6', to: 'f5', color: 'green' },
          { from: 'f5', to: 'd5', color: 'yellow' }
        ],
        conceptTag: 'Distance Blockade'
      }
    ],
    summary: 'Rooks on the 6th rank can blockade enemy pawns while maintaining activity. Unlike knights that must stand directly in front of a pawn, rooks can blockade from afar, controlling multiple pawns and maintaining flexibility. This is the power of rook blockades.',
    keyTakeaways: [
      'Rooks blockade from distance—they don\'t need to stand directly in front of the pawn',
      '6th rank is powerful—it attacks all enemy pawns on the 7th rank',
      'Restricts enemy pawns—a rook on the 6th rank can stop multiple pawns from advancing',
      'Maintains flexibility—rooks can move along the rank while still blockading',
      'Supports your own advances—while blockading enemy pawns, the rook supports your own pawn advances'
    ],
    memoryTip: 'Think of the rook on the 6th rank as a "long-range blockader"—it controls pawns from a distance while staying active!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Blockade Theory'
  },

  {
    id: 'blockade-piece-in-front',
    category: 'BLOCKADE',
    title: 'The Perfect Blockade Square',
    subtitle: 'Directly in front of the pawn',
    fen: '8/5k2/3p1p2/3PpP2/4P3/5N2/5K2/8 w - - 0 40',
    toMove: 'white',
    introduction: 'The best blockade square is directly in front of the passed pawn. From there, the blockader stops all advances and neutralizes the pawn\'s power completely. This is Nimzowitsch\'s classic blockade—place a piece (ideally a knight) directly in front of the enemy pawn, and it becomes a permanent weakness. The blockader doesn\'t just stop the pawn—it turns it into a liability.',
    keyIdeas: [
      'Blockade directly in front—the square immediately in front of the pawn is the perfect blockade square',
      'Stops the pawn permanently—once blockaded, the pawn cannot advance and becomes a weakness',
      'Knights are ideal blockaders—they don\'t lose power when blocking a pawn (unlike bishops or rooks)',
      'Supports other plans—once the pawn is blockaded, you can attack it or pursue other plans',
      'The blockaded pawn becomes a permanent weakness that ties down the defender\'s pieces'
    ],
    mainLine: [
      { 
        move: 'Nd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Heading to the perfect blockade square! The knight begins its journey to d6, the square directly in front of Black\'s e5 pawn. This is the first step in establishing the perfect blockade.',
        arrows: [
          { from: 'f3', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d2', 'd6', 'e5'],
        conceptTag: 'Beginning the Journey'
      },
      { 
        move: 'Ke7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'King activates, but this doesn\'t prevent White from establishing the blockade.',
        arrows: [{ from: 'f7', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Nc4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Getting closer! The knight moves to c4, one step away from the perfect blockade square on d6. The journey is almost complete.',
        arrows: [
          { from: 'd2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['c4', 'd6'],
        conceptTag: 'Approaching the Goal'
      },
      { 
        move: 'Kd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black approaches with the king, but it\'s too late—White is about to establish the perfect blockade.',
        arrows: [{ from: 'e7', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Nd6', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'PERFECT BLOCKADE! Directly in front of the e5 pawn. The knight on d6 stops the e5 pawn from ever advancing. This is the perfect blockade square—the knight controls the pawn completely while maintaining its own power. The e5 pawn is now a permanent weakness that Black must defend forever.',
        highlights: ['d6', 'e5'], 
        arrows: [
          { from: 'c4', to: 'd6', color: 'green' },
          { from: 'd6', to: 'e5', color: 'yellow' },
          { from: 'd6', to: 'c8', color: 'yellow' },
          { from: 'd6', to: 'f7', color: 'yellow' }
        ],
        conceptTag: 'The Perfect Blockade'
      }
    ],
    summary: 'The perfect blockade is directly in front of the pawn, stopping it permanently. By placing the knight on d6 (directly in front of the e5 pawn), White neutralizes the pawn completely and turns it into a permanent weakness. This is Nimzowitsch\'s classic blockade—the blockader doesn\'t just stop the pawn, it dominates it.',
    keyTakeaways: [
      'Blockade in front of the pawn—the square directly in front is the perfect blockade square',
      'Knights are ideal blockaders—they don\'t lose power when blocking a pawn',
      'Stops advances permanently—once blockaded, the pawn cannot advance and becomes a weakness',
      'Allows other plans—once the pawn is blockaded, you can attack it or pursue other plans',
      'The blockaded pawn becomes a permanent weakness that ties down the defender\'s pieces'
    ],
    memoryTip: 'Remember Nimzowitsch\'s principle: "First restrain, then blockade, then destroy!" The perfect blockade is directly in front.',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Nimzowitsch\'s My System'
  },

  {
    id: 'blockade-preventing-break',
    category: 'BLOCKADE',
    title: 'Blockading the Break',
    subtitle: 'Stopping pawn advances',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2BPP3/2N1BN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'Sometimes blockading means preventing a pawn break before it can happen. Black wants to play ...e5 to free their position and create counterplay. By controlling the e5 square, we prevent this liberating break and keep Black cramped. This is proactive blockade—stopping the opponent\'s plans before they can execute them.',
    keyIdeas: [
      'Prevent pawn breaks—stop the opponent from freeing their position with pawn advances',
      'Control key squares—occupy or control the squares where breaks would occur',
      'Blockade proactively—don\'t wait for the break, prevent it before it happens',
      'Anticipate opponent plans—think about what they want to do and stop it',
      'Maintain the blockade—keep controlling the break squares throughout the game'
    ],
    mainLine: [
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Controlling e5! This prevents ...e5 which would free Black\'s position. The bishop on f4 controls the e5 square, making it impossible for Black to play ...e5 without losing material. This is proactive blockade—stopping the break before it can happen.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e5', color: 'yellow' },
          { from: 'e7', to: 'e5', color: 'red' }
        ],
        highlights: ['e5', 'f4'],
        conceptTag: 'Preventing the Break',
        alternativeMoves: [
          {
            move: 'Be3',
            evaluation: 'dubious',
            explanation: 'Be3 doesn\'t control e5, allowing Black to play ...e5 and free their position. Proactive blockade is essential!'
          }
        ]
      },
      { 
        move: 'Qc7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black repositions the queen, but the e5 break is still prevented by the bishop on f4.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Developing the queen and connecting the rooks. White continues to improve the position while maintaining the blockade on e5.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'a1', to: 'd1', color: 'yellow' }
        ]
      },
      { 
        move: 'Rfd8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, but the e5 break is still prevented. White\'s blockade remains intact.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      { 
        move: 'Rfd1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The blockade on e5 is maintained. Black can\'t break free! The rook on d1 supports the bishop on f4, and together they control the e5 square completely. Black\'s position remains cramped, and White can continue to improve the position. This is the power of proactive blockade—it keeps the opponent trapped.',
        highlights: ['e5', 'f4'], 
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'e5', color: 'yellow' },
          { from: 'f4', to: 'e5', color: 'yellow' }
        ],
        conceptTag: 'Maintaining the Blockade'
      }
    ],
    summary: 'Blockading means controlling the squares where your opponent wants to advance. By controlling e5 with the bishop on f4, White prevents Black\'s ...e5 break and keeps their position cramped. This is proactive blockade—stopping the opponent\'s plans before they can execute them.',
    keyTakeaways: [
      'Control break squares—occupy or control the squares where breaks would occur',
      'Prevent liberating advances—stop the opponent from freeing their position',
      'Maintain the blockade—keep controlling the break squares throughout the game',
      'Keep opponent cramped—proactive blockade restricts the opponent\'s options',
      'Anticipate opponent plans—think about what they want to do and stop it'
    ],
    memoryTip: 'Think of proactive blockade as "guarding the exit"—control the squares where the opponent wants to break free!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Blockade Theory'
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
    introduction: 'Queen behind rook on an open file creates maximum pressure—this is one of the most powerful formations in chess. The rook acts as a "battering ram" that can sacrifice itself to open lines, while the queen waits behind, ready to deliver the final blow. This coordination multiplies the power of both pieces and creates unstoppable threats.',
    keyIdeas: [
      'Queen behind rook multiplies the power of both pieces—they support each other perfectly',
      'The rook can sacrifice itself to open lines for the queen',
      'This formation creates multiple mating threats—back-rank mates, discovered attacks, and direct invasions',
      'Heavy pieces (rooks and queens) work best when coordinated together',
      'The battery formation is especially powerful on open files leading to the 7th rank'
    ],
    mainLine: [
      { 
        move: 'Re7', 
        isMainLine: true, 
        annotation: '!!', 
        explanation: 'Rook invades the 7th rank! This is the first step—the rook crashes into Black\'s position, attacking pawns and creating threats. The queen behind on c3 is ready to support or follow up.',
        highlights: ['e7'], 
        arrows: [
          { from: 'e1', to: 'e7', color: 'green' },
          { from: 'e7', to: 'b7', color: 'red' },
          { from: 'e7', to: 'f7', color: 'red' }
        ],
        conceptTag: 'Rook Invasion'
      },
      { 
        move: 'Rxe7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black trades rooks, trying to eliminate the invader. But this is exactly what White wants—the trade opens lines and the queen is ready to take over.',
        arrows: [{ from: 'e8', to: 'e7', color: 'blue' }]
      },
      { 
        move: 'Rxe7', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'White recaptures and still controls the 7th rank! More importantly, the queen on c3 now has a clear path to the action. The battery formation is working perfectly—rook invades, queen follows.',
        arrows: [
          { from: 'a1', to: 'e7', color: 'green' },
          { from: 'c3', to: 'e7', color: 'yellow' }
        ],
        highlights: ['e7', 'c3'],
        conceptTag: 'Queen Support'
      },
      { 
        move: 'Rf8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to defend by moving the rook to f8, but White\'s heavy pieces are too coordinated. The queen can now join the attack from multiple angles.',
        arrows: [{ from: 'f8', to: 'f8', color: 'blue' }]
      },
      { 
        move: 'Qc5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Queen and rook dominate! The queen moves to c5, creating a powerful battery with the rook on e7. From c5, the queen attacks e7 (supporting the rook), c7, and can swing to h5 or f8. The coordination is overwhelming—Black cannot defend against all the threats.',
        highlights: ['c5', 'e7'], 
        arrows: [
          { from: 'c3', to: 'c5', color: 'green' },
          { from: 'c5', to: 'e7', color: 'yellow' },
          { from: 'c5', to: 'c7', color: 'red' },
          { from: 'c5', to: 'f8', color: 'yellow' }
        ],
        conceptTag: 'Battery Formation'
      }
    ],
    summary: 'Queen behind rook creates unstoppable pressure on open files. The rook invades first, and even if traded, the queen follows up to maintain the attack. This heavy piece coordination multiplies the power of both pieces and creates multiple mating threats.',
    keyTakeaways: [
      'Queen behind rook is one of the most powerful formations—coordinate your heavy pieces',
      'The rook can sacrifice itself to open lines for the queen',
      'This formation creates multiple threats—back-rank mates, discovered attacks, and direct invasions',
      'Heavy pieces work best when coordinated together, not isolated',
      'The battery formation is especially effective on open files leading to the 7th rank'
    ],
    memoryTip: 'Think of the queen and rook as a "one-two punch"—the rook breaks through, the queen finishes the job!',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Heavy Piece Coordination'
  },

  // BISHOP_PAIR - Need 2 more (have 3)
  {
    id: 'bishop-pair-domination',
    category: 'BISHOP_PAIR',
    title: 'Two Bishops Dominate Knights',
    subtitle: 'Long-range superiority',
    fen: 'r2q1rk1/ppp1bppp/2n5/3pP3/3P4/2N5/PPP1BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: 'In open positions with few pawns, two bishops dominate two knights or knight+bishop. The bishops\' long-range capabilities allow them to control squares across the entire board, while knights are limited to short-range jumps. This advantage becomes more pronounced as the position opens up and pieces are traded.',
    keyIdeas: [
      'Bishops control long diagonals—they can attack from across the board',
      'Trade knights for bishops when the position is open or will open up',
      'Open the position with pawn exchanges to maximize bishop power',
      'Bishops get stronger in endgames as pawns come off the board',
      'Two bishops working together control both light and dark squares simultaneously'
    ],
    mainLine: [
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Activating the bishop pair! The bishop on f4 controls the long diagonal and eyes key squares. Both bishops are now active and working together.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4', 'e2'],
        conceptTag: 'Activating the Pair'
      },
      { 
        move: 'Bd7', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops, but White\'s bishop pair is already showing its superiority. The bishops can attack from a distance while Black\'s pieces struggle to coordinate.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Connecting rooks and supporting the bishops. The queen coordinates with the bishop pair, creating a powerful attacking formation.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'a1', to: 'd1', color: 'yellow' }
        ]
      },
      { 
        move: 'Rac8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, but White\'s bishop pair continues to dominate the position. The long-range bishops control key squares that Black\'s knights cannot reach.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      { 
        move: 'Rac1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'The bishop pair controls key squares while rooks dominate files! White\'s position is beautifully coordinated—bishops control diagonals, rooks control files. The two bishops working together give White a lasting advantage that will only grow as the position simplifies.',
        highlights: ['e2', 'f4', 'c1'], 
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c8', color: 'yellow' }
        ],
        conceptTag: 'Complete Domination'
      }
    ],
    summary: 'The bishop pair becomes dominant in open positions, controlling the board from distance. Two bishops working together are superior to two knights or knight+bishop because they can attack from across the board and control both light and dark squares simultaneously.',
    keyTakeaways: [
      'Open positions favor bishops—exchange pawns to open diagonals',
      'Coordinate both bishops to cover both colors for maximum control',
      'Trade for bishop pair advantage when the position is open or will open up',
      'Bishops get stronger as the game progresses and pieces are traded',
      'The bishop pair advantage is worth approximately half a pawn in open positions'
    ],
    memoryTip: 'Think of the two bishops as "twin snipers"—they can attack from opposite sides of the board while staying safe!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Bishop Pair Theory'
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
    introduction: 'When you have a bad bishop—one blocked by its own pawns—look to trade it! A bad bishop is a liability that cramps your position and limits your piece mobility. By trading it for an opponent\'s good piece (like a knight or active bishop), you relieve the cramp and improve your position significantly.',
    keyIdeas: [
      'Identify your bad bishop—one blocked by its own pawns on the same color',
      'Trade it for opponent\'s good pieces—knights, active bishops, or even rooks in some cases',
      'Trading relieves cramping and improves piece mobility',
      'After trading, your remaining pieces have more freedom to maneuver',
      'The position often opens up, making your other pieces more active'
    ],
    mainLine: [
      { 
        move: 'Bg5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Activating the bishop outside the pawn chain! The bishop on e3 is blocked by the pawns on d4, e5, and f4. By moving it to g5, we activate it and prepare to trade it for Black\'s knight on f6—a good trade that removes our bad bishop.',
        arrows: [
          { from: 'e3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['g5', 'f6'],
        conceptTag: 'Activating to Trade'
      },
      { 
        move: 'h6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black attacks the bishop, trying to force it to retreat. But this is exactly what we want—we\'re ready to trade!',
        arrows: [{ from: 'h7', to: 'h6', color: 'blue' }]
      },
      { 
        move: 'Bxf6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Trading the bishop! This is the key move—we exchange our bad bishop (blocked by pawns) for Black\'s active knight. After this trade, White\'s position is much more flexible and the remaining pieces have more room to maneuver.',
        arrows: [{ from: 'g5', to: 'f6', color: 'green' }],
        highlights: ['f6'],
        conceptTag: 'The Trade'
      },
      { 
        move: 'Bxf6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the bishop. The trade is complete—we\'ve eliminated our bad bishop and improved our position.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White\'s position is improved after trading the bad bishop! The queen connects the rooks, and without the bad bishop blocking the position, White\'s pieces have much more freedom. The cramp is relieved!',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'a1', to: 'd1', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Position Improved'
      }
    ],
    summary: 'Trading a bad bishop relieves cramping and improves your position. By exchanging your blocked bishop for an opponent\'s active piece, you gain mobility and flexibility while eliminating a positional liability.',
    keyTakeaways: [
      'Trade bad bishops—they\'re liabilities that cramp your position',
      'Trading improves mobility—your remaining pieces have more freedom',
      'Relieves cramp—the position opens up after the trade',
      'Trade for good pieces—knights, active bishops, or even rooks when advantageous',
      'The position often becomes more dynamic and easier to play after trading the bad bishop'
    ],
    memoryTip: 'Think of a bad bishop as a "traffic jam"—trade it away to clear the roads for your other pieces!',
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Bishop Theory'
  },

  {
    id: 'good-bishop-exploitation',
    category: 'GOOD_BAD_BISHOP',
    title: 'Exploiting Opponent\'s Bad Bishop',
    subtitle: 'Attack the weak color',
    fen: 'r2q1rk1/ppp1bppp/2np1n2/4p3/2BPP1b1/2N1BN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When your opponent has a bad bishop—one blocked by its own pawns—you have a golden opportunity! Attack on the squares that the bad bishop cannot defend. Since the bad bishop operates on one color (here, dark squares), you can dominate the opposite color (light squares) with impunity. This creates a two-front war that your opponent cannot win.',
    keyIdeas: [
      'Opponent\'s bad bishop can\'t defend squares of the opposite color—exploit this!',
      'Attack the weak color—place your pieces on squares the bad bishop cannot reach',
      'Dominate the board on the color the bad bishop cannot control',
      'Trade your less useful pieces for their good pieces, leaving them with only the bad bishop',
      'The bad bishop becomes a permanent liability that ties down their pieces'
    ],
    mainLine: [
      { 
        move: 'h3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Attacking the bad bishop! Black\'s bishop on g4 is already somewhat bad (blocked by pawns), but h3 forces it to make a decision. More importantly, this move prepares to place our knight on light squares where the bad bishop cannot defend.',
        arrows: [{ from: 'h2', to: 'h3', color: 'green' }],
        highlights: ['h3', 'g4'],
        conceptTag: 'Provoking the Bishop'
      },
      { 
        move: 'Bh5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Bishop retreats to h5, but it\'s still on dark squares and cannot defend light squares. The bad bishop remains a liability.',
        arrows: [{ from: 'g4', to: 'h5', color: 'blue' }]
      },
      { 
        move: 'Nh4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Knight to the weak light squares! The knight jumps to h4, a light square that Black\'s bad bishop cannot defend. From h4, the knight eyes f5 (another light square) and can jump to g6 or f5. This is the key—we\'re attacking on the color the bad bishop cannot control!',
        highlights: ['h4', 'f5'], 
        arrows: [
          { from: 'f3', to: 'h4', color: 'green' },
          { from: 'h4', to: 'f5', color: 'yellow' },
          { from: 'h4', to: 'g6', color: 'yellow' }
        ],
        conceptTag: 'Attacking the Weak Color'
      },
      { 
        move: 'Bg6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to trade, but this is exactly what we want—we\'ll trade on our terms and maintain our advantage on light squares.',
        arrows: [{ from: 'h5', to: 'g6', color: 'blue' }]
      },
      { 
        move: 'Nxg6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'We trade on our terms! By capturing with the knight, we eliminate Black\'s bad bishop while maintaining our light-square dominance.',
        arrows: [{ from: 'h4', to: 'g6', color: 'green' }]
      },
      { 
        move: 'hxg6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the pawn, but now the position is even more favorable for White. The bad bishop is gone, and White still controls the light squares.',
        arrows: [{ from: 'h7', to: 'g6', color: 'blue' }]
      },
      { 
        move: 'Bf3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Our light-squared bishop dominates now! The bishop on f3 controls key light squares and works perfectly with our other pieces. Black\'s remaining bishop (on e7) is still bad and cannot defend the light squares we control. White has a clear positional advantage!',
        highlights: ['f3'], 
        arrows: [
          { from: 'c4', to: 'f3', color: 'green' },
          { from: 'f3', to: 'h5', color: 'yellow' },
          { from: 'f3', to: 'd5', color: 'yellow' }
        ],
        conceptTag: 'Light-Square Domination'
      }
    ],
    summary: 'Attack on the squares that the opponent\'s bad bishop cannot defend. By placing your pieces on the opposite color and dominating those squares, you create a two-front war that your opponent cannot win. The bad bishop becomes a permanent liability.',
    keyTakeaways: [
      'Attack weak color squares—the bad bishop cannot defend them',
      'Place your pieces on squares the bad bishop cannot reach',
      'Dominate that color—control the entire color complex',
      'Trade their good pieces when possible, leaving them with only the bad bishop',
      'The bad bishop ties down their pieces and creates permanent weaknesses'
    ],
    memoryTip: 'Think of the bad bishop as a "one-armed fighter"—it can only defend half the board. Attack the other half!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Bishop Theory'
  },

  // SPACE_ADVANTAGE - Need 1 more (have 4)
  {
    id: 'space-bind-squeeze',
    category: 'SPACE_ADVANTAGE',
    title: 'The Space Bind',
    subtitle: 'Suffocating the opponent',
    fen: 'r1bq1rk1/ppp1npbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'When you have more space, maintain it! Don\'t exchange pawns that maintain your space advantage. A space bind is when you have a space advantage and maintain it by keeping the tension and not allowing the opponent to free their position. The key is to improve your pieces slowly while keeping the opponent cramped. Eventually, the cramped position will lead to mistakes.',
    
    keyIdeas: [
      'Maintain space advantage—don\'t exchange pawns that maintain your space advantage',
      'Don\'t release the tension—keep the tension in the center to maintain the space advantage',
      'Opponent has no room—the cramped position will eventually lead to mistakes',
      'Prepare slow improvement—use your space advantage to improve pieces while the opponent cannot',
      'Trade on your terms—only trade when it maintains or increases your space advantage'
    ],
    
    mainLine: [
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Improving pieces while maintaining space. The queen moves to d2, connecting the rooks and preparing to support the central pawns. White continues to improve while maintaining the space advantage.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Slow Improvement'
      },
      { 
        move: 'c5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to break. The c5 pawn advance is Black\'s attempt to free the position, but White can trade on favorable terms.',
        arrows: [{ from: 'c7', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'dxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'We trade on our terms. White exchanges the d4 pawn for Black\'s c5 pawn, but maintains the space advantage with the e4 pawn. This is a good trade—White keeps the space advantage.',
        arrows: [
          { from: 'd4', to: 'c5', color: 'green' },
          { from: 'c5', to: 'c5', color: 'yellow' }
        ]
      },
      { 
        move: 'dxc5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures. The position is simplified, but White still maintains the space advantage with the e4 pawn.',
        arrows: [{ from: 'd6', to: 'c5', color: 'blue' }]
      },
      { 
        move: 'Rad1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'We still maintain the space advantage with our e4 pawn! The rook moves to d1, controlling the d-file and supporting the e4 pawn. White\'s space advantage is maintained, and Black remains cramped.',
        highlights: ['e4', 'c4'], 
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd8', color: 'yellow' }
        ],
        conceptTag: 'Maintaining Space'
      }
    ],
    
    summary: 'Space advantage should be maintained carefully. Don\'t release tension prematurely. By trading on favorable terms and maintaining the e4 pawn, White keeps the space advantage while Black remains cramped. This is the space bind—maintain the space advantage and slowly improve your position.',
    
    keyTakeaways: [
      'Maintain space advantage—don\'t exchange pawns that maintain your space advantage',
      'Improve pieces slowly—use your space advantage to improve pieces while the opponent cannot',
      'Keep opponent cramped—don\'t let them free their position with pawn breaks',
      'Trade on your terms—only trade when it maintains or increases your space advantage',
      'The space bind is a powerful weapon—maintain the space advantage and the opponent will eventually crack'
    ],
    
    memoryTip: 'Think of the space bind as "keeping the opponent in a cage"—maintain the space advantage and they\'ll eventually make a mistake!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Space Advantage Theory'
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
    introduction: 'After b5 succeeds in the minority attack, the real work begins! The b5 advance has created a weakness—now we must exploit it. The key is to pile up all your pieces on the weak pawn (c6) and maintain constant pressure. This pattern shows how to convert the minority attack into a winning advantage.',
    keyIdeas: [
      'After b5, target c6 with all your pieces—the weakness is permanent',
      'Pile up on the weakness—rooks, queen, and pieces all attack the weak pawn',
      'Rooks on the c-file are especially powerful—they attack c6 directly',
      'Constant pressure wins—keep attacking until the weakness breaks',
      'Don\'t rush—build up pressure systematically before capturing'
    ],
    mainLine: [
      { 
        move: 'bxc6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Breaking through! After Black captures on b5, we can now capture on c6, creating an isolated or backward pawn. This is the first step in exploiting the weakness created by the minority attack.',
        arrows: [{ from: 'b5', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Breaking Through'
      },
      { 
        move: 'bxc6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures, but now the c6 pawn is isolated and weak. This is exactly what the minority attack was designed to create—a permanent weakness that can be attacked forever.',
        arrows: [{ from: 'b7', to: 'c6', color: 'blue' }],
        highlights: ['c6']
      },
      { 
        move: 'Rb1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Seizing the b-file! The rook moves to b1, preparing to double on the b-file and attack the weak c6 pawn. This is how you exploit the minority attack—pile up pieces on the weakness.',
        highlights: ['b1'], 
        arrows: [
          { from: 'a1', to: 'b1', color: 'green' },
          { from: 'b1', to: 'c6', color: 'yellow' }
        ],
        conceptTag: 'Piling Up'
      },
      { 
        move: 'Rb8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black defends by bringing the rook to b8, but White\'s attack is just beginning. The weak c6 pawn remains a target.',
        arrows: [{ from: 'a8', to: 'b8', color: 'blue' }]
      },
      { 
        move: 'Rxb8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Trading rooks. Even after the trade, White maintains pressure on the weak c6 pawn.',
        arrows: [{ from: 'f1', to: 'b8', color: 'green' }]
      },
      { 
        move: 'Qxb8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the queen, but the weak c6 pawn is still under attack.',
        arrows: [{ from: 'd8', to: 'b8', color: 'blue' }]
      },
      { 
        move: 'Qa4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Attacking c6! The queen moves to a4, directly targeting the weak c6 pawn. Combined with the rook on b1, White has multiple pieces attacking the weakness. This is how you exploit the minority attack—constant pressure on the weak pawn until it breaks.',
        arrows: [
          { from: 'd1', to: 'a4', color: 'green' },
          { from: 'a4', to: 'c6', color: 'red' },
          { from: 'b1', to: 'c6', color: 'red' }
        ],
        highlights: ['a4', 'c6'],
        conceptTag: 'Exploiting the Weakness'
      }
    ],
    summary: 'After the minority attack creates a weakness, pile up on it with all your pieces. The weak c6 pawn becomes a permanent target that can be attacked with rooks, queen, and other pieces. Constant pressure eventually wins the pawn or forces decisive concessions.',
    keyTakeaways: [
      'Target the resulting weakness—the c6 pawn is permanent and can be attacked forever',
      'Pile pieces on weak pawns—rooks, queen, and pieces all attack together',
      'Use all your pieces—coordinate them to attack the weakness from multiple angles',
      'Constant pressure wins—keep attacking until the weakness breaks or forces concessions',
      'Don\'t rush—build up pressure systematically before attempting to win the pawn'
    ],
    memoryTip: 'Think of the weak pawn as a "wounded animal"—surround it with all your pieces and keep attacking until it falls!',
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Carlsbad Structure Theory'
  },

  {
    id: 'minority-attack-timing',
    category: 'MINORITY_ATTACK',
    title: 'Timing the Minority Attack',
    subtitle: 'When to push b5',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/1PN1PN2/P3BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: 'The minority attack requires proper timing. You can\'t just push b4-b5 immediately—you need to prepare your pieces first. Push b4-b5 when your pieces are ready to follow up and exploit the weakness. This pattern shows the importance of timing in the minority attack—prepare first, then strike.',
    keyIdeas: [
      'Prepare before pushing b5—get your pieces ready to exploit the weakness',
      'Get pieces ready first—rooks on the c-file, queen ready to join',
      'Timing is everything—don\'t rush the attack, wait for the right moment',
      'Don\'t rush the attack—build up your position first, then execute',
      'The minority attack is a long-term plan—patience pays off'
    ],
    mainLine: [
      { 
        move: 'a3', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing b4! Not rushing. The a3 move secures the b4 square, preventing ...a5 interruptions. This is the first step in preparing the minority attack—secure the base before advancing.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b2', to: 'b4', color: 'yellow' }
        ],
        highlights: ['a3'],
        conceptTag: 'Preparing the Base'
      },
      { 
        move: 'Rc8', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the rook, but White is still preparing. The minority attack requires patience—don\'t rush!',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      { 
        move: 'Rc1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Getting the rook ready for the c-file! This is crucial preparation—after b5 creates the weakness on c6, the rook on c1 will be perfectly placed to attack it. This is the right timing—prepare first, then execute.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c1'],
        conceptTag: 'Preparing the Attack'
      },
      { move: 'cxd4', isMainLine: true, annotation: '', explanation: 'Black exchanges.' },
      { move: 'exd4', isMainLine: true, annotation: '', explanation: 'Recapturing.' },
      { move: 'b4', isMainLine: true, annotation: '!', explanation: 'NOW the minority attack! All pieces are ready.', arrows: [{ from: 'b3', to: 'b4', color: 'green' }] }
    ],
    summary: 'Proper timing is crucial for the minority attack. Prepare your pieces before pushing b4-b5.',
    keyTakeaways: ['Prepare before attacking', 'Get rooks on c-file', 'Timing matters', 'Don\'t rush'],
    difficulty: 4,
    estimatedMinutes: 8
  },

  // PAWN_BREAKS - The e4-e5 Break (Fixed with valid moves)
  {
    id: 'pawn-break-e4-e5',
    category: 'PAWN_BREAKS',
    title: 'The e4-e5 Break',
    subtitle: 'Gaining space and driving away pieces',
    // Pirc Defense position where e5 is thematic
    fen: 'rnbq1rk1/pp2ppbp/2pp1np1/8/3PPP2/2N2N2/PPP1B1PP/R1BQK2R w KQ - 0 7',
    toMove: 'white',
    introduction: 'The e4-e5 break is one of White\'s most powerful weapons in the Pirc and Modern Defense. By pushing e5, White gains space, drives away Black\'s well-placed knight, and opens lines for attack. Timing this break correctly is crucial—it must be prepared properly to maximize its effect.',
    keyIdeas: [
      'e5 gains central space and restricts Black\'s pieces',
      'Drives the f6-knight away from its ideal square',
      'Opens the e-file and f-file for White\'s pieces',
      'Creates a space advantage that can be converted into an attack',
      'The f4 pawn supports e5 and controls key squares'
    ],
    mainLine: [
      { 
        move: 'e5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE SPACE-GAINING BREAK! White strikes in the center, pushing the pawn to e5. This gains territory, drives away Black\'s knight, and opens lines. The f4 pawn provides crucial support.',
        arrows: [{ from: 'e4', to: 'e5', color: 'green' }, { from: 'f4', to: 'e5', color: 'yellow' }], 
        highlights: ['e5'],
        conceptTag: 'Central Break'
      },
      { 
        move: 'dxe5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black captures to relieve the pressure. Taking with the d-pawn opens the d-file and gives Black some central play, but White has a strong follow-up.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      { 
        move: 'fxe5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Recapturing with the f-pawn! This maintains the space advantage and keeps pressure on the knight. The e5 pawn is now a powerful central outpost.',
        arrows: [{ from: 'f4', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Maintaining Space'
      },
      { 
        move: 'Nd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'The knight retreats to d5, the only safe square. While d5 looks active, it can be challenged and the knight is no longer controlling key kingside squares.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      { 
        move: 'Nxd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Trading knights! White eliminates Black\'s centralized piece and prepares to exploit the open lines.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }]
      },
      { 
        move: 'cxd5', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black recaptures with the c-pawn, creating a passed d-pawn but also weakening the b6 and d6 squares.',
        arrows: [{ from: 'c6', to: 'd5', color: 'blue' }]
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'White castles, connecting the rooks and preparing to use the f-file. The king is safe and White\'s pieces are well-coordinated.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        conceptTag: 'King Safety'
      },
      { 
        move: 'Nc6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black develops the knight, but White\'s space advantage is permanent.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }]
      },
      { 
        move: 'Bf4', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Developing with tempo! The bishop eyes the e5 pawn\'s support and controls the a1-h8 diagonal. White\'s pieces are becoming very active.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'c7', color: 'yellow' }],
        highlights: ['f4'],
        conceptTag: 'Piece Activity'
      },
      { 
        move: 'Bg4', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black tries to create counterplay by pinning the knight.',
        arrows: [{ from: 'c8', to: 'g4', color: 'blue' }]
      },
      { 
        move: 'Qd2', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Connecting the rooks and preparing Rae1. The queen also supports the bishop on f4 and eyes the kingside. White has a clear space advantage and excellent piece coordination.',
        arrows: [{ from: 'd1', to: 'd2', color: 'green' }, { from: 'a1', to: 'e1', color: 'yellow' }],
        highlights: ['d2'],
        conceptTag: 'Coordination'
      },
      { 
        move: 'Bxf3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black exchanges to reduce White\'s attacking potential.',
        arrows: [{ from: 'g4', to: 'f3', color: 'blue' }]
      },
      { 
        move: 'Bxf3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Recapturing with the bishop. White maintains a strong position with the two bishops and space advantage.',
        arrows: [{ from: 'e2', to: 'f3', color: 'green' }],
        conceptTag: 'Bishop Pair'
      },
      { 
        move: 'Qb6', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Black activates the queen, attacking b2.',
        arrows: [{ from: 'd8', to: 'b6', color: 'blue' }]
      },
      { 
        move: 'Rab1', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Defending b2 and preparing b3. White\'s space advantage, bishop pair, and piece coordination give a lasting edge. The e5 break has transformed the position in White\'s favor.',
        arrows: [{ from: 'a1', to: 'b1', color: 'green' }],
        highlights: ['b1', 'e5'],
        conceptTag: 'Consolidation'
      }
    ],
    summary: 'The e4-e5 break transforms the position by gaining space, driving away pieces, and opening lines. White\'s space advantage leads to superior piece coordination and attacking chances. The key is proper preparation with f4 before executing the break.',
    keyTakeaways: [
      'Prepare the e5 break with f4 to support the advancing pawn',
      'After e5, the knight on f6 is driven away from its ideal square',
      'Recapture with fxe5 to maintain the space advantage',
      'Use the space to coordinate pieces and build an attack',
      'The bishop pair often emerges as a bonus in these positions'
    ],
    memoryTip: 'Think "e5 = evict!" The e5 break evicts Black\'s pieces from the center!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Pirc Defense Theory'
  },

  // ============================================
  // PAWN BREAKS - CHAPTER 2: THE F5 BREAK IN KID
  // ============================================
  {
    id: 'pawn-break-f5-kid-deep',
    category: 'PAWN_BREAKS',
    title: 'The f5 Break in King\'s Indian',
    subtitle: 'Kingside counterattack',
    // King's Indian Defense position
    fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQ - 0 6',
    toMove: 'black',
    
    introduction: 'In the King\'s Indian Defense, Black often plays ...f5 to break White\'s center and create counterplay. While White has a space advantage in the center, Black strikes on the kingside with ...f5. This break opens lines, activates pieces, and creates attacking chances. This pattern shows how to execute and follow up the f5 break.',
    
    keyIdeas: [
      'The f5 break challenges White\'s central pawn on e4',
      'Opens the f-file for Black\'s rook and pieces',
      'Creates kingside counterplay while White attacks queenside',
      'Activates Black\'s pieces, especially the g7 bishop',
      'Timing is crucial—prepare with proper piece development'
    ],
    
    mainLine: [
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the f5 break! The knight develops to d7, supporting the break and preparing to reroute to f6 or e5. This is proper preparation.',
        arrows: [
          { from: 'b8', to: 'd7', color: 'green' },
          { from: 'd7', to: 'f6', color: 'yellow' }
        ],
        highlights: ['d7'],
        conceptTag: 'Preparation'
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black is ready to strike.',
        arrows: [{ from: 'f1', to: 'e2', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAK! Black strikes on the kingside! The f5 pawn challenges White\'s e4 pawn and opens lines for Black\'s pieces. This is the thematic break in the King\'s Indian.',
        arrows: [
          { from: 'f7', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e4', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'The Break'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but this opens the f-file for Black.',
        arrows: [{ from: 'e4', to: 'f5', color: 'blue' }]
      },
      {
        move: 'gxf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the g-pawn! This maintains the pawn on f5 and opens the g-file. Black\'s pieces are becoming very active.',
        arrows: [{ from: 'g6', to: 'f5', color: 'green' }],
        highlights: ['f5'],
        conceptTag: 'Maintaining Pressure'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White castles, but Black continues the attack.',
        arrows: [{ from: 'e1', to: 'g1', color: 'blue' }]
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight moves to f6, supporting the f5 pawn and preparing to attack. Black\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'd7', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g4', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bf3',
        isMainLine: true,
        annotation: '',
        explanation: 'White defends, but Black has more threats.',
        arrows: [{ from: 'e2', to: 'f3', color: 'blue' }]
      },
      {
        move: 'Ng4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to g4, attacking f2 and creating multiple threats! The f5 break has opened lines and activated all of Black\'s pieces.',
        arrows: [
          { from: 'f6', to: 'g4', color: 'green' },
          { from: 'g4', to: 'f2', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Knight Attack'
      },
      {
        move: 'Bxg4',
        isMainLine: true,
        annotation: '',
        explanation: 'White must capture, but this gives Black the bishop pair.',
        arrows: [{ from: 'f3', to: 'g4', color: 'blue' }]
      },
      {
        move: 'Bxg4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! Black now has the bishop pair and a strong position. The f5 break has been a complete success.',
        arrows: [{ from: 'g7', to: 'g4', color: 'green' }],
        highlights: ['g4'],
        conceptTag: 'Bishop Pair'
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to defend, but Black continues the attack.',
        arrows: [{ from: 'd1', to: 'd2', color: 'blue' }]
      },
      {
        move: 'Qf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to f6, using the open f-file! Combined with the f5 pawn and active pieces, Black has a winning attack. The f5 break has transformed the position completely.',
        arrows: [
          { from: 'd8', to: 'f6', color: 'green' },
          { from: 'f6', to: 'f2', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Queen Activity'
      },
      {
        move: 'Rf1',
        isMainLine: true,
        annotation: '',
        explanation: 'White defends, but Black has too many threats.',
        arrows: [{ from: 'f1', to: 'f1', color: 'blue' }]
      },
      {
        move: 'Rf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to f7, doubling on the f-file! Black has complete control of the f-file and a winning position. The f5 break has been executed perfectly—it opened lines, activated pieces, and created a devastating attack.',
        arrows: [
          { from: 'f8', to: 'f7', color: 'green' },
          { from: 'f7', to: 'f2', color: 'yellow' }
        ],
        highlights: ['f7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'The f5 break in the King\'s Indian Defense opened lines, activated Black\'s pieces, and created a winning attack. By preparing properly (Nbd7) and following up correctly (Nf6, Ng4, Qf6, Rf7), Black transformed the position completely. The break was a complete success.',
    
    keyTakeaways: [
      'Prepare the f5 break with proper piece development',
      'The f5 break challenges White\'s center and opens lines',
      'Follow up by activating pieces on the open files',
      'Use the break to create kingside counterplay',
      'The f5 break is thematic in the King\'s Indian Defense'
    ],
    
    memoryTip: 'Think of f5 as "freedom for the f-file"—the break opens lines and sets your pieces free!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'King\'s Indian Defense Theory',
    playerExample: {
      white: 'Boris Spassky',
      black: 'Tigran Petrosian',
      event: 'World Championship',
      year: 1966
    }
  },

  {
    id: 'pawn-break-b5-sicilian',
    category: 'PAWN_BREAKS',
    title: 'The ...b5 Break in Sicilian',
    subtitle: 'Queenside counterplay',
    fen: 'r1bqk2r/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2QK2R b KQkq - 0 9',
    toMove: 'black',
    introduction: 'The ...b5 break is thematic for Black in the Sicilian Defense. While White attacks on the kingside, Black counterattacks on the queenside with ...b5. This break gains queenside space, attacks White\'s pieces, and creates counterplay. It\'s one of Black\'s main sources of activity in the Sicilian.',
    keyIdeas: [
      '...b5 gains queenside space—pushes Black\'s pawn forward and restricts White\'s pieces',
      'Attacks White\'s pieces—the b5 pawn attacks the bishop on c4, forcing it to retreat',
      'Creates counterplay—while White attacks kingside, Black attacks queenside',
      'Opens the b-file—after exchanges, the b-file becomes a highway for Black\'s rooks',
      'Timing is crucial—prepare with ...a6 first to prevent White from playing a4'
    ],
    mainLine: [
      { 
        move: 'a6', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Preparing ...b5! This move prevents White from playing a4, which would stop the ...b5 break. The a6 move is essential preparation—without it, White can interrupt Black\'s plan.',
        arrows: [
          { from: 'a7', to: 'a6', color: 'green' },
          { from: 'b7', to: 'b5', color: 'yellow' }
        ],
        highlights: ['a6'],
        conceptTag: 'Preparing the Break'
      },
      { 
        move: 'O-O', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'White castles, securing the king. But Black\'s queenside attack is ready to begin.',
        arrows: [{ from: 'e1', to: 'g1', color: 'blue' }]
      },
      { 
        move: 'b5', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'THE BREAK! Attacking the bishop and gaining space. The b5 advance is the thematic move in the Sicilian—it creates queenside counterplay and attacks White\'s pieces. The bishop on c4 must retreat, and Black gains space on the queenside.',
        arrows: [
          { from: 'b7', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c4', color: 'red' }
        ],
        highlights: ['b5', 'c4'],
        conceptTag: 'The Queenside Break'
      },
      { 
        move: 'Bd3', 
        isMainLine: true, 
        annotation: '', 
        explanation: 'Bishop retreats to d3, but Black has already achieved the goal—gaining queenside space and creating counterplay.',
        arrows: [{ from: 'c4', to: 'd3', color: 'blue' }]
      },
      { 
        move: 'Rb8', 
        isMainLine: true, 
        annotation: '!', 
        explanation: 'Following up on the b-file! The rook moves to b8, preparing to double on the b-file and create pressure on White\'s queenside. Black has successfully created queenside counterplay—this is the Sicilian in action!',
        highlights: ['b8', 'b5'], 
        arrows: [
          { from: 'a8', to: 'b8', color: 'green' },
          { from: 'b8', to: 'b2', color: 'yellow' }
        ],
        conceptTag: 'Following Up'
      }
    ],
    summary: 'The ...b5 break gives Black queenside counterplay in the Sicilian. By advancing ...a6-b5, Black gains space, attacks White\'s pieces, and creates counterplay on the queenside. This is the classic Sicilian plan—counterattack on the opposite side from White\'s attack.',
    keyTakeaways: [
      'Prepare with ...a6 first—this prevents White from playing a4 and interrupting the break',
      'Then push ...b5—this is the thematic break that creates queenside counterplay',
      'Creates counterplay—while White attacks kingside, Black attacks queenside',
      'Opens b-file—after exchanges, the b-file becomes a highway for Black\'s rooks',
      'Timing is crucial—execute when your pieces are ready to follow up'
    ],
    memoryTip: 'Think of ...b5 as "striking back on the queenside"—while White attacks kingside, you attack queenside!',
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Sicilian Defense Theory'
  },

  {
    id: 'pawn-break-c5-french-deep',
    category: 'PAWN_BREAKS',
    title: 'The ...c5 Break in French Defense',
    subtitle: 'Challenging White\'s center',
    // French Defense position after 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5
    fen: 'rnbqk2r/pp2bppp/4pn2/2pp4/3PP3/2N1BN2/PPP2PPP/R2QKB1R b KQkq - 0 6',
    toMove: 'black',
    
    introduction: 'In the French Defense, Black often plays ...c5 to challenge White\'s central pawn on d4. While White has a space advantage with the e5 pawn, Black strikes at the base of White\'s pawn chain with ...c5. This break undermines White\'s center, opens lines, and creates counterplay. This pattern shows how to execute and follow up the c5 break in the French Defense.',
    
    keyIdeas: [
      'The c5 break challenges White\'s central pawn on d4',
      'Undermines White\'s pawn chain by attacking its base',
      'Opens the c-file for Black\'s rooks and pieces',
      'Creates queenside counterplay while White attacks kingside',
      'Timing is crucial—prepare with proper piece development'
    ],
    
    mainLine: [
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the c5 break! The knight develops to c6, supporting the break and preparing to put pressure on White\'s d4 pawn. This is proper preparation—the knight will help support the c5 advance.',
        arrows: [
          { from: 'b8', to: 'c6', color: 'green' },
          { from: 'c6', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c6'],
        conceptTag: 'Preparation'
      },
      {
        move: 'a3',
        isMainLine: true,
        annotation: '',
        explanation: 'White plays a3, trying to force the bishop to declare its intentions. But Black is ready to strike.',
        arrows: [{ from: 'a2', to: 'a3', color: 'blue' }]
      },
      {
        move: 'Bxc3+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, exchanging the bishop for the knight. This is a common trade in the French Defense.',
        arrows: [{ from: 'b4', to: 'c3', color: 'blue' }]
      },
      {
        move: 'bxc3',
        isMainLine: true,
        annotation: '',
        explanation: 'White recaptures, but now has doubled pawns on the c-file. This weakens White\'s structure.',
        arrows: [{ from: 'b2', to: 'c3', color: 'blue' }],
        highlights: ['c3']
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAK! Black strikes at the base of White\'s pawn chain! The c5 pawn challenges White\'s d4 pawn and undermines White\'s entire center. This is the thematic break in the French Defense—it opens lines and creates counterplay.',
        arrows: [
          { from: 'c7', to: 'c5', color: 'green' },
          { from: 'c5', to: 'd4', color: 'red' }
        ],
        highlights: ['c5', 'd4'],
        conceptTag: 'The Break'
      },
      {
        move: 'Qg4',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to attack on the kingside, but Black\'s queenside counterplay is more important.',
        arrows: [{ from: 'd1', to: 'g4', color: 'blue' }]
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to c7, supporting the c5 pawn and preparing to put pressure on White\'s center. Black is coordinating beautifully—the queen, knight, and pawn all work together.',
        arrows: [
          { from: 'd8', to: 'c7', color: 'green' },
          { from: 'c7', to: 'c5', color: 'yellow' }
        ],
        highlights: ['c7'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops the bishop, but Black continues the attack on the center.',
        arrows: [{ from: 'f1', to: 'd3', color: 'blue' }]
      },
      {
        move: 'cxd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing on d4! This opens the c-file and creates pressure on White\'s center. The c5 break is paying dividends—Black has opened lines and activated pieces.',
        arrows: [
          { from: 'c5', to: 'd4', color: 'green' },
          { from: 'c6', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'cxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'White recaptures, but now the c-file is open for Black\'s rooks.',
        arrows: [{ from: 'c3', to: 'd4', color: 'blue' }]
      },
      {
        move: 'Nxd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight captures on d4! This centralizes the knight and puts pressure on White\'s position. The c5 break has opened lines and activated Black\'s pieces.',
        arrows: [
          { from: 'c6', to: 'd4', color: 'green' },
          { from: 'd4', to: 'e2', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Centralization'
      },
      {
        move: 'Qxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures the pawn, but Black has a strong response.',
        arrows: [{ from: 'g4', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Rg8',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to g8, trapping White\'s queen! The c5 break has created so much pressure that White\'s queen is now in danger. This shows the power of the break—it opened lines and created threats everywhere.',
        arrows: [
          { from: 'h8', to: 'g8', color: 'green' },
          { from: 'g8', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g8'],
        conceptTag: 'Tactical Follow-up'
      },
      {
        move: 'Qxh7',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to escape, but Black has more threats.',
        arrows: [{ from: 'g7', to: 'h7', color: 'blue' }]
      },
      {
        move: 'Nf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight moves to f5, creating a discovered attack! The knight on d4 and the rook on g8 combine to create devastating threats. The c5 break has transformed the position completely—Black has a winning attack.',
        arrows: [
          { from: 'd4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'g7', color: 'yellow' },
          { from: 'g8', to: 'g7', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Tactical Combination'
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'White must capture, but Black has a winning position.',
        arrows: [{ from: 'd3', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing with the pawn! Black now has a strong position with open lines, active pieces, and a winning attack. The c5 break has been executed perfectly—it undermined White\'s center, opened lines, and created a devastating attack.',
        arrows: [
          { from: 'e6', to: 'f5', color: 'green' },
          { from: 'g8', to: 'g7', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'The c5 break in the French Defense undermined White\'s center, opened lines, and created a winning attack. By preparing properly (Nc6) and following up correctly (Qc7, cxd4, Nxd4, Rg8, Nf5), Black transformed the position completely. The break was a complete success.',
    
    keyTakeaways: [
      'Prepare the c5 break with proper piece development (Nc6)',
      'The c5 break challenges White\'s d4 pawn and undermines the pawn chain',
      'Follow up by opening lines and activating pieces',
      'Use the break to create queenside counterplay',
      'The c5 break is thematic in the French Defense'
    ],
    
    memoryTip: 'Think of c5 as "challenging the center"—the break undermines White\'s pawn chain and opens lines!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'French Defense Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'pawn-break-g4-kingside-deep',
    category: 'PAWN_BREAKS',
    title: 'The g4 Break on the Kingside',
    subtitle: 'Kingside expansion and attack',
    // Position where g4 break is powerful
    fen: 'r1bq1rk1/pp2bppp/2np1np1/4p3/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Pawn breaks aren\'t just in the center—they can be on the kingside too! The g4 break is a powerful attacking weapon, especially when combined with a kingside attack. It opens lines, creates threats, and can lead to devastating attacks. This pattern shows how to execute and follow up the g4 break.',
    
    keyIdeas: [
      'The g4 break opens lines on the kingside',
      'Creates threats around the enemy king',
      'Often combined with piece attacks',
      'The break can sacrifice material for activity',
      'Follow up immediately with piece activity'
    ],
    
    mainLine: [
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the g4 break! The h3 move prevents ...Bg4 and prepares g4. This is proper preparation.',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'g2', to: 'g4', color: 'yellow' }
        ],
        highlights: ['h3'],
        conceptTag: 'Preparation'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'g4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAK! The g4 pawn advance opens lines on the kingside and creates threats around Black\'s king. This is a powerful attacking move!',
        arrows: [
          { from: 'g2', to: 'g4', color: 'green' },
          { from: 'g4', to: 'g5', color: 'yellow' },
          { from: 'g4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'The Break'
      },
      {
        move: 'g6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to block, but White has more threats.',
        arrows: [{ from: 'g7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'g5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn advances to g5, opening more lines! The g4 break is creating space and opening files for White\'s pieces.',
        arrows: [
          { from: 'g4', to: 'g5', color: 'green' },
          { from: 'g5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Expanding'
      },
      {
        move: 'Nh5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'f6', to: 'h5', color: 'blue' }]
      },
      {
        move: 'Qg4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to g4, joining the attack! Combined with the g4-g5 break, White has a powerful kingside attack.',
        arrows: [
          { from: 'd1', to: 'g4', color: 'green' },
          { from: 'g4', to: 'g6', color: 'yellow' },
          { from: 'g4', to: 'h5', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Queen Attack'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'h5', to: 'f6', color: 'blue' }]
      },
      {
        move: 'gxf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn captures on f6, breaking through! The g4 break has opened lines and created a winning attack.',
        arrows: [{ from: 'g5', to: 'f6', color: 'green' }],
        highlights: ['f6'],
        conceptTag: 'Breakthrough'
      },
      {
        move: 'exf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but the position is now open and White has more threats.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to f3, joining the attack! The g4 break has created the conditions for a powerful attack.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'g3', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Rook Lift'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Rg3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to g3, creating a deadly attack! Combined with the queen on g4 and the open g-file, White has a winning position.',
        arrows: [
          { from: 'f3', to: 'g3', color: 'green' },
          { from: 'g3', to: 'g7', color: 'yellow' },
          { from: 'g4', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g3'],
        conceptTag: 'Winning Attack'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has more threats.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Qh5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h5, creating a mating threat! The g4 break has transformed the position completely—White has a winning attack.',
        arrows: [
          { from: 'g4', to: 'h5', color: 'green' },
          { from: 'h5', to: 'h7', color: 'yellow' }
        ],
        highlights: ['h5'],
        conceptTag: 'Mating Attack'
      },
      {
        move: 'Rg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'f8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures on h6, breaking through! The g4 break has created a winning attack. White has a completely winning position.',
        arrows: [{ from: 'e2', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We prepared the g4 break with h3, then executed it (g4, g5). The break opened lines and created the conditions for a powerful kingside attack with the queen, rook, and bishop all coordinating perfectly. The g4 break led to a winning attack.',
    
    keyTakeaways: [
      'The g4 break opens lines on the kingside',
      'Creates threats around the enemy king',
      'Often combined with piece attacks',
      'The break can sacrifice material for activity',
      'Follow up immediately with piece activity'
    ],
    
    memoryTip: 'Think of the g4 break as "opening the floodgates on the kingside"—once you break, the pieces pour through!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Kingside Attack Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'pawn-break-f5-kingside-deep',
    category: 'PAWN_BREAKS',
    title: 'The f5 Break on the Kingside',
    subtitle: 'Kingside expansion and attack',
    // Position where f5 break is powerful
    fen: 'r1bq1rk1/pp2bppp/2np1np1/4p3/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The f5 break is a powerful attacking weapon on the kingside! It opens lines, creates threats, and can lead to devastating attacks. The f5 break is especially effective when combined with piece attacks. This pattern shows how to execute and follow up the f5 break.',
    
    keyIdeas: [
      'The f5 break opens lines on the kingside',
      'Creates threats around the enemy king',
      'Often combined with piece attacks',
      'The break can sacrifice material for activity',
      'Follow up immediately with piece activity'
    ],
    
    mainLine: [
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the f5 break! The f4 move prepares f5, which will open lines on the kingside.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Preparation'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAK! The f5 pawn advance opens lines on the kingside and creates threats around Black\'s king. This is a powerful attacking move!',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'f6', color: 'yellow' },
          { from: 'f5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'The Break'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens the e-file for White\'s rooks.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the e-file! Now White\'s rooks can penetrate on the kingside. The f5 break has created the breakthrough.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }],
        highlights: ['e1'],
        conceptTag: 'File Opened'
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to e1, entering the open file! The f5 break has opened lines, and White is using them.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e7', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook Activation'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the e-file! The f5 break has created the conditions for a powerful kingside attack. White\'s rooks are perfectly placed.',
        arrows: [
          { from: 'a1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e7', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Doubled Rooks'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Re7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook penetrates to the 7th rank! The f5 break has created a winning breakthrough. White has a completely winning position.',
        arrows: [
          { from: 'e1', to: 'e7', color: 'green' },
          { from: 'e7', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e7'],
        conceptTag: 'Penetration'
      },
      {
        move: 'Rxe7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but White has won material.',
        arrows: [{ from: 'e8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rxe7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won material and has a completely winning position. The f5 break has created a kingside breakthrough that led to material gains.',
        arrows: [{ from: 'f1', to: 'e7', color: 'green' }],
        highlights: ['e7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxe7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd7', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Qxe7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The f5 break has been a complete success—it opened lines, created threats, and led to material gains.',
        arrows: [{ from: 'd1', to: 'e7', color: 'green' }],
        highlights: ['e7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We prepared the f5 break with f4, then executed it (f5). The break opened the e-file and created the conditions for a powerful kingside attack with rooks penetrating (Re1, Rae1, Re7) and winning material. The f5 break led to a winning attack.',
    
    keyTakeaways: [
      'The f5 break opens lines on the kingside',
      'Creates threats around the enemy king',
      'Often combined with piece attacks',
      'The break can sacrifice material for activity',
      'Follow up immediately with piece activity'
    ],
    
    memoryTip: 'Think of the f5 break as "opening the floodgates on the kingside"—once you break, the pieces pour through!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Kingside Attack Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
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

  {
    id: 'king-activity-infiltration-rook-endgame',
    category: 'KING_ACTIVITY',
    title: 'King Infiltration in Rook Endgames',
    subtitle: 'Penetrating enemy territory',
    // Rook endgame position where king infiltration is key
    fen: '8/5k2/1r3p2/3p1p1p/3P1P1P/5P2/5K2/3R4 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In rook endgames, the king is a powerful piece that can infiltrate enemy territory to support the rook and create threats. While the rook controls files and ranks, the active king can penetrate the enemy position, attack pawns, and create winning threats. This pattern shows how to use king infiltration to win rook endgames.',
    
    keyIdeas: [
      'The king can infiltrate enemy territory in rook endgames',
      'An active king supports the rook and creates threats',
      'The king can attack enemy pawns from behind',
      'King infiltration often decides rook endgames',
      'Timing is crucial—infiltrate when safe and supported'
    ],
    
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king begins its infiltration! Moving toward the center and preparing to penetrate Black\'s position. The king is becoming active—this is the first step in infiltration.',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Beginning Infiltration'
      },
      {
        move: 'Rb2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the rook, but White\'s king is on the move.',
        arrows: [{ from: 'b6', to: 'b2', color: 'blue' }]
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves to d4, penetrating deeper into Black\'s position! From d4, the king attacks the d5 pawn and supports White\'s central pawns. The infiltration is working.',
        arrows: [
          { from: 'e3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Penetrating'
      },
      {
        move: 'Rb4+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black checks, trying to drive the king back, but White has a better square.',
        arrows: [{ from: 'b2', to: 'b4', color: 'blue' }]
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves forward, deeper into Black\'s territory! From e5, the king attacks the f5 and f6 pawns and supports White\'s pawns. This is powerful infiltration—the king is now a major attacking force.',
        arrows: [
          { from: 'd4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f5', color: 'yellow' },
          { from: 'e5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Deep Infiltration'
      },
      {
        move: 'Rb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White\'s king is too active.',
        arrows: [{ from: 'b4', to: 'b5', color: 'blue' }]
      },
      {
        move: 'Rd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d3, coordinating with the active king! The rook and king work together—the king attacks pawns while the rook controls files. This is perfect coordination.',
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Rook-King Coordination'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the king, but White has more threats.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Kf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to f6, attacking the f5 pawn directly! This is maximum infiltration—the king is deep in enemy territory, attacking pawns and creating threats. The king and rook are working perfectly together.',
        arrows: [
          { from: 'e5', to: 'f6', color: 'green' },
          { from: 'f6', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Maximum Infiltration'
      },
      {
        move: 'Rb6+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black checks again, but White can move forward.',
        arrows: [{ from: 'b5', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Kg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to g7, attacking the h5 pawn! The king infiltration has reached its peak—the king is deep in enemy territory, attacking multiple pawns. This is winning for White.',
        arrows: [
          { from: 'f6', to: 'g7', color: 'green' },
          { from: 'g7', to: 'h5', color: 'yellow' }
        ],
        highlights: ['g7'],
        conceptTag: 'Peak Infiltration'
      },
      {
        move: 'Rg6+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black checks, but White has a winning response.',
        arrows: [{ from: 'b6', to: 'g6', color: 'blue' }]
      },
      {
        move: 'Kxh5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king captures the h5 pawn! The infiltration has paid off—White has won a pawn and the king is perfectly placed. The king infiltration has been a complete success.',
        arrows: [
          { from: 'g7', to: 'h5', color: 'green' }
        ],
        highlights: ['h5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Rg5+',
        isMainLine: true,
        annotation: '',
        explanation: 'Black checks, but White can escape and maintain the advantage.',
        arrows: [{ from: 'g6', to: 'g5', color: 'blue' }]
      },
      {
        move: 'Kh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves to h6, maintaining the advantage. White has won a pawn through king infiltration and has a winning position.',
        arrows: [
          { from: 'h5', to: 'h6', color: 'green' }
        ],
        highlights: ['h6'],
        conceptTag: 'Maintaining Advantage'
      },
      {
        move: 'Rg4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'g5', to: 'g4', color: 'blue' }]
      },
      {
        move: 'Rd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d5, attacking the d5 pawn! Combined with the active king, White has a winning position. The king infiltration has transformed the position completely—White has material, activity, and a winning attack.',
        arrows: [
          { from: 'd3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'The king infiltrated Black\'s position (Ke3, Kd4, Ke5, Kf6, Kg7), attacked pawns, won material (Kxh5), and created a winning position. King infiltration in rook endgames is a powerful technique that often decides the game.',
    
    keyTakeaways: [
      'In rook endgames, infiltrate with the king when safe',
      'An active king supports the rook and attacks pawns',
      'The king can penetrate deep into enemy territory',
      'King infiltration often wins material and creates threats',
      'Coordinate the king and rook for maximum effect'
    ],
    
    memoryTip: 'Think of king infiltration as "the king goes on a mission"—it penetrates enemy territory to support the rook and win material!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Rook Endgame Technique',
    playerExample: {
      white: 'Vladimir Kramnik',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 2008
    }
  },

  {
    id: 'king-activity-supporting-pawns-deep',
    category: 'KING_ACTIVITY',
    title: 'King Supporting Passed Pawns',
    subtitle: 'The king as a pawn supporter',
    // Endgame position where king supports passed pawns
    fen: '8/5k2/2p5/3p4/3P4/2P5/5K2/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In pawn endgames, the king\'s primary job is to support passed pawns! An active king that supports its pawns can create winning passed pawns and promote them. The king should be in front of or beside the pawn, not behind it. This pattern shows how to use the king to support passed pawns effectively.',
    
    keyIdeas: [
      'The king should support passed pawns from the front or side',
      'A king in front of a passed pawn is extremely powerful',
      'The king can help create passed pawns',
      'King activity often decides pawn endgames',
      'Coordinate the king and pawns for maximum effect'
    ],
    
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves toward the center, preparing to support the d4 pawn. The king is becoming active—this is the first step in supporting the pawn.',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Beginning Support'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also activates the king, but White continues.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves to d3, supporting the d4 pawn from the front! From d3, the king protects the pawn and prepares to advance with it. This is perfect king support.',
        arrows: [
          { from: 'e3', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d3', 'd4'],
        conceptTag: 'Supporting the Pawn'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blockade, but White has more threats.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! With the king on d3 supporting it, the d5 pawn is a powerful passed pawn. The king support has made the pawn unstoppable.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Pawn Advance'
      },
      {
        move: 'Kxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but White has a winning response.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Kxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king captures! White has won a pawn and the king is perfectly placed. The king support has paid off—the pawn advanced and White won material.',
        arrows: [{ from: 'd3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to create counterplay, but White has more advantages.',
        arrows: [{ from: 'c6', to: 'c5', color: 'blue' }]
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to c4, supporting the c3 pawn and attacking the c5 pawn! The active king is creating winning chances.',
        arrows: [
          { from: 'd5', to: 'c4', color: 'green' },
          { from: 'c4', to: 'c5', color: 'yellow' },
          { from: 'c4', to: 'c3', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'King Activity'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'd6', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Kxc5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king captures the c5 pawn! White has won another pawn and has a completely winning position. The king activity has been a complete success.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'More Material'
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has a winning position.',
        arrows: [{ from: 'c6', to: 'b5', color: 'blue' }]
      },
      {
        move: 'c4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! With the king supporting it, the c4 pawn is becoming a powerful passed pawn. The king support has created winning chances.',
        arrows: [
          { from: 'c3', to: 'c4', color: 'green' },
          { from: 'c5', to: 'c4', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Creating Passer'
      },
      {
        move: 'Kb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blockade, but White has more threats.',
        arrows: [{ from: 'b5', to: 'b4', color: 'blue' }]
      },
      {
        move: 'Kb6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to b6, supporting the c4 pawn and preparing to advance. The king support has created a winning passed pawn.',
        arrows: [
          { from: 'c5', to: 'b6', color: 'green' },
          { from: 'b6', to: 'c4', color: 'yellow' }
        ],
        highlights: ['b6'],
        conceptTag: 'Supporting the Passer'
      },
      {
        move: 'Kb3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'b4', to: 'b3', color: 'blue' }]
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! The king support has created a winning passed pawn that will promote. The king activity has transformed the position completely.',
        arrows: [
          { from: 'c4', to: 'c5', color: 'green' },
          { from: 'b6', to: 'c5', color: 'yellow' }
        ],
        highlights: ['c5'],
        conceptTag: 'Winning Passer'
      }
    ],
    
    summary: 'We activated the king to support the d4 pawn (Ke3, Kd3), which allowed the pawn to advance (d5). The king then supported the c3 pawn (Kc4, Kxc5, Kb6), creating a winning passed pawn (c5). King support of passed pawns is essential in pawn endgames.',
    
    keyTakeaways: [
      'The king should support passed pawns from the front or side',
      'A king in front of a passed pawn is extremely powerful',
      'The king can help create passed pawns',
      'King activity often decides pawn endgames',
      'Coordinate the king and pawns for maximum effect'
    ],
    
    memoryTip: 'Think of the king supporting passed pawns as "a bodyguard walking with a VIP"—the king protects and helps the pawn advance!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Endgame Technique',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'king-activity-centralization-deep',
    category: 'KING_ACTIVITY',
    title: 'King Centralization in Endgames',
    subtitle: 'The king as a central force',
    // Endgame position where king centralization is key
    fen: '8/5k2/2p5/3p4/3P4/2P5/5K2/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In endgames, the king should be centralized! A centralized king controls more squares, supports pawns, and can quickly reach both flanks. The king becomes a powerful piece in the endgame. This pattern shows how to centralize the king and use it effectively.',
    
    keyIdeas: [
      'The king should be centralized in endgames',
      'A centralized king controls more squares',
      'The king can support pawns from the center',
      'Centralized kings can quickly reach both flanks',
      'King centralization often decides endgames'
    ],
    
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves toward the center! From e3, it controls more squares and can support the d4 pawn. This is the first step in centralization.',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Beginning Centralization'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White continues.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves to d3, supporting the d4 pawn and controlling key squares. The king is becoming more centralized and powerful.',
        arrows: [
          { from: 'e3', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd4', color: 'yellow' },
          { from: 'd3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Supporting the Pawn'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White has more threats.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to c4, a perfect central square! From c4, it controls many squares, supports the c3 and d4 pawns, and can attack Black\'s pawns. This is maximum centralization!',
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'c3', color: 'yellow' },
          { from: 'c4', to: 'd4', color: 'yellow' },
          { from: 'c4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Maximum Centralization'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counter, but White has more activity.',
        arrows: [{ from: 'd6', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to b5, attacking the c6 pawn! The centralized king is creating winning threats. The centralization has paid off.',
        arrows: [
          { from: 'c4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Attacking the Pawn'
      },
      {
        move: 'Kb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'c6', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Kxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a pawn! The centralized king has won material. The centralization has been a complete success.',
        arrows: [{ from: 'b5', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has won material.',
        arrows: [{ from: 'b7', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Kxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning another pawn! The centralized king has won material and has a completely winning position. The centralization has transformed the position completely.',
        arrows: [{ from: 'c6', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'More Material'
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'c7', to: 'd7', color: 'blue' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! With the centralized king supporting it, the d5 pawn is a powerful passed pawn. The centralization has created winning chances.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Creating Passer'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blockade, but White has a winning position.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to d4, supporting the passed pawn! The centralized king has created a winning passed pawn that will promote. The centralization has been a complete success.',
        arrows: [
          { from: 'd5', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Winning Passer'
      }
    ],
    
    summary: 'We centralized the king (Ke3, Kd3, Kc4), which controlled many squares and supported the pawns. The centralized king created winning threats (Kb5, Kxc6, Kxd5) that led to material gains and a winning passed pawn. King centralization is essential in endgames.',
    
    keyTakeaways: [
      'The king should be centralized in endgames',
      'A centralized king controls more squares',
      'The king can support pawns from the center',
      'Centralized kings can quickly reach both flanks',
      'King centralization often decides endgames'
    ],
    
    memoryTip: 'Think of king centralization as "the king becomes a general in the center"—it controls everything and can strike in any direction!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Technique',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
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
  },

  {
    id: 'centralization-rooks-deep',
    category: 'CENTRALIZATION',
    title: 'Centralizing the Rooks',
    subtitle: 'Rooks on central files',
    // Position where rook centralization is key
    fen: 'r1bq1rk1/pp2bppp/2np1np1/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Rooks are most powerful when placed on central files. A rook on the d-file or e-file controls many squares, supports central pawns, and can quickly switch between attack and defense. Centralized rooks coordinate with other pieces and create powerful threats. This pattern shows how to centralize rooks and use them as dominant forces.',
    
    keyIdeas: [
      'Rooks on central files control many squares',
      'Centralized rooks support central pawns and pieces',
      'Rooks on d-file or e-file can quickly switch flanks',
      'Centralized rooks coordinate with other pieces',
      'Place rooks on open or semi-open central files'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, creating a semi-open d-file. This is perfect for rook centralization.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, centralizing on the d-file! From here, it controls many squares, supports the d4 pawn, and can quickly switch to attack or defense. This is the first step in rook centralization.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Centralization'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized rook is becoming powerful.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the central file. The rooks are perfectly centralized and can create powerful threats. This is maximum rook centralization.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubled Rooks'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes rooks, but White has the initiative.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the centralized rooks and adding pressure to the d5 pawn. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s centralized rooks maintain pressure.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to d2, joining the centralized rooks! White has a powerful battery on the d-file. The queen, rooks, and bishop all work together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Battery Formation'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles rooks, but White has more threats.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d5, the perfect central square! Combined with the centralized rooks, White has complete central domination. The knight, rooks, queen, and bishop all work together.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Total Centralization'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must trade, but White recaptures with advantage.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook captures! White has won the d5 pawn and maintains centralized rooks. The centralization has paid off—White has material and activity.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won the pawn and maintains centralized rooks. The rooks are still perfectly placed on the d-file, controlling the center and creating threats.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Maintaining Centralization'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The centralized rooks have done their job—they controlled the center, supported the attack, and helped win material. This demonstrates the power of rook centralization.',
        arrows: [{ from: 'd2', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We centralized rooks on the d-file (Rfd1, Rad1), creating a powerful battery. The centralized rooks supported the attack, helped win material (Rxd5, Qxd5), and dominated the center. Rook centralization is a powerful technique that creates lasting advantages.',
    
    keyTakeaways: [
      'Place rooks on central files (d-file or e-file)',
      'Centralized rooks control many squares and support central pawns',
      'Doubled rooks on a central file are extremely powerful',
      'Centralized rooks coordinate with other pieces',
      'Rook centralization often leads to material gains'
    ],
    
    memoryTip: 'Think of centralized rooks as "towers in the center"—they control everything and can strike in any direction!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Rook Centralization Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  {
    id: 'centralization-bishops-deep',
    category: 'CENTRALIZATION',
    title: 'Centralizing the Bishops',
    subtitle: 'Bishops on central diagonals',
    // Position where bishop centralization is key
    fen: 'r1bq1rk1/pp2bppp/2np1np1/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Bishops are most powerful when placed on central diagonals! A bishop on a long diagonal (like a1-h8 or a8-h1) controls many squares and can create devastating threats. Centralized bishops coordinate with other pieces and dominate the board. This pattern shows how to centralize bishops and use them as dominant forces.',
    
    keyIdeas: [
      'Bishops on central diagonals control many squares',
      'Long diagonals lead directly to the enemy position',
      'Centralized bishops coordinate with other pieces',
      'Place bishops on crossing diagonals for maximum coverage',
      'Centralized bishops often lead to material gains or attacks'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The dark-squared bishop moves to f4, controlling the long diagonal (a1-h8)! From f4, it controls many squares and supports the center. This is the first step in bishop centralization.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'f4', to: 'h6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Centralization'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized bishop is becoming powerful.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The light-squared bishop moves to d3, controlling the long diagonal (a8-h1)! Now both bishops are on central diagonals, controlling the entire board. This is maximum bishop centralization!',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'a6', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3', 'f4'],
        conceptTag: 'Both Bishops Centralized'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized bishops are too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the centralized bishops. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the center and preparing to attack. White\'s pieces are all working together.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized bishops are creating threats.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop moves to h6, attacking the g7 square! Combined with the light-squared bishop on d3, White has both bishops pointing at the kingside. The centralized bishops are creating a winning attack.',
        arrows: [
          { from: 'f4', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Bishop Attack'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures on g7, breaking through! The centralized bishops have created a winning attack. White has broken through on the kingside.',
        arrows: [{ from: 'h6', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Breakthrough'
      },
      {
        move: 'Kxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but the king is now exposed.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qh6+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen moves to h6, using the light-squared bishop\'s diagonal. The centralized bishops have coordinated perfectly to create a winning attack.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Mating Attack'
      },
      {
        move: 'Kg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has more threats.',
        arrows: [{ from: 'g7', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bxh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The light-squared bishop captures on h7! The centralized bishops have created a devastating attack. White has a completely winning position.',
        arrows: [{ from: 'd3', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Total Domination'
      },
      {
        move: 'Kxh7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but the king is now completely exposed.',
        arrows: [{ from: 'g8', to: 'h7', color: 'blue' }]
      },
      {
        move: 'Qxh7#',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Checkmate! The centralized bishops have created a perfect mating attack. Both bishops controlled key diagonals that led directly to the enemy king. This demonstrates the power of bishop centralization when placed on crossing diagonals.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Checkmate'
      }
    ],
    
    summary: 'We centralized both bishops on central diagonals (Bf4, Bd3), then used them to attack the kingside (Bh6, Bxg7, Bxh7). The centralized bishops coordinated perfectly, controlling key diagonals and creating a winning mating attack. Bishop centralization is devastating when placed on crossing diagonals.',
    
    keyTakeaways: [
      'Bishops on central diagonals control many squares',
      'Long diagonals lead directly to the enemy position',
      'Centralized bishops coordinate with other pieces',
      'Place bishops on crossing diagonals for maximum coverage',
      'Centralized bishops often lead to material gains or attacks'
    ],
    
    memoryTip: 'Think of centralized bishops as "two snipers on long diagonals"—they can strike from far away and control the entire board!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Centralization Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'centralization-knights-deep',
    category: 'CENTRALIZATION',
    title: 'Centralizing the Knights',
    subtitle: 'Knights on central squares',
    // Position where knight centralization is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Centralized knights are extremely powerful! Knights on central squares (d4, d5, e4, e5) control many squares, can quickly reach both flanks, and often become the key to the position. This pattern shows how to centralize knights and use them as dominant forces.',
    
    keyIdeas: [
      'Centralized knights control more squares',
      'Knights on central squares can reach both flanks quickly',
      'Centralized knights coordinate with other pieces',
      'Place knights on central squares (d4, d5, e4, e5)',
      'Centralized knights often lead to material gains or attacks'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE CENTRALIZATION! The knight jumps to d5, a perfect central square! From d5, it controls many squares and can quickly reach both flanks. This is the ideal knight placement.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' },
          { from: 'd5', to: 'b6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'The Centralization'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized knight is already powerful.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The second knight centralizes on e5! Now both knights are on powerful central squares (d5 and e5), controlling many squares together. This is maximum knight centralization!',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'd5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['e5', 'd5'],
        conceptTag: 'Both Knights Centralized'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White\'s centralized knights are too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the centralized knights and adding pressure. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Support'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating with the centralized knights. White\'s pieces are all working together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles rooks, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nxc7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight on d5 captures on c7! The centralized knights have created a winning tactical opportunity. The knight coordination has paid off!',
        arrows: [{ from: 'd5', to: 'c7', color: 'green' }],
        highlights: ['c7'],
        conceptTag: 'Tactical Opportunity'
      },
      {
        move: 'Qxc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but White has won material.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Nxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight on e5 captures on d7! The centralized knights have won material. The knight centralization has been a complete success!',
        arrows: [{ from: 'e5', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c7', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! White has won material and has a completely winning position. The centralized knights have transformed the position completely.',
        arrows: [{ from: 'e2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The centralized knights have been a complete success—they controlled the center, created tactics, and won material.',
        arrows: [{ from: 'd2', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We centralized both knights on central squares (Nd5, Ne5), which controlled many squares and coordinated with other pieces. The centralized knights created winning tactics (Nxc7, Nxd7) that led to material gains. The centralized knights were the key to the position.',
    
    keyTakeaways: [
      'Centralized knights control more squares',
      'Knights on central squares can reach both flanks quickly',
      'Centralized knights coordinate with other pieces',
      'Place knights on central squares (d4, d5, e4, e5)',
      'Centralized knights often lead to material gains or attacks'
    ],
    
    memoryTip: 'Think of centralized knights as "two spiders in the center of their webs"—they control everything and can strike in any direction!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Knight Strategy Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  }
];

export default additionalPatterns;

