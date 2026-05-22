"use client";

import { useState } from "react";
import { homePlans, businessPlans } from "@/lib/plans-data";
import { PlanCategoryTabs } from "@/components/plans/PlanCategoryTabs";
import type { PlanCategory } from "@/lib/plans-data";

export function SpeedComparison() {
  const [category, setCategory] = useState<PlanCategory>("home");
  const plans = category === "home" ? homePlans : businessPlans;
  const maxMbps = Math.max(...plans.map((p) => p.speedMbps));

  return (
    <div className="rounded-lg border border-border bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Speed comparison</p>
          <p className="mt-0.5 text-[12px] text-muted">
            {category === "home" ? "Home broadband" : "Business internet"} download speeds
          </p>
        </div>
        <PlanCategoryTabs active={category} onChange={setCategory} />
      </div>
      <div className="mt-4 space-y-3">
        {plans.map((plan) => (
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
        ))}
      </div>
    </div>
  );
}
