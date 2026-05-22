import Link from "next/link";
import { activePlan, payments } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/Button";

export function PaymentSuccessView() {
  const latest = payments[0];

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="mt-4 text-xl font-semibold text-foreground">Payment successful</h1>
      <p className="mt-2 text-[13px] text-muted">
        Your {activePlan.name} plan has been renewed successfully.
      </p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 text-left text-[13px]">
        <div className="flex justify-between py-1.5">
          <span className="text-muted">Amount paid</span>
          <span className="font-medium text-foreground">₹{activePlan.price}</span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-muted">Invoice</span>
          <span className="font-medium text-foreground">{latest.id}</span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-muted">Next renewal</span>
          <span className="font-medium text-foreground">{activePlan.expiryDate}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Button href="/dashboard" variant="primary">
          Back to dashboard
        </Button>
        <Button href="/dashboard/payments" variant="outline">
          View payments
        </Button>
      </div>
    </div>
  );
}
