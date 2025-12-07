// ============================================
// FLOW KEEPER AGENT
// Protects flow state and deep work
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface FlowKeeperMemory {
  sessionStarted: number;
  pageVisits: { page: string; time: number }[];
  rapidPageSwitches: number;
  flowScore: number;
  deepWorkMinutes: number;
  distractionPatterns: string[];
  lastFlowReminder: number;
  optimalFlowTime: number;
  inDeepWork: boolean;
}

export function createFlowKeeperAgent(): Agent {
  let memory: FlowKeeperMemory = {
    sessionStarted: Date.now(),
    pageVisits: [],
    rapidPageSwitches: 0,
    flowScore: 100,
    deepWorkMinutes: 0,
    distractionPatterns: [],
    lastFlowReminder: 0,
    optimalFlowTime: 25,
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

  function calculateFlowScore(): number {
    let score = 100;
    
    // Penalize rapid page switches
    score -= memory.rapidPageSwitches * 5;
    
    // Reward deep work time
    score += Math.min(20, memory.deepWorkMinutes / 3);
    
    return Math.max(0, Math.min(100, score));
  }

  return {
    id: 'flow-keeper' as any,
    personality: {
      id: 'flow-keeper' as any,
      name: 'Flow Keeper',
      icon: '🌊',
      color: '#06b6d4',
      voiceTone: 'zen' as const,
      description: 'Protects your flow state and deep work',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessFlowKeeperMemory');
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
            memory.flowScore = calculateFlowScore();
            saveMemory();
            
            // Only remind occasionally
            if (Date.now() - memory.lastFlowReminder > 10 * 60 * 1000) {
              memory.lastFlowReminder = Date.now();
              saveMemory();
              
              return createMessage('coach', {
                title: '🌊 Flow Check',
                body: "The river of focus flows best when we choose one direction. Pick one activity and let yourself be absorbed.",
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
          
          memory.flowScore = calculateFlowScore();
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
          memory.flowScore = calculateFlowScore();
          saveMemory();
          return null;
        }

        case 'PUZZLE_COMPLETE': {
          // Each puzzle is focused work
          memory.deepWorkMinutes += trigger.time / 60;
          memory.flowScore = calculateFlowScore();
          saveMemory();
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Celebrate good flow
      if (memory.deepWorkMinutes > 30 && memory.flowScore > 80) {
        const alreadyCelebrated = localStorage.getItem('zenChessFlowCelebrated');
        const today = new Date().toDateString();
        
        if (alreadyCelebrated !== today) {
          localStorage.setItem('zenChessFlowCelebrated', today);
          
          return createMessage('coach', {
            title: '🌊 Deep Flow Achieved',
            body: `${Math.round(memory.deepWorkMinutes)} minutes in the flow today. This is where mastery is forged.`,
            category: 'celebration',
            priority: 'low',
          });
        }
      }
      
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as FlowKeeperMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 15,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessFlowKeeperMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}




