import { lazy, Suspense, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import type { OverviewBranch, ProjectData, ProjectOverview } from '@/types/project'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const VortexCanvas = lazy(() =>
  import('./VortexCanvas').then((mod) => ({ default: mod.VortexCanvas })),
)

// --- Stage & strip geometry (CSS px; "world" = before perspective) ----------
const STAGE_H = 640
const PERSPECTIVE = 1100
const PANEL_W = 270
const PANEL_H = 400
/** Panels are drawn at this fraction of their layout size. */
const PANEL_SCALE = 0.9
/** Panels sit edge to edge; this hairline is where the light shows through. */
const SPACING = (PANEL_W + 6) * PANEL_SCALE
/** Panels advance this many per second when left alone. */
const DRIFT = 0.055

interface GravityWellProps {
  project: ProjectData
  overview: ProjectOverview
}

interface Path {
  /** Point and facing at arc-length s along the strip. */
  at: (s: number) => { x: number; z: number; angle: number }
  length: number
}

/**
 * The strip's centre line: a quadratic curve in the x–z plane from the near
 * left (large on screen) to the black hole (deep and small), bending toward
 * the hole near the end. Built so its two ends land at chosen screen points.
 */
function makePath(width: number, holeRel: number, holeR: number): Path {
  const project = (screen: number, z: number) => (screen * (PERSPECTIVE - z)) / PERSPECTIVE
  const zA = 120
  const zB = -1250
  const A = { x: project(-0.37 * width, zA), z: zA }
  const B = { x: project(holeRel - holeR * 1.05, zB), z: zB }
  const C = { x: A.x + (B.x - A.x) * 0.62, z: zA - 260 }

  const point = (t: number) => {
    const m = 1 - t
    return {
      x: m * m * A.x + 2 * m * t * C.x + t * t * B.x,
      z: m * m * A.z + 2 * m * t * C.z + t * t * B.z,
    }
  }
  // Arc-length table so panels keep even spacing along the curve.
  const N = 200
  const ts: number[] = [0]
  const ss: number[] = [0]
  let prev = point(0)
  for (let i = 1; i <= N; i++) {
    const t = i / N
    const q = point(t)
    ss.push(ss[i - 1] + Math.hypot(q.x - prev.x, q.z - prev.z))
    ts.push(t)
    prev = q
  }
  const length = ss[N]
  const at = (s: number) => {
    const target = Math.min(Math.max(s, 0), length)
    let lo = 0
    let hi = N
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (ss[mid] < target) lo = mid
      else hi = mid
    }
    const f = (target - ss[lo]) / Math.max(ss[hi] - ss[lo], 1e-6)
    const t = ts[lo] + (ts[hi] - ts[lo]) * f
    const q = point(t)
    const q2 = point(Math.min(t + 0.002, 1))
    const q1 = point(Math.max(t - 0.002, 0))
    // Face along the curve: the far edge of each panel turns toward the hole.
    const angle = Math.atan2(-(q2.z - q1.z), q2.x - q1.x)
    return { x: q.x, z: q.z, angle }
  }
  return { at, length }
}

/**
 * The case study as a gravity well: its stages are panels on one continuous
 * strip, receding in perspective and drawn slowly into a black hole. As the
 * nearest panel is swallowed the sequence carries on from the left, round
 * and round. Drag to scrub; hover to hold still; click a panel to open it.
 */
export function GravityWell({ project, overview }: GravityWellProps) {
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1400)
  const n = overview.branches.length

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setWidth(el.clientWidth))
    observer.observe(el)
    setWidth(el.clientWidth)
    return () => observer.disconnect()
  }, [])

  // Hole: centre near the right edge, large, bleeding off the page.
  const holeR = STAGE_H * 0.304
  const holeX = width - Math.max(150, width * 0.1)
  const holeY = STAGE_H / 2
  const holeRel = holeX - width / 2
  const path = useMemo(() => makePath(width, holeRel, holeR), [width, holeRel, holeR])
  const visible = Math.ceil(path.length / SPACING) + 1

  // o: travel along the strip, in panels. Panel i sits at s = (o - i) * SPACING.
  const o = useRef(0.35)
  const [base, setBase] = useState(0)
  const panelRefs = useRef(new Map<number, HTMLDivElement>())
  const hovering = useRef(false)
  const drag = useRef<{ x: number; o0: number; moved: boolean } | null>(null)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const place = () => {
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (!reducedMotion && !hovering.current && !drag.current) o.current += dt * DRIFT
      const b = Math.floor(o.current)
      setBase((prev) => (prev === b ? prev : b))
      panelRefs.current.forEach((el, i) => {
        const s = (o.current - i) * SPACING
        const u = s / path.length
        const { x, z, angle } = path.at(s)
        // Fade in from the left edge; at the hole, shrink, stretch and vanish.
        const fadeIn = Math.min(1, Math.max(0, u / 0.06))
        const swallow = Math.min(1, Math.max(0, (u - 0.74) / 0.24))
        const opacity = Math.min(fadeIn, 1 - swallow)
        const squeeze = 1 - 0.45 * swallow
        el.style.opacity = String(opacity)
        el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible'
        el.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${angle}rad) scale(${PANEL_SCALE * (1 + 0.15 * swallow)}, ${PANEL_SCALE * squeeze}) translate(-50%, -50%)`
        el.style.filter = swallow > 0 ? `brightness(${1 + swallow * 0.8}) sepia(${swallow * 0.6})` : ''
      })
      raf = requestAnimationFrame(place)
    }
    raf = requestAnimationFrame(place)
    return () => cancelAnimationFrame(raf)
  }, [path, reducedMotion])

  const step = (delta: number) => {
    const from = o.current
    const to = Math.round(from) + delta
    const start = performance.now()
    const tick = () => {
      const k = Math.min(1, (performance.now() - start) / 700)
      const e = 1 - Math.pow(1 - k, 3)
      o.current = from + (to - from) * e
      if (k < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, o0: o.current, moved: false }
  }
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) d.moved = true
    o.current = d.o0 + dx / (SPACING * 0.75)
  }
  const endDrag = () => {
    if (!drag.current) return
    if (drag.current.moved) {
      window.addEventListener('click', (ev) => ev.preventDefault(), { capture: true, once: true })
    }
    drag.current = null
  }

  // Fibres of light sweeping along the strip into the hole's rim.
  const lanes = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => {
      const above = i % 2 === 0
      const spread = 0.15 + (0.85 * ((i * 7) % 17)) / 16
      const y0 = holeY + (above ? -1 : 1) * (PANEL_H * PANEL_SCALE * 0.42 + spread * 170)
      // Enter the rim on its upper/lower left quarter.
      const ang = Math.PI + (above ? -1 : 1) * (0.35 + spread * 1.1)
      const ex = holeX + Math.cos(ang) * holeR * 1.06
      const ey = holeY + Math.sin(ang) * holeR * 1.06
      const d = `M -60 ${y0} C ${width * 0.35} ${y0 + (above ? 40 : -40)}, ${holeX - holeR * 2.2} ${holeY + (above ? -1 : 1) * holeR * (0.9 + spread * 0.6)}, ${ex} ${ey}`
      return { d, w: 0.4 + (1 - spread) * 1.1, op: 0.12 + (1 - spread) * 0.45, dur: 3 + (i % 7) * 0.7 }
    })
  }, [width, holeX, holeY, holeR])

  const indices: number[] = []
  for (let i = base - visible; i <= base + 1; i++) indices.push(i)
  const branchOf = (i: number): { branch: OverviewBranch; index: number } => {
    const index = ((-i % n) + n) % n
    return { branch: overview.branches[index], index }
  }

  return (
    <div
      ref={stageRef}
      role="region"
      aria-label={`${project.title} — case study timeline`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        endDrag()
        hovering.current = false
      }}
      className="relative cursor-grab select-none outline-none active:cursor-grabbing"
      style={{ height: STAGE_H, touchAction: 'pan-y' }}
    >
      {/* The black hole whirlpool, bleeding past the stage on every side. */}
      <div className="pointer-events-none absolute -bottom-40 -top-40 left-0 right-0">
        <Suspense fallback={null}>
          <VortexCanvas
            center={[holeX / width, (holeY + 160) / (STAGE_H + 320)]}
            radius={holeR / (STAGE_H + 320)}
            paused={reducedMotion}
          />
        </Suspense>
      </div>

      {/* Light fibres */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="fibre" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0" />
            <stop offset="45%" stopColor="#ff6a2a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffc08a" stopOpacity="1" />
          </linearGradient>
        </defs>
        {lanes.map((lane, i) => (
          <g key={i} opacity={lane.op}>
            <path d={lane.d} fill="none" stroke="url(#fibre)" strokeWidth={lane.w} />
            {!reducedMotion && (
              <path
                d={lane.d}
                fill="none"
                stroke="#ffd9b5"
                strokeWidth={lane.w * 1.3}
                strokeDasharray="1.5 60"
                strokeLinecap="round"
                className="gravity-flow"
                style={{ animationDuration: `${lane.dur}s` }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* The strip */}
      <div
        className="absolute inset-0"
        style={{ perspective: PERSPECTIVE, perspectiveOrigin: '50% 50%' }}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => (hovering.current = false)}
      >
        <div className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
          {indices.map((i) => {
            const { branch, index } = branchOf(i)
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) panelRefs.current.set(i, el)
                  else panelRefs.current.delete(i)
                }}
                className="absolute left-0 top-0"
                style={{ width: PANEL_W, height: PANEL_H, visibility: 'hidden', willChange: 'transform, opacity' }}
              >
                <Panel branch={branch} index={index} href={`/work/${project.slug}/details#${branch.sectionId}`} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute -bottom-2 left-1/2 flex w-full max-w-6xl -translate-x-1/2 items-center gap-4 px-6 sm:px-10">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Pull the story back out"
          className="h-9 w-9 rounded-full border border-white/15 text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Pull the story into the black hole"
          className="h-9 w-9 rounded-full border border-white/15 text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          →
        </button>
        <span className="text-xs uppercase tracking-[0.25em] text-warm-gray">Drag to travel · hover to hold</span>
      </div>
    </div>
  )
}

function Panel({ branch, index, href }: { branch: OverviewBranch; index: number; href: string }) {
  return (
    <Link
      to={href}
      draggable={false}
      className="group relative flex h-full w-full flex-col overflow-hidden border border-[#ff7a3a]/45 bg-[#07070b]/92 shadow-[0_0_24px_-6px_rgba(255,106,40,0.55)] transition-colors duration-300 hover:border-[#ffb070]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {/* Glowing top and bottom edges — the strip's rails of light. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff6a2a]/30 via-[#ffb070] to-[#ff6a2a]/30" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#ff6a2a]/30 via-[#ffb070] to-[#ff6a2a]/30" />
      <div className="px-6 pt-6">
        <p className="font-display text-4xl leading-none text-terracotta">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-4 font-display text-3xl leading-tight text-navy">{branch.label}</h3>
        <p className="mt-3 text-[15px] leading-snug text-ink/75">{branch.points.join(' ')}</p>
      </div>
      {branch.image && (
        <div className="relative mt-auto h-[48%] overflow-hidden">
          <img
            src={branch.image.src}
            alt={branch.image.alt}
            draggable={false}
            className={`h-full w-full ${branch.image.fit === 'contain' ? 'object-contain p-4' : 'object-cover'} brightness-[0.8] saturate-[0.8] transition-[filter] duration-500 group-hover:brightness-100 group-hover:saturate-100`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #07070b 0%, transparent 35%, transparent 75%, rgba(7,7,11,0.6))' }}
          />
        </div>
      )}
    </Link>
  )
}
