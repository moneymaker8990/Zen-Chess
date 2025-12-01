// download-all-pgns.js
// Downloads player PGN archives from PGN Mentor

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const PAGE_URL = "https://www.pgnmentor.com/files.html";
const BASE_URL = "https://www.pgnmentor.com/";

async function main() {
  console.log("Fetching:", PAGE_URL);
  const html = await fetch(PAGE_URL).then(res => res.text());
  const $ = cheerio.load(html);

  // Find all <a> links ending in .zip (player archives)
  const links = new Set();
  $("a").each((i, el) => {
    const href = $(el).attr("href");
    if (href && href.toLowerCase().endsWith(".zip")) {
      // Build absolute URL
      const absoluteUrl = new URL(href, BASE_URL).href;
      links.add(absoluteUrl);
    }
  });

  const uniqueLinks = [...links];
  console.log("Found ZIP archives:", uniqueLinks.length);

  const outDir = "./pgnmentor-downloads";
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let downloaded = 0;
  for (const link of uniqueLinks) {
    const fileName = path.basename(link);
    const outPath = path.join(outDir, fileName);

    // Skip if already downloaded
    if (fs.existsSync(outPath)) {
      console.log("Skipping (already exists):", fileName);
      continue;
    }

    console.log(`Downloading [${++downloaded}/${uniqueLinks.length}]:`, fileName);
    try {
      const fileRes = await fetch(link);
      if (!fileRes.ok) {
        console.error(`  Failed: ${fileRes.status} ${fileRes.statusText}`);
        continue;
      }
      const buf = await fileRes.arrayBuffer();
      fs.writeFileSync(outPath, Buffer.from(buf));
    } catch (err) {
      console.error(`  Error downloading ${fileName}:`, err.message);
    }

    // Small delay to be polite to the server
    await new Promise(r => setTimeout(r, 200));
  }

  console.log("\nDone! Files saved to:", outDir);
  console.log("To extract all ZIPs, run:");
  console.log("  PowerShell: Get-ChildItem .\\pgnmentor-downloads\\*.zip | Expand-Archive -DestinationPath .\\pgnmentor-pgns -Force");
}

main();

