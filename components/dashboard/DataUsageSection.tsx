import Link from "next/link";
import { monthlyUsage } from "@/lib/dashboard-data";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const maxDaily = Math.max(...monthlyUsage.daily.map((d) => d.gb));

export function DataUsageSection() {
  return (
    <DashboardCard
      title="Monthly data usage"
      action={
        <Link
          href="/dashboard/usage"
          className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
        >
          Details →
        </Link>
      }
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-xl font-semibold text-foreground">
          {monthlyUsage.usedGb}{" "}
          <span className="text-sm font-normal text-muted">GB used</span>
        </p>
        <p className="text-[12px] text-muted">Resets {monthlyUsage.resetDate}</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-telecom"
          style={{ width: `${monthlyUsage.percentUsed}%` }}
        />
      </div>
      <p className="mt-1 text-[12px] text-muted">
        {monthlyUsage.percentUsed}% of {monthlyUsage.fairUsageGb} GB fair usage
      </p>

      <div className="mt-5 flex h-20 items-end justify-between gap-1.5">
        {monthlyUsage.daily.map((day) => (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full max-w-8 rounded-sm bg-telecom/75"
              style={{ height: `${(day.gb / maxDaily) * 100}%`, minHeight: "4px" }}
            />
            <span className="text-[10px] text-muted">{day.day}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
