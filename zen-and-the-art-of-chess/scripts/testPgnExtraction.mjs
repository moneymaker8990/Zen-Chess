// Quick test to see why positions aren't being extracted
import { Chess } from 'chess.js';
import fs from 'fs';

const pgnContent = fs.readFileSync('data/pgns/alekhine/Alekhine.pgn', 'utf8');
const games = pgnContent.split(/\n\n+(?=\[Event)/).filter(g => g.trim().startsWith('['));

console.log(`Found ${games.length} games in PGN file`);

// Test first game
const firstGame = games[0];
console.log(`\nFirst game preview (first 200 chars):`);
console.log(firstGame.substring(0, 200));

const chess = new Chess();
chess.loadPgn(firstGame, { sloppy: true });
const moves = chess.history({ verbose: true });

console.log(`\nMoves loaded: ${moves.length}`);
if (moves.length > 0) {
  console.log(`First 3 moves: ${moves.slice(0, 3).map(m => `${m.from}${m.to}`).join(', ')}`);
  
  // Test position extraction
  const board = new Chess();
  let positionCount = 0;
  for (const move of moves.slice(0, 5)) {
    const fenBefore = board.fen();
    const fullmove = board.fullMoveNumber;
    console.log(`\nMove ${fullmove}: ${move.from}${move.to}`);
    console.log(`  FEN before: ${fenBefore}`);
    board.move(move);
    positionCount++;
  }
  console.log(`\n✅ Successfully extracted ${positionCount} positions`);
} else {
  console.log('❌ No moves found!');
}













