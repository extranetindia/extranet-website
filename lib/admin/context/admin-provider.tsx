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
import {
  createAdminPlan,
  getAdminCatalog,
  saveCatalogToStorage,
  setAdminPlanStatus,
  updateAdminPlan,
  type AdminCatalogPlan,
  type AdminCatalogPlanInput,
  type PlanCatalogStatus,
} from "@/lib/admin/services/catalog-admin-service";
import {
  createAdminCustomer,
  getAllAdminCustomersRaw,
  loadCustomersFromStorage,
  saveCustomersToStorage,
  setCustomerStatus,
  softDeleteCustomer,
  updateAdminCustomer,
  type AdminCustomerAccount,
  type AdminCustomerFormInput,
} from "@/lib/admin/services/customer-admin-service";
import { seedAdminCustomers } from "@/lib/admin/seed/customers-seed";
import { dispatchPublicContentUpdate } from "@/lib/public/sync-events";
import type { SubscriptionStatus } from "@/lib/domain/subscription";

type AdminContextValue = {
  plans: AdminCatalogPlan[];
  customers: AdminCustomerAccount[];
  activeCustomers: AdminCustomerAccount[];
  hydrated: boolean;
  createPlan: (input: AdminCatalogPlanInput) => void;
  updatePlan: (id: string, patch: Partial<AdminCatalogPlanInput>) => void;
  togglePlanStatus: (id: string) => void;
  createCustomer: (input: AdminCustomerFormInput) => void;
  updateCustomer: (customerId: string, input: AdminCustomerFormInput) => void;
  suspendCustomer: (customerId: string) => void;
  reactivateCustomer: (customerId: string) => void;
  deleteCustomer: (customerId: string) => void;
  refreshAll: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<AdminCatalogPlan[]>([]);
  const [customers, setCustomers] = useState<AdminCustomerAccount[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refreshAll = useCallback(() => {
    setPlans(getAdminCatalog());
    setCustomers(loadCustomersFromStorage() ?? seedAdminCustomers());
  }, []);

  useEffect(() => {
    refreshAll();
    setHydrated(true);
  }, [refreshAll]);

  useEffect(() => {
    if (!hydrated) return;
    saveCatalogToStorage(plans);
    dispatchPublicContentUpdate("catalog");
  }, [plans, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveCustomersToStorage(customers);
  }, [customers, hydrated]);

  const activeCustomers = useMemo(
    () => customers.filter((c) => !c.deletedAt),
    [customers]
  );

  const createPlan = useCallback((input: AdminCatalogPlanInput) => {
    setPlans((prev) => {
      const created = createAdminPlan(input, prev);
      return [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder);
    });
  }, []);

  const updatePlan = useCallback(
    (id: string, patch: Partial<AdminCatalogPlanInput>) => {
      setPlans((prev) => updateAdminPlan(id, patch, prev));
    },
    []
  );

  const togglePlanStatus = useCallback((id: string) => {
    setPlans((prev) => {
      const plan = prev.find((p) => p.id === id);
      if (!plan) return prev;
      const next: PlanCatalogStatus =
        plan.status === "active" ? "disabled" : "active";
      return setAdminPlanStatus(id, next, prev);
    });
  }, []);

  const createCustomer = useCallback((input: AdminCustomerFormInput) => {
    setCustomers((prev) => {
      const all = prev.length ? prev : getAllAdminCustomersRaw();
      const created = createAdminCustomer(input, all);
      return [...all, created];
    });
  }, []);

  const updateCustomer = useCallback(
    (customerId: string, input: AdminCustomerFormInput) => {
      setCustomers((prev) => updateAdminCustomer(customerId, input, prev));
    },
    []
  );

  const setStatus = useCallback(
    (customerId: string, status: SubscriptionStatus) => {
      setCustomers((prev) => setCustomerStatus(customerId, status, prev));
    },
    []
  );

  const suspendCustomer = useCallback(
    (customerId: string) => setStatus(customerId, "suspended"),
    [setStatus]
  );

  const reactivateCustomer = useCallback(
    (customerId: string) => setStatus(customerId, "active"),
    [setStatus]
  );

  const deleteCustomer = useCallback((customerId: string) => {
    setCustomers((prev) => softDeleteCustomer(customerId, prev));
  }, []);

  const value = useMemo(
    () => ({
      plans,
      customers,
      activeCustomers,
      hydrated,
      createPlan,
      updatePlan,
      togglePlanStatus,
      createCustomer,
      updateCustomer,
      suspendCustomer,
      reactivateCustomer,
      deleteCustomer,
      refreshAll,
    }),
    [
      plans,
      customers,
      activeCustomers,
      hydrated,
      createPlan,
      updatePlan,
      togglePlanStatus,
      createCustomer,
      updateCustomer,
      suspendCustomer,
      reactivateCustomer,
      deleteCustomer,
      refreshAll,
    ]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f2439]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <p className="mt-3 text-[13px] text-white/60">Loading operations console…</p>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
