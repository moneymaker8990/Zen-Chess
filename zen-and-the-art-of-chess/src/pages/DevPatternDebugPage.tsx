// ============================================
// DEV PATTERN DEBUG PAGE
// Development-only page for debugging and authoring patterns
// Route: /_dev/patterns/:id
// ============================================

import { useState, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { Chess, type Square } from 'chess.js';
import { enhancedPatterns, type EnhancedPattern } from '@/data/positional/enhancedPatterns';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { 
  validatePatternById, 
  validateEnhancedPatterns,
  type PatternValidationResult,
  type ValidationReport,
} from '@/lib/patternValidator';

// Arrow color mapping
const ARROW_COLORS: Record<string, string> = {
  green: 'rgba(74, 222, 128, 0.8)',
  red: 'rgba(239, 68, 68, 0.8)',
  yellow: 'rgba(234, 179, 8, 0.8)',
  blue: 'rgba(59, 130, 246, 0.8)',
  primary: 'rgba(168, 85, 247, 0.8)',
};

// ============================================
// PATTERN LIST VIEW
// ============================================

function PatternListView() {
  const navigate = useNavigate();
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const runValidation = useCallback(() => {
    setIsValidating(true);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const report = validateEnhancedPatterns();
      setValidationReport(report);
      setIsValidating(false);
    }, 0);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            Pattern Debug Tool
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {enhancedPatterns.length} patterns loaded
          </p>
        </div>
        
        <button
          onClick={runValidation}
          disabled={isValidating}
          className="btn-primary"
        >
          {isValidating ? 'Validating...' : 'Run Validation'}
        </button>
      </div>
      
      {/* Validation Summary */}
      {validationReport && (
        <div 
          className="card p-4"
          style={{
            borderColor: validationReport.invalidPatterns > 0 ? 'var(--error)' : 'var(--success)',
          }}
        >
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {validationReport.totalPatterns}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                {validationReport.validPatterns}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Valid</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--error)' }}>
                {validationReport.invalidPatterns}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Invalid</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--warning)' }}>
                {validationReport.totalWarnings}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Warnings</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pattern List */}
      <div className="space-y-2">
        {enhancedPatterns.map((pattern) => {
          const result = validationReport?.results.find(r => r.patternId === pattern.id);
          const hasErrors = result && !result.valid;
          const hasWarnings = result && result.warnings.length > 0;
          
          return (
            <button
              key={pattern.id}
              onClick={() => navigate(`/_dev/patterns/${pattern.id}`)}
              className="w-full text-left card p-4 hover:border-[var(--accent-primary)] transition-all"
              style={{
                borderColor: hasErrors 
                  ? 'var(--error)' 
                  : hasWarnings 
                    ? 'var(--warning)' 
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {pattern.title}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {pattern.id} • {pattern.mainLine.length} moves • {pattern.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasErrors && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)' }}>
                      {result!.errors.length} errors
                    </span>
                  )}
                  {hasWarnings && !hasErrors && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(234, 179, 8, 0.2)', color: 'var(--warning)' }}>
                      {result!.warnings.length} warnings
                    </span>
                  )}
                  {result && result.valid && result.warnings.length === 0 && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(74, 222, 128, 0.2)', color: 'var(--success)' }}>
                      ✓ Valid
                    </span>
                  )}
                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// PATTERN DETAIL VIEW
// ============================================

function PatternDetailView({ pattern }: { pattern: EnhancedPattern }) {
  const navigate = useNavigate();
  const boardStyles = useBoardStyles();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const boardSize = useBoardSize(boardContainerRef, 400);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [validationResult, setValidationResult] = useState<PatternValidationResult | null>(null);
  
  // Build the game state up to the current move
  const gameState = useMemo(() => {
    const game = new Chess(pattern.fen);
    for (let i = 0; i <= currentMoveIndex && i < pattern.mainLine.length; i++) {
      try {
        game.move(pattern.mainLine[i].move);
      } catch {
        break;
      }
    }
    return game;
  }, [pattern, currentMoveIndex]);
  
  // Get current move data
  const currentMove = pattern.mainLine[currentMoveIndex];
  
  // Build arrows for current move
  const customArrows = useMemo(() => {
    if (!currentMove?.arrows) return [];
    return currentMove.arrows.map(a => [
      a.from as Square,
      a.to as Square,
      ARROW_COLORS[a.color || 'green'] || ARROW_COLORS.green,
    ] as [Square, Square, string]);
  }, [currentMove]);
  
  // Build highlights for current move
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, { backgroundColor: string }> = {};
    if (currentMove?.highlights) {
      currentMove.highlights.forEach(sq => {
        styles[sq] = { backgroundColor: 'rgba(234, 179, 8, 0.4)' };
      });
    }
    return styles;
  }, [currentMove]);
  
  const runValidation = useCallback(() => {
    const result = validatePatternById(pattern.id);
    setValidationResult(result);
  }, [pattern.id]);
  
  const exportPattern = useCallback(() => {
    const json = JSON.stringify(pattern, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pattern.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pattern]);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/_dev/patterns')}
          className="btn-ghost"
        >
          ← Back
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            {pattern.title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {pattern.id}
          </p>
        </div>
        <button onClick={runValidation} className="btn-secondary">
          Validate
        </button>
        <button onClick={exportPattern} className="btn-secondary">
          Export JSON
        </button>
      </div>
      
      {/* Validation Results */}
      {validationResult && (
        <div 
          className="card p-4"
          style={{
            borderColor: validationResult.valid ? 'var(--success)' : 'var(--error)',
          }}
        >
          <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Validation Results
          </h3>
          
          {validationResult.valid && validationResult.warnings.length === 0 && (
            <p style={{ color: 'var(--success)' }}>✓ Pattern is valid with no warnings</p>
          )}
          
          {validationResult.errors.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--error)' }}>
                Errors ({validationResult.errors.length})
              </h4>
              <ul className="text-sm space-y-1">
                {validationResult.errors.map((error, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--error)' }}>✗</span> [{error.type}] {error.location}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {validationResult.warnings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--warning)' }}>
                Warnings ({validationResult.warnings.length})
              </h4>
              <ul className="text-sm space-y-1">
                {validationResult.warnings.map((warning, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--warning)' }}>⚠</span> [{warning.type}] {warning.location}: {warning.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Board */}
        <div>
          <div className="board-container" ref={boardContainerRef}>
            <div className="board-wrapper">
            <Chessboard
              position={gameState.fen()}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              customSquareStyles={customSquareStyles}
              customArrows={customArrows}
              arePiecesDraggable={false}
              boardOrientation={pattern.toMove}
            />
            </div>
          </div>
          
          {/* Move Navigation */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentMoveIndex(0)}
              disabled={currentMoveIndex === 0}
              className="btn-ghost px-3 py-1"
            >
              ⏮
            </button>
            <button
              onClick={() => setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1))}
              disabled={currentMoveIndex === 0}
              className="btn-ghost px-3 py-1"
            >
              ◀
            </button>
            <span className="text-sm px-3" style={{ color: 'var(--text-secondary)' }}>
              {currentMoveIndex + 1} / {pattern.mainLine.length}
            </span>
            <button
              onClick={() => setCurrentMoveIndex(Math.min(pattern.mainLine.length - 1, currentMoveIndex + 1))}
              disabled={currentMoveIndex >= pattern.mainLine.length - 1}
              className="btn-ghost px-3 py-1"
            >
              ▶
            </button>
            <button
              onClick={() => setCurrentMoveIndex(pattern.mainLine.length - 1)}
              disabled={currentMoveIndex >= pattern.mainLine.length - 1}
              className="btn-ghost px-3 py-1"
            >
              ⏭
            </button>
          </div>
        </div>
        
        {/* Move List */}
        <div className="space-y-4">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
            Main Line
          </h3>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {pattern.mainLine.map((move, i) => {
              const isInvalid = validationResult?.errors.some(e => 
                e.location.includes(`mainLine[${i}]`)
              );
              const hasWarning = validationResult?.warnings.some(w => 
                w.location.includes(`mainLine[${i}]`)
              );
              
              return (
                <button
                  key={i}
                  onClick={() => setCurrentMoveIndex(i)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentMoveIndex === i ? 'ring-2 ring-[var(--accent-primary)]' : ''
                  }`}
                  style={{
                    background: currentMoveIndex === i ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    borderLeft: isInvalid 
                      ? '3px solid var(--error)' 
                      : hasWarning 
                        ? '3px solid var(--warning)' 
                        : '3px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                      {i + 1}.
                    </span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {move.move}
                    </span>
                    {move.annotation && (
                      <span style={{ color: 'var(--accent-gold)' }}>{move.annotation}</span>
                    )}
                    {move.arrows && move.arrows.length > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                        {move.arrows.length} arrow{move.arrows.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {move.highlights && move.highlights.length > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                        {move.highlights.length} highlight{move.highlights.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                    {move.explanation}
                  </p>
                  
                  {/* Arrow details */}
                  {currentMoveIndex === i && move.arrows && (
                    <div className="mt-2 text-xs font-mono p-2 rounded" style={{ background: 'var(--bg-primary)' }}>
                      {move.arrows.map((arrow, j) => (
                        <div key={j}>
                          {arrow.from} → {arrow.to} ({arrow.color || 'green'})
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Pattern Metadata */}
      <div className="card p-4">
        <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
          Pattern Metadata
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Category:</span>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{pattern.category}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Difficulty:</span>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{'★'.repeat(pattern.difficulty)}{'☆'.repeat(5 - pattern.difficulty)}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Duration:</span>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>~{pattern.estimatedMinutes} min</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>To Move:</span>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{pattern.toMove}</span>
          </div>
          <div className="md:col-span-2">
            <span style={{ color: 'var(--text-muted)' }}>FEN:</span>{' '}
            <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{pattern.fen}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function DevPatternDebugPage() {
  const { id } = useParams<{ id: string }>();
  
  // If no ID, show list view
  if (!id) {
    return <PatternListView />;
  }
  
  // Find the pattern
  const pattern = enhancedPatterns.find(p => p.id === id);
  
  if (!pattern) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Pattern Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          No pattern with ID "{id}" exists.
        </p>
      </div>
    );
  }
  
  return <PatternDetailView pattern={pattern} />;
}

export default DevPatternDebugPage;



