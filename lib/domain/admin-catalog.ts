import type { PlanCatalogEntry } from "@/lib/domain/catalog";

export type PlanCatalogStatus = "active" | "disabled";

/** Admin-managed public catalog entry (marketing / new customer pricing only) */
export type AdminCatalogPlan = PlanCatalogEntry & {
  status: PlanCatalogStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type AdminCatalogPlanInput = Omit<
  AdminCatalogPlan,
  "id" | "createdAt" | "updatedAt"
> & { id?: string };
