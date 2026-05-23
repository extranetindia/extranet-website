import { PageShell } from "@/components/dashboard/PageShell";
import { AssignedPlanSummary } from "@/components/dashboard/AssignedPlanSummary";
import { SubscriptionOverview } from "@/components/dashboard/SubscriptionOverview";
import { SpeedComparison } from "@/components/payments/SpeedComparison";
import { Button } from "@/components/ui/Button";

export default function PlansPage() {
  return (
    <PageShell
      title="Plans"
      description="Your assigned plan and billing rate. Public website prices apply only to new connections."
    >
      <AssignedPlanSummary />
      <div className="mt-5">
        <SubscriptionOverview />
      </div>
      <div className="mt-5">
        <SpeedComparison />
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button href="/dashboard/payments/renew" variant="primary">
          Renew at your rate
        </Button>
        <Button href="/dashboard/support" variant="outline">
          Request plan upgrade
        </Button>
      </div>
    </PageShell>
  );
}
