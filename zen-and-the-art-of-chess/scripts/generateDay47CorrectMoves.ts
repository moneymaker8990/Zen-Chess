import { Chess } from 'chess.js';

// Correct PGN for Botvinnik vs Flohr 1933 Leningrad Game 9
// Caro-Kann Defense: Panov-Botvinnik Attack - Botvinnik wins
const pgnMoves = `e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 Nc6 Bg5 dxc4 d5 Ne5 Qd4 Nd3+ Bxd3 cxd3 Nf3 g6 Bxf6 exf6 O-O Qb6 Rfe1+ Kd8 Qh4 g5 Qh5 Bd6 Qxf7 Rf8 Qxh7 g4 Nd2 Qc7 Qh6 Qf7 Nc4 Be5 Nxe5 fxe5 Qg5+ Qe7 Qxe5 Qxe5 Rxe5 Bf5 Rd1 Kd7 f3 b5 fxg4 Bxg4 h3 b4 Ne4 Rf1+ Kxf1 Rf8+ Ke1 Bf5 g4 Bg6 Re6`.split(' ');

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




