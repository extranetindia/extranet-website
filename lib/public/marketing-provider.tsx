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
import { getHeroContent } from "@/lib/admin/cms/hero-service";
import { seedHeroContent } from "@/lib/admin/seed/hero-seed";
import {
  getStaticCatalogByCategory,
  getStaticPublicCatalog,
  resolvePublicCatalog,
} from "@/lib/catalog/catalog-service";
import type { PlanCatalogEntry, PlanCategory } from "@/lib/domain/catalog";
import type { HeroContent } from "@/lib/domain/hero-content";
import {
  PUBLIC_CONTENT_UPDATED,
  type PublicContentUpdateSource,
} from "@/lib/public/sync-events";

type MarketingContextValue = {
  /** True after client has read localStorage (safe to show live-only deltas) */
  synced: boolean;
  catalog: PlanCatalogEntry[];
  hero: HeroContent;
  getPlansByCategory: (category: PlanCategory) => PlanCatalogEntry[];
  refresh: () => void;
};

const MarketingContext = createContext<MarketingContextValue | null>(null);

export function MarketingProvider({ children }: { children: ReactNode }) {
  const [synced, setSynced] = useState(false);
  const [catalog, setCatalog] = useState<PlanCatalogEntry[]>(getStaticPublicCatalog);
  const [hero, setHero] = useState<HeroContent>(seedHeroContent);

  const refresh = useCallback(() => {
    setCatalog(resolvePublicCatalog());
    setHero(getHeroContent());
    setSynced(true);
  }, []);

  useEffect(() => {
    refresh();

    const onUpdate = (event: Event) => {
      const source = (event as CustomEvent<{ source?: PublicContentUpdateSource }>)
        .detail?.source;
      if (source === "hero") {
        setHero(getHeroContent());
      } else if (source === "catalog") {
        setCatalog(resolvePublicCatalog());
      } else {
        refresh();
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "extranet-admin-catalog" ||
        e.key === "extranet-admin-hero" ||
        e.key === null
      ) {
        refresh();
      }
    };

    window.addEventListener(PUBLIC_CONTENT_UPDATED, onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(PUBLIC_CONTENT_UPDATED, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({
      synced,
      catalog,
      hero,
      getPlansByCategory: (category: PlanCategory) =>
        catalog.filter((p) => p.category === category),
      refresh,
    }),
    [synced, catalog, hero, refresh]
  );

  return (
    <MarketingContext.Provider value={value}>{children}</MarketingContext.Provider>
  );
}

export function useMarketing() {
  const ctx = useContext(MarketingContext);
  if (!ctx) {
    throw new Error("useMarketing must be used within MarketingProvider");
  }
  return ctx;
}

/** Optional hook for components outside provider — returns static until mounted */
export function useMarketingCatalog(category?: PlanCategory) {
  const ctx = useContext(MarketingContext);
  if (!ctx) {
    if (category) return getStaticCatalogByCategory(category);
    return getStaticPublicCatalog();
  }
  if (category) return ctx.getPlansByCategory(category);
  return ctx.catalog;
}
