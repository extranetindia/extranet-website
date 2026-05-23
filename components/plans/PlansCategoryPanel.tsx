"use client";

import { PricingCard } from "@/components/plans/PricingCard";
import { planCategoryMeta } from "@/lib/catalog/plan-catalog";
import { useMarketing } from "@/lib/public/marketing-provider";
import type { PlanCategory } from "@/lib/domain/catalog";

type PlansCategoryPanelProps = {
  category: PlanCategory;
};

export function PlansCategoryPanel({ category }: PlansCategoryPanelProps) {
  const { getPlansByCategory } = useMarketing();
  const meta = planCategoryMeta[category];
  const plans = getPlansByCategory(category);

  return (
    <div
      role="tabpanel"
      id={`plans-panel-${category}`}
      aria-labelledby={`plans-tab-${category}`}
      className="animate-fade-in"
    >
      <div className="mb-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {meta.title}
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-muted sm:text-[15px]">
          {meta.description}
        </p>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-white px-4 py-10 text-center">
          <p className="text-[13px] text-muted">
            No active plans in this category. Enable plans in the admin catalog.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-[12px] text-muted">{meta.footnote}</p>

      {category === "business" && (
        <div className="mt-6 rounded-lg border border-border bg-white px-4 py-3 text-center text-[13px] text-muted sm:px-5">
          Need leased line, MPLS, or multi-city connectivity?{" "}
          <a href="#support" className="font-medium text-telecom hover:text-telecom-dark">
            Contact our enterprise team
          </a>
        </div>
      )}
    </div>
  );
}
