// ============================================
// FIRST-TIME ONBOARDING FLOW
// Guided setup for new users
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useProgressStore } from '@/state/useStore';
import { useBoardSettingsStore } from '@/state/boardSettingsStore';

// ============================================
// ONBOARDING STORE
// ============================================

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  userProfile: {
    name: string;
    experience: 'beginner' | 'intermediate' | 'advanced' | '';
    goals: string[];
    preferredTime: 'morning' | 'afternoon' | 'evening' | 'night' | '';
    tiltTendency: 'low' | 'medium' | 'high' | '';
  };
  completeOnboarding: () => void;
  setStep: (step: number) => void;
  updateProfile: (profile: Partial<OnboardingState['userProfile']>) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      currentStep: 0,
      userProfile: {
        name: '',
        experience: '',
        goals: [],
        preferredTime: '',
        tiltTendency: '',
      },
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      setStep: (step) => set({ currentStep: step }),
      updateProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      resetOnboarding: () => set({
        hasCompletedOnboarding: false,
        currentStep: 0,
        userProfile: {
          name: '',
          experience: '',
          goals: [],
          preferredTime: '',
          tiltTendency: '',
        }
      }),
    }),
    { name: 'zen-chess-onboarding' }
  )
);

// ============================================
// ONBOARDING STEPS
// ============================================

const STEPS = [
  { id: 'welcome', title: 'Welcome', icon: '♔' },
  { id: 'experience', title: 'Experience', icon: '📊' },
  { id: 'goals', title: 'Goals', icon: '🎯' },
  { id: 'style', title: 'Style', icon: '☯' },
  { id: 'ready', title: 'Ready', icon: '🚀' },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function OnboardingFlow() {
  const navigate = useNavigate();
  const { 
    currentStep, 
    userProfile, 
    setStep, 
    updateProfile, 
    completeOnboarding 
  } = useOnboardingStore();
  const { updateSettings } = useProgressStore();
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // Apply user preferences
    if (userProfile.experience === 'beginner') {
      updateSettings({ engineStrength: 3 });
    } else if (userProfile.experience === 'intermediate') {
      updateSettings({ engineStrength: 10 });
    } else {
      updateSettings({ engineStrength: 18 });
    }
    
    completeOnboarding();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
    >
      {/* Progress Bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <div className="flex items-center gap-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div 
                className="h-1 rounded-full transition-all duration-500"
                style={{ 
                  background: index <= currentStep 
                    ? 'linear-gradient(90deg, #a855f7, #3b82f6)' 
                    : 'rgba(255,255,255,0.1)'
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {STEPS.map((step, index) => (
            <span 
              key={step.id}
              className="text-xs transition-colors"
              style={{ 
                color: index <= currentStep ? 'var(--text-secondary)' : 'var(--text-muted)'
              }}
            >
              {step.icon}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-lg"
        >
          {currentStep === 0 && (
            <WelcomeStep onNext={handleNext} />
          )}
          {currentStep === 1 && (
            <ExperienceStep 
              value={userProfile.experience}
              onChange={(experience) => updateProfile({ experience })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <GoalsStep 
              value={userProfile.goals}
              onChange={(goals) => updateProfile({ goals })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <StyleStep 
              tiltValue={userProfile.tiltTendency}
              timeValue={userProfile.preferredTime}
              onChangeTilt={(tiltTendency) => updateProfile({ tiltTendency })}
              onChangeTime={(preferredTime) => updateProfile({ preferredTime })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <ReadyStep 
              profile={userProfile}
              onComplete={handleComplete}
              onBack={handleBack}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================
// STEP COMPONENTS
// ============================================

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl"
        style={{ 
          background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
          boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)',
        }}
      >
        ♔
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
          Welcome to Zen Chess
        </h1>
        <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          A mindful approach to chess mastery. We combine deep learning with emotional intelligence.
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          onClick={onNext}
          className="px-8 py-4 rounded-xl text-lg font-medium text-white transition-all hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
          }}
        >
          Let's Begin
        </button>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Takes about 1 minute
        </p>
      </div>
    </div>
  );
}

function ExperienceStep({ 
  value, 
  onChange, 
  onNext, 
  onBack 
}: { 
  value: string;
  onChange: (v: 'beginner' | 'intermediate' | 'advanced') => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const options = [
    { 
      id: 'beginner', 
      title: 'Beginner', 
      description: 'Learning the basics or returning after a break',
      icon: '🌱',
      rating: '< 1200',
    },
    { 
      id: 'intermediate', 
      title: 'Intermediate', 
      description: 'Comfortable with tactics and basic strategy',
      icon: '🌿',
      rating: '1200 - 1800',
    },
    { 
      id: 'advanced', 
      title: 'Advanced', 
      description: 'Strong player looking to refine skills',
      icon: '🌳',
      rating: '1800+',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          What's your experience level?
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          This helps us personalize your training
        </p>
      </div>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id as any)}
            className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
              value === option.id ? 'ring-2 ring-purple-500' : ''
            }`}
            style={{ 
              background: value === option.id ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{option.icon}</span>
              <div className="flex-1">
                <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {option.title}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {option.description}
                </div>
              </div>
              <span className="text-sm px-2 py-1 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                {option.rating}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <NavigationButtons onBack={onBack} onNext={onNext} canNext={!!value} />
    </div>
  );
}

function GoalsStep({ 
  value, 
  onChange, 
  onNext, 
  onBack 
}: { 
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const goals = [
    { id: 'tactics', label: 'Sharpen Tactics', icon: '⚔️' },
    { id: 'openings', label: 'Master Openings', icon: '📖' },
    { id: 'endgames', label: 'Improve Endgames', icon: '👑' },
    { id: 'mental', label: 'Build Mental Strength', icon: '🧠' },
    { id: 'rating', label: 'Increase Rating', icon: '📈' },
    { id: 'fun', label: 'Have Fun', icon: '🎮' },
  ];
  
  const toggleGoal = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(g => g !== id));
    } else if (value.length < 3) {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          What are your goals?
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Choose up to 3 areas to focus on
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
              value.includes(goal.id) ? 'ring-2 ring-purple-500' : ''
            }`}
            style={{ 
              background: value.includes(goal.id) ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span className="text-2xl">{goal.icon}</span>
            <div className="font-medium mt-2" style={{ color: 'var(--text-primary)' }}>
              {goal.label}
            </div>
          </button>
        ))}
      </div>
      
      <NavigationButtons onBack={onBack} onNext={onNext} canNext={value.length > 0} />
    </div>
  );
}

function StyleStep({ 
  tiltValue,
  timeValue,
  onChangeTilt,
  onChangeTime,
  onNext, 
  onBack 
}: { 
  tiltValue: string;
  timeValue: string;
  onChangeTilt: (v: 'low' | 'medium' | 'high') => void;
  onChangeTime: (v: 'morning' | 'afternoon' | 'evening' | 'night') => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const tiltOptions = [
    { id: 'low', label: 'Rarely', icon: '😌', desc: 'I stay calm' },
    { id: 'medium', label: 'Sometimes', icon: '😤', desc: 'After losing streaks' },
    { id: 'high', label: 'Often', icon: '🔥', desc: 'I tilt easily' },
  ];
  
  const timeOptions = [
    { id: 'morning', label: 'Morning', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { id: 'evening', label: 'Evening', icon: '🌆' },
    { id: 'night', label: 'Night', icon: '🌙' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Your playing style
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Help us protect you from tilt
        </p>
      </div>
      
      {/* Tilt tendency */}
      <div className="space-y-3">
        <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          How often do you tilt after losses?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {tiltOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onChangeTilt(option.id as any)}
              className={`p-3 rounded-xl text-center transition-all ${
                tiltValue === option.id ? 'ring-2 ring-red-500' : ''
              }`}
              style={{ 
                background: tiltValue === option.id ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-secondary)',
              }}
            >
              <span className="text-xl">{option.icon}</span>
              <div className="text-sm font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Preferred time */}
      <div className="space-y-3">
        <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          When do you usually play?
        </label>
        <div className="grid grid-cols-4 gap-2">
          {timeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onChangeTime(option.id as any)}
              className={`p-3 rounded-xl text-center transition-all ${
                timeValue === option.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ 
                background: timeValue === option.id ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-secondary)',
              }}
            >
              <span className="text-xl">{option.icon}</span>
              <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <NavigationButtons onBack={onBack} onNext={onNext} canNext={!!tiltValue && !!timeValue} />
    </div>
  );
}

function ReadyStep({ 
  profile, 
  onComplete, 
  onBack 
}: { 
  profile: OnboardingState['userProfile'];
  onComplete: () => void;
  onBack: () => void;
}) {
  const agentIntro = [
    { name: 'Your Coach', icon: '♔', desc: 'Personalized guidance' },
    { name: 'Tilt Guardian', icon: '🛡️', desc: 'Emotional protection' },
    { name: 'Training Architect', icon: '🎯', desc: 'Custom training plans' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4"
          style={{ background: 'linear-gradient(135deg, #4ade80, #3b82f6)' }}
        >
          ✓
        </motion.div>
        <h2 className="text-3xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          You're all set!
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Your AI coaching team is ready
        </p>
      </div>
      
      {/* Agent intro */}
      <div className="space-y-2">
        {agentIntro.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <span className="text-2xl">{agent.icon}</span>
            <div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {agent.name}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {agent.desc}
              </div>
            </div>
          </motion.div>
        ))}
        <p className="text-xs text-center pt-2" style={{ color: 'var(--text-muted)' }}>
          + 9 more agents working in the background
        </p>
      </div>
      
      {/* Summary */}
      <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Level:</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>{profile.experience || 'Not set'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Best time:</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>{profile.preferredTime || 'Anytime'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Goals:</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>{profile.goals.length || 0} selected</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Tilt protection:</span>{' '}
            <span style={{ color: profile.tiltTendency === 'high' ? '#ef4444' : '#4ade80' }}>
              {profile.tiltTendency === 'high' ? 'Maximum' : profile.tiltTendency === 'medium' ? 'Active' : 'Standard'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-medium transition-all hover:bg-white/5"
          style={{ color: 'var(--text-muted)' }}
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
          }}
        >
          Start My Journey
        </button>
      </div>
    </div>
  );
}

function NavigationButtons({ 
  onBack, 
  onNext, 
  canNext 
}: { 
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-6 py-3 rounded-xl font-medium transition-all hover:bg-white/5"
        style={{ color: 'var(--text-muted)' }}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="flex-1 py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          background: canNext 
            ? 'linear-gradient(135deg, #a855f7, #3b82f6)' 
            : 'var(--bg-tertiary)',
        }}
      >
        Continue
      </button>
    </div>
  );
}

// ============================================
// ONBOARDING WRAPPER
// Shows onboarding if not completed
// ============================================

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { hasCompletedOnboarding } = useOnboardingStore();
  
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }
  
  return <>{children}</>;
}

