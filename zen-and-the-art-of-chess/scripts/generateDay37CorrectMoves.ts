import { Chess } from 'chess.js';

// Correct PGN from pgnmentor-pgns/Alekhine.pgn - Bogoljubov vs Alekhine 1922 Hastings
// This is a Dutch Defense (ECO A90), not Queen's Gambit Declined
const pgnMoves = `d4 f5 c4 Nf6 g3 e6 Bg2 Bb4+ Bd2 Bxd2+ Nxd2 Nc6 Ngf3 O-O O-O d6 Qb3 Kh8 Qc3 e5 e3 a5 b3 Qe8 a3 Qh5 h4 Ng4 Ng5 Bd7 f3 Nf6 f4 e4 Rfd1 h6 Nh3 d5 Nf1 Ne7 a4 Nc6 Rd2 Nb4 Bh1 Qe8 Rg2 dxc4 bxc4 Bxa4 Nf2 Bd7 Nd2 b5 Nd1 Nd3 Rxa5 b4 Rxa8 bxc3 Rxe8 c2 Rxf8+ Kh7 Nf2 c1=Q+ Nf1 Ne1 Rh2 Qxc4 Rb8 Bb5 Rxb5 Qxb5 g4 Nf3+ Bxf3 exf3 gxf5 Qe2 d5 Kg8 h5 Kh7 e4 Nxe4 Nxe4 Qxe4 d6 cxd6 f6 gxf6 Rd2 Qe2 Rxe2 fxe2 Kf2 exf1=Q+ Kxf1 Kg7 Kf2 Kf7 Ke3 Ke6 Ke4 d5+`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

for (const m of pgnMoves) {
  const r = chess.move(m);
  if (r) {
    moves.push({ move: r.san, fen: chess.fen() });
  } else {
    console.error(`Invalid move: ${m} at position ${moves.length + 1}`);
    console.error(`Current FEN: ${chess.fen()}`);
    console.error(`Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
    break;
  }
}

console.log(`Generated ${moves.length} moves from PGN\n`);
moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) parts.push(`evaluation: '0-1'`);
  console.log(`      ${parts.join(', ')},`);
});


