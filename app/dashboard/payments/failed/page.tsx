import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentFailed } from "@/components/payments/PaymentFailed";

export default function PaymentFailedPage() {
  return (
    <PageShell title="Payment unsuccessful">
      <PaymentFailed />
    </PageShell>
  );
}
