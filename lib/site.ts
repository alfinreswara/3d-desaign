/**
 * Base path for deployments served from a sub-path (e.g. GitHub Pages
 * project sites served under /<repo-name>/).
 *
 * Set NEXT_PUBLIC_BASE_PATH=/your-repo at build time. Empty for local dev
 * and root-domain deployments. Use withBasePath() for every manually
 * constructed absolute asset URL (GLB files, preview images, posters).
 * Next.js <Link> and its own _next/* assets are prefixed automatically
 * via the basePath option in next.config.ts.
 */
export const basePath: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
