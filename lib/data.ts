export const brand = {
  name: "Extranet",
  tagline: "Fiber Broadband",
  legal: "Extranet Telecom Pvt. Ltd.",
  portal: "my.extranet.in",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Plans", href: "#plans" },
  { label: "Support", href: "#support" },
] as const;

export const plans = [
  {
    name: "Home Basic",
    speed: "100 Mbps",
    price: "499",
    period: "/month",
    description: "Browsing, HD streaming, and video calls for everyday use.",
    features: [
      "Unlimited fair usage",
      "Dual-band WiFi router",
      "Standard installation",
      "Email & chat support",
    ],
    popular: false,
  },
  {
    name: "Home Plus",
    speed: "300 Mbps",
    price: "799",
    period: "/month",
    description: "For families, work-from-home, and multiple 4K streams.",
    features: [
      "Unlimited fair usage",
      "WiFi 6 router included",
      "Priority fault resolution",
      "Usage & billing portal",
      "Auto-pay discount",
    ],
    popular: true,
  },
  {
    name: "Home Max",
    speed: "1 Gbps",
    price: "1,299",
    period: "/month",
    description: "Gigabit fiber for gaming, large households, and smart homes.",
    features: [
      "Unlimited fair usage",
      "Mesh WiFi (2 nodes)",
      "Dedicated support line",
      "Static IP on request",
      "Premium SLA",
    ],
    popular: false,
  },
] as const;

export const features = [
  {
    title: "Consistent speeds",
    description:
      "Fiber backhaul with local caching for stable throughput during peak hours.",
    icon: "speed",
  },
  {
    title: "Auto-renewal",
    description:
      "Set up UPI or card auto-pay with reminders before each billing cycle.",
    icon: "renewal",
  },
  {
    title: "Usage tracking",
    description:
      "View daily consumption, trends, and estimated bills in your account.",
    icon: "usage",
  },
  {
    title: "WiFi management",
    description:
      "Manage SSID, guest network, and connected devices from the portal.",
    icon: "wifi",
  },
] as const;

export const footerLinks = {
  company: [
    { label: "About Extranet", href: "#" },
    { label: "Coverage map", href: "#" },
    { label: "Business plans", href: "#" },
  ],
  support: [
    { label: "Help centre", href: "#support" },
    { label: "Track ticket", href: "#" },
    { label: "Contact us", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Fair usage policy", href: "#" },
  ],
} as const;
