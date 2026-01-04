import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';
import fs from 'fs';

// Read validation results
const validationResults = JSON.parse(fs.readFileSync('scripts/validation-results.json', 'utf-8'));

// Get all games with errors
const gamesWithErrors = validationResults.filter((r: any) => r.status === 'ERROR');

console.log(`Found ${gamesWithErrors.length} games with errors that need PGN fixes.\n`);
console.log('Games needing PGN fixes:');
gamesWithErrors.forEach((g: any) => {
  console.log(`  Day ${g.dayNumber}: ${g.gameId} (error at move ${g.errorMove})`);
});

console.log(`\nThis script will help identify which games need PGN searches.`);
console.log(`For each game, search for: "[Player1] [Player2] [Year] [Event] complete PGN"`);


