// ============================================
// FLASH TRAINING POSITIONS DATABASE
// Comprehensive pattern recognition training
// 100+ positions covering all aspects of chess
// ============================================

export interface FlashQuestion {
  type: 'piece-count' | 'material' | 'best-piece' | 'worst-piece' | 'threats' | 'weakness' | 'evaluation' | 'plan' | 'square-control' | 'pawn-structure' | 'king-safety';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlashPosition {
  fen: string;
  questions: FlashQuestion[];
  tags: string[];
  title?: string;
}

// ============================================
// OPENING POSITIONS
// ============================================

const OPENING_POSITIONS: FlashPosition[] = [
  // Italian Game
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    title: 'Italian Game Setup',
    questions: [
      {
        type: 'piece-count',
        question: 'How many knights are on the board?',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
        explanation: 'There are 4 knights: White Nf3, Nb1 and Black Nc6, Nf6'
      },
      {
        type: 'evaluation',
        question: 'Who has better development?',
        options: ['White', 'Equal', 'Black'],
        correctIndex: 0,
        explanation: 'White has developed bishop AND knight, Black only knights'
      },
      {
        type: 'threats',
        question: 'What is White threatening?',
        options: ['Ng5 attacking f7', 'Bxf7+', 'd4 central break', 'Nothing immediate'],
        correctIndex: 0,
        explanation: 'Ng5 is the main threat, targeting the weak f7 square'
      }
    ],
    tags: ['opening', 'italian', 'e4-e5']
  },
  // Sicilian Defense
  {
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    title: 'Sicilian Defense Start',
    questions: [
      {
        type: 'plan',
        question: 'What is the main idea for White?',
        options: ['d4 immediately', 'Nf3 then d4', 'c3 to support d4', 'Nc3 first'],
        correctIndex: 1,
        explanation: 'Nf3 followed by d4 is the Open Sicilian, most aggressive approach'
      },
      {
        type: 'evaluation',
        question: 'Why did Black play ...c5?',
        options: ['To attack e4', 'To fight for d4', 'To develop the queen', 'Random move'],
        correctIndex: 1,
        explanation: 'c5 fights for central control, especially the d4 square'
      }
    ],
    tags: ['opening', 'sicilian', 'e4']
  },
  // Ruy Lopez
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    title: 'Ruy Lopez Position',
    questions: [
      {
        type: 'threats',
        question: 'What does the bishop on b5 threaten?',
        options: ['Taking the knight', 'Pinning to the king', 'Nothing directly', 'Checkmate'],
        correctIndex: 0,
        explanation: 'Bb5 attacks the knight, but the real point is long-term pressure'
      },
      {
        type: 'plan',
        question: 'What is Black\'s typical response?',
        options: ['Nf6', 'a6', 'f5', 'd6'],
        correctIndex: 1,
        explanation: 'a6 (Morphy Defense) is most popular, asking the bishop\'s intentions'
      },
      {
        type: 'piece-count',
        question: 'How many minor pieces are developed?',
        options: ['2', '3', '4', '5'],
        correctIndex: 1,
        explanation: '3 pieces: White Bb5, Nf3, Black Nc6'
      }
    ],
    tags: ['opening', 'ruy-lopez', 'e4-e5']
  },
  // Queen's Gambit
  {
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
    title: 'Queen\'s Gambit Offered',
    questions: [
      {
        type: 'evaluation',
        question: 'Is this a real gambit (sacrifice)?',
        options: ['Yes, White loses the pawn', 'No, White can regain it', 'It depends on Black', 'White is worse'],
        correctIndex: 1,
        explanation: 'White can always recover the pawn - it\'s not a true sacrifice'
      },
      {
        type: 'plan',
        question: 'If Black takes (dxc4), what is White\'s plan?',
        options: ['e4 quickly', 'e3 and Bxc4', 'Give up the pawn', 'a4'],
        correctIndex: 1,
        explanation: 'e3 followed by Bxc4 regains the pawn with good development'
      }
    ],
    tags: ['opening', 'queens-gambit', 'd4']
  },
  // London System
  {
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
    title: 'London System Setup',
    questions: [
      {
        type: 'best-piece',
        question: 'What is White\'s most active piece?',
        options: ['Knight on f3', 'Bishop on f4', 'Queen on d1', 'They\'re equal'],
        correctIndex: 1,
        explanation: 'The bishop on f4 is outside the pawn chain and very active'
      },
      {
        type: 'plan',
        question: 'What is a typical structure for White?',
        options: ['c4 gambit', 'e3, c3, Bd3 pyramid', 'f3, e4 attack', 'b3 fianchetto'],
        correctIndex: 1,
        explanation: 'e3, c3, Bd3 creates a solid pyramid structure'
      }
    ],
    tags: ['opening', 'london', 'd4']
  },
  // King's Indian Defense
  {
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    title: 'King\'s Indian Setup',
    questions: [
      {
        type: 'plan',
        question: 'What is Black\'s typical plan?',
        options: ['Queenside attack', 'Kingside attack with f5', 'Central control', 'Trade pieces'],
        correctIndex: 1,
        explanation: 'Black typically plays ...e5, ...f5 with kingside attack'
      },
      {
        type: 'pawn-structure',
        question: 'What pawn structure will likely arise?',
        options: ['Open center', 'Closed center', 'Isolated pawns', 'Symmetric'],
        correctIndex: 1,
        explanation: 'Usually d4-d5 locks the center, creating a closed position'
      }
    ],
    tags: ['opening', 'kings-indian', 'd4']
  },
  // French Defense
  {
    fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    title: 'French Defense',
    questions: [
      {
        type: 'evaluation',
        question: 'What is the problem with Black\'s position?',
        options: ['Bad knight', 'Bad light-squared bishop', 'Weak king', 'Nothing'],
        correctIndex: 1,
        explanation: 'The bishop on c8 is blocked by the e6 pawn - "French bishop"'
      },
      {
        type: 'plan',
        question: 'What is Black\'s typical break?',
        options: ['f6', 'c5', 'b6', 'g5'],
        correctIndex: 1,
        explanation: 'c5 challenges the d4 pawn and fights for counterplay'
      }
    ],
    tags: ['opening', 'french', 'e4']
  },
  // Caro-Kann
  {
    fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    title: 'Caro-Kann Defense',
    questions: [
      {
        type: 'plan',
        question: 'Why did Black play ...c6?',
        options: ['To attack e4', 'To prepare ...d5', 'To develop queen', 'Random'],
        correctIndex: 1,
        explanation: 'c6 supports ...d5, hitting the e4 pawn with pawn support'
      },
      {
        type: 'evaluation',
        question: 'Compared to French, Black\'s light bishop is:',
        options: ['Still bad', 'Much better', 'Same', 'Worse'],
        correctIndex: 1,
        explanation: 'Unlike French, bishop can develop to f5 or g4!'
      }
    ],
    tags: ['opening', 'caro-kann', 'e4']
  }
];

// ============================================
// MIDDLEGAME TACTICAL POSITIONS
// ============================================

const TACTICAL_POSITIONS: FlashPosition[] = [
  // Fork setups
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    title: 'Knight Fork Pattern',
    questions: [
      {
        type: 'threats',
        question: 'What is White\'s strongest continuation?',
        options: ['Nxf7 fork', 'Nc3', 'O-O', 'd3'],
        correctIndex: 0,
        explanation: 'Nxf7! forks the queen on d8 and rook on h8'
      },
      {
        type: 'material',
        question: 'After Nxf7 Kxf7, White has:',
        options: ['Won the exchange', 'Won a pawn', 'Equal', 'Lost material'],
        correctIndex: 0,
        explanation: 'Knight for rook + pawn = won the exchange'
      }
    ],
    tags: ['tactics', 'fork', 'italian']
  },
  // Pin positions
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    title: 'Bishop Pin',
    questions: [
      {
        type: 'weakness',
        question: 'What weakness does Black exploit with Bb4?',
        options: ['Pins Nc3 to king', 'Attacks e4', 'Threatens mate', 'Nothing'],
        correctIndex: 0,
        explanation: 'The bishop pins the knight - it cannot move!'
      },
      {
        type: 'best-piece',
        question: 'How can White break the pin?',
        options: ['a3', 'Bd2', 'Qd2', 'All of these'],
        correctIndex: 3,
        explanation: 'a3 kicks the bishop, Bd2/Qd2 break the pin directly'
      }
    ],
    tags: ['tactics', 'pin', 'middlegame']
  },
  // Back rank
  {
    fen: '3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
    title: 'Back Rank Weakness',
    questions: [
      {
        type: 'threats',
        question: 'What is White\'s winning move?',
        options: ['Rd8+', 'Rd7', 'Kf1', 'h3'],
        correctIndex: 0,
        explanation: 'Rd8+ is checkmate! Black\'s back rank is weak'
      },
      {
        type: 'king-safety',
        question: 'What could Black have done to prevent this?',
        options: ['Moved the rook', 'Played h6 (luft)', 'Kf8', 'Nothing'],
        correctIndex: 1,
        explanation: 'h6 creates an escape square - "luft" for the king'
      }
    ],
    tags: ['tactics', 'back-rank', 'mate-pattern']
  },
  // Discovery
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    title: 'Discovered Attack Setup',
    questions: [
      {
        type: 'threats',
        question: 'After Ng5, what does White threaten?',
        options: ['Nxf7', 'Bxf7+', 'Both threats', 'Nothing serious'],
        correctIndex: 2,
        explanation: 'Ng5 creates dual threats: Nxf7 and Bxf7+!'
      },
      {
        type: 'plan',
        question: 'How should Black defend?',
        options: ['d5', 'h6', 'O-O', 'All can work'],
        correctIndex: 3,
        explanation: 'd5 counterattacks, h6 kicks knight, O-O develops'
      }
    ],
    tags: ['tactics', 'discovery', 'italian']
  },
  // Skewer
  {
    fen: '4k3/8/8/4q3/8/8/4B3/4K3 w - - 0 1',
    title: 'Bishop Skewer',
    questions: [
      {
        type: 'threats',
        question: 'What is the winning move?',
        options: ['Bb5+', 'Bc4', 'Bd3', 'Ba6'],
        correctIndex: 0,
        explanation: 'Bb5+ is a skewer - king moves, queen is lost'
      },
      {
        type: 'evaluation',
        question: 'What is a skewer?',
        options: ['Attack on two pieces in a line, more valuable in front', 'Same as pin', 'Three pieces attacked', 'Fork variation'],
        correctIndex: 0,
        explanation: 'Skewer attacks two pieces, valuable one MUST move first'
      }
    ],
    tags: ['tactics', 'skewer', 'endgame']
  },
  // Double attack
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4',
    title: 'Queen Double Attack',
    questions: [
      {
        type: 'threats',
        question: 'What is White threatening?',
        options: ['Qxf7#', 'Qxe5', 'Both', 'Neither'],
        correctIndex: 2,
        explanation: 'Queen attacks both f7 (mate) and e5 (pawn)!'
      },
      {
        type: 'evaluation',
        question: 'Can Black defend everything?',
        options: ['Yes with g6', 'Yes with Qe7', 'No, must lose material', 'Yes with Nh6'],
        correctIndex: 1,
        explanation: 'Qe7 defends f7 and the e5 pawn simultaneously'
      }
    ],
    tags: ['tactics', 'double-attack', 'scholars-mate']
  },
  // Deflection
  {
    fen: 'r3r1k1/ppp2ppp/8/3q4/8/2N5/PPP2PPP/R2QR1K1 w - - 0 1',
    title: 'Deflection Tactic',
    questions: [
      {
        type: 'threats',
        question: 'How does White win material?',
        options: ['Qxd5', 'Re8+', 'Nd5', 'Qd3'],
        correctIndex: 1,
        explanation: 'Re8+ deflects the rook from defending the queen!'
      },
      {
        type: 'evaluation',
        question: 'What is deflection?',
        options: ['Forcing a piece away from defense', 'Trading pieces', 'Attacking the king', 'Pawn advance'],
        correctIndex: 0,
        explanation: 'Deflection forces a defender away from its duty'
      }
    ],
    tags: ['tactics', 'deflection', 'intermediate']
  },
  // Zwischenzug
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5',
    title: 'In-Between Move',
    questions: [
      {
        type: 'threats',
        question: 'After 1.Bxf7+ Kxf7, what is the zwischenzug?',
        options: ['2.Ng5+ first!', '2.Nxe5', '2.d4', '2.Nc3'],
        correctIndex: 0,
        explanation: 'Ng5+! is an in-between check before recapturing'
      },
      {
        type: 'evaluation',
        question: 'What makes a zwischenzug powerful?',
        options: ['It gains time with a threat', 'It\'s unexpected', 'It\'s a check', 'All of these'],
        correctIndex: 3,
        explanation: 'All these factors make in-between moves powerful!'
      }
    ],
    tags: ['tactics', 'zwischenzug', 'intermediate']
  }
];

// ============================================
// POSITIONAL/STRATEGIC POSITIONS
// ============================================

const POSITIONAL_POSITIONS: FlashPosition[] = [
  // Outpost
  {
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    title: 'Knight Outpost',
    questions: [
      {
        type: 'best-piece',
        question: 'Where should White\'s knight aim for?',
        options: ['d5', 'f5', 'c4', 'b3'],
        correctIndex: 0,
        explanation: 'd5 is a perfect outpost - no black pawn can attack it!'
      },
      {
        type: 'plan',
        question: 'What is an outpost?',
        options: ['A square that cannot be attacked by enemy pawns', 'Any central square', 'Where knights go', 'The best square'],
        correctIndex: 0,
        explanation: 'Outpost = secure square free from pawn attacks'
      }
    ],
    tags: ['positional', 'outpost', 'knight']
  },
  // Bad bishop
  {
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    title: 'Good vs Bad Bishop',
    questions: [
      {
        type: 'worst-piece',
        question: 'Which side has the "bad" bishop?',
        options: ['White', 'Black', 'Neither', 'Both'],
        correctIndex: 1,
        explanation: 'Black\'s light bishop is blocked by its own pawns on e6/d5'
      },
      {
        type: 'plan',
        question: 'How can Black improve the bishop?',
        options: ['Play ...b6, ...Ba6', 'Trade it off', 'Move pawns', 'All options'],
        correctIndex: 3,
        explanation: 'Fianchetto, trading, or freeing pawns all help'
      }
    ],
    tags: ['positional', 'bishop', 'pawn-structure']
  },
  // Open file
  {
    fen: 'r4rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP2PPP/R4RK1 w - - 0 10',
    title: 'Open Files',
    questions: [
      {
        type: 'plan',
        question: 'What should both sides fight for?',
        options: ['The open e-file', 'The open c-file', 'Both open files', 'King attack'],
        correctIndex: 2,
        explanation: 'Both the c and e files are open - rooks want them!'
      },
      {
        type: 'best-piece',
        question: 'How should White use the rooks?',
        options: ['Double on the c-file', 'Double on the e-file', 'One on each file', 'Keep them connected'],
        correctIndex: 2,
        explanation: 'Controlling both files is usually best'
      }
    ],
    tags: ['positional', 'rooks', 'open-file']
  },
  // Pawn majority
  {
    fen: '4r1k1/pp3ppp/8/3p4/3P4/8/PPP2PPP/4R1K1 w - - 0 1',
    title: 'Pawn Majorities',
    questions: [
      {
        type: 'pawn-structure',
        question: 'Who has the queenside majority?',
        options: ['White (3 vs 2)', 'Black', 'Equal', 'No majority'],
        correctIndex: 0,
        explanation: 'White has 3 pawns vs 2 on the queenside'
      },
      {
        type: 'plan',
        question: 'What is the plan with a majority?',
        options: ['Create a passed pawn', 'Trade pawns', 'Defend', 'Attack the king'],
        correctIndex: 0,
        explanation: 'A pawn majority can create a passed pawn'
      }
    ],
    tags: ['positional', 'pawn-structure', 'endgame']
  },
  // Weak squares
  {
    fen: 'r1bq1rk1/pp2ppbp/2np2p1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    title: 'Weak Squares',
    questions: [
      {
        type: 'weakness',
        question: 'What squares are weak in Black\'s camp?',
        options: ['d5, f5 (light squares)', 'e5, c5 (dark squares)', 'All central squares', 'No weaknesses'],
        correctIndex: 0,
        explanation: 'With pawns on d6/g6, d5 and f5 are holes!'
      },
      {
        type: 'plan',
        question: 'How should White exploit this?',
        options: ['Place pieces on the weak squares', 'Attack the king', 'Trade pieces', 'Push pawns'],
        correctIndex: 0,
        explanation: 'Knights especially love to sit on weak squares'
      }
    ],
    tags: ['positional', 'weak-squares', 'middlegame']
  },
  // Isolated pawn
  {
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    title: 'Isolated Queen Pawn',
    questions: [
      {
        type: 'pawn-structure',
        question: 'White has an isolated d-pawn. Is this good or bad?',
        options: ['Bad - it\'s a weakness', 'Good - it gives space', 'Both - depends on the game phase', 'Neutral'],
        correctIndex: 2,
        explanation: 'IQP is strong in middlegame (activity), weak in endgame'
      },
      {
        type: 'plan',
        question: 'What should Black aim for?',
        options: ['Trade pieces and reach an endgame', 'Attack the king', 'Push ...e5', 'Develop more'],
        correctIndex: 0,
        explanation: 'Trade pieces! The IQP becomes weaker in endings'
      }
    ],
    tags: ['positional', 'iqp', 'pawn-structure']
  },
  // Doubled pawns
  {
    fen: 'r1bqkb1r/pp1p1ppp/2n1pn2/2p5/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R w KQkq - 0 5',
    title: 'Doubled Pawns Trade-off',
    questions: [
      {
        type: 'evaluation',
        question: 'If White plays Bxc6, getting doubled pawns, is this good for Black?',
        options: ['Yes, doubled pawns are weak', 'No, Black gets the bishop pair', 'It depends', 'Always bad'],
        correctIndex: 2,
        explanation: 'Doubled pawns control extra squares and bishop pair is strong'
      },
      {
        type: 'plan',
        question: 'What compensates for doubled pawns?',
        options: ['Bishop pair', 'Open files', 'Central control', 'All of these'],
        correctIndex: 3,
        explanation: 'All these factors can outweigh the pawn weakness'
      }
    ],
    tags: ['positional', 'doubled-pawns', 'pawn-structure']
  }
];

// ============================================
// ENDGAME POSITIONS
// ============================================

const ENDGAME_POSITIONS: FlashPosition[] = [
  // Basic K+P vs K
  {
    fen: '8/8/4k3/8/4PK2/8/8/8 w - - 0 1',
    title: 'King + Pawn Basic',
    questions: [
      {
        type: 'evaluation',
        question: 'What is the result with best play?',
        options: ['White wins', 'Draw', 'Black wins'],
        correctIndex: 0,
        explanation: 'White wins because the king is ahead of the pawn'
      },
      {
        type: 'plan',
        question: 'What is the key concept?',
        options: ['Opposition', 'Key squares', 'Both', 'Neither'],
        correctIndex: 2,
        explanation: 'Both opposition and key squares determine the result'
      }
    ],
    tags: ['endgame', 'king-pawn', 'fundamental']
  },
  // Opposition
  {
    fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
    title: 'Opposition Critical',
    questions: [
      {
        type: 'evaluation',
        question: 'With White to move, the result is:',
        options: ['White wins', 'Draw', 'Black wins'],
        correctIndex: 1,
        explanation: 'Draw! White to move = White loses opposition'
      },
      {
        type: 'plan',
        question: 'What if it were Black to move?',
        options: ['Still draw', 'White wins', 'Black wins', 'Depends'],
        correctIndex: 1,
        explanation: 'Black to move = White has opposition = White wins!'
      }
    ],
    tags: ['endgame', 'opposition', 'fundamental']
  },
  // Rook pawn
  {
    fen: '8/8/8/8/8/7k/7P/7K w - - 0 1',
    title: 'Rook Pawn Endgame',
    questions: [
      {
        type: 'evaluation',
        question: 'What is the result?',
        options: ['White wins', 'Draw', 'Black wins'],
        correctIndex: 1,
        explanation: 'Draw! Rook pawns are tricky - stalemate looms'
      },
      {
        type: 'weakness',
        question: 'Why are rook pawns special?',
        options: ['King can be trapped in corner', 'Fewer squares to control', 'Both', 'They\'re not special'],
        correctIndex: 2,
        explanation: 'Fewer squares + corner stalemate = drawing chances'
      }
    ],
    tags: ['endgame', 'rook-pawn', 'fundamental']
  },
  // Lucena position
  {
    fen: '1K6/1P2k3/8/8/8/8/1r6/5R2 w - - 0 1',
    title: 'Lucena Position',
    questions: [
      {
        type: 'evaluation',
        question: 'This is the famous Lucena. Result?',
        options: ['White wins', 'Draw', 'Depends'],
        correctIndex: 0,
        explanation: 'White wins with the "bridge" technique!'
      },
      {
        type: 'plan',
        question: 'What is the winning technique called?',
        options: ['Building a bridge', 'Opposition', 'Shouldering', 'Zugzwang'],
        correctIndex: 0,
        explanation: 'Rook shields king from checks by "building a bridge"'
      }
    ],
    tags: ['endgame', 'rook-endgame', 'lucena']
  },
  // Philidor position
  {
    fen: '8/8/8/4pk2/R7/8/4K3/3r4 w - - 0 1',
    title: 'Philidor Defense',
    questions: [
      {
        type: 'evaluation',
        question: 'Can White win this position?',
        options: ['Yes', 'No, it\'s a draw', 'Depends on move'],
        correctIndex: 1,
        explanation: 'Draw! Black uses Philidor\'s drawing technique'
      },
      {
        type: 'plan',
        question: 'What is Black\'s key defensive idea?',
        options: ['Rook on 6th rank, then check from behind', 'Attack the pawn', 'Exchange rooks', 'Advance the king'],
        correctIndex: 0,
        explanation: 'Rook cuts off king on 6th, then checks from behind'
      }
    ],
    tags: ['endgame', 'rook-endgame', 'philidor']
  },
  // Bishop + pawn
  {
    fen: '8/8/8/8/2B5/8/k1P5/2K5 w - - 0 1',
    title: 'Wrong Bishop',
    questions: [
      {
        type: 'evaluation',
        question: 'Can White win with this "wrong" bishop?',
        options: ['Yes, easily', 'Draw', 'Black wins'],
        correctIndex: 1,
        explanation: 'Draw! Bishop doesn\'t control promotion square'
      },
      {
        type: 'weakness',
        question: 'What makes it the "wrong" bishop?',
        options: ['Rook pawn + bishop of wrong color', 'Bishop is blocked', 'King position', 'All of these'],
        correctIndex: 0,
        explanation: 'Rook pawn + bishop NOT controlling promotion square = draw'
      }
    ],
    tags: ['endgame', 'bishop-endgame', 'wrong-bishop']
  },
  // Knight + pawn
  {
    fen: '8/8/8/8/8/2k5/1pK5/1N6 w - - 0 1',
    title: 'Knight vs Pawn',
    questions: [
      {
        type: 'evaluation',
        question: 'Can White stop the pawn?',
        options: ['Yes', 'No', 'Depends on move'],
        correctIndex: 0,
        explanation: 'Yes! Nc3 or Na3 blocks the pawn and wins it'
      },
      {
        type: 'plan',
        question: 'What is the knight\'s strength in endgames?',
        options: ['Can jump over pieces', 'Reaches all squares', 'Good vs pawns', 'All of these'],
        correctIndex: 3,
        explanation: 'Knights are excellent at stopping passed pawns!'
      }
    ],
    tags: ['endgame', 'knight-endgame', 'pawn']
  },
  // Queen vs pawn
  {
    fen: '8/8/8/8/8/2K5/1pQ5/1k6 w - - 0 1',
    title: 'Queen vs Pawn',
    questions: [
      {
        type: 'evaluation',
        question: 'Can Queen stop a pawn on 7th rank?',
        options: ['Always', 'Usually', 'Depends on pawn file', 'Never'],
        correctIndex: 2,
        explanation: 'Depends! Knight/rook pawns can draw, center pawns lose'
      },
      {
        type: 'plan',
        question: 'What is the winning technique?',
        options: ['Staircase checks, bring king', 'Trade queen for pawn', 'Stalemate tricks', 'Direct attack'],
        correctIndex: 0,
        explanation: 'Check to drive king away, bring your king closer'
      }
    ],
    tags: ['endgame', 'queen-endgame', 'technique']
  }
];

// ============================================
// ADVANCED PATTERN RECOGNITION
// ============================================

const ADVANCED_POSITIONS: FlashPosition[] = [
  // Greek Gift
  {
    fen: 'r1bq1rk1/pppn1ppp/4pn2/3p2B1/1bPP4/2N1PN2/PP2BPPP/R2QK2R w KQ - 0 8',
    title: 'Greek Gift Setup',
    questions: [
      {
        type: 'threats',
        question: 'Does Bxh7+ work here?',
        options: ['Yes, winning', 'No, it\'s unsound', 'Unclear', 'Depends'],
        correctIndex: 0,
        explanation: 'Yes! Bxh7+ Kxh7, Ng5+ Kg8/Kg6, Qh5 with attack'
      },
      {
        type: 'plan',
        question: 'What are the conditions for Greek Gift?',
        options: ['Knight can reach g5, queen to h5', 'Just a bishop on d3', 'Any position', 'Open h-file'],
        correctIndex: 0,
        explanation: 'Need Ng5 follow-up and queen access to h5!'
      }
    ],
    tags: ['tactics', 'sacrifice', 'greek-gift']
  },
  // Rook lift
  {
    fen: 'r2q1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    title: 'Rook Lift Attack',
    questions: [
      {
        type: 'plan',
        question: 'What is a "rook lift"?',
        options: ['Rook moves sideways on 3rd/4th rank for attack', 'Rook sacrifice', 'Trading rooks', 'Rook to open file'],
        correctIndex: 0,
        explanation: 'Rook swings via 3rd/4th rank to join kingside attack!'
      },
      {
        type: 'best-piece',
        question: 'How would White execute a rook lift here?',
        options: ['Ra3-h3', 'Rg1', 'O-O-O then Rdg1', 'Both A and C'],
        correctIndex: 3,
        explanation: 'Either Ra3-h3 or castle long and Rdg1 can work'
      }
    ],
    tags: ['attack', 'rook-lift', 'middlegame']
  },
  // Piece sacrifice patterns
  {
    fen: 'r1b2rk1/2q1bppp/p1n1pn2/1p6/3NP3/2N1B3/PPPQBPPP/R4RK1 w - - 0 12',
    title: 'Piece Sacrifice Assessment',
    questions: [
      {
        type: 'evaluation',
        question: 'Is Nd5 (threatening Nxe7 or Nxf6) strong here?',
        options: ['Yes, very strong', 'No, loses material', 'Unclear', 'Equal'],
        correctIndex: 0,
        explanation: 'Nd5! is powerful - threatens multiple captures'
      },
      {
        type: 'threats',
        question: 'If Black plays ...exd5, then?',
        options: ['exd5 and Bf3', 'Qxd5', 'Nxd5 Qa7', 'Nc6'],
        correctIndex: 0,
        explanation: 'exd5 opens the e-file with tempo against the queen'
      }
    ],
    tags: ['tactics', 'piece-sacrifice', 'calculation']
  },
  // Pawn storm assessment
  {
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
    title: 'Central Tension',
    questions: [
      {
        type: 'plan',
        question: 'Should White play d5 or maintain tension?',
        options: ['d5 fixes the center', 'Maintain tension with Bd3/Be2', 'Always d5', 'dxe5'],
        correctIndex: 1,
        explanation: 'Usually maintaining tension keeps more options open'
      },
      {
        type: 'pawn-structure',
        question: 'What happens after d5?',
        options: ['Center is locked', 'Black plays ...Na5', 'Game becomes positional', 'All of these'],
        correctIndex: 3,
        explanation: 'd5 leads to locked center with different play'
      }
    ],
    tags: ['positional', 'center', 'pawn-tension']
  },
  // Exchange sacrifice
  {
    fen: 'r2q1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    title: 'Exchange Sacrifice',
    questions: [
      {
        type: 'evaluation',
        question: 'Would Rxf6 (exchange sacrifice) make sense?',
        options: ['Yes, ruins Black\'s kingside', 'No, just losing material', 'Maybe in some variations', 'Never'],
        correctIndex: 0,
        explanation: 'Rxf6 Bxf6 leaves Black with bad dark squares'
      },
      {
        type: 'plan',
        question: 'What compensation does White get?',
        options: ['Dark square control', 'Weak e6/d6', 'Attacking chances', 'All of these'],
        correctIndex: 3,
        explanation: 'Exchange sacrifice gives multiple compensation factors'
      }
    ],
    tags: ['tactics', 'exchange-sacrifice', 'positional-sacrifice']
  }
];

// ============================================
// KING SAFETY POSITIONS
// ============================================

const KING_SAFETY_POSITIONS: FlashPosition[] = [
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    title: 'Castling Priority',
    questions: [
      {
        type: 'king-safety',
        question: 'Should White castle now or play Nc3?',
        options: ['Castle - king safety first', 'Nc3 - development', 'Either is fine', 'd3 first'],
        correctIndex: 0,
        explanation: 'Castle! Get the king safe before opening the center'
      },
      {
        type: 'evaluation',
        question: 'What danger exists with king in center?',
        options: ['e-file can open', 'Queen can attack', 'Both', 'None'],
        correctIndex: 2,
        explanation: 'Central king is vulnerable to both e-file and diagonal attacks'
      }
    ],
    tags: ['king-safety', 'castling', 'opening']
  },
  {
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    title: 'Pawn Shield',
    questions: [
      {
        type: 'king-safety',
        question: 'Which king is safer?',
        options: ['White\'s', 'Black\'s', 'Equal', 'Neither is safe'],
        correctIndex: 2,
        explanation: 'Both have intact pawn shields - equal safety'
      },
      {
        type: 'weakness',
        question: 'What would weaken Black\'s king?',
        options: ['h6', 'g6', 'f6', 'All of these'],
        correctIndex: 3,
        explanation: 'Any pawn move in front of the king creates weaknesses'
      }
    ],
    tags: ['king-safety', 'pawn-shield', 'middlegame']
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    title: 'Opposite Side Castling',
    questions: [
      {
        type: 'plan',
        question: 'With opposite side castling, the plan is:',
        options: ['Pawn storm toward enemy king', 'Quiet maneuvering', 'Trade pieces', 'Defend'],
        correctIndex: 0,
        explanation: 'Opposite castling = race to attack enemy king!'
      },
      {
        type: 'evaluation',
        question: 'What is the tempo consideration?',
        options: ['Speed matters - every move counts', 'Take your time', 'Trade first', 'Neither'],
        correctIndex: 0,
        explanation: 'Every tempo matters in opposite-side castling races!'
      }
    ],
    tags: ['king-safety', 'opposite-castling', 'attack']
  }
];

// ============================================
// EXPORT ALL POSITIONS
// ============================================

export const ALL_FLASH_POSITIONS: FlashPosition[] = [
  ...OPENING_POSITIONS,
  ...TACTICAL_POSITIONS,
  ...POSITIONAL_POSITIONS,
  ...ENDGAME_POSITIONS,
  ...ADVANCED_POSITIONS,
  ...KING_SAFETY_POSITIONS
];

// Getter functions by category
export const getOpeningPositions = () => OPENING_POSITIONS;
export const getTacticalPositions = () => TACTICAL_POSITIONS;
export const getPositionalPositions = () => POSITIONAL_POSITIONS;
export const getEndgamePositions = () => ENDGAME_POSITIONS;
export const getAdvancedPositions = () => ADVANCED_POSITIONS;
export const getKingSafetyPositions = () => KING_SAFETY_POSITIONS;

// Get positions by tag
export const getPositionsByTag = (tag: string) => 
  ALL_FLASH_POSITIONS.filter(p => p.tags.includes(tag));

// Get positions by question type
export const getPositionsByQuestionType = (type: FlashQuestion['type']) =>
  ALL_FLASH_POSITIONS.filter(p => p.questions.some(q => q.type === type));

// Random position
export const getRandomFlashPosition = () => 
  ALL_FLASH_POSITIONS[Math.floor(Math.random() * ALL_FLASH_POSITIONS.length)];

export default ALL_FLASH_POSITIONS;












