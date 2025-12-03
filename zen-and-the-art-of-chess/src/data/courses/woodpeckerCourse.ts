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

const doubleAttacksChapter: CourseChapter = {
  id: 'wp-ch5-double',
  title: 'Double Attacks',
  subtitle: 'Two Threats at Once',
  description: 'Creating two threats simultaneously is the essence of tactics.',
  estimatedMinutes: 40,
  keyLessons: [
    'One move, two threats',
    'The opponent can only defend one',
    'Checks make excellent double attacks',
    'Look for undefended pieces'
  ],
  variations: [
    { id: 'da-1', title: 'Queen Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Queen attacks two targets', keyTakeaway: 'Queens excel at double attacks.', difficulty: 2, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening Qh5 with double attack!' }] },
    { id: 'da-2', title: 'Knight Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Knight attacks two pieces', keyTakeaway: 'Knights can attack two pieces at once.', difficulty: 2, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Attacking queen and rook!' }] },
    { id: 'da-3', title: 'Bishop Double Attack', fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Diagonal double attack', keyTakeaway: 'Bishops attack along diagonals.', difficulty: 3, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Check and attacking another piece!' }] },
    { id: 'da-4', title: 'Rook Double Attack', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Rook on rank or file', keyTakeaway: 'Rooks attack along ranks and files.', difficulty: 3, moves: [{ move: 'dxe5', annotation: '!', explanation: 'Opening the d-file for attack!' }] },
    { id: 'da-5', title: 'Pawn Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4', toMove: 'white', concept: 'Pawn fork threat', keyTakeaway: 'Pawns can create double attacks.', difficulty: 2, moves: [{ move: 'd5', annotation: '!', explanation: 'Attacking the knight and threatening e6!' }] },
    { id: 'da-6', title: 'Multiple Double Attacks', fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4', toMove: 'white', concept: 'Creating multiple threats', keyTakeaway: 'Layer threats to overwhelm.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Multiple threats emerge!' }] },
    { id: 'da-7', title: 'Double Attack After Exchange', fen: 'r1bqk2r/pppp1ppp/2n5/2b1p3/2BnP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5', toMove: 'white', concept: 'Exchange leading to double attack', keyTakeaway: 'Exchanges can create double attacks.', difficulty: 3, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Setting up the double attack!' }] },
    { id: 'da-8', title: 'Geometrical Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Using geometry', keyTakeaway: 'Board geometry creates tactics.', difficulty: 3, moves: [{ move: 'd3', explanation: 'Preparing for the attack.' }] },
    { id: 'da-9', title: 'Central Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Central knight dominates', keyTakeaway: 'Central pieces create more threats.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Fork!' }] },
    { id: 'da-10', title: 'Counter Double Attack', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 5 4', toMove: 'black', concept: 'Defending with counter-threats', keyTakeaway: 'Meet double attacks with counter-threats.', difficulty: 4, moves: [{ move: 'd5', annotation: '!', explanation: 'Counter-attacking!' }] },
  ]
};

const removeDefenderChapter: CourseChapter = {
  id: 'wp-ch6-remove',
  title: 'Removing the Defender',
  subtitle: 'Eliminating Protection',
  description: 'When a piece is defended, remove the defender first.',
  estimatedMinutes: 35,
  keyLessons: [
    'Capture the defender before the target',
    'Deflection moves pieces away',
    'Decoys lure pieces to bad squares',
    'Overloaded pieces can\'t defend everything'
  ],
  variations: [
    { id: 'rd-1', title: 'Capturing the Defender', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Take the defender', keyTakeaway: 'Remove defenders to win material.', difficulty: 2, moves: [{ move: 'dxe5', annotation: '!', explanation: 'Removing the defender of d5!' }] },
    { id: 'rd-2', title: 'Deflection', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R w KQ - 0 8', toMove: 'white', concept: 'Deflecting a defender', keyTakeaway: 'Force the defender away from its duty.', difficulty: 3, moves: [{ move: 'Nxc6', annotation: '!', explanation: 'Deflecting the queen!' }] },
    { id: 'rd-3', title: 'Decoy', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Luring a piece', keyTakeaway: 'Decoy pieces to bad squares.', difficulty: 3, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Decoying the king!' }] },
    { id: 'rd-4', title: 'Overloaded Piece', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Exploiting overload', keyTakeaway: 'Overloaded pieces fail.', difficulty: 4, moves: [{ move: 'e5', annotation: '!', explanation: 'The knight defends too much!' }] },
    { id: 'rd-5', title: 'Trading the Defender', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Exchange to remove', keyTakeaway: 'Trade defenders to expose weaknesses.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning and threatening to remove!' }] },
    { id: 'rd-6', title: 'Multiple Defender Removal', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Systematic removal', keyTakeaway: 'Remove defenders one by one.', difficulty: 4, moves: [{ move: 'dxe5', annotation: '!', explanation: 'First removal!' }] },
    { id: 'rd-7', title: 'Attraction Sacrifice', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Sacrifice to attract', keyTakeaway: 'Sacrifice to attract defenders.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Attracting the king!' }] },
    { id: 'rd-8', title: 'Interference', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Blocking defender', keyTakeaway: 'Put a piece in the way.', difficulty: 4, moves: [{ move: 'e5', annotation: '!', explanation: 'Interfering with defense!' }] },
    { id: 'rd-9', title: 'X-Ray Defense Breaking', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Breaking X-ray defense', keyTakeaway: 'Interrupt X-ray defenders.', difficulty: 5, moves: [{ move: 'Be3', annotation: '!', explanation: 'Breaking the X-ray!' }] },
    { id: 'rd-10', title: 'Zwischenzug to Remove', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'In-between move', keyTakeaway: 'Insert a move before capture.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Zwischenzug!' }] },
  ]
};

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

const matingPatternsChapter: CourseChapter = {
  id: 'wp-ch8-mates',
  title: 'Mating Patterns',
  subtitle: 'Checkmate Patterns',
  description: 'Recognize the classic mating patterns to spot them in your games.',
  estimatedMinutes: 50,
  keyLessons: [
    'Learn the classic patterns by name',
    'Patterns repeat across many positions',
    'Set up mating nets with your pieces',
    'Sacrifice to reach a known pattern'
  ],
  variations: [
    { id: 'mp-1', title: 'Scholar\'s Mate', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', toMove: 'white', concept: 'Basic f7 weakness', keyTakeaway: 'f7 is weak in the opening.', difficulty: 1, moves: [{ move: 'Qxf7#', annotation: '!', explanation: 'Scholar\'s Mate!' }] },
    { id: 'mp-2', title: 'Anastasia\'s Mate', fen: 'r1bq1r1k/ppppnNpp/8/8/8/8/PPPP1PPP/R1BQK2R w KQ - 0 1', toMove: 'white', concept: 'Knight and rook mate', keyTakeaway: 'Knight controls escape squares.', difficulty: 3, moves: [{ move: 'Qh5+', annotation: '!', explanation: 'Setting up the mate!' }] },
    { id: 'mp-3', title: 'Arabian Mate', fen: '5rk1/5ppp/8/8/8/8/5PPP/R4RK1 w - - 0 1', toMove: 'white', concept: 'Rook and knight mate', keyTakeaway: 'Knight covers escape, rook mates.', difficulty: 3, moves: [{ move: 'Ra8', annotation: '!', explanation: 'Arabian Mate setup!' }] },
    { id: 'mp-4', title: 'Boden\'s Mate', fen: 'r1b1k2r/ppppqppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5', toMove: 'white', concept: 'Criss-cross bishops', keyTakeaway: 'Two bishops deliver mate.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Setting up Boden\'s Mate!' }] },
    { id: 'mp-5', title: 'Smothered Mate', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Knight mates trapped king', keyTakeaway: 'Own pieces trap the king.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Preparing smothered mate!' }] },
    { id: 'mp-6', title: 'Greek Gift', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 6', toMove: 'white', concept: 'Bxh7+ sacrifice', keyTakeaway: 'Classic bishop sacrifice pattern.', difficulty: 4, moves: [{ move: 'Bxh7+', annotation: '!!', explanation: 'The Greek Gift!' }] },
    { id: 'mp-7', title: 'Opera Mate', fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Rook and bishop mate', keyTakeaway: 'Bishop and rook coordinate.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Opera Mate pattern!' }] },
    { id: 'mp-8', title: 'Epaulette Mate', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQ - 0 6', toMove: 'white', concept: 'Rooks block king', keyTakeaway: 'Rooks act as "epaulettes".', difficulty: 4, moves: [{ move: 'Nxe5', annotation: '!', explanation: 'Preparing Epaulette Mate!' }] },
    { id: 'mp-9', title: 'Cozio\'s Mate', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Queen delivers mate', keyTakeaway: 'Queen reaches key square.', difficulty: 3, moves: [{ move: 'd4', explanation: 'Opening lines!' }] },
    { id: 'mp-10', title: 'Lolli\'s Mate', fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQ - 0 6', toMove: 'white', concept: 'Pawn supports queen mate', keyTakeaway: 'Pawn protects the queen.', difficulty: 3, moves: [{ move: 'Qxf7+', annotation: '!', explanation: 'Lolli\'s pattern!' }] },
  ]
};

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
    matingPatternsChapter,
  ]
};

export default woodpeckerCourse;
