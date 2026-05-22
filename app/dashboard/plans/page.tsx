import Link from "next/link";
import { portalPlans, activePlan } from "@/lib/dashboard-data";
import { PageShell } from "@/components/dashboard/PageShell";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/Button";

export default function PlansPage() {
  return (
    <PageShell
      title="Plans"
      description={`Your current plan is ${activePlan.name} (${activePlan.speed}).`}
    >
      <div className="space-y-4">
        {portalPlans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-lg border bg-white p-5 ${
              plan.current ? "border-telecom" : "border-border"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {plan.current && (
                  <span className="mb-2 inline-block rounded bg-telecom px-2 py-0.5 text-[11px] font-medium text-white">
                    Current plan
                  </span>
                )}
                <h2 className="text-[15px] font-semibold text-foreground">{plan.name}</h2>
                <p className="text-sm font-medium text-telecom">{plan.speed}</p>
                <p className="mt-1 text-[13px] text-muted">
                  ₹{plan.price.toLocaleString("en-IN")} per month
                </p>
              </div>
              {plan.current ? (
                <Link
                  href="/dashboard/payments/renew"
                  className="text-[13px] font-medium text-telecom hover:text-telecom-dark"
                >
                  Renew plan →
                </Link>
              ) : (
                <Button href="/dashboard/support" variant="outline">
                  Request upgrade
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <DashboardCard title="Plan details" className="mt-5">
        <dl className="grid gap-3 text-[13px] sm:grid-cols-2">
          <div>
            <dt className="text-muted">Start date</dt>
            <dd className="font-medium text-foreground">{activePlan.startDate}</dd>
          </div>
          <div>
            <dt className="text-muted">Expiry date</dt>
            <dd className="font-medium text-foreground">{activePlan.expiryDate}</dd>
          </div>
          <div>
            <dt className="text-muted">Auto-renewal</dt>
            <dd className="font-medium text-foreground">
              {activePlan.autoRenew ? "Enabled" : "Disabled"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Days remaining</dt>
            <dd className="font-medium text-accent">{activePlan.daysRemaining} days</dd>
          </div>
        </dl>
      </DashboardCard>
    </PageShell>
  );
}
