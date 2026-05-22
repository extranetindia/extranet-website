import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentProcessing } from "@/components/payments/PaymentProcessing";

export default function ProcessingPage() {
  return (
    <PageShell title="Processing">
      <PaymentProcessing />
    </PageShell>
  );
}
