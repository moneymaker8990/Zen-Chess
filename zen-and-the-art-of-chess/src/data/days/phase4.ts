import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 4: FLOW, CONFIDENCE & INTUITION
// Days 201-260
// ============================================

export const phase4Days: ZenChessDay[] = Array.from({ length: 60 }, (_, i) => {
  const dayNumber = 201 + i;
  const themes = ['Trusting Intuition', 'Flow State', 'Confidence', 'Presence', 'Resilience'];
  const theme = themes[i % themes.length];

  return {
    dayNumber,
    title: theme,
    theme: 'Playing from inner stillness',
    phase: 'FLOW_INTUITION' as const,

    sacredTexts: [
      {
        tradition: 'UPANISHADS' as const,
        quote: '"The Self is self-luminous. It shines by its own light."',
        commentary: 'Your true nature requires no external validation. Trust your preparation.',
        whyThisMatters: 'Confidence comes from knowing what you are, not what you achieve.',
      },
      {
        tradition: 'SHIVA_SUTRAS' as const,
        quote: '"The Self is the dancer. The world is the dance."',
        commentary: 'When you know yourself as awareness, play becomes dance.',
        whyThisMatters: 'Flow emerges when skill meets challenge and the ego steps aside.',
      },
    ],

    integratedReflection: {
      title: `${theme}: Playing from the Center`,
      body: `Today you practice ${theme.toLowerCase()}. This is not about forcing a feeling—it is about removing the obstacles to natural flow.

When you stop trying to be confident and simply play from presence, confidence arises naturally. Trust your hours of practice. Trust your understanding. Trust the stillness at your center.`,
    },

    meditation: {
      title: 'Resting in Flow',
      steps: [
        'Sit quietly. Let thoughts settle like sediment.',
        'Notice the natural flow of awareness.',
        'Don\'t direct it. Let it move where it will.',
        'This is flow—effortless attention.',
        'Carry this into your play.',
      ],
      suggestedMinutes: 10,
      context: 'Cultivating the effortless concentration that characterizes flow states.',
    },

    prayer: 'May I trust my preparation. May I play from stillness, not anxiety.',

    dailyAction: {
      instruction: 'Notice when you try too hard. Soften. Return to presence.',
      context: 'Effort creates tension. Presence creates flow.',
    },

    chessConcept: 'Intuitive Play',
    chessApplication: 'Trust your first instinct today—but verify it with a pause. Intuition is pattern recognition operating below conscious awareness.',
    chessWisdom: 'The master plays quickly because they see quickly—not because they rush.',

    exerciseType: 'MINDFUL_GAME' as const,
    exerciseInstructions: 'Play a game focusing on staying present. Trust your preparation.',
    difficulty: 4,
  };
});

export default phase4Days;
