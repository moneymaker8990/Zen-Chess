import { Chess } from 'chess.js';

// Correct PGN from web search - Lasker vs Thomas 1912
const pgnMoves = `d4 e6 Nf3 f5 Nc3 Nf6 Bg5 Be7 Bxf6 Bxf6 e4 fxe4 Nxe4 b6 Ne5 O-O Bd3 Bb7 Qh5 Qe7 Qxh7+ Kxh7 Nxf6+ Kh6 Neg4+ Kg5 h4+ Kf4 g3+ Kf3 Be2+ Kg2 Rh2+ Kg1 Kd2#`.split(' ');

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


