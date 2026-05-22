import { monthlyUsage } from "@/lib/dashboard-data";
import { PageShell } from "@/components/dashboard/PageShell";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const maxDaily = Math.max(...monthlyUsage.daily.map((d) => d.gb));
const maxWeekly = Math.max(...monthlyUsage.weekly.map((w) => w.gb));

export default function UsagePage() {
  return (
    <PageShell
      title="Usage"
      description={`Data resets on ${monthlyUsage.resetDate}. Fair usage limit: ${monthlyUsage.fairUsageGb} GB.`}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-lg border border-border bg-white p-4 lg:col-span-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            This month
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {monthlyUsage.usedGb} GB
          </p>
          <p className="text-[13px] text-muted">{monthlyUsage.percentUsed}% of fair usage</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-telecom"
              style={{ width: `${monthlyUsage.percentUsed}%` }}
            />
          </div>
        </article>

        <article className="rounded-lg border border-border bg-white p-4 lg:col-span-2">
          <p className="text-[13px] font-medium text-foreground">Usage summary</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-3 text-[13px]">
            <div>
              <dt className="text-muted">Average / day</dt>
              <dd className="font-medium text-foreground">~59 GB</dd>
            </div>
            <div>
              <dt className="text-muted">Peak day</dt>
              <dd className="font-medium text-foreground">Sat · 72 GB</dd>
            </div>
            <div>
              <dt className="text-muted">Remaining</dt>
              <dd className="font-medium text-foreground">
                {monthlyUsage.fairUsageGb - monthlyUsage.usedGb} GB
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <DashboardCard title="Daily usage (last 7 days)" className="mt-5">
        <div className="flex h-32 items-end justify-between gap-2">
          {monthlyUsage.daily.map((day) => (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-muted">{day.gb}G</span>
              <div
                className="w-full max-w-10 rounded-sm bg-telecom/80"
                style={{ height: `${(day.gb / maxDaily) * 100}%`, minHeight: "8px" }}
              />
              <span className="text-[10px] text-muted">{day.day}</span>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Weekly usage (this month)" className="mt-5">
        <div className="flex h-28 items-end justify-between gap-3">
          {monthlyUsage.weekly.map((week) => (
            <div key={week.week} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-muted">{week.gb} GB</span>
              <div
                className="w-full rounded-sm bg-telecom/60"
                style={{ height: `${(week.gb / maxWeekly) * 100}%`, minHeight: "8px" }}
              />
              <span className="text-[10px] text-muted">{week.week}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </PageShell>
  );
}
