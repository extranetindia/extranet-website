/**
 * Customer pricing override service — mock persistence.
 * Separate from public catalog; drives negotiated / legacy billing.
 * Future H8: GET/POST /api/h8/customers/:id/pricing-overrides
 */

import { seedPricingOverrides } from "@/lib/admin/seed/pricing-overrides-seed";
import { ADMIN_PRICING_OVERRIDES_KEY } from "@/lib/admin/storage-keys";
import type {
  CustomerPricingOverride,
  CustomerPricingOverrideInput,
} from "@/lib/domain/pricing-override";

export type { CustomerPricingOverride, CustomerPricingOverrideInput };

function nowLabel(): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function loadOverridesFromStorage(): CustomerPricingOverride[] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_PRICING_OVERRIDES_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerPricingOverride[];
  } catch {
    return null;
  }
}

export function saveOverridesToStorage(overrides: CustomerPricingOverride[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_PRICING_OVERRIDES_KEY, JSON.stringify(overrides));
}

export function getPricingOverrides(): CustomerPricingOverride[] {
  return loadOverridesFromStorage() ?? seedPricingOverrides();
}

export function getOverridesForCustomer(
  customerId: string,
  overrides?: CustomerPricingOverride[]
): CustomerPricingOverride[] {
  const list = overrides ?? getPricingOverrides();
  return list.filter((o) => o.customerId === customerId && o.status === "active");
}

export function upsertPricingOverride(
  input: CustomerPricingOverrideInput,
  existing: CustomerPricingOverride[]
): CustomerPricingOverride[] {
  const idx = existing.findIndex((o) => o.id === input.id);
  const record: CustomerPricingOverride = {
    ...input,
    updatedAt: nowLabel(),
  };
  if (idx >= 0) {
    const next = [...existing];
    next[idx] = record;
    return next;
  }
  return [...existing, record];
}
