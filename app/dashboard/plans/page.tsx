import { PageShell } from "@/components/dashboard/PageShell";
import { SubscriptionOverview } from "@/components/dashboard/SubscriptionOverview";
import { SpeedComparison } from "@/components/payments/SpeedComparison";
import { Button } from "@/components/ui/Button";

export default function PlansPage() {
  return (
    <PageShell
      title="Plans"
      description="View your active plan or renew with a different speed."
    >
      <SubscriptionOverview />
      <div className="mt-5">
        <SpeedComparison />
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button href="/dashboard/payments/renew" variant="primary">
          Renew or change plan
        </Button>
        <Button href="/dashboard/support" variant="outline">
          Request plan upgrade
        </Button>
      </div>
    </PageShell>
  );
}
