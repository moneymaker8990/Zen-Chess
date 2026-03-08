import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingState {
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

const initialProfile: OnboardingState['userProfile'] = {
  name: '',
  experience: '',
  goals: [],
  preferredTime: '',
  tiltTendency: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      currentStep: 0,
      userProfile: initialProfile,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      setStep: (step) => set({ currentStep: step }),
      updateProfile: (profile) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        })),
      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          currentStep: 0,
          userProfile: initialProfile,
        }),
    }),
    { name: 'zen-chess-onboarding' }
  )
);
