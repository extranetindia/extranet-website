"use client";

import { usePayment } from "@/lib/payment-context";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import { formatStartingPrice } from "@/lib/catalog/plan-catalog";
import { useMarketing } from "@/lib/public/marketing-provider";

export function AssignedPlanSummary() {
  const { subscription } = usePayment();
  const { synced } = useMarketing();
  const catalogEntry = synced
    ? resolveCatalogPlanById(subscription.planCatalogId)
    : undefined;
  const publicPrice = catalogEntry?.startingPrice;

  return (
    <div className="rounded-lg border border-telecom/25 bg-white p-4 sm:p-5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
        Your assigned plan
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {subscription.planName}
          </h3>
          <p className="text-sm font-medium text-telecom">{subscription.speed}</p>
          {subscription.billingNote && (
            <p className="mt-2 text-[12px] text-muted">{subscription.billingNote}</p>
          )}
        </div>
        <div className="rounded-md border border-border bg-surface px-4 py-3">
          <p className="text-[11px] text-muted">Your billing amount</p>
          <p className="text-xl font-semibold text-foreground">
            ₹{subscription.billingAmount.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-muted">/mo</span>
          </p>
          {publicPrice != null && publicPrice !== subscription.billingAmount && (
            <p className="mt-1 text-[12px] text-muted">
              Public list price for new customers: starting at ₹
              {formatStartingPrice(publicPrice)}/mo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
