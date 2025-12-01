import { Chess } from "chess.js";
import fs from "fs";

const pgnContent = fs.readFileSync("data/pgns/alekhine/Alekhine.pgn", "utf8");
const games = pgnContent.split(/(?=\[Event)/).map(g => g.trim()).filter(g => g.startsWith("["));

console.log(`Split into ${games.length} games\n`);

// Test first game
const firstGame = games[0];
console.log("First game length:", firstGame.length);
console.log("First 200 chars:");
console.log(firstGame.substring(0, 200));
console.log("\n...\nLast 100 chars:");
console.log(firstGame.substring(firstGame.length - 100));

const chess = new Chess();
try {
  chess.loadPgn(firstGame, { sloppy: true });
  const moves = chess.history({ verbose: true });
  console.log(`\n Loaded! Moves: ${moves.length}`);
  
  if (moves.length > 0) {
    console.log(`First move: ${moves[0].from}${moves[0].to}`);
    
    // Test position extraction
    const board = new Chess();
    board.move(moves[0]);
    console.log(` Position extraction works! FEN: ${board.fen()}`);
  }
} catch (err) {
  console.log(` Failed to load: ${err.message}`);
}
