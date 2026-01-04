import { Chess } from 'chess.js';

// Correct PGN from web search - Karpov vs Kasparov 1985 Game 24
const pgnMoves = `e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 O-O Be7 Be3 O-O f4 a6 a4 Qc7 Kh1 Re8 Bf3 Rb8 Qe1 Bd7 Qg3 Nxd4 Bxd4 Bc6 Rae1 b5 axb5 axb5 e5 dxe5 Bxe5 Qb7 Bxb8 Rxb8 f5 exf5 Bxc6 Qxc6 Qxb8+ Bf8 Rxf5 b4 Nd1 Qxc2 Rff1 h6 Qg3 Ne4 Qf3 Nd2 Qxf7+ Kh7 Qxf8 Nxf1 Qxf1 b3 Qe2 Qc1 Nc3 Qc2 Qxc2+ bxc2 Rc1 Kg6 Rxc2 Kf5 Re2 g5 b4 h5 b5 h4 b6 h3 gxh3 g4 hxg4+ Kxg4`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

for (const m of pgnMoves) {
  const r = chess.move(m);
  if (r) {
    moves.push({ move: r.san, fen: chess.fen() });
  } else {
    console.error(`Invalid move: ${m}`);
    break;
  }
}

moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) parts.push(`evaluation: '0-1'`);
  console.log(`      ${parts.join(', ')},`);
});


