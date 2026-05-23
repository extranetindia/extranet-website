/**
 * Hero CMS service — mock persistence (localStorage).
 * Future H8: GET/PUT /api/h8/cms/blocks/hero
 */

import { ADMIN_HERO_STORAGE_KEY } from "@/lib/admin/storage-keys";
import { seedHeroContent } from "@/lib/admin/seed/hero-seed";
import type { HeroContent, HeroContentInput } from "@/lib/domain/hero-content";
import { dispatchPublicContentUpdate } from "@/lib/public/sync-events";

export type { HeroContent, HeroContentInput };

function nowLabel(): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function loadHeroFromStorage(): HeroContent | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_HERO_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as HeroContent;
  } catch {
    return null;
  }
}

export function saveHeroToStorage(hero: HeroContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_HERO_STORAGE_KEY, JSON.stringify(hero));
  dispatchPublicContentUpdate("hero");
}

export function getHeroContent(): HeroContent {
  return loadHeroFromStorage() ?? seedHeroContent();
}

export function saveHeroContent(input: HeroContentInput): HeroContent {
  const hero: HeroContent = {
    ...input,
    updatedAt: nowLabel(),
  };
  saveHeroToStorage(hero);
  return hero;
}
