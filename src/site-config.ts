/** Site-level configuration. Change these values to rebrand the site. */

export interface ContentGate {
  label: string;
  description: string;
}

export interface CollectionConfig {
  name: string;
  metaNodeId: string;
  /** Content directories to include when building this collection's graph. */
  contentDirs: string[];
}

export const siteConfig = {
  /** Display name shown in title bars and landing page. */
  name: "legacy",
  /** Full domain for og:url and og:site_name. */
  domain: "para.garden",
  /** Base path for deployment (no trailing slash). E.g. "/legacy" if served at /legacy/. */
  basePath: "/legacy",
  /** ID of the meta/landing node (default collection). */
  metaNodeId: "meta/legacy",
  /** Content gates: tags that require user acknowledgment before panel content is shown. */
  contentGates: {
    "cw:sexual-violence": {
      label: "Sexual violence",
      description: "This content includes depictions of sexual violence.",
    },
    "cw:suicide": {
      label: "Suicide",
      description: "This content includes discussion of suicide.",
    },
  } satisfies Record<string, ContentGate>,
  /** Per-collection overrides. */
  collections: {
    default: {
      name: "legacy",
      metaNodeId: "meta/legacy",
      contentDirs: ["meta", "world"],
    },
    research: {
      name: "research",
      metaNodeId: "meta/research",
      contentDirs: ["meta", "research"],
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
