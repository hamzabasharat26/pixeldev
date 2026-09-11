# DESIGN_RESEARCH.md

Research for the Pixel Dev Solutions visual-layer rebuild. Captured 2026-09-10
by driving a real browser (Playwright) against the two reference sites plus a
WebFetch pass on the LinkedIn company page and the 99designs AI gallery.

Screenshots: `design-refs/aeyron-hero.jpeg`, `aeyron-2..4.jpeg`,
`croge-1..3.jpeg`.

Bottom line up front:

- **croge.dev is the structural template.** It is the same positioning as Pixel
  Dev ("AI systems, web platforms & computer vision, engineered end-to-end"),
  the same brand family (navy + amber/orange + warm paper + grain), the same
  stack (Next.js 16 + React 19 + Tailwind 4 + Supabase), the same
  "Pakistan · Worldwide" line — and it lists **MagicQC** as one of its own
  projects. Treat it as the reference implementation of this exact brief.
- **aeyron.com is the richness/depth reference.** Full-bleed media hero, floating
  glass nav, bento cards with product renders bleeding off the edges, corner
  glow, atmospheric 3D art, gradient-text keywords. Cold black/white/cyan — we
  take the *techniques*, not the palette.
- The current Pixel Dev build is flat because it has (a) no imagery in any card,
  (b) one dead navy background with no layering, (c) a bare hero, (d) no
  editorial typography. All four are fixable without touching the brand.

---

## 1. croge.dev — structure, scroll, tokens (PRIMARY REFERENCE)

### 1.1 Design tokens (read from `:root`)

```
--bg:            #f7f4ee   warm paper (page base)
--bg-2:          #efeae1   deeper paper (alternating band)
--surface:       #ffffff   card fill on paper
--surface-2:     #f3eee6   inset panel
--line:          #e4ddd0   hairline on paper
--line-2:        #d2c8b6   stronger hairline
--fg:            #17130d   warm near-black (body text)
--muted:         #574f42   warm grey (secondary text)
--faint:         #6e6454   warm grey (tertiary / eyebrow)
--amber:         #e2620a   burnt-orange accent
--amber-2:       #f59a2e   lighter amber (gradient partner)
--amber-ink:     #a6490a   text-safe amber on paper
--amber-glow:    #e2620a2e  (~18% alpha) used for blurred glow orbs
--navy:          #123a6b   deep blue (dark sections)
--navy-2:        #2a6bb0   lighter blue
--ember:         #f2792b   secondary warm
--grain-opacity: 0.04      SVG/PNG noise overlay opacity
--shadow-color:  23 19 13  warm shadow rgb (not pure black)
```

Takeaway: their whole "depth" comes from **warm neutrals + a 4% grain layer +
low-alpha amber glow orbs + warm (not black) shadows**. Nothing exotic.

### 1.2 Typography

| Role | Font | Weight | Size (desktop) | Letter-spacing |
|---|---|---|---|---|
| Display / headings | **Bricolage Grotesque** | 700 | 60px h2, larger on hero | **-2.1px** (very tight) |
| Accent word in headings | **Fraunces** (italic) | ~500 italic | matches heading | — |
| Body / UI | **Inter** | 400–600 | 18px body | normal |
| Eyebrows / labels / meta | **JetBrains Mono** | 500 | 12–13px | +0.14em, uppercase |

Signature move: headline is Bricolage bold, with **one word set in Fraunces
italic** ("We *forge* AI…", "Three disciplines, *one* senior team.") and often
**one clause in amber** ("that *scale your Business!*").

The current build uses Space Grotesk / Inter / JetBrains Mono. Space Grotesk is
a fine substitute for Bricolage; **we need to add a serif for the italic accent
word** (Fraunces, or a lighter alternative). See spec.

### 1.3 Section rhythm

- Container: `max-width: 1400px`, `padding-inline: 20px`
- Section vertical padding: `py-24` = **96px** (vs current 56/96/128 — close)
- Sections alternate: paper `#f7f4ee` → cream band `#efeae1` (full-bleed, with
  `border-y` hairline) → paper. Dark navy panels used sparingly.
- Every band that changes color has a **1px hairline top and bottom**
  (`border-y border-line`) — this is what makes panels read as "raised".

### 1.4 Scroll behaviour (the "running strips")

- **No Lenis, no GSAP, no Framer Motion.** Pure CSS `@keyframes` + (almost
  certainly) IntersectionObserver for reveals. This is worth noting — the
  current build added Lenis; croge proves the aesthetic doesn't need it.
- **Tech marquee** ("THE STACK WE BUILD & MAINTAIN ON"): a single row,
  `display:flex; width:max-content; animation: marquee 40s linear infinite`,
  content duplicated once, `hover:[animation-play-state:paused]`. Mask:
  `linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`.
  Tech names are **large muted text** (~24px, `--faint`), not logos.
- **Project strip** ("SELECTED SYSTEMS, IN PRODUCTION"): a horizontal row of
  project cards (thumbnail + name + category pill) that scrolls on the same
  marquee mechanism, opposite direction, slower. Edge-masked identically.
- **Reveal animation** (`.rise`): `opacity 0→1` + `translateY(~16px)→0`,
  `duration 0.7s`, `cubic-bezier(0.22, 1, 0.36, 1)`, runs once. Applied to
  section headers and list rows, not every element.
- Header: `position: fixed; inset-x-0; top-0; transition: all 300ms;` gains a
  `border-b` + backdrop blur after scroll.
- A persistent `fixed bottom-4 left-4` rounded-2xl card (cookie notice).

### 1.5 Homepage section order (croge)

1. Hero — mono eyebrow row, huge mixed-font headline, body, 2 CTAs, stat row
2. Project strip (horizontal marquee of work) — full-bleed, sits right under hero
3. Tech marquee ("The stack we build & maintain on") — cream band, border-y
4. "What we forge — Three disciplines, one senior team" — numbered `01/02/03`
   list, icon chip + title + amber subtitle + description in right column,
   hairline dividers, circular ↗ button per row
5. "Selected work — Shipped products, measurable outcomes" — 3-col card grid,
   each card = screenshot thumb (rounded, category pill top-left, optional
   orange pill top-right) + name ↗ + year + description + tech pills
6. "Proof, not promises — We measure success the way our clients do" — cream
   band, metric statements
7. "Client voices — What happens after we ship" — testimonial cards
8. "How we work — A process built around shipping" — process steps
9. CTA + footer

Note how close this already is to the current Pixel Dev homepage section list.
The rebuild is re-skinning, not re-architecting.

### 1.6 Card treatment (croge "Selected work")

- Fill `#fff` on the paper bg, `border: 1px solid var(--line)`, radius ~16px,
  `box-shadow` using the warm `--shadow-color` at low alpha.
- Top ~55% of the card is a **screenshot in a rounded inner frame** with its own
  1px border; the image is a real product UI, not an icon.
- Category pill (`WEB`, `E-COMMERCE`) top-left over the image, small, uppercase,
  mono, solid dark or amber fill.
- Body: name (Bricolage ~20px) + `↗` + year (mono, right-aligned), one-line
  description (`--muted`), then tech tags as small pill chips (`--surface-2`
  fill, `--line` border).
- Hover: subtle lift (`translateY(-4px)`) + border goes amber + shadow deepens.

---

## 2. aeyron.com — richness & depth techniques (SECONDARY REFERENCE)

### 2.1 Palette (for technique reference only — do NOT adopt)

```
page bg:      #f5f4f5   near-white
panels:       #000000   pure black, radius 32–42px, "floating" on the white
body text:    ~#111 (oklch 0.145 0 0)
accent:       linear-gradient(90deg, oklch(0.66 0.157 242), oklch(0.74 0.138 177))
              = electric blue → teal, used on buttons and keyword text
heading grad: linear-gradient(#fff, #999)  vertical white→grey, on black panels
```

### 2.2 Fonts

- **Outfit** (display) — hero h1 is **weight 400 (light!)**, 60px, line-height
  60px, letter-spacing normal. Section titles 500–800. Project titles 800 /
  48px / 60px line-height.
- **Poppins** (body) — 400/500/600/700.

The light-weight huge hero headline is a deliberate contrast to croge's tight
bold. Worth considering a lighter display weight for our hero.

### 2.3 Hero construction

- Full-bleed `<video>` background, black base, a **cyan particle / light-trail
  "data highway"** converging to a vanishing point (their signature art).
- Bottom of hero fades to solid black: `linear-gradient(rgba(0,0,0,0),
  #000 100%)` — lets the next black panel butt seamlessly.
- **Floating glass pill nav**: `position: fixed; top: 16px; left: 50%;`
  translucent dark, `backdrop-filter: blur(12px)`, rounded-full, cyan active
  underline.
- **Glass stats card** overlapping the hero art: translucent dark fill, 1px
  hairline border, radius ~20px, 3 stats split by thin vertical rules, big grey
  numerals (`300+`, `20+`, `$10M+`), small grey labels.

### 2.4 Bento feature cards (the fix for our "empty cards" problem)

- 6 cards, 3 columns, uneven widths (2 wide + 4 standard).
- Card fill: near-black with a **radial glow** bleeding from one corner
  (`linear-gradient(to left bottom, #000 0, #000 50%, <accent> 100%)`).
- Radius 32–40px.
- Icon chip top corner: light rounded-square, ~48px.
- **A product screenshot or 3D render bleeds off the bottom / side edge of the
  card**, semi-transparent, dark-blended. This is the single biggest difference
  from our current build — every card carries a real image.
- Hover: `scale(1.01)`.

### 2.5 Other sections

- **Portfolio**: white bg, giant project name (Outfit 800), description left,
  **large device/dashboard mockup bleeding off a rounded white card** with soft
  shadow on the right. Prev/next circular arrow buttons — it's a carousel.
  Numbered `01/16`. Mono "DISCOVER MORE:" label. Cyan gradient "Visit Site" +
  outline "Learn More".
- **Products**: black rounded-t panel, "Our Products" pill badge, huge white
  heading, alternating render / copy rows with 5–6 bullet features each.
- **Tech stack**: black panel, "Technology Stack" pill badge, giant "Our Helping
  Hands" heading (white + cyan gradient last word), **Michelangelo "Creation of
  Adam" robot-hand-meets-human-hand art in cyan** as background, tech logos as
  rounded-square app-icon tiles scattered over it.
- **Testimonials**: black panel, "Trusted By Many!", 3-up cards with circular
  avatar + quote + 5 stars + name/title, prev/next arrows.
- **CTA**: black rounded-t panel, "Let's Build Future Together", "Let's Talk".
- Footer: dark, logo, Company / Support / Legal columns, social row, copyright.

### 2.6 Effects inventory (aeyron)

- `backdrop-filter: blur(12px)` — nav, glass cards.
- Radial / corner gradient glow on every dark card.
- Gradient text: vertical `#fff→#999` for big headings on black; horizontal
  accent gradient for keywords.
- `scale(1.01)` card hover, `scale(1.01)` "featured" project.
- Big border-radius (32–42px) on floating panels.
- No visible grain layer (croge has one; aeyron relies on the video + glow).

---

## 3. LinkedIn — company facts (feeds copy + positioning)

From `linkedin.com/company/pixeldevsolutions`:

- **Tagline:** "We Deliver What We Commit"
- **Description:** builds production AI systems — computer-vision pipelines,
  RAG-based LLM apps, full-stack AI products. Emphasis on *working software, not
  demos*; small team, "direct communication, fast decisions, no handoff chains
  between the person who scopes your project and the person who builds it."
- **Industry:** Software Development · **Size:** 2–10 · **Founded:** 2024
- **HQ:** listed as US on LinkedIn — **conflicts with the site's Lahore address
  and "Pakistan · Working with clients worldwide" line.** Needs an owner
  decision (see spec open questions). croge.dev uses "Pakistan · Worldwide".
- **Specialties:** AI, ML, Computer Vision, LLM Development, RAG Pipelines,
  LangChain, YOLOv8, Object Detection, Full-Stack AI, Python, FastAPI, AI
  Chatbots, Document Intelligence, AWS EC2, AI Automation, REST APIs, Edge AI,
  PyTorch, OpenCV.
- **Projects named publicly:**
  - **MagicQC** — "500+ items per shift at 90%+ accuracy" on AWS EC2, shown at
    an Expo.
  - **Dock Vision AI** — real-time CV docking assistance; **won 1st place at an
    IEEE Hackathon**, then commercialised.
  - "10+ AI systems delivered to US and Canada clients" — RAG pipelines, LLM
    agents, CV apps.
- **Engagement:** "3–8 weeks from technical brief to deployed production system."

This is materially more AI/CV-forward than the current site's "web, mobile & AI
studio" framing — supports the agreed positioning (broad studio identity, hero
leads with AI + computer vision).

---

## 4. Local asset audit (what we have to work with)

### 4.1 `public/clips/` — real CV project source material

Each folder has a `.txt` (title + description + skill tags). **No client names,
metrics, or results** — owner will supply those.

| Folder | Project | Media |
|---|---|---|
| `3D_Railwar_lidar/` | 3D Lane Line Detection using LiDAR Point Cloud | `lidar.mp4` (5s, 1000×664) |
| `Anomly_detect_parts/` | Anomaly Detection in Industrial Manufacturing (Edge / ANOMALIB) | P1–P5.jpg |
| `Cake_Cut/` | Cake Counting (GoPro + CV, detection + tracking) | `Cake.mp4` (60s, 1000×450) |
| `Candy_Dt/` | Candy Detection & Counting (conveyor, YOLO) | `CD.mp4` (3s, 1000×426) |
| `Car_defect/` | Vehicle Damage Detection (Detectron2 instance seg + Streamlit UI) | 1–5.jpg, `deft.mp4` (7s, 1000×750) |
| `FB_AnomlyClip/` | Tire-Cord Fabric Defect Detection (AnomalyCLIP) | `FBDT.mp4` (15s, 1000×500), P1–P5.jpg |
| `Honey_PT_detect/` | HornetAI — Asian hornet biosecurity detection (YOLO, Edge) | P1.jpg |
| `Safety_Rail/` | Safe Rail — track monitoring (YOLO + semantic seg) | `Railway_Seg1.mp4`, `R_Seg2.mp4` (~3.7s, 1000×562) |

Loose files in `public/clips/`: `OCR1.png` / `OCR_Details.png` (OCR),
`Nexus_AI_RAG_Chatbot.png` + `Nexus_architecture.png` (RAG chatbot),
`Dynamic_Parking_System.png` + `Pakring_dasboard.jpg` + `People_counting.png`
(parking / people counting), `Interction_detection_peoples.png`,
`Detection_outside.png`, fabric-defect stills, plus 2 ZIPs (Drone HEXA, MagicQC
Size Measurement) and existing `*-8s.mp4` loops (dock, magic, mri, ocr, padel,
passenger, theft, tshirt).

ffmpeg 8.1.1 is installed — frame extraction and 2–3s clip trims are feasible.

### 4.2 `public/services/` — illustration renders (~1.5–2 MB PNG each, need optimizing)

`hero-bg.png`, `hero-robot.png`, `web.png`, `mobile.png`, `ai.png`,
`vision.png`, `uiux.png`, `cloud.png`, `cta-bg.png`, `workspace.png`,
`og.png`, `3D_head.png`.

### 4.3 `public/posters/` — 9 poster JPGs (dock, fabric, magic, mri, ocr, padel, passenger, theft, tshirt)

### 4.4 Brand

`public/brand/logo-src-{light,dark}.jpeg` — navy `>` chevron + amber square
node, "PIXEL" (navy) + "DEV" (amber), "SOLUTIONS" spaced beneath. This is the
source of the navy + amber brand. Logo stays as-is.

---

## 5. Synthesis — the direction (detail in the spec)

**"Instrument panel, warmly lit."** croge's editorial warm-paper structure as
the spine; aeyron's hero richness and imagery discipline layered on; Pixel Dev's
own navy `#12294B` + amber `#E9A13C` as the only brand hues, expanded into a
full engineered scale.

- **Two grounds, alternating:** warm off-white paper (`#F7F4EE`-family, tuned
  toward our amber) for most sections; deep navy (`#0B1B33` → near-black
  `#070E1C`) for the hero, one mid-page proof band, the final CTA, and the
  footer. Every band gets a hairline top/bottom.
- **Depth kit (from aeyron, tinted to our brand):** a 3–4% grain overlay;
  blurred amber + navy glow orbs behind content; warm navy-tinted shadows (not
  pure black); large radii on floating panels; `backdrop-blur` on the nav and
  any glass card.
- **Every card carries a real image** — project screenshot, extracted video
  frame, or service render — in a rounded inner frame, some bleeding off the
  edge (aeyron). No text-only cards anywhere.
- **Editorial type:** Space Grotesk (display, tight tracking) + a serif italic
  for the one accent word per headline (add Fraunces or similar) + Inter (body)
  + JetBrains Mono (eyebrows, meta, `01–04`, tech tags).
- **Running strips (croge):** CSS-only marquee — one tech-name row, one
  project-card row, opposite directions, different speeds, pause on hover,
  edge-masked. Keep it library-free; keep Lenis only for the page smooth-scroll
  (or drop it — open question in the spec).
- **Motion:** `rise` reveal (opacity + ~16px, 0.7s, `cubic-bezier(0.22,1,0.36,1)`,
  once) on section headers and list rows; scroll-linked scale on the stacked
  work deck; scroll-progress bar. All off under `prefers-reduced-motion`.
- **Hero:** full-bleed media (extracted montage frame or `hero-bg.png` +
  `hero-robot.png`), navy gradient overlay, slow scale-on-scroll, mono eyebrow
  row, mixed-font headline with amber + serif-italic accents, two CTAs, glass
  stat card overlapping the lower edge.

Full token table, component-by-component spec, media pipeline, project intake
template, and phasing are in the design spec.
