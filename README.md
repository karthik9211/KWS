# Karthikeya Weds Sowndharya — Cinematic Wedding Website

## Quick preview
Open `index.html` in Chrome, Edge, or Safari. All local images and website code are included. Google Fonts require internet access.

## Publish on GitHub Pages
1. Open https://github.com/karthik9211/KWS
2. Upload the **contents** of this folder (index.html, style.css, script.js, assets/) into the repository root. Do not upload the ZIP alone.
3. Commit changes on `main`.
4. In Settings → Pages, choose Deploy from a branch → `main` → `/ (root)` → Save.
5. Once deployment completes, check https://karthik9211.github.io/KWS/

## Important limitations
- This is a functional front-end preview, **not a live deployed site**.
- The hero uses the temple artwork in `assets/temple.webp`; its responsive scroll animation starts with a blue sky and flying birds, then zooms toward the entrance and reveals the couple's names. The navigation overlays the sky without the old image text. The invitation artwork remains a raster image. The original screenshot's wrong date is excluded from the page; the event details below use **December 19, 2026**.
- The RSVP form currently saves data only to the visitor's browser localStorage. **It does not send responses to the couple.** Connect a form endpoint or backend (e.g. Formspree, Google Apps Script, Netlify Forms on Netlify) before sending invitations. GitHub Pages does not itself process form submissions.
- Hotel buttons link to live hotel search results rather than claiming specific hotel availability.
- Desktop and mobile CSS breakpoints are included, but full device/browser QA is still required.
