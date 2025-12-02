// ============================================
// ZEN CHESS AI COACH ENGINE
// The brain that generates personalized recommendations
// ============================================

import type {
  CoachState,
  CoachRecommendation,
  EnhancedGameMetrics,
  EmotionalProfile,
  TimeOfDay,
  RecommendationType,
  RecommendationPriority,
  ActionType,
  CoachInsight,
  DailyCoachingPlan,
  CoachConfig,
  SessionMood,
  FlowState,
} from './coachTypes';
import { getTimeOfDay, formatTimeOfDay, DEFAULT_COACH_CONFIG } from './coachTypes';

// ============================================
// COACH ENGINE CLASS
// ============================================

export class CoachEngine {
  private state: CoachState;
  private config: CoachConfig;

  constructor(state: CoachState, config: CoachConfig = DEFAULT_COACH_CONFIG) {
    this.state = state;
    this.config = config;
  }

  // ============================================
  // MAIN RECOMMENDATION GENERATOR
  // ============================================

  generateRecommendations(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];

    // Run all insight generators
    recommendations.push(...this.checkTimeOptimization());
    recommendations.push(...this.checkTiltPrevention());
    recommendations.push(...this.checkTiltIntervention());
    recommendations.push(...this.checkSessionFatigue());
    recommendations.push(...this.checkWeaknessTraining());
    recommendations.push(...this.checkStreakMomentum());
    recommendations.push(...this.checkFlowState());
    recommendations.push(...this.checkRecoveryNeeds());
    recommendations.push(...this.checkMindfulnessNudges());
    recommendations.push(...this.checkWarmupSuggestion());
    recommendations.push(...this.checkPatternReview());
    recommendations.push(...this.checkMilestones());

    // Filter out dismissed recommendations
    const filtered = recommendations.filter(
      r => !this.state.dismissedRecommendationIds.includes(r.id)
    );

    // Sort by priority and return top N
    return this.prioritize(filtered).slice(0, this.config.maxActiveRecommendations);
  }

  // ============================================
  // TIME-BASED INSIGHTS
  // ============================================

  private checkTimeOptimization(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    const currentTime = getTimeOfDay();
    const profile = this.state.emotionalProfile;
    const timeProfile = profile.timeProfile;

    // Playing at worst time of day
    if (currentTime === timeProfile.worstTimeOfDay && profile.confidence !== 'LOW') {
      const worstTimeData = timeProfile.performanceByTime[currentTime];
      
      if (worstTimeData.gamesPlayed >= 5) {
        recommendations.push(this.createRecommendation({
          type: 'TIMING_SUGGESTION',
          priority: 'MEDIUM',
          title: 'Challenging Time Window',
          message: `You're playing during ${formatTimeOfDay(currentTime)}, which historically is your toughest time. Consider Calm Play mode or pattern training instead of competitive games.`,
          reasoning: `Based on ${worstTimeData.gamesPlayed} games, your accuracy during this time is ${worstTimeData.averageAccuracy.toFixed(1)}% with a ${(worstTimeData.winRate * 100).toFixed(0)}% win rate.`,
          actionType: 'START_CALM_PLAY',
          actionLabel: 'Start Calm Play',
        }));
      }
    }

    // Playing at best time - encourage challenging activities
    if (currentTime === timeProfile.bestTimeOfDay && profile.confidence !== 'LOW') {
      const bestTimeData = timeProfile.performanceByTime[currentTime];
      
      if (bestTimeData.gamesPlayed >= 5 && this.state.gamesThisSession === 0) {
        recommendations.push(this.createRecommendation({
          type: 'SESSION_OPTIMAL',
          priority: 'LOW',
          title: 'Peak Performance Window',
          message: `This is your strongest time of day! Great for challenging puzzles, rated games, or learning new patterns.`,
          reasoning: `Your accuracy during ${formatTimeOfDay(currentTime)} is ${bestTimeData.averageAccuracy.toFixed(1)}% - your best performance window.`,
          actionType: 'START_PUZZLE',
          actionLabel: 'Start Puzzles',
        }));
      }
    }

    return recommendations;
  }

  // ============================================
  // TILT PREVENTION & INTERVENTION
  // ============================================

  private checkTiltPrevention(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    const recentGames = this.state.recentGames.slice(0, 5);
    const tiltProfile = this.state.emotionalProfile.tiltProfile;

    // Check for approaching tilt threshold
    const consecutiveLosses = this.countConsecutive(recentGames, 'LOSS');
    const threshold = tiltProfile.consecutiveLossThreshold;

    if (consecutiveLosses >= threshold - 1 && consecutiveLosses < threshold) {
      recommendations.push(this.createRecommendation({
        type: 'TILT_PREVENTION',
        priority: 'HIGH',
        title: 'Approaching Tilt Zone',
        message: `${consecutiveLosses} losses in a row. One more and you'll likely enter a tilt state. Consider a short break or breathing exercise.`,
        reasoning: `Your data shows tilt typically sets in after ${threshold} consecutive losses, with a ${tiltProfile.postLossAccuracyDrop.toFixed(1)}% accuracy drop.`,
        actionType: 'START_BREATHING',
        actionLabel: 'Breathing Exercise',
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
      }));
    }

    // Full tilt warning
    if (consecutiveLosses >= threshold) {
      recommendations.push(this.createRecommendation({
        type: 'TILT_PREVENTION',
        priority: 'CRITICAL',
        title: 'Tilt Alert',
        message: `${consecutiveLosses} losses in a row. Your historical data strongly suggests taking a break now will save your rating and mental energy.`,
        reasoning: `You typically need ${tiltProfile.tiltRecoveryGames} games to recover from this state. A ${this.state.emotionalProfile.sessionProfile.breakBenefitMinutes}-minute break is more efficient.`,
        actionType: 'TAKE_BREAK',
        actionLabel: 'Take a Break',
        expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
      }));
    }

    return recommendations;
  }

  private checkTiltIntervention(): CoachRecommendation[] {
    if (!this.config.enableTiltInterventions) return [];

    const recommendations: CoachRecommendation[] = [];
    const lastGame = this.state.recentGames[0];

    if (!lastGame) return recommendations;

    // Check for emotional signals in the last game
    const signals = lastGame.emotionalSignals;
    let tiltScore = 0;

    if (signals.blundersAfterBlunders >= 2) tiltScore += 3;
    if (signals.accuracyDropoff > 15) tiltScore += 2;
    if (signals.resignedEarly) tiltScore += 1;
    if (signals.rapidFireMoves >= 5) tiltScore += 2;
    if (signals.timeScramble) tiltScore += 1;

    if (tiltScore >= 4) {
      recommendations.push(this.createRecommendation({
        type: 'TILT_INTERVENTION',
        priority: 'HIGH',
        title: 'I Notice Something',
        message: `That last game showed some signs of emotional play - rapid moves, cascading mistakes. Would a moment of stillness help?`,
        reasoning: 'Detected behavioral patterns associated with tilted play.',
        actionType: 'START_MEDITATION',
        actionLabel: 'Moment of Stillness',
      }));
    }

    return recommendations;
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  private checkSessionFatigue(): CoachRecommendation[] {
    if (!this.config.enableSessionWarnings) return [];

    const recommendations: CoachRecommendation[] = [];
    const sessionProfile = this.state.emotionalProfile.sessionProfile;
    const sessionMinutes = (Date.now() - this.state.sessionStartTime) / 60000;

    // Approaching optimal session length
    if (sessionMinutes > sessionProfile.optimalSessionLengthMinutes * 0.8 &&
        sessionMinutes < sessionProfile.optimalSessionLengthMinutes) {
      recommendations.push(this.createRecommendation({
        type: 'SESSION_WARNING',
        priority: 'LOW',
        title: 'Session Approaching Optimal Length',
        message: `You've been playing for ${Math.round(sessionMinutes)} minutes. Your optimal session is around ${sessionProfile.optimalSessionLengthMinutes} minutes.`,
        reasoning: 'Performance typically declines after this point.',
        actionType: 'NONE',
      }));
    }

    // Exceeded optimal session length
    if (sessionMinutes > sessionProfile.optimalSessionLengthMinutes) {
      const gamesInSession = this.state.gamesThisSession;
      
      recommendations.push(this.createRecommendation({
        type: 'SESSION_WARNING',
        priority: 'MEDIUM',
        title: 'Extended Session',
        message: `${Math.round(sessionMinutes)} minutes, ${gamesInSession} games. Consider wrapping up or taking a ${sessionProfile.breakBenefitMinutes}-minute break.`,
        reasoning: `Sessions beyond ${sessionProfile.optimalSessionLengthMinutes} minutes typically show ${sessionProfile.fatigueAccuracyDrop}% accuracy decline.`,
        actionType: 'TAKE_BREAK',
        actionLabel: 'Take a Break',
      }));
    }

    // Game count fatigue
    if (this.state.gamesThisSession >= sessionProfile.fatigueThresholdGames) {
      recommendations.push(this.createRecommendation({
        type: 'SESSION_WARNING',
        priority: 'MEDIUM',
        title: 'High Game Count',
        message: `${this.state.gamesThisSession} games this session. Quality often drops after ${sessionProfile.fatigueThresholdGames} games.`,
        reasoning: 'Mental fatigue accumulates with each game.',
        actionType: 'TAKE_BREAK',
        actionLabel: 'Rest & Reset',
      }));
    }

    return recommendations;
  }

  private checkWarmupSuggestion(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    const sessionProfile = this.state.emotionalProfile.sessionProfile;

    // First activity of session
    if (this.state.gamesThisSession === 0 && this.state.puzzlesThisSession === 0) {
      if (sessionProfile.warmupGames > 0) {
        recommendations.push(this.createRecommendation({
          type: 'WARMUP_SUGGESTION',
          priority: 'LOW',
          title: 'Warmup Recommended',
          message: `Start with ${sessionProfile.warmupGames} easy puzzle(s) or a Calm Play game to warm up before competitive play.`,
          reasoning: 'Your data shows better performance after a brief warmup.',
          actionType: 'START_PUZZLE',
          actionLabel: 'Start Warmup',
        }));
      }
    }

    return recommendations;
  }

  // ============================================
  // PERFORMANCE & TRAINING INSIGHTS
  // ============================================

  private checkWeaknessTraining(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    const chessProfile = this.state.emotionalProfile.chessProfile;
    const recentGames = this.state.recentGames.slice(0, 20);

    if (recentGames.length < 5) return recommendations;

    // Calculate phase accuracies
    const avgOpening = this.average(recentGames.map(g => g.accuracy.opening));
    const avgMiddle = this.average(recentGames.map(g => g.accuracy.middlegame));
    const avgEndgame = this.average(recentGames.map(g => g.accuracy.endgame));

    // Find weakest phase
    const phases = [
      { name: 'opening', avg: avgOpening },
      { name: 'middlegame', avg: avgMiddle },
      { name: 'endgame', avg: avgEndgame },
    ].sort((a, b) => a.avg - b.avg);

    const weakest = phases[0];
    const strongest = phases[2];

    // Significant weakness detected
    if (strongest.avg - weakest.avg > 10) {
      recommendations.push(this.createRecommendation({
        type: 'TRAINING_FOCUS',
        priority: 'MEDIUM',
        title: `${this.capitalize(weakest.name)} Training Needed`,
        message: `Your ${weakest.name} accuracy (${weakest.avg.toFixed(1)}%) is significantly lower than your ${strongest.name} (${strongest.avg.toFixed(1)}%). Focused training could improve your results.`,
        reasoning: `Based on your last ${recentGames.length} games.`,
        actionType: 'START_TRAINING',
        actionLabel: `Train ${this.capitalize(weakest.name)}`,
        actionData: { phase: weakest.name.toUpperCase() },
      }));
    }

    // Specific pattern weaknesses
    if (chessProfile.weakestPatterns.length > 0) {
      const pattern = chessProfile.weakestPatterns[0];
      recommendations.push(this.createRecommendation({
        type: 'WEAKNESS_ALERT',
        priority: 'MEDIUM',
        title: `Pattern Gap: ${pattern}`,
        message: `You've been missing ${pattern} patterns consistently. Targeted practice could turn this weakness into a strength.`,
        reasoning: 'Pattern recognition improves significantly with focused repetition.',
        actionType: 'REVIEW_PATTERNS',
        actionLabel: 'Practice Pattern',
        actionData: { pattern },
      }));
    }

    return recommendations;
  }

  private checkPatternReview(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    
    // This would integrate with the spaced repetition system
    // For now, we'll create a placeholder that can be enhanced
    const duePatterns = 5; // Would come from SRS system

    if (duePatterns > 0) {
      recommendations.push(this.createRecommendation({
        type: 'PATTERN_DUE',
        priority: 'LOW',
        title: 'Patterns Due for Review',
        message: `${duePatterns} pattern(s) are due for review. Quick review now helps cement them in long-term memory.`,
        reasoning: 'Spaced repetition is most effective when reviews happen on schedule.',
        actionType: 'REVIEW_PATTERNS',
        actionLabel: 'Review Patterns',
      }));
    }

    return recommendations;
  }

  // ============================================
  // POSITIVE REINFORCEMENT
  // ============================================

  private checkStreakMomentum(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    const recentGames = this.state.recentGames.slice(0, 10);

    const consecutiveWins = this.countConsecutive(recentGames, 'WIN');

    if (consecutiveWins >= 3) {
      recommendations.push(this.createRecommendation({
        type: 'STREAK_ENCOURAGEMENT',
        priority: 'LOW',
        title: 'Winning Streak!',
        message: `${consecutiveWins} wins in a row! You're clearly in a great mental state. This is an excellent time for challenging material.`,
        reasoning: 'Winning streaks correlate with heightened focus and confidence.',
        actionType: 'START_TRAINING',
        actionLabel: 'Challenge Yourself',
      }));
    }

    return recommendations;
  }

  private checkFlowState(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];

    if (this.state.currentFlow === 'IN_FLOW') {
      recommendations.push(this.createRecommendation({
        type: 'FLOW_STATE',
        priority: 'LOW',
        title: 'You\'re in the Zone',
        message: 'Flow state detected! Your focus and performance are at their peak. Ride this wave.',
        reasoning: 'Consistent move times, high accuracy, and good results indicate flow state.',
        actionType: 'NONE',
      }));
    }

    return recommendations;
  }

  private checkMilestones(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];
    
    // Check various milestones
    const totalGames = this.state.recentGames.length;
    const milestones = [10, 25, 50, 100, 250, 500];
    
    for (const milestone of milestones) {
      if (totalGames === milestone) {
        recommendations.push(this.createRecommendation({
          type: 'MILESTONE',
          priority: 'LOW',
          title: `${milestone} Games Milestone!`,
          message: `You've played ${milestone} games! Your coach now has ${this.getConfidenceDescription(totalGames)} understanding of your patterns.`,
          reasoning: 'More data means more accurate personalized insights.',
          actionType: 'VIEW_STATS',
          actionLabel: 'View Progress',
        }));
        break;
      }
    }

    return recommendations;
  }

  // ============================================
  // MINDFULNESS & RECOVERY
  // ============================================

  private checkMindfulnessNudges(): CoachRecommendation[] {
    if (!this.config.enableMindfulnessNudges) return [];

    const recommendations: CoachRecommendation[] = [];
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayGames = this.state.recentGames.filter(
      g => g.timestamp > todayStart.getTime()
    );

    // First activity of the day
    if (todayGames.length === 0 && this.state.gamesThisSession === 0) {
      recommendations.push(this.createRecommendation({
        type: 'MINDFULNESS_NUDGE',
        priority: 'LOW',
        title: 'Start with Intention',
        message: 'Begin your chess day mindfully. A brief breathing exercise or intention-setting creates the foundation for focused play.',
        reasoning: 'Mindful starts correlate with better overall session performance in your data.',
        actionType: 'SET_INTENTION',
        actionLabel: 'Set Intention',
      }));
    }

    // No meditation this session after losses
    if (this.state.lossesThisSession >= 2 && this.state.meditationMinutesThisSession === 0) {
      recommendations.push(this.createRecommendation({
        type: 'MINDFULNESS_NUDGE',
        priority: 'MEDIUM',
        title: 'Reset Your State',
        message: 'A few losses can accumulate mental weight. A brief meditation can help you approach the next game fresh.',
        reasoning: 'Mindfulness practices help reset emotional state between games.',
        actionType: 'START_MEDITATION',
        actionLabel: 'Brief Meditation',
      }));
    }

    return recommendations;
  }

  private checkRecoveryNeeds(): CoachRecommendation[] {
    const recommendations: CoachRecommendation[] = [];

    // Check yesterday's session
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterdayGames = this.state.recentGames.filter(
      g => g.timestamp >= yesterday.getTime() && g.timestamp < today.getTime()
    );

    if (yesterdayGames.length >= 3) {
      const losses = yesterdayGames.filter(g => g.result === 'LOSS').length;
      const lossRate = losses / yesterdayGames.length;

      // Rough session yesterday
      if (lossRate > 0.6 && this.state.gamesThisSession === 0) {
        recommendations.push(this.createRecommendation({
          type: 'RECOVERY_PLAN',
          priority: 'MEDIUM',
          title: 'Fresh Start Today',
          message: `Yesterday was challenging (${losses}/${yesterdayGames.length} losses). Start today with breathing and Calm Play to reset completely.`,
          reasoning: 'Starting fresh after a tough session prevents carrying negative patterns forward.',
          actionType: 'START_BREATHING',
          actionLabel: 'Start Fresh',
        }));
      }

      // Great session yesterday - maintain momentum
      if (lossRate < 0.3 && yesterdayGames.length >= 5) {
        recommendations.push(this.createRecommendation({
          type: 'STREAK_ENCOURAGEMENT',
          priority: 'LOW',
          title: 'Carry Yesterday\'s Momentum',
          message: `Great session yesterday! Your mental state was strong. Try to recreate those conditions today.`,
          reasoning: 'Building on positive momentum reinforces good habits.',
          actionType: 'NONE',
        }));
      }
    }

    return recommendations;
  }

  // ============================================
  // DAILY COACHING PLAN
  // ============================================

  generateDailyPlan(): DailyCoachingPlan {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const timeOfDay = getTimeOfDay();
    const profile = this.state.emotionalProfile;

    // Personalized greeting based on context
    const greeting = this.generateGreeting(timeOfDay, dayOfWeek);

    // Determine primary focus
    const primaryFocus = this.determinePrimaryFocus();

    // Build suggested schedule
    const suggestedActivities = this.buildSchedule(primaryFocus);

    // Generate considerations
    const considerations = this.generateConsiderations(timeOfDay, dayOfWeek);

    // Set goals
    const goals = this.generateGoals();

    return {
      date: today.toISOString().split('T')[0],
      greeting,
      primaryFocus,
      suggestedActivities,
      considerations,
      goals,
      basedOn: [
        `${this.state.recentGames.length} recent games`,
        `${profile.dataPoints} total data points`,
        `Profile confidence: ${profile.confidence}`,
      ],
    };
  }

  private generateGreeting(timeOfDay: TimeOfDay, _dayOfWeek: number): string {
    const timeGreetings: Record<TimeOfDay, string> = {
      EARLY_MORNING: 'Good early morning',
      MORNING: 'Good morning',
      AFTERNOON: 'Good afternoon',
      EVENING: 'Good evening',
      NIGHT: 'Good evening',
      LATE_NIGHT: 'Burning the midnight oil',
    };

    const base = timeGreetings[timeOfDay];
    const profile = this.state.emotionalProfile.timeProfile;

    if (timeOfDay === profile.bestTimeOfDay) {
      return `${base}! This is your peak performance time.`;
    }
    if (timeOfDay === profile.worstTimeOfDay) {
      return `${base}. Remember, this time of day can be challenging for you.`;
    }

    return `${base}! Ready for some chess?`;
  }

  private determinePrimaryFocus(): DailyCoachingPlan['primaryFocus'] {
    const profile = this.state.emotionalProfile.chessProfile;
    const recentGames = this.state.recentGames.slice(0, 10);

    // Check for clear weakness
    if (profile.weakestPatterns.length > 0) {
      return {
        area: profile.weakestPatterns[0],
        reason: 'This pattern has been a consistent weakness in recent games.',
        activities: ['START_TRAINING', 'REVIEW_PATTERNS', 'START_PUZZLE'],
      };
    }

    // Check phase weakness
    if (recentGames.length >= 5) {
      const avgEndgame = this.average(recentGames.map(g => g.accuracy.endgame));
      const avgMiddle = this.average(recentGames.map(g => g.accuracy.middlegame));

      if (avgEndgame < avgMiddle - 10) {
        return {
          area: 'Endgame Technique',
          reason: 'Your endgame accuracy is significantly lower than your middlegame.',
          activities: ['START_TRAINING', 'START_PUZZLE'],
        };
      }
    }

    // Default: balanced practice
    return {
      area: 'Balanced Practice',
      reason: 'No major weaknesses detected. Focus on maintaining your skills.',
      activities: ['START_PUZZLE', 'PLAY_GAME', 'REVIEW_PATTERNS'],
    };
  }

  private buildSchedule(focus: DailyCoachingPlan['primaryFocus']): DailyCoachingPlan['suggestedActivities'] {
    const sessionProfile = this.state.emotionalProfile.sessionProfile;

    return [
      {
        activity: 'START_BREATHING',
        duration: 3,
        reason: 'Start with mindfulness to set intention.',
      },
      {
        activity: 'START_PUZZLE',
        duration: 10,
        reason: sessionProfile.warmupGames > 0 ? 'Warm up your tactical vision.' : 'Build tactical sharpness.',
      },
      {
        activity: focus.activities[0] as ActionType,
        duration: 20,
        reason: `Focus area: ${focus.area}`,
      },
      {
        activity: 'PLAY_GAME',
        duration: 15,
        reason: 'Apply your practice in a real game.',
      },
    ];
  }

  private generateConsiderations(timeOfDay: TimeOfDay, dayOfWeek: number): string[] {
    const considerations: string[] = [];
    const profile = this.state.emotionalProfile;

    if (timeOfDay === profile.timeProfile.worstTimeOfDay) {
      considerations.push(`This is historically your most challenging time of day. Consider lighter practice.`);
    }

    if (dayOfWeek === profile.timeProfile.worstDayOfWeek) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      considerations.push(`${days[dayOfWeek]}s tend to be tough for you. Be patient with yourself.`);
    }

    if (profile.tiltProfile.consecutiveLossThreshold <= 2) {
      considerations.push('You\'re sensitive to losing streaks. Take breaks after 2 consecutive losses.');
    }

    return considerations;
  }

  private generateGoals(): DailyCoachingPlan['goals'] {
    return [
      {
        description: 'Complete focused practice',
        metric: 'minutes',
        target: 30,
      },
      {
        description: 'Solve puzzles accurately',
        metric: 'puzzles',
        target: 10,
      },
      {
        description: 'Stay mindful (no tilt games)',
        metric: 'tilt-free games',
        target: 5,
      },
    ];
  }

  // ============================================
  // INSIGHT GENERATION
  // ============================================

  generateInsights(): CoachInsight[] {
    const insights: CoachInsight[] = [];

    // Time-based insight
    const timeProfile = this.state.emotionalProfile.timeProfile;
    if (this.state.recentGames.length >= 20) {
      const bestData = timeProfile.performanceByTime[timeProfile.bestTimeOfDay];
      const worstData = timeProfile.performanceByTime[timeProfile.worstTimeOfDay];

      if (bestData.gamesPlayed >= 5 && worstData.gamesPlayed >= 5) {
        insights.push({
          id: 'time_insight',
          category: 'TIMING',
          title: 'Your Optimal Play Times',
          description: `You perform best during ${formatTimeOfDay(timeProfile.bestTimeOfDay)} (${bestData.averageAccuracy.toFixed(1)}% accuracy) and struggle during ${formatTimeOfDay(timeProfile.worstTimeOfDay)} (${worstData.averageAccuracy.toFixed(1)}% accuracy).`,
          dataPoints: bestData.gamesPlayed + worstData.gamesPlayed,
          confidence: Math.min(90, (bestData.gamesPlayed + worstData.gamesPlayed) * 3),
          actionable: true,
          suggestedAction: 'Schedule important games during your peak hours.',
          discoveredAt: Date.now(),
        });
      }
    }

    // Tilt insight
    const tiltProfile = this.state.emotionalProfile.tiltProfile;
    if (tiltProfile.postLossAccuracyDrop > 5) {
      insights.push({
        id: 'tilt_insight',
        category: 'EMOTIONAL',
        title: 'Your Tilt Pattern',
        description: `After a loss, your accuracy typically drops ${tiltProfile.postLossAccuracyDrop.toFixed(1)}%. You usually recover after ${tiltProfile.tiltRecoveryGames} games.`,
        dataPoints: this.state.recentGames.length,
        confidence: Math.min(85, this.state.recentGames.length * 2),
        actionable: true,
        suggestedAction: 'Take a breathing break after losses to maintain accuracy.',
        discoveredAt: Date.now(),
      });
    }

    // Phase insight
    const chessProfile = this.state.emotionalProfile.chessProfile;
    insights.push({
      id: 'phase_insight',
      category: 'PERFORMANCE',
      title: 'Your Game Phases',
      description: `Your strongest phase is ${chessProfile.strongestPhase.toLowerCase()}, while ${chessProfile.weakestPhase.toLowerCase()} needs the most work.`,
      dataPoints: this.state.recentGames.length,
      confidence: Math.min(80, this.state.recentGames.length * 2),
      actionable: true,
      suggestedAction: `Focus training on ${chessProfile.weakestPhase.toLowerCase()} positions.`,
      discoveredAt: Date.now(),
    });

    return insights;
  }

  // ============================================
  // MOOD & FLOW DETECTION
  // ============================================

  detectCurrentMood(): SessionMood {
    const sessionMinutes = (Date.now() - this.state.sessionStartTime) / 60000;
    const sessionProfile = this.state.emotionalProfile.sessionProfile;

    // Just started
    if (sessionMinutes < 5 && this.state.gamesThisSession === 0) {
      return 'FRESH';
    }

    // Warming up
    if (this.state.gamesThisSession < sessionProfile.warmupGames) {
      return 'WARMING_UP';
    }

    // Check for tilt
    const recentGames = this.state.recentGames.slice(0, 3);
    const recentLosses = recentGames.filter(g => g.result === 'LOSS').length;
    if (recentLosses >= 2) {
      const lastGame = recentGames[0];
      if (lastGame && lastGame.emotionalSignals.blundersAfterBlunders >= 2) {
        return 'TILTED';
      }
    }

    // Check for fatigue
    if (sessionMinutes > sessionProfile.optimalSessionLengthMinutes ||
        this.state.gamesThisSession >= sessionProfile.fatigueThresholdGames) {
      return 'FATIGUED';
    }

    return 'FOCUSED';
  }

  detectFlowState(): FlowState {
    const recentGames = this.state.recentGames.slice(0, 5);
    
    if (recentGames.length < 3) return 'NONE';

    // Check for flow indicators
    const wins = recentGames.filter(g => g.result === 'WIN').length;
    const avgAccuracy = this.average(recentGames.map(g => g.accuracy.overall));
    const consistentTiming = recentGames.every(
      g => g.timing.moveTimeVariance < 10
    );

    // Strong flow
    if (wins >= 3 && avgAccuracy > 80 && consistentTiming) {
      return 'IN_FLOW';
    }

    // Building flow
    if (wins >= 2 && avgAccuracy > 70) {
      return 'BUILDING';
    }

    // Check for disruption
    const lastGame = recentGames[0];
    if (lastGame && lastGame.emotionalSignals.blundersAfterBlunders >= 2) {
      return 'DISRUPTED';
    }

    return 'NONE';
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  private createRecommendation(params: {
    type: RecommendationType;
    priority: RecommendationPriority;
    title: string;
    message: string;
    reasoning: string;
    actionType: ActionType;
    actionLabel?: string;
    actionData?: Record<string, unknown>;
    expiresAt?: number;
  }): CoachRecommendation {
    return {
      id: `rec_${params.type}_${Date.now()}`,
      timestamp: Date.now(),
      type: params.type,
      priority: params.priority,
      title: params.title,
      message: params.message,
      reasoning: params.reasoning,
      actionType: params.actionType,
      actionLabel: params.actionLabel,
      actionData: params.actionData,
      expiresAt: params.expiresAt,
    };
  }

  private prioritize(recommendations: CoachRecommendation[]): CoachRecommendation[] {
    const priorityOrder: Record<RecommendationPriority, number> = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
    };

    return recommendations.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  private countConsecutive(games: EnhancedGameMetrics[], result: 'WIN' | 'LOSS' | 'DRAW'): number {
    let count = 0;
    for (const game of games) {
      if (game.result === result) count++;
      else break;
    }
    return count;
  }

  private average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private getConfidenceDescription(dataPoints: number): string {
    if (dataPoints < 10) return 'a basic';
    if (dataPoints < 25) return 'a developing';
    if (dataPoints < 50) return 'a solid';
    if (dataPoints < 100) return 'a strong';
    return 'an excellent';
  }
}

// ============================================
// PROFILE UPDATER
// Analyzes games to update the emotional profile
// ============================================

export function updateEmotionalProfile(
  currentProfile: EmotionalProfile,
  games: EnhancedGameMetrics[]
): EmotionalProfile {
  if (games.length < 3) {
    return currentProfile; // Not enough data
  }

  const profile = JSON.parse(JSON.stringify(currentProfile)) as EmotionalProfile;
  
  // ============================================
  // UPDATE TIME PERFORMANCE PROFILE
  // ============================================
  
  const timeGroups: Record<TimeOfDay, EnhancedGameMetrics[]> = {
    EARLY_MORNING: [],
    MORNING: [],
    AFTERNOON: [],
    EVENING: [],
    NIGHT: [],
    LATE_NIGHT: [],
  };
  
  games.forEach(g => {
    timeGroups[g.timeOfDay].push(g);
  });
  
  // Calculate stats for each time period
  const timeStats: { time: TimeOfDay; avg: number; winRate: number; count: number }[] = [];
  
  (Object.keys(timeGroups) as TimeOfDay[]).forEach(time => {
    const timeGames = timeGroups[time];
    if (timeGames.length > 0) {
      const avgAccuracy = timeGames.reduce((s, g) => s + g.accuracy.overall, 0) / timeGames.length;
      const wins = timeGames.filter(g => g.result === 'WIN').length;
      const winRate = wins / timeGames.length;
      
      profile.timeProfile.performanceByTime[time] = {
        gamesPlayed: timeGames.length,
        averageAccuracy: avgAccuracy,
        winRate: winRate,
      };
      
      timeStats.push({ time, avg: avgAccuracy, winRate, count: timeGames.length });
    }
  });
  
  // Find best/worst times (only if we have enough data)
  const validTimeStats = timeStats.filter(t => t.count >= 3);
  if (validTimeStats.length >= 2) {
    validTimeStats.sort((a, b) => b.avg - a.avg);
    profile.timeProfile.bestTimeOfDay = validTimeStats[0].time;
    profile.timeProfile.worstTimeOfDay = validTimeStats[validTimeStats.length - 1].time;
  }
  
  // Day of week analysis
  const dayGroups: Record<number, EnhancedGameMetrics[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  games.forEach(g => {
    dayGroups[g.dayOfWeek].push(g);
  });
  
  const dayStats = Object.entries(dayGroups)
    .filter(([, games]) => games.length >= 2)
    .map(([day, dayGames]) => ({
      day: parseInt(day),
      avg: dayGames.reduce((s, g) => s + g.accuracy.overall, 0) / dayGames.length,
    }))
    .sort((a, b) => b.avg - a.avg);
  
  if (dayStats.length >= 2) {
    profile.timeProfile.bestDayOfWeek = dayStats[0].day;
    profile.timeProfile.worstDayOfWeek = dayStats[dayStats.length - 1].day;
  }
  
  // ============================================
  // UPDATE TILT PROFILE
  // ============================================
  
  // Calculate post-loss accuracy drop
  const postLossGames = games.filter(g => g.context.wasAfterLoss);
  const notPostLossGames = games.filter(g => !g.context.wasAfterLoss && !g.context.wasFirstGameOfDay);
  
  if (postLossGames.length >= 3 && notPostLossGames.length >= 3) {
    const postLossAvg = postLossGames.reduce((s, g) => s + g.accuracy.overall, 0) / postLossGames.length;
    const normalAvg = notPostLossGames.reduce((s, g) => s + g.accuracy.overall, 0) / notPostLossGames.length;
    profile.tiltProfile.postLossAccuracyDrop = Math.max(0, normalAvg - postLossAvg);
  }
  
  // Calculate post-win accuracy change
  const postWinGames = games.filter(g => g.context.wasAfterWin);
  if (postWinGames.length >= 3 && notPostLossGames.length >= 3) {
    const postWinAvg = postWinGames.reduce((s, g) => s + g.accuracy.overall, 0) / postWinGames.length;
    const normalAvg = notPostLossGames.reduce((s, g) => s + g.accuracy.overall, 0) / notPostLossGames.length;
    profile.tiltProfile.postWinAccuracyChange = postWinAvg - normalAvg;
  }
  
  // Detect tilt triggers from emotional signals
  const tiltIndicators: string[] = [];
  games.forEach(g => {
    if (g.emotionalSignals.blundersAfterBlunders >= 2) {
      tiltIndicators.push('Cascade blunders');
    }
    if (g.emotionalSignals.rapidFireMoves >= 5) {
      tiltIndicators.push('Rapid-fire moves');
    }
    if (g.emotionalSignals.accuracyDropoff > 20) {
      tiltIndicators.push('Late-game collapse');
    }
    if (g.emotionalSignals.timeScramble) {
      tiltIndicators.push('Time pressure');
    }
  });
  
  // Count trigger frequencies
  const triggerCounts: Record<string, number> = {};
  tiltIndicators.forEach(t => {
    triggerCounts[t] = (triggerCounts[t] || 0) + 1;
  });
  
  profile.tiltProfile.commonTiltTriggers = Object.entries(triggerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([trigger, count]) => ({
      trigger,
      frequency: count / games.length,
      averageSeverity: 5, // Would need more data to calculate
      averageRecoveryMinutes: 15,
    }));
  
  // ============================================
  // UPDATE SESSION PROFILE
  // ============================================
  
  // Analyze session patterns (games grouped by session)
  // Note: games are sorted newest-first, so we need to reverse for chronological order
  const chronologicalGames = [...games].reverse();
  const sessions: EnhancedGameMetrics[][] = [];
  let currentSession: EnhancedGameMetrics[] = [];
  
  chronologicalGames.forEach((game, i) => {
    if (i === 0) {
      currentSession.push(game);
    } else {
      const prevGame = chronologicalGames[i - 1];
      const timeDiff = (game.timestamp - prevGame.timestamp) / 60000;
      
      // New session if > 2 hours gap
      if (timeDiff > 120) {
        if (currentSession.length > 0) {
          sessions.push(currentSession);
        }
        currentSession = [game];
      } else {
        currentSession.push(game);
      }
    }
  });
  if (currentSession.length > 0) {
    sessions.push(currentSession);
  }
  
  // Find optimal session length
  const sessionPerformance = sessions
    .filter(s => s.length >= 3)
    .map(s => {
      const firstHalf = s.slice(0, Math.floor(s.length / 2));
      const secondHalf = s.slice(Math.floor(s.length / 2));
      
      const firstAvg = firstHalf.reduce((sum, g) => sum + g.accuracy.overall, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, g) => sum + g.accuracy.overall, 0) / secondHalf.length;
      
      const duration = s.length > 0 
        ? (s[s.length - 1].timestamp - s[0].timestamp) / 60000 + s[s.length - 1].durationMinutes
        : 0;
      
      return {
        gameCount: s.length,
        duration,
        accuracyDrop: firstAvg - secondAvg,
      };
    });
  
  if (sessionPerformance.length >= 2) {
    // Find where accuracy starts dropping significantly
    const avgDropByGameCount: Record<number, number[]> = {};
    sessionPerformance.forEach(sp => {
      const bucket = Math.floor(sp.gameCount / 3) * 3; // Group by 3s
      if (!avgDropByGameCount[bucket]) avgDropByGameCount[bucket] = [];
      avgDropByGameCount[bucket].push(sp.accuracyDrop);
    });
    
    // Default fatigue threshold
    profile.sessionProfile.fatigueThresholdGames = 8;
    profile.sessionProfile.fatigueAccuracyDrop = 5;
    
    // Average session duration
    const avgDuration = sessionPerformance.reduce((s, sp) => s + sp.duration, 0) / sessionPerformance.length;
    profile.sessionProfile.optimalSessionLengthMinutes = Math.round(avgDuration * 0.8); // 80% of average
  }
  
  // ============================================
  // UPDATE CHESS PROFILE
  // ============================================
  
  // Calculate phase strengths
  const avgOpening = games.reduce((s, g) => s + g.accuracy.opening, 0) / games.length;
  const avgMiddle = games.reduce((s, g) => s + g.accuracy.middlegame, 0) / games.length;
  const avgEndgame = games.reduce((s, g) => s + g.accuracy.endgame, 0) / games.length;
  
  type GamePhase = 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';
  const phases: { phase: GamePhase; avg: number }[] = [
    { phase: 'OPENING' as GamePhase, avg: avgOpening },
    { phase: 'MIDDLEGAME' as GamePhase, avg: avgMiddle },
    { phase: 'ENDGAME' as GamePhase, avg: avgEndgame },
  ].sort((a, b) => b.avg - a.avg);
  
  profile.chessProfile.strongestPhase = phases[0].phase;
  profile.chessProfile.weakestPhase = phases[2].phase;
  
  // Collect tactical misses and positional errors
  const allTacticalMisses: string[] = [];
  const allPositionalErrors: string[] = [];
  
  games.forEach(g => {
    allTacticalMisses.push(...g.tacticalMisses);
    allPositionalErrors.push(...g.positionalErrors);
  });
  
  // Count frequencies
  const tacticalCounts: Record<string, number> = {};
  allTacticalMisses.forEach(t => {
    tacticalCounts[t] = (tacticalCounts[t] || 0) + 1;
  });
  
  profile.chessProfile.weakestPatterns = Object.entries(tacticalCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([pattern]) => pattern);
  
  // ============================================
  // UPDATE META
  // ============================================
  
  profile.lastUpdated = Date.now();
  profile.dataPoints = games.length;
  
  if (games.length < 10) {
    profile.confidence = 'LOW';
  } else if (games.length < 30) {
    profile.confidence = 'MEDIUM';
  } else {
    profile.confidence = 'HIGH';
  }
  
  return profile;
}

// ============================================
// FACTORY FUNCTION
// ============================================

export function createCoachEngine(state: CoachState, config?: Partial<CoachConfig>): CoachEngine {
  return new CoachEngine(state, { ...DEFAULT_COACH_CONFIG, ...config });
}

