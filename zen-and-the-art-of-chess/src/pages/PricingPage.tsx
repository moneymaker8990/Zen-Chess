// ============================================
// ZEN CHESS PRICING PAGE
// Show subscription plans and features
// ============================================

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '@/state/useAuthStore';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Start your mindful chess journey',
    features: [
      '5 puzzles per day',
      '3 AI coach messages per day',
      'Basic opening explorer',
      'Session tracking',
    ],
    cta: 'Current Plan',
    highlighted: false,
  },
  {
    id: 'monthly',
    name: 'Premium',
    price: 9.99,
    period: '/month',
    description: 'Unlock your full potential',
    features: [
      'Unlimited puzzles',
      'Unlimited AI coaching',
      'All 12 AI coaching agents',
      'Advanced analytics',
      'Personalized study plans',
      'Blindfold training',
      'Pattern recognition drills',
      'Export progress data',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'yearly',
    name: 'Premium Annual',
    price: 79.99,
    period: '/year',
    description: 'Best value - 2 months free',
    features: [
      'Everything in Premium',
      'Priority support',
      'Early access to features',
      'Exclusive content',
    ],
    cta: 'Save 33%',
    highlighted: false,
  },
];

export function PricingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') return;
    
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    setSelectedPlan(planId);
    
    // Payment integration - contact for enterprise or use in-app purchase on mobile
    // For web: Would use Stripe checkout with backend API
    // For mobile: Uses RevenueCat (configured in lib/revenuecat.ts)
    if (typeof window !== 'undefined' && 'Capacitor' in window) {
      // On mobile, use RevenueCat in-app purchases
      navigate('/settings', { state: { showPremium: true } });
    } else {
      // On web, show contact information (Stripe requires backend setup)
      navigate('/settings', { state: { showPremium: true } });
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-display font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Elevate Your Chess Journey
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Join thousands of players who've transformed their game with mindful, 
            AI-powered chess training.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 rounded-2xl transition-all ${
                plan.highlighted ? 'scale-105' : ''
              }`}
              style={{
                background: plan.highlighted 
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))'
                  : 'var(--bg-secondary)',
                border: plan.highlighted 
                  ? '2px solid rgba(168, 85, 247, 0.5)'
                  : '1px solid var(--border-subtle)',
              }}
            >
              {plan.highlighted && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                    color: 'white',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: plan.highlighted ? '#a855f7' : 'var(--text-primary)' }}
                  >
                    ${plan.price}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                </div>
                <p 
                  className="text-sm mt-2"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={plan.id === 'free'}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.id === 'free' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-[1.02]'
                }`}
                style={{
                  background: plan.highlighted 
                    ? 'linear-gradient(135deg, #a855f7, #3b82f6)'
                    : 'var(--bg-tertiary)',
                  color: plan.highlighted ? 'white' : 'var(--text-secondary)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 
            className="text-2xl font-display font-bold text-center mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FAQItem 
              question="Can I cancel anytime?"
              answer="Yes! Cancel anytime with no questions asked. You'll keep access until the end of your billing period."
            />
            <FAQItem 
              question="Is there a free trial?"
              answer="Yes! Premium includes a 7-day free trial. Try all features risk-free."
            />
            <FAQItem 
              question="What's the difference vs free?"
              answer="Premium unlocks unlimited AI coaching, all 12 specialized agents, advanced analytics, and personalized training."
            />
            <FAQItem 
              question="Does it work offline?"
              answer="Yes! The app works offline. Your progress syncs when you reconnect."
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg transition-all hover:bg-white/10"
            style={{ color: 'var(--text-muted)' }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="p-4 rounded-xl cursor-pointer transition-all"
      style={{ 
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h4 
          className="font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {question}
        </h4>
        <span style={{ color: 'var(--text-muted)' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      {isOpen && (
        <p 
          className="mt-3 text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

export default PricingPage;




