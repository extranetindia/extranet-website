"use client";

import type { BillingPeriod } from "@/lib/renewal-plans";

type BillingPeriodToggleProps = {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
};

export function BillingPeriodToggle({ value, onChange }: BillingPeriodToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-1">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`rounded-md px-4 py-2 text-[13px] font-medium transition-colors ${
          value === "monthly"
            ? "bg-white text-telecom shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("quarterly")}
        className={`rounded-md px-4 py-2 text-[13px] font-medium transition-colors ${
          value === "quarterly"
            ? "bg-white text-telecom shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Quarterly
        <span className="ml-1.5 text-[11px] text-emerald-600">Save more</span>
      </button>
    </div>
  );
}
