# 🎬 Zen Chess Content Automation

AI-powered content creation system for Zen Chess social media marketing.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd content-automation
npm install
```

### 2. Set Up API Keys
```bash
# Copy the template
cp env-template.txt .env

# Edit .env and add your API keys
```

### 3. Test Your Setup
```bash
npm test
```

### 4. Generate Your First Content
```bash
npm run daily
```

---

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm run daily` | Generate a complete content package (script + voice + images) |
| `npm run generate:script [type]` | Generate just a script |
| `npm run generate:voice` | Generate voiceover from latest script |
| `npm run generate:images` | Generate images from latest script |
| `npm run batch [count]` | Generate multiple pieces of content at once |
| `npm run schedule` | Start the automated scheduler |
| `npm test` | Test API connections |

---

## 🔑 Getting Your API Keys

### 1. Anthropic (Claude) - For AI Scripts
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up / Log in
3. Go to API Keys → Create Key
4. Copy to `ANTHROPIC_API_KEY` in `.env`

**Cost:** ~$0.01-0.03 per script

### 2. ElevenLabs - For Voice
1. Go to [elevenlabs.io](https://elevenlabs.io/)
2. Sign up (free tier: 10,000 chars/month)
3. Profile → API Key
4. Copy to `ELEVENLABS_API_KEY` in `.env`

**For voice cloning:**
1. Voice Lab → Add Voice → Instant Voice Cloning
2. Upload your voice sample (use `templates/voiceSample.txt`)
3. Copy the Voice ID to `ELEVENLABS_VOICE_ID` in `.env`

**Cost:** Free tier for testing, ~$5/month for more

### 3. Leonardo.AI - For Images
1. Go to [leonardo.ai](https://leonardo.ai/)
2. Sign up (free tier: 150 images/day)
3. Settings → API → Generate API Key
4. Copy to `LEONARDO_API_KEY` in `.env`

**Cost:** Free tier for testing, ~$10/month for more

---

## 📂 Output Structure

When you run `npm run daily`, it creates:

```
output/
└── 2024-01-15/
    ├── script.json      # The generated script
    ├── voiceover.mp3    # AI narration
    ├── scene_1.png      # Image for hook
    ├── scene_2.png      # Image for body
    ├── scene_3.png      # Image for CTA
    └── INSTRUCTIONS.md  # Assembly guide
```

---

## 🎬 Video Assembly Workflow

After generating content:

1. **Open CapCut** (free at capcut.com)
2. Create new project (9:16, 1080x1920)
3. Import your generated files
4. Drag voiceover to audio track
5. Add images to timeline, timed to match audio
6. Add text overlays with key phrases
7. Export and post!

---

## 📋 Content Types

| Type | Description |
|------|-------------|
| `chess_tip` | Actionable chess improvement tips |
| `tilt_guardian` | Showcase the tilt prevention feature |
| `legend_feature` | Highlight Play the Legends mode |
| `mindfulness` | Chess + meditation connection |
| `puzzle_challenge` | Engaging puzzle content |
| `rating_improvement` | Progress and improvement stories |
| `beginner_mistake` | Common mistakes to avoid |
| `pro_secret` | Things pros do differently |

Generate specific type:
```bash
npm run generate:script tilt_guardian
npm run daily mindfulness
```

---

## ⏰ Automation

Run the scheduler to auto-generate content daily:

```bash
npm run schedule
```

This will:
- Generate content every day at 6 AM
- Rotate through content types automatically
- Send reminders at optimal posting times (9 AM, 7 PM)

---

## 💡 Tips

1. **Review scripts before posting** - AI is good but not perfect
2. **Add trending sounds** - After export, add trending TikTok audio
3. **Engage immediately** - Reply to comments in first hour
4. **Cross-post everything** - TikTok, Reels, Shorts from same video
5. **Batch create** - Use `npm run batch 7` to create a week of content

---

## 🛠️ Troubleshooting

### "API Key not set"
Make sure you copied `env-template.txt` to `.env` and added your keys.

### "Voice generation failed"
- Check ElevenLabs API key
- Check you have characters remaining in your quota
- Make sure ELEVENLABS_VOICE_ID is set

### "Image generation failed"
- Check Leonardo.AI API key
- Check you have tokens remaining
- Try again (sometimes the API is slow)

### "Script generation failed"
- Check Anthropic API key
- Make sure you have credits

---

## 📊 Estimated Costs

For daily content (1 video/day):

| Service | Monthly Cost |
|---------|--------------|
| Anthropic | ~$5-10 |
| ElevenLabs | $5-22 |
| Leonardo.AI | Free-$10 |
| **Total** | **$10-42/month** |

---

## 🎯 Next Steps

1. ✅ Set up API keys
2. ✅ Test with `npm test`
3. ✅ Generate first content with `npm run daily`
4. ⬜ Record voice sample for cloning
5. ⬜ Clone your voice on ElevenLabs
6. ⬜ Create your first video in CapCut
7. ⬜ Post to TikTok/Instagram/YouTube
8. ⬜ Set up daily schedule

---

Made with 🧘 for Zen Chess


