/**
 * @deprecated Renewal pricing comes from customer subscription (negotiated rates).
 * Use @/lib/subscriptions/subscription-service instead.
 */
export type { BillingCycle } from "@/lib/domain/subscription";

export { getPeriodLabel } from "@/lib/billing/pricing-utils";

export const paymentMethods = [
  { id: "upi", label: "UPI", description: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit card", description: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", description: "All major banks" },
] as const;
