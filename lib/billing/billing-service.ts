/**
 * Billing history service — reads admin billing store on client.
 * Future: GET /api/h8/customers/:id/billing-records
 */

import type { BillingRecord } from "@/lib/domain/billing";
import { getBillingRecordsForCustomer as getAdminBillingForCustomer } from "@/lib/billing/billing-admin-service";
import { mockBillingRecords } from "@/lib/billing/mock-data";
import { getCurrentCustomerSubscription } from "@/lib/subscriptions/subscription-service";

export type { BillingRecord };

export function getBillingRecordsForCustomer(customerId: string): BillingRecord[] {
  if (typeof window !== "undefined") {
    const records = getAdminBillingForCustomer(customerId);
    if (records.length > 0) return records;
  }
  return mockBillingRecords.filter((r) => r.customerId === customerId);
}

export function getCurrentCustomerBillingRecords(): BillingRecord[] {
  const sub = getCurrentCustomerSubscription();
  return getBillingRecordsForCustomer(sub.customerId);
}
