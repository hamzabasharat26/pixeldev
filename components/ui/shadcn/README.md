# shadcn primitives

`components.json` points `ui` here so `npx shadcn@latest add <name>` drops
unstyled Radix primitives in this folder without touching the hand-authored
design-system components in `components/ui/`.

Rules for anything added here:
- Re-theme to the navy/amber tokens in `app/globals.css` (`--color-navy`,
  `--color-amber`, `--color-surface-*`, `--font-*`). Do NOT introduce shadcn's
  oklch `--background`/`--primary` layer or a `.dark` variant system.
- `cn` comes from `@/lib/utils` (clsx + tailwind-merge). Do not add the `cn` npm
  package or `class-variance-authority` unless a primitive genuinely needs it.
- Keep `Button`, `Card`, `Tag`, etc. in `components/ui/` as the real API. These
  are lower-level building blocks only.
