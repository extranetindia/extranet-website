"use client";

import { brand } from "@/lib/data";
import { getLowestStartingPrice } from "@/lib/catalog/catalog-service";
import { useMarketing } from "@/lib/public/marketing-provider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "1 Gbps", label: "Peak speed" },
  { value: "99.9%", label: "Network uptime" },
  { value: "24×7", label: "Support" },
] as const;

export function Hero() {
  const { hero, catalog, synced } = useMarketing();
  const lowest = getLowestStartingPrice(catalog);
  const footnote =
    synced && lowest != null
      ? `Plans from ₹${lowest.toLocaleString("en-IN")}/month · Free standard installation in service areas`
      : hero.footnote;

  const bgStyle = hero.backgroundImageUrl
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(6,45,97,0.92) 0%, rgba(10,31,51,0.85) 55%, rgba(10,31,51,0.75) 100%), url(${hero.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <section
      id="home"
      className="border-b border-border bg-telecom-darker"
      style={bgStyle}
    >
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-md">
            {hero.badgeText ? (
              <p className="text-xs font-medium text-slate-400" suppressHydrationWarning>
                {hero.badgeText}
              </p>
            ) : (
              <p className="text-xs font-medium text-slate-400">
                {brand.tagline} · Pan-India coverage
              </p>
            )}

            <h1
              className="mt-3 text-[1.625rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.875rem]"
              suppressHydrationWarning
            >
              {hero.title}
            </h1>

            <p
              className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]"
              suppressHydrationWarning
            >
              {hero.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Button href={hero.ctaHref} variant="primary">
                <span suppressHydrationWarning>{hero.ctaText}</span>
              </Button>
              <Button href={hero.secondaryCtaHref} variant="outline-light">
                <span suppressHydrationWarning>{hero.secondaryCtaText}</span>
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-500" suppressHydrationWarning>
              {footnote}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Network status
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {[
                { label: "Download", value: "100 Mbps" },
                { label: "Upload", value: "150 Mbps" },
                { label: "Latency", value: "4 ms" },
                { label: "Status", value: "Online", accent: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2.5"
                >
                  <p className="text-[11px] text-slate-500">{item.label}</p>
                  <p
                    className={`mt-0.5 text-sm font-medium ${
                      item.accent ? "text-accent" : "text-white"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2.5">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>7-day usage</span>
                <span className="text-slate-400">412 GB</span>
              </div>
              <div className="mt-2 flex h-8 items-end gap-0.5">
                {[38, 52, 45, 58, 54, 68, 62].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-telecom/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-base font-semibold text-white sm:text-lg">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
