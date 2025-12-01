import { useCallback } from 'react';
import { useWeaknessStore } from '@/state/notesStore';
import { useMistakeLibraryStore, usePositionSparringStore } from '@/state/trainingStore';

// ============================================
// DRILL GENERATOR
// One-click creation of practice drills from weaknesses
// ============================================

export function useDrillGenerator() {
  const { weaknesses, updateWeakness } = useWeaknessStore();
  const { mistakes } = useMistakeLibraryStore();
  const { addPosition, positions } = usePositionSparringStore();

  /**
   * Generate drills from a specific weakness
   */
  const generateDrillsFromWeakness = useCallback((weaknessId: string) => {
    const weakness = weaknesses.find(w => w.id === weaknessId);
    if (!weakness) return [];

    const createdDrills: string[] = [];

    // Get example positions from the weakness
    weakness.examplePositions.forEach((pos, i) => {
      // Check if position already exists
      const exists = positions.some(p => p.fen === pos.fen);
      if (exists) return;

      const drillId = addPosition({
        name: `${weakness.description} - Practice ${i + 1}`,
        fen: pos.fen,
        playerColor: 'white', // Default, could be smarter
        source: 'WEAKNESS',
        engineStrength: 12, // Medium difficulty
        objective: 'WIN',
        notes: `Practice position from weakness: ${weakness.description}. ${pos.caption || ''}`,
        keyMoves: [],
      });

      createdDrills.push(drillId);
    });

    // Update weakness with drill info
    if (createdDrills.length > 0) {
      updateWeakness(weaknessId, {
        prescribedDrills: [
          ...(weakness.prescribedDrills || []),
          ...createdDrills.map(id => ({
            id,
            type: 'POSITION_PRACTICE' as const,
            title: `Weakness Drill`,
            description: weakness.description,
            repetitions: 3,
            completedCount: 0,
          })),
        ],
      });
    }

    return createdDrills;
  }, [weaknesses, positions, addPosition, updateWeakness]);

  /**
   * Generate drills from recent mistakes
   */
  const generateDrillsFromMistakes = useCallback((count: number = 5) => {
    const recentMistakes = mistakes
      .filter(m => m.evalDrop > 100) // Only significant mistakes
      .slice(0, count);

    const createdDrills: string[] = [];

    recentMistakes.forEach((mistake, i) => {
      // Check if position already exists
      const exists = positions.some(p => p.fen === mistake.fen);
      if (exists) return;

      const drillId = addPosition({
        name: `Mistake Review ${i + 1}: ${mistake.mistakeType}`,
        fen: mistake.fen,
        playerColor: mistake.playerColor,
        source: 'GAME',
        engineStrength: 10,
        objective: 'WIN',
        notes: `You played ${mistake.playedMove}, best was ${mistake.bestMove}. Root cause: ${mistake.rootCause.replace('_', ' ')}.`,
        keyMoves: [mistake.bestMove],
      });

      createdDrills.push(drillId);
    });

    return createdDrills;
  }, [mistakes, positions, addPosition]);

  /**
   * Generate all recommended drills based on current weaknesses
   */
  const generateRecommendedDrills = useCallback(() => {
    const allDrills: string[] = [];

    // Get top 3 weaknesses
    const topWeaknesses = weaknesses
      .filter(w => w.status === 'ACTIVE')
      .sort((a, b) => {
        const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      })
      .slice(0, 3);

    // Generate drills from each weakness
    topWeaknesses.forEach(weakness => {
      const drills = generateDrillsFromWeakness(weakness.id);
      allDrills.push(...drills);
    });

    // Also add from recent mistakes if we don't have enough
    if (allDrills.length < 5) {
      const mistakeDrills = generateDrillsFromMistakes(5 - allDrills.length);
      allDrills.push(...mistakeDrills);
    }

    return allDrills;
  }, [weaknesses, generateDrillsFromWeakness, generateDrillsFromMistakes]);

  /**
   * Get drill recommendations without creating them
   */
  const getDrillRecommendations = useCallback(() => {
    const recommendations: Array<{
      source: 'weakness' | 'mistake';
      sourceId: string;
      description: string;
      fen: string;
      priority: 'high' | 'medium' | 'low';
    }> = [];

    // From weaknesses
    weaknesses
      .filter(w => w.status === 'ACTIVE' && w.examplePositions.length > 0)
      .forEach(weakness => {
        weakness.examplePositions.forEach(pos => {
          // Skip if already a drill
          if (positions.some(p => p.fen === pos.fen)) return;

          recommendations.push({
            source: 'weakness',
            sourceId: weakness.id,
            description: weakness.description,
            fen: pos.fen,
            priority: weakness.severity === 'CRITICAL' ? 'high' : 
                     weakness.severity === 'HIGH' ? 'medium' : 'low',
          });
        });
      });

    // From mistakes
    mistakes
      .filter(m => m.evalDrop > 150 && !positions.some(p => p.fen === m.fen))
      .slice(0, 10)
      .forEach(mistake => {
        recommendations.push({
          source: 'mistake',
          sourceId: mistake.id,
          description: `${mistake.mistakeType}: ${mistake.playedMove} → ${mistake.bestMove}`,
          fen: mistake.fen,
          priority: mistake.evalDrop > 300 ? 'high' : 'medium',
        });
      });

    // Sort by priority
    return recommendations.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
  }, [weaknesses, mistakes, positions]);

  return {
    generateDrillsFromWeakness,
    generateDrillsFromMistakes,
    generateRecommendedDrills,
    getDrillRecommendations,
  };
}

export default useDrillGenerator;

