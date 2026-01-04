import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'botvinnik-capablanca')!;
const chess = new Chess();

// Replay up to move 81
for (let i = 0; i < 81; i++) {
  chess.move(game.moves[i].move);
}

console.log('Position after move 81:');
console.log(chess.fen());
console.log('\nBoard:');
console.log(chess.ascii());
console.log('\nLegal moves for White:');
const legalMoves = chess.moves({ verbose: true });
legalMoves.slice(0, 10).forEach(m => {
  console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
});

console.log(`\nStored move 82: ${game.moves[81]?.move}`);
console.log(`Total moves in game: ${game.moves.length}`);


