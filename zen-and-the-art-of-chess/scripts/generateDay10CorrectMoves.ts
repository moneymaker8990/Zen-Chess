import { Chess } from 'chess.js';

// Correct PGN from web search - Capablanca vs Tartakower 1924
const pgnMoves = `d4 e6 Nf3 f5 c4 Nf6 Bg5 Be7 Nc3 O-O e3 b6 Bd3 Bb7 O-O Qe8 Qe2 Ne4 Bxe7 Nxc3 bxc3 Qxe7 a4 Bxf3 Qxf3 Nc6 Rfb1 Rae8 Qh3 Rf6 f4 Na5 Qf3 d6 Re1 Qd7 e4 fxe4 Qxe4 g6 g3 Kf8 Kg2 Rf7 h4 d5 cxd5 exd5 Qxe8+ Qxe8 Rxe8+ Kxe8 h5 Rf6 hxg6 hxg6 Rh1 Kf8 Rh7 Rc6 g4 Nc4 g5 Ne3+ Kf3 Nf5 Bxf5 gxf5 Kg3 Rxc3+ Kh4 Rf3 g6 Rxf4+ Kg5 Re4 Kf6 Kg8 Rg7+ Kh8 Rxc7 Re8 Kxf5 Re4 Kf6 Rf4+ Ke5 Rg4 g7+ Kg8 Rxa7 Rg1 Kxd5 Rc1 Kd6 Rc2 d5 Rc1 Rc7 Ra1 Kc6 Rxa4 d6`.split(' ');

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
  if (i === moves.length - 1) parts.push(`evaluation: '1-0'`);
  console.log(`      ${parts.join(', ')},`);
});


