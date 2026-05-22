import { CustomerHeader } from "@/components/dashboard/CustomerHeader";
import { StatusCards } from "@/components/dashboard/StatusCards";
import { RenewPlanBanner } from "@/components/dashboard/RenewPlanBanner";
import { DataUsageSection } from "@/components/dashboard/DataUsageSection";
import { PaymentHistory } from "@/components/dashboard/PaymentHistory";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:py-8">
      <div className="space-y-5">
        <CustomerHeader />
        <StatusCards />
        <RenewPlanBanner />
        <DataUsageSection />
        <PaymentHistory />
        <QuickActions />
      </div>
    </div>
  );
}
