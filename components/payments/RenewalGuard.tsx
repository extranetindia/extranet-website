"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import { Button } from "@/components/ui/Button";

type RenewalGuardProps = {
  children: React.ReactNode;
};

export function RenewalGuard({ children }: RenewalGuardProps) {
  const { canRenew, isSuspended, isExpired, subscription } = usePayment();

  if (canRenew) return <>{children}</>;

  return (
    <div className="mx-auto max-w-lg rounded-lg border border-border bg-white p-6 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
        {isSuspended ? "Account suspended" : "Renewal unavailable"}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-foreground">
        Payment cannot be processed
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">
        {isSuspended
          ? "Your account is suspended. Please contact Extranet support to reactivate service before making a payment."
          : isExpired
            ? "Your subscription has expired. Contact support to restore your account before renewing online."
            : "Renewal is not available for your account status."}
      </p>
      <p className="mt-3 text-[12px] text-muted">
        Account {subscription.accountId} · Status:{" "}
        <span className="font-medium capitalize text-foreground">
          {subscription.status}
        </span>
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button href="/dashboard" variant="outline">
          Back to dashboard
        </Button>
        <Button href="/dashboard/support" variant="primary">
          Contact support
        </Button>
      </div>
    </div>
  );
}
