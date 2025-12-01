import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 5: EGO TRANSCENDENCE & PSYCHOLOGICAL MASTERY
// Days 261-300
// ============================================

export const phase5Days: ZenChessDay[] = Array.from({ length: 40 }, (_, i) => {
  const dayNumber = 261 + i;
  const themes = ['Beyond Rating', 'Losing Well', 'Winning Lightly', 'The Observer', 'Playing Without Fear'];
  const theme = themes[i % themes.length];

  return {
    dayNumber,
    title: theme,
    theme: 'Separating self-worth from results',
    phase: 'EGO_TRANSCENDENCE' as const,

    sacredTexts: [
      {
        tradition: 'ASHTAVAKRA' as const,
        quote: '"You are already free. Nothing binds you but the belief in bondage."',
        commentary: 'The Ashtavakra Gita points to liberation that is already the case. You are not your rating.',
        whyThisMatters: 'When identity is not at stake, you can play your best chess.',
      },
      {
        tradition: 'VIJNANA' as const,
        quote: '"The witness remains unchanged while all experiences pass through."',
        commentary: 'You are the awareness watching the game—not the player who wins or loses.',
        whyThisMatters: 'True mastery is playing without the burden of self-image.',
      },
    ],

    integratedReflection: {
      title: `${theme}: Freedom from Results`,
      body: `Today you practice ${theme.toLowerCase()}. This is perhaps the deepest work—separating your sense of self from your chess results.

You are not your rating. You are not your wins or losses. You are the awareness in which all of this appears. From this recognition, you can play freely—not because you don't care, but because your worth is not at stake.`,
    },

    meditation: {
      title: 'Releasing Identity',
      steps: [
        'Sit in stillness.',
        'Notice the thought "I am a chess player."',
        'Ask: who is aware of this thought?',
        'Rest in pure awareness, before identity.',
        'From here, all games are play.',
      ],
      suggestedMinutes: 12,
      context: 'Experiencing the awareness that exists prior to identity and attachment.',
    },

    prayer: 'May I play without grasping. May results not define my worth.',

    dailyAction: {
      instruction: 'After each game today, notice: did your mood depend on the result? Can you be okay either way?',
      context: 'This is the practice of non-attachment—not indifference, but freedom.',
    },

    chessConcept: 'Psychological Freedom',
    chessApplication: 'Play a game with zero attachment to the result. Notice when ego arises. Return to presence.',
    chessWisdom: 'The player who needs to win is already at a disadvantage. Play to play.',

    exerciseType: 'MINDFUL_GAME' as const,
    exerciseInstructions: 'Play with zero attachment to result. Notice when identity feels threatened.',
    difficulty: 5,

    tiltSignal: 'Identity threat when losing',
    tiltReframe: 'You are not this game. You are the awareness watching the game.',
  };
});

export default phase5Days;
