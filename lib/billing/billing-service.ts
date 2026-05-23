/**
 * Billing history service — mock implementation.
 * Future: GET /api/h8/customers/:id/billing-records
 */

import type { BillingRecord } from "@/lib/domain/billing";
import { getCurrentCustomerSubscription } from "@/lib/subscriptions/subscription-service";
import { mockBillingRecords } from "@/lib/billing/mock-data";

export type { BillingRecord };

export function getBillingRecordsForCustomer(customerId: string): BillingRecord[] {
  return mockBillingRecords.filter((r) => r.customerId === customerId);
}

export function getCurrentCustomerBillingRecords(): BillingRecord[] {
  const sub = getCurrentCustomerSubscription();
  return getBillingRecordsForCustomer(sub.customerId);
}
