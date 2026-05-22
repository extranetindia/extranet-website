import type { BillingPeriod } from "@/lib/renewal-plans";

export type ProcessingCheckout = {
  planId: string;
  billingPeriod: BillingPeriod;
  methodId: string;
};

export const PROCESSING_SESSION_KEY = "extranet-processing-checkout";
export const PROCESSING_FAIL_KEY = "extranet-processing-simulate-fail";
export const PAYMENT_RESULT_KEY = "extranet-payment-result";

export type PaymentResult = {
  success: boolean;
  txnId: string;
  invoiceId: string;
  amount: number;
  planName: string;
  speed: string;
  billingPeriod: BillingPeriod;
  newExpiryDate: string;
  method: string;
};

export function saveProcessingSession(draft: ProcessingCheckout): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PROCESSING_SESSION_KEY, JSON.stringify(draft));
}

export function loadProcessingSession(): ProcessingCheckout | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PROCESSING_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProcessingCheckout;
  } catch {
    return null;
  }
}

export function clearProcessingSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PROCESSING_SESSION_KEY);
  sessionStorage.removeItem(PROCESSING_FAIL_KEY);
}

export function savePaymentResult(result: PaymentResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PAYMENT_RESULT_KEY, JSON.stringify(result));
}

export function loadPaymentResult(): PaymentResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PAYMENT_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PaymentResult;
  } catch {
    return null;
  }
}

export function clearPaymentResult(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PAYMENT_RESULT_KEY);
}

export function setSimulateFailFlag(enabled: boolean): void {
  if (typeof window === "undefined") return;
  if (enabled) {
    sessionStorage.setItem(PROCESSING_FAIL_KEY, "1");
  } else {
    sessionStorage.removeItem(PROCESSING_FAIL_KEY);
  }
}

export function shouldSimulateFail(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PROCESSING_FAIL_KEY) === "1";
}
