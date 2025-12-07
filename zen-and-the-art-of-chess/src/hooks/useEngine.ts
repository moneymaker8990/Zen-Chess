// ============================================
// STANDARDIZED ENGINE HOOK
// Provides consistent engine initialization and cleanup
// across all components that use Stockfish
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { stockfish } from '@/engine/stockfish';

interface UseEngineOptions {
  /** Skill level 0-20 (default: 10) */
  skill?: number;
  /** Auto-initialize on mount (default: true) */
  autoInit?: boolean;
  /** Whether to stop engine on unmount (default: true) */
  stopOnUnmount?: boolean;
}

interface UseEngineReturn {
  /** Whether engine is ready to accept commands */
  ready: boolean;
  /** Whether engine is currently loading */
  loading: boolean;
  /** Error message if initialization failed */
  error: string | null;
  /** Current number of pending requests in queue */
  queueLength: number;
  /** Whether engine is currently processing a request */
  isProcessing: boolean;
  /** Re-initialize the engine */
  reinitialize: () => Promise<boolean>;
  /** Set engine skill level */
  setSkill: (level: number) => void;
  /** Stop all current operations */
  stop: () => void;
  /** Reset engine state */
  reset: () => void;
}

/**
 * Standardized hook for using the Stockfish engine
 * 
 * Usage:
 * ```tsx
 * const { ready, loading, error } = useEngine({ skill: 15 });
 * 
 * useEffect(() => {
 *   if (ready) {
 *     stockfish.playMove(fen, callback);
 *   }
 * }, [ready, fen]);
 * ```
 */
export function useEngine(options: UseEngineOptions = {}): UseEngineReturn {
  const {
    skill = 10,
    autoInit = true,
    stopOnUnmount = true,
  } = options;
  
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queueLength, setQueueLength] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const initialized = useRef(false);
  const currentSkill = useRef(skill);
  const mounted = useRef(true);
  
  // Initialize engine
  const initEngine = useCallback(async () => {
    if (loading) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const success = await stockfish.init();
      
      if (!mounted.current) return success;
      
      if (success) {
        stockfish.setStrength(currentSkill.current);
        setReady(true);
        initialized.current = true;
      } else {
        setError('Failed to initialize chess engine');
      }
      
      return success;
    } catch (err) {
      if (mounted.current) {
        setError(err instanceof Error ? err.message : 'Unknown engine error');
      }
      return false;
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [loading]);
  
  // Auto-initialize on mount
  useEffect(() => {
    mounted.current = true;
    
    if (autoInit && !initialized.current) {
      initEngine();
    }
    
    return () => {
      mounted.current = false;
      
      if (stopOnUnmount) {
        stockfish.stop();
      }
    };
  }, [autoInit, initEngine, stopOnUnmount]);
  
  // Update queue length periodically when processing
  useEffect(() => {
    if (!ready) return;
    
    const interval = setInterval(() => {
      setQueueLength(stockfish.queueLength);
      setIsProcessing(stockfish.isProcessing);
    }, 200);
    
    return () => clearInterval(interval);
  }, [ready]);
  
  // Set skill level
  const setSkill = useCallback((level: number) => {
    currentSkill.current = level;
    if (ready) {
      stockfish.setStrength(level);
    }
  }, [ready]);
  
  // Stop operations
  const stop = useCallback(() => {
    stockfish.stop();
  }, []);
  
  // Reset engine
  const reset = useCallback(() => {
    stockfish.reset();
  }, []);
  
  // Reinitialize
  const reinitialize = useCallback(async () => {
    initialized.current = false;
    setReady(false);
    return initEngine();
  }, [initEngine]);
  
  return {
    ready,
    loading,
    error,
    queueLength,
    isProcessing,
    reinitialize,
    setSkill,
    stop,
    reset,
  };
}

/**
 * Hook specifically for legend engine use
 * Always uses maximum strength
 */
export function useLegendEngine(): UseEngineReturn {
  return useEngine({ skill: 20 });
}

/**
 * Hook for analysis mode
 * Uses maximum strength for accurate analysis
 */
export function useAnalysisEngine(): UseEngineReturn {
  return useEngine({ skill: 20 });
}

/**
 * Hook for calm/casual play
 * Uses minimum strength for gentle opposition
 */
export function useCalmEngine(): UseEngineReturn {
  return useEngine({ skill: 0 });
}

export default useEngine;




