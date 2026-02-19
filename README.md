# Unwin-Dunraven Website

Static one-page website for the Unwin-Dunraven Literary Ecclesia.

## Local Development

1. Start a static server:

```bash
python3 -m http.server 8000 --directory src
```

2. Open `http://localhost:8000`.

No build step is required.

## Project Layout

- `src/index.html`: page markup, metadata, and structured data
- `src/styles.css`: layout, responsive behavior, and visual styling
- `src/scripts/scripts.js`: year injection and ScrollMagic section pinning
- `src/scripts/triangles.js`: animated triangle canvas in the cover section
- `src/images/`: logos and background textures
- `src/type/`: self-hosted webfonts

## Maintenance Guide

- Keep section pinning opt-in by adding `data-pin="true"` only to sections that should pin.
- Test on mobile and desktop after CSS updates (especially around `768px` width).
- Keep decorative animations optional: preserve reduced-motion handling in CSS and JS.
- Prefer compressed images and preserve `width`/`height` attributes to reduce layout shift.
- If content copy changes significantly, re-check metadata in `src/index.html`:
  - `meta description`
  - Open Graph (`og:*`)
  - Twitter card tags
  - JSON-LD organization block

## SEO Checklist (Quick)

- One clear `h1` on the page (already present, visually hidden for design reasons)
- Accurate `<title>` and `meta description`
- Canonical URL points to production domain
- Valid links with descriptive `aria-label` where needed
- Organization JSON-LD stays up to date with brand name, URL, and logo

## Deployment (Cloudflare Pages)

- `wrangler.toml` is configured for this project with `src` as the output directory.
- GitHub Actions deploys automatically on pushes to `main` via `.github/workflows/deploy-cloudflare-pages.yml`.

### Required GitHub Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If these are missing, deployment jobs will fail.
