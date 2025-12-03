// ============================================
// CHESS GENIUS HOOK
// React hook for genius-level AI insights
// ============================================

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  analyzePosition,
  explainMove,
  getPuzzleGeniusInsight,
  getContextualWhisper,
  getQuickInsight,
  getOpeningInsight,
  analyzeMistake,
  streamGeniusAnalysis,
  type PositionInsight,
  type MoveExplanation,
  type PuzzleGeniusInsight,
  type GeniusWhisper,
  type OpeningInsight,
} from '@/lib/chessGenius';
import { useCoachStore } from '@/state/coachStore';

// ============================================
// TYPES
// ============================================

interface UseChessGeniusOptions {
  autoWhisper?: boolean;
  whisperCooldownMs?: number;
}

interface UseChessGeniusReturn {
  // State
  isAnalyzing: boolean;
  currentInsight: PositionInsight | null;
  currentMoveExplanation: MoveExplanation | null;
  currentPuzzleInsight: PuzzleGeniusInsight | null;
  currentWhisper: GeniusWhisper | null;
  error: string | null;
  
  // Actions
  analyzeCurrentPosition: (fen: string, options?: Parameters<typeof analyzePosition>[1]) => Promise<PositionInsight>;
  explainCurrentMove: (fen: string, move: string, context?: Parameters<typeof explainMove>[2]) => Promise<MoveExplanation>;
  getPuzzleInsight: (fen: string, solution: string[], themes: string[], solved: boolean, time: number) => Promise<PuzzleGeniusInsight>;
  getOpeningInfo: (name: string, moves: string[], fen: string) => Promise<OpeningInsight>;
  analyzeMistakeContext: (fen: string, wrong: string, correct: string, context?: Parameters<typeof analyzeMistake>[3]) => Promise<ReturnType<typeof analyzeMistake>>;
  askGenius: (fen: string, question: string) => Promise<string>;
  dismissWhisper: () => void;
  clearInsight: () => void;
  
  // Streaming
  streamAnalysis: (type: 'position' | 'game' | 'opening', content: string) => Promise<void>;
  streamingContent: string;
  isStreaming: boolean;
}

// ============================================
// HOOK IMPLEMENTATION
// ============================================

export function useChessGenius(options: UseChessGeniusOptions = {}): UseChessGeniusReturn {
  const { autoWhisper = false, whisperCooldownMs = 300000 } = options; // 5 min default cooldown
  
  // State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [currentInsight, setCurrentInsight] = useState<PositionInsight | null>(null);
  const [currentMoveExplanation, setCurrentMoveExplanation] = useState<MoveExplanation | null>(null);
  const [currentPuzzleInsight, setCurrentPuzzleInsight] = useState<PuzzleGeniusInsight | null>(null);
  const [currentWhisper, setCurrentWhisper] = useState<GeniusWhisper | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const lastWhisperTime = useRef(0);
  const mounted = useRef(true);
  
  // Get coach state for context
  const coachState = useCoachStore((s) => s.state);
  
  // Cleanup on unmount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // ============================================
  // POSITION ANALYSIS
  // ============================================
  
  const analyzeCurrentPosition = useCallback(async (
    fen: string,
    analysisOptions?: Parameters<typeof analyzePosition>[1]
  ): Promise<PositionInsight> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const insight = await analyzePosition(fen, analysisOptions);
      if (mounted.current) {
        setCurrentInsight(insight);
      }
      return insight;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // MOVE EXPLANATION
  // ============================================
  
  const explainCurrentMove = useCallback(async (
    fen: string,
    move: string,
    context?: Parameters<typeof explainMove>[2]
  ): Promise<MoveExplanation> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const explanation = await explainMove(fen, move, context);
      if (mounted.current) {
        setCurrentMoveExplanation(explanation);
      }
      return explanation;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Explanation failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // PUZZLE INSIGHT
  // ============================================
  
  const getPuzzleInsight = useCallback(async (
    fen: string,
    solution: string[],
    themes: string[],
    solved: boolean,
    time: number
  ): Promise<PuzzleGeniusInsight> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const insight = await getPuzzleGeniusInsight(fen, solution, themes, solved, time);
      if (mounted.current) {
        setCurrentPuzzleInsight(insight);
      }
      return insight;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Puzzle insight failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // OPENING INSIGHT
  // ============================================
  
  const getOpeningInfo = useCallback(async (
    name: string,
    moves: string[],
    fen: string
  ): Promise<OpeningInsight> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      return await getOpeningInsight(name, moves, fen);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Opening insight failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // MISTAKE ANALYSIS
  // ============================================
  
  const analyzeMistakeContext = useCallback(async (
    fen: string,
    wrong: string,
    correct: string,
    context?: Parameters<typeof analyzeMistake>[3]
  ) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      return await analyzeMistake(fen, wrong, correct, context);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Mistake analysis failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // QUICK ASK
  // ============================================
  
  const askGenius = useCallback(async (
    fen: string,
    question: string
  ): Promise<string> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      return await getQuickInsight(fen, question);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Quick insight failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // ============================================
  // WHISPER MANAGEMENT
  // ============================================
  
  const dismissWhisper = useCallback(() => {
    setCurrentWhisper(null);
  }, []);
  
  const clearInsight = useCallback(() => {
    setCurrentInsight(null);
    setCurrentMoveExplanation(null);
    setCurrentPuzzleInsight(null);
    setError(null);
  }, []);

  // ============================================
  // AUTO-WHISPER (if enabled)
  // ============================================
  
  useEffect(() => {
    if (!autoWhisper) return;
    
    const checkForWhisper = async () => {
      const now = Date.now();
      if (now - lastWhisperTime.current < whisperCooldownMs) return;
      
      try {
        const whisper = await getContextualWhisper({
          currentActivity: 'idle', // Would be determined by context
          recentEvents: [],
          userState: {
            tiltLevel: coachState.currentMood === 'FRUSTRATED' ? 60 : 20,
            timeInSession: (now - coachState.sessionStartTime) / 60000,
          },
        });
        
        if (whisper && mounted.current) {
          setCurrentWhisper(whisper);
          lastWhisperTime.current = now;
        }
      } catch (err) {
        // Silently fail for whispers
        console.debug('Whisper check failed:', err);
      }
    };
    
    const interval = setInterval(checkForWhisper, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [autoWhisper, whisperCooldownMs, coachState]);

  // ============================================
  // STREAMING ANALYSIS
  // ============================================
  
  const streamAnalysis = useCallback(async (
    type: 'position' | 'game' | 'opening',
    content: string
  ): Promise<void> => {
    setIsStreaming(true);
    setStreamingContent('');
    setError(null);
    
    try {
      for await (const chunk of streamGeniusAnalysis(type, content)) {
        if (mounted.current) {
          setStreamingContent(prev => prev + chunk);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Streaming failed';
      if (mounted.current) {
        setError(message);
      }
      throw err;
    } finally {
      if (mounted.current) {
        setIsStreaming(false);
      }
    }
  }, []);

  // ============================================
  // RETURN
  // ============================================
  
  return {
    // State
    isAnalyzing,
    currentInsight,
    currentMoveExplanation,
    currentPuzzleInsight,
    currentWhisper,
    error,
    
    // Actions
    analyzeCurrentPosition,
    explainCurrentMove,
    getPuzzleInsight,
    getOpeningInfo,
    analyzeMistakeContext,
    askGenius,
    dismissWhisper,
    clearInsight,
    
    // Streaming
    streamAnalysis,
    streamingContent,
    isStreaming,
  };
}

// ============================================
// SIMPLE HOOKS FOR SPECIFIC USE CASES
// ============================================

/** Hook for puzzle explanations */
export function usePuzzleGenius() {
  const { getPuzzleInsight, currentPuzzleInsight, isAnalyzing, error } = useChessGenius();
  return { getPuzzleInsight, insight: currentPuzzleInsight, isLoading: isAnalyzing, error };
}

/** Hook for move explanations */
export function useMoveGenius() {
  const { explainCurrentMove, currentMoveExplanation, isAnalyzing, error } = useChessGenius();
  return { explainMove: explainCurrentMove, explanation: currentMoveExplanation, isLoading: isAnalyzing, error };
}

/** Hook for position analysis */
export function usePositionGenius() {
  const { analyzeCurrentPosition, currentInsight, isAnalyzing, error } = useChessGenius();
  return { analyze: analyzeCurrentPosition, insight: currentInsight, isLoading: isAnalyzing, error };
}

/** Hook for quick questions */
export function useAskGenius() {
  const [answer, setAnswer] = useState<string | null>(null);
  const { askGenius, isAnalyzing, error } = useChessGenius();
  
  const ask = useCallback(async (fen: string, question: string) => {
    const response = await askGenius(fen, question);
    setAnswer(response);
    return response;
  }, [askGenius]);
  
  return { ask, answer, isLoading: isAnalyzing, error };
}

