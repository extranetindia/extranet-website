export const customer = {
  name: "Rahul Sharma",
  accountId: "EXT-2847193",
  phone: "+91 98765 43210",
  phoneRaw: "9876543210",
  email: "rahul.sharma@email.com",
  address: "Flat 402, Green Valley Apartments, Sector 62, Noida, UP 201301",
  memberSince: "Mar 2023",
} as const;

export const connection = {
  status: "Online" as const,
  uptime: "99.8%",
  downloadMbps: 287,
  uploadMbps: 142,
  latencyMs: 4,
  lastChecked: "2 min ago",
} as const;

export const activePlan = {
  name: "Home Plus",
  speed: "300 Mbps",
  price: 799,
  billingCycle: "Monthly",
  startDate: "28 Apr 2025",
  expiryDate: "28 May 2026",
  daysRemaining: 6,
  autoRenew: true,
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

export const payments = [
  {
    id: "INV-2026-0512",
    date: "28 Apr 2026",
    amount: 799,
    status: "Paid" as const,
    method: "UPI",
  },
  {
    id: "INV-2026-0412",
    date: "28 Mar 2026",
    amount: 799,
    status: "Paid" as const,
    method: "Auto-debit",
  },
  {
    id: "INV-2026-0312",
    date: "28 Feb 2026",
    amount: 799,
    status: "Paid" as const,
    method: "Credit card",
  },
  {
    id: "INV-2026-0212",
    date: "28 Jan 2026",
    amount: 799,
    status: "Paid" as const,
    method: "UPI",
  },
  {
    id: "INV-2026-0112",
    date: "28 Dec 2025",
    amount: 799,
    status: "Paid" as const,
    method: "Net banking",
  },
] as const;

export const notifications = [
  {
    id: "1",
    title: "Bill due in 6 days",
    message: "Your Home Plus plan renews on 28 May 2026. Pay early to avoid interruption.",
    time: "2 hours ago",
    type: "billing" as const,
    unread: true,
  },
  {
    id: "2",
    title: "Speed test completed",
    message: "Download 287 Mbps · Upload 142 Mbps. Connection is healthy.",
    time: "Yesterday",
    type: "info" as const,
    unread: true,
  },
  {
    id: "3",
    title: "Auto-renewal enabled",
    message: "₹799 will be debited via UPI on your renewal date.",
    time: "3 days ago",
    type: "info" as const,
    unread: false,
  },
  {
    id: "4",
    title: "Maintenance completed",
    message: "Scheduled work in Sector 62 finished. No action required.",
    time: "1 week ago",
    type: "success" as const,
    unread: false,
  },
] as const;

export const wifi = {
  ssid: "Extranet_Home_2847",
  band: "5 GHz",
  devicesConnected: 8,
  routerModel: "Extranet WiFi 6 Router",
  lastRestart: "12 Apr 2026",
} as const;

export const portalPlans = [
  {
    name: "Home Basic",
    speed: "100 Mbps",
    price: 499,
    current: false,
  },
  {
    name: "Home Plus",
    speed: "300 Mbps",
    price: 799,
    current: true,
  },
  {
    name: "Home Max",
    speed: "1 Gbps",
    price: 1299,
    current: false,
  },
] as const;

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
    description: "Extend your current plan before expiry.",
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
