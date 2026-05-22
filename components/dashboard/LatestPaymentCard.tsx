"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export function LatestPaymentCard() {
  const { latestTransaction } = usePayment();

  if (!latestTransaction) return null;

  const isPaid = latestTransaction.status === "Paid";

  return (
    <DashboardCard
      title="Latest transaction"
      action={
        <Link
          href="/dashboard/payments"
          className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
        >
          View all →
        </Link>
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[13px] font-medium text-foreground">
            {latestTransaction.txnId}
          </p>
          <p className="mt-0.5 text-[12px] text-muted">
            {latestTransaction.planName} · {latestTransaction.date} ·{" "}
            {latestTransaction.method}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-base font-semibold text-foreground">
            ₹{latestTransaction.amount.toLocaleString("en-IN")}
          </p>
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-medium ${
              isPaid ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-accent"
            }`}
          >
            {latestTransaction.status}
          </span>
        </div>
      </div>
    </DashboardCard>
  );
}
