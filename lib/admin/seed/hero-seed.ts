import type { HeroContent } from "@/lib/domain/hero-content";

const SEED_DATE = "22 May 2026";

export function seedHeroContent(): HeroContent {
  return {
    badgeText: "Fiber Broadband · Pan-India coverage",
    title: "Reliable fiber internet for your home",
    subtitle:
      "Extranet delivers consistent speeds, transparent billing, and an online portal to pay bills, track usage, and manage your connection.",
    ctaText: "Check plans",
    ctaHref: "#plans",
    secondaryCtaText: "Customer login",
    secondaryCtaHref: "/login",
    backgroundImageUrl: "",
    footnote: "Plans from ₹399/month · Free standard installation in service areas",
    updatedAt: SEED_DATE,
  };
}
