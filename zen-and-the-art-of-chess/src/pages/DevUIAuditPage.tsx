// ============================================
// DEV UI AUDIT PAGE
// Development-only page for verifying UI consistency
// Route: /_dev/ui-audit
// ============================================

import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { BOARD_COLORS, BOARD_THEMES } from '@/lib/constants';
import { AgentNotificationCenter } from '@/components/AgentPanel';
import { AgentDrawer } from '@/components/AgentDrawer';
import { AgentsOverviewCard } from '@/components/AgentDashboard';
import { enhancedPatterns } from '@/data/positional/enhancedPatterns';
import { Button } from '@/components/ui/Button';
import type { Square } from 'chess.js';

// Sample FEN for board preview
const SAMPLE_FEN = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';

// Sample arrows for pattern preview
const SAMPLE_ARROWS: [Square, Square][] = [
  ['e4', 'e5'],
  ['c4', 'f7'],
];

export function DevUIAuditPage() {
  const boardStyles = useBoardStyles();
  const [showAgentsPanel, setShowAgentsPanel] = useState(true);

  // Get current theme values for display
  const currentThemeValues = {
    boardLight: boardStyles.customLightSquareStyle.backgroundColor,
    boardDark: boardStyles.customDarkSquareStyle.backgroundColor,
    ...BOARD_COLORS,
  };

  // Sample pattern for preview
  const samplePattern = enhancedPatterns[0];

  return (
    <div className="space-y-8 pb-20">
      {/* Theme Token Banner */}
      <div 
        className="sticky top-0 z-50 p-4 rounded-lg border"
        style={{ 
          background: 'var(--bg-elevated)',
          borderColor: 'var(--border-default)',
        }}
      >
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
          Current Theme Tokens
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          {Object.entries(currentThemeValues).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border"
                style={{ 
                  backgroundColor: value,
                  borderColor: 'var(--border-subtle)',
                }}
              />
              <div>
                <div className="font-mono" style={{ color: 'var(--text-primary)' }}>{key}</div>
                <div style={{ color: 'var(--text-muted)' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          UI Audit Dashboard
        </h1>
        <p style={{ color: 'var(--text-tertiary)' }}>
          Development-only page for verifying UI consistency across the app.
        </p>
      </div>

      {/* NEW Button Component Section */}
      <section className="card p-6" style={{ borderColor: 'var(--success)' }}>
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Button Component (NEW - Auto Contrast)
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Standard Variants
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Sizes & States
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Custom Background with Auto-Contrast Text
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button bgColor="#a855f7">Purple</Button>
              <Button bgColor="#22c55e">Green</Button>
              <Button bgColor="#3b82f6">Blue</Button>
              <Button bgColor="#ef4444">Red</Button>
              <Button bgColor="#f59e0b">Amber</Button>
              <Button bgColor="#1a1a1a">Dark</Button>
              <Button bgColor="#ffffff">Light</Button>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Text color automatically adjusts based on background luminance
            </p>
          </div>
        </div>
      </section>

      {/* Legacy Button Variants Section */}
      <section className="card p-6">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Legacy Button Variants
        </h2>
        
        <div className="space-y-6">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Primary (btn-primary, zen-button, zen-button-primary)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">btn-primary</button>
              <button className="zen-button">zen-button</button>
              <button className="zen-button-primary">zen-button-primary</button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Secondary (btn-secondary, zen-button-ghost)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary">btn-secondary</button>
              <button className="zen-button-ghost">zen-button-ghost</button>
              <button className="btn-secondary" disabled>Disabled</button>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Ghost (btn-ghost)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-ghost">btn-ghost</button>
              <button className="btn-ghost" disabled>Disabled</button>
            </div>
          </div>

          {/* Destructive - custom styled */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Destructive (needs implementation)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all"
                style={{ 
                  background: 'var(--error)',
                  color: 'white',
                }}
              >
                Destructive Action
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all opacity-50"
                style={{ 
                  background: 'var(--error)',
                  color: 'white',
                }}
                disabled
              >
                Disabled
              </button>
            </div>
          </div>

          {/* Contrast Test */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Contrast Test (various backgrounds)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['#a855f7', '#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#6b7280'].map(bg => (
                <div key={bg} className="p-4 rounded-lg" style={{ background: bg }}>
                  <button 
                    className="w-full py-2 rounded font-medium"
                    style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  >
                    Text on {bg}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Component Section */}
      <section className="card p-6">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Board Components
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Standard Board */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Standard Board (Current Theme)
            </h3>
            <div className="max-w-[280px]">
              <Chessboard
                position={SAMPLE_FEN}
                boardWidth={280}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Light: {boardStyles.customLightSquareStyle.backgroundColor}<br />
              Dark: {boardStyles.customDarkSquareStyle.backgroundColor}
            </div>
          </div>

          {/* Board with Highlights */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Board with Highlights
            </h3>
            <div className="max-w-[280px]">
              <Chessboard
                position={SAMPLE_FEN}
                boardWidth={280}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
                customSquareStyles={{
                  e4: { backgroundColor: BOARD_COLORS.lastMove },
                  e2: { backgroundColor: BOARD_COLORS.lastMove },
                  f3: { backgroundColor: BOARD_COLORS.selected },
                  d4: { backgroundColor: BOARD_COLORS.hint },
                }}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Shows: lastMove, selected, hint highlights
            </div>
          </div>

          {/* Board with Arrows */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Board with Arrows
            </h3>
            <div className="max-w-[280px]">
              <Chessboard
                position={SAMPLE_FEN}
                boardWidth={280}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
                customArrows={SAMPLE_ARROWS}
                customArrowColor="rgba(74, 222, 128, 0.8)"
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Shows: pattern-style arrows
            </div>
          </div>

          {/* Correct Move Feedback */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Correct Move Feedback
            </h3>
            <div className="max-w-[280px]">
              <Chessboard
                position={SAMPLE_FEN}
                boardWidth={280}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
                customSquareStyles={{
                  f3: { backgroundColor: BOARD_COLORS.correctMove },
                }}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Shows: correctMove highlight
            </div>
          </div>

          {/* Incorrect Move Feedback */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Incorrect Move / Check
            </h3>
            <div className="max-w-[280px]">
              <Chessboard
                position={SAMPLE_FEN}
                boardWidth={280}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
                customSquareStyles={{
                  e1: { backgroundColor: BOARD_COLORS.check },
                  d4: { backgroundColor: BOARD_COLORS.incorrectMove },
                }}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Shows: check, incorrectMove highlights
            </div>
          </div>

          {/* All Board Themes Preview */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Available Themes (mini)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(BOARD_THEMES).map(([key, theme]) => (
                <div key={key} className="text-center">
                  <div 
                    className="w-12 h-12 rounded border mx-auto mb-1 grid grid-cols-2"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div style={{ background: theme.light }} />
                    <div style={{ background: theme.dark }} />
                    <div style={{ background: theme.dark }} />
                    <div style={{ background: theme.light }} />
                  </div>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {theme.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agents Panel Section */}
      <section className="card p-6">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Agents Panel
        </h2>

        <div className="space-y-6">
          {/* New Agent Drawer (Recommended) */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Agent Drawer (NEW - Mobile BottomSheet / Desktop Side Panel)
            </h3>
            <div className="flex items-start gap-4">
              <AgentDrawer />
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Click the bell icon to open. Uses BottomSheet on mobile, side drawer on desktop.
                <br />
                <span style={{ color: 'var(--success)' }}>✓ Safe area aware</span>
                {' • '}
                <span style={{ color: 'var(--success)' }}>✓ Body scroll lock</span>
                {' • '}
                <span style={{ color: 'var(--success)' }}>✓ Viewport contained</span>
              </p>
            </div>
          </div>

          {/* Legacy Notification Center */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Agent Notification Center (Legacy Dropdown)
            </h3>
            <div className="flex items-start gap-4">
              <AgentNotificationCenter />
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Original dropdown implementation. May overflow on mobile.
              </p>
            </div>
          </div>

          {/* Agents Overview Card */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Agents Overview Card (Expandable)
            </h3>
            <div className="max-w-lg">
              <AgentsOverviewCard />
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Preview Section */}
      <section className="card p-6">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Pattern Preview Card
        </h2>

        {samplePattern && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pattern Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                  {samplePattern.title}
                </h3>
                {samplePattern.subtitle && (
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {samplePattern.subtitle}
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Introduction
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {samplePattern.introduction}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Key Ideas
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {samplePattern.keyIdeas.map((idea, i) => (
                    <li key={i} style={{ color: 'var(--text-muted)' }}>{idea}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Main Line ({samplePattern.mainLine.length} moves)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {samplePattern.mainLine.slice(0, 5).map((move, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{ 
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {move.move}{move.annotation}
                    </span>
                  ))}
                  {samplePattern.mainLine.length > 5 && (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      +{samplePattern.mainLine.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow data preview */}
              {samplePattern.mainLine[0]?.arrows && (
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    First Move Arrows
                  </h4>
                  <div className="text-xs font-mono p-2 rounded" style={{ background: 'var(--bg-tertiary)' }}>
                    {JSON.stringify(samplePattern.mainLine[0].arrows, null, 2)}
                  </div>
                </div>
              )}
            </div>

            {/* Pattern Board */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                Starting Position
              </h3>
              <div className="max-w-[320px]">
                <Chessboard
                  position={samplePattern.fen}
                  boardWidth={320}
                  customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                  customLightSquareStyle={boardStyles.customLightSquareStyle}
                  arePiecesDraggable={false}
                  boardOrientation={samplePattern.toMove}
                  customArrows={
                    samplePattern.mainLine[0]?.arrows?.map(a => [a.from as Square, a.to as Square]) || []
                  }
                  customArrowColor="rgba(74, 222, 128, 0.8)"
                  customSquareStyles={
                    samplePattern.mainLine[0]?.highlights?.reduce((acc, sq) => ({
                      ...acc,
                      [sq]: { backgroundColor: 'rgba(234, 179, 8, 0.4)' }
                    }), {}) || {}
                  }
                />
              </div>
              <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                FEN: {samplePattern.fen.substring(0, 40)}...
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CSS Variables Reference */}
      <section className="card p-6">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          CSS Variables Reference
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Background Colors */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Backgrounds
            </h3>
            <div className="space-y-2">
              {['--bg-primary', '--bg-secondary', '--bg-tertiary', '--bg-hover', '--bg-elevated'].map(v => (
                <div key={v} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border" style={{ background: `var(${v})`, borderColor: 'var(--border-subtle)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Text Colors
            </h3>
            <div className="space-y-2">
              {['--text-primary', '--text-secondary', '--text-tertiary', '--text-muted'].map(v => (
                <div key={v} className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: `var(${v})` }}>Sample Text</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Status Colors
            </h3>
            <div className="space-y-2">
              {['--success', '--warning', '--error', '--info', '--accent-primary', '--accent-secondary', '--accent-gold'].map(v => (
                <div key={v} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: `var(${v})` }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="card p-6" style={{ background: 'var(--bg-tertiary)' }}>
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          UI Regression Checklist
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>All buttons have readable text contrast</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>No boards are showing green (unless theme selected)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>Agents dropdown stays within viewport</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>Pattern arrows point to valid squares</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>Board highlights use theme tokens</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span style={{ color: 'var(--text-secondary)' }}>All boards fit within viewport on mobile</span>
          </label>
        </div>
      </section>
    </div>
  );
}

export default DevUIAuditPage;

