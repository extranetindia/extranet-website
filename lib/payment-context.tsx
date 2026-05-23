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
import { ADMIN_CUSTOMERS_STORAGE_KEY } from "@/lib/admin/storage-keys";
import { addMonthsToDate, formatToday } from "@/lib/billing/pricing-utils";
import { getCurrentCustomerBillingRecords } from "@/lib/billing/billing-service";
import {
  canRenewSubscription,
  canManageConnection,
  isSuspended,
  isExpired,
} from "@/lib/portal/portal-access";
import {
  calculateRenewalAmount,
  daysUntilExpiry,
  getCurrentCustomerSubscription,
  getRenewalQuote,
} from "@/lib/subscriptions/subscription-service";
import { resolveCatalogPlanById } from "@/lib/catalog/catalog-service";
import { CUSTOMERS_DATA_UPDATED } from "@/lib/public/sync-events";

export type { PaymentStatus };

export type Transaction = BillingRecord & { status: PaymentStatus };

export type SubscriptionState = CustomerSubscription & {
  daysRemaining: number;
  publicStartingPrice?: number;
};

type CheckoutDraft = {
  billingPeriod: BillingCycle;
  methodId: string;
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

function loadAuthoritativeSubscription(): SubscriptionState {
  return toSubscriptionState(getCurrentCustomerSubscription());
}

type PersistedPaymentSlice = {
  customerId: string;
  transactions: Transaction[];
  checkout: CheckoutDraft | null;
};

function parsePersistedSlice(raw: string | null): PersistedPaymentSlice | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PaymentState;
    return {
      customerId: parsed.subscription?.customerId ?? "",
      transactions: parsed.transactions ?? [],
      checkout: parsed.checkout ?? null,
    };
  } catch {
    return null;
  }
}

function buildStateFromAdmin(persisted: PersistedPaymentSlice | null): PaymentState {
  const subscription = loadAuthoritativeSubscription();
  const billing = getCurrentCustomerBillingRecords() as Transaction[];

  const sameCustomer = persisted?.customerId === subscription.customerId;

  return {
    subscription,
    transactions:
      billing.length > 0
        ? billing
        : sameCustomer
          ? persisted!.transactions
          : billing,
    checkout: sameCustomer ? persisted?.checkout ?? null : null,
  };
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
  canRenew: boolean;
  canManageConnection: boolean;
  isSuspended: boolean;
  isExpired: boolean;
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
  refreshFromAdmin: () => void;
};

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>(() =>
    buildStateFromAdmin(null)
  );
  const [hydrated, setHydrated] = useState(false);

  const refreshFromAdmin = useCallback(() => {
    const persisted = parsePersistedSlice(
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    );
    setState(buildStateFromAdmin(persisted));
  }, []);

  useEffect(() => {
    const persisted = parsePersistedSlice(localStorage.getItem(STORAGE_KEY));
    setState(buildStateFromAdmin(persisted));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    const onCustomersUpdated = () => refreshFromAdmin();

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === ADMIN_CUSTOMERS_STORAGE_KEY ||
        e.key === STORAGE_KEY ||
        e.key === null
      ) {
        refreshFromAdmin();
      }
    };

    window.addEventListener(CUSTOMERS_DATA_UPDATED, onCustomersUpdated);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CUSTOMERS_DATA_UPDATED, onCustomersUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, [hydrated, refreshFromAdmin]);

  const renewalQuote = useMemo(
    () => getRenewalQuote(state.subscription, state.subscription.billingCycle),
    [state.subscription]
  );

  const canRenew = canRenewSubscription(state.subscription);
  const canManage = canManageConnection(state.subscription);
  const suspended = isSuspended(state.subscription.status);
  const expired = isExpired(state.subscription.status);

  const setCheckout = useCallback((draft: CheckoutDraft) => {
    setState((prev) => {
      const sub = loadAuthoritativeSubscription();
      if (!canRenewSubscription(sub)) return prev;
      return { ...prev, checkout: draft };
    });
  }, []);

  const clearCheckout = useCallback(() => {
    setState((prev) => ({ ...prev, checkout: null }));
  }, []);

  const getCheckoutAmount = useCallback(() => {
    const sub = loadAuthoritativeSubscription();
    if (state.checkout) return state.checkout.amount;
    return calculateRenewalAmount(sub, sub.billingCycle);
  }, [state.checkout]);

  const completePayment = useCallback((success: boolean) => {
    const liveSub = loadAuthoritativeSubscription();
    if (!canRenewSubscription(liveSub)) return null;

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

      const sub = loadAuthoritativeSubscription();
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
          subscription: sub,
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
      canRenew,
      canManageConnection: canManage,
      isSuspended: suspended,
      isExpired: expired,
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutAmount,
      refreshFromAdmin,
    }),
    [
      state,
      latestTransaction,
      renewalQuote,
      canRenew,
      canManage,
      suspended,
      expired,
      setCheckout,
      clearCheckout,
      completePayment,
      getCheckoutAmount,
      refreshFromAdmin,
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
