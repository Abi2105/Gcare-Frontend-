# G-Care Frontend (React + Vite)

A React port of the public frontend of https://www.gcareindia.in/, matched to it pixel-for-pixel.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## How the match is achieved

- **Same stylesheets, same order**: `public/css/style.css` is the reference stylesheet, unmodified. It is loaded after
  Bootstrap 5.1.3, as on the live site, with modal-video, lightgallery and DataTables CSS. Small React-only additions are in `public/css/app.css`.
- **Same markup**: components reproduce the reference's DOM and class names. Static text pages (legal pages, NGO
  invitation, Centers "Commercial Module") are rendered from the reference markup in `src/content/*.html`.
- **Same libraries**: Bootstrap 5.1.3 JS (carousel, tabs, collapse, modal, toast) and lightgallery.js 1.x with
  the same plugins (`public/vendor/lightgallery`).
- **Per-page quirks**: the join form loads Bootstrap 4.0.0 after Bootstrap 5 (`useBootstrap4`). Legal pages use the
  shorter menu. Footer social icons appear only on Regions and the NGO pages. The Regions table pins column widths the
  way DataTables does.
- **Assets** in `public/assets` and `public/webfonts` were downloaded from the reference site's public files.

## Not reproduced

- Form submissions: the reference posts to a private Google Apps Script and upload server. Here, forms validate
  and confirm locally only.
- `/dashboard`: password-protected on the reference (HTTP 401), so it only shows a placeholder.

## Routes

`/`, `/team`, `/business`, `/centers`, `/regions`, `/gallery`, `/ngo-register`, `/ngo-register/join`, `/dashboard`,
`/terms-and-conditions`, `/privacy-policy`, `/refund-policy`. The old `*.html` URLs redirect to these.
