# Handover notes

State of the Pixel Dev Solutions site as of 11 September 2026, for whoever picks
it up next. How to run, deploy and extend it is in `README.md`. Earlier design
research and the rebuild spec are in `docs/`.

## Where it stands

- **Positioning.** AI and computer vision studio with the full stack team to
  ship it. Hero headline: *"Production AI, not proof of concept."* Brand lines:
  *"We are more than ordinary."* (hero) and *"We deliver what we commit."*
  (closing band, contact, footer).
- **Theme.** Light: white and Anthropic-family cream, with navy as the anchor
  for the services and closing sections. Navy `#0a284a` and mustard `#e7a23b`
  are sampled from the logo file. The logo gold is reserved for the logo; the
  UI uses a deepened mustard-brown scale whose contrast is measured by hand.
- **Real imagery everywhere.** The service visuals are real screens from
  shipped projects, set in browser or phone frames by the media pipeline. No AI
  renders remain on the site.
- **Portfolio**, formerly Work: 16 projects, `/portfolio` and
  `/portfolio/<slug>`. Old `/work` links redirect permanently.
- **Motion**: GSAP for the hero intro, its scroll exit and parallax, the cursor
  (which opens into a "View" label over projects), magnetic buttons, card tilt,
  the process line and the decoding proof figures. The Web Animations API for
  the hero's detection loop (a scan line, then brackets locking onto the
  robot's parts) and the marquees. CSS for the hero aurora; `motion` for the
  portfolio filter; native CSS scroll-driven animation for reveals, parallax
  and the About page reel. No ScrollTrigger (README, Motion, says why). All of
  it is off under reduced motion, and the hero's loops pause whenever the hero
  is off screen.

## Fixed in this pass, with the root cause of each

1. **The work strip "hanging" under the cursor.** Scroll speed was written to a
   CSS variable on `<html>` every frame. Custom properties inherit, so each
   write restyled the whole document. A Chrome trace measured **1,994 ms** of
   style work over 2 seconds; it is now **137 ms**, with a worst single pass of
   2.3 ms. Changing the animation's duration also made the strip **jump 160 to
   196 px**; it now has **0 jumps**. Hovering used to freeze it; it now brakes
   to 0.12x and recovers to 1x.
2. **Headings rendering at body size.** `cn()` runs tailwind-merge, which read
   our custom `text-h1` as a text colour and deleted it next to `text-ink`.
   Page titles are now **48 px** and section headings **36 px**, where both had
   been about 16 px. **17 of 17** eyebrow labels have their style back. Fixed
   once, in `lib/utils.ts`.
3. **Hovering one strip card restyled all of them.** The strip root was a
   Tailwind `group`, and `group-hover:` matches any hovered ancestor.
4. **Personal data published.** The MagicQC screenshot showed an operator's
   name and ID. It is now redacted in both the service visual and the case
   study gallery, blurred at source resolution before any resize.
5. **Visitors' names and emails in the server log** when email wasn't
   configured. Now only the email domain is logged.
6. **No way to stop the moving strips** (WCAG 2.2.2). Every strip now has a
   pause button.
7. **No Content-Security-Policy.** One is set now, alongside
   `Cross-Origin-Opener-Policy`.
8. **Portfolio**: the active filter badge failed contrast at 3.71:1, and the
   page's LCP image was lazy-loaded. Both fixed.
9. **A flash in the hero intro** on slow devices: the headline painted, was
   blanked, then replayed. The intro now skips itself when hydration arrives
   late.
10. **23 dead files removed**, including unused renders, stray screenshots and
    original PNGs. Third-party design reference screenshots were moved out of
    the repository.

## Second pass: hero and landing motion

The hero now plays the studio's own subject. A scan line sweeps the robot,
then detection brackets lock onto its parts with a confidence readout counting
up. The targets were measured from the image's pixels, and any target the
glass panel covers at the current breakpoint is dropped at runtime. Around it:
an aurora in the brand colours, a scroll exit, a cursor that opens into a
"View" label over projects, a process line that draws with the scroll, proof
figures that decode once, and lit seams where the navy sections begin.

Built to stay cheap while it runs, measured on the idle home page:

- **No ScrollTrigger.** It keeps a `requestAnimationFrame` loop running from
  the moment it loads, which made the browser restyle and commit every running
  animation on every frame. With it: **736 ms** of main-thread work in 3
  seconds, over **182** frames. Without it: **252 ms** over **35**, and no
  animation-frame callbacks at all while idle.
- **The detection loop runs on the Web Animations API**, transform and opacity
  only, so the compositor plays it. Only the confidence readout touches the
  main thread, at most 25 times a second.
- **Everything pauses off screen**, and none of it runs under reduced motion.
- **Layout shift 0.001 and LCP about 1.6 s** in the motion harness, on a first
  visit with nothing cached.
- **Load cost, measured beside the previous commit under the same conditions.**
  The pass first cost about 150 ms more script at load (TBT 362 ms against the
  previous commit's 212 ms; the 0 ms in an earlier table was a quieter machine,
  not a faster page). Three fixes brought it back: the scroll exit does nothing
  at rest and writes with `quickSetter` instead of tweens, which read computed
  style and force a full-page recalculation; the process line sets itself up on
  approach rather than at load; and the stats counter stopped building a number
  formatter on every frame. TBT is now **213 ms** with LCP **1.2 s**, against
  **212 ms** and **1.9 s** for the commit before this pass.

## Verified

Against a local production build, 11 September 2026.

- `npm run build`, `npm run typecheck`, `npm run lint`: clean.
- **QA harness, 49 of 49.** All 32 routes return 200 and unknown paths 404.
  The four redirects are 308 to the right place, and project media is never
  caught by them. Every security header and CSP directive is present. The
  contact token is signed and fresh per request. No CSP violations or console
  errors on six routes. No horizontal overflow at 390 px on six routes. The
  marquee figures above. Reduced motion hides nothing and runs nothing.
- **Motion harness, 24 of 24.** Detection locks every target in view and none
  behind the panel, at desktop and 390 px. Readouts count up. The scroll exit,
  cursor, process line and decode all behave, and the hero's loops pause off
  screen. Reduced motion shows everything and animates nothing. Two checks
  guard idle cost: no permanent animation-frame loop, and main-thread work
  under 450 ms per 3 seconds.
- **Contact form, end to end**, with a signing secret set. An instant submit
  and a forged token both show success and are **not** delivered; a genuine
  submission **is** delivered. The server log is the evidence, since the
  success screen is identical by design.
- **Headings and images**: every size and image check above passes.
- `npm audit --omit=dev`: 0 vulnerabilities. No secrets in tracked files and no
  environment files committed.

**Lighthouse (desktop, local production build)**

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 86 | 100 | 96 | 100 | 1.2 s | 0.001 | 213 ms |
| `/services` | 91 | 100 | 96 | 100 | 1.4 s | 0 | 0 ms |
| `/portfolio` | 90 | 100 | 96 | 100 | 1.4 s | 0.001 | 0 ms |
| `/about` | 87 | 100 | 96 | 100 | 1.6 s | 0 | 0 ms |
| `/contact` | 92 | 100 | 96 | 100 | 1.3 s | 0 | 0 ms |

This pass moved `/portfolio` accessibility from 96 to 100 (the filter badge)
and its LCP from 1.8 s to 1.4 s (eager first row). The `/` row was re-measured
after the second pass, as the median of three runs.

Local performance scores swing with machine load, so judge performance on the
Vercel deployment. The one best-practices miss locally is a
`/_vercel/insights/script.js` 404: that script only exists on Vercel.

## Security review

The `/security-review` command could not run: it needs `origin/HEAD`, and this
repository has no git remote. The review was done by hand on the pending diff.
No high or medium severity findings. The two issues found were fixed: personal
data in a published screenshot, and in the server log. Accepted trade-offs,
all documented in `README.md`:

- The CSP allows inline scripts, which Next needs without a nonce. A nonce
  would force every page to render per request.
- A signed form token can be reused within its 2-hour window; the per-IP rate
  limit bounds that.
- The rate limit is held in memory per server instance. For a hard limit, add a
  Vercel Firewall rule on `POST /contact`.
- Without `FORM_TOKEN_SECRET` the token is timing-checked but unsigned. Set it
  in production.

## Needs the owner

- Set `FORM_TOKEN_SECRET`, `RESEND_API_KEY` and `NEXT_PUBLIC_SITE_URL` on Vercel,
  and verify a Resend sending domain.
- Run Lighthouse on the production URL, and check share previews after deploy.
- Confirm every `TODO(owner)` figure, and add client names only where cleared.
- The Mobile service visual is real RallyLens UI laid out in phone frames.
  Replace it with a genuine mobile app screenshot when one exists.
- Three clips are still held back: `theft-8s` (shows retail branding), and
  `passenger-8s` and `tshirt-8s` (identifiable faces). They need masking or
  consent before they can be used.
