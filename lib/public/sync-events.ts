/** Fired when admin updates catalog, hero, or other public marketing content */
export const PUBLIC_CONTENT_UPDATED = "extranet-public-content-updated";

export type PublicContentUpdateSource = "catalog" | "hero" | "customers" | "all";

/** Fired when admin updates customer accounts (portal billing data) */
export const CUSTOMERS_DATA_UPDATED = "extranet-customers-data-updated";

export function dispatchCustomersDataUpdate(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CUSTOMERS_DATA_UPDATED));
}

export function dispatchPublicContentUpdate(
  source: PublicContentUpdateSource = "all"
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(PUBLIC_CONTENT_UPDATED, { detail: { source } })
  );
}
