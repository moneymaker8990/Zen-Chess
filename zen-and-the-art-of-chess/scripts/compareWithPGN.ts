/**
 * Compare stored game moves with a PGN string
 * This helps verify games against authoritative PGN sources
 */

import { Chess } from 'chess.js';
import { allInstructiveGames } from '../src/data/instructiveGames';

interface ComparisonResult {
  match: boolean;
  discrepancies: Array<{
    moveIndex: number;
    storedMove: string;
    pgnMove: string;
    storedFen: string;
    correctFen: string;
  }>;
  totalMoves: number;
  matchedMoves: number;
}

function compareGameWithPGN(gameId: string, pgnMoves: string[]): ComparisonResult {
  const game = allInstructiveGames.find(g => g.id === gameId);
  if (!game) {
    throw new Error(`Game ${gameId} not found`);
  }

  const chess = new Chess();
  const discrepancies: ComparisonResult['discrepancies'] = [];
  let matchedMoves = 0;

  const minMoves = Math.min(game.moves.length, pgnMoves.length);

  for (let i = 0; i < minMoves; i++) {
    const storedMove = game.moves[i].move;
    const pgnMove = pgnMoves[i];
    
    try {
      // Try the stored move first
      const storedResult = chess.move(storedMove);
      const storedFen = chess.fen();
      
      // Reset and try PGN move
      chess.undo();
      const pgnResult = chess.move(pgnMove);
      const correctFen = chess.fen();
      
      if (storedMove !== pgnMove) {
        discrepancies.push({
          moveIndex: i,
          storedMove,
          pgnMove,
          storedFen: game.moves[i].fen,
          correctFen,
        });
      } else {
        matchedMoves++;
      }
    } catch (e) {
      // Stored move is invalid
      discrepancies.push({
        moveIndex: i,
        storedMove,
        pgnMove,
        storedFen: game.moves[i].fen,
        correctFen: chess.fen(),
      });
    }
  }

  return {
    match: discrepancies.length === 0 && game.moves.length === pgnMoves.length,
    discrepancies,
    totalMoves: Math.max(game.moves.length, pgnMoves.length),
    matchedMoves,
  };
}

// Example usage for Day 10
const day10PGN = `d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7 Rc1 c6 Bd3 dxc4 Bxc4 Nd5 O-O Nxc3 Rxc3 Qxe7 Nxe7 Nxe7 Re1 f6 Qe2 Qd7 Rac1 c6 d5 cxd5 Nd4 Kf7 Ne6 Rhc8 Qg4 g6 Ng5+ Ke8 Rxe7+ Kf8 Rf7+ Kg8 Rg7+ Kh8 Rxh7+ Kg8 Rg7+ Kh8 Qh4+ Kxg7 Qh7+ Kf8 Qh8+ Ke7 Qg7+ Ke8 Qg8+ Ke7 Qf7+ Kd8 Qf8+ Qe8 Nf7+ Kd7 Qd6#`.split(' ');

console.log('Comparing Day 10 (Capablanca-Tartakower) with PGN...\n');
const result = compareGameWithPGN('capablanca-tartakower', day10PGN);

console.log(`Match: ${result.match}`);
console.log(`Total moves: ${result.totalMoves}`);
console.log(`Matched moves: ${result.matchedMoves}`);
console.log(`Discrepancies: ${result.discrepancies.length}\n`);

if (result.discrepancies.length > 0) {
  console.log('Discrepancies:');
  result.discrepancies.slice(0, 10).forEach(d => {
    console.log(`  Move ${d.moveIndex + 1}: Stored="${d.storedMove}" vs PGN="${d.pgnMove}"`);
  });
  if (result.discrepancies.length > 10) {
    console.log(`  ... and ${result.discrepancies.length - 10} more`);
  }
}


