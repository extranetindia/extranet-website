"use client";

import { connection } from "@/lib/dashboard-data";
import { usePayment } from "@/lib/payment-context";

function formatBillingCycle(cycle: string): string {
  return cycle === "monthly" ? "month" : "quarter";
}

export function StatusCards() {
  const { subscription } = usePayment();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Connection
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-sm font-semibold text-foreground">{connection.status}</p>
        </div>
        <p className="mt-2 text-[12px] text-muted">Uptime {connection.uptime}</p>
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
          Current speed
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {connection.downloadMbps} Mbps
        </p>
        <p className="text-[12px] text-muted">
          ↓ Down · ↑ {connection.uploadMbps} Mbps
        </p>
      </article>
    </div>
  );
}
