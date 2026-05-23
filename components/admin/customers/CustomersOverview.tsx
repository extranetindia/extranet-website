"use client";

import Link from "next/link";
import { useAdmin } from "@/lib/admin/context/admin-provider";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminButton } from "@/components/admin/ui/AdminButton";

export function CustomersOverview() {
  const { pricingOverrides } = useAdmin();

  return (
    <>
      <AdminPageHeader
        title="Customers"
        description="Customer accounts and negotiated billing overrides. Public catalog prices never apply automatically to existing subscribers."
        actions={
          <AdminButton variant="outline" disabled>
            + Add override (soon)
          </AdminButton>
        }
      />

      <AdminCard className="mb-4 border-telecom/20 bg-telecom-light/30">
        <p className="text-[12px] leading-relaxed text-foreground">
          <strong>Pricing model:</strong> Each customer subscription stores an assigned{" "}
          <code className="rounded bg-white/80 px-1 text-[11px]">billingAmount</code>{" "}
          sourced from overrides or standard catalog at signup. H8 API will replace mock
          stores in <code className="rounded bg-white/80 px-1 text-[11px]">pricing-override-service</code>{" "}
          and <code className="rounded bg-white/80 px-1 text-[11px]">subscription-service</code>.
        </p>
      </AdminCard>

      <AdminCard padding="none">
        <div className="border-b border-border px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Active pricing overrides
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-border bg-surface text-[10px] font-semibold uppercase tracking-wide text-muted">
                <th className="px-4 py-2.5">Account</th>
                <th className="px-4 py-2.5">Customer</th>
                <th className="px-4 py-2.5">Plan</th>
                <th className="px-4 py-2.5">Public list</th>
                <th className="px-4 py-2.5">Billing override</th>
                <th className="px-4 py-2.5">Reason</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {pricingOverrides.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[11px]">{o.accountId}</td>
                  <td className="px-4 py-2.5 font-medium">{o.customerName}</td>
                  <td className="px-4 py-2.5">{o.planName}</td>
                  <td className="px-4 py-2.5 tabular-nums text-muted">
                    ₹{o.publicStartingPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums text-telecom">
                    ₹{o.overrideAmount.toLocaleString("en-IN")}/mo
                  </td>
                  <td className="px-4 py-2.5">
                    <AdminBadge
                      variant={
                        o.reason === "legacy"
                          ? "legacy"
                          : o.reason === "corporate"
                            ? "corporate"
                            : "negotiated"
                      }
                    >
                      {o.reason}
                    </AdminBadge>
                  </td>
                  <td className="px-4 py-2.5">
                    <AdminBadge variant={o.status === "active" ? "active" : "disabled"}>
                      {o.status}
                    </AdminBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <p className="mt-4 text-[12px] text-muted">
        Full CRM (search, edit subscription, bulk import) planned for next phase.{" "}
        <Link href="/admin/plans" className="font-medium text-telecom hover:underline">
          Manage public catalog →
        </Link>
      </p>
    </>
  );
}
