# Pixel Dev Solutions — marketing site

Next.js 16 (App Router, TypeScript, Turbopack) · Tailwind v4 · Motion · Lenis ·
Resend. Statically rendered, deployed to Vercel on `pixeldevsolutions.tech`.

## Local setup

```bash
nvm use 22          # Node 20.9+ required; 22 recommended
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY when you have one
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | Does |
|---|---|
| `npm run build` | Production build (React Compiler runs via Babel, so it's ~1–2 min) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |

## Where things live

```
app/                 routes; each page.tsx owns its <Metadata> and JSON-LD
  layout.tsx         fonts, Org + WebSite JSON-LD, Lenis, Header, Footer
  opengraph-image.tsx / apple-icon.tsx / icon.svg   generated share + tab art
  sitemap.ts / robots.ts
components/
  layout/            Header, MobileNav, Footer, SmoothScroll, SkipLink
  sections/          one file per homepage / page section
  ui/                Button, Card, Tag, Eyebrow, SectionHeading, Counter, Marquee, Logo
  media/             AutoVideo, ProjectCard
content/             ALL copy + data. Edit these, not the components.
  site.ts            company facts (email, phone, address) + nav + homepage stats
  services.ts        the six services (homepage cards + /services deep blocks)
  projects.ts        case studies + placeholders
  testimonials.ts    empty by default — section hides until you add real quotes
  faq.ts  process.ts  values.ts  stack.ts
lib/                 cn(), motion variants, SEO + JSON-LD builders
```

Every phone / email / address string comes from `content/site.ts`. Never hardcode
them in a component.

## Add a project (under 5 minutes)

1. Put the media in `public/work/<slug>/`:
   - `cover.webp` — 1600×1000, used on the case-study hero and OG image
   - `poster.webp` — 1280×720, the still shown before any loop video
   - optional `loop.webm` + `loop.mp4` — 2–6s, muted, no audio track, ≤3 MB
   - 2–5 gallery images, ~1600px on the long edge
2. Open `content/projects.ts` and copy one of the three `placeholder: true`
   entries. Fill in every field (the type comments give the word counts), point
   `media.*` at your files, set `placeholder: false`, and set `featured: true` if
   it should appear on the homepage.
3. That's it — the route, sitemap entry, metadata, and JSON-LD are generated.

The homepage "stacked deck" scroll effect turns on automatically once **three or
more** projects have `featured: true`. With one or two it shows a plain stack.

## Add a testimonial

Only publish quotes you have permission to use. Add entries to
`content/testimonials.ts`; the section appears on the homepage as soon as the
array is non-empty.

## Things flagged for you before launch

- `content/site.ts` → `stats` and `proof` use conservative, defensible numbers.
  Raise them as the portfolio grows.
- `content/projects.ts` → RallyLens and MagicQC narratives are written from the
  supplied screenshots. Confirm any hard figures, and add real client names if
  they'll allow it (currently "Confidential").
- `app/privacy/page.tsx` and `app/terms/page.tsx` are standard drafts. Have them
  reviewed for your jurisdiction.
- `content/site.ts` → `social.links` is empty. Add real profile URLs (they feed
  the Organization JSON-LD `sameAs`).
- Supply real logo SVGs if you want to replace the hand-authored mark in
  `components/ui/Logo.tsx` / `app/icon.svg`.

## Deploy (Vercel)

1. Push to GitHub, import the repo in Vercel (framework auto-detected).
2. Vercel → Settings → Environment Variables: add `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
3. Vercel → Settings → Domains: add `pixeldevsolutions.tech` and
   `www.pixeldevsolutions.tech`.
4. At the `.tech` registrar's DNS:
   - apex `@` → **A record** to the IP Vercel shows on the domain card
     (`vercel domains inspect pixeldevsolutions.tech` prints it — it is
     per-project now, don't use a memorized value). An apex cannot be a CNAME.
   - `www` → **CNAME** to the value Vercel shows (`cname.vercel-dns.com` or a
     project-specific variant).
5. In Vercel set the primary domain and the apex ↔ www redirect. SSL provisions
   automatically once DNS propagates.

## Verify a Resend send locally

Set `RESEND_API_KEY` in `.env.local`, restart `npm run dev`, submit the contact
form. Until you verify a sending domain in Resend, mail goes from
`onboarding@resend.dev` — fine for testing, switch to a verified
`@pixeldevsolutions.tech` sender for production (edit the `from:` in
`app/contact/actions.ts`).
