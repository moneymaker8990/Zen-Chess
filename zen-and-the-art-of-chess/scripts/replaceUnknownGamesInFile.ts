#!/usr/bin/env tsx
/**
 * Replace Unknown player games in games.ts with real games from generated-game-entries.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesTsPath = path.join(__dirname, "../src/data/instructiveGames/games.ts");
const generatedGamesPath = path.join(__dirname, "../generated-game-entries.json");
const unknownReportPath = path.join(__dirname, "../unknown-games-report.json");

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
  era: string;
  category: string;
  difficulty: number;
  whyInstructive: string;
  keyLessons: string[];
  historicalContext?: string;
  moves: Array<{
    move: string;
    fen: string;
    comment?: string;
    isKeyMove?: boolean;
    evaluation?: string;
  }>;
}

function gameToTypeScript(game: GameEntry): string {
  const indent = "  ";
  const indent2 = indent + indent;
  const indent3 = indent2 + indent;
  const indent4 = indent3 + indent;
  
  let code = `${indent}{\n`;
  code += `${indent2}id: '${game.id.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}dayNumber: ${game.dayNumber},\n`;
  code += `${indent2}white: '${game.white.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}black: '${game.black.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}year: ${game.year},\n`;
  code += `${indent2}event: '${game.event.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}result: '${game.result}',\n`;
  code += `${indent2}opening: '${game.opening.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}eco: '${game.eco.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}title: '${game.title.replace(/'/g, "\\'")}',\n`;
  code += `${indent2}themes: [${game.themes.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(", ")}],\n`;
  code += `${indent2}era: '${game.era}',\n`;
  code += `${indent2}category: '${game.category}',\n`;
  code += `${indent2}difficulty: ${game.difficulty},\n`;
  code += `${indent2}whyInstructive: \`${game.whyInstructive.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,\n`;
  code += `${indent2}keyLessons: [\n`;
  game.keyLessons.forEach((lesson) => {
    code += `${indent3}\`${lesson.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,\n`;
  });
  code += `${indent2}],\n`;
  
  if (game.historicalContext) {
    code += `${indent2}historicalContext: \`${game.historicalContext.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,\n`;
  }
  
  code += `${indent2}moves: [\n`;
  game.moves.forEach((move, index) => {
    code += `${indent3}{\n`;
    code += `${indent4}move: '${move.move.replace(/'/g, "\\'")}',\n`;
    code += `${indent4}fen: '${move.fen}',\n`;
    if (move.comment) {
      code += `${indent4}comment: \`${move.comment.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,\n`;
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

async function main() {
  console.log("\n🔄 Replacing Unknown Games in games.ts\n");

  if (!fs.existsSync(generatedGamesPath)) {
    console.error(`❌ Generated games file not found: ${generatedGamesPath}`);
    console.error(`   Run: npx tsx scripts/generateGameEntries.ts`);
    process.exit(1);
  }

  if (!fs.existsSync(unknownReportPath)) {
    console.error(`❌ Unknown games report not found: ${unknownReportPath}`);
    console.error(`   Run: npx tsx scripts/replaceUnknownGames.ts first`);
    process.exit(1);
  }

  // Load generated games
  const gamesData = JSON.parse(fs.readFileSync(generatedGamesPath, "utf8"));
  const games: GameEntry[] = gamesData.games || [];
  
  // Create map by day number
  const gamesByDay = new Map<number, GameEntry>();
  games.forEach(game => {
    gamesByDay.set(game.dayNumber, game);
  });

  // Load unknown games report
  const report = JSON.parse(fs.readFileSync(unknownReportPath, "utf8"));
  const unknownGames = report.games || [];

  console.log(`📚 Loaded ${games.length} replacement games`);
  console.log(`🎯 Found ${unknownGames.length} Unknown games to replace\n`);

  // Read games.ts
  const content = fs.readFileSync(gamesTsPath, "utf8");
  const lines = content.split("\n");

  // Create a map of replacement ranges (keyed by start line)
  const replacementMap = new Map<number, { end: number; code: string[] }>();
  
  for (const unknownGame of unknownGames) {
    const replacement = gamesByDay.get(unknownGame.dayNumber);
    if (!replacement) {
      console.warn(`⚠️  No replacement found for day ${unknownGame.dayNumber}`);
      continue;
    }

    // Find the comment block start (DAY comment)
    let commentStart = unknownGame.startLine;
    for (let i = unknownGame.startLine; i >= 0 && i >= unknownGame.startLine - 10; i--) {
      if (lines[i].includes(`DAY ${unknownGame.dayNumber}`)) {
        commentStart = i;
        break;
      }
    }

    // Generate replacement code
    const dayComment = `  // ==========================================\n  // DAY ${replacement.dayNumber} - ${replacement.title.toUpperCase()}\n  // ==========================================`;
    const replacementCode = dayComment + "\n" + gameToTypeScript(replacement);
    const replacementLines = replacementCode.split("\n");

    replacementMap.set(commentStart, {
      end: unknownGame.endLine,
      code: replacementLines,
    });
  }

  // Build new content in a single pass
  const newLines: string[] = [];
  let i = 0;
  let replaced = 0;

  while (i < lines.length) {
    const replacement = replacementMap.get(i);
    if (replacement) {
      // Add replacement code
      newLines.push(...replacement.code);
      // Skip to after the replaced block
      i = replacement.end + 1;
      replaced++;
      if (replaced % 50 === 0) {
        console.log(`   Replaced ${replaced} games...`);
      }
    } else {
      newLines.push(lines[i]);
      i++;
    }
  }

  // Write back
  fs.writeFileSync(gamesTsPath, newLines.join("\n"), "utf8");

  console.log(`\n✅ Replaced ${replaced} Unknown games with real games!\n`);
  console.log(`📄 Updated file: ${gamesTsPath}\n`);
  console.log("📋 Next steps:");
  console.log("   1. Review the changes");
  console.log("   2. Run: npx tsx scripts/validateInstructiveGames.ts");
  console.log("   3. Test the application\n");
}

main().catch(console.error);
