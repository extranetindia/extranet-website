export const customer = {
  name: "Rahul Sharma",
  accountId: "EXT-2847193",
  phone: "+91 98765 43210",
  email: "rahul.sharma@email.com",
  address: "Flat 402, Green Valley Apartments, Sector 62, Noida, UP 201301",
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

export const wifi = {
  ssid: "Extranet_Home_2847",
  band: "5 GHz",
  devicesConnected: 8,
} as const;

export const dashboardNav = [
  { id: "overview", label: "Overview", href: "/dashboard#overview", icon: "home" },
  { id: "usage", label: "Usage", href: "/dashboard#usage", icon: "usage" },
  { id: "billing", label: "Billing", href: "/dashboard#billing", icon: "billing" },
  { id: "wifi", label: "WiFi & support", href: "/dashboard#wifi", icon: "wifi" },
] as const;
