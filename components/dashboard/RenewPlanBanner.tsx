import { activePlan } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/Button";

export function RenewPlanBanner() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-telecom/20 bg-telecom-light px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Plan renews on {activePlan.expiryDate}
        </p>
        <p className="mt-0.5 text-[13px] text-muted">
          {activePlan.autoRenew
            ? "Auto-renewal is enabled. You can renew early or upgrade your plan."
            : "Auto-renewal is off. Renew now to avoid service interruption."}
        </p>
      </div>
      <Button variant="primary" className="shrink-0">
        Renew plan
      </Button>
    </div>
  );
}
