import Link from "next/link";
import { activePlan } from "@/lib/dashboard-data";
import { PageShell } from "@/components/dashboard/PageShell";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { PaymentHistoryTable } from "@/components/dashboard/PaymentHistoryTable";
import { Button } from "@/components/ui/Button";

export default function PaymentsPage() {
  return (
    <PageShell
      title="Payments"
      description="View invoices, pay bills, and manage auto-renewal."
    >
      <div className="rounded-lg border border-telecom/20 bg-telecom-light px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-sm font-semibold text-foreground">
            ₹{activePlan.price} due on {activePlan.expiryDate}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">
            {activePlan.name} · {activePlan.speed}
          </p>
        </div>
        <Button href="/dashboard/payments/renew" variant="primary" className="mt-3 shrink-0 sm:mt-0">
          Renew now
        </Button>
      </div>

      <DashboardCard title="Payment history" className="mt-5">
        <PaymentHistoryTable />
      </DashboardCard>

      <p className="mt-4 text-center text-[12px] text-muted">
        Need a tax invoice?{" "}
        <Link href="/dashboard/support" className="font-medium text-telecom hover:text-telecom-dark">
          Contact billing support
        </Link>
      </p>
    </PageShell>
  );
}
