// ============================================
// MOTIVATOR AGENT
// Celebrates wins, encourages through losses
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface MotivatorMemory {
  celebrationsToday: number;
  lastCelebration: number;
  totalWinsCelebrated: number;
  totalEncouragements: number;
  userResponsesPositive: number;
  preferredCelebrationStyle: 'subtle' | 'enthusiastic';
}

const CELEBRATIONS = {
  win: [
    "Nice win.",
    "Clean game.",
    "Good execution.",
    "Well played.",
  ],
  winStreak: [
    "Good run going.",
    "Solid streak.",
  ],
  comebackWin: [
    "Nice comeback.",
  ],
  puzzleStreak: [
    "Good pattern recognition.",
  ],
  milestone: [
    "Milestone reached.",
  ],
};

const ENCOURAGEMENTS = {
  loss: [
    // Just stay quiet after losses - no motivational cliches
  ],
  losingStreak: [
    // Stay quiet
  ],
  lowAccuracy: [
    // Stay quiet
  ],
  plateau: [
    // Stay quiet
  ],
};

export function createMotivatorAgent(): Agent {
  let memory: MotivatorMemory = {
    celebrationsToday: 0,
    lastCelebration: 0,
    totalWinsCelebrated: 0,
    totalEncouragements: 0,
    userResponsesPositive: 0,
    preferredCelebrationStyle: 'subtle',
  };

  function getRandomMessage(messages: string[]): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  return {
    id: 'motivator' as any,
    personality: {
      id: 'motivator' as any,
      name: 'Motivator',
      icon: '💪',
      color: '#f59e0b',
      voiceTone: 'encouraging' as const,
      description: 'Celebrates your wins and lifts you through losses',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessMotivatorMemory');
        if (saved) memory = JSON.parse(saved);
        
        // Reset daily counter
        const lastDate = localStorage.getItem('zenChessMotivatorDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.celebrationsToday = 0;
          localStorage.setItem('zenChessMotivatorDate', today);
        }
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'GAME_END': {
          // Don't over-celebrate
          if (memory.celebrationsToday > 5) return null;
          if (Date.now() - memory.lastCelebration < 5 * 60 * 1000) return null;
          
          if (trigger.result === 'win') {
            memory.celebrationsToday++;
            memory.lastCelebration = Date.now();
            memory.totalWinsCelebrated++;
            saveMemory();
            
            // Check for high accuracy win
            if (trigger.accuracy && trigger.accuracy > 85) {
              return createMessage('coach', {
                title: '🎯 Precision Victory',
                body: `${trigger.accuracy}% accuracy! ${getRandomMessage(CELEBRATIONS.win)}`,
                category: 'celebration',
                priority: 'low',
                showAsToast: memory.preferredCelebrationStyle === 'enthusiastic',
              });
            }
            
            return null; // Let other agents handle regular wins
          }
          
          // Don't push motivational messages after losses - let the user process
          if (trigger.result === 'loss') {
            return null;
          }
          
          return null;
        }

        case 'WINNING_STREAK': {
          if (trigger.count >= 5) {
            memory.lastCelebration = Date.now();
            saveMemory();
            
            return createMessage('coach', {
              title: '🔥 Hot Streak!',
              body: `${trigger.count} wins! ${getRandomMessage(CELEBRATIONS.winStreak)}`,
              category: 'celebration',
              priority: 'normal',
            });
          }
          return null;
        }

        case 'LOSING_STREAK': {
          // Don't push motivational messages - Inner Compass handles this if needed
          return null;
        }

        case 'PUZZLE_STREAK': {
          if (trigger.count === 5 || trigger.count === 10) {
            return createMessage('coach', {
              title: `⚡ ${trigger.count} Puzzle Streak!`,
              body: getRandomMessage(CELEBRATIONS.puzzleStreak),
              category: 'celebration',
              priority: 'low',
            });
          }
          return null;
        }

        case 'STREAK_MILESTONE': {
          return createMessage('coach', {
            title: `🔥 ${trigger.days} Day Streak!`,
            body: getRandomMessage(CELEBRATIONS.milestone),
            category: 'celebration',
            priority: 'high',
          });
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (): AgentMessage | null => {
      return null; // Motivator is reactive, not proactive
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as MotivatorMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 30, // Don't spam celebrations
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessMotivatorMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}




