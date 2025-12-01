#!/usr/bin/env node
/**
 * Download comprehensive game databases for legends from PGN Mentor
 * 
 * Usage:
 *   node scripts/downloadLegendGames.mjs <legend> [output-dir]
 * 
 * Examples:
 *   node scripts/downloadLegendGames.mjs fischer ./data/pgns
 *   node scripts/downloadLegendGames.mjs capablanca ./data/pgns
 *   node scripts/downloadLegendGames.mjs steinitz ./data/pgns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PGN Mentor URLs for comprehensive databases
const PGN_MENTOR_URLS = {
  fischer: 'https://www.pgnmentor.com/players/Fischer.pgn',
  capablanca: 'https://www.pgnmentor.com/players/Capablanca.pgn',
  steinitz: 'https://www.pgnmentor.com/players/Steinitz.pgn',
};

// Alternative: Direct links that might be more reliable
const ALTERNATIVE_SOURCES = {
  fischer: [
    'https://raw.githubusercontent.com/niklasf/python-chess/master/chess/pgn.py', // Just an example structure
    // You can add more sources here
  ],
  capablanca: [],
  steinitz: [],
};

async function downloadFile(url, outputPath) {
  try {
    console.log(`📥 Downloading from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Check if we got HTML instead of PGN (common with redirects)
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      throw new Error('Received HTML instead of PGN. URL may have changed or require authentication.');
    }
    
    // Check if it looks like PGN
    if (!text.includes('[Event') && !text.includes('1.')) {
      throw new Error('Downloaded file does not appear to be valid PGN.');
    }
    
    fs.writeFileSync(outputPath, text, 'utf8');
    console.log(`✅ Downloaded ${(text.length / 1024).toFixed(2)} KB to: ${outputPath}`);
    
    // Count games (rough estimate)
    const gameCount = (text.match(/\[Event/g) || []).length;
    console.log(`📊 Estimated ${gameCount} games found`);
    
    return true;
  } catch (error) {
    console.error(`❌ Download failed: ${error.message}`);
    return false;
  }
}

async function downloadFromChessGames(legend) {
  // Chessgames.com requires different approach - manual download recommended
  const chessGamesUrls = {
    fischer: 'https://www.chessgames.com/perl/chess.pl?page=1&pid=15833&playercomp=white&pid2=15833&playercomp2=white&moves=on',
    capablanca: 'https://www.chessgames.com/perl/chess.pl?page=1&pid=15940',
    steinitz: 'https://www.chessgames.com/perl/chess.pl?page=1&pid=13187',
  };
  
  console.log(`\n💡 For comprehensive databases, also check:\n   ${chessGamesUrls[legend]}`);
  console.log(`   (Right-click -> "Save Page As" -> Download as PGN)`);
}

function main() {
  const legend = process.argv[2];
  const outputDir = process.argv[3] || path.join(__dirname, '../data/pgns');
  
  if (!legend || !['fischer', 'capablanca', 'steinitz'].includes(legend)) {
    console.error('Usage: node scripts/downloadLegendGames.mjs <legend> [output-dir]');
    console.error('Legends: fischer, capablanca, steinitz');
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }
  
  const url = PGN_MENTOR_URLS[legend];
  const outputPath = path.join(outputDir, `${legend}.pgn`);
  
  console.log(`\n🎯 Downloading ${legend.toUpperCase()} games database...`);
  console.log(`   Target: ${url}`);
  console.log(`   Output: ${outputPath}\n`);
  
  downloadFile(url, outputPath).then((success) => {
    if (success) {
      console.log(`\n✅ Success! Next steps:`);
      console.log(`   1. Verify the PGN file: ${outputPath}`);
      console.log(`   2. Parse it: npx tsx scripts/parseLegendPGNs.ts ${legend} ${outputPath} ./public/data/legends`);
      console.log(`   3. Check the generated JSON files in ./public/data/legends/`);
    } else {
      console.log(`\n❌ Download failed. Try manual download:`);
      console.log(`   1. Visit: ${url}`);
      console.log(`   2. Save as: ${outputPath}`);
      console.log(`   3. Then run the parser script`);
      
      downloadFromChessGames(legend);
    }
  });
}

main();

