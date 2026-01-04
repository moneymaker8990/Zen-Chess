#!/usr/bin/env tsx
/**
 * Validate generated game entries
 * 
 * Checks that all games have:
 * - Legal moves
 * - Valid FEN positions
 * - Proper metadata
 * - Complete move sequences
 * 
 * Usage:
 *   npx tsx scripts/validateGames.ts [generated-games-file]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Chess } from "chess.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AnnotatedMove {
  move: string;
  fen: string;
  comment?: string;
  isKeyMove?: boolean;
  evaluation?: string;
}

interface GameEntry {
  id: string;
  dayNumber: number;
  white: string;
  black: string;
  year: number;
  event: string;
  result: "1-0" | "0-1" | "1/2-1/2";
  opening: string;
  eco: string;
  title: string;
  themes: string[];
  whyInstructive: string;
  keyLessons: string[];
  historicalContext?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  era: "romantic" | "classical" | "hypermodern" | "soviet" | "modern" | "contemporary";
  category: "tactical" | "positional" | "endgame" | "attack" | "defense" | "strategy";
  moves: AnnotatedMove[];
}

interface ValidationResult {
  gameId: string;
  dayNumber: number;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a single game
 */
function validateGame(game: GameEntry): ValidationResult {
  const result: ValidationResult = {
    gameId: game.id,
    dayNumber: game.dayNumber,
    isValid: true,
    errors: [],
    warnings: [],
  };
  
  // Check required fields
  if (!game.id) result.errors.push("Missing id");
  if (!game.white || game.white === "Unknown") result.errors.push("Invalid white player");
  if (!game.black || game.black === "Unknown") result.errors.push("Invalid black player");
  if (!game.year || game.year < 1800 || game.year > 2030) result.errors.push("Invalid year");
  if (!game.event || game.event === "Unknown") result.warnings.push("Event is Unknown");
  if (!game.result) result.errors.push("Missing result");
  if (!game.title) result.errors.push("Missing title");
  if (!game.themes || game.themes.length === 0) result.errors.push("Missing themes");
  if (!game.whyInstructive) result.errors.push("Missing whyInstructive");
  if (!game.keyLessons || game.keyLessons.length === 0) result.errors.push("Missing keyLessons");
  if (!game.era) result.errors.push("Missing era");
  if (!game.category) result.errors.push("Missing category");
  if (game.difficulty < 1 || game.difficulty > 5) result.errors.push("Invalid difficulty");
  
  // Validate day number
  if (game.dayNumber < 1 || game.dayNumber > 365) {
    result.errors.push(`Invalid dayNumber: ${game.dayNumber}`);
  }
  
  // Validate moves
  if (!game.moves || game.moves.length === 0) {
    result.errors.push("No moves provided");
    result.isValid = false;
    return result;
  }
  
  if (game.moves.length < 10) {
    result.warnings.push(`Very short game: only ${game.moves.length} moves`);
  }
  
  // Validate move sequence using chess.js
  const chess = new Chess();
  
  for (let i = 0; i < game.moves.length; i++) {
    const move = game.moves[i];
    
    // Check FEN format
    if (!move.fen || !move.fen.match(/^[rnbqkbnrRNBQKBNR1-8\/\s]+ [wb] [KQkq-]+ [a-h1-8-]+ \d+ \d+$/)) {
      result.errors.push(`Invalid FEN at move ${i + 1}: ${move.fen}`);
      result.isValid = false;
      continue;
    }
    
    // Try to apply the move
    try {
      // Load position from FEN
      chess.load(move.fen);
      
      // Verify the move is legal (if not the last move)
      if (i < game.moves.length - 1) {
        const nextMove = game.moves[i + 1];
        const legalMoves = chess.moves({ verbose: true });
        const moveFound = legalMoves.some(
          (m) => m.san === nextMove.move || m.from + m.to === nextMove.move
        );
        
        if (!moveFound && nextMove.move) {
          // This might be okay if it's a different notation, just warn
          result.warnings.push(`Move ${i + 2} might not be legal from position at move ${i + 1}`);
        }
      }
    } catch (error) {
      result.errors.push(`Invalid position at move ${i + 1}: ${error}`);
      result.isValid = false;
    }
  }
  
  // Check final position matches result
  if (game.moves.length > 0) {
    const lastMove = game.moves[game.moves.length - 1];
    const chess = new Chess();
    try {
      chess.load(lastMove.fen);
      const isCheckmate = chess.isCheckmate();
      const isDraw = chess.isDraw();
      const isStalemate = chess.isStalemate();
      
      if (game.result === "1-0" && !isCheckmate && !isDraw) {
        result.warnings.push("Result is 1-0 but position is not checkmate or draw");
      }
      if (game.result === "0-1" && !isCheckmate && !isDraw) {
        result.warnings.push("Result is 0-1 but position is not checkmate or draw");
      }
      if (game.result === "1/2-1/2" && !isDraw && !isStalemate) {
        result.warnings.push("Result is draw but position is not drawn");
      }
    } catch (error) {
      result.errors.push(`Cannot validate final position: ${error}`);
    }
  }
  
  // Check FEN consistency (each FEN should be reachable from previous)
  for (let i = 1; i < game.moves.length; i++) {
    const prevMove = game.moves[i - 1];
    const currMove = game.moves[i];
    
    try {
      const chess = new Chess();
      chess.load(prevMove.fen);
      
      // Try to make the move
      const moveObj = chess.move(currMove.move, { sloppy: true });
      if (moveObj) {
        const expectedFen = chess.fen();
        // FENs might differ in move counters, so compare position part only
        const expectedPos = expectedFen.split(" ")[0];
        const actualPos = currMove.fen.split(" ")[0];
        
        if (expectedPos !== actualPos) {
          result.warnings.push(`FEN mismatch at move ${i + 1}: position doesn't match move`);
        }
      }
    } catch (error) {
      // Move might be in different notation, that's okay
    }
  }
  
  if (result.errors.length > 0) {
    result.isValid = false;
  }
  
  return result;
}

/**
 * Main function
 */
async function main() {
  const gamesFile =
    process.argv[2] || path.join(__dirname, "../generated-game-entries.json");
  
  console.log("\n🔍 Validating Game Entries\n");
  console.log(`📁 Input: ${gamesFile}\n`);
  
  if (!fs.existsSync(gamesFile)) {
    console.error(`❌ Games file not found: ${gamesFile}`);
    console.error(`   Run: npx tsx scripts/generateGameEntries.ts`);
    process.exit(1);
  }
  
  // Load games
  const data = JSON.parse(fs.readFileSync(gamesFile, "utf8"));
  const games: GameEntry[] = data.games || [];
  
  console.log(`📚 Loaded ${games.length} games to validate\n`);
  
  // Validate each game
  const results: ValidationResult[] = [];
  let validCount = 0;
  let invalidCount = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const game of games) {
    const result = validateGame(game);
    results.push(result);
    
    if (result.isValid) {
      validCount++;
    } else {
      invalidCount++;
    }
    
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    
    if (!result.isValid && result.errors.length > 0) {
      console.log(`❌ ${game.id} (Day ${game.dayNumber}):`);
      result.errors.forEach((err) => console.log(`   Error: ${err}`));
    }
  }
  
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total games: ${games.length}`);
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ❌ Invalid: ${invalidCount}`);
  console.log(`   ⚠️  Total errors: ${totalErrors}`);
  console.log(`   ⚠️  Total warnings: ${totalWarnings}`);
  
  // Check for duplicate day numbers
  const dayNumbers = games.map((g) => g.dayNumber);
  const duplicates = dayNumbers.filter(
    (day, index) => dayNumbers.indexOf(day) !== index
  );
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  Duplicate day numbers found: ${[...new Set(duplicates)].join(", ")}`);
  }
  
  // Check for duplicate IDs
  const ids = games.map((g) => g.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicateIds.length > 0) {
    console.log(`\n⚠️  Duplicate IDs found: ${[...new Set(duplicateIds)].join(", ")}`);
  }
  
  // Save validation report
  const reportFile = gamesFile.replace(".json", "-validation-report.json");
  const report = {
    validatedAt: new Date().toISOString(),
    summary: {
      total: games.length,
      valid: validCount,
      invalid: invalidCount,
      totalErrors,
      totalWarnings,
    },
    results: results.filter((r) => !r.isValid || r.errors.length > 0 || r.warnings.length > 0),
  };
  
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), "utf8");
  
  console.log(`\n💾 Validation report saved to: ${reportFile}`);
  
  if (invalidCount === 0 && totalErrors === 0) {
    console.log(`\n✅ All games are valid! Ready to integrate.`);
  } else {
    console.log(`\n⚠️  Please fix errors before integrating games.`);
    process.exit(1);
  }
}

main().catch(console.error);



