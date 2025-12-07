// ============================================
// PREMIUM SUBSCRIPTION SYSTEM
// The monetization engine of Zen Chess
// ============================================

export type SubscriptionTier = 'free' | 'premium' | 'lifetime';

// ============================================
// FEATURE GATING CONFIGURATION
// Defines what's available at each tier
// ============================================

export interface FeatureLimits {
  // Daily limits
  puzzlesPerDay: number;
  gamesPerDay: number;
  analysisPerDay: number;
  
  // Journey access
  maxJourneyDay: number;
  
  // Features
  hasUnlimitedPuzzles: boolean;
  hasAllAgents: boolean;
  hasSpacedRepetition: boolean;
  hasPlayTheLegends: boolean;
  hasMeditationLibrary: boolean;
  hasOpeningBuilder: boolean;
  hasMistakeLibrary: boolean;
  hasAdvancedStats: boolean;
  hasOfflineMode: boolean;
  hasCloudSync: boolean;
  hasPrioritySupport: boolean;
  
  // Content
  hasAllCourses: boolean;
  hasFlashTraining: boolean;
  hasBlindfoldMode: boolean;
  hasIntuitionTrainer: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, FeatureLimits> = {
  free: {
    puzzlesPerDay: 5,
    gamesPerDay: 3,
    analysisPerDay: 2,
    maxJourneyDay: 7,
    hasUnlimitedPuzzles: false,
    hasAllAgents: false,
    hasSpacedRepetition: false,
    hasPlayTheLegends: false,
    hasMeditationLibrary: false,
    hasOpeningBuilder: false,
    hasMistakeLibrary: false,
    hasAdvancedStats: false,
    hasOfflineMode: false,
    hasCloudSync: false,
    hasPrioritySupport: false,
    hasAllCourses: false,
    hasFlashTraining: false,
    hasBlindfoldMode: false,
    hasIntuitionTrainer: false,
  },
  premium: {
    puzzlesPerDay: Infinity,
    gamesPerDay: Infinity,
    analysisPerDay: Infinity,
    maxJourneyDay: 365,
    hasUnlimitedPuzzles: true,
    hasAllAgents: true,
    hasSpacedRepetition: true,
    hasPlayTheLegends: true,
    hasMeditationLibrary: true,
    hasOpeningBuilder: true,
    hasMistakeLibrary: true,
    hasAdvancedStats: true,
    hasOfflineMode: true,
    hasCloudSync: true,
    hasPrioritySupport: false,
    hasAllCourses: true,
    hasFlashTraining: true,
    hasBlindfoldMode: true,
    hasIntuitionTrainer: true,
  },
  lifetime: {
    puzzlesPerDay: Infinity,
    gamesPerDay: Infinity,
    analysisPerDay: Infinity,
    maxJourneyDay: 365,
    hasUnlimitedPuzzles: true,
    hasAllAgents: true,
    hasSpacedRepetition: true,
    hasPlayTheLegends: true,
    hasMeditationLibrary: true,
    hasOpeningBuilder: true,
    hasMistakeLibrary: true,
    hasAdvancedStats: true,
    hasOfflineMode: true,
    hasCloudSync: true,
    hasPrioritySupport: true,
    hasAllCourses: true,
    hasFlashTraining: true,
    hasBlindfoldMode: true,
    hasIntuitionTrainer: true,
  },
};

// ============================================
// PRICING CONFIGURATION
// ============================================

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  tier: SubscriptionTier;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'lifetime';
  stripePriceId: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with chess mindfulness',
    tier: 'free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    stripePriceId: '',
    features: [
      '5 puzzles per day',
      '7-day journey preview',
      'Basic Tilt Tracker',
      'Coach agent (limited)',
      'Community access',
    ],
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    description: 'Unlock your full potential',
    tier: 'premium',
    price: 9.99,
    currency: 'USD',
    interval: 'month',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || '',
    features: [
      'Unlimited puzzles',
      'Full 365-day journey',
      'All 12 AI coaching agents',
      'Spaced repetition system',
      'Play the Legends mode',
      'Full meditation library',
      'Opening repertoire builder',
      'Mistake library',
      'Cloud sync across devices',
      'Advanced statistics',
    ],
    popular: true,
  },
  {
    id: 'premium-yearly',
    name: 'Premium Annual',
    description: 'Best value for committed players',
    tier: 'premium',
    price: 59.99,
    currency: 'USD',
    interval: 'year',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_YEARLY || '',
    features: [
      'Everything in Premium',
      '50% savings vs monthly',
      'Exclusive annual member badge',
    ],
    savings: 'Save $60/year',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'One-time purchase, forever access',
    tier: 'lifetime',
    price: 149.99,
    currency: 'USD',
    interval: 'lifetime',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_LIFETIME || '',
    features: [
      'Everything in Premium, forever',
      'Priority support',
      'Early access to new features',
      'Founding member badge',
      'Never pay again',
    ],
  },
];

// ============================================
// FEATURE CHECK UTILITIES
// ============================================

export type PremiumFeature = keyof FeatureLimits;

export function canAccessFeature(
  tier: SubscriptionTier,
  feature: PremiumFeature
): boolean {
  const limits = TIER_LIMITS[tier];
  const value = limits[feature];
  
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value > 0;
  }
  return false;
}

export function getFeatureLimit(
  tier: SubscriptionTier,
  feature: PremiumFeature
): number | boolean {
  return TIER_LIMITS[tier][feature];
}

export function getRemainingUsage(
  tier: SubscriptionTier,
  feature: 'puzzlesPerDay' | 'gamesPerDay' | 'analysisPerDay',
  used: number
): number {
  const limit = TIER_LIMITS[tier][feature];
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - used);
}

// ============================================
// PREMIUM PAGE REQUIREMENTS
// Maps routes to required features
// ============================================

export const PREMIUM_ROUTES: Record<string, PremiumFeature | null> = {
  '/': null,
  '/train': null, // Limited puzzles for free
  '/play': null, // Limited games for free
  '/day': null, // Limited to day 7 for free
  '/journey': null,
  '/coach': null, // Limited agent access
  '/mind': null, // Basic meditation free
  '/calm-play': null,
  
  // Premium routes
  '/greats': 'hasPlayTheLegends',
  '/flash-training': 'hasFlashTraining',
  '/blindfold': 'hasBlindfoldMode',
  '/intuition-trainer': 'hasIntuitionTrainer',
  '/spaced-repetition': 'hasSpacedRepetition',
  '/openings': 'hasOpeningBuilder',
  '/mistakes': 'hasMistakeLibrary',
  '/courses': 'hasAllCourses',
};

// ============================================
// UPSELL MESSAGING
// ============================================

export const UPSELL_MESSAGES: Record<PremiumFeature, { title: string; description: string }> = {
  puzzlesPerDay: {
    title: "You've reached today's puzzle limit",
    description: "Upgrade to Premium for unlimited puzzles and accelerate your chess improvement.",
  },
  gamesPerDay: {
    title: "You've played all your free games today",
    description: "Get unlimited games with Premium and practice as much as you want.",
  },
  analysisPerDay: {
    title: "Analysis limit reached",
    description: "Unlock unlimited game analysis to understand every move you make.",
  },
  maxJourneyDay: {
    title: "Continue your 365-day journey",
    description: "You've completed the free preview. Unlock the full mindful chess journey.",
  },
  hasUnlimitedPuzzles: {
    title: "Unlimited Puzzles",
    description: "Train without limits. Solve as many puzzles as you want, every day.",
  },
  hasAllAgents: {
    title: "Meet your full coaching team",
    description: "Unlock all 12 AI coaching agents for personalized guidance in every aspect of your game.",
  },
  hasSpacedRepetition: {
    title: "Never forget what you learn",
    description: "Our science-backed spaced repetition system ensures you retain every pattern.",
  },
  hasPlayTheLegends: {
    title: "Play like the masters",
    description: "Study and replay games from Kasparov, Fischer, Carlsen and other legends.",
  },
  hasMeditationLibrary: {
    title: "Full meditation library",
    description: "Access our complete collection of chess-focused meditations and visualizations.",
  },
  hasOpeningBuilder: {
    title: "Build your opening repertoire",
    description: "Create and drill your personalized opening system with smart recommendations.",
  },
  hasMistakeLibrary: {
    title: "Learn from every mistake",
    description: "Your personal mistake library helps you never repeat the same errors.",
  },
  hasAdvancedStats: {
    title: "Advanced statistics",
    description: "Deep insights into your playing patterns, weaknesses, and improvement areas.",
  },
  hasOfflineMode: {
    title: "Practice anywhere",
    description: "Download puzzles and lessons for offline training on the go.",
  },
  hasCloudSync: {
    title: "Sync across devices",
    description: "Your progress follows you everywhere with automatic cloud sync.",
  },
  hasPrioritySupport: {
    title: "Priority support",
    description: "Get fast, personal help from our team whenever you need it.",
  },
  hasAllCourses: {
    title: "Full course library",
    description: "Access all courses covering tactics, strategy, endgames, and more.",
  },
  hasFlashTraining: {
    title: "Flash Training",
    description: "Build GM-level pattern recognition with rapid-fire position training.",
  },
  hasBlindfoldMode: {
    title: "Blindfold Training",
    description: "Strengthen your visualization skills with blindfold chess exercises.",
  },
  hasIntuitionTrainer: {
    title: "Intuition Trainer",
    description: "Develop instant position evaluation like a grandmaster.",
  },
};






