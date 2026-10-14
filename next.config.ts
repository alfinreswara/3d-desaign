import type { NextConfig } from "next";

/**
 * Base path for sub-path deployments (GitHub Pages project sites are served
 * under /<repo-name>/). The deploy workflow sets NEXT_PAGES_BASE_PATH (and
 * NEXT_PUBLIC_BASE_PATH for client-side asset URLs in lib/site.ts)
 * automatically from the repository name. Empty for local dev.
 */
const pagesBasePath = process.env.NEXT_PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  /* Static export for GitHub Pages (and any other static host). */
  output: "export",
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath ? `${pagesBasePath}/` : undefined,
  images: {
    // next/image has no optimizer on static export; serve images as-is.
    unoptimized: true,
  },
  // NOTE: cacheComponents and partialPrefetching (the Next 16 caching/PPR
  // architecture) cannot be enabled together with output: "export".
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
