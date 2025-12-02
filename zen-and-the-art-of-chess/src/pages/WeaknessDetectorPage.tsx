// ============================================
// WEAKNESS DETECTOR
// Analyze your performance patterns and prescribe targeted training
// The AI coach that finds your specific areas for improvement
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// TYPES
// ============================================

interface SkillArea {
  id: string;
  name: string;
  category: 'tactical' | 'positional' | 'endgame' | 'opening' | 'psychological';
  icon: string;
  description: string;
}

interface WeaknessScore {
  skillId: string;
  correct: number;
  total: number;
  recentTrend: 'improving' | 'stable' | 'declining';
  lastUpdated: number;
}

interface TrainingPrescription {
  skillId: string;
  urgency: 'high' | 'medium' | 'low';
  exercises: string[];
  estimatedTime: number;
  reason: string;
}

// ============================================
// SKILL AREAS DATABASE
// ============================================

const SKILL_AREAS: SkillArea[] = [
  // Tactical Skills
  { id: 'forks', name: 'Knight Forks', category: 'tactical', icon: '♞', description: 'Double attacks with knights' },
  { id: 'pins', name: 'Pins & Skewers', category: 'tactical', icon: '📌', description: 'Exploiting piece alignment' },
  { id: 'discovered', name: 'Discovered Attacks', category: 'tactical', icon: '💥', description: 'Moving to reveal an attack' },
  { id: 'back-rank', name: 'Back Rank Tactics', category: 'tactical', icon: '🏠', description: 'First rank weaknesses' },
  { id: 'deflection', name: 'Deflection', category: 'tactical', icon: '↪️', description: 'Luring defenders away' },
  { id: 'overload', name: 'Overloading', category: 'tactical', icon: '⚖️', description: 'Attacking busy defenders' },
  { id: 'zwischenzug', name: 'Zwischenzug', category: 'tactical', icon: '⏸️', description: 'In-between moves' },
  { id: 'checkmate-patterns', name: 'Checkmate Patterns', category: 'tactical', icon: '♚', description: 'Standard mating patterns' },
  
  // Positional Skills
  { id: 'outposts', name: 'Outposts', category: 'positional', icon: '🏰', description: 'Strong knight squares' },
  { id: 'weak-pawns', name: 'Weak Pawn Play', category: 'positional', icon: '♙', description: 'Attacking isolated/doubled pawns' },
  { id: 'pawn-structure', name: 'Pawn Structure', category: 'positional', icon: '⛓️', description: 'Understanding pawn formations' },
  { id: 'piece-activity', name: 'Piece Activity', category: 'positional', icon: '🚀', description: 'Keeping pieces active' },
  { id: 'open-files', name: 'Open Files', category: 'positional', icon: '📂', description: 'Rook placement and control' },
  { id: 'bishop-pair', name: 'Bishop Pair', category: 'positional', icon: '♗', description: 'Two bishops advantage' },
  { id: 'space', name: 'Space Advantage', category: 'positional', icon: '📐', description: 'Using extra space' },
  { id: 'prophylaxis', name: 'Prophylaxis', category: 'positional', icon: '🛡️', description: 'Preventing opponent plans' },
  
  // Endgame Skills
  { id: 'king-pawn', name: 'King & Pawn', category: 'endgame', icon: '♔', description: 'Opposition and triangulation' },
  { id: 'rook-endgames', name: 'Rook Endgames', category: 'endgame', icon: '♖', description: 'Lucena, Philidor, etc.' },
  { id: 'minor-piece', name: 'Minor Piece Endgames', category: 'endgame', icon: '♘', description: 'Bishop vs knight decisions' },
  { id: 'queen-endgames', name: 'Queen Endgames', category: 'endgame', icon: '♕', description: 'Queen technique' },
  { id: 'practical-endgames', name: 'Practical Endgames', category: 'endgame', icon: '🎯', description: 'Converting advantages' },
  
  // Opening Skills
  { id: 'opening-principles', name: 'Opening Principles', category: 'opening', icon: '📖', description: 'Development and center control' },
  { id: 'opening-traps', name: 'Opening Traps', category: 'opening', icon: '🪤', description: 'Avoiding and setting traps' },
  { id: 'early-tactics', name: 'Early Tactics', category: 'opening', icon: '⚡', description: 'Tactical shots in the opening' },
  
  // Psychological Skills
  { id: 'blunder-prevention', name: 'Blunder Prevention', category: 'psychological', icon: '🚫', description: 'Avoiding obvious mistakes' },
  { id: 'time-management', name: 'Time Management', category: 'psychological', icon: '⏰', description: 'Using clock effectively' },
  { id: 'calculation-depth', name: 'Calculation Depth', category: 'psychological', icon: '🧠', description: 'Seeing further ahead' },
  { id: 'pattern-recognition', name: 'Pattern Recognition', category: 'psychological', icon: '👁️', description: 'Instant pattern identification' },
];

const CATEGORY_INFO: Record<string, { name: string; color: string; icon: string }> = {
  tactical: { name: 'Tactics', color: '#ef4444', icon: '⚔️' },
  positional: { name: 'Positional', color: '#4ade80', icon: '♟️' },
  endgame: { name: 'Endgame', color: '#8b5cf6', icon: '♚' },
  opening: { name: 'Opening', color: '#f59e0b', icon: '📖' },
  psychological: { name: 'Mindset', color: '#06b6d4', icon: '🧠' },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getStoredScores(): Record<string, WeaknessScore> {
  try {
    const saved = localStorage.getItem('zenChessWeaknessScores');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveScores(scores: Record<string, WeaknessScore>) {
  localStorage.setItem('zenChessWeaknessScores', JSON.stringify(scores));
}

function aggregateFromStorage(): Record<string, WeaknessScore> {
  const scores: Record<string, WeaknessScore> = {};
  
  // Initialize all skills
  SKILL_AREAS.forEach(skill => {
    scores[skill.id] = {
      skillId: skill.id,
      correct: 0,
      total: 0,
      recentTrend: 'stable',
      lastUpdated: Date.now(),
    };
  });
  
  // Try to get data from Flash Training
  try {
    const flashStats = localStorage.getItem('zenChessFlashStats');
    if (flashStats) {
      const parsed = JSON.parse(flashStats);
      if (parsed.modeStats) {
        // Map flash modes to skill areas
        if (parsed.modeStats.threats) {
          scores['blunder-prevention'].correct += parsed.modeStats.threats.correct || 0;
          scores['blunder-prevention'].total += parsed.modeStats.threats.total || 0;
        }
        if (parsed.modeStats['piece-count']) {
          scores['pattern-recognition'].correct += parsed.modeStats['piece-count'].correct || 0;
          scores['pattern-recognition'].total += parsed.modeStats['piece-count'].total || 0;
        }
        if (parsed.modeStats.evaluation) {
          scores['piece-activity'].correct += parsed.modeStats.evaluation.correct || 0;
          scores['piece-activity'].total += parsed.modeStats.evaluation.total || 0;
        }
        if (parsed.modeStats.plans) {
          scores['prophylaxis'].correct += parsed.modeStats.plans.correct || 0;
          scores['prophylaxis'].total += parsed.modeStats.plans.total || 0;
        }
        if (parsed.modeStats['pawn-structure']) {
          scores['pawn-structure'].correct += parsed.modeStats['pawn-structure'].correct || 0;
          scores['pawn-structure'].total += parsed.modeStats['pawn-structure'].total || 0;
        }
      }
    }
  } catch (e) {
    console.warn('Could not parse flash stats');
  }
  
  // Try to get data from Thinking System
  try {
    const thinkingStats = localStorage.getItem('zenChessThinkingProgress');
    if (thinkingStats) {
      const parsed = JSON.parse(thinkingStats);
      if (parsed.stepMastery) {
        if (parsed.stepMastery.threats) {
          scores['blunder-prevention'].correct += parsed.stepMastery.threats.correct || 0;
          scores['blunder-prevention'].total += parsed.stepMastery.threats.total || 0;
        }
        if (parsed.stepMastery.tactics) {
          scores['forks'].correct += Math.floor((parsed.stepMastery.tactics.correct || 0) / 3);
          scores['forks'].total += Math.floor((parsed.stepMastery.tactics.total || 0) / 3);
          scores['pins'].correct += Math.floor((parsed.stepMastery.tactics.correct || 0) / 3);
          scores['pins'].total += Math.floor((parsed.stepMastery.tactics.total || 0) / 3);
        }
        if (parsed.stepMastery['improve-piece']) {
          scores['piece-activity'].correct += parsed.stepMastery['improve-piece'].correct || 0;
          scores['piece-activity'].total += parsed.stepMastery['improve-piece'].total || 0;
        }
        if (parsed.stepMastery['control-squares']) {
          scores['outposts'].correct += parsed.stepMastery['control-squares'].correct || 0;
          scores['outposts'].total += parsed.stepMastery['control-squares'].total || 0;
        }
      }
    }
  } catch (e) {
    console.warn('Could not parse thinking stats');
  }
  
  // Try to get data from Intuition Trainer
  try {
    const intuitionStats = localStorage.getItem('zenChessIntuitionStats');
    if (intuitionStats) {
      const parsed = JSON.parse(intuitionStats);
      scores['pattern-recognition'].correct += parsed.totalCorrect || 0;
      scores['pattern-recognition'].total += parsed.totalAttempts || 0;
    }
  } catch (e) {
    console.warn('Could not parse intuition stats');
  }
  
  // Try to get data from course progress
  try {
    const courseProgress = localStorage.getItem('zenChessCourseProgress');
    if (courseProgress) {
      const parsed = JSON.parse(courseProgress);
      // Map course IDs to skill areas
      Object.entries(parsed).forEach(([courseId, progress]: [string, any]) => {
        if (progress.variationScores) {
          const totalScores = Object.values(progress.variationScores) as any[];
          const avgScore = totalScores.length > 0 
            ? totalScores.reduce((sum: number, s: any) => sum + (s.lastScore || 0), 0) / totalScores.length
            : 0;
          
          if (courseId.includes('tactical') || courseId.includes('woodpecker')) {
            scores['forks'].correct += Math.floor(avgScore / 20);
            scores['forks'].total += 5;
            scores['pins'].correct += Math.floor(avgScore / 20);
            scores['pins'].total += 5;
          }
          if (courseId.includes('positional')) {
            scores['outposts'].correct += Math.floor(avgScore / 20);
            scores['outposts'].total += 5;
            scores['pawn-structure'].correct += Math.floor(avgScore / 20);
            scores['pawn-structure'].total += 5;
          }
          if (courseId.includes('endgame')) {
            scores['king-pawn'].correct += Math.floor(avgScore / 20);
            scores['king-pawn'].total += 5;
            scores['rook-endgames'].correct += Math.floor(avgScore / 20);
            scores['rook-endgames'].total += 5;
          }
        }
      });
    }
  } catch (e) {
    console.warn('Could not parse course progress');
  }
  
  return scores;
}

function generatePrescriptions(scores: Record<string, WeaknessScore>): TrainingPrescription[] {
  const prescriptions: TrainingPrescription[] = [];
  
  // Calculate accuracy for each skill
  const skillAccuracies: { skillId: string; accuracy: number; total: number }[] = [];
  
  Object.entries(scores).forEach(([skillId, score]) => {
    if (score.total >= 3) { // Minimum attempts to be meaningful
      const accuracy = (score.correct / score.total) * 100;
      skillAccuracies.push({ skillId, accuracy, total: score.total });
    }
  });
  
  // Sort by accuracy (worst first)
  skillAccuracies.sort((a, b) => a.accuracy - b.accuracy);
  
  // Generate prescriptions for worst areas
  skillAccuracies.slice(0, 5).forEach((item, index) => {
    const skill = SKILL_AREAS.find(s => s.id === item.skillId);
    if (!skill) return;
    
    const exercises: string[] = [];
    let reason = '';
    
    // Generate specific exercises based on skill category
    switch (skill.category) {
      case 'tactical':
        exercises.push(`Practice ${skill.name} puzzles in Puzzle Training`);
        exercises.push(`Study ${skill.name} chapter in Woodpecker Method`);
        exercises.push(`Do 10 Flash Training rounds focusing on threats`);
        reason = `Your ${skill.name} accuracy is ${item.accuracy.toFixed(0)}%. This tactical pattern needs drilling.`;
        break;
      case 'positional':
        exercises.push(`Study ${skill.name} in Positional Masterclass`);
        exercises.push(`Practice position evaluation in Intuition Trainer`);
        exercises.push(`Review Thinking System - especially piece improvement`);
        reason = `Your ${skill.name} needs work (${item.accuracy.toFixed(0)}%). Focus on strategic understanding.`;
        break;
      case 'endgame':
        exercises.push(`Study ${skill.name} in Silman's Endgame Course`);
        exercises.push(`Practice endgame positions against Stockfish`);
        exercises.push(`Memorize key ${skill.name} positions`);
        reason = `Endgame weakness detected: ${skill.name} (${item.accuracy.toFixed(0)}%). Endgames win games!`;
        break;
      case 'opening':
        exercises.push(`Review opening principles in Openings section`);
        exercises.push(`Study trappy lines in your repertoire`);
        exercises.push(`Play practice games focusing on development`);
        reason = `Opening knowledge gap: ${skill.name} (${item.accuracy.toFixed(0)}%). Solid openings = better middlegames.`;
        break;
      case 'psychological':
        exercises.push(`Use Calm Play mode for focused practice`);
        exercises.push(`Practice Thinking System before each move`);
        exercises.push(`Do Blindfold Training to improve visualization`);
        reason = `Mental skill needs work: ${skill.name} (${item.accuracy.toFixed(0)}%). Mind over matter!`;
        break;
    }
    
    prescriptions.push({
      skillId: item.skillId,
      urgency: index < 2 ? 'high' : index < 4 ? 'medium' : 'low',
      exercises,
      estimatedTime: 15 + index * 5,
      reason,
    });
  });
  
  // If not enough data, add general recommendations
  if (prescriptions.length < 3) {
    prescriptions.push({
      skillId: 'general-tactics',
      urgency: 'medium',
      exercises: [
        'Complete 20 puzzles in Puzzle Training',
        'Do 5 rounds of Flash Training',
        'Study 1 chapter of Woodpecker Method',
      ],
      estimatedTime: 30,
      reason: 'Not enough training data yet. Start with general tactical training to build your profile!',
    });
  }
  
  return prescriptions;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function WeaknessDetectorPage() {
  const navigate = useNavigate();
  
  // State
  const [scores, setScores] = useState<Record<string, WeaknessScore>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  
  // Load and analyze data
  useEffect(() => {
    setIsAnalyzing(true);
    
    // Simulate analysis time for effect
    const timer = setTimeout(() => {
      const aggregated = aggregateFromStorage();
      setScores(aggregated);
      saveScores(aggregated);
      setIsAnalyzing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate prescriptions
  const prescriptions = useMemo(() => generatePrescriptions(scores), [scores]);
  
  // Filter skills by category
  const filteredSkills = useMemo(() => {
    return SKILL_AREAS.filter(skill => 
      selectedCategory === 'all' || skill.category === selectedCategory
    );
  }, [selectedCategory]);
  
  // Calculate overall stats
  const overallStats = useMemo(() => {
    let totalCorrect = 0;
    let totalAttempts = 0;
    let weakAreas = 0;
    let strongAreas = 0;
    
    Object.values(scores).forEach(score => {
      totalCorrect += score.correct;
      totalAttempts += score.total;
      
      if (score.total >= 3) {
        const accuracy = (score.correct / score.total) * 100;
        if (accuracy < 50) weakAreas++;
        else if (accuracy >= 70) strongAreas++;
      }
    });
    
    return {
      totalCorrect,
      totalAttempts,
      overallAccuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
      weakAreas,
      strongAreas,
    };
  }, [scores]);
  
  // ============================================
  // RENDER: ANALYZING
  // ============================================
  if (isAnalyzing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🔍</div>
          <h2 className="text-2xl font-display mb-4" style={{ color: 'var(--text-primary)' }}>
            Analyzing Your Training Data...
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Scanning puzzles, courses, and training sessions
          </p>
          <div className="mt-8 w-64 h-2 rounded-full mx-auto overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="h-full rounded-full animate-pulse"
              style={{ 
                width: '60%',
                background: 'linear-gradient(90deg, var(--accent-primary), #a855f7)'
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: MAIN
  // ============================================
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-sm mb-4">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
            Home
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>Weakness Detector</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          📊 Weakness Detector
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
          Your personalized training analysis and prescription
        </p>
      </header>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-value text-gradient">{overallStats.overallAccuracy}%</div>
          <div className="stat-label">Overall Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#ef4444' }}>{overallStats.weakAreas}</div>
          <div className="stat-label">Weak Areas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4ade80' }}>{overallStats.strongAreas}</div>
          <div className="stat-label">Strong Areas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#a855f7' }}>{overallStats.totalAttempts}</div>
          <div className="stat-label">Total Exercises</div>
        </div>
      </div>
      
      {/* Training Prescriptions */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💊</span>
          <div>
            <h2 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
              Your Training Prescription
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Targeted exercises to improve your weakest areas
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {prescriptions.map((prescription, index) => {
            const skill = SKILL_AREAS.find(s => s.id === prescription.skillId);
            const score = scores[prescription.skillId];
            const accuracy = score?.total > 0 ? Math.round((score.correct / score.total) * 100) : null;
            
            return (
              <div 
                key={prescription.skillId || index}
                className="p-5 rounded-xl"
                style={{ 
                  background: prescription.urgency === 'high' 
                    ? 'rgba(239, 68, 68, 0.1)' 
                    : prescription.urgency === 'medium'
                    ? 'rgba(251, 191, 36, 0.1)'
                    : 'var(--bg-tertiary)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill?.icon || '📋'}</span>
                    <div>
                      <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {skill?.name || 'General Training'}
                      </h3>
                      {accuracy !== null && (
                        <span className="text-sm font-mono" style={{ 
                          color: accuracy < 50 ? '#ef4444' : accuracy < 70 ? '#fbbf24' : '#4ade80' 
                        }}>
                          {accuracy}% accuracy
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium uppercase"
                      style={{ 
                        background: prescription.urgency === 'high' 
                          ? '#ef4444' 
                          : prescription.urgency === 'medium'
                          ? '#fbbf24'
                          : '#4ade80',
                        color: 'black'
                      }}
                    >
                      {prescription.urgency}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      ~{prescription.estimatedTime}min
                    </span>
                  </div>
                </div>
                
                <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  {prescription.reason}
                </p>
                
                <div className="space-y-2">
                  {prescription.exercises.map((exercise, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>→</span>
                      <span>{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Skill Breakdown by Category */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
            Skill Breakdown
          </h2>
          
          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                selectedCategory === 'all' ? 'ring-2 ring-[var(--accent-primary)]' : ''
              }`}
              style={{ background: selectedCategory === 'all' ? 'var(--accent-primary)' + '30' : 'var(--bg-tertiary)' }}
            >
              All
            </button>
            {Object.entries(CATEGORY_INFO).map(([cat, info]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-sm transition-all flex items-center gap-1 ${
                  selectedCategory === cat ? 'ring-2' : ''
                }`}
                style={{ 
                  background: selectedCategory === cat ? info.color + '30' : 'var(--bg-tertiary)',
                  ringColor: info.color
                }}
              >
                <span>{info.icon}</span>
                <span className="hidden sm:inline">{info.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {filteredSkills.map(skill => {
            const score = scores[skill.id];
            const accuracy = score?.total > 0 ? Math.round((score.correct / score.total) * 100) : null;
            const categoryInfo = CATEGORY_INFO[skill.category];
            
            return (
              <div 
                key={skill.id}
                className="p-4 rounded-xl flex items-center gap-4"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: categoryInfo.color + '20' }}
                >
                  {skill.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </span>
                    {accuracy !== null ? (
                      <span 
                        className="text-sm font-mono font-bold"
                        style={{ 
                          color: accuracy < 50 ? '#ef4444' : accuracy < 70 ? '#fbbf24' : '#4ade80' 
                        }}
                      >
                        {accuracy}%
                      </span>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        No data
                      </span>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: accuracy !== null ? `${accuracy}%` : '0%',
                        background: accuracy !== null 
                          ? accuracy < 50 ? '#ef4444' : accuracy < 70 ? '#fbbf24' : '#4ade80'
                          : 'var(--bg-tertiary)'
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {skill.description}
                    </span>
                    {score?.total > 0 && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {score.total} exercises
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/train')}
          className="card-interactive p-5 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              🧩
            </div>
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Puzzle Training</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Improve tactical skills
              </p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => navigate('/courses')}
          className="card-interactive p-5 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(74, 222, 128, 0.15)' }}>
              📚
            </div>
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Study Courses</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Deep learning
              </p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => navigate('/flash-training')}
          className="card-interactive p-5 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
              ⚡
            </div>
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Flash Training</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Pattern recognition
              </p>
            </div>
          </div>
        </button>
      </div>
      
      {/* Tips */}
      <div className="card p-6" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(6, 182, 212, 0.1))' }}>
        <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          💡 Training Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <span>•</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Focus on your <strong>weakest areas first</strong> - that's where you'll gain the most rating points
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <strong>Consistency beats intensity</strong> - 15 minutes daily is better than 2 hours once a week
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Complete full courses rather than jumping between them - <strong>depth over breadth</strong>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Use <strong>spaced repetition</strong> - review previous material to solidify learning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeaknessDetectorPage;

