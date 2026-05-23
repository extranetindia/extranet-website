"use client";

import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminButton } from "@/components/admin/ui/AdminButton";

type PlansTableProps = {
  plans: AdminCatalogPlan[];
  onEdit: (plan: AdminCatalogPlan) => void;
  onToggleStatus: (plan: AdminCatalogPlan) => void;
};

export function PlansTable({ plans, onEdit, onToggleStatus }: PlansTableProps) {
  if (plans.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-surface px-4 py-10 text-center">
        <p className="text-[13px] text-muted">No plans in this category.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-white">
      <table className="w-full min-w-[720px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border bg-surface text-[10px] font-semibold uppercase tracking-wide text-muted">
            <th className="px-3 py-2.5">Plan</th>
            <th className="px-3 py-2.5">Category</th>
            <th className="px-3 py-2.5">Speed</th>
            <th className="px-3 py-2.5">Public price</th>
            <th className="px-3 py-2.5">Status</th>
            <th className="px-3 py-2.5">Updated</th>
            <th className="px-3 py-2.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan.id}
              className="border-b border-border last:border-0 hover:bg-surface/60"
            >
              <td className="px-3 py-2.5">
                <p className="font-medium text-foreground">{plan.name}</p>
                <p className="text-[11px] text-muted">{plan.id}</p>
                {plan.popular && (
                  <span className="mt-0.5 inline-block text-[10px] font-medium text-telecom">
                    Recommended
                  </span>
                )}
              </td>
              <td className="px-3 py-2.5">
                <AdminBadge variant={plan.category}>
                  {plan.category}
                </AdminBadge>
              </td>
              <td className="px-3 py-2.5 font-medium text-foreground">
                {plan.speed}
              </td>
              <td className="px-3 py-2.5">
                <span className="font-semibold tabular-nums text-foreground">
                  ₹{plan.startingPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-muted">/mo</span>
              </td>
              <td className="px-3 py-2.5">
                <AdminBadge variant={plan.status === "active" ? "active" : "disabled"}>
                  {plan.status}
                </AdminBadge>
              </td>
              <td className="px-3 py-2.5 text-muted">{plan.updatedAt}</td>
              <td className="px-3 py-2.5">
                <div className="flex justify-end gap-1.5">
                  <AdminButton variant="outline" onClick={() => onEdit(plan)}>
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant={plan.status === "active" ? "danger" : "secondary"}
                    onClick={() => onToggleStatus(plan)}
                  >
                    {plan.status === "active" ? "Disable" : "Enable"}
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
