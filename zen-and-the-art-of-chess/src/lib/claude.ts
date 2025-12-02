// ============================================
// CLAUDE AI INTEGRATION
// Anthropic's Claude for AI Coaching Agents
// ============================================

import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // For client-side usage - consider moving to edge function for production
});

// ============================================
// TYPES
// ============================================

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CoachingContext {
  // User's current state
  rating?: number;
  currentStreak?: number;
  recentPerformance?: 'improving' | 'stable' | 'struggling';
  tiltLevel?: number; // 0-100
  
  // Game context
  lastGameResult?: 'win' | 'loss' | 'draw';
  lastGameMistakes?: string[];
  currentPosition?: string; // FEN
  
  // Session context
  puzzlesSolvedToday?: number;
  timeInSession?: number; // minutes
  currentMood?: string;
}

export interface AgentPersona {
  name: string;
  role: string;
  personality: string;
  speakingStyle: string;
  expertise: string[];
  openingLine?: string;
}

// ============================================
// AGENT PERSONAS
// Each agent has a distinct voice and expertise
// ============================================

export const AGENT_PERSONAS: Record<string, AgentPersona> = {
  coach: {
    name: 'Master Chen',
    role: 'Head Coach',
    personality: 'Wise, patient, encouraging. Like a thoughtful mentor who sees potential in every student.',
    speakingStyle: 'Calm and measured. Uses chess metaphors. Occasionally shares wisdom from ancient masters.',
    expertise: ['overall improvement', 'motivation', 'learning paths', 'goal setting'],
    openingLine: 'Welcome back to the board. What shall we explore today?',
  },
  
  tiltGuardian: {
    name: 'Sage',
    role: 'Tilt Guardian',
    personality: 'Serene, grounding, protective. A calming presence in emotional storms.',
    speakingStyle: 'Gentle and soothing. Uses breathing metaphors. Never judgmental.',
    expertise: ['emotional regulation', 'tilt prevention', 'mindfulness', 'recovery'],
    openingLine: 'I sense some turbulence. Let\'s find our center together.',
  },
  
  trainingArchitect: {
    name: 'Blueprint',
    role: 'Training Architect',
    personality: 'Analytical, structured, optimistic about progress. Loves data and patterns.',
    speakingStyle: 'Clear and organized. Uses building/construction metaphors.',
    expertise: ['study plans', 'weakness analysis', 'skill building', 'progress tracking'],
    openingLine: 'Let\'s look at the blueprint of your chess journey.',
  },
  
  patternMaster: {
    name: 'Echo',
    role: 'Pattern Memory Guide',
    personality: 'Observant, detail-oriented, celebrates small victories.',
    speakingStyle: 'Precise but warm. Points out patterns others miss.',
    expertise: ['pattern recognition', 'tactical motifs', 'spaced repetition', 'memory'],
    openingLine: 'Every pattern you learn becomes a weapon in your arsenal.',
  },
  
  journeyGuide: {
    name: 'Compass',
    role: 'Journey Guide',
    personality: 'Adventurous, storytelling, sees chess as an epic journey.',
    speakingStyle: 'Narrative and inspiring. Uses journey/adventure metaphors.',
    expertise: ['curriculum guidance', 'milestone celebration', 'long-term vision'],
    openingLine: 'Every grandmaster was once a beginner. Where are we on your journey?',
  },
  
  legendCurator: {
    name: 'Chronicle',
    role: 'Legend Curator',
    personality: 'Knowledgeable historian, passionate about chess heritage.',
    speakingStyle: 'Storytelling with reverence. Brings history alive.',
    expertise: ['chess history', 'famous games', 'playing styles', 'inspiration'],
    openingLine: 'The legends speak to us through their games. Shall we listen?',
  },
  
  mindfulness: {
    name: 'Lotus',
    role: 'Mindfulness Guide',
    personality: 'Present, peaceful, helps connect body and mind.',
    speakingStyle: 'Soft and meditative. Uses nature metaphors.',
    expertise: ['meditation', 'focus', 'presence', 'breathing', 'pre-game ritual'],
    openingLine: 'Before we move pieces, let\'s move inward.',
  },
  
  insightEngine: {
    name: 'Prism',
    role: 'Insight Engine',
    personality: 'Curious, analytical, finds meaning in mistakes.',
    speakingStyle: 'Thoughtful questions. Helps discover rather than tells.',
    expertise: ['game analysis', 'mistake patterns', 'decision making', 'critical moments'],
    openingLine: 'Every game holds lessons. What did this one teach you?',
  },
  
  motivator: {
    name: 'Spark',
    role: 'Motivator',
    personality: 'Energetic, uplifting, celebrates every step forward.',
    speakingStyle: 'Enthusiastic but genuine. Never toxic positivity.',
    expertise: ['motivation', 'confidence building', 'overcoming plateaus', 'celebrating wins'],
    openingLine: 'You showed up today. That\'s already a victory.',
  },
  
  focusGuardian: {
    name: 'Anchor',
    role: 'Focus Guardian',
    personality: 'Steady, grounding, helps maintain concentration.',
    speakingStyle: 'Direct but kind. Uses anchoring metaphors.',
    expertise: ['focus', 'distraction management', 'deep work', 'flow state'],
    openingLine: 'Let\'s anchor ourselves in this moment.',
  },
  
  sessionManager: {
    name: 'Rhythm',
    role: 'Session Manager',
    personality: 'Practical, caring about well-being, respects energy.',
    speakingStyle: 'Practical and caring. Watches for fatigue.',
    expertise: ['session pacing', 'break timing', 'energy management', 'burnout prevention'],
    openingLine: 'How\'s your energy today? Let\'s pace ourselves wisely.',
  },
  
  openingGuide: {
    name: 'Foundation',
    role: 'Opening Guide',
    personality: 'Methodical, patient with repetition, builds solid foundations.',
    speakingStyle: 'Step-by-step, encouraging with fundamentals.',
    expertise: ['opening principles', 'repertoire building', 'move orders', 'transpositions'],
    openingLine: 'Strong games are built on strong openings.',
  },
};

// ============================================
// SYSTEM PROMPTS
// ============================================

function buildSystemPrompt(agentId: string, context?: CoachingContext): string {
  const persona = AGENT_PERSONAS[agentId] || AGENT_PERSONAS.coach;
  
  return `You are ${persona.name}, the ${persona.role} in Zen Chess - a mindful chess improvement app.

PERSONALITY: ${persona.personality}

SPEAKING STYLE: ${persona.speakingStyle}

YOUR EXPERTISE: ${persona.expertise.join(', ')}

CORE PRINCIPLES:
- Chess improvement is a journey, not a destination
- Mistakes are teachers, not failures
- Mental state affects performance as much as knowledge
- Small, consistent practice beats sporadic intensity
- Every player's path is unique

RESPONSE GUIDELINES:
- Keep responses concise (2-4 sentences usually)
- Be warm but not saccharine
- Offer actionable insights when appropriate
- Ask thoughtful questions to understand the player
- Use your unique voice and metaphors
- Never be condescending or dismissive
- Celebrate effort, not just results
- If discussing chess positions, be specific but accessible

${context ? `
CURRENT USER CONTEXT:
- Rating: ${context.rating || 'Unknown'}
- Current streak: ${context.currentStreak || 0} days
- Recent performance: ${context.recentPerformance || 'Unknown'}
- Tilt level: ${context.tiltLevel || 0}/100
- Last game: ${context.lastGameResult || 'Unknown'}
- Puzzles today: ${context.puzzlesSolvedToday || 0}
- Session time: ${context.timeInSession || 0} minutes
` : ''}

Remember: You are not just teaching chess, you are nurturing a mindful approach to improvement and competition.`;
}

// ============================================
// MAIN API FUNCTIONS
// ============================================

export async function getAgentResponse(
  agentId: string,
  userMessage: string,
  conversationHistory: AgentMessage[] = [],
  context?: CoachingContext
): Promise<string> {
  const systemPrompt = buildSystemPrompt(agentId, context);
  
  // Build messages array for Claude
  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: userMessage },
  ];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: systemPrompt,
      messages,
    });

    // Extract text from response
    const textContent = response.content.find(block => block.type === 'text');
    return textContent?.text || 'I\'m here to help. Could you tell me more?';
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

// ============================================
// SPECIALIZED AGENT FUNCTIONS
// ============================================

/**
 * Get tilt intervention from the Tilt Guardian
 */
export async function getTiltIntervention(
  tiltLevel: number,
  recentEvents: string[],
  context?: CoachingContext
): Promise<string> {
  const prompt = `The player's tilt level is ${tiltLevel}/100. 
Recent events: ${recentEvents.join(', ')}.
Provide a brief, calming intervention appropriate to this tilt level.
${tiltLevel > 70 ? 'This is high tilt - strongly suggest a break.' : ''}
${tiltLevel > 40 && tiltLevel <= 70 ? 'This is moderate tilt - help them center.' : ''}
${tiltLevel <= 40 ? 'This is low/early tilt - gentle awareness.' : ''}`;

  return getAgentResponse('tiltGuardian', prompt, [], context);
}

/**
 * Get game analysis insight
 */
export async function getGameInsight(
  pgn: string,
  mistakes: string[],
  result: 'win' | 'loss' | 'draw',
  context?: CoachingContext
): Promise<string> {
  const prompt = `Analyze this game briefly:
Result: ${result}
Key mistakes/moments: ${mistakes.join(', ')}
PGN: ${pgn}

Provide one key insight and one encouragement. Keep it concise.`;

  return getAgentResponse('insightEngine', prompt, [], context);
}

/**
 * Get session recommendation
 */
export async function getSessionRecommendation(
  timeAvailable: number,
  energy: 'high' | 'medium' | 'low',
  lastActivity?: string,
  context?: CoachingContext
): Promise<string> {
  const prompt = `The player has ${timeAvailable} minutes and ${energy} energy.
${lastActivity ? `They last did: ${lastActivity}` : ''}
Suggest what they should focus on in this session.`;

  return getAgentResponse('sessionManager', prompt, [], context);
}

/**
 * Get motivational boost
 */
export async function getMotivation(
  situation: string,
  context?: CoachingContext
): Promise<string> {
  return getAgentResponse('motivator', situation, [], context);
}

/**
 * Get opening guidance
 */
export async function getOpeningGuidance(
  opening: string,
  question: string,
  context?: CoachingContext
): Promise<string> {
  const prompt = `Opening: ${opening}
Question: ${question}`;

  return getAgentResponse('openingGuide', prompt, [], context);
}

/**
 * Get mindfulness exercise
 */
export async function getMindfulnessExercise(
  situation: 'pre-game' | 'post-loss' | 'tilt' | 'focus' | 'general',
  duration: number, // minutes
  context?: CoachingContext
): Promise<string> {
  const prompt = `Provide a ${duration}-minute ${situation} mindfulness exercise for a chess player.
Keep it simple and practical. Include breathing if appropriate.`;

  return getAgentResponse('mindfulness', prompt, [], context);
}

// ============================================
// STREAMING SUPPORT (for real-time responses)
// ============================================

export async function* streamAgentResponse(
  agentId: string,
  userMessage: string,
  conversationHistory: AgentMessage[] = [],
  context?: CoachingContext
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = buildSystemPrompt(agentId, context);
  
  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: userMessage },
  ];

  try {
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: systemPrompt,
      messages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  } catch (error) {
    console.error('Claude streaming error:', error);
    throw error;
  }
}

// ============================================
// EXPORT DEFAULT PERSONAS
// ============================================

export { AGENT_PERSONAS as personas };


