"use client";

import type { BillingCycle } from "@/lib/domain/subscription";

type BillingPeriodToggleProps = {
  value: BillingCycle;
  onChange: (period: BillingCycle) => void;
};

export function BillingPeriodToggle({ value, onChange }: BillingPeriodToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
          value === "monthly"
            ? "bg-white text-foreground shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("quarterly")}
        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
          value === "quarterly"
            ? "bg-white text-foreground shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Quarterly
        <span className="ml-1 text-[10px] text-emerald-600">Save 5%</span>
      </button>
    </div>
  );
}
