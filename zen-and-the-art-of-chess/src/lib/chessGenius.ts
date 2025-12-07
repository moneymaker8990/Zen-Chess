// ============================================
// CHESS GENIUS ENGINE
// Genius-level AI insights for every interaction
// ============================================

import Anthropic from '@anthropic-ai/sdk';
import type { Square } from 'chess.js';
import { logger } from './logger';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ============================================
// TYPES
// ============================================

export interface PositionInsight {
  evaluation: 'winning' | 'better' | 'equal' | 'worse' | 'losing';
  keyIdeas: string[];
  candidateMoves: Array<{
    move: string;
    reason: string;
    depth: 'surface' | 'deep' | 'genius';
  }>;
  threats: string[];
  planForBoth: {
    white: string;
    black: string;
  };
  tacticalMotifs: string[];
  positionalThemes: string[];
}

export interface MoveExplanation {
  move: string;
  whyGood: string;
  whatItDoes: string;
  alternatives: Array<{ move: string; tradeoff: string }>;
  conceptConnection: string; // Connects to broader chess concepts
  geniusInsight: string; // The "aha!" moment
}

export interface PuzzleGeniusInsight {
  theme: string;
  whyThisWorks: string;
  patternToRemember: string;
  howToSpotThis: string;
  relatedPatterns: string[];
  masterGameExample?: string;
  practiceAdvice: string;
}

export interface OpeningInsight {
  name: string;
  mainIdeas: string[];
  typicalPawnStructure: string;
  middlegamePlans: string[];
  commonMistakes: string[];
  legendWhoPlayedThis: string;
  whyLearnThis: string;
}

export interface GeniusWhisper {
  type: 'tip' | 'encouragement' | 'warning' | 'insight' | 'question';
  content: string;
  context: string;
  actionable?: string;
  priority: 'low' | 'medium' | 'high';
}

// ============================================
// GENIUS SYSTEM PROMPT
// ============================================

const GENIUS_SYSTEM_PROMPT = `You are the Chess Genius - an AI with the knowledge of all grandmasters combined, but with the patience and clarity of the greatest teachers.

Your role is to provide INSIGHT, not just information. Every response should create an "aha!" moment.

PRINCIPLES:
1. DEPTH OVER BREADTH - One profound insight beats ten surface observations
2. CONNECTIONS - Always connect specific moments to universal chess principles
3. PATTERNS - Help the player see patterns they can apply elsewhere
4. ECONOMY - Say more with less. No filler words.
5. WONDER - Chess is beautiful. Help players see that beauty.

VOICE:
- Direct but warm
- Confident but never condescending
- Specific and concrete
- Uses vivid metaphors when they clarify
- Celebrates the beauty of chess

REMEMBER: You're not just teaching moves - you're training intuition.`;

// ============================================
// POSITION ANALYSIS
// ============================================

export async function analyzePosition(
  fen: string,
  options: {
    depth?: 'quick' | 'standard' | 'deep';
    focus?: 'tactics' | 'strategy' | 'both';
    playerColor?: 'white' | 'black';
  } = {}
): Promise<PositionInsight> {
  const { depth = 'standard', focus = 'both', playerColor } = options;
  
  const prompt = `Analyze this chess position (FEN: ${fen})
  
Provide a ${depth} analysis focusing on ${focus}.
${playerColor ? `Analyze primarily from ${playerColor}'s perspective.` : ''}

Return a JSON object with:
{
  "evaluation": "winning|better|equal|worse|losing",
  "keyIdeas": ["max 3 key ideas for the position"],
  "candidateMoves": [
    {"move": "algebraic notation", "reason": "why this move", "depth": "surface|deep|genius"}
  ],
  "threats": ["immediate threats to watch"],
  "planForBoth": {
    "white": "what white wants to do",
    "black": "what black wants to do"
  },
  "tacticalMotifs": ["any tactical patterns present"],
  "positionalThemes": ["key positional factors"]
}

Be specific, insightful, and help the player truly understand the position.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as PositionInsight;
    }
    
    throw new Error('Could not parse position analysis');
  } catch (error) {
    logger.error('Position analysis error:', error);
    throw error;
  }
}

// ============================================
// MOVE EXPLANATION
// ============================================

export async function explainMove(
  fen: string,
  move: string,
  context: {
    isCorrect?: boolean;
    isPuzzle?: boolean;
    puzzleTheme?: string;
    userMove?: string;
  } = {}
): Promise<MoveExplanation> {
  const { isCorrect, isPuzzle, puzzleTheme, userMove } = context;
  
  let prompt = `Position (FEN): ${fen}
Move played: ${move}`;

  if (isPuzzle && puzzleTheme) {
    prompt += `\nThis is a puzzle with theme: ${puzzleTheme}`;
  }
  
  if (userMove && userMove !== move) {
    prompt += `\nThe player tried: ${userMove} but the correct move was ${move}. Explain why their move doesn't work and why the correct move is better.`;
  }

  prompt += `

Explain this move with genius-level insight. Return JSON:
{
  "move": "${move}",
  "whyGood": "The core reason this move works",
  "whatItDoes": "Concrete effects of the move",
  "alternatives": [
    {"move": "alternative", "tradeoff": "why it's not as good"}
  ],
  "conceptConnection": "How this connects to broader chess understanding",
  "geniusInsight": "The 'aha!' insight that makes this click"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as MoveExplanation;
    }
    
    throw new Error('Could not parse move explanation');
  } catch (error) {
    logger.error('Move explanation error:', error);
    throw error;
  }
}

// ============================================
// PUZZLE GENIUS INSIGHTS
// ============================================

export async function getPuzzleGeniusInsight(
  fen: string,
  solution: string[],
  themes: string[],
  userSolved: boolean,
  timeTaken: number
): Promise<PuzzleGeniusInsight> {
  const prompt = `Chess puzzle analysis:
Position (FEN): ${fen}
Solution: ${solution.join(' ')}
Themes: ${themes.join(', ')}
Player ${userSolved ? 'solved it' : 'struggled with it'} in ${timeTaken} seconds.

Provide a genius-level breakdown that helps the player truly internalize this pattern:

{
  "theme": "The core tactical theme",
  "whyThisWorks": "Deep explanation of WHY the combination works",
  "patternToRemember": "The visual/conceptual pattern to store in memory",
  "howToSpotThis": "How to recognize this pattern in future games",
  "relatedPatterns": ["Other patterns that use similar ideas"],
  "masterGameExample": "A famous game where this pattern appeared (if applicable)",
  "practiceAdvice": "Specific advice for this player based on their attempt"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as PuzzleGeniusInsight;
    }
    
    throw new Error('Could not parse puzzle insight');
  } catch (error) {
    logger.error('Puzzle insight error:', error);
    throw error;
  }
}

// ============================================
// CONTEXTUAL WHISPERS
// ============================================

export async function getContextualWhisper(
  context: {
    currentActivity: 'puzzle' | 'game' | 'opening' | 'study' | 'idle';
    recentEvents: string[];
    userState: {
      streak?: number;
      accuracy?: number;
      tiltLevel?: number;
      timeInSession?: number;
      lastMistakeType?: string;
    };
    position?: string;
  }
): Promise<GeniusWhisper | null> {
  const { currentActivity, recentEvents, userState, position } = context;
  
  // Very rare whispers - only if really needed
  const shouldWhisper = Math.random() > 0.9; // Only 10% chance
  
  if (!shouldWhisper) {
    return null;
  }

  const prompt = `Generate a brief, practical chess tip (or return null - prefer null).

Context:
- Activity: ${currentActivity}
- Recent events: ${recentEvents.join(', ')}
${position ? `- Current position (FEN): ${position}` : ''}

Rules:
- Return {"shouldWhisper": false} 90% of the time - err on the side of silence
- NO motivational quotes or encouragement
- NO "zen" philosophy or breathing reminders
- NO emotional advice like "don't get frustrated"
- ONLY speak if you have a concrete chess insight
- Keep it short and factual

Return JSON:
{
  "shouldWhisper": false
}

OR if you have something truly useful:
{
  "shouldWhisper": true,
  "type": "tip|insight",
  "content": "Concrete chess advice",
  "context": "Brief reason",
  "priority": "low"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      if (result.shouldWhisper === false) return null;
      return result as GeniusWhisper;
    }
    
    return null;
  } catch (error) {
    logger.warn('Whisper error:', error);
    return null;
  }
}

// ============================================
// QUICK ANALYSIS (for real-time use)
// ============================================

export async function getQuickInsight(
  fen: string,
  question: string
): Promise<string> {
  const prompt = `Position (FEN): ${fen}
Question: ${question}

Give a concise, insightful answer (2-3 sentences max). Be specific to the position.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return text;
  } catch (error) {
    logger.error('Quick insight error:', error);
    throw error;
  }
}

// ============================================
// OPENING INSIGHTS
// ============================================

export async function getOpeningInsight(
  openingName: string,
  moves: string[],
  fen: string
): Promise<OpeningInsight> {
  const prompt = `Opening: ${openingName}
Moves so far: ${moves.join(' ')}
Current position (FEN): ${fen}

Provide a comprehensive but concise opening insight:

{
  "name": "${openingName}",
  "mainIdeas": ["The 2-3 key strategic ideas"],
  "typicalPawnStructure": "Describe the pawn structure and its implications",
  "middlegamePlans": ["Typical plans for both sides"],
  "commonMistakes": ["Mistakes to avoid"],
  "legendWhoPlayedThis": "A famous player known for this opening",
  "whyLearnThis": "What this opening teaches about chess"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as OpeningInsight;
    }
    
    throw new Error('Could not parse opening insight');
  } catch (error) {
    logger.error('Opening insight error:', error);
    throw error;
  }
}

// ============================================
// MISTAKE ANALYSIS
// ============================================

export async function analyzeMistake(
  fen: string,
  wrongMove: string,
  correctMove: string,
  context: {
    puzzleTheme?: string;
    mistakeType?: 'tactical' | 'positional' | 'time' | 'unknown';
    previousMistakes?: string[];
  } = {}
): Promise<{
  whyWrong: string;
  whyCorrect: string;
  pattern: string;
  prevention: string;
  encouragement: string;
}> {
  const prompt = `Mistake analysis:
Position (FEN): ${fen}
Wrong move: ${wrongMove}
Correct move: ${correctMove}
${context.puzzleTheme ? `Theme: ${context.puzzleTheme}` : ''}
${context.mistakeType ? `Mistake type: ${context.mistakeType}` : ''}
${context.previousMistakes?.length ? `Recent similar mistakes: ${context.previousMistakes.join(', ')}` : ''}

Analyze this mistake with empathy and insight:

{
  "whyWrong": "What the player likely missed or miscalculated",
  "whyCorrect": "Why the correct move works better",
  "pattern": "The pattern or concept to internalize",
  "prevention": "How to avoid this mistake in the future",
  "encouragement": "Warm, genuine encouragement"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse mistake analysis');
  } catch (error) {
    logger.error('Mistake analysis error:', error);
    throw error;
  }
}

// ============================================
// STREAMING ANALYSIS (for long-form content)
// ============================================

export async function* streamGeniusAnalysis(
  type: 'position' | 'game' | 'opening',
  content: string
): AsyncGenerator<string, void, unknown> {
  const prompts: Record<typeof type, string> = {
    position: `Provide a detailed, insightful analysis of this position (FEN: ${content}). Explain the strategic and tactical elements as if teaching a dedicated student who wants to truly understand chess.`,
    game: `Analyze this game (PGN: ${content}). Focus on the key moments, the plans, the mistakes, and what we can learn. Be insightful, not just descriptive.`,
    opening: `Teach this opening (${content}) comprehensively. Cover the ideas, the variations, the traps, and how it connects to broader chess understanding.`,
  };

  try {
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: GENIUS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompts[type] }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  } catch (error) {
    logger.error('Streaming analysis error:', error);
    throw error;
  }
}

