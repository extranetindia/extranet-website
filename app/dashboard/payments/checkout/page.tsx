import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentSummary } from "@/components/payments/PaymentSummary";

export default function CheckoutPage() {
  return (
    <PageShell
      title="Payment"
      description="Review your order and complete payment securely."
    >
      <PaymentSummary />
    </PageShell>
  );
}
