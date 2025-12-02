import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface VideoScript {
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  imagePrompts: string[];
  platform: string;
  duration: string;
}

export const CONTENT_TYPES = [
  'chess_tip',
  'tilt_guardian',
  'legend_feature',
  'mindfulness',
  'puzzle_challenge',
  'rating_improvement',
  'beginner_mistake',
  'pro_secret',
] as const;

export type ContentType = typeof CONTENT_TYPES[number];

const SYSTEM_PROMPT = `You are a viral content creator for "Zen Chess" - a revolutionary chess app that combines chess training with mindfulness meditation. 

Key unique features to highlight:
1. TILT GUARDIAN - An AI that detects when you're tilting (playing emotionally after losses) and intervenes to prevent rage-quitting and rating loss
2. 365-DAY JOURNEY - A structured path combining chess lessons with meditation practices
3. PLAY THE LEGENDS - Play against AI versions of chess legends like Fischer, Kasparov, Morphy
4. MINDFULNESS INTEGRATION - Breathing exercises, meditation, psychological training

Your tone should be:
- Authentic and relatable (NOT corporate or salesy)
- Slightly controversial or counterintuitive (stops the scroll)
- Educational but entertaining
- Confident but humble

Target audience: Chess players rated 800-1800 who want to improve and struggle with tilt/emotions`;

const CONTENT_PROMPTS: Record<ContentType, string> = {
  chess_tip: `Create a chess tip video that feels like insider knowledge. Something most players don't think about. Tie it back to the mental game when possible.`,
  
  tilt_guardian: `Create a video showcasing the Tilt Guardian feature. Make it relatable - talk about losing streaks, rage quitting, playing "just one more game" at 2am. The Tilt Guardian is like having a coach who stops you before you throw away 200 rating points.`,
  
  legend_feature: `Create a video about the "Play the Legends" mode. Pick a specific legend (Fischer, Kasparov, Morphy, Tal, Capablanca) and talk about what makes their style unique and how playing against their AI helps you learn.`,
  
  mindfulness: `Create a video about the connection between chess and mindfulness. Why do GMs meditate? How does breathing help you calculate? Make skeptics curious.`,
  
  puzzle_challenge: `Create an engaging puzzle video. Describe a position, build tension, reveal the solution. Make people want to test themselves in the app.`,
  
  rating_improvement: `Create a video about rating improvement that goes against conventional wisdom. Not "solve more puzzles" - something deeper about the mental game and consistency.`,
  
  beginner_mistake: `Create a video about a mistake beginners make that isn't just about chess moves - it's about mindset, approach, or habits. Relatable and helpful.`,
  
  pro_secret: `Create a video revealing something pros do that amateurs don't - but frame it around mental approach, preparation, or mindset rather than just tactics.`,
};

export async function generateScript(contentType: ContentType): Promise<VideoScript> {
  const prompt = `${CONTENT_PROMPTS[contentType]}

Create a 30-60 second TikTok/Shorts script with:

1. HOOK (first 3 seconds) - Must stop the scroll. Use one of these patterns:
   - Controversial statement: "Most chess advice is wrong..."
   - Direct challenge: "You're losing games you should win because..."
   - Curiosity gap: "I didn't believe this until I tried it..."
   - Relatable pain: "Every chess player has done this at 2am..."

2. BODY (25-50 seconds) - Deliver real value. Be specific, not generic. Use stories and examples.

3. CTA (5 seconds) - Natural call to action, not pushy. Link in bio, try the app, etc.

4. 5-7 hashtags - Mix of popular (#chess #chessgame) and niche (#chesstilt #mindfulchess)

5. 3 image prompts for AI image generation - Describe cinematic visuals that match each section. Style: dramatic lighting, chess pieces, abstract concepts. Format: 9:16 vertical for TikTok.

Respond with ONLY valid JSON in this exact format:
{
  "hook": "The exact opening line to say",
  "body": "The main script content, conversational and engaging",
  "cta": "The call to action",
  "hashtags": ["#chess", "#chessgame", "#chesstips", "#mindfulness", "#chesstok"],
  "imagePrompts": [
    "Cinematic image prompt for hook section",
    "Cinematic image prompt for body section", 
    "Cinematic image prompt for CTA section"
  ],
  "platform": "tiktok",
  "duration": "45 seconds"
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');
  
  // Parse JSON from response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]) as VideoScript;
}

async function main() {
  const contentType = (process.argv[2] as ContentType) || 'chess_tip';
  
  if (!CONTENT_TYPES.includes(contentType as ContentType)) {
    console.log('Available content types:', CONTENT_TYPES.join(', '));
    process.exit(1);
  }
  
  console.log(`\n🎬 Generating ${contentType} script...`);
  
  try {
    const script = await generateScript(contentType);
    
    // Save to file
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${timestamp}_${contentType}.json`;
    const outputDir = path.join(process.cwd(), 'output', 'scripts');
    const outputPath = path.join(outputDir, filename);
    
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(script, null, 2));
    
    console.log(`\n✅ Script saved to ${outputPath}`);
    console.log('\n' + '═'.repeat(50));
    console.log('📝 HOOK:', script.hook);
    console.log('\n📖 BODY:', script.body);
    console.log('\n🎯 CTA:', script.cta);
    console.log('\n#️⃣  HASHTAGS:', script.hashtags.join(' '));
    console.log('\n🖼️  IMAGE PROMPTS:');
    script.imagePrompts.forEach((p, i) => console.log(`   ${i + 1}. ${p}`));
    console.log('═'.repeat(50));
    
    return script;
  } catch (error) {
    if (error instanceof Error && error.message.includes('API')) {
      console.error('\n❌ API Error - Check your ANTHROPIC_API_KEY in .env');
    }
    throw error;
  }
}

// Only run main if this is the entry point
if (process.argv[1]?.includes('generateScript')) {
  main().catch(console.error);
}


