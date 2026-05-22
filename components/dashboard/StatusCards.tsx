import { activePlan, connection } from "@/lib/dashboard-data";

export function StatusCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Internet status
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-base font-semibold text-foreground">
            {connection.status}
          </p>
        </div>
        <dl className="mt-3 space-y-1.5 text-[12px]">
          <div className="flex justify-between">
            <dt className="text-muted">Download</dt>
            <dd className="font-medium text-foreground">
              {connection.downloadMbps} Mbps
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Upload</dt>
            <dd className="font-medium text-foreground">
              {connection.uploadMbps} Mbps
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Latency</dt>
            <dd className="font-medium text-foreground">
              {connection.latencyMs} ms
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-[11px] text-muted">
          Updated {connection.lastChecked}
        </p>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Active plan
        </p>
        <p className="mt-2 text-base font-semibold text-foreground">
          {activePlan.name}
        </p>
        <p className="text-sm font-medium text-telecom">{activePlan.speed}</p>
        <dl className="mt-3 space-y-1.5 text-[12px]">
          <div className="flex justify-between">
            <dt className="text-muted">Monthly fee</dt>
            <dd className="font-medium text-foreground">
              ₹{activePlan.price}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Billing</dt>
            <dd className="font-medium text-foreground">
              {activePlan.billingCycle}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Auto-renew</dt>
            <dd className="font-medium text-foreground">
              {activePlan.autoRenew ? "On" : "Off"}
            </dd>
          </div>
        </dl>
      </article>

      <article className="rounded-lg border border-border bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Plan expiry
        </p>
        <p className="mt-2 text-base font-semibold text-foreground">
          {activePlan.expiryDate}
        </p>
        <p className="mt-1 text-sm text-accent">
          {activePlan.daysRemaining} days remaining
        </p>
        <dl className="mt-3 space-y-1.5 text-[12px]">
          <div className="flex justify-between">
            <dt className="text-muted">Started</dt>
            <dd className="font-medium text-foreground">
              {activePlan.startDate}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Uptime SLA</dt>
            <dd className="font-medium text-foreground">
              {connection.uptime}
            </dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
