"use client";

import Link from "next/link";
import { useAdmin } from "@/lib/admin/context/admin-provider";
import { cmsModuleRegistry } from "@/lib/admin/cms/content-registry";
import { adminNavItems } from "@/lib/admin/navigation";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminStat } from "@/components/admin/ui/AdminStat";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminNavIcon } from "@/components/admin/icons/AdminIcons";

export function AdminDashboard() {
  const { plans, pricingOverrides } = useAdmin();
  const activePlans = plans.filter((p) => p.status === "active").length;

  return (
    <>
      <AdminPageHeader
        title="Operations overview"
        description="Extranet ISP control center — catalog, customer pricing, and content modules."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat label="Catalog plans" value={plans.length} hint={`${activePlans} active`} />
        <AdminStat
          label="Pricing overrides"
          value={pricingOverrides.length}
          hint="Negotiated / legacy billing"
        />
        <AdminStat
          label="CMS modules"
          value={cmsModuleRegistry.length}
          hint="Architecture ready"
        />
        <AdminStat label="H8 integration" value="Pending" hint="Mock data layer" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Quick access
          </p>
          <ul className="mt-3 divide-y divide-border">
            {adminNavItems.slice(1).map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 text-[13px] hover:text-telecom"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-surface text-telecom">
                    <AdminNavIcon name={item.icon} />
                  </span>
                  <span>
                    <span className="font-medium text-foreground">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-[11px] text-muted">
                        {item.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Architecture note
          </p>
          <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">Plan catalog</strong> — public
              starting prices for marketing and new acquisitions.
            </li>
            <li>
              <strong className="text-foreground">Pricing overrides</strong> — per-customer
              billing amounts; never mixed with catalog list prices.
            </li>
            <li>
              <strong className="text-foreground">CMS registry</strong> — hero, banners,
              homepage, and offers prepared for phased rollout.
            </li>
          </ul>
        </AdminCard>
      </div>

      <AdminCard className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Recent pricing overrides
          </p>
          <Link href="/admin/customers" className="text-[12px] font-medium text-telecom">
            View all →
          </Link>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted">
                <th className="py-2 font-semibold">Customer</th>
                <th className="py-2 font-semibold">Plan</th>
                <th className="py-2 font-semibold">Public</th>
                <th className="py-2 font-semibold">Override</th>
                <th className="py-2 font-semibold">Reason</th>
              </tr>
            </thead>
            <tbody>
              {pricingOverrides.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="py-2 font-medium">{o.customerName}</td>
                  <td className="py-2">{o.planName}</td>
                  <td className="py-2 tabular-nums text-muted">
                    ₹{o.publicStartingPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2 font-semibold tabular-nums text-telecom">
                    ₹{o.overrideAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </>
  );
}
