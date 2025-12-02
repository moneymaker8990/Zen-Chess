import { Chessboard } from 'react-chessboard';
import { useProgressStore } from '@/state/useStore';
import { useStudyStore, useNotesStore, useWeaknessStore } from '@/state/notesStore';
import { useMistakeLibraryStore, usePositionSparringStore } from '@/state/trainingStore';
import { useBoardSettingsStore, useBoardStyles } from '@/state/boardSettingsStore';
import { BOARD_THEMES, PIECE_STYLES, MOVE_HINT_STYLES } from '@/lib/constants';
import type { BoardTheme, PieceStyle, MoveHintStyle } from '@/lib/constants';

export function SettingsPage() {
  const { progress, updateSettings } = useProgressStore();
  const { sessions, notes } = { sessions: useStudyStore((s) => s.sessions), notes: useNotesStore((s) => s.notes) };
  const weaknesses = useWeaknessStore((s) => s.weaknesses);
  const mistakes = useMistakeLibraryStore((s) => s.mistakes);
  const sparringPositions = usePositionSparringStore((s) => s.positions);
  const { settings } = progress;
  
  // Board settings
  const { 
    settings: boardSettings, 
    setTheme, 
    setPieceStyle, 
    setMoveHintStyle,
    setShowCoordinates 
  } = useBoardSettingsStore();
  const boardStyles = useBoardStyles();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif text-zen-100">Settings</h1>
        <p className="text-zen-500 text-sm">
          Customize your experience
        </p>
      </div>

      {/* Game settings */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">Game Settings</h2>
        
        <div className="space-y-6">
          {/* Engine strength */}
          <div>
            <label className="block text-zen-400 text-sm mb-2">
              Engine Strength: {settings.engineStrength}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={settings.engineStrength}
              onChange={(e) => updateSettings({ engineStrength: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zen-600 mt-1">
              <span>Beginner</span>
              <span>Master</span>
            </div>
          </div>

          {/* Calm play delay */}
          <div>
            <label className="block text-zen-400 text-sm mb-2">
              Calm Play Delay: {settings.calmPlayDelay}s
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={settings.calmPlayDelay}
              onChange={(e) => updateSettings({ calmPlayDelay: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zen-600 mt-1">
              <span>2 seconds</span>
              <span>10 seconds</span>
            </div>
          </div>

          {/* Auto analysis */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Auto Analysis</div>
              <div className="text-zen-600 text-sm">Analyze positions automatically in analysis mode</div>
            </div>
            <button
              onClick={() => updateSettings({ autoAnalysis: !settings.autoAnalysis })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.autoAnalysis ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.autoAnalysis ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Sound Effects</div>
              <div className="text-zen-600 text-sm">Play sounds for moves and notifications</div>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Board Appearance */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">♟️ Board Appearance</h2>
        
        <div className="space-y-6">
          {/* Board Preview */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
              <Chessboard
                position="r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4"
                boardWidth={192}
                arePiecesDraggable={false}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                showBoardNotation={boardSettings.showCoordinates}
              />
            </div>
          </div>

          {/* Board Color Theme */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Board Color Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.entries(BOARD_THEMES) as [BoardTheme, typeof BOARD_THEMES[BoardTheme]][]).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`p-2 rounded-lg transition-all ${
                    boardSettings.theme === key 
                      ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-zen-900' 
                      : 'hover:scale-105'
                  }`}
                >
                  <div className="flex gap-0.5 mb-1">
                    <div 
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: theme.light }}
                    />
                    <div 
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: theme.dark }}
                    />
                  </div>
                  <div className="text-xs text-zen-400 truncate">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Piece Style */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Piece Style</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {(Object.entries(PIECE_STYLES).slice(0, 12) as [PieceStyle, typeof PIECE_STYLES[PieceStyle]][]).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setPieceStyle(key)}
                  className={`p-2 rounded-lg transition-all text-left ${
                    boardSettings.pieceStyle === key 
                      ? 'bg-gold-500/20 border border-gold-500/50' 
                      : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
                  }`}
                >
                  <div className="text-xs font-medium text-zen-300">{style.name}</div>
                </button>
              ))}
            </div>
            <p className="text-zen-600 text-xs mt-2">
              Currently using: <span className="text-zen-400">{PIECE_STYLES[boardSettings.pieceStyle].name}</span>
            </p>
          </div>

          {/* Move Hints */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Move Hints Style</label>
            <div className="flex gap-2">
              {(Object.entries(MOVE_HINT_STYLES) as [MoveHintStyle, typeof MOVE_HINT_STYLES[MoveHintStyle]][]).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setMoveHintStyle(key)}
                  className={`flex-1 p-3 rounded-lg transition-all ${
                    boardSettings.moveHintStyle === key 
                      ? 'bg-gold-500/20 border border-gold-500/50' 
                      : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
                  }`}
                >
                  <div className="text-sm font-medium text-zen-300">{style.name}</div>
                  <div className="text-xs text-zen-500 mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Board Coordinates */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Show Coordinates</div>
              <div className="text-zen-600 text-sm">Display a-h and 1-8 on the board</div>
            </div>
            <button
              onClick={() => setShowCoordinates(!boardSettings.showCoordinates)}
              className={`w-12 h-6 rounded-full transition-colors ${
                boardSettings.showCoordinates ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                boardSettings.showCoordinates ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Progress section */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">Progress</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-gold-400">{progress.currentDay}</div>
            <div className="text-zen-500 text-sm">Current Day</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-emerald-400">{progress.completedDays.length}</div>
            <div className="text-zen-500 text-sm">Days Completed</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-blue-400">{progress.puzzlesSolved}</div>
            <div className="text-zen-500 text-sm">Puzzles Solved</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-violet-400">{progress.meditationMinutes}</div>
            <div className="text-zen-500 text-sm">Minutes Meditated</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              if (confirm('Reset progress to Day 1? This cannot be undone.')) {
                useProgressStore.setState({
                  progress: {
                    ...progress,
                    currentDay: 1,
                    completedDays: [],
                    streakDays: 0,
                  }
                });
              }
            }}
            className="zen-button text-sm"
          >
            Reset Progress
          </button>
          <button
            onClick={() => {
              if (confirm('Clear all data including puzzles and meditation? This cannot be undone.')) {
                localStorage.removeItem('zen-chess-progress');
                window.location.reload();
              }
            }}
            className="zen-button text-sm text-red-400 border-red-500/30 hover:border-red-500/50"
          >
            Clear All Data
          </button>
        </div>
      </section>

      {/* Data Storage Info */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-4">📦 Your Data</h2>
        <p className="text-zen-500 text-sm mb-4">
          All your data is stored locally in your browser. No account or database needed!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{sessions.length}</div>
            <div className="text-zen-600 text-xs">Study Sessions</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{notes.length}</div>
            <div className="text-zen-600 text-xs">Notes</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{mistakes.length}</div>
            <div className="text-zen-600 text-xs">Mistakes</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{weaknesses.length}</div>
            <div className="text-zen-600 text-xs">Weaknesses</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{sparringPositions.length}</div>
            <div className="text-zen-600 text-xs">Spar Positions</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{progress.streakDays}</div>
            <div className="text-zen-600 text-xs">Day Streak</div>
          </div>
        </div>

        <div className="text-xs text-zen-600 space-y-1">
          <p>⚠️ Data is stored in your browser's localStorage.</p>
          <p>• Clearing browser data will erase your progress</p>
          <p>• Using incognito/private mode won't save data</p>
          <p>• Data is specific to this browser on this device</p>
        </div>
      </section>

      {/* About section */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-4">About</h2>
        <p className="text-zen-400 text-sm leading-relaxed">
          Zen and the Art of Chess is a 365-day journey combining spiritual wisdom, 
          chess mastery, and psychological insight. Each day brings a new teaching, 
          meditation, and chess exercise designed to develop both your game and your mind.
        </p>
        <p className="text-zen-500 text-sm mt-4 italic">
          "The chess board is the world, the pieces are the phenomena of the Universe, 
          the rules of the game are what we call the laws of Nature."
          <br />
          — Thomas Huxley
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;



