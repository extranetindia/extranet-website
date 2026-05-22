"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNav } from "@/lib/dashboard-data";
import { DashboardNavIcon } from "@/components/dashboard/DashboardIcons";

export function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white lg:hidden">
      <ul className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {mobileNav.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium ${
                  isActive ? "text-telecom" : "text-muted"
                }`}
              >
                <DashboardNavIcon type={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
