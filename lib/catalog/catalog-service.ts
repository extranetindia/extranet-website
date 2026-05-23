/**
 * Public catalog read layer — marketing site & acquisition flows.
 * SSR/build uses static seed; client hydrates from admin localStorage.
 * Future H8: GET /api/h8/catalog/plans
 */

import { loadCatalogFromStorage } from "@/lib/admin/services/catalog-admin-service";
import { seedAdminCatalog } from "@/lib/admin/seed/catalog-seed";
import {
  allCatalogPlans,
  getCatalogPlanById as getStaticPlanById,
} from "@/lib/catalog/plan-catalog";
import type { PlanCatalogEntry, PlanCategory } from "@/lib/domain/catalog";
import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";

export type { PlanCatalogEntry, PlanCategory };

function adminToPublic(plan: AdminCatalogPlan): PlanCatalogEntry {
  const { status: _s, sortOrder: _o, createdAt: _c, updatedAt: _u, ...entry } = plan;
  return entry;
}

/** Static fallback for SSR / initial hydration (must match server output) */
export function getStaticPublicCatalog(): PlanCatalogEntry[] {
  return toPublicCatalog(seedAdminCatalog());
}

export function getStaticCatalogByCategory(category: PlanCategory): PlanCatalogEntry[] {
  return getStaticPublicCatalog().filter((p) => p.category === category);
}

export function getStaticCatalogPlanById(id: string): PlanCatalogEntry | undefined {
  const fromStatic = allCatalogPlans.find((p) => p.id === id);
  if (fromStatic) return fromStatic;
  return getStaticPublicCatalog().find((p) => p.id === id);
}

export function toPublicCatalog(plans: AdminCatalogPlan[]): PlanCatalogEntry[] {
  return plans
    .filter((p) => p.status === "active")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(adminToPublic);
}

/** All admin plans including disabled (for admin preview / lookup) */
export function toPublicCatalogAll(plans: AdminCatalogPlan[]): PlanCatalogEntry[] {
  return [...plans].sort((a, b) => a.sortOrder - b.sortOrder).map(adminToPublic);
}

/**
 * Resolve live public catalog — client reads admin store; server uses static seed.
 */
export function resolvePublicCatalog(): PlanCatalogEntry[] {
  if (typeof window === "undefined") {
    return getStaticPublicCatalog();
  }
  const stored = loadCatalogFromStorage();
  if (stored && stored.length > 0) {
    return toPublicCatalog(stored);
  }
  return getStaticPublicCatalog();
}

export function resolveCatalogByCategory(
  category: PlanCategory
): PlanCatalogEntry[] {
  return resolvePublicCatalog().filter((p) => p.category === category);
}

export function resolveCatalogPlanById(id: string): PlanCatalogEntry | undefined {
  if (typeof window !== "undefined") {
    const stored = loadCatalogFromStorage();
    if (stored) {
      const plan = stored.find((p) => p.id === id);
      if (plan) return adminToPublic(plan);
    }
  }
  return getStaticCatalogPlanById(id);
}

export function getLowestStartingPrice(plans: PlanCatalogEntry[]): number | null {
  if (plans.length === 0) return null;
  return Math.min(...plans.map((p) => p.startingPrice));
}

/** @deprecated Use resolveCatalogPlanById */
export { getStaticPlanById };
