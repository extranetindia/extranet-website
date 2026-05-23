"use client";

import type { PlanCategory } from "@/lib/domain/catalog";

export type PlanFilterCategory = PlanCategory | "all";

type PlanCategoryFilterProps = {
  value: PlanFilterCategory;
  onChange: (value: PlanFilterCategory) => void;
  counts: Record<PlanFilterCategory, number>;
};

const tabs: { id: PlanFilterCategory; label: string }[] = [
  { id: "all", label: "All plans" },
  { id: "home", label: "Home" },
  { id: "business", label: "Business" },
];

export function PlanCategoryFilter({
  value,
  onChange,
  counts,
}: PlanCategoryFilterProps) {
  return (
    <div className="inline-flex rounded-md border border-border bg-surface p-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded px-3 py-1.5 text-[12px] font-medium transition-colors ${
            value === tab.id
              ? "bg-white text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
          <span className="ml-1.5 tabular-nums text-[11px] text-muted">
            ({counts[tab.id]})
          </span>
        </button>
      ))}
    </div>
  );
}
