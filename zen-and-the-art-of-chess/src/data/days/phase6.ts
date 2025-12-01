import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 6: WHOLE-BOARD AWARENESS & EFFORTLESS ACTION
// Days 301-365
// ============================================

export const phase6Days: ZenChessDay[] = Array.from({ length: 65 }, (_, i) => {
  const dayNumber = 301 + i;
  const themes = ['Wu Wei', 'Whole Board', 'Integration', 'Effortless Action', 'The Eternal Game'];
  const theme = themes[i % themes.length];
  const isLastDay = dayNumber === 365;

  return {
    dayNumber,
    title: isLastDay ? 'The Eternal Game' : theme,
    theme: isLastDay ? 'Beginning again' : 'Action without forcing',
    phase: 'EFFORTLESS_ACTION' as const,

    sacredTexts: [
      {
        tradition: 'TAO' as const,
        quote: isLastDay 
          ? '"Every ending is a beginning. Every master is a beginner."'
          : '"The Tao does nothing, yet nothing is left undone."',
        commentary: isLastDay
          ? 'You have completed the journey, only to discover it has no end. The beginner\'s mind returns.'
          : 'Wu wei—effortless action—is not passivity but perfect alignment with what is.',
        whyThisMatters: 'When you stop trying, true playing begins.',
      },
      {
        tradition: 'ZEN' as const,
        quote: '"Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water."',
        commentary: 'The ordinary becomes extraordinary when seen with clear eyes. Chess remains chess—but you are transformed.',
        whyThisMatters: 'Mastery is not a destination but a way of being.',
      },
    ],

    integratedReflection: {
      title: isLastDay ? 'Completion and Beginning' : `${theme}: Effortless Mastery`,
      body: isLastDay 
        ? `Day 365. You have walked this path for a year—through calm mind training, pattern recognition, strategic depth, flow states, and ego transcendence.

And now you arrive where you began: at the board, ready to play.

But something is different. You are not the same player who started. Not because you have more knowledge, but because you have less obstruction. The calm mind, the seeing eye, the patient hand—these are now part of you.

The journey ends where it began. And so it begins again.`
        : `Today you practice ${theme.toLowerCase()}. All techniques dissolve into natural play. This is mastery—not the accumulation of methods but the embodiment of understanding.

The whole board is visible at once. Moves arise without forcing. You play as awareness itself plays—without agenda, without grasping, without fear.`,
    },

    meditation: {
      title: isLastDay ? 'Completion and Beginning' : 'Effortless Awareness',
      steps: isLastDay ? [
        'Sit in stillness.',
        'Reflect on your journey—365 days of practice.',
        'Notice how you have changed. Notice what remains the same.',
        'Release all that you\'ve learned. It is now part of you.',
        'Begin again, as if for the first time.',
      ] : [
        'Sit without agenda.',
        'Let awareness expand to include everything.',
        'The whole room. The whole world. The whole chessboard.',
        'From this expanded awareness, action arises naturally.',
        'This is wu wei—effortless right action.',
      ],
      suggestedMinutes: 15,
      context: isLastDay 
        ? 'Honoring the completion and embracing the eternal beginning.'
        : 'Experiencing the state from which effortless action emerges.',
    },

    prayer: isLastDay 
      ? 'May this ending be a beginning. May I carry what I\'ve learned lightly and share it freely.'
      : 'May action arise from stillness. May effort dissolve into flow.',

    dailyAction: {
      instruction: isLastDay 
        ? 'Play one game as if it were your first and your last. Be completely present.'
        : 'Notice when you force. Soften. Let the move arise.',
      context: 'The whole journey is present in every moment.',
    },

    chessConcept: isLastDay ? 'Mastery' : 'Effortless Action',
    chessApplication: 'Play with everything you\'ve learned, holding nothing.',
    chessWisdom: isLastDay 
      ? 'The journey ends where it began—at the board, ready to play. But now, you are the journey itself.'
      : 'When you stop trying, playing begins.',

    exerciseType: 'MINDFUL_GAME' as const,
    exerciseInstructions: 'Play from presence. Trust everything you\'ve learned.',
    difficulty: 5,
  };
});

export default phase6Days;
