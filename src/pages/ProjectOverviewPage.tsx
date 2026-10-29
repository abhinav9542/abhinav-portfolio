import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, projects } from '@/data/projects'
import { MindMap } from '@/components/project-overview/MindMap'
import { GravityWell } from '@/components/project-overview/GravityWell'
import { useProjectTheme } from '@/hooks/useProjectTheme'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SITE_THEME, THEME_CLASSES } from '@/theme'

/** The space themes tell the case study as a gravity well; others as a mind map. */
const SPACE = THEME_CLASSES[SITE_THEME].includes('theme-deepspace')
const EASE = [0.22, 1, 0.36, 1] as const

/** /work/:slug — the case study at a glance, with the detailed page one click away. */
export function ProjectOverviewPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  // The well needs width for its perspective run; phones keep the mind map.
  const wide = useMediaQuery('(min-width: 1024px)')
  const well = SPACE && wide
  // Inside the cosmos the project keeps the site's space look rather than
  // switching to its own theme, so the well and its black hole stay coherent.
  useProjectTheme(well ? undefined : project?.theme)
  const scrollToSection = useScrollToSection()

  if (!project) return <Navigate to="/404" replace />
  // Without a written overview there is nothing to map — go straight to the detail.
  if (!project.overview) return <Navigate to={`/work/${project.slug}/details`} replace />

  const number = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, '0')

  return (
    <article className={`px-6 pb-20 sm:px-10 ${well ? 'pt-28' : 'pt-32'}`}>
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => scrollToSection('work')}
          className="mb-10 text-sm font-medium text-warm-gray transition-colors hover:text-terracotta-dark"
        >
          ← Back to all work
        </button>

        {well ? (
          <>
            <motion.header
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-start justify-between gap-10"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-6xl text-warm-gray/70">{number}</span>
                <span aria-hidden className="h-14 w-px bg-white/15" />
                <div>
                  <h1 className="font-display text-4xl uppercase tracking-wide text-navy">{project.title}</h1>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-warm-gray">
                    {project.role} · {project.year}
                  </p>
                </div>
              </div>
            </motion.header>
            {/* Full-bleed: the run of cards needs the whole width to spread out. */}
            <div className="relative left-1/2 -mt-16 w-screen -translate-x-1/2">
              <GravityWell project={project} overview={project.overview} />
            </div>
          </>
        ) : (
          <MindMap project={project} overview={project.overview} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
          className={`flex flex-col items-center gap-4 text-center ${well ? 'mt-10' : 'mt-16'}`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-warm-gray">
            {well ? 'Want the full story? Open any card, or' : 'Want the full story? Tap any branch, or'}
          </p>
          <Link
            to={`/work/${project.slug}/details`}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white-soft transition-colors hover:bg-terracotta"
          >
            View detailed case study
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </article>
  )
}
