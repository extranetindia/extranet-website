"use client";

import Link from "next/link";
import { brand } from "@/lib/data";
import { adminNavItems } from "@/lib/admin/navigation";
import { AdminNavLink } from "@/components/admin/layout/AdminNavLink";

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-white/10 bg-[#0a1f33] lg:flex">
      <div className="border-b border-white/10 px-4 py-3.5">
        <Link href="/admin" className="block">
          <p className="text-[15px] font-semibold tracking-tight text-white">
            {brand.name}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Operations Console
          </p>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Modules
        </p>
        {adminNavItems.map((item) => (
          <AdminNavLink key={item.id} item={item} />
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-md bg-white/5 px-2.5 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Environment
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-emerald-400">Mock · Local</p>
        </div>
        <Link
          href="/"
          className="mt-2 block px-2.5 text-[12px] font-medium text-slate-400 hover:text-white"
        >
          ← Public website
        </Link>
        <Link
          href="/dashboard"
          className="mt-1 block px-2.5 text-[12px] font-medium text-slate-400 hover:text-white"
        >
          Customer portal
        </Link>
      </div>
    </aside>
  );
}
