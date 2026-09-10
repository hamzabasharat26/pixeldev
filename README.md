# Pixel Dev Solutions — marketing site

Next.js 16 (App Router, TypeScript, Turbopack, React Compiler) · Tailwind v4 ·
Resend · `@vercel/analytics`. Statically rendered, deploys to Vercel on
`pixeldevsolutions.tech`.

## Local setup

```bash
nvm use 22          # Node 20.9+ required; 22 recommended
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY when you have one
npm run dev                  # http://localhost:3000
```

| Command | Does |
|---|---|
| `npm run build` | Production build (React Compiler runs via Babel — ~1 min) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run media` | Rebuild derived media from `media-src/` (see below) |

## Where things live

```
app/                 routes; each page.tsx owns its <Metadata> + JSON-LD
  layout.tsx         fonts, Org + WebSite JSON-LD, Header, Footer, ScrollProgress
  opengraph-image.tsx / apple-icon.tsx / icon.svg
  work/[slug]/opengraph-image.tsx   per-project share art
  sitemap.ts / robots.ts
components/
  layout/            Header (floating pill), MobileNav (vaul drawer), Footer, SkipLink
  sections/          one file per homepage / page section
  ui/                Button, Card, Tag, Eyebrow, SectionHeading, Counter, Marquee,
                     Reveal, ScrollProgress, Logo, Prose, JsonLd
  media/             AutoVideo, ProjectCard
content/             ALL copy + data. Edit these, not the components.
  site.ts            company facts (email/phone/address) + nav + hero stats + SEO strings
  services.ts        the six services (homepage bento + /services deep blocks)
  projects.ts        14 case studies
  testimonials.ts    empty by default — section hides until you add real quotes
  faq.ts  process.ts  values.ts  stack.ts
lib/                 cn() (utils.ts), SEO + JSON-LD builders (seo.ts)
scripts/media/       the media pipeline + manifest
```

Every phone / email / address / tagline string comes from `content/site.ts`.
Layout `<title>`/`description`/`keywords` read from there too. Never hardcode.

## Design system

`app/globals.css` `@theme`. The site runs **light**: white and Anthropic-family
cream, with navy kept as an anchor rather than a ground. The concept is still
**"the detector's view"** — corner brackets (`.det-frame`), telemetry readouts
(`.text-readout`), glass panels (`.glass-paper`) — but the feed is now a screen
sitting on a light page instead of the page itself.

Both brand hues are sampled from `public/brand/logo-src-light.jpeg`:

- **Navy `--color-navy: #0a284a`** — the logo's dominant pixel.
- **Mustard `--color-brand-gold: #e7a23b`** — the logo's "DEV". This token is
  for the **logo artwork only**. It is ~2.2:1 on white, which WCAG 1.4.3
  permits for a logotype and for nothing else.
- The UI accent is the **mustard-brown** `--color-amber-*` scale, which is the
  logo gold deepened until it can carry text and fills. The key name is legacy:
  retuning a `@theme` value regenerates every dependent utility, whereas
  renaming the key silently deletes it with a green build *and* a green lint.
  The value is the source of truth, not the name.
- `--color-signal: #4fc3e8` is the machine's own mark — measured data and
  tracking frames, and **only on navy**. On white it drops to ~2:1, so light
  surfaces substitute `--color-clay-600`.

Contrast pairs are hand-checked, and two are load-bearing: `--color-faint` is
tuned against `--color-paper-2` (the darkest ground it lands on), and the
primary button's gradient stops are all ≥4.5:1 against white — axe cannot
evaluate contrast over a gradient, so lightening a stop needs the maths redone.
The button hover **darkens** for that reason; a brightness lift breaks it.

**Motion.** GSAP drives the hero's single load timeline (`HeroReveal`) and the
round trailing cursor (`components/ui/Cursor.tsx`); `motion` drives the /work
filter, where animation shows what actually changed. The cursor removes itself
on coarse pointers and under reduced motion, and only hides the native cursor
once it has confirmed it replaced it — so a JS failure can never leave a
visitor with no pointer.

Type: Space Grotesk (display) + Fraunces italic (available for an `<em>` accent
word, used sparingly) + Inter (body) + JetBrains Mono, which is reserved for
genuinely machine-voiced text — readouts, tags, and **measured figures only**.
`MetricValue` enforces that last rule: a phrase like "Every piece" gets the
display face, not a tabular-numeral treatment that implies a reading.

Sections alternate a paper ground and a navy ground, hairline-separated.
Reveal-on-scroll is a pure-CSS `animation-timeline: view()` (no JS; degrades to
visible) and animates **transform only** — a fade drops text below its contrast
ratio mid-animation. Marquees are CSS-only, pause on hover, freeze under
reduced motion.

## Media pipeline

Raw source footage lives in **`media-src/`** (git-ignored — kept on the owner's
machine, not deployed). Only the derived, size-budgeted assets under
`public/work/**`, `public/services/*.webp` and `public/og.jpg` are committed.

```bash
node scripts/build-media.mjs sheets   # contact sheets → scripts/media/_sheets/, with per-tile timestamps
node scripts/build-media.mjs build    # (re)generate everything into public/ (includes thumbs)
node scripts/build-media.mjs thumbs   # just the 800px covers/posters
node scripts/build-media.mjs check    # budget check only, nonzero exit on breach
```

`thumbs` is the one step that reads from `public/` rather than `media-src/`: it
derives `cover-800.webp` / `poster-800.webp` from the committed 1600px files, so
it runs on a clean checkout with no raw footage. Those small variants matter
because the hero panel and work-strip images are served `unoptimized` (keeping
the LCP image off the image-optimiser's critical path) and a `<video poster>`
attribute is fetched even under `preload="none"` — in both cases the browser
gets exactly the file we name, so the right width has to exist on disk.

Timestamps are hand-picked in `scripts/media/manifest.json`. Windows: if ffmpeg
isn't on PATH, set `FFMPEG_BIN` / `FFPROBE_BIN`.

## Add a project (under 5 minutes)

1. Drop the source video / stills anywhere under `media-src/clips/<name>/`.
2. Add an entry to `scripts/media/manifest.json` (`sourceType: "video"` with
   frame timestamps + a loop window, or `sourceType: "stills"` with 3 image
   paths). Run `node scripts/build-media.mjs sheets` then `build`.
3. Add an entry to `content/projects.ts` — copy an existing one. Client is
   `"Confidential"` unless you've cleared a real name; `metrics` describe a
   *capability*, not an audited outcome, unless you can back the number;
   `timeline` is an estimate. `media` is one call to the `media(slug, hasVideo)`
   helper. `featured: true` puts it in the homepage "Selected work" stack.
4. The route, per-project OG image, sitemap entry, metadata and JSON-LD are all
   generated.

## Before launch — owner tasks

Search the repo for **`TODO(owner)`** — every unverified figure is marked. Also:

- `content/projects.ts` — all narratives are written from the supplied briefs +
  media. Confirm every metric marked `TODO(owner): confirm`, add real client
  names where allowed, set real `timeline` values.
- `content/site.ts` — `stats` + `proof` numbers are conservative and sourced
  from the LinkedIn page; confirm. `social.links` has only the LinkedIn URL —
  add the rest (feeds Organization JSON-LD `sameAs`).
- Location line: the site shows the Lahore office address + "Pakistan · working
  with clients worldwide". LinkedIn lists a US HQ — decide which is public.
- `app/privacy/page.tsx` + `app/terms/page.tsx` — standard drafts; legal review.
- `content/testimonials.ts` is empty. Add only quotes you have permission for.
- Resend: verify a sending domain and change `from:` in
  `app/contact/actions.ts` off `onboarding@resend.dev`.

## Deploy (Vercel)

1. Push to GitHub, import the repo in Vercel (framework auto-detected).
2. Vercel → Settings → Environment Variables: `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
3. Vercel → Settings → Domains: `pixeldevsolutions.tech` +
   `www.pixeldevsolutions.tech`.
4. At the `.tech` registrar's DNS: apex `@` → **A record** to the IP on Vercel's
   domain card (`vercel domains inspect pixeldevsolutions.tech`); `www` →
   **CNAME** to the value Vercel shows. SSL provisions automatically.
5. Set the primary domain + apex↔www redirect in Vercel.

## Notes

- Security response headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts`.
- The contact Server Action has a honeypot + in-memory per-IP rate limit
  (4/hour) + allow-listed budget/service + validation. The rate limit is
  per-instance; fine for the traffic level, swap for a shared store if needed.
- `next.config.ts` `images.dangerouslyAllowSVG` is on for the first-party
  `icon.svg`; the CSP + sandbox + attachment disposition neutralise it.
- Local `next start` logs a `/_vercel/insights/script.js` 404 — that script only
  exists on Vercel; it resolves in production.
- `npm audit` shows advisories in **dev-only** deps (`sharp`/libvips via the
  media script, `lighthouse`). `npm audit --omit=dev` is clean — nothing ships.
- QA tooling (`lighthouse`, `@axe-core/cli`, `sharp`) is in devDependencies.
  Run Lighthouse against a production build: `npm run build && npm start` then
  `npx lighthouse http://localhost:3000 --view`.
