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

`app/globals.css` `@theme`. Brand hues are navy `#12294B` + amber `#E9A13C`
only. Around them: an ivory paper ground (`--color-paper`), warm ink/muted/faint
text, a `clay` secondary (`--color-clay`, Anthropic-family — icon chips + serif
accents), and a single cool `signal` hue (`--color-signal`) used **only** for
on-screen data / telemetry (project metrics, tracking overlays) — never a
button, link or heading.

Type: Space Grotesk (display) + Fraunces italic (one accent word per headline,
authored as `<em>`) + Inter (body) + JetBrains Mono (eyebrows, `01–04`, tags,
metric numerals).

Sections alternate an ivory ground and a navy ground, hairline-separated.
Reveal-on-scroll is a pure-CSS `animation-timeline: view()` (no JS; degrades to
visible). Marquees are CSS-only, pause on hover, freeze under reduced motion.

## Media pipeline

Raw source footage lives in **`media-src/`** (git-ignored — kept on the owner's
machine, not deployed). Only the derived, size-budgeted assets under
`public/work/**`, `public/services/*.webp` and `public/og.jpg` are committed.

```bash
node scripts/build-media.mjs sheets   # contact sheets → scripts/media/_sheets/, with per-tile timestamps
node scripts/build-media.mjs build    # (re)generate everything into public/
node scripts/build-media.mjs check    # budget check only, nonzero exit on breach
```

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
