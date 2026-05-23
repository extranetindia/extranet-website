"use client";

import { usePayment } from "@/lib/payment-context";
import { Button } from "@/components/ui/Button";

export function SubscriptionOverview() {
  const { subscription, latestTransaction } = usePayment();

  return (
    <div className="rounded-lg border border-telecom/20 bg-telecom-light px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-5">
      <div>
        <p className="text-sm font-semibold text-foreground">
          {subscription.planName} · {subscription.speed}
        </p>
        <p className="mt-0.5 text-[13px] text-muted">
          Valid till {subscription.expiryDate}
          {subscription.daysRemaining <= 10 && (
            <span className="ml-1 font-medium text-accent">
              · {subscription.daysRemaining} days left
            </span>
          )}
        </p>
        <p className="mt-1 text-[13px] font-medium text-foreground">
          Your renewal amount: ₹
          {subscription.billingAmount.toLocaleString("en-IN")}
          <span className="font-normal text-muted"> / month</span>
        </p>
        {subscription.billingNote && (
          <p className="mt-1 text-[12px] text-muted">{subscription.billingNote}</p>
        )}
        {latestTransaction?.status === "Paid" && (
          <p className="mt-1 text-[12px] text-muted">
            Last payment: ₹{latestTransaction.amount.toLocaleString("en-IN")} on{" "}
            {latestTransaction.date}
          </p>
        )}
      </div>
      <Button
        href="/dashboard/payments/renew"
        variant="primary"
        className="mt-3 shrink-0 sm:mt-0"
      >
        Renew at ₹{subscription.billingAmount.toLocaleString("en-IN")}
      </Button>
    </div>
  );
}
