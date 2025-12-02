// ============================================
// TRAINING AGENT
// Training architect - analytical, data-driven
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface TrainingMemory {
  lastTrainingSuggestion: number;
  weaknessesIdentified: string[];
  puzzlesSolvedToday: number;
  lastPuzzleStreak: number;
  preferredDifficulty: 'easy' | 'medium' | 'hard';
  trainingPlanActive: boolean;
  currentFocus: string | null;
}

export function createTrainingAgent(): Agent {
  let memory: TrainingMemory = {
    lastTrainingSuggestion: 0,
    weaknessesIdentified: [],
    puzzlesSolvedToday: 0,
    lastPuzzleStreak: 0,
    preferredDifficulty: 'medium',
    trainingPlanActive: false,
    currentFocus: null,
  };

  return {
    id: 'training',
    personality: AGENT_PERSONALITIES['training'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessTrainingMemory');
        if (saved) memory = JSON.parse(saved);

        // Reset daily counter
        const lastDate = localStorage.getItem('zenChessTrainingDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.puzzlesSolvedToday = 0;
          localStorage.setItem('zenChessTrainingDate', today);
        }
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'PUZZLE_COMPLETE': {
          if (trigger.solved) {
            memory.puzzlesSolvedToday++;
            saveMemory();
          }
          return null;
        }

        case 'PUZZLE_STREAK': {
          memory.lastPuzzleStreak = trigger.count;
          saveMemory();

          if (trigger.count === 5) {
            return createMessage('training', {
              title: '🔥 5 Puzzle Streak!',
              body: "Your tactical vision is sharp. Consider increasing difficulty or moving to timed puzzles.",
              category: 'celebration',
              priority: 'normal',
              primaryAction: {
                label: 'Increase Difficulty',
                route: '/train',
              },
            });
          }

          if (trigger.count === 10) {
            return createMessage('training', {
              title: '⚡ 10 Puzzle Streak!',
              body: "Exceptional tactical flow! You're ready for harder challenges.",
              category: 'celebration',
              priority: 'high',
            });
          }

          return null;
        }

        case 'GAME_END': {
          if (trigger.result === 'loss' && trigger.accuracy) {
            // Analyze the loss
            if (trigger.accuracy < 60) {
              return createMessage('training', {
                title: '🎯 Training Recommendation',
                body: "That game suggests tactical gaps. I recommend 15 minutes of puzzle training before your next game.",
                category: 'recommendation',
                priority: 'normal',
                primaryAction: {
                  label: 'Start Puzzles',
                  route: '/train',
                },
              });
            }
          }
          return null;
        }

        case 'PAGE_ENTER': {
          // When entering training-related pages, provide context
          if (trigger.page === '/train' && !memory.trainingPlanActive) {
            const puzzlesRemaining = Math.max(0, 20 - memory.puzzlesSolvedToday);
            
            if (puzzlesRemaining > 0) {
              return createMessage('training', {
                title: 'Training Session',
                body: `Daily goal: ${memory.puzzlesSolvedToday}/20 puzzles. ${puzzlesRemaining} to go!`,
                subtext: memory.currentFocus ? `Current focus: ${memory.currentFocus}` : undefined,
                category: 'reminder',
                priority: 'low',
                showAsToast: false,
              });
            }
          }
          return null;
        }

        case 'SESSION_START': {
          // Suggest training at session start if patterns need review
          const hoursSinceLastSuggestion = (Date.now() - memory.lastTrainingSuggestion) / (1000 * 60 * 60);
          
          if (hoursSinceLastSuggestion > 24) {
            memory.lastTrainingSuggestion = Date.now();
            saveMemory();

            return createMessage('training', {
              title: '📊 Daily Training Plan',
              body: "Start with 10 puzzles to warm up your tactical vision, then study one weakness area.",
              category: 'recommendation',
              priority: 'low',
              primaryAction: {
                label: 'Start Training',
                route: '/train',
              },
              showAsToast: false,
            });
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Check if user hasn't trained today
      if (memory.puzzlesSolvedToday === 0) {
        const hour = new Date().getHours();
        
        // Afternoon reminder
        if (hour >= 14 && hour < 18) {
          return createMessage('training', {
            title: '🎯 No Training Yet Today',
            body: "You haven't solved any puzzles today. Even 10 minutes helps maintain tactical sharpness.",
            category: 'reminder',
            priority: 'normal',
            primaryAction: {
              label: 'Quick Training',
              route: '/train',
            },
          });
        }
      }

      // If they've trained a lot, suggest rest
      if (memory.puzzlesSolvedToday > 50) {
        return createMessage('training', {
          title: '📚 Quality Over Quantity',
          body: `${memory.puzzlesSolvedToday} puzzles today! That's impressive, but diminishing returns set in. Consider reviewing today's mistakes instead.`,
          category: 'insight',
          priority: 'normal',
          primaryAction: {
            label: 'Review Mistakes',
            route: '/mistakes',
          },
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as TrainingMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 30,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessTrainingMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}



