import { Chess } from 'chess.js';

// Correct PGN from pgnmentor-pgns/Reti.pgn - Reti vs Bogoljubov 1924 New York
// This is a Catalan Opening (ECO E01), not Réti Opening
const pgnMoves = `Nf3 d5 c4 e6 g3 Nf6 Bg2 Bd6 O-O O-O b3 Re8 Bb2 Nbd7 d4 c6 Nbd2 Ne4 Nxe4 dxe4 Ne5 f5 f3 exf3 Bxf3 Qc7 Nxd7 Bxd7 e4 e5 c5 Bf8 Qc2 exd4 exf5 Rad8 Bh5 Re5 Bxd4 Rxf5 Rxf5 Bxf5 Qxf5 Rxd4 Rf1 Rd8 Bf7+ Kh8 Be8`.split(' ');

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


