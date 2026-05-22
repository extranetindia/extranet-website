import { PageShell } from "@/components/dashboard/PageShell";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { WifiNameForm } from "@/components/dashboard/settings/WifiNameForm";
import { WifiPasswordForm } from "@/components/dashboard/settings/WifiPasswordForm";
import { AccountInfo } from "@/components/dashboard/settings/AccountInfo";
import { RouterRestart } from "@/components/dashboard/settings/RouterRestart";

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Manage your WiFi, router, and account preferences."
    >
      <div className="space-y-5">
        <div id="wifi-name" className="scroll-mt-20">
          <DashboardCard title="Change WiFi name">
            <WifiNameForm />
          </DashboardCard>
        </div>

        <div id="wifi-password" className="scroll-mt-20">
          <DashboardCard title="Change WiFi password">
            <WifiPasswordForm />
          </DashboardCard>
        </div>

        <div id="router" className="scroll-mt-20">
          <DashboardCard title="Router">
            <RouterRestart />
          </DashboardCard>
        </div>

        <DashboardCard title="Account information">
          <AccountInfo />
        </DashboardCard>
      </div>
    </PageShell>
  );
}
