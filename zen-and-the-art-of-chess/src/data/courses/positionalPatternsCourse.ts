// ============================================
// THE POSITIONAL CHESS PATTERNS MANUAL
// Comprehensive strategic pattern training
// 400+ variations across 16 chapters
// ============================================

import type { Course, CourseChapter } from './courseTypes';
import { outpostsVariations } from './variations/outpostsVariations';
import { weakPawnsVariations } from './variations/weakPawnsVariations';
import { pawnStructureVariations } from './variations/pawnStructureVariations';

// ============================================
// CHAPTER DEFINITIONS WITH IMPORTED VARIATIONS
// ============================================

const outpostsChapter: CourseChapter = {
  id: 'ch1-outposts',
  title: 'Outposts',
  subtitle: 'Establishing Dominant Squares',
  description: 'An outpost is a square that cannot be attacked by enemy pawns—a permanent fortress for your pieces. The knight on d5 is the iconic example: radiating influence across the board while completely safe from pawn attacks. In this chapter, you\'ll learn not just to RECOGNIZE outposts, but to CREATE them through pawn exchanges and to OCCUPY them at the right moment. Mastering outposts transforms your strategic play.',
  estimatedMinutes: 45,
  keyLessons: [
    'Knights thrive on outposts because they don\'t lose power when centralized—unlike bishops, they control the same 8 squares regardless of where pawns are',
    'The best outposts are on the 5th or 6th rank, in the center (d5, e5) or near the enemy king (f5, c6)',
    'Before occupying an outpost, secure it: control the surrounding squares so your piece cannot be easily traded off',
    'Creating outposts requires pawn exchanges or advances—when you push e4-e5, the d4 square becomes a potential outpost'
  ],
  variations: outpostsVariations,
};

const weakPawnsChapter: CourseChapter = {
  id: 'ch2-weak-pawns',
  title: 'Weak Pawns',
  subtitle: 'Exploiting Structural Weakness',
  description: 'Pawns cannot move backwards—this makes pawn weaknesses PERMANENT. An isolated pawn must be defended by pieces forever. Doubled pawns cannot protect each other. Backward pawns are targets on semi-open files. Understanding weak pawns is understanding the ENDGAME from move one: most games are decided by who created fewer pawn weaknesses. This chapter teaches you to both exploit enemy weaknesses and avoid creating your own.',
  estimatedMinutes: 50,
  keyLessons: [
    'Isolated pawns cannot be defended by other pawns—they require constant piece defense, tying down your army',
    'Doubled pawns create TWO weaknesses: the pawns themselves, and the "hole" on the adjacent file',
    'Backward pawns are targets because they sit on semi-open files where rooks and queens can attack them',
    'Nimzowitsch\'s rule: "First restrain, then blockade, then destroy"—immobilize the weak pawn before attacking it'
  ],
  variations: weakPawnsVariations,
};

const pawnStructureChapter: CourseChapter = {
  id: 'ch3-pawn-structure',
  title: 'Pawn Structure',
  subtitle: 'The Skeleton of the Position',
  description: 'Philidor called pawns "the soul of chess." The pawn structure is the SKELETON of the position—it determines where pieces belong, what plans are possible, and how the endgame will unfold. Learn the major structures: the Isolated Queen\'s Pawn (dynamic but weak), the Carlsbad (minority attack territory), the Hedgehog (coiled spring waiting to strike), and more. When you understand structure, you understand chess.',
  estimatedMinutes: 55,
  keyLessons: [
    'The pawn structure DICTATES piece placement—knights go to outposts created by pawns, bishops need diagonals opened by pawn exchanges',
    'Each structure has TYPICAL PLANS: IQP players attack before the endgame, Carlsbad players use the minority attack, Hedgehog players wait for ...d5 or ...b5',
    'Pawn breaks (...c5, ...d5, ...e5, ...f5) are the key to TRANSFORMING structures—know when and how to execute them',
    'A "bad" structure with active pieces can crush a "good" structure with passive pieces—initiative trumps structure in the short term'
  ],
  variations: pawnStructureVariations,
};

// ============================================
// ADDITIONAL CHAPTERS WITH VARIATIONS
// ============================================

const openFilesChapter: CourseChapter =;

const bishopPairChapter: CourseChapter =;

// Placeholder chapters with fewer variations (to be expanded)
const goodBadBishopChapter: CourseChapter =;

const knightPlacementChapter: CourseChapter =;

const spaceAdvantageChapter: CourseChapter =;

const pieceCoordinationChapter: CourseChapter =;

const prophylaxisChapter: CourseChapter =;

const minorityAttackChapter: CourseChapter =;

const pawnBreaksChapter: CourseChapter =;

const kingActivityChapter: CourseChapter =;

const exchangeStrategyChapter: CourseChapter =;

const blockadeChapter: CourseChapter =;

const centralizationChapter: CourseChapter =;

// ============================================
// THE COMPLETE COURSE
// ============================================

export const positionalPatternsCourse: Course = {
  id: 'positional-patterns-manual',
  title: 'The Positional Chess Patterns Manual',
  author: 'Zen Chess',
  description: 'Master 400+ essential positional patterns across 16 strategic concepts. From outposts to exchange strategy, this comprehensive course will transform your strategic understanding.',
  coverImage: '♟️',
  coverColor: '#10b981',
  totalMinutes: 177,
  difficulty: 'intermediate',
  tags: ['positional', 'strategy', 'patterns', 'comprehensive'],
  chapters: [
    outpostsChapter,
    weakPawnsChapter,
    pawnStructureChapter,
    openFilesChapter,
    bishopPairChapter,
    goodBadBishopChapter,
    knightPlacementChapter,
    spaceAdvantageChapter,
    pieceCoordinationChapter,
    prophylaxisChapter,
    minorityAttackChapter,
    pawnBreaksChapter,
    kingActivityChapter,
    exchangeStrategyChapter,
    blockadeChapter,
    centralizationChapter
]
};

export default positionalPatternsCourse;
