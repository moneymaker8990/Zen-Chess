import { Chess } from 'chess.js';

// Correct PGN from web search
const pgnMoves = `d4 Nf6 c4 e6 Nc3 Bb4 e3 d5 a3 Bxc3+ bxc3 c5 cxd5 exd5 Bd3 O-O Ne2 b6 O-O Ba6 Bxa6 Nxa6 Bb2 Qd7 a4 Rfe8 Qd3 c4 Qc2 Nb8 Rae1 Nc6 Ng3 Na5 f3 Nb3 e4 Qxa4 e5 Nd7 Qf2 g6 f4 f5 exf6 Nxf6 f5 Rxe1 Rxe1 Re8 Re6 Rxe6 fxe6 Kg7 Qf4 Qe8 Qe5 Qe7 Ba3 Qxa3 Nh5+ gxh5 Qg5+ Kf8 Qxf6+ Kg8 e7 Qc1+ Kf2 Qc2+ Kg3 Qd3+ Kh4 Qe4+ Kxh5 Qe2+ Kh4 Qe4+ g4 Qe1+ Kh5`.split(' ');

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
console.log('First 15 moves:');
moves.slice(0, 15).forEach((m, i) => {
  console.log(`  ${i + 1}. ${m.move}`);
});
console.log('\nLast 10 moves:');
moves.slice(-10).forEach((m, i) => {
  console.log(`  ${moves.length - 10 + i + 1}. ${m.move}`);
});

// Output formatted for games.ts
console.log('\n\nFormatted moves (first 20):');
moves.slice(0, 20).forEach((m, i) => {
  console.log(`      { move: '${m.move}', fen: '${m.fen}' },`);
});


