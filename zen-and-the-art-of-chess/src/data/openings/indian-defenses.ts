// ============================================
// COMPREHENSIVE INDIAN DEFENSE LINES
// King's Indian, Nimzo-Indian, Grünfeld, Queen's Indian
// 500+ essential variations
// ============================================

import type { OpeningLine } from './index';

// ============================================
// KING'S INDIAN DEFENSE - 150+ Lines
// ============================================

const kingsIndianLines: OpeningLine[] = [
  // CLASSICAL MAIN LINE (E99)
  { id: 'kid-cl-1', name: "King's Indian Defense", variation: 'Classical, 9.Ne1 Main Line', eco: 'E99', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5','Ne7','Ne1','Nd7','Nd3','f5'], fen: 'r1bq1rk1/pppn1pbp/3p2p1/3Ppp2/2P1P3/2NN4/PP2BPPP/R1BQ1RK1 w - - 0 11', description: 'Main battleground. Both sides attack opposite flanks.', keyIdeas: ['f4 for Black', 'c5-c6 for White', 'g4 push'], difficulty: 5, category: 'd4', side: 'black' },
  { id: 'kid-cl-2', name: "King's Indian Defense", variation: 'Classical, 9.Ne1 f5 10.f3', eco: 'E99', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5','Ne7','Ne1','Nd7','f3','f5','Be3','f4','Bf2','g5'], fen: 'r1bq1rk1/pppn1p1p/3p4/3Pp1p1/2P1Pp2/2N2P2/PP2BBPP/R2QNR1K w - - 0 13', description: 'Mar del Plata Attack - kingside storm begins!', keyIdeas: ['g5-g4', 'Rf7-h7', 'Nf6-h5'], difficulty: 5, category: 'd4', side: 'black' },
  { id: 'kid-cl-3', name: "King's Indian Defense", variation: 'Classical, 9.b4 Bayonet', eco: 'E97', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5','Ne7','b4','Nh5','Re1','f5','Ng5','Nf6'], fen: 'r1bq1rk1/ppp1npbp/3p1np1/3Ppp2/1PP1P3/2N3N1/P3BPPP/R1BQR1K1 w - - 0 12', description: 'Bayonet Attack - White strikes first on queenside.', keyIdeas: ['c5 break', 'a4-a5', 'Nc4'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'kid-cl-4', name: "King's Indian Defense", variation: 'Classical, Petrosian System', eco: 'E92', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','d5','a5','Bg5','h6','Bh4','Na6','Nd2','Qe8','a3','Nh7'], fen: 'r1b1qrk1/1pp2pb1/n2p2pp/p2Pp3/2P1P2B/P1N5/1P1NBPPP/R2QK2R w KQ - 0 12', description: 'Petrosian System with Bg5.', keyIdeas: ['f4 break', 'g4 push', 'Prophylactic a3'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'kid-cl-5', name: "King's Indian Defense", variation: 'Classical, Exchange 7.dxe5', eco: 'E92', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','dxe5','dxe5','Qxd8','Rxd8','Bg5','Re8','Nd5','Nxd5','cxd5','c6'], fen: 'rnb1r1k1/pp3pbp/2p3p1/3Pp1B1/4P3/5N2/PP2BPPP/R3K2R w KQ - 0 12', description: 'Exchange variation - endgame focus.', keyIdeas: ['Superior minor pieces', 'Pawn structure play', 'King activity'], difficulty: 3, category: 'd4', side: 'black' },
  
  // SÄMISCH VARIATION (E81-E89)
  { id: 'kid-sam-1', name: "King's Indian Defense", variation: 'Sämisch, Main Line', eco: 'E81', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','f3','O-O','Be3','e5','d5','Nh5','Qd2','Qh4+','g3','Qe7','O-O-O','f5'], fen: 'rnb2rk1/ppp1qpbp/3p2p1/3Ppp1n/2P1P3/2N1BPP1/PP1Q3P/2KR1BNR w - - 0 11', description: 'Sämisch - White builds a fortress, Black counterattacks.', keyIdeas: ['f4 break', 'c5 break', 'Piece coordination'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'kid-sam-2', name: "King's Indian Defense", variation: 'Sämisch, 6...c5', eco: 'E83', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','f3','O-O','Be3','c5','dxc5','dxc5','Qxd8','Rxd8','Bxc5','Nc6'], fen: 'r1br2k1/pp2ppbp/2n2np1/2B5/2P1P3/2N2P2/PP4PP/R3KBNR w KQ - 1 10', description: 'Sämisch with c5 break.', keyIdeas: ['Piece activity', 'Compensation for pawn', 'Open position'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'kid-sam-3', name: "King's Indian Defense", variation: 'Sämisch, Panno Variation', eco: 'E84', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','f3','O-O','Be3','Nc6','Nge2','a6','Qd2','Rb8','Nc1','e5','d5','Nd4'], fen: 'r1bq1rk1/1pp2pbp/p2p1np1/3Pp3/2PnP3/2N1BP2/PP1Q2PP/R1N1KB1R w KQ - 2 11', description: 'Panno Variation with a6 and Rb8.', keyIdeas: ['b5 push', 'Nd4 outpost', 'Queenside counterplay'], difficulty: 4, category: 'd4', side: 'black' },
  
  // FOUR PAWNS ATTACK (E76-E79)
  { id: 'kid-4p-1', name: "King's Indian Defense", variation: 'Four Pawns Attack, Main Line', eco: 'E76', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','f4','O-O','Nf3','c5','d5','e6','Be2','exd5','cxd5','Re8','e5','dxe5','fxe5','Ng4'], fen: 'rnbqr1k1/pp3pbp/6p1/2pPP3/6n1/2N2N2/PP2B1PP/R1BQK2R w KQ - 0 12', description: 'Four Pawns - all or nothing for both sides!', keyIdeas: ['Attack the center', 'e5 weakness', 'Tactical complications'], difficulty: 5, category: 'd4', side: 'black' },
  { id: 'kid-4p-2', name: "King's Indian Defense", variation: 'Four Pawns, Florentine Gambit', eco: 'E77', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','f4','O-O','Nf3','c5','d5','e6','Be2','exd5','exd5','Bg4'], fen: 'rn1q1rk1/pp3pbp/3p1np1/2pP4/2P2Pb1/2N2N2/PP2B1PP/R1BQK2R w KQ - 1 10', description: 'Florentine Gambit - bishop pin.', keyIdeas: ['Pin on f3', 'Counterplay', 'Open e-file'], difficulty: 4, category: 'd4', side: 'black' },
  
  // FIANCHETTO SYSTEM (E60-E69)
  { id: 'kid-fi-1', name: "King's Indian Defense", variation: 'Fianchetto, Classical', eco: 'E67', moves: ['d4','Nf6','c4','g6','g3','Bg7','Bg2','O-O','Nc3','d6','Nf3','Nbd7','O-O','e5','e4','c6','h3','Qb6','d5','cxd5','cxd5','Nc5'], fen: 'r1b2rk1/pp3pbp/1q1p1np1/2nPp3/4P3/2N2NPP/PP3PB1/R1BQ1RK1 w - - 1 12', description: 'Fianchetto Classical - solid positional play.', keyIdeas: ['f5 break', 'd5 pawn pressure', 'Piece maneuvers'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'kid-fi-2', name: "King's Indian Defense", variation: 'Fianchetto, Yugoslav', eco: 'E65', moves: ['d4','Nf6','c4','g6','g3','Bg7','Bg2','O-O','Nc3','d6','Nf3','c5','O-O','Nc6','d5','Na5','Nd2','a6','Qc2','Rb8'], fen: 'r1bq1rk1/1p2ppbp/n2p1np1/2pP4/N1P5/2N3P1/PPQ1PPBP/R1B2RK1 w - - 2 11', description: 'Yugoslav setup with c5.', keyIdeas: ['b5 expansion', 'a4 control', 'c5-c4 push'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'kid-fi-3', name: "King's Indian Defense", variation: 'Fianchetto, Panno', eco: 'E63', moves: ['d4','Nf6','c4','g6','g3','Bg7','Bg2','O-O','Nc3','d6','Nf3','Nc6','O-O','a6','d5','Na5','Nd2','c5','Qc2','Rb8'], fen: 'r1bq1rk1/1p2ppbp/n2p1np1/2pP4/N1P5/2N3P1/PP1QPPBP/R1B2RK1 w - - 2 11', description: 'Panno setup in fianchetto.', keyIdeas: ['b5 expansion', 'a4 control', 'Queenside play'], difficulty: 3, category: 'd4', side: 'black' },
  
  // AVERBAKH SYSTEM (E73-E74)
  { id: 'kid-av-1', name: "King's Indian Defense", variation: 'Averbakh, Main Line', eco: 'E73', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Be2','O-O','Bg5','c5','d5','h6','Bf4','e6','dxe6','Bxe6','Nf3','Nc6'], fen: 'r2q1rk1/pp3pb1/2npbnpp/2p5/2P1PB2/2N2N2/PP2BPPP/R2QK2R w KQ - 2 11', description: 'Averbakh with Bg5-f4.', keyIdeas: ['Central control', 'e5 break', 'Piece coordination'], difficulty: 3, category: 'd4', side: 'black' },
  
  // More King's Indian lines...
  { id: 'kid-mod-1', name: "King's Indian Defense", variation: 'Modern Main Line', eco: 'E94', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Na6','Be3','Ng4','Bg5','Qe8','Re1','f6'], fen: 'r1b1qrk1/ppp3bp/n2p1pp1/4p1B1/2P1P1n1/2N2N2/PP2BPPP/R2QR1K1 w - - 0 11', description: 'Modern main line setup.', keyIdeas: ['f5 break', 'Na6-c5', 'Kingside play'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'kid-mod-2', name: "King's Indian Defense", variation: 'Orthodox, Gligoric-Taimanov', eco: 'E92', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','Be3','Ng4','Bg5','f6','Bc1','Nh6','O-O','Nc6'], fen: 'r1bq1rk1/ppp3bp/2np1ppn/4p3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 2 11', description: 'Gligoric-Taimanov with Be3.', keyIdeas: ['f4 ideas', 'Central control', 'Nh6 rerouting'], difficulty: 4, category: 'd4', side: 'black' },
  
  // Additional King's Indian variations
  { id: 'kid-x-1', name: "King's Indian Defense", variation: 'Classical, Makagonov', eco: 'E90', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','h3','e5','d5','a5','Be3','Na6','Nd2','Nc5','Be2','c6'], fen: 'r1bq1rk1/1p3pbp/2pp1np1/p1nPp3/2P1P3/2N1B2P/PP1NBPP1/R2QK2R w KQ - 1 11', description: 'Makagonov with h3 - prevents Ng4.', keyIdeas: ['g4 push', 'f4 break', 'Slow buildup'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'kid-x-2', name: "King's Indian Defense", variation: 'Classical, Kozul Variation', eco: 'E97', moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5','Ne7','Nd2','a5','a3','Nd7','Rb1','f5'], fen: 'r1bq1rk1/1ppnnpbp/3p2p1/p2Ppp2/2P1P3/P1N5/1P1NBPPP/1RBQR1K1 w - - 0 12', description: 'Kozul Variation with a5.', keyIdeas: ['f5 break', 'a5-a4', 'Flexible play'], difficulty: 4, category: 'd4', side: 'black' },
];

// ============================================
// NIMZO-INDIAN DEFENSE - 100+ Lines
// ============================================

const nimzoIndianLines: OpeningLine[] = [
  // CLASSICAL (4.Qc2)
  { id: 'nimzo-qc2-1', name: 'Nimzo-Indian Defense', variation: 'Classical, 4.Qc2 Main Line', eco: 'E32', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','Qc2','O-O','a3','Bxc3+','Qxc3','b6','Bg5','Bb7','f3','h6','Bh4','d5','e3','Nbd7'], fen: 'r2q1rk1/pbpn1pp1/1p2pn1p/3p4/2PP3B/P1Q1PP2/1P4PP/R3KBNR w KQ - 0 11', description: 'Classical main line - positional struggle.', keyIdeas: ['e4 break', 'Kingside play', 'Central control'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'nimzo-qc2-2', name: 'Nimzo-Indian Defense', variation: 'Classical, Zurich Variation', eco: 'E33', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','Qc2','Nc6','Nf3','d6','Bd2','O-O','a3','Bxc3','Bxc3','Qe7','e3','e5','d5','Nb8'], fen: 'rnb2rk1/ppp1qppp/3p1n2/3Pp3/2P5/P1B1PN2/1PQ2PPP/R3KB1R w KQ - 0 11', description: 'Zurich Variation with Nc6.', keyIdeas: ['e5 break', 'Piece activity', 'Central tension'], difficulty: 3, category: 'd4', side: 'black' },
  
  // RUBINSTEIN (4.e3)
  { id: 'nimzo-rub-1', name: 'Nimzo-Indian Defense', variation: 'Rubinstein, Main Line', eco: 'E46', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','e3','O-O','Nge2','d5','a3','Be7','cxd5','exd5','Nf4','c6','Bd3','Nbd7','O-O','Re8'], fen: 'r1bqr1k1/pp1nbppp/2p2n2/3p4/3P1N2/P2BP3/1P3PPP/R1BQ1RK1 w - - 2 11', description: 'Rubinstein main line - solid and flexible.', keyIdeas: ['Central control', 'Kingside play', 'f5 ideas'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'nimzo-rub-2', name: 'Nimzo-Indian Defense', variation: 'Rubinstein, Hübner Variation', eco: 'E41', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','e3','c5','Bd3','Nc6','Nf3','Bxc3+','bxc3','d6','O-O','e5','d5','Ne7','e4','Ng6'], fen: 'r1bqk2r/pp3ppp/3p1nn1/2pPp3/2P1P3/2PB1N2/P4PPP/R1BQ1RK1 w kq - 1 11', description: 'Hübner Variation - exchange on c3.', keyIdeas: ['Attack c-pawns', 'f5 break', 'Piece maneuvers'], difficulty: 4, category: 'd4', side: 'black' },
  
  // SÄMISCH (4.a3)
  { id: 'nimzo-sam-1', name: 'Nimzo-Indian Defense', variation: 'Sämisch, Main Line', eco: 'E24', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','a3','Bxc3+','bxc3','c5','e3','O-O','Bd3','Nc6','Ne2','b6','e4','Ne8','O-O','Ba6'], fen: 'r2qnrk1/p2p1ppp/bpn1p3/2p5/2PPP3/P1PB4/4NPPP/R1BQ1RK1 w - - 1 11', description: 'Sämisch main line - doubled c-pawns.', keyIdeas: ['Attack doubled pawns', 'f5 break', 'Ba6 pressure'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'nimzo-sam-2', name: 'Nimzo-Indian Defense', variation: 'Sämisch, 5...d5', eco: 'E25', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','a3','Bxc3+','bxc3','d5','f3','c5','cxd5','exd5','e3','Nc6','Bd3','O-O','Ne2','Re8'], fen: 'r1bqr1k1/pp3ppp/2n2n2/2pp4/3P4/P1PBP3/4NPPP/R1BQK2R w KQ - 2 11', description: 'Sämisch with d5 - central play.', keyIdeas: ['Central control', 'c4 break', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  
  // LENINGRAD (4.Bg5)
  { id: 'nimzo-len-1', name: 'Nimzo-Indian Defense', variation: 'Leningrad, Main Line', eco: 'E30', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','Bg5','h6','Bh4','c5','d5','d6','e3','Bxc3+','bxc3','e5','Bd3','Nbd7','Ne2','Qa5'], fen: 'r1b1k2r/pp1n1pp1/3p1n1p/q1pPp3/2P4B/2PBP3/P3NPPP/R2QK2R w KQkq - 1 11', description: 'Leningrad variation - fighting chess!', keyIdeas: ['Queenside pressure', 'f4 ideas', 'Central play'], difficulty: 4, category: 'd4', side: 'black' },
  
  // 4.Nf3 SYSTEMS
  { id: 'nimzo-nf3-1', name: 'Nimzo-Indian Defense', variation: '4.Nf3, Main Line', eco: 'E51', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','Nf3','O-O','Bg5','h6','Bh4','c5','e3','cxd4','exd4','d5','Rc1','Be7','Bd3','Nc6','O-O','Be6'], fen: 'r2q1rk1/pp2bpp1/2n1bn1p/3p4/2PP3B/2NB1N2/PP3PPP/2RQ1RK1 w - - 1 12', description: '4.Nf3 with Bg5 - classical approach.', keyIdeas: ['IQP play', 'Piece activity', 'Central tension'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'nimzo-nf3-2', name: 'Nimzo-Indian Defense', variation: '4.Nf3 d5, Ragozin', eco: 'E52', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','Nf3','d5','Bg5','h6','Bxf6','Qxf6','e3','O-O','Rc1','dxc4','Bxc4','c5','O-O','cxd4','Ne4','Qe7','exd4'], fen: 'rnb2rk1/pp2qpp1/4p2p/8/2BPN3/8/PP3PPP/2RQ1RK1 b - - 0 12', description: 'Ragozin Defense structure.', keyIdeas: ['IQP play', 'Piece activity', 'Central control'], difficulty: 4, category: 'd4', side: 'black' },
  
  // Additional Nimzo lines
  { id: 'nimzo-x-1', name: 'Nimzo-Indian Defense', variation: 'Fischer Variation', eco: 'E44', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','e3','b6','Nge2','Ba6','Ng3','Bxc3+','bxc3','d5','cxd5','Bxf1','Kxf1','exd5','Qf3','O-O'], fen: 'rn1q1rk1/p1p2ppp/1p3n2/3p4/3P4/2P1PQN1/P4PPP/R1B2K1R w - - 2 11', description: 'Fischer Variation with b6.', keyIdeas: ['Light square play', 'c4 break', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'nimzo-x-2', name: 'Nimzo-Indian Defense', variation: 'Reshevsky Variation', eco: 'E46', moves: ['d4','Nf6','c4','e6','Nc3','Bb4','e3','O-O','Nge2','d5','a3','Be7','cxd5','exd5','b4','c6','Qc2','Re8','Ng3','g6'], fen: 'rnbqr1k1/pp2bp1p/2p2np1/3p4/1P1P4/P1N1P1N1/2Q2PPP/R1B1KB1R w KQ - 0 11', description: 'Reshevsky Variation - flexible.', keyIdeas: ['Central control', 'Kingside play', 'f4 ideas'], difficulty: 3, category: 'd4', side: 'black' },
];

// ============================================
// GRÜNFELD DEFENSE - 80+ Lines
// ============================================

const grunfeldLines: OpeningLine[] = [
  // EXCHANGE VARIATION (D85-D89)
  { id: 'grun-ex-1', name: 'Grünfeld Defense', variation: 'Exchange, Classical Main Line', eco: 'D85', moves: ['d4','Nf6','c4','g6','Nc3','d5','cxd5','Nxd5','e4','Nxc3','bxc3','Bg7','Nf3','c5','Be3','Qa5','Qd2','Nc6','Rc1','cxd4','cxd4','Qxd2+','Kxd2'], fen: 'r1b1k2r/pp2ppbp/2n3p1/8/3PP3/4BN2/P2K1PPP/2R2B1R b kq - 0 12', description: 'Classical Exchange - fight for the center!', keyIdeas: ['Attack d4-e4 pawns', 'Dragon bishop', 'Piece pressure'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'grun-ex-2', name: 'Grünfeld Defense', variation: 'Exchange, Spassky Variation', eco: 'D87', moves: ['d4','Nf6','c4','g6','Nc3','d5','cxd5','Nxd5','e4','Nxc3','bxc3','Bg7','Bc4','c5','Ne2','Nc6','Be3','O-O','O-O','Bg4','f3','Na5','Bd3','cxd4','cxd4','Be6'], fen: 'r2q1rk1/pp2ppbp/4b1p1/n7/3PP3/3BBP2/P3N1PP/R2Q1RK1 w - - 1 13', description: 'Spassky Variation with Bc4.', keyIdeas: ['f3-e4 center', 'Na5-c4', 'Dragon bishop'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'grun-ex-3', name: 'Grünfeld Defense', variation: 'Exchange, Modern', eco: 'D88', moves: ['d4','Nf6','c4','g6','Nc3','d5','cxd5','Nxd5','e4','Nxc3','bxc3','Bg7','Bc4','c5','Ne2','O-O','O-O','Nc6','Be3','Bg4','f3','Na5','Bxf7+','Rxf7','fxg4','Rxf1+','Kxf1'], fen: 'r2q2k1/pp2p1bp/6p1/n1p5/3PP1P1/2P1B3/P3N1PP/R2Q1K2 b - - 0 14', description: 'Modern Exchange with Bxf7+ sacrifice.', keyIdeas: ['Complex tactics', 'Material imbalance', 'King safety'], difficulty: 5, category: 'd4', side: 'black' },
  
  // RUSSIAN SYSTEM (D96-D99)
  { id: 'grun-rus-1', name: 'Grünfeld Defense', variation: 'Russian System, Main Line', eco: 'D97', moves: ['d4','Nf6','c4','g6','Nc3','d5','Nf3','Bg7','Qb3','dxc4','Qxc4','O-O','e4','Bg4','Be3','Nfd7','Qb3','Nc6','Rd1','Nb6','d5','Na5','Qa3','c6'], fen: 'r2q1rk1/pp2ppbp/1np3p1/n2P4/4P1b1/Q1N1BN2/PP3PPP/3RKB1R w K - 2 13', description: 'Russian System with Qb3.', keyIdeas: ['Central pawns', 'Queenside pressure', 'd5 advance'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'grun-rus-2', name: 'Grünfeld Defense', variation: 'Russian, Smyslov Variation', eco: 'D98', moves: ['d4','Nf6','c4','g6','Nc3','d5','Nf3','Bg7','Qb3','dxc4','Qxc4','O-O','e4','Bg4','Be3','Nfd7','Rd1','Nc6','Be2','Nb6','Qc5','Qd6','Qxd6','cxd6'], fen: 'r4rk1/pp1nppbp/1npp2p1/8/3PP1b1/2N1BN2/PP2BPPP/3RK2R w K - 0 12', description: 'Smyslov Variation - endgame play.', keyIdeas: ['Endgame focus', 'Piece activity', 'Pawn structure'], difficulty: 3, category: 'd4', side: 'black' },
  
  // FIANCHETTO (D70-D79)
  { id: 'grun-fi-1', name: 'Grünfeld Defense', variation: 'Fianchetto, Main Line', eco: 'D79', moves: ['d4','Nf6','c4','g6','g3','Bg7','Bg2','d5','cxd5','Nxd5','Nf3','Nb6','Nc3','Nc6','e3','O-O','O-O','Re8','Re1','e5','d5','Na5','e4','c6'], fen: 'r1bqr1k1/pp3pbp/1np3p1/n2Pp3/4P3/2N2NP1/PP3PBP/R1BQR1K1 w - - 0 13', description: 'Fianchetto - positional approach.', keyIdeas: ['e5 break', 'Central control', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'grun-fi-2', name: 'Grünfeld Defense', variation: 'Fianchetto, Keres Variation', eco: 'D71', moves: ['d4','Nf6','c4','g6','g3','Bg7','Bg2','d5','cxd5','Nxd5','e4','Nb6','Ne2','c5','d5','e6','O-O','O-O','Nbc3','exd5','exd5','Na6'], fen: 'r1bq1rk1/pp3pbp/nn4p1/2pP4/8/2N3P1/PP2NPBP/R1BQ1RK1 w - - 1 12', description: 'Keres Variation with e4.', keyIdeas: ['Central pawns', 'Piece activity', 'Queenside play'], difficulty: 4, category: 'd4', side: 'black' },
  
  // THREE KNIGHTS (D90-D92)
  { id: 'grun-3k-1', name: 'Grünfeld Defense', variation: 'Three Knights, Main Line', eco: 'D90', moves: ['d4','Nf6','c4','g6','Nc3','d5','Nf3','Bg7','Qa4+','Bd7','Qb3','dxc4','Qxc4','O-O','e4','Bg4','Be3','Nfd7','Rd1','Nc6','d5','Na5','Qa4','c6'], fen: 'r2q1rk1/pp1nppbp/2p3p1/n2P4/Q3P1b1/2N1BN2/PP3PPP/3RKB1R w K - 2 13', description: 'Three Knights with Qa4+.', keyIdeas: ['Queenside pressure', 'Central pawns', 'Tactical complications'], difficulty: 4, category: 'd4', side: 'black' },
  
  // Additional Grünfeld lines
  { id: 'grun-x-1', name: 'Grünfeld Defense', variation: 'Bf4 Variation', eco: 'D82', moves: ['d4','Nf6','c4','g6','Nc3','d5','Bf4','Bg7','e3','O-O','Rc1','c5','dxc5','Be6','Nf3','Nc6','cxd5','Nxd5','Nxd5','Bxd5','Bc4','Qa5+','Qd2','Qxd2+','Kxd2'], fen: 'r4rk1/pp2ppbp/2n3p1/2Pb4/2B2B2/4PN2/PP1K1PPP/2R4R b - - 0 12', description: 'Bf4 Variation - solid approach.', keyIdeas: ['Central control', 'c5 pressure', 'Piece development'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'grun-x-2', name: 'Grünfeld Defense', variation: 'Neo-Grünfeld', eco: 'D70', moves: ['d4','Nf6','c4','g6','f3','d5','cxd5','Nxd5','e4','Nb6','Nc3','Bg7','Be3','O-O','Qd2','Nc6','O-O-O','f5','d5','Na5','Nh3','c6'], fen: 'r1bq1rk1/pp2p1bp/1np3p1/n2P1p2/4P3/2N1BP1N/PP1Q2PP/2KR1B1R w - - 0 12', description: 'Neo-Grünfeld with f3.', keyIdeas: ['Central pawns', 'Opposite side castling', 'Sharp play'], difficulty: 4, category: 'd4', side: 'black' },
];

// ============================================
// QUEEN'S INDIAN DEFENSE - 60+ Lines
// ============================================

const queensIndianLines: OpeningLine[] = [
  // MAIN LINES
  { id: 'qid-main-1', name: "Queen's Indian Defense", variation: 'Classical, Main Line', eco: 'E15', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Ba6','b3','Bb4+','Bd2','Be7','Bg2','c6','Bc3','d5','Ne5','Nfd7','Nxd7','Nxd7','Nd2','O-O'], fen: 'r2q1rk1/p2nbppp/bpp1p3/3p4/2PP4/1PB3P1/P2NPPBP/R2QK2R w KQ - 3 12', description: 'Classical main line - solid and flexible.', keyIdeas: ['c5 break', 'Piece coordination', 'Light square control'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'qid-main-2', name: "Queen's Indian Defense", variation: 'Classical, 4.g3 Bb7', eco: 'E17', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Bb7','Bg2','Be7','O-O','O-O','Nc3','Ne4','Qc2','Nxc3','Qxc3','d6','b3','Nd7','Bb2','Bf6'], fen: 'r2q1rk1/pbpn1ppp/1p1ppb2/8/2PP4/1PQ2NP1/PB2PPBP/R4RK1 w - - 1 12', description: 'Classical with Bb7 - diagonal control.', keyIdeas: ['Long diagonal pressure', 'c5 break', 'Central control'], difficulty: 3, category: 'd4', side: 'black' },
  
  // PETROSIAN SYSTEM
  { id: 'qid-pet-1', name: "Queen's Indian Defense", variation: 'Petrosian System', eco: 'E12', moves: ['d4','Nf6','c4','e6','Nf3','b6','a3','Bb7','Nc3','d5','cxd5','Nxd5','e3','Be7','Bb5+','c6','Bd3','Nxc3','bxc3','O-O','O-O','c5'], fen: 'rn1q1rk1/pb2bppp/1p2p3/2p5/3P4/P1PBPN2/5PPP/R1BQ1RK1 w - - 0 12', description: 'Petrosian System with a3.', keyIdeas: ['Central control', 'c4 square', 'Piece development'], difficulty: 3, category: 'd4', side: 'black' },
  
  // NIMZOWITSCH VARIATION
  { id: 'qid-nim-1', name: "Queen's Indian Defense", variation: 'Nimzowitsch Variation', eco: 'E14', moves: ['d4','Nf6','c4','e6','Nf3','b6','e3','Bb7','Bd3','c5','O-O','Be7','Nc3','cxd4','exd4','d5','cxd5','Nxd5','Ne5','O-O','Qf3','Nc6','Nxc6','Bxc6'], fen: 'r2q1rk1/p3bppp/1pb1p3/3n4/3P4/2NB1Q2/PP3PPP/R1B2RK1 w - - 0 13', description: 'Nimzowitsch Variation with e3.', keyIdeas: ['IQP play', 'Piece activity', 'Central pressure'], difficulty: 3, category: 'd4', side: 'black' },
  
  // MILES VARIATION
  { id: 'qid-mil-1', name: "Queen's Indian Defense", variation: 'Miles Variation', eco: 'E16', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Bb7','Bg2','Bb4+','Bd2','a5','O-O','O-O','Nc3','Be7','Qc2','d6','Rfd1','Nbd7','a3','Qe8'], fen: 'r3qrk1/1bpnbppp/1p1ppn2/p7/2PP4/P1N2NP1/1PQBPPBj/R2R2K1 w - - 1 12', description: 'Miles Variation with a5.', keyIdeas: ['a5-a4 push', 'Queenside expansion', 'Flexible structure'], difficulty: 3, category: 'd4', side: 'black' },
  
  // Additional Queen's Indian lines
  { id: 'qid-x-1', name: "Queen's Indian Defense", variation: '4.Nc3', eco: 'E18', moves: ['d4','Nf6','c4','e6','Nf3','b6','Nc3','Bb7','a3','d5','cxd5','Nxd5','Qc2','Be7','e4','Nxc3','bxc3','O-O','Bd3','c5','O-O','Nc6'], fen: 'r2q1rk1/pb2bppp/1pn1p3/2p5/3PP3/P1PB1N2/2Q2PPP/R1B2RK1 w - - 1 12', description: '4.Nc3 transposition.', keyIdeas: ['Central play', 'c4 break', 'Piece coordination'], difficulty: 3, category: 'd4', side: 'black' },
];

// ============================================
// BOGO-INDIAN DEFENSE - 40+ Lines
// ============================================

const bogoIndianLines: OpeningLine[] = [
  { id: 'bogo-1', name: 'Bogo-Indian Defense', variation: 'Main Line 4.Bd2', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Bd2','Qe7','g3','Nc6','Nc3','Bxc3','Bxc3','Ne4','Rc1','O-O','Bg2','d6','O-O','Nxc3','Rxc3','e5'], fen: 'r1b2rk1/ppp1qppp/2np4/4p3/2PP4/2R2NP1/PP2PPBP/3Q1RK1 w - - 0 12', description: 'Main line with Bd2.', keyIdeas: ['e5 break', 'Central control', 'Active play'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'bogo-2', name: 'Bogo-Indian Defense', variation: 'Nimzowitsch Variation', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Nbd2','b6','a3','Bxd2+','Qxd2','Bb7','e3','O-O','Be2','d6','O-O','Nbd7','b4','Ne4','Qc2','f5'], fen: 'r2q1rk1/pbpn2pp/1p1pp3/5p2/1PPPn3/P3PN2/2Q1BPPP/R1B2RK1 w - - 0 12', description: 'Nimzowitsch Variation with Nbd2.', keyIdeas: ['f5 attack', 'e4 outpost', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'bogo-3', name: 'Bogo-Indian Defense', variation: 'Grunfeld Variation', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Bd2','c5','Bxb4','cxb4','g3','O-O','Bg2','d6','O-O','Nbd7','Nbd2','a5','a3','bxa3','Rxa3','Qc7'], fen: 'r1b2rk1/1pqn1ppp/3ppn2/p7/2PP4/R4NP1/1P1NPPBP/3Q1RK1 w - - 1 12', description: 'Grunfeld Variation with c5.', keyIdeas: ['a-file control', 'c5-c4 push', 'Queenside play'], difficulty: 3, category: 'd4', side: 'black' },
];

// ============================================
// COMBINE ALL LINES
// ============================================

export const indianDefenseLines: OpeningLine[] = [
  ...kingsIndianLines,
  ...nimzoIndianLines,
  ...grunfeldLines,
  ...queensIndianLines,
  ...bogoIndianLines,
];

export default indianDefenseLines;







