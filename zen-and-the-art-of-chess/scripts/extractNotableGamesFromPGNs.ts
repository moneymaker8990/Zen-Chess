#!/usr/bin/env tsx
/**
 * Extract Notable Games from PGN Files
 * 
 * Filters for World Championship games, Candidates, famous tournaments,
 * and other notable games from existing PGN files.
 * 
 * Usage:
 *   npx tsx scripts/extractNotableGamesFromPGNs.ts [output-json]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Chess } from "chess.js";
import * as pgnParser from "@mliebelt/pgn-parser";

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
  moves: string[]; // SAN notation
  pgn: string;
  moveCount: number;
  hasResult: boolean;
  isValid: boolean;
  sourceFile: string;
  priority: number; // Higher = more notable
  notableReasons: string[];
}

// Keywords that indicate notable games
const NOTABLE_KEYWORDS = {
  worldChampionship: ["world championship", "wc match", "world title", "world champ"],
  candidates: ["candidates", "interzonal", "qualifying"],
  majorTournaments: [
    "wijk aan zee", "tata steel", "corus",
    "linares", "dortmund", "wch", "fide",
    "grand prix", "world cup", "olympiad",
    "championship", "moscow", "london",
    "new york", "zurich", "capablanca",
    "petrosian", "botvinnik", "kasparov",
    "carlsen", "match"
  ],
  famousEvents: [
    "immortal", "evergreen", "opera",
    "steinitz", "lasker", "capablanca",
    "alekhine", "euwe", "botvinnik",
    "smyslov", "tal", "petrosian",
    "spassky", "fischer", "karpov",
    "kasparov", "kramnik", "anand",
    "carlsen"
  ]
};

/**
 * Calculate priority score for a game (higher = more notable)
 */
function calculatePriority(game: {
  event: string;
  white: string;
  black: string;
  round?: string;
  year: number;
  moveCount: number;
  hasResult: boolean;
}): { priority: number; reasons: string[] } {
  const eventLower = game.event.toLowerCase();
  const whiteLower = game.white.toLowerCase();
  const blackLower = game.black.toLowerCase();
  const reasons: string[] = [];
  let priority = 0;

  // World Championship games (highest priority)
  for (const keyword of NOTABLE_KEYWORDS.worldChampionship) {
    if (eventLower.includes(keyword)) {
      priority += 100;
      reasons.push("World Championship");
      break;
    }
  }

  // Candidates/Qualifying events
  for (const keyword of NOTABLE_KEYWORDS.candidates) {
    if (eventLower.includes(keyword)) {
      priority += 80;
      reasons.push("Candidates/Qualifying");
      break;
    }
  }

  // Major tournaments
  for (const keyword of NOTABLE_KEYWORDS.majorTournaments) {
    if (eventLower.includes(keyword)) {
      priority += 50;
      reasons.push("Major Tournament");
      break;
    }
  }

  // Round indicators (later rounds in tournaments are often more important)
  if (game.round) {
    const roundLower = game.round.toLowerCase();
    if (roundLower.includes("final") || roundLower.includes("playoff")) {
      priority += 30;
      reasons.push("Final/Playoff round");
    } else if (roundLower.match(/\d+/)) {
      const roundNum = parseInt(roundLower.match(/\d+/)?.[0] || "0");
      if (roundNum >= 10) {
        priority += 20;
        reasons.push("Late round");
      }
    }
  }

  // Famous player matchups (check if both players are legends)
  const legends = [
    "fischer", "capablanca", "steinitz", "lasker", "alekhine",
    "kasparov", "karpov", "carlsen", "tal", "botvinnik",
    "spassky", "anand", "kramnik", "morphy", "petrosian",
    "smyslov", "bronstein", "kortchnoi", "polgar", "judit"
  ];

  const whiteIsLegend = legends.some(l => whiteLower.includes(l));
  const blackIsLegend = legends.some(l => blackLower.includes(l));

  if (whiteIsLegend && blackIsLegend) {
    priority += 40;
    reasons.push("Legend vs Legend");
  } else if (whiteIsLegend || blackIsLegend) {
    priority += 20;
    reasons.push("Features legend");
  }

  // Longer games (more instructive)
  if (game.moveCount >= 60) {
    priority += 10;
    reasons.push("Long game");
  }

  // Games with results (complete games)
  if (game.hasResult) {
    priority += 5;
  }

  // Historical games (older games are often more documented)
  if (game.year < 1950) {
    priority += 15;
    reasons.push("Historical");
  }

  return { priority, reasons };
}

/**
 * Extract and validate a game from parsed PGN
 */
function extractGame(
  parsed: any,
  rawPgn: string,
  sourceFile: string
): ExtractedGame | null {
  try {
    const chess = new Chess();
    const moves: string[] = [];
    
    // Extract headers
    const headers: Record<string, string> = {};
    if (Array.isArray(parsed.headers)) {
      parsed.headers.forEach((h: any) => {
        headers[h.name] = h.value;
      });
    }

    const white = headers.White || headers.white || "Unknown";
    const black = headers.Black || headers.black || "Unknown";
    const event = headers.Event || headers.event || "Unknown";
    const result = (headers.Result || headers.result || "*").trim() as "1-0" | "0-1" | "1/2-1/2";
    const eco = headers.ECO || headers.eco || "";
    const site = headers.Site || headers.site;
    const date = headers.Date || headers.date;
    const round = headers.Round || headers.round;

    // Extract year
    let year = 1900;
    if (date) {
      const yearMatch = date.match(/(\d{4})/);
      if (yearMatch) {
        year = parseInt(yearMatch[1], 10);
      }
    }

    // Load PGN using chess.js (more reliable than manual parsing)
    try {
      chess.loadPgn(rawPgn, { sloppy: true });
      const moveHistory = chess.history({ verbose: false });
      if (moveHistory.length === 0) {
        return null; // No valid moves
      }
      moves.push(...moveHistory);
    } catch (error) {
      return null; // Invalid PGN
    }

    // Determine opening
    let opening = eco || "";
    if (!opening && moves.length >= 4) {
      const firstMoves = moves.slice(0, 4).join(" ");
      if (firstMoves.includes("e4 e5")) opening = "King's Pawn Game";
      else if (firstMoves.includes("d4 d5")) opening = "Queen's Pawn Game";
      else if (firstMoves.includes("e4 c5")) opening = "Sicilian Defense";
      else if (firstMoves.includes("d4 Nf6")) opening = "Indian Defense";
    }

    // Filter out games with Unknown players - they're not acceptable
    if (white === "Unknown" || black === "Unknown" || !white.trim() || !black.trim()) {
      return null; // Skip games with unknown players
    }

    const hasResult = result === "1-0" || result === "0-1" || result === "1/2-1/2";
    
    const { priority, reasons } = calculatePriority({
      event,
      white,
      black,
      round,
      year,
      moveCount: moves.length,
      hasResult,
    });

    return {
      white,
      black,
      year,
      event,
      result: hasResult ? result : "1/2-1/2",
      opening: opening || "Unknown Opening",
      eco: eco || "",
      site,
      date,
      round,
      moves,
      pgn: rawPgn.trim(),
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

/**
 * Extract games from a PGN file
 */
function extractGamesFromFile(pgnFilePath: string): ExtractedGame[] {
  console.log(`📖 Reading ${path.basename(pgnFilePath)}...`);
  
  if (!fs.existsSync(pgnFilePath)) {
    console.log(`   ⚠️  File not found, skipping`);
    return [];
  }

  const pgnContent = fs.readFileSync(pgnFilePath, "utf8");
  const games: ExtractedGame[] = [];

  try {
    const parsedGames = pgnParser.parse(pgnContent);
    const rawGameStrings = pgnContent
      .split(/(?=\[Event)/)
      .map(g => g.trim())
      .filter(g => g.length > 0 && g.startsWith('['));

    console.log(`   Found ${parsedGames.length} games`);

    for (let i = 0; i < parsedGames.length; i++) {
      const parsed = parsedGames[i];
      const rawPgn = rawGameStrings[i] || "";

      const game = extractGame(parsed, rawPgn, pgnFilePath);
      if (game) {
        games.push(game);
      }
    }

    // Sort by priority
    games.sort((a, b) => b.priority - a.priority);

    console.log(`   ✅ Extracted ${games.length} valid games`);
    console.log(`   📊 Top priorities: ${games.slice(0, 5).map(g => g.priority).join(", ")}`);

    return games;
  } catch (error) {
    console.error(`   ❌ Error parsing:`, error);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  const outputFile = process.argv[2] || path.join(__dirname, "../notable-games-extracted.json");
  const pgnDir = path.join(__dirname, "../data/pgns");

  console.log("\n🎯 Extracting Notable Games from PGN Files\n");
  console.log(`📁 PGN Directory: ${pgnDir}`);
  console.log(`📄 Output: ${outputFile}\n`);

  if (!fs.existsSync(pgnDir)) {
    console.error(`❌ PGN directory not found: ${pgnDir}`);
    process.exit(1);
  }

  // Find all PGN files
  const pgnFiles: string[] = [];
  const files = fs.readdirSync(pgnDir);

  for (const file of files) {
    const filePath = path.join(pgnDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && file.endsWith(".pgn")) {
      pgnFiles.push(filePath);
    } else if (stat.isDirectory()) {
      const subFiles = fs.readdirSync(filePath);
      for (const subFile of subFiles) {
        if (subFile.endsWith(".pgn")) {
          pgnFiles.push(path.join(filePath, subFile));
        }
      }
    }
  }

  console.log(`📚 Found ${pgnFiles.length} PGN files to process\n`);

  // Extract games from all files
  const allGames: ExtractedGame[] = [];

  for (const pgnFile of pgnFiles) {
    const games = extractGamesFromFile(pgnFile);
    allGames.push(...games);
  }

  // Sort all games by priority
  allGames.sort((a, b) => b.priority - a.priority);

  console.log(`\n✅ Total games extracted: ${allGames.length}\n`);

  // Statistics
  const stats = {
    total: allGames.length,
    withResults: allGames.filter(g => g.hasResult).length,
    highPriority: allGames.filter(g => g.priority >= 100).length,
    worldChampionship: allGames.filter(g => g.notableReasons.includes("World Championship")).length,
    candidates: allGames.filter(g => g.notableReasons.includes("Candidates/Qualifying")).length,
    legendVsLegend: allGames.filter(g => g.notableReasons.includes("Legend vs Legend")).length,
    bySource: {} as Record<string, number>,
    byEra: {
      romantic: allGames.filter(g => g.year < 1880).length,
      classical: allGames.filter(g => g.year >= 1880 && g.year < 1920).length,
      hypermodern: allGames.filter(g => g.year >= 1920 && g.year < 1940).length,
      soviet: allGames.filter(g => g.year >= 1940 && g.year < 1970).length,
      modern: allGames.filter(g => g.year >= 1970 && g.year < 2000).length,
      contemporary: allGames.filter(g => g.year >= 2000).length,
    },
  };

  allGames.forEach(game => {
    stats.bySource[game.sourceFile] = (stats.bySource[game.sourceFile] || 0) + 1;
  });

  console.log("📊 Statistics:");
  console.log(`   Total games: ${stats.total}`);
  console.log(`   With results: ${stats.withResults}`);
  console.log(`   High priority (≥100): ${stats.highPriority}`);
  console.log(`   World Championship: ${stats.worldChampionship}`);
  console.log(`   Candidates/Qualifying: ${stats.candidates}`);
  console.log(`   Legend vs Legend: ${stats.legendVsLegend}`);
  console.log(`\n   By era:`);
  Object.entries(stats.byEra).forEach(([era, count]) => {
    console.log(`     ${era}: ${count} games`);
  });

  // Save to JSON
  const output = {
    metadata: {
      extractedAt: new Date().toISOString(),
      totalGames: allGames.length,
      stats,
    },
    games: allGames,
  };

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), "utf8");

  console.log(`\n💾 Saved ${allGames.length} games to: ${outputFile}`);
  console.log(`\n📋 Top 20 games by priority:`);
  allGames.slice(0, 20).forEach((game, idx) => {
    console.log(`   ${idx + 1}. [${game.priority}] ${game.white} vs ${game.black} (${game.year}) - ${game.event}`);
    console.log(`      Reasons: ${game.notableReasons.join(", ")}`);
  });

  console.log(`\n✨ Ready for next step: Generate game entries!`);
}

main().catch(console.error);

