import { Chess } from 'chess.js';

// Correct PGN for Grünfeld vs Alekhine 1923 Carlsbad
// This is a Grünfeld Defense (ECO D70)
const pgnMoves = `d4 Nf6 c4 g6 Nc3 d5 Bg5 Ne4 cxd5 Nxc3 bxc3 Qxd5 Nf3 Bg7 e3 c5 Bb5+ Bd7 c4 Qe4 O-O Bxb5 cxb5 Nd7 Rc1 b6 Qb3 h6 Bh4 O-O Rc4 Qe6 Rd1 Rfe8 d5 Qd6 Bg3 e5 dxe6 Qxe6 Rd6 Qe7 Ra4 Nf8 Qd5 Rad8 Nd2 Rxd6 Bxd6 Rd8 Nc4 Qd7 h3 Ne6 Qe4 Bf8 Bxf8 Qd1+ Kh2 Qxa4 Be7 Re8 Bf6 Ng7 Qd3 Qxa2 Bb2 Re6 Qc3 f6 Qd3 h5 e4 Qa4 Nd6 Qb4 Nc4 Qxb5 f4 Qc6 e5 f5 Nd6 Re7 Qg3 Kh7 Qg5 Qd7 Qg3 Ne6 Qf3 b5 Qa8 Qd8 Qd5 b4 g3 a5 Qc6 Qd7 Qa6 a4 Ba1 a3 Qc4 Qc6 Kg1 Qf3 Kh2 Qf2+`.split(' ');

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

