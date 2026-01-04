import { Chess } from 'chess.js';

// Correct PGN from web search - Tal vs Larsen 1965 Candidates Semifinal Game 10
const pgnMoves = `e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e6 Nc3 d6 Be3 Nf6 f4 Be7 Qf3 O-O O-O-O Qc7 Ndb5 Qb8 g4 a6 Nd4 Nxd4 Bxd4 b5 g5 Nd7 Bd3 b4 Nd5 exd5 exd5 f5 Rde1 Rf7 h4 Bb7 Bxf5 Rxf5 Rxe7 Ne5 Qe4 Qf8 fxe5 Rf4 Qe3 Rf3 Qe2 Qxe7 Qxf3 dxe5 Re1 Rd8 Rxe5 Qd6 Qf4 Rf8 Qe4 b3 axb3 Rf1+ Kd2 Qb4+ c3 Qd6 Bc5 Qxc5 Re8+ Rf8 Qe6+ Kh8 Qf7`.split(' ');

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


