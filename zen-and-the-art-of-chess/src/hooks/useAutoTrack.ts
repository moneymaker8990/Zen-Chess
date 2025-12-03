import { useCallback, useEffect, useRef } from 'react';
import { useStudyStore, useNotesStore, useWeaknessStore } from '@/state/notesStore';
import { useMistakeLibraryStore, usePatternRecognitionStore } from '@/state/trainingStore';
import { useAIIntelligence } from '@/lib/aiIntelligence';
import type { RootCause, MistakeType, TacticalPattern } from '@/lib/trainingTypes';

// ============================================
// AUTO-TRACKING HOOKS
// Automatically capture chess activities without manual input
// NOW INTEGRATED WITH AI INTELLIGENCE FOR SEAMLESS ADAPTATION
// ============================================

/**
 * Hook to auto-track game completion
 * Call this when a game ends
 * Now integrated with AI Intelligence for seamless adaptation
 */
export function useAutoTrackGame() {
  const { currentSession, recordGamePlayed } = useStudyStore();
  const { addWeakness, recordOccurrence, weaknesses } = useWeaknessStore();
  const { addMistake } = useMistakeLibraryStore();
  const { recordGameResult, recordActivity, learnFromBehavior } = useAIIntelligence();

  const trackGameEnd = useCallback((gameData: {
    result: 'win' | 'loss' | 'draw';
    playerColor: 'white' | 'black';
    moves: string[];
    mistakes?: Array<{
      fen: string;
      playedMove: string;
      bestMove: string;
      evalBefore: number;
      evalAfter: number;
      moveNumber: number;
      rootCause?: RootCause;
      tacticalTheme?: TacticalPattern;
    }>;
  }) => {
    // Record game played in session
    if (currentSession) {
      recordGamePlayed();
    }

    // Auto-add mistakes if provided
    if (gameData.mistakes && gameData.mistakes.length > 0) {
      gameData.mistakes.forEach(mistake => {
        const evalDrop = Math.abs(mistake.evalBefore - mistake.evalAfter);
        
        // Determine mistake type based on eval drop
        let mistakeType: MistakeType = 'INACCURACY';
        if (evalDrop > 300) mistakeType = 'BLUNDER';
        else if (evalDrop > 100) mistakeType = 'MISTAKE';

        addMistake({
          gameId: `game_${Date.now()}`,
          fen: mistake.fen,
          playedMove: mistake.playedMove,
          bestMove: mistake.bestMove,
          evaluation: mistake.evalBefore,
          evalAfter: mistake.evalAfter,
          evalDrop,
          moveNumber: mistake.moveNumber,
          playerColor: gameData.playerColor,
          mistakeType,
          rootCause: mistake.rootCause || 'CALCULATION',
          tacticalTheme: mistake.tacticalTheme,
        });

        // Check if this matches an existing weakness
        const rootCause = mistake.rootCause || 'CALCULATION';
        const existingWeakness = weaknesses.find(w => 
          w.type === rootCause || 
          (mistake.tacticalTheme && w.type === mistake.tacticalTheme)
        );

        if (existingWeakness) {
          recordOccurrence(existingWeakness.id, `game_${Date.now()}`, {
            fen: mistake.fen,
            caption: `Best: ${mistake.bestMove}, Played: ${mistake.playedMove}`,
          });
        } else if (evalDrop > 200) {
          // Create new weakness for significant mistakes
          addWeakness({
            type: 'CALCULATION' as any, // Use generic type for tracking
            description: `${rootCause.replace('_', ' ')} errors`,
            severity: evalDrop > 300 ? 'HIGH' : 'MEDIUM',
            status: 'ACTIVE',
            occurrences: 1,
            gameIds: [`game_${Date.now()}`],
            examplePositions: [{
              fen: mistake.fen,
              caption: `Best: ${mistake.bestMove}, Played: ${mistake.playedMove}`,
            }],
            drillsCompleted: 0,
            lastOccurrence: Date.now(),
          });
        }
      });
    }

    // === AI INTELLIGENCE INTEGRATION ===
    // Record to AI for intelligent adaptation
    recordGameResult(gameData.result, 0); // Accuracy would come from game data
    recordActivity('game');
    
    // Learn from this behavior
    learnFromBehavior({
      type: 'game_complete',
      result: gameData.result,
      duration: gameData.moves.length, // Approximate from moves
      accuracy: 0, // Would be calculated
    });
  }, [currentSession, recordGamePlayed, addMistake, weaknesses, addWeakness, recordOccurrence,
      recordGameResult, recordActivity, learnFromBehavior]);

  return { trackGameEnd };
}

/**
 * Hook to auto-track puzzle completion
 * Now integrated with AI Intelligence for seamless adaptation
 */
export function useAutoTrackPuzzle() {
  const { currentSession, recordPuzzleSolved, recordPuzzleFailed } = useStudyStore();
  const { recordAttempt } = usePatternRecognitionStore();
  const { recordPuzzleAttempt, learnFromBehavior, recordActivity } = useAIIntelligence();

  const trackPuzzleComplete = useCallback((puzzleData: {
    solved: boolean;
    pattern?: TacticalPattern;
    timeMs: number;
    wasInstinctive?: boolean;
    difficulty?: number;
    usedHint?: boolean;
  }) => {
    // Record in session
    if (currentSession) {
      if (puzzleData.solved) {
        recordPuzzleSolved();
      } else {
        recordPuzzleFailed();
      }
    }

    // Record pattern attempt
    if (puzzleData.pattern) {
      recordAttempt({
        patternType: puzzleData.pattern,
        fen: '', // Will be filled by puzzle context
        solved: puzzleData.solved,
        timeToSolve: puzzleData.timeMs,
        wasInstinctive: puzzleData.wasInstinctive || puzzleData.timeMs < 10000,
        wasCalculated: puzzleData.timeMs > 30000,
        difficulty: (puzzleData.difficulty || 3) as 1 | 2 | 3 | 4 | 5,
      });
    }

    // === AI INTELLIGENCE INTEGRATION ===
    // Record to AI for intelligent adaptation
    recordPuzzleAttempt(
      puzzleData.solved, 
      Math.floor(puzzleData.timeMs / 1000),
      puzzleData.usedHint || false
    );
    
    // Record activity type
    recordActivity('puzzle');
    
    // Learn from this behavior for future adaptation
    if (puzzleData.pattern) {
      learnFromBehavior({
        type: 'puzzle_complete',
        solved: puzzleData.solved,
        time: Math.floor(puzzleData.timeMs / 1000),
        theme: puzzleData.pattern,
        usedHint: puzzleData.usedHint || false,
      });
    }
  }, [currentSession, recordPuzzleSolved, recordPuzzleFailed, recordAttempt, 
      recordPuzzleAttempt, learnFromBehavior, recordActivity]);

  return { trackPuzzleComplete };
}

/**
 * Hook to auto-create notes from insights
 */
export function useAutoNote() {
  const { addNote } = useNotesStore();
  const { recordNoteCreated, currentSession } = useStudyStore();

  const createQuickNote = useCallback((content: string, options?: {
    category?: string;
    tags?: string[];
    fen?: string;
  }) => {
    // Auto-generate title from content
    const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
    
    // Auto-detect category from content
    let category = options?.category || 'INSIGHT';
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('opening') || lowerContent.includes('first moves')) category = 'OPENING';
    else if (lowerContent.includes('endgame') || lowerContent.includes('king and pawn')) category = 'ENDGAME';
    else if (lowerContent.includes('tactic') || lowerContent.includes('fork') || lowerContent.includes('pin')) category = 'TACTICS';
    else if (lowerContent.includes('blunder') || lowerContent.includes('mistake')) category = 'BLUNDER_ANALYSIS';
    else if (lowerContent.includes('psychology') || lowerContent.includes('tilt') || lowerContent.includes('emotion')) category = 'PSYCHOLOGY';

    // Auto-extract tags from content
    const autoTags = new Set<string>(options?.tags || []);
    const tagPatterns = [
      /sicilian/i, /french/i, /caro-kann/i, /ruy lopez/i, /italian/i,
      /fork/i, /pin/i, /skewer/i, /discovered/i, /double attack/i,
      /endgame/i, /opening/i, /middlegame/i,
      /calculation/i, /visualization/i, /pattern/i,
    ];
    tagPatterns.forEach(pattern => {
      const match = content.match(pattern);
      if (match) autoTags.add(match[0].toLowerCase());
    });

    const noteId = addNote({
      title,
      content,
      category: category as any,
      importance: 3,
      tags: Array.from(autoTags),
      needsReview: false,
      positions: options?.fen ? [{ fen: options.fen, caption: '' }] : undefined,
    });

    if (currentSession) {
      recordNoteCreated();
    }

    return noteId;
  }, [addNote, recordNoteCreated, currentSession]);

  return { createQuickNote };
}

/**
 * Hook to auto-detect patterns from game analysis
 */
export function useAutoDetectWeakness() {
  const { mistakes } = useMistakeLibraryStore();
  const { weaknesses, addWeakness, updateWeakness } = useWeaknessStore();

  // Run analysis when mistakes change
  useEffect(() => {
    if (mistakes.length < 5) return; // Need enough data

    // Count patterns in recent mistakes
    const recentMistakes = mistakes.slice(0, 20);
    const causeCounts: Record<string, number> = {};
    const patternCounts: Record<string, number> = {};

    recentMistakes.forEach(m => {
      causeCounts[m.rootCause] = (causeCounts[m.rootCause] || 0) + 1;
      if (m.tacticalTheme) {
        patternCounts[m.tacticalTheme] = (patternCounts[m.tacticalTheme] || 0) + 1;
      }
    });

    // Find patterns that occur 3+ times
    Object.entries(causeCounts).forEach(([cause, count]) => {
      if (count >= 3) {
        const existing = weaknesses.find(w => w.type === cause);
        if (existing) {
          // Update severity if getting worse
          if (count >= 5 && existing.severity !== 'CRITICAL') {
            updateWeakness(existing.id, { severity: 'CRITICAL' });
          }
        } else {
          // Create new weakness
          addWeakness({
            type: 'CALCULATION' as any,
            description: `Recurring ${cause.replace('_', ' ').toLowerCase()} issues`,
            severity: count >= 5 ? 'HIGH' : 'MEDIUM',
            status: 'ACTIVE',
            occurrences: count,
            gameIds: [],
            examplePositions: recentMistakes
              .filter(m => m.rootCause === cause)
              .slice(0, 3)
              .map(m => ({
                fen: m.fen,
                caption: `Best: ${m.bestMove}, Played: ${m.playedMove}`,
              })),
            drillsCompleted: 0,
            lastOccurrence: Date.now(),
          });
        }
      }
    });
  }, [mistakes, weaknesses, addWeakness, updateWeakness]);
}

/**
 * Master hook that combines all auto-tracking
 * Includes AI Intelligence for seamless adaptation
 */
export function useAutoTracking() {
  const gameTracker = useAutoTrackGame();
  const puzzleTracker = useAutoTrackPuzzle();
  const noteCreator = useAutoNote();
  
  // AI Intelligence session tracking
  const { 
    startSession, 
    session, 
    detectFlowState,
    shouldSuggestBreak,
    getOptimalNextActivity,
  } = useAIIntelligence();
  
  // Start AI session tracking on mount
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      startSession();
      initialized.current = true;
    }
  }, [startSession]);
  
  // Run weakness detection
  useAutoDetectWeakness();

  return {
    ...gameTracker,
    ...puzzleTracker,
    ...noteCreator,
    // AI Intelligence exports
    aiSession: session,
    isInFlow: detectFlowState(),
    shouldTakeBreak: shouldSuggestBreak(),
    suggestedNextActivity: getOptimalNextActivity(),
  };
}

export default useAutoTracking;

