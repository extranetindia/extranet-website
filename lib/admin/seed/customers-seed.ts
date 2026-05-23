import type { AdminCustomerAccount } from "@/lib/domain/admin-customer";
import { mockCustomerProfiles } from "@/lib/customers/mock-profiles";
import { mockSubscriptions } from "@/lib/subscriptions/mock-data";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";

const SEED_DATE = "22 May 2026";

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(-10);
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

export function seedAdminCustomers(): AdminCustomerAccount[] {
  return mockSubscriptions.map((sub) => {
    const profile = mockCustomerProfiles[sub.customerId];
    const catalogPrice =
      resolveCatalogPlanById(sub.planCatalogId)?.startingPrice ?? sub.billingAmount;
    const hasOverride = sub.billingAmount !== catalogPrice;

    return {
      customerId: sub.customerId,
      accountId: sub.accountId,
      name: profile?.name ?? sub.customerName,
      phoneRaw: profile?.phoneRaw ?? "0000000000",
      email: profile?.email,
      address: profile?.address ?? "",
      customerType: sub.customerType,
      planCatalogId: sub.planCatalogId,
      planName: sub.planName,
      speed: sub.speed,
      publicCatalogPrice: catalogPrice,
      overrideAmount: hasOverride ? sub.billingAmount : null,
      billingAmount: sub.billingAmount,
      billingCycle: sub.billingCycle,
      startDate: sub.startDate,
      expiryDate: sub.expiryDate,
      status: sub.status,
      autoRenew: sub.autoRenew,
      billingNote: sub.billingNote,
      deletedAt: null,
      createdAt: profile?.memberSince ?? SEED_DATE,
      updatedAt: SEED_DATE,
    };
  });
}

export function accountToProfileFields(account: AdminCustomerAccount) {
  return {
    customerId: account.customerId,
    name: account.name,
    accountId: account.accountId,
    phone: formatPhone(account.phoneRaw),
    phoneRaw: account.phoneRaw,
    email: account.email ?? "",
    address: account.address,
    memberSince: account.createdAt,
  };
}
