import { Chessboard } from 'react-chessboard';
import { useBoardSettingsStore, useBoardStyles } from '@/state/boardSettingsStore';
import { BOARD_THEMES, PIECE_STYLES, MOVE_HINT_STYLES } from '@/lib/constants';
import type { BoardTheme, PieceStyle, MoveHintStyle } from '@/lib/constants';

export function BoardAppearanceSection() {
  const {
    settings: boardSettings,
    setTheme,
    setPieceStyle,
    setMoveHintStyle,
    setShowCoordinates,
  } = useBoardSettingsStore();
  const boardStyles = useBoardStyles();

  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-serif text-zen-200 mb-6">♟️ Board Appearance</h2>

      <div className="space-y-6">
        {/* Board Preview */}
        <div className="flex justify-center">
          <div className="w-48 h-48 overflow-hidden shadow-lg">
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
                <div className="text-xs text-zen-400 mt-1">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Board Coordinates */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300" id="show-coordinates-label">Show Coordinates</div>
            <div className="text-zen-600 text-sm">Display a-h and 1-8 on the board</div>
          </div>
          <button
            onClick={() => setShowCoordinates(!boardSettings.showCoordinates)}
            role="switch"
            aria-checked={boardSettings.showCoordinates}
            aria-labelledby="show-coordinates-label"
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
  );
}
