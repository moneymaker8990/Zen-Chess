import { Chess } from 'chess.js';

// Testing the corrected Rubinstein game - using the official PGN
const moves = [
  'd4', 'd5', 'Nf3', 'e6', 'e3', 'c5', 'c4', 'Nc6', 'Nc3', 'Nf6',
  'dxc5', 'Bxc5', 'a3', 'a6', 'b4', 'Bd6', 'Bb2', 'O-O', 'Qd2', 'Qe7',
  'Bd3', 'dxc4', 'Bxc4', 'b5', 'Bd3', 'Rd8', 'Qe2', 'Bb7', 'O-O',
  'Ne5', 'Bxe5', 'f4', 'Bc7', 'e4', 'Rac8', 'e5', 'Bb6+', 'Kh1',
  'Ng4', 'Be4', 'Qh4', 'g3', 'Rxc3', 'gxh4', 'Rd2', 'Qxd2', 'Bxe4+',
  'Qg2', 'Rh3', 'Rf3', 'Bxf3', 'Qxf3', 'Rxf3', 'Kg2', 'Rf2+'
];

const game = new Chess();

console.log('Testing Rubinstein\'s Immortal Game...\n');

for (let i = 0; i < moves.length; i++) {
  const move = moves[i];
  try {
    const result = game.move(move);
    if (!result) {
      console.log(`❌ Move ${i + 1} (${move}) failed`);
      console.log(`Position: ${game.fen()}`);
      console.log(`Legal moves: ${game.moves().slice(0, 10).join(', ')}`);
      break;
    }
    console.log(`✅ Move ${i + 1}: ${move}`);
  } catch (e) {
    console.log(`❌ Move ${i + 1} (${move}) error: ${e instanceof Error ? e.message : String(e)}`);
    console.log(`Position: ${game.fen()}`);
    break;
  }
}

if (game.isCheckmate()) {
  console.log('\n✅ Game completed with checkmate!');
} else {
  console.log(`\n⚠️  Game ended but not in checkmate. Position: ${game.fen()}`);
}


