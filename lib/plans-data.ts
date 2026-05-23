/**
 * Public marketing plans — live data via MarketingProvider / catalog-service.
 */
import {
  getStaticCatalogByCategory,
  getStaticCatalogPlanById,
} from "@/lib/catalog/catalog-service";

export {
  resolvePublicCatalog,
  resolveCatalogByCategory,
  getStaticPublicCatalog,
  getStaticCatalogByCategory,
} from "@/lib/catalog/catalog-service";

export {
  planCategoryMeta,
  formatStartingPrice,
  getCatalogPlanById,
} from "@/lib/catalog/plan-catalog";

export type { PlanCatalogEntry as MarketingPlan, PlanCategory } from "@/lib/domain/catalog";

export const homePlans = getStaticCatalogByCategory("home");
export const businessPlans = getStaticCatalogByCategory("business");
export const allMarketingPlans = [...homePlans, ...businessPlans];

export function getPlansByCategory(category: import("@/lib/domain/catalog").PlanCategory) {
  return getStaticCatalogByCategory(category);
}

export function getMarketingPlanById(id: string) {
  return getStaticCatalogPlanById(id);
}
