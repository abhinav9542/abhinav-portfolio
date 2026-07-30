# Abhinav Tomar Portfolio — Session Handoff

Last updated: 30 July 2026. Read this first when resuming in a new session.

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

## Immediate next step: deploy (still pending)

Decision made: **GitHub + Vercel auto-deploy**.

Blocked on account setup. `gh` is installed and currently authenticated as
`kaiwright7`; Abhishek chose to create a **fresh GitHub account with a
professional username** for this instead, since the repo will be public.

1. github.com/signup — professional username
2. `gh auth login --hostname github.com --git-protocol https --web`, then
   `gh auth switch` to make it active
3. `gh repo create abhinav-portfolio --public --source=. --push`
4. vercel.com/signup → "Continue with GitHub" → import the repo (Vite preset is
   auto-detected) → get the live URL

Weekly updates after that are `git push` → auto-redeploy, same URL.

## Related deliverables from earlier sessions

- Three reusable Claude skills in `~/.claude/skills/` and zipped to
  `~/Desktop/fable-5-skills.zip`: `design-taste`, `motion-craft`, `fable-method`.
- Backup archive: `~/Desktop/abhinav-portfolio-backup.zip`.
