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
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4', 'Bb4+', 'Bd2', 'Bxd2+', 'Nbxd2', 'd5', 'exd5', 'Nxd5', 'Qb3', 'Nce7', 'O-O', 'O-O', 'Rfe1', 'c6', 'Ne4'],
    fen: 'r1bq1rk1/pp2nppp/2p5/3n4/3PN3/1Q3N2/PP3PPP/R3R1K1 b - - 5 13',
    description: 'Classical Italian with central tension. White has a strong pawn center and active pieces.',
    keyIdeas: ['Control d4 and e4', 'Develop pieces to active squares', 'Castle kingside', 'Attack on the kingside'],
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
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5', 'd4', 'exd4', 'O-O', 'd6', 'cxd4', 'Bb6', 'Nc3', 'Na5', 'Bg5', 'f6', 'Be3', 'Ne7', 'Nd5', 'Nxd5', 'exd5'],
    fen: 'r1bqk2r/ppp1n1pp/1b1p1p2/N2P4/3P4/4B3/P4PPP/R2Q1RK1 b kq - 0 13',
    description: 'Romantic gambit offering a pawn for rapid development and attack.',
    keyIdeas: ['Rapid piece development', 'Open lines for attack', 'Pressure on f7', 'Central dominance'],
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
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3', 'Na5', 'Bc2', 'c5', 'd4', 'Qc7', 'Nbd2', 'cxd4', 'cxd4', 'Nc6', 'Nb3'],
    fen: 'r1b2rk1/2q1bppp/p1np1n2/1p2p3/3PP3/1N3N1P/PPB2PP1/R1BQR1K1 b - - 1 14',
    description: 'The main line of the Spanish. Deep positional struggle with strategic complexity.',
    keyIdeas: ['Slow maneuvering', 'd4 push preparation', 'Control of center', 'Piece coordination'],
    difficulty: 3,
    category: 'e4',
  },
  {
    id: 'ruy-berlin',
    name: 'Ruy Lopez',
    variation: 'Berlin Defense',
    eco: 'C67',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5', 'Nf5', 'Qxd8+', 'Kxd8', 'h3', 'Ke8', 'Nc3', 'h5', 'Bf4', 'Be7', 'Rad1', 'Be6', 'Ng5', 'Rh6'],
    fen: 'r3k3/ppp1bpp1/2p1b2r/4Pnp1/5BN1/2N4P/PPP2PP1/3RR1K1 w q - 2 14',
    description: 'The Berlin Wall. Queenless middlegame with endgame character requiring technique.',
    keyIdeas: ['Superior minor piece play', 'Exploit doubled pawns', 'King activity', 'Rook lifts'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'ruy-marshall',
    name: 'Ruy Lopez',
    variation: 'Marshall Attack',
    eco: 'C89',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd5', 'exd5', 'Nxd5', 'Nxe5', 'Nxe5', 'Rxe5', 'c6', 'd4', 'Bd6', 'Re1', 'Qh4', 'g3', 'Qh3'],
    fen: 'r1b2rk1/5ppp/p1pb4/1p1n4/3P4/1BP3PQ/PP3P1P/RNBQR1K1 w - - 2 14',
    description: 'Black sacrifices a pawn for a fierce kingside attack. Sharp tactical battle.',
    keyIdeas: ['Kingside attack for Black', 'Piece activity over material', 'Dynamic play', 'Qh3 ideas'],
    difficulty: 4,
    category: 'e4',
  },

  // ==========================================
  // SICILIAN DEFENSE
  // ==========================================
  {
    id: 'sicilian-najdorf',
    name: 'Sicilian Defense',
    variation: 'Najdorf, English Attack',
    eco: 'B90',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nb3', 'Be6', 'f3', 'Be7', 'Qd2', 'O-O', 'O-O-O', 'Nbd7', 'g4', 'b5', 'g5', 'b4', 'Ne2', 'Ne8', 'f4', 'a5', 'f5'],
    fen: 'r2qnrk1/3nbppp/3pb3/p3pPP1/1p2P3/1N2B3/PPPQN2P/2KR1B1R b - - 0 16',
    description: 'The English Attack - White storms the kingside while Black counters on the queenside.',
    keyIdeas: ['Opposite-side attacks', 'b5-b4 pawn storm for Black', 'g4-g5-f5 push for White', 'Race to attack'],
    difficulty: 5,
    category: 'e4',
  },
  {
    id: 'sicilian-dragon',
    name: 'Sicilian Defense',
    variation: 'Dragon, Yugoslav Attack',
    eco: 'B77',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6', 'Bc4', 'Bd7', 'O-O-O', 'Rc8', 'Bb3', 'Ne5', 'h4', 'h5', 'Bh6', 'Bxh6', 'Qxh6', 'Rxc3'],
    fen: 'r2q1rk1/pp1bpp2/3p1npQ/4n2p/3NP2P/1Nr2P2/PPP3P1/2KR3R w - - 0 15',
    description: 'The Dragon meets the Yugoslav Attack. Razor-sharp tactical warfare.',
    keyIdeas: ['Kingside fianchetto power', 'Opposite-side castling', 'Race to attack', 'Exchange sacrifice Rxc3'],
    difficulty: 5,
    category: 'e4',
  },
  {
    id: 'sicilian-scheveningen',
    name: 'Sicilian Defense',
    variation: 'Scheveningen, Keres Attack',
    eco: 'B84',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'g4', 'h6', 'h4', 'Nc6', 'Rg1', 'h5', 'gxh5', 'Nxh5', 'Bg5', 'Qb6', 'Nb3', 'a6', 'Qd2', 'Qc7', 'O-O-O', 'Bd7'],
    fen: 'r3kb1r/1pqb1pp1/p1nppn2/6Bn/7P/1NN5/PPPQ1P2/2KR1BR1 w kq - 2 14',
    description: 'Keres Attack - White plays an early g4 to destabilize Black\'s setup.',
    keyIdeas: ['Early g4 aggression', 'Queenside castling', 'Open g-file attack', 'Central tension'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'sicilian-sveshnikov',
    name: 'Sicilian Defense',
    variation: 'Sveshnikov, Main Line',
    eco: 'B33',
    moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bg5', 'a6', 'Na3', 'b5', 'Nd5', 'Be7', 'Bxf6', 'Bxf6', 'c3', 'O-O', 'Nc2', 'Rb8', 'Be2', 'Bg5', 'O-O', 'Be6', 'Nce3'],
    fen: 'r2q1rk1/5ppp/p1npb3/1p1Np1b1/4P3/2P1N3/PP2BPPP/R2Q1RK1 b - - 2 15',
    description: 'Dynamic and unbalanced. Black accepts structural weaknesses for active pieces.',
    keyIdeas: ['d5 outpost for White', 'Active piece play for Black', 'Fight for d5', 'f5 break'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'sicilian-alapin',
    name: 'Sicilian Defense',
    variation: 'Alapin (c3)',
    eco: 'B22',
    moves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'Nf3', 'Nc6', 'cxd4', 'd6', 'Bc4', 'Nb6', 'Bb3', 'dxe5', 'dxe5', 'Bg4', 'Qe2', 'e6', 'Nc3', 'Be7', 'O-O', 'O-O', 'Rd1', 'Qc7'],
    fen: 'r4rk1/ppq1bppp/1nn1p3/4P3/6b1/1BN2N2/PP2QPPP/R1BR2K1 w - - 4 14',
    description: 'Anti-Sicilian avoiding main lines. Solid central play leading to clear middlegame.',
    keyIdeas: ['Strong e5 pawn', 'Simple development', 'Avoid heavy theory', 'Central control'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // FRENCH DEFENSE
  // ==========================================
  {
    id: 'french-winawer',
    name: 'French Defense',
    variation: 'Winawer, Poisoned Pawn',
    eco: 'C18',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Qg4', 'Qc7', 'Qxg7', 'Rg8', 'Qxh7', 'cxd4', 'Ne2', 'Nbc6', 'f4', 'dxc3', 'Qd3', 'Bd7', 'Nxc3', 'Nf5', 'Rb1', 'O-O-O'],
    fen: 'r1k2r2/ppqb1p2/2n1p3/3pPn2/5P2/P1NQ4/2P3PP/1RB1KB1R w K - 2 15',
    description: 'Sharp and double-edged. White grabs pawns, Black gets counterplay and development lead.',
    keyIdeas: ['Structural imbalance', 'Attack vs counterattack', 'Central breaks', 'Opposite-side castling'],
    difficulty: 4,
    category: 'e4',
  },
  {
    id: 'french-tarrasch',
    name: 'French Defense',
    variation: 'Tarrasch, Open',
    eco: 'C07',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'c5', 'exd5', 'exd5', 'Ngf3', 'Nc6', 'Bb5', 'Bd6', 'dxc5', 'Bxc5', 'O-O', 'Nge7', 'Nb3', 'Bd6', 'Bg5', 'O-O', 'Bh4', 'Bg4', 'Bg3', 'Bxg3', 'hxg3', 'Qd6'],
    fen: 'r4rk1/pp2nppp/2nq4/1B1p4/6b1/1N3NP1/PPP2PP1/R2Q1RK1 w - - 4 14',
    description: 'Open French with IQP position. Dynamic piece play and tactical chances.',
    keyIdeas: ['Isolated d-pawn dynamics', 'Piece activity', 'Minority attack', 'Tactical motifs'],
    difficulty: 3,
    category: 'e4',
  },
  {
    id: 'french-advance',
    name: 'French Defense',
    variation: 'Advance, Main Line',
    eco: 'C02',
    moves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Be2', 'Nge7', 'Na3', 'cxd4', 'cxd4', 'Nf5', 'Nc2', 'Qb6', 'O-O', 'Be7', 'g4', 'Nh4', 'Nxh4', 'Bxh4'],
    fen: 'r3k2r/pp1b1ppp/1qn1p3/3pP3/3P2Pb/8/PPN1BP1P/R1BQ1RK1 w kq - 0 13',
    description: 'White gains space, Black undermines the pawn chain. Strategic battle.',
    keyIdeas: ['Space advantage', 'f6 break for Black', 'Pawn chain tension', 'Kingside vs queenside play'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // CARO-KANN DEFENSE
  // ==========================================
  {
    id: 'caro-classical',
    name: 'Caro-Kann Defense',
    variation: 'Classical, Main Line',
    eco: 'B18',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7', 'h5', 'Bh7', 'Bd3', 'Bxd3', 'Qxd3', 'e6', 'Bf4', 'Ngf6', 'O-O-O', 'Be7', 'Ne5', 'O-O', 'Kb1', 'c5'],
    fen: 'r2q1rk1/pp1nbpp1/4pn1p/2p1N2P/3P1B2/3Q2N1/PPP2PP1/1K1R3R w - - 0 15',
    description: 'Solid and reliable. Black develops the light-squared bishop early and plays for equality.',
    keyIdeas: ['Solid pawn structure', 'e6 and Ngf6 setup', 'Long-term equality', 'c5 break'],
    difficulty: 2,
    category: 'e4',
  },
  {
    id: 'caro-advance',
    name: 'Caro-Kann Defense',
    variation: 'Advance, Short System',
    eco: 'B12',
    moves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'Nd7', 'O-O', 'h6', 'Nbd2', 'Ne7', 'Nb3', 'Qc7', 'Bd2', 'Bh7', 'Rc1', 'Nf5', 'c4', 'Be7', 'c5', 'O-O', 'Na5', 'Rab8'],
    fen: 'r1r3k1/ppqnbppb/2p1p2p/N1PpPn2/3P4/5N2/PP1BBPPP/2RQ1RK1 w - - 2 15',
    description: 'White gains space, Black maneuvers behind the pawn chain seeking counterplay.',
    keyIdeas: ['c5 break for Black', 'Kingside space', 'Piece maneuvering', 'f6 break timing'],
    difficulty: 2,
    category: 'e4',
  },

  // ==========================================
  // QUEEN'S GAMBIT
  // ==========================================
  {
    id: 'qgd-orthodox',
    name: "Queen's Gambit Declined",
    variation: 'Orthodox, Mainline',
    eco: 'D63',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'Nbd7', 'Rc1', 'c6', 'Bd3', 'dxc4', 'Bxc4', 'Nd5', 'Bxe7', 'Qxe7', 'O-O', 'Nxc3', 'Rxc3', 'e5', 'dxe5', 'Nxe5', 'Nxe5', 'Qxe5'],
    fen: 'r1b2rk1/pp3ppp/2p5/4q3/2B5/2R1P3/PP3PPP/3Q1RK1 w - - 0 15',
    description: 'Classical Queen\'s Gambit. Solid strategic play leading to equal middlegame.',
    keyIdeas: ['Minority attack', 'Central control', 'Carlsbad structure', 'Piece exchanges'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'qga-main',
    name: "Queen's Gambit Accepted",
    variation: 'Classical, Main Line',
    eco: 'D27',
    moves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6', 'Qe2', 'b5', 'Bb3', 'Bb7', 'Rd1', 'Nbd7', 'Nc3', 'Qb6', 'e4', 'cxd4', 'Nxd4', 'Bc5', 'Be3', 'Nc5', 'Rac1'],
    fen: 'r3k2r/1b3ppp/pq2pn2/1nb5/3NP3/1BN1B3/PP2QPPP/2RR2K1 b kq - 5 15',
    description: 'Black accepts the gambit and aims for active piece play in a rich position.',
    keyIdeas: ['Development over pawn', 'c5 break', 'Active piece play', 'Central tension'],
    difficulty: 2,
    category: 'd4',
  },
  {
    id: 'slav-main',
    name: 'Slav Defense',
    variation: 'Main Line with a4',
    eco: 'D17',
    moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'Ne5', 'e6', 'f3', 'Bb4', 'e4', 'Bxe4', 'fxe4', 'Nxe4', 'Bd2', 'Qxd4', 'Nxe4', 'Qxe4+', 'Qe2', 'Bxd2+', 'Kxd2', 'Qd5+', 'Kc2', 'Na6'],
    fen: 'r3k2r/pp3ppp/n1p1p3/3qN3/P1p5/8/1PK1Q1PP/R4B1R w kq - 2 15',
    description: 'Dynamic Slav with early piece activity and complex middlegame.',
    keyIdeas: ['Light square control', 'Early development', 'Central tension', 'Piece activity'],
    difficulty: 3,
    category: 'd4',
  },

  // ==========================================
  // INDIAN DEFENSES
  // ==========================================
  {
    id: 'kings-indian-classical',
    name: "King's Indian Defense",
    variation: 'Classical, Mar del Plata',
    eco: 'E98',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'd5', 'Nbd7', 'Bg5', 'h6', 'Bh4', 'g5', 'Bg3', 'Nh5', 'O-O', 'Nf4', 'Bxf4', 'gxf4', 'Nd2', 'f5', 'exf5', 'Nc5', 'Bf3', 'Bxf5'],
    fen: 'r2q1rk1/ppp3b1/3p3p/2nPnb2/2P2p2/2N2B2/PP1N1PPP/R2Q1RK1 w - - 0 16',
    description: 'Mar del Plata variation - mutual flank attacks in sharp middlegame.',
    keyIdeas: ['f5 pawn storm for Black', 'c5 break for White', 'Complex middlegame', 'g5-g4 ideas'],
    difficulty: 5,
    category: 'd4',
  },
  {
    id: 'kings-indian-samisch',
    name: "King's Indian Defense",
    variation: 'Sämisch, Main Line',
    eco: 'E81',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'e5', 'd5', 'Nh5', 'Qd2', 'Qh4+', 'g3', 'Qe7', 'O-O-O', 'f5', 'exf5', 'gxf5', 'Bd3', 'Nd7', 'Nge2', 'Ndf6', 'h4', 'e4'],
    fen: 'r1b2rk1/ppp1q1bp/3p1n2/3P1p1n/2P1p2P/2NBBPP1/PP1QN3/2KR3R w - - 0 16',
    description: 'White builds a fortress. Black seeks dynamic f5-f4 counterplay.',
    keyIdeas: ['f4 push for Black', 'Solid white center', 'Long-term planning', 'Opposite-side castling'],
    difficulty: 4,
    category: 'd4',
  },
  {
    id: 'nimzo-rubinstein',
    name: 'Nimzo-Indian Defense',
    variation: 'Rubinstein, Main Line',
    eco: 'E46',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O', 'Nge2', 'd5', 'a3', 'Be7', 'cxd5', 'exd5', 'Ng3', 'c6', 'Bd3', 'Nbd7', 'O-O', 'Re8', 'f3', 'Nf8', 'Qc2', 'Bd6', 'Bd2', 'Ng6'],
    fen: 'r1bqr1k1/pp3ppp/2pb1nn1/3p4/3P4/P2BPNP1/1PQB1P1P/R4RK1 w - - 4 15',
    description: 'Flexible setup with the bishop retreating to e7. Strategic maneuvering.',
    keyIdeas: ['Solid structure', 'Central control', 'Piece maneuvering', 'e4 break'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'nimzo-classical',
    name: 'Nimzo-Indian Defense',
    variation: 'Classical 4.Qc2',
    eco: 'E32',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O', 'a3', 'Bxc3+', 'Qxc3', 'd6', 'Nf3', 'Nbd7', 'b4', 'b6', 'Bb2', 'Bb7', 'e3', 'Ne4', 'Qc2', 'f5', 'Bd3', 'Qe7', 'O-O', 'Rac8'],
    fen: '2r2rk1/pbpnq1pp/1p1pp3/5p2/1P1Pn3/P2BPN2/1BQ2PPP/R4RK1 w - - 2 15',
    description: 'Black gives up the bishop pair for doubled pawns and knight outpost.',
    keyIdeas: ['Control of e4', 'Knight outposts', 'Pawn structure play', 'f5 expansion'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'grunfeld-exchange',
    name: 'Grünfeld Defense',
    variation: 'Exchange, Classical',
    eco: 'D85',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'e4', 'Nxc3', 'bxc3', 'Bg7', 'Nf3', 'c5', 'Be3', 'Qa5', 'Qd2', 'Nc6', 'Rc1', 'cxd4', 'cxd4', 'Qxd2+', 'Kxd2', 'O-O', 'Bd3', 'Rd8', 'Ke2', 'Bg4'],
    fen: 'r2r2k1/pp2ppbp/2n3p1/8/3PP1b1/3BBN2/P4PPP/2R1K2R w K - 4 15',
    description: 'White has the center, Black has piece pressure. Strategic endgame fight.',
    keyIdeas: ['Pressure on c3-d4', 'Active piece play', 'Central tension', 'Endgame technique'],
    difficulty: 4,
    category: 'd4',
  },

  // ==========================================
  // ENGLISH & FLANK OPENINGS
  // ==========================================
  {
    id: 'english-symmetrical',
    name: 'English Opening',
    variation: 'Symmetrical, Hedgehog',
    eco: 'A34',
    moves: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'Nf3', 'Nf6', 'O-O', 'O-O', 'd3', 'd6', 'a3', 'a6', 'Rb1', 'Rb8', 'b4', 'cxb4', 'axb4', 'Bd7', 'Bd2', 'Ne8', 'Qc1', 'Nc7', 'Bh6'],
    fen: '1r1q1rk1/1pnbppbp/p1np2p1/8/1PP5/2NP1NP1/3BPPBP/1RQ2RK1 b - - 3 15',
    description: 'Symmetrical English leading to Hedgehog-style formations.',
    keyIdeas: ['Queenside expansion', 'Central breaks d4 or e4', 'Hedgehog formations', 'b5 break'],
    difficulty: 3,
    category: 'c4',
  },
  {
    id: 'english-reversed',
    name: 'English Opening',
    variation: 'Reversed Sicilian',
    eco: 'A20',
    moves: ['c4', 'e5', 'Nc3', 'Nf6', 'g3', 'd5', 'cxd5', 'Nxd5', 'Bg2', 'Nb6', 'Nf3', 'Nc6', 'O-O', 'Be7', 'd3', 'O-O', 'Be3', 'Be6', 'a3', 'f6', 'b4', 'a5', 'b5', 'Nd4', 'Nd2', 'Qd7'],
    fen: 'r4rk1/1ppqb1pp/1n2bp2/pP2p3/3n4/P1NPBNP1/3NPPBP/R2Q1RK1 w - - 2 14',
    description: 'White plays a Sicilian structure with an extra tempo for positional maneuvering.',
    keyIdeas: ['Flexible piece placement', 'd4 break timing', 'Solid position', 'Queenside expansion'],
    difficulty: 2,
    category: 'c4',
  },
  {
    id: 'catalan-open',
    name: 'Catalan Opening',
    variation: 'Open, Main Line',
    eco: 'E04',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2', 'dxc4', 'Nf3', 'Be7', 'O-O', 'O-O', 'Qc2', 'a6', 'Qxc4', 'b5', 'Qc2', 'Bb7', 'Bd2', 'Be4', 'Qc1', 'Nc6', 'e3', 'Nb4', 'a3', 'Nd5', 'Ne5', 'Rc8'],
    fen: '2rq1rk1/1bp1bppp/p3pn2/1p1nN3/8/P3P1P1/1P1B1PBP/RNQ2RK1 w - - 4 15',
    description: 'White\'s fianchettoed bishop dominates the long diagonal in rich middlegame.',
    keyIdeas: ['Long diagonal pressure', 'a4 break', 'Superior minor pieces', 'Central control'],
    difficulty: 3,
    category: 'd4',
  },
  {
    id: 'london-main',
    name: 'London System',
    variation: 'Main Line with Ne5',
    eco: 'D02',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'c3', 'e6', 'Nbd2', 'Bd6', 'Bg3', 'O-O', 'Bd3', 'Qe7', 'Ne5', 'Nd7', 'Nxd7', 'Bxd7', 'O-O', 'f5', 'Qf3', 'Rae8', 'e4', 'dxe4', 'Nxe4'],
    fen: 'r3rrk1/pp1bq1pp/2nbp3/2p2p2/3PN3/2PB2B1/PP3PPP/R3QRK1 b - - 0 15',
    description: 'Solid system for White with clear development and central play.',
    keyIdeas: ['e4 or c4 breaks', 'Kingside play', 'Solid center', 'Ne5 outpost'],
    difficulty: 1,
    category: 'd4',
  },
  {
    id: 'reti-main',
    name: 'Réti Opening',
    variation: 'Main Line with e4',
    eco: 'A07',
    moves: ['Nf3', 'd5', 'g3', 'Nf6', 'Bg2', 'c6', 'O-O', 'Bf5', 'd3', 'e6', 'Nbd2', 'Be7', 'Qe1', 'O-O', 'e4', 'Bh7', 'Qe2', 'dxe4', 'dxe4', 'Nbd7', 'e5', 'Nd5', 'Nc4', 'Qc7', 'Re1', 'Rad8'],
    fen: 'r2r1rk1/ppqnbppb/2p1p3/3nP3/2N5/5NP1/PPP1QPBP/R1B1R1K1 w - - 4 15',
    description: 'Flexible hypermodern opening leading to dynamic central play.',
    keyIdeas: ['Central control from afar', 'e4 break', 'Flexible piece placement', 'e5 push'],
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



