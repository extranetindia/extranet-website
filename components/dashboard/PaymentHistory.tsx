import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { PaymentHistoryTable } from "@/components/dashboard/PaymentHistoryTable";
import Link from "next/link";

export function PaymentHistory() {
  return (
    <DashboardCard
      title="Recent payments"
      action={
        <Link
          href="/dashboard/payments"
          className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
        >
          View all →
        </Link>
      }
    >
      <PaymentHistoryTable />
    </DashboardCard>
  );
}
