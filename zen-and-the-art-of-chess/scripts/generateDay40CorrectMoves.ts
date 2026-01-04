import { Chess } from 'chess.js';

// Correct PGN for Sämisch vs Nimzowitsch 1923 Copenhagen
// This is the famous "Immortal Zugzwang Game" - Nimzo-Indian Defense (ECO E18)
const pgnMoves = `d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O d5 Ne5 c6 cxd5 cxd5 Bf4 a6 Rc1 b5 Qb3 Nc6 Nxc6 Bxc6 h3 Qd7 Kh2 Nh5 Bd2 f5 Qd1 b4 Nb1 Bb5 Rg1 Bd6 e4 fxe4 Qxh5 Rxf2 Qg5 Raf8 Kh1 R8f5 Qe3 Bd3 Rce1 h6`.split(' ');

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
