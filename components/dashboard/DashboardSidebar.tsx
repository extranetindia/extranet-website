import Link from "next/link";
import { brand } from "@/lib/data";
import { portalNav } from "@/lib/dashboard-data";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/dashboard/NavLink";

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo href="/" />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {portalNav.map((item) => (
          <NavLink
            key={item.id}
            href={item.href}
            label={item.label}
            icon={item.icon}
            exact={item.id === "dashboard"}
          />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-[11px] text-muted">{brand.portal}</p>
        <Link
          href="/login"
          className="mt-2 block text-[13px] font-medium text-muted hover:text-foreground"
        >
          Sign out
        </Link>
        <Link
          href="/"
          className="mt-1 block text-[13px] font-medium text-telecom hover:text-telecom-dark"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
