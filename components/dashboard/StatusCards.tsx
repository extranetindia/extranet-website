import { activePlan, connection } from "@/lib/dashboard-data";

export function StatusCards() {
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
        <p className="text-[11px] text-muted">Checked {connection.lastChecked}</p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Active plan
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">{activePlan.name}</p>
        <p className="text-[13px] font-medium text-telecom">{activePlan.speed}</p>
        <p className="mt-2 text-[12px] text-muted">₹{activePlan.price}/{activePlan.billingCycle.toLowerCase()}</p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Expiry date
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">{activePlan.expiryDate}</p>
        <p className="mt-1 text-[13px] font-medium text-accent">
          {activePlan.daysRemaining} days left
        </p>
        <p className="mt-2 text-[12px] text-muted">
          Auto-renew {activePlan.autoRenew ? "on" : "off"}
        </p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Current speed
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {connection.downloadMbps} Mbps
        </p>
        <p className="text-[12px] text-muted">↓ Download · ↑ {connection.uploadMbps} Mbps</p>
        <p className="mt-2 text-[12px] text-muted">Latency {connection.latencyMs} ms</p>
      </article>
    </div>
  );
}
