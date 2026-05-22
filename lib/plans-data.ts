export type PlanCategory = "home" | "business";

export type MarketingPlan = {
  id: string;
  category: PlanCategory;
  name: string;
  speed: string;
  speedMbps: number;
  price: string;
  priceValue: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  highlight?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const planCategoryMeta = {
  home: {
    id: "home" as const,
    tabLabel: "Home users",
    title: "Home broadband plans",
    description:
      "Affordable fiber for families, students, streaming, gaming, and work-from-home. Unlimited fair usage on all plans.",
    footnote: "GST extra · Free standard installation in covered areas",
  },
  business: {
    id: "business" as const,
    tabLabel: "Business users",
    title: "Business internet plans",
    description:
      "Dedicated connectivity for offices, startups, and enterprises with priority support, SLA-backed uptime, and static IP options.",
    footnote: "GST extra · Custom installation · Dedicated account manager on Enterprise",
  },
} as const;

export const homePlans: MarketingPlan[] = [
  {
    id: "home-starter",
    category: "home",
    name: "Home Starter",
    speed: "50 Mbps",
    speedMbps: 50,
    price: "399",
    priceValue: 399,
    period: "/month",
    description: "Ideal for light browsing, online classes, and HD streaming on 2–3 devices.",
    features: [
      "Unlimited fair usage",
      "Dual-band WiFi router",
      "Free standard installation",
      "24×7 chat support",
    ],
  },
  {
    id: "home-stream",
    category: "home",
    name: "Home Stream",
    speed: "100 Mbps",
    speedMbps: 100,
    price: "599",
    priceValue: 599,
    period: "/month",
    description: "Best for families, OTT streaming, gaming, and video calls on multiple devices.",
    features: [
      "Unlimited fair usage",
      "WiFi 6 router included",
      "Priority fault resolution",
      "Customer self-care portal",
      "5% auto-pay discount",
    ],
    popular: true,
    highlight: "Most popular",
  },
  {
    id: "home-max",
    category: "home",
    name: "Home Max",
    speed: "200 Mbps",
    speedMbps: 200,
    price: "899",
    priceValue: 899,
    period: "/month",
    description: "For 4K streaming, competitive gaming, smart homes, and heavy downloads.",
    features: [
      "Unlimited fair usage",
      "Mesh WiFi (2 nodes)",
      "Gaming-optimised routing",
      "Usage analytics dashboard",
      "Weekend speed boost",
    ],
  },
];

export const businessPlans: MarketingPlan[] = [
  {
    id: "startup-office",
    category: "business",
    name: "Startup Office",
    speed: "100 Mbps",
    speedMbps: 100,
    price: "2,499",
    priceValue: 2499,
    period: "/month",
    description: "Reliable connectivity for small teams, co-working spaces, and branch offices.",
    features: [
      "Symmetric upload priority",
      "1 static IP included",
      "Business hours support (8am–10pm)",
      "99.5% uptime SLA",
      "Secure VPN-ready network",
    ],
    highlight: "For small teams",
  },
  {
    id: "business-pro",
    category: "business",
    name: "Business Pro",
    speed: "300 Mbps",
    speedMbps: 300,
    price: "4,999",
    priceValue: 4999,
    period: "/month",
    description: "For growing offices with cloud apps, video conferencing, and multiple locations.",
    features: [
      "2 static IPs included",
      "Priority 4-hour fault SLA",
      "Dedicated business helpline",
      "99.7% uptime SLA",
      "Managed router & firewall",
      "Quarterly network review",
    ],
    popular: true,
    highlight: "Recommended",
  },
  {
    id: "enterprise-fiber",
    category: "business",
    name: "Enterprise Fiber",
    speed: "1 Gbps",
    speedMbps: 1000,
    price: "9,999",
    priceValue: 9999,
    period: "/month",
    description: "Maximum performance for data centres, large campuses, and mission-critical operations.",
    features: [
      "Block of 5 static IPs",
      "1-hour critical incident SLA",
      "Dedicated account manager",
      "99.9% uptime SLA",
      "Redundant fiber path option",
      "Custom bandwidth shaping",
    ],
    highlight: "Enterprise grade",
    ctaLabel: "Talk to sales",
    ctaHref: "#support",
  },
];

export const allMarketingPlans = [...homePlans, ...businessPlans];

export function getPlansByCategory(category: PlanCategory): MarketingPlan[] {
  return category === "home" ? homePlans : businessPlans;
}

export function getMarketingPlanById(id: string): MarketingPlan | undefined {
  return allMarketingPlans.find((p) => p.id === id);
}
