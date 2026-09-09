# Handover notes

Full rebuild of the Pixel Dev Solutions site against `CLAUDE_CODE_BRIEF.md` +
`WEBSITE_CONTENT.md`. Design decisions are recorded in
`docs/superpowers/specs/2026-09-09-pixel-dev-website-design.md`; operational docs
are in `README.md`.

## What was built

- 10 routes: `/`, `/services`, `/work`, `/work/[slug]` (5 SSG paths), `/about`,
  `/contact`, `/careers`, `/privacy`, `/terms`, plus `not-found`, `sitemap.xml`,
  `robots.txt`, generated OG image, and tab icons.
- Homepage: all 11 sections from brief §6.1, in order.
- Design system in `app/globals.css` (navy + amber `@theme` tokens, type scale,
  motion, reduced-motion kill-switch) from the studio logo.
- Contact form: server action → Resend, honeypot, in-memory rate limit,
  aria-linked field errors, success/error states.
- SEO: per-page Metadata + canonical, `Organization` + `WebSite` +
  `Service` + `CreativeWork` + `BreadcrumbList` + `FAQPage` JSON-LD.

## Decisions that differ from the brief (all in the spec, §4)

| Brief | Shipped | Why |
|---|---|---|
| Stat/proof placeholders like `[50]+` | Honest-minimal numbers in `content/site.ts` | You have 2 published projects; under-claiming is safer |
| Testimonials section | Renders nothing until `content/testimonials.ts` has real quotes | Brief: never fabricate |
| Owner supplies logo SVGs | Hand-authored mark in `Logo.tsx` / `app/icon.svg` from `final_dark.jpeg` | Only JPEGs were supplied |
| 4–5 projects in the homepage deck | Deck auto-enables at 3+ `featured` projects; 2 today → plain stack | A 2-card "deck" has no dead scroll to justify the effect |
| Stacked-work `whileInView` reveal wrapper | Removed | It hid content when JS/observer didn't fire |

## Verified

- `npm run build` clean, `npm run lint` clean.
- Rendered at 375 / 768 / 1440 px on every page.
- axe-core (WCAG 2.1 A/AA) — 0 violations across `/`, `/services`, `/work`,
  `/work/rallylens`, `/work/magicqc`, `/about`, `/contact`, 404.
- Contact form submits and shows the success state (mail is logged, not sent,
  until `RESEND_API_KEY` is set).
- Reduced-motion: Lenis disabled, marquees frozen, deck falls back to a stack,
  video falls back to poster — all content still present.
- Mobile drawer: focus trap, Esc to close, closes on route change.

## Not verified / needs you

- Real Lighthouse run (needs the production deploy). Build is static, images are
  `next/image` with `sizes`, fonts self-hosted with `display: swap`, below-fold
  media lazy — expected to pass, but confirm on Vercel.
- A real Resend send (needs an API key + a verified sending domain).
- Live share-preview rendering (Slack / X / LinkedIn) after deploy.

## Before launch

See the checklist in `README.md` → "Things flagged for you before launch":
real metrics, RallyLens/MagicQC figures, legal review, social links, client names.
