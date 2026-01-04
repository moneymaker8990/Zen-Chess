import { Chess } from 'chess.js';

// Correct PGN for Reshevsky vs Fine 1938 U.S. Championship
// Ruy Lopez - Reshevsky wins with a brilliant attack
// Note: Metadata says AVRO but this is actually from U.S. Championship
const pgnMoves = `e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Nb8 d4 Nbd7 Nbd2 Bb7 Bc2 Re8 Nf1 Bf8 Ng3 g6 a4 Bg7 Bd3 c6 Bg5 h6 Be3 Qc7 Qd2 Kh7 Nh2 d5 exd5 Nxd5 Ng4 Nxe3 Rxe3 exd4 cxd4 Rxe3 Qxe3 Nb6 Nh5 Nd5 Qd2 Bf8 Be4 f5 Bxd5 fxg4 Nf6+ Kg7 Nxg4 g5 Be4 Re8 Bc2 Qf4 Qd3 Kf7 Qg6+ Ke7 Re1+ Kd8 Rxe8+ Kc7 Qh7+ Kb6 a5+ Kxa5 Qxb7 Qc1+ Kh2 Bd6+ g3 Qxc2 Ra8 Kb4 Rxa6 h5 Qf7 hxg4 hxg4 Qe4 Ra3 Qxd4 Qb3+ Kc5 Qc2+ Kb6 Rd3 Qe5 Qd2 Bc5 b4 Be7 Re3 Qf6 Qe2 Bxb4 Re6 Qd4 Qf3 Qd5 Qxd5 Ka5 Qxc6 Ka4 Re3 Bc3 Rxc3 Kb4 Qc5+ Ka5 Ra3#`.split(' ');

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
console.log(`Final position: ${chess.fen()}`);
console.log(`Is checkmate: ${chess.isCheckmate()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}\n`);

moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) {
    if (chess.isCheckmate()) {
      parts.push(`evaluation: '${chess.turn() === 'w' ? '0-1' : '1-0'}'`);
    } else {
      parts.push(`evaluation: '1-0'`);
    }
  }
  console.log(`      ${parts.join(', ')},`);
});




