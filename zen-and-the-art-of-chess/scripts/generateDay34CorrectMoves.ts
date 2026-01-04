import { Chess } from 'chess.js';

// Correct PGN for Rubinstein vs Lasker 1909 St Petersburg
// Queen's Gambit Declined, Rubinstein wins (1-0)
// Source: Lasker's annotations from St. Petersburg 1909 tournament book
const pgnMoves = `d4 d5 Nf3 Nf6 c4 e6 Bg5 c5 cxd5 exd5 Nc3 cxd4 Nxd4 Nc6 e3 Be7 Bb5 Bd7 Bxf6 Bxf6 Nxd5 Bxd4 exd4 Qg5 Bxc6 Bxc6 Ne3 O-O-O O-O Rhe8 Rc1 Rxe3 Rxc6+ bxc6 Qc1 Rxd4 fxe3 Rd7 Qxc6+ Kd8 Rf4 f5 Qc5 Qe7 Qxe7+ Kxe7 Rxf5 Rd1+ Kf2 Rd2+ Kf3 Rxb2 Ra5 Rb7 Ra6 Kf8 e4 Rc7 h4 Kf7 g4 Kf8 Kf4 Ke7 h5 h6 Kf5 Kf7 e5 Rb7 Rd6 Ke7 Ra6 Kf7 Rd6 Kf8 Rc6 Kf7 a3`.split(' ');

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
  if (i === moves.length - 1) parts.push(`evaluation: '1-0'`);
  console.log(`      ${parts.join(', ')},`);
});
