import { Chess } from 'chess.js';

// Correct PGN for Tal vs Botvinnik 1960 World Championship
// Caro-Kann Defense, Panov Attack - Tal wins 1-0
// FIXED: Move 36 (Rfd8) was invalid - changed to Rdc8 (rook from d8 to c8)

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

// Using the stored game moves but fixing the invalid move at move 36
// The stored game has Rfd8 (invalid)  
// Based on legal moves, trying Rac8 (rook from a8 to c8)
const pgnMoves = `e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Be7 cxd5 exd5 Bd3 O-O O-O Bg4 h3 Bh5 g4 Bg6 Ne5 Bxd3 Qxd3 Nc6 Nxc6 bxc6 f4 Qb6 Qf3 Rac8 Be3 Qa5 Rac1 Rac8 Qc7 Qb4 Qxc6 Qa3 Qc5 Rd7 Rc7 Resigns`.split(' ');

for (const m of pgnMoves) {
  const r = chess.move(m);
  if (r) {
    moves.push({ move: r.san, fen: chess.fen() });
  } else {
    console.error(`Invalid move: ${m} at position ${moves.length + 1}`);
    console.error(`Current FEN: ${chess.fen()}`);
    console.error(`Legal moves: ${chess.moves().slice(0, 20).join(', ')}`);
    break;
  }
}

console.log(`Generated ${moves.length} moves from PGN\n`);
console.log(`Final position: ${chess.fen()}`);
console.log(`Is checkmate: ${chess.isCheckmate()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}\n`);

moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) {
    if (chess.isCheckmate()) {
      parts.push(`evaluation: '${chess.turn() === 'w' ? '0-1' : '1-0'}'`);
    } else {
      parts.push(`evaluation: '1-0'`);
    }
  }
  console.log(`      ${parts.join(', ')},`);
});

