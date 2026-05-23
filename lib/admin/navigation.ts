export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  icon: AdminNavIcon;
  description?: string;
};

export type AdminNavIcon =
  | "dashboard"
  | "plans"
  | "customers"
  | "content"
  | "settings";

export const adminNavItems: AdminNavItem[] = [
  {
    id: "dashboard",
    label: "Operations",
    href: "/admin",
    icon: "dashboard",
    description: "Overview & system health",
  },
  {
    id: "plans",
    label: "Plan catalog",
    href: "/admin/plans",
    icon: "plans",
    description: "Public pricing & packages",
  },
  {
    id: "customers",
    label: "Customers",
    href: "/admin/customers",
    icon: "customers",
    description: "Accounts & billing overrides",
  },
  {
    id: "content",
    label: "Content",
    href: "/admin/content",
    icon: "content",
    description: "Website CMS modules",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/admin/settings",
    icon: "settings",
    description: "Platform configuration",
  },
];

export function getAdminNavItem(pathname: string): AdminNavItem | undefined {
  if (pathname === "/admin") return adminNavItems[0];
  return adminNavItems.find(
    (item) => item.href !== "/admin" && pathname.startsWith(item.href)
  );
}
