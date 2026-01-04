import { Chess } from 'chess.js';

// Correct PGN from web search - Rubinstein vs Schlechter 1912 (Semi-Tarrasch Defense)
// Using the PGN from the first web search - the game ends with fxe6# (checkmate)
const pgnMoves = `d4 d5 Nf3 Nf6 c4 e6 Nc3 c5 cxd5 Nxd5 e4 Nxc3 bxc3 cxd4 cxd4 Bb4+ Bd2 Qa5 Rb1 Bxd2+ Qxd2 Qxd2+ Kxd2 O-O Bd3 a6 Rhc1 b5 Rc7 Nd7 Ke3 Nf6 Ne5 Rd8 g4 h6 f4 Nd7 Nc6 Re8 e5 Nb6 Be4 Nc4+ Kd3 Kf8 a4 Nb6 a5 Nd5 Bxd5 exd5 f5 h5 h3 hxg4 hxg4 g6 Rf1 gxf5 gxf5 Kg7 e6 Kf6 Rxf7+ Kg5 Rg1+ Kf4 Ne5 Bxe6 fxe6#`.split(' ');

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


