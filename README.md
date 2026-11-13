# NOOLAM — Kanchipuram Silk Saree Website

A single-page e-commerce experience for **NOOLAM**, a Kanchipuram (Kanjivaram)
pure zari handwoven silk saree house — *“Woven for the Divine.”*

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
│       ├── hero-showroom.webp
│       ├── mood-wedding-edit.webp
│       ├── mood-kanchipuram-icons.webp
│       ├── mood-banarasi-heirlooms.webp
│       ├── mood-festive-radiance.webp
│       ├── mood-zari-signatures.webp
│       ├── mood-bridal-elan.webp
│       └── look-ivory-elephant.webp
└── README.md
```

Conventions followed: assets are **never embedded in code** (no base64/data-URI
imagery), files are named semantically by role, and every source file carries a
header comment describing its responsibilities.

## Sections

1. **Hero** — “Woven for the Divine”, showroom photograph, scrolling ticker
2. **Six Moods** — Wedding Edit, Kanchipuram Icons, Banarasi Heirlooms,
   Festive Radiance, Zari Signatures, Bridal Élan
3. **Try the Look** — a styled bundle with a live bag total (10% bundle saving)
4. **Pick a Silk** — featured sarees with prices
5. **The Rack** — filterable catalogue (sarees, half sarees, blouses, checks,
   zari & brocade)
6. **Product detail** — hanger view with size selection and front/back toggle
7. **The Muse** — “Feel the drape” film frame, scrolling columns and reels
8. **Bridal Collection**, **The Weave** (craft story), **Visit the Store**

## Run locally

No build step. Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages**, served directly from the `main` branch (root).
Every push to `main` updates the live site automatically.

## Notes

- Prices are in INR (₹) as shown on the original showcase.
- The site is a faithful front-end recreation built from a public design
  showcase; photography is AI-generated equivalent imagery, not the
  original store's photographs.
- Static site only — no backend, no user data is collected, and no secrets
  or credentials exist anywhere in this repository.
