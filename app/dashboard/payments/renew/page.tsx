import { PageShell } from "@/components/dashboard/PageShell";
import { PlanSelection } from "@/components/payments/PlanSelection";

export default function RenewPage() {
  return (
    <PageShell
      title="Renew your plan"
      description="Extend your connection at your account-specific billing rate — not the public website price."
    >
      <PlanSelection />
    </PageShell>
  );
}
