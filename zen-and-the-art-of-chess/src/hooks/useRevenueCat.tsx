// ============================================
// REVENUECAT REACT HOOK
// Easy-to-use hook for mobile purchases
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  initializeRevenueCat,
  checkPremiumStatus,
  getPackages,
  purchasePackage,
  restorePurchases,
  identifyUser,
  isRevenueCatAvailable,
  getPlatform,
  addPurchaseListener,
} from '@/lib/revenuecat';
import type { SubscriptionTier } from '@/lib/premium';

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

interface UseRevenueCatReturn {
  // State
  isLoading: boolean;
  isAvailable: boolean;
  isPremium: boolean;
  tier: SubscriptionTier;
  expirationDate: string | null;
  willRenew: boolean;
  packages: Package[];
  platform: 'ios' | 'android' | 'web';
  
  // Actions
  purchase: (pkg: Package) => Promise<{ success: boolean; error?: string }>;
  restore: () => Promise<{ success: boolean; error?: string }>;
  refresh: () => Promise<void>;
}

export function useRevenueCat(userId?: string): UseRevenueCatReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [willRenew, setWillRenew] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const platform = getPlatform();
  const isAvailable = Capacitor.isNativePlatform();

  // Initialize RevenueCat
  useEffect(() => {
    async function init() {
      if (!isAvailable) {
        setIsLoading(false);
        return;
      }

      const success = await initializeRevenueCat(userId);
      setIsInitialized(success);
      
      if (success) {
        // Load initial data
        await refresh();
        
        // Identify user if provided
        if (userId) {
          await identifyUser(userId);
        }
      }
      
      setIsLoading(false);
    }

    init();
  }, [userId, isAvailable]);

  // Listen for purchase updates
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = addPurchaseListener(async () => {
      // Refresh status when purchases change
      await refresh();
    });

    return unsubscribe;
  }, [isInitialized]);

  // Refresh subscription status and packages
  const refresh = useCallback(async () => {
    if (!isRevenueCatAvailable()) return;

    try {
      const [status, availablePackages] = await Promise.all([
        checkPremiumStatus(),
        getPackages(),
      ]);

      setIsPremium(status.isPremium);
      setTier(status.tier);
      setExpirationDate(status.expirationDate);
      setWillRenew(status.willRenew);
      setPackages(availablePackages);
    } catch (error) {
      console.error('Failed to refresh RevenueCat data:', error);
    }
  }, []);

  // Purchase a package
  const purchase = useCallback(async (pkg: Package): Promise<{ success: boolean; error?: string }> => {
    if (!isRevenueCatAvailable()) {
      return { success: false, error: 'In-app purchases not available' };
    }

    setIsLoading(true);
    
    try {
      const result = await purchasePackage(pkg);
      
      if (result.success) {
        await refresh();
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  // Restore purchases
  const restore = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!isRevenueCatAvailable()) {
      return { success: false, error: 'In-app purchases not available' };
    }

    setIsLoading(true);
    
    try {
      const result = await restorePurchases();
      
      if (result.success && result.isPremium) {
        await refresh();
      }
      
      return { success: result.success, error: result.error };
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    isLoading,
    isAvailable,
    isPremium,
    tier,
    expirationDate,
    willRenew,
    packages,
    platform,
    purchase,
    restore,
    refresh,
  };
}

// ============================================
// PURCHASE BUTTON COMPONENT
// Ready-to-use purchase button
// ============================================

import type { ReactNode } from 'react';

interface PurchaseButtonProps {
  package_: Package;
  children?: ReactNode;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function PurchaseButton({
  package_,
  children,
  onSuccess,
  onError,
  className = '',
}: PurchaseButtonProps) {
  const { purchase, isLoading } = useRevenueCat();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    const result = await purchase(package_);
    
    if (result.success) {
      onSuccess?.();
    } else if (result.error) {
      onError?.(result.error);
    }
    
    setIsPurchasing(false);
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading || isPurchasing}
      className={className}
    >
      {isPurchasing ? 'Processing...' : children || `Buy ${package_.product.priceString}`}
    </button>
  );
}

// ============================================
// RESTORE BUTTON COMPONENT
// ============================================

interface RestoreButtonProps {
  children?: ReactNode;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function RestoreButton({
  children,
  onSuccess,
  onError,
  className = '',
}: RestoreButtonProps) {
  const { restore, isLoading } = useRevenueCat();
  const [isRestoring, setIsRestoring] = useState(false);

  const handleRestore = async () => {
    setIsRestoring(true);
    
    const result = await restore();
    
    if (result.success) {
      onSuccess?.();
    } else if (result.error) {
      onError?.(result.error);
    }
    
    setIsRestoring(false);
  };

  return (
    <button
      onClick={handleRestore}
      disabled={isLoading || isRestoring}
      className={className}
    >
      {isRestoring ? 'Restoring...' : children || 'Restore Purchases'}
    </button>
  );
}


