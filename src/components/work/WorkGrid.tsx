import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { ProjectData } from '@/types/project'
import { ProjectCard } from './ProjectCard'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { SculptureStop } from '@/components/sculpture/SculptureStop'
import { sculptureStore, useWorkRevealed } from '@/three/sculptureStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1] as const

interface Branch {
  d: string
  endX: number
  endY: number
}

/**
 * Work is a stage: the travelling sculpture arrives full-size in the centre,
 * and double-clicking it (or the prompt button) shrinks it and grows one
 * branch out to each case study.
 */
export function WorkGrid() {
  const revealed = useWorkRevealed()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const isTouch = useMediaQuery('(hover: none)')
  const gesture = isTouch ? 'Double-tap' : 'Double-click'
  const stageRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [branches, setBranches] = useState<Branch[]>([])

  // Cards alternate sides around the sculpture on desktop.
  const sides: { side: 'left' | 'right'; items: { project: ProjectData; index: number }[] }[] = [
    { side: 'left', items: [] },
    { side: 'right', items: [] },
  ]
  projects.forEach((project, index) => sides[index % 2].items.push({ project, index }))

  useEffect(() => {
    if (!revealed) {
      setBranches([])
      return
    }

    const measure = () => {
      const stage = stageRef.current
      const anchor = anchorRef.current
      if (!stage || !anchor) return
      const s = stage.getBoundingClientRect()
      const a = anchor.getBoundingClientRect()
      const cx = a.left + a.width / 2 - s.left
      const cy = a.top + a.height / 2 - s.top

      const next: Branch[] = []
      for (const card of cardRefs.current) {
        if (!card) continue
        const c = card.getBoundingClientRect()
        if (isDesktop) {
          // From the sculpture's centre (hidden behind it) to the card's inner edge.
          const onLeft = c.left + c.width / 2 - s.left < cx
          const endX = (onLeft ? c.right : c.left) - s.left
          const endY = c.top + c.height / 2 - s.top
          const midX = (cx + endX) / 2
          next.push({ d: `M ${cx} ${cy} C ${midX} ${cy}, ${midX} ${endY}, ${endX} ${endY}`, endX, endY })
        } else {
          // Stacked: a stem down through the gaps to the top of each card.
          const endX = c.left + c.width / 2 - s.left
          const endY = c.top - s.top
          next.push({ d: `M ${cx} ${cy} L ${endX} ${endY}`, endX, endY })
        }
      }
      setBranches(next)
    }

    // Track the sculpture shrinking and the cards animating in, then only
    // re-measure on resize.
    let frame = 0
    const start = performance.now()
    const tick = () => {
      measure()
      if (performance.now() - start < 1400) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const observer = new ResizeObserver(measure)
    if (stageRef.current) observer.observe(stageRef.current)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [revealed, isDesktop])

  return (
    <SectionWrapper id="work" className="bg-cream-dark/40">
      <RevealOnScroll>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">Work</p>
        <AnimatedHeading
          as="h2"
          text="Selected case studies"
          className="font-display text-4xl text-navy sm:text-5xl"
        />
      </RevealOnScroll>

      <div ref={stageRef} className="relative mt-12 select-none">
        {/* Branches sit under the canvas and the cards, so they appear to grow
            out from behind the sculpture and tuck under each card. */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {branches.map((branch, index) => (
            <g key={index} className="text-terracotta">
              <motion.path
                d={branch.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
              />
              <motion.circle
                cx={branch.endX}
                cy={branch.endY}
                r={4}
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.3, ease: 'backOut' }}
              />
            </g>
          ))}
        </svg>

        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          {sides.map(({ side, items }) => (
            <div
              key={side}
              className={`flex flex-col gap-10 ${
                side === 'left' ? 'order-2 md:order-1 md:mb-32' : 'order-3 md:mt-32'
              }`}
            >
              <AnimatePresence>
                {revealed &&
                  items.map(({ project, index }) => (
                    <motion.div
                      key={project.slug}
                      ref={(el) => {
                        cardRefs.current[index] = el
                      }}
                      initial={{ opacity: 0, scale: 0.9, x: isDesktop ? (side === 'left' ? 60 : -60) : 0 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                      transition={{ delay: 0.55 + index * 0.1, duration: 0.6, ease: EASE }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          ))}

          <div className="order-1 flex flex-col items-center md:order-2">
            <SculptureStop
              ref={anchorRef}
              mode="reveal"
              opacity={1}
              particles={0.6}
              className={`shrink-0 transition-[width,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                revealed ? 'h-44 w-44 md:h-56 md:w-56' : 'h-[min(72vh,85vw)] w-[min(72vh,85vw)]'
              }`}
            />
            {/* Real button: the keyboard / no-WebGL path to the same toggle. */}
            <button
              type="button"
              onClick={sculptureStore.toggle}
              aria-expanded={revealed}
              className="relative z-10 mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-warm-gray transition-colors hover:text-terracotta-dark"
            >
              <span className="relative flex h-2 w-2">
                {!revealed && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta/60 motion-reduce:hidden" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
              </span>
              {revealed ? `${gesture} to close` : `${gesture} to see case studies`}
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
