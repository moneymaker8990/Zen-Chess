import { Chess } from 'chess.js';

// Correct PGN for Euwe vs Alekhine 1935 World Championship Game 2
// Queen's Gambit Declined: Semi-Tarrasch Defense - Euwe wins
const pgnMoves = `d4 d5 c4 e6 Nc3 c5 cxd5 exd5 Nf3 Nc6 g3 Nf6 Bg2 Be7 O-O O-O Bg5 cxd4 Nxd4 h6 Be3 Re8 Rc1 Bf8 h3 Ne5 b3 Ba3 Rc2 a6 Bc1 Bf8 Bb2 Bd7 e3 Rc8 Nce2 Rxc2 Qxc2 Qc8 Qxc8 Rxc8 Nf4 Nc6 Nxc6 bxc6 Bxf6 gxf6 Rc1 Bd6 Nd3 Kf8 Nc5 Bxc5 Rxc5 Ke7 Kf1 Kd6 b4 Rb8 a3 Rb5 Rxb5 axb5 Ke2 c5 Kd2 c4 Kc3 Bf5 Kd4 Be6 g4 f5 gxf5 Bxf5 Bxd5 Bxh3 Bxf7 Bd7 e4`.split(' ');

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




