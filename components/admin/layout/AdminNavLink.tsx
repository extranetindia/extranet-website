"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminNavIcon } from "@/components/admin/icons/AdminIcons";
import type { AdminNavItem } from "@/lib/admin/navigation";

type AdminNavLinkProps = {
  item: AdminNavItem;
  onNavigate?: () => void;
};

export function AdminNavLink({ item, onNavigate }: AdminNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
        isActive
          ? "bg-white/12 text-white"
          : "text-slate-300 hover:bg-white/6 hover:text-white"
      }`}
    >
      <AdminNavIcon name={item.icon} className="h-4 w-4 shrink-0 opacity-90" />
      <span>{item.label}</span>
    </Link>
  );
}
