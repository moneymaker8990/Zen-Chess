#!/usr/bin/env tsx
/**
 * Extract real, verified chess games from PGN files
 * Use these to populate/update the 365 instructive games
 * 
 * This is the EFFICIENT way - uses existing PGN files you already have!
 * 
 * Usage:
 *   npx tsx scripts/extractGamesFromPGNs.ts [output-json]
 * 
 * Examples:
 *   npx tsx scripts/extractGamesFromPGNs.ts
 *   npx tsx scripts/extractGamesFromPGNs.ts extracted-games.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Chess } from "chess.js";
import * as pgnParser from "@mliebelt/pgn-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExtractedGame {
  // Game metadata
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
  
  // The actual moves (verified, legal)
  moves: string[]; // SAN notation
  pgn: string;     // Full PGN string
  
  // Quality indicators
  moveCount: number;
  hasResult: boolean;
  isValid: boolean;
  
  // Source info
  sourceFile: string;
}

/**
 * Parse a PGN file and extract all valid games
 */
function extractGamesFromPGN(pgnFilePath: string): ExtractedGame[] {
  console.log(`📖 Reading ${pgnFilePath}...`);
  
  if (!fs.existsSync(pgnFilePath)) {
    console.log(`   ⚠️  File not found, skipping`);
    return [];
  }
  
  const pgnContent = fs.readFileSync(pgnFilePath, "utf8");
  const games: ExtractedGame[] = [];
  
  try {
    // Parse PGN
    const parsedGames = pgnParser.parse(pgnContent);
    
    // Split raw PGN into individual games
    const rawGameStrings = pgnContent
      .split(/(?=\[Event)/)
      .map(g => g.trim())
      .filter(g => g.length > 0 && g.startsWith('['));
    
    console.log(`   Found ${parsedGames.length} games`);
    
    for (let i = 0; i < parsedGames.length; i++) {
      const parsed = parsedGames[i];
      const rawPgn = rawGameStrings[i] || "";
      
      try {
        // Verify moves are legal using chess.js
        const chess = new Chess();
        const moves: string[] = [];
        let isValid = true;
        
        if (parsed.moves && Array.isArray(parsed.moves)) {
          for (const moveNode of parsed.moves) {
            try {
              const move = chess.move(moveNode.move.notation);
              if (move) {
                moves.push(move.san);
              } else {
                isValid = false;
                break;
              }
            } catch (error) {
              isValid = false;
              break;
            }
          }
        }
        
        if (!isValid || moves.length === 0) {
          continue; // Skip invalid games
        }
        
        // Extract metadata
        const headers = parsed.tags || {};
        const white = headers.White || headers.white || "Unknown";
        const black = headers.Black || headers.black || "Unknown";
        const result = (headers.Result || headers.result || "*").trim() as "1-0" | "0-1" | "1/2-1/2";
        const event = headers.Event || headers.event || "Unknown";
        const eco = headers.ECO || headers.eco || "";
        const site = headers.Site || headers.site;
        const date = headers.Date || headers.date;
        const round = headers.Round || headers.round;
        
        // Extract year from date
        let year = 1900;
        if (date) {
          const yearMatch = date.match(/(\d{4})/);
          if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
          }
        }
        
        // Determine opening name from ECO or first moves
        let opening = eco || "";
        if (!opening && moves.length >= 4) {
          // Try to infer from first moves
          const firstMoves = moves.slice(0, 4).join(" ");
          if (firstMoves.includes("e4 e5")) opening = "King's Pawn Game";
          else if (firstMoves.includes("d4 d5")) opening = "Queen's Pawn Game";
          else if (firstMoves.includes("e4 c5")) opening = "Sicilian Defense";
          else if (firstMoves.includes("d4 Nf6")) opening = "Indian Defense";
        }
        
        const game: ExtractedGame = {
          white,
          black,
          year,
          event,
          result: result === "1-0" || result === "0-1" || result === "1/2-1/2" ? result : "1/2-1/2",
          opening: opening || "Unknown Opening",
          eco: eco || "",
          site,
          date,
          round,
          moves,
          pgn: rawPgn.trim(),
          moveCount: moves.length,
          hasResult: result !== "*",
          isValid: true,
          sourceFile: path.basename(pgnFilePath),
        };
        
        games.push(game);
      } catch (error) {
        // Skip games that fail to parse
        continue;
      }
    }
    
    console.log(`   ✅ Extracted ${games.length} valid games`);
    return games;
  } catch (error) {
    console.error(`   ❌ Error parsing ${pgnFilePath}:`, error);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  const outputFile = process.argv[2] || path.join(__dirname, "../extracted-games.json");
  const pgnDir = path.join(__dirname, "../data/pgns");
  
  console.log("\n🎯 Extracting Real Games from PGN Files\n");
  console.log(`📁 PGN Directory: ${pgnDir}`);
  console.log(`📄 Output: ${outputFile}\n`);
  
  if (!fs.existsSync(pgnDir)) {
    console.error(`❌ PGN directory not found: ${pgnDir}`);
    process.exit(1);
  }
  
  // Find all PGN files
  const pgnFiles: string[] = [];
  
  // Top-level PGN files
  const files = fs.readdirSync(pgnDir);
  for (const file of files) {
    const filePath = path.join(pgnDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith(".pgn")) {
      pgnFiles.push(filePath);
    } else if (stat.isDirectory()) {
      // Check subdirectories
      const subFiles = fs.readdirSync(filePath);
      for (const subFile of subFiles) {
        if (subFile.endsWith(".pgn")) {
          pgnFiles.push(path.join(filePath, subFile));
        }
      }
    }
  }
  
  console.log(`📚 Found ${pgnFiles.length} PGN files to process\n`);
  
  // Extract games from all PGN files
  const allGames: ExtractedGame[] = [];
  
  for (const pgnFile of pgnFiles) {
    const games = extractGamesFromPGN(pgnFile);
    allGames.push(...games);
  }
  
  console.log(`\n✅ Total games extracted: ${allGames.length}\n`);
  
  // Sort by quality (games with results, more moves, etc.)
  allGames.sort((a, b) => {
    // Prefer games with results
    if (a.hasResult !== b.hasResult) {
      return a.hasResult ? -1 : 1;
    }
    // Prefer longer games (more instructive)
    if (a.moveCount !== b.moveCount) {
      return b.moveCount - a.moveCount;
    }
    // Prefer more recent games
    return b.year - a.year;
  });
  
  // Statistics
  const stats = {
    total: allGames.length,
    withResults: allGames.filter(g => g.hasResult).length,
    byResult: {
      "1-0": allGames.filter(g => g.result === "1-0").length,
      "0-1": allGames.filter(g => g.result === "0-1").length,
      "1/2-1/2": allGames.filter(g => g.result === "1/2-1/2").length,
    },
    bySource: {} as Record<string, number>,
    avgMoveCount: allGames.reduce((sum, g) => sum + g.moveCount, 0) / allGames.length,
    yearRange: {
      min: Math.min(...allGames.map(g => g.year)),
      max: Math.max(...allGames.map(g => g.year)),
    },
  };
  
  // Count by source file
  allGames.forEach(game => {
    stats.bySource[game.sourceFile] = (stats.bySource[game.sourceFile] || 0) + 1;
  });
  
  console.log("📊 Statistics:");
  console.log(`   Total games: ${stats.total}`);
  console.log(`   With results: ${stats.withResults}`);
  console.log(`   White wins: ${stats.byResult["1-0"]}`);
  console.log(`   Black wins: ${stats.byResult["0-1"]}`);
  console.log(`   Draws: ${stats.byResult["1/2-1/2"]}`);
  console.log(`   Average moves: ${stats.avgMoveCount.toFixed(1)}`);
  console.log(`   Year range: ${stats.yearRange.min} - ${stats.yearRange.max}`);
  console.log(`\n   By source file:`);
  Object.entries(stats.bySource)
    .sort((a, b) => b[1] - a[1])
    .forEach(([file, count]) => {
      console.log(`     ${file}: ${count} games`);
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
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the extracted games: ${outputFile}`);
  console.log(`   2. Use these games to populate/update your 365 instructive games`);
  console.log(`   3. These are REAL, VERIFIED games with legal moves from your PGN files`);
  console.log(`\n✨ Tip: You now have ${allGames.length} real games ready to use!`);
}

main().catch(console.error);

