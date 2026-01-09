// ============================================
// ENHANCED POSITIONAL PATTERNS - MOVETRAINER FORMAT
// Dense, educational content with full move sequences
// ============================================

import type { PatternType } from '@/lib/types';

export type PositionalCategory = 
  | 'OUTPOSTS'
  | 'WEAK_PAWNS'
  | 'PAWN_STRUCTURE'
  | 'OPEN_FILES'
  | 'BISHOP_PAIR'
  | 'GOOD_BAD_BISHOP'
  | 'KNIGHT_PLACEMENT'
  | 'SPACE_ADVANTAGE'
  | 'PIECE_COORDINATION'
  | 'PROPHYLAXIS'
  | 'MINORITY_ATTACK'
  | 'PAWN_BREAKS'
  | 'KING_ACTIVITY'
  | 'EXCHANGE_STRATEGY'
  | 'BLOCKADE'
  | 'CENTRALIZATION';

// Each move in the line has annotations
export interface AnnotatedMove {
  move: string;           // The move in algebraic notation (e.g., "e5")
  isMainLine: boolean;    // Is this the main line or a variation?
  annotation: string;     // Brief move annotation (e.g., "!", "!!", "?!")
  explanation: string;    // Detailed explanation of why this move
  arrows?: Array<{        // Arrows to show on board
    from: string;
    to: string;
    color?: string;       // Default: green for good, red for bad
  }>;
  highlights?: string[];  // Squares to highlight
  alternativeMoves?: {    // Other moves considered
    move: string;
    evaluation: string;   // "good" | "better" | "equal" | "dubious" | "bad"
    explanation: string;
  }[];
  conceptTag?: string;    // Quick concept label (e.g., "Outpost", "Prophylaxis")
}

// A chapter contains related patterns
export interface PatternChapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  patterns: EnhancedPattern[];
}

export interface EnhancedPattern {
  id: string;
  category: PositionalCategory;
  title: string;
  subtitle?: string;
  fen: string;                    // Starting position
  toMove: 'white' | 'black';
  
  // The teaching content
  introduction: string;           // What we'll learn
  keyIdeas: string[];             // Main concepts demonstrated
  
  // The main line with full annotations
  mainLine: AnnotatedMove[];
  
  // Optional sidelines to teach
  variations?: {
    afterMove: number;            // After which main line move this branches
    moves: AnnotatedMove[];
  }[];
  
  // Summary and reinforcement
  summary: string;
  keyTakeaways: string[];
  
  // Memory anchors
  memoryTip?: string;             // A memorable way to remember this
  practicePositions?: string[];   // Related FENs to practice
  
  // Metadata
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  source?: string;
  playerExample?: {
    white: string;
    black: string;
    event?: string;
    year?: number;
  };
  themes?: PatternType[];
}

// ============================================
// CATEGORY METADATA
// ============================================

export const categoryInfo: Record<PositionalCategory, { 
  name: string; 
  description: string; 
  icon: string;
  masterQuote?: { text: string; author: string };
  chapters: number;
}> = {
  OUTPOSTS: {
    name: 'Outposts',
    description: 'An outpost is a square that cannot be attacked by enemy pawns. Knights thrive on outposts, becoming permanent features that dominate the position.',
    icon: '🏰',
    masterQuote: { 
      text: 'A knight on e5 is worth a whole pawn.', 
      author: 'Siegbert Tarrasch' 
    },
    chapters: 5
  },
  WEAK_PAWNS: {
    name: 'Weak Pawns',
    description: 'Isolated, doubled, and backward pawns are chronic weaknesses. Learn to attack them systematically while defending your own structure.',
    icon: '⚔️',
    masterQuote: { 
      text: 'Pawns are the soul of chess.', 
      author: 'François-André Philidor' 
    },
    chapters: 4
  },
  PAWN_STRUCTURE: {
    name: 'Pawn Structure',
    description: 'The pawn skeleton determines piece placement and long-term plans. Master common structures like the IQP, Carlsbad, and Hedgehog.',
    icon: '🏗️',
    masterQuote: { 
      text: 'The pawns are the soul of chess.', 
      author: 'Philidor' 
    },
    chapters: 6
  },
  OPEN_FILES: {
    name: 'Open Files & Diagonals',
    description: 'Control of open lines is crucial. Rooks belong on open files, bishops on open diagonals. Penetration to the 7th rank is often decisive.',
    icon: '↕️',
    masterQuote: { 
      text: 'Rooks on the seventh rank are pigs.', 
      author: 'Mikhail Tal' 
    },
    chapters: 4
  },
  BISHOP_PAIR: {
    name: 'Bishop Pair',
    description: 'Two bishops working together are stronger than bishop + knight in open positions. Learn to leverage this powerful advantage.',
    icon: '⚡',
    masterQuote: { 
      text: 'The bishop pair is worth half a pawn.', 
      author: 'Hans Berliner' 
    },
    chapters: 3
  },
  GOOD_BAD_BISHOP: {
    name: 'Good vs Bad Bishop',
    description: 'A bishop blocked by its own pawns is "bad". Learn to identify, improve, or exchange bad bishops while exploiting your opponent\'s.',
    icon: '🎭',
    masterQuote: { 
      text: 'Bad bishops defend good pawns.', 
      author: 'Bent Larsen' 
    },
    chapters: 4
  },
  KNIGHT_PLACEMENT: {
    name: 'Knight Placement',
    description: 'Knights need strong squares. On the rim they\'re dim. In the center they\'re powerful. On outposts they\'re monsters.',
    icon: '🐴',
    masterQuote: { 
      text: 'A knight on the rim is dim.', 
      author: 'Chess Proverb' 
    },
    chapters: 4
  },
  SPACE_ADVANTAGE: {
    name: 'Space Advantage',
    description: 'More space means more room for your pieces and less for your opponent. Learn to gain, use, and maintain space advantages.',
    icon: '🌍',
    masterQuote: { 
      text: 'Space is the final frontier.', 
      author: 'Aron Nimzowitsch' 
    },
    chapters: 4
  },
  PIECE_COORDINATION: {
    name: 'Piece Coordination',
    description: 'Pieces working together are more than the sum of their parts. Harmony creates threats; disharmony creates weakness.',
    icon: '🤝',
    masterQuote: { 
      text: 'The whole is greater than the sum of its parts.', 
      author: 'Aristotle' 
    },
    chapters: 4
  },
  PROPHYLAXIS: {
    name: 'Prophylaxis',
    description: 'Before executing your plan, stop your opponent\'s plan. Prophylactic thinking separates masters from amateurs.',
    icon: '🛡️',
    masterQuote: { 
      text: 'Do not what you want; do what your opponent does not want.', 
      author: 'Tigran Petrosian' 
    },
    chapters: 5
  },
  MINORITY_ATTACK: {
    name: 'Minority Attack',
    description: 'Attack the enemy pawn majority with fewer pawns to create weaknesses. A classic strategy in the Queen\'s Gambit Declined.',
    icon: '🎯',
    masterQuote: { 
      text: 'Less is more when attacking pawns.', 
      author: 'José Raúl Capablanca' 
    },
    chapters: 3
  },
  PAWN_BREAKS: {
    name: 'Pawn Breaks',
    description: 'Well-timed pawn breaks open lines, create weaknesses, and change the nature of the position. The timing is everything.',
    icon: '💥',
    masterQuote: { 
      text: 'When you see a good move, look for a better one.', 
      author: 'Emanuel Lasker' 
    },
    chapters: 4
  },
  KING_ACTIVITY: {
    name: 'King Activity',
    description: 'In the endgame, the king transforms from a liability to a fighting piece. Centralize it early and use it actively.',
    icon: '👑',
    masterQuote: { 
      text: 'The king is a fighting piece—use it!', 
      author: 'Wilhelm Steinitz' 
    },
    chapters: 4
  },
  EXCHANGE_STRATEGY: {
    name: 'Exchange Strategy',
    description: 'Knowing when to trade pieces is crucial. Trade when ahead, trade attackers when defending, keep pieces when attacking.',
    icon: '🔄',
    masterQuote: { 
      text: 'Every exchange must be considered on its own merits.', 
      author: 'Anatoly Karpov' 
    },
    chapters: 4
  },
  BLOCKADE: {
    name: 'Blockade',
    description: 'Stop enemy passed pawns and restrict enemy pieces by placing pieces in their path. The knight is the ideal blockader.',
    icon: '🚫',
    masterQuote: { 
      text: 'First restrain, then blockade, then destroy.', 
      author: 'Aron Nimzowitsch' 
    },
    chapters: 3
  },
  CENTRALIZATION: {
    name: 'Centralization',
    description: 'Control the center and your pieces radiate power. A piece in the center can move to any part of the board.',
    icon: '🎪',
    masterQuote: { 
      text: 'He who controls the center controls the game.', 
      author: 'Wilhelm Steinitz' 
    },
    chapters: 4
  }
};

// ============================================
// ENHANCED PATTERNS DATA
// ============================================

const baseEnhancedPatterns: EnhancedPattern[] = [
  // ============================================
  // OUTPOSTS - CHAPTER 1: KNIGHT OUTPOSTS
  // ============================================
  {
    id: 'outpost-knight-d5',
    category: 'OUTPOSTS',
    title: 'The Classic d5 Outpost',
    subtitle: 'Establishing a permanent knight on d5',
    // Sicilian Dragon-like structure where d5 is a permanent hole
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The d5 square is a permanent weakness in Black\'s position—no pawn can ever attack it since the e-pawn is on e7 and the c-pawn has moved. We\'ll learn how to occupy this square with a knight that becomes a monster, then exploit the outpost to build a winning attack.',
    
    keyIdeas: [
      'Identify squares that cannot be attacked by pawns (holes)',
      'Knights are the ideal piece for outposts—they control 8 squares regardless of blocking',
      'An established knight restricts all enemy pieces',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a launching pad for further operations'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to the dream square! On d5, it cannot be driven away by any pawn. This knight controls c7, e7, b6, f6, b4, and f4—dominating the entire board. This is the ideal outpost.',
        arrows: [
          { from: 'f3', to: 'd4', color: 'yellow' },
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Outpost Occupation'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black feels compelled to trade off this monster knight. Leaving it there would be unbearable—it attacks c7, controls e7, and cramps Black\'s entire position.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }],
        conceptTag: 'Forced Trade'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing toward the center! The d5-pawn is now a powerful wedge that restricts Black\'s pieces. The c6-knight has no good squares and Black\'s position is cramped.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d5', 'c6'],
        conceptTag: 'Pawn Wedge'
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the knight, but White has a powerful response. The knight on e5 looks active but White can challenge it.',
        arrows: [{ from: 'c6', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Nxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Exchanging knights. White simplifies while maintaining the powerful d5 pawn wedge.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }]
      },
      {
        move: 'Bxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the bishop, developing it to an active square.',
        arrows: [{ from: 'g7', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Challenging Black\'s active bishop! White offers to trade, knowing that after the exchange, the d5 pawn will be even more powerful with open lines.',
        arrows: [{ from: 'c1', to: 'f4', color: 'green' }, { from: 'f4', to: 'e5', color: 'yellow' }],
        highlights: ['f4'],
        conceptTag: 'Piece Exchange'
      },
      {
        move: 'Bxf4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black exchanges. Declining would leave the bishop misplaced.',
        arrows: [{ from: 'e5', to: 'f4', color: 'blue' }]
      },
      {
        move: 'Qxf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures on an active square! Now White has a dominant queen, the d5 pawn wedge, and better piece coordination. The d5 pawn severely limits Black\'s counterplay.',
        arrows: [{ from: 'd1', to: 'f4', color: 'green' }],
        highlights: ['f4', 'd5'],
        conceptTag: 'Queen Activation'
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the d5 pawn, but this weakens the d6 and f6 squares.',
        arrows: [{ from: 'e7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'dxe6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Taking en passant! This opens the d-file and creates a passed pawn. White\'s position is now overwhelming.',
        arrows: [{ from: 'd5', to: 'e6', color: 'green' }],
        highlights: ['e6'],
        conceptTag: 'Pawn Breakthrough'
      },
      {
        move: 'Bxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture to avoid a dangerous passed pawn.',
        arrows: [{ from: 'c8', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Rfe1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Targeting the bishop on the open file! The rook enters the game with tempo, attacking the e6 bishop. White has converted the outpost advantage into active piece play.',
        arrows: [{ from: 'f1', to: 'e1', color: 'green' }, { from: 'e1', to: 'e6', color: 'yellow' }],
        highlights: ['e1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the bishop while eyeing counterplay.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks! White\'s position is dominant. The outpost occupation led to trades that favored White, creating lasting pressure. This is the power of outposts—they provide permanent advantages that transform into winning attacks.',
        arrows: [{ from: 'a1', to: 'd1', color: 'green' }],
        highlights: ['d1', 'e1'],
        conceptTag: 'Piece Coordination'
      }
    ],
    
    summary: 'A knight on an outpost is a permanent asset that restricts the opponent. Even when the knight is traded, the resulting pawn structure often favors the side that had the outpost. In this game, Nd5 forced trades that left White with superior piece activity and a lasting initiative.',
    
    keyTakeaways: [
      'Look for squares that cannot be attacked by enemy pawns—these are outposts',
      'Occupy outposts with knights—they control 8 squares regardless of blocking pieces',
      'A knight outpost often forces trades that favor the attacker',
      'Even when the knight is traded, you often get a powerful passed pawn or better pieces',
      'Use the outpost as a base for further operations—don\'t just sit there!'
    ],
    
    memoryTip: 'Think of an outpost knight as a "thorn in the side"—once there, it\'s painful and permanent!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Classical Middlegame Concept',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1966
    }
  },

  // ============================================
  // OUTPOSTS - CHAPTER 2: CREATING OUTPOSTS
  // ============================================

  // ============================================
  // OUTPOSTS - CHAPTER 3: THE E5 OUTPOST IN SICILIAN
  // ============================================
  {
    id: 'outpost-e5-sicilian-deep',
    category: 'OUTPOSTS',
    title: 'The e5 Outpost in Sicilian Defense',
    subtitle: 'Dominating from the central outpost',
    // Sicilian structure where e5 is a permanent outpost
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3pN3/2PP4/2N1B3/PP2BPPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    
    introduction: 'In the Sicilian Defense, the e5 square often becomes a permanent outpost for White\'s knight. Once established, a knight on e5 cannot be driven away by pawns and controls critical central squares, often becoming the focal point of White\'s entire strategy. This pattern shows how to establish, maintain, and exploit the e5 outpost.',
    
    keyIdeas: [
      'The e5 square is immune to pawn attacks in Sicilian structures',
      'A knight on e5 controls 8 squares, including f7 and d7',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for kingside attacks',
      'The e5 knight often forces favorable trades'
    ],
    
    mainLine: [
      {
        move: 'Nf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops to f3, preparing to jump to e5. This is the first step in establishing the outpost.',
        arrows: [
          { from: 'g1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'e5', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop, but White\'s plan continues.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight lands on e5, a square that cannot be attacked by any Black pawn. From here it controls f7, d7, c6, g6, and f3—dominating the entire board. This is the dream square!',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'The Outpost'
      },
      {
        move: 'Nxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black feels compelled to trade off this powerful knight. But this comes at a cost—White will recapture with the d-pawn, creating a powerful central pawn.',
        arrows: [{ from: 'f6', to: 'e5', color: 'blue' }],
        conceptTag: 'Forced Trade'
      },
      {
        move: 'dxe5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the d-pawn! The e5 pawn is now a powerful central wedge that restricts Black\'s pieces and creates new outpost opportunities.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Central Pawn'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black activates the queen, but White continues building pressure.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the e5 pawn. White\'s position is harmonious and strong.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'e5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black centralizes the rook, but White has a strong response.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!',
        explanation: 'White doubles rooks on the d-file! This adds pressure to Black\'s position and supports the central e5 pawn.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the center, but White maintains control.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting the e5 pawn and preparing f5! This advance will open lines and create attacking chances. The outpost has given White the initiative.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Pawn Storm'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black seeks counterplay, but White\'s attack is building.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The breakthrough! This opens the f-file and creates devastating threats. The e5 outpost has been the foundation for this entire attack.',
        arrows: [{ from: 'f4', to: 'f5', color: 'green' }],
        highlights: ['f5'],
        conceptTag: 'The Breakthrough'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but this opens the e-file for White\'s rooks.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook lifts to the third rank! Combined with the open f-file and the central e5 pawn, White has a winning attack. This is the power of the e5 outpost—it creates lasting advantages that lead to decisive attacks.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Rook Lift'
      }
    ],
    
    summary: 'The e5 outpost in the Sicilian Defense is one of the most powerful strategic weapons. Once established, it cannot be driven away and becomes the foundation for attacks on both flanks. Even when traded, the resulting pawn structure often favors White.',
    
    keyTakeaways: [
      'The e5 square is a permanent outpost in many Sicilian structures',
      'A knight on e5 controls critical squares and restricts Black\'s pieces',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for further operations',
      'Even when traded, the resulting pawn structure is often favorable'
    ],
    
    memoryTip: 'Think of e5 as the "command center"—from there, the knight controls the entire battlefield!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Sicilian Defense Strategy',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // OUTPOSTS - CHAPTER 4: THE C5 QUEENSIDE OUTPOST
  // ============================================
  {
    id: 'outpost-c5-queenside-deep',
    category: 'OUTPOSTS',
    title: 'The c5 Queenside Outpost',
    subtitle: 'Dominating from the queenside',
    // Position where c5 is a powerful outpost
    fen: 'r1bq1rk1/pp1n1ppp/2n1pb2/2p5/2P1P3/2N2N2/PP1QBPPP/R2R1BK1 w - - 0 11',
    toMove: 'white',
    
    introduction: 'Outposts aren\'t just in the center—they can be on the queenside too! The c5 square is a powerful outpost in many positions, especially when Black has pawns on b7 and d6. A knight on c5 attacks key squares and cannot be driven away by pawns. This pattern shows how to establish and exploit a queenside outpost.',
    
    keyIdeas: [
      'Queenside outposts (c5 for White, c4 for Black) are powerful',
      'The c5 square attacks b7, d7, e6, and a6',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for queenside operations',
      'Queenside outposts often lead to material gains'
    ],
    
    mainLine: [
      {
        move: 'Na4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight begins its journey to c5! From a4, it prepares to jump to c5, the perfect queenside outpost.',
        arrows: [
          { from: 'c3', to: 'a4', color: 'green' },
          { from: 'a4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nc5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight lands on c5, a square that cannot be attacked by any Black pawn. From here it attacks b7, d7, e6, and a6—dominating the queenside!',
        arrows: [
          { from: 'a4', to: 'c5', color: 'green' },
          { from: 'c5', to: 'b7', color: 'yellow' },
          { from: 'c5', to: 'd7', color: 'yellow' },
          { from: 'c5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['c5'],
        conceptTag: 'The Outpost'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the knight, but White has a strong response.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting the outpost! The b4 pawn prevents Black from challenging the knight with ...b6. The outpost is now secure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['b4', 'c5'],
        conceptTag: 'Supporting the Outpost'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White continues building pressure.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Qb3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to b3, supporting the outpost and adding pressure to the queenside. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'e2', to: 'b3', color: 'green' },
          { from: 'b3', to: 'b7', color: 'yellow' }
        ],
        highlights: ['b3'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to c1, piling up on the c-file! Combined with the knight on c5, White has overwhelming pressure on the queenside.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c7', color: 'yellow' }
        ],
        highlights: ['c1'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Rc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'c8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Nxb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The outpost knight strikes, capturing the b7 pawn. The outpost has paid off!',
        arrows: [{ from: 'c5', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c7', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Qxb7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White has won a pawn and has a completely winning position. The c5 outpost has been a complete success.',
        arrows: [{ from: 'b3', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White maintains the advantage.',
        arrows: [{ from: 'c7', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Rxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the bishop! White has won material and has a completely winning endgame. The queenside outpost on c5 has transformed the position completely.',
        arrows: [{ from: 'c1', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We established a knight on the c5 outpost, supported it with b4, and piled up pieces (Qb3, Rac1) to attack the queenside. The outpost knight eventually captured the b7 pawn, leading to material gains. This demonstrates the power of queenside outposts—they can be just as effective as central outposts.',
    
    keyTakeaways: [
      'Queenside outposts (c5 for White) are powerful strategic weapons',
      'The c5 square attacks multiple key squares (b7, d7, e6)',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for queenside operations',
      'Queenside outposts often lead to material gains'
    ],
    
    memoryTip: 'Think of the c5 outpost as a "queenside command center"—from there, the knight controls the entire queenside!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Queenside Strategy',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'outpost-f5-kingside-deep',
    category: 'OUTPOSTS',
    title: 'The f5 Kingside Outpost',
    subtitle: 'Dominating from the kingside',
    // Position where f5 is a powerful outpost
    fen: 'r1bq1rk1/pp2bppp/2np1np1/4p3/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Outposts aren\'t just in the center or queenside—they can be on the kingside too! The f5 square is a powerful outpost in many positions, especially when Black has pawns on e6 and g6. A knight on f5 attacks key squares around the king and cannot be driven away by pawns. This pattern shows how to establish and exploit a kingside outpost.',
    
    keyIdeas: [
      'Kingside outposts (f5 for White, f4 for Black) are powerful',
      'The f5 square attacks g7, h6, e7, and d6',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for kingside attacks',
      'Kingside outposts often lead to mating attacks'
    ],
    
    mainLine: [
      {
        move: 'Nh4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight begins its journey to f5! From h4, it prepares to jump to f5, the perfect kingside outpost.',
        arrows: [
          { from: 'f3', to: 'h4', color: 'green' },
          { from: 'h4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['h4'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight lands on f5, a square that cannot be attacked by any Black pawn. From here it attacks g7, h6, e7, and d6—dominating the kingside and creating threats around the king!',
        arrows: [
          { from: 'h4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'g7', color: 'yellow' },
          { from: 'f5', to: 'h6', color: 'yellow' },
          { from: 'f5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['f5', 'g7', 'h6'],
        conceptTag: 'The Perfect Outpost'
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to eliminate the outpost, but White recaptures with advantage.',
        arrows: [{ from: 'e7', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the pawn! The f5 pawn now occupies the outpost square, maintaining pressure on the kingside. The outpost has been transformed into a pawn wedge.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }],
        highlights: ['f5'],
        conceptTag: 'Pawn Wedge'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a strong position.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qg4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to g4, joining the attack on the kingside! Combined with the f5 pawn, White has a powerful attack.',
        arrows: [
          { from: 'd1', to: 'g4', color: 'green' },
          { from: 'g4', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Queen Attack'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to d3, supporting the f5 pawn and adding pressure to the kingside. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'f5', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to f3, joining the attack! White has a powerful battery on the f-file. The kingside outpost has created the conditions for a winning attack.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f5', color: 'yellow' },
          { from: 'f3', to: 'g3', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Rook Lift'
      },
      {
        move: 'Qe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'd7', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rg3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to g3, creating a deadly attack! Combined with the queen on g4 and the f5 pawn, White has a winning position. The kingside outpost has been a complete success.',
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
        explanation: 'The queen moves to h5, creating a mating threat! The kingside outpost has transformed the position completely—White has a winning attack.',
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
        explanation: 'The bishop captures on h6, breaking through! The kingside outpost has created a winning attack. White has a completely winning position.',
        arrows: [{ from: 'd3', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We established a knight on the f5 outpost, which was then transformed into a pawn wedge. The outpost created the conditions for a powerful kingside attack with the queen, rook, and bishop all coordinating perfectly. The kingside outpost led to a winning attack.',
    
    keyTakeaways: [
      'Kingside outposts (f5 for White) are powerful attacking weapons',
      'The f5 square attacks multiple key squares around the king',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for kingside attacks',
      'Kingside outposts often lead to mating attacks'
    ],
    
    memoryTip: 'Think of the f5 outpost as a "kingside command center"—from there, the knight controls the entire kingside and creates threats around the king!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Kingside Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'outpost-e6-deep-penetration',
    category: 'OUTPOSTS',
    title: 'The e6 Deep Penetration',
    subtitle: 'Knight deep in enemy territory',
    // Position where e6 is a powerful outpost
    fen: 'r1bq1rk1/pp2bppp/2np1np1/4p3/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The e6 square is one of the most powerful outposts in chess! A knight on e6 is deep in enemy territory, attacking multiple pieces and severely cramping the opponent. The e6 square attacks b7, f7, d8, and c7 simultaneously. This pattern shows how to establish and exploit the e6 outpost.',
    
    keyIdeas: [
      'e6 attacks b7, f7, d8, and c7 simultaneously',
      'Knights on the 6th rank paralyze the opponent',
      'Prepare the jump with proper piece development',
      'Even sacrificing material for e6 is often worth it',
      'The e6 outpost often leads to material gains'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to d5, preparing to reach e6! From d5, it threatens both c7 and e6. This is the first step toward the e6 outpost.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'e6', color: 'yellow' },
          { from: 'd5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ne6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight lands on e6, one of the most powerful squares on the board! From e6, it attacks b7, f7, d8, and c7—paralyzing Black\'s entire position. This is a devastating outpost!',
        arrows: [
          { from: 'd5', to: 'e6', color: 'green' },
          { from: 'e6', to: 'b7', color: 'yellow' },
          { from: 'e6', to: 'f7', color: 'yellow' },
          { from: 'e6', to: 'd8', color: 'yellow' },
          { from: 'e6', to: 'c7', color: 'yellow' }
        ],
        highlights: ['e6', 'b7', 'f7', 'd8', 'c7'],
        conceptTag: 'The Perfect Outpost'
      },
      {
        move: 'Bxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to eliminate the outpost, but White recaptures with advantage.',
        arrows: [{ from: 'd7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'fxe6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the f-pawn! The e6 pawn now occupies the outpost square, maintaining pressure. The outpost has been transformed into a pawn wedge.',
        arrows: [{ from: 'f2', to: 'e6', color: 'green' }],
        highlights: ['e6'],
        conceptTag: 'Pawn Wedge'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a strong position.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the e6 pawn and preparing to attack. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building pressure.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding pressure to the e6 pawn and controlling key squares. White\'s pieces are all working together.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Support'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, supporting the e6 pawn and adding pressure. White has complete control of the e6 outpost.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces attacking.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the e6 outpost and the d-file. The outpost has created the conditions for a winning attack.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'd7', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading rooks! White has complete control and can now penetrate. The e6 outpost has created a winning position.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }],
        highlights: ['d8'],
        conceptTag: 'Penetration'
      },
      {
        move: 'Qxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has more threats.',
        arrows: [{ from: 'e8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qxd8',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The e6 outpost has transformed the position completely—it created pressure, opened lines, and led to material gains.',
        arrows: [{ from: 'd2', to: 'd8', color: 'green' }],
        highlights: ['d8'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We established a knight on the e6 outpost (Nd5, Ne6), which was then transformed into a pawn wedge. The outpost created pressure that allowed White to pile up pieces and win material. The e6 outpost is one of the most powerful squares in chess.',
    
    keyTakeaways: [
      'e6 attacks b7, f7, d8, and c7 simultaneously',
      'Knights on the 6th rank paralyze the opponent',
      'Prepare the jump with proper piece development',
      'Even sacrificing material for e6 is often worth it',
      'The e6 outpost often leads to material gains'
    ],
    
    memoryTip: 'Think of the e6 outpost as "a knight in the enemy\'s command center"—it attacks everything and paralyzes the opponent!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Outpost Theory',
    playerExample: {
      white: 'Mikhail Tal',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1960
    }
  },

  // ============================================
  // OUTPOSTS - CHAPTER 6: BISHOP OUTPOST
  // ============================================
  {
    id: 'outpost-bishop-long-diagonal',
    category: 'OUTPOSTS',
    title: 'The Bishop Outpost on the Long Diagonal',
    subtitle: 'A bishop dominating from an outpost square',
    // Position where a bishop can occupy a strong outpost on the long diagonal
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2BP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'While knights are the most common outpost pieces, bishops can also establish powerful outposts, especially on long diagonals. A bishop on an outpost controls many squares and can dominate the position. This pattern shows how to create and exploit a bishop outpost on the long diagonal.',
    
    keyIdeas: [
      'Bishops can occupy outposts just like knights',
      'A bishop on the long diagonal controls many squares',
      'Outpost bishops are especially powerful in open positions',
      'Support the bishop outpost with pawns and pieces',
      'A bishop outpost can restrict the opponent severely'
    ],
    
    mainLine: [
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to d3, preparing to occupy the c4 outpost! From d3, it eyes the h7 square and prepares to jump to c4 where it will control the long diagonal.',
        arrows: [
          { from: 'c1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3', 'c4'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues with the plan.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BISHOP OUTPOST! The bishop lands on c4, a powerful outpost square! From c4, it controls the long a2-g8 diagonal, attacking f7 and e6. The bishop cannot be attacked by pawns and dominates the position.',
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'e6', color: 'yellow' },
          { from: 'c4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c4', 'f7', 'e6', 'd5'],
        conceptTag: 'The Bishop Outpost'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, trying to challenge the outpost, but White maintains control.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qe2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the c4 bishop and preparing to build pressure. White\'s pieces are coordinating around the bishop outpost.',
        arrows: [
          { from: 'd1', to: 'e2', color: 'green' },
          { from: 'e2', to: 'c4', color: 'yellow' }
        ],
        highlights: ['e2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions, but White continues building pressure.',
        arrows: [{ from: 'g8', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, controlling the d-file and supporting the bishop outpost. White is piling up pieces to exploit the outpost.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'c4', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more active pieces.',
        arrows: [{ from: 'c8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the d-file and the c4 bishop outpost. The position is becoming overwhelming.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many pieces active.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5, another powerful square! The knight and bishop are now working together, with the bishop on c4 and knight on e5. They control many squares and create multiple threats.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'c4', color: 'yellow' },
          { from: 'e5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Knight-Bishop Coordination'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a decisive attack building.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Ng5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to g5, targeting f7! Combined with the c4 bishop, White has a devastating attack on the f7 square. The bishop outpost has enabled this attack.',
        arrows: [
          { from: 'e5', to: 'g5', color: 'green' },
          { from: 'g5', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['g5', 'f7'],
        conceptTag: 'Bishop-Knight Attack'
      },
      {
        move: 'h6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to drive the knight away, but White has a winning continuation.',
        arrows: [{ from: 'h7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Nxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight sacrifices on f7! This is possible because of the c4 bishop outpost controlling the diagonal. The bishop supports the sacrifice and the attack.',
        arrows: [
          { from: 'g5', to: 'f7', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f7'],
        conceptTag: 'Outpost-Enabled Sacrifice'
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to capture, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Qf3+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen and bishop coordinate to create a winning attack. The bishop outpost on c4 made all of this possible—it controlled the diagonal, enabled the knight sacrifice, and now supports the queen attack.',
        arrows: [
          { from: 'e2', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f3', 'f7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We established a bishop on the c4 outpost (Bd3, Bc4), then supported it with the queen, rooks, and knight. The bishop outpost controlled the long diagonal and enabled a winning attack, culminating in the Nxf7 sacrifice. The bishop outpost was the key to the entire position.',
    
    keyTakeaways: [
      'Bishops can occupy outposts just like knights',
      'A bishop on the long diagonal controls many squares',
      'Outpost bishops are especially powerful in open positions',
      'Support the bishop outpost with pawns and pieces',
      'A bishop outpost can restrict the opponent severely'
    ],
    
    memoryTip: 'Think of the bishop outpost as "a lighthouse on the diagonal"—it controls all the squares it can see!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Outpost Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1985
    }
  },

  // ============================================
  // WEAK PAWNS - CHAPTER 1: ISOLATED QUEEN PAWN
  // ============================================
  {
    id: 'weak-iqp-blockade',
    category: 'WEAK_PAWNS',
    title: 'The Isolated Queen Pawn',
    subtitle: 'Exploiting the most famous weakness',
    // IQP position - Black has isolated pawn on d5
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/8/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    
    introduction: 'Black has an isolated d5-pawn (IQP). This pawn cannot be defended by other pawns and is a permanent weakness. The classic technique: first blockade the pawn on d4, then pile up pieces to attack it. Eventually the pawn falls or Black\'s position collapses under the pressure.',
    
    keyIdeas: [
      'Isolated pawns cannot be defended by other pawns—they are permanent weaknesses',
      'The square in front of an IQP (d4) is the ideal blockading square',
      'Knights are perfect blockaders—they control squares in all directions',
      'Trade minor pieces to weaken the pawn\'s defense',
      'Rooks on the d-file apply maximum pressure'
    ],
    
    mainLine: [
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'THE BLOCKADE! The knight jumps to d4, the ideal square in front of the isolated pawn. From here it cannot be driven away by pawns and it completely stops the d5-pawn from advancing. This is the classic technique against the IQP.',
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
        explanation: 'Black develops the bishop, but the isolated pawn remains a target. Black must constantly worry about defending it.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing with pressure! The bishop eyes the d7 bishop and prepares to trade. Each trade makes the isolated pawn weaker—fewer defenders means easier target.',
        arrows: [
          { from: 'd3', to: 'f5', color: 'green' },
          { from: 'f5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Trading Down'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black seeks counterplay on the c-file, but White\'s blockade is solid.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bxd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading bishops! This removes one of Black\'s defenders. The fewer pieces Black has, the harder it is to defend the isolated pawn.',
        arrows: [{ from: 'f5', to: 'd7', color: 'green' }],
        conceptTag: 'Simplification'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now the queen is tied to defending the pawn.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen enters the attack! From f3, it eyes the d5 pawn along the diagonal and prepares to coordinate with the rooks. The pressure is mounting.',
        arrows: [
          { from: 'd1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['f3', 'd5'],
        conceptTag: 'Queen Pressure'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the pawn with the rook, but White continues building pressure.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Rook to the d-file! Now White has a rook behind the blockading knight, adding another attacker to the d5 pawn. This is the classic piling-up technique.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Ne7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to add another defender to d5, but White continues the siege.',
        arrows: [{ from: 'c6', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks! One rook on the d-file attacks the pawn, the other controls the c-file. Black\'s pieces are tied down to defense.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c8', color: 'yellow' }
        ],
        highlights: ['c1', 'd1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Rxc1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black exchanges to relieve pressure, but the isolated pawn remains weak.',
        arrows: [{ from: 'c8', to: 'c1', color: 'blue' }]
      },
      {
        move: 'Rxc1',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing. White still has pressure on the position.',
        arrows: [{ from: 'd1', to: 'c1', color: 'green' }]
      },
      {
        move: 'Qd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black consolidates, defending the knight.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rc7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook penetrates to the 7th rank! This is the classic technique—the rook on the 7th attacks pawns and restricts Black\'s king. Combined with the blockade on d4, White has a lasting advantage.',
        arrows: [
          { from: 'c1', to: 'c7', color: 'green' },
          { from: 'c7', to: 'b7', color: 'yellow' },
          { from: 'c7', to: 'a7', color: 'yellow' }
        ],
        highlights: ['c7'],
        conceptTag: '7th Rank'
      }
    ],
    
    summary: 'The classic technique against the isolated pawn: 1) Blockade the square in front with a knight, 2) Trade minor pieces to weaken defenses, 3) Pile up with queen and rooks on the d-file, 4) Win the pawn or gain a decisive advantage. The IQP is one of chess\'s most instructive weaknesses to study.',
    
    keyTakeaways: [
      'Blockade first! Put a knight on the square in front of the isolated pawn',
      'Trade minor pieces—each exchange makes the pawn harder to defend',
      'Pile up on the d-file with rooks and queen',
      'Be patient—the pawn isn\'t going anywhere',
      'The 7th rank penetration is often the finishing blow'
    ],
    
    memoryTip: 'Remember: "Blockade, Trade, Pile up, Win!" That\'s the formula against isolated pawns.',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Karpov\'s IQP Technique',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // WEAK PAWNS - CHAPTER 2: THE BACKWARD PAWN
  // ============================================
  {
    id: 'weak-backward-pawn-deep',
    category: 'WEAK_PAWNS',
    title: 'Exploiting the Backward Pawn',
    subtitle: 'Creating and attacking a permanent weakness',
    // Position where Black has a backward c6 pawn
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/4P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A backward pawn is one that cannot safely advance because enemy pawns control the square in front of it. Once created, a backward pawn becomes a permanent target that ties down the defender\'s pieces. Unlike isolated pawns, backward pawns have friendly pawn neighbors, but they still cannot advance and must be defended by pieces. This pattern shows how to systematically exploit a backward pawn.',
    
    keyIdeas: [
      'Backward pawns cannot advance without being captured',
      'Target backward pawns with rooks on the file',
      'Place a piece in front to blockade the pawn',
      'Pile up attackers—the defender runs out of resources',
      'Trade pieces to reduce defenders'
    ],
    
    mainLine: [
      {
        move: 'Rc1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Targeting the backward c6 pawn! The rook on the c-file will apply constant pressure. This is the first step in exploiting the weakness.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c1', 'c6'],
        conceptTag: 'Targeting the Weakness'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the pawn with the queen, but this ties down a valuable piece.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing with pressure! The bishop eyes the c7 square and supports the attack on the backward pawn. Multiple pieces are now targeting c6.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to contest the c-file, but White has more pieces to pile up.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Tripling on the c-file! The rook moves to c3, preparing to double with Rfc1. This creates overwhelming pressure on the backward pawn.',
        arrows: [
          { from: 'c1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c3'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black adds another defender, but White continues building pressure.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfc1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the c-file! Now White has both rooks, the queen (via d2), and the bishop all targeting the backward c6 pawn. Black cannot defend this forever.',
        arrows: [
          { from: 'f1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c1', 'c3'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Rxc3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to relieve pressure by trading, but this weakens the defense.',
        arrows: [{ from: 'c8', to: 'c3', color: 'blue' }]
      },
      {
        move: 'Rxc3',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing. White still has a rook on the c-file and the backward pawn remains weak.',
        arrows: [{ from: 'c1', to: 'c3', color: 'green' }]
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends with the queen, but the pawn is still vulnerable.',
        arrows: [{ from: 'd7', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen joins the attack! Now White has rook, queen, and bishop all targeting c6. The backward pawn is under siege.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'c6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Pressure'
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the bishop, but the backward pawn remains the main weakness.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Bxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! After all the pressure, White finally captures the backward pawn. Black must recapture, and White will have a winning endgame.',
        arrows: [{ from: 'f4', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now has doubled c-pawns which are even weaker.',
        arrows: [{ from: 'b7', to: 'c6', color: 'blue' }],
        highlights: ['c6', 'c7']
      },
      {
        move: 'Rxc6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the second pawn! White has won material and has a completely winning position. The systematic exploitation of the backward pawn has paid off.',
        arrows: [{ from: 'c3', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Material Advantage'
      }
    ],
    
    summary: 'The backward pawn was systematically exploited by piling up pieces on the c-file. First the rook, then the bishop, then doubling rooks, and finally the queen all targeted the weakness. Eventually the pawn fell, and White converted the advantage into a winning endgame.',
    
    keyTakeaways: [
      'Backward pawns are permanent weaknesses—they cannot advance',
      'Target them with rooks on the file—rooks are perfect for attacking backward pawns',
      'Pile up pieces—rook, queen, and bishop all attacking the same weakness',
      'Trade pieces to reduce defenders—fewer defenders means easier targets',
      'Be patient—the pawn isn\'t going anywhere, so build up pressure methodically'
    ],
    
    memoryTip: 'Think of a backward pawn as a "sitting duck"—pile up all your pieces and it will eventually fall!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Classical Pawn Structure Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1957
    }
  },

  // ============================================
  // WEAK PAWNS - CHAPTER 3: EXPLOITING DOUBLED PAWNS
  // ============================================
  {
    id: 'weak-doubled-pawns-deep',
    category: 'WEAK_PAWNS',
    title: 'Exploiting Doubled Pawns',
    subtitle: 'Targeting the base of doubled pawns',
    // Position with doubled pawns
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Doubled pawns are a classic weakness—they cannot support each other and often leave holes in the pawn structure. The base of doubled pawns (the one behind) is especially weak because it cannot advance. This pattern shows how to create and exploit doubled pawns.',
    
    keyIdeas: [
      'Doubled pawns cannot defend each other',
      'The base of doubled pawns is especially weak',
      'Create doubled pawns with strategic exchanges',
      'Target the base pawn—it cannot advance',
      'Doubled pawns often lead to material gains'
    ],
    
    mainLine: [
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading on d5! This will create doubled pawns for Black. After ...exd5, Black will have doubled d-pawns which are a permanent weakness.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Creating Weakness'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the e-pawn, creating doubled d-pawns. The d6 pawn is now the base and cannot advance.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'd6']
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, targeting the doubled pawns! The d6 pawn (the base) is especially weak and cannot be defended by the d5 pawn.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1', 'd6'],
        conceptTag: 'Targeting the Base'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but the doubled pawns remain weak.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker to the doubled pawns. White is piling up on the weakness.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more pieces.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the doubled pawns. The d6 pawn cannot be defended properly.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend with the queen, but White has a winning continuation.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The doubled pawns have fallen. The base pawn (d6) was too weak to defend.',
        arrows: [{ from: 'f4', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rxd6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White has won a pawn and has a completely winning position. The doubled pawns have been successfully exploited.',
        arrows: [{ from: 'd1', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White maintains the advantage.',
        arrows: [{ from: 'd8', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White has won material! The doubled pawns have been completely eliminated, and White has a winning endgame. This demonstrates the power of exploiting doubled pawns—they are permanent weaknesses that can be systematically attacked.',
        arrows: [{ from: 'd1', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We created doubled pawns by trading on d5, then systematically attacked them with rooks and bishops. The base pawn (d6) was especially weak and eventually fell. The doubled pawns became a permanent weakness that White exploited to win material.',
    
    keyTakeaways: [
      'Doubled pawns cannot defend each other—they are permanent weaknesses',
      'The base of doubled pawns is especially weak—it cannot advance',
      'Create doubled pawns with strategic exchanges',
      'Target the base pawn with multiple pieces',
      'Doubled pawns often lead to material gains'
    ],
    
    memoryTip: 'Think of doubled pawns as "two soldiers standing in the same spot"—they get in each other\'s way!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Structure Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'weak-hanging-pawns-deep',
    category: 'WEAK_PAWNS',
    title: 'Exploiting Hanging Pawns',
    subtitle: 'Targeting the vulnerable central pawns',
    // Position with hanging pawns
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Hanging pawns (two adjacent pawns on the same rank, not supported by other pawns) are a special type of weakness. They can be strong if they advance, but weak if blockaded. The key is to prevent them from advancing and then attack them. This pattern shows how to exploit hanging pawns.',
    
    keyIdeas: [
      'Hanging pawns are vulnerable if blockaded',
      'Prevent them from advancing with pieces',
      'Attack them from the front and sides',
      'The pawns cannot support each other',
      'Hanging pawns often lead to material gains'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, creating hanging pawns on c5 and d5. These pawns are vulnerable if White can prevent them from advancing.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['c5', 'd5']
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BLOCKADE! The knight jumps to d4, directly in front of the hanging pawns. This prevents them from advancing and turns them into weaknesses. The knight is the perfect blockader.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd5', color: 'red' },
          { from: 'd4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['d4', 'c5', 'd5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the hanging pawns are now blockaded and vulnerable.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the blockading knight and adding pressure to the hanging pawns. White is piling up on the weakness.',
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
        explanation: 'Black also supports the pawns, but White has more attackers.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker to the hanging pawns. White has complete control of the d-file.',
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
        explanation: 'Black defends, but the hanging pawns remain vulnerable.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the hanging pawns. They cannot advance and are under constant pressure.',
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
        move: 'Nxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a pawn! The hanging pawns have been broken. The blockade has done its job—it prevented the pawns from advancing and allowed White to win material.',
        arrows: [{ from: 'd4', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Breaking the Pawns'
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but now the pawn structure is broken.',
        arrows: [{ from: 'b7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Capturing the d5 pawn! The hanging pawns have been completely destroyed. White has won material and has a winning position.',
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
        explanation: 'Recapturing! White has won the pawn and has a completely winning position. The hanging pawns have been exploited perfectly.',
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
        explanation: 'White has won material! The hanging pawns have been eliminated, and White has a winning endgame. This demonstrates the power of exploiting hanging pawns—blockade them, pile up pieces, and win material.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We blockaded the hanging pawns with Nd4, preventing them from advancing. Then we piled up pieces (Rfd1, Bf4, Rad1) to attack them. Eventually, we broke them with Nxc6 and won material. The hanging pawns were a complete weakness.',
    
    keyTakeaways: [
      'Hanging pawns are vulnerable if blockaded',
      'Prevent them from advancing with pieces',
      'Attack them from the front and sides',
      'The pawns cannot support each other',
      'Hanging pawns often lead to material gains'
    ],
    
    memoryTip: 'Think of hanging pawns as "two soldiers without backup"—they look strong but are vulnerable if blockaded!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Structure Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  {
    id: 'weak-pawns-tripled-pawns-deep',
    category: 'WEAK_PAWNS',
    title: 'Exploiting Tripled Pawns',
    subtitle: 'The ultimate weakness',
    // Position with tripled pawns
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Tripled pawns are the ultimate weakness! Three pawns on the same file cannot support each other and create massive holes in the pawn structure. The base pawn is especially weak because it cannot advance. This pattern shows how to create and exploit tripled pawns.',
    
    keyIdeas: [
      'Tripled pawns are the ultimate weakness',
      'Three pawns on the same file cannot support each other',
      'The base pawn is especially weak',
      'Create tripled pawns with strategic exchanges',
      'Tripled pawns often lead to decisive material gains'
    ],
    
    mainLine: [
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading on d5! This will create tripled pawns for Black. After ...exd5 and ...cxd5, Black will have tripled d-pawns which are a permanent weakness.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Creating Weakness'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the e-pawn, creating doubled d-pawns.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'd6']
      },
      {
        move: 'Bxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading again! This will create tripled pawns. After ...cxd5, Black will have three pawns on the d-file—the ultimate weakness!',
        arrows: [{ from: 'e3', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the c-pawn, creating TRIPLED d-pawns! The d7, d6, and d5 pawns are all on the same file. This is a catastrophic weakness.',
        arrows: [{ from: 'c7', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'd6', 'd7']
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, targeting the tripled pawns! The d7 pawn (the base) is especially weak and cannot be defended by the other pawns. White is piling up on the ultimate weakness.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1', 'd7'],
        conceptTag: 'Targeting the Weakness'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more attackers.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops, adding another attacker to the tripled pawns. White has complete control of the d-file and the tripled pawns.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but the tripled pawns remain vulnerable.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the tripled pawns. They cannot advance and are under constant pressure.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
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
        move: 'Rxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a pawn! The tripled pawns have been broken. The base pawn has fallen, and White has won material.',
        arrows: [{ from: 'd1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Breaking the Pawns'
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now the tripled pawns are broken.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning another pawn! The tripled pawns have been completely destroyed. White has won material and has a winning position.',
        arrows: [{ from: 'f1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qxd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The tripled pawns have been eliminated, and White has a winning endgame.',
        arrows: [{ from: 'd1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We created tripled pawns with strategic exchanges (Nxd5, Bxd5), then piled up pieces (Rfd1, Bf4, Rad1) to attack them. Eventually, we won them with Rxd7. The tripled pawns were the ultimate weakness—they couldn\'t support each other and White won material easily.',
    
    keyTakeaways: [
      'Tripled pawns are the ultimate weakness',
      'Three pawns on the same file cannot support each other',
      'The base pawn is especially weak',
      'Create tripled pawns with strategic exchanges',
      'Tripled pawns often lead to decisive material gains'
    ],
    
    memoryTip: 'Think of tripled pawns as "three soldiers standing in the same spot"—they get in each other\'s way and can\'t help each other!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Structure Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  // ============================================
  // WEAK PAWNS - CHAPTER 6: WEAK PAWNS IN ENDGAMES
  // ============================================
  {
    id: 'weak-pawns-endgame-exploitation',
    category: 'WEAK_PAWNS',
    title: 'Exploiting Weak Pawns in the Endgame',
    subtitle: 'Using the king and pieces to attack weak pawns',
    // Endgame position with weak pawns
    fen: '8/pp3k2/2p1p1p1/3p4/3P4/2P1P3/PP1K4/8 w - - 0 30',
    toMove: 'white',
    
    introduction: 'In the endgame, weak pawns become even more vulnerable because the king can join the attack. Weak pawns cannot advance without support and become easy targets. This pattern shows how to exploit weak pawns in the endgame using the king and remaining pieces.',
    
    keyIdeas: [
      'Weak pawns are especially vulnerable in endgames',
      'The king is a powerful attacking piece in endgames',
      'Pile up pieces to attack weak pawns',
      'Weak pawns cannot advance without support',
      'Weak pawns often lead to decisive material gains'
    ],
    
    mainLine: [
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves forward, targeting the weak d5 pawn! In the endgame, the king is a fighting piece. From d3, it can support the attack on d5 and also eye other weak pawns.',
        arrows: [
          { from: 'd2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3', 'd5'],
        conceptTag: 'King Activity'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black brings the king to defend, but White continues the attack.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to c4, directly attacking the weak d5 pawn! The king is now a powerful attacking piece, and the d5 pawn cannot be defended by other pawns. Black must defend with pieces or lose the pawn.',
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c4', 'd5'],
        conceptTag: 'King Attack'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the pawn with the king, but White has more threats.',
        arrows: [{ from: 'e6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'b3',
        isMainLine: true,
        annotation: '!',
        explanation: 'White prepares to advance the queenside pawns, creating more weaknesses for Black. The position is becoming very difficult for Black to defend.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }],
        highlights: ['b3'],
        conceptTag: 'Creating Weaknesses'
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances, trying to create counterplay, but White has more options.',
        arrows: [{ from: 'c6', to: 'c5', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White advances, creating pressure on the queenside. Now Black has multiple weak pawns to defend: d5, c5, and the pawns on b7 and a7.',
        arrows: [
          { from: 'b3', to: 'b4', color: 'green' },
          { from: 'b4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'Pawn Advance'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more attacking options.',
        arrows: [{ from: 'd6', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to b5, attacking the weak c5 pawn! Now White is attacking two weak pawns: c5 and d5. Black cannot defend both.',
        arrows: [
          { from: 'c4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c5', color: 'yellow' },
          { from: 'b5', to: 'a7', color: 'yellow' }
        ],
        highlights: ['b5', 'c5'],
        conceptTag: 'Double Attack'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends d5, but now c5 is vulnerable.',
        arrows: [{ from: 'c6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Kxc5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the c5 pawn! The weak pawn has fallen. White has won material and has a winning endgame. The king attack was decisive.',
        arrows: [{ from: 'b5', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has a winning position with the extra pawn.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king returns to b5, attacking the weak a7 and b7 pawns! White continues to exploit weak pawns. The position is completely winning.',
        arrows: [
          { from: 'c5', to: 'b5', color: 'green' },
          { from: 'b5', to: 'a7', color: 'yellow' },
          { from: 'b5', to: 'b7', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Continued Attack'
      },
      {
        move: 'Ke4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has more threats.',
        arrows: [{ from: 'd5', to: 'e4', color: 'blue' }]
      },
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White advances, preparing to create a passed pawn! With the weak pawns attacked, White can create decisive threats. The exploitation of weak pawns has led to a winning position.',
        arrows: [{ from: 'a2', to: 'a3', color: 'green' }],
        highlights: ['a3'],
        conceptTag: 'Creating Passed Pawn'
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'e4', to: 'd3', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White advances, creating a passed pawn! The exploitation of weak pawns has created winning chances. White has a decisive advantage.',
        arrows: [
          { from: 'a3', to: 'a4', color: 'green' },
          { from: 'a4', to: 'a5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We used the king to attack weak pawns (Kd3, Kc4, Kb5), then won material with Kxc5. The king was the key attacking piece in the endgame, and the weak pawns were easy targets. Weak pawns in endgames are especially vulnerable and often lead to decisive material gains.',
    
    keyTakeaways: [
      'Weak pawns are especially vulnerable in endgames',
      'The king is a powerful attacking piece in endgames',
      'Pile up pieces to attack weak pawns',
      'Weak pawns cannot advance without support',
      'Weak pawns often lead to decisive material gains'
    ],
    
    memoryTip: 'Think of weak pawns in endgames as "isolated soldiers without support"—they\'re easy targets for the attacking king!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Theory',
    playerExample: {
      white: 'Vassily Smyslov',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1957
    }
  },
  
  // ============================================
  // PAWN STRUCTURE - THE MINORITY ATTACK
  // ============================================
  {
    id: 'structure-minority-attack',
    category: 'MINORITY_ATTACK',
    title: 'The Classic Minority Attack',
    subtitle: 'Creating weaknesses with fewer pawns',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R w KQ - 0 8',
    toMove: 'white',
    
    introduction: 'White has fewer queenside pawns (a2, b2) against Black\'s (a7, b7, c5). Paradoxically, we\'ll attack with our minority to create weaknesses in Black\'s majority!',
    
    keyIdeas: [
      'Attack a pawn majority with fewer pawns',
      'The goal is to create weak pawns, not to win them immediately',
      'b4-b5 is the key break in the Carlsbad structure',
      'After bxc6, Black has a weak c-pawn or a-pawn'
    ],
    
    mainLine: [
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing b4! We can\'t play b4 immediately because ...cxd4 exd4 Qa5+ would be annoying. So we secure the b4 advance first.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b2', to: 'b4', color: 'yellow' }
        ],
        conceptTag: 'Preparation',
        alternativeMoves: [
          {
            move: 'b4',
            evaluation: 'dubious',
            explanation: 'Premature! After ...cxd4 exd4 Qa5+ we lose time defending.'
          }
        ]
      },
      {
        move: 'Rb8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the minority attack is coming!',
        arrows: [
          { from: 'a8', to: 'b8', color: 'blue' }
        ]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! This pawn will advance to b5 where it attacks the c6-pawn base.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b4', 'c6'],
        conceptTag: 'Minority Advance'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens the a-file and leaves c6 vulnerable.',
        arrows: [
          { from: 'c5', to: 'b4', color: 'blue' }
        ],
        highlights: ['a7', 'c6'],
        alternativeMoves: [
          {
            move: 'Bd7',
            evaluation: 'better',
            explanation: 'Better, but White can still advance b5 later.'
          }
        ]
      },
      {
        move: 'axb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the a-file! Now the a7-pawn is weak and c6 is still targeted.',
        arrows: [
          { from: 'a3', to: 'b4', color: 'green' }
        ],
        highlights: ['a7', 'c6'],
        conceptTag: 'Open File'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop, trying to defend. But the minority attack continues!',
        arrows: [
          { from: 'c8', to: 'd7', color: 'blue' }
        ]
      },
      {
        move: 'Bd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing while preparing to put pressure on the new weaknesses. The bishop can go to a5 to target the weak pawns.',
        arrows: [
          { from: 'c1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'a5', color: 'yellow' }
        ],
        conceptTag: 'Targeting Weaknesses'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend the c-file, but the minority attack continues!',
        arrows: [
          { from: 'b8', to: 'c8', color: 'blue' }
        ]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The key break! Now Black faces a dilemma: ...cxb5 leaves an isolated a-pawn, while ...Nb4 allows Qxc4.',
        arrows: [
          { from: 'b4', to: 'b5', color: 'green' }
        ],
        highlights: ['b5', 'c6'],
        conceptTag: 'The Break!'
      },
      {
        move: 'Na5',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight tries to blockade, but it\'s awkwardly placed on the rim.',
        arrows: [
          { from: 'c6', to: 'a5', color: 'blue' }
        ]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks on the c-file! Combined with the pressure on c6 from b5, Black\'s queenside is under severe pressure.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c6', 'b5'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Qb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend the queenside.',
        arrows: [{ from: 'd8', to: 'b6', color: 'blue' }]
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Breaking through! Now Black must recapture, and the weak pawn appears.',
        arrows: [{ from: 'b5', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'The Breakthrough'
      },
      {
        move: 'Bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the bishop.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rfc1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Piling up on the c-file! Both rooks now attack the weak c6 bishop. The minority attack has created a permanent weakness that White can exploit. Black\'s pieces are tied to defense while White can improve freely.',
        arrows: [{ from: 'f1', to: 'c1', color: 'green' }, { from: 'c1', to: 'c6', color: 'yellow' }],
        highlights: ['c1', 'c6'],
        conceptTag: 'Maximum Pressure'
      }
    ],
    
    variations: [
      {
        afterMove: 6,  // After b5
        moves: [
          {
            move: 'cxb5',
            isMainLine: false,
            annotation: '',
            explanation: 'If Black captures with the pawn...',
            arrows: [{ from: 'c6', to: 'b5', color: 'blue' }]
          },
          {
            move: 'axb5',
            isMainLine: false,
            annotation: '',
            explanation: 'We recapture, and now the a7 pawn is isolated and weak!',
            arrows: [
              { from: 'a3', to: 'b5', color: 'green' }
            ],
            highlights: ['a7']
          }
        ]
      }
    ],
    
    summary: 'The minority attack (b4-b5) created permanent weaknesses in Black\'s pawn structure. Whether Black captures or not, weaknesses appear. This is a classic strategy in the Carlsbad pawn structure.',
    
    keyTakeaways: [
      'A minority of pawns can attack a majority to create weaknesses',
      'The goal is not to win pawns but to create weak targets',
      'b4-b5 attacks the base of the pawn chain',
      'Black faces a dilemma at every step: create an isolated pawn or a backward pawn'
    ],
    
    memoryTip: 'Think of the minority attack as "quality over quantity"—fewer pawns but better placement creates lasting damage!',
    
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'Carlsbad Structure Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emmanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  // ============================================
  // MINORITY ATTACK - CHAPTER 2: TIMING AND FOLLOW-UP
  // ============================================
  {
    id: 'minority-attack-timing-deep',
    category: 'MINORITY_ATTACK',
    title: 'Timing the Minority Attack',
    subtitle: 'When to strike and how to follow up',
    // Carlsbad structure - timing the attack
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The minority attack isn\'t just about playing b4-b5—it\'s about timing! You need to prepare properly, wait for the right moment, and then follow up correctly. This pattern shows how to time the minority attack and exploit the weaknesses it creates.',
    
    keyIdeas: [
      'Prepare the minority attack before executing it',
      'Time the attack when your pieces are well-placed',
      'After b4-b5, follow up by piling up on the weaknesses',
      'Use the open files created by the attack',
      'The attack creates permanent structural weaknesses'
    ],
    
    mainLine: [
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the attack! The rook supports the e-pawn and prepares to double on the e-file. Before playing b4-b5, we improve our pieces.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e4', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Preparation'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also prepares, but White has the initiative.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Bf1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop retreats to f1, preparing to support the b4-b5 advance. This is proper preparation—all pieces are coordinated before the attack.',
        arrows: [
          { from: 'e2', to: 'f1', color: 'green' },
          { from: 'f1', to: 'b5', color: 'yellow' }
        ],
        highlights: ['f1'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White is ready to strike.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ATTACK BEGINS! Now is the perfect time—all pieces are developed and coordinated. The b4 pawn prepares b5, which will create weaknesses in Black\'s pawn structure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Attack'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this creates an isolated a-pawn. The minority attack is working!',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }],
        highlights: ['a7']
      },
      {
        move: 'axb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the a-file! Now the a7-pawn is weak and isolated. The minority attack has created its first weakness.',
        arrows: [{ from: 'a3', to: 'b4', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'First Weakness'
      },
      {
        move: 'Ra8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more pieces to pile up.',
        arrows: [{ from: 'a8', to: 'a8', color: 'blue' }]
      },
      {
        move: 'Ra1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to a1, targeting the weak a7-pawn! This is the follow-up—after creating weaknesses, pile up pieces to attack them.',
        arrows: [
          { from: 'a1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a1', 'a7'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White continues the assault.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The minority attack has paid off. White has won material and has a completely winning position.',
        arrows: [{ from: 'a1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Rxc2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has too many advantages.',
        arrows: [{ from: 'c8', to: 'c2', color: 'blue' }]
      },
      {
        move: 'Rxb7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Winning another pawn! The minority attack has created multiple weaknesses that White can exploit. This is the power of proper timing and follow-up.',
        arrows: [{ from: 'a7', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Multiple Weaknesses'
      },
      {
        move: 'Rxb2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black grabs a pawn, but White has a winning material advantage.',
        arrows: [{ from: 'c2', to: 'b2', color: 'blue' }]
      },
      {
        move: 'Qa1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen joins the attack! White has complete domination. The minority attack, properly timed and followed up, has led to a completely winning position.',
        arrows: [
          { from: 'd1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a8', color: 'yellow' }
        ],
        highlights: ['a1'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We prepared the minority attack properly (Re1, Bf1), timed it correctly (b4 when pieces were ready), and followed up aggressively (Ra1, Rxa7). The attack created permanent weaknesses that White exploited to win material. This shows the importance of timing and follow-up in the minority attack.',
    
    keyTakeaways: [
      'Prepare the minority attack before executing it',
      'Time the attack when all pieces are coordinated',
      'After b4-b5, pile up pieces on the created weaknesses',
      'Use open files to penetrate and win material',
      'The attack creates permanent structural damage'
    ],
    
    memoryTip: 'Think of the minority attack as "planting a seed"—prepare the ground (develop pieces), plant it (b4-b5), then harvest (exploit weaknesses)!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Carlsbad Structure Mastery',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // MINORITY ATTACK - CHAPTER 3: EXPLOITING THE WEAKNESSES
  // ============================================
  {
    id: 'minority-attack-exploitation-deep',
    category: 'MINORITY_ATTACK',
    title: 'Exploiting Minority Attack Weaknesses',
    subtitle: 'Converting weaknesses into wins',
    // Position after minority attack has created weaknesses
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2p5/2P1P3/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'After the minority attack creates weaknesses, you must exploit them! The attack creates isolated or backward pawns, but you need to pile up pieces and convert these weaknesses into material gains or winning attacks. This pattern shows how to systematically exploit the weaknesses created by the minority attack.',
    
    keyIdeas: [
      'After b4-b5 creates weaknesses, pile up pieces on them',
      'Use open files created by the attack',
      'Target the weak pawns with multiple pieces',
      'Convert structural weaknesses into material gains',
      'The minority attack creates permanent damage'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! This will create weaknesses in Black\'s pawn structure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Attack'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, creating an isolated a-pawn. The weakness has been created!',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }],
        highlights: ['a7']
      },
      {
        move: 'axb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the a-file! Now the a7-pawn is weak and isolated. The minority attack has created its target.',
        arrows: [{ from: 'a3', to: 'b4', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Weakness Created'
      },
      {
        move: 'Ra8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more pieces to attack with.',
        arrows: [{ from: 'a8', to: 'a8', color: 'blue' }]
      },
      {
        move: 'Ra1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to a1, targeting the weak a7-pawn! This is the exploitation phase—piling up pieces on the created weakness.',
        arrows: [
          { from: 'a1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a1', 'a7'],
        conceptTag: 'Targeting the Weakness'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White continues building pressure.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qa2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen joins the attack! Now White has rook and queen both targeting the weak a7-pawn. The exploitation is intensifying.',
        arrows: [
          { from: 'd1', to: 'a2', color: 'green' },
          { from: 'a2', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a2'],
        conceptTag: 'Queen Pressure'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many attackers.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding another attacker! White is piling up on the weakness with all pieces.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'a7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has a winning continuation.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The minority attack has paid off. White has systematically exploited the weakness and won material.',
        arrows: [{ from: 'a1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White maintains the advantage.',
        arrows: [{ from: 'a8', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Qxa7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures! White has won a pawn and has a completely winning position. The minority attack exploitation has been a complete success.',
        arrows: [{ from: 'a2', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Rxc2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has too many advantages.',
        arrows: [{ from: 'c8', to: 'c2', color: 'blue' }]
      },
      {
        move: 'Qxb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning another pawn! White has completely exploited the weaknesses created by the minority attack. This demonstrates the power of systematic exploitation—create weaknesses, then pile up and win them.',
        arrows: [{ from: 'a7', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We executed the minority attack (b4-b5), which created an isolated a7-pawn. Then we systematically exploited it by piling up pieces (Ra1, Qa2, Bf4) and eventually won it. The minority attack creates weaknesses, and exploitation converts them into material gains.',
    
    keyTakeaways: [
      'After b4-b5 creates weaknesses, pile up pieces on them',
      'Use open files created by the attack',
      'Target the weak pawns with multiple pieces',
      'Convert structural weaknesses into material gains',
      'The minority attack creates permanent damage that must be exploited'
    ],
    
    memoryTip: 'Think of exploitation as "hunting"—the minority attack creates the wounded animal (weak pawn), and exploitation is the kill (winning material)!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Carlsbad Structure Exploitation',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'minority-attack-queenside-breakthrough-deep',
    category: 'MINORITY_ATTACK',
    title: 'Minority Attack Queenside Breakthrough',
    subtitle: 'Breaking through on the queenside',
    // Position where minority attack creates breakthrough
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2p5/2P1P3/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The minority attack doesn\'t just create weaknesses—it can also create breakthroughs! By advancing b4-b5, you can open lines and create winning chances on the queenside. This pattern shows how to use the minority attack to create a queenside breakthrough.',
    
    keyIdeas: [
      'The minority attack can create breakthroughs, not just weaknesses',
      'b4-b5 opens lines on the queenside',
      'Use the breakthrough to activate rooks and pieces',
      'Queenside breakthroughs often lead to material gains',
      'The minority attack is a long-term strategic plan'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! This will create weaknesses and potentially open lines on the queenside.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Attack'
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prepares to meet b5 with ...a6, but White continues.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting b5! The a4 pawn prevents Black from playing ...a5 to stop the attack.',
        arrows: [
          { from: 'a2', to: 'a4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Supporting the Attack'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAKTHROUGH! The b5 advance opens lines on the queenside. This is the key move of the minority attack—it creates weaknesses and opens files.',
        arrows: [
          { from: 'b4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'The Breakthrough'
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens the a-file for White\'s rooks.',
        arrows: [{ from: 'a6', to: 'b5', color: 'blue' }]
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing opens the a-file! Now White\'s rooks can penetrate on the queenside. The minority attack has created the breakthrough.',
        arrows: [{ from: 'a4', to: 'b5', color: 'green' }],
        highlights: ['a1'],
        conceptTag: 'File Opened'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Ra3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to a3, preparing to penetrate on the a-file! The minority attack has opened lines, and White is using them.',
        arrows: [
          { from: 'a1', to: 'a3', color: 'green' },
          { from: 'a3', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a3'],
        conceptTag: 'Rook Activation'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfa1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the a-file! The minority attack has created the conditions for a powerful queenside attack. White\'s rooks are perfectly placed.',
        arrows: [
          { from: 'f1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a1'],
        conceptTag: 'Doubled Rooks'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ra7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook penetrates to the 7th rank! The minority attack has created a winning breakthrough. White has a completely winning position.',
        arrows: [
          { from: 'a3', to: 'a7', color: 'green' },
          { from: 'a7', to: 'b7', color: 'yellow' }
        ],
        highlights: ['a7'],
        conceptTag: 'Penetration'
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but White has won material.',
        arrows: [{ from: 'a8', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won material and has a completely winning position. The minority attack has created a queenside breakthrough that led to material gains.',
        arrows: [{ from: 'a1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Qxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'c7', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Qxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The minority attack has been a complete success—it created a queenside breakthrough that led to material gains.',
        arrows: [{ from: 'd1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We executed the minority attack (b4, a4, b5), which opened the a-file. The open file allowed White\'s rooks to penetrate (Ra3, Rfa1, Ra7), leading to material gains. The minority attack created a queenside breakthrough that transformed the position completely.',
    
    keyTakeaways: [
      'The minority attack can create breakthroughs, not just weaknesses',
      'b4-b5 opens lines on the queenside',
      'Use the breakthrough to activate rooks and pieces',
      'Queenside breakthroughs often lead to material gains',
      'The minority attack is a long-term strategic plan'
    ],
    
    memoryTip: 'Think of the minority attack as "opening a door on the queenside"—once the door is open, your pieces can flood through!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Minority Attack Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'minority-attack-structural-damage-deep',
    category: 'MINORITY_ATTACK',
    title: 'Minority Attack Creating Structural Damage',
    subtitle: 'Permanent weaknesses from the attack',
    // Position where minority attack creates structural damage
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2p5/2P1P3/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The minority attack doesn\'t just create temporary weaknesses—it creates permanent structural damage! By advancing b4-b5, you can create isolated or backward pawns that will be weak for the rest of the game. This pattern shows how the minority attack creates lasting structural damage.',
    
    keyIdeas: [
      'The minority attack creates permanent structural damage',
      'Isolated or backward pawns are weak forever',
      'Structural damage lasts longer than piece activity',
      'Create weaknesses that can be exploited later',
      'The minority attack is a long-term strategic plan'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! This will create structural damage in Black\'s pawn structure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Attack'
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prepares to meet b5 with ...a6, but White continues.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting b5! The a4 pawn prevents Black from playing ...a5 to stop the attack.',
        arrows: [
          { from: 'a2', to: 'a4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Supporting the Attack'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ATTACK! The b5 advance creates structural damage. After ...cxb5 or ...axb5, Black will have isolated or backward pawns—permanent weaknesses!',
        arrows: [
          { from: 'b4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Creating Damage'
      },
      {
        move: 'cxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, creating an isolated a-pawn. The structural damage has been created!',
        arrows: [{ from: 'c5', to: 'b5', color: 'blue' }],
        highlights: ['a7']
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! Now the a7-pawn is isolated and weak. The minority attack has created permanent structural damage—this weakness will last for the rest of the game!',
        arrows: [{ from: 'a4', to: 'b5', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Structural Damage'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the structural damage remains.',
        arrows: [{ from: 'f8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Ra3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to a3, targeting the weak a7-pawn! The minority attack has created a permanent weakness that White can now exploit.',
        arrows: [
          { from: 'a1', to: 'a3', color: 'green' },
          { from: 'a3', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a3', 'a7'],
        conceptTag: 'Targeting the Weakness'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but the structural damage is permanent.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfa1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the a-file! White has complete control of the weak a7-pawn. The structural damage has created a winning advantage.',
        arrows: [
          { from: 'f1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Ra7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook penetrates to the 7th rank! The structural damage has allowed White to win the weak pawn. The minority attack has been a complete success.',
        arrows: [
          { from: 'a3', to: 'a7', color: 'green' },
          { from: 'a7', to: 'b7', color: 'yellow' }
        ],
        highlights: ['a7'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but White has won material.',
        arrows: [{ from: 'a8', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won material and has a completely winning position. The minority attack has created permanent structural damage that led to material gains.',
        arrows: [{ from: 'a1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We executed the minority attack (b4, a4, b5), which created permanent structural damage (isolated a7-pawn). The structural damage allowed White to pile up pieces (Ra3, Rfa1, Ra7) and win material. The minority attack creates weaknesses that last forever.',
    
    keyTakeaways: [
      'The minority attack creates permanent structural damage',
      'Isolated or backward pawns are weak forever',
      'Structural damage lasts longer than piece activity',
      'Create weaknesses that can be exploited later',
      'The minority attack is a long-term strategic plan'
    ],
    
    memoryTip: 'Think of the minority attack as "creating a permanent scar"—the structural damage lasts for the entire game!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Minority Attack Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  // ============================================
  // MINORITY ATTACK - CHAPTER 6: ENDGAME EXPLOITATION
  // ============================================
  {
    id: 'minority-attack-endgame-exploitation-deep',
    category: 'MINORITY_ATTACK',
    title: 'Minority Attack in Endgames',
    subtitle: 'Using the minority attack to win endgames',
    // Endgame position where minority attack is decisive
    fen: '8/pp3k2/2p1p1p1/2PpP1P1/1P1P4/2P1P3/PP1K4/8 w - - 0 30',
    toMove: 'white',
    
    introduction: 'The minority attack isn\'t just for middlegames—it\'s also powerful in endgames! In endgames, weaknesses created by the minority attack become even more critical. This pattern shows how to use the minority attack to win endgames.',
    
    keyIdeas: [
      'The minority attack is powerful in endgames',
      'Weaknesses created by the attack are critical in endgames',
      'The king can join the attack in endgames',
      'Structural weaknesses become decisive',
      'The minority attack often wins endgames'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! This will create weaknesses in Black\'s queenside pawn structure. In endgames, such weaknesses become critical.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'Beginning the Attack'
      },
      {
        move: 'Kf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king moves, but White continues the attack.',
        arrows: [{ from: 'f7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ATTACK! The b5 advance creates weaknesses in Black\'s queenside pawn structure! After ...cxb5 or ...axb5, Black will have isolated or backward pawns—critical weaknesses in endgames!',
        arrows: [
          { from: 'b4', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Creating Weaknesses'
      },
      {
        move: 'cxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, creating an isolated a-pawn. The structural damage has been created!',
        arrows: [{ from: 'c6', to: 'b5', color: 'blue' }],
        highlights: ['a7']
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! Now the a7-pawn is isolated and weak. In endgames, isolated pawns are especially vulnerable because the king can attack them directly.',
        arrows: [{ from: 'a2', to: 'b5', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Structural Damage'
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king moves, but White can exploit the weakness.',
        arrows: [{ from: 'f6', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Kc3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to c3, targeting the weak a7-pawn! In endgames, the king is a powerful attacking piece. The minority attack has created a weakness that the king can now attack.',
        arrows: [
          { from: 'd2', to: 'c3', color: 'green' },
          { from: 'c3', to: 'a7', color: 'yellow' }
        ],
        highlights: ['c3', 'a7'],
        conceptTag: 'King Attack'
      },
      {
        move: 'Kd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to counterattack, but White has more threats.',
        arrows: [{ from: 'e5', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Kb4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to b4, attacking the weak a7-pawn! White\'s king is now targeting the isolated pawn, and Black cannot defend it effectively.',
        arrows: [
          { from: 'c3', to: 'b4', color: 'green' },
          { from: 'b4', to: 'a7', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'Direct Attack'
      },
      {
        move: 'Kc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White can win the pawn.',
        arrows: [{ from: 'd5', to: 'c5', color: 'blue' }]
      },
      {
        move: 'Kxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the weak pawn! The minority attack has created a weakness that the king could attack and win. This is a decisive material gain in the endgame.',
        arrows: [{ from: 'b4', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won a pawn and has a winning endgame.',
        arrows: [{ from: 'c5', to: 'b5', color: 'blue' }]
      },
      {
        move: 'Kb6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to b6, preparing to attack more pawns! White has a completely winning endgame thanks to the minority attack creating weaknesses.',
        arrows: [
          { from: 'a7', to: 'b6', color: 'green' },
          { from: 'b6', to: 'b7', color: 'yellow' }
        ],
        highlights: ['b6'],
        conceptTag: 'Winning Endgame'
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has a winning position.',
        arrows: [{ from: 'b5', to: 'c4', color: 'blue' }]
      },
      {
        move: 'Kxb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning another pawn! The minority attack has been a complete success—it created weaknesses that led to decisive material gains in the endgame.',
        arrows: [{ from: 'b6', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We executed the minority attack (b4, b5, axb5), which created permanent structural damage (isolated a7-pawn). In the endgame, the king attacked and won the weak pawn (Kc3, Kb4, Kxa7). The minority attack created weaknesses that led to a winning endgame.',
    
    keyTakeaways: [
      'The minority attack is powerful in endgames',
      'Weaknesses created by the attack are critical in endgames',
      'The king can join the attack in endgames',
      'Structural weaknesses become decisive',
      'The minority attack often wins endgames'
    ],
    
    memoryTip: 'Think of the minority attack in endgames as "creating weaknesses for the king to attack"—the king becomes a powerful attacking piece!',
    
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

  {
    id: 'structure-benoni-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The Benoni Structure',
    subtitle: 'Dynamic pawn structure with counterplay',
    // Benoni structure (pawns on c5-d6 vs d4-e4)
    fen: 'rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 0 3',
    toMove: 'black',
    
    introduction: 'The Benoni structure (Black: c5-d6 vs White: d4-e4) is a dynamic, unbalanced pawn formation. Black has a queenside pawn majority and potential counterplay, while White has a central pawn majority. The structure determines piece placement and plans for both sides. This pattern shows how to play the Benoni structure effectively.',
    
    keyIdeas: [
      'The Benoni creates an unbalanced, dynamic position',
      'Black has queenside counterplay with the c5-d6 structure',
      'White has central control with d4-e4',
      'The structure determines where pieces belong',
      'Both sides have clear plans based on the structure'
    ],
    
    mainLine: [
      {
        move: 'e6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing ...d6 to complete the Benoni structure. The e6-d6 pawn chain is the foundation of Black\'s position.',
        arrows: [
          { from: 'e7', to: 'e6', color: 'green' },
          { from: 'd7', to: 'd6', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'Completing the Structure'
      },
      {
        move: 'd4',
        isMainLine: true,
        annotation: '',
        explanation: 'White advances, creating the central pawn majority. The Benoni structure is taking shape.',
        arrows: [{ from: 'd2', to: 'd4', color: 'blue' }]
      },
      {
        move: 'd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Completing the Benoni structure! The c5-d6 pawn chain is now complete. This structure gives Black queenside counterplay and determines the plans for both sides.',
        arrows: [
          { from: 'd7', to: 'd6', color: 'green' },
          { from: 'c5', to: 'd6', color: 'yellow' }
        ],
        highlights: ['c5', 'd6'],
        conceptTag: 'The Benoni Structure'
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black continues building the Benoni structure.',
        arrows: [{ from: 'b1', to: 'c3', color: 'blue' }]
      },
      {
        move: 'g6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing the fianchetto! The g6 move prepares Bg7, which is the ideal bishop placement in the Benoni structure.',
        arrows: [
          { from: 'g7', to: 'g6', color: 'green' },
          { from: 'f8', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g6'],
        conceptTag: 'Fianchetto Preparation'
      },
      {
        move: 'e4',
        isMainLine: true,
        annotation: '',
        explanation: 'White completes the central pawn chain (d4-e4), but Black has counterplay.',
        arrows: [{ from: 'e2', to: 'e4', color: 'blue' }]
      },
      {
        move: 'Bg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop fianchettoes! The Bg7 bishop is perfectly placed in the Benoni structure—it controls the long diagonal and supports Black\'s counterplay.',
        arrows: [
          { from: 'f8', to: 'g7', color: 'green' },
          { from: 'g7', to: 'd4', color: 'yellow' }
        ],
        highlights: ['g7'],
        conceptTag: 'Ideal Bishop Placement'
      },
      {
        move: 'Nf3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black continues building.',
        arrows: [{ from: 'g1', to: 'f3', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling, securing the king. Black\'s Benoni structure is complete and ready for counterplay.',
        arrows: [{ from: 'e8', to: 'g8', color: 'green' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black has more counterplay.',
        arrows: [{ from: 'f1', to: 'e2', color: 'blue' }]
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops to d7, supporting the c5-d6 structure and preparing ...b5 counterplay. The Benoni structure determines piece placement.',
        arrows: [
          { from: 'b8', to: 'd7', color: 'green' },
          { from: 'b7', to: 'b5', color: 'yellow' }
        ],
        highlights: ['d7'],
        conceptTag: 'Supporting the Structure'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White castles, but Black has counterplay.',
        arrows: [{ from: 'e1', to: 'g1', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE COUNTERPLAY! The b5 advance is the thematic move in the Benoni structure. It creates queenside counterplay and challenges White\'s center.',
        arrows: [
          { from: 'b7', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c4', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Queenside Counterplay'
      },
      {
        move: 'cxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but Black recaptures with advantage.',
        arrows: [{ from: 'c4', to: 'b5', color: 'blue' }]
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! Black has opened the a-file and created counterplay. The Benoni structure has given Black active play.',
        arrows: [{ from: 'a6', to: 'b5', color: 'green' }],
        highlights: ['a8'],
        conceptTag: 'File Opened'
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black has more activity.',
        arrows: [{ from: 'f1', to: 'e1', color: 'blue' }]
      },
      {
        move: 'Ra5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to a5, using the open a-file! The Benoni structure has created counterplay, and Black has a strong position. The structure has determined the plans for both sides.',
        arrows: [
          { from: 'a8', to: 'a5', color: 'green' },
          { from: 'a5', to: 'a2', color: 'yellow' }
        ],
        highlights: ['a5'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We completed the Benoni structure (c5-d6), developed pieces appropriately (Bg7, Nbd7), and created queenside counterplay (b5, axb5, Ra5). The Benoni structure determined the plans for both sides and gave Black active play.',
    
    keyTakeaways: [
      'The Benoni creates an unbalanced, dynamic position',
      'Black has queenside counterplay with the c5-d6 structure',
      'White has central control with d4-e4',
      'The structure determines where pieces belong',
      'Both sides have clear plans based on the structure'
    ],
    
    memoryTip: 'Think of the Benoni structure as "two armies facing each other"—Black on the queenside, White in the center!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Benoni Structure Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // PAWN STRUCTURE - THE FRENCH PAWN CHAIN
  // ============================================
  {
    id: 'structure-french-chain-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The French Pawn Chain',
    subtitle: 'Attacking the base of the chain',
    // French Defense pawn chain structure
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    
    introduction: 'In the French Defense, the pawn chain (White: d4-e5 vs Black: c7-d5-e6) is the defining feature of the position. The key strategic principle: attack the base of the chain! The base is the pawn that supports the others—here, d4 is the base. Black attacks it with ...c5, while White defends with c3. This battle determines the entire middlegame.',
    
    keyIdeas: [
      'Attack the base of the pawn chain—the supporting pawn',
      'In French: ...c5 attacks d4 (the base)',
      'White defends with c3, maintaining the chain',
      'The chain determines where pieces belong',
      'Whoever controls the base controls the position'
    ],
    
    mainLine: [
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE CLASSIC BREAK! Black attacks the base of White\'s pawn chain with ...c5. This is the thematic move in the French Defense—attack the base (d4), not the head (e5).',
        arrows: [
          { from: 'c7', to: 'c5', color: 'green' },
          { from: 'c5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c5', 'd4'],
        conceptTag: 'Attack the Base'
      },
      {
        move: 'c3',
        isMainLine: true,
        annotation: '',
        explanation: 'White defends the base of the chain. The c3 pawn supports d4, maintaining the integrity of the pawn chain.',
        arrows: [{ from: 'c2', to: 'c3', color: 'blue' }, { from: 'c3', to: 'd4', color: 'yellow' }],
        highlights: ['c3', 'd4'],
        conceptTag: 'Defending the Base'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing and adding pressure to d4. The knight supports the ...c5 break and eyes the d4 square.',
        arrows: [
          { from: 'b8', to: 'c6', color: 'green' },
          { from: 'c6', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c6'],
        conceptTag: 'Piece Development'
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops the bishop, preparing to castle. The bishop on e2 supports the e5 pawn.',
        arrows: [{ from: 'f1', to: 'e2', color: 'blue' }]
      },
      {
        move: 'Qb6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen attacks both b2 and d4! This is why c3 was necessary—the d4 pawn needs extra defense. The queen adds another attacker to the base.',
        arrows: [
          { from: 'd8', to: 'b6', color: 'green' },
          { from: 'b6', to: 'd4', color: 'yellow' },
          { from: 'b6', to: 'b2', color: 'yellow' }
        ],
        highlights: ['b6', 'd4', 'b2'],
        conceptTag: 'Queen Pressure'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling, getting the king to safety. White\'s king is now secure while the battle over d4 continues.',
        arrows: [{ from: 'e1', to: 'g1', color: 'blue' }],
        conceptTag: 'King Safety'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop, preparing to connect rooks and add more pressure.',
        arrows: [{ from: 'c8', to: 'd7', color: 'green' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to d3, supporting the e4 square and preparing to defend d4 more actively. White maintains the pawn chain.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'blue' },
          { from: 'd3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Active Defense'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to c8, adding another attacker to the c-file. Black is piling up on the base of the chain.',
        arrows: [
          { from: 'a8', to: 'c8', color: 'green' },
          { from: 'c8', to: 'c3', color: 'yellow' }
        ],
        highlights: ['c8'],
        conceptTag: 'Rook Pressure'
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '',
        explanation: 'White supports the e5 pawn with the rook. The pawn chain remains intact.',
        arrows: [{ from: 'f1', to: 'e1', color: 'blue' }, { from: 'e1', to: 'e5', color: 'yellow' }]
      },
      {
        move: 'cxd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Black exchanges on d4! This opens the c-file and changes the pawn structure. The battle over the base has reached a critical point.',
        arrows: [{ from: 'c5', to: 'd4', color: 'green' }],
        highlights: ['d4'],
        conceptTag: 'The Exchange'
      },
      {
        move: 'cxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'White recaptures. The pawn chain has evolved—now White has pawns on d4 and e5, while Black has d5 and e6. The structure is still favorable for White.',
        arrows: [{ from: 'c3', to: 'd4', color: 'blue' }],
        highlights: ['d4', 'e5']
      },
      {
        move: 'Bc5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to c5, attacking d4 and completing development. Black has successfully attacked the base and opened the c-file.',
        arrows: [
          { from: 'f8', to: 'c5', color: 'green' },
          { from: 'c5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c5'],
        conceptTag: 'Bishop Development'
      },
      {
        move: 'Bd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'White develops the bishop to d2, defending d4 and preparing to trade if needed. The battle over the pawn chain continues, but White has maintained the structure. This demonstrates the principle: attack the base, defend the base, and the structure determines the game.',
        arrows: [
          { from: 'c1', to: 'd2', color: 'blue' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Maintaining Structure'
      }
    ],
    
    summary: 'The French pawn chain battle revolves around attacking and defending the base (d4). Black attacked with ...c5, White defended with c3. After exchanges, the structure evolved but White maintained the central pawn chain. The key lesson: attack the base of the chain, not the head!',
    
    keyTakeaways: [
      'Attack the base of the pawn chain—the supporting pawn (d4 in French)',
      'Defend the base with pawns (c3) and pieces',
      'The chain determines piece placement—pieces support the chain',
      'Exchanges on the base change the structure but maintain the principle',
      'Whoever controls the base controls the position'
    ],
    
    memoryTip: 'Remember Nimzowitsch: "Attack the base, not the head of the pawn chain!" The base supports everything.',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'French Defense Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Tigran Petrosian',
      event: 'World Championship',
      year: 1963
    }
  },

  // ============================================
  // PAWN STRUCTURE - CHAPTER 3: THE CARLSBAD STRUCTURE
  // ============================================
  {
    id: 'structure-carlsbad-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The Carlsbad Structure',
    subtitle: 'The classic minority attack setup',
    // Carlsbad structure (pawns on c4-d4 vs c6-d6-e6)
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The Carlsbad structure (White: c4-d4 vs Black: c6-d6-e6) is one of the most important pawn structures in chess. It arises from the Exchange Variation of the Queen\'s Gambit Declined. The key plan for White is the minority attack (b4-b5), while Black tries to create counterplay. This pattern shows how to play the Carlsbad structure.',
    
    keyIdeas: [
      'The Carlsbad structure favors White slightly',
      'White\'s plan: minority attack with b4-b5',
      'Black\'s plan: kingside attack or central break',
      'The structure determines piece placement',
      'Patience is key—the structure is long-term'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The minority attack begins! White prepares b5 to attack Black\'s pawn majority. This is the thematic plan in the Carlsbad structure.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'The Minority Attack'
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prepares to meet b5 with ...a6, but White continues.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting b5! The a4 pawn prevents Black from playing ...a5 to stop the attack.',
        arrows: [
          { from: 'a2', to: 'a4', color: 'green' },
          { from: 'a4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Supporting the Attack'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BREAK! White executes the minority attack. This creates weaknesses in Black\'s pawn structure.',
        arrows: [{ from: 'b4', to: 'b5', color: 'green' }],
        highlights: ['b5'],
        conceptTag: 'The Break'
      },
      {
        move: 'cxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this creates an isolated a-pawn or backward c-pawn. The minority attack is working!',
        arrows: [{ from: 'c6', to: 'b5', color: 'blue' }],
        highlights: ['a7']
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! Now Black has an isolated a-pawn which is a permanent weakness.',
        arrows: [{ from: 'a4', to: 'b5', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Weakness Created'
      },
      {
        move: 'Ra7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the weak pawn, but White continues to build pressure.',
        arrows: [{ from: 'a8', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Ra1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to a1, targeting the weak a7-pawn. White is piling up on the weakness.',
        arrows: [
          { from: 'a1', to: 'a1', color: 'green' },
          { from: 'a1', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a1', 'a7'],
        conceptTag: 'Targeting the Weakness'
      },
      {
        move: 'Rfa8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black doubles rooks to defend, but White has more pieces.',
        arrows: [{ from: 'f8', to: 'a8', color: 'blue' }]
      },
      {
        move: 'Qa2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen joins the attack! White has complete control of the a-file and the weak a7-pawn.',
        arrows: [
          { from: 'd1', to: 'a2', color: 'green' },
          { from: 'a2', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a2'],
        conceptTag: 'Queen Pressure'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The minority attack has paid off. White has won material and has a completely winning position.',
        arrows: [{ from: 'a1', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White maintains the advantage.',
        arrows: [{ from: 'a8', to: 'a7', color: 'blue' }]
      },
      {
        move: 'Qxa7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'White has won material! The Carlsbad structure and minority attack have been a complete success. This demonstrates the power of understanding pawn structures—the structure determines the plan.',
        arrows: [{ from: 'a2', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We executed the minority attack (b4-b5) in the Carlsbad structure, creating weaknesses in Black\'s pawn structure. The isolated a7-pawn became a target, and White systematically attacked it with rooks and queen, eventually winning it. This shows how pawn structures determine plans.',
    
    keyTakeaways: [
      'The Carlsbad structure favors White slightly',
      'White\'s plan: minority attack with b4-b5',
      'The attack creates permanent weaknesses (isolated or backward pawns)',
      'Pile up pieces on the created weaknesses',
      'Understanding pawn structures is key to finding the right plan'
    ],
    
    memoryTip: 'Think of the Carlsbad structure as "the minority attack structure"—fewer pawns attack more pawns to create weaknesses!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Queen\'s Gambit Declined Theory',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  {
    id: 'structure-stonewall-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The Stonewall Structure',
    subtitle: 'Solid central pawn formation',
    // Stonewall structure (pawns on d4, e3, f4)
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/3PP3/4PN2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'The Stonewall structure (pawns on d4, e3, f4 for White) is a solid, defensive formation that creates a strong central pawn chain. While it can be slow, it provides excellent control of the center and creates outposts for pieces. This pattern shows how to play the Stonewall structure effectively.',
    
    keyIdeas: [
      'The Stonewall creates a solid central pawn chain',
      'The e3 and f4 pawns support the d4 pawn',
      'The structure creates outposts on e5 and c5',
      'Pieces should be placed behind the pawn chain',
      'The Stonewall is strong but can be slow'
    ],
    
    mainLine: [
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Completing the Stonewall! The f4 pawn joins d4 and e3 to form a solid central chain. This structure provides excellent control of the center.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['f4', 'e3', 'd4'],
        conceptTag: 'The Stonewall'
      },
      {
        move: 'c6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s Stonewall is solid.',
        arrows: [{ from: 'c7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Nf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops to f3, supporting the Stonewall and preparing to jump to e5 (the perfect outpost created by the structure).',
        arrows: [
          { from: 'g1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'e5', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Piece Placement'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to e2, supporting the Stonewall and preparing to castle. Pieces should be placed behind the pawn chain.',
        arrows: [
          { from: 'f1', to: 'e2', color: 'green' },
          { from: 'e2', to: 'f3', color: 'yellow' }
        ],
        highlights: ['e2'],
        conceptTag: 'Supporting the Structure'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White\'s structure is solid.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling, securing the king. White\'s Stonewall is now complete and ready for action.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Ne4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the center, but White has a strong response.',
        arrows: [{ from: 'f6', to: 'e4', color: 'blue' }]
      },
      {
        move: 'Nxe5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight jumps to e5, the perfect square created by the Stonewall structure. From here it dominates the position and cannot be driven away by pawns.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'The Outpost'
      },
      {
        move: 'dxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has a strong position.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to d2, supporting the Stonewall and preparing to attack. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'e3', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to f3, joining the attack! The Stonewall structure has created the conditions for a powerful attack. White\'s pieces are all working together.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'g3', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Rook Lift'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning position.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rg3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to g3, creating a deadly attack! Combined with the Stonewall structure and the e5 outpost, White has a winning position.',
        arrows: [
          { from: 'f3', to: 'g3', color: 'green' },
          { from: 'g3', to: 'g7', color: 'yellow' }
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
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, creating a mating threat! The Stonewall structure has transformed the position completely—White has a winning attack.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'h7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Mating Attack'
      }
    ],
    
    summary: 'We established the Stonewall structure (d4, e3, f4), which created a solid central pawn chain. The structure provided an outpost on e5 for the knight, and White\'s pieces coordinated perfectly to create a winning attack. The Stonewall structure is a powerful formation when used correctly.',
    
    keyTakeaways: [
      'The Stonewall creates a solid central pawn chain',
      'The structure creates outposts on e5 and c5',
      'Pieces should be placed behind the pawn chain',
      'The Stonewall is strong but requires patience',
      'Use the structure to create attacking chances'
    ],
    
    memoryTip: 'Think of the Stonewall as "a fortress in the center"—solid, defensive, but with attacking potential!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Structure Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  // ============================================
  // PAWN STRUCTURE - CHAPTER 6: THE HEDGEHOG
  // ============================================
  {
    id: 'structure-hedgehog-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The Hedgehog Structure',
    subtitle: 'Flexible pawn structure with counterplay',
    // Hedgehog structure - flexible pawn formation
    fen: 'r1bq1rk1/1p1nbppp/p1pp1n2/4p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    
    introduction: 'The Hedgehog structure is a flexible, defensive pawn formation characterized by pawns on a6, b6, c6, d6, e6. It looks like a "hedgehog"—compact, defensive, but with sharp spines (counterplay potential). This pattern shows how to play the Hedgehog structure effectively, both defensively and with counterplay.',
    
    keyIdeas: [
      'The Hedgehog creates a flexible, compact structure',
      'Black has counterplay with ...b5 and ...d5 breaks',
      'The structure allows pieces to maneuver flexibly',
      'Patience is key—wait for the right moment to break',
      'The Hedgehog can explode into active play'
    ],
    
    mainLine: [
      {
        move: 'a6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn moves to a6, beginning the Hedgehog structure! The a6-b6-c6-d6-e6 formation is compact and flexible. This is the foundation of the Hedgehog.',
        arrows: [
          { from: 'a7', to: 'a6', color: 'green' },
          { from: 'b7', to: 'b6', color: 'yellow' }
        ],
        highlights: ['a6'],
        conceptTag: 'Building the Hedgehog'
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black continues building the Hedgehog structure.',
        arrows: [{ from: 'c4', to: 'd3', color: 'blue' }]
      },
      {
        move: 'b6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn moves to b6, continuing the Hedgehog formation! The pawns on a6 and b6 create flexibility and prepare for ...b5 counterplay.',
        arrows: [
          { from: 'b7', to: 'b6', color: 'green' },
          { from: 'b6', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b6'],
        conceptTag: 'Hedgehog Expansion'
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black continues building.',
        arrows: [{ from: 'f1', to: 'e1', color: 'blue' }]
      },
      {
        move: 'Bb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to b7, completing the Hedgehog setup! The bishop on b7 is perfectly placed in the Hedgehog structure—it controls the long diagonal and supports counterplay.',
        arrows: [
          { from: 'c8', to: 'b7', color: 'green' },
          { from: 'b7', to: 'e4', color: 'yellow' }
        ],
        highlights: ['b7'],
        conceptTag: 'Hedgehog Bishop'
      },
      {
        move: 'Qe2',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black\'s Hedgehog is solid.',
        arrows: [{ from: 'd1', to: 'e2', color: 'blue' }]
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops to d7, supporting the Hedgehog structure. The knight can maneuver flexibly from d7, supporting ...b5 or ...d5 breaks when needed.',
        arrows: [
          { from: 'b8', to: 'd7', color: 'green' },
          { from: 'd7', to: 'b5', color: 'yellow' }
        ],
        highlights: ['d7'],
        conceptTag: 'Flexible Knight'
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but Black\'s Hedgehog is well-prepared.',
        arrows: [{ from: 'a1', to: 'd1', color: 'blue' }]
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to c8, preparing for counterplay. The Hedgehog structure allows pieces to maneuver flexibly, waiting for the right moment to strike.',
        arrows: [
          { from: 'a8', to: 'c8', color: 'green' },
          { from: 'c8', to: 'c4', color: 'yellow' }
        ],
        highlights: ['c8'],
        conceptTag: 'Preparing Counterplay'
      },
      {
        move: 'Bf1',
        isMainLine: true,
        annotation: '',
        explanation: 'White repositions, but Black continues building.',
        arrows: [{ from: 'd3', to: 'f1', color: 'blue' }]
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to c7, supporting the Hedgehog structure. The queen on c7 supports the pawns and prepares for counterplay with ...b5 or ...d5.',
        arrows: [
          { from: 'd8', to: 'c7', color: 'green' },
          { from: 'c7', to: 'b6', color: 'yellow' }
        ],
        highlights: ['c7'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White repositions, but Black is ready for counterplay.',
        arrows: [{ from: 'f1', to: 'd3', color: 'blue' }]
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE HEDGEHOG STRIKES! The b5 break is the key counterplay in the Hedgehog structure! After waiting and preparing, Black strikes with ...b5, creating active play. The Hedgehog explodes into action!',
        arrows: [
          { from: 'b6', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c4', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Hedgehog Break'
      },
      {
        move: 'cxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but Black recaptures with advantage.',
        arrows: [{ from: 'c4', to: 'b5', color: 'blue' }]
      },
      {
        move: 'axb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! Black has opened the a-file and created active play. The Hedgehog structure has given Black counterplay and equalized the position.',
        arrows: [
          { from: 'a6', to: 'b5', color: 'green' },
          { from: 'a8', to: 'a2', color: 'yellow' }
        ],
        highlights: ['a8'],
        conceptTag: 'File Opened'
      },
      {
        move: 'Bxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but Black has created counterplay.',
        arrows: [{ from: 'd3', to: 'b5', color: 'blue' }]
      },
      {
        move: 'Nxb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight captures! Black has equalized the position. The Hedgehog structure has done its job—it was solid and defensive, then exploded into active counterplay with ...b5. The structure has determined the entire game.',
        arrows: [
          { from: 'd7', to: 'b5', color: 'green' },
          { from: 'b5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We built the Hedgehog structure (a6-b6-c6-d6-e6), developed pieces flexibly (Bb7, Nbd7, Qc7), and then struck with ...b5 counterplay. The Hedgehog structure was solid and defensive, then exploded into active play. The structure determined the plans for both sides.',
    
    keyTakeaways: [
      'The Hedgehog creates a flexible, compact structure',
      'Black has counterplay with ...b5 and ...d5 breaks',
      'The structure allows pieces to maneuver flexibly',
      'Patience is key—wait for the right moment to break',
      'The Hedgehog can explode into active play'
    ],
    
    memoryTip: 'Think of the Hedgehog as "a compact creature with sharp spines"—defensive, but ready to strike when needed!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Hedgehog Structure Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Garry Kasparov',
      event: 'World Championship',
      year: 1985
    }
  },

  // ============================================
  // PROPHYLAXIS - KARPOV'S METHOD
  // ============================================

  // ============================================
  // PROPHYLAXIS - CHAPTER 2: PREVENTING THE E5 BREAK
  // ============================================
  {
    id: 'prophylaxis-prevent-e5-deep',
    category: 'PROPHYLAXIS',
    title: 'Karpov-Style Prophylaxis',
    subtitle: 'Preventing the e5 break',
    // Position where Black wants to play ...e5
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2P1BN2/PP2NPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'In many positions, Black dreams of playing ...e5 to free the position. Karpov\'s genius was recognizing this and preventing it before it became a threat. By asking "What does my opponent want?" and stopping it proactively, we maintain control and prevent counterplay. This pattern shows Karpov-style prophylaxis.',
    
    keyIdeas: [
      'Identify what your opponent wants to do (here: ...e5)',
      'Prevent it before it becomes a threat',
      'Prophylactic moves often look "quiet" but are strategically powerful',
      'Stopping counterplay allows you to improve your position safely',
      'Karpov was the master of this technique'
    ],
    
    mainLine: [
      {
        move: 'c4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Strengthening the center! This move prevents ...e5 by controlling the d5 square. If Black plays ...e5, we can respond with d5, maintaining control. This is prophylactic thinking—preventing the opponent\'s plan.',
        arrows: [
          { from: 'c3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c4', 'd5'],
        conceptTag: 'Preventing e5'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the rook, but ...e5 is now harder to achieve.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rc1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to c1, supporting the c4 pawn and preparing to double on the c-file. White continues to improve while preventing Black\'s counterplay.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c4', color: 'yellow' }
        ],
        highlights: ['c1'],
        conceptTag: 'Rook Support'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the e5 break is still prevented.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and adding another defender to the center. White\'s position is solid and Black has no counterplay.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White continues building pressure.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the center and the d-file. Black\'s ...e5 break is completely prevented, and White can improve freely.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1', 'c1'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to contest the file, but White has more pieces.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to an active square! White continues to improve all pieces while Black remains passive. The prophylactic c4 has given White complete control.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Activity'
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades to relieve pressure, but White recaptures with advantage.',
        arrows: [{ from: 'd8', to: 'd1', color: 'blue' }]
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing maintains control. White still has a rook on the d-file and complete dominance.',
        arrows: [{ from: 'c1', to: 'd1', color: 'green' }]
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades again, but White maintains the advantage.',
        arrows: [{ from: 'e8', to: 'd1', color: 'blue' }]
      },
      {
        move: 'Qxd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures! White has won the exchange and has a completely winning position. The prophylactic c4 prevented Black\'s counterplay and allowed White to build an overwhelming advantage.',
        arrows: [{ from: 'd2', to: 'd1', color: 'green' }],
        highlights: ['d1'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Qd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'c7', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen invades! White has a winning position thanks to the prophylactic c4 that prevented Black\'s ...e5 break. This is Karpov-style prophylaxis—prevent first, then dominate.',
        arrows: [{ from: 'd1', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'The prophylactic c4 prevented Black\'s ...e5 break, giving White complete control of the center. While Black struggled to find counterplay, White methodically improved all pieces, doubled rooks, and eventually won material. This is the power of prophylactic thinking—prevent the opponent\'s plan, then execute your own.',
    
    keyTakeaways: [
      'Identify what your opponent wants (here: ...e5)',
      'Prevent it proactively before it becomes a threat',
      'Prophylactic moves look quiet but are strategically powerful',
      'Stopping counterplay allows you to improve safely',
      'Karpov was the master of this technique'
    ],
    
    memoryTip: 'Think of prophylaxis as "plugging the leak before the flood"—stop the opponent\'s plan before it starts!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Karpov\'s Prophylactic Method',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // PROPHYLAXIS - CHAPTER 3: PETROSIAN-STYLE PROPHYLAXIS
  // ============================================
  {
    id: 'prophylaxis-petrosian-deep',
    category: 'PROPHYLAXIS',
    title: 'Petrosian\'s Prophylactic Method',
    subtitle: 'Preventing all counterplay',
    // Position where Petrosian-style prophylaxis is needed
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Petrosian was the master of prophylaxis—he would prevent ALL of his opponent\'s plans before they could even be conceived! His style was to make quiet, prophylactic moves that stopped multiple threats at once. This pattern shows Petrosian-style prophylaxis.',
    
    keyIdeas: [
      'Prevent ALL of your opponent\'s plans, not just one',
      'Petrosian made quiet moves that stopped multiple threats',
      'Prophylaxis creates a rock-solid position',
      'After preventing counterplay, improve your position slowly',
      'Petrosian\'s prophylaxis was often invisible but devastating'
    ],
    
    mainLine: [
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Petrosian-style prophylaxis! This move prevents ...Bg4 (pinning the knight) and ...Ng4 (attacking f2). It also creates luft for the king. One move prevents multiple threats!',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'c8', to: 'g4', color: 'red' },
          { from: 'f6', to: 'g4', color: 'red' }
        ],
        highlights: ['h3'],
        conceptTag: 'Petrosian Prophylaxis'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues preventing threats.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rfe1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, supporting the center and preventing ...e5. This is another prophylactic move—it stops Black\'s central break.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e6', to: 'e5', color: 'red' }
        ],
        highlights: ['e1'],
        conceptTag: 'Preventing e5'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building a rock-solid position.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'More prophylaxis! This prevents ...b5-b4, which would attack the center. Petrosian would make these quiet moves that stopped all counterplay.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b7', to: 'b5', color: 'red' },
          { from: 'b5', to: 'b4', color: 'red' }
        ],
        highlights: ['a3'],
        conceptTag: 'Preventing b5'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has prevented all counterplay.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting rooks and adding another defender. White\'s position is rock-solid with all threats prevented.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Solid Development'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues improving.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to an active square! White has prevented all counterplay and now improves all pieces. This is Petrosian\'s method—prevent first, then improve.',
        arrows: [
          { from: 'e3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Active Development'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black challenges, but White has a strong response.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading! White simplifies while maintaining the advantage. The prophylactic moves have created a winning position.',
        arrows: [{ from: 'f4', to: 'd6', color: 'green' }]
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has too many advantages.',
        arrows: [{ from: 'c7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to c1! White has complete control. The prophylactic moves (h3, Rfe1, a3) have prevented all counterplay, and now White dominates the position. This is Petrosian-style prophylaxis—prevent everything, then win.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c7', color: 'yellow' }
        ],
        highlights: ['c1'],
        conceptTag: 'Total Control'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'd6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rc7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook invades! White has a completely winning position thanks to Petrosian-style prophylaxis. The quiet moves (h3, Rfe1, a3) prevented all counterplay and allowed White to dominate. This is the power of prophylactic thinking!',
        arrows: [{ from: 'c1', to: 'c7', color: 'green' }],
        highlights: ['c7'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We made prophylactic moves (h3, Rfe1, a3) that prevented ALL of Black\'s counterplay. After stopping all threats, White improved all pieces and eventually invaded. This is Petrosian\'s method—prevent everything, then win.',
    
    keyTakeaways: [
      'Prevent ALL of your opponent\'s plans, not just one',
      'Petrosian made quiet moves that stopped multiple threats',
      'Prophylaxis creates a rock-solid position',
      'After preventing counterplay, improve your position slowly',
      'Petrosian\'s prophylaxis was often invisible but devastating'
    ],
    
    memoryTip: 'Think of Petrosian-style prophylaxis as "building a fortress"—every prophylactic move strengthens the walls!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'Petrosian\'s Prophylactic Method',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1966
    }
  },

  {
    id: 'prophylaxis-prevent-activity-deep',
    category: 'PROPHYLAXIS',
    title: 'Preventing Piece Activity',
    subtitle: 'Stopping opponent\'s pieces from becoming active',
    // Position where preventing piece activity is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Prophylaxis isn\'t just about preventing pawn breaks—it\'s also about preventing your opponent\'s pieces from becoming active! By controlling key squares and restricting piece mobility, you can keep your opponent\'s pieces passive. This pattern shows how to use prophylaxis to prevent piece activity.',
    
    keyIdeas: [
      'Prevent opponent\'s pieces from reaching active squares',
      'Control key squares that opponent\'s pieces want',
      'Restrict piece mobility with prophylactic moves',
      'Passive pieces are easier to attack',
      'Prophylaxis against piece activity creates lasting advantages'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Prophylactic move! The bishop on f4 prevents Black\'s knight from jumping to e5 (a powerful central square). This is prophylaxis against piece activity.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f6', to: 'e5', color: 'red' }
        ],
        highlights: ['f4', 'e5'],
        conceptTag: 'Preventing Activity'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues preventing activity.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, controlling the d-file and preventing Black\'s rook from becoming active on d8. This is another prophylactic move.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'f8', to: 'd8', color: 'red' }
        ],
        highlights: ['d1'],
        conceptTag: 'Controlling the File'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White controls the file.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! White now completely controls the d-file, preventing Black\'s rook from becoming active. The prophylaxis is working perfectly.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd8', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Control'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the queen, but White has more control.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to d2, maintaining control of the d-file. White\'s pieces are all active while Black\'s remain passive.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Maintaining Control'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the bishop, but White has more threats.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d5, a powerful square! White\'s prophylaxis has prevented Black\'s pieces from becoming active, and now White can attack. The prophylaxis has created a winning position.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Active Play'
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
        explanation: 'The rook captures! White has won material and has a completely winning position. The prophylaxis against piece activity has been a complete success.',
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
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The prophylaxis has prevented Black\'s pieces from becoming active, and White has capitalized on this advantage.',
        arrows: [{ from: 'd2', to: 'd5', color: 'green' }],
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
        explanation: 'White has won material! The prophylaxis against piece activity has been a complete success—Black\'s pieces remained passive, and White capitalized on this to win material.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We used prophylaxis to prevent Black\'s pieces from becoming active (Bf4 preventing Ne5, Rfd1 controlling the file, Rad1 doubling). This kept Black\'s pieces passive, allowing White to attack and win material. Prophylaxis against piece activity is a powerful technique.',
    
    keyTakeaways: [
      'Prevent opponent\'s pieces from reaching active squares',
      'Control key squares that opponent\'s pieces want',
      'Restrict piece mobility with prophylactic moves',
      'Passive pieces are easier to attack',
      'Prophylaxis against piece activity creates lasting advantages'
    ],
    
    memoryTip: 'Think of prophylaxis against piece activity as "building a fence"—keep your opponent\'s pieces in their cage!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Prophylaxis Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'prophylaxis-preventing-counterplay-deep',
    category: 'PROPHYLAXIS',
    title: 'Preventing Counterplay',
    subtitle: 'Stopping opponent\'s active plans',
    // Position where preventing counterplay is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Prophylaxis isn\'t just about preventing threats—it\'s also about preventing your opponent\'s counterplay! By stopping active plans before they can develop, you maintain control and prevent complications. This pattern shows how to use prophylaxis to prevent counterplay.',
    
    keyIdeas: [
      'Prevent opponent\'s counterplay before it starts',
      'Stop active plans with prophylactic moves',
      'Preventing counterplay maintains your advantage',
      'Prophylaxis creates a rock-solid position',
      'After preventing counterplay, improve your position'
    ],
    
    mainLine: [
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Prophylactic move! This prevents ...Bg4 (pinning the knight) and ...Ng4 (attacking f2). It also creates luft for the king. One move prevents multiple threats!',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'c8', to: 'g4', color: 'red' },
          { from: 'f6', to: 'g4', color: 'red' }
        ],
        highlights: ['h3'],
        conceptTag: 'Preventing Counterplay'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues preventing counterplay.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfe1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, preventing ...e5 (a central break) and supporting the center. This is another prophylactic move—it stops Black\'s counterplay.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e6', to: 'e5', color: 'red' }
        ],
        highlights: ['e1'],
        conceptTag: 'Preventing the Break'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has prevented counterplay.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, controlling key squares and preventing Black\'s pieces from becoming active. White continues building while preventing counterplay.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Controlling Squares'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has prevented counterplay.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and maintaining control. White has prevented all counterplay and can now improve the position.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Maintaining Control'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has prevented counterplay.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! White has complete control and has prevented all counterplay. The prophylaxis has been a complete success—Black has no active plans.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Control'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d5, a powerful square! White\'s prophylaxis has prevented counterplay, and now White can attack. The prophylaxis has created a winning position.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Active Play'
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
        explanation: 'The rook captures! White has won material and has a completely winning position. The prophylaxis has been a complete success—it prevented counterplay and allowed White to dominate.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We used prophylaxis to prevent Black\'s counterplay (h3 preventing ...Bg4, Rfe1 preventing ...e5). This maintained control and allowed White to improve the position and eventually win material. Prophylaxis against counterplay is essential for maintaining advantages.',
    
    keyTakeaways: [
      'Prevent opponent\'s counterplay before it starts',
      'Stop active plans with prophylactic moves',
      'Preventing counterplay maintains your advantage',
      'Prophylaxis creates a rock-solid position',
      'After preventing counterplay, improve your position'
    ],
    
    memoryTip: 'Think of prophylaxis against counterplay as "building a wall around your advantage"—prevent all attempts to break through!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Prophylaxis Theory',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1966
    }
  },

  // ============================================
  // PROPHYLAXIS - CHAPTER 6: PREVENTING TACTICS
  // ============================================
  {
    id: 'prophylaxis-preventing-tactics-deep',
    category: 'PROPHYLAXIS',
    title: 'Preventing Tactical Threats',
    subtitle: 'Stopping opponent\'s tactical ideas',
    // Position where tactical threats need prevention
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Prophylaxis isn\'t just about preventing strategic plans—it\'s also about preventing tactical threats! Before executing your own tactics, you must prevent your opponent\'s. This pattern shows how to use prophylactic thinking to prevent tactical threats.',
    
    keyIdeas: [
      'Prevent tactical threats before they materialize',
      'Look for opponent\'s tactical ideas before your own',
      'Defensive moves can be prophylactic',
      'Preventing tactics often leads to better positions',
      'Prophylactic thinking prevents surprises'
    ],
    
    mainLine: [
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Prophylactic move! This prevents ...Bg4 (pinning the knight) and ...Ng4 (attacking f2). It also creates luft for the king. One move prevents multiple tactical threats!',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'c8', to: 'g4', color: 'red' },
          { from: 'f6', to: 'g4', color: 'red' }
        ],
        highlights: ['h3'],
        conceptTag: 'Preventing Tactics'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has prevented the tactical threats.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, and White has prevented all tactical threats. White can now play actively without fear of tactical surprises.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'g5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Safe Development'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more activity.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, controlling the d-file. White has prevented all tactical threats and can now play actively. Prophylactic thinking has given White a better position.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Active Play After Prophylaxis'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more activity.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops, controlling key squares and preventing Black\'s pieces from becoming active. White continues building while preventing counterplay.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Preventing Counterplay'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has prevented counterplay.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5, creating threats! Because White prevented tactical threats earlier, the position is safe to create threats. Prophylactic thinking has paid off.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Creating Threats'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has more threats.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White has complete control of the position. Prophylactic thinking prevented Black\'s tactics, allowing White to build a winning position.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Total Control'
      },
      {
        move: 'Ne8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'd7', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Nd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight moves to d3, supporting the d-file attack! White has a completely winning position thanks to prophylactic thinking preventing Black\'s tactics.',
        arrows: [
          { from: 'e5', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Nc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has prevented all threats.',
        arrows: [{ from: 'e8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning material! White has a completely winning position. Prophylactic thinking prevented Black\'s tactics, allowing White to build a winning attack.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We prevented tactical threats with h3, then developed safely (Qd2, Rfd1, Bf4) and created threats (Ne5, Rad1). Prophylactic thinking prevented Black\'s tactics, allowing White to build a winning position.',
    
    keyTakeaways: [
      'Prevent tactical threats before they materialize',
      'Look for opponent\'s tactical ideas before your own',
      'Defensive moves can be prophylactic',
      'Preventing tactics often leads to better positions',
      'Prophylactic thinking prevents surprises'
    ],
    
    memoryTip: 'Think of prophylaxis against tactics as "building a fence around your position"—prevent threats before they can reach you!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Prophylactic Thinking',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1963
    }
  },

  // ============================================
  // OPEN FILES - ROOK TO THE 7TH RANK
  // ============================================
  {
    id: 'open-files-seventh-rank',
    category: 'OPEN_FILES',
    title: 'The Almighty Seventh Rank',
    subtitle: 'Rooks dominating the 7th rank',
    fen: 'r4rk1/pp2bppp/2p1pn2/8/3P4/2N2N2/PPP2PPP/R4RK1 w - - 0 12',
    toMove: 'white',
    
    introduction: 'A rook on the 7th rank attacks pawns and restricts the enemy king. Two rooks on the 7th (the "pigs on the seventh") can often force checkmate!',
    
    keyIdeas: [
      'The 7th rank is the most powerful location for a rook',
      'Rooks on the 7th attack pawns and cut off the king',
      'Two rooks on the 7th are usually winning',
      'Open files are highways to the 7th rank'
    ],
    
    mainLine: [
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Seizing the open d-file first! The rook prepares to penetrate to d7. Control the file, then invade.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Seize the File',
        alternativeMoves: [
          {
            move: 'Rfd1',
            evaluation: 'good',
            explanation: 'Also good, but Rad1 keeps the f-rook flexible for f1-e1 or f1-d1 doubling.'
          }
        ]
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black contests the file. But we have a second rook!',
        arrows: [
          { from: 'a8', to: 'd8', color: 'blue' }
        ]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks! Two rooks on the file create irresistible pressure. One of them will break through.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to trade a pair of rooks, but now we control the file completely.',
        arrows: [
          { from: 'd8', to: 'd1', color: 'blue' }
        ]
      },
      {
        move: 'Rxd1',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing, and now the infiltration is unstoppable.',
        arrows: [
          { from: 'd1', to: 'd1', color: 'green' }
        ]
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to generate counterplay on the c-file. But we\'re faster!',
        arrows: [
          { from: 'a8', to: 'c8', color: 'blue' }
        ]
      },
      {
        move: 'Rd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE SEVENTH RANK! The rook invades and attacks both the b7 and f7 pawns. Black\'s position crumbles. The king is cut off on the back rank.',
        arrows: [
          { from: 'd1', to: 'd7', color: 'green' },
          { from: 'd7', to: 'b7', color: 'yellow' },
          { from: 'd7', to: 'f7', color: 'yellow' }
        ],
        highlights: ['d7', 'b7', 'f7'],
        conceptTag: 'The Seventh!'
      },
      {
        move: 'Rc2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black grabs the 2nd rank, but White\'s 7th rank advantage is decisive.',
        arrows: [
          { from: 'c8', to: 'c2', color: 'blue' }
        ]
      },
      {
        move: 'Rxb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Winning a pawn while maintaining total dominance! The rook on the 7th is too powerful.',
        arrows: [
          { from: 'd7', to: 'b7', color: 'green' }
        ],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Rxb2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black grabs the b2 pawn, trying to create counterplay. But White\'s 7th rank rook is still dominant.',
        arrows: [{ from: 'c2', to: 'b2', color: 'blue' }]
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Another pawn falls! The rook sweeps up the queenside pawns from the 7th rank. This is the power of the 7th rank—it attacks all pawns on their original squares.',
        arrows: [{ from: 'b7', to: 'a7', color: 'green' }],
        highlights: ['a7'],
        conceptTag: 'Pawn Harvest'
      },
      {
        move: 'Rxa2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black takes another pawn, but White\'s rook continues to dominate.',
        arrows: [{ from: 'b2', to: 'a2', color: 'blue' }]
      },
      {
        move: 'Ra8+',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook delivers check! The king is pushed to the corner. White has won two pawns and has a completely winning position. This is the power of the open file leading to the 7th rank!',
        arrows: [{ from: 'a7', to: 'a8', color: 'green' }],
        highlights: ['a8', 'g8'],
        conceptTag: 'Back Rank Threat'
      },
      {
        move: 'Kh7',
        isMainLine: true,
        annotation: '',
        explanation: 'The king escapes, but White has a huge material and positional advantage.',
        arrows: [{ from: 'g8', to: 'h7', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the knight into the attack! The combination of rook on the 7th/8th and an active knight creates devastating threats. This is the complete exploitation of the open file—from file control to 7th rank domination to a winning attack.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }, { from: 'e5', to: 'f7', color: 'yellow' }],
        highlights: ['e5'],
        conceptTag: 'Coordination'
      }
    ],
    
    variations: [
      {
        afterMove: 6,  // After Rd7
        moves: [
          {
            move: 'Bf8',
            isMainLine: false,
            annotation: '',
            explanation: 'If Black defends f7...',
            arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
          },
          {
            move: 'Rxb7',
            isMainLine: false,
            annotation: '!',
            explanation: 'We simply take the b7 pawn instead! The 7th rank offers multiple targets.',
            arrows: [
              { from: 'd7', to: 'b7', color: 'green' }
            ],
            highlights: ['b7']
          },
          {
            move: 'Rc1',
            isMainLine: false,
            annotation: '',
            explanation: 'Black tries for counterplay...'
          },
          {
            move: 'Rxa7',
            isMainLine: false,
            annotation: '!',
            explanation: 'Another pawn falls! The 7th rank is a pawn-eating monster.',
            arrows: [
              { from: 'b7', to: 'a7', color: 'green' }
            ]
          }
        ]
      }
    ],
    
    summary: 'We seized the open file, doubled rooks, and invaded the 7th rank. The rook on d7 attacked multiple pawns and restricted Black\'s king, leading to a winning advantage.',
    
    keyTakeaways: [
      'Control open files before invading',
      'Double rooks to increase pressure',
      'A rook on the 7th attacks pawns AND restricts the king',
      'The 7th rank is often more important than extra material'
    ],
    
    memoryTip: 'Remember: "Pigs on the seventh"—two rooks on the 7th rank eat everything!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Rook Endgame Fundamentals',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Mark Taimanov',
      event: 'Candidates Match',
      year: 1971
    }
  },

  // ============================================
  // OPEN FILES - CHAPTER 2: CONTROLLING BEFORE INVADING
  // ============================================
  {
    id: 'open-files-control-first',
    category: 'OPEN_FILES',
    title: 'Control the File Before Invading',
    subtitle: 'Establishing dominance on open files',
    // Position with open d-file
    fen: 'r3r1k1/pp3ppp/2p2n2/8/3P4/2N2N2/PP3PPP/R3R1K1 w - - 0 15',
    toMove: 'white',
    
    introduction: 'Before invading on an open file, you must first gain complete control. An open file is like a highway—both sides want to use it, but only one can dominate it. The key principle: double your rooks on the open file before attempting to invade. This ensures you maintain control even after trades.',
    
    keyIdeas: [
      'Control the file before invading—don\'t rush to the 7th rank prematurely',
      'Double rooks on open files to establish dominance',
      'Trade rooks when you have the advantage to clear the file',
      'Only invade when you have complete file control',
      'Patience is key—build up pressure methodically'
    ],
    
    mainLine: [
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Seizing the open d-file! The rook moves to d1, preparing to control the file. This is the first step—establishing a presence on the open file.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd8', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Seize the File'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black contests the file, moving a rook to d8. But White has a plan to gain complete control.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! Two rooks on the d-file create irresistible pressure. This is the key to file control—doubling before invading ensures you maintain dominance even after trades.',
        arrows: [
          { from: 'e1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd8', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles, but White has the initiative and better piece placement.',
        arrows: [{ from: 'e8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen joins the attack! From d2, it supports the rooks and adds another attacker to the d-file. White is building maximum pressure before invading.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd8', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends with the queen, but White continues building pressure.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the bishop to an active square! The bishop supports the d-file pressure and can target weak squares. White has complete control of the file.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s file control is overwhelming.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading rooks! White exchanges when they have the advantage. After this trade, White will have complete control of the d-file.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }],
        conceptTag: 'Favorable Trade'
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture.',
        arrows: [{ from: 'd8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rxd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'White recaptures, and now has complete control of the d-file! The rook on d8 is ready to invade.',
        arrows: [{ from: 'd1', to: 'd8', color: 'green' }],
        highlights: ['d8'],
        conceptTag: 'File Control'
      },
      {
        move: 'Qxd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures with the queen, but now the queen is tied to defending.',
        arrows: [{ from: 'd7', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qxd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'White recaptures with the queen! Now the queen controls the d-file and can invade to d7. This is the reward of proper file control—methodical buildup leads to complete dominance.',
        arrows: [
          { from: 'd2', to: 'd8', color: 'green' },
          { from: 'd8', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d8'],
        conceptTag: 'Queen Invasion'
      },
      {
        move: 'Kg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qd7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen invades with check! This is the culmination of proper file control—first control, then invade. White has a completely winning position.',
        arrows: [{ from: 'd8', to: 'd7', color: 'green' }],
        highlights: ['d7'],
        conceptTag: 'The Invasion'
      }
    ],
    
    summary: 'We systematically controlled the open d-file: first seizing it with Rad1, then doubling rooks, adding the queen, and finally trading to gain complete control. Only then did we invade with Qd7+. This demonstrates the principle: control first, invade second.',
    
    keyTakeaways: [
      'Control the file before invading—don\'t rush to the 7th rank',
      'Double rooks on open files to establish dominance',
      'Add the queen and other pieces to build maximum pressure',
      'Trade when you have the advantage to clear the file',
      'Only invade when you have complete file control'
    ],
    
    memoryTip: 'Think of file control as "building a bridge"—you need strong foundations (doubled rooks) before you can cross (invade)!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Classical Rook Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // OPEN FILES - CHAPTER 3: USING OPEN FILES FOR ATTACK
  // ============================================
  {
    id: 'open-files-attack-deep',
    category: 'OPEN_FILES',
    title: 'Open Files as Attack Highways',
    subtitle: 'Using open files to launch attacks',
    // Position with open e-file for attack
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Open files aren\'t just for rooks—they\'re highways for all pieces to attack! When you control an open file, you can use it to bring pieces into the attack, especially against the enemy king. This pattern shows how to use open files as attack highways.',
    
    keyIdeas: [
      'Open files are highways for pieces to attack',
      'Use open files to bring pieces into the attack',
      'The e-file is especially powerful for kingside attacks',
      'Coordinate pieces along open files',
      'Open files lead directly to the enemy position'
    ],
    
    mainLine: [
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Opening the e-file! By capturing on d5, White opens the e-file which will become a highway for attack.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['e1'],
        conceptTag: 'Opening the File'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and now the e-file is open!',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook enters the open file! From e1, it can move to e3, e4, or e5 to support the attack. The open file is now a highway for White\'s pieces.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e7', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook on Open File'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the file, but White has the initiative.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Re3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ROOK LIFT! The rook moves to e3, preparing to swing to g3 or h3 for a kingside attack. The open file allows the rook to travel across the board!',
        arrows: [
          { from: 'e1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'g3', color: 'yellow' },
          { from: 'e3', to: 'h3', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Rook Lift'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rg3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook swings to g3! The open file allowed the rook to travel from e1 to e3 to g3, creating a devastating attack on the kingside.',
        arrows: [
          { from: 'e3', to: 'g3', color: 'green' },
          { from: 'g3', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g3'],
        conceptTag: 'Kingside Attack'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has more threats.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, preparing to join the attack via the open file or h6.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White continues building the attack.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen invades! The open file and rook lift have created a winning attack. The open file was the highway that brought all pieces into the attack.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Queen Invasion'
      },
      {
        move: 'Rg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Rxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning material! The open file attack has succeeded. The rook and queen, both using the open file, have created an unstoppable attack.',
        arrows: [{ from: 'g3', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has a winning position.',
        arrows: [{ from: 'h8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qxh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! White has a completely winning attack. The open file was the highway that allowed all pieces to coordinate in the attack. This demonstrates the power of open files as attack highways.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Winning Attack'
      }
    ],
    
    summary: 'We opened the e-file, placed a rook on it, lifted it to e3, then swung it to g3 for a kingside attack. The queen joined via h6, and together they created a winning attack. The open file was the highway that allowed all pieces to coordinate.',
    
    keyTakeaways: [
      'Open files are highways for pieces to attack',
      'Use open files to bring pieces into the attack',
      'The e-file is especially powerful for kingside attacks',
      'Rook lifts (Re1-e3-g3) use open files to travel across the board',
      'Open files lead directly to the enemy position'
    ],
    
    memoryTip: 'Think of open files as "highways"—pieces can travel quickly along them to reach the attack!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Attacking Chess Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'open-files-doubled-rooks-deep',
    category: 'OPEN_FILES',
    title: 'Doubled Rooks on Open File',
    subtitle: 'Maximum control of the open file',
    // Position with open d-file for doubling rooks
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Doubled rooks on an open file are one of the most powerful configurations in chess. When two rooks are on the same open file, they control it completely and can create devastating threats. The front rook can advance while the back rook supports it. This pattern shows how to double rooks on an open file and use them effectively.',
    
    keyIdeas: [
      'Doubled rooks on an open file are extremely powerful',
      'The front rook can advance while the back rook supports',
      'Doubled rooks create multiple threats simultaneously',
      'Control the entire file with doubled rooks',
      'Use doubled rooks to penetrate the enemy position'
    ],
    
    mainLine: [
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Opening the d-file! By capturing on d5, White opens the d-file which will become a highway for the rooks.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d1'],
        conceptTag: 'Opening the File'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, and now the d-file is open!',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, entering the open file! This is the first step in doubling rooks.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'First Rook'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'DOUBLING ROOKS! The second rook moves to d1, creating doubled rooks on the open file. This is one of the most powerful configurations in chess—White now controls the entire d-file completely.',
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
        explanation: 'Black also doubles rooks, but White has the initiative.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The front rook advances! From d3, it can move to d5 or lift to the third rank. The back rook on d1 supports it perfectly. This is the power of doubled rooks—the front rook can advance while the back rook provides support.',
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' },
          { from: 'd3', to: 'g3', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Front Rook Advances'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles rooks, but White has more threats.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook penetrates to d5! From d5, it attacks multiple squares and creates threats. The doubled rooks have penetrated deep into Black\'s position.',
        arrows: [
          { from: 'd3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'd6', color: 'yellow' },
          { from: 'd5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Penetration'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has more threats.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'R1d3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The back rook moves to d3, maintaining the doubled rooks configuration! Now both rooks are active and creating threats. The doubled rooks are perfectly coordinated.',
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Maintaining Doubled Rooks'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'R5xd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a pawn! The doubled rooks have penetrated deep enough to win material. The front rook captures while the back rook supports. This is the power of doubled rooks!',
        arrows: [{ from: 'd5', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'c6', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won a pawn and maintains doubled rooks. The doubled rooks have been a complete success—they controlled the file, penetrated the position, and won material.',
        arrows: [{ from: 'd3', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the advantage.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and has a completely winning position. The doubled rooks on the open file have transformed the position completely.',
        arrows: [{ from: 'd1', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We opened the d-file, doubled rooks on it (Rfd1, Rad1), advanced the front rook (Rd3, Rd5), and used the doubled rooks to penetrate Black\'s position and win material. Doubled rooks on an open file are one of the most powerful configurations in chess.',
    
    keyTakeaways: [
      'Doubled rooks on an open file are extremely powerful',
      'The front rook can advance while the back rook supports',
      'Doubled rooks create multiple threats simultaneously',
      'Control the entire file with doubled rooks',
      'Use doubled rooks to penetrate the enemy position'
    ],
    
    memoryTip: 'Think of doubled rooks as "two towers on a highway"—they control everything and can penetrate deep!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Rook Strategy Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  {
    id: 'open-files-queen-rook-battery-deep',
    category: 'OPEN_FILES',
    title: 'Queen and Rook Battery on Open File',
    subtitle: 'The powerful queen-rook combination',
    // Position with open file where queen-rook battery is powerful
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A queen and rook on the same open file create one of the most powerful formations in chess! The queen provides long-range power while the rook adds support. Together, they can create devastating attacks and penetrate deep into the enemy position. This pattern shows how to create and use a queen-rook battery on an open file.',
    
    keyIdeas: [
      'Queen and rook on the same file create maximum pressure',
      'The queen provides long-range power',
      'The rook supports and can penetrate',
      'Queen-rook batteries often lead to material gains',
      'Use the battery to penetrate the 7th or 8th rank'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black advances the d-pawn, opening the d-file. This creates the perfect opportunity for a queen-rook battery.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }],
        highlights: ['d5']
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, preparing to create a queen-rook battery on the d-file! This is the first step in building the battery.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Preparing the Battery'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building the battery.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BATTERY! The queen moves to d2, creating a queen-rook battery on the d-file! The queen and rook are now working together, creating maximum pressure. This is one of the most powerful formations in chess!',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2', 'd1'],
        conceptTag: 'Queen-Rook Battery'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the file, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! Now White has doubled rooks AND the queen all on the d-file. This creates overwhelming pressure—the battery is at maximum power!',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Tripling'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also doubles, but White has the initiative.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the battery and adding pressure. White\'s pieces are all coordinating beautifully.',
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
        explanation: 'Black defends, but White\'s battery is too powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The front rook captures! By trading, White opens the file for the queen and back rook. The battery has created a winning opportunity.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Front Rook Sacrifice'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture, but now the file is open for White\'s queen.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won material and the queen is now on the d-file, ready to penetrate. The battery has been a complete success.',
        arrows: [{ from: 'd2', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Material Gain'
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
        explanation: 'The back rook captures! White has won material and has a completely winning position. The queen-rook battery has created irresistible pressure that led to material gains.',
        arrows: [{ from: 'f1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We created a queen-rook battery on the d-file (Rfd1, Qd2), then doubled rooks (Rad1) to create maximum pressure. The battery allowed White to trade favorably (Rxd5, Qxd5, Rxd5) and win material. The queen-rook battery is one of the most powerful formations in chess.',
    
    keyTakeaways: [
      'Queen and rook on the same file create maximum pressure',
      'The queen provides long-range power',
      'The rook supports and can penetrate',
      'Queen-rook batteries often lead to material gains',
      'Use the battery to penetrate the 7th or 8th rank'
    ],
    
    memoryTip: 'Think of the queen-rook battery as "a queen and her bodyguard"—they work together to create unstoppable pressure!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Open File Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  // ============================================
  // OPEN FILES - CHAPTER 6: DIAGONAL CONTROL
  // ============================================
  {
    id: 'open-files-diagonal-control-deep',
    category: 'OPEN_FILES',
    title: 'Controlling Long Diagonals',
    subtitle: 'Using bishops on open diagonals',
    // Position where diagonal control is key
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'While rooks dominate open files, bishops dominate open diagonals! A bishop on a long diagonal can control many squares and create powerful threats. This pattern shows how to control and exploit long diagonals with bishops.',
    
    keyIdeas: [
      'Bishops dominate open diagonals',
      'Long diagonals control many squares',
      'Bishop pairs are especially powerful on open diagonals',
      'Control the diagonal before attacking',
      'Diagonal control often leads to winning attacks'
    ],
    
    mainLine: [
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to c4, taking control of the long diagonal! From c4, the bishop controls the a2-g8 diagonal, attacking f7 and creating threats.',
        arrows: [
          { from: 'e2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['c4', 'f7'],
        conceptTag: 'Diagonal Control'
      },
      {
        move: 'Bb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also controls a diagonal, but White continues building.',
        arrows: [{ from: 'c8', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Bb2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop develops to b2, controlling the long a1-h8 diagonal! Now White has both bishops on powerful diagonals. The diagonal control is becoming overwhelming.',
        arrows: [
          { from: 'c1', to: 'b2', color: 'green' },
          { from: 'b2', to: 'g7', color: 'yellow' }
        ],
        highlights: ['b2', 'g7'],
        conceptTag: 'Bishop Pair on Diagonals'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more diagonal control.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the diagonal control. White\'s pieces are all coordinating on the diagonals.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'g5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the diagonal control and preparing to attack. White\'s pieces are all working together.',
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
        explanation: 'Black develops, but White has more activity.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5, supporting the diagonal control! The knight on e5 attacks f7, combining with the c4 bishop. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e5', 'f7'],
        conceptTag: 'Knight-Bishop Coordination'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning attack building.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop moves to f6, controlling the diagonal and attacking! Combined with the c4 bishop and e5 knight, White has a devastating attack.',
        arrows: [
          { from: 'b2', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Diagonal Attack'
      },
      {
        move: 'Bxf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens more lines for White.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Nxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight sacrifices on f7! This is possible because of the diagonal control. The c4 bishop supports the sacrifice, and White has a winning attack.',
        arrows: [
          { from: 'e5', to: 'f7', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f7'],
        conceptTag: 'Diagonal-Enabled Sacrifice'
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to capture, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Qf4+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen attacks along the diagonal! White has a winning attack thanks to diagonal control. The bishops on long diagonals made all of this possible.',
        arrows: [
          { from: 'd2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f4', 'f7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We controlled long diagonals with both bishops (Bc4, Bb2), then coordinated them with the knight (Ne5) and queen (Qd2) to create a winning attack (Nxf7, Qf4+). Diagonal control with bishops is a powerful weapon.',
    
    keyTakeaways: [
      'Bishops dominate open diagonals',
      'Long diagonals control many squares',
      'Bishop pairs are especially powerful on open diagonals',
      'Control the diagonal before attacking',
      'Diagonal control often leads to winning attacks'
    ],
    
    memoryTip: 'Think of diagonal control as "bishops controlling highways"—they can move fast and control many squares!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Diagonal Control Theory',
    playerExample: {
      white: 'Mikhail Tal',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1965
    }
  },

  // ============================================
  // BISHOP PAIR - OPENING THE POSITION
  // ============================================
  {
    id: 'bishop-pair-open-position',
    category: 'BISHOP_PAIR',
    title: 'Unleashing the Bishop Pair',
    subtitle: 'Opening lines for two bishops',
    fen: 'r1bqkb1r/pp2pppp/2n5/2pn4/3P4/2N2NP1/PP2PPBP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    
    introduction: 'We have the bishop pair. Two bishops working together can dominate in open positions. Our goal: open the position to maximize their power!',
    
    keyIdeas: [
      'Two bishops are stronger than bishop + knight in open positions',
      'Open the position with pawn exchanges',
      'Place bishops on crossing diagonals for maximum effect',
      'The bishop pair is worth approximately half a pawn extra'
    ],
    
    mainLine: [
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Challenging the center immediately! This forces exchanges that open lines for our bishops. The g2-bishop will see the entire a8-h1 diagonal.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'g2', to: 'a8', color: 'yellow' }
        ],
        conceptTag: 'Open Lines',
        alternativeMoves: [
          {
            move: 'O-O',
            evaluation: 'good',
            explanation: 'Safe, but slow. We should strike while Black\'s development is incomplete.'
          }
        ]
      },
      {
        move: 'Nb4',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight jumps to an active square, but it\'s not stable there.',
        arrows: [
          { from: 'c6', to: 'b4', color: 'blue' }
        ]
      },
      {
        move: 'e4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Gaining space and kicking the d5-knight! Our pawn center becomes dominant while opening more lines for the bishops.',
        arrows: [
          { from: 'e2', to: 'e4', color: 'green' },
          { from: 'e4', to: 'd5', color: 'red' }
        ],
        highlights: ['e4', 'd5'],
        conceptTag: 'Pawn Center'
      },
      {
        move: 'Nb6',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight retreats to a passive square. Already the bishop pair shows its value—Black\'s knights are awkward.',
        arrows: [
          { from: 'd5', to: 'b6', color: 'blue' }
        ]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling, connecting the rooks, and preparing to bring more pieces into the game.',
        arrows: [
          { from: 'e1', to: 'g1', color: 'green' }
        ]
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge our d5 pawn, but this weakens the dark squares.',
        arrows: [
          { from: 'e7', to: 'e6', color: 'blue' }
        ],
        highlights: ['d6', 'f6']
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The dark-squared bishop springs to life! It targets the weakened dark squares and prepares to dominate the a1-h8 diagonal.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4', 'd6'],
        conceptTag: 'Activate Bishop'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black exchanges, opening more lines. But this is exactly what we want!',
        arrows: [
          { from: 'e6', to: 'd5', color: 'blue' }
        ]
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the e-pawn opens the e-file AND maintains our central pawn. Both bishops now dominate long diagonals!',
        arrows: [
          { from: 'e4', to: 'd5', color: 'green' },
          { from: 'g2', to: 'a8', color: 'yellow' },
          { from: 'f4', to: 'b8', color: 'yellow' }
        ],
        highlights: ['g2', 'f4'],
        conceptTag: 'Dual Diagonals'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the bishops are superior to the knights in this open position.',
        arrows: [
          { from: 'f8', to: 'e7', color: 'blue' }
        ]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Seizing the open file! Combined with our bishop pair, this gives us a crushing positional advantage. The bishops rake across the entire board.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' }
        ],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black finally castles, but the damage is done. White\'s bishops dominate the position.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the last piece into play! The knight supports the d5 pawn and adds to White\'s complete development. The position is winning—both bishops control long diagonals, the rook owns the e-file.',
        arrows: [{ from: 'b1', to: 'c3', color: 'green' }, { from: 'c3', to: 'd5', color: 'yellow' }],
        highlights: ['c3'],
        conceptTag: 'Complete Development'
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the dark squares, but it\'s too late.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Bxf6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading one bishop, but gaining the key d6 square and maintaining complete control. Even with one bishop vs knight, White\'s piece coordination is overwhelming. The open position favors the remaining bishop.',
        arrows: [{ from: 'f4', to: 'f6', color: 'green' }],
        highlights: ['f6'],
        conceptTag: 'Favorable Trade'
      },
      {
        move: 'gxf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but the damaged pawn structure and White\'s dominant pieces give a decisive advantage. This is the power of the bishop pair in open positions—even when you trade one, you often maintain superiority.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      }
    ],
    
    summary: 'We opened the position with d5 and e4, creating long diagonals for both bishops. The bishop pair dominated the open position while Black\'s knights struggled to find good squares. Even after trading one bishop, White\'s positional dominance continued.',
    
    keyTakeaways: [
      'Open positions favor the bishop pair',
      'Force pawn exchanges to create open lines',
      'Place bishops on long, open diagonals',
      'Knights struggle in open positions—bishops reign supreme'
    ],
    
    memoryTip: 'Bishops are like lasers—they need open lines to shine!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Bishop Pair Strategy',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // BISHOP PAIR - CHAPTER 2: ENDGAME DOMINANCE
  // ============================================
  {
    id: 'bishop-pair-endgame-deep',
    category: 'BISHOP_PAIR',
    title: 'Two Bishops in the Endgame',
    subtitle: 'Dominating with the bishop pair',
    // Endgame position with bishop pair
    fen: '8/pp3pkp/3p4/4p3/4P3/2B2P2/PP4PP/4B1K1 w - - 0 30',
    toMove: 'white',
    
    introduction: 'In the endgame, two bishops working together are extraordinarily powerful. They control squares of BOTH colors, creating a mating net the enemy cannot escape. As pawns come off the board, bishops get stronger while knights get weaker. This pattern shows how to use the bishop pair to dominate endgames.',
    
    keyIdeas: [
      'Two bishops control all 64 squares together—they cover both colors',
      'Bishops get stronger as pawns come off—more open diagonals',
      'Coordinate them to cut off the enemy king',
      'Push pawns to create passed pawns with bishop support',
      'The bishop pair is often winning in endgames'
    ],
    
    mainLine: [
      {
        move: 'Kf2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Centralizing the king! In endgames, the king is a fighting piece. From f2, it can support pawn advances and attack enemy pawns.',
        arrows: [
          { from: 'g1', to: 'f2', color: 'green' },
          { from: 'f2', to: 'e3', color: 'yellow' }
        ],
        highlights: ['f2'],
        conceptTag: 'King Activation'
      },
      {
        move: 'Kf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White\'s bishop pair gives a decisive advantage.',
        arrows: [{ from: 'g7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves forward! It supports the e4 pawn and prepares to attack Black\'s pawns. The bishop pair controls all escape squares.',
        arrows: [
          { from: 'f2', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'King Penetration'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black mirrors, but White\'s bishops are more powerful.',
        arrows: [{ from: 'f6', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Bd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop cuts off the king! From d4, it controls key squares and prevents Black\'s king from advancing. Combined with the other bishop, White has complete control.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'e5', color: 'red' },
          { from: 'd4', to: 'f6', color: 'red' }
        ],
        highlights: ['d4'],
        conceptTag: 'Cutting Off the King'
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but the bishops control all squares.',
        arrows: [{ from: 'e6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king advances further! It supports the d4 bishop and prepares to attack Black\'s pawns. The coordination between king and bishops is perfect.',
        arrows: [
          { from: 'e3', to: 'd3', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'King-Bishop Coordination'
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black retreats, but White continues the attack.',
        arrows: [{ from: 'd7', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king penetrates deeper! It attacks the d6 pawn and supports the bishops. White\'s position is overwhelming.',
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['c4', 'd6'],
        conceptTag: 'Attacking Pawns'
      },
      {
        move: 'Kb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but the bishops control everything.',
        arrows: [{ from: 'c7', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The bishop pair has created a winning position. Black cannot defend all the weaknesses.',
        arrows: [{ from: 'd4', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but it\'s too late.',
        arrows: [{ from: 'b6', to: 'b5', color: 'blue' }]
      },
      {
        move: 'Kb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king supports the passed pawn! White will push the e-pawn and promote. This is the power of the bishop pair in endgames—complete domination.',
        arrows: [
          { from: 'c4', to: 'b4', color: 'green' },
          { from: 'b4', to: 'a5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'Supporting Passers'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blockade, but White has too many threats.',
        arrows: [{ from: 'b5', to: 'c6', color: 'blue' }]
      },
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The passed pawn advances! With the king and bishops supporting it, this pawn will queen. The bishop pair has created a completely winning endgame.',
        arrows: [{ from: 'e4', to: 'e5', color: 'green' }],
        highlights: ['e5'],
        conceptTag: 'Passed Pawn'
      }
    ],
    
    summary: 'The bishop pair dominated the endgame by controlling both colors, cutting off the enemy king, and supporting pawn advances. As pawns came off, the bishops got stronger while Black\'s position crumbled. The two bishops working together created an unstoppable force.',
    
    keyTakeaways: [
      'Two bishops control all 64 squares—they cover both colors',
      'Bishops get stronger as pawns come off—more open diagonals',
      'Use them to cut off the enemy king from key squares',
      'Support passed pawn advances with both bishops',
      'The bishop pair is often winning in endgames'
    ],
    
    memoryTip: 'Think of two bishops as "laser beams covering the entire board"—nothing can escape!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Endgame Theory',
    playerExample: {
      white: 'Magnus Carlsen',
      black: 'Sergey Karjakin',
      event: 'World Championship',
      year: 2016
    }
  },

  // ============================================
  // BISHOP PAIR - CHAPTER 3: MIDDLEGAME DOMINANCE
  // ============================================
  {
    id: 'bishop-pair-middlegame-deep',
    category: 'BISHOP_PAIR',
    title: 'Bishop Pair in the Middlegame',
    subtitle: 'Coordinating two bishops for attack',
    // Middlegame position with bishop pair
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The bishop pair is powerful not just in endgames, but also in the middlegame! Two bishops working together can control long diagonals, support attacks, and create mating threats. This pattern shows how to coordinate the bishop pair in middlegame positions.',
    
    keyIdeas: [
      'Two bishops control long diagonals simultaneously',
      'Place bishops on crossing diagonals for maximum coverage',
      'Use the bishop pair to support attacks',
      'Bishops can create mating threats on long diagonals',
      'The bishop pair is worth extra in open positions'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the dark-squared bishop! From f4, it controls the long diagonal and supports the center. The bishop pair is starting to coordinate.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Development'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building the attack.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the bishops. White\'s pieces are coordinating beautifully.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a strong continuation.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The light-squared bishop moves to h6! Now both bishops are on long diagonals, controlling key squares. The bishop pair is coordinating perfectly.',
        arrows: [
          { from: 'e2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['h6', 'f4'],
        conceptTag: 'Bishop Pair Coordination'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades to remove the threat, but this weakens the dark squares.',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White still has the bishop pair, and Black\'s dark squares are now permanently weak.',
        arrows: [{ from: 'f4', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Maintaining the Pair'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White continues the attack.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook enters the game! White has complete coordination: two bishops on long diagonals, queen, and rooks all working together.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
        highlights: ['e1'],
        conceptTag: 'Complete Coordination'
      },
      {
        move: 'Rad8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning position.',
        arrows: [{ from: 'a8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop returns to f4! Now both bishops are on powerful diagonals, creating multiple threats. The bishop pair is dominating the position.',
        arrows: [
          { from: 'h6', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'e2', to: 'h5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Pair Domination'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'c7', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen invades on the weak dark squares! Combined with the bishop pair, White has a completely winning attack. The two bishops working together have created an unstoppable force.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Winning Attack'
      },
      {
        move: 'Rf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but it\'s too late.',
        arrows: [{ from: 'e8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning material! The bishop pair has created a completely winning position. This demonstrates the power of coordinating two bishops in the middlegame—they control long diagonals and create devastating attacks.',
        arrows: [{ from: 'h6', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We coordinated the bishop pair by placing them on long diagonals (Bf4 and Bh6). They worked together to control key squares and support the attack. The queen joined on the weak dark squares, and together they created a winning attack. This shows the power of the bishop pair in middlegame positions.',
    
    keyTakeaways: [
      'Two bishops control long diagonals simultaneously',
      'Place bishops on crossing diagonals for maximum coverage',
      'Use the bishop pair to support attacks',
      'Bishops can create mating threats on long diagonals',
      'The bishop pair is worth extra in open middlegame positions'
    ],
    
    memoryTip: 'Think of the bishop pair as "two snipers on long diagonals"—they cover everything and create deadly threats!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Middlegame Strategy',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  {
    id: 'bishop-pair-diagonal-control-deep',
    category: 'BISHOP_PAIR',
    title: 'Bishop Pair Controlling Key Diagonals',
    subtitle: 'Dominating with long diagonals',
    // Position where bishop pair controls key diagonals
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'The bishop pair is most powerful when both bishops control long diagonals simultaneously. When placed on crossing diagonals, they can dominate the entire board and create devastating threats. This pattern shows how to use the bishop pair to control key diagonals and create winning attacks.',
    
    keyIdeas: [
      'Place bishops on crossing diagonals for maximum coverage',
      'Long diagonals lead directly to the enemy king',
      'Two bishops can control both color complexes',
      'Use the bishop pair to create mating threats',
      'The bishop pair dominates in open positions'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the dark-squared bishop to f4! From here it controls the long diagonal (a1-h8) and supports the center. The bishop pair is starting to coordinate.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'f4', to: 'h6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Development'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Developing the light-squared bishop to d3! Now both bishops control long diagonals—the dark-squared bishop on a1-h8 and the light-squared bishop on a8-h1. The bishop pair is dominating the board!',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'a6', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3', 'f4'],
        conceptTag: 'Bishop Pair Coordination'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s bishops are too powerful.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the bishops. White\'s pieces are coordinating beautifully.',
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
        explanation: 'Black develops, but White\'s bishops are creating threats.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop moves to h6, attacking the g7 square! Combined with the light-squared bishop on d3, White has both bishops pointing at the kingside. The bishop pair is creating a winning attack.',
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
        explanation: 'The bishop captures on g7, breaking through! The bishop pair has created a winning attack. White has broken through on the kingside.',
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
        explanation: 'Check! The queen moves to h6, using the light-squared bishop\'s diagonal. The bishop pair has coordinated perfectly to create a winning attack.',
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
        explanation: 'The light-squared bishop captures on h7! The bishop pair has created a devastating attack. White has a completely winning position.',
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
        explanation: 'Checkmate! The bishop pair has created a perfect mating attack. Both bishops controlled key diagonals that led directly to the enemy king. This demonstrates the power of the bishop pair when placed on crossing diagonals.',
        arrows: [{ from: 'h6', to: 'h7', color: 'green' }],
        highlights: ['h7'],
        conceptTag: 'Checkmate'
      }
    ],
    
    summary: 'We developed both bishops to control long diagonals (Bf4, Bd3), then used them to attack the kingside (Bh6, Bxg7, Bxh7). The bishop pair coordinated perfectly, controlling key diagonals and creating a winning mating attack. The bishop pair is devastating when placed on crossing diagonals.',
    
    keyTakeaways: [
      'Place bishops on crossing diagonals for maximum coverage',
      'Long diagonals lead directly to the enemy king',
      'Two bishops can control both color complexes',
      'Use the bishop pair to create mating threats',
      'The bishop pair dominates in open positions'
    ],
    
    memoryTip: 'Think of the bishop pair as "two snipers on long diagonals"—they can strike from far away!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Pair Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'bishop-pair-endgame-technique-deep',
    category: 'BISHOP_PAIR',
    title: 'Bishop Pair in Endgames',
    subtitle: 'Converting the advantage in endgames',
    // Endgame position where bishop pair is decisive
    fen: '8/5k2/2b5/3b4/3B4/2B5/5K2/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'The bishop pair is especially powerful in endgames! With fewer pieces on the board, the bishops can control more squares and create winning chances. The two bishops work together to restrict the opponent\'s king and pieces, often leading to decisive material gains. This pattern shows how to use the bishop pair effectively in endgames.',
    
    keyIdeas: [
      'The bishop pair is especially powerful in endgames',
      'Two bishops control more squares with fewer pieces',
      'Use the bishops to restrict the opponent\'s king',
      'Bishop pair often leads to material gains in endgames',
      'Coordinate the bishops to create winning threats'
    ],
    
    mainLine: [
      {
        move: 'Bd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The dark-squared bishop moves to d4, controlling key squares and restricting Black\'s king. The bishop pair is beginning to coordinate.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'f6', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Bishop Coordination'
      },
      {
        move: 'Bc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counter, but White continues building.',
        arrows: [{ from: 'c6', to: 'c5', color: 'blue' }]
      },
      {
        move: 'Be5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The light-squared bishop moves to e5, creating a powerful battery! Both bishops are now on central squares, controlling the entire board. The bishop pair is at maximum power.',
        arrows: [
          { from: 'b3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f6', color: 'yellow' },
          { from: 'd4', to: 'f6', color: 'yellow' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Bishop Battery'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'd5', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Kf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves forward, supporting the bishops and preparing to penetrate. The bishop pair and king work together perfectly.',
        arrows: [
          { from: 'f2', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f4', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'King Support'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has more threats.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop moves to f6, attacking the king! Combined with the light-squared bishop on e5, White has a powerful attack. The bishop pair is creating winning threats.',
        arrows: [
          { from: 'd4', to: 'f6', color: 'green' },
          { from: 'f6', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Attacking the King'
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has more threats.',
        arrows: [{ from: 'e6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bxd6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning a bishop! The bishop pair has created a winning opportunity. White has won material and has a completely winning position.',
        arrows: [{ from: 'e5', to: 'd6', color: 'green' }],
        highlights: ['d6'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kxd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White still has the bishop pair advantage.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Bxc5+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The bishop captures on c5, winning another bishop! White has won material and has a completely winning position. The bishop pair has been a complete success.',
        arrows: [{ from: 'f6', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'More Material'
      },
      {
        move: 'Kxc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material.',
        arrows: [{ from: 'd6', to: 'c5', color: 'blue' }]
      },
      {
        move: 'Kf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves forward, preparing to support the remaining bishop. White has won material and has a completely winning endgame. The bishop pair has transformed the position completely.',
        arrows: [
          { from: 'f3', to: 'f4', color: 'green' },
          { from: 'f4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Winning Endgame'
      },
      {
        move: 'Kb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has a winning position.',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }]
      },
      {
        move: 'Be5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop moves to e5, controlling key squares and preparing to win more material. White has a completely winning position thanks to the bishop pair.',
        arrows: [
          { from: 'b3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'b2', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We coordinated the bishop pair (Bd4, Be5), then used them to attack Black\'s king and pieces (Bf6, Bxd6, Bxc5+). The bishop pair created winning threats that led to material gains. The bishop pair is especially powerful in endgames.',
    
    keyTakeaways: [
      'The bishop pair is especially powerful in endgames',
      'Two bishops control more squares with fewer pieces',
      'Use the bishops to restrict the opponent\'s king',
      'Bishop pair often leads to material gains in endgames',
      'Coordinate the bishops to create winning threats'
    ],
    
    memoryTip: 'Think of the bishop pair in endgames as "two snipers with clear lines of sight"—they control everything!',
    
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

  // ============================================
  // BISHOP PAIR - CHAPTER 6: MIDDLEGAME TECHNIQUE
  // ============================================
  {
    id: 'bishop-pair-middlegame-technique-deep',
    category: 'BISHOP_PAIR',
    title: 'Bishop Pair in Middlegames',
    subtitle: 'Using two bishops to dominate',
    // Middlegame position with bishop pair
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2BP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    
    introduction: 'The bishop pair is especially powerful in the middlegame! Two bishops working together can control many squares, create threats, and dominate the position. This pattern shows how to use the bishop pair effectively in middlegame positions.',
    
    keyIdeas: [
      'The bishop pair dominates in open middlegame positions',
      'Place bishops on crossing diagonals for maximum effect',
      'The bishop pair creates multiple threats simultaneously',
      'Coordinate the bishops with other pieces',
      'The bishop pair often leads to winning attacks'
    ],
    
    mainLine: [
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The light-squared bishop moves to c4, controlling the long diagonal! From c4, it attacks f7 and creates threats. This is the first step in coordinating the bishop pair.',
        arrows: [
          { from: 'e2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'First Bishop'
      },
      {
        move: 'Bb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues coordinating the bishop pair.',
        arrows: [{ from: 'c8', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Bb2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop develops to b2, controlling the other long diagonal! Now White has both bishops on powerful diagonals, creating a bishop pair battery. This is a powerful formation!',
        arrows: [
          { from: 'c1', to: 'b2', color: 'green' },
          { from: 'b2', to: 'g7', color: 'yellow' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['b2', 'g7'],
        conceptTag: 'Bishop Pair Battery'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more diagonal control.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the bishop pair and preparing to coordinate. White\'s pieces are all working together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'g5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more activity.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, supporting the bishop pair and controlling the d-file. White\'s pieces are all coordinating beautifully.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5, coordinating with the bishop pair! The knight on e5, combined with the bishops on c4 and b2, creates overwhelming pressure. The bishop pair is working perfectly.',
        arrows: [
          { from: 'f3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'Bishop-Knight Coordination'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning attack building.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The dark-squared bishop moves to f6, creating maximum pressure! Combined with the c4 bishop and e5 knight, White has a devastating attack. The bishop pair is at maximum power.',
        arrows: [
          { from: 'b2', to: 'f6', color: 'green' },
          { from: 'f6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['f6'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Bxf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens more lines for White.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Nxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight sacrifices on f7! This is possible because of the bishop pair controlling the diagonals. The c4 bishop supports the sacrifice, and White has a winning attack.',
        arrows: [
          { from: 'e5', to: 'f7', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f7'],
        conceptTag: 'Bishop-Pair Enabled Sacrifice'
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to capture, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Qf4+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen attacks along the diagonal! White has a winning attack thanks to the bishop pair. The two bishops working together created overwhelming pressure that led to a winning attack.',
        arrows: [
          { from: 'd2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['f4', 'f7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We coordinated the bishop pair (Bc4, Bb2), then supported them with the queen (Qd2), rook (Rfd1), and knight (Ne5) to create a winning attack (Nxf7, Qf4+). The bishop pair in the middlegame is a powerful weapon.',
    
    keyTakeaways: [
      'The bishop pair dominates in open middlegame positions',
      'Place bishops on crossing diagonals for maximum effect',
      'The bishop pair creates multiple threats simultaneously',
      'Coordinate the bishops with other pieces',
      'The bishop pair often leads to winning attacks'
    ],
    
    memoryTip: 'Think of the bishop pair in middlegames as "two snipers with crossfire"—they control everything and create multiple threats!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Middlegame Technique',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // KING ACTIVITY - ENDGAME KING
  // ============================================

  // ============================================
  // KING ACTIVITY - CHAPTER 2: THE KING MARCH
  // ============================================
  {
    id: 'king-activity-march-deep',
    category: 'KING_ACTIVITY',
    title: 'The King March',
    subtitle: 'Marching the king to victory',
    // Endgame position where king march is key
    fen: '8/5kpp/8/8/8/5KPP/8/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'Sometimes the king must march across the board to support an attack or defend a weakness. The king march is a powerful technique where the king travels from one side of the board to the other, becoming a decisive factor in the endgame. This pattern shows how to execute a successful king march.',
    
    keyIdeas: [
      'The king can march across the board in endgames',
      'Use the king march to support passed pawns',
      'The king can attack enemy pawns from behind',
      'Timing is crucial—march when safe',
      'The king march often decides endgames'
    ],
    
    mainLine: [
      {
        move: 'Kg4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king begins its march! Moving toward the kingside to support the pawns and attack Black\'s pawns. The king march has begun.',
        arrows: [
          { from: 'f3', to: 'g4', color: 'green' },
          { from: 'g4', to: 'h5', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Beginning the March'
      },
      {
        move: 'Kg6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also advances, but White\'s king is on the march.',
        arrows: [{ from: 'f7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'Kh5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king continues its march! Moving to h5, it attacks the g7 pawn and prepares to support the h-pawn advance.',
        arrows: [
          { from: 'g4', to: 'h5', color: 'green' },
          { from: 'h5', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h5'],
        conceptTag: 'Attacking Pawns'
      },
      {
        move: 'Kh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White continues the march.',
        arrows: [{ from: 'g6', to: 'h6', color: 'blue' }]
      },
      {
        move: 'g4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn advances! The king on h5 supports this advance. The king march has created the conditions for a pawn breakthrough.',
        arrows: [
          { from: 'g3', to: 'g4', color: 'green' },
          { from: 'h5', to: 'g4', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Pawn Advance'
      },
      {
        move: 'Kg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'h6', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Kg5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king moves to g5, supporting both pawns and maintaining pressure. The king march has positioned the king perfectly.',
        arrows: [
          { from: 'h5', to: 'g5', color: 'green' },
          { from: 'g5', to: 'g4', color: 'yellow' },
          { from: 'g5', to: 'h4', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Supporting Both Pawns'
      },
      {
        move: 'Kf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White continues.',
        arrows: [{ from: 'g7', to: 'f7', color: 'blue' }]
      },
      {
        move: 'h4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The h-pawn advances! With the king on g5 supporting both pawns, White has created a powerful pawn duo. The king march has been a complete success.',
        arrows: [
          { from: 'h3', to: 'h4', color: 'green' },
          { from: 'g5', to: 'h4', color: 'yellow' }
        ],
        highlights: ['h4'],
        conceptTag: 'Pawn Duo'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to centralize, but White has a winning position.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'g5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances again! The king march has created an unstoppable pawn advance. Black cannot defend both pawns.',
        arrows: [{ from: 'g4', to: 'g5', color: 'green' }],
        highlights: ['g5'],
        conceptTag: 'Unstoppable Advance'
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to blockade, but it\'s too late.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'h5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The h-pawn advances! One of these pawns will promote. The king march has transformed the position completely—the king traveled from f3 to g5, supporting the pawn advance and creating a winning position.',
        arrows: [{ from: 'h4', to: 'h5', color: 'green' }],
        highlights: ['h5'],
        conceptTag: 'Winning Position'
      },
      {
        move: 'Kxg5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but White promotes the h-pawn.',
        arrows: [{ from: 'f5', to: 'g5', color: 'blue' }]
      },
      {
        move: 'h6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! It will promote on the next move. The king march from f3 to g5 has been the decisive factor—without the active king, the pawns could not advance. This is the power of the king march!',
        arrows: [{ from: 'h5', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Promotion'
      }
    ],
    
    summary: 'The king marched from f3 to g5, supporting the pawn advance and creating a winning position. The king march transformed the endgame—the active king allowed the pawns to advance and promote. This demonstrates the power of king activity in endgames.',
    
    keyTakeaways: [
      'The king can march across the board in endgames',
      'Use the king march to support passed pawns',
      'The king can attack enemy pawns from behind',
      'Timing is crucial—march when safe and necessary',
      'The king march often decides endgames'
    ],
    
    memoryTip: 'Think of the king march as "the king leading the charge"—it travels ahead to support the pawns!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Advanced Endgame Technique',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Emanuel Lasker',
      event: 'World Championship',
      year: 1921
    }
  },

  // ============================================
  // GOOD VS BAD BISHOP
  // ============================================
  {
    id: 'good-bad-bishop-french',
    category: 'GOOD_BAD_BISHOP',
    title: 'The French Defense Bad Bishop',
    subtitle: 'How to handle a bad bishop',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2PB1N2/PP3PPP/R1BQK2R w KQ - 0 8',
    toMove: 'white',
    
    introduction: 'White\'s light-squared bishop on d3 is "bad"—blocked by its own pawns on e5, d4, and c3. We\'ll learn how to improve it or exchange it favorably.',
    
    keyIdeas: [
      'A "bad" bishop is blocked by its own pawns',
      'Options: exchange it, reposition it, or change the pawn structure',
      'Sometimes a bad bishop defends important pawns',
      'Don\'t let bad bishops become permanent liabilities'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'First, we develop the dark-squared bishop OUTSIDE the pawn chain. This bishop is "good"—it operates on squares not blocked by our pawns.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Good Bishop Out',
        alternativeMoves: [
          {
            move: 'Be3',
            evaluation: 'equal',
            explanation: 'Solid, but Bf4 is more active, threatening to take on c7 or d6.'
          }
        ]
      },
      {
        move: 'Nh5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black attacks the bishop. We need to make a decision.',
        arrows: [
          { from: 'f6', to: 'h5', color: 'blue' }
        ]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '',
        explanation: 'Retreating to a solid square. The bishop remains outside the pawn chain and defends d4.',
        arrows: [
          { from: 'f4', to: 'e3', color: 'green' }
        ],
        conceptTag: 'Retreat in Good Position'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight returns. Now we address our "bad" light bishop.',
        arrows: [
          { from: 'h5', to: 'f6', color: 'blue' }
        ]
      },
      {
        move: 'Bf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The KEY move! We reposition our "bad" bishop to an active square OUTSIDE the pawn chain. From f5, it threatens e6 and isn\'t blocked anymore!',
        arrows: [
          { from: 'd3', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Activate Bad Bishop!'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is almost forced to trade, otherwise Bxe6 wins material. But taking opens the e-file for us!',
        arrows: [
          { from: 'e6', to: 'f5', color: 'blue' }
        ],
        alternativeMoves: [
          {
            move: 'g6',
            evaluation: 'bad',
            explanation: 'Weakens the kingside horribly. After Bxe6, White is better.'
          }
        ]
      },
      {
        move: 'Qd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing the f5 pawn while eyeing the h7 weakness. We successfully traded our bad bishop for Black\'s good bishop!',
        arrows: [
          { from: 'd1', to: 'd3', color: 'green' },
          { from: 'd3', to: 'f5', color: 'yellow' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        conceptTag: 'Favorable Exchange'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has achieved the goal—the bad bishop is gone!',
        arrows: [
          { from: 'd8', to: 'c7', color: 'blue' }
        ]
      },
      {
        move: 'Qxf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Winning the pawn back with an improved position. We traded our bad bishop for their good one and have active pieces.',
        arrows: [
          { from: 'd3', to: 'f5', color: 'green' }
        ],
        conceptTag: 'Regain Material'
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black reroutes the knight to defend. But White\'s position is clearly better.',
        arrows: [{ from: 'c6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Completing development! White has castled safely, has the better bishop (dark-squared bishop on e3 vs nothing special for Black), and pressure on the kingside.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
        conceptTag: 'Safe King'
      },
      {
        move: 'f6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the e5 pawn, but this weakens the kingside further.',
        arrows: [{ from: 'f7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Qh5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen swings to the kingside! Without the light-squared bishop, Black\'s king is exposed. The bad bishop trade has paid dividends.',
        arrows: [{ from: 'f5', to: 'h5', color: 'green' }, { from: 'h5', to: 'h7', color: 'yellow' }],
        highlights: ['h5', 'h7'],
        conceptTag: 'Attack the King'
      },
      {
        move: 'Rf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends h7, but the position is uncomfortable.',
        arrows: [{ from: 'f8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the last piece into the attack! The rook supports the e5 pawn and prepares to double on the e-file. White\'s position is overwhelming—this is the reward for successfully handling the bad bishop.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }, { from: 'e1', to: 'e5', color: 'yellow' }],
        highlights: ['e1'],
        conceptTag: 'Full Coordination'
      }
    ],
    
    variations: [
      {
        afterMove: 4,  // Alternative to Bf5
        moves: [
          {
            move: 'Bb1',
            isMainLine: false,
            annotation: '!?',
            explanation: 'Another common idea: retreating to b1 to play Ba2-b3, getting the bishop to a better diagonal via the back rank.',
            arrows: [
              { from: 'd3', to: 'b1', color: 'green' },
              { from: 'b1', to: 'a2', color: 'yellow' }
            ]
          }
        ]
      }
    ],
    
    summary: 'We handled the "bad" light-squared bishop by maneuvering it to f5, where it could be exchanged or become active. Getting bad bishops outside the pawn chain is essential.',
    
    keyTakeaways: [
      'A bad bishop is blocked by its own pawns',
      'Reposition bad bishops outside the pawn chain',
      'Exchange bad bishops for the opponent\'s good pieces',
      'Good bishop out first, then fix the bad bishop'
    ],
    
    memoryTip: 'A bad bishop trapped inside is like a bird in a cage—open the door (get it outside the pawns)!',
    
    difficulty: 4,
    estimatedMinutes: 10,
    source: 'French Defense Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1985
    }
  },

  // ============================================
  // GOOD VS BAD BISHOP - CHAPTER 2: TRADING THE BAD BISHOP
  // ============================================
  {
    id: 'good-bad-bishop-trade',
    category: 'GOOD_BAD_BISHOP',
    title: 'Trading the Bad Bishop',
    subtitle: 'Exchanging weakness for strength',
    // Position where White has a bad bishop blocked by pawns
    fen: 'r1bq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'When you have a bad bishop—one blocked by its own pawns—look to trade it! A bad bishop is a liability that cramps your position and limits your piece mobility. By trading it for an opponent\'s good piece (like a knight or active bishop), you relieve the cramp and improve your position significantly. This pattern shows how to identify and trade bad bishops.',
    
    keyIdeas: [
      'Identify your bad bishop—one blocked by its own pawns on the same color',
      'Trade it for opponent\'s good pieces—knights, active bishops, or even rooks in some cases',
      'Trading relieves cramping and improves piece mobility',
      'After trading, your remaining pieces have more freedom to maneuver',
      'A bad bishop is often worth less than a knight in closed positions'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'First, we develop the good bishop! The dark-squared bishop on f4 is active and not blocked by our pawns. This is the bishop we want to keep.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Good Bishop First'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the rook, but White continues the plan.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the trade of the bad bishop. White\'s plan is taking shape.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the knight, but White has a strong response.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Targeting Black\'s good bishop! The bishop on g7 is Black\'s best piece—it defends the kingside and controls key squares. By trading our bad bishop (e2) for their good bishop, we gain a huge advantage.',
        arrows: [
          { from: 'f4', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Target the Good Bishop'
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is practically forced to trade. The dark squares around Black\'s king are now weak!',
        arrows: [{ from: 'g7', to: 'h6', color: 'blue' }],
        highlights: ['g7', 'f6', 'h6']
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Perfect! We\'ve traded our bad bishop (e2, blocked by d4-e5-c3 pawns) for Black\'s excellent bishop (g7). The dark squares around Black\'s king are now permanently weak, and our remaining bishop (f4) is much better than Black\'s remaining pieces.',
        arrows: [{ from: 'e2', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Bad for Good!'
      },
      {
        move: 'Qe7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend the dark squares, but the damage is done.',
        arrows: [{ from: 'd8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rae1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bringing the rook into play! White\'s position is now much better—the bad bishop is gone, the dark squares are weak, and White has active pieces.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
        highlights: ['e1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Rf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White continues building pressure.',
        arrows: [{ from: 'e8', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to f5, targeting the weak dark squares and supporting the attack. White\'s position is completely dominant.',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Active Bishop'
      },
      {
        move: 'Qf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many advantages.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen invades on the weak dark squares! Without the g7 bishop, Black cannot defend. This is the reward for trading the bad bishop—complete domination of the dark squares.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'f6', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Dark Square Domination'
      },
      {
        move: 'Qxh6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must trade, but White recaptures with advantage.',
        arrows: [{ from: 'f6', to: 'h6', color: 'blue' }]
      },
      {
        move: 'Bxh6',
        isMainLine: true,
        annotation: '!',
        explanation: 'White has won the queen! The trade of the bad bishop for Black\'s good bishop has led to a completely winning position. This demonstrates the power of trading bad bishops—they\'re liabilities that should be exchanged.',
        arrows: [{ from: 'f5', to: 'h6', color: 'green' }],
        highlights: ['h6'],
        conceptTag: 'Winning Material'
      }
    ],
    
    summary: 'We identified the bad bishop (e2, blocked by pawns) and traded it for Black\'s excellent bishop (g7). This trade weakened Black\'s dark squares permanently and gave White a huge advantage. The remaining good bishop (f4) dominated the position, leading to a winning attack.',
    
    keyTakeaways: [
      'Identify bad bishops—ones blocked by your own pawns',
      'Trade them for opponent\'s good pieces—especially active bishops or knights',
      'Trading relieves cramping and improves your position',
      'After trading, your remaining pieces have more freedom',
      'A bad bishop is often worth less than a knight in closed positions'
    ],
    
    memoryTip: 'Think of a bad bishop as "dead weight"—trade it away and your position comes alive!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Strategic Exchange Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Vasily Smyslov',
      event: 'World Championship',
      year: 1954
    }
  },

  // ============================================
  // GOOD VS BAD BISHOP - CHAPTER 3: IMPROVING THE BAD BISHOP
  // ============================================
  {
    id: 'good-bad-bishop-improve',
    category: 'GOOD_BAD_BISHOP',
    title: 'Improving the Bad Bishop',
    subtitle: 'Making a bad bishop good',
    // Position with bad bishop that can be improved
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2PB1N2/PP3PPP/R1BQK2R w KQ - 0 8',
    toMove: 'white',
    
    introduction: 'Sometimes you can\'t trade your bad bishop, but you can improve it! By changing the pawn structure or repositioning the bishop, a bad bishop can become active. This pattern shows how to transform a bad bishop into a good one.',
    
    keyIdeas: [
      'Bad bishops can be improved by changing pawn structure',
      'Reposition bad bishops to better diagonals',
      'Advance pawns to open lines for the bad bishop',
      'Sometimes the bad bishop defends important squares',
      'Improving is better than trading when the bishop has defensive value'
    ],
    
    mainLine: [
      {
        move: 'c3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing to advance the c-pawn! This will open lines for the bad bishop on d3. By changing the pawn structure, we can improve the bishop.',
        arrows: [
          { from: 'c2', to: 'c3', color: 'green' },
          { from: 'c3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['c3'],
        conceptTag: 'Preparing Improvement'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'c4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Opening lines! The c4 pawn advance opens the c-file and creates a diagonal for the bishop. The bad bishop is starting to improve!',
        arrows: [
          { from: 'c3', to: 'c4', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'dxc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens the d-file for White.',
        arrows: [{ from: 'd5', to: 'c4', color: 'blue' }]
      },
      {
        move: 'Bxc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop recaptures! Now the bishop is on c4, a much better square. It\'s no longer blocked by pawns and controls important diagonals.',
        arrows: [
          { from: 'd3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Bishop Improved!'
      },
      {
        move: 'Nb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black attacks the bishop, but White has a strong response.',
        arrows: [{ from: 'd7', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Bb3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to b3, staying active! From b3, it controls the a2-g8 diagonal and is no longer bad. The bishop has been successfully improved.',
        arrows: [
          { from: 'c4', to: 'b3', color: 'green' },
          { from: 'b3', to: 'f7', color: 'yellow' }
        ],
        highlights: ['b3'],
        conceptTag: 'Active Bishop'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s improved bishop is now a powerful piece.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating with the improved bishop. White\'s position is much better now that the bad bishop has become good.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd6', color: 'yellow' }
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
        explanation: 'The rook moves to d1, using the open d-file. White\'s pieces are all active now that the bad bishop has been improved.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the file, but White has the initiative.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Bd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop moves to d5, a powerful central square! The bad bishop has been completely transformed into an active, powerful piece. This demonstrates the power of improving bad bishops—sometimes you can make them good!',
        arrows: [
          { from: 'b3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'b7', color: 'yellow' },
          { from: 'd5', to: 'f7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Bishop Transformed'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black challenges, but White maintains the advantage.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading! White has successfully improved the bad bishop and now has a completely winning position. The transformation from bad to good bishop has been a complete success.',
        arrows: [{ from: 'd5', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Total Success'
      }
    ],
    
    summary: 'We improved the bad bishop by advancing c4, which opened lines and allowed the bishop to move to better squares (c4, b3, d5). The bad bishop was transformed into an active, powerful piece. This shows that bad bishops can sometimes be improved rather than traded.',
    
    keyTakeaways: [
      'Bad bishops can be improved by changing pawn structure',
      'Advance pawns to open lines for the bad bishop',
      'Reposition bad bishops to better diagonals',
      'Sometimes improving is better than trading',
      'A bad bishop that defends important squares may be worth keeping'
    ],
    
    memoryTip: 'Think of improving a bad bishop as "opening the cage door"—change the pawn structure and the bishop can fly free!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Improvement Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'good-bad-bishop-attack-deep',
    category: 'GOOD_BAD_BISHOP',
    title: 'Using the Good Bishop to Attack',
    subtitle: 'The good bishop as an attacking weapon',
    // Position where good bishop attacks
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'A good bishop (one not blocked by its own pawns) is a powerful attacking weapon. It can control long diagonals, support attacks, and create mating threats. When you have a good bishop, use it aggressively! This pattern shows how to use the good bishop as an attacking weapon.',
    
    keyIdeas: [
      'Good bishops control long diagonals',
      'Use the good bishop to support attacks',
      'Place the good bishop on active diagonals',
      'The good bishop can create mating threats',
      'Coordinate the good bishop with other pieces'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the good bishop to f4! From here it controls the long diagonal (a1-h8) and supports the center. The good bishop is becoming active.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'f4', to: 'h6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Development'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building the attack.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks and preparing to support the good bishop. White\'s pieces are coordinating beautifully.',
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
        explanation: 'Black develops, but White\'s good bishop is creating threats.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The good bishop moves to h6, attacking the g7 square! From h6, it controls the long diagonal and creates threats around the king. The good bishop is now a powerful attacking weapon.',
        arrows: [
          { from: 'f4', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' },
          { from: 'h6', to: 'f8', color: 'yellow' }
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
        explanation: 'The good bishop captures on g7, breaking through! The good bishop has created a winning attack. White has broken through on the kingside.',
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
        explanation: 'Check! The queen moves to h6, using the good bishop\'s diagonal. The good bishop has coordinated perfectly with the queen to create a winning attack.',
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
        move: 'Rg3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to g3, joining the attack! Combined with the good bishop and queen, White has a devastating attack.',
        arrows: [
          { from: 'd1', to: 'g3', color: 'green' },
          { from: 'g3', to: 'g7', color: 'yellow' }
        ],
        highlights: ['g3'],
        conceptTag: 'Rook Lift'
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
        explanation: 'Check! The queen captures on h7, using the good bishop\'s diagonal. The good bishop has created a perfect mating attack.',
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
        explanation: 'Checkmate! The good bishop has created a perfect mating attack. The good bishop controlled the long diagonal, supported the attack, and led to checkmate. This demonstrates the power of the good bishop as an attacking weapon.',
        arrows: [{ from: 'h7', to: 'h8', color: 'green' }],
        highlights: ['h8'],
        conceptTag: 'Checkmate'
      }
    ],
    
    summary: 'We developed the good bishop to f4, then moved it to h6 to attack the kingside. The good bishop coordinated with the queen and rook to create a winning mating attack. The good bishop is a powerful attacking weapon when used aggressively.',
    
    keyTakeaways: [
      'Good bishops control long diagonals',
      'Use the good bishop to support attacks',
      'Place the good bishop on active diagonals',
      'The good bishop can create mating threats',
      'Coordinate the good bishop with other pieces'
    ],
    
    memoryTip: 'Think of the good bishop as "a sniper on a long diagonal"—it can strike from far away!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Attack Theory',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  {
    id: 'good-bad-bishop-transformation-deep',
    category: 'GOOD_BAD_BISHOP',
    title: 'Transforming a Bad Bishop',
    subtitle: 'Making a bad bishop good',
    // Position where a bad bishop can be transformed
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Sometimes a bad bishop can be transformed into a good one! By advancing pawns on the opposite color of your bishop, you can open diagonals and make the bishop active. This pattern shows how to transform a bad bishop into a good one through pawn advances.',
    
    keyIdeas: [
      'A bad bishop can be transformed into a good one',
      'Advance pawns on the opposite color of your bishop',
      'Open diagonals to activate the bishop',
      'The transformation requires careful planning',
      'A transformed bishop can become a powerful piece'
    ],
    
    mainLine: [
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Advancing the f-pawn! This opens the diagonal for the light-squared bishop. The bishop on e2 is currently "bad" (blocked by pawns on d4 and e3), but f4 begins the transformation.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'e2', to: 'h5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Beginning Transformation'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the transformation.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE TRANSFORMATION! The f5 advance opens the diagonal completely! The light-squared bishop on e2 is now active and can control key squares. The bad bishop is becoming good!',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'e2', to: 'h5', color: 'yellow' },
          { from: 'e2', to: 'c4', color: 'yellow' }
        ],
        highlights: ['f5', 'e2'],
        conceptTag: 'The Transformation'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens more lines for White\'s bishop.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! The bad bishop is now active and controlling key squares. The transformation is complete—the bishop has gone from bad to good!',
        arrows: [
          { from: 'e2', to: 'f5', color: 'green' },
          { from: 'f5', to: 'c8', color: 'yellow' },
          { from: 'f5', to: 'h7', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Active Bishop'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s transformed bishop is now powerful.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to d3, a more active square! The transformed bishop is now controlling key diagonals and creating threats.',
        arrows: [
          { from: 'f5', to: 'd3', color: 'green' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Optimal Placement'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more activity.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating with the transformed bishop. White\'s pieces are all working together.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The transformed bishop attacks the king! The bad bishop has become a powerful attacking piece. The transformation has been a complete success.',
        arrows: [
          { from: 'd3', to: 'h7', color: 'green' },
          { from: 'h7', to: 'g8', color: 'yellow' }
        ],
        highlights: ['h7'],
        conceptTag: 'Attacking Bishop'
      },
      {
        move: 'Kh8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black escapes, but White has more threats.',
        arrows: [{ from: 'g8', to: 'h8', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, joining the attack! The transformed bishop and queen are working together perfectly. White has a winning attack.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Winning Attack'
      },
      {
        move: 'Rg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'f8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bxg7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The transformed bishop captures on g7! The bad bishop has become a winning piece. The transformation has created a completely winning position.',
        arrows: [{ from: 'h7', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We transformed the bad bishop by advancing pawns (f4, f5), which opened diagonals. The bishop became active (Bxf5, Bd3) and eventually created a winning attack (Bh7+, Qh6, Bxg7+). The bad bishop was transformed into a powerful attacking piece.',
    
    keyTakeaways: [
      'A bad bishop can be transformed into a good one',
      'Advance pawns on the opposite color of your bishop',
      'Open diagonals to activate the bishop',
      'The transformation requires careful planning',
      'A transformed bishop can become a powerful piece'
    ],
    
    memoryTip: 'Think of transforming a bad bishop as "opening a door for a trapped piece"—once the door is open, the bishop can escape and become powerful!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Strategy Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // GOOD VS BAD BISHOP - CHAPTER 6: EXPLOITING BAD BISHOP
  // ============================================
  {
    id: 'good-bad-bishop-exploiting-deep',
    category: 'GOOD_BAD_BISHOP',
    title: 'Exploiting a Bad Bishop',
    subtitle: 'Attacking when the opponent has a bad bishop',
    // Position where opponent has a bad bishop
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'When your opponent has a bad bishop (blocked by their own pawns), you should exploit it! A bad bishop cannot control squares effectively and often becomes a liability. This pattern shows how to exploit a bad bishop to create winning chances.',
    
    keyIdeas: [
      'A bad bishop cannot control squares effectively',
      'Attack on the color of the bad bishop',
      'Place pawns on the same color as the bad bishop',
      'The bad bishop becomes a liability',
      'Exploiting a bad bishop often leads to winning attacks'
    ],
    
    mainLine: [
      {
        move: 'h4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Advancing the h-pawn! This attacks on the color of Black\'s bad bishop (the dark-squared bishop on e7, blocked by pawns on d6 and e6). We\'re exploiting the bad bishop by attacking on its color.',
        arrows: [
          { from: 'h2', to: 'h4', color: 'green' },
          { from: 'h4', to: 'h5', color: 'yellow' }
        ],
        highlights: ['h4'],
        conceptTag: 'Attacking on Bad Bishop Color'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues attacking on the dark squares.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'h5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE ATTACK! Advancing the h-pawn further attacks on the dark squares! Black\'s bad bishop cannot control these squares effectively. We\'re exploiting the weakness.',
        arrows: [
          { from: 'h4', to: 'h5', color: 'green' },
          { from: 'h5', to: 'g6', color: 'yellow' }
        ],
        highlights: ['h5', 'g6'],
        conceptTag: 'Exploiting the Weakness'
      },
      {
        move: 'g6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but this weakens the dark squares even more.',
        arrows: [{ from: 'g7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'hxg6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing! This opens the h-file and weakens Black\'s dark squares even further. The bad bishop cannot control these squares.',
        arrows: [{ from: 'h5', to: 'g6', color: 'green' }],
        highlights: ['g6'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'fxg6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has opened the h-file and weakened the dark squares.',
        arrows: [{ from: 'f7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, supporting the attack on the dark squares. White\'s pieces are coordinating to exploit the bad bishop.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'h6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more threats on the dark squares.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Bh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop moves to h6, attacking the dark squares directly! Black\'s bad bishop cannot defend effectively. We\'re exploiting the weakness completely.',
        arrows: [
          { from: 'c1', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6', 'g7'],
        conceptTag: 'Direct Attack'
      },
      {
        move: 'Rf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more threats.',
        arrows: [{ from: 'f8', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, joining the attack! Combined with the bishop on h6, White has a devastating attack on the dark squares. The bad bishop cannot defend.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Queen-Bishop Battery'
      },
      {
        move: 'Rg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning attack.',
        arrows: [{ from: 'f7', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Bxg7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! White has won material and has a completely winning position. The bad bishop has been exploited to create a winning attack.',
        arrows: [{ from: 'h6', to: 'g7', color: 'green' }],
        highlights: ['g7'],
        conceptTag: 'Material Gain'
      },
      {
        move: 'Kxg7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has a winning position.',
        arrows: [{ from: 'g8', to: 'g7', color: 'blue' }]
      },
      {
        move: 'Qh7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Check! The queen attacks along the h-file! White has a winning attack thanks to exploiting the bad bishop. The attack on the dark squares has been decisive.',
        arrows: [
          { from: 'h6', to: 'h7', color: 'green' },
          { from: 'h7', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h7', 'g7'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We exploited Black\'s bad bishop by attacking on the dark squares (h4, h5, hxg6), then created a winning attack (Bh6, Qh6, Bxg7, Qh7+). The bad bishop was a liability that White exploited to win.',
    
    keyTakeaways: [
      'A bad bishop cannot control squares effectively',
      'Attack on the color of the bad bishop',
      'Place pawns on the same color as the bad bishop',
      'The bad bishop becomes a liability',
      'Exploiting a bad bishop often leads to winning attacks'
    ],
    
    memoryTip: 'Think of exploiting a bad bishop as "attacking where the opponent is weak"—target the squares the bad bishop cannot control!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Bishop Strategy Theory',
    playerExample: {
      white: 'Viktor Korchnoi',
      black: 'Anatoly Karpov',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // SPACE ADVANTAGE
  // ============================================

  // ============================================
  // SPACE ADVANTAGE - CHAPTER 2: THE MAROCZY BIND
  // ============================================
  {
    id: 'space-maroczy-bind-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'The Maroczy Bind',
    subtitle: 'Space stranglehold with c4 and e4',
    // Maroczy Bind position (pawns on c4 and e4)
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2P1P3/2N2N2/PP2BPPP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    
    introduction: 'The Maroczy Bind (pawns on c4 and e4) gives White a massive space advantage and restricts Black\'s pieces. Black struggles to find good squares for knights and bishops. This pattern shows how to maintain and exploit the Maroczy Bind to create a winning position.',
    
    keyIdeas: [
      'Pawns on c4 and e4 control key central squares (d5, f5)',
      'Black lacks space and good piece placement',
      'White can slowly improve and prepare expansion',
      'The d5 square is a powerful outpost for White',
      'Prevent Black\'s freeing breaks (...d5 or ...b5)'
    ],
    
    mainLine: [
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing calmly. White has a huge space advantage, so there\'s no need to rush. Black is cramped and has no good moves.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }],
        conceptTag: 'Calm Development'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the pieces are passive. White\'s space advantage is permanent.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling, securing the king. White continues to improve methodically.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also castles, but the space disadvantage remains.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight jumps to d5, a square that cannot be attacked by any Black pawn. From d5, it dominates the position and restricts Black\'s pieces even more.',
        arrows: [
          { from: 'f3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'The Outpost'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black feels compelled to trade, but this gives White a powerful central pawn.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the c-pawn! The d5 pawn is now a powerful wedge that restricts Black\'s pieces even more. The Maroczy Bind has been strengthened.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Central Wedge'
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the knight, but it\'s still cramped.',
        arrows: [{ from: 'c6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Bf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to f3, supporting the d5 pawn and controlling key squares. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'e2', to: 'f3', color: 'green' },
          { from: 'f3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Piece Coordination'
      },
      {
        move: 'Nc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to find activity, but White has a strong response.',
        arrows: [{ from: 'd7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Driving away the knight! This gains even more space on the queenside. Black\'s pieces are being pushed back further.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'c5', color: 'red' }
        ],
        highlights: ['b4', 'c5'],
        conceptTag: 'Space Expansion'
      },
      {
        move: 'Nb7',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight retreats to a passive square. Black\'s position is becoming desperate.',
        arrows: [{ from: 'c5', to: 'b7', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing a5! White continues to expand on the queenside, using the space advantage to create more weaknesses.',
        arrows: [
          { from: 'a2', to: 'a4', color: 'green' },
          { from: 'a4', to: 'a5', color: 'yellow' }
        ],
        highlights: ['a4'],
        conceptTag: 'Queenside Expansion'
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to prevent a5, but White has other plans.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      {
        move: 'a5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! White has created a massive space advantage on both flanks. Black\'s pieces are completely cramped. This is the power of the Maroczy Bind—it creates a stranglehold that slowly suffocates the opponent.',
        arrows: [{ from: 'a4', to: 'a5', color: 'green' }],
        highlights: ['a5', 'd5', 'e4'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'The Maroczy Bind (c4 and e4 pawns) gave White a massive space advantage. Black\'s pieces were cramped and had no good squares. White methodically improved, established an outpost on d5, and expanded on the queenside. The space advantage led to complete domination.',
    
    keyTakeaways: [
      'The Maroczy Bind (c4-e4) creates a huge space advantage',
      'Black\'s pieces become cramped with no good squares',
      'Establish outposts (d5) to exploit the space',
      'Expand slowly—use the space to improve all your pieces',
      'Prevent Black\'s freeing breaks (...d5 or ...b5)'
    ],
    
    memoryTip: 'Think of the Maroczy Bind as a "cage"—Black\'s pieces are trapped inside while White controls everything outside!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Sicilian Defense Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // SPACE ADVANTAGE - CHAPTER 3: SPACE THROUGH PAWN CHAIN
  // ============================================
  {
    id: 'space-pawn-chain-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'Space Through Pawn Chain',
    subtitle: 'Using pawn chains to claim territory',
    // Position with pawn chain creating space
    fen: 'r1bqkb1r/ppp2ppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Pawn chains create space! A well-constructed pawn chain (like d4-e5) claims territory and restricts the opponent. The space advantage comes from the advanced pawns and the squares they control. This pattern shows how to use pawn chains to gain and maintain space.',
    
    keyIdeas: [
      'Pawn chains create space by advancing into enemy territory',
      'The e5 pawn in a d4-e5 chain controls key squares',
      'Space restricts opponent\'s piece mobility',
      'Maintain the chain—don\'t exchange the key pawn',
      'Use the space to improve pieces and prepare attacks'
    ],
    
    mainLine: [
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE SPACE-GAINING ADVANCE! The e5 pawn creates a pawn chain (d4-e5) that claims significant territory. This space advantage will restrict Black\'s pieces.',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f6', color: 'red' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Creating Space'
      },
      {
        move: 'Nfd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight is forced to retreat. The space advantage is already restricting Black\'s pieces.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing calmly. White has more space, so there\'s no need to rush. Black is cramped and struggling to find good moves.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }],
        conceptTag: 'Calm Development'
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the center, but White maintains the space advantage.',
        arrows: [{ from: 'c7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'c3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting the d4 pawn! The pawn chain (c3-d4-e5) is now solid and creates a massive space advantage.',
        arrows: [
          { from: 'c2', to: 'c3', color: 'green' },
          { from: 'c3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c3', 'd4', 'e5'],
        conceptTag: 'Solid Chain'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the space disadvantage remains.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling, securing the king. White continues to improve while maintaining the space advantage.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s space advantage is permanent.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook supports the e5 pawn! White uses the space to improve all pieces. The pawn chain creates the space, and White uses it effectively.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e5', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Using the Space'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White continues building pressure.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to an active square! White\'s pieces are all well-placed, using the space advantage effectively.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Active Development'
      },
      {
        move: 'Rfe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has too many advantages.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, coordinating all pieces. White\'s space advantage has allowed all pieces to find ideal squares.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Complete Coordination'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning position.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! White has complete control of the position. The pawn chain (c3-d4-e5) has created a massive space advantage that White has used to coordinate all pieces perfectly. This is the power of space through pawn chains!',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We created a pawn chain (c3-d4-e5) that claimed significant space. This space advantage restricted Black\'s pieces and allowed White to improve all pieces methodically. The chain created the space, and White used it to achieve complete coordination and domination.',
    
    keyTakeaways: [
      'Pawn chains create space by advancing into enemy territory',
      'The e5 pawn in a d4-e5 chain controls key squares',
      'Space restricts opponent\'s piece mobility',
      'Maintain the chain—don\'t exchange the key pawn',
      'Use the space to improve pieces and prepare attacks'
    ],
    
    memoryTip: 'Think of pawn chains as "building a wall"—they claim territory and restrict the opponent!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Pawn Chain Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Mikhail Tal',
      event: 'World Championship',
      year: 1960
    }
  },

  {
    id: 'space-advantage-squeeze-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'Squeezing with Space',
    subtitle: 'Using space to restrict and win',
    // Position where space advantage squeezes opponent
    fen: 'r1bqkb1r/ppp2ppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'A space advantage doesn\'t just give you room—it squeezes your opponent! When you have more space, your opponent\'s pieces become cramped and have fewer good squares. This pattern shows how to use a space advantage to squeeze the opponent and create winning chances.',
    
    keyIdeas: [
      'Space advantage restricts opponent\'s piece mobility',
      'Cramped pieces have fewer good squares',
      'Use space to improve your pieces while opponent struggles',
      'Space advantage often leads to tactical opportunities',
      'Squeeze the opponent until they crack'
    ],
    
    mainLine: [
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE SPACE-GAINING ADVANCE! The e5 pawn creates a space advantage that will squeeze Black. Black\'s pieces will become cramped.',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f6', color: 'red' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Creating Space'
      },
      {
        move: 'Nfd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight is forced to retreat. The space advantage is already squeezing Black\'s pieces.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing calmly. White has more space, so there\'s no need to rush. Black is cramped and struggling to find good moves.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }],
        conceptTag: 'Calm Development'
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to break out, but White can maintain the space advantage.',
        arrows: [{ from: 'c7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Maintaining the space advantage! The d5 pawn keeps Black cramped. White\'s space advantage is squeezing Black more and more.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c6', color: 'red' }
        ],
        highlights: ['d5', 'e5'],
        conceptTag: 'Maintaining Space'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to develop, but the space is still restricting Black\'s pieces.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling, securing the king. White\'s space advantage allows calm development while Black struggles.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues to squeeze.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, supporting the space-claiming pawns. White\'s pieces are improving while Black remains cramped.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e5', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Supporting the Space'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White has more space and better coordination.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to f4, controlling key squares. White\'s space advantage allows all pieces to find good squares, while Black\'s pieces remain cramped.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Improvement'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has more threats.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks. White\'s space advantage has allowed perfect coordination of all pieces.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to improve, but White has too many advantages.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White\'s space advantage has created the conditions for a powerful attack. Black is completely squeezed.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d4, a perfect square created by the space advantage! White has a completely winning position. The space advantage has squeezed Black until they cracked.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'c6', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We created a space advantage with e5 and d5, which squeezed Black\'s pieces. The space advantage allowed White to improve all pieces while Black remained cramped. Eventually, White\'s space advantage led to a winning position. Space advantage is a powerful weapon when used to squeeze the opponent.',
    
    keyTakeaways: [
      'Space advantage restricts opponent\'s piece mobility',
      'Cramped pieces have fewer good squares',
      'Use space to improve your pieces while opponent struggles',
      'Space advantage often leads to tactical opportunities',
      'Squeeze the opponent until they crack'
    ],
    
    memoryTip: 'Think of space advantage as "squeezing the opponent in a box"—the less room they have, the harder it is to find good moves!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Space Advantage Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  {
    id: 'space-advantage-piece-activity-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'Space Advantage and Piece Activity',
    subtitle: 'Using space to activate pieces',
    // Position where space advantage activates pieces
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'A space advantage doesn\'t just restrict your opponent—it also gives your pieces more room to maneuver! With more space, your pieces can find better squares, coordinate more effectively, and create powerful threats. This pattern shows how to use a space advantage to activate your pieces.',
    
    keyIdeas: [
      'Space advantage gives your pieces more room to maneuver',
      'More space allows pieces to find better squares',
      'Active pieces in space create powerful threats',
      'Use space to improve all your pieces',
      'Space advantage often leads to piece activity advantages'
    ],
    
    mainLine: [
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE SPACE-GAINING ADVANCE! The e5 pawn creates a space advantage that will give White\'s pieces more room to maneuver. Black\'s pieces will become cramped while White\'s become active.',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f6', color: 'red' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Creating Space'
      },
      {
        move: 'Nfd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight is forced to retreat. The space advantage is already restricting Black\'s pieces.',
        arrows: [{ from: 'f6', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing calmly. White has more space, so there\'s no need to rush. Black is cramped and struggling to find good moves.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }],
        conceptTag: 'Calm Development'
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to break out, but White can maintain the space advantage.',
        arrows: [{ from: 'c7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Maintaining the space advantage! The d5 pawn keeps Black cramped. White\'s space advantage is giving White\'s pieces more room to maneuver.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c6', color: 'red' }
        ],
        highlights: ['d5', 'e5'],
        conceptTag: 'Maintaining Space'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to develop, but the space is still restricting Black\'s pieces.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling, securing the king. White\'s space advantage allows calm development while Black struggles.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues to improve pieces.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to f4, a perfect square created by the space advantage! White\'s pieces are finding excellent squares while Black\'s remain cramped.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Piece Activity'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White has more space and better piece activity.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, supporting the space-claiming pawns. White\'s pieces are all active and well-coordinated thanks to the space advantage.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e5', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook Activity'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has more threats.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, connecting the rooks. White\'s space advantage has allowed perfect coordination of all pieces. All pieces are active!',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Activity'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to improve, but White has too many active pieces.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! White\'s space advantage has created the conditions for perfect piece activity. All pieces are active and coordinated.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Maximum Activity'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning position.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d4, a perfect square created by the space advantage! White has complete piece activity and coordination. The space advantage has transformed all pieces into active forces.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'c6', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We created a space advantage with e5 and d5, which gave White\'s pieces more room to maneuver. All pieces became active (Bf4, Re1, Qd2, Rad1, Nd4) while Black\'s remained cramped. The space advantage led to perfect piece activity and coordination.',
    
    keyTakeaways: [
      'Space advantage gives your pieces more room to maneuver',
      'More space allows pieces to find better squares',
      'Active pieces in space create powerful threats',
      'Use space to improve all your pieces',
      'Space advantage often leads to piece activity advantages'
    ],
    
    memoryTip: 'Think of space advantage as "giving your pieces a bigger playground"—more room means more activity!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Space Advantage Theory',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Mikhail Tal',
      event: 'World Championship',
      year: 1960
    }
  },

  // ============================================
  // SPACE ADVANTAGE - CHAPTER 6: CLOSED POSITIONS
  // ============================================
  {
    id: 'space-advantage-closed-positions-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'Space Advantage in Closed Positions',
    subtitle: 'Using space when the position is locked',
    // Closed position with space advantage
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Space advantage is especially powerful in closed positions! When the center is locked, the side with more space can maneuver pieces more easily, while the cramped side struggles. This pattern shows how to use a space advantage in closed positions.',
    
    keyIdeas: [
      'Space advantage is powerful in closed positions',
      'The cramped side struggles to maneuver',
      'Use space to improve pieces gradually',
      'Closed positions require patience',
      'Space advantage often leads to breakthroughs'
    ],
    
    mainLine: [
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, preparing to coordinate with the other pieces. In closed positions, piece coordination is key. White has more space and can maneuver more easily.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'g5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more space to maneuver.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, controlling the d-file. White\'s pieces are coordinating well thanks to the space advantage.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues improving.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! In closed positions, rooks need open files. White\'s space advantage allows this coordination while Black struggles.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Doubling Rooks'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also uses the d-file, but White has more space.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'h4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Gaining space on the kingside! In closed positions, you can expand on the flanks. White\'s space advantage allows this expansion.',
        arrows: [
          { from: 'h2', to: 'h4', color: 'green' },
          { from: 'h4', to: 'h5', color: 'yellow' }
        ],
        highlights: ['h4'],
        conceptTag: 'Flank Expansion'
      },
      {
        move: 'h6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prevents h5, but White continues expanding.',
        arrows: [{ from: 'h7', to: 'h6', color: 'blue' }]
      },
      {
        move: 'g4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'More space on the kingside! White is expanding while Black is cramped. The space advantage allows White to create threats on the kingside.',
        arrows: [
          { from: 'g2', to: 'g4', color: 'green' },
          { from: 'g4', to: 'g5', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Continued Expansion'
      },
      {
        move: 'Kh7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more space.',
        arrows: [{ from: 'g8', to: 'h7', color: 'blue' }]
      },
      {
        move: 'Ng5+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to g5, attacking the king! White\'s space advantage has allowed this attack. The cramped Black position cannot defend effectively.',
        arrows: [
          { from: 'f3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'h7', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Knight Attack'
      },
      {
        move: 'hxg5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but White has more threats.',
        arrows: [{ from: 'h6', to: 'g5', color: 'blue' }]
      },
      {
        move: 'hxg5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! The h-file is now open, and White has a powerful attack. The space advantage has created winning chances.',
        arrows: [
          { from: 'h4', to: 'g5', color: 'green' },
          { from: 'h1', to: 'h7', color: 'yellow' }
        ],
        highlights: ['g5'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'Kg8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to escape, but White has a winning attack.',
        arrows: [{ from: 'h7', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Qh6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to h6, creating a winning attack! White\'s space advantage has allowed this attack. The cramped Black position cannot defend.',
        arrows: [
          { from: 'd2', to: 'h6', color: 'green' },
          { from: 'h6', to: 'g7', color: 'yellow' }
        ],
        highlights: ['h6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'We used the space advantage in a closed position to coordinate pieces (Qd2, Rfd1, Rad1), then expanded on the kingside (h4, g4, Ng5+). The space advantage allowed White to create a winning attack while Black remained cramped.',
    
    keyTakeaways: [
      'Space advantage is powerful in closed positions',
      'The cramped side struggles to maneuver',
      'Use space to improve pieces gradually',
      'Closed positions require patience',
      'Space advantage often leads to breakthroughs'
    ],
    
    memoryTip: 'Think of space advantage in closed positions as "having more room to maneuver"—the cramped side struggles to find good moves!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Space Advantage Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // ============================================
  // CENTRALIZATION
  // ============================================

  // ============================================
  // CENTRALIZATION - CHAPTER 2: QUEEN CENTRALIZATION
  // ============================================
  {
    id: 'centralization-queen-deep',
    category: 'CENTRALIZATION',
    title: 'Centralizing the Queen',
    subtitle: 'The queen as a central powerhouse',
    // Position where queen centralization is key
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    
    introduction: 'The queen is the most powerful piece, and centralizing it multiplies its power exponentially. A centralized queen controls many squares, creates multiple threats, and coordinates with all other pieces. This pattern shows how to centralize the queen and use it as a dominant force.',
    
    keyIdeas: [
      'A centralized queen controls many squares simultaneously',
      'The queen in the center coordinates with all pieces',
      'Centralize the queen when safe—it\'s a powerful attacking weapon',
      'A centralized queen creates multiple threats',
      'Support the queen with other centralized pieces'
    ],
    
    mainLine: [
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the knight toward the center. This prepares for queen centralization.',
        arrows: [
          { from: 'b1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c3'],
        conceptTag: 'Preparing Centralization'
      },
      {
        move: 'Bc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'f8', to: 'c5', color: 'blue' }]
      },
      {
        move: 'd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Supporting the e4 pawn and opening lines for the queen.',
        arrows: [{ from: 'd2', to: 'd3', color: 'green' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White prepares to centralize the queen.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to d2, preparing to centralize. From d2, it supports the center and prepares to move to d4 or e3.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues centralizing.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE CENTRALIZED QUEEN! The queen moves to d4, the perfect central square. From here, it controls many squares, coordinates with all pieces, and creates multiple threats. This is the power of queen centralization!',
        arrows: [
          { from: 'd2', to: 'd4', color: 'green' },
          { from: 'd4', to: 'd6', color: 'yellow' },
          { from: 'd4', to: 'c5', color: 'yellow' },
          { from: 'd4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'The Centralized Queen'
      },
      {
        move: 'Be6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the centralized queen is too powerful.',
        arrows: [{ from: 'c8', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, supporting the centralized queen and creating a powerful battery. White\'s pieces are perfectly coordinated.',
        arrows: [
          { from: 'c1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Battery Formation'
      },
      {
        move: 'Bxe3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades, but White recaptures with the queen, maintaining centralization.',
        arrows: [{ from: 'c5', to: 'e3', color: 'blue' }]
      },
      {
        move: 'Qxe3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen recaptures on e3, maintaining centralization! The queen is still perfectly centralized and controls the entire board.',
        arrows: [
          { from: 'd4', to: 'e3', color: 'green' },
          { from: 'e3', to: 'e5', color: 'yellow' },
          { from: 'e3', to: 'd6', color: 'yellow' }
        ],
        highlights: ['e3'],
        conceptTag: 'Maintaining Centralization'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s centralized queen dominates.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling, securing the king. White\'s centralized queen and pieces are ready to attack.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning position.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, supporting the centralized queen! White has complete central domination with the queen, rook, knight, and bishop all centralized. This is the power of queen centralization—it coordinates all pieces and creates an unstoppable force.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1', 'e3', 'c3'],
        conceptTag: 'Total Centralization'
      }
    ],
    
    summary: 'We centralized the queen to d4 (then e3), where it controlled many squares and coordinated with all pieces. The centralized queen became the focal point of White\'s position, creating multiple threats and dominating the board. This demonstrates the power of queen centralization—when the queen is centralized, it multiplies the effectiveness of all other pieces.',
    
    keyTakeaways: [
      'A centralized queen controls many squares simultaneously',
      'The queen in the center coordinates with all pieces',
      'Centralize the queen when safe—it\'s a powerful weapon',
      'A centralized queen creates multiple threats',
      'Support the queen with other centralized pieces for maximum effect'
    ],
    
    memoryTip: 'Think of the centralized queen as "the sun in the center of the solar system"—all other pieces orbit around it!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Queen Centralization Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // ============================================
  // ADDITIONAL DEEP PATTERNS - ONE PER CATEGORY
  // ============================================

  // OUTPOSTS - Additional Pattern: b5 Outpost in Ruy Lopez
  {
    id: 'outpost-b5-ruy-lopez-deep',
    category: 'OUTPOSTS',
    title: 'The b5 Outpost in Ruy Lopez',
    subtitle: 'Knight outpost on the queenside',
    fen: 'r1bqkb1r/1pp1pppp/p1n2n2/1B1p4/3P4/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    
    introduction: 'In the Ruy Lopez, White often establishes a knight outpost on b5 after Bb5 and subsequent exchanges. This outpost controls key squares on the queenside and restricts Black\'s development. This pattern shows how to establish and exploit the b5 outpost.',
    
    keyIdeas: [
      'The b5 square becomes an outpost after Black plays ...a6 and White responds Bxc6',
      'A knight on b5 controls c7, d6, d4, and a7',
      'The outpost restricts Black\'s queenside play',
      'Support the outpost with pawns and pieces',
      'Use the outpost as a base for queenside operations'
    ],
    
    mainLine: [
      {
        move: 'Ba4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop retreats, maintaining pressure on Black\'s knight. This is the key move that keeps the b5 square available as an outpost.',
        arrows: [
          { from: 'b5', to: 'a4', color: 'green' },
          { from: 'a4', to: 'c6', color: 'yellow' }
        ],
        highlights: ['a4', 'b5'],
        conceptTag: 'Preparing the Outpost'
      },
      {
        move: 'b5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to chase the bishop away, but this weakens the c6 square.',
        arrows: [{ from: 'b7', to: 'b5', color: 'blue' }],
        highlights: ['c6']
      },
      {
        move: 'Bb3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop retreats to b3, maintaining pressure on f7. Now b5 is available for the knight!',
        arrows: [
          { from: 'a4', to: 'b3', color: 'green' },
          { from: 'b3', to: 'f7', color: 'yellow' }
        ],
        highlights: ['b3', 'b5'],
        conceptTag: 'Outpost Square Available'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop, preparing to castle.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling to safety.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Preparing b4! This will support the knight when it jumps to b5.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'a3', to: 'b4', color: 'yellow' }
        ],
        highlights: ['a3'],
        conceptTag: 'Preparing Support'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the plan.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting b5! Now White can establish the knight on b5 with full support.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'b5', color: 'yellow' }
        ],
        highlights: ['b4', 'b5'],
        conceptTag: 'Pawn Support'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but cannot prevent Nb5.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE OUTPOST! The knight lands on b5, a square that cannot be attacked by any Black pawn. From here it controls c7, d6, d4, and a7—dominating the queenside!',
        arrows: [
          { from: 'c3', to: 'b5', color: 'green' },
          { from: 'b5', to: 'c7', color: 'yellow' },
          { from: 'b5', to: 'd6', color: 'yellow' },
          { from: 'b5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['b5'],
        conceptTag: 'The Outpost'
      },
      {
        move: 'Bxb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to eliminate the outpost, but White recaptures with advantage.',
        arrows: [{ from: 'b3', to: 'b5', color: 'blue' }]
      },
      {
        move: 'Bxb5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The bishop is now active on b5, controlling the long diagonal and the c6 square. White maintains the outpost advantage.',
        arrows: [{ from: 'b3', to: 'b5', color: 'green' }],
        highlights: ['b5'],
        conceptTag: 'Maintaining Advantage'
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the bishop, but White has a better square.',
        arrows: [{ from: 'a7', to: 'a6', color: 'blue' }]
      },
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to c4, maintaining pressure on f7 and controlling key squares. White\'s outpost strategy has given a lasting advantage.',
        arrows: [
          { from: 'b5', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Active Bishop'
      },
      {
        move: 'Na5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge the bishop, but White continues building pressure.',
        arrows: [{ from: 'c6', to: 'a5', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop retreats to d3, maintaining all its power. White\'s outpost strategy has succeeded—the b5 square was used to gain time and space, and now White has a harmonious position with active pieces. This demonstrates the power of outposts even when the piece is eventually traded.',
        arrows: [
          { from: 'c4', to: 'd3', color: 'green' },
          { from: 'd3', to: 'f7', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Strategic Success'
      }
    ],
    
    summary: 'We established the b5 outpost by maneuvering the bishop (Ba4, Bb3) and supporting it with b4. Even though the knight was eventually traded, the outpost gave White time to develop and gain space. The resulting position favors White with active pieces and better coordination.',
    
    keyTakeaways: [
      'Outposts can be temporary but still valuable—they gain time and space',
      'Support outposts with pawns before occupying them',
      'Even when an outpost piece is traded, the resulting position often favors the attacker',
      'Outposts on the queenside (b5, c5) are just as powerful as central outposts',
      'Use outposts to restrict the opponent and gain development time'
    ],
    
    memoryTip: 'Think of the b5 outpost as a "stepping stone"—use it to gain advantages even if you eventually trade the piece!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'Ruy Lopez Strategy',
    playerExample: {
      white: 'José Raúl Capablanca',
      black: 'Frank Marshall',
      event: 'New York',
      year: 1918
    }
  },

  // WEAK_PAWNS - Additional Pattern: Weak Pawn Chain
  {
    id: 'weak-pawn-chain-french-deep',
    category: 'WEAK_PAWNS',
    title: 'Attacking the Weak Pawn Chain',
    subtitle: 'Targeting the base of a pawn chain',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Pawn chains have a base—the pawn that cannot be defended by another pawn. In the French Defense structure (e6-d5), the d5 pawn is the base and becomes a permanent weakness. This pattern shows how to systematically attack the base of a pawn chain.',
    
    keyIdeas: [
      'The base of a pawn chain is its weakest point',
      'Attack the base with multiple pieces',
      'Trade pieces to reduce defenders',
      'Create pressure on the base before attacking',
      'Pawn chains often collapse when the base falls'
    ],
    
    mainLine: [
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Advancing the pawn! This locks the pawn structure and makes d5 the base of Black\'s pawn chain. The d5 pawn now cannot be defended by another pawn and becomes a permanent target.',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd5', color: 'yellow' }
        ],
        highlights: ['e5', 'd5'],
        conceptTag: 'Identifying the Weakness'
      },
      {
        move: 'c4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White continues targeting d5.',
        arrows: [{ from: 'c7', to: 'c5', color: 'blue' }]
      },
      {
        move: 'c3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Supporting d4 and preparing to pile up on d5. White is building pressure on the weak base of the pawn chain.',
        arrows: [
          { from: 'c2', to: 'c3', color: 'green' },
          { from: 'c3', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c3', 'd5'],
        conceptTag: 'Preparing the Attack'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, defending d5 with the knight.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }, { from: 'c6', to: 'd5', color: 'yellow' }]
      },
      {
        move: 'Nbd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops, preparing to support the attack on d5. From d2, it can jump to c4 or f3 to target d5.',
        arrows: [
          { from: 'b1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'c4', color: 'yellow' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Developing Attackers'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, preparing to castle.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing the bishop, keeping lines flexible.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White also castles.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Qb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to create counterplay, but White continues the plan.',
        arrows: [{ from: 'd8', to: 'b6', color: 'blue' }]
      },
      {
        move: 'Nc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to c4, adding another attacker to d5! Now White has knight, pawn (e5), and can add more pieces. The base of the pawn chain is under siege.',
        arrows: [
          { from: 'd2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd5', color: 'yellow' },
          { from: 'e5', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c4', 'd5'],
        conceptTag: 'Piling Up'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, trying to support d5.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to d2, adding more pressure on d5! White now has knight, pawn, and queen all targeting the weak base. This is the classic technique against pawn chains—pile up on the base.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2', 'd5'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the base remains weak.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to d3, adding yet another attacker to d5! White now has knight, pawn, queen, and bishop all targeting the base of the pawn chain. Black cannot defend this forever.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3', 'd5'],
        conceptTag: 'Overwhelming Pressure'
      },
      {
        move: 'dxc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to relieve pressure by trading, but this weakens the pawn structure further.',
        arrows: [{ from: 'd5', to: 'c4', color: 'blue' }],
        highlights: ['c4', 'e6']
      },
      {
        move: 'Bxc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! The pawn chain has collapsed. Black\'s e6 pawn is now isolated and weak, and White has a completely winning position. This demonstrates the power of attacking the base of a pawn chain—once it falls, the entire structure collapses.',
        arrows: [{ from: 'd3', to: 'c4', color: 'green' }],
        highlights: ['c4', 'e6'],
        conceptTag: 'Pawn Chain Collapse'
      }
    ],
    
    summary: 'We identified d5 as the base of Black\'s pawn chain, then systematically attacked it with e5, c3, Nc4, Qd2, and Bd3. When Black tried to relieve pressure with dxc4, the pawn chain collapsed, leaving an isolated e6 pawn. This is the classic technique against pawn chains—attack the base!',
    
    keyTakeaways: [
      'Identify the base of the pawn chain—the pawn that cannot be defended by another pawn',
      'Attack the base with multiple pieces—knight, pawn, queen, and bishop',
      'Build up pressure gradually before attacking',
      'Once the base falls, the entire pawn chain often collapses',
      'Be patient—the base isn\'t going anywhere, so pile up pieces methodically'
    ],
    
    memoryTip: 'Think of attacking a pawn chain like cutting down a tree—attack the base, and the whole structure falls!',
    
    difficulty: 3,
    estimatedMinutes: 12,
    source: 'French Defense Strategy',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // PAWN_STRUCTURE - Additional Pattern: King's Indian Structure
  {
    id: 'structure-kings-indian-deep',
    category: 'PAWN_STRUCTURE',
    title: 'The King\'s Indian Pawn Structure',
    subtitle: 'Dynamic pawn structure with counterplay',
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    
    introduction: 'The King\'s Indian Defense creates a unique pawn structure where Black has pawns on d6 and e5, while White has pawns on d4 and e4. This structure offers dynamic counterplay for both sides. This pattern shows how to play with and against the King\'s Indian structure.',
    
    keyIdeas: [
      'The King\'s Indian structure is flexible and dynamic',
      'White controls the center, Black has counterplay on the flanks',
      'Pawn breaks like ...f5 or ...c5 are key for Black',
      'White must maintain central control while preparing kingside attacks',
      'The structure often leads to complex, tactical middlegames'
    ],
    
    mainLine: [
      {
        move: 'e4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Establishing the central pawn duo! White has d4 and e4, controlling the center. This is White\'s main advantage in the King\'s Indian.',
        arrows: [
          { from: 'e2', to: 'e4', color: 'green' }
        ],
        highlights: ['d4', 'e4'],
        conceptTag: 'Central Control'
      },
      {
        move: 'd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, preparing ...e5 to challenge White\'s center.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Nf3',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing the knight toward the center.',
        arrows: [{ from: 'g1', to: 'f3', color: 'green' }]
      },
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Challenging the center! Black plays ...e5, creating the characteristic King\'s Indian pawn structure. This is the key move that defines the structure.',
        arrows: [
          { from: 'e7', to: 'e5', color: 'blue' },
          { from: 'e5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Structure Formation'
      },
      {
        move: 'dxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but Black has a recapture plan.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }]
      },
      {
        move: 'dxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing! Black now has a pawn on e5 and d6, creating the classic King\'s Indian structure.',
        arrows: [{ from: 'd6', to: 'e5', color: 'blue' }],
        highlights: ['e5', 'd6']
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the knight, supporting e4 and preparing to develop.',
        arrows: [
          { from: 'b1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'e4', color: 'yellow' }
        ],
        highlights: ['c3']
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, preparing to castle.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing the bishop, keeping options open.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles kingside.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White also castles.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The characteristic King\'s Indian break! Black advances ...f5, challenging White\'s central control and preparing counterplay on the kingside. This is the dynamic nature of the King\'s Indian structure.',
        arrows: [
          { from: 'f7', to: 'f5', color: 'blue' },
          { from: 'f5', to: 'e4', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Dynamic Break'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures, but Black has a plan.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }]
      },
      {
        move: 'Bxf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the bishop! Black now has an active bishop on f5, and the structure has become more open. This is typical of the King\'s Indian—dynamic transformations.',
        arrows: [{ from: 'c8', to: 'f5', color: 'blue' }],
        highlights: ['f5'],
        conceptTag: 'Active Bishop'
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen develops, preparing to support the center and potentially launch a kingside attack.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'g5', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Queen Development'
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a strong continuation.',
        arrows: [{ from: 'b8', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, controlling the d-file and supporting the central pawn. White\'s structure is solid, and the King\'s Indian has created a complex, dynamic position with chances for both sides. This demonstrates the power of the King\'s Indian structure—it creates imbalances and opportunities.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1'],
        conceptTag: 'Complex Position'
      }
    ],
    
    summary: 'We explored the King\'s Indian structure where Black has pawns on d6 and e5, challenging White\'s central pawns. The characteristic ...f5 break created dynamic play. This structure offers both sides chances—White has central control, Black has counterplay. Understanding this structure helps in playing both sides of the King\'s Indian.',
    
    keyTakeaways: [
      'The King\'s Indian structure is flexible and offers counterplay for both sides',
      'Black\'s ...f5 break is characteristic and creates dynamic play',
      'White must maintain central control while preparing attacks',
      'The structure often leads to complex, tactical middlegames',
      'Understanding pawn breaks is crucial in the King\'s Indian'
    ],
    
    memoryTip: 'Think of the King\'s Indian structure as "a dynamic dance"—both sides have chances, and the position can change dramatically with each move!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'King\'s Indian Defense Strategy',
    playerExample: {
      white: 'Mikhail Tal',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1960
    }
  },

  // OPEN_FILES - Additional Pattern: Rook Endgame with Open Files
  {
    id: 'open-files-rook-endgame-deep',
    category: 'OPEN_FILES',
    title: 'Rook Endgames with Open Files',
    subtitle: 'Controlling open files in the endgame',
    fen: '8/5k2/3r4/2R5/2P1K3/8/8/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In rook endgames, control of open files is crucial. The side that controls the open files can penetrate the opponent\'s position, attack weak pawns, and create winning chances. This pattern shows how to use open files effectively in rook endgames.',
    
    keyIdeas: [
      'Control open files to penetrate the opponent\'s position',
      'Active rooks on open files are more powerful than passive rooks',
      'Use rooks to attack weak pawns from the side or rear',
      'Doubled rooks on an open file are extremely powerful',
      'King activity combined with rook activity is decisive'
    ],
    
    mainLine: [
      {
        move: 'Rd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Activating the rook! Rd5 places the rook on the open d-file, controlling it completely. From d5, the rook attacks d6 and can penetrate to d7 or d8. This is the key to rook endgames—active rooks!',
        arrows: [
          { from: 'c5', to: 'd5', color: 'green' },
          { from: 'd5', to: 'd6', color: 'yellow' },
          { from: 'd5', to: 'd7', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Activating the Rook'
      },
      {
        move: 'Rd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends by occupying the file, but White has more active options.',
        arrows: [{ from: 'd7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rd7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Penetrating to the 7th rank! The rook on d7 attacks the f7 pawn and restricts Black\'s king. This is the power of controlling open files—you can penetrate deep into the opponent\'s position.',
        arrows: [
          { from: 'd5', to: 'd7', color: 'green' },
          { from: 'd7', to: 'f7', color: 'yellow' },
          { from: 'd7', to: 'g7', color: 'yellow' }
        ],
        highlights: ['d7', 'f7'],
        conceptTag: '7th Rank Penetration'
      },
      {
        move: 'Rd2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White continues building pressure.',
        arrows: [{ from: 'd6', to: 'd2', color: 'blue' }]
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king advances! In rook endgames, the king must be active. Kf5 supports the rook and prepares to attack Black\'s pawns. King activity combined with rook activity is the key to winning rook endgames.',
        arrows: [
          { from: 'e4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'f6', color: 'yellow' },
          { from: 'f5', to: 'g5', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'King Activity'
      },
      {
        move: 'Ke7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king retreats, trying to defend, but White has more threats.',
        arrows: [{ from: 'f7', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rxf7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The rook captures f7, eliminating Black\'s pawn. This is what open files enable—the ability to attack and win pawns.',
        arrows: [{ from: 'd7', to: 'f7', color: 'green' }],
        highlights: ['f7'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture.',
        arrows: [{ from: 'e7', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing! White has won a pawn and now has a winning endgame.',
        arrows: [{ from: 'f5', to: 'f7', color: 'green' }]
      },
      {
        move: 'Rd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the rook, but White has a winning plan.',
        arrows: [{ from: 'd2', to: 'd3', color: 'blue' }]
      },
      {
        move: 'Kg6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king advances further! White\'s king is extremely active and helps promote the c-pawn. Active king + active rook = winning endgame.',
        arrows: [
          { from: 'f7', to: 'g6', color: 'green' },
          { from: 'g6', to: 'g5', color: 'yellow' }
        ],
        highlights: ['g6'],
        conceptTag: 'King March'
      },
      {
        move: 'Rd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has too many threats.',
        arrows: [{ from: 'd3', to: 'd4', color: 'blue' }]
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Advancing the pawn! With active king and rook, White can safely advance the pawn. The open file control has given White a decisive advantage.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        highlights: ['c5'],
        conceptTag: 'Pawn Promotion'
      },
      {
        move: 'Rc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to stop the pawn, but White continues.',
        arrows: [{ from: 'd4', to: 'c4', color: 'blue' }]
      },
      {
        move: 'Rc7+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook checks! This forces Black\'s king to retreat, and White\'s king can advance. The open file control has been decisive.',
        arrows: [
          { from: 'd7', to: 'c7', color: 'green' },
          { from: 'c7', to: 'f7', color: 'yellow' }
        ],
        highlights: ['c7'],
        conceptTag: 'Decisive Check'
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'The king retreats.',
        arrows: [{ from: 'f7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'c6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances again! White\'s control of open files, combined with active king and rook, has created a winning position. The pawn will promote, and White wins. This demonstrates the power of open files in rook endgames—they enable penetration, pawn attacks, and winning advantages.',
        arrows: [{ from: 'c5', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We controlled the open d-file with Rd5, penetrated to d7, won the f7 pawn, activated the king, and promoted the c-pawn. Control of open files in rook endgames enables deep penetration, pawn attacks, and decisive advantages. Active rooks and active kings win rook endgames.',
    
    keyTakeaways: [
      'Control open files to penetrate the opponent\'s position',
      'Active rooks on open files are more powerful than passive rooks',
      'Use rooks to attack weak pawns from the side or rear',
      '7th rank penetration is extremely powerful in rook endgames',
      'King activity combined with rook activity is decisive'
    ],
    
    memoryTip: 'In rook endgames, think "active rooks, active king, win pawns"—open files make all of this possible!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Rook Endgame Theory',
    playerExample: {
      white: 'Vasily Smyslov',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1957
    }
  },

  // BISHOP_PAIR - Additional Pattern: Bishop Pair Attacking Kingside
  {
    id: 'bishop-pair-kingside-attack-deep',
    category: 'BISHOP_PAIR',
    title: 'Bishop Pair Attacking the Kingside',
    subtitle: 'Using two bishops to launch attacks',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQ - 0 8',
    toMove: 'white',
    
    introduction: 'Two bishops working together can create devastating attacks, especially on the kingside. When lines open, the bishop pair controls diagonals and can coordinate to create mating threats. This pattern shows how to use the bishop pair for aggressive attacks.',
    
    keyIdeas: [
      'Two bishops control both color complexes',
      'Open lines make bishops extremely powerful',
      'Bishops on long diagonals create mating threats',
      'Coordinate bishops with other pieces for attacks',
      'Bishop pair in open positions is often decisive'
    ],
    
    mainLine: [
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the bishop to an active square! From d3, it controls the h7 square and prepares to support a kingside attack. White is building toward a bishop pair attack.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'Active Development'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White continues building the attack.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White also castles.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White prepares the bishop pair attack.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Bc2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop moves to c2, controlling the long diagonal! Now White has both bishops on long diagonals—the dark-squared bishop on b1-e4 diagonal and the light-squared bishop on c2-g6 diagonal. This creates powerful attacking potential.',
        arrows: [
          { from: 'd3', to: 'c2', color: 'green' },
          { from: 'c2', to: 'g6', color: 'yellow' },
          { from: 'c2', to: 'f5', color: 'yellow' }
        ],
        highlights: ['c2', 'g6'],
        conceptTag: 'Long Diagonals'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more active pieces.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Ng5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to g5! Combined with the bishop pair, this creates a powerful attack on the kingside. The knight targets h7, and the bishops control key diagonals. This is the power of the bishop pair—they support tactical attacks.',
        arrows: [
          { from: 'f3', to: 'g5', color: 'green' },
          { from: 'g5', to: 'h7', color: 'yellow' },
          { from: 'c2', to: 'h7', color: 'yellow' }
        ],
        highlights: ['g5', 'h7'],
        conceptTag: 'Knight-Bishop Coordination'
      },
      {
        move: 'h6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to drive the knight away, but this weakens the kingside.',
        arrows: [{ from: 'h7', to: 'h6', color: 'blue' }],
        highlights: ['h6', 'g6']
      },
      {
        move: 'Nh3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight retreats, but White has another plan. The bishop pair is still controlling the diagonals, and the weakened kingside is vulnerable.',
        arrows: [{ from: 'g5', to: 'h3', color: 'green' }]
      },
      {
        move: 'Ne7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the attack.',
        arrows: [{ from: 'f6', to: 'e7', color: 'blue' }]
      },
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Opening lines! f4 opens the f-file and creates more scope for the bishop pair. This is how bishops become powerful—open lines and diagonals.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'exf4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens more lines for White\'s bishops.',
        arrows: [{ from: 'e6', to: 'f4', color: 'blue' }]
      },
      {
        move: 'exf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The f-file is now open, and White\'s bishops have even more scope. The bishop pair is becoming dominant.',
        arrows: [{ from: 'e3', to: 'f4', color: 'green' }],
        highlights: ['f4']
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has a winning continuation.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Bxf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop captures! White\'s bishop pair is now on active squares, controlling key diagonals. The attack is building, and Black\'s kingside is under pressure.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'h6', color: 'yellow' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4', 'c2'],
        conceptTag: 'Active Bishop Pair'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge, but White has more threats.',
        arrows: [{ from: 'f8', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to f3! Combined with the bishop pair on long diagonals and the open f-file, White has a devastating attack. The bishop pair has enabled this entire attack—they control diagonals, create threats, and coordinate with other pieces. This is the power of two bishops in open positions.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f7', color: 'yellow' },
          { from: 'c2', to: 'g6', color: 'yellow' },
          { from: 'f4', to: 'h6', color: 'yellow' }
        ],
        highlights: ['f3', 'f7', 'g6', 'h6'],
        conceptTag: 'Winning Attack'
      }
    ],
    
    summary: 'We developed both bishops to active squares (Bd3, Bc2), opened lines with f4, and coordinated the bishop pair with the knight and rook to create a devastating kingside attack. The bishop pair controlled long diagonals, supported tactical threats, and enabled deep penetration. This demonstrates the power of two bishops in open positions—they create winning attacks.',
    
    keyTakeaways: [
      'Two bishops control both color complexes and are powerful in open positions',
      'Bishops on long diagonals create mating threats',
      'Open lines make bishops extremely powerful',
      'Coordinate bishops with other pieces for maximum effect',
      'Bishop pair in open positions is often decisive'
    ],
    
    memoryTip: 'Think of the bishop pair as "two snipers on long diagonals"—they control the board and create deadly threats!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'Bishop Pair Attack Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  // GOOD_BAD_BISHOP - Additional Pattern: Good Bishop vs Bad Bishop Endgame
  {
    id: 'good-bad-bishop-endgame-deep',
    category: 'GOOD_BAD_BISHOP',
    title: 'Good Bishop vs Bad Bishop Endgame',
    subtitle: 'Exploiting the advantage in the endgame',
    fen: '8/4k3/1p3p2/p1p1b1p1/P1P1P1P1/2P5/4KB2/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In endgames, having a good bishop (not blocked by its own pawns) against a bad bishop (blocked by its own pawns) is often decisive. The good bishop can control squares the bad bishop cannot reach, attack enemy pawns, and support passed pawns. This pattern shows how to exploit the good vs bad bishop advantage in the endgame.',
    
    keyIdeas: [
      'Good bishops are mobile and can attack on both wings',
      'Bad bishops are blocked and have limited scope',
      'Put pawns on opposite color of your bishop',
      'The good bishop can attack pawns the bad bishop cannot defend',
      'Good vs bad bishop endgames are often winning'
    ],
    
    mainLine: [
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Activating the good bishop! Bc4 places the bishop on an active square where it can attack pawns on both wings. White\'s bishop is "good" because it\'s not blocked by its own pawns, while Black\'s bishop is "bad" because it\'s blocked by pawns on dark squares. This is a decisive advantage!',
        arrows: [
          { from: 'e2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'a6', color: 'yellow' }
        ],
        highlights: ['c4', 'e5'],
        conceptTag: 'Activating Good Bishop'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate the bad bishop, but it\'s still limited by the pawn structure.',
        arrows: [{ from: 'e5', to: 'd6', color: 'blue' }],
        highlights: ['d6']
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king advances! In endgames, the king must be active. Kd3 supports the bishop and prepares to attack Black\'s pawns. Active king + good bishop is a winning combination.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' },
          { from: 'd3', to: 'e4', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'King Activity'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White has more active options.',
        arrows: [{ from: 'e7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Bd5+',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop checks! Bd5+ drives Black\'s king back and attacks the f7 pawn. The good bishop can attack pawns the bad bishop cannot defend. This is the key to good vs bad bishop endgames.',
        arrows: [
          { from: 'c4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'f7', color: 'yellow' },
          { from: 'd5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['d5', 'f7'],
        conceptTag: 'Attacking Weak Pawns'
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '',
        explanation: 'The king retreats, but f7 is still under attack.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'Bxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The good bishop captures f7 because Black\'s bad bishop cannot defend it—it\'s on the wrong color squares. This is the power of the good bishop—it attacks pawns the bad bishop cannot reach.',
        arrows: [{ from: 'd5', to: 'f7', color: 'green' }],
        highlights: ['f7'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Bxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture.',
        arrows: [{ from: 'd6', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing! White has won a pawn and now has a winning endgame.',
        arrows: [{ from: 'd3', to: 'f7', color: 'green' }]
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White has more threats.',
        arrows: [{ from: 'f5', to: 'e5', color: 'blue' }]
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop moves to c6, attacking the b6 pawn! The good bishop can attack pawns on both wings, while the bad bishop cannot. This is the decisive advantage—the good bishop controls squares the bad bishop cannot reach.',
        arrows: [
          { from: 'f7', to: 'c6', color: 'green' },
          { from: 'c6', to: 'b5', color: 'yellow' },
          { from: 'c6', to: 'a4', color: 'yellow' }
        ],
        highlights: ['c6', 'b6'],
        conceptTag: 'Attacking Both Wings'
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White can attack another pawn.',
        arrows: [{ from: 'e5', to: 'd4', color: 'blue' }]
      },
      {
        move: 'Ba4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop attacks the a5 pawn! The good bishop can attack pawns on both wings, while Black\'s bad bishop is stuck defending. This is the power of the good bishop—mobility and versatility.',
        arrows: [
          { from: 'c6', to: 'a4', color: 'green' },
          { from: 'a4', to: 'a5', color: 'yellow' }
        ],
        highlights: ['a4', 'a5'],
        conceptTag: 'Mobility'
      },
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White continues.',
        arrows: [{ from: 'd4', to: 'c4', color: 'blue' }]
      },
      {
        move: 'Kc3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king moves to c3, preparing to attack. White\'s good bishop, combined with an active king, creates a winning position. The bad bishop cannot defend all the pawns, and White will win more material. This demonstrates the decisive power of the good vs bad bishop advantage in endgames.',
        arrows: [
          { from: 'f7', to: 'c3', color: 'green' },
          { from: 'c3', to: 'b4', color: 'yellow' }
        ],
        highlights: ['c3'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We activated the good bishop (Bc4), used it to attack pawns the bad bishop couldn\'t defend (Bxf7, Bc6, Ba4), and combined it with an active king to create a winning position. The good bishop\'s mobility allowed it to attack on both wings, while the bad bishop was limited. This demonstrates the decisive power of the good vs bad bishop advantage.',
    
    keyTakeaways: [
      'Good bishops are mobile and can attack on both wings',
      'Bad bishops are blocked and have limited scope',
      'Put pawns on opposite color of your bishop to keep it "good"',
      'The good bishop can attack pawns the bad bishop cannot defend',
      'Good vs bad bishop endgames are often winning for the side with the good bishop'
    ],
    
    memoryTip: 'Remember: "A good bishop attacks, a bad bishop defends"—the good bishop can reach squares the bad bishop cannot!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Bishop Endgame Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // KNIGHT_PLACEMENT - Additional Pattern: Knight on the Rim is Dim
  {
    id: 'knight-placement-rim-deep',
    category: 'KNIGHT_PLACEMENT',
    title: 'Knight on the Rim is Dim',
    subtitle: 'Avoiding passive knight placement',
    fen: 'r1bqkb1r/pppppppp/2n2n2/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    
    introduction: 'The saying "a knight on the rim is dim" captures an important truth: knights on the edge of the board control fewer squares and are less effective than centralized knights. This pattern shows why rim knights are weak and how to avoid or exploit them.',
    
    keyIdeas: [
      'Knights on the rim control only 2-4 squares vs 8 in the center',
      'Rim knights are passive and have limited mobility',
      'Centralized knights are powerful and control many squares',
      'Avoid placing knights on the rim without a good reason',
      'Exploit opponent\'s rim knights by attacking from the center'
    ],
    
    mainLine: [
      {
        move: 'Na3',
        isMainLine: true,
        annotation: '??',
        explanation: 'A TERRIBLE MOVE! Na3 places the knight on the rim, where it controls only weak squares (b1, b5, c2, c4). Compare this to Nc3, which would control d5, e4, b5, and a4—key central squares. This is exactly what "knight on the rim is dim" means—limited scope and poor positioning.',
        arrows: [
          { from: 'b1', to: 'a3', color: 'red' }
        ],
        highlights: ['a3'],
        conceptTag: 'Rim Knight - Bad!',
        alternativeMoves: [
          {
            move: 'Nc3',
            evaluation: 'good',
            explanation: 'Nc3 is the correct move—centralized knight controls key squares and is part of normal development.'
          }
        ]
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops normally, taking advantage of White\'s poor knight placement.',
        arrows: [{ from: 'e7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'd3',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to develop, but the knight on a3 is already a problem.',
        arrows: [{ from: 'd2', to: 'd3', color: 'green' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Black challenges the center! The knight on a3 cannot help defend the center or participate in the game. This is the price of rim placement—the knight is out of play.',
        arrows: [{ from: 'd7', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'a3']
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'White must capture, but Black has a good recapture.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }]
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! Black now has a central pawn on d5, and White\'s knight on a3 is still on the rim, doing nothing.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }],
        highlights: ['d5', 'a3']
      },
      {
        move: 'Nb1',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight retreats, having wasted two moves. This is the cost of rim placement—you often have to retreat.',
        arrows: [{ from: 'a3', to: 'b1', color: 'green' }],
        highlights: ['b1', 'a3']
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black continues developing normally, maintaining the advantage.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '',
        explanation: 'Finally, the knight reaches a good square, but White has lost time. Black\'s development is ahead.',
        arrows: [{ from: 'b1', to: 'c3', color: 'green' }],
        highlights: ['c3']
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, completing development quickly.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Be3',
        isMainLine: true,
        annotation: '',
        explanation: 'White develops, but is behind in development due to the wasted moves.',
        arrows: [{ from: 'c1', to: 'e3', color: 'green' }]
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '!',
        explanation: 'Black activates the rook! Black\'s pieces are all active, while White lost time with the rim knight. This demonstrates why rim knights are weak—they waste time and create development problems.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }],
        highlights: ['e8', 'a3', 'b1']
      },
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'White continues developing, but Black has the initiative.',
        arrows: [{ from: 'f1', to: 'e2', color: 'green' }]
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Black advances in the center! The pawn on c5 gains space and restricts White. Black\'s centralized pieces support this advance, while White\'s wasted moves with the rim knight have given Black a lasting advantage. This is the punishment for rim knight placement—your opponent gains space, time, and activity.',
        arrows: [
          { from: 'c7', to: 'c5', color: 'blue' },
          { from: 'c5', to: 'c4', color: 'yellow' },
          { from: 'c5', to: 'd4', color: 'yellow' }
        ],
        highlights: ['c5', 'c3', 'd3'],
        conceptTag: 'Gaining Advantage'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'White castles, but Black has a better position.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Nc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Black develops the knight to an active square! Black\'s knight on c6 is centralized and active, while White\'s knight wasted time on a3. This demonstrates the contrast between centralized knights (powerful) and rim knights (weak). Black has a completely winning position due to better piece placement and activity.',
        arrows: [
          { from: 'b8', to: 'c6', color: 'blue' },
          { from: 'c6', to: 'd4', color: 'yellow' },
          { from: 'c6', to: 'b4', color: 'yellow' },
          { from: 'c6', to: 'e5', color: 'yellow' }
        ],
        highlights: ['c6', 'a3'],
        conceptTag: 'Centralized vs Rim'
      }
    ],
    
    summary: 'We saw how Na3 (rim knight) wasted moves, allowed Black to gain space and time, and resulted in a losing position. The rim knight controlled few squares, couldn\'t help defend the center, and required retreat. Meanwhile, Black\'s centralized knights (Nc6) were active and powerful. This demonstrates why "a knight on the rim is dim"—centralized knights are far superior.',
    
    keyTakeaways: [
      'Knights on the rim control only 2-4 squares vs 8 in the center',
      'Rim knights waste time and development',
      'Centralized knights are powerful and control many squares',
      'Avoid placing knights on the rim without a very good reason',
      'Exploit opponent\'s rim knights by gaining space and time'
    ],
    
    memoryTip: 'Remember the old saying: "A knight on the rim is dim"—keep your knights in the center where they control 8 squares!',
    
    difficulty: 2,
    estimatedMinutes: 11,
    source: 'Chess Fundamentals',
    playerExample: {
      white: 'Amateur',
      black: 'Master',
      event: 'Instructional',
      year: 1900
    }
  },

  // SPACE_ADVANTAGE - Additional Pattern: Space Advantage with Pawn Storm
  {
    id: 'space-advantage-pawn-storm-deep',
    category: 'SPACE_ADVANTAGE',
    title: 'Space Advantage with Pawn Storm',
    subtitle: 'Using space to launch attacks',
    fen: 'r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    
    introduction: 'A space advantage gives you more room for your pieces and allows you to launch pawn storms that cramp your opponent. This pattern shows how to use a space advantage to build a powerful pawn storm that breaks through the opponent\'s defenses.',
    
    keyIdeas: [
      'Space advantage allows pawn storms',
      'Pawn storms create weaknesses in the opponent\'s position',
      'Support pawn advances with pieces',
      'Open lines created by pawn storms enable attacks',
      'Space advantage + pawn storm = winning attacks'
    ],
    
    mainLine: [
      {
        move: 'f4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Starting the pawn storm! f4 uses White\'s space advantage to launch an attack. The pawn storm will create weaknesses and open lines for White\'s pieces.',
        arrows: [
          { from: 'f2', to: 'f4', color: 'green' },
          { from: 'f4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Pawn Storm Begins'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the storm.',
        arrows: [{ from: 'g8', to: 'f6', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn storm continues! f5 opens lines and creates threats. White\'s space advantage enables this aggressive advance.',
        arrows: [
          { from: 'f4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'e6', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Opening Lines'
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but this opens the e-file for White.',
        arrows: [{ from: 'e6', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The e-file is now open, and White\'s space advantage has created attacking chances.',
        arrows: [{ from: 'e5', to: 'f5', color: 'green' }],
        highlights: ['f5', 'e8']
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more space and activity.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'g4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Continuing the pawn storm! g4 uses White\'s space advantage to create more threats. The pawn storm is overwhelming Black\'s position.',
        arrows: [
          { from: 'g2', to: 'g4', color: 'green' },
          { from: 'g4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['g4'],
        conceptTag: 'Overwhelming Storm'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, but White\'s attack continues.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'g5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn storm reaches its peak! g5 drives away Black\'s knight and creates devastating threats. White\'s space advantage has enabled this powerful attack.',
        arrows: [
          { from: 'g4', to: 'g5', color: 'green' },
          { from: 'g5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['g5', 'f6'],
        conceptTag: 'Peak of Storm'
      },
      {
        move: 'Nh5',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight retreats, but White has more threats.',
        arrows: [{ from: 'f6', to: 'h5', color: 'blue' }],
        highlights: ['h5']
      },
      {
        move: 'Rf3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook lifts to f3! Combined with the pawn storm, White has a winning attack. The space advantage has been converted into a decisive attack.',
        arrows: [
          { from: 'f1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'f7', color: 'yellow' },
          { from: 'f3', to: 'h3', color: 'yellow' }
        ],
        highlights: ['f3'],
        conceptTag: 'Rook Lift'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has too many threats.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rh3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to h3, creating a mating threat! The pawn storm has opened lines and created weaknesses. White\'s space advantage has been decisive.',
        arrows: [
          { from: 'f3', to: 'h3', color: 'green' },
          { from: 'h3', to: 'h5', color: 'yellow' },
          { from: 'h3', to: 'h7', color: 'yellow' }
        ],
        highlights: ['h3', 'h5', 'h7'],
        conceptTag: 'Mating Attack'
      },
      {
        move: 'Nf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'h5', to: 'f6', color: 'blue' }]
      },
      {
        move: 'g6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Breaking through! g6 opens the position completely. White\'s space advantage and pawn storm have created a winning attack. This demonstrates the power of using space to launch aggressive pawn storms.',
        arrows: [
          { from: 'g5', to: 'g6', color: 'green' },
          { from: 'g6', to: 'f7', color: 'yellow' }
        ],
        highlights: ['g6', 'f7'],
        conceptTag: 'Breakthrough'
      },
      {
        move: 'fxg6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but White has more threats.',
        arrows: [{ from: 'f7', to: 'g6', color: 'blue' }]
      },
      {
        move: 'Qh5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen enters the attack! White\'s space advantage and pawn storm have created a completely winning position. The attack is decisive, and Black cannot defend. This demonstrates how space advantage enables powerful pawn storms that lead to winning attacks.',
        arrows: [
          { from: 'd1', to: 'h5', color: 'green' },
          { from: 'h5', to: 'h7', color: 'yellow' },
          { from: 'h5', to: 'g6', color: 'yellow' }
        ],
        highlights: ['h5', 'h7', 'g6'],
        conceptTag: 'Winning Attack'
      }
    ],
    
    summary: 'We used White\'s space advantage to launch a powerful pawn storm (f4, f5, g4, g5, g6) that opened lines and created weaknesses. The rook lift (Rf3, Rh3) and queen attack (Qh5) finished the job. Space advantage + pawn storm = winning attacks.',
    
    keyTakeaways: [
      'Space advantage allows you to launch pawn storms',
      'Pawn storms create weaknesses and open lines',
      'Support pawn advances with pieces (rooks, queen)',
      'Open lines created by pawn storms enable decisive attacks',
      'Space advantage + pawn storm is a winning combination'
    ],
    
    memoryTip: 'Think of space advantage as "room to build"—use that room to launch powerful pawn storms!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'Space Advantage Strategy',
    playerExample: {
      white: 'Mikhail Tal',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1960
    }
  },

  // PIECE_COORDINATION - Additional Pattern: Coordinated Attack with All Pieces
  {
    id: 'piece-coordination-all-pieces-deep',
    category: 'PIECE_COORDINATION',
    title: 'Coordinated Attack with All Pieces',
    subtitle: 'Making all pieces work together',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'When all pieces work together harmoniously, they create threats that are impossible to defend. This pattern shows how to coordinate all pieces—pawns, knights, bishops, rooks, and queen—to create a winning attack.',
    
    keyIdeas: [
      'All pieces working together are more powerful than the sum of their parts',
      'Coordinate pieces to attack the same target',
      'Use pieces to support each other',
      'Harmony creates threats; disharmony creates weakness',
      'Coordinated attacks are often decisive'
    ],
    
    mainLine: [
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling to safety and connecting the rooks. This is the first step in coordinating all pieces.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues coordinating.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, supporting the e4 pawn and preparing to coordinate with other pieces. All pieces are starting to work together.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e4', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Rook Coordination'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops to f4, controlling key squares and coordinating with the rook on e1. Pieces are starting to work together.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' },
          { from: 'f4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['f4'],
        conceptTag: 'Bishop Coordination'
      },
      {
        move: 'Nbd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues building coordination.',
        arrows: [{ from: 'b8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen develops to d2, connecting with the rook on e1 and bishop on f4. Now White has queen, rook, and bishop all coordinating on the central files. This is piece coordination!',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'e1', color: 'yellow' },
          { from: 'd2', to: 'f4', color: 'yellow' }
        ],
        highlights: ['d2', 'e1', 'f4'],
        conceptTag: 'Queen Coordination'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has better coordination.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks! Now White has both rooks on central files, coordinating with the queen and bishop. All pieces are working together harmoniously.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd2', color: 'yellow' },
          { from: 'd1', to: 'e1', color: 'yellow' }
        ],
        highlights: ['d1', 'e1', 'd2'],
        conceptTag: 'Complete Coordination'
      },
      {
        move: 'Bf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has overwhelming coordination.',
        arrows: [{ from: 'e7', to: 'f6', color: 'blue' }]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to e5! Now ALL pieces are coordinated—pawns (d4, e4), knights (Ne5, Nf3), bishops (Bf4, Be2), rooks (Re1, Rd1), and queen (Qd2). They all work together, creating overwhelming pressure.',
        arrows: [
          { from: 'c3', to: 'e5', color: 'green' },
          { from: 'e5', to: 'd7', color: 'yellow' },
          { from: 'e5', to: 'f7', color: 'yellow' },
          { from: 'e5', to: 'c6', color: 'yellow' }
        ],
        highlights: ['e5'],
        conceptTag: 'All Pieces Coordinated'
      },
      {
        move: 'Nxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to eliminate the knight, but White recaptures with advantage.',
        arrows: [{ from: 'd7', to: 'e5', color: 'blue' }]
      },
      {
        move: 'dxe5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The pawn on e5 now supports the attack, and all pieces remain coordinated.',
        arrows: [{ from: 'd4', to: 'e5', color: 'green' }],
        highlights: ['e5']
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black retreats, but White has too many coordinated pieces.',
        arrows: [{ from: 'f6', to: 'e7', color: 'blue' }]
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Breaking through! e6 opens lines for all of White\'s coordinated pieces. The rooks, queen, and bishops can now penetrate. This is the power of piece coordination—when all pieces work together, breakthroughs become possible.',
        arrows: [
          { from: 'e5', to: 'e6', color: 'green' },
          { from: 'e6', to: 'd7', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'Coordinated Breakthrough'
      },
      {
        move: 'fxe6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but White\'s coordinated pieces can now penetrate.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Rxe6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook captures! White\'s coordinated pieces have broken through. The rook on e6, supported by all other pieces, creates devastating threats. This demonstrates the power of piece coordination—when all pieces work together, they create winning attacks.',
        arrows: [
          { from: 'e1', to: 'e6', color: 'green' },
          { from: 'e6', to: 'e7', color: 'yellow' },
          { from: 'e6', to: 'd6', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'Winning Coordination'
      }
    ],
    
    summary: 'We coordinated all pieces—castled to connect rooks, developed Re1, Bf4, Qd2, Rad1, and Ne5. When all pieces worked together, we broke through with e6 and Rxe6. Piece coordination creates overwhelming pressure and winning attacks.',
    
    keyTakeaways: [
      'All pieces working together are more powerful than the sum of their parts',
      'Coordinate pieces to attack the same target',
      'Use pieces to support each other—rooks support queen, bishops support knights',
      'Harmony creates threats; disharmony creates weakness',
      'Coordinated attacks with all pieces are often decisive'
    ],
    
    memoryTip: 'Think of piece coordination as "an orchestra"—when all instruments play together, the music is beautiful and powerful!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'Piece Coordination Theory',
    playerExample: {
      white: 'Bobby Fischer',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1972
    }
  },

  // PROPHYLAXIS - Additional Pattern: Preventing Breakthrough
  {
    id: 'prophylaxis-preventing-breakthrough-deep',
    category: 'PROPHYLAXIS',
    title: 'Preventing the Breakthrough',
    subtitle: 'Stopping opponent\'s pawn breaks',
    fen: 'r1bq1rk1/1p2bppp/p1n1pn2/2ppP3/3P4/2P1BN2/PP2NPPP/R2QK2R w KQ - 0 10',
    toMove: 'white',
    
    introduction: 'Prophylaxis means preventing your opponent\'s plans before executing your own. One key aspect is preventing pawn breaks that would open lines or create weaknesses. This pattern shows how to use prophylactic thinking to stop dangerous pawn breaks.',
    
    keyIdeas: [
      'Prevent opponent\'s plans before executing your own',
      'Identify dangerous pawn breaks and stop them',
      'Use pieces to control key squares',
      'Prophylactic moves often look passive but are strategically correct',
      'Stopping opponent\'s plans creates lasting advantages'
    ],
    
    mainLine: [
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'PROPHYLAXIS! a3 prevents ...b4, which would undermine White\'s pawn structure. This looks passive, but it\'s strategically correct—preventing the opponent\'s plan before it happens.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'a3', to: 'b4', color: 'red' }
        ],
        highlights: ['a3', 'b4'],
        conceptTag: 'Preventing Break'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues preventing breaks.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'More prophylaxis! h3 prevents ...Bg4, which would pin the knight and create tactical threats. Prophylactic moves prevent problems before they arise.',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' },
          { from: 'h3', to: 'g4', color: 'red' }
        ],
        highlights: ['h3', 'g4'],
        conceptTag: 'Preventing Pins'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the prophylactic strategy.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, controlling the d-file and preventing ...d4 breaks. This is prophylactic—stopping the opponent\'s plan.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd4', color: 'red' }
        ],
        highlights: ['d1', 'd4'],
        conceptTag: 'Controlling Key Squares'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions, but White\'s prophylaxis continues.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Bf1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop retreats! This prevents ...e5 breaks by controlling the e5 square. Prophylactic moves often look passive, but they prevent dangerous counterplay.',
        arrows: [
          { from: 'e2', to: 'f1', color: 'green' },
          { from: 'f1', to: 'e5', color: 'red' }
        ],
        highlights: ['f1', 'e5'],
        conceptTag: 'Preventing e5 Break'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has prevented all dangerous breaks.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The queen moves to d2, supporting the center and maintaining prophylactic control. White has prevented all dangerous breaks and now has a solid, winning position.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd4', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Maintaining Control'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White\'s prophylaxis has been successful.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Now White can advance! After preventing all of Black\'s breaks, White can safely advance. This is the power of prophylaxis—prevent opponent\'s plans, then execute your own.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['b4'],
        conceptTag: 'Executing Plan'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but White has a winning continuation.',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }]
      },
      {
        move: 'axb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White has won the c5 pawn and has a completely winning position. The prophylaxis (a3, h3, Rfd1, Bf1) prevented all counterplay, allowing White to advance safely.',
        arrows: [{ from: 'a3', to: 'b4', color: 'green' }],
        highlights: ['b4', 'c5']
      },
      {
        move: 'Qb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to counterattack, but White has too many advantages.',
        arrows: [{ from: 'c7', to: 'b6', color: 'blue' }]
      },
      {
        move: 'c4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Breaking through! c4 opens lines and creates a winning advantage. White\'s prophylaxis prevented all counterplay, and now White can execute the plan. This demonstrates the power of prophylactic thinking—prevent opponent\'s plans, then win with your own.',
        arrows: [
          { from: 'c3', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Winning Breakthrough'
      },
      {
        move: 'dxc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but White has a winning position.',
        arrows: [{ from: 'd5', to: 'c4', color: 'blue' }]
      },
      {
        move: 'Bxc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has won material and has a completely winning position. The prophylactic strategy (preventing breaks) allowed White to advance safely and win. This demonstrates the power of prophylaxis—prevent opponent\'s plans, then execute your own with decisive effect.',
        arrows: [{ from: 'f1', to: 'c4', color: 'green' }],
        highlights: ['c4'],
        conceptTag: 'Prophylactic Success'
      }
    ],
    
    summary: 'We used prophylaxis to prevent all dangerous breaks (a3 prevents ...b4, h3 prevents ...Bg4, Rfd1 prevents ...d4, Bf1 prevents ...e5). After preventing counterplay, we advanced with b4 and c4, winning material. Prophylaxis prevents opponent\'s plans, then allows you to execute your own.',
    
    keyTakeaways: [
      'Prevent opponent\'s plans before executing your own',
      'Identify dangerous pawn breaks and stop them with prophylactic moves',
      'Use pieces to control key squares and prevent breaks',
      'Prophylactic moves often look passive but are strategically correct',
      'Stopping opponent\'s plans creates lasting advantages and winning chances'
    ],
    
    memoryTip: 'Remember Petrosian\'s wisdom: "Do not what you want; do what your opponent does not want"—prevent their plans first!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'Prophylactic Strategy',
    playerExample: {
      white: 'Tigran Petrosian',
      black: 'Boris Spassky',
      event: 'World Championship',
      year: 1966
    }
  },

  // MINORITY_ATTACK - Additional Pattern: Minority Attack with Pieces
  {
    id: 'minority-attack-with-pieces-deep',
    category: 'MINORITY_ATTACK',
    title: 'Minority Attack with Piece Support',
    subtitle: 'Using pieces to support the minority attack',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R w KQ - 0 8',
    toMove: 'white',
    
    introduction: 'The minority attack is usually a pawn attack, but pieces can support it powerfully. By coordinating pieces with the minority attack, you create overwhelming pressure that forces weaknesses. This pattern shows how to use pieces to support and enhance the minority attack.',
    
    keyIdeas: [
      'Minority attack creates weaknesses in the opponent\'s pawn structure',
      'Pieces can support the minority attack powerfully',
      'Coordinate pieces to pile up on the target',
      'The minority attack often leads to material gains',
      'Piece support makes the minority attack decisive'
    ],
    
    mainLine: [
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Starting the minority attack! b4 attacks Black\'s c5 pawn with fewer pawns. This is the classic minority attack—attacking the majority to create weaknesses.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' },
          { from: 'b4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['b4', 'c5'],
        conceptTag: 'Minority Attack Begins'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this creates weaknesses.',
        arrows: [{ from: 'c5', to: 'b4', color: 'blue' }],
        highlights: ['b4', 'c6']
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing! Now Black has a weak c6 pawn that cannot be defended by another pawn.',
        arrows: [{ from: 'c3', to: 'b4', color: 'green' }],
        highlights: ['c6']
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White can now attack the weak c6 pawn with pieces.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to c1, targeting the weak c6 pawn! The minority attack has created a weakness, and now pieces pile up on it. This is how pieces support the minority attack.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c1', 'c6'],
        conceptTag: 'Piece Support'
      },
      {
        move: 'Rfc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has more pieces to pile up.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Qb3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to b3, adding more pressure on c6! Now White has rook and queen attacking the weak pawn. The minority attack + piece support creates overwhelming pressure.',
        arrows: [
          { from: 'c2', to: 'b3', color: 'green' },
          { from: 'b3', to: 'c6', color: 'yellow' },
          { from: 'b3', to: 'b7', color: 'yellow' }
        ],
        highlights: ['b3', 'c6'],
        conceptTag: 'Queen Support'
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends, but White has more threats.',
        arrows: [{ from: 'd8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop develops to f4, adding yet another attacker to c6! Now White has rook, queen, and bishop all targeting the weak pawn. The minority attack has created a weakness, and pieces are piling up on it.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4', 'c6'],
        conceptTag: 'Maximum Pressure'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black doubles rooks, but White has too many attackers.',
        arrows: [{ from: 'f8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rc3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to c3, tripling on the c-file! White now has rook, queen, and bishop all attacking c6. The minority attack + piece coordination creates a winning position.',
        arrows: [
          { from: 'c1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'c6', color: 'yellow' }
        ],
        highlights: ['c3', 'c6'],
        conceptTag: 'Tripling'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend with the bishop, but White has a winning continuation.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Bxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The minority attack created the weakness, and piece support (Rac1, Qb3, Bf4, Rc3) piled up to win it. This is the power of minority attack with piece support.',
        arrows: [{ from: 'f4', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now has doubled c-pawns which are even weaker.',
        arrows: [{ from: 'b7', to: 'c6', color: 'blue' }],
        highlights: ['c6', 'c7']
      },
      {
        move: 'Rxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Capturing the second pawn! White has won material and has a completely winning position. The minority attack (b4) created weaknesses, and piece support (Rac1, Qb3, Bf4, Rc3) converted those weaknesses into material gains. This demonstrates the power of minority attack with piece coordination.',
        arrows: [{ from: 'c3', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Total Success'
      },
      {
        move: 'Rxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has won material and has a winning endgame.',
        arrows: [{ from: 'c8', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Qxc6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has won a pawn and has a completely winning position. The minority attack with piece support has been a complete success—it created weaknesses and converted them into material gains.',
        arrows: [{ from: 'b3', to: 'c6', color: 'green' }],
        highlights: ['c6'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We launched the minority attack with b4, which created a weak c6 pawn. Then we supported it with pieces (Rac1, Qb3, Bf4, Rc3), piling up on the weakness. The coordinated attack won material. Minority attack + piece support = winning strategy.',
    
    keyTakeaways: [
      'Minority attack creates weaknesses in the opponent\'s pawn structure',
      'Pieces can powerfully support the minority attack',
      'Coordinate pieces to pile up on the target weakness',
      'The minority attack often leads to material gains when supported by pieces',
      'Piece support makes the minority attack decisive'
    ],
    
    memoryTip: 'Think of the minority attack as "creating a crack"—then use pieces to "hammer it open"!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Minority Attack Strategy',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // PAWN_BREAKS - Additional Pattern: Central Pawn Break
  {
    id: 'pawn-breaks-central-deep',
    category: 'PAWN_BREAKS',
    title: 'The Central Pawn Break',
    subtitle: 'Opening the center at the right moment',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Central pawn breaks are among the most important in chess. They open lines, activate pieces, and can completely change the nature of the position. Timing is crucial—break too early and you\'re not ready; break too late and the opportunity is gone. This pattern shows how to execute a well-timed central pawn break.',
    
    keyIdeas: [
      'Central pawn breaks open lines and activate pieces',
      'Timing is crucial—prepare before breaking',
      'Break when your pieces are ready to exploit open lines',
      'Central breaks often lead to decisive attacks',
      'Well-timed breaks change the position completely'
    ],
    
    mainLine: [
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling first! Before breaking, we need to be ready. Castling connects rooks and prepares for the central break.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White prepares the break.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to e1, supporting the e4 pawn and preparing for the central break. Preparation is key before breaking.',
        arrows: [
          { from: 'f1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e4', color: 'yellow' }
        ],
        highlights: ['e1'],
        conceptTag: 'Preparing the Break'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop develops, adding more support for the break. White is building up before breaking.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4']
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White is ready to break.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE CENTRAL BREAK! d5 opens the center and creates lines for White\'s pieces. This is the moment—all pieces are ready, and the break is decisive.',
        arrows: [
          { from: 'd4', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c5', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'The Break'
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but this opens lines for White.',
        arrows: [{ from: 'c5', to: 'd5', color: 'blue' }]
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The center is now open, and White\'s pieces can penetrate. The break has succeeded.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge, but White has a strong response.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! The center is open, and White\'s pieces are active.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has more active pieces due to the break.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen develops, controlling the d-file opened by the break. The central break has opened lines, and White\'s pieces are now extremely active.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' },
          { from: 'd2', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d2'],
        conceptTag: 'Exploiting Open Lines'
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to contest the file, but White has more active pieces.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Rad1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Doubling rooks on the d-file! The central break has opened the d-file, and White\'s rooks are now extremely powerful. The break has been completely successful.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' },
          { from: 'd1', to: 'd6', color: 'yellow' }
        ],
        highlights: ['d1', 'e1'],
        conceptTag: 'Rook Power'
      },
      {
        move: 'Bc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'd7', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight jumps to d4, another powerful central square! The central break (d5) has opened lines and activated all of White\'s pieces. White has a completely winning position. This demonstrates the power of well-timed central pawn breaks—they open lines, activate pieces, and create winning attacks.',
        arrows: [
          { from: 'd5', to: 'd4', color: 'green' },
          { from: 'd4', to: 'c6', color: 'yellow' },
          { from: 'd4', to: 'e6', color: 'yellow' },
          { from: 'd4', to: 'f5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We prepared for the central break (O-O, Re1, Bf4), then executed it with d5. The break opened lines, activated pieces (Qd2, Rad1, Nd4), and created a winning position. Well-timed central breaks are decisive.',
    
    keyTakeaways: [
      'Central pawn breaks open lines and activate pieces',
      'Timing is crucial—prepare before breaking (castle, develop, support)',
      'Break when your pieces are ready to exploit open lines',
      'Central breaks often lead to decisive attacks',
      'Well-timed breaks change the position completely'
    ],
    
    memoryTip: 'Think of central breaks as "opening the floodgates"—prepare first, then let your pieces flood through!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Pawn Break Strategy',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  },

  // KING_ACTIVITY - Additional Pattern: King March to Queenside
  {
    id: 'king-activity-queenside-march-deep',
    category: 'KING_ACTIVITY',
    title: 'King March to the Queenside',
    subtitle: 'Activating the king in endgames',
    fen: '8/pp3ppp/3k4/2p5/8/4K3/PP3PPP/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In endgames, the king transforms from a liability to a fighting piece. Marching the king to the queenside can win pawns, support passed pawns, and create winning advantages. This pattern shows how to activate the king and march it to victory.',
    
    keyIdeas: [
      'The king is a fighting piece in endgames',
      'Active kings win endgames',
      'March the king to attack weak pawns',
      'King activity combined with pawn activity is decisive',
      'Centralize the king, then march it forward'
    ],
    
    mainLine: [
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Centralizing the king! Kd4 places the king in the center, from where it can move to either wing. This is the first step in activating the king.',
        arrows: [
          { from: 'e3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'c5', color: 'yellow' },
          { from: 'd4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'King Centralization'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king also centralizes, but White has a plan.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Kc5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king marches to the queenside! Kc5 attacks the c5 pawn and prepares to support White\'s queenside pawns. Active king = winning endgame.',
        arrows: [
          { from: 'd4', to: 'c5', color: 'green' },
          { from: 'c5', to: 'c4', color: 'yellow' },
          { from: 'c5', to: 'b5', color: 'yellow' }
        ],
        highlights: ['c5', 'c4'],
        conceptTag: 'King March Begins'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White continues.',
        arrows: [{ from: 'd6', to: 'c6', color: 'blue' }]
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king advances further! Kb5 attacks the b7 pawn and supports White\'s a-pawn. The king march is creating winning threats.',
        arrows: [
          { from: 'c5', to: 'b5', color: 'green' },
          { from: 'b5', to: 'b7', color: 'yellow' },
          { from: 'b5', to: 'a5', color: 'yellow' }
        ],
        highlights: ['b5', 'b7'],
        conceptTag: 'Attacking Pawns'
      },
      {
        move: 'Kb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king defends, but White has more threats.',
        arrows: [{ from: 'c6', to: 'b6', color: 'blue' }]
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Advancing the pawn! The active king supports the pawn advance. King activity + pawn activity = winning endgame.',
        arrows: [
          { from: 'a2', to: 'a4', color: 'green' },
          { from: 'b5', to: 'a4', color: 'yellow' }
        ],
        highlights: ['a4', 'b5'],
        conceptTag: 'King-Pawn Coordination'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to counterattack, but White has a winning plan.',
        arrows: [{ from: 'b6', to: 'c6', color: 'blue' }]
      },
      {
        move: 'a5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances again! The active king supports the pawn, and White is creating a passed pawn.',
        arrows: [
          { from: 'a4', to: 'a5', color: 'green' },
          { from: 'b5', to: 'a5', color: 'yellow' }
        ],
        highlights: ['a5'],
        conceptTag: 'Creating Passed Pawn'
      },
      {
        move: 'Kb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to stop the pawn, but White has more threats.',
        arrows: [{ from: 'c6', to: 'b7', color: 'blue' }]
      },
      {
        move: 'Ka6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king marches even further! Ka6 supports the a5 pawn and prepares to win the b7 pawn. The king march has been decisive.',
        arrows: [
          { from: 'b5', to: 'a6', color: 'green' },
          { from: 'a6', to: 'a5', color: 'yellow' },
          { from: 'a6', to: 'b7', color: 'yellow' }
        ],
        highlights: ['a6', 'a5', 'b7'],
        conceptTag: 'Deep Penetration'
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White has a winning continuation.',
        arrows: [{ from: 'b7', to: 'c7', color: 'blue' }]
      },
      {
        move: 'Kxb7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The king march (Kd4, Kc5, Kb5, Ka6) has enabled White to win the b7 pawn. Active king = material gains.',
        arrows: [{ from: 'a6', to: 'b7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to counterattack, but White has a winning plan.',
        arrows: [{ from: 'c7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn advances! With the active king supporting it, the a-pawn will promote. The king march has created a winning passed pawn.',
        arrows: [
          { from: 'a5', to: 'a6', color: 'green' },
          { from: 'b7', to: 'a6', color: 'yellow' }
        ],
        highlights: ['a6'],
        conceptTag: 'Promoting Pawn'
      },
      {
        move: 'Kc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to stop the pawn, but it\'s too late.',
        arrows: [{ from: 'd6', to: 'c5', color: 'blue' }]
      },
      {
        move: 'a7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The pawn is one square from promotion! The king march (Kd4, Kc5, Kb5, Ka6, Kxb7) has enabled White to create and support a passed pawn. Active king + passed pawn = winning endgame. This demonstrates the power of king activity in endgames.',
        arrows: [
          { from: 'a6', to: 'a7', color: 'green' },
          { from: 'b7', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a7'],
        conceptTag: 'Winning Endgame'
      }
    ],
    
    summary: 'We centralized the king (Kd4), then marched it to the queenside (Kc5, Kb5, Ka6, Kxb7). The active king supported pawn advances (a4, a5, a6, a7) and won material. King activity in endgames is decisive.',
    
    keyTakeaways: [
      'The king is a fighting piece in endgames—use it actively!',
      'Active kings win endgames',
      'March the king to attack weak pawns and support your own',
      'King activity combined with pawn activity is decisive',
      'Centralize the king, then march it forward to victory'
    ],
    
    memoryTip: 'Remember: "In endgames, the king is a fighting piece"—march it forward and use it to win!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'King Activity Theory',
    playerExample: {
      white: 'Vasily Smyslov',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1957
    }
  },

  // EXCHANGE_STRATEGY - Additional Pattern: Trading to Simplify Advantage
  {
    id: 'exchange-strategy-simplify-deep',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trading to Simplify an Advantage',
    subtitle: 'Converting advantages through exchanges',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'When you have an advantage, trading pieces can simplify the position and make your advantage easier to convert. This pattern shows how to use exchanges strategically to simplify and win.',
    
    keyIdeas: [
      'Trade pieces when you have an advantage',
      'Simplification makes advantages easier to convert',
      'Trade attacking pieces when defending',
      'Keep pieces when attacking',
      'Strategic exchanges convert advantages into wins'
    ],
    
    mainLine: [
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling to safety. White has a space advantage and better development.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }]
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White has the advantage.',
        arrows: [{ from: 'f8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing the bishop actively. White maintains the advantage.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        highlights: ['f4']
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        arrows: [{ from: 'e8', to: 'g8', color: 'blue' }]
      },
      {
        move: 'Bxe7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading bishops! White has an advantage, so simplifying makes it easier to convert. Trading pieces when ahead is a key strategic principle.',
        arrows: [{ from: 'f4', to: 'e7', color: 'green' }],
        highlights: ['e7'],
        conceptTag: 'Simplifying Advantage'
      },
      {
        move: 'Qxe7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has simplified the position.',
        arrows: [{ from: 'd8', to: 'e7', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The rook moves to d1, maintaining pressure. White still has the advantage, and it\'s now simpler to convert.',
        arrows: [
          { from: 'a1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1']
      },
      {
        move: 'Rfd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White can trade more.',
        arrows: [{ from: 'f8', to: 'd8', color: 'blue' }]
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading knights! White simplifies further, making the advantage easier to convert. Strategic exchanges when ahead are correct.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'More Simplification'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures.',
        arrows: [{ from: 'f6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing! White now has a central pawn on d5, and the position is simpler. The advantage is easier to convert.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      {
        move: 'Qd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White can trade more.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Trading rooks! White simplifies even more. With fewer pieces, the advantage (central pawn, better structure) is easier to convert.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Maximum Simplification'
      },
      {
        move: 'Rxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures.',
        arrows: [{ from: 'd8', to: 'd5', color: 'blue' }]
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen captures! White has simplified to a queen endgame with a central pawn advantage. The strategic exchanges have made the advantage easy to convert.',
        arrows: [{ from: 'd1', to: 'd5', color: 'green' }],
        highlights: ['d5']
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but White has a winning endgame.',
        arrows: [{ from: 'd6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has a central passed pawn on d5 and a winning endgame. The strategic exchanges (Bxe7, Nxd5, Rxd5, Qxd5) simplified the position and made the advantage easy to convert. This demonstrates the power of trading when ahead—simplification converts advantages into wins.',
        arrows: [{ from: 'e4', to: 'd5', color: 'green' }],
        highlights: ['d5'],
        conceptTag: 'Winning Endgame'
      }
    ],
    
    summary: 'We had an advantage, so we simplified through exchanges (Bxe7, Nxd5, Rxd5, Qxd5). The simplified position made the advantage (central pawn) easy to convert. Trading when ahead is correct strategy.',
    
    keyTakeaways: [
      'Trade pieces when you have an advantage—simplification makes conversion easier',
      'Simplified positions make advantages easier to convert',
      'Trade attacking pieces when defending',
      'Keep pieces when attacking',
      'Strategic exchanges convert advantages into wins'
    ],
    
    memoryTip: 'Remember: "When ahead, trade pieces; when behind, keep pieces"—simplification converts advantages!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Exchange Strategy Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
    }
  },

  // BLOCKADE - Additional Pattern: Blockade with Pieces
  {
    id: 'blockade-with-pieces-deep',
    category: 'BLOCKADE',
    title: 'Blockading with Multiple Pieces',
    subtitle: 'Using pieces to stop enemy advances',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3pP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    
    introduction: 'Blockading enemy pawns and pieces is crucial for restricting the opponent. While knights are ideal blockaders, other pieces can also block effectively. This pattern shows how to use multiple pieces to create a powerful blockade.',
    
    keyIdeas: [
      'Blockades stop enemy advances and restrict pieces',
      'Knights are ideal blockaders, but other pieces can also block',
      'Multiple pieces can create a powerful blockade',
      'Blockades create lasting positional advantages',
      'A successful blockade paralyzes the opponent'
    ],
    
    mainLine: [
      {
        move: 'Nd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight moves to d2, preparing to block the d5 pawn. Blockading enemy pawns is a key strategic technique.',
        arrows: [
          { from: 'f3', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'red' }
        ],
        highlights: ['d2', 'd5'],
        conceptTag: 'Preparing Blockade'
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues the blockade plan.',
        arrows: [{ from: 'c8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Nf1',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight moves to f1, preparing to jump to e3 and then d5. This is a classic knight maneuver to establish a blockade.',
        arrows: [
          { from: 'd2', to: 'f1', color: 'green' },
          { from: 'f1', to: 'e3', color: 'yellow' },
          { from: 'e3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['f1'],
        conceptTag: 'Knight Maneuver'
      },
      {
        move: 'Re8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but White continues.',
        arrows: [{ from: 'f8', to: 'e8', color: 'blue' }]
      },
      {
        move: 'Ne3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The knight arrives at e3! From here it can jump to d5 to block the pawn. The blockade is taking shape.',
        arrows: [
          { from: 'f1', to: 'e3', color: 'green' },
          { from: 'e3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['e3', 'd5'],
        conceptTag: 'Blockade Formation'
      },
      {
        move: 'Bf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions, but White establishes the blockade.',
        arrows: [{ from: 'e7', to: 'f8', color: 'blue' }]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE BLOCKADE! The knight lands on d5, completely stopping the d5 pawn from advancing. This is the perfect blockading square.',
        arrows: [
          { from: 'e3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'd5', color: 'red' }
        ],
        highlights: ['d5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to challenge, but White supports the blockade.',
        arrows: [{ from: 'f8', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bishop moves to d3, supporting the blockading knight! Now White has both knight and bishop blockading d5. Multiple pieces create a powerful blockade.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d3', 'd5'],
        conceptTag: 'Supporting Blockade'
      },
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but the blockade holds.',
        arrows: [{ from: 'd8', to: 'd7', color: 'blue' }]
      },
      {
        move: 'Qd2',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The queen moves to d2, adding even more support to the blockade! Now White has knight, bishop, and queen all blockading and supporting d5. This is a powerful multi-piece blockade.',
        arrows: [
          { from: 'd1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d2', 'd5'],
        conceptTag: 'Multi-Piece Blockade'
      },
      {
        move: 'Rac8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops, but the blockade is solid.',
        arrows: [{ from: 'a8', to: 'c8', color: 'blue' }]
      },
      {
        move: 'Rfd1',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The rook moves to d1, completing the blockade! Now White has knight, bishop, queen, and rook all blockading d5. This is an overwhelming blockade that completely paralyzes Black\'s position.',
        arrows: [
          { from: 'f1', to: 'd1', color: 'green' },
          { from: 'd1', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d1', 'd5'],
        conceptTag: 'Complete Blockade'
      },
      {
        move: 'Rc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to activate, but White has a winning position.',
        arrows: [{ from: 'c8', to: 'c7', color: 'blue' }]
      },
      {
        move: 'c4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Advancing on the queenside! The blockade has paralyzed Black, so White can advance on other fronts. The multi-piece blockade (Nd5, Bd3, Qd2, Rd1) has created a completely winning position. This demonstrates the power of blockades—they restrict the opponent and allow you to advance elsewhere.',
        arrows: [
          { from: 'c2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'c5', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Winning Position'
      }
    ],
    
    summary: 'We established a blockade on d5 with the knight (Nd2-f1-e3-d5), then supported it with the bishop (Bd3), queen (Qd2), and rook (Rd1). The multi-piece blockade paralyzed Black, allowing White to advance on the queenside. Blockades restrict the opponent and create winning advantages.',
    
    keyTakeaways: [
      'Blockades stop enemy advances and restrict pieces',
      'Knights are ideal blockaders, but other pieces can also block effectively',
      'Multiple pieces can create a powerful, unbreakable blockade',
      'Blockades create lasting positional advantages',
      'A successful blockade paralyzes the opponent and allows you to advance elsewhere'
    ],
    
    memoryTip: 'Think of a blockade as "a wall of pieces"—the more pieces in the wall, the stronger it is!',
    
    difficulty: 4,
    estimatedMinutes: 14,
    source: 'Blockade Theory',
    playerExample: {
      white: 'Aron Nimzowitsch',
      black: 'Saemisch',
      event: 'Copenhagen',
      year: 1923
    }
  },

  // CENTRALIZATION - Additional Pattern: Centralization in Endgame
  {
    id: 'centralization-endgame-deep',
    category: 'CENTRALIZATION',
    title: 'Centralization in the Endgame',
    subtitle: 'Activating pieces in the endgame',
    fen: '8/4k3/1p3p2/p1p1b1p1/P1P1P1P1/2P5/4KB2/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In endgames, centralization becomes even more important. Centralized pieces control more squares, support pawn advances, and create winning chances. This pattern shows how to centralize pieces in the endgame to create winning advantages.',
    
    keyIdeas: [
      'Centralization is crucial in endgames',
      'Centralized pieces control more squares',
      'Centralized pieces support pawn advances',
      'Centralize the king in endgames',
      'Centralization creates winning advantages'
    ],
    
    mainLine: [
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Centralizing the king! Kd3 places the king in the center, from where it can move to either wing. In endgames, centralization is crucial.',
        arrows: [
          { from: 'e2', to: 'd3', color: 'green' },
          { from: 'd3', to: 'c4', color: 'yellow' },
          { from: 'd3', to: 'e4', color: 'yellow' }
        ],
        highlights: ['d3'],
        conceptTag: 'King Centralization'
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king also centralizes, but White has a plan.',
        arrows: [{ from: 'e7', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Centralizing the bishop! Bc4 places the bishop on a central square where it controls many squares. Centralized pieces are powerful in endgames.',
        arrows: [
          { from: 'e2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'f7', color: 'yellow' },
          { from: 'c4', to: 'a6', color: 'yellow' }
        ],
        highlights: ['c4'],
        conceptTag: 'Bishop Centralization'
      },
      {
        move: 'Bd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White has more active pieces.',
        arrows: [{ from: 'e5', to: 'd6', color: 'blue' }]
      },
      {
        move: 'Ke4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king advances further! Ke4 centralizes the king even more and prepares to support pawn advances. Centralized king + centralized bishop = powerful endgame.',
        arrows: [
          { from: 'd3', to: 'e4', color: 'green' },
          { from: 'e4', to: 'f5', color: 'yellow' },
          { from: 'e4', to: 'd5', color: 'yellow' }
        ],
        highlights: ['e4'],
        conceptTag: 'Maximum Centralization'
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to match, but White has more threats.',
        arrows: [{ from: 'd6', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king marches forward! Kf5 uses centralization to attack Black\'s pawns. Centralized pieces create winning chances.',
        arrows: [
          { from: 'e4', to: 'f5', color: 'green' },
          { from: 'f5', to: 'f6', color: 'yellow' },
          { from: 'f5', to: 'g5', color: 'yellow' }
        ],
        highlights: ['f5', 'f6'],
        conceptTag: 'Attacking with Centralization'
      },
      {
        move: 'Kf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king retreats, but White continues.',
        arrows: [{ from: 'e6', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Bxf7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Winning the pawn! The centralized bishop captures f7 because the centralized king supports it. Centralization creates winning chances.',
        arrows: [{ from: 'c4', to: 'f7', color: 'green' }],
        highlights: ['f7'],
        conceptTag: 'Winning Material'
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must recapture.',
        arrows: [{ from: 'f7', to: 'f7', color: 'blue' }]
      },
      {
        move: 'Kxf7',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing! White has won a pawn and has a winning endgame.',
        arrows: [{ from: 'f5', to: 'f7', color: 'green' }]
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to defend, but White has more threats.',
        arrows: [{ from: 'f7', to: 'e6', color: 'blue' }]
      },
      {
        move: 'Ke7',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The king advances further! Ke7 uses centralization to support pawn advances. Centralized pieces create winning advantages.',
        arrows: [
          { from: 'f7', to: 'e7', color: 'green' },
          { from: 'e7', to: 'd6', color: 'yellow' }
        ],
        highlights: ['e7']
      },
      {
        move: 'Kd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s king tries to counterattack, but White has a winning plan.',
        arrows: [{ from: 'e6', to: 'd5', color: 'blue' }]
      },
      {
        move: 'f5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Advancing the pawn! The centralized king supports the pawn advance. Centralization + pawn activity = winning endgame.',
        arrows: [
          { from: 'f2', to: 'f5', color: 'green' },
          { from: 'e7', to: 'f5', color: 'yellow' }
        ],
        highlights: ['f5'],
        conceptTag: 'Pawn Activity'
      },
      {
        move: 'gxf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must capture, but White has a winning continuation.',
        arrows: [{ from: 'g5', to: 'f5', color: 'blue' }]
      },
      {
        move: 'exf5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Recapturing! White has a passed pawn and a completely winning position. The centralization (Kd3, Bc4, Ke4, Kf5, Ke7) has created a winning endgame. This demonstrates the power of centralization in endgames—centralized pieces control more squares, support pawns, and create winning advantages.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }],
        highlights: ['f5'],
        conceptTag: 'Winning Endgame'
      }
    ],
    
    summary: 'We centralized the king (Kd3, Ke4, Kf5, Ke7) and bishop (Bc4), used them to win the f7 pawn, and supported pawn advances. Centralization in endgames creates winning advantages.',
    
    keyTakeaways: [
      'Centralization is crucial in endgames—centralized pieces control more squares',
      'Centralized pieces support pawn advances',
      'Centralize the king in endgames—it\'s a fighting piece',
      'Centralized pieces create winning chances',
      'Centralization + pawn activity = winning endgames'
    ],
    
    memoryTip: 'In endgames, think "centralize everything"—king, pieces, and pawns all benefit from centralization!',
    
    difficulty: 3,
    estimatedMinutes: 13,
    source: 'Endgame Centralization Theory',
    playerExample: {
      white: 'Vasily Smyslov',
      black: 'Mikhail Botvinnik',
      event: 'World Championship',
      year: 1957
    }
  }
];

// ============================================
// IMPORT ADDITIONAL PATTERNS
// ============================================

import { additionalPatterns } from './morePatterns';
// Generated patterns temporarily disabled - they only have single moves
// import { generatedPatterns } from './patternGenerator';

// Combine all patterns - using only detailed patterns with full move sequences
export const enhancedPatterns: EnhancedPattern[] = [
  ...baseEnhancedPatterns,
  ...additionalPatterns,
  // ...generatedPatterns, // Disabled - these only have single moves
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPatternsByCategory(category: PositionalCategory): EnhancedPattern[] {
  return enhancedPatterns.filter(p => p.category === category);
}

export function getAllCategories(): PositionalCategory[] {
  return Object.keys(categoryInfo) as PositionalCategory[];
}

export function getPatternById(id: string): EnhancedPattern | undefined {
  return enhancedPatterns.find(p => p.id === id);
}

export function getTotalPatternCount(): number {
  return enhancedPatterns.length;
}

export default enhancedPatterns;

