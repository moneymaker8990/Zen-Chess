/**
 * Generate correct moves for Day 10 from PGN
 */

import { Chess } from 'chess.js';

// Correct PGN sequence (103 moves = 52 full moves)
const pgnMoves = `d4 e6 Nf3 f5 c4 Nf6 Bg5 Be7 Nc3 O-O e3 b6 Bd3 Bb7 O-O Qe8 Qe2 Ne4 Bxe7 Nxc3 bxc3 Qxe7 a4 Bxf3 Qxf3 Nc6 Rfb1 Rae8 Qh3 Rf6 f4 Na5 Qf3 d6 Re1 Qd7 e4 fxe4 Qxe4 g6 g3 Kf8 Kg2 Rf7 h4 d5 cxd5 exd5 Qxe8+ Qxe8 Rxe8+ Kxe8 h5 Rf6 hxg6 hxg6 Rh1 Kf8 Rh7 Rc6 g4 Nc4 g5 Ne3+ Kf3 Nf5 Bxf5 gxf5 Kg3 Rxc3+ Kh4 Rf3 g6 Rxf4+ Kg5 Re4 Kf6 Kg8 Rg7+ Kh8 Rxc7 Re8 Kxf5 Re4 Kf6 Rf4+ Ke5 Rg4 g7+ Kg8 Rxa7 Rg1 Kxd5 Rc1 Kd6 Rc2 d5 Rc1 Rc7 Ra1 Kc6 Rxa4 d6`.split(' ');

const chess = new Chess();
const annotatedMoves: Array<{ move: string; fen: string; comment?: string; isKeyMove?: boolean; evaluation?: string }> = [];

// Add comments for key moves
const keyMoveIndices = new Set([26, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52]); // Move numbers in chess notation

for (let i = 0; i < pgnMoves.length; i++) {
  const result = chess.move(pgnMoves[i]);
  if (result) {
    const moveNum = Math.floor(i / 2) + 1;
    const isKeyMove = keyMoveIndices.has(moveNum);
    
    let comment = '';
    if (i === 26) comment = 'The rook invades the hostile camp!';
    else if (i === 30) comment = 'The rook reaches the 7th rank - a classic endgame theme.';
    else if (i === 31) comment = 'Expanding on the kingside.';
    else if (i === 32) comment = 'Giving Black the opportunity to win a pawn, but Capablanca has confidence in the passed pawn.';
    else if (i === 35) comment = 'Decisive! White sacrifices material to obtain the classical position with King on f6, pawn on g6, and Rook on h7.';
    else if (i === 36) comment = 'Capablanca is no longer concerned about material equality, only supporting his passed pawn.';
    else if (i === 38) comment = 'A frequently available finesse - not capturing hostile pawns, but passing them by to be protected against checks.';
    else if (i === 42) comment = 'Again the simplest move.';
    else if (i === 45) comment = 'After exchanging rooks, White would win still more easily.';
    else if (i === 51) comment = 'The king reaches c6, supporting the passed pawn.';
    else if (i === 52) comment = 'Capablanca\'s management of the endgame gives the impression of being so natural that one easily forgets the difficulty of such precise play.';
    
    annotatedMoves.push({
      move: result.san,
      fen: chess.fen(),
      comment: comment || undefined,
      isKeyMove: isKeyMove || undefined,
      evaluation: i === pgnMoves.length - 1 ? '1-0' : undefined,
    });
  } else {
    console.error(`Invalid move at index ${i}: ${pgnMoves[i]}`);
    break;
  }
}

console.log(`Generated ${annotatedMoves.length} moves\n`);
console.log('First 15 moves:');
annotatedMoves.slice(0, 15).forEach((m, i) => {
  console.log(`  ${i + 1}. ${m.move} - ${m.comment || ''}`);
});
console.log('\nLast 10 moves:');
annotatedMoves.slice(-10).forEach((m, i) => {
  console.log(`  ${annotatedMoves.length - 10 + i + 1}. ${m.move} - ${m.comment || ''}`);
});

// Output as JSON for easy copy-paste
console.log('\n\nJSON format (first 20 moves):');
console.log(JSON.stringify(annotatedMoves.slice(0, 20), null, 2));


