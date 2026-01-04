import { Chess } from 'chess.js';

// Correct PGN for Smyslov vs Reshevsky 1948 World Championship Round 11
// Ruy Lopez: Modern Steinitz Defense, Rubinstein Variation - Smyslov wins
const pgnMoves = `e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Nge7 d4 Bd7 Bb3 h6 Nbd2 Ng6 Nc4 Be7 O-O O-O Ne3 Bf6 Nd5 Re8 dxe5 Bxe5 Nxe5 dxe5 Qf3 Be6 Rd1 Bxd5 Rxd5 Qe7 Qf5 Nf8 Be3 Ne6 Rad1 Red8 g3 Rd6 Rxd6 cxd6 Qg4 Kh8 Bb6 Nb8 Bxe6 fxe6 Qh4 Qd7 Qd8+ Qxd8 Bxd8 Nd7 Bc7 Rc8 Bxd6 Rc4 f3 Rc6 Kf2 Kg8 Ke3 Kf7 Rd3 Ke8 b3 b5 Ba3 a5 Rd6 Rxd6 Bxd6 Kf7 c4 bxc4 bxc4 Ke8 c5 Kd8 c6 Nb6 Bxe5 g6 Kd4 Na4 Kc4 Kc8 Kb5 Nb2 Bxb2 Kc7 Be5+ Kc8 Kb6 a4 a3 h5 h4 g5 hxg5 h4 gxh4 Kd8 h5 Ke8 h6 Kf7 h7 Kg6 h8=Q Kxg5 Qf6+ Kh5 Qg7 Kh4 Qg4#`.split(' ');

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



