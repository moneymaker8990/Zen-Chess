import { Chess } from 'chess.js';
import { allInstructiveGames } from '../src/data/instructiveGames';

const game = allInstructiveGames.find(g => g.id === 'capablanca-tartakower')!;
const chess = new Chess();

// Replay up to move 51
for (let i = 0; i < 51; i++) {
  chess.move(game.moves[i].move);
}

console.log('Position after move 51 (Kf3):');
console.log(chess.fen());
console.log('\nBoard:');
console.log(chess.ascii());
console.log('\nLegal moves for Black:');
const legalMoves = chess.moves({ verbose: true });
legalMoves.forEach(m => {
  console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
});


