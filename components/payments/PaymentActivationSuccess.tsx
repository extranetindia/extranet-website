"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import { loadPaymentResult, type PaymentResult } from "@/lib/payment-session";
import { getPeriodLabel, type BillingPeriod } from "@/lib/renewal-plans";
import { Button } from "@/components/ui/Button";

type DisplayDetails = {
  txnId: string;
  invoiceId: string;
  amount: number;
  planName: string;
  speed: string;
  billingPeriod: BillingPeriod;
  expiryDate: string;
};

export function PaymentActivationSuccess() {
  const { subscription, latestTransaction } = usePayment();
  const [storedResult, setStoredResult] = useState<PaymentResult | null>(null);

  useEffect(() => {
    setStoredResult(loadPaymentResult());
  }, []);

  let display: DisplayDetails | null = null;

  if (latestTransaction?.status === "Paid") {
    display = {
      txnId: latestTransaction.txnId,
      invoiceId: latestTransaction.invoiceId,
      amount: latestTransaction.amount,
      planName: latestTransaction.planName,
      speed: latestTransaction.speed,
      billingPeriod: latestTransaction.billingPeriod,
      expiryDate: subscription.expiryDate,
    };
  } else if (storedResult?.success) {
    display = {
      txnId: storedResult.txnId,
      invoiceId: storedResult.invoiceId,
      amount: storedResult.amount,
      planName: storedResult.planName,
      speed: storedResult.speed,
      billingPeriod: storedResult.billingPeriod,
      expiryDate: storedResult.newExpiryDate,
    };
  }

  if (!display) {
    return (
      <div className="text-center">
        <p className="text-[13px] text-muted">No recent successful payment found.</p>
        <Button href="/dashboard/payments/renew" variant="primary" className="mt-4">
          Renew plan
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="text-center">
        <div className="payment-success-ring relative mx-auto flex h-20 w-20 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white">
            <svg
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Internet activated successfully
        </h1>
        <p className="mt-2 text-[13px] text-muted">
          Your Extranet broadband connection has been renewed and is now active.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5">
        <dl className="grid gap-3 text-[13px] sm:grid-cols-2">
          <div>
            <dt className="text-muted">Transaction ID</dt>
            <dd className="mt-0.5 font-mono text-sm font-medium text-foreground">
              {display.txnId}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Invoice</dt>
            <dd className="mt-0.5 font-medium text-foreground">{display.invoiceId}</dd>
          </div>
          <div>
            <dt className="text-muted">Plan</dt>
            <dd className="mt-0.5 font-medium text-foreground">
              {display.planName} · {display.speed}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Billing period</dt>
            <dd className="mt-0.5 font-medium text-foreground">
              {getPeriodLabel(display.billingPeriod)}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Amount paid</dt>
            <dd className="mt-0.5 font-semibold text-foreground">
              ₹{display.amount.toLocaleString("en-IN")}
            </dd>
          </div>
          <div>
            <dt className="text-muted">New expiry date</dt>
            <dd className="mt-0.5 font-semibold text-telecom">{display.expiryDate}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-white p-4 text-[13px]">
        <p className="font-medium text-foreground">What happens next</p>
        <ul className="mt-2 space-y-1.5 text-muted">
          <li>· Your connection remains online — no installation visit needed.</li>
          <li>· Updated invoice sent to your registered email.</li>
          <li>· Dashboard reflects your new validity immediately.</li>
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button href="/dashboard" variant="primary" className="flex-1">
          Go to dashboard
        </Button>
        <Button href="/dashboard/payments" variant="outline" className="flex-1">
          View payment history
        </Button>
      </div>

      <p className="mt-4 text-center text-[12px] text-muted">
        Need help?{" "}
        <Link
          href="/dashboard/support"
          className="font-medium text-telecom hover:underline"
        >
          Contact support
        </Link>
      </p>
    </div>
  );
}
