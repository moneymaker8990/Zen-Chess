import { Chess } from 'chess.js';

// Correct PGN from web search - Steinitz vs Bardeleben 1895
const pgnMoves = `e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 d5 exd5 Nxd5 O-O Be6 Bg5 Be7 Bxd5 Bxd5 Nxd5 Qxd5 Bxe7 Nxe7 Re1 f6 Qe2 Qd7 Rac1 c6 d5 cxd5 Nd4 Kf7 Ne6 Rhc8 Qg4 g6 Ng5+ Ke8 Rxe7+ Kf8 Rf7+ Kg8 Rg7+ Kh8 Rxh7+ Kg8 Rg7+ Kh8 Qh4+ Kxg7 Qh7+ Kf8 Qh8+ Ke7 Qg7+ Ke8 Qg8+ Ke7 Qf7+ Kd8 Qf8+ Qe8 Nf7+ Kd7 Qd6#`.split(' ');

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
console.log('First 10 moves:');
moves.slice(0, 10).forEach((m, i) => {
  console.log(`  ${i + 1}. ${m.move}`);
});
console.log('\nLast 10 moves:');
moves.slice(-10).forEach((m, i) => {
  console.log(`  ${moves.length - 10 + i + 1}. ${m.move}`);
});


