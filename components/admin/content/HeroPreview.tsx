"use client";

import type { HeroContent } from "@/lib/domain/hero-content";
import { Button } from "@/components/ui/Button";

type HeroPreviewProps = {
  hero: HeroContent;
};

export function HeroPreview({ hero }: HeroPreviewProps) {
  const bgStyle = hero.backgroundImageUrl
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(6,45,97,0.92) 0%, rgba(10,31,51,0.88) 100%), url(${hero.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <div
      className="overflow-hidden rounded-md border border-border bg-telecom-darker"
      style={bgStyle}
    >
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-medium text-slate-400">{hero.badgeText}</p>
        <h2 className="mt-2 text-base font-semibold leading-snug text-white">
          {hero.title}
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400 line-clamp-3">
          {hero.subtitle}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button href={hero.ctaHref} variant="primary" className="!px-3 !py-1.5 !text-xs">
            {hero.ctaText}
          </Button>
          <Button
            href={hero.secondaryCtaHref}
            variant="outline-light"
            className="!px-3 !py-1.5 !text-xs"
          >
            {hero.secondaryCtaText}
          </Button>
        </div>
        <p className="mt-3 text-[10px] text-slate-500">{hero.footnote}</p>
      </div>
    </div>
  );
}
