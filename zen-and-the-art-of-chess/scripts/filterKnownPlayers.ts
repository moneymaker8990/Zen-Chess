#!/usr/bin/env tsx
/**
 * Quick filter script to remove Unknown players from extracted games JSON
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, "../notable-games-extracted.json");
const outputFile = path.join(__dirname, "../notable-games-extracted-filtered.json");

console.log("\n🔍 Filtering games with known players...\n");

if (!fs.existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const games = data.games || [];

console.log(`📚 Total games: ${games.length}`);

const filtered = games.filter((g: any) => 
  g.white && 
  g.black && 
  g.white !== "Unknown" && 
  g.black !== "Unknown" &&
  g.white.trim() !== "" &&
  g.black.trim() !== ""
);

console.log(`✅ Games with known players: ${filtered.length}`);
console.log(`❌ Removed: ${games.length - filtered.length} games with Unknown players\n`);

fs.writeFileSync(outputFile, JSON.stringify({ games: filtered }, null, 2));

console.log(`📄 Saved to: ${outputFile}\n`);



