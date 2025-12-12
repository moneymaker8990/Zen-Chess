// Helper to extract a single game's PGN from a multi-game file
import fs from 'fs';

function extractSingleGame(pgnContent, gameIndex) {
  // Split by double newline + [Event pattern
  const games = pgnContent.split(/\n\n+(?=\[Event)/);
  
  if (games[gameIndex]) {
    // Get just this game, remove any trailing content that might be next game
    let gamePgn = games[gameIndex].trim();
    
    // Remove anything after the game result (1-0, 0-1, 1/2-1/2)
    const resultMatch = gamePgn.match(/(1-0|0-1|1\/2-1\/2|\*)\s*$/m);
    if (resultMatch) {
      const resultIndex = resultMatch.index + resultMatch[0].length;
      gamePgn = gamePgn.substring(0, resultIndex).trim();
    }
    
    return gamePgn;
  }
  
  return null;
}

// Test
const pgnContent = fs.readFileSync('data/pgns/alekhine/Alekhine.pgn', 'utf8');
const firstGame = extractSingleGame(pgnContent, 0);

console.log('First game length:', firstGame?.length || 0);
console.log('First 300 chars:');
console.log(firstGame?.substring(0, 300) || 'NOT FOUND');













