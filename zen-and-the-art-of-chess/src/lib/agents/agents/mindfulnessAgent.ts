// ============================================
// MINDFULNESS AGENT
// Meditation & breathing guide - calm, zen
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface MindfulnessMemory {
  totalMeditationMinutes: number;
  sessionsToday: number;
  lastSession: number;
  preferredDuration: number;
  breathingExercisesToday: number;
  calmPlaySessions: number;
}

export function createMindfulnessAgent(): Agent {
  let memory: MindfulnessMemory = {
    totalMeditationMinutes: 0,
    sessionsToday: 0,
    lastSession: 0,
    preferredDuration: 5,
    breathingExercisesToday: 0,
    calmPlaySessions: 0,
  };

  const WISDOM_QUOTES = [
    "The mind is everything. What you think you become. — Buddha",
    "Between stimulus and response there is a space. In that space is our power to choose. — Viktor Frankl",
    "The quieter you become, the more you can hear. — Ram Dass",
    "In the midst of movement and chaos, keep stillness inside of you. — Deepak Chopra",
    "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor. — Thich Nhat Hanh",
    "The present moment is the only moment available to us, and it is the door to all moments. — Thich Nhat Hanh",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — Buddha",
  ];

  return {
    id: 'mindfulness',
    personality: AGENT_PERSONALITIES['mindfulness'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessMindfulnessMemory');
        if (saved) memory = JSON.parse(saved);

        // Reset daily counters
        const lastDate = localStorage.getItem('zenChessMindfulnessDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.sessionsToday = 0;
          memory.breathingExercisesToday = 0;
          localStorage.setItem('zenChessMindfulnessDate', today);
        }
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'SESSION_START': {
          // Morning mindfulness suggestion
          const hour = new Date().getHours();
          
          if (hour >= 5 && hour < 10 && memory.sessionsToday === 0) {
            const quote = WISDOM_QUOTES[Math.floor(Math.random() * WISDOM_QUOTES.length)];
            
            return createMessage('mindfulness', {
              title: '☀️ Morning Practice',
              body: "Begin your chess day with intention. A clear mind sees clearly on the board.",
              subtext: quote,
              category: 'recommendation',
              priority: 'low',
              primaryAction: {
                label: 'Morning Meditation',
                route: '/mind',
              },
              showAsToast: false,
            });
          }
          return null;
        }

        case 'GAME_END': {
          // Suggest breathing after a loss
          if (trigger.result === 'loss') {
            return createMessage('mindfulness', {
              title: '🌬️ Breathe',
              body: "Before your next game, take three conscious breaths. In through the nose, out through the mouth.",
              category: 'recommendation',
              priority: 'low',
              showAsToast: false,
            });
          }
          return null;
        }

        case 'TILT_DETECTED': {
          if (trigger.severity >= 5) {
            return createMessage('mindfulness', {
              title: '☯ Return to Center',
              body: "Strong emotions cloud judgment. Let's reset. Close your eyes. Feel your feet on the ground. You are here, now, and that is enough.",
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Guided Breathing',
                route: '/mind',
              },
            });
          }
          return null;
        }

        case 'WINNING_STREAK': {
          if (trigger.count >= 4) {
            return createMessage('mindfulness', {
              title: '🌊 Stay Grounded',
              body: "Success can intoxicate. Stay humble, stay present. Each game is new.",
              category: 'insight',
              priority: 'low',
            });
          }
          return null;
        }

        case 'SESSION_LONG': {
          if (trigger.minutes > 60 && memory.breathingExercisesToday === 0) {
            return createMessage('mindfulness', {
              title: '⏸️ Pause & Breathe',
              body: "You've been playing for an hour. A one-minute breathing break can restore focus better than ten more games.",
              category: 'recommendation',
              priority: 'normal',
              primaryAction: {
                label: '1-Minute Breathe',
                route: '/mind',
              },
            });
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Evening wind-down suggestion
      const hour = new Date().getHours();
      
      if (hour >= 21 && memory.sessionsToday === 0) {
        return createMessage('mindfulness', {
          title: '🌙 Evening Reflection',
          body: "End your day with a brief meditation. Reflect on your games without judgment - just observation.",
          category: 'recommendation',
          priority: 'low',
          primaryAction: {
            label: 'Wind Down',
            route: '/mind',
          },
        });
      }

      // Suggest calm play if they've been grinding
      const sessionMinutes = (Date.now() - state.sessionStartTime) / 60000;
      if (sessionMinutes > 45 && memory.calmPlaySessions === 0) {
        return createMessage('mindfulness', {
          title: '☯ Try Calm Play',
          body: "Slow down. In Calm Play, you breathe before each move. Quality over quantity.",
          category: 'recommendation',
          priority: 'low',
          primaryAction: {
            label: 'Start Calm Play',
            route: '/calm-play',
          },
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as MindfulnessMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 45,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessMindfulnessMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}



