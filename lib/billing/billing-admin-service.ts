/**
 * Billing records admin store — localStorage.
 */

import { ADMIN_BILLING_STORAGE_KEY } from "@/lib/admin/storage-keys";
import type { BillingRecord } from "@/lib/domain/billing";
import { mockBillingRecords } from "@/lib/billing/mock-data";

export function loadBillingFromStorage(): BillingRecord[] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_BILLING_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BillingRecord[];
  } catch {
    return null;
  }
}

export function saveBillingToStorage(records: BillingRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_BILLING_STORAGE_KEY, JSON.stringify(records));
}

export function getAllBillingRecords(): BillingRecord[] {
  return loadBillingFromStorage() ?? mockBillingRecords;
}

export function getBillingRecordsForCustomer(customerId: string): BillingRecord[] {
  return getAllBillingRecords().filter((r) => r.customerId === customerId);
}
