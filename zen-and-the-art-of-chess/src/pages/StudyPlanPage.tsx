// ============================================
// STUDY PLAN PAGE
// Custom study plans with scheduling
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { STUDY_PLAN_PRESETS, XP_REWARDS, type StudyPlanPreset } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

interface StudyTask {
  id: string;
  type: 'puzzle' | 'lesson' | 'opening' | 'pattern' | 'analysis' | 'video';
  title: string;
  duration: number; // minutes
  completed: boolean;
  xp: number;
}

interface StudyPlan {
  id: string;
  name: string;
  preset: StudyPlanPreset | 'custom';
  dailyDuration: number; // minutes
  tasks: StudyTask[];
  createdAt: number;
  lastModified: number;
  daysCompleted: number;
  currentStreak: number;
}

interface DailyProgress {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  minutesStudied: number;
  xpEarned: number;
}

// ============================================
// STORAGE HELPERS
// ============================================

function loadStudyPlan(): StudyPlan | null {
  try {
    const stored = localStorage.getItem('zen-chess-study-plan');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveStudyPlan(plan: StudyPlan) {
  localStorage.setItem('zen-chess-study-plan', JSON.stringify(plan));
}

function loadDailyProgress(): DailyProgress[] {
  try {
    const stored = localStorage.getItem('zen-chess-study-progress');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveDailyProgress(progress: DailyProgress[]) {
  localStorage.setItem('zen-chess-study-progress', JSON.stringify(progress));
}

// ============================================
// TASK GENERATORS
// ============================================

function generateTasksForPreset(preset: StudyPlanPreset, duration: number): StudyTask[] {
  const config = STUDY_PLAN_PRESETS[preset];
  const tasks: StudyTask[] = [];
  let remainingTime = duration;
  
  // Generate tasks based on focus areas
  const focusAreas = config.focusAreas;
  const timePerArea = Math.floor(duration / focusAreas.length);
  
  focusAreas.forEach((area, index) => {
    const areaTime = index === focusAreas.length - 1 ? remainingTime : timePerArea;
    
    switch (area) {
      case 'basics':
      case 'strategy':
      case 'middlegame':
        tasks.push({
          id: `${area}-lesson-${Date.now()}-${index}`,
          type: 'lesson',
          title: `${area.charAt(0).toUpperCase() + area.slice(1)} Lesson`,
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.lessonCompleted,
        });
        break;
      case 'tactics':
      case 'calculation':
        tasks.push({
          id: `${area}-puzzles-${Date.now()}-${index}`,
          type: 'puzzle',
          title: 'Tactical Puzzles',
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.puzzleSolved * 5,
        });
        break;
      case 'openings':
        tasks.push({
          id: `opening-study-${Date.now()}-${index}`,
          type: 'opening',
          title: 'Opening Repertoire',
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.lessonCompleted,
        });
        break;
      case 'patterns':
      case 'pawn-structures':
      case 'piece-play':
        tasks.push({
          id: `pattern-training-${Date.now()}-${index}`,
          type: 'pattern',
          title: 'Pattern Recognition',
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.patternMastered,
        });
        break;
      case 'endgames':
        tasks.push({
          id: `endgame-study-${Date.now()}-${index}`,
          type: 'lesson',
          title: 'Endgame Study',
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.lessonCompleted,
        });
        break;
      case 'analysis':
        tasks.push({
          id: `game-analysis-${Date.now()}-${index}`,
          type: 'analysis',
          title: 'Game Analysis',
          duration: areaTime,
          completed: false,
          xp: XP_REWARDS.gameAnalyzed,
        });
        break;
    }
    
    remainingTime -= timePerArea;
  });
  
  return tasks;
}

// ============================================
// COMPONENT
// ============================================

export function StudyPlanPage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [viewMode, setViewMode] = useState<'overview' | 'create' | 'daily'>('overview');
  const [selectedPreset, setSelectedPreset] = useState<StudyPlanPreset | null>(null);
  const [customDuration, setCustomDuration] = useState(30);
  const [customName, setCustomName] = useState('');

  // Load data
  useEffect(() => {
    setPlan(loadStudyPlan());
    setDailyProgress(loadDailyProgress());
  }, []);

  // Calculate today's progress
  const todayStr = new Date().toISOString().split('T')[0];
  const todayProgress = useMemo(() => {
    return dailyProgress.find(p => p.date === todayStr) || {
      date: todayStr,
      tasksCompleted: 0,
      totalTasks: plan?.tasks.length || 0,
      minutesStudied: 0,
      xpEarned: 0,
    };
  }, [dailyProgress, todayStr, plan]);

  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekProgress = dailyProgress.filter(p => new Date(p.date) >= weekAgo);
    
    return {
      daysStudied: weekProgress.length,
      totalMinutes: weekProgress.reduce((sum, p) => sum + p.minutesStudied, 0),
      totalXP: weekProgress.reduce((sum, p) => sum + p.xpEarned, 0),
      avgCompletion: weekProgress.length > 0
        ? Math.round(weekProgress.reduce((sum, p) => sum + (p.tasksCompleted / p.totalTasks) * 100, 0) / weekProgress.length)
        : 0,
    };
  }, [dailyProgress]);

  // Create new plan
  const handleCreatePlan = () => {
    if (!selectedPreset || !customName) return;
    
    const config = STUDY_PLAN_PRESETS[selectedPreset];
    const tasks = generateTasksForPreset(selectedPreset, customDuration || config.duration);
    
    const newPlan: StudyPlan = {
      id: `plan-${Date.now()}`,
      name: customName,
      preset: selectedPreset,
      dailyDuration: customDuration || config.duration,
      tasks,
      createdAt: Date.now(),
      lastModified: Date.now(),
      daysCompleted: 0,
      currentStreak: 0,
    };
    
    setPlan(newPlan);
    saveStudyPlan(newPlan);
    setViewMode('overview');
  };

  // Complete a task
  const handleCompleteTask = (taskId: string) => {
    if (!plan) return;
    
    const updatedTasks = plan.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    
    const completedTask = plan.tasks.find(t => t.id === taskId);
    
    const updatedPlan = { ...plan, tasks: updatedTasks, lastModified: Date.now() };
    setPlan(updatedPlan);
    saveStudyPlan(updatedPlan);
    
    // Update daily progress
    const existingProgress = dailyProgress.find(p => p.date === todayStr);
    const newProgress: DailyProgress = existingProgress ? {
      ...existingProgress,
      tasksCompleted: existingProgress.tasksCompleted + 1,
      minutesStudied: existingProgress.minutesStudied + (completedTask?.duration || 0),
      xpEarned: existingProgress.xpEarned + (completedTask?.xp || 0),
    } : {
      date: todayStr,
      tasksCompleted: 1,
      totalTasks: plan.tasks.length,
      minutesStudied: completedTask?.duration || 0,
      xpEarned: completedTask?.xp || 0,
    };
    
    const updatedProgress = existingProgress
      ? dailyProgress.map(p => p.date === todayStr ? newProgress : p)
      : [...dailyProgress, newProgress];
    
    setDailyProgress(updatedProgress);
    saveDailyProgress(updatedProgress);
  };

  // Navigate to task
  const handleStartTask = (task: StudyTask) => {
    switch (task.type) {
      case 'puzzle':
        navigate('/train');
        break;
      case 'lesson':
        navigate('/journey');
        break;
      case 'opening':
        navigate('/openings');
        break;
      case 'pattern':
        navigate('/patterns');
        break;
      case 'analysis':
        navigate('/play');
        break;
      case 'video':
        // Would navigate to video lesson
        break;
    }
  };

  // Reset plan
  const handleResetPlan = () => {
    localStorage.removeItem('zen-chess-study-plan');
    setPlan(null);
    setViewMode('create');
  };

  // ==================== CREATE VIEW ====================
  if (viewMode === 'create' || !plan) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Create Your Study Plan
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Choose a preset or customize your own learning path
          </p>
        </section>

        {/* Preset Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(STUDY_PLAN_PRESETS) as StudyPlanPreset[]).map(preset => {
            const config = STUDY_PLAN_PRESETS[preset];
            const isSelected = selectedPreset === preset;
            
            return (
              <button
                key={preset}
                onClick={() => {
                  setSelectedPreset(preset);
                  setCustomDuration(config.duration);
                  setCustomName(config.name);
                }}
                className={`study-plan-card text-left ${isSelected ? 'ring-2 ring-[var(--accent-primary)]' : ''}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: isSelected ? 'var(--accent-primary)' : 'var(--bg-tertiary)' }}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                      {config.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {config.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>
                    {config.duration} min/day
                  </span>
                  <div className="flex gap-1">
                    {config.focusAreas.slice(0, 3).map(area => (
                      <span 
                        key={area}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Customization */}
        {selectedPreset && (
          <div className="card p-6 space-y-4">
            <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
              Customize Your Plan
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Plan Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="zen-input"
                  placeholder="My Study Plan"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Daily Duration (minutes)
                </label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="zen-input"
                  min={15}
                  max={180}
                />
              </div>
            </div>

            <button
              onClick={handleCreatePlan}
              disabled={!customName}
              className="zen-button w-full mt-4"
            >
              Create Study Plan
            </button>
          </div>
        )}
      </div>
    );
  }

  // ==================== OVERVIEW VIEW ====================
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            {plan.name}
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            {plan.dailyDuration} minutes daily • {plan.tasks.length} tasks
          </p>
        </div>
        <button
          onClick={handleResetPlan}
          className="btn-ghost"
        >
          🔄 Change Plan
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-value text-gradient">{weeklyStats.daysStudied}</div>
          <div className="stat-label">Days This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{weeklyStats.totalMinutes}</div>
          <div className="stat-label">Minutes Studied</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4ade80' }}>{weeklyStats.avgCompletion}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>{weeklyStats.totalXP}</div>
          <div className="stat-label">XP Earned</div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today's Progress</h2>
          <span className="badge badge-green">
            {plan.tasks.filter(t => t.completed).length}/{plan.tasks.length} tasks
          </span>
        </div>
        
        <div className="progress-bar mb-6" style={{ height: '10px' }}>
          <div 
            className="progress-bar-fill purple"
            style={{ width: `${(plan.tasks.filter(t => t.completed).length / plan.tasks.length) * 100}%` }}
          />
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {plan.tasks.map(task => (
            <div 
              key={task.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                task.completed ? 'opacity-60' : ''
              }`}
              style={{ background: 'var(--bg-tertiary)' }}
            >
              {/* Checkbox */}
              <button
                onClick={() => handleCompleteTask(task.id)}
                disabled={task.completed}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  task.completed 
                    ? 'bg-[#4ade80]/20 text-[#4ade80]' 
                    : 'border-2 border-[var(--border-default)] hover:border-[var(--accent-primary)]'
                }`}
              >
                {task.completed && '✓'}
              </button>

              {/* Task info */}
              <div className="flex-1">
                <h4 className={`font-medium ${task.completed ? 'line-through' : ''}`} style={{ color: 'var(--text-primary)' }}>
                  {task.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {task.duration} min • +{task.xp} XP
                </p>
              </div>

              {/* Start button */}
              {!task.completed && (
                <button
                  onClick={() => handleStartTask(task)}
                  className="btn-secondary"
                >
                  Start
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="card p-6">
        <h2 className="section-title mb-4">This Week</h2>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const dateStr = date.toISOString().split('T')[0];
            const dayProgress = dailyProgress.find(p => p.date === dateStr);
            const isToday = dateStr === todayStr;
            const completed = dayProgress && dayProgress.tasksCompleted === dayProgress.totalTasks;
            
            return (
              <div 
                key={i}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                  isToday ? 'ring-2 ring-[var(--accent-primary)]' : ''
                }`}
                style={{ 
                  background: completed 
                    ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))'
                    : dayProgress 
                      ? 'rgba(168, 85, 247, 0.15)'
                      : 'var(--bg-tertiary)'
                }}
              >
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}
                </span>
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {date.getDate()}
                </span>
                {completed && <span className="text-xs">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/train')}
          className="card p-5 text-left hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
              ⚔️
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Puzzles</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Tactical training</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => navigate('/journey')}
          className="card p-5 text-left hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(74, 222, 128, 0.15)' }}>
              📚
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Lessons</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Structured learning</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => navigate('/patterns')}
          className="card p-5 text-left hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(212, 161, 59, 0.15)' }}>
              🎯
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Patterns</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Pattern recognition</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default StudyPlanPage;




