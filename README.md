# Atelier 3D

A minimal, bright, premium showcase website for exploring interactive 3D models
in the browser. Built with Next.js (App Router), TypeScript, and Tailwind CSS.
Showcase only — visitors can orbit and zoom the models; there is no download,
upload, payment, login, or backend of any kind.

The 3D viewer is powered by Google's `<model-viewer>` web component
(`@google/model-viewer` npm package).

## Project structure

```
app/
  layout.tsx            Root layout + global metadata
  page.tsx              Homepage (hero, gallery, about)
  models/laptop/page.tsx  Model detail page with the large viewer
components/
  ModelViewer.tsx       Client wrapper around <model-viewer>
                        (lazy-load, spinner, error state, reset view,
                        auto-rotate toggle, interaction hints)
  Navbar.tsx            Minimal sticky navbar
  Footer.tsx            Minimal footer
  Hero.tsx              Homepage hero with live 3D preview
  ModelCard.tsx         Gallery card + "Coming soon" placeholder card
lib/
  models.ts             Static model metadata (single source of truth)
public/
  models/laptop.glb    The actual 3D model (724 KB, glTF 2.0 binary)
  images/laptop-preview.png  Rendered preview thumbnail (1200x800)
```

## Install

Requires Node.js 18.18+ (tested with Node 24).

```bash
cd 3d-showcase
npm install
```

## Run (development)

```bash
npm run dev
```

Then open http://localhost:3000.

## Build (production)

```bash
npm run build
```

`npm run build` must complete with zero errors before deploying. It produces
a fully static site in `out/` (no Node server needed at runtime).

To preview the static export locally:

```bash
npx serve out
```

## Deploy

The app is configured for static export (`output: "export"` in
`next.config.ts`), so it can be hosted on any static host. Deploy options:

- **GitHub Pages** (see below).
- **Vercel**: import the repository, framework preset "Next.js", no extra
  configuration.
- **Any static host**: upload the contents of `out/` after `npm run build`.

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which builds the
static export and deploys it to GitHub Pages on every push to `main`.

One-time setup:

1. Create a GitHub repo and push this directory as the repo root:
   ```bash
   git remote add origin git@github.com:<user>/<repo>.git
   git branch -M main
   git push -u origin main
   ```
   (Or: `gh repo create <repo> --public --source=. --push`)
2. On github.com, go to **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site will be live at
   `https://<user>.github.io/<repo>/`.

How the sub-path works: GitHub Pages project sites are served under
`/<repo-name>/`, so the workflow sets `NEXT_PAGES_BASE_PATH` and
`NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` automatically (derived from
`github.event.repository.name`). `next.config.ts` applies it to `basePath` /
`assetPrefix`, and `lib/site.ts` prefixes hand-built asset URLs (the GLB and
preview image). No manual configuration is needed when renaming the repo —
just push again. Local builds without those env vars keep working at `/`.

## Adding or replacing the 3D model (GLB file)

1. Export or obtain your model as a **glTF 2.0 binary** (`.glb`).
   Keep it reasonably sized (a few MB at most) so it loads fast on mobile.
2. Copy it into the project:
   ```bash
   cp your-model.glb public/models/laptop.glb
   ```
   The viewer loads it from `/models/laptop.glb`. To add a *new* model instead
   of replacing, place it under `public/models/<slug>.glb` and register it in
   `lib/models.ts` (see below).
3. Generate a preview thumbnail (optional but recommended for the gallery
   card). If you have Blender available:
   ```bash
   blender --background --python render_preview.py
   ```
   and save the PNG to `public/images/<slug>-preview.png`.
4. Register the model in `lib/models.ts` — add an entry with `slug`, `name`,
   `description`, `longDescription`, `glbPath`, and `previewImage`.
5. Create a detail page at `app/models/<slug>/page.tsx` (copy
   `app/models/laptop/page.tsx` and swap the slug), or generalize the route
   to `app/models/[slug]/page.tsx`.
6. Run `npm run build` to verify, then deploy.

## Notes

- No analytics, tracking, or external font/CDN requests — the UI uses the
  system font stack and ships only its own assets.
- The viewer respects `prefers-reduced-motion` (auto-rotate starts off).
- Touch gestures work out of the box (`touch-action="pan-y"` keeps vertical
  page scroll usable on mobile).
