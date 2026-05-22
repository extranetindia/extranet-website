import { payments } from "@/lib/dashboard-data";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export function PaymentHistory() {
  return (
    <DashboardCard title="Payment history" className="scroll-mt-20">
      <div id="billing" className="-mt-4 scroll-mt-20 sm:-mt-5" />

      <div className="overflow-x-auto -mx-4 sm:-mx-5">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wide text-muted">
              <th className="px-4 pb-3 font-medium sm:px-5">Invoice</th>
              <th className="px-4 pb-3 font-medium sm:px-5">Date</th>
              <th className="px-4 pb-3 font-medium sm:px-5">Amount</th>
              <th className="px-4 pb-3 font-medium sm:px-5">Method</th>
              <th className="px-4 pb-3 font-medium sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-medium text-foreground sm:px-5">
                  {payment.id}
                </td>
                <td className="px-4 py-3 text-muted sm:px-5">{payment.date}</td>
                <td className="px-4 py-3 font-medium text-foreground sm:px-5">
                  ₹{payment.amount}
                </td>
                <td className="px-4 py-3 text-muted sm:px-5">
                  {payment.method}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className="inline-flex rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
