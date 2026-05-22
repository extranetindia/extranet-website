import { CustomerHeader } from "@/components/dashboard/CustomerHeader";
import { StatusCards } from "@/components/dashboard/StatusCards";
import { DataUsageSection } from "@/components/dashboard/DataUsageSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NotificationsSection } from "@/components/dashboard/NotificationsSection";
import { PaymentHistory } from "@/components/dashboard/PaymentHistory";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:py-8">
      <div className="space-y-5">
        <CustomerHeader />
        <StatusCards />
        <QuickActions />
        <DataUsageSection />
        <NotificationsSection />
        <PaymentHistory />
      </div>
    </div>
  );
}
