// ============================================
// PATTERN AGENT
// Pattern memory & spaced repetition - encouraging, systematic
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface PatternMemory {
  patternsLearned: number;
  patternsDueForReview: number;
  lastReviewSession: number;
  streakPatterns: number;
  masteredPatterns: string[];
  strugglingPatterns: string[];
}

export function createPatternAgent(): Agent {
  let memory: PatternMemory = {
    patternsLearned: 0,
    patternsDueForReview: 0,
    lastReviewSession: 0,
    streakPatterns: 0,
    masteredPatterns: [],
    strugglingPatterns: [],
  };

  return {
    id: 'pattern',
    personality: AGENT_PERSONALITIES['pattern'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessPatternMemory');
        if (saved) memory = JSON.parse(saved);

        // Check spaced repetition data
        const srsData = localStorage.getItem('zenChessSRS');
        if (srsData) {
          const parsed = JSON.parse(srsData);
          memory.patternsDueForReview = parsed.dueCount || 0;
        }
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'PATTERN_DUE': {
          memory.patternsDueForReview = trigger.count;
          saveMemory();

          if (trigger.count >= 10) {
            return createMessage('pattern', {
              title: '🧠 Patterns Need Review',
              body: `${trigger.count} patterns are fading from memory. A quick review session will lock them in permanently.`,
              subtext: 'Spaced repetition is most effective when done on time.',
              category: 'reminder',
              priority: 'high',
              primaryAction: {
                label: 'Review Now',
                route: '/spaced-repetition',
              },
            });
          }

          if (trigger.count >= 5) {
            return createMessage('pattern', {
              title: '📚 Patterns Due',
              body: `${trigger.count} patterns ready for review. 5 minutes keeps them fresh.`,
              category: 'reminder',
              priority: 'normal',
              primaryAction: {
                label: 'Quick Review',
                route: '/spaced-repetition',
              },
            });
          }

          return null;
        }

        case 'SESSION_START': {
          // Check if patterns are due
          if (memory.patternsDueForReview > 5) {
            return createMessage('pattern', {
              title: '🧠 Memory Check',
              body: `${memory.patternsDueForReview} patterns need review. Start your session by reinforcing them?`,
              category: 'reminder',
              priority: 'low',
              primaryAction: {
                label: 'Review Patterns',
                route: '/spaced-repetition',
              },
              showAsToast: false,
            });
          }
          return null;
        }

        case 'PUZZLE_STREAK': {
          if (trigger.count >= 5) {
            memory.streakPatterns = trigger.count;
            saveMemory();

            return createMessage('pattern', {
              title: '✨ Pattern Recognition: Strong',
              body: `${trigger.count} puzzles in a row! Your pattern recognition is firing on all cylinders.`,
              category: 'celebration',
              priority: 'low',
            });
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Daily review reminder
      const hoursSinceReview = (Date.now() - memory.lastReviewSession) / (1000 * 60 * 60);
      
      if (hoursSinceReview > 24 && memory.patternsDueForReview > 0) {
        return createMessage('pattern', {
          title: '🔄 Daily Review Due',
          body: "It's been over a day since your last pattern review. Memory fades without reinforcement.",
          category: 'reminder',
          priority: 'normal',
          primaryAction: {
            label: 'Start Review',
            route: '/spaced-repetition',
          },
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as PatternMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 120, // Every 2 hours max
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessPatternMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}



