// ============================================
// COACH AGENT
// Main personality - warm, knowledgeable mentor
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage, MESSAGE_TEMPLATES } from '../agentTypes';

interface CoachMemory {
  lastGreeting: number;
  gamesWatched: number;
  significantMoments: string[];
  userStrengths: string[];
  userWeaknesses: string[];
  personalNotes: string[];
}

export function createCoachAgent(): Agent {
  let memory: CoachMemory = {
    lastGreeting: 0,
    gamesWatched: 0,
    significantMoments: [],
    userStrengths: [],
    userWeaknesses: [],
    personalNotes: [],
  };

  return {
    id: 'coach',
    personality: AGENT_PERSONALITIES['coach'],

    initialize: () => {
      // Load memory from storage if available
      try {
        const saved = localStorage.getItem('zenChessCoachMemory');
        if (saved) memory = JSON.parse(saved);
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'SESSION_START': {
          // Personalized greeting based on time
          const hour = new Date().getHours();
          let greeting = MESSAGE_TEMPLATES.greetings.morning('');
          if (hour >= 12 && hour < 17) greeting = MESSAGE_TEMPLATES.greetings.afternoon('');
          else if (hour >= 17 && hour < 21) greeting = MESSAGE_TEMPLATES.greetings.evening('');
          else if (hour >= 21) greeting = MESSAGE_TEMPLATES.greetings.night('');

          // Add personalization based on memory
          let body = "Let's make today's training count.";
          if (memory.gamesWatched > 10) {
            body = `I've watched ${memory.gamesWatched} of your games now. I know your patterns well. Let's build on your strengths today.`;
          } else if (memory.gamesWatched > 0) {
            body = "Still learning your style. Each game teaches me how to help you better.";
          }

          memory.lastGreeting = Date.now();
          saveMemory();

          return createMessage('coach', {
            title: greeting,
            body,
            category: 'greeting',
            priority: 'low',
            primaryAction: {
              label: 'Start Training',
              route: '/hub',
            },
            showAsToast: false,
          });
        }

        case 'GAME_END': {
          memory.gamesWatched++;
          saveMemory();

          if (trigger.result === 'win' && trigger.accuracy && trigger.accuracy > 85) {
            memory.significantMoments.push(`High accuracy win (${trigger.accuracy}%)`);
            saveMemory();

            return createMessage('coach', {
              title: MESSAGE_TEMPLATES.celebration.accuracy(trigger.accuracy),
              body: "That was calculated, controlled play. This is the level you're capable of.",
              category: 'celebration',
              priority: 'normal',
              primaryAction: {
                label: 'View Analysis',
                route: '/mistakes',
              },
            });
          }

          if (trigger.result === 'loss' && trigger.accuracy && trigger.accuracy < 50) {
            return createMessage('coach', {
              title: 'Rough Game',
              body: "That one got away from you. Let's look at what happened - not to criticize, but to learn.",
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Review Game',
                route: '/mistakes',
              },
            });
          }

          return null;
        }

        case 'WINNING_STREAK': {
          if (trigger.count >= 3) {
            return createMessage('coach', {
              title: MESSAGE_TEMPLATES.celebration.winStreak(trigger.count),
              body: "Your focus is sharp. Keep this energy, but don't get overconfident.",
              category: 'celebration',
              priority: 'normal',
            });
          }
          return null;
        }

        case 'STREAK_MILESTONE': {
          if (trigger.days === 7) {
            return createMessage('coach', {
              title: '🔥 One Week Streak!',
              body: "Seven days of consistent practice. You're building something real here.",
              category: 'celebration',
              priority: 'high',
              primaryAction: {
                label: 'View Journey',
                route: '/journey',
              },
            });
          }
          if (trigger.days === 30) {
            return createMessage('coach', {
              title: '🏆 30 Days Strong!',
              body: "A month of dedication. Most people quit by now. You're different.",
              category: 'celebration',
              priority: 'high',
            });
          }
          return null;
        }

        case 'ACHIEVEMENT_UNLOCKED': {
          return createMessage('coach', {
            title: '🎉 Achievement Unlocked!',
            body: "Another milestone reached. Every step forward matters.",
            category: 'celebration',
            priority: 'normal',
          });
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Only proactive once per session
      if (Date.now() - memory.lastGreeting < 4 * 60 * 60 * 1000) {
        return null;
      }

      // Check if user has been idle for a while
      const idleMinutes = (Date.now() - state.lastInteractionTime) / 60000;
      
      if (idleMinutes > 30) {
        return createMessage('coach', {
          title: 'Still there?',
          body: "Take your time. Chess rewards patience. When you're ready, I'm here.",
          category: 'reminder',
          priority: 'low',
          showAsToast: false,
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as CoachMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 10,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessCoachMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}

