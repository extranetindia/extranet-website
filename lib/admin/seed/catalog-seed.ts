import { allCatalogPlans } from "@/lib/catalog/plan-catalog";
import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";

const SEED_DATE = "22 May 2026";

export function seedAdminCatalog(): AdminCatalogPlan[] {
  return allCatalogPlans.map((plan, index) => ({
    ...plan,
    status: "active" as const,
    sortOrder: index + 1,
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
  }));
}
