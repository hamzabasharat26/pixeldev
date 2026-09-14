# Pixel Dev Solutions

**We are more than ordinary. We deliver what we commit.**

Marketing site for Pixel Dev Solutions, an AI and computer vision studio in
Lahore with the full stack team to ship it. Built to win projects: real work on
every screen, fast on a mid-range phone, accessible, and hardened for
production on Vercel.

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, React Compiler), React 19, TypeScript strict |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens in `app/globals.css` |
| Motion | GSAP (hero, cursor, magnetic buttons, tilt), `motion` (portfolio filter), native CSS scroll-driven animation (reveals, parallax, the work reel), Web Animations API (hero detection loop, marquees) |
| Forms | Server Actions + Resend, with a signed anti-bot token |
| Hosting | Vercel, `pixeldevsolution.tech` |

---

## Quick start

```bash
# Node 20.9+ (Vercel builds on its current LTS)
npm install
cp .env.example .env.local     # see "Environment variables"
npm run dev                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (the React Compiler runs through Babel, about a minute) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, flat config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run media` | Rebuild derived media from `media-src/` (see "Media pipeline") |

---

## Routes

| Path | Rendering | Notes |
|---|---|---|
| `/` | Static | Hero, work strip, stack strip, services, selected work, process, proof, FAQ |
| `/services` | Static | Six disciplines, each with a real product screen |
| `/portfolio` | Static | Filterable grid of every project |
| `/portfolio/[slug]` | Static (SSG) | One case study per project, with its own share image |
| `/about` | Static | Story, values, and the "Inside the work" reel |
| `/contact` | **Dynamic** | Rendered per request so each visitor gets a freshly signed form token |
| `/careers`, `/privacy`, `/terms` | Static | |
| `/sitemap.xml`, `/robots.txt` | Generated | |

"Work" was renamed "Portfolio". `/work`, `/work/<slug>` and `/projects`
redirect permanently (308), so no old link breaks. The redirect matches one path
segment only, so project media under `public/work/<slug>/` is never caught by
it.

---

## Where things live

```
app/                  routes; each page owns its <Metadata> and JSON-LD
  layout.tsx          fonts, Organization + WebSite JSON-LD, header, footer, cursor
  portfolio/          grid page + [slug] case study + per-project share image
  contact/actions.ts  the Server Action behind the contact form
components/
  layout/             Header (glass bar), MobileNav (vaul drawer), Footer, SkipLink
  sections/           one file per page section
  ui/                 primitives: Button, Marquee (+ MarqueeDriver, MarqueeToggle),
                      Cursor, PixelAI (the assistant), Magnetic, TiltCard, Reveal, Counter, Logo, ...
  media/              AutoVideo, ProjectCard
content/              ALL copy and data. Edit these, not the components.
  site.ts             company facts, taglines, nav, stats, SEO strings
  services.ts         the six services
  projects.ts         every case study
  stack.ts            the stack strip (+ brand-icons.ts, generated)
  faq.ts, process.ts, values.ts, testimonials.ts
  assistant.ts        what Pixel AI can say, composed from the files above
lib/                  seo.ts (metadata + JSON-LD), form-token.ts, scroll-watch.ts, assistant.ts (Pixel AI matcher), utils.ts
scripts/              media pipeline (build-media.mjs + media/*)
public/               brand/, services/ (service visuals), work/<slug>/ (project media)
```

Every phone number, email, address and tagline comes from `content/site.ts`.
Never hardcode one in a component.

---

## Environment variables

Copy `.env.example` to `.env.local` for local work, and set the same keys in
Vercel under Settings, Environment Variables.

| Variable | Needed | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, sitemap, share tags. Defaults to the domain in `content/site.ts` |
| `RESEND_API_KEY` | To deliver email | Without it, enquiries are logged on the server instead of emailed |
| `CONTACT_TO_EMAIL` | Optional | Where enquiries go. Defaults to the address in `content/site.ts` |
| `CONTACT_FROM_EMAIL` | To deliver email | Sender address, on a domain verified in Resend. Without it the shared test sender is used, which only reaches the Resend account owner |
| `FORM_TOKEN_SECRET` | **Required in production** | Signs the contact form token. Without it tokens are unsigned, so anyone can mint one and the form's spam protection is down to timing alone. 32+ random characters. Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |

---

## Security

What is in place, and why it looks the way it does.

**Response headers** (`next.config.ts`, every route)

| Header | Value |
|---|---|
| `Content-Security-Policy` | `default-src 'self'`; scripts, styles, images, media, fonts and fetches from our own origin only; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`. Production builds only |
| `Strict-Transport-Security` | Two years, subdomains, preload |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Camera, microphone, geolocation and Topics off |

The CSP is the static, no-nonce policy from the Next.js guide. A nonce policy
would force every page to render per request and give up static generation and
CDN caching, for a site with no accounts and no user content. It does use
`'unsafe-inline'` for scripts, which Next needs for its inline bootstrap when
there is no nonce. `upgrade-insecure-requests` is only added on Vercel, because
on `http://localhost` it would break local testing. One side effect: the CSP
also blocks the Vercel Toolbar on preview deployments.

**Contact form** (`app/contact/actions.ts`, `lib/form-token.ts`)

- A **signed, time-stamped token** in a hidden field. It is an HMAC-SHA256 over
  the time the form was served, and is checked in constant time. It proves the
  server issued the form, that it wasn't submitted faster than a person can type
  (under 3 seconds), and that it isn't older than 2 hours. Bots get the same
  silent "success" as the honeypot, so they learn nothing. A person whose tab
  expired is told to refresh.
- A **honeypot** field, a per-IP **rate limit** (4 an hour), allow-listed budget
  and service values, and length caps on every field.
- Server Actions reject cross-origin posts (an Origin against Host check), which
  is the CSRF protection a cookie token would otherwise give.

**Deliberately absent.** There are no sessions, JWTs or auth cookies, because
there are no accounts. There is nothing to log in to and nothing a session
would protect, and adding them would be attack surface with no benefit. Vercel
Web Analytics is cookieless and the site sets no cookies of its own, so there
is no cookie banner.

**Known limit.** The rate limit is held in memory, per server instance. On
Vercel that is best-effort. For a hard limit, add a Vercel Firewall rate-limit
rule on `POST /contact`.

---

## Design system

`app/globals.css`, `@theme`. The site runs light: white with Anthropic-family
cream bands, navy as the anchor for the services and closing sections.

- **Navy `#0a284a`** and **mustard `#e7a23b`** are sampled from the logo file,
  `public/brand/logo-src-light.jpeg`.
- `--color-brand-gold` is the logo's exact gold and is used for the **logo
  only**. It is about 2.2:1 on white, which WCAG permits for a logotype and
  nothing else.
- The UI accent is the `--color-amber-*` scale: the logo gold deepened until it
  can carry text and fills. The key name is legacy. Retuning a `@theme` value
  regenerates every utility that uses it, while renaming a key deletes those
  utilities with a green build and a green lint. The value is the source of
  truth.
- Contrast is hand-checked where tools can't see it. axe cannot measure text
  over a gradient, so the primary button's stops are measured by hand, and its
  hover darkens instead of brightening.
- **The detector's view**: corner brackets (`.det-frame`), telemetry readouts
  (`.text-readout`), and glass panels (`.glass`, `.glass-paper`), borrowed from
  what the studio's own models draw.

Type: Space Grotesk for display, Inter for body, JetBrains Mono only for
machine-voiced text such as readouts, tags and measured figures.

**House style for copy: no em dashes.** Use a comma, a colon, a full stop, or
rewrite the sentence.

---

## Motion

Everything answers the reader or plays once, except the hero's detection loop
and aurora, which run only while the hero is on screen. All of it switches off
under `prefers-reduced-motion`. Content is never hidden by default and revealed
by script, so a JS failure can't leave a blank page.

| Where | How |
|---|---|
| Hero load | One GSAP timeline: headline word by word, then the robot, panel and aurora (`HeroReveal`) |
| Hero detection | A scan line sweeps the robot, then brackets lock onto its parts with a confidence readout counting up (`HeroDetect`, Web Animations API: transform and opacity only, so the compositor plays it) |
| Hero ground | Three slow aurora blooms in the brand colours, CSS `translate` only |
| Hero exit | Follows your scroll: the robot recedes and the aurora sinks as you scroll past (GSAP `quickTo`, no ScrollTrigger, see below) |
| Hero depth | GSAP pointer parallax between the robot, the panel and the aurora |
| Cursor | Round trailing ring, GSAP `quickTo`. Over a project it opens into a "View" label. Removes itself on touch and under reduced motion |
| Buttons, cards | Magnetic CTAs and a pointer tilt on service and value cards (GSAP) |
| Process | A line draws across the four steps as you scroll, lighting each step in turn (GSAP `quickTo`, 768 px and up) |
| Proof figures | Decode from scrambled digits once, on first view (GSAP ScrambleText). Screen readers get the plain figure |
| Portfolio filter | `motion` layout animation, so cards slide to their new slots |
| Reveals, parallax, work reel | Native CSS scroll-driven animation, compositor-only, feature-detected |
| Marquees | Web Animations API (see below) |

**The detection targets are measured, not placed by eye.** The boxes sit on the
robot's glowing parts, found from the image's pixels. If `hero-robot` is ever
replaced, re-measure `TARGETS` in `HeroDetect.tsx`. The glass panel overlaps
the robot differently at each breakpoint, so the component measures the overlap
at runtime and leaves out any target the panel covers.

**Why the marquees work the way they do.** The first version fed scroll
velocity into a CSS variable on `<html>` that the animation's duration divided
by. A Chrome trace showed two faults. Custom properties inherit, so every write
restyled the whole document: 1,994 ms of style work in 2 seconds, against 63 ms
with the writes blocked. And changing a running animation's duration makes it
jump. `MarqueeDriver` now changes speed with `updatePlaybackRate()`, which
touches no style and keeps the animation's position. It brakes to a crawl under
the cursor or keyboard focus, stops when a strip is offscreen, and every strip
has a **pause button**, which WCAG 2.2.2 requires for motion that runs longer
than five seconds.

**Why there's no ScrollTrigger.** GSAP's ScrollTrigger starts a
`requestAnimationFrame` loop when it registers and never stops it (a
workaround for a Firefox repaint bug). That loop made Chrome render a
main-thread frame 60 times a second on an idle page, and every running
animation, even the ones the compositor plays, was restyled and committed on
each of those frames. A trace of the idle home page measured 736 ms of
main-thread work in 3 seconds across 182 frames. Without ScrollTrigger it
measures 252 ms across 35, with no animation-frame callbacks while idle. The
hero exit and the process line now use GSAP `quickTo`, driven
by a passive scroll listener that only runs while its section is near the
viewport (`lib/scroll-watch.ts`). For a new scroll-linked effect, use
`watchScroll` rather than bringing ScrollTrigger back.

The pinned "Inside the work" reel on `/about` is CSS, not GSAP pinning, on
purpose. JS pinning inserts its scroll distance after hydration and pushes the
page down, which is a layout shift. A height set in CSS can't do that.

---

## Pixel AI

The assistant behind the "Ask Pixel AI" tab on every page (a round button on
phones). It answers **only from what this site publishes**: every answer in
`content/assistant.ts` is composed from `content/faq.ts`, `services.ts`,
`process.ts`, `values.ts` and `site.ts`, so editing those pages edits the
answers, and it cannot invent a client, a price or a result. A question it
cannot match gets an honest fallback and a link to `/contact`.

- **No API key, no per-message cost, no data collected.** Matching is
  deterministic keyword scoring (`lib/assistant.ts`). Nothing typed into it
  leaves the browser.
- **Costs nothing on page load.** The knowledge base is imported the first
  time the panel opens (and prefetched when the tab is hovered or focused).
- **Motion**: GSAP opens and closes the panel, a scan line crosses it once, and
  answers reveal word by word in CSS. Under reduced motion answers appear at
  once and nothing animates.
- **Accessible**: a labelled dialog, focus moves in on open and back to the tab
  on Esc or close, answers are announced through a polite live region.

**Add or change an answer:** edit or add a topic in `content/assistant.ts`
(`chip`, `keywords`, `answer`, optional `links`). To show it as a starter chip,
add its `id` to `assistantStarterIds`. Keep it grounded: quote the content
files rather than writing new claims.

**Upgrading to a live model later:** the component calls `matchTopic()` in one
place. Swap that for a Server Action that sends the question plus these topics
as grounding, and add rate limiting before it goes public.

---

## Click sound

Every click plays a short tap: `public/sounds/button-press.mp3` (6 KB, mono,
0.42 s, level-matched so it is a tap and not a jolt). `lib/sound.ts` decodes it
once through the Web Audio API and plays a fresh source per click, which is why
rapid clicks overlap instead of cutting each other off. The audio context is
created inside the first real gesture, because browsers refuse audio otherwise.

- It fires on `pointerdown`, so the sound lands with the press. Keyboard
  activation sends a click with `detail === 0` and is handled separately, so it
  never doubles up.
- Only real controls make a sound: links, buttons, `role="button"`, `summary`
  and submit inputs. Typing, dragging and scrolling stay silent. Add
  `data-no-sound` to opt an element out.
- A speaker toggle sits in the header and the mobile drawer. The choice is kept
  in `localStorage` (`pixeldev:sound`), so it is a preference, not a cookie, and
  needs no consent banner.
- Re-encode the source with:
  `ffmpeg -i button-press.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.01,loudnorm=I=-20:TP=-2" -ac 1 -ar 44100 -b:a 96k public/sounds/button-press.mp3`

---

## Media pipeline

Raw footage lives in **`media-src/`**, which is git-ignored and stays on the
owner's machine. Only derived, size-budgeted files under `public/` are
committed.

```bash
node scripts/build-media.mjs sheets     # contact sheets with timestamps, to pick frames
node scripts/build-media.mjs build      # regenerate everything into public/
node scripts/build-media.mjs showcase   # just the service visuals
node scripts/build-media.mjs thumbs     # just the 800px covers and posters
node scripts/build-media.mjs check      # size budgets only, nonzero exit on a breach
```

Add `--only <name>` to rebuild one item and `--force` to ignore timestamps.
Force is needed after editing a crop, or after copying in a source file whose
timestamp is older than the output.

**Service visuals are real product screenshots, not renders.** The `showcase`
step sets each one in a browser-window or phone frame, because the screenshots
arrive in very different shapes and cropping them to one ratio would cut the
interface. Personal data is blurred at source resolution, before any resize,
from `blur` regions in `scripts/media/manifest.json`. The MagicQC operator's
name is redacted this way.

If ffmpeg isn't on your PATH (Windows), set `FFMPEG_BIN` and `FFPROBE_BIN`.

---

## Add a project

1. Put the source video or stills under `media-src/clips/<name>/`.
2. Add an entry to `scripts/media/manifest.json` (a video with frame times and a
   loop window, or three stills), then run `sheets` and `build`.
3. Copy an existing entry in `content/projects.ts`. `featured: true` puts it on
   the homepage. The route, share image, sitemap entry, metadata and JSON-LD are
   generated from that entry.

**Integrity rules.** `client` stays `"Confidential"` until the owner clears a
real name. `metrics` describe a capability the system demonstrably has, never
an audited business result unless the owner confirms the figure. Narrative is
written from the project brief and what is visible in the media. Nothing is
invented. Anything unconfirmed is marked `TODO(owner)`.

---

## Deploy to Vercel

1. Push to GitHub and import the repository in Vercel. The framework is detected.
2. Add the environment variables above. `FORM_TOKEN_SECRET` is required, and
   `CONTACT_FROM_EMAIL` once a sending domain is verified in Resend.
3. Settings, Domains: add `pixeldevsolution.tech` and `www.pixeldevsolution.tech`.
   The spelling is singular: the plural is a different, unregistered domain.
4. At the registrar: point the apex `@` A record and the `www` CNAME at the
   values Vercel shows. SSL provisions automatically.
5. Set the primary domain and the apex/www redirect in Vercel.

**After the first deploy:** load `/contact` and send a test enquiry; check the
response headers on `/`; run Lighthouse against the live URL.

---

## Before launch: owner checklist

Search the repository for **`TODO(owner)`**. Every unverified figure is marked.

**Blocking, found in the audit of 14 September 2026:**

1. **The domain is `pixeldevsolution.tech`, singular.** It is registered to
   the owner (RDAP: created 2026-09-03) and its nameservers are set, but it had
   no A record on 2026-09-14, so it does not resolve yet. Point it at Vercel
   during deploy. The plural `pixeldevsolutions.tech` is NOT ours and was
   unregistered, which is why every reference now uses the singular.
2. **Claims were trimmed to what your LinkedIn actually says.** "Running in
   production" became "delivered to clients in the US and Canada"; Dock Vision
   AI's "straight into production on a live loading bay" became "delivered as a
   commercial product to an international client"; MagicQC's "live line at a
   Karachi garment manufacturer" became "in production, and presented at
   MyKarachi". Restore stronger wording only with evidence you can show.
3. **Naming adidas, Zara, Puma and Reebok** in the MagicQC case study needs
   written permission. "8+ brands" is not published anywhere public either.

- Confirm the figures in `content/site.ts` (`stats`, `proof`) and every metric
  marked in `content/projects.ts`. Add client names only where cleared.
- Verify a sending domain in Resend, then change the `from:` address in
  `app/contact/actions.ts` away from `onboarding@resend.dev`.
- Have `app/privacy` and `app/terms` reviewed.
- `content/testimonials.ts` is empty, and the section hides until it has real
  quotes. Add only quotes you have permission to use.
- The Mobile service visual is real RallyLens UI laid out in phone frames.
  Replace it with a genuine mobile app screenshot when one exists.

---

## Troubleshooting

- **`tsc` errors about `.next/types/...` after renaming a route.** Those are
  stale generated types. Delete `.next` and rebuild.
- **`npm install` fails on Windows with `EPERM ... rmdir` in `node_modules`.**
  A stale folder is held open. Stop running Node processes, delete that folder,
  and install again.
- **`next start` logs a 404 for `/_vercel/insights/script.js`.** That script
  only exists on Vercel. It resolves in production.
- **`npm audit`** is clean for production dependencies (`npm audit --omit=dev`).
  Any advisories are in dev-only tools such as `lighthouse`.
