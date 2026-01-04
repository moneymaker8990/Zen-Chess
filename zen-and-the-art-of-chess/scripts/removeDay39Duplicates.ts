import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesPath = path.join(__dirname, '../src/data/instructiveGames/games.ts');
let content = fs.readFileSync(gamesPath, 'utf-8');

// Find the line with Qf2+ (the correct end of Day 39)
const lines = content.split('\n');
let qf2Line = -1;
let closingBracketLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Qf2+") && lines[i].includes("Check! White resigns. Alekhine")) {
    qf2Line = i;
    // Find the closing bracket of the moves array
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].trim() === '],') {
        closingBracketLine = j;
        break;
      }
    }
    break;
  }
}

if (qf2Line === -1 || closingBracketLine === -1) {
  console.log('Could not find Qf2+ line or closing bracket');
  process.exit(1);
}

console.log(`Found Qf2+ at line ${qf2Line + 1}`);
console.log(`Found closing bracket at line ${closingBracketLine + 1}`);

// Check if there are duplicate moves after Qf2+
if (closingBracketLine > qf2Line + 1) {
  console.log(`Removing ${closingBracketLine - qf2Line - 1} duplicate move lines`);
  // Remove lines from qf2Line + 1 to closingBracketLine - 1
  const newLines = [
    ...lines.slice(0, qf2Line + 1),
    ...lines.slice(closingBracketLine)
  ];
  fs.writeFileSync(gamesPath, newLines.join('\n'));
  console.log('Duplicate moves removed!');
} else {
  console.log('No duplicate moves found');
}
