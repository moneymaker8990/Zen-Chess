#!/usr/bin/env tsx
/**
 * Generate InstructiveGame entries from extracted notable games
 * 
 * Takes the notable-games-extracted.json file and generates proper
 * InstructiveGame entries with FEN positions, annotations, and metadata.
 * 
 * Usage:
 *   npx tsx scripts/generateGameEntries.ts [notable-games-file] [output-file]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Chess } from "chess.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExtractedGame {
  white: string;
  black: string;
  year: number;
  event: string;
  result: "1-0" | "0-1" | "1/2-1/2";
  opening: string;
  eco: string;
  site?: string;
  date?: string;
  round?: string;
  moves: string[];
  pgn: string;
  moveCount: number;
  hasResult: boolean;
  isValid: boolean;
  sourceFile: string;
  priority: number;
  notableReasons: string[];
}

interface InstructiveGameEntry {
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
  moves: Array<{
    move: string;
    fen: string;
    comment?: string;
    isKeyMove?: boolean;
    evaluation?: string;
  }>;
}

/**
 * Determine era from year
 */
function getEra(year: number): "romantic" | "classical" | "hypermodern" | "soviet" | "modern" | "contemporary" {
  if (year < 1880) return "romantic";
  if (year < 1920) return "classical";
  if (year < 1940) return "hypermodern";
  if (year < 1970) return "soviet";
  if (year < 2000) return "modern";
  return "contemporary";
}

/**
 * Determine category from game characteristics
 */
function getCategory(
  game: ExtractedGame,
  moveCount: number
): "tactical" | "positional" | "endgame" | "attack" | "defense" | "strategy" {
  // If game is long, likely endgame or positional
  if (moveCount > 60) {
    return Math.random() > 0.5 ? "endgame" : "positional";
  }
  
  // Check notable reasons for hints
  const reasons = game.notableReasons.join(" ").toLowerCase();
  if (reasons.includes("attack") || reasons.includes("sacrifice")) {
    return "attack";
  }
  if (reasons.includes("defense") || reasons.includes("defensive")) {
    return "defense";
  }
  
  // Default based on era
  const era = getEra(game.year);
  if (era === "romantic" || era === "classical") {
    return Math.random() > 0.5 ? "tactical" : "attack";
  }
  if (era === "soviet" || era === "modern") {
    return Math.random() > 0.5 ? "positional" : "strategy";
  }
  
  return "strategy";
}

/**
 * Generate themes from game characteristics
 */
function generateThemes(
  game: ExtractedGame,
  category: string
): string[] {
  const themes: string[] = [];
  const reasons = game.notableReasons.join(" ").toLowerCase();
  const eventLower = game.event.toLowerCase();
  
  // Add themes based on notable reasons
  if (reasons.includes("world championship")) themes.push("World Championship");
  if (reasons.includes("candidates")) themes.push("Candidates Tournament");
  if (reasons.includes("legend vs legend")) themes.push("Legend Matchup");
  
  // Add category-specific themes
  if (category === "tactical" || category === "attack") {
    themes.push("Tactical Play", "Initiative");
  }
  if (category === "positional" || category === "strategy") {
    themes.push("Positional Play", "Planning");
  }
  if (category === "endgame") {
    themes.push("Endgame Technique");
  }
  
  // Add opening-based themes
  if (game.opening && game.opening !== "Unknown Opening") {
    themes.push(game.opening);
  }
  
  // Ensure at least 2 themes
  if (themes.length < 2) {
    themes.push("Chess Mastery", "Instructional");
  }
  
  return themes.slice(0, 5); // Limit to 5 themes
}

/**
 * Generate title from game metadata
 */
function generateTitle(game: ExtractedGame): string {
  // Check for famous games
  const whiteLower = game.white.toLowerCase();
  const blackLower = game.black.toLowerCase();
  const eventLower = game.event.toLowerCase();
  
  // Famous matchups
  if (
    (whiteLower.includes("fischer") && blackLower.includes("spassky")) ||
    (whiteLower.includes("spassky") && blackLower.includes("fischer"))
  ) {
    return `Fischer vs Spassky (${game.year})`;
  }
  
  if (
    (whiteLower.includes("kasparov") && blackLower.includes("karpov")) ||
    (whiteLower.includes("karpov") && blackLower.includes("kasparov"))
  ) {
    return `Kasparov vs Karpov (${game.year})`;
  }
  
  if (
    (whiteLower.includes("capablanca") && blackLower.includes("alekhine")) ||
    (whiteLower.includes("alekhine") && blackLower.includes("capablanca"))
  ) {
    return `Capablanca vs Alekhine (${game.year})`;
  }
  
  // World Championship games
  if (eventLower.includes("world championship") || eventLower.includes("wc match")) {
    return `${game.white} vs ${game.black} - World Championship ${game.year}`;
  }
  
  // Tournament games
  if (eventLower.includes("candidates")) {
    return `${game.white} vs ${game.black} - Candidates ${game.year}`;
  }
  
  // Default
  return `${game.white} vs ${game.black} (${game.year})`;
}

/**
 * Generate whyInstructive text
 */
function generateWhyInstructive(
  game: ExtractedGame,
  category: string,
  era: string
): string {
  const reasons = game.notableReasons;
  const parts: string[] = [];
  
  if (reasons.includes("World Championship")) {
    parts.push("This World Championship game demonstrates the highest level of chess preparation and execution.");
  } else if (reasons.includes("Candidates/Qualifying")) {
    parts.push("This Candidates Tournament game showcases elite-level competitive chess.");
  } else if (reasons.includes("Legend vs Legend")) {
    parts.push("This game features two chess legends, showcasing their unique styles and deep understanding.");
  } else {
    parts.push(`This game from ${game.year} demonstrates key principles of ${category} chess.`);
  }
  
  parts.push(`The ${era} era style is evident in the approach to ${category} play.`);
  parts.push("Study this game to understand how masters handle complex positions and make critical decisions.");
  
  return parts.join(" ");
}

/**
 * Generate key lessons
 */
function generateKeyLessons(
  category: string,
  era: string
): string[] {
  const lessons: string[] = [];
  
  if (category === "tactical") {
    lessons.push("Calculate variations carefully before committing to a tactical sequence");
    lessons.push("Look for forcing moves that create threats");
  } else if (category === "positional") {
    lessons.push("Understand the long-term implications of each move");
    lessons.push("Control key squares and limit opponent's options");
  } else if (category === "endgame") {
    lessons.push("Precise technique is essential in endgames");
    lessons.push("King activity is crucial in endgame play");
  } else if (category === "attack") {
    lessons.push("Build up your attack methodically");
    lessons.push("Sacrifices must be calculated precisely");
  } else if (category === "strategy") {
    lessons.push("Long-term planning guides short-term decisions");
    lessons.push("Understand the position's requirements");
  }
  
  lessons.push("Study master games to improve your understanding");
  lessons.push("Every move should serve a clear purpose");
  
  return lessons.slice(0, 5);
}

/**
 * Generate FEN positions for all moves
 */
function generateMoves(game: ExtractedGame): Array<{
  move: string;
  fen: string;
  comment?: string;
  isKeyMove?: boolean;
  evaluation?: string;
}> {
  const chess = new Chess();
  const annotatedMoves: Array<{
    move: string;
    fen: string;
    comment?: string;
    isKeyMove?: boolean;
    evaluation?: string;
  }> = [];
  
  try {
    // Load the game
    chess.loadPgn(game.pgn, { sloppy: true });
    
    // Get move history
    const history = chess.history({ verbose: false });
    
    // Reset to starting position
    chess.reset();
    
    // Generate FEN for each move
    for (let i = 0; i < history.length; i++) {
      const move = history[i];
      const moveObj = chess.move(move, { sloppy: true });
      
      if (!moveObj) {
        console.warn(`Invalid move at index ${i}: ${move}`);
        continue;
      }
      
      const fen = chess.fen();
      
      // Mark key moves (every 10th move, or critical positions)
      const isKeyMove = i % 10 === 0 || i === history.length - 1;
      
      // Add evaluation for final move if game has result
      let evaluation: string | undefined;
      if (i === history.length - 1 && game.hasResult) {
        evaluation = game.result;
      }
      
      annotatedMoves.push({
        move,
        fen,
        isKeyMove,
        evaluation,
      });
    }
  } catch (error) {
    console.error(`Error processing game ${game.white} vs ${game.black}:`, error);
  }
  
  return annotatedMoves;
}

/**
 * Generate game ID
 */
function generateGameId(game: ExtractedGame): string {
  const whiteClean = game.white.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 15);
  const blackClean = game.black.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 15);
  const year = game.year;
  return `${whiteClean}-vs-${blackClean}-${year}`.replace(/-+/g, "-");
}

/**
 * Determine difficulty (1-5)
 */
function determineDifficulty(
  game: ExtractedGame,
  priority: number
): 1 | 2 | 3 | 4 | 5 {
  // Higher priority = higher difficulty (more complex/important games)
  if (priority >= 100) return 5;
  if (priority >= 80) return 4;
  if (priority >= 50) return 3;
  if (priority >= 20) return 2;
  return 1;
}

/**
 * Main function to generate game entries
 */
async function main() {
  const notableGamesFile =
    process.argv[2] || path.join(__dirname, "../notable-games-extracted.json");
  const outputFile =
    process.argv[3] || path.join(__dirname, "../generated-game-entries.json");
  
  console.log("\n🎯 Generating InstructiveGame Entries\n");
  console.log(`📁 Input: ${notableGamesFile}`);
  console.log(`📄 Output: ${outputFile}\n`);
  
  if (!fs.existsSync(notableGamesFile)) {
    console.error(`❌ Notable games file not found: ${notableGamesFile}`);
    console.error(`   Run: npx tsx scripts/extractNotableGamesFromPGNs.ts`);
    process.exit(1);
  }
  
  // Load extracted games
  const data = JSON.parse(fs.readFileSync(notableGamesFile, "utf8"));
  const extractedGames: ExtractedGame[] = data.games || [];
  
  console.log(`📚 Loaded ${extractedGames.length} extracted games\n`);
  
  // Filter for valid games (be more lenient - accept games without explicit results)
  // We'll try to infer results from the final position
  // CRITICAL: Filter out games with Unknown players - they're not acceptable
  const validGames = extractedGames.filter(
    (g) => g.isValid && 
           g.moveCount >= 10 &&
           g.white !== "Unknown" && 
           g.black !== "Unknown" &&
           g.white.trim() !== "" &&
           g.black.trim() !== ""
  );
  
  console.log(`✅ Found ${validGames.length} valid games (with or without explicit results)\n`);
  
  // Sort by priority
  validGames.sort((a, b) => b.priority - a.priority);
  
  // Read existing games to avoid duplicates
  const existingGamesPath = path.join(__dirname, "../src/data/instructiveGames/games.ts");
  let existingIds = new Set<string>();
  
  if (fs.existsSync(existingGamesPath)) {
    const existingContent = fs.readFileSync(existingGamesPath, "utf8");
    const idMatches = existingContent.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    for (const match of idMatches) {
      existingIds.add(match[1]);
    }
  }
  
  console.log(`📋 Found ${existingIds.size} existing game IDs\n`);
  
  // Determine which days are already taken
  const existingDays = new Set<number>();
  if (fs.existsSync(existingGamesPath)) {
    const content = fs.readFileSync(existingGamesPath, "utf8");
    const dayMatches = content.matchAll(/dayNumber:\s*(\d+)/g);
    for (const match of dayMatches) {
      existingDays.add(parseInt(match[1]));
    }
  }
  
  console.log(`📅 Found ${existingDays.size} days already populated\n`);
  
  // Find days with Unknown players that need to be replaced
  // Try to read from the report file first (more reliable)
  const unknownDays = new Set<number>();
  const reportPath = path.join(__dirname, "../unknown-games-report.json");
  if (fs.existsSync(reportPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
      if (report.dayNumbers && Array.isArray(report.dayNumbers)) {
        report.dayNumbers.forEach((day: number) => unknownDays.add(day));
      }
    } catch (error) {
      // Fall back to parsing games.ts
    }
  }
  
  // Fallback: parse games.ts if report doesn't exist
  if (unknownDays.size === 0 && fs.existsSync(existingGamesPath)) {
    const content = fs.readFileSync(existingGamesPath, "utf8");
    // More reliable: check each game block
    const gameBlocks = content.split(/(?=\/\/ =+[\s\S]*?DAY \d+)/);
    for (const block of gameBlocks) {
      const dayMatch = block.match(/DAY (\d+)/i);
      if (dayMatch && (block.includes("white: 'Unknown'") || block.includes('white: "Unknown"') || 
                       block.includes("black: 'Unknown'") || block.includes('black: "Unknown"'))) {
        unknownDays.add(parseInt(dayMatch[1], 10));
      }
    }
  }
  
  // Generate game entries
  const gameEntries: InstructiveGameEntry[] = [];
  const targetDays = unknownDays.size > 0 ? Array.from(unknownDays).sort((a, b) => a - b) : [];
  let dayIndex = 0;
  let dayNumber = 1;
  const targetCount = unknownDays.size > 0 ? unknownDays.size : (365 - existingDays.size);
  
  if (unknownDays.size > 0) {
    console.log(`🎯 Replacing ${unknownDays.size} Unknown player games`);
    console.log(`📅 Target days: ${targetDays.slice(0, 20).join(", ")}${targetDays.length > 20 ? "..." : ""}\n`);
  } else {
    console.log(`🎯 Generating ${targetCount} game entries...\n`);
  }
  
  for (const game of validGames) {
    if (gameEntries.length >= targetCount) break;
    
    // Use target days if we're replacing Unknown games, otherwise find next available
    if (targetDays.length > 0) {
      if (dayIndex >= targetDays.length) break;
      dayNumber = targetDays[dayIndex];
      dayIndex++;
    } else {
      // Skip if day is already taken
      while (existingDays.has(dayNumber)) {
        dayNumber++;
      }
    }
    
    const gameId = generateGameId(game);
    
    // Skip if already exists
    if (existingIds.has(gameId)) {
      continue;
    }
    
    const era = getEra(game.year);
    const category = getCategory(game, game.moveCount);
    const themes = generateThemes(game, category);
    const title = generateTitle(game);
    const whyInstructive = generateWhyInstructive(game, category, era);
    const keyLessons = generateKeyLessons(category, era);
    const difficulty = determineDifficulty(game, game.priority);
    const moves = generateMoves(game);
    
    // Skip if moves generation failed
    if (moves.length === 0) {
      console.warn(`⚠️  Skipping ${gameId} - no valid moves`);
      continue;
    }
    
    // Infer result from final position if not explicitly set
    let result = game.result;
    if (!game.hasResult && moves.length > 0) {
      try {
        const chess = new Chess();
        const lastMove = moves[moves.length - 1];
        chess.load(lastMove.fen);
        if (chess.isCheckmate()) {
          // Determine winner from turn
          const turn = lastMove.fen.split(" ")[1];
          result = turn === "w" ? "0-1" : "1-0";
        } else if (chess.isDraw() || chess.isStalemate()) {
          result = "1/2-1/2";
        } else {
          // Default to draw if unclear
          result = "1/2-1/2";
        }
      } catch (error) {
        // Default to draw if we can't determine
        result = "1/2-1/2";
      }
    }
    
    const entry: InstructiveGameEntry = {
      id: gameId,
      dayNumber,
      white: game.white,
      black: game.black,
      year: game.year,
      event: game.event,
      result: result,
      opening: game.opening || "Unknown Opening",
      eco: game.eco || "",
      title,
      themes,
      whyInstructive,
      keyLessons,
      difficulty,
      era,
      category,
      moves,
    };
    
    gameEntries.push(entry);
    dayNumber++;
    
    if (gameEntries.length % 50 === 0) {
      console.log(`   Generated ${gameEntries.length} entries...`);
    }
  }
  
  console.log(`\n✅ Generated ${gameEntries.length} game entries\n`);
  
  // Statistics
  const stats = {
    total: gameEntries.length,
    byEra: {
      romantic: gameEntries.filter((g) => g.era === "romantic").length,
      classical: gameEntries.filter((g) => g.era === "classical").length,
      hypermodern: gameEntries.filter((g) => g.era === "hypermodern").length,
      soviet: gameEntries.filter((g) => g.era === "soviet").length,
      modern: gameEntries.filter((g) => g.era === "modern").length,
      contemporary: gameEntries.filter((g) => g.era === "contemporary").length,
    },
    byCategory: {
      tactical: gameEntries.filter((g) => g.category === "tactical").length,
      positional: gameEntries.filter((g) => g.category === "positional").length,
      endgame: gameEntries.filter((g) => g.category === "endgame").length,
      attack: gameEntries.filter((g) => g.category === "attack").length,
      defense: gameEntries.filter((g) => g.category === "defense").length,
      strategy: gameEntries.filter((g) => g.category === "strategy").length,
    },
    byDifficulty: {
      1: gameEntries.filter((g) => g.difficulty === 1).length,
      2: gameEntries.filter((g) => g.difficulty === 2).length,
      3: gameEntries.filter((g) => g.difficulty === 3).length,
      4: gameEntries.filter((g) => g.difficulty === 4).length,
      5: gameEntries.filter((g) => g.difficulty === 5).length,
    },
  };
  
  console.log("📊 Statistics:");
  console.log(`   Total entries: ${stats.total}`);
  console.log(`\n   By era:`);
  Object.entries(stats.byEra).forEach(([era, count]) => {
    console.log(`     ${era}: ${count}`);
  });
  console.log(`\n   By category:`);
  Object.entries(stats.byCategory).forEach(([cat, count]) => {
    console.log(`     ${cat}: ${count}`);
  });
  
  // Save to JSON
  const output = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalEntries: gameEntries.length,
      stats,
    },
    games: gameEntries,
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), "utf8");
  
  console.log(`\n💾 Saved ${gameEntries.length} game entries to: ${outputFile}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the generated entries: ${outputFile}`);
  console.log(`   2. Run validation: npx tsx scripts/validateGames.ts ${outputFile}`);
  console.log(`   3. Integrate into games.ts file`);
}

main().catch(console.error);

