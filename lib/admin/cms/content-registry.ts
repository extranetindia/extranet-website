import type { CmsModuleDefinition } from "@/lib/domain/cms";

/** Registry of CMS modules — implement editors per module in later phases */
export const cmsModuleRegistry: CmsModuleDefinition[] = [
  {
    id: "hero",
    type: "hero",
    label: "Homepage hero",
    description: "Headline, subcopy, CTA, and background for the main hero section.",
    route: "/admin/content/hero",
    status: "ready",
  },
  {
    id: "banners",
    type: "banner",
    label: "Promotional banners",
    description: "Top-of-site and in-page promotional strips with schedule support.",
    route: "/admin/content/banners",
    status: "planned",
  },
  {
    id: "homepage",
    type: "homepage_section",
    label: "Homepage sections",
    description: "Features block, portal preview copy, and supporting sections.",
    route: "/admin/content/homepage",
    status: "planned",
  },
  {
    id: "offers",
    type: "offer",
    label: "Offers & campaigns",
    description: "Limited-time offers linked to plan catalog and acquisition flows.",
    route: "/admin/content/offers",
    status: "planned",
  },
];
