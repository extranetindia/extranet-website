"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "@/lib/admin/context/admin-provider";
import { computeBillingAmount } from "@/lib/admin/services/customer-admin-service";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import type { AdminCustomerAccount } from "@/lib/domain/admin-customer";
import type { AdminCustomerFormInput } from "@/lib/domain/admin-customer";
import type { BillingCycle, CustomerType, SubscriptionStatus } from "@/lib/domain/subscription";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminFormField, adminInputClass } from "@/components/admin/ui/AdminFormField";

export type CustomerFormValues = Omit<AdminCustomerFormInput, "overrideAmount"> & {
  overrideInput: string;
};

function defaultDates() {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const now = new Date(2026, 4, 22);
  const start = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  const exp = new Date(2026, 5, 22);
  const expiry = `${exp.getDate()} ${monthNames[exp.getMonth()]} ${exp.getFullYear()}`;
  return { start, expiry };
}

function emptyForm(): CustomerFormValues {
  const { start, expiry } = defaultDates();
  return {
    name: "",
    phoneRaw: "",
    email: "",
    address: "",
    customerType: "residential",
    planCatalogId: "home-stream",
    overrideInput: "",
    billingCycle: "monthly",
    startDate: start,
    expiryDate: expiry,
    status: "active",
    autoRenew: true,
    billingNote: "",
  };
}

function accountToForm(account: AdminCustomerAccount): CustomerFormValues {
  return {
    name: account.name,
    phoneRaw: account.phoneRaw,
    email: account.email ?? "",
    address: account.address,
    customerType: account.customerType === "legacy" ? "residential" : account.customerType,
    planCatalogId: account.planCatalogId,
    overrideInput:
      account.overrideAmount != null ? String(account.overrideAmount) : "",
    billingCycle: account.billingCycle,
    startDate: account.startDate,
    expiryDate: account.expiryDate,
    status: account.status,
    autoRenew: account.autoRenew,
    billingNote: account.billingNote ?? "",
  };
}

function formToInput(values: CustomerFormValues): AdminCustomerFormInput {
  const overrideTrim = values.overrideInput.trim();
  const overrideAmount =
    overrideTrim === "" ? null : Math.max(0, parseInt(overrideTrim, 10) || 0);

  return {
    name: values.name,
    phoneRaw: values.phoneRaw,
    email: values.email || undefined,
    address: values.address,
    customerType: values.customerType,
    planCatalogId: values.planCatalogId,
    overrideAmount,
    billingCycle: values.billingCycle,
    startDate: values.startDate,
    expiryDate: values.expiryDate,
    status: values.status,
    autoRenew: values.autoRenew,
    billingNote: values.billingNote || undefined,
  };
}

type CustomerFormDrawerProps = {
  open: boolean;
  mode: "create" | "edit";
  customer?: AdminCustomerAccount;
  onClose: () => void;
  onSave: (input: AdminCustomerFormInput) => void;
};

export function CustomerFormDrawer({
  open,
  mode,
  customer,
  onClose,
  onSave,
}: CustomerFormDrawerProps) {
  const { plans } = useAdmin();
  const [form, setForm] = useState<CustomerFormValues>(emptyForm);

  const activePlans = useMemo(
    () => plans.filter((p) => p.status === "active"),
    [plans]
  );

  const selectedPlan = resolveCatalogPlanById(form.planCatalogId);
  const publicPrice = selectedPlan?.startingPrice ?? 0;
  const overrideAmount =
    form.overrideInput.trim() === ""
      ? null
      : parseInt(form.overrideInput, 10) || 0;
  const finalBilling = computeBillingAmount(publicPrice, overrideAmount);

  useEffect(() => {
    if (!open) return;
    setForm(customer ? accountToForm(customer) : emptyForm());
  }, [open, customer]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formToInput(form));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />
      <aside className="relative flex h-full w-full max-w-lg flex-col border-l border-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              {mode === "create" ? "New connection" : "Edit customer"}
            </p>
            <h2 className="text-[15px] font-semibold text-foreground">
              {mode === "create" ? "Onboard customer" : customer?.name}
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
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <section>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Account details
              </p>
              <div className="space-y-3">
                <AdminFormField label="Customer name *">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={adminInputClass}
                  />
                </AdminFormField>
                <AdminFormField label="Mobile number *" hint="10-digit registered mobile">
                  <input
                    required
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phoneRaw}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phoneRaw: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className={adminInputClass}
                    placeholder="9876543210"
                  />
                </AdminFormField>
                <AdminFormField label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={adminInputClass}
                  />
                </AdminFormField>
                <AdminFormField label="Service address *">
                  <textarea
                    required
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={adminInputClass}
                  />
                </AdminFormField>
                <AdminFormField label="Customer type">
                  <select
                    value={form.customerType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerType: e.target.value as CustomerType,
                      })
                    }
                    className={adminInputClass}
                  >
                    <option value="residential">Home</option>
                    <option value="business">Business</option>
                  </select>
                </AdminFormField>
              </div>
            </section>

            <section>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Plan & billing
              </p>
              <div className="space-y-3">
                <AdminFormField label="Selected plan *">
                  <select
                    required
                    value={form.planCatalogId}
                    onChange={(e) =>
                      setForm({ ...form, planCatalogId: e.target.value })
                    }
                    className={adminInputClass}
                  >
                    {activePlans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} · {p.speed} · ₹{p.startingPrice}/mo list
                      </option>
                    ))}
                  </select>
                </AdminFormField>

                <div className="rounded-md border border-border bg-surface px-3 py-2.5 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-muted">Public catalog price</span>
                    <span className="font-semibold tabular-nums">
                      ₹{publicPrice.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    Marketing list price — unchanged when setting customer override.
                  </p>
                </div>

                <AdminFormField
                  label="Negotiated override (₹/mo)"
                  hint="Leave empty to bill at public catalog price"
                >
                  <input
                    type="number"
                    min={0}
                    value={form.overrideInput}
                    onChange={(e) =>
                      setForm({ ...form, overrideInput: e.target.value })
                    }
                    className={adminInputClass}
                    placeholder="e.g. 499"
                  />
                </AdminFormField>

                <div className="rounded-md border border-telecom/25 bg-telecom-light/40 px-3 py-2.5">
                  <p className="text-[11px] font-medium text-muted">Final billing amount</p>
                  <p className="text-lg font-semibold tabular-nums text-telecom">
                    ₹{finalBilling.toLocaleString("en-IN")}
                    <span className="text-sm font-normal text-muted">/mo</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <AdminFormField label="Billing cycle">
                    <select
                      value={form.billingCycle}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          billingCycle: e.target.value as BillingCycle,
                        })
                      }
                      className={adminInputClass}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </AdminFormField>
                  <AdminFormField label="Status">
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as SubscriptionStatus,
                        })
                      }
                      className={adminInputClass}
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="expired">Expired</option>
                    </select>
                  </AdminFormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <AdminFormField label="Activation date">
                    <input
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      className={adminInputClass}
                      placeholder="28 May 2026"
                    />
                  </AdminFormField>
                  <AdminFormField label="Expiry date">
                    <input
                      value={form.expiryDate}
                      onChange={(e) =>
                        setForm({ ...form, expiryDate: e.target.value })
                      }
                      className={adminInputClass}
                      placeholder="28 Jun 2026"
                    />
                  </AdminFormField>
                </div>

                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={form.autoRenew}
                    onChange={(e) =>
                      setForm({ ...form, autoRenew: e.target.checked })
                    }
                    className="rounded border-border text-telecom"
                  />
                  Enable auto-renewal
                </label>

                <AdminFormField label="Billing note (optional)">
                  <input
                    value={form.billingNote}
                    onChange={(e) =>
                      setForm({ ...form, billingNote: e.target.value })
                    }
                    className={adminInputClass}
                    placeholder="Legacy promotional rate"
                  />
                </AdminFormField>
              </div>
            </section>
          </div>

          <div className="flex gap-2 border-t border-border px-4 py-3">
            <AdminButton type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </AdminButton>
            <AdminButton type="submit" variant="primary" className="flex-1">
              {mode === "create" ? "Create customer" : "Save changes"}
            </AdminButton>
          </div>
        </form>
      </aside>
    </div>
  );
}
