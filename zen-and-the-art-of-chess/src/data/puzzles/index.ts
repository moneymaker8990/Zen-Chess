import type { ChessPuzzle, PatternType } from '@/lib/types';

// ============================================
// CHESS PUZZLES DATABASE
// Organized by difficulty and pattern type
// ============================================

export const puzzles: ChessPuzzle[] = [
  // ==========================================
  // DIFFICULTY 1 - Beginner (one-move tactics)
  // ==========================================
  {
    id: 'fork-001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['Qxf7#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Scholar\'s Mate',
    explanation: 'The queen delivers checkmate on f7. Always watch for this in the opening!',
    // Black just played ...Nf6?? missing the threat
    beforeFen: 'r1bqkb1r/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
    setupMove: { from: 'g8', to: 'f6' },
  },
  {
    id: 'pin-001',
    fen: 'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    solution: ['Bb5'],
    themes: ['PIN'],
    difficulty: 1,
    title: 'Simple Pin',
    explanation: 'The bishop pins the knight to the king. The knight cannot move!',
  },
  {
    id: 'backrank-001',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 1,
    title: 'Back Rank Mate',
    explanation: 'The rook delivers checkmate on the back rank. The pawns trap their own king!',
    // Black just played ...Kf8-g8, walking into the back rank trap
    beforeFen: '5k2/5ppp/8/8/8/8/5PPP/4R1K1 b - - 0 1',
    setupMove: { from: 'f8', to: 'g8' },
  },
  {
    id: 'mate-001',
    fen: 'r1bqk2r/pppp1Qpp/2n2n2/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Queen Mate on f7',
    explanation: 'The queen captures on f7 with checkmate. The bishop on c4 covers the escape.',
    // Black just developed the bishop to c5, missing the threat
    beforeFen: 'r1bqk2r/pppp1Qpp/2n2n2/4p3/2B1P3/5b2/PPPP1PPP/RNB1K1NR b KQkq - 0 1',
    setupMove: { from: 'f3', to: 'c5' },
  },
  {
    id: 'fork-simple-001',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 3',
    solution: ['Qg5'],
    themes: ['FORK'],
    difficulty: 1,
    title: 'Queen Fork',
    explanation: 'The queen attacks both the knight on e5 and the pawn on g2.',
    // White just played Nxe5, capturing the pawn but leaving g2 weak
    beforeFen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    setupMove: { from: 'f3', to: 'e5' },
  },
  {
    id: 'opening-001',
    fen: 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    solution: ['d4'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Opening Principle',
    explanation: 'Challenging the center with d4 is the principled response to the Sicilian.',
  },

  // ==========================================
  // DIFFICULTY 2 - Easy (two-move combinations)
  // ==========================================
  {
    id: 'fork-002',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5', 'd5', 'Nxf7'],
    themes: ['FORK'],
    difficulty: 2,
    title: 'Knight Fork on f7',
    explanation: 'The knight lands on f7, forking the queen and rook. A classic pattern!',
    // Black just played ...Nc6, developing but ignoring the f7 weakness
    beforeFen: 'r1bqkbnr/pppp1ppp/8/4p3/2B1Pn2/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    setupMove: { from: 'b8', to: 'c6' },
  },
  {
    id: 'pin-002',
    fen: 'r1b1kb1r/ppppqppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Bg5'],
    themes: ['PIN'],
    difficulty: 2,
    title: 'Pin to the Queen',
    explanation: 'The bishop pins the knight to the queen. If the knight moves, the queen is lost.',
  },
  {
    id: 'skewer-001',
    fen: 'r3k3/8/8/8/8/4B3/8/4K3 w q - 0 1',
    solution: ['Bb5+', 'Kd7', 'Bxa8'],
    themes: ['SKEWER'],
    difficulty: 2,
    title: 'Bishop Skewer',
    explanation: 'The bishop check forces the king to move, then we win the rook with a skewer.',
    beforeFen: 'r3k3/4b3/8/8/8/4B3/8/4K3 b q - 0 1',
    setupMove: { from: 'e7', to: 'd8' },
  },
  {
    id: 'backrank-002',
    fen: '3r2k1/5ppp/8/8/8/8/5PPP/1RR3K1 w - - 0 1',
    solution: ['Rc8+', 'Rxc8', 'Rxc8#'],
    themes: ['BACK_RANK', 'SACRIFICE'],
    difficulty: 2,
    title: 'Back Rank Combination',
    explanation: 'Sacrifice the rook to deflect the defender, then deliver mate with the second rook.',
  },
  {
    id: 'discovery-001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Nxe5', 'Nxe5', 'd4'],
    themes: ['DISCOVERY'],
    difficulty: 2,
    title: 'Discovered Attack',
    explanation: 'After the exchange, d4 discovers an attack on the knight.',
  },
  {
    id: 'quiet-001',
    fen: 'r2qk2r/pp3ppp/2p1pn2/3pPb2/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQkq - 0 8',
    solution: ['Qa4+'],
    themes: ['QUIET_MOVE', 'PIN'],
    difficulty: 2,
    title: 'Quiet Check',
    explanation: 'A quiet queen check that also pins the bishop to the king.',
  },
  {
    id: 'endgame-001',
    fen: '8/8/4k3/8/2K5/8/4P3/8 w - - 0 1',
    solution: ['Kd4', 'Kd6', 'e4'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'Pawn Endgame',
    explanation: 'Activate the king first, then push the pawn. King activity is crucial!',
  },
  {
    id: 'endgame-002',
    fen: '8/4k3/8/4P3/4K3/8/8/8 w - - 0 1',
    solution: ['Kf5', 'Kf7', 'e6+'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'Opposition',
    explanation: 'Taking the opposition ensures pawn promotion. Key squares matter!',
  },

  // ==========================================
  // DIFFICULTY 3 - Intermediate (3-move combinations)
  // ==========================================
  {
    id: 'fork-003',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2B1P1b1/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 7',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
    themes: ['FORK', 'SACRIFICE'],
    difficulty: 3,
    title: 'Greek Gift Fork',
    explanation: 'The bishop sacrifice opens the king, then the knight forks king and bishop.',
  },
  {
    id: 'deflection-001',
    fen: 'r4rk1/ppp2ppp/2n5/3q4/8/2N5/PPP2PPP/R2QR1K1 w - - 0 1',
    solution: ['Re8+', 'Rxe8', 'Qxd5'],
    themes: ['DEFLECTION'],
    difficulty: 3,
    title: 'Deflecting the Defender',
    explanation: 'The check deflects the rook from defending the queen.',
    // Black just moved the queen to d5, thinking it was safe
    beforeFen: 'r4rk1/ppp2ppp/2nq4/8/8/2N5/PPP2PPP/R2QR1K1 b - - 0 1',
    setupMove: { from: 'd6', to: 'd5' },
  },
  {
    id: 'sacrifice-001',
    fen: 'r1b1k2r/ppppnppp/2n2q2/2b5/3NP3/2N1B3/PPP2PPP/R2QKB1R w KQkq - 3 7',
    solution: ['Nd5', 'Qd8', 'Nxc6'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 3,
    title: 'Knight Outpost',
    explanation: 'The knight jumps to the powerful d5 square, forcing concessions.',
  },
  {
    id: 'zwischen-001',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 2 5',
    solution: ['Bxf7+', 'Kxf7', 'Nxe5+'],
    themes: ['ZWISCHENZUG', 'FORK'],
    difficulty: 3,
    title: 'In-Between Move',
    explanation: 'The zwischenzug (in-between check) changes everything!',
  },
  {
    id: 'mate-003',
    fen: '5rk1/1p3ppp/pq6/8/8/1P6/P4PPP/3QR1K1 w - - 0 1',
    solution: ['Qd8', 'Qxd8', 'Rxd8#'],
    themes: ['MATE_PATTERN', 'SACRIFICE'],
    difficulty: 3,
    title: 'Queen Sacrifice for Mate',
    explanation: 'Sacrificing the queen forces a winning rook exchange and mate.',
  },
  {
    id: 'decoy-001',
    fen: 'r4rk1/1pp2ppp/p1n5/3Np1q1/2P1P3/1P6/P4PPP/R2QR1K1 w - - 0 1',
    solution: ['Nf6+', 'gxf6', 'Qxg5+'],
    themes: ['DECOY', 'SACRIFICE'],
    difficulty: 3,
    title: 'Knight Decoy',
    explanation: 'The knight sacrifice decoys the pawn, exposing the king.',
  },
  {
    id: 'tactical-001',
    fen: 'r3k2r/ppp2ppp/2n1bn2/3pp1B1/2B1P1b1/3P1N2/PPP2PPP/RN1QK2R w KQkq - 0 7',
    solution: ['Bxf6', 'Bxf6', 'Bxe6'],
    themes: ['SACRIFICE'],
    difficulty: 3,
    title: 'Exchange and Win',
    explanation: 'After the bishop trades, we win a pawn with tempo.',
  },

  // ==========================================
  // DIFFICULTY 4 - Advanced (complex combinations)
  // ==========================================
  {
    id: 'mate-004',
    fen: 'r1b2rk1/pppp1ppp/8/4P3/1b2n3/2N5/PPP1QPPP/R1B1KB1R w KQ - 0 1',
    solution: ['Qxe4', 'Re8+', 'Be2'],
    themes: ['MATE_PATTERN', 'SACRIFICE'],
    difficulty: 4,
    title: 'Complex Attack',
    explanation: 'A series of accurate moves leads to a winning position.',
  },
  {
    id: 'advanced-001',
    fen: 'r1bq1rk1/pp2nppp/2n1p3/2ppP3/3P4/P1P2N2/2P2PPP/R1BQKB1R w KQ - 0 8',
    solution: ['d5', 'exd5', 'e6'],
    themes: ['SACRIFICE', 'QUIET_MOVE'],
    difficulty: 4,
    title: 'Pawn Breakthrough',
    explanation: 'The pawn sacrifice opens lines and creates a passed pawn.',
  },
  {
    id: 'advanced-002',
    fen: 'r2qr1k1/ppp2ppp/2n2n2/3p4/1b1P4/2NBP3/PP3PPP/R1BQK2R w KQ - 0 9',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 4,
    title: 'Greek Gift Sacrifice',
    explanation: 'The classic bishop sacrifice on h7 leads to a winning attack.',
  },
  {
    id: 'advanced-003',
    fen: '2r3k1/pp3ppp/4p3/3pP3/1n1P4/4BN2/PP3PPP/2R3K1 w - - 0 1',
    solution: ['Rc7', 'Nd3', 'Rxf7'],
    themes: ['QUIET_MOVE', 'BACK_RANK'],
    difficulty: 4,
    title: 'Seventh Rank Invasion',
    explanation: 'The rook on the seventh rank creates devastating threats.',
  },
  {
    id: 'advanced-004',
    fen: 'r1b1k2r/pppp1ppp/2n2q2/2b1p3/2B1P1n1/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    solution: ['Bxf7+', 'Kd8', 'Bg5'],
    themes: ['SACRIFICE', 'PIN'],
    difficulty: 4,
    title: 'Fried Liver Preparation',
    explanation: 'The bishop sacrifice leads to a powerful attack against the king.',
  },
  {
    id: 'advanced-005',
    fen: 'r4rk1/1bq1bppp/ppnppn2/8/2P1P3/1PN2N2/PB1QBPPP/R4RK1 w - - 0 12',
    solution: ['Nd5', 'exd5', 'exd5'],
    themes: ['SACRIFICE', 'DISCOVERY'],
    difficulty: 4,
    title: 'Central Break',
    explanation: 'The knight sacrifice opens the center decisively.',
  },

  // ==========================================
  // DIFFICULTY 5 - Master (deep calculations)
  // ==========================================
  {
    id: 'master-001',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 5',
    solution: ['Nxf7', 'Kxf7', 'Qf3+', 'Ke6', 'Nc3'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Fried Liver Attack',
    explanation: 'The famous knight sacrifice leads to a devastating attack on the exposed king.',
    // Black just played ...Bc5, developing but allowing the Fried Liver
    beforeFen: 'r1bqk2r/pppp1ppp/2n2n2/4p1N1/2B1P2b/8/PPPP1PPP/RNBQK2R b KQkq - 3 4',
    setupMove: { from: 'h4', to: 'c5' },
  },
  {
    id: 'master-002',
    fen: 'r2q1rk1/ppp1nppp/3p4/3Pb3/2P1n3/P1B5/1P1NQPPP/R3KB1R w KQ - 0 12',
    solution: ['Qxe4', 'Bxc3', 'Qxh7+', 'Kxh7', 'Rh3+'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Queen Sacrifice Attack',
    explanation: 'A stunning queen sacrifice leads to unstoppable mate.',
  },
  {
    id: 'master-003',
    fen: '2rr2k1/pp1qnppp/4p3/3pP1P1/3P4/2PB1Q2/PP4PP/R4RK1 w - - 0 18',
    solution: ['Bxh7+', 'Kxh7', 'Qh5+', 'Kg8', 'g6'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Double Bishop Sacrifice',
    explanation: 'The classic double bishop sacrifice pattern leads to forced mate.',
  },
  {
    id: 'master-004',
    fen: 'r1b1r1k1/1pq2ppp/p1n1pn2/3pN3/3P4/P1PB4/2Q2PPP/R1B1R1K1 w - - 0 14',
    solution: ['Nxf7', 'Kxf7', 'Qxh7+', 'Ke8', 'Bg6+'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Knight Sacrifice Attack',
    explanation: 'The knight sacrifice rips open the king position for a mating attack.',
  },
  {
    id: 'master-005',
    fen: 'r2q1rk1/pb1n1ppp/1p2pn2/2ppP3/3P4/2PB1N2/PP1N1PPP/R1BQR1K1 w - - 0 11',
    solution: ['Bxh7+', 'Nxh7', 'Ng5', 'Nf6', 'Qh5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Lasker\'s Combination',
    explanation: 'A deep combination exploiting the weak kingside.',
  },
  {
    id: 'master-006',
    fen: 'r1bq1rk1/pppn1ppp/4pn2/3p2B1/1bPP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 7',
    solution: ['cxd5', 'exd5', 'Qa4', 'c6', 'Ne5'],
    themes: ['QUIET_MOVE', 'SACRIFICE'],
    difficulty: 5,
    title: 'Positional Sacrifice',
    explanation: 'A deep positional sacrifice leads to a dominant position.',
  },
  {
    id: 'master-007',
    fen: '2kr3r/pppq1ppp/2n1bn2/4p3/2B1P1b1/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 9',
    solution: ['Bxf7', 'Bxf3', 'Qxf3', 'Rf8', 'Bxe6+'],
    themes: ['SACRIFICE', 'ZWISCHENZUG'],
    difficulty: 5,
    title: 'Zwischenzug Mastery',
    explanation: 'A series of in-between moves leads to material gain.',
  },
  {
    id: 'master-008',
    fen: 'r1bq1rk1/pp2nppp/2n1p3/2ppP3/3P4/2P2N2/PP1NBPPP/R2Q1RK1 w - - 0 10',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg6', 'Qg4'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'The Greek Gift Perfected',
    explanation: 'The complete Greek Gift sacrifice with all follow-up moves.',
  },
];

// Import master puzzles from legendary games
import { masterPuzzles } from './master-puzzles';
import { expandedPuzzles } from './expanded-puzzles';

// Combine all puzzles
export const allPuzzles: ChessPuzzle[] = [...puzzles, ...masterPuzzles, ...expandedPuzzles];

// Get puzzles by difficulty
export const getPuzzlesByDifficulty = (difficulty: 1 | 2 | 3 | 4 | 5) =>
  allPuzzles.filter(p => p.difficulty === difficulty);

// Get puzzles by theme
export const getPuzzlesByTheme = (theme: PatternType) =>
  allPuzzles.filter(p => p.themes.includes(theme));

// Get random puzzles for training
export const getRandomPuzzles = (count: number): ChessPuzzle[] => {
  const shuffled = [...allPuzzles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export { masterPuzzles, expandedPuzzles };
export default allPuzzles;
