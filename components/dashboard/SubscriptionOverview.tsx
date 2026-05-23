"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import { Button } from "@/components/ui/Button";

export function SubscriptionOverview() {
  const { subscription, latestTransaction, canRenew, isSuspended } = usePayment();

  return (
    <div
      className={`rounded-lg border px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-5 ${
        isSuspended
          ? "border-accent/30 bg-red-50/80"
          : "border-telecom/20 bg-telecom-light"
      }`}
    >
      <div>
        <p className="text-sm font-semibold text-foreground">
          {subscription.planName} · {subscription.speed}
        </p>
        <p className="mt-0.5 text-[13px] text-muted">
          Valid till {subscription.expiryDate}
          {subscription.daysRemaining <= 10 && subscription.status === "active" && (
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
      {canRenew ? (
        <Button
          href="/dashboard/payments/renew"
          variant="primary"
          className="mt-3 shrink-0 sm:mt-0"
        >
          Renew at ₹{subscription.billingAmount.toLocaleString("en-IN")}
        </Button>
      ) : (
        <Link
          href="/dashboard/support"
          className="mt-3 inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-white px-5 py-2.5 text-sm font-medium text-telecom hover:bg-surface sm:mt-0"
        >
          Contact support
        </Link>
      )}
    </div>
  );
}
