"use client";

import { useState } from "react";
import { PlanCategoryTabs } from "@/components/plans/PlanCategoryTabs";
import { useMarketing } from "@/lib/public/marketing-provider";
import type { PlanCategory } from "@/lib/domain/catalog";

export function SpeedComparison() {
  const [category, setCategory] = useState<PlanCategory>("home");
  const { getPlansByCategory } = useMarketing();
  const plans = getPlansByCategory(category);
  const maxMbps = Math.max(...plans.map((p) => p.speedMbps), 1);

  return (
    <div className="rounded-lg border border-border bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Speed comparison</p>
          <p className="mt-0.5 text-[12px] text-muted">
            Public catalog speeds for reference — your billing rate is account-specific
          </p>
        </div>
        <PlanCategoryTabs active={category} onChange={setCategory} />
      </div>
      <div className="mt-4 space-y-3">
        {plans.length === 0 ? (
          <p className="text-[12px] text-muted">No active plans in this category.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id}>
              <div className="mb-1 flex justify-between text-[12px]">
                <span className="font-medium text-foreground">{plan.name}</span>
                <span className="text-muted">{plan.speed}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-telecom transition-all duration-300"
                  style={{ width: `${(plan.speedMbps / maxMbps) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
