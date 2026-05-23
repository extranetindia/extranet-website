"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import {
  saveProcessingSession,
  setSimulateFailFlag,
} from "@/lib/payment-session";
import { paymentMethods } from "@/lib/renewal-plans";
import { getPeriodLabel } from "@/lib/billing/pricing-utils";
import { StickyPayBar } from "@/components/payments/StickyPayBar";
import { Button } from "@/components/ui/Button";

const GST_RATE = 0.18;

export function PaymentSummary() {
  const router = useRouter();
  const { subscription, checkout, setCheckout, getCheckoutAmount } = usePayment();
  const [methodId, setMethodId] = useState(checkout?.methodId ?? "upi");

  const subtotal = getCheckoutAmount();

  if (!checkout) {
    return (
      <div className="rounded-lg border border-border bg-white p-6 text-center">
        <p className="text-[13px] text-muted">No renewal session found.</p>
        <Button href="/dashboard/payments/renew" variant="primary" className="mt-4">
          Start renewal
        </Button>
      </div>
    );
  }

  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  const goToProcessing = (simulateFail: boolean) => {
    const draft = { ...checkout, methodId, amount: subtotal };
    setCheckout(draft);
    saveProcessingSession({
      planId: subscription.planCatalogId,
      billingPeriod: checkout.billingPeriod,
      methodId,
      amount: subtotal,
    });
    setSimulateFailFlag(simulateFail);
    router.push("/dashboard/payments/processing");
  };

  const handlePay = () => goToProcessing(false);
  const handleTestFail = () => goToProcessing(true);

  return (
    <>
      <div className="grid gap-5 pb-28 lg:grid-cols-5 lg:pb-5">
        <div className="space-y-5 lg:col-span-3">
          <div className="rounded-lg border border-border bg-white p-4 sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              Payment method
            </p>
            <div className="mt-3 space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 transition-colors ${
                    methodId === method.id
                      ? "border-telecom bg-telecom-light/40"
                      : "border-border hover:bg-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={methodId === method.id}
                    onChange={() => setMethodId(method.id)}
                    className="text-telecom focus:ring-telecom"
                  />
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {method.label}
                    </p>
                    <p className="text-[12px] text-muted">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <p className="text-[12px] text-muted">
            Demo payment — no real charge. Amount reflects your negotiated account
            rate, not public website pricing.{" "}
            <button
              type="button"
              onClick={handleTestFail}
              className="text-muted hover:text-accent"
            >
              Test failed payment
            </button>
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold text-foreground">Order summary</p>

            <div className="mt-4 space-y-3 border-b border-border pb-4 text-[13px]">
              <div className="flex justify-between">
                <span className="text-muted">Plan</span>
                <span className="font-medium text-foreground">
                  {subscription.planName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Speed</span>
                <span className="font-medium text-telecom">{subscription.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Your rate</span>
                <span className="font-medium text-foreground">
                  Account-specific
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Duration</span>
                <span className="font-medium text-foreground">
                  {getPeriodLabel(checkout.billingPeriod)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-foreground">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">GST (18%)</span>
                <span className="font-medium text-foreground">
                  ₹{gst.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-3 text-[15px] font-semibold text-foreground">
              <span>Total payable</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <StickyPayBar amount={`₹${total.toLocaleString("en-IN")}`}>
        <div className="flex gap-2">
          <Button href="/dashboard/payments/renew" variant="outline" className="flex-1 sm:flex-none">
            Back
          </Button>
          <Button
            type="button"
            variant="primary"
            className="flex-1 sm:flex-none sm:min-w-[160px]"
            onClick={handlePay}
          >
            Pay now
          </Button>
        </div>
      </StickyPayBar>
    </>
  );
}
