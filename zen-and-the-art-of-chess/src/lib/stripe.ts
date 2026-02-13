// ============================================
// STRIPE INTEGRATION
// Payment processing for subscriptions
// ============================================

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { logger } from './logger';

// Allowlisted domains for payment redirects
const ALLOWED_REDIRECT_DOMAINS = [
  'checkout.stripe.com',
  'billing.stripe.com',
  'dashboard.stripe.com',
];

function isAllowedRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_REDIRECT_DOMAINS.some(domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

let stripePromise: Promise<Stripe | null>;

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const getStripe = () => {
  if (!stripePublishableKey) {
    logger.info('Stripe not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to .env');
    return Promise.resolve(null);
  }
  
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  
  return stripePromise;
};

export const isStripeConfigured = Boolean(stripePublishableKey);

// ============================================
// CHECKOUT SESSION CREATION
// In production, this would call your backend
// ============================================

interface CreateCheckoutParams {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl?: string;
  cancelUrl?: string;
}

export async function createCheckoutSession(params: CreateCheckoutParams): Promise<{ sessionId?: string; url?: string; error?: string }> {
  const { priceId, userId, userEmail, successUrl, cancelUrl } = params;
  
  // In production, this calls your backend API
  const apiUrl = import.meta.env.VITE_API_URL || '';
  
  if (!apiUrl) {
    // Development mode - show instructions
    logger.info('To enable payments, set up a backend with Stripe Checkout');
    return { error: 'Payment backend not configured. See console for setup instructions.' };
  }
  
  try {
    const response = await fetch(`${apiUrl}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        userEmail,
        successUrl: successUrl || `${window.location.origin}/subscription/success`,
        cancelUrl: cancelUrl || `${window.location.origin}/subscription/cancel`,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }
    
    const data = await response.json();
    return { sessionId: data.sessionId, url: data.url };
  } catch (error) {
    logger.error('Checkout error:', error);
    return { error: 'Failed to start checkout. Please try again.' };
  }
}

// ============================================
// REDIRECT TO CHECKOUT
// ============================================

export async function redirectToCheckout(sessionUrl: string): Promise<{ error?: string }> {
  // Stripe.js v4+ removed stripe.redirectToCheckout().
  // Modern approach: backend returns the Checkout Session URL, we redirect to it.
  try {
    if (!isAllowedRedirectUrl(sessionUrl)) {
      logger.error('Blocked redirect to untrusted URL:', sessionUrl);
      return { error: 'Invalid checkout URL' };
    }
    window.location.href = sessionUrl;
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Checkout redirect failed' };
  }
}

// ============================================
// CUSTOMER PORTAL
// For managing subscriptions
// ============================================

export async function redirectToCustomerPortal(customerId: string): Promise<{ error?: string }> {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  
  if (!apiUrl) {
    return { error: 'Portal not configured' };
  }
  
  try {
    const response = await fetch(`${apiUrl}/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl: `${window.location.origin}/settings`,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }
    
    const { url } = await response.json();
    if (!isAllowedRedirectUrl(url)) {
      logger.error('Blocked portal redirect to untrusted URL:', url);
      return { error: 'Invalid portal URL' };
    }
    window.location.href = url;
    return {};
  } catch (error) {
    logger.error('Portal error:', error);
    return { error: 'Failed to open customer portal' };
  }
}





