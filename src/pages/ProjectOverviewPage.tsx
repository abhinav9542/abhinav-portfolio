import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug } from '@/data/projects'
import { MindMap } from '@/components/project-overview/MindMap'
import { useProjectTheme } from '@/hooks/useProjectTheme'
import { useScrollToSection } from '@/hooks/useScrollToSection'

/** /work/:slug — the case study at a glance, with the detailed page one click away. */
export function ProjectOverviewPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  useProjectTheme(project?.theme)
  const scrollToSection = useScrollToSection()

  if (!project) return <Navigate to="/404" replace />
  // Without a written overview there is nothing to map — go straight to the detail.
  if (!project.overview) return <Navigate to={`/work/${project.slug}/details`} replace />

  return (
    <article className="px-6 pb-20 pt-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => scrollToSection('work')}
          className="mb-10 text-sm font-medium text-warm-gray transition-colors hover:text-terracotta-dark"
        >
          ← Back to all work
        </button>

        <MindMap project={project} overview={project.overview} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-warm-gray">
            Want the full story? Tap any branch, or
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
