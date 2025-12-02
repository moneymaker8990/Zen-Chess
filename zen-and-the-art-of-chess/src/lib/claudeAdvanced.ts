// ============================================
// ADVANCED CLAUDE AI FEATURES
// Cutting-edge AI coaching that blows the competition away
// ============================================

import Anthropic from '@anthropic-ai/sdk';
import { AGENT_PERSONAS, type CoachingContext, type AgentMessage } from './claude';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ============================================
// 1. REAL-TIME POSITION ANALYSIS
// Analyze any chess position with deep AI insights
// ============================================

export interface PositionAnalysis {
  evaluation: string;
  bestMoves: string[];
  strategicIdeas: string[];
  tacticalThemes: string[];
  planForWhite: string;
  planForBlack: string;
  criticalSquares: string[];
  weaknesses: { white: string[]; black: string[] };
  middleGamePlan: string;
  endgameConsiderations: string;
}

export async function analyzePosition(
  fen: string,
  playerColor: 'white' | 'black',
  context?: CoachingContext
): Promise<PositionAnalysis> {
  const prompt = `Analyze this chess position from the perspective of ${playerColor}.
FEN: ${fen}

Provide a JSON response with this exact structure:
{
  "evaluation": "Brief evaluation (e.g., 'Slight advantage for white')",
  "bestMoves": ["Top 3 candidate moves with brief explanations"],
  "strategicIdeas": ["Key strategic concepts at play"],
  "tacticalThemes": ["Any tactical motifs present"],
  "planForWhite": "Recommended plan for white",
  "planForBlack": "Recommended plan for black",
  "criticalSquares": ["Important squares to control"],
  "weaknesses": { "white": ["White's weaknesses"], "black": ["Black's weaknesses"] },
  "middleGamePlan": "How to handle the middlegame",
  "endgameConsiderations": "What to keep in mind for the endgame"
}

Be specific and instructive. This is for a ${context?.rating || 1200} rated player.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse position analysis:', e);
  }

  // Fallback response
  return {
    evaluation: 'Analysis in progress...',
    bestMoves: [],
    strategicIdeas: [],
    tacticalThemes: [],
    planForWhite: '',
    planForBlack: '',
    criticalSquares: [],
    weaknesses: { white: [], black: [] },
    middleGamePlan: '',
    endgameConsiderations: '',
  };
}

// ============================================
// 2. AI-GENERATED PERSONALIZED STUDY PLAN
// Weekly study plans tailored to your weaknesses
// ============================================

export interface StudyPlanDay {
  day: string;
  focus: string;
  activities: {
    type: 'puzzles' | 'games' | 'openings' | 'endgames' | 'analysis' | 'mindfulness' | 'theory';
    duration: number; // minutes
    description: string;
    goal: string;
  }[];
  mindfulnessExercise?: string;
  motivationalQuote?: string;
}

export interface WeeklyStudyPlan {
  weekNumber: number;
  theme: string;
  goals: string[];
  days: StudyPlanDay[];
  weeklyChallenge: string;
  expectedOutcomes: string[];
}

export async function generateWeeklyStudyPlan(
  playerProfile: {
    rating: number;
    weaknesses: string[];
    strengths: string[];
    timePerDay: number; // minutes
    goals: string[];
    recentPerformance: 'improving' | 'stable' | 'struggling';
    preferredOpenings?: string[];
  }
): Promise<WeeklyStudyPlan> {
  const prompt = `Create a personalized weekly chess study plan for this player:

PLAYER PROFILE:
- Rating: ${playerProfile.rating}
- Weaknesses: ${playerProfile.weaknesses.join(', ')}
- Strengths: ${playerProfile.strengths.join(', ')}
- Available time: ${playerProfile.timePerDay} minutes per day
- Goals: ${playerProfile.goals.join(', ')}
- Recent performance: ${playerProfile.recentPerformance}
${playerProfile.preferredOpenings ? `- Preferred openings: ${playerProfile.preferredOpenings.join(', ')}` : ''}

Create a 7-day study plan in this JSON format:
{
  "weekNumber": 1,
  "theme": "Theme for this week",
  "goals": ["3-4 specific measurable goals"],
  "days": [
    {
      "day": "Monday",
      "focus": "Main focus area",
      "activities": [
        {
          "type": "puzzles",
          "duration": 20,
          "description": "What to do",
          "goal": "Specific goal"
        }
      ],
      "mindfulnessExercise": "Brief exercise description",
      "motivationalQuote": "Inspiring chess quote"
    }
  ],
  "weeklyChallenge": "One challenge for the week",
  "expectedOutcomes": ["What the player should achieve"]
}

Make it specific, achievable, and balanced between tactics, strategy, and mental training.
Focus extra attention on their weaknesses while reinforcing strengths.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse study plan:', e);
  }

  // Return a default plan
  return {
    weekNumber: 1,
    theme: 'Foundation Building',
    goals: ['Complete daily puzzles', 'Review one game', 'Practice openings'],
    days: [],
    weeklyChallenge: 'Play 3 games with full focus',
    expectedOutcomes: ['Improved tactical awareness'],
  };
}

// ============================================
// 3. LIVE GAME COMMENTARY
// Real-time AI commentary during games
// ============================================

export interface GameCommentary {
  moveEvaluation: 'excellent' | 'good' | 'interesting' | 'inaccuracy' | 'mistake' | 'blunder';
  commentary: string;
  alternativeIdea?: string;
  positionNature: string;
  emotionalGuidance?: string;
}

export async function getGameCommentary(
  fen: string,
  lastMove: string,
  moveNumber: number,
  playerColor: 'white' | 'black',
  gamePhase: 'opening' | 'middlegame' | 'endgame',
  context?: CoachingContext
): Promise<GameCommentary> {
  const tiltAwareness = context?.tiltLevel && context.tiltLevel > 50 
    ? '\nThe player may be tilting - be encouraging and calming.' 
    : '';

  const prompt = `Provide live commentary for this chess move:

Position (FEN): ${fen}
Last move played: ${lastMove}
Move number: ${moveNumber}
Player color: ${playerColor}
Game phase: ${gamePhase}
${tiltAwareness}

Respond in JSON format:
{
  "moveEvaluation": "excellent|good|interesting|inaccuracy|mistake|blunder",
  "commentary": "Brief, engaging commentary (1-2 sentences, like a friendly coach)",
  "alternativeIdea": "If relevant, suggest what else could have been considered",
  "positionNature": "Brief description of position character",
  "emotionalGuidance": "If player seems to need it, add emotional support"
}

Be encouraging but honest. Sound like Magnus Carlsen commenting mixed with a zen master.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse commentary:', e);
  }

  return {
    moveEvaluation: 'interesting',
    commentary: 'The game continues...',
    positionNature: 'Complex position',
  };
}

// ============================================
// 4. PSYCHOLOGICAL PROFILING
// Track and adapt to player's emotional patterns
// ============================================

export interface PsychologicalProfile {
  playStyle: 'aggressive' | 'positional' | 'tactical' | 'defensive' | 'universal';
  tiltTriggers: string[];
  peakPerformanceConditions: string[];
  mentalStrengths: string[];
  areasForGrowth: string[];
  recommendedCoachingApproach: string;
  emotionalPatterns: {
    afterWin: string;
    afterLoss: string;
    duringWinningPosition: string;
    duringLosingPosition: string;
  };
  personalizedTips: string[];
}

export async function analyzePlayerPsychology(
  gameHistory: {
    result: 'win' | 'loss' | 'draw';
    moveCount: number;
    timeUsed: number;
    blunders: number;
    wasOnTilt: boolean;
  }[],
  puzzlePerformance: {
    streak: number;
    accuracy: number;
    avgSolveTime: number;
  },
  sessionPatterns: {
    preferredTime: string;
    avgSessionLength: number;
    breakFrequency: number;
  }
): Promise<PsychologicalProfile> {
  const prompt = `Analyze this chess player's psychological profile based on their data:

GAME HISTORY (last 20 games):
${JSON.stringify(gameHistory, null, 2)}

PUZZLE PERFORMANCE:
${JSON.stringify(puzzlePerformance, null, 2)}

SESSION PATTERNS:
${JSON.stringify(sessionPatterns, null, 2)}

Provide a psychological profile in JSON format:
{
  "playStyle": "aggressive|positional|tactical|defensive|universal",
  "tiltTriggers": ["What causes them to tilt"],
  "peakPerformanceConditions": ["When they play best"],
  "mentalStrengths": ["Their psychological strengths"],
  "areasForGrowth": ["Areas to develop mentally"],
  "recommendedCoachingApproach": "How to best coach this player",
  "emotionalPatterns": {
    "afterWin": "How they typically respond",
    "afterLoss": "How they typically respond",
    "duringWinningPosition": "Behavioral pattern",
    "duringLosingPosition": "Behavioral pattern"
  },
  "personalizedTips": ["5 specific tips for this player"]
}

Be insightful and specific. This helps personalize their entire experience.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse psychological profile:', e);
  }

  return {
    playStyle: 'universal',
    tiltTriggers: [],
    peakPerformanceConditions: [],
    mentalStrengths: [],
    areasForGrowth: [],
    recommendedCoachingApproach: 'Balanced and encouraging',
    emotionalPatterns: {
      afterWin: 'Unknown',
      afterLoss: 'Unknown',
      duringWinningPosition: 'Unknown',
      duringLosingPosition: 'Unknown',
    },
    personalizedTips: [],
  };
}

// ============================================
// 5. AI-POWERED GAME REVIEW
// Interactive game analysis with Q&A
// ============================================

export interface GameReview {
  overallAssessment: string;
  keyMoments: {
    moveNumber: number;
    position: string;
    whatHappened: string;
    whatShouldHave: string;
    lesson: string;
  }[];
  openingAssessment: string;
  middlegameAssessment: string;
  endgameAssessment: string;
  patterns: string[];
  improvementAreas: string[];
  celebrateThis: string[];
  oneThingToRemember: string;
}

export async function analyzeGame(
  pgn: string,
  playerColor: 'white' | 'black',
  result: 'win' | 'loss' | 'draw',
  context?: CoachingContext
): Promise<GameReview> {
  const prompt = `Analyze this chess game as a supportive coach:

PGN: ${pgn}
Player color: ${playerColor}
Result: ${result}
Player rating: ${context?.rating || 'Unknown'}

Provide a comprehensive review in JSON format:
{
  "overallAssessment": "2-3 sentence overall assessment",
  "keyMoments": [
    {
      "moveNumber": 15,
      "position": "Brief position description",
      "whatHappened": "What the player did",
      "whatShouldHave": "Better alternative",
      "lesson": "Key takeaway"
    }
  ],
  "openingAssessment": "How the opening went",
  "middlegameAssessment": "Middlegame quality",
  "endgameAssessment": "Endgame handling (if applicable)",
  "patterns": ["Recurring patterns noticed"],
  "improvementAreas": ["2-3 specific areas to work on"],
  "celebrateThis": ["What the player did well"],
  "oneThingToRemember": "Single most important lesson from this game"
}

Be specific, constructive, and encouraging. Focus on teaching, not judging.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse game review:', e);
  }

  return {
    overallAssessment: 'Game analysis in progress...',
    keyMoments: [],
    openingAssessment: '',
    middlegameAssessment: '',
    endgameAssessment: '',
    patterns: [],
    improvementAreas: [],
    celebrateThis: [],
    oneThingToRemember: '',
  };
}

// ============================================
// 6. SMART PROACTIVE INTERVENTIONS
// AI decides when to offer help
// ============================================

export type InterventionType = 
  | 'tilt_warning'
  | 'break_suggestion'
  | 'encouragement'
  | 'focus_reminder'
  | 'celebration'
  | 'pattern_insight'
  | 'strategic_tip'
  | 'mindfulness_prompt';

export interface ProactiveIntervention {
  shouldIntervene: boolean;
  type: InterventionType;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  suggestedAction?: string;
  agent: string; // Which agent should deliver this
}

export async function checkForIntervention(
  sessionData: {
    timeInSession: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    currentStreak: number; // positive = wins, negative = losses
    puzzleAccuracy: number;
    lastActivity: string;
    tiltLevel: number;
    focusScore: number; // 0-100
    missedTactics: number;
  }
): Promise<ProactiveIntervention> {
  const prompt = `Based on this chess session data, decide if the AI coach should proactively intervene:

SESSION DATA:
- Time in session: ${sessionData.timeInSession} minutes
- Games played: ${sessionData.gamesPlayed}
- Win/Loss: ${sessionData.wins}/${sessionData.losses}
- Current streak: ${sessionData.currentStreak} (positive=wins, negative=losses)
- Puzzle accuracy: ${sessionData.puzzleAccuracy}%
- Last activity: ${sessionData.lastActivity}
- Tilt level: ${sessionData.tiltLevel}/100
- Focus score: ${sessionData.focusScore}/100
- Missed tactics in games: ${sessionData.missedTactics}

Should the AI coach intervene? Respond in JSON:
{
  "shouldIntervene": true/false,
  "type": "tilt_warning|break_suggestion|encouragement|focus_reminder|celebration|pattern_insight|strategic_tip|mindfulness_prompt",
  "message": "The actual message to show the player (2-3 sentences, warm and helpful)",
  "priority": "low|medium|high|urgent",
  "suggestedAction": "Optional: specific action to suggest",
  "agent": "Which agent persona should deliver this (coach/tiltGuardian/motivator/etc)"
}

Only intervene when truly helpful. Don't interrupt unnecessarily.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse intervention:', e);
  }

  return {
    shouldIntervene: false,
    type: 'encouragement',
    message: '',
    priority: 'low',
    agent: 'coach',
  };
}

// ============================================
// 7. DAILY MOTIVATION & WISDOM
// Personalized daily messages
// ============================================

export interface DailyMessage {
  greeting: string;
  wisdom: string;
  challenge: string;
  focusArea: string;
  affirmation: string;
}

export async function getDailyMessage(
  playerName: string,
  dayOfWeek: string,
  recentActivity: {
    lastPlayedDaysAgo: number;
    currentStreak: number;
    recentPerformance: 'improving' | 'stable' | 'struggling';
    lastSessionHighlight?: string;
  }
): Promise<DailyMessage> {
  const prompt = `Create a personalized daily message for this chess student:

Player: ${playerName}
Day: ${dayOfWeek}
Last played: ${recentActivity.lastPlayedDaysAgo} days ago
Current streak: ${recentActivity.currentStreak} days
Recent performance: ${recentActivity.recentPerformance}
${recentActivity.lastSessionHighlight ? `Last session highlight: ${recentActivity.lastSessionHighlight}` : ''}

Create an inspiring message in JSON format:
{
  "greeting": "Personalized greeting for this day/situation",
  "wisdom": "A chess or zen wisdom quote (can be from famous players or original)",
  "challenge": "A small challenge for today",
  "focusArea": "One thing to focus on today",
  "affirmation": "An encouraging affirmation"
}

Make it feel personal, warm, and motivating. Not generic.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse daily message:', e);
  }

  return {
    greeting: `Good ${dayOfWeek}, champion.`,
    wisdom: 'Every master was once a disaster.',
    challenge: 'Solve 5 puzzles with full focus.',
    focusArea: 'Pattern recognition',
    affirmation: 'You are improving with every move.',
  };
}

// ============================================
// 8. MOVE EXPLANATION
// Explain any move in plain English
// ============================================

export async function explainMove(
  fen: string,
  move: string,
  context?: { playerRating?: number; openingName?: string }
): Promise<string> {
  const prompt = `Explain this chess move in plain, instructive English:

Position (FEN): ${fen}
Move: ${move}
${context?.openingName ? `Opening: ${context.openingName}` : ''}
Player level: ${context?.playerRating ? `~${context.playerRating}` : 'intermediate'}

Explain:
1. What this move accomplishes strategically/tactically
2. What threats it creates or prevents
3. Why it's the right moment for this move
4. Any key ideas to remember

Keep it conversational and educational (3-5 sentences).`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' 
    ? response.content[0].text 
    : 'This move develops the position...';
}

// ============================================
// 9. WEAKNESS DETECTION
// Analyze games to find patterns in mistakes
// ============================================

export interface WeaknessAnalysis {
  topWeaknesses: {
    area: string;
    frequency: string;
    examples: string[];
    howToImprove: string;
  }[];
  underratedStrengths: string[];
  suggestedFocus: string;
  customDrills: string[];
}

export async function analyzeWeaknesses(
  recentGames: {
    pgn: string;
    result: 'win' | 'loss' | 'draw';
    blunders: string[];
    missedTactics: string[];
  }[]
): Promise<WeaknessAnalysis> {
  const gamesData = recentGames.slice(0, 10).map((g, i) => ({
    game: i + 1,
    result: g.result,
    blunderCount: g.blunders.length,
    blunders: g.blunders.slice(0, 3),
    missedTactics: g.missedTactics.slice(0, 3),
  }));

  const prompt = `Analyze these recent chess games to identify weaknesses:

GAMES DATA:
${JSON.stringify(gamesData, null, 2)}

Identify patterns and provide analysis in JSON format:
{
  "topWeaknesses": [
    {
      "area": "Specific weakness (e.g., 'Knight endgames', 'Tactical blindness on dark squares')",
      "frequency": "How often this appears",
      "examples": ["Specific examples from games"],
      "howToImprove": "Concrete steps to improve"
    }
  ],
  "underratedStrengths": ["Things the player does well but might not realize"],
  "suggestedFocus": "Single most important area to focus on",
  "customDrills": ["Specific practice exercises tailored to their weaknesses"]
}

Be specific and actionable. These insights should feel personalized.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse weakness analysis:', e);
  }

  return {
    topWeaknesses: [],
    underratedStrengths: [],
    suggestedFocus: 'Tactical awareness',
    customDrills: [],
  };
}

// ============================================
// 10. CONNECTION TEST
// Verify Claude API is working
// ============================================

export async function testClaudeConnection(): Promise<{
  connected: boolean;
  latency: number;
  model: string;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 50,
      messages: [{ 
        role: 'user', 
        content: 'Respond with only: "Zen Chess AI Ready" and nothing else.' 
      }],
    });

    const latency = Date.now() - startTime;
    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return {
      connected: text.includes('Ready') || text.includes('Zen'),
      latency,
      model: response.model,
    };
  } catch (error) {
    return {
      connected: false,
      latency: Date.now() - startTime,
      model: 'unknown',
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

