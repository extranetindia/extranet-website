import { monthlyUsage } from "@/lib/dashboard-data";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const maxDaily = Math.max(...monthlyUsage.daily.map((d) => d.gb));

export function DataUsageSection() {
  return (
    <DashboardCard
      title="Monthly data usage"
      className="scroll-mt-20"
      action={
        <span className="text-[12px] text-muted">
          Resets {monthlyUsage.resetDate}
        </span>
      }
    >
      <div id="usage" className="-mt-4 scroll-mt-20 sm:-mt-5" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {monthlyUsage.usedGb}{" "}
            <span className="text-base font-normal text-muted">GB used</span>
          </p>
          <p className="mt-1 text-[13px] text-muted">
            {monthlyUsage.percentUsed}% of fair usage ({monthlyUsage.fairUsageGb}{" "}
            GB)
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-telecom transition-all"
          style={{ width: `${monthlyUsage.percentUsed}%` }}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[12px] font-medium text-muted">
          Last 7 days (GB)
        </p>
        <div className="flex h-24 items-end justify-between gap-1.5 sm:gap-2">
          {monthlyUsage.daily.map((day) => (
            <div
              key={day.day}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="w-full max-w-8 rounded-sm bg-telecom/80"
                style={{ height: `${(day.gb / maxDaily) * 100}%`, minHeight: "4px" }}
                title={`${day.gb} GB`}
              />
              <span className="text-[10px] text-muted">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
