import { useState, useCallback, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { openingLines, type OpeningLine } from '@/data/openings';
import { PageHeader } from '@/components/Tutorial';

type Category = 'all' | 'e4' | 'd4' | 'c4' | 'nf3';

export function OpeningTrainer() {
  const boardStyles = useBoardStyles();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedOpening, setSelectedOpening] = useState<OpeningLine | null>(null);
  const [game, setGame] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [userColor, setUserColor] = useState<'white' | 'black'>('white');
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [practiceMode, _setPracticeMode] = useState<'learn' | 'test'>('learn');
  const [showHint, setShowHint] = useState(false);
  
  const autoPlayTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Filter openings by category
  const filteredOpenings = selectedCategory === 'all' 
    ? openingLines 
    : openingLines.filter(o => o.category === selectedCategory);

  // Start practicing an opening
  const startOpening = useCallback((opening: OpeningLine, color: 'white' | 'black') => {
    setSelectedOpening(opening);
    setUserColor(color);
    setGame(new Chess());
    setCurrentMoveIndex(0);
    setLastMove(null);
    setFeedback(null);
    setShowHint(false);
    
    // If user is black, play white's first move
    if (color === 'black') {
      setIsUserTurn(false);
    } else {
      setIsUserTurn(true);
    }
  }, []);

  // Auto-play opponent moves in learn mode
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
    }, 800);

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
          ? 'rgba(147, 112, 219, 0.5)' 
          : 'rgba(147, 112, 219, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(147, 112, 219, 0.4)' };
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
        
        // Check if line is complete
        if (currentMoveIndex + 1 >= selectedOpening.moves.length) {
          setFeedback('complete');
        } else {
          // Switch turns
          setIsUserTurn(false);
          setTimeout(() => setFeedback(null), 800);
        }
        return true;
      } else {
        setFeedback('incorrect');
        setTimeout(() => setFeedback(null), 1000);
        return false;
      }
    } catch {
      return false;
    }
  }, [selectedOpening, currentMoveIndex, isUserTurn, game]);

  // Handle square click (chess.com style - improved)
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

    // If clicking the same square, deselect (chess.com behavior)
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

  // Get hint (next move)
  const getHint = () => {
    if (selectedOpening && currentMoveIndex < selectedOpening.moves.length) {
      setShowHint(true);
    }
  };

  // Reset current line
  const resetLine = () => {
    if (selectedOpening) {
      startOpening(selectedOpening, userColor);
    }
  };

  // Custom square styles
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.3)' },
      [lastMove.to]: { backgroundColor: 'rgba(147, 112, 219, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(feedback === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.5)' },
    }),
  };

  // Custom arrows for hints - show the expected move in learn mode
  const customArrows: [Square, Square, string][] = [];
  if (selectedOpening && (showHint || practiceMode === 'learn') && isUserTurn && currentMoveIndex < selectedOpening.moves.length) {
    const nextMove = selectedOpening.moves[currentMoveIndex];
    try {
      const tempGame = new Chess(game.fen());
      const moveResult = tempGame.move(nextMove);
      if (moveResult) {
        customArrows.push([moveResult.from as Square, moveResult.to as Square, 'rgba(74, 222, 128, 0.8)']);
      }
    } catch {
      // Invalid move notation, skip arrow
    }
  }

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Openings' },
    { id: 'e4', label: '1.e4' },
    { id: 'd4', label: '1.d4' },
    { id: 'c4', label: '1.c4 English' },
    { id: 'nf3', label: '1.Nf3 Réti' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="openings"
        title="Opening Trainer"
        subtitle="Learn 30 essential opening lines that take you into the middlegame"
      />

      {!selectedOpening ? (
        <>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                    : 'bg-zen-800/40 text-zen-400 border border-zen-700/30 hover:border-zen-600/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Opening list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOpenings.map(opening => (
              <div key={opening.id} className="glass-card p-4 hover:border-zen-600/50 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-zen-200 font-medium">{opening.name}</h3>
                    <p className="text-zen-500 text-sm">{opening.variation}</p>
                  </div>
                  <span className="text-xs text-zen-600 font-mono">{opening.eco}</span>
                </div>
                
                <p className="text-zen-400 text-xs mb-3 line-clamp-2">
                  {opening.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-gold-400/70 text-xs">
                    {'★'.repeat(opening.difficulty)}{'☆'.repeat(5 - opening.difficulty)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startOpening(opening, 'white')}
                      className="text-xs px-3 py-1 rounded bg-zen-800/60 text-zen-300 hover:bg-zen-700/60"
                    >
                      Play White
                    </button>
                    <button
                      onClick={() => startOpening(opening, 'black')}
                      className="text-xs px-3 py-1 rounded bg-zen-800/60 text-zen-300 hover:bg-zen-700/60"
                    >
                      Play Black
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Practice view */
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Board */}
          <div className="relative">
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              onPieceDrop={onDrop}
              boardOrientation={userColor}
              customSquareStyles={customSquareStyles}
              customArrows={customArrows}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              animationDuration={200}
              arePiecesDraggable={isUserTurn && feedback !== 'complete'}
              boardWidth={480}
            />
            
            {/* Correct Move Feedback */}
            {feedback === 'correct' && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-bounce-in" 
                   style={{ background: 'rgba(34, 197, 94, 0.9)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}>
                <span className="text-white font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Correct!
                </span>
              </div>
            )}

            {/* Feedback */}
            {feedback === 'complete' && (
              <div className="mt-4 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
                <p className="text-emerald-400 font-serif">✓ Line Complete!</p>
                <p className="text-zen-500 text-sm mt-1">You've reached the middlegame position.</p>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {/* Opening info */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-serif text-zen-200">{selectedOpening.name}</h3>
                <span className="text-xs text-zen-600 font-mono">{selectedOpening.eco}</span>
              </div>
              <p className="text-zen-400 text-sm mb-3">{selectedOpening.variation}</p>
              <p className="text-zen-500 text-xs">{selectedOpening.description}</p>
            </div>

            {/* Progress */}
            <div className="glass-card p-5">
              <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Progress</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-zen-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-500 transition-all"
                    style={{ width: `${(currentMoveIndex / selectedOpening.moves.length) * 100}%` }}
                  />
                </div>
                <span className="text-zen-400 text-sm font-mono">
                  {currentMoveIndex}/{selectedOpening.moves.length}
                </span>
              </div>

              {/* Move list */}
              <div className="mt-3 p-3 bg-zen-900/50 rounded-lg">
                <div className="flex flex-wrap gap-1 text-xs font-mono">
                  {selectedOpening.moves.map((move, i) => (
                    <span key={i} className="flex items-center">
                      {i % 2 === 0 && (
                        <span className="text-zen-600 mr-0.5">{Math.floor(i / 2) + 1}.</span>
                      )}
                      <span className={`px-1 rounded ${
                        i < currentMoveIndex 
                          ? 'text-emerald-400' 
                          : i === currentMoveIndex 
                            ? 'text-gold-400 bg-gold-500/20' 
                            : 'text-zen-600'
                      }`}>
                        {i < currentMoveIndex || showHint ? move : '???'}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key ideas */}
            <div className="glass-card p-5">
              <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Key Ideas</h4>
              <ul className="space-y-2">
                {selectedOpening.keyIdeas.map((idea, i) => (
                  <li key={i} className="text-zen-400 text-sm flex items-start gap-2">
                    <span className="text-gold-500/60">•</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedOpening(null)}
                className="zen-button-ghost flex-1"
              >
                ← Back
              </button>
              <button
                onClick={getHint}
                className="zen-button flex-1"
                disabled={showHint || feedback === 'complete'}
              >
                Hint
              </button>
              <button
                onClick={resetLine}
                className="zen-button flex-1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpeningTrainer;

