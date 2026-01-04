import cron from 'node-cron';
import { runDailyPipeline } from './dailyContent.js';
import 'dotenv/config';

console.log('\n' + '═'.repeat(50));
console.log('🤖 ZEN CHESS CONTENT SCHEDULER');
console.log('═'.repeat(50));
console.log('\n⏰ Schedule: Every day at 6:00 AM');
console.log('📋 Content rotation: Automatic based on day of week');
console.log('\nPress Ctrl+C to stop\n');

// Run every day at 6 AM
cron.schedule('0 6 * * *', async () => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] 🚀 Starting scheduled content generation...`);
  
  try {
    const result = await runDailyPipeline();
    console.log(`[${timestamp}] ✅ Complete! Output: ${result.outputDir}`);
  } catch (error) {
    console.error(`[${timestamp}] ❌ Failed:`, error);
  }
});

// Also schedule a reminder to post at optimal times
cron.schedule('0 9 * * *', () => {
  console.log('\n📱 REMINDER: 9 AM - Good time to post on TikTok!');
});

cron.schedule('0 19 * * *', () => {
  console.log('\n📱 REMINDER: 7 PM - Peak engagement time on TikTok!');
});

// Log every hour to show it's running
cron.schedule('0 * * * *', () => {
  const now = new Date();
  console.log(`[${now.toLocaleTimeString()}] 💓 Scheduler running...`);
});

// Keep the process running
console.log('🟢 Scheduler started and waiting for scheduled time...\n');
console.log('💡 Tip: To run content generation now, use: npm run daily\n');

process.on('SIGINT', () => {
  console.log('\n\n👋 Scheduler stopped. Goodbye!\n');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Scheduler terminated. Goodbye!\n');
  process.exit(0);
});














