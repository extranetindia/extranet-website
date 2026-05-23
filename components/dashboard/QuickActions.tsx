"use client";

import Link from "next/link";
import { quickActions } from "@/lib/dashboard-data";
import { ActionIcon } from "@/components/dashboard/DashboardIcons";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { usePayment } from "@/lib/payment-context";

export function QuickActions() {
  const { canRenew, canManageConnection } = usePayment();

  return (
    <DashboardCard title="Quick actions">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const disabled =
            (action.id === "renew" && !canRenew) ||
            (action.id === "restart" && !canManageConnection);

          if (disabled) {
            return (
              <div
                key={action.id}
                className="flex cursor-not-allowed gap-3 rounded-lg border border-border bg-surface/60 p-3.5 opacity-60"
                aria-disabled
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-muted">
                  <ActionIcon type={action.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-muted">{action.title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                    Unavailable while account is {canRenew ? "restricted" : "suspended"}
                  </p>
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
      </div>
    </DashboardCard>
  );
}
