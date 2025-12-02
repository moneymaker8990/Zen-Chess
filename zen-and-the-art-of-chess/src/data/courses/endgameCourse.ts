// ============================================
// SILMAN'S COMPLETE ENDGAME COURSE
// Essential Endgame Knowledge by Rating Level
// 60+ variations across fundamental endgame types
// ============================================

import type { Course, CourseChapter } from './courseTypes';
import {
  kingPawnEndgameVariations,
  rookEndgameVariations,
  bishopEndgameVariations,
  knightEndgameVariations,
  queenEndgameVariations,
  fundamentalMatesVariations,
} from './variations/endgameVariations';

// ============================================
// CHAPTER DEFINITIONS
// ============================================

const fundamentalMatesChapter: CourseChapter = {
  id: 'ec-ch1-mates',
  title: 'Fundamental Checkmates',
  subtitle: 'The Absolute Basics',
  description: 'Master the essential checkmate patterns every player must know cold.',
  estimatedMinutes: 30,
  keyLessons: [
    'King + Queen vs King: push to edge, then mate',
    'King + Rook vs King: use opposition',
    'Two Bishops: drive to corner',
    'Bishop + Knight: hardest basic mate'
  ],
  variations: fundamentalMatesVariations,
};

const kingPawnChapter: CourseChapter = {
  id: 'ec-ch2-kp',
  title: 'King and Pawn Endgames',
  subtitle: 'The Foundation of All Endgames',
  description: 'King and pawn endings are the foundation of endgame knowledge. Master opposition, triangulation, and key squares.',
  estimatedMinutes: 45,
  keyLessons: [
    'Opposition is critical',
    'Know the key squares for each pawn',
    'Triangulation wins zugzwang',
    'Outside passed pawns win'
  ],
  variations: kingPawnEndgameVariations,
};

const rookEndgamesChapter: CourseChapter = {
  id: 'ec-ch3-rook',
  title: 'Rook Endgames',
  subtitle: 'The Most Common Endgames',
  description: 'Rook endings occur in over half of all games. Learn Lucena, Philidor, and active rook principles.',
  estimatedMinutes: 50,
  keyLessons: [
    'Lucena: build a bridge',
    'Philidor: rook on 3rd rank',
    'Rook belongs behind passed pawns',
    'Activity beats material'
  ],
  variations: rookEndgameVariations,
};

const bishopEndgamesChapter: CourseChapter = {
  id: 'ec-ch4-bishop',
  title: 'Bishop Endgames',
  subtitle: 'Same vs Opposite Color',
  description: 'Bishop endings require understanding of good vs bad bishops and opposite-color drawing tendencies.',
  estimatedMinutes: 35,
  keyLessons: [
    'Same color: activity decides',
    'Opposite color: draw tendency',
    'Good bishop vs bad bishop',
    'Wrong color bishop = draw'
  ],
  variations: bishopEndgameVariations,
};

const knightEndgamesChapter: CourseChapter = {
  id: 'ec-ch5-knight',
  title: 'Knight Endgames',
  subtitle: 'The Tricky Piece',
  description: 'Knight endings have unique characteristics—knights are slow but create constant fork threats.',
  estimatedMinutes: 35,
  keyLessons: [
    'Knights are slow',
    'Central knights dominate',
    'Fork threats are constant',
    'Knights struggle vs distant passers'
  ],
  variations: knightEndgameVariations,
};

const queenEndgamesChapter: CourseChapter = {
  id: 'ec-ch6-queen',
  title: 'Queen Endgames',
  subtitle: 'Power and Perpetual',
  description: 'Queen endings are tactical but also require technique. Learn perpetual check resources.',
  estimatedMinutes: 40,
  keyLessons: [
    'Queens win vs most material',
    'Perpetual check is common',
    'Stalemate tricks abound',
    'Technique beats random checks'
  ],
  variations: queenEndgameVariations,
};

// ============================================
// THE COMPLETE COURSE
// ============================================

export const endgameCourse: Course = {
  id: 'endgame-course',
  title: 'Silman\'s Complete Endgame Course',
  author: 'Zen Chess',
  description: 'Master the endgame from basic checkmates to complex rook endings. 60+ essential positions that every serious player must know.',
  coverImage: '♔',
  coverColor: '#f59e0b',
  totalMinutes: 62,
  difficulty: 'beginner',
  tags: ['endgame', 'technique', 'essential', 'fundamentals'],
  chapters: [
    fundamentalMatesChapter,
    kingPawnChapter,
    rookEndgamesChapter,
    bishopEndgamesChapter,
    knightEndgamesChapter,
    queenEndgamesChapter,
  ]
};

export default endgameCourse;
