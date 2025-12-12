// ============================================
// PRODUCTION LOGGER UTILITY
// ============================================
// Centralized logging that can be disabled in production
// while keeping error tracking always enabled.

const isDev = import.meta.env.DEV;
const isDebugEnabled = isDev || import.meta.env.VITE_DEBUG === 'true';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

// Store recent errors for debugging (accessible via window.__ZEN_ERRORS__ in dev)
const recentErrors: LogEntry[] = [];
const MAX_STORED_ERRORS = 50;

function storeError(entry: LogEntry) {
  recentErrors.push(entry);
  if (recentErrors.length > MAX_STORED_ERRORS) {
    recentErrors.shift();
  }
}

// Expose errors in dev mode for debugging
if (isDev && typeof window !== 'undefined') {
  (window as unknown as { __ZEN_ERRORS__: LogEntry[] }).__ZEN_ERRORS__ = recentErrors;
}

/**
 * Logger utility for Zen Chess
 * - debug/info: Only logs in development
 * - warn: Logs in development, stored in production
 * - error: Always logs, always stored
 */
export const logger = {
  /**
   * Debug logs - only in development
   * Use for verbose debugging information
   */
  debug: (message: string, ...data: unknown[]) => {
    if (isDebugEnabled) {
      console.log(`[DEBUG] ${message}`, ...data);
    }
  },

  /**
   * Info logs - only in development
   * Use for general information
   */
  info: (message: string, ...data: unknown[]) => {
    if (isDebugEnabled) {
      console.info(`[INFO] ${message}`, ...data);
    }
  },

  /**
   * Warning logs - in development, stored silently in production
   * Use for non-critical issues
   */
  warn: (message: string, ...data: unknown[]) => {
    const entry: LogEntry = {
      level: 'warn',
      message,
      data: data.length > 0 ? data : undefined,
      timestamp: new Date().toISOString(),
    };
    
    if (isDebugEnabled) {
      console.warn(`[WARN] ${message}`, ...data);
    }
    storeError(entry);
  },

  /**
   * Error logs - always logged and stored
   * Use for actual errors that need attention
   */
  error: (message: string, ...data: unknown[]) => {
    const entry: LogEntry = {
      level: 'error',
      message,
      data: data.length > 0 ? data : undefined,
      timestamp: new Date().toISOString(),
    };
    
    // Always log errors
    console.error(`[ERROR] ${message}`, ...data);
    storeError(entry);
    
    // Future: Send to error tracking service (Sentry, etc.)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(new Error(message), { extra: { data } });
    // }
  },

  /**
   * Get stored errors for debugging
   */
  getStoredErrors: () => [...recentErrors],

  /**
   * Clear stored errors
   */
  clearStoredErrors: () => {
    recentErrors.length = 0;
  },
};

export default logger;




