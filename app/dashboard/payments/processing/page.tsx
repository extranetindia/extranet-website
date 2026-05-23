import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentProcessing } from "@/components/payments/PaymentProcessing";
import { RenewalGuard } from "@/components/payments/RenewalGuard";

export default function ProcessingPage() {
  return (
    <PageShell title="Processing">
      <RenewalGuard>
        <PaymentProcessing />
      </RenewalGuard>
    </PageShell>
  );
}
