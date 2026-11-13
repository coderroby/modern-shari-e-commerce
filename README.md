# NOOLAM — Kanchipuram Silk Saree Website

A single-page e-commerce experience for **NOOLAM**, a Kanchipuram (Kanjivaram)
pure zari handwoven silk saree house — *"Woven for the Divine."*

**Live site:** https://coderroby.github.io/modern-shari-e-commerce/

## Project structure

```
.
├── index.html            # Semantic markup for all sections (no inline CSS/JS)
├── assets/
│   ├── css/
│   │   └── main.css      # Design tokens, layout, components, responsive rules
│   ├── js/
│   │   └── main.js       # Catalogue data + app logic (vanilla JS, no deps)
│   └── images/           # Photography as real files (WebP, web-optimized)
│       ├── hero-showroom.webp        store-front.webp
│       ├── loom-weaver.webp          look-ivory-elephant.webp
│       ├── mood-wedding-edit.webp    mood-kanchipuram-icons.webp
│       ├── mood-banarasi-heirlooms.webp
│       ├── mood-festive-radiance.webp
│       ├── mood-zari-signatures.webp mood-bridal-elan.webp
│       ├── silk-magenta-shot.webp    silk-palace-check.webp
│       ├── silk-benares-gold.webp    silk-korvai-checks.webp
└── README.md
```

Conventions followed: assets are **never embedded in code** (no base64/data-URI
imagery), files are named semantically by role, and every source file carries a
header comment describing its responsibilities.

## Sections & features

1. **Hero** — "Woven for the Divine", documentary store photograph, ratings
   and shipping trust row, scrolling ticker
2. **Six Moods** — Wedding Edit, Kanchipuram Icons, Banarasi Heirlooms,
   Festive Radiance, Zari Signatures, Bridal Élan — each with its own photo
3. **Try the Look** — styled bundle with per-piece add-to-bag and wishlist
4. **Pick a Silk** — featured sarees with dedicated product photography
5. **The Rack** — filter chips plus **live search and price/name sorting**;
   every piece shows a real photograph
6. **Product detail** — photo view with size selection and front/back toggle
7. **The Muse** — "Feel the drape" film frame, scrolling columns and reels
8. **Bridal Collection** carousel
9. **The Weave** — the loom story with weaver photography and store facts
10. **Word of Mouth** — customer testimonials
11. **FAQ** — accordion (zari, delivery, video-call shopping, returns, care)
12. **Visit the Store** — address, hours and contact with storefront photo
13. **Loom Letters** — newsletter signup with validation
14. **Bag drawer** — slide-out bag with line items, quantities and totals;
    **wishlist** hearts with a live nav counter; back-to-top button

## Run locally

No build step. Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages**, served from the `main` branch (root). Feature work
lands on a branch first (this redesign was built on `redesign-v2`) and reaches
the live site by merging into `main`.

## Notes

- Prices are in INR (₹) as shown on the original showcase.
- The site is a faithful front-end recreation built from a public design
  showcase; photography is AI-generated imagery art-directed to a candid,
  documentary standard, not the original store's photographs.
- Static site only — no backend, no user data is collected, and no secrets
  or credentials exist anywhere in this repository.
