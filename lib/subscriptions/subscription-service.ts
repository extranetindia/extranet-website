/**
 * Customer subscription service — admin CRM store is the single source of truth.
 * Replace with H8 API when backend is ready.
 */

import {
  accountToSubscription,
  findCustomerByPhone,
  getAdminCustomerById,
} from "@/lib/admin/services/customer-admin-service";
import { seedAdminCustomers } from "@/lib/admin/seed/customers-seed";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import { PORTAL_DEFAULT_CUSTOMER_ID } from "@/lib/portal/constants";
import type { BillingCycle, CustomerSubscription, RenewalQuote } from "@/lib/domain/subscription";
import { getLoggedInCustomerId } from "@/lib/session/customer-session";

export type { CustomerSubscription, RenewalQuote, BillingCycle };

function getSeededSubscription(customerId: string): CustomerSubscription | undefined {
  const account = seedAdminCustomers().find(
    (c) => c.customerId === customerId && !c.deletedAt
  );
  return account ? accountToSubscription(account) : undefined;
}

/** Resolve subscription from admin store (includes suspended — not deleted) */
export function getSubscriptionByCustomerId(
  customerId: string
): CustomerSubscription | undefined {
  const account = getAdminCustomerById(customerId);
  if (account && !account.deletedAt) {
    return accountToSubscription(account);
  }
  return getSeededSubscription(customerId);
}

/** Primary portal entry — session customer, always from admin CRM data on client */
export function getCurrentCustomerSubscription(): CustomerSubscription {
  const sessionId = getLoggedInCustomerId() ?? PORTAL_DEFAULT_CUSTOMER_ID;
  const sub = getSubscriptionByCustomerId(sessionId);
  if (sub) return sub;

  const fallback = getSeededSubscription(PORTAL_DEFAULT_CUSTOMER_ID);
  if (fallback) return fallback;

  const first = seedAdminCustomers().find((c) => !c.deletedAt);
  if (first) return accountToSubscription(first);

  throw new Error("No customer subscription available");
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
  return Math.round(subscription.billingAmount * 2.85);
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

export { findCustomerByPhone };
