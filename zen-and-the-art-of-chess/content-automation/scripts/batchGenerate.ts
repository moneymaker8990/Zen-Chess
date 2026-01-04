import { generateScript, CONTENT_TYPES, ContentType, VideoScript } from './generateScript.js';
import { generateVoice } from './generateVoice.js';
import { generateImage } from './generateImages.js';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

interface BatchResult {
  contentType: ContentType;
  outputDir: string;
  success: boolean;
  error?: string;
}

/**
 * Generate a week's worth of content in one batch
 */
async function batchGenerate(count: number = 7): Promise<BatchResult[]> {
  console.log('\n' + '═'.repeat(60));
  console.log(`🚀 BATCH CONTENT GENERATION`);
  console.log(`📊 Generating ${count} pieces of content...`);
  console.log('═'.repeat(60));
  
  const results: BatchResult[] = [];
  const today = new Date();
  const batchDir = path.join(process.cwd(), 'output', 'batch-' + today.toISOString().split('T')[0]);
  await fs.mkdir(batchDir, { recursive: true });
  
  // Shuffle content types for variety
  const shuffledTypes = [...CONTENT_TYPES].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    const contentType = shuffledTypes[i % shuffledTypes.length];
    const outputDir = path.join(batchDir, `${i + 1}_${contentType}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📦 [${i + 1}/${count}] ${contentType}`);
    console.log('─'.repeat(60));
    
    try {
      // Generate script
      console.log('   📝 Generating script...');
      const script = await generateScript(contentType);
      await fs.writeFile(
        path.join(outputDir, 'script.json'),
        JSON.stringify(script, null, 2)
      );
      console.log('   ✅ Script done');
      
      // Generate voiceover
      console.log('   🎤 Generating voiceover...');
      try {
        const fullText = `${script.hook}... ${script.body}... ${script.cta}`;
        const audioBuffer = await generateVoice({ text: fullText });
        await fs.writeFile(path.join(outputDir, 'voiceover.mp3'), audioBuffer);
        console.log('   ✅ Voiceover done');
      } catch (e) {
        console.log('   ⚠️  Voiceover skipped');
      }
      
      // Generate images (just first one for speed)
      console.log('   🖼️  Generating cover image...');
      try {
        const [imageUrl] = await generateImage(script.imagePrompts[0]);
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        await fs.writeFile(path.join(outputDir, 'cover.png'), imageResponse.data);
        console.log('   ✅ Cover image done');
      } catch (e) {
        console.log('   ⚠️  Image skipped');
      }
      
      // Create quick reference card
      const card = `# ${contentType.toUpperCase()}

## Hook
${script.hook}

## Body
${script.body}

## CTA
${script.cta}

## Hashtags
${script.hashtags.join(' ')}
`;
      await fs.writeFile(path.join(outputDir, 'QUICK_REF.md'), card);
      
      results.push({ contentType, outputDir, success: true });
      
      // Rate limit between generations
      if (i < count - 1) {
        console.log('   ⏳ Waiting 5s before next...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Failed: ${errorMessage}`);
      results.push({ contentType, outputDir, success: false, error: errorMessage });
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 BATCH COMPLETE');
  console.log('═'.repeat(60));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Output: ${batchDir}`);
  
  // Create index file
  const index = `# Batch Content - ${today.toISOString().split('T')[0]}

Generated ${successful} pieces of content.

${results.map((r, i) => `${i + 1}. [${r.success ? '✅' : '❌'}] ${r.contentType}`).join('\n')}

## Usage
1. Open each folder
2. Review and edit script if needed
3. Assemble in CapCut using audio + images
4. Post according to schedule
`;
  
  await fs.writeFile(path.join(batchDir, 'INDEX.md'), index);
  console.log('\n📋 Created INDEX.md with overview\n');
  
  return results;
}

async function main() {
  const count = parseInt(process.argv[2] || '7', 10);
  
  if (isNaN(count) || count < 1 || count > 30) {
    console.log('Usage: npm run batch [count]');
    console.log('Count must be between 1 and 30');
    process.exit(1);
  }
  
  await batchGenerate(count);
}

if (process.argv[1]?.includes('batchGenerate')) {
  main().catch(console.error);
}

export { batchGenerate };














