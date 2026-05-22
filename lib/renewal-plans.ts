import { homePlans, type MarketingPlan } from "@/lib/plans-data";

export type BillingPeriod = "monthly" | "quarterly";

export type RenewalPlan = {
  id: string;
  name: string;
  speed: string;
  speedMbps: number;
  monthlyPrice: number;
  quarterlyPrice: number;
  quarterlySavings: number;
  benefits: string[];
  recommended?: boolean;
};

function toRenewalPlan(plan: MarketingPlan): RenewalPlan {
  const monthly = plan.priceValue;
  const quarterly = Math.round(monthly * 2.85);
  const quarterlySavings = monthly * 3 - quarterly;
  return {
    id: plan.id,
    name: plan.name,
    speed: plan.speed,
    speedMbps: plan.speedMbps,
    monthlyPrice: monthly,
    quarterlyPrice: quarterly,
    quarterlySavings,
    benefits: [...plan.features],
    recommended: plan.popular,
  };
}

export const renewalPlans: RenewalPlan[] = homePlans.map(toRenewalPlan);

export const businessRenewalPlans: RenewalPlan[] = [];

export function getPlanById(id: string): RenewalPlan | undefined {
  return renewalPlans.find((p) => p.id === id);
}

export function getPlanPrice(plan: RenewalPlan, period: BillingPeriod): number {
  return period === "monthly" ? plan.monthlyPrice : plan.quarterlyPrice;
}

export function getPeriodLabel(period: BillingPeriod): string {
  return period === "monthly" ? "1 month" : "3 months";
}

export const paymentMethods = [
  { id: "upi", label: "UPI", description: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit card", description: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", description: "All major banks" },
] as const;
