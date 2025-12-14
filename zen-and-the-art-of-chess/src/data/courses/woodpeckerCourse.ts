// ============================================
// TACTICAL PATTERN TRAINING
// Tactical Pattern Drilling for Mastery
// 100+ variations in tactical themes
// ============================================

import type { Course, CourseChapter } from './courseTypes';
import { 
  forksVariations, 
  pinsVariations, 
  discoveredAttacksVariations, 
  skewersVariations,
  backRankVariations 
} from './variations/tacticsVariations';

// ============================================
// CHAPTERS WITH COMPREHENSIVE VARIATIONS
// ============================================

const forksChapter: CourseChapter = {
  id: 'wp-ch1-forks',
  title: 'Forks',
  subtitle: 'Attacking Two Pieces at Once',
  description: 'The fork is one of the most common and deadly tactics. Master all types of forks.',
  estimatedMinutes: 40,
  keyLessons: [
    'Knight forks are the most common',
    'Look for undefended pieces',
    'Forks often follow checks',
    'Pawn forks are often overlooked'
  ],
  variations: forksVariations,
};

const pinsChapter: CourseChapter = {
  id: 'wp-ch2-pins',
  title: 'Pins',
  subtitle: 'Immobilizing Enemy Pieces',
  description: 'A pinned piece is a restricted piece. Learn to create and exploit pins.',
  estimatedMinutes: 45,
  keyLessons: [
    'Absolute pins prevent all movement',
    'Relative pins allow moves (at a cost)',
    'Attack pinned pieces with pawns',
    'Break pins with counter-pins or interpositions'
  ],
  variations: pinsVariations,
};

const skewersChapter: CourseChapter = {
  id: 'wp-ch3-skewers',
  title: 'Skewers',
  subtitle: 'The Reverse Pin',
  description: 'A skewer is a pin in reverse—the more valuable piece must move, exposing the piece behind.',
  estimatedMinutes: 35,
  keyLessons: [
    'Skewers target the king first',
    'Line pieces up on ranks, files, or diagonals',
    'Checks are especially powerful for skewers',
    'Look for skewers after trades'
  ],
  variations: skewersVariations,
};

const discoveredAttacksChapter: CourseChapter = {
  id: 'wp-ch4-discovered',
  title: 'Discovered Attacks',
  subtitle: 'The Hidden Threat',
  description: 'Moving one piece reveals an attack from another. Discovered checks are especially powerful.',
  estimatedMinutes: 40,
  keyLessons: [
    'Discovered checks often win material',
    'The moving piece can attack freely',
    'Double checks force king moves',
    'Set up discoveries in the opening'
  ],
  variations: discoveredAttacksVariations,
};

const doubleAttacksChapter: CourseChapter =;

const removeDefenderChapter: CourseChapter =;

const backRankChapter: CourseChapter = {
  id: 'wp-ch7-backrank',
  title: 'Back Rank Tactics',
  subtitle: 'The Deadly 8th Rank',
  description: 'A king trapped on the back rank is vulnerable to checkmate.',
  estimatedMinutes: 30,
  keyLessons: [
    'Create a "luft" (escape square) for your king',
    'Rooks and queens deliver back rank mates',
    'Use the threat of back rank mate tactically',
    'Back rank weakness can force defensive moves'
  ],
  variations: backRankVariations,
};

const matingPatternsChapter: CourseChapter =;

// ============================================
// THE COMPLETE COURSE
// ============================================

export const woodpeckerCourse: Course = {
  id: 'woodpecker-method',
  title: 'Tactical Pattern Training',
  author: 'Zen Chess',
  description: 'Burn tactical patterns into your brain through intensive repetition. 100+ variations covering all major tactical themes, designed to be solved repeatedly until they become second nature.',
  coverImage: '⚡',
  coverColor: '#ef4444',
  totalMinutes: 115,
  difficulty: 'intermediate',
  tags: ['tactics', 'patterns', 'calculation', 'intensive'],
  chapters: [
    forksChapter,
    pinsChapter,
    skewersChapter,
    discoveredAttacksChapter,
    doubleAttacksChapter,
    removeDefenderChapter,
    backRankChapter,
    matingPatternsChapter
]
};

export default woodpeckerCourse;
