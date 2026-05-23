import type { BillingCycle, CustomerType, SubscriptionStatus } from "@/lib/domain/subscription";

/** Full customer account — profile + subscription + billing assignment */
export type AdminCustomerAccount = {
  customerId: string;
  accountId: string;
  name: string;
  phoneRaw: string;
  email?: string;
  address: string;
  customerType: CustomerType;
  planCatalogId: string;
  planName: string;
  speed: string;
  /** Public catalog starting price at assignment (reference only) */
  publicCatalogPrice: number;
  /** Optional negotiated monthly rate; null = use catalog price */
  overrideAmount: number | null;
  /** Effective monthly charge — override or public catalog price */
  billingAmount: number;
  billingCycle: BillingCycle;
  startDate: string;
  expiryDate: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
  billingNote?: string;
  /** Soft delete — hidden from active lists */
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminCustomerFormInput = {
  name: string;
  phoneRaw: string;
  email?: string;
  address: string;
  customerType: CustomerType;
  planCatalogId: string;
  overrideAmount: number | null;
  billingCycle: BillingCycle;
  startDate: string;
  expiryDate: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
  billingNote?: string;
};
