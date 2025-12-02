import { useState, useCallback, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { usePositionSparringStore } from '@/state/trainingStore';
import { stockfish } from '@/engine/stockfish';
import { PageHeader } from '@/components/Tutorial';
import type { SparringPosition } from '@/lib/trainingTypes';

export function PositionSparring() {
  const { positions, addPosition, recordResult, getRecommendedPositions, deletePosition } = usePositionSparringStore();
  const boardStyles = useBoardStyles();
  
  const [selectedPosition, setSelectedPosition] = useState<SparringPosition | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [game, setGame] = useState<Chess | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [gameResult, setGameResult] = useState<'WIN' | 'LOSS' | 'DRAW' | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const engineInitialized = useRef(false);
  
  const recommended = getRecommendedPositions().slice(0, 5);

  // Initialize engine
  useEffect(() => {
    if (!engineInitialized.current) {
      engineInitialized.current = true;
      stockfish.init().then((ready) => {
        setEngineReady(ready);
        if (ready) {
          stockfish.setStrength(10);
        }
      });
    }
  }, []);

  // Start sparring session
  const startSparring = useCallback((position: SparringPosition) => {
    setSelectedPosition(position);
    setGame(new Chess(position.fen));
    setIsPlaying(true);
    setGameResult(null);
    setLastMove(null);
    stockfish.setStrength(position.engineStrength);
    
    // If player is black, engine makes first move
    if (position.playerColor === 'black') {
      makeEngineMove(new Chess(position.fen));
    }
  }, []);

  // Engine move
  const makeEngineMove = useCallback((currentGame: Chess) => {
    if (!engineReady || currentGame.isGameOver()) {
      if (currentGame.isGameOver()) {
        handleGameOver(currentGame);
      }
      return;
    }

    setIsThinking(true);
    
    stockfish.playMove(currentGame.fen(), (bestMove) => {
      try {
        const from = bestMove.slice(0, 2) as Square;
        const to = bestMove.slice(2, 4) as Square;
        const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
        
        const gameCopy = new Chess(currentGame.fen());
        const move = gameCopy.move({ from, to, promotion });
        
        if (move) {
          setGame(gameCopy);
          setLastMove({ from, to });
          
          if (gameCopy.isGameOver()) {
            handleGameOver(gameCopy);
          }
        }
      } catch (e) {
        console.error('Engine move error:', e);
      } finally {
        setIsThinking(false);
      }
    });
  }, [engineReady]);

  // Handle game over
  const handleGameOver = useCallback((endGame: Chess) => {
    if (!selectedPosition) return;
    
    let result: 'WIN' | 'LOSS' | 'DRAW';
    
    if (endGame.isCheckmate()) {
      const loser = endGame.turn();
      result = loser === (selectedPosition.playerColor === 'white' ? 'w' : 'b') ? 'LOSS' : 'WIN';
    } else {
      result = 'DRAW';
    }
    
    setGameResult(result);
    setIsPlaying(false);
    
    const succeeded = 
      (selectedPosition.objective === 'WIN' && result === 'WIN') ||
      (selectedPosition.objective === 'DRAW' && (result === 'DRAW' || result === 'WIN')) ||
      (selectedPosition.objective === 'HOLD' && result !== 'LOSS');
    
    recordResult(selectedPosition.id, succeeded);
  }, [selectedPosition, recordResult]);

  // Player move
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (!game || !isPlaying || isThinking || !selectedPosition) return false;
    
    const turn = game.turn();
    const playerTurn = selectedPosition.playerColor === 'white' ? 'w' : 'b';
    if (turn !== playerTurn) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        setGame(gameCopy);
        setLastMove({ from: sourceSquare, to: targetSquare });

        if (gameCopy.isGameOver()) {
          handleGameOver(gameCopy);
        } else {
          makeEngineMove(gameCopy);
        }
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, isPlaying, isThinking, selectedPosition, handleGameOver, makeEngineMove]);

  // Reset to start
  const resetPosition = () => {
    if (selectedPosition) {
      startSparring(selectedPosition);
    }
  };

  // Custom square styles
  const customSquareStyles = lastMove ? {
    [lastMove.from]: { backgroundColor: 'rgba(251, 191, 36, 0.3)' },
    [lastMove.to]: { backgroundColor: 'rgba(251, 191, 36, 0.4)' },
  } : {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="sparring"
        title="Position Sparring"
        subtitle={`Practice specific positions repeatedly • ${positions.length} positions saved`}
      >
        <button
          onClick={() => setShowAddForm(true)}
          className="zen-button-primary"
        >
          + Add Position
        </button>
      </PageHeader>

      {/* Add position form */}
      {showAddForm && (
        <AddPositionForm
          onAdd={(pos) => {
            addPosition(pos);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Main content */}
      {!isPlaying && !selectedPosition ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recommended positions */}
          <div className="glass-card p-5">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">
              Recommended Practice
            </h3>
            {recommended.length === 0 ? (
              <p className="text-zen-500 text-sm italic">
                Add positions from your games or weaknesses to start training.
              </p>
            ) : (
              <div className="space-y-3">
                {recommended.map((pos) => (
                  <PositionCard
                    key={pos.id}
                    position={pos}
                    onStart={() => startSparring(pos)}
                    onDelete={() => deletePosition(pos.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* All positions */}
          <div className="glass-card p-5">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">
              All Positions ({positions.length})
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {positions.map((pos) => (
                <PositionCard
                  key={pos.id}
                  position={pos}
                  onStart={() => startSparring(pos)}
                  onDelete={() => deletePosition(pos.id)}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active sparring session */
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Board */}
          <div className="relative">
            {isThinking && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zen-900/60 backdrop-blur-sm rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mb-4"></div>
                  <p className="text-zen-300 font-serif italic">Engine thinking...</p>
                </div>
              </div>
            )}

            {gameResult && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-zen-900/80 backdrop-blur-sm rounded-lg">
                <div className="text-center">
                  <p className={`text-3xl font-serif mb-2 ${
                    gameResult === 'WIN' ? 'text-emerald-400' :
                    gameResult === 'LOSS' ? 'text-red-400' : 'text-gold-400'
                  }`}>
                    {gameResult === 'WIN' ? '✓ Success!' :
                     gameResult === 'LOSS' ? '✗ Try Again' : '= Draw'}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button onClick={resetPosition} className="zen-button">
                      Retry Position
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPosition(null);
                        setIsPlaying(false);
                        setGameResult(null);
                      }}
                      className="zen-button-ghost"
                    >
                      Back to List
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Chessboard
              position={game?.fen() || selectedPosition?.fen || ''}
              onPieceDrop={onDrop}
              boardOrientation={selectedPosition?.playerColor || 'white'}
              customSquareStyles={customSquareStyles}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              animationDuration={200}
              arePiecesDraggable={isPlaying && !isThinking && !gameResult}
              boardWidth={480}
            />
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-lg font-serif text-zen-200 mb-2">
                {selectedPosition?.name}
              </h3>
              <p className="text-zen-500 text-sm mb-3">
                {selectedPosition?.notes || 'No notes added'}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zen-500">Objective:</span>
                  <span className="text-gold-400">{selectedPosition?.objective}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zen-500">Playing as:</span>
                  <span className="text-zen-300 capitalize">{selectedPosition?.playerColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zen-500">Engine strength:</span>
                  <span className="text-zen-300">{selectedPosition?.engineStrength}/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zen-500">Success rate:</span>
                  <span className={selectedPosition && selectedPosition.timesPlayed > 0
                    ? (selectedPosition.timesSucceeded / selectedPosition.timesPlayed >= 0.6 
                        ? 'text-emerald-400' 
                        : 'text-red-400')
                    : 'text-zen-400'
                  }>
                    {selectedPosition && selectedPosition.timesPlayed > 0
                      ? `${Math.round((selectedPosition.timesSucceeded / selectedPosition.timesPlayed) * 100)}%`
                      : 'No data'}
                  </span>
                </div>
              </div>
            </div>

            {selectedPosition?.keyMoves && selectedPosition.keyMoves.length > 0 && (
              <div className="glass-card p-5">
                <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Key Moves</h4>
                <ul className="space-y-1 text-sm text-zen-400">
                  {selectedPosition.keyMoves.map((move, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-500/60">•</span>
                      <span>{move}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={resetPosition} className="zen-button flex-1">
                Reset
              </button>
              <button
                onClick={() => {
                  setSelectedPosition(null);
                  setIsPlaying(false);
                  setGameResult(null);
                }}
                className="zen-button-ghost flex-1"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Position Card Component
function PositionCard({
  position,
  onStart,
  onDelete,
  compact = false,
}: {
  position: SparringPosition;
  onStart: () => void;
  onDelete: () => void;
  compact?: boolean;
}) {
  const successRate = position.timesPlayed > 0
    ? Math.round((position.timesSucceeded / position.timesPlayed) * 100)
    : null;

  return (
    <div className="flex items-center gap-3 p-3 bg-zen-900/50 rounded-lg hover:bg-zen-900/70 transition-all">
      {!compact && (
        <div className="w-16 h-16 flex-shrink-0">
          <Chessboard
            position={position.fen}
            boardOrientation={position.playerColor}
            arePiecesDraggable={false}
            boardWidth={64}
            customDarkSquareStyle={{ backgroundColor: '#4a6670' }}
            customLightSquareStyle={{ backgroundColor: '#8ba4a8' }}
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-zen-200 text-sm font-medium truncate">{position.name}</p>
        <div className="flex items-center gap-2 text-xs text-zen-500">
          <span className="capitalize">{position.playerColor}</span>
          <span>•</span>
          <span>{position.objective}</span>
          {successRate !== null && (
            <>
              <span>•</span>
              <span className={successRate >= 60 ? 'text-emerald-400' : 'text-red-400'}>
                {successRate}%
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button onClick={onStart} className="zen-button text-xs px-3 py-1">
          Play
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-400 text-xs">
          ✕
        </button>
      </div>
    </div>
  );
}

// Add Position Form
function AddPositionForm({
  onAdd,
  onCancel,
}: {
  onAdd: (pos: Omit<SparringPosition, 'id' | 'timesPlayed' | 'timesSucceeded' | 'lastPlayed'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [fen, setFen] = useState('');
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [objective, setObjective] = useState<SparringPosition['objective']>('WIN');
  const [engineStrength, setEngineStrength] = useState(10);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!name || !fen) return;
    
    onAdd({
      name,
      fen,
      playerColor,
      source: 'CUSTOM',
      engineStrength,
      objective,
      notes,
      keyMoves: [],
    });
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="text-lg font-serif text-zen-200">Add Position</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zen-500 block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rook endgame practice"
            className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200"
          />
        </div>
        
        <div>
          <label className="text-sm text-zen-500 block mb-1">FEN Position</label>
          <input
            type="text"
            value={fen}
            onChange={(e) => setFen(e.target.value)}
            placeholder="Paste FEN string..."
            className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 font-mono text-sm"
          />
        </div>
      </div>

      {fen && (
        <div className="flex justify-center">
          <Chessboard
            position={fen}
            boardOrientation={playerColor}
            arePiecesDraggable={false}
            boardWidth={200}
            customDarkSquareStyle={{ backgroundColor: '#4a6670' }}
            customLightSquareStyle={{ backgroundColor: '#8ba4a8' }}
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-zen-500 block mb-1">Play as</label>
          <select
            value={playerColor}
            onChange={(e) => setPlayerColor(e.target.value as 'white' | 'black')}
            className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-zen-500 block mb-1">Objective</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value as SparringPosition['objective'])}
            className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
          >
            <option value="WIN">Win</option>
            <option value="DRAW">Draw</option>
            <option value="HOLD">Hold Position</option>
            <option value="ATTACK">Attack</option>
            <option value="DEFEND">Defend</option>
            <option value="CONVERT">Convert Advantage</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-zen-500 block mb-1">Engine Strength (0-20)</label>
          <input
            type="range"
            min="0"
            max="20"
            value={engineStrength}
            onChange={(e) => setEngineStrength(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-zen-400 text-xs text-center">{engineStrength}</p>
        </div>
      </div>

      <div>
        <label className="text-sm text-zen-500 block mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What should you remember about this position?"
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleSubmit} className="zen-button-primary flex-1">
          Add Position
        </button>
        <button onClick={onCancel} className="zen-button-ghost flex-1">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PositionSparring;

