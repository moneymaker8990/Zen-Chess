/**
 * THE STRATEGIC MIND
 * 4 chapters on advanced strategic thinking
 */

import type { Course } from './courseTypes';
import { puzzlesByThemeToVariations } from './courseConverter';
import { verifiedPuzzles } from '../puzzles/verified-puzzles';

// ============================================
// CHAPTER VARIATIONS
// ============================================

const strategicSacrifice = puzzlesByThemeToVariations(verifiedPuzzles, ['SACRIFICE', 'QUIET_MOVE']);
const pieceExchanges = puzzlesByThemeToVariations(verifiedPuzzles, ['DEFLECTION', 'TACTICAL']);
const prophylaxis = puzzlesByThemeToVariations(verifiedPuzzles, ['QUIET_MOVE', 'TACTICAL']);
const longTermPlanning = puzzlesByThemeToVariations(verifiedPuzzles, ['TACTICAL', 'SACRIFICE']);

// ============================================
// THE COURSE
// ============================================

export const strategicMind: Course = {
  id: 'strategic-mind',
  title: 'The Strategic Mind',
  author: 'Zen Chess Academy',
  description: 'Develop a strategic mind. Learn strategic sacrifices, when to exchange pieces, prophylaxis, and long-term planning.',
  coverImage: '🧠',
  coverColor: 'from-pink-500 to-purple-600',
  totalMinutes: 180,
  difficulty: 'advanced',
  tags: ['strategy', 'advanced', 'prophylaxis', 'exchanges', 'planning'],
  chapters: [
    {
      id: 'ch-strategic-sacrifice',
      title: 'Strategic Sacrifice',
      subtitle: 'Sacrifice for Position',
      description: 'Sometimes sacrificing material for positional gains is correct.',
      estimatedMinutes: 20,
      variations: strategicSacrifice,
      keyLessons: [
        'Not all sacrifices are tactical',
        'Positional compensation can be enough',
        'Long-term initiative matters',
      ],
    },
    {
      id: 'ch-piece-exchanges',
      title: 'Piece Exchanges',
      subtitle: 'When to Trade',
      description: 'Learn when to exchange pieces and when to avoid trades.',
      estimatedMinutes: 20,
      variations: pieceExchanges,
      keyLessons: [
        'Trade when ahead in material',
        'Avoid trades when behind',
        'Exchange your bad pieces',
      ],
    },
    {
      id: 'ch-prophylaxis',
      title: 'Prophylaxis',
      subtitle: 'Preventing Enemy Plans',
      description: 'The art of prevention. Stop your opponent before they start.',
      estimatedMinutes: 20,
      variations: prophylaxis,
      keyLessons: [
        'Ask: what does my opponent want?',
        'Prevent before executing',
        'Nimzowitsch\'s prophylactic thinking',
      ],
    },
    {
      id: 'ch-long-term-planning',
      title: 'Long-term Planning',
      subtitle: 'Thinking Ahead',
      description: 'Think several moves ahead strategically, not just tactically.',
      estimatedMinutes: 20,
      variations: longTermPlanning,
      keyLessons: [
        'Strategy is a series of ideas',
        'Plans should be flexible',
        'Evaluate, plan, execute',
      ],
    },
  ],
};

export default strategicMind;


