#!/usr/bin/env tsx
/**
 * Integrate validated game entries into games.ts
 * 
 * Takes validated game entries and appends them to the instructiveGames array
 * in src/data/instructiveGames/games.ts
 * 
 * Usage:
 *   npx tsx scripts/integrateGames.ts [validated-games-file]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  moves: Array<{
    move: string;
    fen: string;
    comment?: string;
    isKeyMove?: boolean;
    evaluation?: string;
  }>;
}

/**
 * Convert game entry to TypeScript code
 */
function gameToTypeScript(game: GameEntry): string {
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  const indent4 = indent3 + indent;
  
  let code = `${indent}{\n`;
  code += `${indent2}id: '${game.id}',\n`;
  code += `${indent2}dayNumber: ${game.dayNumber},\n`;
  code += `${indent2}white: '${game.white.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}black: '${game.black.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}year: ${game.year},\n`;
  code += `${indent2}event: '${game.event.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}result: '${game.result}',\n`;
  code += `${indent2}opening: '${game.opening.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}eco: '${game.eco}',\n`;
  code += `${indent2}title: '${game.title.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}themes: [${game.themes.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(", ")}],\n`;
  code += `${indent2}era: '${game.era}',\n`;
  code += `${indent2}category: '${game.category}',\n`;
  code += `${indent2}difficulty: ${game.difficulty},\n`;
  code += `${indent2}whyInstructive: \`${game.whyInstructive.replace(/`/g, "\\`")}\`,\n`;
  code += `${indent2}keyLessons: [\n`;
  game.keyLessons.forEach((lesson) => {
    code += `${indent3}\`${lesson.replace(/`/g, "\\`")}\`,\n`;
  });
  code += `${indent2}],\n`;
  
  if (game.historicalContext) {
    code += `${indent2}historicalContext: \`${game.historicalContext.replace(/`/g, "\\`")}\`,\n`;
  }
  
  code += `${indent2}moves: [\n`;
  game.moves.forEach((move, index) => {
    code += `${indent3}{\n`;
    code += `${indent4}move: '${move.move.replace(/'/g, "\\'")}',\n`;
    code += `${indent4}fen: '${move.fen}',\n`;
    if (move.comment) {
      code += `${indent4}comment: \`${move.comment.replace(/`/g, "\\`")}\`,\n`;
    }
    if (move.isKeyMove) {
      code += `${indent4}isKeyMove: true,\n`;
    }
    if (move.evaluation) {
      code += `${indent4}evaluation: '${move.evaluation}',\n`;
    }
    code += `${indent3}}${index < game.moves.length - 1 ? "," : ""}\n`;
  });
  code += `${indent2}],\n`;
  code += `${indent}},\n`;
  
  return code;
}

/**
 * Main function
 */
async function main() {
  const gamesFile =
    process.argv[2] || path.join(__dirname, "../generated-game-entries.json");
  const gamesTsPath = path.join(__dirname, "../src/data/instructiveGames/games.ts");
  
  console.log("\n📝 Integrating Game Entries\n");
  console.log(`📁 Input: ${gamesFile}`);
  console.log(`📄 Output: ${gamesTsPath}\n`);
  
  if (!fs.existsSync(gamesFile)) {
    console.error(`❌ Games file not found: ${gamesFile}`);
    console.error(`   Run: npx tsx scripts/generateGameEntries.ts`);
    process.exit(1);
  }
  
  // Load games
  const data = JSON.parse(fs.readFileSync(gamesFile, "utf8"));
  const games: GameEntry[] = data.games || [];
  
  console.log(`📚 Loaded ${games.length} games to integrate\n`);
  
  // Generate TypeScript code for new games
  const newGamesCode = games.map((game) => {
    const dayComment = `\n  // ==========================================\n  // DAY ${game.dayNumber} - ${game.title.toUpperCase()}\n  // ==========================================`;
    return dayComment + "\n" + gameToTypeScript(game);
  }).join("\n");
  
  // Write to a separate file for review
  const outputFile = path.join(__dirname, "../generated-games-code.ts");
  fs.writeFileSync(outputFile, newGamesCode, "utf8");
  
  console.log(`\n✅ Generated TypeScript code for ${games.length} games`);
  console.log(`\n📄 Output file: ${outputFile}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the generated code: ${outputFile}`);
  console.log(`   2. Copy the games into the instructiveGames array in games.ts`);
  console.log(`   3. Run: npx tsx scripts/validateInstructiveGames.ts`);
  console.log(`   4. Test the application to ensure games load correctly`);
}

main().catch(console.error);

