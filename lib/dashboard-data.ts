/**
 * Static portal UI data (connection metrics, usage, nav).
 * Customer identity & billing amounts come from subscription/billing services.
 */

export const connection = {
  status: "Online" as const,
  uptime: "99.8%",
  downloadMbps: 98,
  uploadMbps: 142,
  latencyMs: 4,
  lastChecked: "2 min ago",
} as const;

export const monthlyUsage = {
  usedGb: 412,
  fairUsageGb: 3300,
  percentUsed: 12.5,
  resetDate: "1 Jun 2026",
  daily: [
    { day: "Mon", gb: 58 },
    { day: "Tue", gb: 52 },
    { day: "Wed", gb: 61 },
    { day: "Thu", gb: 55 },
    { day: "Fri", gb: 64 },
    { day: "Sat", gb: 72 },
    { day: "Sun", gb: 50 },
  ],
  weekly: [
    { week: "Week 1", gb: 98 },
    { week: "Week 2", gb: 105 },
    { week: "Week 3", gb: 112 },
    { week: "Week 4", gb: 97 },
  ],
} as const;

export const wifi = {
  ssid: "Extranet_Home_2847",
  band: "5 GHz",
  devicesConnected: 8,
  routerModel: "Extranet WiFi 6 Router",
  lastRestart: "12 Apr 2026",
} as const;

export const supportTickets = [
  {
    id: "TKT-8821",
    subject: "Intermittent WiFi drop",
    status: "Resolved" as const,
    date: "10 Apr 2026",
  },
] as const;

export const portalNav = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "home" },
  { id: "plans", label: "Plans", href: "/dashboard/plans", icon: "plans" },
  { id: "usage", label: "Usage", href: "/dashboard/usage", icon: "usage" },
  { id: "payments", label: "Payments", href: "/dashboard/payments", icon: "billing" },
  { id: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings" },
  { id: "support", label: "Support", href: "/dashboard/support", icon: "support" },
] as const;

export const mobileNav = [
  { id: "dashboard", label: "Home", href: "/dashboard", icon: "home" },
  { id: "usage", label: "Usage", href: "/dashboard/usage", icon: "usage" },
  { id: "payments", label: "Pay", href: "/dashboard/payments", icon: "billing" },
  { id: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings" },
  { id: "support", label: "Support", href: "/dashboard/support", icon: "support" },
] as const;

export const quickActions = [
  {
    id: "renew",
    title: "Renew plan",
    description: "Pay your account-specific renewal amount.",
    href: "/dashboard/payments/renew",
    icon: "renew",
  },
  {
    id: "wifi-password",
    title: "Change WiFi password",
    description: "Update your home network credentials.",
    href: "/dashboard/settings#wifi-password",
    icon: "lock",
  },
  {
    id: "wifi-name",
    title: "Change WiFi name",
    description: "Rename your SSID and guest network.",
    href: "/dashboard/settings#wifi-name",
    icon: "wifi",
  },
  {
    id: "restart",
    title: "Restart router",
    description: "Reboot your ONT/router remotely.",
    href: "/dashboard/settings#router",
    icon: "restart",
  },
  {
    id: "support",
    title: "Contact support",
    description: "24×7 helpline and ticket raising.",
    href: "/dashboard/support",
    icon: "support",
  },
] as const;
