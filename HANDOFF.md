# Abhinav Tomar Portfolio — Session Handoff

Last updated: 30 July 2026. Read this first when resuming in a new session.

**Status: built, committed, and deployed live.** Both case studies are real and
complete. See "Deployment — LIVE" below for URLs and the one-command update
flow. Nothing is half-finished; the open items are optional polish.

> **Back up before you delete anything.** The three source PDFs are gitignored
> and were stripped from git history, so they exist **only** on this disk and
> in the backup zip — GitHub does not have them. See "Source material is
> deliberately untracked".

## What this is

A 3D interactive portfolio site for **Abhinav Tomar** (Interaction Designer /
UX Researcher, Master's in Applied Psychology, currently doing Interaction
Design at UPES Dehradun). Built for his brother Abhishek.

Design inspiration: **trionn.com** — minimalist neutral palette, oversized
editorial type, WebGL-reactive hero, sticky nav, stats strip, work grid.

Location: `/Users/abhishek.tomar/Desktop/Abhi's Dementia Project`

## Stack

Vite + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in
`src/styles/globals.css` via `@theme` — **there is no tailwind.config.ts**) ·
Three.js via `@react-three/fiber` + `drei` · Framer Motion · Lenis smooth
scroll · React Router v7 · self-hosted Fraunces + Inter via `@fontsource`.

Run: `npm run dev` · `npm run build` · type-check `npx tsc -b`.
The dev server honours `PORT` (`vite.config.ts`) and `.claude/launch.json` sets
`autoPort`, so two sessions can run servers against this repo at once.

## Architecture

- `/` — single scrolling page: Hero → MarqueeStrip → About → Stats → Work → Contact
- `/work/:slug` — generic, fully data-driven case-study template
- `src/data/*.ts` is the **single source of truth for all content**. Adding a
  project = editing `src/data/projects.ts` only, zero component changes.
- `src/components/` grouped by section (hero, about, work, project-detail,
  contact, stats, home, layout, ui); `src/three/` holds all R3F code.

## Design system

Warm palette tokens: cream `#faf6ee` · cream-dark `#f1e8d9` · terracotta
`#d2603a` · terracotta-dark `#a34a28` · sand `#e7cdab` · warm-gray `#6b5c4f`
(darkened for WCAG AA) · navy `#1a2440` · ink `#26201a`.
Type: Fraunces (display) + Inter (body). Global film-grain overlay via
`body::after`. Signature easing `cubic-bezier(0.22, 1, 0.36, 1)`.

Hero: headline supports `*accent*` syntax for the italic terracotta word.
3D scene = distorted icosahedron + counter-rotating wireframe shell + particle
field, warm key light + cool blue rim light, mouse-reactive, click-and-hold
"blast", scroll-linked camera dolly. Canvas is confined to the right ~60%.

### Per-project theming (`.theme-technical`)

Every Tailwind utility compiles to `var(--color-*)`, so re-pointing the palette
variables on an ancestor re-themes everything beneath it and **no component
needs to know a theme exists**. `.theme-technical` in `globals.css` holds a dark
palette sampled from Abhinav's own industrial-design deck (`#0d0d0d` field,
`#2e80ff` accent, `#fbfbfb` headings; the eyebrow blue is lifted to `#5b9bff`
for 7:1 on dark).

It is applied in two places:
- `ProjectDetailPage` adds it to `<html>` for a project with `theme: 'technical'`
  (so nav, footer and body field come along), removing it on unmount.
- `ProjectCard` adds it to a single card so the work grid previews that world.

Two consequences to respect: it is deliberately **unlayered** CSS (Tailwind
emits `@theme` into `@layer theme`, and unlayered styles win regardless of
specificity, which matters because it lands on `:root` itself); and `Nav` must
never hardcode colour — its bar is a token-driven `bg-cream` layer whose
*opacity* animates, because Framer can't interpolate `var()`.

## Content status

- **Dementia Aid** (`/work/dementia-aid`) — REAL, complete. Warm theme. Images
  extracted from `Design project- Dementia.pdf` with PyMuPDF, cropped per
  region and auto-trimmed of the deck's periwinkle background.
- **Steam Deck OLED** (`/work/steam-deck-ergonomics`) — REAL, complete. Dark
  technical theme. An industrial-design ergonomics proposal (M.Des, guided by
  Dr. Samrat Dev) from `Changes/Project_02.pdf`. 12 sections: brief, product
  specification, anthropometric basis, 7 observations, ideation strip, four
  before/after improvements (grips, rear grip, trackpads, D-pad), symmetrical
  control layout, final rendition, in-hand.
  33 crops + a composed cover live in `public/projects/steam-deck-ergonomics/`.
- **Profile photo** — DONE. `public/about/abhinav.jpg` (B&W, 4:5), rendered by
  `components/about/Avatar.tsx`. `AvatarPlaceholder.tsx` is deleted.
- **LinkedIn** — in `site.social`, rendered as a pill in Contact and a link in
  the Footer. Still no other social links.

## Case-study section types

The two decks argue in genuinely different shapes, so the section union grew
rather than forcing the second into the first's structure. `ProjectSection`
dispatches on `type`: `text` · `imageGrid` · `moodboard` · `twoColumn` ·
`specs` (label/value groups) · `observations` (numbered cards) · `beforeAfter`
(paired figures + metrics + rationale) · `imageRow` (n-up, `columns` 1–5).

Cross-cutting fields: `wide` puts the section on the 6xl measure with its label
stacked above (the Steam Deck study uses this throughout; Dementia Aid keeps
the narrow 4xl two-column rhythm), and `bullets` / `bulletsHeading` work on any
type. On `ProjectImage`, `label` sets the eyebrow and `fit: 'contain'` is for
drawings that must not be cropped — contained figures also drop the plate
background so letterboxing disappears into the page.

## Source material is deliberately untracked

`Abhinav Tomar ATS Resume.pdf`, `Design project- Dementia.pdf` and
`Changes/Project_02.pdf` live on disk but are **gitignored** (`*.pdf`), and were
stripped from git history before the first push — the repo is public and the
resume carries a phone number and address. Don't re-add them. The site never
reads them; it only uses the images already extracted into `public/projects/`.

If you ever rewrite history again: `git filter-branch --index-filter` resets the
working tree at the end, which **deletes tracked files from disk**. Back up
`.git` first and restore any wanted files with
`git cat-file blob refs/original/refs/heads/main:"<path>" > "<path>"`.

## Asset pipeline (reusable)

Scripts used for the Steam Deck extraction are in this session's scratchpad,
but the method is what matters:

1. Render deck pages with PyMuPDF at 300dpi; crop regions with **fractional**
   coordinates so they're resolution independent.
2. Build a labelled contact sheet with a magenta frame per crop and **look at
   it** before wiring anything in. This caught slide captions bleeding into
   `final-*` crops, a neighbouring column bleeding into `final-rear`, and a
   card border doubling up in `dpad-proposal`.
3. Match each container's aspect ratio to its source, or the crop destroys
   information (the layout diagrams' callout chips were being sliced by
   `object-cover` until they moved to `contain`).
4. Compose covers rather than reusing a raw crop: the work-grid card is 4:3 and
   the hero is 16:9, so `cover.jpg` is laid out at 3:2 on a sampled field
   colour with a feathered paste, keeping the device inside both safe zones.

## Known environment quirks (not bugs in the code)

- **The in-app preview tab is backgrounded**: `document.hidden === true` and
  `requestAnimationFrame` fires **zero** frames. Every Framer Motion animation
  freezes mid-flight — headings stay at `opacity: 0`, `main` sticks at ~0.43,
  count-up stats read 0. Verified by measurement, not assumed. Don't "fix" code
  in response to it.
- To screenshot anyway: inject a stylesheet neutralising Framer's *inline*
  styles (`main{opacity:1}`, `[style*="opacity"]{opacity:1}`,
  `[style*="translate"]{transform:none}`) — utility classes like `opacity-0` on
  hover affordances stay intact. Then **pan by layout, not by scroll**: set
  `article{margin-top:-Npx}`. Scrolling produces no repaint in a hidden tab, so
  screenshots come back stale or blank; a style mutation reliably forces a paint.
- Vite HMR occasionally serves stale modules after edits to CSS tokens or 3D
  code — restart the dev server and clear `node_modules/.vite` before assuming
  a real regression.

## Tailwind v4 gotchas hit so far

- Arbitrary grid values containing a comma (e.g.
  `md:grid-cols-[minmax(0,320px)_1fr]`) silently break the responsive cascade
  and collapse the column to 0px. Use comma-free values.
- Don't emit `grid-cols-1` in a shared base string and a second unprefixed
  `grid-cols-N` from a lookup — the winner falls to CSS source order rather
  than intent. Each entry in `COLUMN_CLASS` carries its own base count.
- `sepia-[0.3]` generates no rule. Use an arbitrary property instead:
  `[filter:sepia(0.3)]`.

## Other traps worth remembering

- `mix-blend-soft-light` on an overlay inside the avatar figure flattened to an
  opaque wash and **hid the photo entirely**. The warm tone is now a `filter`
  on the image. Prefer filters over blend modes when a stacking context is
  involved.
- Grid items stretch by default: the "after" accent ring in `ProjectBeforeAfter`
  stretched to the row height until `items-start` was added.
- `getAdjacentProjects` returns only `next` when prev and next resolve to the
  same project — with two case studies the wrap-around otherwise showed the
  same link on both sides.

## Deployment — LIVE

- **Live site:** https://abhinav-portfolio-amber-five.vercel.app
- **Repo:** https://github.com/abhinav9542/abhinav-portfolio (public, `main`)
- **Vercel:** team "Abhinav" (Hobby), project `abhinav-portfolio`, Vite preset,
  auto-deploys on every push to `main`.

**To ship a change:** edit `src/data/projects.ts` (or wherever), then

```
git add -A && git commit -m "…" && git push
```

Vercel rebuilds automatically and the URL stays the same. No manual deploy step.

`vercel.json` holds an SPA rewrite — without it a direct visit or refresh on
`/work/<slug>` 404s, because the static host has no such file. Rewrites run
after Vercel's filesystem check, so hashed `/assets` still serve normally.
Verified in production: both case-study deep links return 200.

**gh auth:** this machine has two GitHub accounts in keyring — `abhinav9542`
(active, owns the repo) and `kaiwright7`. If a push ever 403s, check
`gh auth status` and `gh auth switch --user abhinav9542`.

Commits are authored as `Abhishek.Tomar <abhishek.tomar@N16768.local>`, a local
machine identity, so they don't link to a GitHub profile. Harmless; fix with
`git config user.email` if it ever matters.

### Not done yet

- The `-amber-five` suffix is Vercel's collision fallback, meaning
  `abhinav-portfolio.vercel.app` was already taken globally. Abhishek chose to
  keep the current name for now. To change it later: project overview →
  **Domains** tab (NOT Settings → Domains; this Vercel UI doesn't have that) →
  add e.g. `abhinav-tomar.vercel.app` → set as primary. Adding a domain keeps
  the old URL alive; renaming the project in Settings → General does not.
- Nobody has yet watched the site animate. Everything verified so far is
  structure, colour, contrast and network — see the rAF note under environment
  quirks. The 3D hero, scroll reveals and count-up stats were confirmed working
  in a real browser in an earlier session and the code is untouched, but a
  human should still open the live URL on a real device once.

## Related deliverables from earlier sessions

- Three reusable Claude skills in `~/.claude/skills/` and zipped to
  `~/Desktop/fable-5-skills.zip`: `design-taste`, `motion-craft`, `fable-method`.
- Backup archive: `~/Desktop/abhinav-portfolio-backup.zip`.
