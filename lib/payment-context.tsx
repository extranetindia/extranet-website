"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BillingRecord, PaymentStatus } from "@/lib/domain/billing";
import type { BillingCycle, CustomerSubscription } from "@/lib/domain/subscription";
import { addMonthsToDate, formatToday } from "@/lib/billing/pricing-utils";
import { getCurrentCustomerBillingRecords } from "@/lib/billing/billing-service";
import {
  calculateRenewalAmount,
  daysUntilExpiry,
  getCurrentCustomerSubscription,
  getRenewalQuote,
} from "@/lib/subscriptions/subscription-service";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";

export type { PaymentStatus };

export type Transaction = BillingRecord & { status: PaymentStatus };

export type SubscriptionState = CustomerSubscription & {
  daysRemaining: number;
  publicStartingPrice?: number;
};

type CheckoutDraft = {
  billingPeriod: BillingCycle;
  methodId: string;
  /** Snapshot of amount at checkout — customer-specific */
  amount: number;
};

type PaymentState = {
  subscription: SubscriptionState;
  transactions: Transaction[];
  checkout: CheckoutDraft | null;
};

const STORAGE_KEY = "extranet-payment-state";

function toSubscriptionState(sub: CustomerSubscription): SubscriptionState {
  const catalog = resolveCatalogPlanById(sub.planCatalogId);
  return {
    ...sub,
    daysRemaining: daysUntilExpiry(sub.expiryDate),
    publicStartingPrice: catalog?.startingPrice,
  };
}

function subscriptionToState(sub: CustomerSubscription): SubscriptionState {
  return toSubscriptionState(sub);
}

function parseStoredState(raw: string | null): PaymentState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PaymentState;
  } catch {
    return null;
  }
}

function generateTxnId(): string {
  return `TXN${Date.now().toString().slice(-10)}`;
}

function generateInvoiceId(): string {
  return `INV-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

type PaymentContextValue = {
  subscription: SubscriptionState;
  transactions: Transaction[];
  checkout: CheckoutDraft | null;
  latestTransaction: Transaction | null;
  renewalQuote: ReturnType<typeof getRenewalQuote>;
  setCheckout: (draft: CheckoutDraft) => void;
  clearCheckout: () => void;
  completePayment: (success: boolean) => {
    txnId: string;
    newExpiry: string;
    invoiceId: string;
    amount: number;
    planName: string;
    speed: string;
  } | null;
  getCheckoutAmount: () => number;
  refreshSubscription: () => void;
};

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const loadInitial = () => {
    const sub = getCurrentCustomerSubscription();
    const billing = getCurrentCustomerBillingRecords();
    return {
      subscription: subscriptionToState(sub),
      transactions: billing as Transaction[],
      checkout: null,
    };
  };

  const [state, setState] = useState<PaymentState>(loadInitial);
  const [hydrated, setHydrated] = useState(false);

  const refreshSubscription = useCallback(() => {
    const sub = getCurrentCustomerSubscription();
    setState((prev) => ({
      ...prev,
      subscription: subscriptionToState(sub),
      transactions: getCurrentCustomerBillingRecords() as Transaction[],
    }));
  }, []);

  useEffect(() => {
    const stored = parseStoredState(localStorage.getItem(STORAGE_KEY));
    const freshSub = subscriptionToState(getCurrentCustomerSubscription());
    if (stored?.subscription.customerId === freshSub.customerId) {
      setState({
        ...stored,
        subscription: {
          ...stored.subscription,
          daysRemaining: daysUntilExpiry(stored.subscription.expiryDate),
        },
      });
    } else {
      setState(loadInitial());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const renewalQuote = useMemo(
    () => getRenewalQuote(state.subscription, state.subscription.billingCycle),
    [state.subscription]
  );

  const setCheckout = useCallback((draft: CheckoutDraft) => {
    setState((prev) => ({ ...prev, checkout: draft }));
  }, []);

  const clearCheckout = useCallback(() => {
    setState((prev) => ({ ...prev, checkout: null }));
  }, []);

  const getCheckoutAmount = useCallback(() => {
    if (state.checkout) return state.checkout.amount;
    return calculateRenewalAmount(
      state.subscription,
      state.subscription.billingCycle
    );
  }, [state.checkout, state.subscription]);

  const completePayment = useCallback((success: boolean) => {
    let result: {
      txnId: string;
      newExpiry: string;
      invoiceId: string;
      amount: number;
      planName: string;
      speed: string;
    } | null = null;

    setState((prev) => {
      const checkout = prev.checkout;
      if (!checkout) return prev;

      const sub = prev.subscription;
      const amount = checkout.amount;
      const method =
        checkout.methodId === "upi"
          ? "UPI"
          : checkout.methodId === "card"
            ? "Credit card"
            : "Net banking";

      const txnId = generateTxnId();
      const invoiceId = generateInvoiceId();
      const today = formatToday();

      if (!success) {
        const failedTxn: Transaction = {
          id: invoiceId,
          customerId: sub.customerId,
          txnId,
          invoiceId,
          date: today,
          amount,
          status: "Failed",
          method,
          planName: sub.planName,
          speed: sub.speed,
          billingCycle: checkout.billingPeriod,
        };
        result = {
          txnId,
          newExpiry: sub.expiryDate,
          invoiceId,
          amount,
          planName: sub.planName,
          speed: sub.speed,
        };
        return {
          ...prev,
          transactions: [failedTxn, ...prev.transactions],
        };
      }

      const months = checkout.billingPeriod === "monthly" ? 1 : 3;
      const newExpiry = addMonthsToDate(sub.expiryDate, months);

      const successTxn: Transaction = {
        id: invoiceId,
        customerId: sub.customerId,
        txnId,
        invoiceId,
        date: today,
        amount,
        status: "Paid",
        method,
        planName: sub.planName,
        speed: sub.speed,
        billingCycle: checkout.billingPeriod,
      };

      result = {
        txnId,
        newExpiry,
        invoiceId,
        amount,
        planName: sub.planName,
        speed: sub.speed,
      };

      const updatedSub: SubscriptionState = {
        ...sub,
        billingCycle: checkout.billingPeriod,
        expiryDate: newExpiry,
        daysRemaining: daysUntilExpiry(newExpiry),
        startDate: today,
      };

      return {
        subscription: updatedSub,
        transactions: [successTxn, ...prev.transactions],
        checkout: null,
      };
    });

    return result;
  }, []);

  const latestTransaction = state.transactions[0] ?? null;

  const value = useMemo(
    () => ({
      subscription: state.subscription,
      transactions: state.transactions,
      checkout: state.checkout,
      latestTransaction,
      renewalQuote,
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutAmount,
      refreshSubscription,
    }),
    [
      state,
      latestTransaction,
      renewalQuote,
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutAmount,
      refreshSubscription,
    ]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-telecom border-t-transparent" />
      </div>
    );
  }

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}
