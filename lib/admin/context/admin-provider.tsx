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
import { dispatchPublicContentUpdate } from "@/lib/public/sync-events";
import {
  getPricingOverrides,
  saveOverridesToStorage,
  type CustomerPricingOverride,
} from "@/lib/admin/services/pricing-override-service";

type AdminContextValue = {
  plans: AdminCatalogPlan[];
  pricingOverrides: CustomerPricingOverride[];
  hydrated: boolean;
  createPlan: (input: AdminCatalogPlanInput) => void;
  updatePlan: (id: string, patch: Partial<AdminCatalogPlanInput>) => void;
  togglePlanStatus: (id: string) => void;
  refreshCatalog: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<AdminCatalogPlan[]>([]);
  const [pricingOverrides, setPricingOverrides] = useState<CustomerPricingOverride[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refreshCatalog = useCallback(() => {
    setPlans(getAdminCatalog());
    setPricingOverrides(getPricingOverrides());
  }, []);

  useEffect(() => {
    refreshCatalog();
    setHydrated(true);
  }, [refreshCatalog]);

  useEffect(() => {
    if (!hydrated) return;
    saveCatalogToStorage(plans);
    dispatchPublicContentUpdate("catalog");
  }, [plans, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveOverridesToStorage(pricingOverrides);
  }, [pricingOverrides, hydrated]);

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

  const value = useMemo(
    () => ({
      plans,
      pricingOverrides,
      hydrated,
      createPlan,
      updatePlan,
      togglePlanStatus,
      refreshCatalog,
    }),
    [
      plans,
      pricingOverrides,
      hydrated,
      createPlan,
      updatePlan,
      togglePlanStatus,
      refreshCatalog,
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
