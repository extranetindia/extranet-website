"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";

export function SuspendedBanner() {
  const { isSuspended, isExpired } = usePayment();

  if (!isSuspended && !isExpired) return null;

  const title = isSuspended ? "Account suspended" : "Subscription expired";
  const message = isSuspended
    ? "Your Extranet connection has been suspended by operations. Renewal and router controls are disabled until your account is reactivated."
    : "Your plan has expired. Please renew or contact support to restore service.";

  return (
    <div
      className={`border-b px-4 py-3 sm:px-6 ${
        isSuspended ? "border-accent/30 bg-red-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{message}</p>
        </div>
        <Link
          href="/dashboard/support"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-[12px] font-medium text-telecom hover:bg-surface"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
