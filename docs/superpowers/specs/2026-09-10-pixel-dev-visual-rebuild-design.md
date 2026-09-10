# Pixel Dev Solutions — Visual-Layer Rebuild Design Spec

Date: 2026-09-10
Status: **draft — awaiting owner approval**
Companion: `DESIGN_RESEARCH.md` (reference-site teardown), `design-refs/*.jpeg`
Supersedes the visual sections of `docs/superpowers/specs/2026-09-09-pixel-dev-website-design.md`.
That doc's architecture, routing, SEO, a11y and content-integrity rules **still stand** — this
spec changes the *skin*, the *imagery*, the *type system*, and the *project set*, not the app shape.

---

## 1. Why

The current build passes `build`, `lint` and axe, but it reads as a generic dark
Tailwind template:

1. **No imagery.** Every service and project card is text on flat color.
2. **One dead background.** Flat `#0A1223` navy with no layering, glow, grain or
   alternation — panels don't read as raised, they read as *the page*.
3. **Bare hero.** Mesh-gradient + text, no media, no atmosphere.
4. **No editorial voice in the type.** Correct fonts, no craft — no mixed
   weights, no accent word, no rhythm.

The reference teardown (`DESIGN_RESEARCH.md`) shows the fix is a re-skin, not a
re-architecture: **croge.dev** is the same positioning / brand family / stack and
gives us the structure; **aeyron.com** gives the depth and imagery techniques.

## 2. Locked decisions (owner-confirmed 2026-09-10)

| # | Decision |
|---|---|
| 1 | **Palette:** navy `#12294B` + amber `#E9A13C` stay the *only* brand hues. Build a full engineered scale around them (navy steps, near-black, warm off-white paper, warm neutrals) **plus one cool "signal" color reserved for data/telemetry UI only** — never brand, never CTA. |
| 2 | **Projects:** owner supplies client + metrics + outcomes per project. Spec ships a fill-in intake template + schema. Case studies built on receipt; visible `TODO(owner)` markers until then. Nothing invented. |
| 3 | **Positioning:** broad studio identity kept (6 disciplines), but hero + homepage narrative **lead with AI + computer vision** as the flagship. Tagline adopts LinkedIn's **"We Deliver What We Commit."** |
| 4 | **Sequencing:** this spec + `DESIGN_RESEARCH.md` get one approval, then phased build with `npm run build` + Lighthouse after each phase. |
| 5 | **Logo:** unchanged. Existing hand-authored SVG mark stays; navy + amber derive from it. |

## 3. Open questions for the owner (answer inline, then I finalise)

1. **HQ / location line.** LinkedIn says US; the site + supplied office address
   say Lahore, Pakistan; croge.dev uses "Pakistan · Worldwide". Which is the
   public line? Options: (a) keep Lahore address + "Pakistan · Working with
   clients worldwide" [current], (b) "US · Pakistan · Working worldwide",
   (c) drop the street address, keep only the region line. **Default if no
   answer: (a).**
2. **Lenis.** croge.dev achieves the whole aesthetic with **no smooth-scroll
   library** (pure CSS + IntersectionObserver). Recommendation: **remove Lenis**
   — less JS, no scroll-ownership complexity, better INP. Keep? **Default:
   remove.**
3. **Serif accent font.** croge sets one word per headline in **Fraunces
   italic**. Recommendation: add Fraunces (italic, one weight) via
   `next/font/google`. Alternative: no serif, amber-only accent word. **Default:
   add Fraunces.**
4. **Homepage featured projects (stacked deck needs 3+).** Candidates:
   RallyLens, MagicQC, Dock Vision AI (IEEE 1st place), + pick from the CV set
   (Safe Rail, Tire-Cord Fabric Defect, LiDAR Lane Detection, Vehicle Damage,
   HornetAI). **Which 3–5 lead the homepage?** Default: RallyLens, MagicQC,
   Dock Vision AI, Safe Rail.
5. **Service card imagery.** Use the AI-render PNGs in `public/services/`
   (`web.png` etc.), or real project screenshots per discipline? Default: renders
   for the 6 service cards, real screenshots everywhere else.
6. **Dock Vision AI + the two ZIPs** (`Drone HEXA`, `MagicQC Size Measurement`)
   — unzip and use? Default: yes, I'll inspect and place.

---

## 4. Direction

**"Instrument panel, warmly lit."** The studio as a calm, precise console: navy
is the screen, amber is the on-target signal, warm paper is the desk it sits on.
croge's editorial warm structure as the spine; aeyron's hero richness and
"every card has a render" discipline layered on.

- **Two grounds, alternating, hairline-separated.** Warm off-white "paper" for
  most sections; deep navy for hero, one mid-page proof band, final CTA, footer.
- **Depth kit:** 3–4% grain overlay, blurred amber + navy glow orbs, warm
  navy-tinted shadows, large radii on floating panels, `backdrop-blur` on nav
  and glass cards.
- **No empty cards.** Every card carries a real image in a rounded inner frame;
  hero cards and some grid cards bleed the image off one edge.
- **Boldness spent in two places only:** the hero and the stacked-work deck.
  Everything else stays disciplined.

## 5. Token system (`app/globals.css` `@theme`)

Replace the current token block. All values are sRGB hex. Navy `#12294B` and
amber `#E9A13C` are unchanged; every other value is a derived step, a warm
neutral, or the single new "signal" hue (decision #1). Full list in the tables
below.

### 5.1 Navy scale

| Token | Hex | Use |
|---|---|---|
| `--color-navy-ink` | `#070E1C` | near-black base, deepest sections |
| `--color-navy-900` | `#0A1730` | dark section ground |
| `--color-navy-800` | `#0E2044` | raised dark surface |
| `--color-navy` | `#12294B` | **primary**, unchanged |
| `--color-navy-600` | `#1C3A69` | dark hover / borders |
| `--color-navy-500` | `#2A5296` | lines on dark, muted accents |
| `--color-navy-300` | `#7C9BD0` | text on navy-ink (AA), captions |

### 5.2 Amber scale

| Token | Hex | Use |
|---|---|---|
| `--color-amber` | `#E9A13C` | **accent**, unchanged — fills, signal, glow |
| `--color-amber-300` | `#F4C57F` | gradient partner, hover glow |
| `--color-amber-600` | `#C27E22` | text-safe amber on paper |
| `--color-amber-700` | `#9A5F16` | text-safe amber small / focus ring |
| `--color-amber-glow` | `rgb(233 161 60 / 0.16)` | blurred orb, card corner wash |

### 5.3 Warm paper + neutrals (tuned toward amber, not croge's orange)

| Token | Hex | Use |
|---|---|---|
| `--color-paper` | `#F8F6F1` | page base (light sections) |
| `--color-paper-2` | `#F1EDE4` | alternating band |
| `--color-surface` | `#FFFFFF` | card fill on paper |
| `--color-surface-2` | `#F4F0E8` | inset panel / tag chip |
| `--color-line` | `#E4DDCF` | hairline on paper |
| `--color-line-2` | `#D3C8B4` | stronger hairline |
| `--color-ink` | `#161310` | warm near-black body text |
| `--color-muted` | `#514B40` | secondary text |
| `--color-faint` | `#6E6555` | eyebrow / meta / tertiary |

### 5.4 Dark-section surfaces

| Token | Hex |
|---|---|
| `--color-d-surface` | `#0E2044` |
| `--color-d-surface-2` | `#132A55` |
| `--color-d-line` | `#24406E` |
| `--color-d-text` | `#E8ECF5` |
| `--color-d-muted` | `#9DB0D0` |

### 5.5 Signal (the one new hue — data/telemetry UI ONLY)

| Token | Hex | Use |
|---|---|---|
| `--color-signal` | `#3EA6C4` | chart lines, live-tracking overlays, active telemetry dots in project media, "on" states in dashboard mocks |
| `--color-signal-dim` | `#2C6E86` | signal on dark |

**Rule:** `--color-signal` never appears on a button, a link, a heading, or any
brand surface. It is the color of *data on screen*, mirroring how RallyLens
itself renders tracking. If a component isn't showing measured data, it doesn't
use signal.

### 5.6 Effects tokens

```
--grain-opacity: 0.035;
--shadow-warm:  27 22 16;                 /* rgb for warm shadows on paper */
--shadow-sm:  0 1px 2px rgb(var(--shadow-warm) / .06), 0 2px 8px rgb(var(--shadow-warm) / .05);
--shadow-md:  0 4px 12px rgb(var(--shadow-warm) / .08), 0 12px 32px rgb(var(--shadow-warm) / .07);
--shadow-lg:  0 8px 24px rgb(var(--shadow-warm) / .10), 0 24px 60px rgb(var(--shadow-warm) / .10);
--radius-card: 16px;
--radius-panel: 28px;
--radius-frame: 12px;   /* inner image frame */
--ease-rise: cubic-bezier(0.22, 1, 0.36, 1);
```

### 5.7 Contrast rules (carried from the 2026-09-09 spec, still enforced)

- Amber is **never** body text on paper — use `--color-amber-600/700` for any
  amber text, and only for short labels / links.
- Amber buttons take **navy** text (`--color-navy`).
- White/`--color-d-text` on navy everywhere in dark sections.
- Focus ring stays the single global `--color-amber-700` 2px outline rule.
- Target: Lighthouse mobile A11y ≥ 95, axe 0 violations, all text ≥ 4.5:1
  (large ≥ 3:1).

## 6. Typography

| Role | Font | Load | Notes |
|---|---|---|---|
| Display | **Space Grotesk** | `next/font/google`, weights 500/700, `--font-display` | headings; tracking `-0.03em` on display, `-0.02em` on h2/h3 (tighter than now, per croge's `-2.1px`) |
| Accent word | **Fraunces** | `next/font/google`, `ital` weight 400–500, `--font-serif` | *one word per headline*, italic, optical size "soft". Decision #3. |
| Body / UI | **Inter** | existing, `--font-sans` | 400/500/600 |
| Data / meta | **JetBrains Mono** | existing, `--font-mono` | eyebrows (`+0.14em` uppercase), `01–04`, tech tags, metric numerals, timeline labels |

New utility classes in `globals.css`:

- `.headline` — display, `clamp(2.5rem, 1.5rem + 4.5vw, 4.25rem)`, line-height
  1.02, tracking `-0.03em`, `text-wrap: balance`.
- `.headline em` — `font-family: var(--font-serif)`, `font-style: italic`,
  `font-weight: 400`, tracking `-0.01em`. (Author accent words as `<em>`.)
- `.accent-amber` — `color: var(--color-amber-600)` on paper /
  `var(--color-amber)` on dark.

## 7. Global structure

### 7.1 `app/globals.css`

- Keep Tailwind v4 `@import "tailwindcss"` + `@theme`.
- Add: `body` paints `--color-paper`; `.on-dark` paints `--color-navy-900` +
  `--color-d-text`.
- Add `body::before` — fixed, `pointer-events:none`, `z-index:1`,
  `background-image` a base64 SVG fractal-noise (< 2KB), `opacity:
  var(--grain-opacity)`, `mix-blend-mode: soft-light`. Static — stays under
  `prefers-reduced-motion`.
- Add `.glow-orb` utility — absolutely-positioned, `border-radius:50%`,
  `filter: blur(80–140px)`, `opacity: .5`, color amber or navy. Decorative,
  `aria-hidden`, `pointer-events:none`.
- Marquee keyframes stay; add a second speed var.
- `.section` = `padding-block: clamp(4rem, 8vw, 7rem)`; `.section--band` adds
  `border-block: 1px solid var(--color-line)` + `background: --color-paper-2`.
- **Remove** any `scroll-behavior` (Lenis or native handles it; if Lenis is
  removed per decision #2, add `@media (prefers-reduced-motion: no-preference){
  html { scroll-behavior: smooth } }`).

### 7.2 `components/layout/Header.tsx`

- Becomes a **floating pill** on desktop (`aeyron`): `position: fixed; top: 12px;
  left: 50%; translateX(-50%)`, max-width `1180px`, width `calc(100% - 24px)`,
  `background: rgb(255 255 255 / .72)` on paper pages /
  `rgb(10 23 48 / .6)` on dark-hero pages, `backdrop-filter: blur(12px)`, 1px
  hairline, `border-radius: 9999px`, `--shadow-sm`.
- Scrolled state: slightly more opaque + `--shadow-md`.
- Active link: amber underline (2px, `border-radius:2px`), mono-cased label
  optional.
- Right side: one primary `LinkButton` "Start a project" (amber).
- Dark-hero detection stays (first section `data-hero-tone="dark"`).
- Mobile: unchanged behaviour (drawer), restyled to tokens.

### 7.3 `components/layout/Footer.tsx`

- Navy-ink ground, grain, one amber glow-orb bottom-left.
- 3 columns (unchanged links) + a large wordmark lockup + the tagline
  "We Deliver What We Commit." + contact block (address per decision #1).
- Hairline top.

### 7.4 Smooth scroll

- If decision #2 = remove: delete `components/layout/SmoothScroll.tsx` + `lenis`
  dep, drop the import from `app/layout.tsx`, add the reduced-motion-gated CSS
  `scroll-behavior`. Keep the route-change scroll-to-top (tiny `useEffect` in a
  small client component, or rely on Next default).
- If keep: leave as-is, just ensure no CSS `scroll-behavior` fights it.

## 8. Component specs (homepage order)

### 8.1 `Hero.tsx` — navy, full-bleed, one of the two "bold" moments

- Ground `--color-navy-ink`; full-bleed media layer:
  - Primary: a montage still or short muted loop built from the strongest
    project clips (see §10), OR `public/services/hero-bg.png` +
    `hero-robot.png` composited. `next/image` priority, `sizes="100vw"`,
    quality 75.
  - Overlay: `linear-gradient(180deg, rgb(7 14 28 / .45) 0%, rgb(7 14 28 / .82)
    60%, var(--color-navy-ink) 100%)` — text stays ≥ AA, bottom butts the next
    section.
  - Slow `scale(1) → scale(1.08)` on scroll (motion `useScroll`), off under
    reduced-motion.
- Two amber + navy `.glow-orb`s behind the copy.
- Content, left-aligned, `max-width: 60rem`:
  - Mono eyebrow row: `PIXEL DEV SOLUTIONS —— PAKISTAN · WORLDWIDE` (rule +
    text, `--color-d-muted`).
  - `.headline`: e.g. *"We build **computer vision** and AI systems that*
    *<em>ship</em> — and the full stack to run them."* (amber on "computer
    vision", Fraunces italic on "ship"). Final copy in §11.
  - Body, `--color-d-muted`, `max-width: 40rem`.
  - Two CTAs: primary amber "Start a project", ghost-light "See the work".
- **Glass stat card** overlapping the lower edge (translucent
  `--color-d-surface` @ .6, blur, hairline, `--radius-card`): 4 stats from
  `content/site.ts`, mono numerals, hairline vertical rules, `Counter` on view.

### 8.2 `StatsBar.tsx`

- If the hero glass card already carries the 4 stats, StatsBar becomes the
  **project strip** instead (see §8.4) OR is dropped from the homepage and kept
  for `/about`. Default: drop from homepage, keep on `/about` restyled.

### 8.3 Tech marquee — `components/sections/StackMarquee.tsx` + `ui/Marquee.tsx`

- Paper band (`.section--band`), hairline top/bottom.
- Mono eyebrow "THE STACK WE BUILD & MAINTAIN ON".
- One row, large muted text (`--color-faint`, ~clamp(1rem,2vw,1.5rem)), tech
  names from `content/stack.ts` (revise list toward the real stack: Python,
  PyTorch, YOLO, OpenCV, TensorRT, ONNX, Next.js, React, TypeScript, FastAPI,
  PostgreSQL, Supabase, AWS, Docker, Vercel, LangChain, …).
- CSS marquee, `hover` pause, mask
  `linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)`.
- Second row optional (opposite direction, slower) — YAGNI unless it looks thin.

### 8.4 Project strip — NEW `components/sections/WorkStrip.tsx`

- Full-bleed, sits directly under the hero (croge).
- Horizontal CSS marquee of **project mini-cards**: extracted frame / screenshot
  thumb (rounded `--radius-frame`, 16:10), name, mono category pill.
- Opposite direction + slower than the tech marquee. Pause on hover. Edge-masked.
- Under `prefers-reduced-motion` / `< 768px`: becomes a normal horizontal
  scroll-snap strip (no animation), or a 2-row static grid.
- Links each card to `/work/<slug>`.

### 8.5 `ServicesGrid.tsx` — bento, every card has a render

- Paper ground. Section heading (eyebrow + `.headline` + intro).
- 6 cards, bento: 2 wide (Computer Vision, AI & Automation — the flagship pair)
  + 4 standard (Web, Mobile, UI/UX, Cloud). Order reflects positioning.
- Card: `--color-surface` fill, 1px `--color-line`, `--radius-panel`,
  `--shadow-sm`. A faint amber corner-wash
  (`radial-gradient(120% 120% at 100% 100%, var(--color-amber-glow), transparent 60%)`).
- **Render bleeds off the bottom / right edge** (`public/services/<x>.png`,
  `next/image`, `object-fit: cover`, `mask` fade to card edge), dark-blend on
  the wide navy cards.
- Icon chip (lucide, `--color-surface-2`, 44px, `--radius-frame`), title
  (display 1.25rem), 1-line summary (`--color-muted`), 3 tag chips.
- Hover: `translateY(-4px)`, border → `--color-amber`, `--shadow-md`, render
  nudges 4px. Off under reduced-motion.
- Wide cards get a navy fill + `--color-d-text` for contrast rhythm.

### 8.6 `StackedWork.tsx` — the second "bold" moment

- Keep the existing sticky/scale mechanism (motion `useScroll` +
  `useTransform`, `AnimatedStack` child, `>= 3` featured gate, mobile /
  reduced-motion → plain stack).
- Restyle each card: navy-900 fill, grain, one signal-colored data accent if the
  media is a tracking overlay, large project media filling the top 60%, meta row
  (category · year · role) in mono, outcome line in `.headline` small + serif
  italic accent, "Read the case study →".
- `origin-top`, `will-change: transform` only on the animated card, no
  `overflow:clip` ancestor.

### 8.7 `ProcessSteps.tsx`

- Paper. Mono eyebrow "HOW WE WORK", `.headline` "A process built around
  <em>shipping</em>."
- 4 rows (`content/process.ts`): `01–04` mono, title (display), body
  (`--color-muted`) in a right column, hairline dividers, small amber node on
  the number. croge's exact layout.

### 8.8 `ProofBand.tsx`

- **Navy band** (mid-page dark moment), grain, glow-orbs.
- Eyebrow "PROOF, NOT PROMISES". 3 claims from `content/site.ts` `proof[]`,
  each: big mono numeral (amber) + statement (`--color-d-text`), hairline
  vertical rules. Numbers stay defensible (no invented metrics) until owner
  supplies real before/after figures.

### 8.9 `Testimonials.tsx`

- Unchanged logic: `content/testimonials.ts` ships `[]` → renders `null`.
- When populated: paper, 2–3 quote cards, `--color-surface`, hairline, mono
  attribution, optional avatar. No fabrication.

### 8.10 `FaqAccordion.tsx`

- Paper band. `<details>` list, hairline dividers, `+`/`−` amber toggle,
  FAQPage JSON-LD retained. Restyle only.

### 8.11 `CtaBand.tsx`

- Navy-ink, full-bleed, `public/services/cta-bg.png` at low opacity + overlay,
  amber glow corner. `.headline` "Tell us what you're trying to <em>build</em>."
  Primary amber CTA + email fallback. Reusable `tone` prop kept.

## 9. Inner pages

- `/services` — `PageHero` (navy, compact), 6 deep blocks alternating
  paper/paper-2, each with its render + "what you get" panel (navy inset) +
  Check list. Process + FAQ + CTA reused.
- `/work` — navy `PageHero`, category filter (client island), `WorkGrid`
  restyled to §8.5 card language with real thumbs.
- `/work/[slug]` — restyle: navy hero with the project's key media, meta strip,
  Challenge / What We Built / Results, **metric band** (3 data points, mono,
  signal-accented if measured), 2-up gallery from extracted frames, tech list,
  next-project link. JSON-LD retained. `opengraph-image.tsx` per project
  (already scaffolded) restyled to the new tokens.
- `/about` — compact `PageHero`, story (3 paras), 4 values, Process, restyled
  StatsBar, CtaBand. No team section (no real photos).
- `/contact` — restyle to paper + glass form card; server action, honeypot,
  rate-limit, a11y validation all unchanged.
- `/careers`, `/privacy`, `/terms`, `/not-found` — token restyle only.

## 10. Imagery & media pipeline

**Tooling:** ffmpeg 8.1.1 (installed). Script lives at
`scripts/build-media.mjs` (Node, spawns ffmpeg), documented in README, run
manually — not in the Next build.

### 10.1 Per project: extract 2 stills + one short loop

For each project with a video (`public/clips/<Proj>/*.mp4`):

1. **2 best frames** → `public/work/<slug>/01.webp`, `02.webp`
   - `ffmpeg -ss <t> -i in.mp4 -frames:v 1 -vf "scale=1600:-2:flags=lanczos" -c:v libwebp -quality 82 out.webp`
     (ffmpeg has native webp; no `cwebp` dependency — `sharp` is the fallback
     for resizing supplied JP/PNG stills since Next already bundles it). Pick `t`
     at points where the CV overlay is dense (boxes / tracks / measurements
     visible) — chosen by eye from a contact sheet
     (`ffmpeg -i in.mp4 -vf "fps=1,scale=320:-1,tile=5x5" sheet.png`).
   - **No filters, no crops that clip the overlay** — the data on screen is the
     point.
2. **Cover** → `public/work/<slug>/cover.webp` (16:10, the single strongest
   frame).
3. **Loop** → `public/work/<slug>/loop.mp4` + `loop.webm`, 2–3s, muted, from
   the most active 3s window:
   - `ffmpeg -ss <t> -t 3 -i in.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 26 -pix_fmt yuv420p loop.mp4`
   - `-c:v libvpx-vp9 -crf 34 -b:v 0` for the webm.
4. **Poster** → `public/work/<slug>/poster.webp` (loop's first frame).

Projects with only stills (Anomaly Detection, HornetAI, Car defect stills) —
optimise the supplied JPGs to `01/02/cover.webp`, no loop.

### 10.2 Service renders

`public/services/*.png` → `.webp` at 1400px + 800px, `q 80` (via a `sharp`
script). Wire through `next/image` with real `sizes`. `hero-bg` / `hero-robot` /
`cta-bg` stay large (1920px) but compressed hard. Keep the source PNGs in
`media-src/`, ship only the `.webp`.

### 10.3 `og` image

`public/services/og.png` → `public/og.jpg` 1200×630, `q 82`. Update
`lib/seo.ts` `metadataBase` OG default + the static `app/opengraph-image.tsx`.

### 10.4 next/image / config

- `next.config.ts` `images` block already has `formats [avif, webp]`,
  `qualities [50,75,90]`. Add `deviceSizes` / `imageSizes` only if a gap shows.
- Every `<Image>` gets explicit `sizes`, width/height or `fill` + a positioned
  parent, and real `alt` (describe the CV output: "YOLO detection boxes on
  candy moving along a conveyor", not "candy detection screenshot").
- Decorative renders: `alt=""` + `aria-hidden`.

### 10.5 `.gitattributes`

Add `*.mp4 *.webm *.webp binary` (already covers common cases — verify).
Large source `.mp4` in `public/clips/` subfolders: keep or move to a
`media-src/` folder outside `public/` so they don't ship. **Decision needed —
default: move raw sources to `media-src/`, commit only the derived
`public/work/**` assets.**

## 11. Copy changes

Minimal, owner-authored base tightened then `humanizer` pass (Phase 5).

- **Tagline:** "We Deliver What We Commit." (replaces "Web, mobile & AI —
  engineered end-to-end.")
- **Positioning line** (`content/site.ts`): "AI & computer-vision studio — with
  the full-stack team to ship it."
- **Hero headline** (draft): *"We build computer-vision and AI systems that*
  *<em>ship</em> — and the web, mobile and cloud stack to run them."*
- **Hero sub** (draft): "A small senior team in Pakistan, working with clients
  worldwide. From technical brief to deployed production system in 3–8 weeks."
- **Stats** (`content/site.ts`, keep honest-minimal, revise labels):
  `10+ AI systems in production` · `1st IEEE Hackathon (Dock Vision AI)` ·
  `3–8 wks brief → production` · `24h reply`. Any hard number owner can't
  defend → `TODO(owner)` + fallback.
- **ProofBand** claims: reframe around RallyLens (single-camera tracking),
  MagicQC ("500+ items/shift, 90%+ accuracy" — owner-confirmed via LinkedIn),
  Dock Vision AI (competition win). Mark MagicQC numbers `// source: LinkedIn,
  owner to confirm`.

## 12. Project data model + intake template

`content/projects.ts` `Project` type gains: `metricsAccent?: "signal" | "amber"`,
`heroMedia`, `strip: boolean`. Everything else stays.

Owner fills one block per project (paste into chat or a file):

```
SLUG:            safe-rail
TITLE:           Safe Rail — Track Monitoring System
CLIENT:          (real name | "Confidential")
YEAR:            2025
CATEGORY:        Computer Vision
FEATURED (home): yes/no
ONE-LINE OUTCOME:
HEADLINE METRIC: value + label
THE PROBLEM:     2–3 sentences
WHAT WE BUILT:   3–4 sentences
THE RESULT:      2–3 sentences (numbers if you have them)
3 METRICS:       value + label  ×3
TECH:            comma list
ROLE:            Design + Build
TIMELINE:        e.g. 6 weeks
LIVE URL:        url | "not public"
```

Until a block arrives, the project renders from its `.txt` description with
`TODO(owner)` on every missing field and stays off the homepage
(`featured:false`).

## 13. Phasing

Stop + `npm run build` + `npm run lint` + Lighthouse (mobile) + report after each.
Lighthouse via `chrome-devtools-cli` skill or Playwright + Lighthouse npm (the
`chrome-devtools` MCP is currently down — fallback documented in the phase).

| Phase | Scope | Done when |
|---|---|---|
| **A — Tokens & type** | New `@theme` block, grain, glow-orb utility, `.headline`/serif, Fraunces wired, Lenis decision applied, `globals.css` structure classes. No component visuals yet. | build + lint clean; existing pages still render (unstyled-ish is fine) |
| **B — Media pipeline** | `scripts/build-media.mjs`, extract all frames + loops, optimise service renders + og, move raw sources to `media-src/`, `.gitattributes`. | `public/work/**` + `public/services/*.webp` populated; sizes sane (<300KB stills, <1.2MB loops) |
| **C — Shell** | Header floating pill, Footer, nav, SmoothScroll resolution, section wrappers, `Button`/`Card`/`Tag`/`Eyebrow`/`SectionHeading` restyle. | build + lint + Lighthouse; header/footer correct on every route |
| **D — Homepage** | Hero, WorkStrip, tech marquee, ServicesGrid bento, StackedWork, ProcessSteps, ProofBand, Faq, CtaBand — all with imagery. | build + lint + Lighthouse mobile Perf ≥ 90 / A11y ≥ 95; 360/768/1280/1920 checked |
| **E — Inner pages** | `/services`, `/work`, `/work/[slug]`, `/about`, `/contact`, legal, 404, per-project OG. | build + lint + Lighthouse on `/` and `/work/<slug>`; axe 0 |
| **F — Content, SEO, polish** | Real project blocks wired as they arrive, `humanizer` copy pass, JSON-LD re-check, canonical/OG/sitemap re-verify, reduced-motion + keyboard full pass, `HANDOVER.md` + `README.md` update. | full acceptance list §14 |

## 14. Acceptance

- `npm run build` + `npm run lint` clean; `npx tsc --noEmit` clean.
- Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, Best-Practices ≥ 95, SEO 100.
- axe-core 0 violations on `/`, `/services`, `/work`, `/work/<slug>`, `/about`,
  `/contact`.
- 360 / 768 / 1280 / 1920 — no horizontal scroll, no clipped media, cards
  degrade to single column, marquees/strips degrade to static.
- `prefers-reduced-motion`: no transforms, no autoplay, no marquee; opacity
  fades + grain only.
- Every section contains real imagery. No text-only card anywhere.
- Every contact fact from `content/site.ts`. No invented client / metric /
  result — `TODO(owner)` where data is missing.
- Keyboard: full nav, visible focus, drawer trap, skip link.
- Brand: only navy `#12294B` + amber `#E9A13C` as brand hues; `--color-signal`
  appears only on data/telemetry UI.

## 15. Risk / notes

- `chrome-devtools` MCP is down this session → Lighthouse runs via CLI/Playwright
  fallback; if neither works in a phase, report the gap, don't skip the metric
  silently.
- Fraunces adds ~1 font file — keep to italic + one weight, `display: swap`,
  don't preload.
- Grain overlay: base64 SVG must be small (< 2KB) and `will-change`-free.
- `motion` (not framer-motion) is the animation lib — imports from
  `motion/react`.
- Moving raw `.mp4` sources out of `public/` is irreversible-ish in git history
  but they're already committed as untracked — confirm before `git mv`.
