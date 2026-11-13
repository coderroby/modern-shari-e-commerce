# NOOLAM — Kanchipuram Silk Saree Website

A single-page e-commerce experience for **NOOLAM**, a Kanchipuram (Kanjivaram) pure zari handwoven silk saree brand — "Woven for the Divine."

This is a recreation built from the public showcase (screenshots and section prompts) of the original design concept. Product and lifestyle imagery is AI-generated.

## Run it

It's a single self-contained file — just open `index.html` in a browser, or serve the folder with any static server:

```sh
npx serve .
# or
python3 -m http.server 8000
```

No build step, no dependencies.

## Sections

1. **Hero** — grand saree showroom, glass pill navbar, maroon/gold scrolling ticker
2. **Six Moods. Timeless Drapes** — six sarees in golden temple-arch (gopuram) frames, hover lift & glow
3. **Try the Look.** — drag carousel (centre sharp, sides blurred) with an "In this look" bundle panel (₹69,000 → ₹62,100)
4. **Pick a Silk** — fanned arc of bold colour cards with 3D cursor tilt; `+` drops a saree into the bag
5. **Every silk, on the rail.** — filter chips with counts, chrome rail with wooden hangers
6. **Rack detail** — click a hanger to lift it off the rail: Front/Back toggle, sizes 34–42, size-gated Add to Bag
7. **Feel the drape (The Muse Film)** — gold-framed 16:9 film, side photo columns scrolling in opposite directions, Sound Off/On toggle
8. **Silk, in motion. (The Muse Reels)** — five reels on a 3D curved arc, prev/pause/next, centre reel opens full screen
9. **The Bridal Collection** — curved arch-topped carousel with discount tags and Add to cart

Working bag count in the navbar, with toast feedback on every add.

## Tech

Plain HTML, CSS and JavaScript in one file (`index.html`) — no framework, no build tools.
