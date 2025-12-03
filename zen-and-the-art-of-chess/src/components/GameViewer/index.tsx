import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import type { InstructiveGame, AnnotatedMove } from '@/data/instructiveGames/types';
import { 
  fetchLegendGames, 
  findLegendGame, 
  parsePgnToMoves, 
  getPlayerLegendId,
  LEGEND_IDS 
} from '@/lib/pgnParser';

interface GameViewerProps {
  game: InstructiveGame;
  onBack?: () => void;
}

export function GameViewer({ game, onBack }: GameViewerProps) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1); // -1 = starting position
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(2000);
  const [loadedMoves, setLoadedMoves] = useState<AnnotatedMove[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFromLegend, setLoadedFromLegend] = useState<string | null>(null);
  const boardStyles = useBoardStyles();
  const boardSize = useBoardSize(480, 32);
  
  // Use loaded moves if game has no moves
  const effectiveMoves = game.moves.length > 0 ? game.moves : loadedMoves;
  
  // Try to load moves from legend data if game has no moves
  useEffect(() => {
    if (game.moves.length > 0) return;
    
    async function loadFromLegends() {
      setIsLoading(true);
      
      // Determine which legend to try based on player names
      const whiteLegend = getPlayerLegendId(game.white);
      const blackLegend = getPlayerLegendId(game.black);
      
      const legendsToTry = new Set<string>();
      if (whiteLegend) legendsToTry.add(whiteLegend);
      if (blackLegend) legendsToTry.add(blackLegend);
      
      // If no specific legends found, try all of them
      if (legendsToTry.size === 0) {
        LEGEND_IDS.forEach(id => legendsToTry.add(id));
      }
      
      for (const legendId of legendsToTry) {
        try {
          const games = await fetchLegendGames(legendId);
          const match = findLegendGame(games, game.white, game.black, game.year);
          
          if (match) {
            const moves = parsePgnToMoves(match.pgn);
            if (moves.length > 0) {
              setLoadedMoves(moves);
              setLoadedFromLegend(legendId);
              setIsLoading(false);
              return;
            }
          }
        } catch (error) {
          console.warn(`Failed to load from ${legendId}:`, error);
        }
      }
      
      setIsLoading(false);
    }
    
    loadFromLegends();
  }, [game.id, game.white, game.black, game.year, game.moves.length]);
  
  const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  const getCurrentFen = () => {
    if (currentMoveIndex === -1 || effectiveMoves.length === 0) {
      return startingFen;
    }
    return effectiveMoves[currentMoveIndex]?.fen || startingFen;
  };
  
  const getCurrentMove = (): AnnotatedMove | null => {
    if (currentMoveIndex === -1 || !effectiveMoves[currentMoveIndex]) {
      return null;
    }
    return effectiveMoves[currentMoveIndex];
  };

  // Navigation
  const goToStart = () => setCurrentMoveIndex(-1);
  const goToEnd = () => setCurrentMoveIndex(effectiveMoves.length - 1);
  const goForward = () => {
    if (currentMoveIndex < effectiveMoves.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
    }
  };
  const goBack = () => {
    if (currentMoveIndex >= 0) {
      setCurrentMoveIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goBack();
          break;
        case 'ArrowRight':
          goForward();
          break;
        case 'ArrowUp':
          goToStart();
          break;
        case 'ArrowDown':
          goToEnd();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMoveIndex, effectiveMoves.length]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentMoveIndex >= effectiveMoves.length - 1) {
      setIsAutoPlaying(false);
      return;
    }

    const timer = setTimeout(goForward, autoPlaySpeed);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentMoveIndex, autoPlaySpeed, effectiveMoves.length]);

  const currentMove = getCurrentMove();

  // Get move number and color
  const getMoveLabel = (index: number) => {
    const moveNumber = Math.floor(index / 2) + 1;
    const isWhite = index % 2 === 0;
    return `${moveNumber}${isWhite ? '.' : '...'}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-zen-500 hover:text-zen-300 text-sm mb-2 flex items-center gap-1"
          >
            ← Back to Games
          </button>
          <h1 className="text-2xl font-serif text-zen-100">{game.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-zen-500">
            <span>{game.white} vs {game.black}</span>
            <span>•</span>
            <span>{game.event}, {game.year}</span>
            <span>•</span>
            <span className="text-gold-400">{game.result}</span>
          </div>
        </div>
        <span className="text-xs text-zen-600 font-mono">{game.eco}</span>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-4 lg:gap-6 px-2 sm:px-0">
        {/* Board and controls */}
        <div className="space-y-4 flex flex-col items-center lg:items-start">
          <Chessboard
            position={getCurrentFen()}
            boardOrientation="white"
            customDarkSquareStyle={boardStyles.customDarkSquareStyle}
            customLightSquareStyle={boardStyles.customLightSquareStyle}
            arePiecesDraggable={false}
            boardWidth={boardSize}
          />

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-2">
            <button onClick={goToStart} className="zen-button px-3 py-2" title="Go to start">⏮</button>
            <button onClick={goBack} className="zen-button px-4 py-2" title="Previous move">←</button>
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)} 
              className={`zen-button px-4 py-2 ${isAutoPlaying ? 'bg-gold-500/20 text-gold-400' : ''}`}
              title="Auto-play"
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={goForward} className="zen-button px-4 py-2" title="Next move">→</button>
            <button onClick={goToEnd} className="zen-button px-3 py-2" title="Go to end">⏭</button>
          </div>

          {/* Move indicator */}
          <div className="text-center text-zen-500 text-sm">
            {isLoading ? (
              <span className="text-gold-400">Loading game moves...</span>
            ) : effectiveMoves.length === 0 ? (
              <span className="text-zen-600">No moves available for this game</span>
            ) : (
              <>
                Move {currentMoveIndex + 1} of {effectiveMoves.length}
                {currentMoveIndex >= 0 && effectiveMoves[currentMoveIndex] && (
                  <span className="ml-2 text-gold-400 font-mono">
                    {getMoveLabel(currentMoveIndex)} {effectiveMoves[currentMoveIndex].move}
                  </span>
                )}
                {loadedFromLegend && (
                  <span className="ml-2 text-emerald-500 text-xs">
                    (loaded from {loadedFromLegend} database)
                  </span>
                )}
              </>
            )}
          </div>

          {/* Speed control */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-zen-500">Speed:</span>
            {[3000, 2000, 1000, 500].map(speed => (
              <button
                key={speed}
                onClick={() => setAutoPlaySpeed(speed)}
                className={`px-2 py-1 rounded ${
                  autoPlaySpeed === speed 
                    ? 'bg-gold-500/20 text-gold-400' 
                    : 'text-zen-500 hover:text-zen-300'
                }`}
              >
                {speed === 3000 ? 'Slow' : speed === 2000 ? 'Normal' : speed === 1000 ? 'Fast' : 'Blitz'}
              </button>
            ))}
          </div>
        </div>

        {/* Commentary and move list */}
        <div className="space-y-4">
          {/* Current move commentary */}
          <div className="glass-card p-5">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Commentary</h3>
            {currentMove ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className={`text-lg font-mono ${currentMove.isKeyMove ? 'text-gold-400' : 'text-zen-300'}`}>
                    {getMoveLabel(currentMoveIndex)} {currentMove.move}
                  </span>
                  {currentMove.isKeyMove && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gold-500/20 text-gold-400">Key Move</span>
                  )}
                  {currentMove.evaluation && (
                    <span className="text-xs px-2 py-0.5 rounded bg-zen-800 text-zen-400">
                      {currentMove.evaluation}
                    </span>
                  )}
                </div>
                <p className="text-zen-300 leading-relaxed">{currentMove.comment}</p>
                
                {currentMove.alternatives && currentMove.alternatives.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-zen-700/30">
                    <p className="text-zen-500 text-xs uppercase mb-2">Alternatives considered:</p>
                    {currentMove.alternatives.map((alt, i) => (
                      <div key={i} className="text-sm text-zen-400">
                        <span className="font-mono text-zen-500">{alt.move}</span>: {alt.comment}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-zen-400 italic">Click → or press the right arrow to start viewing the game.</p>
            )}
          </div>

          {/* Move list */}
          <div className="glass-card p-5 max-h-64 overflow-y-auto">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Move List</h3>
            {isLoading ? (
              <div className="text-zen-500 text-sm">Loading moves...</div>
            ) : effectiveMoves.length === 0 ? (
              <div className="text-zen-600 text-sm italic">
                No annotated moves available for this game yet.
              </div>
            ) : (
              <div className="space-y-1 font-mono text-sm">
                {effectiveMoves.reduce<JSX.Element[]>((acc, move, i) => {
                  if (i % 2 === 0) {
                    const moveNumber = Math.floor(i / 2) + 1;
                    const whiteMove = move;
                    const blackMove = effectiveMoves[i + 1];
                    
                    acc.push(
                      <div 
                        key={i}
                        className="flex gap-2"
                      >
                        <span className="text-zen-600 w-8">{moveNumber}.</span>
                        <button
                          onClick={() => setCurrentMoveIndex(i)}
                          className={`px-1 rounded hover:bg-zen-800/50 ${
                            currentMoveIndex === i ? 'bg-gold-500/20 text-gold-400' : 
                            whiteMove.isKeyMove ? 'text-gold-400/70' : 'text-zen-300'
                          }`}
                        >
                          {whiteMove.move}
                        </button>
                        {blackMove && (
                          <button
                            onClick={() => setCurrentMoveIndex(i + 1)}
                            className={`px-1 rounded hover:bg-zen-800/50 ${
                              currentMoveIndex === i + 1 ? 'bg-gold-500/20 text-gold-400' : 
                              blackMove.isKeyMove ? 'text-gold-400/70' : 'text-zen-300'
                            }`}
                          >
                            {blackMove.move}
                          </button>
                        )}
                      </div>
                    );
                  }
                  return acc;
                }, [])}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game context */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Why instructive */}
        <div className="glass-card p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Why This Game Matters</h3>
          <p className="text-zen-300 leading-relaxed text-sm">{game.whyInstructive}</p>
        </div>

        {/* Key lessons */}
        <div className="glass-card p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Key Lessons</h3>
          <ul className="space-y-2">
            {game.keyLessons.map((lesson, i) => (
              <li key={i} className="text-zen-300 text-sm flex items-start gap-2">
                <span className="text-gold-500/60">•</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historical context */}
      {game.historicalContext && (
        <div className="glass-card-subtle p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Historical Context</h3>
          <p className="text-zen-400 leading-relaxed text-sm font-serif italic">{game.historicalContext}</p>
        </div>
      )}

      {/* Themes */}
      <div className="flex flex-wrap gap-2">
        {game.themes.map((theme, i) => (
          <span key={i} className="text-xs px-3 py-1 rounded-full bg-zen-800/60 text-zen-400">
            {theme}
          </span>
        ))}
        <span className="text-xs px-3 py-1 rounded-full bg-zen-800/60 text-zen-500">
          {game.era.charAt(0).toUpperCase() + game.era.slice(1)} Era
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-zen-800/60 text-zen-500">
          {game.opening}
        </span>
      </div>
    </div>
  );
}

export default GameViewer;

