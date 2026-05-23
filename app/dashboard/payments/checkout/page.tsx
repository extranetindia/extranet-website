import { PageShell } from "@/components/dashboard/PageShell";
import { PaymentSummary } from "@/components/payments/PaymentSummary";
import { RenewalGuard } from "@/components/payments/RenewalGuard";

export default function CheckoutPage() {
  return (
    <PageShell
      title="Payment"
      description="Review your order and complete payment securely."
    >
      <RenewalGuard>
        <PaymentSummary />
      </RenewalGuard>
    </PageShell>
  );
}
