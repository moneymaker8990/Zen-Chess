import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import allOpenings, { type OpeningLine } from '@/data/openings';

// ============================================
// OPENING COURSES - ORGANIZED BY FAMILY
// ============================================

interface OpeningCourse {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  linesCount: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  forWhite: boolean;
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other';
  filter: (o: OpeningLine) => boolean;
  legends?: string[];
}

const OPENING_COURSES: OpeningCourse[] = [
  // === E4 OPENINGS ===
  {
    id: 'italian',
    name: 'Italian Game',
    tagline: 'Timeless principles meet tactical fireworks',
    description: 'Direct development toward the weak f7 square. A perfect entry into classical chess principles with positions that teach fundamentals while offering attacking chances.',
    icon: '🇮🇹',
    color: 'from-emerald-500/20 to-emerald-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: true,
    category: 'e4',
    filter: (o) => o.name.includes('Italian') || o.eco.startsWith('C5'),
    legends: ['Morphy', 'Steinitz', 'Fischer'],
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez',
    tagline: 'Five centuries of accumulated wisdom',
    description: 'Strategic depth that rewards long-term planning. The bishop on b5 creates persistent tension, leading to rich maneuvering battles where understanding outweighs memorization.',
    icon: '🇪🇸',
    color: 'from-red-500/20 to-orange-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: true,
    category: 'e4',
    filter: (o) => o.name.includes('Ruy Lopez') || o.eco.startsWith('C6') || o.eco.startsWith('C7') || o.eco.startsWith('C8') || o.eco.startsWith('C9'),
    legends: ['Capablanca', 'Fischer', 'Carlsen'],
  },
  {
    id: 'sicilian',
    name: 'Sicilian Defense',
    tagline: 'Imbalance from the first move',
    description: 'Black breaks symmetry immediately, accepting structural weaknesses for dynamic counterplay. The resulting positions demand precision from both sides.',
    icon: '⚔️',
    color: 'from-violet-500/20 to-purple-600/5',
    linesCount: 0,
    difficulty: 5,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('Sicilian') || o.eco.startsWith('B2') || o.eco.startsWith('B3') || o.eco.startsWith('B4') || o.eco.startsWith('B5') || o.eco.startsWith('B6') || o.eco.startsWith('B9'),
    legends: ['Kasparov', 'Fischer', 'Tal'],
  },
  {
    id: 'french',
    name: 'French Defense',
    tagline: 'A fortress with hidden passages',
    description: 'The e6-d5 chain creates a resilient structure. Black accepts temporary cramped positions, knowing the light-squared bishop will emerge when the time is right.',
    icon: '🏰',
    color: 'from-blue-500/20 to-indigo-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('French') || o.eco.startsWith('C0') || o.eco.startsWith('C1'),
    legends: ['Botvinnik', 'Karpov'],
  },
  {
    id: 'caro-kann',
    name: 'Caro-Kann Defense',
    tagline: 'Solidity with a sting',
    description: 'Free the light-squared bishop before committing the pawn to e6. This subtle move order leads to harmonious development while maintaining a rock-solid structure.',
    icon: '🪨',
    color: 'from-slate-500/20 to-gray-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('Caro') || o.eco.startsWith('B1'),
    legends: ['Karpov', 'Capablanca'],
  },
  
  // === D4 OPENINGS ===
  {
    id: 'queens-gambit',
    name: "Queen's Gambit",
    tagline: 'The cornerstone of positional chess',
    description: 'Challenge Black\'s central pawn immediately. Whether accepted or declined, White gains space and piece activity. A must-know for serious players.',
    icon: '👑',
    color: 'from-amber-500/20 to-yellow-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: true,
    category: 'd4',
    filter: (o) => o.name.includes('Queen\'s Gambit') || o.name.includes('Slav') || o.eco.startsWith('D0') || o.eco.startsWith('D1') || o.eco.startsWith('D2') || o.eco.startsWith('D3') || o.eco.startsWith('D4') || o.eco.startsWith('D5') || o.eco.startsWith('D6'),
    legends: ['Kasparov', 'Carlsen', 'Botvinnik'],
  },
  {
    id: 'kings-indian',
    name: "King's Indian Defense",
    tagline: 'Coiled spring energy',
    description: 'Allow White to build an imposing center, then strike with f5 or c5. The resulting kingside attacks are among the most thrilling in chess.',
    icon: '💣',
    color: 'from-orange-500/20 to-red-600/5',
    linesCount: 0,
    difficulty: 5,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('King\'s Indian') || o.eco.startsWith('E6') || o.eco.startsWith('E7') || o.eco.startsWith('E8') || o.eco.startsWith('E9'),
    legends: ['Kasparov', 'Fischer', 'Tal'],
  },
  {
    id: 'nimzo-indian',
    name: 'Nimzo-Indian Defense',
    tagline: 'Elegant piece play over pawn structures',
    description: 'The Bb4 pin immediately pressures White\'s center. Black often exchanges bishop for knight, getting doubled pawns as compensation for active pieces.',
    icon: '♞',
    color: 'from-teal-500/20 to-cyan-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('Nimzo') || o.eco.startsWith('E2') || o.eco.startsWith('E3') || o.eco.startsWith('E4') || o.eco.startsWith('E5'),
    legends: ['Capablanca', 'Karpov', 'Carlsen'],
  },
  {
    id: 'grunfeld',
    name: 'Grünfeld Defense',
    tagline: 'Counterattack the center you gave away',
    description: 'Concede space to create targets. The d4-pawn becomes a weakness once Black\'s fianchettoed bishop and mobile pieces coordinate their assault.',
    icon: '🥋',
    color: 'from-lime-500/20 to-green-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('Grünfeld') || o.name.includes('Grunfeld') || o.eco.startsWith('D7') || o.eco.startsWith('D8') || o.eco.startsWith('D9'),
    legends: ['Kasparov', 'Fischer'],
  },
  {
    id: 'catalan',
    name: 'Catalan Opening',
    tagline: 'Quiet moves, lasting pressure',
    description: 'The g2-bishop radiates power across the entire board. White accepts a slow build-up for persistent positional advantages that accumulate over time.',
    icon: '🎯',
    color: 'from-sky-500/20 to-blue-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: true,
    category: 'd4',
    filter: (o) => o.name.includes('Catalan') || o.eco.startsWith('E0'),
    legends: ['Carlsen', 'Kramnik'],
  },
  {
    id: 'london',
    name: 'London System',
    tagline: 'Consistent structure, endless games',
    description: 'Develop Bf4-e3-d2 triangle and build a pyramid with pawns on d4, e3, c3. A reliable weapon that requires understanding over memorization.',
    icon: '🎩',
    color: 'from-gray-500/20 to-zinc-600/5',
    linesCount: 0,
    difficulty: 1,
    forWhite: true,
    category: 'd4',
    filter: (o) => o.name.includes('London'),
    legends: ['Kamsky', 'Jobava'],
  },
  
  // === FLANK OPENINGS ===
  {
    id: 'english',
    name: 'English Opening',
    tagline: 'Reversed positions, fresh perspectives',
    description: 'A Sicilian with an extra tempo, or a path to unique structures. The English offers flexibility and transpositional possibilities unmatched by other openings.',
    icon: '🇬🇧',
    color: 'from-rose-500/20 to-pink-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: true,
    category: 'c4',
    filter: (o) => o.name.includes('English') || o.eco.startsWith('A1') || o.eco.startsWith('A2') || o.eco.startsWith('A3'),
    legends: ['Botvinnik', 'Carlsen'],
  },
  {
    id: 'reti',
    name: 'Réti Opening',
    tagline: 'Influence without occupation',
    description: 'Control the center with pieces rather than pawns. Nf3 and fianchetto create flexible structures that can morph into various systems based on Black\'s response.',
    icon: '🌀',
    color: 'from-fuchsia-500/20 to-purple-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: true,
    category: 'nf3',
    filter: (o) => o.name.includes('Réti') || o.name.includes('Reti') || o.eco.startsWith('A0'),
    legends: ['Réti', 'Carlsen'],
  },
  
  // === MORE DEFENSES ===
  {
    id: 'alekhine',
    name: 'Alekhine Defense',
    tagline: 'Lure the pawns forward, then strike',
    description: 'The knight invites pawn advances that can become overextended. Requires concrete knowledge but offers excellent winning chances against unprepared opponents.',
    icon: '🎭',
    color: 'from-indigo-500/20 to-violet-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('Alekhine') && o.name.includes('Defense'),
    legends: ['Alekhine', 'Fischer'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian Defense',
    tagline: 'Immediate central confrontation',
    description: 'Challenge e4 on move one and get the queen active early. The resulting positions are easier to understand than to refute, making this a practical weapon.',
    icon: '🏔️',
    color: 'from-cyan-500/20 to-sky-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('Scandinavian'),
    legends: ['Tiviakov'],
  },
  {
    id: 'pirc',
    name: 'Pirc/Modern Defense',
    tagline: 'Flexible fianchetto resistance',
    description: 'Develop the kingside bishop before committing the center pawns. This hypermodern approach keeps options open while inviting White to overextend.',
    icon: '🦎',
    color: 'from-green-500/20 to-emerald-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: false,
    category: 'e4',
    filter: (o) => o.name.includes('Pirc') || o.name.includes('Modern'),
    legends: ['Seirawan', 'Speelman'],
  },
  {
    id: 'dutch',
    name: 'Dutch Defense',
    tagline: 'Seize the e4 square from move one',
    description: 'The f5 pawn immediately stakes Black\'s claim on the center. Whether playing the Stonewall or Leningrad, Black dictates the character of the game.',
    icon: '🌷',
    color: 'from-orange-500/20 to-amber-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('Dutch'),
    legends: ['Nakamura', 'Carlsen'],
  },
  {
    id: 'queens-indian',
    name: "Queen's Indian Defense",
    tagline: 'Central control through the flanks',
    description: 'Fianchetto the queenside bishop to pressure e4 and the long diagonal. A sophisticated defense that avoids the sharpest Nimzo-Indian lines.',
    icon: '👸',
    color: 'from-pink-500/20 to-rose-600/5',
    linesCount: 0,
    difficulty: 3,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes("Queen's Indian"),
    legends: ['Karpov', 'Kasparov'],
  },
  {
    id: 'bogo-indian',
    name: 'Bogo-Indian Defense',
    tagline: 'Check first, develop later',
    description: 'Bb4+ immediately challenges White\'s setup before they can play Nc3. A practical choice that sidesteps heavy theory while maintaining a solid position.',
    icon: '✔️',
    color: 'from-yellow-500/20 to-amber-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('Bogo'),
    legends: ['Nimzowitsch'],
  },
  {
    id: 'benoni',
    name: 'Modern Benoni & Benko',
    tagline: 'Pawn sacrifice for initiative',
    description: 'Give up material to open lines and seize the initiative. The queenside pressure in these systems can last deep into the endgame.',
    icon: '⚡',
    color: 'from-red-500/20 to-orange-600/5',
    linesCount: 0,
    difficulty: 4,
    forWhite: false,
    category: 'd4',
    filter: (o) => o.name.includes('Benoni') || o.name.includes('Benko'),
    legends: ['Tal', 'Kasparov'],
  },
  
  // === MORE WHITE SYSTEMS ===
  {
    id: 'trompowsky',
    name: 'Trompowsky Attack',
    tagline: 'Sidestep mainline theory',
    description: 'Bg5 before Nc3 creates unique tactical problems. A practical weapon for players who want fighting positions without memorizing 20 moves of theory.',
    icon: '🎪',
    color: 'from-violet-500/20 to-purple-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: true,
    category: 'd4',
    filter: (o) => o.name.includes('Trompowsky'),
    legends: ['Rapport', 'Adams'],
  },
  {
    id: 'torre',
    name: 'Torre Attack',
    tagline: 'Pin and pressure from the start',
    description: 'Bg5 pins the knight and often forces structural concessions. Combined with solid development, White gets easy play and clear plans.',
    icon: '🗼',
    color: 'from-stone-500/20 to-zinc-600/5',
    linesCount: 0,
    difficulty: 2,
    forWhite: true,
    category: 'd4',
    filter: (o) => o.name.includes('Torre'),
    legends: ['Petrosian'],
  },
];

// ============================================
// OPENING TRAINER COMPONENT
// ============================================

type ViewMode = 'courses' | 'lines' | 'practice';

export function OpeningsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [selectedCourse, setSelectedCourse] = useState<OpeningCourse | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<OpeningLine | null>(null);
  const [filterSide, setFilterSide] = useState<'all' | 'white' | 'black'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Practice state
  const [game, setGame] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [userColor, setUserColor] = useState<'white' | 'black'>('white');
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'learn' | 'test'>('learn');
  const [streak, setStreak] = useState(0);
  
  const autoPlayTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Calculate lines count for each course
  const coursesWithCounts = useMemo(() => {
    return OPENING_COURSES.map(course => ({
      ...course,
      linesCount: allOpenings.filter(course.filter).length,
    }));
  }, []);

  // Filter courses
  const filteredCourses = useMemo(() => {
    let courses = coursesWithCounts;
    
    if (filterSide === 'white') {
      courses = courses.filter(c => c.forWhite);
    } else if (filterSide === 'black') {
      courses = courses.filter(c => !c.forWhite);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.tagline.toLowerCase().includes(query)
      );
    }
    
    return courses;
  }, [coursesWithCounts, filterSide, searchQuery]);

  // Get lines for selected course
  const courseLines = useMemo(() => {
    if (!selectedCourse) return [];
    return allOpenings.filter(selectedCourse.filter);
  }, [selectedCourse]);

  // Start practicing an opening
  const startOpening = useCallback((opening: OpeningLine, color: 'white' | 'black') => {
    setSelectedOpening(opening);
    setUserColor(color);
    setGame(new Chess());
    setCurrentMoveIndex(0);
    setLastMove(null);
    setFeedback(null);
    setShowHint(false);
    setViewMode('practice');
    
    if (color === 'black') {
      setIsUserTurn(false);
    } else {
      setIsUserTurn(true);
    }
  }, []);

  // Auto-play opponent moves
  useEffect(() => {
    if (!selectedOpening || practiceMode !== 'learn') return;
    if (isUserTurn) return;
    if (currentMoveIndex >= selectedOpening.moves.length) return;

    autoPlayTimeout.current = setTimeout(() => {
      const move = selectedOpening.moves[currentMoveIndex];
      const gameCopy = new Chess(game.fen());
      
      try {
        const result = gameCopy.move(move);
        if (result) {
          setGame(gameCopy);
          setLastMove({ from: result.from as Square, to: result.to as Square });
          setCurrentMoveIndex(prev => prev + 1);
          setIsUserTurn(true);
        }
      } catch (e) {
        console.error('Auto-play error:', move, e);
      }
    }, 600);

    return () => {
      if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
    };
  }, [selectedOpening, currentMoveIndex, isUserTurn, game, practiceMode]);

  // Get possible moves for a square
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: game.get(move.to) 
          ? 'rgba(239, 68, 68, 0.4)' 
          : 'rgba(212, 175, 55, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(212, 175, 55, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle user move
  const handleMove = useCallback((from: Square, to: Square) => {
    if (!selectedOpening || !isUserTurn) return false;
    if (currentMoveIndex >= selectedOpening.moves.length) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;

      const expectedMove = selectedOpening.moves[currentMoveIndex];
      const isCorrect = result.san === expectedMove || 
                        `${from}${to}` === expectedMove ||
                        result.san.replace(/[+#]/g, '') === expectedMove.replace(/[+#]/g, '');

      if (isCorrect) {
        setGame(gameCopy);
        setLastMove({ from, to });
        setCurrentMoveIndex(prev => prev + 1);
        setFeedback('correct');
        setShowHint(false);
        setStreak(prev => prev + 1);
        
        if (currentMoveIndex + 1 >= selectedOpening.moves.length) {
          setFeedback('complete');
        } else {
          setIsUserTurn(false);
          setTimeout(() => setFeedback(null), 600);
        }
        return true;
      } else {
        setFeedback('incorrect');
        setStreak(0);
        setTimeout(() => setFeedback(null), 800);
        return false;
      }
    } catch {
      return false;
    }
  }, [selectedOpening, currentMoveIndex, isUserTurn, game]);

  // Handle square click
  const onSquareClick = useCallback((square: Square) => {
    if (!isUserTurn || feedback === 'complete') return;

    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }

    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    handleMove(moveFrom, square);
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, isUserTurn, feedback, getMoveOptions, handleMove]);

  // Handle drag and drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (!isUserTurn || feedback === 'complete') return false;
    return handleMove(sourceSquare, targetSquare);
  }, [isUserTurn, feedback, handleMove]);

  // Reset current line
  const resetLine = () => {
    if (selectedOpening) {
      setGame(new Chess());
      setCurrentMoveIndex(0);
      setLastMove(null);
      setFeedback(null);
      setShowHint(false);
      if (userColor === 'black') {
        setIsUserTurn(false);
      } else {
        setIsUserTurn(true);
      }
    }
  };

  // Get hint squares for the current expected move
  const getHintSquares = useCallback((): Record<string, { backgroundColor: string }> => {
    if (!showHint || !selectedOpening || currentMoveIndex >= selectedOpening.moves.length) {
      return {};
    }
    
    const expectedMove = selectedOpening.moves[currentMoveIndex];
    const gameCopy = new Chess(game.fen());
    
    // Try to find the move
    try {
      const moves = gameCopy.moves({ verbose: true });
      const matchingMove = moves.find(m => 
        m.san === expectedMove || 
        m.san.replace(/[+#]/g, '') === expectedMove.replace(/[+#]/g, '')
      );
      
      if (matchingMove) {
        return {
          [matchingMove.from]: { backgroundColor: 'rgba(59, 130, 246, 0.6)' }, // Blue highlight for from square
          [matchingMove.to]: { backgroundColor: 'rgba(59, 130, 246, 0.4)' }, // Lighter blue for to square
        };
      }
    } catch (e) {
      console.error('Error getting hint squares:', e);
    }
    
    return {};
  }, [showHint, selectedOpening, currentMoveIndex, game]);

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(212, 175, 55, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(212, 175, 55, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(feedback === 'incorrect' && {
      ...(moveFrom && { [moveFrom]: { backgroundColor: 'rgba(239, 68, 68, 0.5)' } }),
    }),
    ...getHintSquares(),
  };

  // ============================================
  // RENDER: COURSE SELECTION VIEW
  // ============================================
  if (viewMode === 'courses') {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Hero Header */}
        <section className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-serif text-zen-100 mb-4">
            Opening Repertoire
          </h1>
          <p className="text-xl text-zen-400 font-serif italic max-w-2xl mx-auto">
            Master {allOpenings.length} essential lines across {OPENING_COURSES.length} opening systems
          </p>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'white', 'black'] as const).map(side => (
              <button
                key={side}
                onClick={() => setFilterSide(side)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterSide === side
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                    : 'bg-zen-800/40 text-zen-400 border border-zen-700/30 hover:border-zen-600/50'
                }`}
              >
                {side === 'all' ? '🎯 All Openings' : side === 'white' ? '⬜ For White' : '⬛ For Black'}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search openings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 rounded-lg bg-zen-800/40 border border-zen-700/30 text-zen-200 placeholder-zen-600 focus:outline-none focus:border-gold-500/50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zen-600">🔍</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setViewMode('lines');
              }}
              className={`group relative overflow-hidden rounded-2xl border border-zen-700/30 p-6 text-left transition-all hover:border-gold-500/30 hover:scale-[1.02] bg-gradient-to-br ${course.color}`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {course.icon}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif text-zen-100 group-hover:text-gold-400 transition-colors">
                    {course.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${course.forWhite ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-800 text-zinc-200'}`}>
                    {course.forWhite ? 'White' : 'Black'}
                  </span>
                </div>
                
                <p className="text-gold-400/80 font-serif italic text-sm">
                  {course.tagline}
                </p>
                
                <p className="text-zen-400 text-sm line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-zen-700/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-zen-500 text-sm">
                    {course.linesCount} lines
                  </span>
                  <span className="text-gold-400/60 text-xs">
                    {'★'.repeat(course.difficulty)}{'☆'.repeat(5 - course.difficulty)}
                  </span>
                </div>
                
                {course.legends && course.legends.length > 0 && (
                  <div className="flex items-center gap-1">
                    {course.legends.slice(0, 3).map((legend, i) => (
                      <span key={i} className="text-xs text-zen-500">
                        {legend}{i < Math.min(course.legends!.length, 3) - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-serif text-gold-400">{allOpenings.length}</div>
            <div className="text-zen-500 text-sm">Total Lines</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-serif text-gold-400">{OPENING_COURSES.length}</div>
            <div className="text-zen-500 text-sm">Opening Systems</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-serif text-gold-400">12</div>
            <div className="text-zen-500 text-sm">Legend References</div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: LINE SELECTION VIEW
  // ============================================
  if (viewMode === 'lines' && selectedCourse) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setViewMode('courses')}
            className="text-zen-500 hover:text-gold-400 transition-colors"
          >
            Openings
          </button>
          <span className="text-zen-600">/</span>
          <span className="text-zen-300">{selectedCourse.name}</span>
        </div>

        {/* Course Header */}
        <div className={`rounded-2xl p-8 bg-gradient-to-br ${selectedCourse.color} border border-zen-700/30`}>
          <div className="flex items-start gap-6">
            <div className="text-6xl">{selectedCourse.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-serif text-zen-100 mb-2">{selectedCourse.name}</h1>
              <p className="text-gold-400 font-serif italic mb-4">{selectedCourse.tagline}</p>
              <p className="text-zen-400">{selectedCourse.description}</p>
              
              {selectedCourse.legends && selectedCourse.legends.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-zen-500 text-sm">Played by:</span>
                  {selectedCourse.legends.map((legend, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-zen-800/60 text-zen-300">
                      {legend}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseLines.map((opening, index) => (
            <div key={opening.id} className="glass-card p-5 hover:border-gold-500/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zen-800/60 flex items-center justify-center text-gold-400 text-sm font-mono">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-zen-200 font-medium">{opening.variation || opening.name}</h3>
                    <span className="text-xs text-zen-600 font-mono">{opening.eco}</span>
                  </div>
                </div>
                <span className="text-gold-400/60 text-xs">
                  {'★'.repeat(opening.difficulty)}
                </span>
              </div>
              
              <p className="text-zen-500 text-xs mb-4 line-clamp-2">
                {opening.description}
              </p>

              {/* Key Ideas Preview */}
              <div className="mb-4 flex flex-wrap gap-1">
                {opening.keyIdeas.slice(0, 2).map((idea, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-zen-800/40 text-zen-400">
                    {idea}
                  </span>
                ))}
              </div>

              <button
                onClick={() => startOpening(opening, selectedCourse.forWhite ? 'white' : 'black')}
                className={`w-full text-xs px-3 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCourse.forWhite
                    ? 'bg-zinc-200 text-zinc-800 hover:bg-zinc-100'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-600'
                }`}
              >
                {selectedCourse.forWhite ? '⬜ Practice as White' : '⬛ Practice as Black'}
              </button>
            </div>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => setViewMode('courses')}
          className="zen-button-ghost"
        >
          ← Back to Openings
        </button>
      </div>
    );
  }

  // ============================================
  // RENDER: PRACTICE VIEW
  // ============================================
  if (viewMode === 'practice' && selectedOpening) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setViewMode('courses')}
            className="text-zen-500 hover:text-gold-400 transition-colors"
          >
            Openings
          </button>
          <span className="text-zen-600">/</span>
          {selectedCourse && (
            <>
              <button
                onClick={() => setViewMode('lines')}
                className="text-zen-500 hover:text-gold-400 transition-colors"
              >
                {selectedCourse.name}
              </button>
              <span className="text-zen-600">/</span>
            </>
          )}
          <span className="text-zen-300">{selectedOpening.variation}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Board Section */}
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex items-center gap-4 mb-2">
              <div className="flex rounded-lg bg-zen-800/40 p-1">
                <button
                  onClick={() => setPracticeMode('learn')}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    practiceMode === 'learn'
                      ? 'bg-gold-500/20 text-gold-400'
                      : 'text-zen-400 hover:text-zen-200'
                  }`}
                >
                  📖 Learn
                </button>
                <button
                  onClick={() => setPracticeMode('test')}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    practiceMode === 'test'
                      ? 'bg-gold-500/20 text-gold-400'
                      : 'text-zen-400 hover:text-zen-200'
                  }`}
                >
                  🎯 Test
                </button>
              </div>
              
              {streak > 2 && (
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <span>🔥</span>
                  <span>{streak} streak</span>
                </div>
              )}
            </div>

            {/* Chessboard */}
            <div className="relative">
              <Chessboard
                position={game.fen()}
                onSquareClick={onSquareClick}
                onPieceDrop={onDrop}
                boardOrientation={userColor}
                customSquareStyles={customSquareStyles}
                customDarkSquareStyle={{ backgroundColor: '#4a6670' }}
                customLightSquareStyle={{ backgroundColor: '#8ba4a8' }}
                animationDuration={150}
                arePiecesDraggable={isUserTurn && feedback !== 'complete'}
              />
              
              {/* Feedback Overlay */}
              {feedback === 'complete' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-serif text-gold-400 mb-2">Line Complete!</h3>
                    <p className="text-zen-400 mb-6">You've mastered this variation.</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={resetLine} className="zen-button">
                        Practice Again
                      </button>
                      <button
                        onClick={() => setViewMode('lines')}
                        className="zen-button-ghost"
                      >
                        Next Line
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint || feedback === 'complete'}
                className="zen-button-ghost flex-1"
              >
                💡 Hint
              </button>
              <button onClick={resetLine} className="zen-button-ghost flex-1">
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            {/* Opening Info */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-serif text-zen-100">{selectedOpening.name}</h2>
                  <p className="text-gold-400 text-sm">{selectedOpening.variation}</p>
                </div>
                <span className="text-xs font-mono text-zen-600 bg-zen-800/60 px-2 py-1 rounded">
                  {selectedOpening.eco}
                </span>
              </div>
              <p className="text-zen-400 text-sm">{selectedOpening.description}</p>
            </div>

            {/* Progress */}
            <div className="glass-card p-6">
              <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Progress</h4>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-zen-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(currentMoveIndex / selectedOpening.moves.length) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <span className="text-zen-400">Move {Math.ceil(currentMoveIndex / 2)}</span>
                <span className="text-gold-400 font-mono">{currentMoveIndex}/{selectedOpening.moves.length}</span>
              </div>

              {/* Move List */}
              <div className="p-4 bg-zen-900/50 rounded-lg max-h-48 overflow-y-auto">
                <div className="flex flex-wrap gap-1 text-sm font-mono">
                  {selectedOpening.moves.map((move, i) => (
                    <span key={i} className="flex items-center">
                      {i % 2 === 0 && (
                        <span className="text-zen-600 mr-0.5 text-xs">{Math.floor(i / 2) + 1}.</span>
                      )}
                      <span className={`px-1.5 py-0.5 rounded transition-all ${
                        i < currentMoveIndex 
                          ? 'text-emerald-400' 
                          : i === currentMoveIndex && showHint
                            ? 'text-gold-400 bg-gold-500/20 font-medium' 
                            : 'text-zen-700'
                      }`}>
                        {i < currentMoveIndex ? move : (i === currentMoveIndex && showHint ? move : '???')}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Ideas */}
            <div className="glass-card p-6">
              <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Key Ideas</h4>
              <ul className="space-y-3">
                {selectedOpening.keyIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-3 text-zen-400 text-sm">
                    <span className="text-gold-500 mt-0.5">◆</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <button
              onClick={() => {
                setSelectedOpening(null);
                setViewMode('lines');
              }}
              className="w-full zen-button-ghost"
            >
              ← Back to Lines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default OpeningsPage;
