// ============================================
// FOCUS GUARDIAN AGENT
// Monitors for distraction patterns, protects deep work
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface FocusMemory {
  sessionStarted: number;
  pageVisits: { page: string; time: number }[];
  rapidPageSwitches: number;
  focusScore: number;
  deepWorkMinutes: number;
  distractionPatterns: string[];
  lastFocusReminder: number;
  optimalFocusTime: number;
  inDeepWork: boolean;
}

export function createFocusGuardianAgent(): Agent {
  let memory: FocusMemory = {
    sessionStarted: Date.now(),
    pageVisits: [],
    rapidPageSwitches: 0,
    focusScore: 100,
    deepWorkMinutes: 0,
    distractionPatterns: [],
    lastFocusReminder: 0,
    optimalFocusTime: 25,
    inDeepWork: false,
  };

  function detectDistraction(): string | null {
    // Check for rapid page switching
    const recent = memory.pageVisits.slice(-5);
    if (recent.length >= 5) {
      const timeSpan = recent[recent.length - 1].time - recent[0].time;
      if (timeSpan < 60000) { // 5 pages in under a minute
        return 'rapid_switching';
      }
    }
    
    // Check for scattered activity
    const uniquePages = new Set(memory.pageVisits.slice(-10).map(p => p.page));
    if (uniquePages.size >= 6) {
      return 'scattered_activity';
    }
    
    return null;
  }

  function calculateFocusScore(): number {
    let score = 100;
    
    // Penalize rapid page switches
    score -= memory.rapidPageSwitches * 5;
    
    // Reward deep work time
    score += Math.min(20, memory.deepWorkMinutes / 3);
    
    return Math.max(0, Math.min(100, score));
  }

  return {
    id: 'focus-guardian' as any,
    personality: {
      id: 'focus-guardian' as any,
      name: 'Focus Guardian',
      icon: '🎯',
      color: '#06b6d4',
      voiceTone: 'analytical' as const,
      description: 'Protects your deep work and monitors focus',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessFocusMemory');
        if (saved) {
          const parsed = JSON.parse(saved);
          memory = { ...memory, ...parsed };
        }
      } catch {
        // Use defaults
      }
      
      memory.sessionStarted = Date.now();
      memory.pageVisits = [];
      memory.rapidPageSwitches = 0;
      memory.inDeepWork = false;
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'PAGE_ENTER': {
          const now = Date.now();
          memory.pageVisits.push({ page: trigger.page, time: now });
          
          // Keep only last 20 visits
          if (memory.pageVisits.length > 20) {
            memory.pageVisits = memory.pageVisits.slice(-20);
          }
          
          // Detect distraction patterns
          const distraction = detectDistraction();
          
          if (distraction === 'rapid_switching') {
            memory.rapidPageSwitches++;
            memory.focusScore = calculateFocusScore();
            saveMemory();
            
            // Only remind occasionally
            if (Date.now() - memory.lastFocusReminder > 10 * 60 * 1000) {
              memory.lastFocusReminder = Date.now();
              saveMemory();
              
              return createMessage('coach', {
                title: '🎯 Focus Check',
                body: "I notice you're jumping between pages quickly. Pick one activity and commit to it for 10 minutes.",
                category: 'recommendation',
                priority: 'low',
                showAsToast: false,
              });
            }
          }
          
          // Track deep work pages
          const deepWorkPages = ['/train', '/play', '/courses', '/calm-play', '/thinking-system'];
          if (deepWorkPages.some(p => trigger.page.includes(p))) {
            memory.inDeepWork = true;
          } else {
            if (memory.inDeepWork) {
              const lastDeepWorkPage = memory.pageVisits.slice().reverse().find(
                p => deepWorkPages.some(dp => p.page.includes(dp))
              );
              if (lastDeepWorkPage) {
                const deepWorkDuration = (now - lastDeepWorkPage.time) / 60000;
                memory.deepWorkMinutes += deepWorkDuration;
              }
            }
            memory.inDeepWork = false;
          }
          
          memory.focusScore = calculateFocusScore();
          saveMemory();
          return null;
        }

        case 'GAME_START': {
          memory.inDeepWork = true;
          saveMemory();
          return null;
        }

        case 'GAME_END': {
          // Track deep work time
          const gameTime = 10; // Estimate
          memory.deepWorkMinutes += gameTime;
          memory.focusScore = calculateFocusScore();
          saveMemory();
          return null;
        }

        case 'PUZZLE_COMPLETE': {
          // Each puzzle is focused work
          memory.deepWorkMinutes += trigger.time / 60;
          memory.focusScore = calculateFocusScore();
          saveMemory();
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Celebrate good focus
      if (memory.deepWorkMinutes > 30 && memory.focusScore > 80) {
        const alreadyCelebrated = localStorage.getItem('zenChessFocusCelebrated');
        const today = new Date().toDateString();
        
        if (alreadyCelebrated !== today) {
          localStorage.setItem('zenChessFocusCelebrated', today);
          
          return createMessage('coach', {
            title: '🎯 Deep Work Achieved',
            body: `${Math.round(memory.deepWorkMinutes)} minutes of focused practice today. This is how improvement happens.`,
            category: 'celebration',
            priority: 'low',
          });
        }
      }
      
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as FocusMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 15,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessFocusMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}




