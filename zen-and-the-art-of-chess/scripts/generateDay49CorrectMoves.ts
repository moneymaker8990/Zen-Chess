import { Chess } from 'chess.js';

// Correct PGN for Euwe vs Keres 1940 Amsterdam Game 9
// Queen's Indian Defense - Keres wins with brilliant queen sacrifice on move 23
// This is the famous queen sacrifice game: Euwe (White) vs Keres (Black), Keres wins
const pgnMoves = `d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 d6 Qc2 f5 Ne1 Qc8 e4 Nd7 d5 fxe4 Qxe4 Nc5 Qe2 Bf6 Bh3 Re8 Be3 Qd8 Bxc5 exd5 Be6+ Kh8 Rd1 dxc5 Ng2 d4 f4 d3 Rxd3 Qxd3 Qxd3 Bd4+ Rf2 Rxe6 Kf1 Rae8 f5 Re5 f6 gxf6 Rd2 Bc8 Nf4 Re3 Qb1 Rf3+ Kg2 Rxf4 gxf4 Rg8+ Kf3 Bg4+`.split(' ');

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
      parts.push(`evaluation: '0-1'`);
    }
  }
  console.log(`      ${parts.join(', ')},`);
});




