import Link from "next/link";
import { brand } from "@/lib/data";
import { dashboardNav } from "@/lib/dashboard-data";
import { Logo } from "@/components/Logo";
import { DashboardNavIcon } from "@/components/dashboard/DashboardIcons";

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo href="/" />
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {dashboardNav.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-surface hover:text-telecom"
          >
            <DashboardNavIcon type={item.icon} className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-[11px] text-muted">{brand.portal}</p>
        <Link
          href="/"
          className="mt-2 block text-[13px] font-medium text-telecom hover:text-telecom-dark"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
