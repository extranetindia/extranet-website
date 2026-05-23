/**
 * Admin catalog service — mock persistence (localStorage).
 * Future H8: sync public plan catalog via API.
 */

import { seedAdminCatalog } from "@/lib/admin/seed/catalog-seed";
import { ADMIN_CATALOG_STORAGE_KEY } from "@/lib/admin/storage-keys";
import type {
  AdminCatalogPlan,
  AdminCatalogPlanInput,
  PlanCatalogStatus,
} from "@/lib/domain/admin-catalog";
import type { PlanCategory } from "@/lib/domain/catalog";

export type { AdminCatalogPlan, AdminCatalogPlanInput, PlanCatalogStatus };

function nowLabel(): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function loadCatalogFromStorage(): AdminCatalogPlan[] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_CATALOG_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminCatalogPlan[];
  } catch {
    return null;
  }
}

export function saveCatalogToStorage(plans: AdminCatalogPlan[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_CATALOG_STORAGE_KEY, JSON.stringify(plans));
}

export function getAdminCatalog(): AdminCatalogPlan[] {
  const stored = loadCatalogFromStorage();
  return stored ?? seedAdminCatalog();
}

export function getAdminPlanById(id: string): AdminCatalogPlan | undefined {
  return getAdminCatalog().find((p) => p.id === id);
}

export function getPublicActiveCatalog(): AdminCatalogPlan[] {
  return getAdminCatalog()
    .filter((p) => p.status === "active")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function createAdminPlan(
  input: AdminCatalogPlanInput,
  existing: AdminCatalogPlan[]
): AdminCatalogPlan {
  const stamp = nowLabel();
  const baseId = input.id ?? slugify(input.name);
  let id = baseId;
  let n = 1;
  while (existing.some((p) => p.id === id)) {
    id = `${baseId}-${n++}`;
  }

  const plan: AdminCatalogPlan = {
    ...input,
    id,
    createdAt: stamp,
    updatedAt: stamp,
  };
  return plan;
}

export function updateAdminPlan(
  id: string,
  patch: Partial<AdminCatalogPlanInput>,
  existing: AdminCatalogPlan[]
): AdminCatalogPlan[] {
  return existing.map((plan) =>
    plan.id === id
      ? { ...plan, ...patch, id: plan.id, updatedAt: nowLabel() }
      : plan
  );
}

export function setAdminPlanStatus(
  id: string,
  status: PlanCatalogStatus,
  existing: AdminCatalogPlan[]
): AdminCatalogPlan[] {
  return updateAdminPlan(id, { status }, existing);
}

export function deleteAdminPlan(
  id: string,
  existing: AdminCatalogPlan[]
): AdminCatalogPlan[] {
  return existing.filter((p) => p.id !== id);
}

export function filterPlansByCategory(
  plans: AdminCatalogPlan[],
  category: PlanCategory | "all"
): AdminCatalogPlan[] {
  if (category === "all") return plans;
  return plans.filter((p) => p.category === category);
}

export function parseFeaturesText(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatFeaturesForInput(features: string[]): string {
  return features.join("\n");
}
