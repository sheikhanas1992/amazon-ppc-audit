# Muhammad Anas — portfolio rebuild
## Build brief for Claude Code

Drop this file at the repo root. It is written to be read by Claude Code as the
standing spec for the project — point it here at the start of a session.

---

## 0. What this site is

**Audience:** hiring managers and recruiters in ecommerce and performance marketing. Some technical, most not. They are scanning, often on a phone, often with eleven other tabs open.

**The job of the page:** get a qualified hiring manager to open LinkedIn or book a call, having already formed the impression that this person is unusually competent.

**Not** a client-acquisition site. No service menu, no pricing, no lead funnel. One person, one track record, one clear availability signal.

**Voice:** first person, specific, quietly confident. Numbers over adjectives. No "passionate about leveraging data-driven strategies."

---

## 1. Why the current build feels static, and the order to fix it

The Lovable version specifies scroll fade/slide-up and nothing else. That is the single most common motion pattern on the web — it registers as "animated" while carrying zero information, and once it has played the page is inert. Layer on top of that: everything is a rectangle in a vertical stack, nothing responds to input, and the two largest visual objects are placeholder screenshots.

Work the fix in this order. Most people do it backwards and wonder why the site still feels like a template.

| Tier | Fix | Weight |
|---|---|---|
| **1** | One live artifact that performs the job rather than describing it | ~50% |
| **2** | Delete the fake dashboard screenshots | ~20% |
| **3** | Scroll choreography — pinning, assembly, parallax depth | ~20% |
| **4** | Micro-interactions — cursor spotlight, magnetics, hover reveals | ~10% |

Tier 1 is `CampaignOptimizer.jsx`, supplied. It is a real search-term report with a Before / After toggle: flip it and wasted-spend terms go to negative exact, bids move on the converters, and the summary recounts from 42.6% ACOS to 24.1%. It auto-plays once on scroll-in so a passive visitor still sees the point, then stays interactive.

That component **is** the portfolio. Everything else is supporting material.

---

## 2. Design system

Keep the existing direction. It works, it is already built, and replacing it wastes the week you already spent. Two additions only.

### Colour

```css
--ink:      #0d0d0f;  /* page */
--surface:  #151517;  /* cards, the optimiser panel */
--surface2: #1a1a1d;  /* nested blocks */
--bone:     #EDE8E0;  /* primary type — warm off-white, never pure white */
--muted:    #9a9a9e;  /* body copy */
--faint:    #6e6e73;  /* captions, table headers */
--accent:   #F5C542;  /* the sparkle mark. Nothing else. Ever. */

/* Data colours — used ONLY inside the optimiser panel */
--gain:     #9BE6B4;
--loss:     #E08D74;
```

The discipline that keeps this from going generic: the brand stays monochrome plus one yellow mark. Green and salmon exist **only inside the instrument**, where up and down have to mean something. If they leak into the rest of the page the whole thing turns into a SaaS dashboard.

### Type

- **Display:** Archivo Black or Anton — massive, uppercase, `leading-[0.82]`, `tracking-[-0.035em]`. The name should fill the viewport width.
- **Body:** Inter or General Sans, 16–17px, `leading-relaxed`.
- **Mono:** JetBrains Mono or IBM Plex Mono for every metric, label, tag and table cell. All uppercase with `0.14em` tracking.

Rule: mono carries all numbers and labels, display never sets a paragraph, body never sets a heading.

### Form

Radius 16–24px on cards. 1px borders at `white/[0.08]`. No shadows — on near-black they turn to mud. Section rhythm should **break**: alternate full-bleed and contained, wide and narrow. Uniform stacking is a large part of why it reads static.

---

## 3. Sections, with the motion each one owns

**1 — Hero** (`Hero.jsx`, supplied)
Cursor-tracked spotlight that genuinely reveals the name; character reveal on load; name drifts up and fades faster than scroll for depth. Portrait overlaps the wordmark.

**2 — About**
Two columns. Left: three-line statement + four bio paragraphs. Right: three skill blocks.
*Motion:* skill tags stagger in individually rather than as a block, 40ms apart. Left column enters ~120ms ahead of the right so the eye lands where reading starts.

**3 — Experience**
Two cards: Forsit, then AMZ One Step.
*Motion:* **pin each card while its content assembles** — company name, then description, then tags, then the panel. This is the section that most needs Tier 3; a pinned reveal makes four years of work feel like four years of work.
**Replace both laptop mockups.** Forsit gets `CampaignOptimizer`. AMZ One Step gets either a second variant or a simple animated ACOS-vs-spend chart that draws on entry.

**4 — Selected results**
*Read section 6 before building this one.*
*Motion:* count-up on entry, and a hover state that flips each card to reveal **what you actually did** to produce the number. A bare percentage is a claim; the method behind it is evidence.

**5 — Contact**
Large centred headline, availability line, pill CTA, footer links.
*Motion:* magnetic pull on the CTA (~8px). Nothing else — the page should land, not perform.

**Persistent:** the yellow sparkle badge, fixed. Give it a slow idle rotation and a springy scale on hover so it reads as a live mark rather than a sticker.

---

## 4. Motion rules

Single easing curve everywhere: `[0.16, 1, 0.3, 1]`. Mixing eases is what makes a site feel assembled by committee.

- Entrances 0.8–1.0s. Micro-interactions 0.2–0.4s. Nothing bounces except the segmented control.
- Stagger 40–90ms. Above 120ms it reads as slow.
- Everything scroll-triggered fires **once** — `useInView({ once: true })`. Re-animating on every pass is the fastest way to make a site feel cheap.
- `useReducedMotion()` at the top of every animated component, and honour it. The supplied files show the pattern.
- Never animate `width`, `height`, `top` or `left`. Transform and opacity only, or the phone will stutter.

---

## 5. Tech

Vite + React 18 + Tailwind + Framer Motion + lucide-react. Same stack Lovable produced, so you can migrate section by section rather than rewriting cold.

```
src/
  components/
    Nav.jsx  Hero.jsx  About.jsx  Experience.jsx
    CampaignOptimizer.jsx  Results.jsx  Contact.jsx
    SparkleBadge.jsx
  lib/motion.js        # shared easing + variants, imported everywhere
  App.jsx  index.css
```

**Floor, non-negotiable:**
- Lighthouse ≥ 95 on mobile. The optimiser is the only heavy component; nothing else should ship JS it doesn't need.
- Self-host fonts as `woff2`, Latin subset, `font-display: swap`. Do not use the Google CDN in production.
- Visible keyboard focus on every interactive element. The segmented control needs arrow-key support.
- Real `alt` text. Semantic `<section>` and one `<h1>`.
- No horizontal overflow at 375, 768, 1440.

---

## 6. Content to settle before building

**The six stat cards.** Your own notes say those numbers come from AMZ One Step's published case studies. Do not ship them on a personal site — a hiring manager who recognises them reads it as borrowed credibility, and your employer may read it less generously. Two honest options:

- Replace with accounts you personally ran, described by category, with the method named. Fewer and real beats six and borrowed.
- Cut the section. The Forsit and AMZ One Step cards plus a working optimiser already carry it.

**Name.** Site says MUHAMMAD ANAS, domain is sheikhanas.com, LinkedIn slug is `muhammad-anas`. Pick one for the display name and keep it consistent — a recruiter cross-referencing you should never have to guess.

**Also needed:** real portrait (square, ~1000×1000, desaturated to sit in the palette), real Calendly or mailto, OG image at 1200×630, favicon.

---

## 7. Deploying to Hostinger

Static build, so shared hosting is fine.

```bash
npm run build      # outputs to dist/
```

1. hPanel → **File Manager** → open `public_html`, delete the default files.
2. Upload the **contents** of `dist/` — not the folder itself. `index.html` must sit at `public_html/index.html`.
3. Point the domain: hPanel → Domains, DNS A record to the server IP shown in hPanel. Propagation up to a few hours.
4. hPanel → Advanced → **SSL**, install the free Let's Encrypt cert and force HTTPS.

**`vite.config.js`** — keep `base: '/'` for a root domain. If it ever lives in a subfolder, set `base: '/subfolder/'` or every asset 404s.

**`.htaccess`** in `public_html`. Not needed for a single page with hash anchors, but add it now so it's there when you add routes, and take the compression either way:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

Vite hashes asset filenames, so the one-year cache is safe. Never cache `index.html`.

**Worth considering:** keep the build on Vercel with GitHub auto-deploy and use Hostinger only for DNS and email — point sheikhanas.com there with a CNAME. Every push ships, no manual uploads, no cache confusion. Hostinger shared hosting works, it just means re-uploading `dist/` by hand every time you change a word.

---

## 8. Driving Claude Code

- Start the session with: *"Read BRIEF.md. We're rebuilding the portfolio at [repo]. Start with the Experience section."* Give it one section per session — full-site prompts produce a mediocre average of everything.
- Have it run `npm run build` and screenshot at 375 / 768 / 1440 before saying a section is done. Ask it to critique its own screenshot; it catches spacing and overflow problems that way that it will not catch by reading its own code.
- After each section: *"Now remove one thing."* Overbuilding is the default failure mode.
- Claude Design is the better place to explore visual direction — palette variants, type pairings, layout options — before committing to code. Settle the look there, build it here.
