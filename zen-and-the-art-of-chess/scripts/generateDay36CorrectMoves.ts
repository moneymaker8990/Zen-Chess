import { Chess } from 'chess.js';

// Correct PGN from pgnmentor-pgns/Euwe.pgn - Vidmar vs Euwe 1929 Carlsbad
// This is a King's Indian Defense, Torre Attack (ECO A48), not Queen's Gambit Declined
const pgnMoves = `d4 Nf6 Nf3 g6 Bg5 Bg7 Nbd2 c5 e3 b6 Bd3 Bb7 O-O h6 Bf4 d6 c3 Nh5 Qb3 Nxf4 exf4 O-O Rad1 Nc6 Bb1 cxd4 cxd4 e6 Ne4 Ne7 Qa3 Nf5 Rd2 Qe7 Ng3 Nxg3 fxg3 Rfc8 g4 Rc7 f5 exf5 gxf5 g5 Re1 Qf6 h3 Rac8 Rdd1 Rc4 d5 a5 Nd2 Qd4+ Kh1 Qxd5 Be4 Rxe4 Nxe4 Qxf5 Nxd6 Bxg2+ Kxg2 Rc2+ Kh1 Qf4 Re8+ Bf8 Rxf8+ Kxf8 Nf5+`.split(' ');

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


