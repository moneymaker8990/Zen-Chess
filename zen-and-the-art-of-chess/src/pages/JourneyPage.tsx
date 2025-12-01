import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { CURRICULUM, type Section, type Lesson } from '@/data/curriculum';

export function JourneyPage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(CURRICULUM[0].id);
  
  // Calculate XP and progress
  const totalXP = progress.puzzlesSolved + progress.currentDay;
  
  // Calculate lessons completed per section (simulated from XP)
  const getSectionProgress = (section: Section, index: number) => {
    if (totalXP < section.requiredXP) return { completed: 0, total: section.lessons.length, unlocked: false };
    
    const nextSection = CURRICULUM[index + 1];
    const xpRange = nextSection ? nextSection.requiredXP - section.requiredXP : 100;
    const xpInSection = Math.min(totalXP - section.requiredXP, xpRange);
    const lessonsCompleted = Math.min(
      section.lessons.length,
      Math.floor((xpInSection / xpRange) * section.lessons.length)
    );
    
    return { completed: lessonsCompleted, total: section.lessons.length, unlocked: true };
  };

  // Find current section
  const currentSectionIndex = useMemo(() => {
    for (let i = CURRICULUM.length - 1; i >= 0; i--) {
      if (totalXP >= CURRICULUM[i].requiredXP) return i;
    }
    return 0;
  }, [totalXP]);

  const handleLessonClick = (lesson: Lesson, sectionUnlocked: boolean, lessonUnlocked: boolean) => {
    if (sectionUnlocked && lessonUnlocked) {
      // Navigate to the learn page for this lesson
      navigate(`/learn/${lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Header with Coach */}
      <div 
        className="relative py-10 mb-8"
        style={{ 
          background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.15) 0%, transparent 100%)' 
        }}
      >
        {/* Coach Avatar & Quote */}
        <div className="max-w-4xl mx-auto px-6 flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            🧙‍♂️
          </div>
          <div 
            className="relative px-5 py-3 rounded-2xl max-w-md"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <div 
              className="absolute left-0 top-4 w-0 h-0 -translate-x-2"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '8px solid var(--bg-elevated)',
              }}
            />
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
              "A bad plan in chess is better than no plan at all."
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              — Mikhail Chigorin
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Learn Chess
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Master the game from basics to advanced strategy
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <span>⭐</span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{totalXP} XP</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <span>🔥</span>
            <span className="font-bold" style={{ color: '#f59e0b' }}>{progress.streakDays} streak</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <span>📚</span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              {CURRICULUM.reduce((acc, s, i) => acc + getSectionProgress(s, i).completed, 0)}/
              {CURRICULUM.reduce((acc, s) => acc + s.lessons.length, 0)} lessons
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum Sections */}
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {CURRICULUM.map((section, sectionIndex) => {
          const { completed, total, unlocked } = getSectionProgress(section, sectionIndex);
          const isExpanded = expandedSection === section.id;
          const isCurrent = sectionIndex === currentSectionIndex;
          
          return (
            <div key={section.id} className="relative">
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                disabled={!unlocked}
                className={`
                  w-full rounded-2xl p-5 text-left transition-all duration-300
                  ${unlocked 
                    ? 'hover:scale-[1.01] cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                  }
                  ${isCurrent && unlocked ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-primary)] ring-green-500' : ''}
                `}
                style={{ 
                  background: unlocked 
                    ? `linear-gradient(135deg, ${section.bgColor} 0%, ${section.bgColor}dd 100%)`
                    : 'var(--bg-tertiary)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Section Icon */}
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg transform rotate-45 ${unlocked ? `bg-gradient-to-br ${section.color}` : 'bg-gray-600'}`}
                    >
                      <span className="-rotate-45">
                        {unlocked ? (completed === total ? '✓' : section.lessons[0].icon) : '🔒'}
                      </span>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-display font-bold text-white">
                        {section.title}
                      </h2>
                      <p className="text-sm text-white/70">
                        {section.subtitle}
                      </p>
                      {unlocked && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-32 h-1.5 rounded-full bg-white/20 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-white/80 transition-all"
                              style={{ width: `${(completed / total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-white/60">
                            {completed}/{total}
                          </span>
                        </div>
                      )}
                      {!unlocked && (
                        <p className="text-xs text-white/50 mt-1">
                          Requires {section.requiredXP} XP to unlock
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Expand Arrow */}
                  {unlocked && (
                    <svg 
                      className={`w-6 h-6 text-white/60 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Lessons Grid */}
              {isExpanded && unlocked && (
                <div className="mt-3 grid gap-2 animate-fade-in">
                  {section.lessons.map((lesson, lessonIndex) => {
                    const lessonUnlocked = lessonIndex <= completed;
                    const lessonCompleted = lessonIndex < completed;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson, unlocked, lessonUnlocked)}
                        disabled={!lessonUnlocked}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl text-left transition-all
                          ${lessonUnlocked 
                            ? 'hover:scale-[1.01] cursor-pointer' 
                            : 'opacity-40 cursor-not-allowed'
                          }
                        `}
                        style={{ 
                          background: lessonCompleted 
                            ? 'rgba(34, 197, 94, 0.15)' 
                            : lessonUnlocked 
                              ? 'var(--bg-elevated)' 
                              : 'var(--bg-tertiary)',
                          border: lessonIndex === completed ? '2px solid rgba(34, 197, 94, 0.5)' : '1px solid transparent',
                        }}
                      >
                        {/* Lesson Icon */}
                        <div 
                          className={`
                            w-12 h-12 rounded-xl flex items-center justify-center text-xl
                            transform rotate-45
                            ${lessonCompleted 
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30' 
                              : lessonUnlocked 
                                ? `bg-gradient-to-br ${section.color} shadow-lg` 
                                : 'bg-gray-700'
                            }
                          `}
                        >
                          <span className="-rotate-45">
                            {lessonCompleted ? '✓' : lessonUnlocked ? lesson.icon : '🔒'}
                          </span>
                        </div>
                        
                        {/* Lesson Info */}
                        <div className="flex-1">
                          <h3 
                            className="font-medium"
                            style={{ color: lessonUnlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}
                          >
                            {lesson.title}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                            {lesson.subtitle}
                          </p>
                        </div>
                        
                        {/* Duration */}
                        <div className="text-right">
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {lesson.duration}
                          </span>
                        </div>
                        
                        {/* Arrow */}
                        {lessonUnlocked && !lessonCompleted && (
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Lesson CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40" style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg-primary) 50%)' }}>
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--text-secondary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => {
              // Navigate to the next incomplete lesson
              for (const section of CURRICULUM) {
                const { completed, unlocked } = getSectionProgress(section, CURRICULUM.indexOf(section));
                if (unlocked && completed < section.lessons.length) {
                  navigate(section.lessons[completed].path);
                  return;
                }
              }
            }}
            className="flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
          >
            Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
