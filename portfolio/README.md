# Muhammad Anas — Portfolio

Vite + React 18 + Tailwind v4 + Framer Motion + lucide-react. See `BRIEF.md` for
the full design/content spec this was built against.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy (Hostinger shared hosting)

1. `npm run build`
2. hPanel → File Manager → `public_html` → delete the default files.
3. Upload the **contents** of `dist/` (not the folder itself) so `index.html`
   sits at `public_html/index.html`.
4. Point the domain's DNS A record at the server IP shown in hPanel.
5. hPanel → Advanced → SSL → install the free Let's Encrypt cert, force HTTPS.

`.htaccess` (SPA fallback, gzip, long-lived caching for hashed assets) is
already included in `public/` and copied into every build.

## Outstanding before this ships

- `src/components/Experience.jsx` — fill in the real AMZ One Step dates
  (currently a `TODO` placeholder), and add a `note` if that role overlapped
  with Sohomax.
- `src/components/Hero.jsx` — swap the placeholder "MA" portrait block for a
  real square (~1000×1000, desaturated) photo.
- `public/og-image.png` — currently a generated placeholder in the site's
  palette; swap for a designed version if you want a portrait or different
  layout in link previews.
