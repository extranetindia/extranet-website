export type CustomerType = "residential" | "business" | "legacy";
export type SubscriptionStatus = "active" | "suspended" | "expired";
export type BillingCycle = "monthly" | "quarterly";

/**
 * Assigned subscription for a logged-in customer.
 * billingAmount is negotiated — may differ from public catalog starting price.
 */
export type CustomerSubscription = {
  customerId: string;
  customerName: string;
  accountId: string;
  planCatalogId: string;
  planName: string;
  speed: string;
  /** Customer-specific charge (INR) — source of truth for dashboard & renewal */
  billingAmount: number;
  billingCycle: BillingCycle;
  expiryDate: string;
  startDate: string;
  status: SubscriptionStatus;
  customerType: CustomerType;
  autoRenew: boolean;
  /** Optional note shown in portal (e.g. legacy corporate rate) */
  billingNote?: string;
};

export type RenewalQuote = {
  planCatalogId: string;
  planName: string;
  speed: string;
  billingAmount: number;
  billingCycle: BillingCycle;
  quarterlyAmount: number;
  quarterlySavings: number;
  expiryDate: string;
  features: string[];
};
