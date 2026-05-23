"use client";

import Link from "next/link";
import { cmsModuleRegistry } from "@/lib/admin/cms/content-registry";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminButton } from "@/components/admin/ui/AdminButton";

export function CmsOverview() {
  return (
    <>
      <AdminPageHeader
        title="Content management"
        description="Modular CMS for the public website. Hero section is live; additional modules are queued for rollout."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {cmsModuleRegistry.map((module) => (
          <AdminCard key={module.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold text-foreground">{module.label}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  {module.description}
                </p>
              </div>
              <AdminBadge variant={module.status === "ready" ? "active" : "planned"}>
                {module.status}
              </AdminBadge>
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted">{module.route}</p>
            {module.status === "ready" ? (
              <AdminButton
                href={module.route}
                variant="primary"
                className="mt-3"
              >
                Open editor
              </AdminButton>
            ) : (
              <p className="mt-3 text-[11px] text-muted">Coming soon</p>
            )}
          </AdminCard>
        ))}
      </div>

      <AdminCard className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          Sync architecture
        </p>
        <ul className="mt-2 space-y-1.5 text-[12px] text-muted">
          <li>
            · Hero & plan catalog persist to <code className="text-[11px]">localStorage</code>
          </li>
          <li>
            · Public site uses <code className="text-[11px]">MarketingProvider</code> with live refresh events
          </li>
          <li>
            · Plan catalog managed in{" "}
            <Link href="/admin/plans" className="font-medium text-telecom hover:underline">
              Plan catalog
            </Link>
          </li>
        </ul>
      </AdminCard>
    </>
  );
}
