// ============================================
// REVENUECAT INTEGRATION
// Mobile in-app purchases for iOS & Android
// ============================================

import { Capacitor } from '@capacitor/core';
import type { SubscriptionTier } from './premium';

// RevenueCat types (SDK loaded dynamically)
interface CustomerInfo {
  entitlements: {
    active: Record<string, {
      isActive: boolean;
      willRenew: boolean;
      periodType: string;
      latestPurchaseDate: string;
      originalPurchaseDate: string;
      expirationDate: string | null;
      productIdentifier: string;
    }>;
  };
  activeSubscriptions: string[];
  allPurchasedProductIdentifiers: string[];
  latestExpirationDate: string | null;
  managementURL: string | null;
}

interface Package {
  identifier: string;
  packageType: string;
  product: {
    identifier: string;
    description: string;
    title: string;
    price: number;
    priceString: string;
    currencyCode: string;
  };
  offeringIdentifier: string;
}

interface Offerings {
  current: {
    identifier: string;
    serverDescription: string;
    availablePackages: Package[];
    lifetime: Package | null;
    annual: Package | null;
    sixMonth: Package | null;
    threeMonth: Package | null;
    twoMonth: Package | null;
    monthly: Package | null;
    weekly: Package | null;
  } | null;
  all: Record<string, unknown>;
}

// ============================================
// CONFIGURATION
// ============================================

const REVENUECAT_API_KEY_IOS = import.meta.env.VITE_REVENUECAT_IOS_KEY || '';
const REVENUECAT_API_KEY_ANDROID = import.meta.env.VITE_REVENUECAT_ANDROID_KEY || '';

// Entitlement ID configured in RevenueCat dashboard
const PREMIUM_ENTITLEMENT_ID = 'premium';

// Product IDs (must match App Store Connect / Google Play Console)
export const PRODUCT_IDS = {
  MONTHLY: 'zen_chess_monthly',
  YEARLY: 'zen_chess_yearly',
  LIFETIME: 'zen_chess_lifetime',
};

// ============================================
// STATE
// ============================================

let isInitialized = false;
let Purchases: typeof import('@revenuecat/purchases-capacitor').Purchases | null = null;

// ============================================
// INITIALIZATION
// ============================================

export async function initializeRevenueCat(userId?: string): Promise<boolean> {
  // Only run on native platforms
  if (!Capacitor.isNativePlatform()) {
    console.log('RevenueCat: Skipping initialization (not native platform)');
    return false;
  }

  const apiKey = Capacitor.getPlatform() === 'ios' 
    ? REVENUECAT_API_KEY_IOS 
    : REVENUECAT_API_KEY_ANDROID;

  if (!apiKey) {
    console.warn('RevenueCat: API key not configured for', Capacitor.getPlatform());
    return false;
  }

  try {
    // Dynamically import RevenueCat (only loads on native)
    const RC = await import('@revenuecat/purchases-capacitor');
    Purchases = RC.Purchases;

    await Purchases.configure({
      apiKey,
      appUserID: userId || undefined,
    });

    isInitialized = true;
    console.log('RevenueCat: Initialized successfully');
    return true;
  } catch (error) {
    console.error('RevenueCat: Initialization failed', error);
    return false;
  }
}

// ============================================
// IDENTIFY USER
// Link RevenueCat to your user system
// ============================================

export async function identifyUser(userId: string): Promise<void> {
  if (!isInitialized || !Purchases) return;

  try {
    await Purchases.logIn({ appUserID: userId });
    console.log('RevenueCat: User identified', userId);
  } catch (error) {
    console.error('RevenueCat: Failed to identify user', error);
  }
}

export async function logoutUser(): Promise<void> {
  if (!isInitialized || !Purchases) return;

  try {
    await Purchases.logOut();
    console.log('RevenueCat: User logged out');
  } catch (error) {
    console.error('RevenueCat: Failed to logout', error);
  }
}

// ============================================
// CHECK SUBSCRIPTION STATUS
// ============================================

export async function checkPremiumStatus(): Promise<{
  isPremium: boolean;
  tier: SubscriptionTier;
  expirationDate: string | null;
  willRenew: boolean;
}> {
  if (!isInitialized || !Purchases) {
    return { isPremium: false, tier: 'free', expirationDate: null, willRenew: false };
  }

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const premiumEntitlement = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];

    if (!premiumEntitlement?.isActive) {
      return { isPremium: false, tier: 'free', expirationDate: null, willRenew: false };
    }

    // Determine tier based on product
    let tier: SubscriptionTier = 'premium';
    if (premiumEntitlement.productIdentifier === PRODUCT_IDS.LIFETIME) {
      tier = 'lifetime';
    }

    return {
      isPremium: true,
      tier,
      expirationDate: premiumEntitlement.expirationDate,
      willRenew: premiumEntitlement.willRenew,
    };
  } catch (error) {
    console.error('RevenueCat: Failed to check premium status', error);
    return { isPremium: false, tier: 'free', expirationDate: null, willRenew: false };
  }
}

// ============================================
// GET AVAILABLE PACKAGES
// ============================================

export async function getOfferings(): Promise<Offerings | null> {
  if (!isInitialized || !Purchases) return null;

  try {
    const { offerings } = await Purchases.getOfferings();
    return offerings as Offerings;
  } catch (error) {
    console.error('RevenueCat: Failed to get offerings', error);
    return null;
  }
}

export async function getPackages(): Promise<Package[]> {
  const offerings = await getOfferings();
  return offerings?.current?.availablePackages || [];
}

// ============================================
// PURCHASE
// ============================================

export async function purchasePackage(packageToPurchase: Package): Promise<{
  success: boolean;
  customerInfo?: CustomerInfo;
  error?: string;
}> {
  if (!isInitialized || !Purchases) {
    return { success: false, error: 'RevenueCat not initialized' };
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage({
      aPackage: packageToPurchase,
    });

    const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID]?.isActive;

    return {
      success: isPremium || false,
      customerInfo: customerInfo as CustomerInfo,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    
    // User cancelled
    if (err.code === 'PURCHASE_CANCELLED') {
      return { success: false, error: 'Purchase cancelled' };
    }

    console.error('RevenueCat: Purchase failed', error);
    return { success: false, error: err.message || 'Purchase failed' };
  }
}

export async function purchaseProduct(productId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const packages = await getPackages();
  const pkg = packages.find(p => p.product.identifier === productId);

  if (!pkg) {
    return { success: false, error: 'Product not found' };
  }

  return purchasePackage(pkg);
}

// ============================================
// RESTORE PURCHASES
// ============================================

export async function restorePurchases(): Promise<{
  success: boolean;
  isPremium: boolean;
  error?: string;
}> {
  if (!isInitialized || !Purchases) {
    return { success: false, isPremium: false, error: 'RevenueCat not initialized' };
  }

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID]?.isActive || false;

    return { success: true, isPremium };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('RevenueCat: Restore failed', error);
    return { success: false, isPremium: false, error: err.message || 'Restore failed' };
  }
}

// ============================================
// MANAGE SUBSCRIPTION
// Opens native subscription management
// ============================================

export async function openManageSubscriptions(): Promise<void> {
  if (!isInitialized || !Purchases) return;

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    
    if (customerInfo.managementURL) {
      // Open the management URL
      window.open(customerInfo.managementURL, '_blank');
    } else {
      // Fallback to platform-specific URLs
      if (Capacitor.getPlatform() === 'ios') {
        window.open('https://apps.apple.com/account/subscriptions', '_blank');
      } else {
        window.open('https://play.google.com/store/account/subscriptions', '_blank');
      }
    }
  } catch (error) {
    console.error('RevenueCat: Failed to open manage subscriptions', error);
  }
}

// ============================================
// LISTENER FOR SUBSCRIPTION CHANGES
// ============================================

type PurchaseListener = (customerInfo: CustomerInfo) => void;
const listeners: PurchaseListener[] = [];

export function addPurchaseListener(listener: PurchaseListener): () => void {
  listeners.push(listener);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

// Set up listener when initialized
async function setupPurchaseListener(): Promise<void> {
  if (!isInitialized || !Purchases) return;

  try {
    await Purchases.addCustomerInfoUpdateListener((customerInfo: unknown) => {
      listeners.forEach(listener => listener(customerInfo as CustomerInfo));
    });
  } catch (error) {
    console.error('RevenueCat: Failed to set up listener', error);
  }
}

// Call after initialization
initializeRevenueCat().then(() => {
  if (isInitialized) {
    setupPurchaseListener();
  }
});

// ============================================
// UTILITY: FORMAT PRICE
// ============================================

export function formatPrice(pkg: Package): string {
  return pkg.product.priceString;
}

export function getPackageByType(
  packages: Package[],
  type: 'monthly' | 'yearly' | 'lifetime'
): Package | undefined {
  const typeMap = {
    monthly: '$rc_monthly',
    yearly: '$rc_annual',
    lifetime: '$rc_lifetime',
  };

  return packages.find(p => p.packageType === typeMap[type]);
}

// ============================================
// EXPORT HELPERS
// ============================================

export const isRevenueCatAvailable = (): boolean => {
  return Capacitor.isNativePlatform() && isInitialized;
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  const platform = Capacitor.getPlatform();
  if (platform === 'ios') return 'ios';
  if (platform === 'android') return 'android';
  return 'web';
};


