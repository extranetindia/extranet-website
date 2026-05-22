"use client";

import { CheckIcon } from "@/components/icons";
import {
  getPlanPrice,
  getPeriodLabel,
  type BillingPeriod,
  type RenewalPlan,
} from "@/lib/renewal-plans";

type PlanCardProps = {
  plan: RenewalPlan;
  period: BillingPeriod;
  isCurrent: boolean;
  isSelected: boolean;
  onSelect: () => void;
};

export function PlanCard({
  plan,
  period,
  isCurrent,
  isSelected,
  onSelect,
}: PlanCardProps) {
  const price = getPlanPrice(plan, period);
  const perMonth =
    period === "quarterly" ? Math.round(price / 3) : price;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border bg-white p-4 text-left transition-colors sm:p-5 ${
        isSelected
          ? "border-telecom ring-1 ring-telecom"
          : "border-border hover:border-telecom/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {isCurrent && (
            <span className="mb-2 inline-block rounded bg-telecom px-2 py-0.5 text-[11px] font-medium text-white">
              Current plan
            </span>
          )}
          {plan.recommended && !isCurrent && (
            <span className="mb-2 inline-block rounded bg-telecom-light px-2 py-0.5 text-[11px] font-medium text-telecom">
              Recommended
            </span>
          )}
          <h3 className="text-[15px] font-semibold text-foreground">{plan.name}</h3>
          <p className="text-sm font-medium text-telecom">{plan.speed}</p>
        </div>
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            isSelected ? "border-telecom bg-telecom" : "border-border"
          }`}
        >
          {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-1 border-t border-border pt-4">
        <span className="text-sm text-muted">₹</span>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {price.toLocaleString("en-IN")}
        </span>
        <span className="text-[13px] text-muted">/ {getPeriodLabel(period)}</span>
      </div>
      {period === "quarterly" && (
        <p className="mt-1 text-[12px] text-muted">
          ≈ ₹{perMonth.toLocaleString("en-IN")}/mo · Save ₹{plan.quarterlySavings}
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {plan.benefits.slice(0, 4).map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-[12px] text-foreground/90">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-telecom" />
            {benefit}
          </li>
        ))}
      </ul>
    </button>
  );
}
