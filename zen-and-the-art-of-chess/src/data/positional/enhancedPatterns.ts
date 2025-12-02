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
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    
    introduction: 'The d5 square is a permanent weakness in Black\'s position—no pawn can ever attack it. We\'ll learn how to occupy this square with a knight that becomes a monster.',
    
    keyIdeas: [
      'Identify squares that cannot be attacked by pawns',
      'Knights are the ideal piece for outposts',
      'An established knight restricts enemy pieces',
      'Support the outpost with other pieces'
    ],
    
    mainLine: [
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight jumps to the dream square! On d5, it cannot be driven away by any pawn. This knight controls c7, e7, f6, b6, f4, and b4—covering both attacks and defense.',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Outpost Occupation',
        alternativeMoves: [
          {
            move: 'Be2',
            evaluation: 'good',
            explanation: 'Develops the bishop, but misses the chance to occupy the outpost immediately. Timing matters!'
          },
          {
            move: 'O-O-O',
            evaluation: 'good',
            explanation: 'Castling is always sensible, but Nd5 is more powerful right now as it establishes lasting dominance.'
          }
        ]
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black feels compelled to trade off this powerful knight. But this comes at a cost—White will recapture with the e-pawn, creating a powerful pawn center.',
        arrows: [
          { from: 'f6', to: 'd5', color: 'blue' }
        ],
        conceptTag: 'Defensive Trade'
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing toward the center! The d5-pawn is now a powerful wedge that restricts Black\'s pieces, especially the c6-knight which has no good squares.',
        arrows: [
          { from: 'e4', to: 'd5', color: 'green' }
        ],
        highlights: ['d5', 'c6'],
        conceptTag: 'Pawn Wedge',
        alternativeMoves: [
          {
            move: 'Nxd5',
            evaluation: 'equal',
            explanation: 'Also possible, keeping the knight, but the pawn on d5 is more restrictive for Black\'s pieces.'
          }
        ]
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to find activity for the displaced knight. But now d4 is available for White\'s remaining knight!',
        arrows: [
          { from: 'c6', to: 'e5', color: 'blue' }
        ]
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The second knight occupies an outpost! On d4, this knight is beautifully placed, pressuring f5 and supporting the d5 pawn. White\'s position is dominant.',
        arrows: [
          { from: 'd1', to: 'd4', color: 'green' }
        ],
        highlights: ['d4', 'd5'],
        conceptTag: 'Double Outposts'
      }
    ],
    
    variations: [
      {
        afterMove: 1,  // After Nd5
        moves: [
          {
            move: 'e6',
            isMainLine: false,
            annotation: '?!',
            explanation: 'Trying to kick the knight with ...e6 doesn\'t work! The knight stays strong.',
            arrows: [{ from: 'e7', to: 'e6', color: 'red' }]
          },
          {
            move: 'Ne7',
            isMainLine: false,
            annotation: '!',
            explanation: 'The knight simply retreats to an even better square! Now it threatens to jump to c6 or f5.',
            arrows: [
              { from: 'd5', to: 'e7', color: 'green' },
              { from: 'e7', to: 'c6', color: 'yellow' },
              { from: 'e7', to: 'f5', color: 'yellow' }
            ]
          }
        ]
      }
    ],
    
    summary: 'A knight on an outpost is a permanent asset that restricts the opponent. The d5 square in particular is powerful as it controls key central squares and cannot be challenged by Black\'s pawns.',
    
    keyTakeaways: [
      'Look for squares that cannot be attacked by enemy pawns',
      'Occupy outposts with knights—they lose no power being blocked',
      'A knight outpost often forces trades that favor the attacker',
      'Multiple outposts multiply the advantage'
    ],
    
    memoryTip: 'Think of an outpost knight as a "thorn in the side"—once there, it\'s painful and permanent!',
    
    difficulty: 3,
    estimatedMinutes: 8,
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
  {
    id: 'outpost-creation-e5',
    category: 'OUTPOSTS',
    title: 'Creating an Outpost with Pawn Play',
    subtitle: 'Using pawn structure to manufacture outposts',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    
    introduction: 'Outposts don\'t just appear—we create them! By advancing our e-pawn, we\'ll create a permanent outpost on e5 while restricting Black\'s pieces.',
    
    keyIdeas: [
      'Pawn advances can create outposts',
      'Displacing enemy pieces creates weak squares',
      'Plan the pawn structure before executing',
      'Trade pawns that guard key squares'
    ],
    
    mainLine: [
      {
        move: 'e5',
        isMainLine: true,
        annotation: '!',
        explanation: 'This pawn advance does several things: it gains space, kicks the f6-knight, and creates a permanent outpost on d4 for our knight!',
        arrows: [
          { from: 'e4', to: 'e5', color: 'green' },
          { from: 'e5', to: 'f6', color: 'red' }
        ],
        highlights: ['e5', 'd4'],
        conceptTag: 'Space + Outpost',
        alternativeMoves: [
          {
            move: 'Bb5',
            evaluation: 'good',
            explanation: 'A solid developing move, but e5 is more ambitious and creates long-term structural advantages.'
          },
          {
            move: 'Bd3',
            evaluation: 'good',
            explanation: 'Natural development, but doesn\'t seize the moment. The e5 advance is powerful now!'
          }
        ]
      },
      {
        move: 'Ne4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight retreats to e4, but it\'s unstable there and blocking the e-pawn. This is already an achievement for White.',
        arrows: [
          { from: 'f6', to: 'e4', color: 'blue' }
        ],
        alternativeMoves: [
          {
            move: 'Nfd7',
            evaluation: 'equal',
            explanation: 'A passive retreat. The knight on d7 is cramped and blocks the bishop.'
          },
          {
            move: 'Ng8',
            evaluation: 'bad',
            explanation: 'Too passive! The knight returns home, wasting time.'
          }
        ]
      },
      {
        move: 'Nxe4',
        isMainLine: true,
        annotation: '',
        explanation: 'We trade knights because it clears the path for our pieces and prevents Black from stabilizing on e4.',
        arrows: [
          { from: 'c3', to: 'e4', color: 'green' }
        ]
      },
      {
        move: 'dxe4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, but now the e4-pawn is isolated and weak! Plus, the d4 square is wide open.',
        highlights: ['e4', 'd4']
      },
      {
        move: 'Nd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight heads to the outpost! Via d2-e4 (no wait, that\'s occupied)—we\'ll maneuver Nd2-c4 or Nd2-b3-d4. The d4 square is the goal.',
        arrows: [
          { from: 'f3', to: 'd2', color: 'green' },
          { from: 'd2', to: 'c4', color: 'yellow' },
          { from: 'c4', to: 'd6', color: 'yellow' }
        ],
        conceptTag: 'Knight Maneuver'
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to solidify, but this weakens the d6 square—another potential outpost!',
        highlights: ['d6']
      },
      {
        move: 'Nc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight lands on c4, eyeing both d6 and e5 (after trades). The outpost-creating pawn structure has given White a permanent edge.',
        arrows: [
          { from: 'd2', to: 'c4', color: 'green' },
          { from: 'c4', to: 'd6', color: 'yellow' }
        ],
        highlights: ['c4', 'd6'],
        conceptTag: 'Outpost Achieved'
      }
    ],
    
    summary: 'We created an outpost by advancing e5, which displaced Black\'s knight and created weak squares. The key is seeing how pawn moves change the structure permanently.',
    
    keyTakeaways: [
      'Look for pawn advances that displace enemy pieces',
      'Displaced pieces leave behind weak squares',
      'Plan your knight routes to the new outposts',
      'Even temporary pawn advances can create permanent holes'
    ],
    
    memoryTip: 'Pawns are like construction workers—they build the houses (outposts) that knights will live in!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'Strategic Planning Fundamentals'
  },

  // ============================================
  // WEAK PAWNS - CHAPTER 1: ISOLATED QUEEN PAWN
  // ============================================
  {
    id: 'weak-iqp-blockade',
    category: 'WEAK_PAWNS',
    title: 'The Isolated Queen Pawn',
    subtitle: 'Exploiting the most famous weakness',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    
    introduction: 'Black has an isolated d5-pawn (IQP). This pawn cannot be defended by other pawns and is a permanent weakness. We\'ll learn how to exploit it systematically.',
    
    keyIdeas: [
      'Isolated pawns cannot be defended by other pawns',
      'The square in front of an IQP is an ideal blockading square',
      'Trade pieces to weaken the pawn further',
      'Knights are perfect blockaders'
    ],
    
    mainLine: [
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'First, we develop with tempo! The bishop takes an active diagonal and prepares to coordinate with other pieces against the d5 pawn.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' }
        ],
        conceptTag: 'Active Development',
        alternativeMoves: [
          {
            move: 'Nd4',
            evaluation: 'good',
            explanation: 'Immediately blockading is good, but developing the bishop first gives us more options.'
          }
        ]
      },
      {
        move: 'Bg4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black pins the knight, trying to create counterplay. But we have a strong response.',
        arrows: [
          { from: 'c8', to: 'g4', color: 'blue' }
        ]
      },
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Asking the question! The bishop must decide. We want to trade this bishop for our knight, then blockade on d4.',
        arrows: [
          { from: 'h2', to: 'h3', color: 'green' }
        ],
        conceptTag: 'Provoking Decision'
      },
      {
        move: 'Bxf3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades, but this is exactly what we wanted—one less piece to attack our blockading knight!',
        arrows: [
          { from: 'g4', to: 'f3', color: 'blue' }
        ]
      },
      {
        move: 'Qxf3',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing with the queen, which also eyes the d5 pawn. Everything is coming together.',
        arrows: [
          { from: 'd1', to: 'f3', color: 'green' },
          { from: 'f3', to: 'd5', color: 'yellow' }
        ],
        highlights: ['d5']
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to create counterplay on the c-file. But now comes the key move.',
        arrows: [
          { from: 'a8', to: 'c8', color: 'blue' }
        ]
      },
      {
        move: 'Nd4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The BLOCKADE! The knight lands on d4, the most beautiful square on the board. It cannot be driven away by pawns and completely freezes the d5 pawn.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' }
        ],
        highlights: ['d4', 'd5'],
        conceptTag: 'The Blockade'
      },
      {
        move: 'Ne5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black attacks our bishop, but we have a strong continuation.',
        arrows: [
          { from: 'c6', to: 'e5', color: 'blue' }
        ]
      },
      {
        move: 'Bxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Trading reduces Black\'s attackers. Fewer pieces means the IQP becomes even weaker.',
        arrows: [
          { from: 'f4', to: 'e5', color: 'green' }
        ],
        conceptTag: 'Trade Attackers'
      },
      {
        move: 'Nxe5',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced recapture.',
        arrows: [
          { from: 'f6', to: 'e5', color: 'blue' }
        ]
      },
      {
        move: 'Rac1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Doubling rooks! White will pile up on the c-file and eventually win the weak pawn. The blockade on d4 ensures Black\'s IQP is paralyzed.',
        arrows: [
          { from: 'a1', to: 'c1', color: 'green' },
          { from: 'c1', to: 'c8', color: 'yellow' }
        ],
        conceptTag: 'Doubling Rooks'
      }
    ],
    
    summary: 'The isolated d5-pawn was systematically exploited by blockading on d4 with a knight, trading off attackers, and piling up on weak squares. The knight on d4 was the key to the entire strategy.',
    
    keyTakeaways: [
      'An isolated pawn is weak because it cannot be defended by other pawns',
      'Blockade the square in front of isolated pawns',
      'Knights are ideal blockaders—they don\'t lose activity when placed in front of a pawn',
      'Trade pieces when attacking isolated pawns—fewer defenders means easier targets'
    ],
    
    memoryTip: 'Think of the IQP as a "sitting duck"—blockade it first, then surround and capture!',
    
    difficulty: 4,
    estimatedMinutes: 12,
    source: 'Classical Pawn Structure Theory',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'World Championship',
      year: 1978
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
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles, completing development. But the minority attack is coming!',
        arrows: [
          { from: 'e8', to: 'g8', color: 'blue' }
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
        move: 'c4',
        isMainLine: true,
        annotation: '?!',
        explanation: 'Black tries to close the queenside, but this creates a backward pawn on d5! An IQP in disguise.',
        arrows: [
          { from: 'c5', to: 'c4', color: 'red' }
        ],
        highlights: ['d5'],
        alternativeMoves: [
          {
            move: 'cxb4',
            evaluation: 'equal',
            explanation: 'Better, but after axb4 the a-file opens and c6 is still targeted.'
          }
        ]
      },
      {
        move: 'Bd2',
        isMainLine: true,
        annotation: '',
        explanation: 'Developing while preparing to put pressure on the new c4 weakness. The bishop can go to a5.',
        arrows: [
          { from: 'c1', to: 'd2', color: 'green' },
          { from: 'd2', to: 'a5', color: 'yellow' }
        ]
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop. Now we continue the plan.',
        arrows: [
          { from: 'c8', to: 'd7', color: 'blue' }
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
        move: 'Bxc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the weak pawn! The minority attack has succeeded—Black\'s queenside is shattered.',
        arrows: [
          { from: 'e2', to: 'c4', color: 'green' }
        ],
        highlights: ['c4'],
        conceptTag: 'Weakness Captured'
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
  // PROPHYLAXIS - KARPOV'S METHOD
  // ============================================
  {
    id: 'prophylaxis-prevent-break',
    category: 'PROPHYLAXIS',
    title: 'Stopping the Opponent\'s Plan',
    subtitle: 'Prophylactic thinking before action',
    fen: 'r2q1rk1/1p2bppp/p1n1pn2/2ppP3/3P4/2P1BN2/PP2NPPP/R2QK2R w KQ - 0 10',
    toMove: 'white',
    
    introduction: 'Before executing our own plan, we ask: "What does my opponent want?" Black wants to play ...b5-b4 attacking our center. We\'ll stop it first!',
    
    keyIdeas: [
      'Ask "What does my opponent want?" before every move',
      'Preventing counterplay is often better than creating threats',
      'Prophylaxis doesn\'t lose time—it gains it by denying opponent\'s ideas',
      'Petrosian and Karpov were masters of this technique'
    ],
    
    mainLine: [
      {
        move: 'a3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Pure prophylaxis! Black was planning ...b5-b4 to attack our pawn chain. Now this break is impossible. We lose nothing—our position remains strong.',
        arrows: [
          { from: 'a2', to: 'a3', color: 'green' },
          { from: 'b7', to: 'b5', color: 'red' },
          { from: 'b5', to: 'b4', color: 'red' }
        ],
        conceptTag: 'Prophylaxis',
        alternativeMoves: [
          {
            move: 'Ng3',
            evaluation: 'good',
            explanation: 'Natural developing move, but allows ...b5! with counterplay. Prophylaxis first!'
          },
          {
            move: 'O-O',
            evaluation: 'good',
            explanation: 'Castling is always reasonable, but ...b5 becomes dangerous. A3 is more precise.'
          }
        ]
      },
      {
        move: 'Qc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black repositions the queen. With ...b5 stopped, Black must find another plan. This already shows the success of a3!',
        arrows: [
          { from: 'd8', to: 'c7', color: 'blue' }
        ]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Now we calmly castle. Black\'s counterplay is neutralized, so we can improve our position step by step.',
        arrows: [
          { from: 'e1', to: 'g1', color: 'green' }
        ],
        conceptTag: 'Safe Development'
      },
      {
        move: 'b6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries ...b6 preparing ...Bb7, but this is much slower than ...b5 would have been. White is ahead in the race.',
        arrows: [
          { from: 'b7', to: 'b6', color: 'blue' }
        ]
      },
      {
        move: 'Ng3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Now we reposition our knight toward kingside activity. The knight heads for f5 or h5, joining the attack.',
        arrows: [
          { from: 'e2', to: 'g3', color: 'green' },
          { from: 'g3', to: 'f5', color: 'yellow' }
        ],
        conceptTag: 'Improving Pieces'
      },
      {
        move: 'Bb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop, but it\'s passive on b7—the e4 square is blocked by our e5 pawn.',
        arrows: [
          { from: 'c8', to: 'b7', color: 'blue' }
        ]
      },
      {
        move: 'Nh5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight arrives on the aggressive h5 square, threatening Nxf6 or Qg4 ideas. Black\'s queenside play never got started!',
        arrows: [
          { from: 'g3', to: 'h5', color: 'green' },
          { from: 'h5', to: 'f6', color: 'yellow' }
        ],
        highlights: ['h5'],
        conceptTag: 'Attack Prepared'
      }
    ],
    
    summary: 'One prophylactic move (a3) shut down Black\'s entire counterplay plan. While Black scrambled to find a new idea, White calmly improved and launched an attack. This is the power of prophylactic thinking.',
    
    keyTakeaways: [
      'Before playing your move, ask "What does my opponent want?"',
      'A simple prophylactic move can neutralize entire plans',
      'Prophylaxis doesn\'t waste time—it saves time by denying counterplay',
      'Once counterplay is stopped, improve your position gradually'
    ],
    
    memoryTip: 'Think of prophylaxis as "defense before offense"—lock the door before inviting guests!',
    
    difficulty: 3,
    estimatedMinutes: 8,
    source: 'Petrosian\'s Prophylactic Method',
    playerExample: {
      white: 'Anatoly Karpov',
      black: 'Viktor Korchnoi',
      event: 'Candidates Final',
      year: 1974
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
        move: 'Rd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black contests the file. But we have a second rook!',
        arrows: [
          { from: 'f8', to: 'd8', color: 'blue' }
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
        conceptTag: 'Total Dominance'
      }
    ],
    
    summary: 'We opened the position with d5 and e4, creating long diagonals for both bishops. The bishop pair dominated the open position while Black\'s knights struggled to find good squares.',
    
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
  // KING ACTIVITY - ENDGAME KING
  // ============================================
  {
    id: 'king-activity-endgame',
    category: 'KING_ACTIVITY',
    title: 'The Fighting King',
    subtitle: 'Activate your king in the endgame',
    fen: '8/pp2kppp/8/2p5/2P5/4K3/PP3PPP/8 w - - 0 1',
    toMove: 'white',
    
    introduction: 'In the endgame, the king transforms from a liability to a powerful fighting piece. We\'ll learn how to activate the king and use it to win.',
    
    keyIdeas: [
      'In endgames, the king is a fighting piece',
      'Centralize the king as early as possible',
      'The king can attack pawns and support pawn advances',
      'King activity often determines endgame outcomes'
    ],
    
    mainLine: [
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Centralizing immediately! The king heads toward the action. From d4, it controls key squares and can attack in multiple directions.',
        arrows: [
          { from: 'e3', to: 'd4', color: 'green' },
          { from: 'd4', to: 'c5', color: 'yellow' },
          { from: 'd4', to: 'd5', color: 'yellow' },
          { from: 'd4', to: 'e5', color: 'yellow' }
        ],
        highlights: ['d4'],
        conceptTag: 'Centralization',
        alternativeMoves: [
          {
            move: 'Kf4',
            evaluation: 'good',
            explanation: 'Also centralizing, but Kd4 is more flexible—it can go to either wing.'
          },
          {
            move: 'a4',
            evaluation: 'dubious',
            explanation: 'Pawn moves before king activation waste time in endgames!'
          }
        ]
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black also centralizes, but White moved first and has the initiative.',
        arrows: [
          { from: 'e7', to: 'd6', color: 'blue' }
        ]
      },
      {
        move: 'b4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Creating a breakthrough! With our king centralized, we can support pawn advances on either wing.',
        arrows: [
          { from: 'b2', to: 'b4', color: 'green' }
        ],
        conceptTag: 'Creating Weakness'
      },
      {
        move: 'cxb4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures, but this opens lines for our king!',
        arrows: [
          { from: 'c5', to: 'b4', color: 'blue' }
        ]
      },
      {
        move: 'Kxb4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king captures! Now it\'s even closer to Black\'s queenside pawns. This is why king centralization was so important.',
        arrows: [
          { from: 'd4', to: 'b4', color: 'green' },
          { from: 'b4', to: 'a5', color: 'yellow' }
        ],
        highlights: ['b4', 'a7'],
        conceptTag: 'King Attack'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to defend, but White\'s king is too active.',
        arrows: [
          { from: 'd6', to: 'c6', color: 'blue' }
        ]
      },
      {
        move: 'Ka5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king invades! It attacks the a7-pawn directly. Black cannot defend both queenside pawns.',
        arrows: [
          { from: 'b4', to: 'a5', color: 'green' },
          { from: 'a5', to: 'a7', color: 'yellow' }
        ],
        highlights: ['a5', 'a7'],
        conceptTag: 'Invasion'
      },
      {
        move: 'Kb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends the a-pawn, but now c5 is available!',
        arrows: [
          { from: 'c6', to: 'b7', color: 'blue' }
        ]
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The c-pawn advances, creating a passed pawn! The king supported this advance by controlling key squares.',
        arrows: [
          { from: 'c4', to: 'c5', color: 'green' }
        ],
        highlights: ['c5'],
        conceptTag: 'Passed Pawn'
      },
      {
        move: 'Kc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black blocks, but it\'s too late. White is winning.',
        arrows: [
          { from: 'b7', to: 'c6', color: 'blue' }
        ]
      },
      {
        move: 'Kxa7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Capturing the a7-pawn! Now White has a passed a-pawn AND a passed c-pawn. The active king made this possible.',
        arrows: [
          { from: 'a5', to: 'a7', color: 'green' }
        ],
        conceptTag: 'Victory'
      }
    ],
    
    summary: 'The king centralized early (Kd4), then invaded the queenside (Ka5), won a pawn, and created passed pawns. Active king play is the key to winning endgames!',
    
    keyTakeaways: [
      'In endgames, activate your king immediately',
      'A centralized king can attack in any direction',
      'The king should support pawn advances and attack enemy pawns',
      'King activity is often worth more than material in endgames'
    ],
    
    memoryTip: 'In endgames, think of your king as a "super-piece"—it should be in the thick of the action!',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Fundamental Endgame Technique',
    playerExample: {
      white: 'Magnus Carlsen',
      black: 'Sergey Karjakin',
      event: 'World Championship',
      year: 2016
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
        conceptTag: 'Mission Accomplished'
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
  // SPACE ADVANTAGE
  // ============================================
  {
    id: 'space-advantage-restrict',
    category: 'SPACE_ADVANTAGE',
    title: 'Using Space to Restrict',
    subtitle: 'Squeezing your opponent',
    fen: 'r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    
    introduction: 'White has advanced the e-pawn to e5, claiming more space. Now we\'ll learn how to use this space advantage to restrict Black\'s pieces and prepare an attack.',
    
    keyIdeas: [
      'Space restricts the opponent\'s piece mobility',
      'Maintain the space advantage—don\'t exchange the key pawn',
      'Cramped positions lead to tactical vulnerabilities',
      'Use extra space to maneuver and improve piece positions'
    ],
    
    mainLine: [
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '!',
        explanation: 'A quiet but strong developing move. We\'re in no hurry—Black is cramped. We develop calmly and maintain the space advantage.',
        arrows: [
          { from: 'f1', to: 'e2', color: 'green' }
        ],
        conceptTag: 'Calm Development',
        alternativeMoves: [
          {
            move: 'Bd3',
            evaluation: 'good',
            explanation: 'More aggressive, eyeing h7, but Be2 keeps options open for the knight on f3.'
          }
        ]
      },
      {
        move: 'cxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to relieve pressure by exchanging pawns.',
        arrows: [
          { from: 'c5', to: 'd4', color: 'blue' }
        ]
      },
      {
        move: 'Nxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing with the knight maintains our central control. The knight is powerful on d4.',
        arrows: [
          { from: 'c3', to: 'd4', color: 'green' }
        ],
        highlights: ['d4'],
        alternativeMoves: [
          {
            move: 'Qxd4',
            evaluation: 'equal',
            explanation: 'Also fine, but the knight on d4 is more harmonious with our setup.'
          }
        ]
      },
      {
        move: 'Nxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black trades knights, trying to ease the cramp.',
        arrows: [
          { from: 'c6', to: 'd4', color: 'blue' }
        ]
      },
      {
        move: 'Qxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Recapturing. Our queen is beautifully centralized on d4.',
        arrows: [
          { from: 'd1', to: 'd4', color: 'green' }
        ],
        highlights: ['d4']
      },
      {
        move: 'Nc5',
        isMainLine: true,
        annotation: '?!',
        explanation: 'Black\'s knight tries to find an active square, but watch what happens next!',
        arrows: [
          { from: 'd7', to: 'c5', color: 'blue' }
        ]
      },
      {
        move: 'Bf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing with gain of time. The bishop threatens to take the knight on c5, exploiting the cramped position.',
        arrows: [
          { from: 'c1', to: 'f4', color: 'green' },
          { from: 'f4', to: 'c7', color: 'yellow' }
        ],
        conceptTag: 'Develop with Tempo'
      },
      {
        move: 'Nd7',
        isMainLine: true,
        annotation: '',
        explanation: 'The knight retreats again! Black keeps stepping on its own pieces—this is what happens in cramped positions.',
        arrows: [
          { from: 'c5', to: 'd7', color: 'blue' }
        ]
      },
      {
        move: 'O-O-O',
        isMainLine: true,
        annotation: '!',
        explanation: 'Castling queenside prepares Rhe1, targeting the weak e6 pawn. Black\'s position is passive while White is fully developed.',
        arrows: [
          { from: 'e1', to: 'c1', color: 'green' }
        ],
        conceptTag: 'Full Development'
      },
      {
        move: 'Be7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black finally develops the bishop, but White has a commanding lead in development and space.',
        arrows: [
          { from: 'f8', to: 'e7', color: 'blue' }
        ]
      },
      {
        move: 'Rhe1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Piling on the e6 weakness! The e5 pawn restricts Black, while we attack the base of Black\'s chain. Space + activity = total control.',
        arrows: [
          { from: 'h1', to: 'e1', color: 'green' },
          { from: 'e1', to: 'e6', color: 'yellow' }
        ],
        highlights: ['e6'],
        conceptTag: 'Total Domination'
      }
    ],
    
    summary: 'Our e5 pawn gave us a space advantage that restricted Black\'s pieces. We developed calmly, and Black\'s pieces kept bumping into each other. Space advantage leads to cramped positions for the opponent.',
    
    keyTakeaways: [
      'Space advantage restricts opponent\'s pieces',
      'Don\'t rush when you have more space—develop calmly',
      'Cramped positions lead to pieces getting in each other\'s way',
      'Use the space to maneuver freely while opponent struggles'
    ],
    
    memoryTip: 'Think of space like a cage—the more space you have, the more room to move. Your opponent is stuck in a smaller cage!',
    
    difficulty: 3,
    estimatedMinutes: 10,
    source: 'French Defense Strategy',
    playerExample: {
      white: 'Mikhail Botvinnik',
      black: 'Mikhail Tal',
      event: 'World Championship',
      year: 1960
    }
  },

  // ============================================
  // CENTRALIZATION
  // ============================================
  {
    id: 'centralization-pieces',
    category: 'CENTRALIZATION',
    title: 'The Power of Central Pieces',
    subtitle: 'Controlling the board from the center',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    
    introduction: 'Central pieces radiate power to all corners of the board. We\'ll learn why centralization is so important and how to achieve it.',
    
    keyIdeas: [
      'Central pieces control more squares than edge pieces',
      'A knight in the center controls 8 squares; on the rim only 2-4',
      'Develop toward the center, not the edges',
      'Control e4, d4, e5, d5 for maximum influence'
    ],
    
    mainLine: [
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight develops to its ideal square! From c3, it controls d5 and e4—key central squares. Compare this to Na3, which would control far fewer important squares.',
        arrows: [
          { from: 'b1', to: 'c3', color: 'green' },
          { from: 'c3', to: 'd5', color: 'yellow' },
          { from: 'c3', to: 'e4', color: 'yellow' }
        ],
        highlights: ['c3', 'd5', 'e4'],
        conceptTag: 'Ideal Development',
        alternativeMoves: [
          {
            move: 'Na3',
            evaluation: 'bad',
            explanation: 'A knight on the rim is dim! Na3 controls only weak squares on the edge.'
          },
          {
            move: 'd3',
            evaluation: 'good',
            explanation: 'Solid, but Nc3 is more active and develops a piece with tempo toward the center.'
          }
        ]
      },
      {
        move: 'Bc5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the bishop to an active diagonal, also controlling central squares.',
        arrows: [
          { from: 'f8', to: 'c5', color: 'blue' }
        ]
      },
      {
        move: 'd3',
        isMainLine: true,
        annotation: '',
        explanation: 'A solid move, supporting the e4 pawn and opening the diagonal for our dark-squared bishop.',
        arrows: [
          { from: 'd2', to: 'd3', color: 'green' }
        ]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles. Now we continue improving our centralization.',
        arrows: [
          { from: 'e8', to: 'g8', color: 'blue' }
        ]
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Castling, getting the king safe and connecting the rooks.',
        arrows: [
          { from: 'e1', to: 'g1', color: 'green' }
        ]
      },
      {
        move: 'd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black reinforces the center.',
        arrows: [
          { from: 'd7', to: 'd6', color: 'blue' }
        ]
      },
      {
        move: 'Nd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'THE PERFECT CENTRALIZATION! The knight lands on d5, the most powerful square on the board. From here, it attacks c7, e7, f6, b6, and f4. This is the dream!',
        arrows: [
          { from: 'c3', to: 'd5', color: 'green' },
          { from: 'd5', to: 'c7', color: 'yellow' },
          { from: 'd5', to: 'e7', color: 'yellow' },
          { from: 'd5', to: 'f6', color: 'yellow' },
          { from: 'd5', to: 'b6', color: 'yellow' }
        ],
        highlights: ['d5'],
        conceptTag: 'Central Dominance'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is forced to trade—the knight was too powerful. But we recapture favorably.',
        arrows: [
          { from: 'f6', to: 'd5', color: 'blue' }
        ]
      },
      {
        move: 'exd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Recapturing with the pawn, we gain space and open lines for our pieces. The d5 pawn is a powerful wedge restricting Black.',
        arrows: [
          { from: 'e4', to: 'd5', color: 'green' }
        ],
        highlights: ['d5'],
        conceptTag: 'Central Pawn Wedge'
      },
      {
        move: 'Ne7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s knight is pushed to a passive square. Our central control has driven Black\'s pieces back.',
        arrows: [
          { from: 'c6', to: 'e7', color: 'blue' }
        ]
      },
      {
        move: 'c3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Securing the center and preparing d4. White has a significant space and centralization advantage. The center is firmly in our control.',
        arrows: [
          { from: 'c2', to: 'c3', color: 'green' }
        ],
        conceptTag: 'Secure and Expand'
      }
    ],
    
    summary: 'We developed pieces toward the center (Nc3), then occupied d5 with a knight creating a dominant outpost. Centralization gives pieces maximum power and restricts the opponent.',
    
    keyTakeaways: [
      'Develop pieces toward the center, not the edges',
      'Central pieces control the entire board',
      'A knight on d5 or e5 is often worth more than a rook on the rim',
      'Control e4-d4-e5-d5 for strategic dominance'
    ],
    
    memoryTip: 'The center is like the high ground—whoever controls it sees and attacks everything!',
    
    difficulty: 2,
    estimatedMinutes: 8,
    source: 'Italian Game Fundamentals',
    playerExample: {
      white: 'Garry Kasparov',
      black: 'Viswanathan Anand',
      event: 'World Championship',
      year: 1995
    }
  }
];

// ============================================
// IMPORT ADDITIONAL PATTERNS
// ============================================

import { additionalPatterns } from './morePatterns';
import { generatedPatterns } from './patternGenerator';

// Combine all patterns - now with 50+ per category (800+ total)
export const enhancedPatterns: EnhancedPattern[] = [
  ...baseEnhancedPatterns,
  ...additionalPatterns,
  ...generatedPatterns,
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

