// ============================================
// THE STRATEGIC MIND
// Thinking Improvement and Imbalance Recognition
// 50+ variations across 5 key chapters
// ============================================

import type { Course, CourseChapter } from './courseTypes';
import {
  imbalancesVariations,
  planMakingVariations,
  evaluationVariations,
  candidateMovesVariations,
  thinkingTechniqueVariations,
} from './variations/amateurMindVariations';

// ============================================
// CHAPTER DEFINITIONS
// ============================================

const imbalancesChapter: CourseChapter = {
  id: 'am-ch1-imbalances',
  title: 'Understanding Imbalances',
  subtitle: 'The Heart of Chess Strategy',
  description: 'Learn to identify and evaluate the seven fundamental imbalances in chess positions.',
  estimatedMinutes: 45,
  keyLessons: [
    'Material is the most concrete imbalance',
    'Temporary advantages must be used quickly',
    'Permanent advantages can be nursed',
    'Multiple small advantages add up'
  ],
  variations: imbalancesVariations,
};

const planMakingChapter: CourseChapter = {
  id: 'am-ch2-plans',
  title: 'Making Plans',
  subtitle: 'From Chaos to Clarity',
  description: 'Stop moving without purpose. Learn to create concrete plans based on position requirements.',
  estimatedMinutes: 50,
  keyLessons: [
    'Every position needs a plan',
    'Plans should be based on imbalances',
    'Be flexible—change plans when needed',
    'Short-term vs long-term thinking'
  ],
  variations: planMakingVariations,
};

const evaluationChapter: CourseChapter = {
  id: 'am-ch3-evaluation',
  title: 'Position Evaluation',
  subtitle: 'Seeing the Truth',
  description: 'Learn to objectively assess positions using a systematic approach.',
  estimatedMinutes: 45,
  keyLessons: [
    'Evaluate before you calculate',
    'Use a checklist for evaluation',
    'Static vs dynamic factors',
    'Practical considerations matter'
  ],
  variations: evaluationVariations,
};

const candidateMovesChapter: CourseChapter = {
  id: 'am-ch4-candidates',
  title: 'Finding Candidate Moves',
  subtitle: 'Not Missing the Best Move',
  description: 'Learn to generate and compare candidate moves systematically.',
  estimatedMinutes: 40,
  keyLessons: [
    'Always find at least 3 candidates',
    'Check forcing moves first',
    'Compare consequences, not beauty',
    'The best move isn\'t always flashy'
  ],
  variations: candidateMovesVariations,
};

const thinkingChapter: CourseChapter = {
  id: 'am-ch5-thinking',
  title: 'Thinking Technique',
  subtitle: 'Training Your Mind',
  description: 'Master the mental habits that separate strong players from amateurs.',
  estimatedMinutes: 50,
  keyLessons: [
    'Blunder-check every move',
    'Ask what opponent wants',
    'Visualize before playing',
    'Learn from every game'
  ],
  variations: thinkingTechniqueVariations,
};

// ============================================
// THE COMPLETE COURSE
// ============================================

export const amateurMindCourse: Course = {
  id: 'amateur-mind',
  title: 'The Strategic Mind',
  author: 'Zen Chess',
  description: 'Bridge the gap between knowing chess and thinking like a chess player. 50+ training positions focused on imbalances, planning, and thinking technique.',
  coverImage: '🧠',
  coverColor: '#a855f7',
  totalMinutes: 59,
  difficulty: 'intermediate',
  tags: ['thinking', 'strategy', 'imbalances', 'planning'],
  chapters: [
    imbalancesChapter,
    planMakingChapter,
    evaluationChapter,
    candidateMovesChapter,
    thinkingChapter,
  ]
};

export default amateurMindCourse;
