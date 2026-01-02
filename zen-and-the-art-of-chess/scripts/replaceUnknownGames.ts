#!/usr/bin/env tsx
/**
 * Replace Unknown player games with games from known players
 * 
 * This script:
 * 1. Finds all games in games.ts with Unknown players
 * 2. Re-extracts games from PGN files (filtering out Unknown players)
 * 3. Generates replacement games for those day numbers
 * 4. Outputs a report of what needs to be replaced
 * 
 * Usage:
 *   npx tsx scripts/replaceUnknownGames.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesTsPath = path.join(__dirname, "../src/data/instructiveGames/games.ts");

interface UnknownGameInfo {
  dayNumber: number;
  id: string;
  startLine: number;
  endLine: number;
}

/**
 * Find all games with Unknown players
 */
function findUnknownGames(): UnknownGameInfo[] {
  const content = fs.readFileSync(gamesTsPath, "utf8");
  const lines = content.split("\n");
  const unknownGames: UnknownGameInfo[] = [];
  
  let currentDay = 0;
  let currentId = "";
  let gameStartLine = 0;
  let inGameObject = false;
  let braceDepth = 0;
  let hasUnknown = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for day number comment
    const dayMatch = line.match(/DAY (\d+)/i);
    if (dayMatch) {
      currentDay = parseInt(dayMatch[1], 10);
    }
    
    // Check for id
    const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      currentId = idMatch[1];
    }
    
    // Check for Unknown players
    if (line.includes("white: 'Unknown'") || line.includes('white: "Unknown"') ||
        line.includes("black: 'Unknown'") || line.includes('black: "Unknown"')) {
      hasUnknown = true;
    }
    
    // Track game object boundaries
    if (line.trim().startsWith("{") && !inGameObject) {
      inGameObject = true;
      gameStartLine = i;
      braceDepth = 1;
    } else if (inGameObject) {
      if (line.includes("{")) braceDepth++;
      if (line.includes("}")) braceDepth--;
      
      if (braceDepth === 0 && line.includes("}")) {
        // End of game object
        if (hasUnknown && currentDay > 0) {
          unknownGames.push({
            dayNumber: currentDay,
            id: currentId,
            startLine: gameStartLine,
            endLine: i,
          });
        }
        inGameObject = false;
        hasUnknown = false;
        currentDay = 0;
        currentId = "";
      }
    }
  }
  
  return unknownGames;
}

/**
 * Main function
 */
async function main() {
  console.log("\n🔍 Finding Unknown Player Games\n");
  
  const unknownGames = findUnknownGames();
  
  console.log(`❌ Found ${unknownGames.length} games with Unknown players\n`);
  
  if (unknownGames.length === 0) {
    console.log("✅ No Unknown games found! All games have known players.");
    return;
  }
  
  // Group by day number
  const dayNumbers = unknownGames.map(g => g.dayNumber).sort((a, b) => a - b);
  console.log(`📅 Days with Unknown games: ${dayNumbers.join(", ")}\n`);
  
  console.log("\n📋 Next steps:");
  console.log("1. Re-extract games from PGN files (filtering Unknown players):");
  console.log("   npx tsx scripts/extractNotableGamesFromPGNs.ts notable-games-extracted.json");
  console.log("\n2. Generate replacement games for these days:");
  console.log(`   npx tsx scripts/generateGameEntries.ts notable-games-extracted.json generated-game-entries.json`);
  console.log("\n3. Review and integrate the replacement games into games.ts");
  
  // Write report
  const reportPath = path.join(__dirname, "../unknown-games-report.json");
  fs.writeFileSync(reportPath, JSON.stringify({
    totalUnknownGames: unknownGames.length,
    dayNumbers: dayNumbers,
    games: unknownGames,
  }, null, 2));
  
  console.log(`\n📄 Detailed report saved to: ${reportPath}\n`);
}

main().catch(console.error);

