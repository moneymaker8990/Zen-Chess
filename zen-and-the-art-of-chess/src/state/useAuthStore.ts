// ============================================
// AUTHENTICATION & SUBSCRIPTION STORE
// Central state for user auth and premium status
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile } from '@/lib/database.types';
import type { SubscriptionTier, PremiumFeature } from '@/lib/premium';
import { TIER_LIMITS, getRemainingUsage } from '@/lib/premium';

// ============================================
// TYPES
// ============================================

interface DailyUsage {
  date: string;
  puzzlesSolved: number;
  gamesPlayed: number;
  analysisRun: number;
}

interface AuthState {
  // Auth
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Subscription
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
  subscriptionEndDate: string | null;
  
  // Usage tracking (for free tier limits)
  dailyUsage: DailyUsage;
  
  // Actions
  initialize: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshSubscription: () => Promise<void>;
  
  // Usage tracking
  recordPuzzleSolved: () => void;
  recordGamePlayed: () => void;
  recordAnalysisRun: () => void;
  
  // Premium checks
  isPremium: () => boolean;
  canUseFeature: (feature: PremiumFeature) => boolean;
  getRemainingPuzzles: () => number;
  getRemainingGames: () => number;
  getRemainingAnalysis: () => number;
}

// ============================================
// HELPERS
// ============================================

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getInitialDailyUsage(): DailyUsage {
  return {
    date: getTodayString(),
    puzzlesSolved: 0,
    gamesPlayed: 0,
    analysisRun: 0,
  };
}

function resetDailyUsageIfNeeded(usage: DailyUsage): DailyUsage {
  const today = getTodayString();
  if (usage.date !== today) {
    return getInitialDailyUsage();
  }
  return usage;
}

// ============================================
// STORE
// ============================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      profile: null,
      isLoading: true,
      isInitialized: false,
      subscriptionTier: 'free',
      subscriptionStatus: null,
      subscriptionEndDate: null,
      dailyUsage: getInitialDailyUsage(),
      
      // Initialize auth state
      initialize: async () => {
        if (!isSupabaseConfigured) {
          set({ isLoading: false, isInitialized: true });
          return;
        }
        
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            set({
              user: session.user,
              session,
              profile,
              subscriptionTier: profile?.subscription_tier || 'free',
              subscriptionStatus: profile?.subscription_status || null,
              subscriptionEndDate: profile?.subscription_end_date || null,
              isLoading: false,
              isInitialized: true,
            });
          } else {
            set({ isLoading: false, isInitialized: true });
          }
          
          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              set({
                user: session.user,
                session,
                profile,
                subscriptionTier: profile?.subscription_tier || 'free',
                subscriptionStatus: profile?.subscription_status || null,
                subscriptionEndDate: profile?.subscription_end_date || null,
              });
            } else if (event === 'SIGNED_OUT') {
              set({
                user: null,
                session: null,
                profile: null,
                subscriptionTier: 'free',
                subscriptionStatus: null,
                subscriptionEndDate: null,
              });
            }
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      signUp: async (email, password) => {
        if (!isSupabaseConfigured) {
          return { error: new Error('Authentication not configured') };
        }
        
        set({ isLoading: true });
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        if (error) {
          set({ isLoading: false });
          return { error };
        }
        
        // Create profile
        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            email: data.user.email,
            subscription_tier: 'free',
          });
        }
        
        set({ isLoading: false });
        return { error: null };
      },
      
      signIn: async (email, password) => {
        if (!isSupabaseConfigured) {
          return { error: new Error('Authentication not configured') };
        }
        
        set({ isLoading: true });
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        set({ isLoading: false });
        return { error };
      },
      
      signInWithGoogle: async () => {
        if (!isSupabaseConfigured) {
          return { error: new Error('Authentication not configured') };
        }
        
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        return { error };
      },
      
      signOut: async () => {
        if (!isSupabaseConfigured) return;
        
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          profile: null,
          subscriptionTier: 'free',
          subscriptionStatus: null,
          subscriptionEndDate: null,
        });
      },
      
      resetPassword: async (email) => {
        if (!isSupabaseConfigured) {
          return { error: new Error('Authentication not configured') };
        }
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        
        return { error };
      },
      
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user || !isSupabaseConfigured) {
          return { error: new Error('Not authenticated') };
        }
        
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
        
        if (!error) {
          set((state) => ({
            profile: state.profile ? { ...state.profile, ...updates } : null,
          }));
        }
        
        return { error };
      },
      
      refreshSubscription: async () => {
        const { user } = get();
        if (!user || !isSupabaseConfigured) return;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier, subscription_status, subscription_end_date')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          set({
            subscriptionTier: profile.subscription_tier,
            subscriptionStatus: profile.subscription_status,
            subscriptionEndDate: profile.subscription_end_date,
          });
        }
      },
      
      // Usage tracking
      recordPuzzleSolved: () => {
        set((state) => {
          const usage = resetDailyUsageIfNeeded(state.dailyUsage);
          return {
            dailyUsage: {
              ...usage,
              puzzlesSolved: usage.puzzlesSolved + 1,
            },
          };
        });
      },
      
      recordGamePlayed: () => {
        set((state) => {
          const usage = resetDailyUsageIfNeeded(state.dailyUsage);
          return {
            dailyUsage: {
              ...usage,
              gamesPlayed: usage.gamesPlayed + 1,
            },
          };
        });
      },
      
      recordAnalysisRun: () => {
        set((state) => {
          const usage = resetDailyUsageIfNeeded(state.dailyUsage);
          return {
            dailyUsage: {
              ...usage,
              analysisRun: usage.analysisRun + 1,
            },
          };
        });
      },
      
      // Premium checks
      isPremium: () => {
        const { subscriptionTier } = get();
        return subscriptionTier === 'premium' || subscriptionTier === 'lifetime';
      },
      
      canUseFeature: (feature: PremiumFeature) => {
        const { subscriptionTier } = get();
        const limits = TIER_LIMITS[subscriptionTier];
        const value = limits[feature];
        
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value > 0;
        return false;
      },
      
      getRemainingPuzzles: () => {
        const { subscriptionTier, dailyUsage } = get();
        const usage = resetDailyUsageIfNeeded(dailyUsage);
        return getRemainingUsage(subscriptionTier, 'puzzlesPerDay', usage.puzzlesSolved);
      },
      
      getRemainingGames: () => {
        const { subscriptionTier, dailyUsage } = get();
        const usage = resetDailyUsageIfNeeded(dailyUsage);
        return getRemainingUsage(subscriptionTier, 'gamesPerDay', usage.gamesPlayed);
      },
      
      getRemainingAnalysis: () => {
        const { subscriptionTier, dailyUsage } = get();
        const usage = resetDailyUsageIfNeeded(dailyUsage);
        return getRemainingUsage(subscriptionTier, 'analysisPerDay', usage.analysisRun);
      },
    }),
    {
      name: 'zen-chess-auth',
      partialize: (state) => ({
        subscriptionTier: state.subscriptionTier,
        dailyUsage: state.dailyUsage,
      }),
    }
  )
);

// Hook for easy access
export function useAuth() {
  return useAuthStore();
}

export function usePremium() {
  const {
    subscriptionTier,
    isPremium,
    canUseFeature,
    getRemainingPuzzles,
    getRemainingGames,
    getRemainingAnalysis,
  } = useAuthStore();
  
  return {
    tier: subscriptionTier,
    isPremium: isPremium(),
    canUseFeature,
    remainingPuzzles: getRemainingPuzzles(),
    remainingGames: getRemainingGames(),
    remainingAnalysis: getRemainingAnalysis(),
  };
}






