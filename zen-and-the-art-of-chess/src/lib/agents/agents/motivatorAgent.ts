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
    "That's the way! Clean execution.",
    "Nicely done. You're building momentum.",
    "Victory. Let it fuel, not intoxicate.",
    "Well played. The pieces bent to your will.",
    "Excellent. Your vision is sharpening.",
  ],
  winStreak: [
    "You're on fire! But stay grounded.",
    "Flow state achieved. Ride this wave.",
    "Unstoppable. Just don't get overconfident.",
    "This is what training looks like in action.",
  ],
  comebackWin: [
    "From the ashes! That's mental toughness.",
    "You didn't give up. That's what separates players.",
    "A comeback win is worth three regular wins.",
  ],
  puzzleStreak: [
    "Your tactical vision is sharp today!",
    "Pattern recognition on point.",
    "The patterns are flowing. Keep going.",
  ],
  milestone: [
    "Another milestone reached. You're building something real.",
    "Progress is progress, no matter the pace.",
    "Each step forward matters.",
  ],
};

const ENCOURAGEMENTS = {
  loss: [
    "Every master was once a beginner who refused to give up.",
    "This loss contains a lesson. Find it.",
    "Setbacks are setups for comebacks.",
    "Even Magnus loses. What matters is the next game.",
  ],
  losingStreak: [
    "Tough stretch. But diamonds form under pressure.",
    "This is where character is built. Take a breath.",
    "The darkest hour is just before dawn.",
  ],
  lowAccuracy: [
    "Not your best game. Tomorrow is another day.",
    "We all have off days. Rest and reset.",
  ],
  plateau: [
    "Plateaus come before breakthroughs. Keep pushing.",
    "Growth isn't linear. Trust the process.",
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
          
          if (trigger.result === 'loss') {
            memory.totalEncouragements++;
            saveMemory();
            
            // Subtle encouragement after loss
            return createMessage('coach', {
              title: '📖 Lesson Available',
              body: getRandomMessage(ENCOURAGEMENTS.loss),
              category: 'insight',
              priority: 'low',
              showAsToast: false,
            });
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
          if (trigger.count >= 3) {
            return createMessage('coach', {
              title: '💪 Stay Strong',
              body: getRandomMessage(ENCOURAGEMENTS.losingStreak),
              subtext: "This is temporary. Your skill isn't.",
              category: 'insight',
              priority: 'normal',
              showAsToast: false,
            });
          }
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

    getCooldownMinutes: () => 5,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessMotivatorMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}

