// Test position matching to see why legends aren't finding their real moves
import fs from 'fs';

const legends = ['fischer', 'capablanca', 'steinitz', 'alekhine', 'spassky'];

// Standard starting position and common opening positions
const testPositions = [
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // Starting position
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', // After 1.e4
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', // After 1.e4 e5
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', // After 1.d4
];

console.log('🔍 POSITION MATCHING TEST\n');
console.log('Testing if legends have moves for common positions...\n');

for (const legend of legends) {
  console.log(`━━━━━━ ${legend.toUpperCase()} ━━━━━━`);
  
  try {
    const positionsFile = `public/data/legends/legend-${legend}-positions.json`;
    const content = fs.readFileSync(positionsFile, 'utf8');
    const positionIndex = JSON.parse(content);
    
    const totalPositions = Object.keys(positionIndex).length;
    console.log(`Total positions: ${totalPositions}`);
    
    // Check each test position
    for (const testFen of testPositions) {
      const shortFen = testFen.split(' ').slice(0, 4).join(' ');
      
      // Exact match
      if (positionIndex[testFen]) {
        const entries = positionIndex[testFen];
        const moves = [...new Set(entries.map(e => e.move))];
        console.log(`  ✓ EXACT: "${testFen.substring(0, 30)}..." → ${moves.slice(0, 3).join(', ')} (${entries.length} games)`);
      } else {
        // Try normalized match (without move counters)
        let found = false;
        for (const [fen, entries] of Object.entries(positionIndex)) {
          const fenShort = fen.split(' ').slice(0, 4).join(' ');
          if (fenShort === shortFen) {
            const moves = [...new Set(entries.map(e => e.move))];
            console.log(`  ~ NORMALIZED: "${testFen.substring(0, 30)}..." → ${moves.slice(0, 3).join(', ')}`);
            found = true;
            break;
          }
        }
        if (!found) {
          console.log(`  ✗ NOT FOUND: "${testFen.substring(0, 30)}..."`);
        }
      }
    }
    
    // Show a few sample FENs from the index
    console.log(`\n  Sample FENs in index:`);
    const sampleFens = Object.keys(positionIndex).slice(0, 3);
    for (const fen of sampleFens) {
      const entries = positionIndex[fen];
      console.log(`    "${fen.substring(0, 40)}..." (${entries.length} entries)`);
    }
    
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
  }
  
  console.log('');
}

console.log('\n📋 DIAGNOSIS:');
console.log('If positions show "NOT FOUND" for common openings, the FEN format may not match.');
console.log('Compare the FEN format in the index vs what the game sends.\n');









