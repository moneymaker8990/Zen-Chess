// ============================================
// SENTRY - Error Tracking & Performance Monitoring
// ============================================
// Docs: https://docs.sentry.io/platforms/javascript/guides/react/

import * as Sentry from '@sentry/react';
import { logger } from '@/lib/logger';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const IS_PRODUCTION = import.meta.env.PROD;

/**
 * Initialize Sentry error tracking
 * Only active in production when DSN is configured
 */
export function initSentry() {
  if (!SENTRY_DSN) {
    if (IS_PRODUCTION) {
      logger.warn('[Sentry] No DSN configured - error tracking disabled');
    }
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,

    // Environment configuration
    environment: IS_PRODUCTION ? 'production' : 'development',

    // Only send errors in production
    enabled: IS_PRODUCTION,

    // Sample rate for error events (1.0 = 100%)
    sampleRate: 1.0,

    // Sample rate for performance monitoring (0.1 = 10%)
    tracesSampleRate: IS_PRODUCTION ? 0.1 : 0,

    // Session replay for debugging (only sample 10% of sessions)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Mask all text and block all media for privacy
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Filter out known non-critical errors
    beforeSend(event, hint) {
      const error = hint.originalException;

      // Ignore network errors (user offline, etc.)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return null;
      }

      // Ignore ResizeObserver errors (common browser quirk)
      if (error instanceof Error && error.message.includes('ResizeObserver')) {
        return null;
      }

      // Ignore chess.js validation errors (expected during play)
      if (error instanceof Error && error.message.includes('Invalid move')) {
        return null;
      }

      return event;
    },

    // Attach additional context
    initialScope: {
      tags: {
        app: 'zen-chess',
        platform: typeof window !== 'undefined' && 'Capacitor' in window ? 'mobile' : 'web',
      },
    },
  });
}

/**
 * Capture an error manually
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  if (!SENTRY_DSN) {
    logger.error('[Error]', error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capture a message/log
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (!SENTRY_DSN) {
    logger.info(`[${level}]`, message);
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string } | null) {
  Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

// Re-export Sentry's ErrorBoundary for use in React
export const SentryErrorBoundary = Sentry.ErrorBoundary;
