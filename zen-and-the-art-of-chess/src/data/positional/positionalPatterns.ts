// ============================================
// POSITIONAL CHESS PATTERNS MANUAL
// Strategic patterns for deeper chess understanding
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

export interface PositionalPattern {
  id: string;
  category: PositionalCategory;
  title: string;
  fen: string;
  solution: string[];  // The correct continuation
  concept: string;     // What this pattern teaches
  explanation: string; // Detailed explanation
  keySquares?: string[]; // Squares to highlight
  keyPieces?: string[]; // Important pieces (e.g., "Nd5", "Bc4")
  difficulty: 1 | 2 | 3 | 4 | 5;
  source?: string;
  preMoveHint?: string;   // Hint shown before making move
  postMoveExplanation?: string; // Explanation after correct move
  themes?: PatternType[]; // Optional tactical themes if any
}

export const categoryInfo: Record<PositionalCategory, { name: string; description: string; icon: string }> = {
  OUTPOSTS: {
    name: 'Outposts',
    description: 'Establishing pieces on powerful squares that cannot be attacked by enemy pawns',
    icon: '🏰'
  },
  WEAK_PAWNS: {
    name: 'Weak Pawns',
    description: 'Exploiting isolated, doubled, or backward pawns',
    icon: '⚔️'
  },
  PAWN_STRUCTURE: {
    name: 'Pawn Structure',
    description: 'Understanding pawn chains, islands, and their implications',
    icon: '🏗️'
  },
  OPEN_FILES: {
    name: 'Open Files & Diagonals',
    description: 'Controlling open lines for rooks and bishops',
    icon: '↕️'
  },
  BISHOP_PAIR: {
    name: 'Bishop Pair',
    description: 'Leveraging the power of two bishops in open positions',
    icon: '⚡'
  },
  GOOD_BAD_BISHOP: {
    name: 'Good vs Bad Bishop',
    description: 'Recognizing and exploiting bishop quality',
    icon: '🎭'
  },
  KNIGHT_PLACEMENT: {
    name: 'Knight Placement',
    description: 'Optimal squares for knights in various structures',
    icon: '🐴'
  },
  SPACE_ADVANTAGE: {
    name: 'Space Advantage',
    description: 'Using territorial control to restrict the opponent',
    icon: '🌍'
  },
  PIECE_COORDINATION: {
    name: 'Piece Coordination',
    description: 'Making pieces work together harmoniously',
    icon: '🤝'
  },
  PROPHYLAXIS: {
    name: 'Prophylaxis',
    description: 'Preventing opponent\'s plans before executing your own',
    icon: '🛡️'
  },
  MINORITY_ATTACK: {
    name: 'Minority Attack',
    description: 'Attacking the pawn majority with fewer pawns',
    icon: '🎯'
  },
  PAWN_BREAKS: {
    name: 'Pawn Breaks',
    description: 'Opening the position at the right moment',
    icon: '💥'
  },
  KING_ACTIVITY: {
    name: 'King Activity',
    description: 'Activating the king in endgames and safe moments',
    icon: '👑'
  },
  EXCHANGE_STRATEGY: {
    name: 'Exchange Strategy',
    description: 'When and what to exchange for positional gain',
    icon: '🔄'
  },
  BLOCKADE: {
    name: 'Blockade',
    description: 'Stopping passed pawns and restricting enemy pieces',
    icon: '🚫'
  },
  CENTRALIZATION: {
    name: 'Centralization',
    description: 'Placing pieces on optimal central squares',
    icon: '🎪'
  }
};

export const positionalPatterns: PositionalPattern[] = [
  // ============================================
  // OUTPOSTS
  // ============================================
  {
    id: 'outpost-001',
    category: 'OUTPOSTS',
    title: 'The Classic Knight Outpost',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    solution: ['e5'],
    concept: 'Creating an outpost by advancing a pawn',
    explanation: 'By playing e5, White gains space and creates a potential outpost on d4 or f4 for pieces. The e5-pawn also restricts Black\'s knight.',
    keySquares: ['e5'],
    difficulty: 2,
    preMoveHint: 'Which pawn advance gains space and restricts Black\'s pieces?',
    postMoveExplanation: 'After e5, White controls more space. The f6-knight is kicked and d4 becomes a strong square for White\'s pieces.'
  },
  {
    id: 'outpost-002',
    category: 'OUTPOSTS',
    title: 'Knight to the Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    solution: ['Nd5'],
    concept: 'Occupying a powerful outpost',
    explanation: 'The d5 square is a "hole" in Black\'s position - the e6 pawn has moved, so no pawn can attack d5. A knight here is dominant.',
    keySquares: ['d5'],
    difficulty: 2,
    preMoveHint: 'Which square is permanently weak in Black\'s camp?',
    postMoveExplanation: 'The knight on d5 is a monster! It cannot be driven away by pawns and controls key squares like c7, e7, f6, and b6.'
  },
  {
    id: 'outpost-003',
    category: 'OUTPOSTS',
    title: 'Supporting the Outpost',
    fen: 'r2q1rk1/pp2ppbp/2npbnp1/8/3NP3/2N1BP2/PPPQB1PP/R3K2R w KQ - 0 10',
    solution: ['Nc6'],
    concept: 'Jumping into an outpost with tempo',
    explanation: 'Nc6 places the knight on a beautiful outpost, attacking the queen and cementing control of the center.',
    keySquares: ['c6'],
    difficulty: 3,
    preMoveHint: 'Can you find a strong outpost that also attacks a piece?',
    postMoveExplanation: 'Nc6 is a dream square! The knight forks the queen and b8, and cannot be easily removed.'
  },

  // ============================================
  // WEAK PAWNS
  // ============================================
  {
    id: 'weak-001',
    category: 'WEAK_PAWNS',
    title: 'Targeting the Isolated Pawn',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    solution: ['Bf5'],
    concept: 'Attacking an isolated pawn',
    explanation: 'Black has an isolated d-pawn. White should target it with pieces. Bf5 develops and eyes the d5 pawn indirectly.',
    keySquares: ['d5'],
    difficulty: 2,
    preMoveHint: 'The d5-pawn is isolated. How do we increase pressure on it?',
    postMoveExplanation: 'Bf5 develops actively and prepares to exchange Black\'s defensive bishop. The isolated pawn remains a target.'
  },
  {
    id: 'weak-002',
    category: 'WEAK_PAWNS',
    title: 'Blockading the Isolani',
    fen: 'r2q1rk1/pp2bppp/2n2n2/3p4/8/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 11',
    solution: ['Nd4'],
    concept: 'Blockading an isolated pawn',
    explanation: 'The best piece to blockade an isolated pawn is usually a knight. On d4, the knight stops the pawn and controls key squares.',
    keySquares: ['d4', 'd5'],
    difficulty: 2,
    preMoveHint: 'What\'s the ideal blockading piece for the isolani?',
    postMoveExplanation: 'The knight on d4 blockades the pawn and cannot be chased by pawns. The IQP is permanently weak.'
  },
  {
    id: 'weak-003',
    category: 'WEAK_PAWNS',
    title: 'Attacking a Backward Pawn',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    solution: ['d5'],
    concept: 'Creating a backward pawn',
    explanation: 'd5 fixes Black\'s structure and makes the c6 pawn backward. It can never safely advance.',
    keySquares: ['d5', 'c6'],
    difficulty: 3,
    preMoveHint: 'How can we create a permanent weakness in Black\'s structure?',
    postMoveExplanation: 'After d5, Black\'s c6-pawn is backward - it cannot advance and must be defended by pieces.'
  },

  // ============================================
  // PAWN STRUCTURE
  // ============================================
  {
    id: 'structure-001',
    category: 'PAWN_STRUCTURE',
    title: 'Minority Attack Preparation',
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    solution: ['b4'],
    concept: 'Initiating a minority attack',
    explanation: 'In the Carlsbad structure, White\'s minority attack with b4-b5 aims to create weaknesses in Black\'s queenside pawn structure.',
    keySquares: ['b4', 'b5', 'c6'],
    difficulty: 3,
    preMoveHint: 'How does White start the classic minority attack?',
    postMoveExplanation: 'b4 prepares b5, which will attack the c6-pawn. Black faces a dilemma: take on b5 (isolated a-pawn) or allow bxc6.'
  },
  {
    id: 'structure-002',
    category: 'PAWN_STRUCTURE',
    title: 'Creating a Passed Pawn',
    fen: '8/pp3ppp/2p1k3/4p3/2P1P3/8/PP3PPP/4K3 w - - 0 1',
    solution: ['c5'],
    concept: 'Creating a passed pawn',
    explanation: 'c5 creates an outside passed pawn which will divert Black\'s king while White attacks on the other side.',
    keySquares: ['c5', 'c6'],
    difficulty: 2,
    preMoveHint: 'How can White create a passed pawn?',
    postMoveExplanation: 'After c5, the pawn will eventually become passed after ...bxc5 or can advance to c6 creating a strong threat.'
  },

  // ============================================
  // OPEN FILES
  // ============================================
  {
    id: 'files-001',
    category: 'OPEN_FILES',
    title: 'Seizing the Open File',
    fen: 'r3r1k1/pp2bppp/2p2n2/4p3/4P3/2N2N2/PPP2PPP/R3R1K1 w - - 0 12',
    solution: ['Rad1'],
    concept: 'Controlling the open d-file',
    explanation: 'The d-file is open. White should seize it with Rad1, preparing to double rooks and penetrate.',
    keySquares: ['d1', 'd8'],
    difficulty: 2,
    preMoveHint: 'Which file is open and how should White occupy it?',
    postMoveExplanation: 'Rad1 seizes the open file. White can double rooks with Red1 and eventually penetrate to d7 or d8.'
  },
  {
    id: 'files-002',
    category: 'OPEN_FILES',
    title: 'Rook to the Seventh',
    fen: 'r4rk1/ppp2ppp/2n5/8/8/2N5/PPP2PPP/R4RK1 w - - 0 15',
    solution: ['Rad7'],
    concept: 'The powerful seventh rank',
    explanation: 'A rook on the seventh rank attacks pawns and restricts the enemy king. It\'s one of the most powerful placements.',
    keySquares: ['d7'],
    difficulty: 3,
    preMoveHint: 'Where is the most powerful square for White\'s rook?',
    postMoveExplanation: 'The rook on the seventh rank attacks b7 and f7 pawns while cutting off the king. This is often worth a pawn!'
  },

  // ============================================
  // BISHOP PAIR
  // ============================================
  {
    id: 'bishops-001',
    category: 'BISHOP_PAIR',
    title: 'Opening the Position',
    fen: 'r1bq1rk1/pp2ppbp/2n3p1/2pp4/2P5/1PN2NP1/P2PPPBP/R1BQ1RK1 w - - 0 8',
    solution: ['cxd5'],
    concept: 'Opening lines for the bishops',
    explanation: 'With the bishop pair, we want open positions. Exchanging pawns opens diagonals for both bishops.',
    keySquares: ['g2', 'c1'],
    difficulty: 2,
    preMoveHint: 'How do you maximize the bishop pair\'s potential?',
    postMoveExplanation: 'cxd5 opens the position. The g2-bishop sees the entire long diagonal, and the c1-bishop can develop actively. Bishops thrive in open positions!'
  },
  {
    id: 'bishops-002',
    category: 'BISHOP_PAIR',
    title: 'Long Diagonal Control',
    fen: 'r2qk2r/pp2bppp/2n1pn2/2pp4/2P5/1P3NP1/P2PPPBP/RNBQ1RK1 w kq - 0 7',
    solution: ['Bb2'],
    concept: 'Fianchettoed bishops working together',
    explanation: 'The bishop pair is strongest when they control crossing diagonals. Bb2 completes the fianchetto setup.',
    keySquares: ['b2', 'g2'],
    difficulty: 2,
    preMoveHint: 'Where does the second bishop belong?',
    postMoveExplanation: 'With Bb2, both bishops rake across the board on long diagonals. This is the ideal bishop pair setup - they support each other and cover the entire board.'
  },

  // ============================================
  // GOOD VS BAD BISHOP
  // ============================================
  {
    id: 'goodbad-001',
    category: 'GOOD_BAD_BISHOP',
    title: 'Activating the Bad Bishop',
    fen: 'r2qk2r/pp2bppp/2n1pn2/2ppP3/3P4/2PB1N2/PP3PPP/R1BQK2R w KQkq - 0 8',
    solution: ['Bf4'],
    concept: 'Getting the bishop outside the pawn chain',
    explanation: 'White\'s light-squared bishop is "bad" (blocked by e5-d4-c3 pawns). But first, let\'s activate the "good" bishop before the position closes.',
    keySquares: ['f4', 'd3'],
    difficulty: 3,
    preMoveHint: 'Which bishop should be developed, and where?',
    postMoveExplanation: 'Bf4 places the dark-squared bishop on an active diagonal outside the pawn chain. The d3-bishop may be restricted, but the f4-bishop is powerful!'
  },
  {
    id: 'goodbad-002',
    category: 'GOOD_BAD_BISHOP',
    title: 'Trading the Bad Bishop',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/2ppP3/3P1B2/2PB1N2/PP3PPP/R2QK2R w KQ - 0 9',
    solution: ['Bh5'],
    concept: 'Exchanging a bad bishop',
    explanation: 'Sometimes the best plan for a bad bishop is to trade it for the opponent\'s good bishop or an active knight.',
    keySquares: ['h5', 'f7'],
    difficulty: 3,
    preMoveHint: 'The light-squared bishop is restricted. What\'s the plan?',
    postMoveExplanation: 'Bh5 aims to exchange the "bad" bishop (blocked by e5-d4-c3) for Black\'s knight on f6 or forces ...g6 weakening Black\'s kingside.'
  },

  // ============================================
  // KNIGHT PLACEMENT
  // ============================================
  {
    id: 'knight-001',
    category: 'KNIGHT_PLACEMENT',
    title: 'Knights in the Center',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: ['Nc3'],
    concept: 'Central knight development',
    explanation: 'Knights belong in the center, not on the rim. Nc3 develops to a natural, active square controlling d5 and e4.',
    keySquares: ['c3', 'd5'],
    difficulty: 1,
    preMoveHint: 'Where should the knight develop for maximum influence?',
    postMoveExplanation: 'Nc3 controls d5 and e4 - central squares. Compare to Na3 which would control far fewer important squares.'
  },
  {
    id: 'knight-002',
    category: 'KNIGHT_PLACEMENT',
    title: 'Knight vs Bishop in Closed Position',
    fen: 'r2qk2r/ppp1bppp/2n1pn2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 7',
    solution: ['e5'],
    concept: 'Creating outposts for knights',
    explanation: 'e5 closes the position, making knights stronger than bishops. The d4 and f4 squares become excellent for knights.',
    keySquares: ['e5', 'd4'],
    difficulty: 3,
    preMoveHint: 'How can White create a favorable structure for knights?',
    postMoveExplanation: 'After e5, the position closes. Knights thrive in closed positions while bishops are restricted by pawns.'
  },

  // ============================================
  // SPACE ADVANTAGE
  // ============================================
  {
    id: 'space-001',
    category: 'SPACE_ADVANTAGE',
    title: 'Gaining Space',
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    solution: ['e5'],
    concept: 'Space-gaining pawn advance',
    explanation: 'e5 gains space in the center and restricts Black\'s pieces, especially the knight that would like to go to f6.',
    keySquares: ['e5', 'f6'],
    difficulty: 2,
    preMoveHint: 'How can White gain a space advantage?',
    postMoveExplanation: 'e5 creates a French Defense structure where White has more space. Black\'s light-squared bishop is now "bad" and the Ng8 lacks its natural f6-square.'
  },
  {
    id: 'space-002',
    category: 'SPACE_ADVANTAGE',
    title: 'Using Space to Restrict',
    fen: 'r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    solution: ['c3'],
    concept: 'Consolidating space advantage',
    explanation: 'Before expanding further, consolidate. c3 supports the d4-pawn and prepares f4 to further restrict Black.',
    keySquares: ['c3', 'd4', 'e5'],
    difficulty: 2,
    preMoveHint: 'How should White consolidate before further expansion?',
    postMoveExplanation: 'c3 is a prophylactic move supporting the center. White can now consider f4, Bd3, and Be3 to complete development while maintaining the space advantage.'
  },

  // ============================================
  // PIECE COORDINATION
  // ============================================
  {
    id: 'coord-001',
    category: 'PIECE_COORDINATION',
    title: 'Harmonious Development',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['d3'],
    concept: 'Preparing piece coordination',
    explanation: 'Before castling, d3 prepares c3 and supports the bishop. All pieces will work together.',
    keySquares: ['d3', 'c3', 'c4'],
    difficulty: 2,
    preMoveHint: 'How can White improve coordination before castling?',
    postMoveExplanation: 'd3 is the Italian Game approach. It supports the c4-bishop, prepares c3 and Nbd2, ensuring all pieces work in harmony.'
  },
  {
    id: 'coord-002',
    category: 'PIECE_COORDINATION',
    title: 'Rook Lift',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 10',
    solution: ['h4'],
    concept: 'Preparing rook activation via h-file',
    explanation: 'In opposite-side castling, rook lifts are powerful. h4-h5 prepares to bring the rook to h3 or open the h-file.',
    keySquares: ['h4', 'h5', 'h1'],
    difficulty: 3,
    preMoveHint: 'How does White start the kingside attack with rook coordination?',
    postMoveExplanation: 'h4 starts a direct attack. After h5, the h-file opens, and the rook can swing via h3 to g3, coordinating with other pieces for the attack.'
  },

  // ============================================
  // PROPHYLAXIS
  // ============================================
  {
    id: 'prophy-001',
    category: 'PROPHYLAXIS',
    title: 'Preventing Counterplay',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BNP3/2N1B3/PPP2PPP/R2QK2R w KQ - 0 8',
    solution: ['f3'],
    concept: 'Prophylactic pawn move',
    explanation: 'f3 prevents ...Ng4 and prepares to castle queenside. Always consider what your opponent wants to do!',
    keySquares: ['f3', 'g4'],
    difficulty: 2,
    preMoveHint: 'What does Black want to play? How can White prevent it?',
    postMoveExplanation: 'f3 stops ...Ng4, which would have harassed the e3-bishop. Now White can castle queenside safely and prepare an attack.'
  },
  {
    id: 'prophy-002',
    category: 'PROPHYLAXIS',
    title: 'Stopping the Break',
    fen: 'r2q1rk1/1p2bppp/p1n1pn2/2ppP3/3P4/2P1BN2/PP2NPPP/R2QK2R w KQ - 0 10',
    solution: ['a3'],
    concept: 'Preventing ...b5-b4',
    explanation: 'Black wants to play ...b5-b4 to attack our center. a3 prophylactically stops this idea.',
    keySquares: ['a3', 'b5', 'b4'],
    difficulty: 3,
    preMoveHint: 'What queenside break is Black planning? How do we stop it?',
    postMoveExplanation: 'a3 is pure prophylaxis. Black\'s ...b5-b4 push is prevented, and White maintains control of the center without rushing.'
  },

  // ============================================
  // PAWN BREAKS
  // ============================================
  {
    id: 'break-001',
    category: 'PAWN_BREAKS',
    title: 'The Classic f5 Break',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BNP3/2N1BP2/PPP3PP/R2QK2R w KQ - 0 9',
    solution: ['g4'],
    concept: 'Preparing a pawn break',
    explanation: 'g4 prepares g5 or f4-f5, typical pawn breaks in the Yugoslav Attack against the Dragon.',
    keySquares: ['g4', 'f4', 'f5'],
    difficulty: 3,
    preMoveHint: 'How does White prepare the kingside pawn storm?',
    postMoveExplanation: 'g4 is the start of a powerful attack. It prepares g5 (kicking the knight) or h4-h5 (opening the h-file). The pawn breaks will crack open Black\'s king.'
  },
  {
    id: 'break-002',
    category: 'PAWN_BREAKS',
    title: 'Central Break',
    fen: 'r1bq1rk1/pp1nbppp/2n1p3/2ppP3/3P4/2NBBN2/PPP2PPP/R2QK2R w KQ - 0 8',
    solution: ['f4'],
    concept: 'Supporting the e5 pawn and preparing f5',
    explanation: 'f4 supports e5 and prepares f5, a thematic break that will open lines against Black\'s king.',
    keySquares: ['f4', 'f5', 'e5'],
    difficulty: 3,
    preMoveHint: 'How does White reinforce the center and prepare an attack?',
    postMoveExplanation: 'f4 creates a powerful pawn duo on e5-f4. When f5 comes (after preparation), the position explodes open in White\'s favor.'
  },

  // ============================================
  // KING ACTIVITY
  // ============================================
  {
    id: 'king-001',
    category: 'KING_ACTIVITY',
    title: 'King to the Center',
    fen: '8/pp2kppp/4p3/8/3PK3/8/PPP2PPP/8 w - - 0 1',
    solution: ['Ke5'],
    concept: 'King activity in the endgame',
    explanation: 'In the endgame, the king is a fighting piece. Ke5 centralizes and supports the passed d-pawn.',
    keySquares: ['e5', 'd5', 'd4'],
    difficulty: 2,
    preMoveHint: 'The endgame has arrived. Where does the king belong?',
    postMoveExplanation: 'Ke5 is the key move. The king supports the d-pawn\'s advance and can go to either side depending on where it\'s needed. In endgames, centralize the king!'
  },
  {
    id: 'king-002',
    category: 'KING_ACTIVITY',
    title: 'Opposition',
    fen: '8/8/8/3pk3/8/3K4/3P4/8 w - - 0 1',
    solution: ['Kc4'],
    concept: 'Taking the opposition',
    explanation: 'Kc4 takes the "diagonal opposition" and forces Black\'s king to give way.',
    keySquares: ['c4', 'd5'],
    difficulty: 3,
    preMoveHint: 'How does White win this endgame?',
    postMoveExplanation: 'Kc4 is the only winning move. After ...Kd6, Kd4 takes the opposition and the pawn will queen. Understanding opposition is crucial for endgames!'
  },

  // ============================================
  // EXCHANGE STRATEGY
  // ============================================
  {
    id: 'exchange-001',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trade When Ahead',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/2BpN3/3P4/2N5/PPP2PPP/R2Q1RK1 w - - 0 10',
    solution: ['Nxc6'],
    concept: 'Simplifying with advantage',
    explanation: 'When you have an advantage (better pieces, structure), trade pieces to simplify. Fewer pieces means fewer ways to go wrong.',
    keySquares: ['c6', 'e5'],
    difficulty: 2,
    preMoveHint: 'White has a positional advantage. What\'s the right strategy?',
    postMoveExplanation: 'Nxc6 simplifies the position. After ...bxc6, White has better structure (Black\'s doubled c-pawns are weak) and the bishop pair.'
  },
  {
    id: 'exchange-002',
    category: 'EXCHANGE_STRATEGY',
    title: 'Trade Defenders',
    fen: 'r1bq1rk1/pp1nbppp/4pn2/2p5/3P4/2NBBN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    solution: ['Bxf6'],
    concept: 'Eliminating a key defender',
    explanation: 'The f6-knight defends key squares. Trading it weakens Black\'s control of the center.',
    keySquares: ['f6', 'd5', 'e4'],
    difficulty: 3,
    preMoveHint: 'Which piece is Black\'s most important defender?',
    postMoveExplanation: 'Bxf6 removes an important piece. After ...Bxf6 or ...gxf6, White can exploit the weakened squares and Black\'s compromised structure.'
  },

  // ============================================
  // BLOCKADE
  // ============================================
  {
    id: 'block-001',
    category: 'BLOCKADE',
    title: 'Blockading the Passed Pawn',
    fen: '8/8/8/3pN3/3k4/8/8/4K3 w - - 0 1',
    solution: ['Nd3'],
    concept: 'Knight blockade',
    explanation: 'A knight is the ideal blockader - it doesn\'t lose any power when blocking a pawn, unlike bishops or rooks.',
    keySquares: ['d3', 'd5'],
    difficulty: 2,
    preMoveHint: 'How does the knight stop the passed pawn most effectively?',
    postMoveExplanation: 'Nd3 is perfect blockade! The knight sits in front of the pawn, stops its advance, and remains fully active controlling squares. Nimzowitsch called this "the charm of the blockade."'
  },
  {
    id: 'block-002',
    category: 'BLOCKADE',
    title: 'Positional Blockade',
    fen: 'r1bq1rk1/pp2ppbp/2n3p1/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    solution: ['d5'],
    concept: 'Fixing and blockading',
    explanation: 'd5 fixes Black\'s pawn structure and creates a blockade on the dark squares. Black\'s bishop becomes bad.',
    keySquares: ['d5', 'c6'],
    difficulty: 3,
    preMoveHint: 'How can White create a permanent blockade?',
    postMoveExplanation: 'd5 closes the center. Now White will maneuver on the kingside (f4-f5 or piece play) while Black\'s pieces are cramped behind the fixed pawns.'
  },

  // ============================================
  // CENTRALIZATION
  // ============================================
  {
    id: 'central-001',
    category: 'CENTRALIZATION',
    title: 'Central Control',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Nc3'],
    concept: 'Developing toward the center',
    explanation: 'Nc3 develops the knight to its most natural square, controlling d5 and supporting the e4 pawn.',
    keySquares: ['c3', 'd5'],
    difficulty: 1,
    preMoveHint: 'What\'s the best square for the b1-knight?',
    postMoveExplanation: 'Nc3 controls d5 and supports e4. Central control is the foundation of good chess.'
  },
  {
    id: 'central-002',
    category: 'CENTRALIZATION',
    title: 'Queen to an Active Square',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 4',
    solution: ['d3'],
    concept: 'Preparing piece coordination',
    explanation: 'd3 supports the c4-bishop and prepares to complete development harmoniously.',
    keySquares: ['d3', 'c4'],
    difficulty: 1,
    preMoveHint: 'How can White protect the bishop and prepare to castle?',
    postMoveExplanation: 'd3 supports the bishop, opens the diagonal for the c1-bishop, and prepares 0-0. This is the Italian Game setup.'
  },

  // ============================================
  // MINORITY ATTACK
  // ============================================
  {
    id: 'minority-001',
    category: 'MINORITY_ATTACK',
    title: 'Starting the Minority Attack',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R w KQ - 0 8',
    solution: ['b4'],
    concept: 'Classic minority attack',
    explanation: 'In the Carlsbad structure, White attacks Black\'s queenside pawn majority with fewer pawns to create weaknesses.',
    keySquares: ['b4', 'b5', 'c6'],
    difficulty: 3,
    preMoveHint: 'How does White start the famous minority attack?',
    postMoveExplanation: 'b4-b5 will follow. When b5 hits c6, Black faces a dilemma: ...cxb5 (isolated a-pawn) or ...c5 (backward c-pawn). Either way, weaknesses appear.'
  },
  {
    id: 'minority-002',
    category: 'MINORITY_ATTACK',
    title: 'Minority Attack Break',
    fen: 'r1bq1rk1/p3bppp/1pn1pn2/2pp4/1PPP4/2N1PN2/PQ3PPP/R1B1KB1R w KQ - 0 10',
    solution: ['b5'],
    concept: 'Executing the minority attack',
    explanation: 'b5 is the key break, attacking the c6-pawn and creating permanent weaknesses.',
    keySquares: ['b5', 'c6', 'a7'],
    difficulty: 3,
    preMoveHint: 'The minority attack is prepared. When do we strike?',
    postMoveExplanation: 'b5! is the moment of truth. After ...cxb5 cxb5, the a7-pawn is weak. After ...Nb8, Black is passive. The minority attack has succeeded!'
  }
];

export default positionalPatterns;

