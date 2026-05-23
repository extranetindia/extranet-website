/**
 * Customer admin service — CRM CRUD with localStorage.
 * Future H8: GET/POST /api/h8/customers
 */

import { ADMIN_CUSTOMERS_STORAGE_KEY } from "@/lib/admin/storage-keys";
import { seedAdminCustomers } from "@/lib/admin/seed/customers-seed";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import type {
  AdminCustomerAccount,
  AdminCustomerFormInput,
} from "@/lib/domain/admin-customer";
import type { CustomerSubscription } from "@/lib/domain/subscription";
import type { CustomerProfile } from "@/lib/customers/mock-profiles";
import { accountToProfileFields } from "@/lib/admin/seed/customers-seed";
import { dispatchCustomersDataUpdate } from "@/lib/public/sync-events";

export type { AdminCustomerAccount, AdminCustomerFormInput };

function nowLabel(): string {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date();
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}

export function computeBillingAmount(
  publicCatalogPrice: number,
  overrideAmount: number | null | undefined
): number {
  if (
    overrideAmount != null &&
    !Number.isNaN(overrideAmount) &&
    overrideAmount >= 0
  ) {
    return Math.round(overrideAmount);
  }
  return publicCatalogPrice;
}

export function loadCustomersFromStorage(): AdminCustomerAccount[] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_CUSTOMERS_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminCustomerAccount[];
  } catch {
    return null;
  }
}

export function saveCustomersToStorage(customers: AdminCustomerAccount[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
  dispatchCustomersDataUpdate();
}

export function getAllAdminCustomersRaw(): AdminCustomerAccount[] {
  return loadCustomersFromStorage() ?? seedAdminCustomers();
}

export function getAdminCustomers(includeDeleted = false): AdminCustomerAccount[] {
  const list = getAllAdminCustomersRaw();
  if (includeDeleted) return list;
  return list.filter((c) => !c.deletedAt);
}

export function getAdminCustomerById(
  customerId: string
): AdminCustomerAccount | undefined {
  return getAllAdminCustomersRaw().find((c) => c.customerId === customerId);
}

export function findCustomerByPhone(phone: string): AdminCustomerAccount | undefined {
  const digits = normalizePhone(phone);
  return getAdminCustomers().find((c) => c.phoneRaw === digits);
}

export function generateAccountId(): string {
  return `EXT-${Math.floor(1000000 + Math.random() * 9000000)}`;
}

export function generateCustomerId(name: string, existing: AdminCustomerAccount[]): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20) || "customer";
  let id = `cust-${base}`;
  let n = 1;
  while (existing.some((c) => c.customerId === id)) {
    id = `cust-${base}-${n++}`;
  }
  return id;
}

export function buildAccountFromForm(
  input: AdminCustomerFormInput,
  plan: { id: string; name: string; speed: string; startingPrice: number },
  existing?: AdminCustomerAccount
): Omit<AdminCustomerAccount, "customerId" | "accountId" | "createdAt" | "updatedAt"> & {
  customerId?: string;
  accountId?: string;
  createdAt?: string;
} {
  const publicCatalogPrice = plan.startingPrice;
  const billingAmount = computeBillingAmount(
    publicCatalogPrice,
    input.overrideAmount
  );
  const hasOverride =
    input.overrideAmount != null &&
    input.overrideAmount !== publicCatalogPrice;

  return {
    customerId: existing?.customerId,
    accountId: existing?.accountId,
    createdAt: existing?.createdAt,
    name: input.name.trim(),
    phoneRaw: normalizePhone(input.phoneRaw),
    email: input.email?.trim() || undefined,
    address: input.address.trim(),
    customerType: input.customerType,
    planCatalogId: plan.id,
    planName: plan.name,
    speed: plan.speed,
    publicCatalogPrice,
    overrideAmount: hasOverride ? billingAmount : null,
    billingAmount,
    billingCycle: input.billingCycle,
    startDate: input.startDate,
    expiryDate: input.expiryDate,
    status: input.status,
    autoRenew: input.autoRenew,
    billingNote: input.billingNote?.trim() || undefined,
    deletedAt: existing?.deletedAt ?? null,
  };
}

export function createAdminCustomer(
  input: AdminCustomerFormInput,
  existing: AdminCustomerAccount[]
): AdminCustomerAccount {
  const plan = resolveCatalogPlanById(input.planCatalogId);
  if (!plan) throw new Error("Invalid plan selected");

  const stamp = nowLabel();
  const built = buildAccountFromForm(input, plan);
  const customer: AdminCustomerAccount = {
    ...built,
    customerId: generateCustomerId(input.name, existing),
    accountId: generateAccountId(),
    createdAt: stamp,
    updatedAt: stamp,
  };
  return customer;
}

export function updateAdminCustomer(
  customerId: string,
  input: AdminCustomerFormInput,
  existing: AdminCustomerAccount[]
): AdminCustomerAccount[] {
  const plan = resolveCatalogPlanById(input.planCatalogId);
  if (!plan) throw new Error("Invalid plan selected");

  return existing.map((c) => {
    if (c.customerId !== customerId) return c;
    const built = buildAccountFromForm(input, plan, c);
    return {
      ...c,
      ...built,
      customerId: c.customerId,
      accountId: c.accountId,
      createdAt: c.createdAt,
      updatedAt: nowLabel(),
    };
  });
}

export function setCustomerStatus(
  customerId: string,
  status: AdminCustomerAccount["status"],
  existing: AdminCustomerAccount[]
): AdminCustomerAccount[] {
  return existing.map((c) =>
    c.customerId === customerId
      ? { ...c, status, updatedAt: nowLabel() }
      : c
  );
}

export function softDeleteCustomer(
  customerId: string,
  existing: AdminCustomerAccount[]
): AdminCustomerAccount[] {
  const stamp = nowLabel();
  return existing.map((c) =>
    c.customerId === customerId
      ? { ...c, deletedAt: stamp, status: "suspended", updatedAt: stamp }
      : c
  );
}

export function accountToSubscription(
  account: AdminCustomerAccount
): CustomerSubscription {
  return {
    customerId: account.customerId,
    customerName: account.name,
    accountId: account.accountId,
    planCatalogId: account.planCatalogId,
    planName: account.planName,
    speed: account.speed,
    billingAmount: account.billingAmount,
    billingCycle: account.billingCycle,
    expiryDate: account.expiryDate,
    startDate: account.startDate,
    status: account.status,
    customerType: account.customerType,
    autoRenew: account.autoRenew,
    billingNote: account.billingNote,
  };
}

export function accountToCustomerProfile(
  account: AdminCustomerAccount
): CustomerProfile {
  return accountToProfileFields(account);
}

export function getActiveSubscriptions(): CustomerSubscription[] {
  return getAdminCustomers()
    .filter((c) => c.status !== "suspended" && !c.deletedAt)
    .map(accountToSubscription);
}

export function getPricingOverridesFromCustomers(): import("@/lib/domain/pricing-override").CustomerPricingOverride[] {
  return getAdminCustomers()
    .filter(
      (c) =>
        c.overrideAmount != null && c.billingAmount !== c.publicCatalogPrice
    )
    .map((c) => ({
      id: `ovr-${c.customerId}`,
      customerId: c.customerId,
      customerName: c.name,
      accountId: c.accountId,
      planCatalogId: c.planCatalogId,
      planName: c.planName,
      publicStartingPrice: c.publicCatalogPrice,
      overrideAmount: c.billingAmount,
      reason:
        c.customerType === "legacy"
          ? ("legacy" as const)
          : c.customerType === "business"
            ? ("corporate" as const)
            : ("negotiated" as const),
      status: "active" as const,
      effectiveFrom: c.startDate,
      notes: c.billingNote,
      updatedAt: c.updatedAt,
    }));
}
