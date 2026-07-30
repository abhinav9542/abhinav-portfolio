# Abhinav Tomar Portfolio — Session Handoff

Last updated: 30 July 2026. Read this first when resuming in a new session.

## What this is

A 3D interactive portfolio site for **Abhinav Tomar** (Interaction Designer /
UX Researcher, Master's in Applied Psychology, currently doing Interaction
Design at UPES Dehradun). Built for his brother Abhishek.

Design inspiration: **trionn.com** — minimalist neutral palette, oversized
editorial type, WebGL-reactive hero, sticky nav, stats strip, work grid.

Location: `/Users/abhishek.tomar/Desktop/Abhi's Dementia Project`
Git: one commit on `main` (`4cb936e`), everything committed, no remote yet.

## Stack

Vite + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in
`src/styles/globals.css` via `@theme` — **there is no tailwind.config.ts**) ·
Three.js via `@react-three/fiber` + `drei` · Framer Motion · Lenis smooth
scroll · React Router v7 · self-hosted Fraunces + Inter via `@fontsource`.

Run: `npm run dev` (port 5173) · `npm run build` · type-check `npx tsc -b`.

## Architecture

- `/` — single scrolling page: Hero → MarqueeStrip → About → Stats → Work → Contact
- `/work/:slug` — generic, fully data-driven case-study template
- `src/data/*.ts` is the **single source of truth for all content**. Adding a
  project = editing `src/data/projects.ts` only, zero component changes.
- `src/components/` grouped by section (hero, about, work, project-detail,
  contact, stats, home, layout, ui); `src/three/` holds all R3F code.

## Design system (current, after the upgrade pass)

Palette tokens: cream `#faf6ee` · cream-dark `#f1e8d9` · terracotta `#d2603a` ·
terracotta-dark `#a34a28` · sand `#e7cdab` · warm-gray `#6b5c4f` (darkened for
WCAG AA) · navy `#1a2440` · ink `#26201a`.
Type: Fraunces (display) + Inter (body). Global film-grain overlay via
`body::after`. Signature easing `cubic-bezier(0.22, 1, 0.36, 1)`.

Hero: headline supports `*accent*` syntax for the italic terracotta word
(`site.tagline` = `'Designing for\nthe *human* mind.'`, rendered by
`AnimatedHeading`). 3D scene = distorted icosahedron + counter-rotating
wireframe shell + particle field, warm key light + cool blue rim light,
mouse-reactive, click-and-hold "blast", scroll-linked camera dolly. Canvas is
confined to the right ~60% so copy stays legible.

Motion: word-stagger heading reveals, layered hero parallax, scroll reveals,
count-up stats, nav hides on scroll-down, timeline spine draws itself, card
tilt + hover arrows. All gated on `prefers-reduced-motion`.

## Content status

- **Dementia Aid** case study (`/work/dementia-aid`) — REAL content, complete.
  Images were extracted from `Design project- Dementia.pdf` with a Python
  script (PyMuPDF), cropped per-region, and auto-trimmed to remove the deck's
  periwinkle slide background. Output lives in
  `public/projects/dementia-aid/`. Sections: problem statement, research,
  challenges (3 storyboards), mood board, Mem Pebble, Anvika Button, product
  development.
- **Project Two** — placeholder, awaiting real content.
- **Profile photo** — NOT provided yet. `AvatarPlaceholder.tsx` renders an
  on-brand abstract SVG with a "Photo coming soon" badge. Swap when supplied.
- **Social links** — none provided; `site.social` is an empty array. Contact
  section shows only email + phone from the resume.

## Immediate next step: deploy (was in progress)

Decision made: **GitHub + Vercel auto-deploy** (chosen over `vercel --prod`
direct deploys, for backup/portfolio-proof/automation reasons).

Blocked on the user creating two free accounts:
1. github.com/signup — professional username (his portfolio will be public)
2. vercel.com/signup → "Continue with GitHub" → Hobby plan

Then: authenticate git to GitHub, push the existing commit, import the repo on
Vercel (Vite preset is auto-detected), get the live URL. Weekly updates after
that are `git push` → auto-redeploy, same URL.

Note: `gh` CLI is NOT installed on this machine. Either install it
(`brew install gh`) or use a plain `git remote add` + credential flow.

## Known environment quirks (not bugs in the code)

- The in-app preview tab throttles `requestAnimationFrame`, which freezes the
  3D canvas and entrance animations in screenshots. Verified working in a real
  browser. Don't "fix" the code in response to this.
- Vite HMR occasionally serves stale modules after edits to CSS tokens or 3D
  code — restart the dev server and clear `node_modules/.vite` if something
  looks wrong before assuming a real regression.
- Tailwind v4 gotcha: arbitrary grid values containing a comma (e.g.
  `md:grid-cols-[minmax(0,320px)_1fr]`) silently break the responsive cascade
  and collapse the column to 0px. Use comma-free values.

## Related deliverables from this session

- Three reusable Claude skills installed in `~/.claude/skills/` and zipped to
  `~/Desktop/fable-5-skills.zip`: `design-taste`, `motion-craft`,
  `fable-method` — they encode the visual taste, motion craft, and working
  methodology used to build this site, for use on any project with any model.
- Backup archive: `~/Desktop/abhinav-portfolio-backup.zip` (source + git
  history + assets + PDFs; excludes node_modules and dist).
