import { PageShell } from "@/components/dashboard/PageShell";
import { PlanSelection } from "@/components/payments/PlanSelection";

export default function RenewPage() {
  return (
    <PageShell
      title="Renew your plan"
      description="Select a broadband plan and billing period to recharge your Extranet connection."
    >
      <PlanSelection />
    </PageShell>
  );
}
