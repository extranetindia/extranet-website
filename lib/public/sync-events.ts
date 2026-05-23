/** Fired when admin updates catalog, hero, or other public marketing content */
export const PUBLIC_CONTENT_UPDATED = "extranet-public-content-updated";

export type PublicContentUpdateSource = "catalog" | "hero" | "all";

export function dispatchPublicContentUpdate(
  source: PublicContentUpdateSource = "all"
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(PUBLIC_CONTENT_UPDATED, { detail: { source } })
  );
}
