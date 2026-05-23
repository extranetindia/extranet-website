"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "@/lib/payment-context";
import { calculateRenewalAmount } from "@/lib/subscriptions/subscription-service";
import type { BillingCycle } from "@/lib/domain/subscription";
import { saveProcessingSession } from "@/lib/payment-session";
import { BillingPeriodToggle } from "@/components/payments/BillingPeriodToggle";
import { RenewalPlanCard } from "@/components/payments/RenewalPlanCard";
import { StickyPayBar } from "@/components/payments/StickyPayBar";
import { Button } from "@/components/ui/Button";

export function PlanSelection() {
  const router = useRouter();
  const { subscription, renewalQuote, setCheckout } = usePayment();
  const [period, setPeriod] = useState<BillingCycle>(subscription.billingCycle);

  const amount = calculateRenewalAmount(subscription, period);

  const handleContinue = () => {
    const draft = {
      billingPeriod: period,
      methodId: "upi",
      amount,
    };
    setCheckout(draft);
    saveProcessingSession({
      planId: subscription.planCatalogId,
      billingPeriod: period,
      methodId: "upi",
      amount,
    });
    router.push("/dashboard/payments/checkout");
  };

  return (
    <>
      <div className="space-y-5 pb-28 lg:pb-5">
        <div className="rounded-lg border border-border bg-surface px-4 py-3 text-[13px] text-muted sm:px-5">
          Renewing extends your connection from{" "}
          <span className="font-medium text-foreground">{subscription.expiryDate}</span>
          . Amount shown is your{" "}
          <span className="font-medium text-foreground">account-specific</span> billing
          rate, not the public website price.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BillingPeriodToggle value={period} onChange={setPeriod} />
        </div>

        <RenewalPlanCard
          quote={renewalQuote}
          subscription={subscription}
          period={period}
        />
      </div>

      <StickyPayBar
        label={`${subscription.planName} · ${period}`}
        amount={`₹${amount.toLocaleString("en-IN")}`}
      >
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="sm:hidden">
            <p className="text-[12px] text-muted">Your renewal total</p>
            <p className="text-lg font-semibold text-foreground">
              ₹{amount.toLocaleString("en-IN")}
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            className="flex-1 sm:flex-none sm:px-8"
            onClick={handleContinue}
          >
            Continue to payment
          </Button>
        </div>
      </StickyPayBar>
    </>
  );
}
