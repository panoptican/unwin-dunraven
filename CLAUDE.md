# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for the Unwin-Dunraven Literary Ecclesia, a literary organization that publishes PLINTH journal. The site is a single-page design with full-viewport sections that pin during scroll.

## Development

This is a vanilla HTML/CSS/JS static site with no build process. To develop:

```bash
# Serve locally (any static server works)
python3 -m http.server 8000 --directory src
# or
npx serve src
```

Then open http://localhost:8000

## Architecture

### Visual Effects
- **triangles.js**: Generates animated canvas background on cover section. Uses randomColor library to draw monochrome triangles that animate on load/resize. The triforce object manages canvas creation, sizing, and iterative drawing.
- **scripts.js**: Initializes ScrollMagic for section pinning - each `.section` div pins at top of viewport during scroll.

### Dependencies (vendored in src/scripts/)
- jQuery (jquery.min.js)
- ScrollMagic (scrollmagic.min.js) - scroll-triggered animations
- randomColor (randomcolor.js) - color generation for canvas triangles

### Typography
Custom web fonts (Averia Serif Libre family) are self-hosted in `src/type/` with full format support (woff2, woff, ttf, eot, svg).

### Analytics
Plausible Analytics is loaded for unwin-dunraven.com domain tracking.
