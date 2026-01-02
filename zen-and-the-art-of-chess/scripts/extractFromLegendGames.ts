#!/usr/bin/env tsx
/**
 * Extract notable games from legend JSON files (which have known players)
 * Converts them to the format expected by generateGameEntries.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Chess } from "chess.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LegendGame {
  id: string;
  legend?: string;
  event?: string;
  site?: string;
  date?: string;
  white: string;
  black: string;
  result: "1-0" | "0-1" | "1/2-1/2" | "*" | "?";
  eco?: string;
  round?: string;
  pgn: string;
}

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

const NOTABLE_KEYWORDS = {
  worldChampionship: ["world championship", "wc", "wch", "match"],
  candidates: ["candidates", "qualifying", "interzonal"],
  majorTournaments: ["capablanca", "tata steel", "wijk aan zee", "corus", "tal memorial"],
};

function calculatePriority(game: LegendGame, moveCount: number): { priority: number; reasons: string[] } {
  let priority = 10; // Base priority
  const reasons: string[] = [];
  const eventLower = (game.event || "").toLowerCase();
  const whiteLower = game.white.toLowerCase();
  const blackLower = game.black.toLowerCase();

  // World Championship gets highest priority
  if (eventLower.includes("world championship") || eventLower.includes("wc ") || eventLower.includes("wch ")) {
    priority += 200;
    reasons.push("World Championship");
  }

  // Candidates
  if (eventLower.includes("candidates") || eventLower.includes("qualifying")) {
    priority += 150;
    reasons.push("Candidates/Qualifying");
  }

  // Major tournaments
  for (const keyword of NOTABLE_KEYWORDS.majorTournaments) {
    if (eventLower.includes(keyword)) {
      priority += 50;
      reasons.push("Major Tournament");
      break;
    }
  }

  // Games between legends (famous players)
  const famousPlayers = ["fischer", "kasparov", "karpov", "capablanca", "alekhine", "tal", "botvinnik", "spassky", "carlsen", "morphy", "lasker", "steinitz"];
  const isLegendGame = famousPlayers.some(p => whiteLower.includes(p) || blackLower.includes(p));
  if (isLegendGame) {
    priority += 30;
    reasons.push("Legend Game");
  }

  // Has result
  if (game.result !== "*" && game.result !== "?") {
    priority += 10;
    reasons.push("Complete Game");
  }

  // Good length
  if (moveCount >= 40 && moveCount <= 100) {
    priority += 5;
  }

  return { priority, reasons };
}

function extractGameFromLegend(legendGame: LegendGame, sourceFile: string): ExtractedGame | null {
  try {
    const chess = new Chess();
    
    // Parse PGN
    try {
      chess.loadPgn(legendGame.pgn, { sloppy: true });
    } catch (error) {
      return null; // Invalid PGN
    }

    const moves = chess.history({ verbose: false });
    if (moves.length < 10) {
      return null; // Too short
    }

    // Extract year
    let year = 1900;
    if (legendGame.date) {
      const yearMatch = legendGame.date.match(/(\d{4})/);
      if (yearMatch) {
        year = parseInt(yearMatch[1], 10);
      }
    }

    // Determine opening
    let opening = "";
    if (legendGame.eco) {
      opening = legendGame.eco;
    } else if (moves.length >= 4) {
      const firstMoves = moves.slice(0, 4).join(" ");
      if (firstMoves.includes("e4 e5")) opening = "King's Pawn Game";
      else if (firstMoves.includes("d4 d5")) opening = "Queen's Pawn Game";
      else if (firstMoves.includes("e4 c5")) opening = "Sicilian Defense";
      else if (firstMoves.includes("d4 Nf6")) opening = "Indian Defense";
    }

    const hasResult = legendGame.result === "1-0" || legendGame.result === "0-1" || legendGame.result === "1/2-1/2";
    const result: "1-0" | "0-1" | "1/2-1/2" = hasResult ? legendGame.result : "1/2-1/2";

    const { priority, reasons } = calculatePriority(legendGame, moves.length);

    return {
      white: legendGame.white,
      black: legendGame.black,
      year,
      event: legendGame.event || "Unknown Event",
      result,
      opening: opening || "Unknown Opening",
      eco: legendGame.eco || "",
      site: legendGame.site,
      date: legendGame.date,
      round: legendGame.round,
      moves,
      pgn: legendGame.pgn,
      moveCount: moves.length,
      hasResult,
      isValid: true,
      sourceFile: path.basename(sourceFile),
      priority,
      notableReasons: reasons,
    };
  } catch (error) {
    return null;
  }
}

async function main() {
  const outputFile = path.join(__dirname, "../notable-games-extracted.json");
  const legendsDir = path.join(__dirname, "../public/data/legends");

  console.log("\n🎯 Extracting Notable Games from Legend JSON Files\n");
  console.log(`📁 Legends Directory: ${legendsDir}`);
  console.log(`📄 Output: ${outputFile}\n`);

  if (!fs.existsSync(legendsDir)) {
    console.error(`❌ Legends directory not found: ${legendsDir}`);
    process.exit(1);
  }

  const legendFiles = fs.readdirSync(legendsDir)
    .filter(f => f.endsWith("-games.json") && f.startsWith("legend-"));

  console.log(`📚 Found ${legendFiles.length} legend game files\n`);

  const allGames: ExtractedGame[] = [];

  for (const file of legendFiles) {
    const filePath = path.join(legendsDir, file);
    console.log(`📖 Reading ${file}...`);
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const legendGames: LegendGame[] = Array.isArray(data) ? data : [];
      
      let extracted = 0;
      for (const legendGame of legendGames) {
        const game = extractGameFromLegend(legendGame, filePath);
        if (game) {
          allGames.push(game);
          extracted++;
        }
      }
      
      console.log(`   ✅ Extracted ${extracted} valid games from ${legendGames.length} total\n`);
    } catch (error) {
      console.log(`   ❌ Error reading ${file}: ${error}\n`);
    }
  }

  // Sort by priority
  allGames.sort((a, b) => b.priority - a.priority);

  console.log(`\n✅ Total games extracted: ${allGames.length}\n`);
  console.log(`📊 Top priorities: ${allGames.slice(0, 10).map(g => g.priority).join(", ")}\n`);

  fs.writeFileSync(outputFile, JSON.stringify({ games: allGames }, null, 2));

  console.log(`💾 Saved ${allGames.length} games to: ${outputFile}\n`);
  console.log("✨ Ready for next step: Generate game entries!");
  console.log(`   npx tsx scripts/generateGameEntries.ts ${outputFile} generated-game-entries.json\n`);
}

main().catch(console.error);

