"use client";

import { CheckIcon } from "@/components/icons";
import { formatStartingPrice } from "@/lib/catalog/plan-catalog";
import { getPeriodLabel } from "@/lib/billing/pricing-utils";
import type { BillingCycle } from "@/lib/domain/subscription";
import type { RenewalQuote } from "@/lib/domain/subscription";
import type { SubscriptionState } from "@/lib/payment-context";

type RenewalPlanCardProps = {
  quote: RenewalQuote;
  subscription: SubscriptionState;
  period: BillingCycle;
};

export function RenewalPlanCard({
  quote,
  subscription,
  period,
}: RenewalPlanCardProps) {
  const amount =
    period === "monthly" ? quote.billingAmount : quote.quarterlyAmount;
  const perMonth =
    period === "quarterly" ? Math.round(amount / 3) : amount;

  return (
    <article className="rounded-lg border border-telecom bg-white ring-1 ring-telecom/20">
      <div className="border-b border-border bg-telecom-light/40 px-5 py-2">
        <p className="text-[11px] font-medium text-telecom">
          Your assigned plan · Account {subscription.accountId}
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <span className="mb-3 inline-block rounded bg-telecom px-2 py-0.5 text-[11px] font-medium text-white">
          Renew at your rate
        </span>

        <h3 className="text-[15px] font-semibold text-foreground">{quote.planName}</h3>
        <p className="text-sm font-medium text-telecom">{quote.speed}</p>

        {subscription.billingNote && (
          <p className="mt-2 rounded-md bg-surface px-2.5 py-1.5 text-[12px] text-muted">
            {subscription.billingNote}
          </p>
        )}

        <div className="mt-4 flex items-baseline gap-1 border-t border-border pt-4">
          <span className="text-sm text-muted">₹</span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {amount.toLocaleString("en-IN")}
          </span>
          <span className="text-[13px] text-muted">/ {getPeriodLabel(period)}</span>
        </div>
        <p className="mt-1 text-[12px] font-medium text-telecom">
          Your renewal amount (not public list price)
        </p>
        {period === "quarterly" && (
          <p className="mt-0.5 text-[12px] text-muted">
            ≈ ₹{perMonth.toLocaleString("en-IN")}/mo · Save ₹
            {quote.quarterlySavings.toLocaleString("en-IN")} vs monthly
          </p>
        )}

        {subscription.publicStartingPrice != null &&
          subscription.publicStartingPrice !== subscription.billingAmount && (
            <p className="mt-2 text-[12px] text-muted">
              New customers on this speed start at ₹
              {formatStartingPrice(subscription.publicStartingPrice)}/mo — your
              account retains ₹{subscription.billingAmount.toLocaleString("en-IN")}
              /mo
            </p>
          )}

        <ul className="mt-4 space-y-2">
          {quote.features.slice(0, 5).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-[12px] text-foreground/90"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-telecom" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
