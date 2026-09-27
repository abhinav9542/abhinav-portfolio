import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { OverviewBranch, ProjectData, ProjectOverview } from '@/types/project'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1] as const

interface MindMapProps {
  project: ProjectData
  overview: ProjectOverview
}

interface Connector {
  d: string
  endX: number
  endY: number
}

/**
 * A case study as a mind map: the project at the centre, its story branching
 * out to both sides (stacked on a spine on small screens). Each branch links
 * straight into the matching section of the detailed case study.
 */
export function MindMap({ project, overview }: MindMapProps) {
  const isWide = useMediaQuery('(min-width: 1024px)')
  const stageRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const branchRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [connectors, setConnectors] = useState<Connector[]>([])

  // Branches alternate left / right so the story reads top to bottom on each side.
  const half = Math.ceil(overview.branches.length / 2)
  const left = overview.branches.slice(0, half).map((branch, i) => ({ branch, index: i }))
  const right = overview.branches.slice(half).map((branch, i) => ({ branch, index: half + i }))

  useEffect(() => {
    if (!isWide) {
      setConnectors([])
      return
    }
    const measure = () => {
      const stage = stageRef.current
      const hub = hubRef.current
      if (!stage || !hub) return
      const s = stage.getBoundingClientRect()
      const h = hub.getBoundingClientRect()
      const cx = h.left + h.width / 2 - s.left
      const cy = h.top + h.height / 2 - s.top
      const r = h.width / 2
      const next: Connector[] = []
      branchRefs.current.forEach((el) => {
        if (!el) return
        const b = el.getBoundingClientRect()
        const onLeft = b.left + b.width / 2 - s.left < cx
        const endX = (onLeft ? b.right : b.left) - s.left
        const endY = b.top + b.height / 2 - s.top
        // Start on the hub's rim, pointing toward the branch.
        const angle = Math.atan2(endY - cy, endX - cx)
        const startX = cx + Math.cos(angle) * r
        const startY = cy + Math.sin(angle) * r
        const midX = (startX + endX) / 2
        next.push({ d: `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`, endX, endY })
      })
      setConnectors(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (stageRef.current) observer.observe(stageRef.current)
    // Fonts and images settle after first paint.
    const timer = setTimeout(measure, 400)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [isWide])

  const renderBranch = ({ branch, index }: { branch: OverviewBranch; index: number }, side: 'left' | 'right') => (
    <motion.div
      key={branch.sectionId}
      initial={{ opacity: 0, x: isWide ? (side === 'left' ? -30 : 30) : 0, y: isWide ? 0 : 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.6, ease: EASE }}
    >
      <Link
        ref={(el) => {
          branchRefs.current[index] = el
        }}
        to={`/work/${project.slug}/details#${branch.sectionId}`}
        className="group relative flex items-center gap-4 rounded-2xl border border-navy/10 bg-white-soft p-4 shadow-soft transition-colors hover:border-terracotta/50"
      >
        {branch.image && (
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
            <img
              src={branch.image.src}
              alt={branch.image.alt}
              loading="lazy"
              className={`h-full w-full ${branch.image.fit === 'contain' ? 'object-contain p-1' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-xs text-terracotta">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display text-lg text-navy">{branch.label}</span>
          </p>
          <ul className="mt-1 space-y-0.5 text-sm leading-snug text-ink/75">
            {branch.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <span
          aria-hidden
          className="absolute right-3 top-3 text-xs text-terracotta opacity-0 transition-opacity group-hover:opacity-100"
        >
          ↗
        </span>
      </Link>
    </motion.div>
  )

  return (
    <div ref={stageRef} className="relative">
      {/* Connectors: drawn from the hub's rim to each branch once laid out. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
        {connectors.map((c, i) => (
          <g key={i} className="text-terracotta">
            <motion.path
              d={c.d}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}
            />
            <motion.circle
              cx={c.endX}
              cy={c.endY}
              r={3.5}
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.3 }}
            />
          </g>
        ))}
      </svg>

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
        {/* Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center lg:order-2 lg:w-80"
        >
          <div
            ref={hubRef}
            className="h-44 w-44 overflow-hidden rounded-full border-4 border-white-soft bg-cream-dark shadow-soft ring-1 ring-terracotta/40 sm:h-52 sm:w-52"
          >
            <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
          </div>
          <h1 className="mt-6 font-display text-4xl leading-tight text-navy sm:text-5xl">{project.title}</h1>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-terracotta-dark">
            {project.role} · {project.year}
          </p>
          <p className="mt-4 max-w-xs font-display text-lg italic leading-snug text-ink/80">
            {overview.question}
          </p>
        </motion.div>

        {/* Branches: a spine on small screens, two wings on large ones. */}
        <div className="relative flex flex-col gap-4 border-l border-terracotta/30 pl-5 lg:order-1 lg:gap-6 lg:border-none lg:pl-0">
          {left.map((item) => renderBranch(item, 'left'))}
        </div>
        <div className="relative flex flex-col gap-4 border-l border-terracotta/30 pl-5 lg:order-3 lg:gap-6 lg:border-none lg:pl-0">
          {right.map((item) => renderBranch(item, 'right'))}
        </div>
      </div>
    </div>
  )
}
