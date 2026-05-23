"use client";

import { usePayment } from "@/lib/payment-context";

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Failed: "bg-red-50 text-accent",
  Pending: "bg-amber-50 text-amber-700",
} as const;

export function PaymentHistoryTable() {
  const { transactions } = usePayment();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted">
            <th className="py-2 font-medium">Invoice</th>
            <th className="py-2 font-medium">Date</th>
            <th className="py-2 font-medium">Amount</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((payment) => (
            <tr key={payment.id} className="border-b border-border last:border-0">
              <td className="py-3 font-medium text-foreground">{payment.invoiceId}</td>
              <td className="py-3 text-muted">{payment.date}</td>
              <td className="py-3 font-medium text-foreground">
                ₹{payment.amount.toLocaleString("en-IN")}
              </td>
              <td className="py-3">
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-medium ${statusStyles[payment.status]}`}
                >
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
