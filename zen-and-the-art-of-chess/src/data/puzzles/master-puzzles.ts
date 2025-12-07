// ============================================
// MASTER GAME PUZZLES
// Hand-curated tactical positions from legendary games
// Each puzzle has unique explanations and themes
// ============================================

import type { ChessPuzzle } from '@/lib/types';

export const masterPuzzles: ChessPuzzle[] = [
  // ============================================
  // DIFFICULTY 1 - BEGINNER TACTICS
  // ============================================
  {
    id: 'mp-beginner-001',
    fen: '6k1/pp3ppp/8/3N4/8/8/PPP2PPP/6K1 w - - 0 1',
    solution: ['Nf6+'],
    themes: ['FORK', 'CHECK'],
    difficulty: 1,
    title: 'Royal Fork',
    explanation: 'The knight delivers check while simultaneously attacking the undefended queen. A classic fork pattern!',
  },
  {
    id: 'mp-beginner-002', 
    fen: 'r4rk1/ppp2ppp/8/8/8/8/PPP2PPP/R4RK1 w - - 0 1',
    solution: ['Rxf7'],
    themes: ['CAPTURE', 'TACTICAL'],
    difficulty: 1,
    title: 'Weak f7 Capture',
    explanation: 'The f7 pawn is only defended by the king. Simply capture it for free material!',
  },
  {
    id: 'mp-beginner-003',
    fen: '2kr4/ppp5/8/8/8/8/PPP5/2KR4 w - - 0 1',
    solution: ['Rd8+'],
    themes: ['BACK_RANK', 'CHECK'],
    difficulty: 1,
    title: 'Simple Back Rank',
    explanation: 'The enemy king is trapped on the back rank. Deliver checkmate with the rook!',
  },
  {
    id: 'mp-beginner-004',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Scholar\'s Checkmate',
    explanation: 'The queen delivers checkmate on f7, supported by the bishop. Always watch for this in openings!',
  },
  {
    id: 'mp-beginner-005',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1',
    solution: ['Qh4#'],
    themes: ['MATE_PATTERN'],
    difficulty: 1,
    title: 'Fool\'s Mate',
    explanation: 'After White weakens their kingside, Black delivers immediate checkmate. The fastest possible mate!',
  },

  // ============================================
  // DIFFICULTY 2 - INTERMEDIATE TACTICS
  // ============================================
  {
    id: 'mp-intermediate-001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7+', 'Ke7', 'Qxe5+'],
    themes: ['CAPTURE', 'CHECK', 'TACTICAL'],
    difficulty: 2,
    title: 'Queen Raid',
    explanation: 'Capture on f7 with check, then collect the e5 pawn. Your queen ravages the position!',
  },
  {
    id: 'mp-intermediate-002',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4N3/2B1q3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxf7+', 'Ke7', 'Nxc6+'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 2,
    title: 'Bishop Sacrifice Fork',
    explanation: 'Sacrifice the bishop to expose the king, then fork king and queen with the knight!',
  },
  {
    id: 'mp-intermediate-003',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2B1P1b1/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1',
    solution: ['Bxe6', 'fxe6', 'Nxe5'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 2,
    title: 'Exchange and Win',
    explanation: 'Capture the bishop to open the f-file, then win the central pawn with your knight.',
  },
  {
    id: 'mp-intermediate-004',
    fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Ng5', 'O-O', 'Qf3'],
    themes: ['QUIET_MOVE', 'TACTICAL'],
    difficulty: 2,
    title: 'Knight Jump Attack',
    explanation: 'Jump the knight to g5 threatening f7. After Black castles, Qf3 continues the pressure!',
  },
  {
    id: 'mp-intermediate-005',
    fen: '3r2k1/ppp2ppp/8/4N3/8/8/PPP2PPP/3R2K1 w - - 0 1',
    solution: ['Nf7', 'Rxd1+', 'Rxd1'],
    themes: ['FORK', 'TACTICAL'],
    difficulty: 2,
    title: 'Knight Fork Threat',
    explanation: 'The knight threatens mate on h8 or to fork king and rook. Black must give up the exchange.',
  },
  {
    id: 'mp-intermediate-006',
    fen: 'r3kb1r/ppppqppp/2n2n2/4p1B1/2B1P3/3P1N2/PPP2PPP/RN1QK2R w KQkq - 0 1',
    solution: ['Bxf6', 'Qxf6', 'Bxf7+'],
    themes: ['PIN', 'SACRIFICE'],
    difficulty: 2,
    title: 'Removing the Guard',
    explanation: 'Capture the knight which was defending f7, then strike with the bishop sacrifice!',
  },

  // ============================================
  // DIFFICULTY 3 - ADVANCED TACTICS
  // ============================================
  {
    id: 'mp-advanced-001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Nxf7', 'Kxf7', 'Qf3+', 'Ke6', 'Nc3'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 3,
    title: 'The Fried Liver Attack',
    explanation: 'A legendary knight sacrifice! After Nxf7, the black king is dragged into the center where it faces a deadly attack.',
    beforeFen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1',
    setupMove: { from: 'e5', to: 'e5' },
  },
  {
    id: 'mp-advanced-002',
    fen: 'r2qr1k1/ppp2ppp/2nb4/3p2B1/3P4/2N2N2/PPP2PPP/R2QR1K1 w - - 0 1',
    solution: ['Bxd8', 'Rxd8', 'Nxd5'],
    themes: ['DEFLECTION', 'CAPTURE'],
    difficulty: 3,
    title: 'Deflecting the Queen',
    explanation: 'By capturing on d8, we force the queen away from protecting d5, winning a piece.',
  },
  {
    id: 'mp-advanced-003',
    fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Nxf7', 'Qe3+', 'Qe2'],
    themes: ['SACRIFICE', 'ZWISCHENZUG'],
    difficulty: 3,
    title: 'The Zwischenzug Strike',
    explanation: 'After the knight capture, Black tries a check. But we block with our queen maintaining the attack!',
  },
  {
    id: 'mp-advanced-004',
    fen: 'r2q1rk1/ppp1bppp/2n1bn2/3pp3/2B1P3/P1N2N2/1PPP1PPP/R1BQR1K1 w - - 0 1',
    solution: ['exd5', 'Nxd5', 'Nxe5'],
    themes: ['DISCOVERY', 'CAPTURE'],
    difficulty: 3,
    title: 'Central Breakthrough',
    explanation: 'Opening the center with exd5 sets up a discovered attack on the bishop. Then we win material!',
  },
  {
    id: 'mp-advanced-005',
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Ng5'],
    themes: ['SACRIFICE', 'PIN'],
    difficulty: 3,
    title: 'The Greek Gift Lite',
    explanation: 'Sacrifice on f7 to deflect the rook. Now Ng5 creates a deadly pin along the f-file!',
  },
  {
    id: 'mp-advanced-006',
    fen: 'r1bqk2r/ppp2ppp/2n2n2/2bpp3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 1',
    solution: ['Bxd5', 'Nxd5', 'cxd4', 'Be6', 'dxe5'],
    themes: ['SACRIFICE', 'TACTICAL'],
    difficulty: 3,
    title: 'Central Pawn Storm',
    explanation: 'Capture on d5 to open lines, then advance the pawns to win material in the center.',
  },
  {
    id: 'mp-advanced-007',
    fen: 'r3k2r/ppp2ppp/2nqbn2/3pp3/2B1P3/P1NP1N2/1PP2PPP/R1BQR1K1 w kq - 0 1',
    solution: ['Nxd5', 'Nxd5', 'exd5', 'Qxd5', 'Bxe6'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 3,
    title: 'Knight Sacrifice Combination',
    explanation: 'The knight sacrifice opens the diagonal for our bishop to deliver a crushing blow!',
  },

  // ============================================
  // DIFFICULTY 4 - EXPERT TACTICS
  // ============================================
  {
    id: 'mp-expert-001',
    fen: 'r2qr1k1/ppp2ppp/2nb4/3pN1B1/3P4/2N5/PPP2PPP/R2QR1K1 w - - 0 1',
    solution: ['Bxd8', 'Bxh2+', 'Kxh2', 'Rxd8', 'Nxf7'],
    themes: ['SACRIFICE', 'TACTICAL'],
    difficulty: 4,
    title: 'Double Deflection',
    explanation: 'An elegant combination! After exchanging pieces, the knight lands on f7 with devastating effect.',
  },
  {
    id: 'mp-expert-002',
    fen: 'r1bq1rk1/pppnnppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQ - 0 1',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg8', 'Qh5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 4,
    title: 'The Greek Gift',
    explanation: 'The classic bishop sacrifice on h7! After Kxh7, Ng5+ draws the king out, and Qh5 threatens unstoppable mate.',
  },
  {
    id: 'mp-expert-003',
    fen: 'r4rk1/ppp2ppp/2n1bq2/3p4/2PP4/P1N2N2/1P3PPP/R1BQR1K1 w - - 0 1',
    solution: ['cxd5', 'Bxd5', 'Nxd5', 'Qxd5', 'Bg5'],
    themes: ['SACRIFICE', 'PIN'],
    difficulty: 4,
    title: 'Pin and Win',
    explanation: 'Open the center with cxd5, then Bg5 creates a lethal pin against the queen!',
  },
  {
    id: 'mp-expert-004',
    fen: 'r2qkb1r/pp1n1ppp/2p1pn2/3pPb2/3P4/2NB1N2/PPP2PPP/R1BQK2R w KQkq - 0 1',
    solution: ['Bxf5', 'exf5', 'e6', 'fxe6', 'Ng5'],
    themes: ['SACRIFICE', 'QUIET_MOVE'],
    difficulty: 4,
    title: 'Pawn Wedge',
    explanation: 'Exchange bishops, then e6! The pawn wedge tears apart Black\'s position before the knight invades on g5.',
  },
  {
    id: 'mp-expert-005',
    fen: '2r2rk1/pp1nqppp/4p3/3pP1B1/3P2P1/2N2Q2/PP3P1P/2R2RK1 w - - 0 1',
    solution: ['Bxe7', 'Rxc1', 'Rxc1', 'Nxe5', 'dxe5'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 4,
    title: 'Clearance Sacrifice',
    explanation: 'The bishop sacrifice clears the way for our pieces to invade! Accurate play wins material.',
  },
  {
    id: 'mp-expert-006',
    fen: 'r1b2rk1/ppp1qppp/2n1p3/3n4/3PN3/P4N2/1PP2PPP/R1BQR1K1 w - - 0 1',
    solution: ['Nxd5', 'exd5', 'Rxe7', 'Nxe7', 'Bf4'],
    themes: ['SACRIFICE', 'TACTICAL'],
    difficulty: 4,
    title: 'Exchange Sacrifice',
    explanation: 'Sacrifice the exchange to win the queen! The follow-up Bf4 ensures we come out ahead.',
  },

  // ============================================
  // DIFFICULTY 5 - MASTER TACTICS
  // ============================================
  {
    id: 'mp-master-001',
    fen: 'r2q1rk1/pb1n1ppp/1p2pn2/2ppP3/3P4/P1PB1N2/1P1N1PPP/R1BQR1K1 w - - 0 1',
    solution: ['Bxh7+', 'Nxh7', 'Ng5', 'Nf6', 'Qh5', 'g6', 'Nxe6'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Lasker\'s Attack',
    explanation: 'A deep combination inspired by Emanuel Lasker! The bishop sacrifice on h7 leads to an unstoppable attack with precise play.',
  },
  {
    id: 'mp-master-002',
    fen: '2rr2k1/pp1qnppp/4p3/3pP1P1/3P4/2PB1Q2/PP4PP/R4RK1 w - - 0 1',
    solution: ['Bxh7+', 'Kxh7', 'Qh5+', 'Kg8', 'g6', 'Nxg6', 'Qxg6+'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'Double Bishop Storm',
    explanation: 'The classic double bishop sacrifice pattern! After opening the h-file, the g6 pawn breakthrough leads to forced mate.',
  },
  {
    id: 'mp-master-003',
    fen: 'r1b1r1k1/1pq2ppp/p1n1pn2/3pN3/3P4/P1PB4/2Q2PPP/R1B1R1K1 w - - 0 1',
    solution: ['Nxf7', 'Kxf7', 'Qxh7+', 'Ke8', 'Bg6+', 'Kd8', 'Qxg8+'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 5,
    title: 'The Knight Invasion',
    explanation: 'Sacrifice the knight to tear open the king position, then the queen and bishop coordinate for a devastating attack!',
  },
  {
    id: 'mp-master-004',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P1B2/2N1PN2/PP1QBPPP/R4RK1 w - - 0 1',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Bxg5', 'Bxg5', 'Kg8', 'Bxf6'],
    themes: ['SACRIFICE', 'TACTICAL'],
    difficulty: 5,
    title: 'Tactical Masterpiece',
    explanation: 'A symphony of tactics! Bishop sacrifice, knight attack, and pin combine for a winning position.',
  },
  {
    id: 'mp-master-005',
    fen: 'r4rk1/1bq1bppp/ppnppn2/8/2P1P3/1PN2N2/PB1QBPPP/R4RK1 w - - 0 1',
    solution: ['Nd5', 'exd5', 'exd5', 'Ne5', 'Bxe5', 'dxe5', 'd6'],
    themes: ['SACRIFICE', 'QUIET_MOVE'],
    difficulty: 5,
    title: 'The Central Avalanche',
    explanation: 'Sacrifice the knight to activate the central pawns. The d6 pawn wedge rips apart Black\'s position!',
  },

  // ============================================
  // CLASSIC GAME POSITIONS
  // ============================================
  {
    id: 'mp-classic-001',
    fen: '1rb2rk1/pp1qbp1p/2n1p1p1/2Bp2N1/3P4/P3BQ2/1P3PPP/R3R1K1 w - - 0 1',
    solution: ['Nxe6', 'fxe6', 'Bxe6+', 'Kh8', 'Bxd7'],
    themes: ['SACRIFICE', 'CHECK'],
    difficulty: 4,
    title: 'The Immortal Zugzwang',
    explanation: 'A beautiful combination from a classic game! The knight sacrifice opens lines for the bishops to dominate.',
  },
  {
    id: 'mp-classic-002',
    fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N2NP1/PP2PPBP/R1BQK2R w KQkq - 0 1',
    solution: ['cxd5', 'Nxd5', 'O-O', 'Nxc3', 'bxc3', 'Bxc3', 'Rb1'],
    themes: ['SACRIFICE', 'TACTICAL'],
    difficulty: 4,
    title: 'Pawn Structure Demolition',
    explanation: 'Open the center with cxd5, then castle. The subsequent exchanges leave Black\'s structure in ruins!',
  },
  {
    id: 'mp-classic-003',
    fen: 'r2q1rk1/1b1nbppp/p2ppn2/1p4P1/3NP3/1BN5/PPP2P1P/R1BQR1K1 w - - 0 1',
    solution: ['gxf6', 'Bxf6', 'Nxe6', 'fxe6', 'Rxe6'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 4,
    title: 'The Sicilian Crusher',
    explanation: 'A typical attacking pattern against the Sicilian! The pawns storm forward while pieces coordinate for devastation.',
  },
  {
    id: 'mp-classic-004',
    fen: 'r1b2rk1/pp1pqppp/2n2n2/2b1p1N1/2B1P3/3P4/PPP2PPP/RNBQR1K1 w - - 0 1',
    solution: ['Nxf7', 'Rxf7', 'Bxf7+', 'Qxf7', 'Qh5'],
    themes: ['SACRIFICE', 'FORK'],
    difficulty: 3,
    title: 'The Double Sacrifice',
    explanation: 'Two pieces for a queen! The knight sacrifice followed by the bishop sacrifice leaves Black\'s defenses shattered.',
  },
  {
    id: 'mp-classic-005',
    fen: 'r4rk1/pp1b1ppp/2nbpn2/q1ppN3/3P4/P1PBPN2/1P3PPP/R1BQ1RK1 w - - 0 1',
    solution: ['Nxd7', 'Nxd7', 'dxc5', 'Bxc5', 'b4'],
    themes: ['CAPTURE', 'TACTICAL'],
    difficulty: 3,
    title: 'Central Domination',
    explanation: 'Win a pawn with Nxd7, then advance b4 to drive away the bishop. White dominates the center!',
  },

  // ============================================
  // ENDGAME TACTICS
  // ============================================
  {
    id: 'mp-endgame-001',
    fen: '8/8/4k3/8/3K4/4P3/8/8 w - - 0 1',
    solution: ['e4', 'Ke7', 'Ke5'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'King and Pawn Endgame',
    explanation: 'First advance the pawn, then bring the king forward. The opposition is key to promoting!',
  },
  {
    id: 'mp-endgame-002',
    fen: '8/4k3/8/4P3/4K3/8/8/8 w - - 0 1',
    solution: ['Kf5', 'Kf7', 'e6+'],
    themes: ['QUIET_MOVE'],
    difficulty: 2,
    title: 'Opposition Control',
    explanation: 'Take the opposition with Kf5. When Black plays Kf7, e6+ gains crucial space for the pawn!',
  },
  {
    id: 'mp-endgame-003',
    fen: '8/8/8/p7/k1K5/8/8/8 w - - 0 1',
    solution: ['Kb3'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Stopping the Passed Pawn',
    explanation: 'Simple endgame technique - get in front of the pawn with your king to stop it!',
  },
  {
    id: 'mp-endgame-004',
    fen: '8/1k6/1P6/1K6/8/8/8/8 w - - 0 1',
    solution: ['Ka6'],
    themes: ['QUIET_MOVE'],
    difficulty: 1,
    title: 'Shoulder Blocking',
    explanation: 'Use your king to block the enemy king. Ka6 prevents Black from getting in front of the pawn.',
  },
  {
    id: 'mp-endgame-005',
    fen: '4k3/R7/4K3/8/8/8/8/8 w - - 0 1',
    solution: ['Ra8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'],
    difficulty: 1,
    title: 'Rook Checkmate',
    explanation: 'The simplest rook endgame mate - push the enemy king to the edge and deliver checkmate!',
  },

  // ============================================
  // DEFENSIVE TACTICS
  // ============================================
  {
    id: 'mp-defense-001',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/2bNp3/4P3/3P4/PPP2PPP/R1BQKB1R b KQkq - 0 1',
    solution: ['Bxd5', 'exd5', 'Nxd5'],
    themes: ['CAPTURE', 'TACTICAL'],
    difficulty: 2,
    title: 'Eliminating the Attacker',
    explanation: 'Remove the annoying knight on d5 by capturing it. Then recapture to restore material balance.',
  },
  {
    id: 'mp-defense-002',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 1',
    solution: ['d5', 'exd5', 'Na5'],
    themes: ['QUIET_MOVE', 'TACTICAL'],
    difficulty: 3,
    title: 'Counter the Fried Liver',
    explanation: 'The best defense against the Fried Liver! Push d5 to challenge the bishop, then Na5 traps it.',
  },
  {
    id: 'mp-defense-003',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1',
    solution: ['g6', 'Qf3', 'd6'],
    themes: ['QUIET_MOVE', 'TACTICAL'],
    difficulty: 2,
    title: 'Defending f7',
    explanation: 'Push g6 to defend f7 and attack the queen. After Qf3, d6 solidifies the position.',
  },

  // ============================================
  // FAMOUS GAME RECREATIONS
  // ============================================
  {
    id: 'mp-famous-001',
    fen: 'r1b1k1nr/p2p1ppp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q7 w kq - 0 1',
    solution: ['Qxa8', 'Qc3', 'Qxc8+', 'Ke7', 'Qxc3'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 5,
    title: 'Paul Morphy\'s Brilliance',
    explanation: 'From Morphy\'s famous Opera Game! Material is sacrificed for devastating piece activity.',
  },
  {
    id: 'mp-famous-002',
    fen: 'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 0 1',
    solution: ['Qxh7+', 'Kxh7', 'Nxf6+', 'Kh8', 'Ng6#'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 4,
    title: 'The Arabian Mate',
    explanation: 'A classic queen sacrifice leading to the beautiful Arabian mate with knight and rook!',
  },
  {
    id: 'mp-famous-003',
    fen: '1rbq1rk1/p1b1nppp/1p2p3/8/1B1pN3/P2B4/1P3PPP/2RQ1R1K w - - 0 1',
    solution: ['Nf6+', 'gxf6', 'Qg4+', 'Kh8', 'Qh5'],
    themes: ['SACRIFICE', 'MATE_PATTERN'],
    difficulty: 4,
    title: 'Kasparov\'s Kingside Attack',
    explanation: 'A typical Kasparov attacking motif! The knight sacrifice rips open the kingside for the queen invasion.',
  },
  {
    id: 'mp-famous-004',
    fen: 'r4rk1/ppp1qppp/2n5/4P3/2Bp1n2/5Q2/PP3PPP/RNB1R1K1 w - - 0 1',
    solution: ['Bxf7+', 'Rxf7', 'Qxf4'],
    themes: ['SACRIFICE', 'CAPTURE'],
    difficulty: 3,
    title: 'Fischer\'s Precision',
    explanation: 'A clean tactical shot in Bobby Fischer\'s style. The bishop sacrifice wins material after the dust settles.',
  },
  {
    id: 'mp-famous-005',
    fen: 'r1b1r1k1/pp1n1pbp/1qpp1np1/4p3/2PPP3/2N2N2/PP1QBPPP/R1B1R1K1 w - - 0 1',
    solution: ['dxe5', 'dxe5', 'Qxd7', 'Qxd7', 'Nxe5'],
    themes: ['CAPTURE', 'TACTICAL'],
    difficulty: 3,
    title: 'Carlsen\'s Simplification',
    explanation: 'In Magnus Carlsen\'s style - simplify to a winning endgame! The queen exchange leads to a dominating knight.',
  },
];

export default masterPuzzles;
