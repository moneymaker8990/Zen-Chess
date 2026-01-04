import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'tal-larsen')!;
const chess = new Chess();

// Replay up to move 34
for (let i = 0; i < 34; i++) {
  chess.move(game.moves[i].move);
}

console.log('Position after move 34:');
console.log(chess.fen());
console.log('\nBoard:');
console.log(chess.ascii());
console.log('\nLegal moves for White:');
const legalMoves = chess.moves({ verbose: true });
legalMoves.slice(0, 15).forEach(m => {
  console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
});

console.log(`\nStored move 35: ${game.moves[34]?.move}`);
console.log(`Total moves in game: ${game.moves.length}`);


