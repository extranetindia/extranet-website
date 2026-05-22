import type { Metadata } from "next";
import { PaymentProvider } from "@/lib/payment-context";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileHeader } from "@/components/dashboard/DashboardMobileHeader";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";

export const metadata: Metadata = {
  title: "Customer Portal | Extranet",
  description: "Manage your Extranet broadband account, bills, and WiFi settings.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PaymentProvider>
      <div className="min-h-screen bg-surface">
        <DashboardSidebar />
        <div className="lg:pl-56">
          <DashboardMobileHeader />
          <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
        </div>
        <DashboardBottomNav />
      </div>
    </PaymentProvider>
  );
}
