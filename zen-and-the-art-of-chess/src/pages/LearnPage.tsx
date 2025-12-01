import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { CURRICULUM } from '@/data/curriculum';
import type { Lesson, LessonStep } from '@/data/curriculum';

// ============================================
// LEARN PAGE - Interactive Lesson Viewer
// ============================================

export function LearnPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  
  // Find the lesson
  const lesson = useMemo(() => {
    for (const section of CURRICULUM) {
      const found = section.lessons.find(l => l.id === lessonId);
      if (found) return found;
    }
    return null;
  }, [lessonId]);

  // Find section for this lesson
  const section = useMemo(() => {
    if (!lesson) return null;
    return CURRICULUM.find(s => s.id === lesson.sectionId);
  }, [lesson]);

  // Get next/previous lesson
  const { prevLesson, nextLesson } = useMemo(() => {
    if (!lesson || !section) return { prevLesson: null, nextLesson: null };
    const idx = section.lessons.findIndex(l => l.id === lesson.id);
    return {
      prevLesson: idx > 0 ? section.lessons[idx - 1] : null,
      nextLesson: idx < section.lessons.length - 1 ? section.lessons[idx + 1] : null,
    };
  }, [lesson, section]);

  const currentStep = lesson?.steps[currentStepIndex];
  const progress = lesson ? ((currentStepIndex + 1) / lesson.steps.length) * 100 : 0;

  const goNext = () => {
    if (!lesson) return;
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Reset when lesson changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setShowComplete(false);
  }, [lessonId]);

  if (!lesson || !section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-display mb-4" style={{ color: 'var(--text-primary)' }}>
            Lesson not found
          </h1>
          <button onClick={() => navigate('/journey')} className="btn-primary">
            Back to Journey
          </button>
        </div>
      </div>
    );
  }

  // Completion screen
  if (showComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-3xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Lesson Complete!
          </h1>
          <p className="text-lg mb-6" style={{ color: 'var(--text-tertiary)' }}>
            You've completed "{lesson.title}"
          </p>
          
          {/* Key Points Summary */}
          <div 
            className="rounded-2xl p-6 mb-6 text-left"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Key Takeaways:
            </h3>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#22c55e' }}>✓</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/journey')}
              className="btn-secondary"
            >
              Back to Journey
            </button>
            {nextLesson && (
              <button
                onClick={() => navigate(`/learn/${nextLesson.id}`)}
                className="btn-primary"
              >
                Next: {nextLesson.title} →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-30 py-4 px-6 border-b"
        style={{ 
          background: 'var(--bg-primary)', 
          borderColor: 'var(--border-subtle)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/journey')}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {currentStepIndex + 1} / {lesson.steps.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${section.bgColor}, ${section.bgColor}dd)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Text Content */}
          <div>
            {/* Section badge */}
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4"
              style={{ 
                background: `${section.bgColor}33`,
                color: 'white',
              }}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </div>

            {/* Lesson title */}
            <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {lesson.title}
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
              {lesson.subtitle}
            </p>

            {/* Current step */}
            {currentStep && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-medium mb-4" style={{ color: 'var(--accent-primary)' }}>
                  {currentStep.title}
                </h2>
                <div 
                  className="prose prose-invert max-w-none"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {currentStep.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed whitespace-pre-line">
                      {paragraph.split('**').map((part, j) => 
                        j % 2 === 1 
                          ? <strong key={j} style={{ color: 'var(--text-primary)' }}>{part}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Chessboard */}
          <div className="lg:sticky lg:top-24 self-start">
            {currentStep?.fen ? (
              <div className="animate-fade-in">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <Chessboard
                    position={currentStep.fen}
                    boardWidth={400}
                    arePiecesDraggable={false}
                    customDarkSquareStyle={{ backgroundColor: '#779556' }}
                    customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                    customSquareStyles={
                      currentStep.highlights?.reduce((acc, sq) => ({
                        ...acc,
                        [sq]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
                      }), {})
                    }
                    customArrows={
                      currentStep.arrows?.map(([from, to]) => [from, to, 'rgba(0, 150, 255, 0.8)']) as any
                    }
                  />
                </div>
                {currentStep.highlights && currentStep.highlights.length > 0 && (
                  <p className="text-center text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
                    Highlighted squares show important positions
                  </p>
                )}
              </div>
            ) : (
              <div 
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{lesson.icon}</div>
                  <p style={{ color: 'var(--text-muted)' }}>No position for this step</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div 
        className="fixed bottom-0 left-0 right-0 py-4 px-6 border-t"
        style={{ 
          background: 'var(--bg-primary)', 
          borderColor: 'var(--border-subtle)' 
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              currentStepIndex === 0 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:bg-[var(--bg-hover)]'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {/* Step indicators */}
          <div className="flex gap-1.5">
            {lesson.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentStepIndex ? 'scale-125' : 'opacity-50'
                }`}
                style={{ 
                  background: i <= currentStepIndex ? section.bgColor : 'var(--bg-tertiary)' 
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
            style={{ background: section.bgColor }}
          >
            {currentStepIndex === lesson.steps.length - 1 ? 'Complete' : 'Next'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;

