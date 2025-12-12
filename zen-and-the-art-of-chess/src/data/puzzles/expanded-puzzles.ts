// ============================================
// EXPANDED PUZZLE DATABASE
// High-quality tactical puzzles for competitive training
// ============================================

import type { ChessPuzzle } from '@/lib/types';

export const expandedPuzzles: ChessPuzzle[] = [
  // ============================================
  // DIFFICULTY 1 - BEGINNER (One-move tactics)
  // ============================================
  
  // Forks
  {
    id: 'exp-fork-b01',
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    solution: ['Qe2'],
    themes: ['FORK'],
    difficulty: 1,
    title: 'Queen Attacks Two Pieces',
    explanation: 'The queen attacks both the knight on e4 and the one on c6. Black loses material.',
  },
  {
    id: 'exp-fork-b02',
    fen: '4k3/8/8/3N4/8/8/8/4K3 w - - 0 1',
    solution: ['Nc7+'],
    themes: ['FORK', 'CHECK'],
    difficulty: 1,
    title: 'Royal Knight Fork',
    explanation: 'The knight checks the king while attacking the rook. A classic double attack!',
  },
  {
    id: 'exp-fork-b03',
    fen: 'r3k3/8/8/8/3N4/8/8/4K3 w q - 0 1',
    solution: ['Nc6+'],
    themes: ['FORK', 'CHECK'],
    difficulty: 1,
    title: 'Knight Fork Wins Rook',
    explanation: 'Check the king and attack the rook simultaneously with the knight.',
  },
  
  // Pins
  {
    id: 'exp-pin-b01',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: ['Bb5'],
    themes: ['PIN'],
    difficulty: 1,
    title: 'Pin the Knight',
    explanation: 'Pin the knight to the king. It cannot move without exposing the king!',
  },
  {
    id: 'exp-pin-b02',
    fen: 'r2qkb1r/ppp1pppp/2n5/3n4/8/5B2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxd5'],
    themes: ['CAPTURE', 'PIN'],
    difficulty: 1,
    title: 'Capture the Pinned Piece',
    explanation: 'The knight on d5 is pinned to the queen. Simply capture it!',
  },
  
  // Back Rank
  {
    id: 'exp-br-b01',
    fen: '3r2k1/ppp2ppp/8/8/8/8/PPP2PPP/3R2K1 w - - 0 1',
    solution: ['Rd8+'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 1,
    title: 'Back Rank Checkmate',
    explanation: 'Deliver mate on the back rank! The pawns trap their own king.',
  },
  {
    id: 'exp-br-b02',
    fen: '6k1/5ppp/8/8/8/8/5PPP/1R4K1 w - - 0 1',
    solution: ['Rb8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 1,
    title: 'Rook Delivers Mate',
    explanation: 'The rook slides to the back rank for checkmate.',
  },
  
  // Simple Captures
  {
    id: 'exp-cap-b01',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 3',
    solution: ['Nxe5'],
    themes: ['CAPTURE'],
    difficulty: 1,
    title: 'Recapture the Knight',
    explanation: 'Simply take back the piece with your knight.',
  },
  {
    id: 'exp-cap-b02',
    fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2',
    solution: ['e5'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Attack the Knight',
    explanation: 'Push the pawn to attack the knight, gaining space.',
  },

  // Mate in One
  {
    id: 'exp-m1-b01',
    fen: 'r1bqk2r/pppp1Qpp/2n2n2/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
    solution: ['Qxf7#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Scholar\'s Mate Delivered',
    explanation: 'Capture on f7 with checkmate - the classic Scholar\'s Mate!',
  },
  {
    id: 'exp-m1-b02',
    fen: '5rk1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Re8+'],
    themes: ['BACK_RANK', 'CHECK'],
    difficulty: 1,
    title: 'Back Rank Check Wins',
    explanation: 'Check on the back rank forces the rook exchange or mate.',
  },
  {
    id: 'exp-m1-b03',
    fen: '6k1/ppp2ppp/8/8/8/5Q2/PPP2PPP/6K1 w - - 0 1',
    solution: ['Qf8#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Queen Back Rank Mate',
    explanation: 'The queen delivers mate on f8 - the pawns trap the king.',
  },

  // ============================================
  // DIFFICULTY 2 - EASY (Two-move combinations)
  // ============================================
  
  // Double Attack
  {
    id: 'exp-da-e01',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5', 'h6', 'Nxf7'],
    themes: ['FORK', 'SACRIFICE'],
    difficulty: 2,
    title: 'Knight Attacks f7',
    explanation: 'Jump Ng5 threatening Nxf7 forking queen and rook.',
  },
  {
    id: 'exp-da-e02',
    fen: 'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    solution: ['Bxf7+', 'Kxf7', 'Nxe5+'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 2,
    title: 'Bishop Sacrifice Fork',
    explanation: 'Sacrifice bishop on f7, then fork king and queen with knight.',
  },

  // Discovered Attack
  {
    id: 'exp-disc-e01',
    fen: 'r1bqkb1r/pppppppp/2n2n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 2 3',
    solution: ['e5', 'Nd5', 'd6'],
    themes: ['DISCOVERY', 'QUIET_MOVE'],
    difficulty: 2,
    title: 'Pawn Advance Gains Tempo',
    explanation: 'Push e5 attacking the knight, then continue with d6.',
  },

  // Pin Exploitation
  {
    id: 'exp-pin-e01',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
    solution: ['Bb5', 'a6', 'Bxc6'],
    themes: ['PIN', 'CAPTURE'],
    difficulty: 2,
    title: 'Pin and Win',
    explanation: 'Pin the knight to the king, then capture it.',
  },
  
  // Deflection
  {
    id: 'exp-def-e01',
    fen: '3r1rk1/ppp2ppp/8/8/8/8/PPP2PPP/3RR1K1 w - - 0 1',
    solution: ['Rxd8', 'Rxd8', 'Re8+'],
    themes: ['DEFLECTION', 'BACK_RANK'],
    difficulty: 2,
    title: 'Deflect the Defender',
    explanation: 'Exchange rooks to deflect the defender, then deliver mate.',
  },

  // Skewer
  {
    id: 'exp-sk-e01',
    fen: '8/8/8/8/1k6/8/6B1/2K5 w - - 0 1',
    solution: ['Bc6+', 'Ka5', 'Bxa4'],
    themes: ['SKEWER'],
    difficulty: 2,
    title: 'Bishop Skewer',
    explanation: 'Check the king, then capture the piece behind it.',
  },

  // Zwischenzug
  {
    id: 'exp-zw-e01',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4',
    solution: ['exd4', 'e5', 'dxc3'],
    themes: ['ZWISCHENZUG'],
    difficulty: 2,
    title: 'In-Between Move',
    explanation: 'The zwischenzug (in-between attack) wins material.',
  },

  // Simple Combinations
  {
    id: 'exp-comb-e01',
    fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    solution: ['Ng5', 'O-O', 'Qh5'],
    themes: ['TACTICAL'],
    difficulty: 2,
    title: 'Knight and Queen Attack',
    explanation: 'Ng5 threatens f7. After castling, Qh5 continues the attack.',
  },

  // ============================================
  // DIFFICULTY 3 - INTERMEDIATE (Three-move combinations)
  // ============================================
  
  // Complex Forks
  {
    id: 'exp-fork-i01',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+', 'Ke8', 'Qxg4'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 3,
    title: 'Greek Gift Setup',
    explanation: 'The bishop sacrifice draws the king out, knight check wins material.',
  },

  // Deflection Combinations
  {
    id: 'exp-def-i01',
    fen: 'r2q1rk1/ppp1bppp/2n5/3pP3/3P4/5N2/PPP2PPP/R1BQ1RK1 w - - 0 9',
    solution: ['Bh6', 'gxh6', 'Qd2', 'Kh8', 'Qxh6'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 3,
    title: 'Bishop Sacrifice Attack',
    explanation: 'Sacrifice the bishop to expose the king, then bring the queen.',
  },

  // Discovery with Tempo
  {
    id: 'exp-disc-i01',
    fen: 'r1bq1rk1/ppp1nppp/3p4/3Pp3/2P1P3/2N5/PP3PPP/R1BQKB1R w KQ - 0 8',
    solution: ['Nd5', 'Nxd5', 'cxd5', 'f5', 'Qc2'],
    themes: ['DISCOVERY', 'QUIET_MOVE'],
    difficulty: 3,
    title: 'Central Knight Jump',
    explanation: 'Jump to d5 creating threats. The position opens favorably.',
  },

  // Piece Sacrifice for Position
  {
    id: 'exp-sac-i01',
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+', 'Kg8', 'Qf3'],
    themes: ['SACRIFICE', 'CHECK'],
    difficulty: 3,
    title: 'Traxler Counter-Attack',
    explanation: 'Sacrifice the bishop to expose the king and create threats.',
  },

  // Quiet Move Tactics
  {
    id: 'exp-quiet-i01',
    fen: 'r1bq1rk1/pppn1ppp/4p3/3pP3/1b1P4/2N2N2/PPP2PPP/R1BQKB1R w KQ - 0 7',
    solution: ['a3', 'Bxc3+', 'bxc3', 'c5', 'Ba3'],
    themes: ['QUIET_MOVE', 'PIN'],
    difficulty: 3,
    title: 'Quiet Trap',
    explanation: 'The quiet a3 forces the bishop to take, improving our structure.',
  },

  // Double Attack Combinations
  {
    id: 'exp-da-i01',
    fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p1N1/2B1P3/3P4/PPP2PPP/RNBQK2R w KQkq - 0 6',
    solution: ['Nxf7', 'Qh4+', 'g3', 'Qxc4', 'Nxh8'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 3,
    title: 'Knight Sacrifice Chaos',
    explanation: 'The knight sacrifice creates chaos and wins material.',
  },

  // ============================================
  // DIFFICULTY 4 - ADVANCED (Four-move+ combinations)
  // ============================================
  
  // Complex Sacrifices
  {
    id: 'exp-sac-a01',
    fen: 'r1bq1rk1/ppp1nppp/3p4/3P4/2P1p3/2N3P1/PP2PPBP/R1BQ1RK1 w - - 0 10',
    solution: ['Nxe4', 'dxe4', 'Bxe4', 'Nf5', 'Bxa8'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 4,
    title: 'Pawn Structure Exploitation',
    explanation: 'Sacrifice the knight to win the exchange on a8.',
  },

  // Deep Deflection
  {
    id: 'exp-def-a01',
    fen: '2rq1rk1/pb1n1ppp/1p2p3/3pP3/3P4/P1N2N2/1P2BPPP/R2QR1K1 w - - 0 14',
    solution: ['Ng5', 'Bxe2', 'Qxe2', 'h6', 'Nxe6'],
    themes: ['SACRIFICE', 'DEFLECTION'],
    difficulty: 4,
    title: 'Knight Invasion',
    explanation: 'The knight on g5 creates multiple threats leading to material gain.',
  },

  // Mating Attack
  {
    id: 'exp-mate-a01',
    fen: 'r1bq1rk1/ppp2ppp/2np4/2b1p1B1/2B1P1n1/2NP1N2/PPP2PPP/R2QK2R w KQ - 0 8',
    solution: ['Bxf7+', 'Rxf7', 'Ng5', 'Rf8', 'Qxg4'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 4,
    title: 'Classic Italian Attack',
    explanation: 'The bishop sacrifice opens lines for a winning attack.',
  },

  // Positional Sacrifice
  {
    id: 'exp-pos-a01',
    fen: 'r2q1rk1/pb1nbppp/1p2pn2/2ppP3/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 11',
    solution: ['Bxh7+', 'Nxh7', 'Ng5', 'Nf6', 'Qh5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 4,
    title: 'Greek Gift Sacrifice',
    explanation: 'The classic bishop sacrifice leading to a winning attack.',
  },

  // Complex Endgame Tactics
  {
    id: 'exp-end-a01',
    fen: '8/p4pkp/1p4p1/3R4/2r5/6PP/PP3PK1/8 w - - 0 32',
    solution: ['Rd7+', 'Kf6', 'Rxa7', 'Rc2', 'Ra6+'],
    themes: ['CHECK', 'TACTICAL'],
    difficulty: 4,
    title: 'Rook Activity',
    explanation: 'Activate the rook with check, then collect pawns.',
  },

  // ============================================
  // DIFFICULTY 5 - MASTER (Deep calculations)
  // ============================================
  
  // Deep Sacrifice Combinations
  {
    id: 'exp-master-01',
    fen: 'r2qr1k1/pb1nbppp/1p2pn2/2ppP3/3P4/2NBPN2/PP1Q1PPP/R1B2RK1 w - - 0 12',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg6', 'Qd3+', 'f5', 'exf6'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'The Greek Gift Complete',
    explanation: 'The full Greek Gift combination with all follow-up moves.',
  },

  // Complex Mating Net
  {
    id: 'exp-master-02',
    fen: 'r1b2rk1/pp1nqppp/2p1p3/3pP3/3P4/P1N2N2/1PQ2PPP/R1B2RK1 w - - 0 13',
    solution: ['Bh6', 'gxh6', 'Qd2', 'Kh8', 'Qxh6', 'Rg8', 'Ng5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Bishop Sacrifice Attack',
    explanation: 'Sacrifice the bishop to expose the king for a mating attack.',
  },

  // Deep Positional Play
  {
    id: 'exp-master-03',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2PBPN2/PP1N1PPP/R1BQ1RK1 w - - 0 9',
    solution: ['dxc5', 'Bxc5', 'e4', 'd4', 'e5', 'dxc3', 'exf6'],
    themes: ['SACRIFICE', 'QUIET_MOVE'],
    difficulty: 5,
    title: 'Central Breakthrough',
    explanation: 'Open the center with precise pawn play to gain a winning attack.',
  },

  // Immortal Style Combination
  {
    id: 'exp-master-04',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+', 'Ke8', 'd4', 'exd4', 'Qf3'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 5,
    title: 'Evans Gambit Attack',
    explanation: 'A brilliant bishop sacrifice leads to a powerful initiative.',
  },

  // Complex Tactical Melee
  {
    id: 'exp-master-05',
    fen: 'r2q1rk1/ppp1bppp/2n1bn2/3p4/3P4/P1NBPN2/1P3PPP/R1BQK2R w KQ - 0 10',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Bxg5', 'Qh5+', 'Kg8', 'Bxg5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Double Piece Sacrifice',
    explanation: 'Sacrifice both minor pieces to create an unstoppable attack.',
  },

  // ============================================
  // ADDITIONAL THEME-SPECIFIC PUZZLES
  // ============================================

  // More Forks
  {
    id: 'exp-fork-t01',
    fen: 'r1b1kb1r/pppp1ppp/2n2q2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5',
    solution: ['Nc6+'],
    themes: ['FORK', 'CHECK'],
    difficulty: 1,
    title: 'Royal Knight Check',
    explanation: 'Check the king while attacking the queen!',
  },
  {
    id: 'exp-fork-t02',
    fen: '4k3/8/8/3N4/4q3/8/8/4K3 w - - 0 1',
    solution: ['Nc7+'],
    themes: ['FORK', 'CHECK'],
    difficulty: 1,
    title: 'Fork King and Queen',
    explanation: 'The knight forks the king and queen with check.',
  },

  // More Pins
  {
    id: 'exp-pin-t01',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['c3'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Prepare d4',
    explanation: 'Support the d4 push with c3, gaining central control.',
  },

  // More Back Rank
  {
    id: 'exp-br-t01',
    fen: '1r3rk1/5ppp/8/8/8/8/5PPP/1R3RK1 w - - 0 1',
    solution: ['Rb8', 'Rxb8', 'Rxb8+'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 2,
    title: 'Back Rank Double Rook',
    explanation: 'Exchange one rook, then mate with the other.',
  },

  // More Skewers
  {
    id: 'exp-sk-t01',
    fen: '8/8/8/4k3/8/4K3/8/7R w - - 0 1',
    solution: ['Re1+', 'Kf5', 'Re5+'],
    themes: ['SKEWER', 'CHECK'],
    difficulty: 2,
    title: 'Rook Skewer',
    explanation: 'Check the king repeatedly, gaining material.',
  },

  // More Discoveries
  {
    id: 'exp-disc-t01',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['d4', 'exd4', 'e5'],
    themes: ['DISCOVERY'],
    difficulty: 2,
    title: 'Central Pawn Break',
    explanation: 'Open the center with d4, then e5 attacks the knight.',
  },

  // More Deflections
  {
    id: 'exp-def-t01',
    fen: '3r1rk1/pp3ppp/8/8/8/8/PP3PPP/2RR2K1 w - - 0 1',
    solution: ['Rxd8', 'Rxd8', 'Rxd8+'],
    themes: ['DEFLECTION'],
    difficulty: 2,
    title: 'Deflect and Mate',
    explanation: 'Deflect the defending rook, then deliver back rank mate.',
  },

  // More Zwischenzugs
  {
    id: 'exp-zw-t01',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    solution: ['exd4', 'e5', 'dxc3'],
    themes: ['ZWISCHENZUG'],
    difficulty: 3,
    title: 'Intermediate Capture',
    explanation: 'After exd4, play e5 first before recapturing.',
  },

  // More Sacrifices
  {
    id: 'exp-sac-t01',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
    solution: ['Bxf7+', 'Kxf7', 'Nxe5+'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 3,
    title: 'Minor Piece Sacrifice',
    explanation: 'Sacrifice the bishop to win the knight and damage the king.',
  },

  // More Mate Patterns
  {
    id: 'exp-mate-t01',
    fen: 'r4rk1/ppp2ppp/8/8/3Q4/8/PPP2PPP/R4RK1 w - - 0 1',
    solution: ['Qd8', 'Rfxd8', 'Rxd8+', 'Rxd8', 'Rxd8#'],
    themes: ['MATE_PATTERN', 'SACRIFICE'],
    difficulty: 4,
    title: 'Queen Sacrifice for Mate',
    explanation: 'Sacrifice the queen to set up a back rank mate.',
  },

  // Endgame Puzzles
  {
    id: 'exp-end-t01',
    fen: '8/8/8/3k4/8/3K4/4P3/8 w - - 0 1',
    solution: ['Ke3', 'Ke5', 'e4'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'King Opposition',
    explanation: 'Take the opposition to escort the pawn to promotion.',
  },
  {
    id: 'exp-end-t02',
    fen: '8/8/8/p1k5/P7/8/1K6/8 w - - 0 1',
    solution: ['Kc3'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Shoulder the King',
    explanation: 'Use your king to block the enemy king from the pawn.',
  },
  {
    id: 'exp-end-t03',
    fen: '8/5k2/8/5KP1/8/8/8/8 w - - 0 1',
    solution: ['Ke5'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'Key Square Control',
    explanation: 'Control the key squares to promote the pawn.',
  },

  // Opening Traps
  {
    id: 'exp-trap-01',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2',
    solution: ['Nc6'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Defend e5',
    explanation: 'Develop the knight to defend the pawn on e5.',
  },
  {
    id: 'exp-trap-02',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: ['Bc4'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Italian Game',
    explanation: 'Develop the bishop to c4, attacking the weak f7 square.',
  },

  // More Tactical Combinations
  {
    id: 'exp-tact-01',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 5',
    solution: ['d5', 'exd5', 'Na5'],
    themes: ['TACTICAL'],
    difficulty: 3,
    title: 'Trapping the Bishop',
    explanation: 'Push d5 and then Na5 to trap the Italian bishop.',
  },
  {
    id: 'exp-tact-02',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    solution: ['Be6'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'Challenge the Bishop',
    explanation: 'Develop while challenging the strong bishop on c4.',
  },

  // Checkmate Patterns
  {
    id: 'exp-pattern-01',
    fen: '5rk1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Re8+', 'Rxe8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 1,
    title: 'Force Back Rank',
    explanation: 'Check forces the exchange, then back rank mate.',
  },
  {
    id: 'exp-pattern-02',
    fen: '6k1/5ppp/8/8/8/5N2/5PPP/6K1 w - - 0 1',
    solution: ['Nh4'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Knight Maneuver',
    explanation: 'Prepare Nf5 to create threats against the king.',
  },
];

export default expandedPuzzles;








