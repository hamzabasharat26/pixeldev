# Pixel Dev Solutions — Website Rebuild Design Spec

Date: 2026-09-09
Status: built. All 6 phases complete + a code-review pass. `npm run build`
and `npm run lint` clean; axe-core WCAG 2.1 A/AA reports 0 violations on every
page. Remaining owner tasks are listed in `HANDOVER.md` and `README.md`.
Source of truth for scope: `CLAUDE_CODE_BRIEF.md` + `WEBSITE_CONTENT.md` (pasted by owner).
This doc records only the **reconciliation decisions** on top of that brief — where
reality (existing repo, supplied assets, new facts) diverges from the written brief.

---

## 1. Context

The repo already contained a partial build from an earlier session: a narrow
"Computer Vision Studio" site in JavaScript, forest-green palette, Bricolage/Public
Sans fonts, 8 fabricated CV projects with invented client quotes and founders,
`pixel-dev.com` everywhere. It is off-brief on positioning, brand, language, and
content. The brief says "replace it entirely; preserve nothing but real content."

Committed as checkpoint `76fe0ed` before rebuild.

## 2. Locked facts (from brief §1 + owner message)

| Field | Value |
|---|---|
| Company | Pixel Dev Solutions |
| Wordmark | PixelDev |
| Domain | `pixeldevsolutions.tech` |
| Email | `pixeldevsolutions@gmail.com` |
| Phone / WhatsApp | `+92 304070719` → `tel:+92304070719` → `https://wa.me/92304070719` |
| Office | Al Kabir Group Heights, Office 302, Lahore, Pakistan |
| Short location line | Pakistan · Working with clients worldwide |
| Positioning | Software studio — web, mobile & AI, engineered end-to-end |

Phone rendered verbatim, no validation UI, no digit changes.

## 3. Stack (final)

Next.js 16.3.4 (App Router, Turbopack default, **TypeScript**) · React 19.2 ·
Tailwind v4 (`@theme` tokens) · `motion` (replaces `framer-motion@13`) · `lenis` ·
`lucide-react` · `resend` (server action) · `@vercel/analytics` · React Compiler on
(`reactCompiler: true` + `babel-plugin-react-compiler`).

### Next 16 specifics honored
- `params` / `searchParams` are async — `await params`.
- `opengraph-image` / `icon` receive `params` and `id` as Promises.
- `sitemap` `generateSitemaps` `id` is a Promise (not used — single sitemap).
- No `middleware`/`proxy` (not needed). No `cacheComponents` (static generation is
  the default and sufficient; opting in is not rename-only and can break builds).
- `next/image`: config `formats`, `qualities` (default is `[75]` only now).
- Turbopack default — no webpack config, no `--turbopack` flag.
- Next 16 no longer overrides `scroll-behavior`. Lenis owns smooth scroll; CSS must
  NOT set `scroll-behavior: smooth`. Reset Lenis to top on route change.

## 4. Deviations from the written brief

| # | Brief | Decision | Why |
|---|---|---|---|
| 1 | TypeScript | Full JS→TS. Delete old `.js/.jsx`, new `tsconfig.json`, `next.config.ts` | Brief mandate |
| 2 | StatsBar `[50]+ projects` / `[30]+ clients` | **Honest-minimal**: `6` disciplines · `24h` reply · `2` products in production · `<2s` median load (measured Phase 5). No unprovable counts. All in `content/site.ts` with `TODO` markers | Owner: "choose best", 2 real projects only, under-claiming beats over-claiming |
| 3 | ProofBand `+50%` / `<2s` / `100%` | Reframe around real RallyLens / MagicQC outcomes + defensible studio claims | No invented numbers |
| 4 | Testimonials section | Component built; `content/testimonials.ts` ships `[]` → section renders `null`. Owner adds real quotes later | Brief: never fabricate |
| 5 | Owner supplies `logo-{light,dark}.svg` | Recreate the mark as clean hand-authored SVG (chevron `>` + amber square + `PIXELDEV` / `SOLUTIONS` wordmark), light + dark, from `final_dark.jpeg`. Drives favicon + OG | Only JPEGs supplied; SVG needed for crisp scaling + `next/og` |
| 6 | Location line only | Full postal address on `/contact`, footer, JSON-LD `PostalAddress`. Short line kept for hero eyebrow / compact spots | Owner provided office address |
| 7 | Deploy to Vercel | Wire all config (`metadataBase`, sitemap, robots, OG) + README deploy steps. Do NOT run deploy or touch DNS | Owner's credentials / registrar |
| 8 | Real projects | Ship **RallyLens** + **MagicQC** as real case studies + **3 labelled placeholder** entries in the real schema. Delete the 8 fabricated projects + fake quotes/founders | Reality; owner will supply more projects later |
| 9 | — | All marketing copy authored from `WEBSITE_CONTENT.md` base, tightened, then `humanizer` pass (Phase 5) | Owner: "you are the content creator, punchy" |

### Not pulled in
Figma / Canva / Supabase / Apollo MCPs — static marketing site, no DB, no design
file supplied. Available if owner later wants a Figma source or Canva OG art.

## 5. Real projects — content basis

### RallyLens (`content/projects.ts` slug `rallylens`)
Category: Computer Vision. Broadcast-style tracking overlay for racket sports
(tennis / padel / wall drills). From supplied `hero.jpg` + `dashboard.jpg`:
ball-speed readout (km/h, peak), rally / shot / bounce / wall-hit counters,
wall-target geometry (square/triangle/circle, tracked distances in cm), per-player
detection + pose + role colouring (coach vs student), bird's-eye minimap, event
timeline (bounce / contact / wall-on-target), camera homography confidence.
Assets: `public/work/rallylens/` — cover + poster from `hero.jpg` / `dashboard.jpg`,
loop from `public/clips/padel-8s.mp4`.
Metrics + narrative: written Phase 4, marked as needing owner confirmation of any
hard numbers.

### MagicQC (`content/projects.ts` slug `magicqc`)
Category: AI / Computer Vision (or "Web" for the platform side — pick one primary,
tag both). Automated garment quality control. From `MagicQC_desktop_app.png` +
`magic_online_web_app.png`: operator + table session, brand/client picker
(adidas, Puma, Under Armour, Reebok, Zara, Pull&Bear …), article type / style /
size, live POM measurement table (shoulder, hem, length, cuff, waist, chest …)
with per-row tolerance ± and pass/fail result, garment-colour + size selectors,
"Start Measurement" / "Next Piece" / "Next Article" flow.
Assets: `public/work/magicqc/` — covers from the two PNGs, loop from
`public/clips/magic-8s.mp4` or `tshirt-8s.mp4`.

### Placeholders (3)
`slug: project-three|four|five`, `client: "Placeholder"`, copy clearly marked
`[PLACEHOLDER — replace in content/projects.ts]`, real schema shape, `featured:
false` so they stay off the homepage stack until real.

## 6. Design system

Brief §4 is followed exactly (it derives from the real logo). Summary + the
choices made on axes the brief leaves open:

- **Palette**: navy `#12294B` primary, amber `#E9A13C` accent, dark surfaces
  `#0A1223 / #101B30 / #16233D`, borders `#243349`, neutral greys per brief.
  Contrast rules from §4.1 enforced (amber never body-text on white; amber buttons
  take navy text; white on navy everywhere).
- **Type**: Space Grotesk (display), Inter (body/UI), JetBrains Mono (data:
  counters, tech tags, timeline labels, step numbers). Variable fonts via
  `next/font/google`, `--font-*` CSS vars, `display: swap`, preload display only.
- **Concept — "instrument panel for the studio"**: navy is the screen, amber is
  the active/on-target signal (mirrors how RallyLens itself uses amber). Precise
  hairline alignment, real-data framing, generous quiet space. Boldness spent in
  exactly two places: the hero and the stacked-work deck. Everything else
  disciplined and calm.
- **Motion**: one orchestrated hero load sequence; `Reveal` (opacity + 24px rise,
  500ms, expo-out, once) used sparingly on section entrances, not every card;
  hover state changes only where they signal interactivity. Marquee = CSS
  translateX, pause on hover. Stacked deck = scroll-linked scale. All of it off
  under `prefers-reduced-motion` (opacity only).
- **Mono eyebrows / `01–04` / `→`**: brief mandates these. Kept, but made
  information-bearing — eyebrow carries a real section label, the numbered steps
  are a genuine sequence (Discover → Design → Build → Ship), `→` only on true
  "go somewhere" links.

## 7. Architecture

```
app/
  layout.tsx            fonts, <html lang>, JSON-LD (Org + WebSite), SmoothScroll, Header, Footer, skip-link, Analytics
  page.tsx              homepage — 11 sections in fixed order (brief §6.1)
  globals.css           Tailwind v4 @theme tokens + base type + reduced-motion
  services/page.tsx     6 anchored deep blocks, JSON-LD Service
  work/page.tsx         filter pills (client component island), project grid
  work/[slug]/page.tsx  generateStaticParams + generateMetadata + JSON-LD CreativeWork/BreadcrumbList
  work/[slug]/opengraph-image.tsx
  about/page.tsx        story, values(4), NO team section (no real photos), Process, Stats
  contact/page.tsx      2-col; server action (Resend) + honeypot + in-memory rate-limit + a11y validation
  careers/page.tsx      simple prose ("no open roles" honest empty state + how to reach us)
  privacy/page.tsx  terms/page.tsx   prose, max-w-[70ch]
  not-found.tsx
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  layout/   Header  MobileNav  Footer  SmoothScroll  SkipLink
  sections/ Hero  StatsBar  ServicesGrid  StackedWork  ProcessSteps  ProofBand
            StackMarquee  Testimonials  FaqAccordion  CtaBand
  ui/       Button  Card  Tag  SectionHeading  Eyebrow  Counter  Reveal  Marquee  Logo
  media/    AutoVideo  ProjectCard
content/    site.ts  services.ts  projects.ts  testimonials.ts  faq.ts  values.ts
lib/        utils.ts (cn)  motion.ts (variants, easing)  seo.ts (metadata helper, JSON-LD builders)
```

Every phone/email/domain/address reference imports from `content/site.ts`. No
hardcoded contact strings in components.

### Stacked work (brief §7)
Framer-Motion-equivalent (`motion/react`) `useScroll` + `useTransform` + sticky.
Each card `position: sticky; top: 0` inside a tall track; scroll progress drives
`scale` down on outgoing cards (`origin-top`), small `top` offset per index for
the peek. `< 768px` and `prefers-reduced-motion` → plain vertical stack, normal
reveal, no sticky, no scale (via `useMediaQuery` + `useReducedMotion`). No
`overflow: clip` on any ancestor of the sticky element. `will-change: transform`
only on the animated card.

## 8. Phasing (stop + `npm run build` + report after each)

1. Foundation — clean slate, config, tokens, fonts, layout shell, UI primitives, Logo SVG
2. Homepage §1–5 — Hero, StatsBar, ServicesGrid, StackedWork, ProcessSteps
3. Homepage §6–11 — ProofBand, StackMarquee, Testimonials, FaqAccordion, CtaBand
4. Inner pages + data — content files, RallyLens + MagicQC case studies, all routes, contact server action
5. SEO / a11y / perf — metadata, sitemap/robots, dynamic OG, JSON-LD, Lighthouse, humanizer copy pass
6. Handover — README, `.env.example`, decisions note, `/verify` + `/code-review`

## 9. Acceptance (brief §14)

`npm run build` clean · 360/768/1280/1920 · stacked section degrades on mobile ·
copy from `WEBSITE_CONTENT.md`, no lorem · contact facts from `content/site.ts`
verbatim · contact form validates + success/error · keyboard nav complete ·
reduced-motion kills transforms + autoplay · Lighthouse mobile Perf ≥ 90 / A11y ≥
95 / SEO 100 · sitemap + robots + JSON-LD + OG valid · README "add a project" < 5 min.
