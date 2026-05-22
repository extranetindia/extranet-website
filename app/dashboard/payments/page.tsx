import { PageShell } from "@/components/dashboard/PageShell";
import { SubscriptionOverview } from "@/components/dashboard/SubscriptionOverview";
import { PaymentHistoryInvoices } from "@/components/payments/PaymentHistoryInvoices";
import Link from "next/link";

export default function PaymentsPage() {
  return (
    <PageShell
      title="Payments"
      description="View invoices, renew your plan, and download payment receipts."
    >
      <SubscriptionOverview />

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Transaction history</h2>
          <Link
            href="/dashboard/payments/renew"
            className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
          >
            New renewal →
          </Link>
        </div>
        <PaymentHistoryInvoices />
      </div>

    </PageShell>
  );
}
