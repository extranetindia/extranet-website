import { wifi } from "@/lib/dashboard-data";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const actions = [
  {
    title: "Change WiFi password",
    description: "Update your home network security credentials.",
    buttonLabel: "Update password",
  },
  {
    title: "Change WiFi name",
    description: `Current SSID: ${wifi.ssid} (${wifi.band})`,
    buttonLabel: "Rename network",
  },
  {
    title: "Contact support",
    description: "Raise a ticket or call our 24×7 helpline.",
    buttonLabel: "Get help",
  },
] as const;

export function QuickActions() {
  return (
    <DashboardCard title="Quick actions" className="scroll-mt-20">
      <div id="wifi" className="-mt-4 scroll-mt-20 sm:-mt-5" />

      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <h4 className="text-[13px] font-semibold text-foreground">
              {action.title}
            </h4>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">
              {action.description}
            </p>
            <button
              type="button"
              className="mt-3 text-[13px] font-medium text-telecom hover:text-telecom-dark"
            >
              {action.buttonLabel} →
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-muted">
        {wifi.devicesConnected} devices connected · Changes may take up to 2
        minutes to apply.
      </p>
    </DashboardCard>
  );
}
