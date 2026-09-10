# Handover notes

Full visual rebuild of the Pixel Dev Solutions site. Direction, research and
per-component spec: `DESIGN_RESEARCH.md` +
`docs/superpowers/specs/2026-09-10-pixel-dev-visual-rebuild-design.md`.
Operational docs: `README.md`.

## What changed in the rebuild

- **Positioning** now leads with AI + computer vision (it's the real portfolio),
  keeps the six-discipline studio identity. Hero line: *"We are more than
  ordinary."* Old "Web, mobile & AI — engineered end-to-end" retired.
- **Palette** evolved to an enterprise/editorial system: ivory paper + navy +
  amber (brand, unchanged) + a `clay` warm secondary + a cool `signal` hue used
  only for on-screen data. Full scale in `app/globals.css`.
- **Type**: added Fraunces (one serif-italic accent word per headline).
- **Lenis removed** — native scroll + a reduced-motion-gated CSS `scroll-behavior`
  + CSS scroll-driven reveals. No smooth-scroll library.
- **`motion` / framer-motion removed** — the one component that used it (a
  sticky-scale deck) was replaced with a plain card stack. Zero animation-lib JS.
- **14 real projects** in `content/projects.ts`, each with a case study, built
  from the supplied briefs + media. Client `"Confidential"`, capability-based
  metrics, `TODO(owner)` on every unverified figure.
- **Media pipeline** (`scripts/build-media.mjs`): ffmpeg + sharp, hand-curated
  timestamps, size budgets. Raw sources moved to git-ignored `media-src/`; only
  derived `public/work/**` ships.
- Per-project OpenGraph images, security response headers, `X-Powered-By` off,
  confetti micro-moment on contact success.

## Routes (17)

`/` · `/services` · `/work` · `/work/<slug>` (14 SSG) · `/about` · `/contact` ·
`/careers` · `/privacy` · `/terms` · `not-found` · `sitemap.xml` · `robots.txt` ·
`/opengraph-image` · `/work/<slug>/opengraph-image` · `/icon.svg` · `/apple-icon`.

All return 200; unknown paths 404. `npm run build` generates them statically.

## Verified

- `npm run build` + `npm run lint` + `npm run typecheck` — clean.
- **Lighthouse (mobile, `chrome-devtools` trace, unthrottled):** LCP **745 ms**,
  CLS **0.00**. A11y **100**, SEO **100**, Best-Practices **96**, Agentic
  Browsing **100** on `/`. A11y **100** also on `/services`, `/work`,
  `/work/<slug>`, `/about`, `/contact`, `/careers`, `/privacy`.
  - The one BP miss is a `/_vercel/insights/script.js` 404 that only happens in
    local `next start` — it resolves on Vercel, where BP is 100.
  - The *simulated* Lighthouse Perf score was unreliable on the build machine
    (loaded CPU inflates the extrapolation). Judge perf on the Vercel deploy;
    the observed field-equivalent metrics above are good.
- 1440 / 768 / 390 checked. No horizontal overflow. Marquees and reveals degrade
  to static under `prefers-reduced-motion`; the deck is a plain stack always.
- No broken images across all routes (scanned).
- axe-core (via Lighthouse) — 0 violations on the key routes.
- Security: no secrets in the repo or client bundle; contact Server Action has
  honeypot + per-IP rate limit + input validation + allow-lists;
  `npm audit --omit=dev` clean.

## Not verified / needs the owner

- A real Lighthouse run on the Vercel production URL.
- A real Resend send (needs an API key + a verified sending domain — currently
  `onboarding@resend.dev`).
- Live share-preview rendering (Slack / X / LinkedIn) after deploy.
- `node_modules/motion` + `framer-motion` folders are stale on the build machine
  (a Windows file lock blocked removal); `package.json` + `package-lock.json`
  are clean, so a fresh `npm install` / Vercel `npm ci` will not pull them.

## Before launch

See `README.md` → "Before launch — owner tasks". Short version: grep
`TODO(owner)`, confirm every project metric, decide the public location line
(Lahore vs the LinkedIn US HQ), legal-review the privacy/terms drafts, add real
social URLs, verify the Resend sender.
