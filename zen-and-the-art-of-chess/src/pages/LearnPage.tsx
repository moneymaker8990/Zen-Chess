import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useContainerBoardSize } from '@/hooks/useBoardSize';
import { BackButton } from '@/components/BackButton';
import { CURRICULUM } from '@/data/curriculum';
import type { Lesson, LessonStep } from '@/data/curriculum';

// ============================================
// LEARN PAGE - Interactive Lesson Viewer
// ============================================

export function LearnPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const boardStyles = useBoardStyles();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const boardSize = useContainerBoardSize(boardContainerRef, 360, 16);
  
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
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎉</div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-primary)' }}>
            Lesson Complete!
          </h1>
          <p className="text-sm sm:text-lg mb-4 sm:mb-6" style={{ color: 'var(--text-tertiary)' }}>
            You've completed "{lesson.title}"
          </p>
          
          {/* Key Points Summary */}
          <div 
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-left"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
              Key Takeaways:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                  <span style={{ color: '#22c55e' }}>✓</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <button
              onClick={() => navigate('/journey')}
              className="btn-secondary text-sm sm:text-base"
            >
              Back to Journey
            </button>
            {nextLesson && (
              <button
                onClick={() => navigate(`/learn/${nextLesson.id}`)}
                className="btn-primary text-sm sm:text-base"
              >
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 sm:pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-30 py-2 sm:py-4 px-3 sm:px-6 border-b"
        style={{ 
          background: 'var(--bg-primary)', 
          borderColor: 'var(--border-subtle)' 
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <BackButton fallback="/journey" label="Back" />
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              {currentStepIndex + 1} / {lesson.steps.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-1.5 sm:h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
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
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          {/* Top on mobile, Right on desktop: Chessboard */}
          <div 
            ref={boardContainerRef}
            className="md:sticky md:top-24 self-start flex-shrink-0 w-full md:w-[360px] md:order-2 max-w-full overflow-hidden"
          >
            {currentStep?.fen ? (
              <div className="animate-fade-in flex justify-center">
                <div 
                  className="rounded-xl overflow-hidden shadow-2xl"
                  style={{ maxWidth: '100%', width: `${boardSize}px` }}
                >
                  <Chessboard
                    position={currentStep.fen}
                    boardWidth={boardSize}
                    arePiecesDraggable={false}
                    customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                    customLightSquareStyle={boardStyles.customLightSquareStyle}
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
              </div>
            ) : (
              <div 
                className="aspect-square max-w-[280px] mx-auto rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">{lesson.icon}</div>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>No position</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom on mobile, Left on desktop: Text Content */}
          <div className="flex-1 md:order-1">
            {/* Section badge */}
            <div 
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm mb-3 sm:mb-4"
              style={{ 
                background: `${section.bgColor}33`,
                color: 'white',
              }}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </div>

            {/* Lesson title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
              {lesson.title}
            </h1>
            <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: 'var(--text-tertiary)' }}>
              {lesson.subtitle}
            </p>

            {/* Current step */}
            {currentStep && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl font-display font-medium mb-3 sm:mb-4" style={{ color: 'var(--accent-primary)' }}>
                  {currentStep.title}
                </h2>
                <div 
                  className="prose prose-invert max-w-none text-sm sm:text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {currentStep.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 sm:mb-4 leading-relaxed whitespace-pre-line">
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
        </div>
      </div>

      {/* Navigation Footer */}
      <div 
        className="fixed bottom-0 left-0 right-0 py-2 sm:py-4 px-3 sm:px-6 border-t"
        style={{ 
          background: 'var(--bg-primary)', 
          borderColor: 'var(--border-subtle)' 
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all text-sm ${
              currentStepIndex === 0 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:bg-[var(--bg-hover)]'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Step indicators - hidden on mobile, use X/Y counter instead */}
          <div className="hidden sm:flex gap-1.5">
            {lesson.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  i === currentStepIndex ? 'scale-125' : 'opacity-50'
                }`}
                style={{ 
                  background: i <= currentStepIndex ? section.bgColor : 'var(--bg-tertiary)' 
                }}
              />
            ))}
          </div>
          <div className="sm:hidden text-xs" style={{ color: 'var(--text-muted)' }}>
            Step {currentStepIndex + 1}/{lesson.steps.length}
          </div>

          <button
            onClick={goNext}
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-white text-sm transition-all hover:scale-[1.02]"
            style={{ background: section.bgColor }}
          >
            {currentStepIndex === lesson.steps.length - 1 ? 'Done' : 'Next'}
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;

