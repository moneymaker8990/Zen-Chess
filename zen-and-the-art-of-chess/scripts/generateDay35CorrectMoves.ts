import { Chess } from 'chess.js';

// Correct PGN from web search - Nimzowitsch vs Tarrasch 1914 St Petersburg
// Result: 0-1 (Tarrasch won)
const pgnMoves = `d4 d5 Nf3 c5 c4 e6 e3 Nf6 Bd3 Nc6 O-O Bd6 b3 O-O Bb2 b6 Nbd2 Bb7 Rc1 Qe7 cxd5 exd5 Nh4 g6 Nhf3 Rad8 dxc5 bxc5 Bb5 Ne4 Bxc6 Bxc6 Qc2 Nxd2 Nxd2 d4 exd4 Bxh2+ Kxh2 Qh4+ Kg1 Bxg2 f3 Rfe8 Ne4 Qh1+ Kf2 Bxf1 d5 f5 Qc3 Qg2+ Ke3 Rxe4+ fxe4 f4+ Kxf4 Rf8+ Ke5 Qh2+ Ke6 Re8+ Kd7 Bb5#`.split(' ');

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


