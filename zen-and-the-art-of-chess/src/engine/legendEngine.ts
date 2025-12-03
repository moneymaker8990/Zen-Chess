// ============================================
// PLAY THE GREATS - LEGEND ENGINE
// 
// Each legend feels like a real person with their unique playing style,
// opening preferences, and personality. No two games should feel the same.
//
// Key features:
// - Real opening book moves with weighted variety
// - Position database with personality-based selection
// - Distinctive style biases for engine fallback
// - Human-like variance and "mood" effects
// ============================================

import { getHumanizedMove, BotLevel, getEngineCandidatesWithFeatures } from './humanizedStockfish';
import { type LegendId, type OpeningBookNode, type LegendPositionIndex, LEGEND_STYLES } from '@/lib/legendTypes';

// File paths (relative to public folder for browser)
const LEGENDS_DATA_PREFIX = '/data/legends';

// In-memory caches
let openingBooks: Partial<Record<LegendId, OpeningBookNode[]>> = {};
let positionIndices: Partial<Record<LegendId, LegendPositionIndex>> = {};
const missingFileWarnings = new Set<string>();

// Session-based "mood" for each legend - affects their play style slightly
// This makes each game feel different even with the same opening
const legendMoods: Partial<Record<LegendId, {
  aggressivenessModifier: number;  // -0.2 to +0.2
  experimentalModifier: number;    // -0.1 to +0.3 (higher = more likely to try sidelines)
  timestamp: number;
}>> = {};

// Generate a "mood" for this session that adds human-like variance
function getLegendMood(legend: LegendId): { aggMod: number; expMod: number } {
  const now = Date.now();
  const cached = legendMoods[legend];
  
  // Mood lasts for 30 minutes
  if (cached && (now - cached.timestamp) < 30 * 60 * 1000) {
    return { aggMod: cached.aggressivenessModifier, expMod: cached.experimentalModifier };
  }
  
  // Generate new mood based on legend personality
  const style = LEGEND_STYLES[legend];
  
  // More aggressive legends have more mood swings
  const moodVariance = 0.15 + style.aggressiveness * 0.1;
  const aggMod = (Math.random() - 0.5) * 2 * moodVariance;
  
  // Some legends are more experimental than others
  // Tal, Alekhine more likely to experiment; Capablanca, Karpov more consistent
  const experimentalBase = getExperimentalBase(legend);
  const expMod = experimentalBase + (Math.random() - 0.3) * 0.2;
  
  legendMoods[legend] = {
    aggressivenessModifier: aggMod,
    experimentalModifier: Math.max(0, Math.min(0.35, expMod)),
    timestamp: now,
  };
  
  return { aggMod, expMod };
}

// How likely each legend is to try sideline moves
function getExperimentalBase(legend: LegendId): number {
  const experimentalness: Record<LegendId, number> = {
    tal: 0.25,          // The Magician loved surprises
    alekhine: 0.20,     // Creative and unpredictable
    morphy: 0.18,       // Would try romantic lines
    kasparov: 0.15,     // Deep prep but sometimes surprising
    fischer: 0.10,      // Principled but could surprise
    spassky: 0.12,      // Universal, could play anything
    lasker: 0.15,       // Psychological, adapted to opponent
    carlsen: 0.12,      // Varies his openings a lot
    steinitz: 0.08,     // Principled, systematic
    botvinnik: 0.08,    // Methodical, prepared
    capablanca: 0.05,   // Played the "simple" best moves
    karpov: 0.05,       // Very consistent repertoire
  };
  return experimentalness[legend] ?? 0.1;
}

// Load data from JSON files
async function loadOpeningBook(legend: LegendId): Promise<OpeningBookNode[]> {
  if (openingBooks[legend]) return openingBooks[legend]!;
  
  try {
    const response = await fetch(`${LEGENDS_DATA_PREFIX}/legend-${legend}-opening-book.json`);
    if (!response.ok) return [];
    const text = await response.text();
    if (text.trim().startsWith('<!')) {
      const warningKey = `opening-book-${legend}`;
      if (!missingFileWarnings.has(warningKey)) {
        console.warn(`Opening book file for ${legend} not found.`);
        missingFileWarnings.add(warningKey);
      }
      return [];
    }
    const data = JSON.parse(text) as OpeningBookNode[];
    openingBooks[legend] = data;
    console.log(`[${legend}] Loaded opening book: ${data.length} positions`);
    return data;
  } catch (err) {
    return [];
  }
}

async function loadPositionIndex(legend: LegendId): Promise<LegendPositionIndex> {
  if (positionIndices[legend]) {
    return positionIndices[legend]!;
  }
  
  try {
    const url = `${LEGENDS_DATA_PREFIX}/legend-${legend}-positions.json`;
    const response = await fetch(url);
    if (!response.ok) return {};
    const text = await response.text();
    if (text.trim().startsWith('<!')) {
      const warningKey = `position-index-${legend}`;
      if (!missingFileWarnings.has(warningKey)) {
        console.warn(`Position index file for ${legend} not found.`);
        missingFileWarnings.add(warningKey);
      }
      return {};
    }
    const data = JSON.parse(text) as LegendPositionIndex;
    positionIndices[legend] = data;
    console.log(`[${legend}] Loaded position index: ${Object.keys(data).length} unique positions`);
    return data;
  } catch (err) {
    return {};
  }
}

function getFullmoveNumberFromFen(fen: string): number {
  const parts = fen.trim().split(/\s+/);
  if (parts.length < 6) return 1;
  const n = parseInt(parts[5], 10);
  return Number.isNaN(n) ? 1 : n;
}

/**
 * Enhanced weighted selection with personality-based variance
 * Unlike pure weighted random, this:
 * 1. Respects the legend's most common choices
 * 2. Adds human-like exploration based on their personality
 * 3. Occasionally picks surprising moves like real humans do
 */
function pickWithPersonality<T extends { count?: number }>(
  items: T[],
  legend: LegendId,
  getCount: (item: T) => number
): T | null {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];
  
  const { expMod } = getLegendMood(legend);
  
  // Get total count for normalization
  const counts = items.map(getCount);
  const total = counts.reduce((sum, c) => sum + c, 0);
  
  if (total <= 0) return items[0];
  
  // Calculate weights with personality adjustments
  const weights = counts.map((count, idx) => {
    const baseWeight = count / total;
    
    // Add exploration bonus to less common moves
    // More experimental legends boost sidelines more
    const isMainLine = baseWeight > 0.4;
    const isSideline = baseWeight < 0.15 && baseWeight > 0.02;
    
    if (isMainLine) {
      // Slightly reduce main line weight for variety
      return count * (1 - expMod * 0.5);
    } else if (isSideline) {
      // Boost sidelines based on experimental modifier
      return count * (1 + expMod * 3);
    }
    return count;
  });
  
  // Small chance (based on personality) to pick a truly random move
  // This creates those "what was that?" moments that real players have
  if (Math.random() < expMod * 0.3 && items.length > 2) {
    const randomIdx = Math.floor(Math.random() * Math.min(5, items.length));
    return items[randomIdx];
  }
  
  // Weighted random selection with adjusted weights
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let r = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  
  return items[items.length - 1];
}

// Get opening book move with personality-based variety
async function getLegendBookMove(fen: string, legend: LegendId): Promise<string | null> {
  const book = await loadOpeningBook(legend);
  const candidates = book.filter((b) => b.fen === fen);
  
  if (candidates.length === 0) return null;
  
  // Sort by count descending for logging
  candidates.sort((a, b) => b.count - a.count);
  
  // Log available options for debugging
  if (candidates.length > 1) {
    console.log(`[${legend}] Opening book options:`, 
      candidates.slice(0, 3).map(c => `${c.move}(${c.count})`).join(', '));
  }
  
  const picked = pickWithPersonality(candidates, legend, c => c.count);
  return picked ? picked.move : null;
}

// Get their real move from a known position with variety
async function getLegendDbMove(fen: string, legend: LegendId): Promise<string | null> {
  const index = await loadPositionIndex(legend);
  
  if (Object.keys(index).length === 0) {
    return null;
  }
  
  // Normalize FEN for comparison
  const normalizedFen = normalizeFenForComparison(fen);
  
  // Try exact match first
  let entries = index[fen];
  
  // If no exact match, try normalized match
  if (!entries || entries.length === 0) {
    for (const [posFen, posEntries] of Object.entries(index)) {
      if (normalizeFenForComparison(posFen) === normalizedFen) {
        entries = posEntries;
        break;
      }
    }
  }
  
  if (!entries || entries.length === 0) return null;

  // Group by move and count occurrences
  const moveToCount = new Map<string, number>();
  for (const entry of entries) {
    const prev = moveToCount.get(entry.move) ?? 0;
    moveToCount.set(entry.move, prev + 1);
  }

  // Convert to array format for personality-based selection
  const moveOptions = Array.from(moveToCount.entries()).map(([move, count]) => ({ move, count }));
  moveOptions.sort((a, b) => b.count - a.count);
  
  if (moveOptions.length > 1) {
    console.log(`[${legend}] Position database options:`,
      moveOptions.slice(0, 3).map(m => `${m.move}(${m.count})`).join(', '));
  }
  
  const picked = pickWithPersonality(moveOptions, legend, m => m.count);
  return picked?.move ?? null;
}

function normalizeFenForComparison(fen: string): string {
  const parts = fen.trim().split(/\s+/);
  return parts.slice(0, 4).join(' ');
}

// Find similar positions (transpositions)
async function findSimilarLegendMove(fen: string, legend: LegendId): Promise<string | null> {
  const index = await loadPositionIndex(legend);
  const targetNormalized = normalizeFenForComparison(fen);
  
  if (index[fen]) {
    return getLegendDbMove(fen, legend);
  }
  
  const allSimilarEntries: Array<{ move: string }> = [];
  for (const [posFen, entries] of Object.entries(index)) {
    if (!entries || !Array.isArray(entries)) continue;
    const normalized = normalizeFenForComparison(posFen);
    if (normalized === targetNormalized && entries.length > 0) {
      allSimilarEntries.push(...entries);
    }
  }
  
  if (allSimilarEntries.length === 0) return null;
  
  const moveToCount = new Map<string, number>();
  for (const entry of allSimilarEntries) {
    if (!entry?.move) continue;
    const prev = moveToCount.get(entry.move) ?? 0;
    moveToCount.set(entry.move, prev + 1);
  }
  
  const moveOptions = Array.from(moveToCount.entries()).map(([move, count]) => ({ move, count }));
  const picked = pickWithPersonality(moveOptions, legend, m => m.count);
  return picked?.move ?? null;
}

/**
 * Apply legend's distinctive playing style to engine candidates
 * Each legend has unique characteristics that affect their move selection:
 * 
 * - TAL: Wild sacrifices, loves chaos, doesn't care about material
 * - FISCHER: Perfect technique, principled, strong initiative
 * - CAPABLANCA: Simple, clear, endgame-oriented
 * - KASPAROV: Dynamic, loves the initiative, psychological pressure
 * - KARPOV: Prophylactic, restricting, boa constrictor
 * - etc.
 */
function applyLegendStyle(
  candidates: Array<{
    move: string;
    scoreCp: number;
    features: {
      isCapture: boolean;
      isCheck: boolean;
      changesMaterial: number;
      kingExposureChange: number;
      simplifies: boolean;
    };
  }>,
  legend: LegendId
): string {
  const style = LEGEND_STYLES[legend];
  const { aggMod, expMod } = getLegendMood(legend);
  
  // Effective style parameters with mood modifiers
  const effectiveAggression = Math.max(0, Math.min(1, style.aggressiveness + aggMod));
  
  // If there's a clearly winning move, most legends will play it
  // But the threshold varies by legend - Tal might ignore a small advantage
  // for a more interesting continuation
  const clearWinThreshold = legend === 'tal' ? 60 : legend === 'alekhine' ? 50 : 35;
  
  if (candidates.length >= 2) {
    const bestScore = candidates[0].scoreCp;
    const secondBest = candidates[1].scoreCp;
    if (bestScore - secondBest > clearWinThreshold) {
      // Strong players find the best move - but with personality-based variance
      const playBestChance = legend === 'capablanca' ? 0.98 
        : legend === 'karpov' ? 0.97 
        : legend === 'tal' ? 0.85  // Tal might play something "more interesting"
        : 0.93;
      
      if (Math.random() < playBestChance) {
        return candidates[0].move;
      }
    }
  }
  
  // Apply legend-specific style preferences
  const adjusted = candidates.map(c => {
    let styleBoost = 0;
    
    // Base aggressiveness effects
    if (c.features.isCheck) {
      styleBoost += effectiveAggression * 20;
    }
    if (c.features.isCapture) {
      styleBoost += effectiveAggression * 12;
    }
    
    // Legend-specific preferences
    switch (legend) {
      case 'tal':
        // Tal LOVES sacrifices and complications
        if (c.features.changesMaterial < 0) {
          // Sacrifice! Tal is excited
          styleBoost += 40 * Math.abs(c.features.changesMaterial);
        }
        // Actively dislikes simplification
        if (c.features.simplifies) {
          styleBoost -= 25;
        }
        // Loves checks and forcing moves
        if (c.features.isCheck) {
          styleBoost += 30;
        }
        break;
        
      case 'alekhine':
        // Alekhine: Creative attacks, willing to sacrifice
        if (c.features.changesMaterial < 0 && c.features.isCheck) {
          styleBoost += 35; // Sacrifice with check = Alekhine's specialty
        }
        if (c.features.changesMaterial > 0) {
          styleBoost += 15; // But also appreciates winning material
        }
        break;
        
      case 'morphy':
        // Morphy: Rapid development, open lines, king hunts
        if (c.features.isCheck) {
          styleBoost += 25;
        }
        // Would sacrifice for activity
        if (c.features.changesMaterial < 0) {
          styleBoost += 20;
        }
        break;
        
      case 'capablanca':
        // Capablanca: Simplicity, clarity, endgame mastery
        if (c.features.simplifies) {
          styleBoost += 35; // Loves to simplify
        }
        // Doesn't like unnecessary complications
        if (c.features.changesMaterial < 0) {
          styleBoost -= 30; // Very reluctant to sacrifice
        }
        // Values material highly
        if (c.features.changesMaterial > 0) {
          styleBoost += 25;
        }
        break;
        
      case 'karpov':
        // Karpov: Prophylaxis, restriction, slow squeeze
        if (c.features.simplifies) {
          styleBoost += 25; // Likes exchanges that improve his position
        }
        // Extremely reluctant to sacrifice
        if (c.features.changesMaterial < 0) {
          styleBoost -= 40;
        }
        // Values king safety very highly
        if (c.features.kingExposureChange > 0) {
          styleBoost -= 30;
        }
        break;
        
      case 'kasparov':
        // Kasparov: Initiative, dynamics, psychological pressure
        if (c.features.isCheck) {
          styleBoost += 25;
        }
        if (c.features.isCapture && c.features.changesMaterial > 0) {
          styleBoost += 20;
        }
        // Will sacrifice for the initiative
        if (c.features.changesMaterial < 0 && c.features.isCheck) {
          styleBoost += 30;
        }
        // Doesn't like passive simplification
        if (c.features.simplifies && c.scoreCp < 50) {
          styleBoost -= 15;
        }
        break;
        
      case 'fischer':
        // Fischer: Perfect technique, principled, initiative
        if (c.features.isCapture && c.features.changesMaterial > 0) {
          styleBoost += 18;
        }
        // Clean, logical chess
        if (c.features.isCheck) {
          styleBoost += 15;
        }
        // Doesn't sacrifice without clear compensation
        if (c.features.changesMaterial < 0 && c.scoreCp < 0) {
          styleBoost -= 25;
        }
        break;
        
      case 'steinitz':
        // Steinitz: Positional accumulation, defense then attack
        // Values king safety
        if (c.features.kingExposureChange > 0) {
          styleBoost -= 25;
        }
        // Patient, doesn't rush attacks
        if (c.features.simplifies && c.features.changesMaterial >= 0) {
          styleBoost += 15;
        }
        break;
        
      case 'botvinnik':
        // Botvinnik: Scientific, deep preparation, strategic
        if (c.features.simplifies) {
          styleBoost += 15;
        }
        // Methodical, not reckless
        if (c.features.changesMaterial < 0) {
          styleBoost -= 20;
        }
        break;
        
      case 'spassky':
        // Spassky: Universal, can play any style
        // Moderate preferences across the board
        if (c.features.isCheck) {
          styleBoost += 12;
        }
        if (c.features.simplifies) {
          styleBoost += 8;
        }
        break;
        
      case 'lasker':
        // Lasker: Psychological, practical, plays the opponent
        // Will accept slightly worse positions if they're complex
        if (!c.features.simplifies && c.scoreCp > -30) {
          styleBoost += 15;
        }
        // Good practical sense
        if (c.features.changesMaterial > 0) {
          styleBoost += 15;
        }
        break;
        
      case 'carlsen':
        // Carlsen: Universal, endgame grinding, never gives up
        if (c.features.simplifies && c.scoreCp >= 0) {
          styleBoost += 25; // Loves simplifying to better endgames
        }
        // Will play "nothing" positions where he can outplay
        if (c.features.changesMaterial === 0 && !c.features.isCheck) {
          styleBoost += 10;
        }
        break;
    }
    
    // Apply king safety bias (universal but weighted by legend)
    if (c.features.kingExposureChange > 0) {
      styleBoost -= style.kingSafetyBias * c.features.kingExposureChange * 10;
    }
    
    // Apply simplification bias
    if (c.features.simplifies) {
      styleBoost += style.simplifyBias * 15;
    }
    
    // Apply materialism
    if (c.features.changesMaterial < 0) {
      styleBoost += (1 - style.materialism) * Math.abs(c.features.changesMaterial) * 8;
    }
    
    return {
      ...c,
      adjustedScore: c.scoreCp + styleBoost,
    };
  });
  
  // Sort by adjusted score
  adjusted.sort((a, b) => b.adjustedScore - a.adjustedScore);
  
  const top = adjusted[0];
  if (!top) return candidates[0]?.move || '';
  
  // Legend-specific randomness in selection
  // More consistent legends play top move more often
  const consistencyFactor = legend === 'capablanca' ? 0.92
    : legend === 'karpov' ? 0.90
    : legend === 'fischer' ? 0.88
    : legend === 'tal' ? 0.70  // Tal is wild
    : legend === 'alekhine' ? 0.75
    : 0.82;
  
  const roll = Math.random();
  if (roll < consistencyFactor || adjusted.length === 1) {
    return top.move;
  } else if (roll < 0.95 && adjusted.length >= 2) {
    return adjusted[1].move;
  } else if (adjusted.length >= 3) {
    return adjusted[2].move;
  }
  
  return top.move;
}

/**
 * Get a move from a legend bot - AUTHENTIC VERSION
 * 
 * Priority order:
 * 1. Real opening book moves (first ~20 moves) - with personality-based variety
 * 2. Real moves from known positions - with personality-based variety
 * 3. Similar positions (transpositions) - with personality-based variety
 * 4. Style-biased engine fallback - applies legend's distinctive playing style
 * 
 * Each legend feels unique because:
 * - Their historical move choices are weighted by frequency
 * - Their personality affects exploration of sidelines
 * - Their style preferences affect engine move selection
 * - Session "mood" adds game-to-game variety
 */
export async function getLegendMove(params: {
  fen: string;
  moves: string[];
  legend: LegendId;
  level?: BotLevel;
}): Promise<string> {
  const { fen, moves, legend, level: _level = 'coach' } = params;

  const fullmoveNumber = getFullmoveNumberFromFen(fen);
  const mood = getLegendMood(legend);
  
  console.log(`[${legend}] Move ${fullmoveNumber} | Mood: agg=${mood.aggMod.toFixed(2)}, exp=${mood.expMod.toFixed(2)}`);

  // 1) OPENING: Use their real opening moves with personality-based variety
  if (fullmoveNumber <= 20) {
    const bookMove = await getLegendBookMove(fen, legend);
    if (bookMove) {
      console.log(`[${legend}] ✓ Opening book move: ${bookMove}`);
      return bookMove;
    }
  }

  // 2) KNOWN POSITIONS: Use their real move with variety
  const dbMove = await getLegendDbMove(fen, legend);
  if (dbMove) {
    console.log(`[${legend}] ✓ Database move: ${dbMove}`);
    return dbMove;
  }

  // 3) SIMILAR POSITIONS: Try transpositions
  const similarMove = await findSimilarLegendMove(fen, legend);
  if (similarMove) {
    console.log(`[${legend}] ✓ Similar position move: ${similarMove}`);
    return similarMove;
  }

  console.log(`[${legend}] → Engine fallback with style bias`);

  // 4) STYLE-BIASED ENGINE FALLBACK
  try {
    const candidates = await getEngineCandidatesWithFeatures({
      fen,
      moves,
      level: 'coach',
      maxCandidates: 5,
    });
    
    if (candidates.length > 0) {
      const styledMove = applyLegendStyle(candidates, legend);
      console.log(`[${legend}] ✓ Styled engine move: ${styledMove}`);
      return styledMove;
    }
  } catch (err) {
    console.warn('Error getting styled candidates:', err);
  }

  // Final fallback
  return getHumanizedMove({
    fen,
    moves,
    level: 'coach',
  });
}

/**
 * Get a specific game by ID
 */
export async function getLegendGame(legend: LegendId, gameId: string): Promise<any | null> {
  try {
    const response = await fetch(`${LEGENDS_DATA_PREFIX}/legend-${legend}-games.json`);
    if (!response.ok) return null;
    
    const games = await response.json();
    return games.find((g: any) => g.id === gameId) || null;
  } catch (err) {
    console.error('Error loading legend game:', err);
    return null;
  }
}

/**
 * Get all games for a legend
 */
export async function getLegendGames(legend: LegendId): Promise<any[]> {
  try {
    const response = await fetch(`${LEGENDS_DATA_PREFIX}/legend-${legend}-games.json`);
    if (!response.ok) return [];
    
    const text = await response.text();
    if (text.trim().startsWith('<!')) {
      const warningKey = `games-${legend}`;
      if (!missingFileWarnings.has(warningKey)) {
        console.warn(`Games file for ${legend} not found.`);
        missingFileWarnings.add(warningKey);
      }
      return [];
    }
    
    return JSON.parse(text);
  } catch (err) {
    return [];
  }
}

/**
 * Reset a legend's mood (useful for testing or starting fresh)
 */
export function resetLegendMood(legend: LegendId): void {
  delete legendMoods[legend];
}

/**
 * Reset all legend moods
 */
export function resetAllMoods(): void {
  for (const key of Object.keys(legendMoods)) {
    delete legendMoods[key as LegendId];
  }
}
