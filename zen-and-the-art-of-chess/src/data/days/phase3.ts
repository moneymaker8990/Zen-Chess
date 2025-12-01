import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 3: STRATEGY, PLANNING & QUIET MOVES
// Days 121-200
// ============================================

export const phase3Days: ZenChessDay[] = Array.from({ length: 80 }, (_, i) => {
  const dayNumber = 121 + i;
  const concepts = ['Quiet Move', 'Prophylaxis', 'Outposts', 'Pawn Breaks', 'Bishop Pair', 'Open Files'];
  const concept = concepts[i % concepts.length];

  return {
    dayNumber,
    title: `The ${concept}`,
    theme: 'Thinking beyond the immediate',
    phase: 'STRATEGY_PLANNING' as const,

    sacredTexts: [
      {
        tradition: 'GITA' as const,
        quote: '"You have the right to action, never to its fruits."',
        commentary: 'Strategic thinking requires patience and non-attachment to immediate results.',
        whyThisMatters: 'Play the position, not the result you desire.',
      },
      {
        tradition: 'TAO' as const,
        quote: '"The master acts without forcing. When the work is done, people say: we did it ourselves."',
        commentary: 'The best strategy often involves subtle improvement rather than forcing.',
        whyThisMatters: 'Quiet moves can be the most powerful.',
      },
    ],

    integratedReflection: {
      title: `Strategic Depth: ${concept}`,
      body: `Strategy is the art of accumulating small advantages until they become decisive. Today you practice seeing beyond tactics to the deeper structure of the position.

The ${concept.toLowerCase()} is not flashy. It does not announce itself with checks and captures. But it creates the conditions for everything that follows.`,
    },

    meditation: {
      title: 'Strategic Contemplation',
      steps: [
        'Sit in stillness. Let the mind settle.',
        'Contemplate: strategy is seeing the whole.',
        'Tactics serve strategy, not the reverse.',
        'What is your plan? Not just your next move.',
        'Rest in long-term vision.',
      ],
      suggestedMinutes: 8,
      context: 'Developing the long-term thinking required for strategic mastery.',
    },

    prayer: 'May I see beyond the immediate. May patience guide my decisions.',

    dailyAction: {
      instruction: 'Before moving, ask: "What is my plan for the next five moves?"',
      context: 'Strategy requires looking ahead, not just reacting.',
    },

    chessConcept: concept,
    chessApplication: `The ${concept.toLowerCase()} is a strategic principle. Study how masters use it to create lasting advantages.`,
    chessWisdom: 'Strategy is the art of accumulating small advantages until they become decisive.',

    exerciseType: 'ANALYSIS' as const,
    exerciseInstructions: `Study a master game focusing on ${concept.toLowerCase()}. Note how they build advantages slowly.`,
    difficulty: Math.min(5, 3 + Math.floor(i / 25)) as 1 | 2 | 3 | 4 | 5,
  };
});

export default phase3Days;
