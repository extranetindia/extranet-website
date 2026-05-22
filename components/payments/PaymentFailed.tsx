"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import { Button } from "@/components/ui/Button";

export function PaymentFailed() {
  const { latestTransaction } = usePayment();
  const failedTxn =
    latestTransaction?.status === "Failed" ? latestTransaction : null;

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-accent">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="mt-5 text-xl font-semibold text-foreground">Payment failed</h1>
      <p className="mt-2 text-[13px] text-muted">
        We could not process your payment. No amount has been charged to your account.
      </p>

      {failedTxn && (
        <div className="mt-6 rounded-lg border border-border bg-surface p-4 text-left text-[13px]">
          <div className="flex justify-between py-1">
            <span className="text-muted">Reference</span>
            <span className="font-mono text-foreground">{failedTxn.txnId}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Amount</span>
            <span className="font-medium text-foreground">
              ₹{failedTxn.amount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Method</span>
            <span className="text-foreground">{failedTxn.method}</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        <Button href="/dashboard/payments/checkout" variant="primary" className="w-full">
          Try again
        </Button>
        <Button href="/dashboard/payments/renew" variant="outline" className="w-full">
          Change plan
        </Button>
        <Link
          href="/dashboard/support"
          className="text-[13px] font-medium text-telecom hover:text-telecom-dark"
        >
          Contact billing support →
        </Link>
      </div>
    </div>
  );
}
