import Link from "next/link";
import { quickActions } from "@/lib/dashboard-data";
import { ActionIcon } from "@/components/dashboard/DashboardIcons";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export function QuickActions() {
  return (
    <DashboardCard title="Quick actions">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="flex gap-3 rounded-lg border border-border bg-surface p-3.5 transition-colors hover:border-telecom/30 hover:bg-telecom-light/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-telecom">
              <ActionIcon type={action.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground">{action.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
