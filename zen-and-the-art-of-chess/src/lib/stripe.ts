// ============================================
// STRIPE INTEGRATION
// Payment processing for subscriptions
// ============================================

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const getStripe = () => {
  if (!stripePublishableKey) {
    console.warn('⚠️ Stripe not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to .env');
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

export async function createCheckoutSession(params: CreateCheckoutParams): Promise<{ sessionId?: string; error?: string }> {
  const { priceId, userId, userEmail, successUrl, cancelUrl } = params;
  
  // In production, this calls your backend API
  // For now, we'll use Stripe's client-side checkout
  const apiUrl = import.meta.env.VITE_API_URL || '';
  
  if (!apiUrl) {
    // Development mode - show instructions
    console.log('💡 To enable payments, set up a backend with Stripe Checkout');
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
    
    const { sessionId } = await response.json();
    return { sessionId };
  } catch (error) {
    console.error('Checkout error:', error);
    return { error: 'Failed to start checkout. Please try again.' };
  }
}

// ============================================
// REDIRECT TO CHECKOUT
// ============================================

export async function redirectToCheckout(sessionId: string): Promise<{ error?: string }> {
  const stripe = await getStripe();
  
  if (!stripe) {
    return { error: 'Stripe not loaded' };
  }
  
  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    return { error: error.message };
  }
  
  return {};
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
    window.location.href = url;
    return {};
  } catch (error) {
    console.error('Portal error:', error);
    return { error: 'Failed to open customer portal' };
  }
}

