"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/lib/dashboard-data";
import { DashboardNavIcon } from "@/components/dashboard/DashboardIcons";

export function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white lg:hidden">
      <ul className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {dashboardNav.map((item) => {
          const isActive = pathname === "/dashboard" && item.id === "overview";
          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-2.5 text-[10px] font-medium transition-colors ${
                  isActive && item.id === "overview"
                    ? "text-telecom"
                    : "text-muted"
                }`}
              >
                <DashboardNavIcon type={item.icon} className="h-5 w-5" />
                <span className="truncate">{item.label.split(" ")[0]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
