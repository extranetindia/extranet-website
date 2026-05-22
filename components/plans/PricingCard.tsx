import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import type { MarketingPlan } from "@/lib/plans-data";

type PricingCardProps = {
  plan: MarketingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  const isBusiness = plan.category === "business";
  const isPopular = plan.popular;
  const ctaHref = plan.ctaHref ?? "#login";
  const ctaLabel = plan.ctaLabel ?? "Get this plan";

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-lg border bg-white ${
        isPopular
          ? "border-telecom ring-1 ring-telecom/20"
          : isBusiness
            ? "border-border"
            : "border-border"
      }`}
    >
      {isBusiness && (
        <div className="border-b border-border bg-telecom-darker/5 px-5 py-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-telecom-darker">
            Business internet
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {(plan.highlight || isPopular) && (
          <span
            className={`mb-3 w-fit rounded px-2 py-0.5 text-[11px] font-medium ${
              isPopular
                ? "bg-telecom text-white"
                : "bg-telecom-light text-telecom"
            }`}
          >
            {plan.highlight ?? "Recommended"}
          </span>
        )}

        <h3 className="text-[15px] font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-telecom">{plan.speed}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          {plan.description}
        </p>

        <div className="mt-4 flex items-baseline gap-1 border-t border-border pt-4">
          <span className="text-sm text-muted">₹</span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {plan.price}
          </span>
          <span className="text-[13px] text-muted">{plan.period}</span>
        </div>

        {isBusiness && (
          <p className="mt-1 text-[11px] text-muted">Billed monthly · Annual contracts available</p>
        )}

        <ul className="mt-4 flex-1 space-y-2.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[13px] leading-snug text-foreground/90"
            >
              <CheckIcon className="mt-px h-5 w-5 shrink-0 text-telecom" />
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          href={ctaHref}
          variant={isPopular ? "primary" : "outline"}
          className={`mt-5 w-full ${isBusiness && !isPopular ? "border-telecom-darker text-telecom-darker hover:bg-telecom-darker/5" : ""}`}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
