"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavIcon } from "@/components/dashboard/DashboardIcons";

type NavLinkProps = {
  href: string;
  label: string;
  icon: "home" | "plans" | "usage" | "billing" | "settings" | "support";
  exact?: boolean;
};

export function NavLink({ href, label, icon, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
        isActive
          ? "bg-telecom-light text-telecom"
          : "text-muted hover:bg-surface hover:text-telecom"
      }`}
    >
      <DashboardNavIcon type={icon} className="h-5 w-5 shrink-0" />
      {label}
    </Link>
  );
}
