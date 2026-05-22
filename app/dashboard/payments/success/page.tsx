import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentActivationSuccess } from "@/components/payments/PaymentActivationSuccess";

export default function PaymentSuccessPage() {
  return (
    <PageShell title="Activation complete">
      <PaymentActivationSuccess />
    </PageShell>
  );
}
