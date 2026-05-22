"use client";

import { usePayment, type PaymentStatus } from "@/lib/payment-context";

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Failed: "bg-red-50 text-accent",
  Pending: "bg-amber-50 text-amber-700",
};

export function PaymentHistoryInvoices() {
  const { transactions } = usePayment();

  return (
    <div className="space-y-3">
      {transactions.map((txn) => (
        <article
          key={txn.id}
          className="rounded-lg border border-border bg-white p-4 sm:flex sm:items-center sm:justify-between sm:p-5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[13px] font-semibold text-foreground">
                {txn.invoiceId}
              </p>
              <span
                className={`rounded px-2 py-0.5 text-[11px] font-medium ${statusStyles[txn.status]}`}
              >
                {txn.status}
              </span>
            </div>
            <p className="mt-1 text-[12px] text-muted">
              {txn.planName} · {txn.speed} · {txn.date}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted">
              {txn.txnId} · {txn.method}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-border pt-3 sm:mt-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
            <p className="text-lg font-semibold text-foreground">
              ₹{txn.amount.toLocaleString("en-IN")}
            </p>
            {txn.status === "Paid" && (
              <button
                type="button"
                className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
              >
                Download invoice
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
