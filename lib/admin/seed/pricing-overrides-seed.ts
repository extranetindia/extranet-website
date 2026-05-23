import type { CustomerPricingOverride } from "@/lib/domain/pricing-override";

const SEED_DATE = "22 May 2026";

export function seedPricingOverrides(): CustomerPricingOverride[] {
  return [
    {
      id: "ovr-rahul-home-stream",
      customerId: "cust-rahul",
      customerName: "Rahul Sharma",
      accountId: "EXT-2847193",
      planCatalogId: "home-stream",
      planName: "Home Stream",
      publicStartingPrice: 799,
      overrideAmount: 499,
      reason: "legacy",
      status: "active",
      effectiveFrom: "28 Apr 2023",
      notes: "Grandfathered promotional rate",
      updatedAt: SEED_DATE,
    },
    {
      id: "ovr-priya-business-pro",
      customerId: "cust-priya",
      customerName: "Priya Nair",
      accountId: "EXT-4109821",
      planCatalogId: "business-pro",
      planName: "Business Pro",
      publicStartingPrice: 4999,
      overrideAmount: 4499,
      reason: "corporate",
      status: "active",
      effectiveFrom: "10 Mar 2024",
      notes: "Annual corporate contract",
      updatedAt: SEED_DATE,
    },
  ];
}
