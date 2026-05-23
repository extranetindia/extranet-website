"use client";

import { connection } from "@/lib/dashboard-data";
import { connectionDisplayStatus } from "@/lib/portal/portal-access";
import { usePayment } from "@/lib/payment-context";

function formatBillingCycle(cycle: string): string {
  return cycle === "monthly" ? "month" : "quarter";
}

export function StatusCards() {
  const { subscription } = usePayment();
  const conn = connectionDisplayStatus(subscription);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Connection
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              conn.online ? "bg-emerald-500" : "bg-accent"
            }`}
          />
          <p className="text-sm font-semibold text-foreground">{conn.label}</p>
        </div>
        <p className="mt-2 text-[12px] text-muted">
          {conn.online ? `Uptime ${connection.uptime}` : "Service restricted"}
        </p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Your billing rate
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {subscription.planName}
        </p>
        <p className="text-[13px] font-medium text-telecom">{subscription.speed}</p>
        <p className="mt-2 text-[12px] text-muted">
          ₹{subscription.billingAmount.toLocaleString("en-IN")} /{" "}
          {formatBillingCycle(subscription.billingCycle)}
        </p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Expiry date
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {subscription.expiryDate}
        </p>
        <p className="mt-1 text-[13px] font-medium text-accent">
          {subscription.daysRemaining} days left
        </p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Account status
        </p>
        <p className="mt-2 text-sm font-semibold capitalize text-foreground">
          {subscription.status}
        </p>
        <p className="text-[12px] text-muted">
          {conn.online
            ? `${connection.downloadMbps} Mbps down`
            : "Renewal disabled"}
        </p>
      </article>
    </div>
  );
}
