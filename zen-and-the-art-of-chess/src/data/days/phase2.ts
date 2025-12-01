import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 2: PATTERN RECOGNITION & TACTICAL AWARENESS
// Days 61-120
// ============================================

export const phase2Days: ZenChessDay[] = Array.from({ length: 60 }, (_, i) => {
  const dayNumber = 61 + i;
  const patterns = ['Fork', 'Pin', 'Skewer', 'Discovery', 'Deflection', 'Back Rank'];
  const pattern = patterns[i % patterns.length];

  return {
    dayNumber,
    title: `The ${pattern}`,
    theme: 'Seeing what was always there',
    phase: 'PATTERN_RECOGNITION' as const,

    sacredTexts: [
      {
        tradition: 'ZEN' as const,
        quote: '"In the beginner\'s mind there are many possibilities, but in the expert\'s mind there are few."',
        commentary: 'Zen speaks of shoshin—beginner\'s mind. After calming the mind, we now open the eye of pattern recognition. See as if for the first time.',
        whyThisMatters: 'Pattern recognition is not calculation—it is seeing what is already there.',
      },
      {
        tradition: 'VIJNANA' as const,
        quote: '"When you see through the eyes of awareness, the hidden becomes visible."',
        commentary: 'The patterns are always present. Your practice removes the veil.',
        whyThisMatters: 'The fork was always there; you just learned to see it.',
      },
    ],

    integratedReflection: {
      title: `Recognizing the ${pattern}`,
      body: `Patterns in chess are everywhere—waiting to be recognized, not invented. The calm mind you have cultivated is now the foundation for seeing.

Today you train the pattern-recognition faculty through repeated exposure with full attention. This is not memorization—it is awakening the eye that sees.`,
    },

    meditation: {
      title: 'Opening the Inner Eye',
      steps: [
        'Sit in stillness. Close your eyes.',
        'Imagine a chessboard in your mind. See it clearly.',
        'Place pieces. See the patterns they create.',
        'Let the patterns reveal themselves.',
        'Rest in this visualization.',
      ],
      suggestedMinutes: 7,
      context: 'Visualization strengthens the chess faculty without fatigue.',
    },

    prayer: 'May I see what is always present. May patterns reveal themselves to patient eyes.',

    dailyAction: {
      instruction: `Look for ${pattern.toLowerCase()} patterns in your games today.`,
      context: 'Recognition comes through repetition with attention.',
    },

    chessConcept: pattern,
    chessApplication: `The ${pattern.toLowerCase()} is a fundamental tactical pattern. Today, see ten examples and let the pattern burn into memory.`,
    chessWisdom: 'Masters don\'t calculate more—they recognize more.',

    exerciseType: 'PATTERN' as const,
    exerciseInstructions: `Complete pattern recognition drills focusing on the ${pattern.toLowerCase()}.`,
    exerciseContext: 'Let the pattern reveal itself. Don\'t rush.',
    difficulty: Math.min(5, 2 + Math.floor(i / 15)) as 1 | 2 | 3 | 4 | 5,
  };
});

export default phase2Days;
