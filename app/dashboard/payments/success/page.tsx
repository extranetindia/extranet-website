import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentSuccessView } from "@/components/dashboard/payments/PaymentSuccessView";

export default function PaymentSuccessPage() {
  return (
    <PageShell title="Payment confirmation">
      <PaymentSuccessView />
    </PageShell>
  );
}
