/** Site-level configuration. Change these values to rebrand the site. */

export interface CollectionConfig {
  name: string;
  metaNodeId: string;
  /** Content directories to include when building this collection's graph. */
  contentDirs: string[];
}

export const siteConfig = {
  /** Display name shown in title bars and landing page. */
  name: "hubris",
  /** Full domain for og:url and og:site_name. */
  domain: "hubris.paragarden.world",
  /** Base path for deployment (no trailing slash). E.g. "/hubris" if served at /hubris/. */
  basePath: "/hubris",
  /** ID of the meta/landing node (default collection). */
  metaNodeId: "meta/hubris",
  /** Per-collection overrides. */
  collections: {
    default: {
      name: "hubris",
      metaNodeId: "meta/hubris",
      contentDirs: ["meta", "world"],
    },
  } satisfies Record<string, CollectionConfig>,
} as const;

export type CollectionId = keyof typeof siteConfig.collections;

/** Prepend basePath to an absolute-path string. */
export function siteUrl(path: string): string {
  return siteConfig.basePath + path;
}

/** Detect active collection from <html data-collection="...">. Browser-only. */
export function getActiveCollection(): CollectionId {
  if (typeof document === "undefined") return "default";
  return (document.documentElement.dataset.collection as CollectionId) ?? "default";
}
