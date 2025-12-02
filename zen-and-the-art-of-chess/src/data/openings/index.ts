// ============================================
// OPENING LINES DATABASE
// Comprehensive database with tiered learning
// Essential lines for learning + full database for exploration
// ============================================

export type LinePriority = 'essential' | 'recommended' | 'advanced' | 'reference';

export interface OpeningLine {
  id: string;
  name: string;
  variation: string;
  eco: string;
  moves: string[];  // Array of moves in algebraic notation
  fen: string;      // Final position FEN
  description: string;
  keyIdeas: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other';
  side?: 'white' | 'black';  // Optional - determined by opening course
  priority?: LinePriority;   // Learning tier (undefined = reference/database)
}

// Helper to get learning lines only (essential + recommended)
export const getLearningLines = (lines: OpeningLine[]): OpeningLine[] => 
  lines.filter(l => l.priority === 'essential' || l.priority === 'recommended');

// Helper to get essential lines only
export const getEssentialLines = (lines: OpeningLine[]): OpeningLine[] => 
  lines.filter(l => l.priority === 'essential');

// Helper to count by priority
export const countByPriority = (lines: OpeningLine[]) => ({
  essential: lines.filter(l => l.priority === 'essential').length,
  recommended: lines.filter(l => l.priority === 'recommended').length,
  advanced: lines.filter(l => l.priority === 'advanced').length,
  reference: lines.filter(l => !l.priority || l.priority === 'reference').length,
  total: lines.length,
});

export const openingLines: OpeningLine[] = [
  // ==========================================
  // ITALIAN GAME & GIUOCO PIANO
  // ==========================================
  {
    id: 'italian-main',
    name: 'Italian Game',
    variation: 'Giuoco Piano Main Line',
    eco: 'C54',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4', 'Bb4+', 'Bd2', 'Bxd2+', 'Nbxd2'],
    fen: 'r1bqk2r/pppp1ppp/2n2n2/8/2BPP3/5N2/PP1N1PPP/R2QK2R b KQkq - 0 8',
    description: 'Classical Italian with central tension. White has a strong pawn center.',
    keyIdeas: ['Control d4 and e4', 'Develop pieces to active squares', 'Castle kingside'],
    difficulty: 2,
    category: 'e4',
    side: 'white',
    priority: 'essential',
  },
  {
    id: 'italian-evans',
    name: 'Italian Game',
    variation: 'Evans Gambit Accepted',
    eco: 'C51',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5', 'd4', 'exd4', 'O-O', 'd6', 'cxd4'],
    fen: 'r1bqk1nr/ppp2ppp/2np4/b7/2BPP3/5N2/P4PPP/RNBQ1RK1 b kq - 0 8',
    description: 'Romantic gambit offering a pawn for rapid development and attack.',
    keyIdeas: ['Rapid piece development', 'Open lines for attack', 'Pressure on f7'],
    difficulty: 3,
    category: 'e4',
    priority: 'essential',
  },

  // ==========================================
  // RUY LOPEZ
  // ==========================================
  {
    id: 'ruy-morphy',
    name: 'Ruy Lopez',
    variation: 'Morphy Defense, Main Line',
    eco: 'C78',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3'],
    fen: 'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 b - - 0 10',
    description: 'The main line of the Spanish. Deep positional struggle ahead.',
    keyIdeas: ['Slow maneuvering', 'd4 push preparation', 'Control of center'],
    difficulty: 3,
    category: 'e4',
  },
  {
    id: 'ruy-berlin',
    name: 'Ruy Lopez',
    variation: 'Berlin Defense',
    eco: 'C67',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5', 'Nf5', 'Qxd8+', 'Kxd8'],
    fen: 'r1b1k2r/ppp2ppp/2p5/4Pn2/8/5N2/PPP2PPP/RNB2RK1 b kq - 0 8',
    description: 'The Berlin Wall. Queenless middlegame with endgame character.',
    keyIdeas: ['Superior minor piece play', 'Exploit doubled pawns', 'King activity'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'ruy-marshall',
    name: 'Ruy Lopez',
    variation: 'Marshall Attack',
    eco: 'C89',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd5'],
    fen: 'r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - d6 0 9',
    description: 'Black sacrifices a pawn for a fierce kingside attack.',
    keyIdeas: ['Kingside attack for Black', 'Piece activity over material', 'Dynamic play'],
    difficulty: 4,
    category: 'e4',
  },

  // ==========================================
  // SICILIAN DEFENSE
  // ==========================================
  {
    id: 'sicilian-najdorf',
    name: 'Sicilian Defense',
    variation: 'Najdorf, Main Line',
    eco: 'B90',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nb3', 'Be6', 'f3', 'Be7', 'Qd2', 'O-O', 'O-O-O'],
    fen: 'rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1BP2/PPPQ2PP/2KR1B1R b - - 3 11',
    description: 'The king of fighting chess. Opposite-side castling leads to mutual attacks.',
    keyIdeas: ['Opposite-side attacks', 'b5 pawn storm for Black', 'g4-g5 push for White'],
    difficulty: 5,
    category: 'e4',
  },
  {
    id: 'sicilian-dragon',
    name: 'Sicilian Defense',
    variation: 'Dragon, Yugoslav Attack',
    eco: 'B77',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6', 'Bc4', 'Bd7', 'O-O-O'],
    fen: 'r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/2KR3R b - - 5 11',
    description: 'The Dragon meets the Yugoslav Attack. Sharp and theoretical.',
    keyIdeas: ['Kingside fianchetto power', 'Opposite-side castling', 'Race to attack'],
    difficulty: 5,
    category: 'e4',
  },
  {
    id: 'sicilian-scheveningen',
    name: 'Sicilian Defense',
    variation: 'Scheveningen',
    eco: 'B84',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O', 'f4', 'Nc6', 'Be3'],
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/3NPP2/2N1B3/PPP1B1PP/R2Q1RK1 b - - 1 10',
    description: 'Solid pawn structure with e6-d6. Flexible and rich in ideas.',
    keyIdeas: ['Solid pawn chain', 'e5 break for Black', 'Keres Attack for White'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'sicilian-sveshnikov',
    name: 'Sicilian Defense',
    variation: 'Sveshnikov',
    eco: 'B33',
    moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bg5', 'a6', 'Na3', 'b5', 'Nd5'],
    fen: 'r1bqkb1r/5ppp/p1np1n2/1p1Np1B1/4P3/N7/PPP2PPP/R2QKB1R b KQkq - 1 10',
    description: 'Dynamic and unbalanced. Black accepts structural weaknesses for activity.',
    keyIdeas: ['d5 outpost for White', 'Active piece play for Black', 'Fight for d5'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'sicilian-alapin',
    name: 'Sicilian Defense',
    variation: 'Alapin (c3)',
    eco: 'B22',
    moves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'Nf3', 'Nc6', 'cxd4', 'd6', 'Bc4', 'Nb6', 'Bb3', 'dxe5', 'dxe5'],
    fen: 'r1bqkb1r/pp2pppp/1nn5/4P3/8/1B3N2/PP3PPP/RNBQK2R b KQkq - 0 9',
    description: 'Anti-Sicilian avoiding main lines. Solid central play.',
    keyIdeas: ['Strong e5 pawn', 'Simple development', 'Avoid heavy theory'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // FRENCH DEFENSE
  // ==========================================
  {
    id: 'french-winawer',
    name: 'French Defense',
    variation: 'Winawer, Main Line',
    eco: 'C18',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Qg4', 'Qc7', 'Qxg7', 'Rg8', 'Qxh7', 'cxd4'],
    fen: 'rnb1k1r1/ppq1np1Q/4p3/3pP3/3p4/P1P5/2P2PPP/R1B1KBNR w KQq - 0 10',
    description: 'Sharp and double-edged. White grabs pawns, Black gets counterplay.',
    keyIdeas: ['Structural imbalance', 'Attack vs counterattack', 'Central breaks'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'french-tarrasch',
    name: 'French Defense',
    variation: 'Tarrasch, Open',
    eco: 'C07',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'c5', 'exd5', 'exd5', 'Ngf3', 'Nc6', 'Bb5', 'Bd6', 'dxc5', 'Bxc5', 'O-O', 'Nge7', 'Nb3', 'Bd6'],
    fen: 'r1bqk2r/pp2nppp/2nb4/3p4/8/1N3N2/PPP2PPP/R1BQ1RK1 w kq - 4 10',
    description: 'Open French with IQP position. Dynamic piece play.',
    keyIdeas: ['Isolated d-pawn dynamics', 'Piece activity', 'Minority attack'],
    difficulty: 3,
    category: 'e4',
  },
  {
    id: 'french-advance',
    name: 'French Defense',
    variation: 'Advance Variation',
    eco: 'C02',
    moves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'Be2', 'cxd4', 'cxd4', 'Nh6', 'Bxh6', 'Qxb2', 'Bxg7', 'Bxg7'],
    fen: 'r1b1k2r/pp3pbp/2n1p3/3pP3/3P4/5N2/Pq3PPP/RN1QK2R w KQkq - 0 10',
    description: 'White gains space, Black counterattacks the base at d4.',
    keyIdeas: ['Space advantage', 'f6 break for Black', 'Pawn chain tension'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // CARO-KANN DEFENSE
  // ==========================================
  {
    id: 'caro-classical',
    name: 'Caro-Kann Defense',
    variation: 'Classical Variation',
    eco: 'B18',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7', 'h5', 'Bh7', 'Bd3', 'Bxd3', 'Qxd3'],
    fen: 'r2qkbnr/pp1nppp1/2p4p/7P/3P4/3Q1NN1/PPP2PP1/R1B1K2R b KQkq - 0 10',
    description: 'Solid and reliable. Black develops the light-squared bishop outside the pawn chain.',
    keyIdeas: ['Solid pawn structure', 'e6 and Ngf6 setup', 'Long-term equality'],
    difficulty: 2,
    category: 'e4',
  },
  {
    id: 'caro-advance',
    name: 'Caro-Kann Defense',
    variation: 'Advance Variation',
    eco: 'B12',
    moves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'Nd7', 'O-O', 'h6', 'Nbd2', 'Ne7', 'Nb3', 'Qc7', 'Bd2'],
    fen: 'r3kb1r/ppqnnpp1/2p1p2p/3pPb2/3P4/1N3N2/PPPBBPPP/R2Q1RK1 b kq - 3 10',
    description: 'White gains space, Black maneuvers behind the pawn chain.',
    keyIdeas: ['c5 break for Black', 'Kingside space', 'Piece maneuvering'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // QUEEN'S GAMBIT
  // ==========================================
  {
    id: 'qgd-orthodox',
    name: "Queen's Gambit Declined",
    variation: 'Orthodox Defense',
    eco: 'D63',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'Nbd7', 'Rc1', 'c6', 'Bd3', 'dxc4', 'Bxc4', 'Nd5'],
    fen: 'r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP4/2N1PN2/PP3PPP/2RQK2R w K - 2 10',
    description: 'Classical Queen\'s Gambit. Solid and strategic.',
    keyIdeas: ['Minority attack', 'Central control', 'Carlsbad structure'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'qga-main',
    name: "Queen's Gambit Accepted",
    variation: 'Main Line',
    eco: 'D27',
    moves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6', 'Qe2', 'b5', 'Bb3', 'Bb7', 'Rd1', 'Nbd7'],
    fen: 'r2qkb1r/1b1n1ppp/p3pn2/1pp5/3P4/1B2PN2/PP2QPPP/RNB2RK1 w kq - 2 10',
    description: 'Black accepts the gambit and aims for active piece play.',
    keyIdeas: ['Development over pawn', 'c5 break', 'Active piece play'],
    difficulty: 2,
    category: 'd4',
  },
  {
    id: 'slav-main',
    name: 'Slav Defense',
    variation: 'Main Line',
    eco: 'D17',
    moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'Ne5', 'e6', 'f3', 'Bb4', 'e4', 'Bxe4', 'fxe4', 'Nxe4'],
    fen: 'rn1qk2r/pp3ppp/2p1p3/4N3/Pbbpn3/2N5/1P4PP/R1BQKB1R w KQkq - 0 10',
    description: 'Dynamic Slav with early piece activity.',
    keyIdeas: ['Light square control', 'Early development', 'Central tension'],
    difficulty: 3,
    category: 'd4',
  },

  // ==========================================
  // INDIAN DEFENSES
  // ==========================================
  {
    id: 'kings-indian-classical',
    name: "King's Indian Defense",
    variation: 'Classical Variation',
    eco: 'E98',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'd5', 'Nbd7', 'Bg5', 'h6', 'Bh4', 'g5', 'Bg3', 'Nh5'],
    fen: 'r1bq1rk1/pppn1pb1/3p3p/3Pp1pn/2P1P1B1/2N2N2/PP2BPPP/R2QK2R w KQ - 2 11',
    description: 'The main battleground of the King\'s Indian. Opposite flank attacks.',
    keyIdeas: ['f5 pawn storm for Black', 'c5 break for White', 'Complex middlegame'],
    difficulty: 5,
    category: 'd4',
  },
  {
    id: 'kings-indian-samisch',
    name: "King's Indian Defense",
    variation: 'Sämisch Variation',
    eco: 'E81',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'e5', 'd5', 'Nh5', 'Qd2', 'Qh4+', 'g3', 'Qe7'],
    fen: 'rnb2rk1/ppp1qpbp/3p2p1/3Pp2n/2P1P3/2N1BPP1/PP1Q3P/R3KBNR w KQ - 2 10',
    description: 'White builds a fortress. Black seeks dynamic counterplay.',
    keyIdeas: ['f4 push for Black', 'Solid white center', 'Long-term planning'],
    difficulty: 4,
    category: 'd4',
  },
  {
    id: 'nimzo-rubinstein',
    name: 'Nimzo-Indian Defense',
    variation: 'Rubinstein System',
    eco: 'E46',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O', 'Nge2', 'd5', 'a3', 'Be7', 'cxd5', 'exd5', 'Ng3', 'c6', 'Bd3', 'Nbd7'],
    fen: 'r1bq1rk1/pp1nbppp/2p2n2/3p4/3P4/P2BPN1P/1P3PP1/R1BQK2R w KQ - 1 10',
    description: 'Flexible setup with the bishop retreating to e7.',
    keyIdeas: ['Solid structure', 'Central control', 'Piece maneuvering'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'nimzo-classical',
    name: 'Nimzo-Indian Defense',
    variation: 'Classical, Main Line',
    eco: 'E32',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O', 'a3', 'Bxc3+', 'Qxc3', 'd6', 'Nf3', 'Nbd7', 'b4', 'b6', 'Bb2', 'Bb7'],
    fen: 'r2q1rk1/pbpn1ppp/1p1ppn2/8/1PP5/P1Q2N2/1B3PPP/R3KB1R w KQ - 2 10',
    description: 'Black gives up the bishop pair for doubled pawns.',
    keyIdeas: ['Control of e4', 'Knight outposts', 'Pawn structure play'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'grunfeld-exchange',
    name: 'Grünfeld Defense',
    variation: 'Exchange Variation',
    eco: 'D85',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'e4', 'Nxc3', 'bxc3', 'Bg7', 'Nf3', 'c5', 'Be3', 'Qa5', 'Qd2', 'Nc6'],
    fen: 'r1b1k2r/pp2ppbp/2n3p1/q1p5/3PP3/2P1BN2/P2Q1PPP/R3KB1R w KQkq - 4 10',
    description: 'White gets a big center, Black attacks it with pieces.',
    keyIdeas: ['Pressure on c3-d4', 'Active piece play', 'Central tension'],
    difficulty: 4,
    category: 'd4',
  },

  // ==========================================
  // ENGLISH & FLANK OPENINGS
  // ==========================================
  {
    id: 'english-symmetrical',
    name: 'English Opening',
    variation: 'Symmetrical, Main Line',
    eco: 'A34',
    moves: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'Nf3', 'Nf6', 'O-O', 'O-O', 'd3', 'd6', 'a3', 'a6', 'Rb1', 'Rb8'],
    fen: '1rbq1rk1/1p2ppbp/p1np1np1/2p5/2P5/P1NP1NP1/1P2PPBP/1RBQ1RK1 w - - 2 10',
    description: 'Symmetrical structure with flexible plans for both sides.',
    keyIdeas: ['Queenside expansion', 'Central breaks d4 or e4', 'Hedgehog formations'],
    difficulty: 3,
    category: 'c4',
  },
  {
    id: 'english-reversed',
    name: 'English Opening',
    variation: 'Reversed Sicilian',
    eco: 'A20',
    moves: ['c4', 'e5', 'Nc3', 'Nf6', 'g3', 'd5', 'cxd5', 'Nxd5', 'Bg2', 'Nb6', 'Nf3', 'Nc6', 'O-O', 'Be7', 'd3', 'O-O', 'Be3'],
    fen: 'r1bq1rk1/ppp1bppp/1nn5/4p3/8/2NPBNP1/PP2PPBP/R2Q1RK1 b - - 1 9',
    description: 'White plays a Sicilian with an extra tempo.',
    keyIdeas: ['Flexible piece placement', 'd4 break timing', 'Solid position'],
    difficulty: 2,
    category: 'c4',
  },
  {
    id: 'catalan-open',
    name: 'Catalan Opening',
    variation: 'Open Variation',
    eco: 'E04',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2', 'dxc4', 'Nf3', 'Be7', 'O-O', 'O-O', 'Qc2', 'a6', 'Qxc4', 'b5', 'Qc2', 'Bb7'],
    fen: 'rn1q1rk1/1bp1bppp/p3pn2/1p6/3P4/5NP1/PPQ1PPBP/RNB2RK1 w - - 2 10',
    description: 'White\'s fianchettoed bishop dominates the long diagonal.',
    keyIdeas: ['Long diagonal pressure', 'a4 break', 'Superior minor pieces'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'london-main',
    name: 'London System',
    variation: 'Main Line',
    eco: 'D02',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'c3', 'e6', 'Nbd2', 'Bd6', 'Bg3', 'O-O', 'Bd3', 'Qe7', 'Ne5'],
    fen: 'r1b2rk1/pp2qppp/2nbpn2/2ppN3/3P4/2PBBP2/PP1N1PPP/R2QK2R b KQ - 5 9',
    description: 'Solid system for White with a clear development scheme.',
    keyIdeas: ['e4 or c4 breaks', 'Kingside play', 'Solid center'],
    difficulty: 1,
    category: 'd4',
  },
  {
    id: 'reti-main',
    name: 'Réti Opening',
    variation: 'Main Line',
    eco: 'A07',
    moves: ['Nf3', 'd5', 'g3', 'Nf6', 'Bg2', 'c6', 'O-O', 'Bf5', 'd3', 'e6', 'Nbd2', 'Be7', 'Qe1', 'O-O', 'e4', 'Bh7', 'Qe2'],
    fen: 'rn1q1rk1/pp2bppp/2p1pn2/3p4/4P3/3P1NP1/PPPNQPBP/R1B2RK1 b - - 1 9',
    description: 'Flexible hypermodern opening with kingside fianchetto.',
    keyIdeas: ['Central control from afar', 'e4 break', 'Flexible piece placement'],
    difficulty: 2,
    category: 'nf3',
  },
];

// Import expanded openings from PGN Mentor master games
import { expandedOpenings } from './expanded-openings';

// Import comprehensive opening line collections
import { ruyLopezLines } from './ruy-lopez-lines';
import { sicilianLines } from './sicilian-lines';
import { d4OpeningsLines } from './d4-openings-lines';
import { otherOpeningsLines } from './other-openings-lines';
import { moreOpenings } from './more-openings';
import { expandedSystems } from './expanded-systems';
import { pgnOpenings } from './pgn-openings';
import { indianDefenseLines } from './indian-defenses';
import { italianGameLines } from './italian-lines';

// Combine all openings - including the massive PGN-generated database
export const allOpenings: OpeningLine[] = [
  ...italianGameLines,     // 50 curated Italian Game lines (first for priority)
  ...openingLines,
  ...expandedOpenings,
  ...ruyLopezLines,
  ...sicilianLines,
  ...d4OpeningsLines,
  ...otherOpeningsLines,
  ...moreOpenings,
  ...expandedSystems,
  ...indianDefenseLines,   // 50+ lines for Indian systems
  ...(pgnOpenings as OpeningLine[]),          // 61,000+ lines from PGN database
];

// Get openings by category
export const getOpeningsByCategory = (category: OpeningLine['category']) => 
  allOpenings.filter(o => o.category === category);

// Get openings by difficulty
export const getOpeningsByDifficulty = (difficulty: 1 | 2 | 3 | 4 | 5) => 
  allOpenings.filter(o => o.difficulty === difficulty);

// Get a random selection of openings for training
export const getRandomOpenings = (count: number): OpeningLine[] => {
  const shuffled = [...allOpenings].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get openings by name (fuzzy search)
export const searchOpenings = (query: string): OpeningLine[] => {
  const lowerQuery = query.toLowerCase();
  return allOpenings.filter(o => 
    o.name.toLowerCase().includes(lowerQuery) ||
    o.variation.toLowerCase().includes(lowerQuery) ||
    o.eco.toLowerCase().includes(lowerQuery)
  );
};

export { expandedOpenings };
export default allOpenings;



