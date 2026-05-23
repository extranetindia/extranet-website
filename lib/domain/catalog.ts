export type PlanCategory = "home" | "business";

/** Public marketing catalog — fixed starting prices for new customers only */
export type PlanCatalogEntry = {
  id: string;
  category: PlanCategory;
  name: string;
  speed: string;
  speedMbps: number;
  /** Public list price shown on website ("Starting at") */
  startingPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  highlight?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
