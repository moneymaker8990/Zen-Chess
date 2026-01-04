import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'botvinnik-capablanca');
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

// PGN from web search
const pgnMoves = `d4 Nf6 c4 e6 Nc3 Bb4 e3 d5 a3 Bxc3+ bxc3 c5 cxd5 exd5 Bd3 O-O Ne2 b6 O-O Ba6 Bxa6 Nxa6 Bb2 Qd7 a4 Rfe8 Qd3 c4 Qc2 Nb8 Rae1 Nc6 Ng3 Na5 f3 Nb3 e4 Qxa4 e5 Nd7 Qf2 g6 f4 f5 exf6 Nxf6 f5 Rxe1 Rxe1 Re8 Re6 Rxe6 fxe6 Kg7 Qf4 Qe8 Qe5 Qe7 Ba3 Qxa3 Nh5+ gxh5 Qg5+ Kf8 Qxf6+ Kg8 e7 Qc1+ Kf2 Qc2+ Kg3 Qd3+ Kh4 Qe4+ Kxh5 Qe2+ Kh4 Qe4+ g4 Qe1+ Kh5`.split(' ');

console.log(`Stored game has ${game.moves.length} moves`);
console.log(`PGN has ${pgnMoves.length} moves\n`);

const chess = new Chess();
const discrepancies: Array<{ moveIndex: number; storedMove: string; pgnMove: string }> = [];

const minMoves = Math.min(game.moves.length, pgnMoves.length);

for (let i = 0; i < minMoves; i++) {
  const storedMove = game.moves[i].move;
  const pgnMove = pgnMoves[i];
  
  try {
    const result = chess.move(storedMove);
    if (!result) {
      discrepancies.push({ moveIndex: i, storedMove, pgnMove });
      break;
    }
    
    if (storedMove !== pgnMove) {
      // Check if they lead to same position
      const storedFen = chess.fen();
      chess.undo();
      const pgnResult = chess.move(pgnMove);
      const pgnFen = chess.fen();
      
      const storedFenParts = storedFen.split(' ').slice(0, 4);
      const pgnFenParts = pgnFen.split(' ').slice(0, 4);
      
      if (storedFenParts.join(' ') !== pgnFenParts.join(' ')) {
        discrepancies.push({ moveIndex: i, storedMove, pgnMove });
      }
    }
  } catch (e) {
    discrepancies.push({ moveIndex: i, storedMove, pgnMove });
    break;
  }
}

console.log(`Discrepancies found: ${discrepancies.length}\n`);

if (discrepancies.length > 0) {
  console.log('First 10 discrepancies:');
  discrepancies.slice(0, 10).forEach(d => {
    console.log(`  Move ${d.moveIndex + 1}: Stored="${d.storedMove}" vs PGN="${d.pgnMove}"`);
  });
} else {
  console.log('Games match up to the minimum length!');
}

console.log(`\nStored game first 10 moves: ${game.moves.slice(0, 10).map(m => m.move).join(' ')}`);
console.log(`PGN first 10 moves: ${pgnMoves.slice(0, 10).join(' ')}`);


