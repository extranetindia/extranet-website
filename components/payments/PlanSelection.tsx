"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { renewalPlans, type BillingPeriod } from "@/lib/renewal-plans";
import { usePayment } from "@/lib/payment-context";
import { saveProcessingSession } from "@/lib/payment-session";
import { BillingPeriodToggle } from "@/components/payments/BillingPeriodToggle";
import { PlanCard } from "@/components/payments/PlanCard";
import { SpeedComparison } from "@/components/payments/SpeedComparison";
import { StickyPayBar } from "@/components/payments/StickyPayBar";
import { Button } from "@/components/ui/Button";
import { getPlanPrice } from "@/lib/renewal-plans";

export function PlanSelection() {
  const router = useRouter();
  const { subscription, setCheckout } = usePayment();
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [selectedId, setSelectedId] = useState(subscription.planId);

  const selectedPlan = renewalPlans.find((p) => p.id === selectedId)!;
  const amount = getPlanPrice(selectedPlan, period);

  const handleContinue = () => {
    const draft = {
      planId: selectedId,
      billingPeriod: period,
      methodId: "upi",
    };
    setCheckout(draft);
    saveProcessingSession(draft);
    router.push("/dashboard/payments/checkout");
  };

  return (
    <>
      <div className="space-y-5 pb-28 lg:pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] text-muted">
              Current plan expires{" "}
              <span className="font-medium text-foreground">
                {subscription.expiryDate}
              </span>
            </p>
          </div>
          <BillingPeriodToggle value={period} onChange={setPeriod} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {renewalPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              period={period}
              isCurrent={plan.id === subscription.planId}
              isSelected={plan.id === selectedId}
              onSelect={() => setSelectedId(plan.id)}
            />
          ))}
        </div>

        <SpeedComparison />
      </div>

      <StickyPayBar
        label={`${selectedPlan.name} · ${period}`}
        amount={`₹${amount.toLocaleString("en-IN")}`}
      >
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="sm:hidden">
            <p className="text-[12px] text-muted">Total</p>
            <p className="text-lg font-semibold text-foreground">
              ₹{amount.toLocaleString("en-IN")}
            </p>
          </div>
          <Button type="button" variant="primary" className="flex-1 sm:flex-none sm:px-8" onClick={handleContinue}>
            Continue to payment
          </Button>
        </div>
      </StickyPayBar>
    </>
  );
}
