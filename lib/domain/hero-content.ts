/** Homepage hero — CMS-managed marketing content */
export type HeroContent = {
  badgeText: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  backgroundImageUrl: string;
  footnote: string;
  updatedAt: string;
};

export type HeroContentInput = Omit<HeroContent, "updatedAt">;
