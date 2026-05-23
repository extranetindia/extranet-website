"use client";

import { useMemo, useState } from "react";
import { useAdmin } from "@/lib/admin/context/admin-provider";
import { filterPlansByCategory } from "@/lib/admin/services/catalog-admin-service";
import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import {
  PlanCategoryFilter,
  type PlanFilterCategory,
} from "@/components/admin/plans/PlanCategoryFilter";
import { PlansTable } from "@/components/admin/plans/PlansTable";
import {
  PlanFormDrawer,
  formValuesToPlanInput,
  type PlanFormValues,
} from "@/components/admin/plans/PlanFormDrawer";

export function PlansManagement() {
  const { plans, createPlan, updatePlan, togglePlanStatus } = useAdmin();
  const [filter, setFilter] = useState<PlanFilterCategory>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminCatalogPlan | undefined>();

  const counts = useMemo(
    () => ({
      all: plans.length,
      home: plans.filter((p) => p.category === "home").length,
      business: plans.filter((p) => p.category === "business").length,
    }),
    [plans]
  );

  const filtered = useMemo(
    () => filterPlansByCategory(plans, filter).sort((a, b) => a.sortOrder - b.sortOrder),
    [plans, filter]
  );

  const activeCount = plans.filter((p) => p.status === "active").length;

  const openCreate = () => {
    setEditingPlan(undefined);
    setDrawerOpen(true);
  };

  const openEdit = (plan: AdminCatalogPlan) => {
    setEditingPlan(plan);
    setDrawerOpen(true);
  };

  const handleSave = (values: PlanFormValues) => {
    const input = formValuesToPlanInput(
      values,
      editingPlan?.status ?? "active"
    );

    if (editingPlan) {
      updatePlan(editingPlan.id, input);
    } else {
      createPlan(input);
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <AdminPageHeader
        title="Plan catalog"
        description="Manage public marketing plans and starting prices. Customer billing overrides are configured separately under Customers."
        actions={
          <AdminButton variant="primary" onClick={openCreate}>
            + Add plan
          </AdminButton>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <AdminCard padding="sm">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Total plans
          </p>
          <p className="mt-1 text-lg font-semibold">{plans.length}</p>
        </AdminCard>
        <AdminCard padding="sm">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Active on website
          </p>
          <p className="mt-1 text-lg font-semibold text-emerald-700">{activeCount}</p>
        </AdminCard>
        <AdminCard padding="sm">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Disabled
          </p>
          <p className="mt-1 text-lg font-semibold">{plans.length - activeCount}</p>
        </AdminCard>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PlanCategoryFilter value={filter} onChange={setFilter} counts={counts} />
        <p className="text-[11px] text-muted">
          Public catalog only · Overrides in{" "}
          <a href="/admin/customers" className="font-medium text-telecom hover:underline">
            Customers
          </a>
        </p>
      </div>

      <PlansTable
        plans={filtered}
        onEdit={openEdit}
        onToggleStatus={(plan) => togglePlanStatus(plan.id)}
      />

      <PlanFormDrawer
        open={drawerOpen}
        mode={editingPlan ? "edit" : "create"}
        plan={editingPlan}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
