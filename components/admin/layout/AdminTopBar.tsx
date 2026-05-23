"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/data";
import { adminNavItems, getAdminNavItem } from "@/lib/admin/navigation";
import { AdminNavLink } from "@/components/admin/layout/AdminNavLink";
import { AdminIconMenu } from "@/components/admin/icons/AdminIcons";

export function AdminTopBar() {
  const pathname = usePathname();
  const active = getAdminNavItem(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const breadcrumbs = [
    { label: "Admin", href: "/admin" },
    ...(active && active.href !== "/admin"
      ? [{ label: active.label, href: active.href }]
      : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-white px-4 sm:px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md p-1.5 text-muted hover:bg-surface lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <AdminIconMenu />
          </button>
          <nav className="flex items-center gap-1.5 text-[12px]">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-muted/50">/</span>}
                <Link
                  href={crumb.href}
                  className={
                    i === breadcrumbs.length - 1
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted sm:inline">
            H8 API · Not connected
          </span>
          <div className="text-right">
            <p className="text-[12px] font-medium text-foreground">Ops Admin</p>
            <p className="text-[10px] text-muted">{brand.legal}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-telecom text-[11px] font-semibold text-white">
            OA
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-[#0a1f33] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">{brand.name}</p>
                <p className="text-[10px] text-slate-400">Operations</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
              {adminNavItems.map((item) => (
                <AdminNavLink
                  key={item.id}
                  item={item}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
