"use client";

import { useEffect, useState } from "react";
import {
  formatFeaturesForInput,
  parseFeaturesText,
} from "@/lib/admin/services/catalog-admin-service";
import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";
import type { PlanCategory } from "@/lib/domain/catalog";
import { AdminButton } from "@/components/admin/ui/AdminButton";

export type PlanFormValues = {
  name: string;
  category: PlanCategory;
  speed: string;
  speedMbps: number;
  startingPrice: number;
  description: string;
  featuresText: string;
  highlight: string;
  popular: boolean;
  sortOrder: number;
};

function emptyForm(): PlanFormValues {
  return {
    name: "",
    category: "home",
    speed: "100 Mbps",
    speedMbps: 100,
    startingPrice: 799,
    description: "",
    featuresText: "Unlimited fair usage\n24×7 support",
    highlight: "",
    popular: false,
    sortOrder: 99,
  };
}

function planToForm(plan: AdminCatalogPlan): PlanFormValues {
  return {
    name: plan.name,
    category: plan.category,
    speed: plan.speed,
    speedMbps: plan.speedMbps,
    startingPrice: plan.startingPrice,
    description: plan.description,
    featuresText: formatFeaturesForInput(plan.features),
    highlight: plan.highlight ?? "",
    popular: plan.popular ?? false,
    sortOrder: plan.sortOrder,
  };
}

type PlanFormDrawerProps = {
  open: boolean;
  mode: "create" | "edit";
  plan?: AdminCatalogPlan;
  onClose: () => void;
  onSave: (values: PlanFormValues) => void;
};

export function PlanFormDrawer({
  open,
  mode,
  plan,
  onClose,
  onSave,
}: PlanFormDrawerProps) {
  const [form, setForm] = useState<PlanFormValues>(emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(plan ? planToForm(plan) : emptyForm());
  }, [open, plan]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const syncSpeedFromMbps = (mbps: number) => {
    const label =
      mbps >= 1000 ? `${mbps / 1000} Gbps` : `${mbps} Mbps`;
    setForm((f) => ({ ...f, speedMbps: mbps, speed: label }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              {mode === "create" ? "New plan" : "Edit plan"}
            </p>
            <h2 className="text-[15px] font-semibold text-foreground">
              {mode === "create" ? "Add to public catalog" : plan?.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted hover:bg-surface"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Field label="Plan name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Home Stream"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as PlanCategory,
                    })
                  }
                  className={inputClass}
                >
                  <option value="home">Home</option>
                  <option value="business">Business</option>
                </select>
              </Field>
              <Field label="Sort order">
                <input
                  type="number"
                  min={1}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 1 })
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Speed (Mbps)">
                <input
                  type="number"
                  min={1}
                  value={form.speedMbps}
                  onChange={(e) =>
                    syncSpeedFromMbps(parseInt(e.target.value, 10) || 1)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Speed label">
                <input
                  value={form.speed}
                  onChange={(e) => setForm({ ...form, speed: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Public starting price (₹/mo)">
              <input
                type="number"
                min={0}
                required
                value={form.startingPrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startingPrice: parseInt(e.target.value, 10) || 0,
                  })
                }
                className={inputClass}
              />
              <p className="mt-1 text-[11px] text-muted">
                Shown on website as &quot;Starting at&quot; — not customer billing.
              </p>
            </Field>

            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={inputClass}
              />
            </Field>

            <Field label="Features (one per line)">
              <textarea
                rows={5}
                value={form.featuresText}
                onChange={(e) =>
                  setForm({ ...form, featuresText: e.target.value })
                }
                className={inputClass}
              />
            </Field>

            <Field label="Highlight badge (optional)">
              <input
                value={form.highlight}
                onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                className={inputClass}
                placeholder="Most popular"
              />
            </Field>

            <label className="flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="rounded border-border text-telecom"
              />
              Mark as recommended on marketing site
            </label>
          </div>

          <div className="flex gap-2 border-t border-border px-4 py-3">
            <AdminButton type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </AdminButton>
            <AdminButton type="submit" variant="primary" className="flex-1">
              {mode === "create" ? "Create plan" : "Save changes"}
            </AdminButton>
          </div>
        </form>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded border border-border px-2.5 py-2 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom";

export function formValuesToPlanInput(
  values: PlanFormValues,
  status: "active" | "disabled" = "active"
) {
  return {
    name: values.name.trim(),
    category: values.category,
    speed: values.speed.trim(),
    speedMbps: values.speedMbps,
    startingPrice: values.startingPrice,
    description: values.description.trim(),
    features: parseFeaturesText(values.featuresText),
    highlight: values.highlight.trim() || undefined,
    popular: values.popular,
    sortOrder: values.sortOrder,
    status,
  };
}
