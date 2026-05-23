/**
 * Customer subscription service — mock implementation.
 * Replace fetch calls with H8 API when backend is ready.
 */

import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import type { BillingCycle, CustomerSubscription, RenewalQuote } from "@/lib/domain/subscription";
import { getLoggedInCustomerId } from "@/lib/session/customer-session";
import {
  DEFAULT_CUSTOMER_ID,
  mockSubscriptions,
} from "@/lib/subscriptions/mock-data";

export type { CustomerSubscription, RenewalQuote, BillingCycle };

export function getSubscriptionByCustomerId(
  customerId: string
): CustomerSubscription | undefined {
  return mockSubscriptions.find((s) => s.customerId === customerId);
}

/** Primary portal entry — uses session customer or demo default */
export function getCurrentCustomerSubscription(): CustomerSubscription {
  const sessionId = getLoggedInCustomerId();
  const id = sessionId ?? DEFAULT_CUSTOMER_ID;
  const sub = getSubscriptionByCustomerId(id);
  if (!sub) {
    return mockSubscriptions[0];
  }
  return sub;
}

export function getPublicStartingPrice(planCatalogId: string): number | undefined {
  return resolveCatalogPlanById(planCatalogId)?.startingPrice;
}

export function calculateRenewalAmount(
  subscription: CustomerSubscription,
  cycle: BillingCycle
): number {
  if (cycle === "monthly") {
    return subscription.billingAmount;
  }
  const monthly = subscription.billingAmount;
  const quarterly = Math.round(monthly * 2.85);
  return quarterly;
}

export function getRenewalQuote(
  subscription: CustomerSubscription,
  cycle: BillingCycle = subscription.billingCycle
): RenewalQuote {
  const catalog = resolveCatalogPlanById(subscription.planCatalogId);
  const monthly = subscription.billingAmount;
  const quarterly = calculateRenewalAmount(subscription, "quarterly");
  const quarterlySavings = monthly * 3 - quarterly;

  return {
    planCatalogId: subscription.planCatalogId,
    planName: subscription.planName,
    speed: subscription.speed,
    billingAmount: calculateRenewalAmount(subscription, cycle),
    billingCycle: cycle,
    quarterlyAmount: quarterly,
    quarterlySavings,
    expiryDate: subscription.expiryDate,
    features: catalog?.features ?? [],
  };
}

export function daysUntilExpiry(expiryDate: string): number {
  const months_map: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = expiryDate.split(" ");
  const day = parseInt(parts[0], 10);
  const month = months_map[parts[1]];
  const year = parseInt(parts[2], 10);
  const target = new Date(year, month, day);
  const now = new Date(2026, 4, 22);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}
