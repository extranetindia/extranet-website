"use client";

import type { AdminCustomerAccount } from "@/lib/domain/admin-customer";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminButton } from "@/components/admin/ui/AdminButton";

type CustomersTableProps = {
  customers: AdminCustomerAccount[];
  onEdit: (customer: AdminCustomerAccount) => void;
  onSuspend: (customer: AdminCustomerAccount) => void;
  onReactivate: (customer: AdminCustomerAccount) => void;
  onDelete: (customer: AdminCustomerAccount) => void;
};

export function CustomersTable({
  customers,
  onEdit,
  onSuspend,
  onReactivate,
  onDelete,
}: CustomersTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-surface px-4 py-12 text-center">
        <p className="text-[13px] text-muted">No customers found.</p>
        <p className="mt-1 text-[12px] text-muted">
          Use Add Customer to onboard a new connection.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-white">
      <table className="w-full min-w-[900px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border bg-surface text-[10px] font-semibold uppercase tracking-wide text-muted">
            <th className="px-3 py-2.5">Account</th>
            <th className="px-3 py-2.5">Customer</th>
            <th className="px-3 py-2.5">Plan</th>
            <th className="px-3 py-2.5">List price</th>
            <th className="px-3 py-2.5">Billing</th>
            <th className="px-3 py-2.5">Expiry</th>
            <th className="px-3 py-2.5">Status</th>
            <th className="px-3 py-2.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => {
            const hasOverride = c.overrideAmount != null;
            return (
              <tr
                key={c.customerId}
                className="border-b border-border last:border-0 hover:bg-surface/50"
              >
                <td className="px-3 py-2.5">
                  <p className="font-mono text-[11px]">{c.accountId}</p>
                  <p className="text-[10px] text-muted">{c.phoneRaw}</p>
                </td>
                <td className="px-3 py-2.5">
                  <p className="font-medium text-foreground">{c.name}</p>
                  <AdminBadge variant={c.customerType === "business" ? "business" : "home"}>
                    {c.customerType === "business" ? "business" : "home"}
                  </AdminBadge>
                </td>
                <td className="px-3 py-2.5">
                  <p className="font-medium">{c.planName}</p>
                  <p className="text-[11px] text-telecom">{c.speed}</p>
                </td>
                <td className="px-3 py-2.5 tabular-nums text-muted">
                  ₹{c.publicCatalogPrice.toLocaleString("en-IN")}
                </td>
                <td className="px-3 py-2.5">
                  <p className="font-semibold tabular-nums text-foreground">
                    ₹{c.billingAmount.toLocaleString("en-IN")}
                  </p>
                  {hasOverride && (
                    <span className="mt-0.5 inline-block">
                      <AdminBadge variant="negotiated">override</AdminBadge>
                    </span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-muted">{c.expiryDate}</td>
                <td className="px-3 py-2.5">
                  <AdminBadge
                    variant={
                      c.status === "active"
                        ? "active"
                        : c.status === "suspended"
                          ? "disabled"
                          : "planned"
                    }
                  >
                    {c.status}
                  </AdminBadge>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap justify-end gap-1">
                    <AdminButton variant="outline" onClick={() => onEdit(c)}>
                      Edit
                    </AdminButton>
                    {c.status === "active" ? (
                      <AdminButton variant="ghost" onClick={() => onSuspend(c)}>
                        Suspend
                      </AdminButton>
                    ) : c.status === "suspended" ? (
                      <AdminButton variant="secondary" onClick={() => onReactivate(c)}>
                        Reactivate
                      </AdminButton>
                    ) : null}
                    <AdminButton variant="danger" onClick={() => onDelete(c)}>
                      Delete
                    </AdminButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
