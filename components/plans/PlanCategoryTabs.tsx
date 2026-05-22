"use client";

import type { PlanCategory } from "@/lib/plans-data";

type PlanCategoryTabsProps = {
  active: PlanCategory;
  onChange: (category: PlanCategory) => void;
};

const tabs: { id: PlanCategory; label: string; sublabel: string }[] = [
  { id: "home", label: "Home users", sublabel: "Broadband" },
  { id: "business", label: "Business users", sublabel: "Enterprise" },
];

export function PlanCategoryTabs({ active, onChange }: PlanCategoryTabsProps) {
  return (
    <div
      className="mx-auto flex max-w-md rounded-lg border border-border bg-white p-1"
      role="tablist"
      aria-label="Plan category"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex flex-1 flex-col items-center rounded-md px-3 py-2.5 text-center transition-colors ${
              isActive
                ? tab.id === "business"
                  ? "bg-telecom-darker text-white shadow-sm"
                  : "bg-telecom text-white shadow-sm"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <span className="text-[13px] font-semibold">{tab.label}</span>
            <span
              className={`text-[11px] ${
                isActive ? "text-white/80" : "text-muted"
              }`}
            >
              {tab.sublabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
