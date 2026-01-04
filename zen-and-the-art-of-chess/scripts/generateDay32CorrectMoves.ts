import { Chess } from 'chess.js';

// Correct PGN from web search - Rubinstein vs Salwe 1908 (Tarrasch Defense, Prague Variation)
// This is the "Rubinstein's Rook" game with result 1-0
const pgnMoves = `d4 d5 Nf3 c5 c4 e6 cxd5 exd5 Nc3 Nf6 g3 Nc6 Bg2 cxd4 Nxd4 Qb6 Nxc6 bxc6 O-O Be7 Na4 Qb5 Be3 O-O Rc1 Bg4 f3 Be6 Bc5 Rfe8 Rf2 Nd7 Bxe7 Rxe7 Qd4 Ree8 Bf1 Rec8 e3 Qb7 Nc5 Nxc5 Rxc5 Rc7 Rfc2 Qb6 b4 a6 Ra5 Rb8 a3 Ra7 Rxc6 Qxc6 Qxa7 Ra8 Qc5 Qb7 Kf2 h5 Be2 g6 Qd6 Qc8 Rc5 Qb7 h4 a5 Rc7 Qb8 b5 a4 b6 Ra5 b7`.split(' ');

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

console.log(`Generated ${moves.length} moves from PGN\n`);
moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) parts.push(`evaluation: '1-0'`);
  console.log(`      ${parts.join(', ')},`);
});


