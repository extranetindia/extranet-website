"use client";

import { useRouter } from "next/navigation";
import { activePlan } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/Button";

const paymentMethods = ["UPI", "Credit / Debit card", "Net banking"] as const;

export function RenewForm() {
  const router = useRouter();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/payments/success");
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Renewing plan
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">{activePlan.name}</p>
        <p className="text-[13px] text-telecom">{activePlan.speed}</p>
        <p className="mt-3 text-2xl font-semibold text-foreground">
          ₹{activePlan.price}
          <span className="text-sm font-normal text-muted"> / month</span>
        </p>
        <p className="mt-1 text-[12px] text-muted">
          Valid until next cycle from {activePlan.expiryDate}
        </p>
      </div>

      <div>
        <p className="text-[13px] font-medium text-foreground">Payment method</p>
        <div className="mt-2 space-y-2">
          {paymentMethods.map((method, i) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 has-[:checked]:border-telecom has-[:checked]:bg-telecom-light/30"
            >
              <input
                type="radio"
                name="method"
                defaultChecked={i === 0}
                className="text-telecom focus:ring-telecom"
              />
              <span className="text-[13px] text-foreground">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-telecom/20 bg-telecom-light/50 px-3 py-2.5 text-[12px] text-muted">
        GST included · This is a demo payment flow. No real transaction will occur.
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Pay ₹{activePlan.price}
      </Button>
    </form>
  );
}
