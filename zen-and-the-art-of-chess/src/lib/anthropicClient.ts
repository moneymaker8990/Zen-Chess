// ============================================
// ANTHROPIC CLIENT (Shared Instance)
// Routes all AI calls through the server-side proxy
// so the API key is never exposed to the browser.
// ============================================

import Anthropic from '@anthropic-ai/sdk';

/**
 * Determine the base URL for the Anthropic proxy.
 *
 * - Web (dev + prod): relative path `/api/anthropic` works because
 *   Vite dev server proxies it and Vercel handles it in production.
 * - Mobile (Capacitor): needs the full production URL because there
 *   is no local server to handle the request.
 */
function getBaseURL(): string {
  // On mobile / Capacitor, window.location.protocol will be
  // 'capacitor:' or 'ionic:' — a relative path won't work.
  if (
    typeof window !== 'undefined' &&
    !window.location.protocol.startsWith('http')
  ) {
    const appUrl = import.meta.env.VITE_APP_URL || 'https://zenchess.app';
    return `${appUrl}/api/anthropic`;
  }
  return '/api/anthropic';
}

/**
 * Shared Anthropic client.
 *
 * `apiKey` is set to a placeholder — the real key is injected
 * server-side by the proxy at `/api/anthropic/v1/messages`.
 */
export const anthropic = new Anthropic({
  apiKey: 'proxy',
  baseURL: getBaseURL(),
  dangerouslyAllowBrowser: true,
});

/**
 * Whether the AI proxy is expected to be available.
 * In production this is always true; in development it depends
 * on whether `ANTHROPIC_API_KEY` is configured in the Vite proxy.
 */
export const isAIConfigured = true;
