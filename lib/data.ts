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

/** @deprecated Use homePlans from @/lib/plans-data */
export { homePlans as plans } from "@/lib/plans-data";

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
    { label: "Business plans", href: "#plans" },
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
