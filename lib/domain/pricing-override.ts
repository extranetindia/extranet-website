export type PricingOverrideReason =
  | "legacy"
  | "negotiated"
  | "corporate"
  | "promotional"
  | "retention";

export type PricingOverrideStatus = "active" | "expired" | "pending";

/**
 * Customer-specific billing override — separate from public catalog startingPrice.
 * Future H8: GET/POST /api/h8/customers/:id/pricing-overrides
 */
export type CustomerPricingOverride = {
  id: string;
  customerId: string;
  customerName: string;
  accountId: string;
  planCatalogId: string;
  planName: string;
  /** Public list price at time of override (reference only) */
  publicStartingPrice: number;
  /** Negotiated monthly billing amount (INR) */
  overrideAmount: number;
  reason: PricingOverrideReason;
  status: PricingOverrideStatus;
  effectiveFrom: string;
  notes?: string;
  updatedAt: string;
};

export type CustomerPricingOverrideInput = Omit<
  CustomerPricingOverride,
  "updatedAt"
>;
