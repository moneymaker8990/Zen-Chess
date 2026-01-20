// ============================================
// POSTHOG ANALYTICS
// User behavior tracking and product analytics
// ============================================
// Docs: https://posthog.com/docs/libraries/react

import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
const IS_PRODUCTION = import.meta.env.PROD;

let isInitialized = false;

/**
 * Initialize PostHog analytics
 * Only active in production when API key is configured
 */
export function initAnalytics() {
  if (!POSTHOG_KEY) {
    if (IS_PRODUCTION) {
      console.warn('[Analytics] No PostHog key configured - analytics disabled');
    }
    return;
  }

  if (isInitialized) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,

    // Capture pageviews automatically
    capture_pageview: true,

    // Capture page leaves
    capture_pageleave: true,

    // Session recording (optional)
    disable_session_recording: !IS_PRODUCTION,

    // Autocapture clicks, form submissions, etc.
    autocapture: true,

    // Respect Do Not Track
    respect_dnt: true,

    // Only load in production
    loaded: (posthog) => {
      if (!IS_PRODUCTION) {
        posthog.opt_out_capturing();
      }
    },

    // Persistence
    persistence: 'localStorage+cookie',

    // Bootstrap with feature flags disabled initially
    bootstrap: {
      featureFlags: {},
    },
  });

  isInitialized = true;
}

/**
 * Identify a user (call after login)
 */
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;

  posthog.identify(userId, properties);
}

/**
 * Reset user identity (call after logout)
 */
export function resetUser() {
  if (!POSTHOG_KEY) return;

  posthog.reset();
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (!POSTHOG_KEY) {
    console.debug('[Analytics]', eventName, properties);
    return;
  }

  posthog.capture(eventName, properties);
}

/**
 * Set user properties (persistent across sessions)
 */
export function setUserProperties(properties: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;

  posthog.people.set(properties);
}

// ============================================
// PREDEFINED EVENTS
// Consistent event names for analytics
// ============================================

export const AnalyticsEvents = {
  // Onboarding
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_COMPLETED: 'login_completed',
  LOGOUT: 'logout',

  // Puzzles
  PUZZLE_STARTED: 'puzzle_started',
  PUZZLE_SOLVED: 'puzzle_solved',
  PUZZLE_FAILED: 'puzzle_failed',
  PUZZLE_HINT_USED: 'puzzle_hint_used',

  // Games
  GAME_STARTED: 'game_started',
  GAME_COMPLETED: 'game_completed',
  GAME_ANALYZED: 'game_analyzed',

  // Training
  PATTERN_STUDIED: 'pattern_studied',
  PATTERN_COMPLETED: 'pattern_completed',
  OPENING_PRACTICED: 'opening_practiced',
  COURSE_STARTED: 'course_started',
  COURSE_COMPLETED: 'course_completed',

  // AI Coach
  COACH_MESSAGE_SENT: 'coach_message_sent',
  COACH_INSIGHT_RECEIVED: 'coach_insight_received',

  // Features
  FEATURE_USED: 'feature_used',
  BREATHING_EXERCISE_STARTED: 'breathing_exercise_started',
  BREATHING_EXERCISE_COMPLETED: 'breathing_exercise_completed',

  // Premium
  UPGRADE_MODAL_VIEWED: 'upgrade_modal_viewed',
  UPGRADE_STARTED: 'upgrade_started',
  UPGRADE_COMPLETED: 'upgrade_completed',
  SUBSCRIPTION_CANCELED: 'subscription_canceled',

  // Errors
  ERROR_OCCURRED: 'error_occurred',
  ERROR_BOUNDARY_TRIGGERED: 'error_boundary_triggered',
} as const;

// ============================================
// HELPER FUNCTIONS
// Pre-built tracking functions for common events
// ============================================

export function trackPuzzleSolved(puzzleId: string, timeSpent: number, hintsUsed: number) {
  trackEvent(AnalyticsEvents.PUZZLE_SOLVED, {
    puzzle_id: puzzleId,
    time_spent_seconds: timeSpent,
    hints_used: hintsUsed,
  });
}

export function trackPuzzleFailed(puzzleId: string, timeSpent: number, hintsUsed: number) {
  trackEvent(AnalyticsEvents.PUZZLE_FAILED, {
    puzzle_id: puzzleId,
    time_spent_seconds: timeSpent,
    hints_used: hintsUsed,
  });
}

export function trackGameCompleted(
  result: 'win' | 'loss' | 'draw',
  opponent: string,
  moves: number
) {
  trackEvent(AnalyticsEvents.GAME_COMPLETED, {
    result,
    opponent,
    total_moves: moves,
  });
}

export function trackPatternStudied(patternId: string, category: string) {
  trackEvent(AnalyticsEvents.PATTERN_STUDIED, {
    pattern_id: patternId,
    category,
  });
}

export function trackFeatureUsed(featureName: string) {
  trackEvent(AnalyticsEvents.FEATURE_USED, {
    feature: featureName,
  });
}

export function trackError(error: Error, context?: string) {
  trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
    error_message: error.message,
    error_name: error.name,
    context,
  });
}
