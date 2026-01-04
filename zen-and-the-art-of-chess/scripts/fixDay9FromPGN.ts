import { Chess } from 'chess.js';

// Correct PGN from web search - Glucksberg vs Najdorf 1930 (Polish Immortal)
const pgnMoves = `d4 f5 c4 Nf6 Nc3 e6 Nf3 d5 e3 c6 Bd3 Bd6 O-O O-O Ne2 Nbd7 Ng5 Bxh2+ Kh1 Ng4 f4 Qe8 g3 Qh5 Kg2 Bg1 Nxg1 Qh2+ Kf3 e5 dxe5 Ndxe5+ fxe5 Nxe5+ Kf4 Ng6+ Kf3 f4 exf4 Bg4+ Kxg4 Ne5+ fxe5 h5#`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

for (const move of pgnMoves) {
  const result = chess.move(move);
  if (result) {
    moves.push({
      move: result.san,
      fen: chess.fen(),
    });
  } else {
    console.error(`Invalid move: ${move}`);
    break;
  }
}

console.log(`Generated ${moves.length} moves from PGN\n`);
console.log('All moves:');
moves.forEach((m, i) => {
  console.log(`  ${i + 1}. ${m.move}`);
});


