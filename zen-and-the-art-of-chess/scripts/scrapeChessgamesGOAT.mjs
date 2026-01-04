#!/usr/bin/env node
/**
 * Scrape ALL notable games from chessgames.com GOAT (Greatest Of All Time) page
 * Downloads all games from ALL eras/decades as PGN files
 * 
 * Usage:
 *   node scripts/scrapeChessgamesGOAT.mjs [output-dir]
 * 
 * Examples:
 *   node scripts/scrapeChessgamesGOAT.mjs ./data/pgns
 */

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.chessgames.com";
const GOAT_URL = "https://www.chessgames.com/perl/goat.pl";

// Rate limiting delay between requests (ms)
const DELAY_MS = 5000; // 5 second delay to be respectful (increased to avoid rate limiting)
const MAX_RETRIES = 5;
const RETRY_DELAY_BASE = 30000; // 30 seconds base delay for retries (much longer)

/**
 * Fetch HTML content from a URL with retry logic
 */
async function fetchHTML(url, retries = MAX_RETRIES) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    
    if (response.status === 429) {
      // Rate limited - wait and retry
      if (retries > 0) {
        const waitTime = RETRY_DELAY_BASE * (MAX_RETRIES - retries + 1);
        console.log(`   ⏳ Rate limited. Waiting ${waitTime / 1000}s before retry (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})...`);
        await sleep(waitTime);
        return fetchHTML(url, retries - 1);
      }
      throw new Error(`HTTP 429: Too Many Requests (exceeded ${MAX_RETRIES} retries)`);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    if (error.message.includes("429") && retries > 0) {
      const waitTime = RETRY_DELAY_BASE * (MAX_RETRIES - retries + 1);
      console.log(`   ⏳ Rate limited. Waiting ${waitTime / 1000}s before retry (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})...`);
      await sleep(waitTime);
      return fetchHTML(url, retries - 1);
    }
    throw error;
  }
}

/**
 * Extract era/decade links from the GOAT page
 * Returns array of {label, decadeParam} objects
 */
function extractEraLinks(html) {
  const $ = cheerio.load(html);
  const eras = [];
  
  // Find all links that point to goat.pl with decade parameter
  $("a").each((i, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();
    
    if (href && (href.includes("goat.pl") || href.includes("goat?"))) {
      // Extract decade parameter from href
      const decadeMatch = href.match(/decade=([^&"']+)/);
      if (decadeMatch) {
        const decadeParam = decadeMatch[1];
        // Also check for "ALL GAMES" which might not have decade param
        if (text.match(/ALL GAMES/i) || text.match(/ALL/i)) {
          eras.push({ label: "ALL GAMES", decadeParam: null, href });
        } else if (decadeParam) {
          eras.push({ label: text || decadeParam, decadeParam, href });
        }
      } else if (text.match(/ALL GAMES/i)) {
        // ALL GAMES link might not have decade parameter
        eras.push({ label: "ALL GAMES", decadeParam: null, href });
      }
    }
  });
  
  // If we didn't find era links in hrefs, check for text patterns
  // and construct decade parameters based on common patterns
  if (eras.length === 0) {
    // Common decade parameters for chessgames.com GOAT page
    const knownEras = [
      { label: "ALL GAMES", decadeParam: null },
      { label: "PRIOR TO 1800", decadeParam: "1800" },
      { label: "1800-1899", decadeParam: "1800" },
      { label: "1900-1909", decadeParam: "1900" },
      { label: "1910-1919", decadeParam: "1910" },
      { label: "1920-1929", decadeParam: "1920" },
      { label: "1930-1939", decadeParam: "1930" },
      { label: "1940-1949", decadeParam: "1940" },
      { label: "1950-1959", decadeParam: "1950" },
      { label: "1960-1969", decadeParam: "1960" },
      { label: "1970-1979", decadeParam: "1970" },
      { label: "1980-1989", decadeParam: "1980" },
      { label: "1990-1999", decadeParam: "1990" },
      { label: "2000-2009", decadeParam: "2000" },
      { label: "2010-2019", decadeParam: "2010" },
      { label: "2020-2029", decadeParam: "2020" },
    ];
    
    // Check if these eras exist in the page text
    const pageText = $.text();
    knownEras.forEach(era => {
      if (pageText.includes(era.label) || era.decadeParam === null) {
        eras.push(era);
      }
    });
  }
  
  // Remove duplicates and sort
  const uniqueEras = [];
  const seen = new Set();
  eras.forEach(era => {
    const key = era.decadeParam || "all";
    if (!seen.has(key)) {
      seen.add(key);
      uniqueEras.push(era);
    }
  });
  
  return uniqueEras;
}

/**
 * Extract game IDs from a GOAT page HTML
 */
function extractGameIds(html) {
  const $ = cheerio.load(html);
  const gameIds = new Set();
  
  // Find all links to chessgame pages (format: /perl/chessgame?gid=XXXXXXX)
  $("a[href*='chessgame']").each((i, el) => {
    const href = $(el).attr("href");
    if (href) {
      const match = href.match(/gid=(\d+)/);
      if (match) {
        gameIds.add(match[1]);
      }
    }
  });
  
  // Also check all links for chessgame references
  $("a").each((i, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("chessgame")) {
      const match = href.match(/gid=(\d+)/);
      if (match) {
        gameIds.add(match[1]);
      }
    }
  });
  
  return Array.from(gameIds);
}

/**
 * Download PGN for a specific game ID
 * Tries multiple methods to get PGN from chessgames.com
 */
async function downloadGamePGN(gameId) {
  // Method 1: Try direct PGN download endpoints (common patterns)
  const directMethods = [
    `${BASE_URL}/perl/download_game.pgn?gid=${gameId}`,
    `${BASE_URL}/perl/chessgame?gid=${gameId}&download=1`,
    `${BASE_URL}/perl/chessgame?gid=${gameId}&format=pgn`,
    `${BASE_URL}/perl/chessgame?gid=${gameId}&pgn=1`,
    `${BASE_URL}/cgi-bin/chessgame?gid=${gameId}&download=1`,
  ];
  
  for (const url of directMethods) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/plain,text/pgn,*/*"
        }
      });
      
      if (!response.ok) {
        continue;
      }
      
      const text = await response.text();
      
      // Check if we got valid PGN (not HTML error page)
      if (text.includes("[Event") || (text.includes("1.") && !text.includes("<!DOCTYPE"))) {
        // Clean up the PGN
        let pgn = text.trim();
        
        // Remove any HTML that might have leaked in
        if (pgn.includes("<!DOCTYPE") || pgn.includes("<html")) {
          continue;
        }
        
        // Ensure it starts with [Event or has moves
        if (pgn.includes("[Event") || pgn.match(/^\s*\d+\./)) {
          return pgn;
        }
      }
    } catch (error) {
      // Try next method
      continue;
    }
  }
  
  // Method 2: Fetch game page and extract download link
  try {
    const gameUrl = `${BASE_URL}/perl/chessgame?gid=${gameId}`;
    const html = await fetchHTML(gameUrl);
    const $ = cheerio.load(html);
    
    // Look for PGN download link - check various possible link texts
    let pgnLink = null;
    
    // Check for links containing "pgn", "download", "export"
    const links = $("a").toArray();
    for (const el of links) {
      const href = $(el).attr("href") || "";
      const text = $(el).text().toLowerCase();
      
      if (href.includes(".pgn") || 
          href.includes("download") || 
          href.includes("export") ||
          text.includes("pgn") ||
          text.includes("download")) {
        pgnLink = href;
        break; // Break loop
      }
    }
    
    if (pgnLink) {
      // Make absolute URL if needed
      if (!pgnLink.startsWith("http")) {
        pgnLink = pgnLink.startsWith("/") 
          ? `${BASE_URL}${pgnLink}`
          : `${BASE_URL}/${pgnLink}`;
      }
      
      // Try to download from the link
      const response = await fetch(pgnLink, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      
      if (response.ok) {
        const text = await response.text();
        if (text.includes("[Event") || (text.includes("1.") && !text.includes("<!DOCTYPE"))) {
          return text.trim();
        }
      }
    }
    
    // Look for PGN embedded in textarea or pre tags
    const pgnText = $("textarea").text() || $("pre").text() || $("code").text();
    if (pgnText && (pgnText.includes("[Event") || pgnText.match(/^\s*\[\w+/m))) {
      return pgnText.trim();
    }
    
  } catch (error) {
    // Silent fail - will be logged at higher level
  }
  
  return null;
}

/**
 * Sleep/delay function
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function
 */
async function main() {
  const outputDir = process.argv[2] || path.join(__dirname, "../data/pgns");
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }
  
  const outputFile = path.join(outputDir, `chessgames-goat-all.pgn`);
  
  console.log(`\n🎯 Scraping ALL games from chessgames.com GOAT page`);
  console.log(`   URL: ${GOAT_URL}`);
  console.log(`   Output: ${outputFile}\n`);
  
  try {
    // Step 1: Use known era list (based on chessgames.com GOAT page structure)
    // We'll try to fetch the main page first, but fall back to known eras if rate limited
    let eras = [];
    
    try {
      console.log("📥 Step 1: Fetching main GOAT page to discover eras...");
      const mainHtml = await fetchHTML(GOAT_URL);
      eras = extractEraLinks(mainHtml);
    } catch (error) {
      if (error.message.includes("429")) {
        console.log("⚠️  Rate limited. Using known era list instead...");
      } else {
        console.log(`⚠️  Could not fetch main page (${error.message}). Using known era list...`);
      }
    }
    
    if (eras.length === 0) {
      // Use known era list based on chessgames.com GOAT page structure
      console.log("📋 Using known era list...");
      eras = [
        { label: "ALL GAMES", decadeParam: null },
        { label: "PRIOR TO 1800", decadeParam: "1800" },
        { label: "1800-1899", decadeParam: "1800" },
        { label: "1900-1909", decadeParam: "1900" },
        { label: "1910-1919", decadeParam: "1910" },
        { label: "1920-1929", decadeParam: "1920" },
        { label: "1930-1939", decadeParam: "1930" },
        { label: "1940-1949", decadeParam: "1940" },
        { label: "1950-1959", decadeParam: "1950" },
        { label: "1960-1969", decadeParam: "1960" },
        { label: "1970-1979", decadeParam: "1970" },
        { label: "1980-1989", decadeParam: "1980" },
        { label: "1990-1999", decadeParam: "1990" },
        { label: "2000-2009", decadeParam: "2000" },
        { label: "2010-2019", decadeParam: "2010" },
        { label: "2020-2029", decadeParam: "2020" },
      ];
    }
    
    console.log(`✅ Found ${eras.length} eras to scrape: ${eras.map(e => e.label).join(", ")}\n`);
    
    // Step 2: Collect all unique game IDs from all eras
    console.log("📥 Step 2: Fetching game lists from each era...\n");
    const allGameIds = new Set();
    const eraGameCounts = {};
    
    for (let i = 0; i < eras.length; i++) {
      const era = eras[i];
      const eraUrl = era.decadeParam 
        ? `${GOAT_URL}?decade=${era.decadeParam}`
        : GOAT_URL;
      
      console.log(`📋 [${i + 1}/${eras.length}] Fetching ${era.label}...`);
      
      try {
        const eraHtml = await fetchHTML(eraUrl);
        const gameIds = extractGameIds(eraHtml);
        
        gameIds.forEach(id => allGameIds.add(id));
        eraGameCounts[era.label] = gameIds.length;
        console.log(`   ✅ Found ${gameIds.length} games (${allGameIds.size} unique total)`);
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        eraGameCounts[era.label] = 0;
      }
      
      // Rate limiting between era fetches
      if (i < eras.length - 1) {
        await sleep(DELAY_MS);
      }
    }
    
    const totalGames = Array.from(allGameIds);
    console.log(`\n✅ Total unique games to download: ${totalGames.length}\n`);
    
    // Step 3: Check for existing file and resume capability
    let existingGameIds = new Set();
    if (fs.existsSync(outputFile)) {
      console.log(`📄 Found existing file: ${outputFile}`);
      const existingContent = fs.readFileSync(outputFile, "utf8");
      // Extract game IDs from existing PGN (try multiple patterns)
      const patterns = [
        /\[Site "[^"]*gid=(\d+)/g,
        /gid=(\d+)/g
      ];
      
      for (const pattern of patterns) {
        const matches = existingContent.matchAll(pattern);
        for (const match of matches) {
          if (match[1] && match[1].length > 4) { // Valid game IDs are usually longer
            existingGameIds.add(match[1]);
          }
        }
      }
      
      console.log(`   Found ${existingGameIds.size} games already downloaded\n`);
    }
    
    // Step 4: Download all games
    console.log("📥 Step 3: Downloading games...\n");
    let downloaded = 0;
    let failed = 0;
    const pgnGames = [];
    
    // Load existing games if resuming
    if (existingGameIds.size > 0 && fs.existsSync(outputFile)) {
      const existingContent = fs.readFileSync(outputFile, "utf8");
      if (existingContent) {
        const games = existingContent.split(/\n\n+(?=\[Event)/);
        for (const game of games) {
          if (game.trim()) {
            pgnGames.push(game.trim());
          }
        }
        downloaded = pgnGames.length;
      }
    }
    
    for (let i = 0; i < totalGames.length; i++) {
      const gameId = totalGames[i];
      
      // Skip if already downloaded
      if (existingGameIds.has(gameId)) {
        if ((i + 1) % 10 === 0 || i === totalGames.length - 1) {
          console.log(`⏭️  [${i + 1}/${totalGames.length}] Skipping game ${gameId} (already downloaded)`);
        }
        continue;
      }
      
      console.log(`📥 [${i + 1}/${totalGames.length}] Downloading game ${gameId}...`);
      
      try {
        const pgn = await downloadGamePGN(gameId);
        
        if (pgn) {
          pgnGames.push(pgn);
          downloaded++;
          console.log(`   ✅ Success`);
        } else {
          failed++;
          console.log(`   ❌ Failed to download PGN`);
        }
      } catch (error) {
        failed++;
        console.log(`   ❌ Error: ${error.message}`);
      }
      
      // Rate limiting - delay between requests
      if (i < totalGames.length - 1) {
        await sleep(DELAY_MS);
      }
    }
    
    // Step 5: Write all games to file
    console.log(`\n💾 Writing ${pgnGames.length} games to ${outputFile}...`);
    const output = pgnGames.join("\n\n\n");
    fs.writeFileSync(outputFile, output, "utf8");
    
    // Summary
    console.log(`\n✅ Done!`);
    console.log(`   Eras scraped: ${eras.length}`);
    console.log(`   Total unique games found: ${totalGames.length}`);
    console.log(`   Successfully downloaded: ${downloaded}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Output file: ${outputFile}`);
    console.log(`   File size: ${(output.length / 1024).toFixed(2)} KB`);
    
    // Era breakdown
    console.log(`\n📊 Games per era:`);
    Object.entries(eraGameCounts).forEach(([era, count]) => {
      console.log(`   ${era}: ${count} games`);
    });
    
    if (pgnGames.length > 0) {
      console.log(`\n📊 Next steps:`);
      console.log(`   1. Verify the PGN file: ${outputFile}`);
      console.log(`   2. Use these games as reference for remaining games`);
      console.log(`   3. Parse if needed: npx tsx scripts/parseLegendPGNs.ts <legend> ${outputFile} ./public/data/legends`);
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
