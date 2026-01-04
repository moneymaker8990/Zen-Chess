import { Chess } from 'chess.js';
import { allInstructiveGames } from '../src/data/instructiveGames';

const game = allInstructiveGames.find(g => g.id === 'capablanca-tartakower')!;
const chess = new Chess();

// Replay up to move 42
for (let i = 0; i < 42; i++) {
  chess.move(game.moves[i].move);
}

console.log('Position after move 42:');
console.log(chess.fen());
console.log('\nBoard:');
console.log(chess.ascii());
console.log('\nLegal moves:');
const legalMoves = chess.moves({ verbose: true });
legalMoves.forEach(m => {
  if (m.to === 'd8' || m.from === 'd1' || m.from === 'c3') {
    console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
  }
});
console.log('\nAll legal moves:', chess.moves().join(', '));


