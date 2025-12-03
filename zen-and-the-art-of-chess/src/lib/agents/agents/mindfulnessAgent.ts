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

    handleTrigger: (_trigger: AgentTrigger, _state: AgentOrchestratorState): AgentMessage | null => {
      // This agent stays quiet - only activates when user explicitly visits /mind
      // We don't want to push breathing exercises or meditation on users
      return null;
    },

    getProactiveMessage: (_state: AgentOrchestratorState): AgentMessage | null => {
      // Don't proactively push mindfulness content
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as MindfulnessMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 120, // Stay quiet - let users seek this out themselves
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessMindfulnessMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}




