import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { BackButton } from '@/components/BackButton';
import { stockfish } from '@/engine/stockfish';
import { getLegendMove, getLegendGames } from '@/engine/legendEngine';
import {
  createGuessSessionFromGame,
  scoreGuessMove,
  generateSessionSummary,
  generateStudyNote,
} from '@/engine/guessTheMove';
import { LEGEND_STYLES, type GuessMoveResult, type LegendId } from '@/lib/legendTypes';
import { useNotesStore, useStudyStore, useLegendGameReviewStore } from '@/state/notesStore';
import type { BotLevel } from '@/engine/humanizedStockfish';

type Tab = 'play' | 'guess';

export function LegendDetailPage() {
  const { legendId } = useParams<{ legendId: string }>();
  const navigate = useNavigate();
  const boardStyles = useBoardStyles();
  const { addNote } = useNotesStore();
  const { recordGamePlayed, recordPuzzleSolved } = useStudyStore();
  const { markGameReviewed, isGameReviewed, getGameReview, getLegendStats } = useLegendGameReviewStore();
  
  const legend = legendId as LegendId;
  const legendData = legend ? LEGEND_STYLES[legend] : null;

  const [activeTab, setActiveTab] = useState<Tab>('play');
  const [engineReady, setEngineReady] = useState(false);

  // Play vs Legend state
  const [game, setGame] = useState(new Chess());
  const [isThinking, setIsThinking] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  // Legends play at their authentic historical strength - maximum strength
  // Using 'coach' (max strength) for fallback positions (when not in their game database)
  const botLevel: BotLevel = 'coach';
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});

  // Guess the Move state
  const [availableGames, setAvailableGames] = useState<any[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [guessSession, setGuessSession] = useState<{
    game: any;
    positions: Array<{ fen: string; move: string; moveNumber: number }>;
  } | null>(null);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [guessResults, setGuessResults] = useState<GuessMoveResult[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionSummary, setSessionSummary] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<GuessMoveResult | null>(null);

  // Initialize engine
  useEffect(() => {
    stockfish.init().then((ready) => {
      setEngineReady(ready);
    });
  }, []);

  // Track game completion for Play vs Legend mode
  const [gameTracked, setGameTracked] = useState(false);
  useEffect(() => {
    if (activeTab === 'play' && game.isGameOver() && !gameTracked) {
      // Record the game was played
      recordGamePlayed();
      setGameTracked(true);
      console.log('[LegendDetailPage] Game vs legend completed - recorded!');
    }
  }, [game, activeTab, gameTracked, recordGamePlayed]);

  // Reset tracking when starting a new game
  useEffect(() => {
    if (game.history().length === 0) {
      setGameTracked(false);
    }
  }, [game]);

  // Load available games for Guess the Move
  useEffect(() => {
    if (legend && activeTab === 'guess') {
      getLegendGames(legend).then((games) => {
        setAvailableGames(games);
        // Don't auto-select - let user browse the game library first
      }).catch((err) => {
        console.warn('Could not load games:', err);
        setAvailableGames([]);
      });
    }
  }, [legend, activeTab]);

  // Start guess session when game is selected
  useEffect(() => {
    if (legend && selectedGameId && activeTab === 'guess') {
      createGuessSessionFromGame(legend, selectedGameId).then((session) => {
        if (session) {
          setGuessSession(session);
          setCurrentPositionIndex(0);
          setGuessResults([]);
          setSessionComplete(false);
          setShowFeedback(false);
        }
      });
    }
  }, [legend, selectedGameId, activeTab]);

  // Play vs Legend: Make legend move
  // Use ref to track botLevel to avoid issues (even though it's now constant)
  const botLevelRef = useRef<BotLevel>(botLevel);

  const makeLegendMove = useCallback(async (currentGame?: Chess) => {
    const gameToUse = currentGame || game;
    
    if (!engineReady || !legend || gameToUse.isGameOver() || isThinking) return;

    // Check if it's the legend's turn
    const legendColor = playerColor === 'white' ? 'b' : 'w';
    if (gameToUse.turn() !== legendColor) {
      return; // Not the legend's turn
    }

    setIsThinking(true);

    try {
      // Use ref value to avoid issues if level changes during move calculation
      const move = await getLegendMove({
        fen: gameToUse.fen(),
        moves: gameToUse.history(),
        legend,
        level: botLevelRef.current,
      });

      const from = move.slice(0, 2) as Square;
      const to = move.slice(2, 4) as Square;
      const promotion = move.length > 4 ? move[4] : undefined;

      const gameCopy = new Chess(gameToUse.fen());
      const moveResult = gameCopy.move({ from, to, promotion });

      if (moveResult) {
        setGame(gameCopy);
        setLastMove({ from, to });
      }
    } catch (err) {
      console.error('Error making legend move:', err);
    } finally {
      setIsThinking(false);
    }
  }, [engineReady, legend, game, isThinking, playerColor]);

  // Get possible moves for a square
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      // Use a subtle highlight for valid move squares
      newSquares[move.to] = {
        backgroundColor: game.get(move.to) 
          ? 'rgba(147, 112, 219, 0.5)' // Capture - more visible
          : 'rgba(147, 112, 219, 0.3)', // Regular move - subtle
      };
    });
    // Highlight the selected piece
    newSquares[square] = { backgroundColor: 'rgba(147, 112, 219, 0.5)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle square click (chess.com style)
  const onSquareClick = useCallback(
    (square: Square) => {
      if (isThinking || game.isGameOver()) return;

      // Check if it's the player's turn
      const playerColorChar = playerColor === 'white' ? 'w' : 'b';
      if (game.turn() !== playerColorChar) {
        return; // Not the player's turn
      }

      // If no piece is selected, try to select one
      if (!moveFrom) {
        const piece = game.get(square);
        if (piece && piece.color === playerColorChar) {
          setMoveFrom(square);
          getMoveOptions(square);
        }
        return;
      }

      // If clicking the same square, deselect
      if (moveFrom === square) {
        setMoveFrom(null);
        setOptionSquares({});
        return;
      }

      // Try to make a move
      const gameCopy = new Chess(game.fen());
      try {
        const move = gameCopy.move({
          from: moveFrom,
          to: square,
          promotion: 'q',
        });

        if (move) {
          setGame(gameCopy);
          setLastMove({ from: moveFrom, to: square });
          setMoveFrom(null);
          setOptionSquares({});

          // Check if it's the legend's turn after the player's move
          setTimeout(() => {
            const legendColor = playerColor === 'white' ? 'b' : 'w';
            if (!gameCopy.isGameOver() && gameCopy.turn() === legendColor) {
              makeLegendMove(gameCopy);
            }
          }, 300);
        }
      } catch {
        // Invalid move, try selecting new piece
        const piece = game.get(square);
        if (piece && piece.color === playerColorChar) {
          setMoveFrom(square);
          getMoveOptions(square);
        } else {
          setMoveFrom(null);
          setOptionSquares({});
        }
      }
    },
    [game, isThinking, moveFrom, playerColor, getMoveOptions, makeLegendMove]
  );

  // Play vs Legend: Handle player move (drag and drop)
  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      if (isThinking || game.isGameOver()) return false;

      // Check if it's the player's turn
      const playerColorChar = playerColor === 'white' ? 'w' : 'b';
      if (game.turn() !== playerColorChar) {
        return false; // Not the player's turn
      }

      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        setGame(gameCopy);
        setLastMove({ from: sourceSquare, to: targetSquare });
        setMoveFrom(null);
        setOptionSquares({});

        // Check if it's the legend's turn after the player's move
        setTimeout(() => {
          const legendColor = playerColor === 'white' ? 'b' : 'w';
          if (!gameCopy.isGameOver() && gameCopy.turn() === legendColor) {
            makeLegendMove(gameCopy);
          }
        }, 300);
        return true;
      }
      return false;
    },
    [game, isThinking, makeLegendMove, playerColor]
  );

  // Start new game
  const resetGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setLastMove(null);
    if (playerColor === 'black') {
      setTimeout(() => makeLegendMove(newGame), 500);
    }
  }, [playerColor, makeLegendMove]);

  // Guess the Move: Handle user move
  const handleGuessMove = useCallback(
    async (sourceSquare: Square, targetSquare: Square) => {
      if (!guessSession || showFeedback) return false;

      const currentPos = guessSession.positions[currentPositionIndex];
      if (!currentPos) return false;

      const userMove = `${sourceSquare}${targetSquare}`;
      const legendMove = currentPos.move;

      // Score the guess
      const result = await scoreGuessMove({
        fen: currentPos.fen,
        userMove,
        legendMove,
      });

      setCurrentFeedback(result);
      setShowFeedback(true);
      setGuessResults((prev) => [...prev, result]);

      return true;
    },
    [guessSession, currentPositionIndex, showFeedback]
  );

  // Continue to next position
  const continueGuess = useCallback(() => {
    if (!guessSession) return;

    const nextIndex = currentPositionIndex + 1;
    if (nextIndex >= guessSession.positions.length) {
      // Session complete
      const summary = generateSessionSummary(legend!, selectedGameId!, guessResults);
      setSessionSummary(summary);
      setSessionComplete(true);

      // Track the completed session (counts as a puzzle/study session)
      recordPuzzleSolved();
      console.log('[LegendDetailPage] Guess-the-Move session completed - recorded!');

      // Mark this game as reviewed
      markGameReviewed({
        legendId: legend!,
        gameId: selectedGameId!,
        score: summary.totalScore,
        movesGuessed: guessResults.length,
        totalMoves: guessSession.positions.length,
        weaknessTags: summary.detectedWeaknessTags,
      });
      console.log('[LegendDetailPage] Game marked as reviewed:', selectedGameId);

      // Save to notes
      const noteText = generateStudyNote(summary);
      addNote({
        title: `Guess-the-Move: ${legendData?.name} - Game ${selectedGameId}`,
        content: noteText,
        category: 'STUDY_SESSION',
        importance: 3,
        tags: summary.detectedWeaknessTags,
        needsReview: false,
      });
    } else {
      setCurrentPositionIndex(nextIndex);
      setShowFeedback(false);
      setCurrentFeedback(null);
    }
  }, [guessSession, currentPositionIndex, legend, selectedGameId, guessResults, legendData, addNote]);

  // Start new guess session
  const startNewGuess = useCallback(() => {
    setCurrentPositionIndex(0);
    setGuessResults([]);
    setSessionComplete(false);
    setSessionSummary(null);
    setShowFeedback(false);
    setCurrentFeedback(null);
  }, []);

  if (!legend || !legendData) {
    return (
      <div className="text-center py-12">
        <p className="text-zen-400">Legend not found</p>
        <button onClick={() => navigate('/greats')} className="zen-button-primary mt-4">
          Back to Greats
        </button>
      </div>
    );
  }

  const currentPosition = guessSession?.positions[currentPositionIndex];
  const guessChess = currentPosition ? new Chess(currentPosition.fen) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-4">
            <BackButton fallback="/greats" label="Back to Greats" className="text-zen-400 hover:text-zen-200" />
          </div>
          <h1 className="text-3xl font-serif text-zen-100">{legendData.name}</h1>
          <p className="text-gold-400 font-serif italic mt-1">{legendData.tagline}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zen-800/50">
        <button
          onClick={() => setActiveTab('play')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'play'
              ? 'text-gold-400 border-b-2 border-gold-400'
              : 'text-zen-400 hover:text-zen-200'
          }`}
        >
          Play vs {legendData.name}
        </button>
        <button
          onClick={() => setActiveTab('guess')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'guess'
              ? 'text-gold-400 border-b-2 border-gold-400'
              : 'text-zen-400 hover:text-zen-200'
          }`}
        >
          Guess the Move
        </button>
      </div>

      {/* Play vs Legend Tab */}
      {activeTab === 'play' && (
        <div className="space-y-8">
          {/* Game Area - Board and Controls */}
          <div className="grid lg:grid-cols-[1fr,360px] gap-8 items-start">
            {/* Chessboard */}
            <div className="glass-card p-6">
              <div className="w-full max-w-[520px] mx-auto">
                <Chessboard
                  position={game.fen()}
                  onSquareClick={onSquareClick}
                  onPieceDrop={onDrop}
                  boardOrientation={playerColor}
                  customSquareStyles={{
                    ...optionSquares,
                    ...(lastMove && {
                      [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.3)' },
                      [lastMove.to]: { backgroundColor: 'rgba(147, 112, 219, 0.4)' },
                    }),
                  }}
                  customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                  customLightSquareStyle={boardStyles.customLightSquareStyle}
                  animationDuration={200}
                  arePiecesDraggable={!isThinking}
                />
              </div>

              {game.isGameOver() && (
                <div className="mt-6 p-4 bg-zen-800/60 rounded-lg text-center">
                  <p className="text-lg font-medium text-zen-100">
                    {game.isCheckmate()
                      ? `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins`
                      : game.isDraw()
                      ? 'Draw'
                      : 'Game Over'}
                  </p>
                </div>
              )}

              {isThinking && (
                <div className="mt-6 text-center text-zen-400">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
                    {legendData.name} is thinking...
                  </span>
                </div>
              )}
            </div>

            {/* Game Controls - Compact sidebar */}
            <div className="space-y-4">
              <div className="glass-card p-5">
                <h3 className="text-base font-medium text-zen-100 mb-3">Game Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-zen-500 text-xs uppercase tracking-wider mb-2 block">Play as</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setPlayerColor('white');
                          resetGame();
                        }}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                          playerColor === 'white'
                            ? 'bg-white text-zen-900 shadow-md'
                            : 'bg-zen-800/60 text-zen-400 hover:bg-zen-700/60'
                        }`}
                      >
                        ♔ White
                      </button>
                      <button
                        onClick={() => {
                          setPlayerColor('black');
                          resetGame();
                        }}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                          playerColor === 'black'
                            ? 'bg-zen-900 text-white border border-zen-600 shadow-md'
                            : 'bg-zen-800/60 text-zen-400 hover:bg-zen-700/60'
                        }`}
                      >
                        ♚ Black
                      </button>
                    </div>
                  </div>

                  <button onClick={resetGame} className="zen-button-primary w-full">
                    New Game
                  </button>
                </div>
              </div>

              {/* Quick style tags */}
              <div className="glass-card p-5">
                <h3 className="text-base font-medium text-zen-100 mb-3">Playing Style</h3>
                <div className="flex flex-wrap gap-2">
                  {legendData.styleTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Legend Biography Section */}
          <div className="glass-card p-8 overflow-hidden">
            <div className="flex items-start gap-8">
              {/* Left column - key info */}
              <div className="w-72 flex-shrink-0 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-zen-100 mb-1">{legendData.bio.fullName}</h2>
                  <p className="text-gold-400 italic">{legendData.bio.nationality}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-zen-500 block text-xs uppercase tracking-wider mb-1">Born</span>
                    <span className="text-zen-300">{legendData.bio.born}</span>
                  </div>
                  {legendData.bio.died && (
                    <div>
                      <span className="text-zen-500 block text-xs uppercase tracking-wider mb-1">Died</span>
                      <span className="text-zen-300">{legendData.bio.died}</span>
                    </div>
                  )}
                  {legendData.bio.worldChampion && (
                    <div>
                      <span className="text-zen-500 block text-xs uppercase tracking-wider mb-1">World Champion</span>
                      <span className="text-gold-400 font-medium">{legendData.bio.worldChampion}</span>
                    </div>
                  )}
                  {legendData.bio.peakRating && (
                    <div>
                      <span className="text-zen-500 block text-xs uppercase tracking-wider mb-1">Peak Rating</span>
                      <span className="text-zen-200 font-mono">{legendData.bio.peakRating}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-zen-500 block text-xs uppercase tracking-wider mb-2">Titles</span>
                  <div className="flex flex-wrap gap-1.5">
                    {legendData.bio.titles.map((title) => (
                      <span key={title} className="text-xs px-2 py-1 rounded bg-zen-800/80 text-zen-300">
                        {title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - biography and details */}
              <div className="flex-1 min-w-0 space-y-8">
                {/* Biography */}
                <div>
                  <h3 className="text-lg font-medium text-zen-100 mb-3 flex items-center gap-2">
                    <span className="text-gold-400">◈</span> Biography
                  </h3>
                  <p className="text-zen-400 leading-relaxed">{legendData.bio.biography}</p>
                </div>

                {/* Playing Style */}
                <div>
                  <h3 className="text-lg font-medium text-zen-100 mb-3 flex items-center gap-2">
                    <span className="text-gold-400">◈</span> Playing Style
                  </h3>
                  <p className="text-zen-400 leading-relaxed">{legendData.bio.playingStyle}</p>
                </div>

                {/* What Makes Them Great */}
                <div>
                  <h3 className="text-lg font-medium text-zen-100 mb-3 flex items-center gap-2">
                    <span className="text-gold-400">◈</span> What Makes {legendData.name.split(' ')[0]} Great
                  </h3>
                  <ul className="space-y-2">
                    {legendData.bio.whatMakesThemGreat.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-zen-400">
                        <span className="text-gold-500 mt-1.5 text-xs">●</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Famous Games */}
                <div>
                  <h3 className="text-lg font-medium text-zen-100 mb-3 flex items-center gap-2">
                    <span className="text-gold-400">◈</span> Famous Games to Study
                  </h3>
                  <ul className="space-y-2">
                    {legendData.bio.famousGames.map((game, i) => (
                      <li key={i} className="flex items-start gap-3 text-zen-400">
                        <span className="text-gold-500/60 font-mono text-sm">{i + 1}.</span>
                        <span>{game}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Famous Quotes */}
                {legendData.bio.famousQuotes && legendData.bio.famousQuotes.length > 0 && (
                  <div className="border-l-2 border-gold-500/30 pl-6 space-y-4">
                    <h3 className="text-lg font-medium text-zen-100 mb-3">Notable Quotes</h3>
                    {legendData.bio.famousQuotes.map((quote, i) => (
                      <blockquote key={i} className="text-zen-400 italic">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                )}

                {/* Legacy */}
                <div className="pt-4 border-t border-zen-800/50">
                  <h3 className="text-lg font-medium text-zen-100 mb-3 flex items-center gap-2">
                    <span className="text-gold-400">◈</span> Legacy
                  </h3>
                  <p className="text-zen-400 leading-relaxed">{legendData.bio.legacy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guess the Move Tab */}
      {activeTab === 'guess' && (
        <div className="space-y-6">
          {!guessSession ? (
            <GameSelector
              legend={legend}
              legendName={legendData?.name || ''}
              games={availableGames}
              onSelectGame={(gameId) => setSelectedGameId(gameId)}
              isGameReviewed={isGameReviewed}
              getGameReview={getGameReview}
              legendStats={getLegendStats(legend)}
            />
          ) : sessionComplete ? (
            <div className="glass-card p-8 text-center">
              <h2 className="text-2xl font-serif text-zen-100 mb-4">Session Complete!</h2>
              {sessionSummary && (
                <div className="space-y-4">
                  <div className="text-4xl font-mono text-gold-400">
                    {sessionSummary.totalScore}/100
                  </div>
                  <p className="text-zen-400">
                    You guessed {guessResults.filter((r) => r.isExact).length} out of{' '}
                    {guessResults.length} moves correctly.
                  </p>
                  {sessionSummary.detectedWeaknessTags.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-zen-100 mb-2">
                        Detected Weaknesses
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {sessionSummary.detectedWeaknessTags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400"
                          >
                            {tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={startNewGuess} className="zen-button-primary mt-6">
                    Start New Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="mb-4">
                  {guessChess && (
                    <Chessboard
                      position={guessChess.fen()}
                      onPieceDrop={(source, target) => {
                        handleGuessMove(source, target);
                        return true;
                      }}
                      boardOrientation="white"
                    />
                  )}
                </div>
                {currentPosition && (
                  <div className="text-center text-zen-400 text-sm mt-4">
                    Move {currentPosition.moveNumber} - Try to find {legendData.name}'s move
                  </div>
                )}
                <div className="text-center text-zen-400 text-xs mt-2">
                  Position {currentPositionIndex + 1} of {guessSession.positions.length}
                </div>
              </div>

              <div className="space-y-4">
                {showFeedback && currentFeedback && (
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-medium text-zen-100 mb-4">Feedback</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-mono text-gold-400 mb-2">
                          {currentFeedback.score}/100
                        </div>
                        <p className="text-zen-400">{currentFeedback.comment}</p>
                      </div>
                      <div>
                        <div className="text-zen-500 text-sm mb-2">Your move:</div>
                        <div className="font-mono text-zen-100">{currentFeedback.userMove}</div>
                      </div>
                      <div>
                        <div className="text-zen-500 text-sm mb-2">{legendData.name}'s move:</div>
                        <div className="font-mono text-zen-100">{currentFeedback.legendMove}</div>
                      </div>
                      {currentFeedback.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {currentFeedback.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-3 py-1 rounded-full ${
                                tag === 'exact' || tag === 'engine-best'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-zen-800/60 text-zen-400'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button onClick={continueGuess} className="zen-button-primary w-full mt-4">
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {!showFeedback && (
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-medium text-zen-100 mb-4">Game Info</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-zen-500">White:</span>{' '}
                        <span className="text-zen-100">{guessSession.game.white}</span>
                      </div>
                      <div>
                        <span className="text-zen-500">Black:</span>{' '}
                        <span className="text-zen-100">{guessSession.game.black}</span>
                      </div>
                      {guessSession.game.event && (
                        <div>
                          <span className="text-zen-500">Event:</span>{' '}
                          <span className="text-zen-100">{guessSession.game.event}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// GAME SELECTOR COMPONENT
// Enhanced UI for browsing thousands of games
// ============================================

function GameSelector({
  legend,
  legendName,
  games,
  onSelectGame,
  isGameReviewed,
  getGameReview,
  legendStats,
}: {
  legend: LegendId;
  legendName: string;
  games: any[];
  onSelectGame: (gameId: string) => void;
  isGameReviewed: (legendId: string, gameId: string) => boolean;
  getGameReview: (legendId: string, gameId: string) => { score: number; reviewedAt: number } | undefined;
  legendStats: { totalReviewed: number; averageScore: number; bestScore: number };
}) {
  const [filterReviewed, setFilterReviewed] = useState<'all' | 'reviewed' | 'not-reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'opponent' | 'event'>('date-asc');
  const [showCount, setShowCount] = useState(50);

  // Extract unique years from games
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    games.forEach(g => {
      if (g.date) {
        const year = g.date.split('.')[0] || g.date.split('-')[0];
        if (year && year.length === 4) yearSet.add(year);
      }
    });
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a));
  }, [games]);

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g =>
        g.white?.toLowerCase().includes(q) ||
        g.black?.toLowerCase().includes(q) ||
        g.event?.toLowerCase().includes(q) ||
        g.eco?.toLowerCase().includes(q)
      );
    }

    // Year filter
    if (filterYear !== 'all') {
      result = result.filter(g => g.date?.startsWith(filterYear));
    }

    // Result filter
    if (filterResult !== 'all') {
      result = result.filter(g => g.result === filterResult);
    }

    // Reviewed filter
    if (filterReviewed === 'reviewed') {
      result = result.filter(g => isGameReviewed(legend, g.id));
    } else if (filterReviewed === 'not-reviewed') {
      result = result.filter(g => !isGameReviewed(legend, g.id));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return (a.date || '').localeCompare(b.date || '');
        case 'date-desc':
          return (b.date || '').localeCompare(a.date || '');
        case 'opponent':
          const aOpp = a.white?.toLowerCase().includes(legend) ? a.black : a.white;
          const bOpp = b.white?.toLowerCase().includes(legend) ? b.black : b.white;
          return (aOpp || '').localeCompare(bOpp || '');
        case 'event':
          return (a.event || '').localeCompare(b.event || '');
        default:
          return 0;
      }
    });

    return result;
  }, [games, searchQuery, filterYear, filterResult, filterReviewed, sortBy, legend, isGameReviewed]);

  // Pick random game
  const selectRandomGame = () => {
    if (filteredGames.length > 0) {
      const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
      onSelectGame(randomGame.id);
    }
  };

  if (games.length === 0) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-zen-100 mb-4">No Games Available</h3>
        <div className="text-center py-8">
          <p className="text-zen-400 mb-4">
            No games found for {legendName}. The game data needs to be set up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Stats */}
      {legendStats.totalReviewed > 0 && (
        <div className="glass-card p-4 bg-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-mono text-emerald-400">{legendStats.totalReviewed}</div>
                <div className="text-xs text-zen-500">Games Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-zen-200">{legendStats.averageScore}%</div>
                <div className="text-xs text-zen-500">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-gold-400">{legendStats.bestScore}%</div>
                <div className="text-xs text-zen-500">Best Score</div>
              </div>
            </div>
            <div className="text-sm text-zen-500">
              {Math.round((legendStats.totalReviewed / games.length) * 100)}% of games studied
            </div>
          </div>
        </div>
      )}

      {/* Header with stats */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif text-zen-100">
              Guess {legendName}'s Moves
            </h3>
            <p className="text-zen-500 text-sm mt-1">
              {games.length.toLocaleString()} games available • Step through real games and try to guess the moves
            </p>
          </div>
          <button
            onClick={selectRandomGame}
            className="zen-button-primary flex items-center gap-2"
          >
            <span>🎲</span>
            Random Game
          </button>
        </div>

        {/* Search and filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search opponent, event, ECO..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 placeholder-zen-600 focus:outline-none focus:border-gold-500/50"
          />
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="all">All Results</option>
            <option value="1-0">White Wins (1-0)</option>
            <option value="0-1">Black Wins (0-1)</option>
            <option value="1/2-1/2">Draws (½-½)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="date-asc">Earliest First</option>
            <option value="date-desc">Latest First</option>
            <option value="opponent">By Opponent</option>
            <option value="event">By Event</option>
          </select>
        </div>

        {/* Second row of filters */}
        <div className="mt-3 flex items-center gap-4">
          <select
            value={filterReviewed}
            onChange={(e) => setFilterReviewed(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="all">All Games</option>
            <option value="not-reviewed">📋 Not Yet Reviewed</option>
            <option value="reviewed">✅ Already Reviewed</option>
          </select>
          
          <div className="text-sm text-zen-500">
            Showing {Math.min(showCount, filteredGames.length)} of {filteredGames.length} games
          </div>
        </div>
      </div>

      {/* Game list */}
      <div className="glass-card p-4">
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {filteredGames.slice(0, showCount).map((game, index) => {
            const isLegendWhite = game.white?.toLowerCase().includes(legend.toLowerCase());
            const opponent = isLegendWhite ? game.black : game.white;
            const legendResult = 
              (isLegendWhite && game.result === '1-0') || (!isLegendWhite && game.result === '0-1') 
                ? 'win' 
                : game.result === '1/2-1/2' 
                  ? 'draw' 
                  : 'loss';
            
            // Check if this game has been reviewed
            const reviewed = isGameReviewed(legend, game.id);
            const review = reviewed ? getGameReview(legend, game.id) : null;

            return (
              <button
                key={`${game.id}-${index}`}
                onClick={() => onSelectGame(game.id)}
                className={`w-full text-left p-4 rounded-lg transition-all group ${
                  reviewed 
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20' 
                    : 'bg-zen-800/40 hover:bg-zen-800/70'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {reviewed && (
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          ✓ {review?.score}%
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        legendResult === 'win' ? 'bg-emerald-500/20 text-emerald-400' :
                        legendResult === 'draw' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {legendResult === 'win' ? 'W' : legendResult === 'draw' ? 'D' : 'L'}
                      </span>
                      <span className="font-medium text-zen-100 group-hover:text-gold-400 transition-colors">
                        vs {opponent || 'Unknown'}
                      </span>
                      <span className="text-zen-600 text-sm">
                        ({isLegendWhite ? 'White' : 'Black'})
                      </span>
                    </div>
                    <div className="text-sm text-zen-500 mt-1 flex flex-wrap gap-x-3">
                      {game.event && <span>{game.event}</span>}
                      {game.date && <span>{game.date}</span>}
                      {game.eco && (
                        <span className="text-zen-600">{game.eco}</span>
                      )}
                      {reviewed && review && (
                        <span className="text-emerald-500/70 text-xs">
                          Reviewed {new Date(review.reviewedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-zen-600 group-hover:text-zen-400 transition-colors">
                    {reviewed ? '↻' : '→'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredGames.length > showCount && (
          <button
            onClick={() => setShowCount(prev => prev + 50)}
            className="w-full mt-4 py-2 text-center text-zen-500 hover:text-zen-300 transition-colors"
          >
            Load more games ({filteredGames.length - showCount} remaining)
          </button>
        )}
      </div>

      {/* Quick tips */}
      <div className="glass-card p-4 bg-gold-500/5 border-gold-500/20">
        <h4 className="text-sm font-medium text-gold-400 mb-2">💡 Tips</h4>
        <ul className="text-sm text-zen-400 space-y-1">
          <li>• Click "Random Game" for a surprise challenge</li>
          <li>• Filter by year to study specific periods of {legendName}'s career</li>
          <li>• Look for games against famous opponents for extra challenge</li>
          <li>• ECO codes indicate the opening played (e.g., B90 = Sicilian Najdorf)</li>
        </ul>
      </div>
    </div>
  );
}

export default LegendDetailPage;

