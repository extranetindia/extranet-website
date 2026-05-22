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
import { payments as defaultPayments } from "@/lib/dashboard-data";
import {
  getPlanById,
  getPlanPrice,
  type BillingPeriod,
  type RenewalPlan,
} from "@/lib/renewal-plans";

export type PaymentStatus = "Paid" | "Failed" | "Pending";

export type Transaction = {
  id: string;
  txnId: string;
  invoiceId: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  planName: string;
  speed: string;
  billingPeriod: BillingPeriod;
};

export type SubscriptionState = {
  planId: string;
  planName: string;
  speed: string;
  price: number;
  billingPeriod: BillingPeriod;
  expiryDate: string;
  daysRemaining: number;
  startDate: string;
  autoRenew: boolean;
};

type CheckoutDraft = {
  planId: string;
  billingPeriod: BillingPeriod;
  methodId: string;
};

type PaymentState = {
  subscription: SubscriptionState;
  transactions: Transaction[];
  checkout: CheckoutDraft | null;
};

const STORAGE_KEY = "extranet-payment-state";

const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  planId: "home-stream",
  planName: "Home Stream",
  speed: "100 Mbps",
  price: 599,
  billingPeriod: "monthly",
  expiryDate: "28 May 2026",
  daysRemaining: 6,
  startDate: "28 Apr 2025",
  autoRenew: true,
};

const DEFAULT_TRANSACTIONS: Transaction[] = defaultPayments.map((p) => ({
  id: p.id,
  txnId: `TXN${p.id.replace("INV-", "")}`,
  invoiceId: p.id,
  date: p.date,
  amount: p.amount,
  status: p.status as PaymentStatus,
  method: p.method,
  planName: "Home Stream",
  speed: "100 Mbps",
  billingPeriod: "monthly" as BillingPeriod,
}));

function parseStoredState(raw: string | null): PaymentState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PaymentState;
  } catch {
    return null;
  }
}

function addMonthsToDate(dateStr: string, months: number): string {
  const months_map: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.split(" ");
  const day = parseInt(parts[0], 10);
  const month = months_map[parts[1]];
  const year = parseInt(parts[2], 10);
  const d = new Date(year, month + months, day);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

function daysUntil(dateStr: string): number {
  const months_map: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.split(" ");
  const day = parseInt(parts[0], 10);
  const month = months_map[parts[1]];
  const year = parseInt(parts[2], 10);
  const target = new Date(year, month, day);
  const now = new Date(2026, 4, 22);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function formatToday(): string {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date(2026, 4, 22);
  return `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
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
  getCheckoutPlan: () => RenewalPlan | undefined;
  getCheckoutAmount: () => number;
};

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>({
    subscription: DEFAULT_SUBSCRIPTION,
    transactions: DEFAULT_TRANSACTIONS,
    checkout: null,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = parseStoredState(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      setState({
        ...stored,
        subscription: {
          ...stored.subscription,
          daysRemaining: daysUntil(stored.subscription.expiryDate),
        },
      });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const setCheckout = useCallback((draft: CheckoutDraft) => {
    setState((prev) => ({ ...prev, checkout: draft }));
  }, []);

  const clearCheckout = useCallback(() => {
    setState((prev) => ({ ...prev, checkout: null }));
  }, []);

  const getCheckoutPlan = useCallback(() => {
    if (!state.checkout) return undefined;
    return getPlanById(state.checkout.planId);
  }, [state.checkout]);

  const getCheckoutAmount = useCallback(() => {
    const plan = getCheckoutPlan();
    if (!plan || !state.checkout) return 0;
    return getPlanPrice(plan, state.checkout.billingPeriod);
  }, [getCheckoutPlan, state.checkout]);

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

      const plan = getPlanById(checkout.planId);
      if (!plan) return prev;

      const amount = getPlanPrice(plan, checkout.billingPeriod);
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
          txnId,
          invoiceId,
          date: today,
          amount,
          status: "Failed",
          method,
          planName: plan.name,
          speed: plan.speed,
          billingPeriod: checkout.billingPeriod,
        };
        result = {
          txnId,
          newExpiry: prev.subscription.expiryDate,
          invoiceId,
          amount,
          planName: plan.name,
          speed: plan.speed,
        };
        return {
          ...prev,
          transactions: [failedTxn, ...prev.transactions],
        };
      }

      const months = checkout.billingPeriod === "monthly" ? 1 : 3;
      const newExpiry = addMonthsToDate(prev.subscription.expiryDate, months);

      const successTxn: Transaction = {
        id: invoiceId,
        txnId,
        invoiceId,
        date: today,
        amount,
        status: "Paid",
        method,
        planName: plan.name,
        speed: plan.speed,
        billingPeriod: checkout.billingPeriod,
      };

      result = {
        txnId,
        newExpiry,
        invoiceId,
        amount,
        planName: plan.name,
        speed: plan.speed,
      };
      return {
        subscription: {
          planId: plan.id,
          planName: plan.name,
          speed: plan.speed,
          price: amount,
          billingPeriod: checkout.billingPeriod,
          expiryDate: newExpiry,
          daysRemaining: daysUntil(newExpiry),
          startDate: today,
          autoRenew: prev.subscription.autoRenew,
        },
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
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutPlan,
      getCheckoutAmount,
    }),
    [
      state,
      latestTransaction,
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutPlan,
      getCheckoutAmount,
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
