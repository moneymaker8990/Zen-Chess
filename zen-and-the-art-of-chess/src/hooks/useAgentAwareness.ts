// ============================================
// AGENT AWARENESS HOOK
// Automatically triggers agents based on app activity
// ============================================

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAgentTrigger } from '@/lib/agents/agentOrchestrator';

/**
 * Hook that makes agents aware of user activity.
 * Tracks page navigation, time on page, and interaction patterns.
 */
export function useAgentAwareness() {
  const location = useLocation();
  const trigger = useAgentTrigger();
  const lastPage = useRef<string>('');
  const pageEnterTime = useRef<number>(Date.now());
  const interactionCount = useRef<number>(0);

  // Track page navigation
  useEffect(() => {
    const currentPage = location.pathname;
    
    // Calculate time on previous page
    const timeOnPreviousPage = (Date.now() - pageEnterTime.current) / 1000;
    
    // Trigger page leave for previous page
    if (lastPage.current && lastPage.current !== currentPage) {
      trigger({
        type: 'PAGE_LEAVE',
        page: lastPage.current,
        timeSpent: timeOnPreviousPage,
        interactions: interactionCount.current,
      });
    }
    
    // Trigger page enter for new page
    trigger({
      type: 'PAGE_ENTER',
      page: currentPage,
      previousPage: lastPage.current,
    });
    
    // Reset tracking
    lastPage.current = currentPage;
    pageEnterTime.current = Date.now();
    interactionCount.current = 0;
    
    // Cleanup: notify agents when leaving
    return () => {
      // This runs when component unmounts or path changes
    };
  }, [location.pathname, trigger]);

  // Track session length (proactive check every minute)
  useEffect(() => {
    const sessionStart = Date.now();
    
    const checkSessionLength = () => {
      const minutes = (Date.now() - sessionStart) / 60000;
      
      // Send session length updates periodically
      if (minutes >= 30) {
        trigger({
          type: 'SESSION_LONG',
          minutes,
        });
      }
    };
    
    const interval = setInterval(checkSessionLength, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, [trigger]);

  // Track user interactions
  const trackInteraction = () => {
    interactionCount.current++;
  };

  return { trackInteraction };
}

/**
 * Hook specifically for game-related agent awareness.
 * Use in PlayPage, CalmPlayPage, etc.
 */
export function useGameAgentAwareness() {
  const trigger = useAgentTrigger();
  const gameStartTime = useRef<number>(0);
  const moveCount = useRef<number>(0);
  const blunderCount = useRef<number>(0);

  const startGame = (mode: string) => {
    gameStartTime.current = Date.now();
    moveCount.current = 0;
    blunderCount.current = 0;
    
    trigger({
      type: 'GAME_START',
      mode,
      timestamp: gameStartTime.current,
    });
  };

  const endGame = (result: 'win' | 'loss' | 'draw', accuracy?: number) => {
    const duration = (Date.now() - gameStartTime.current) / 1000;
    
    trigger({
      type: 'GAME_END',
      result,
      accuracy,
      duration,
      moveCount: moveCount.current,
      blunders: blunderCount.current,
    });
    
    // Check for streaks
    checkStreaks(result);
  };

  const trackMove = (moveTime: number, isBlunder?: boolean) => {
    moveCount.current++;
    
    if (isBlunder) {
      blunderCount.current++;
      trigger({
        type: 'BLUNDER_MADE',
        count: blunderCount.current,
        move: moveCount.current,
      });
    }

    trigger({
      type: 'MOVE_MADE',
      moveTime,
      totalMoves: moveCount.current,
    });
  };

  const checkStreaks = (result: 'win' | 'loss' | 'draw') => {
    try {
      const coach = localStorage.getItem('zen-chess-coach');
      if (!coach) return;
      
      const parsed = JSON.parse(coach);
      const games = parsed?.state?.state?.recentGames || [];
      
      if (result === 'loss') {
        // Count consecutive losses
        let losses = 1;
        for (const game of games) {
          if (game.result === 'LOSS') losses++;
          else break;
        }
        
        if (losses >= 2) {
          trigger({
            type: 'LOSING_STREAK',
            count: losses,
          });
        }
      } else if (result === 'win') {
        // Count consecutive wins
        let wins = 1;
        for (const game of games) {
          if (game.result === 'WIN') wins++;
          else break;
        }
        
        if (wins >= 3) {
          trigger({
            type: 'WINNING_STREAK',
            count: wins,
          });
        }
      }
    } catch {
      // Ignore
    }
  };

  return { startGame, endGame, trackMove };
}

/**
 * Hook for puzzle-related agent awareness.
 */
export function usePuzzleAgentAwareness() {
  const trigger = useAgentTrigger();
  const puzzleStartTime = useRef<number>(0);
  const hintUsed = useRef<boolean>(false);

  const startPuzzle = (puzzleId: string, difficulty: string, themes: string[]) => {
    puzzleStartTime.current = Date.now();
    hintUsed.current = false;
    
    trigger({
      type: 'PUZZLE_START',
      puzzleId,
      difficulty,
      themes,
    });
  };

  const useHint = () => {
    hintUsed.current = true;
    trigger({
      type: 'HINT_USED',
    });
  };

  const completePuzzle = (solved: boolean) => {
    const time = (Date.now() - puzzleStartTime.current) / 1000;
    
    trigger({
      type: 'PUZZLE_COMPLETE',
      solved,
      time,
      hintUsed: hintUsed.current,
    });
    
    // Check for puzzle streaks
    checkPuzzleStreak(solved);
  };

  const checkPuzzleStreak = (solved: boolean) => {
    if (solved) {
      try {
        const stats = localStorage.getItem('zenChessPuzzleStats');
        if (stats) {
          const parsed = JSON.parse(stats);
          const streak = parsed.currentStreak || 0;
          
          if (streak >= 5) {
            trigger({
              type: 'PUZZLE_STREAK',
              count: streak,
            });
          }
        }
      } catch {
        // Ignore
      }
    }
  };

  return { startPuzzle, useHint, completePuzzle };
}

/**
 * Hook for study-related agent awareness.
 */
export function useStudyAgentAwareness() {
  const trigger = useAgentTrigger();
  const studyStartTime = useRef<number>(0);

  const startStudy = (type: 'opening' | 'legend' | 'course' | 'analysis', topicId: string) => {
    studyStartTime.current = Date.now();
    
    trigger({
      type: 'STUDY_START',
      studyType: type,
      topicId,
    });
  };

  const endStudy = (completed: boolean = false) => {
    const duration = (Date.now() - studyStartTime.current) / 60000; // Minutes
    
    trigger({
      type: 'STUDY_END',
      duration,
      completed,
    });
  };

  return { startStudy, endStudy };
}










