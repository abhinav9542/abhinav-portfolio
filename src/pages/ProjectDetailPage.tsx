import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import { CaseStudyView } from '@/components/case-study/CaseStudyView'
import { StoryHero } from '@/components/project-story/StoryHero'
import { StoryBeats } from '@/components/project-story/StoryBeats'
import { StoryChapter } from '@/components/project-story/StoryChapter'
import { ChapterRail } from '@/components/project-story/ChapterRail'
import { ProjectNav } from '@/components/project-detail/ProjectNav'
import { useProjectTheme } from '@/hooks/useProjectTheme'
import { useLenis } from '@/hooks/useLenis'
import { SITE_THEME, THEME_CLASSES } from '@/theme'

const SPACE = THEME_CLASSES[SITE_THEME].includes('theme-deepspace')

/**
 * /work/:slug/details — the case study told as a short story; every section,
 * spec and number stays available in the "full design file" below it.
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const location = useLocation()
  const lenis = useLenis()
  // In the space themes every page stays in the cosmos, like the overview.
  useProjectTheme(SPACE ? undefined : project?.theme)
  // A link to a specific section (from the overview) opens the file directly.
  const [fileOpen, setFileOpen] = useState(Boolean(location.hash))

  useEffect(() => {
    if (!location.hash) return
    setFileOpen(true)
    const id = decodeURIComponent(location.hash.slice(1))
    const timer = setTimeout(() => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) lenis.scrollTo(target, { offset: -96 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }, 450)
    return () => clearTimeout(timer)
  }, [location.hash, lenis])

  if (!project) {
    return <Navigate to="/404" replace />
  }

  const { prev, next } = getAdjacentProjects(project.slug)
  const story = project.story
  const study = project.caseStudy

  return (
    <article>
      {project.overview && (
        <div className="px-6 pt-28 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <Link
              to={`/work/${project.slug}`}
              className="text-sm font-medium text-warm-gray transition-colors hover:text-terracotta-dark"
            >
              ← Back to overview
            </Link>
          </div>
        </div>
      )}

      {study ? (
        <CaseStudyView project={project} study={study} />
      ) : (
      <div className="px-6 sm:px-10">
        {story ? <StoryBeats project={project} beats={story} /> : <StoryHero project={project} />}

        {story && (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-warm-gray">
              The specs, research and numbers behind it
            </p>
            <button
              type="button"
              onClick={() => setFileOpen((v) => !v)}
              aria-expanded={fileOpen}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-medium text-navy transition-colors hover:border-terracotta hover:text-terracotta-dark"
            >
              {fileOpen ? 'Close the full design file' : 'Open the full design file'}
              <span aria-hidden>{fileOpen ? '↑' : '↓'}</span>
            </button>
          </div>
        )}

        <AnimatePresence initial={false}>
          {(!story || fileOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {project.sections.map((section, index) => (
                <StoryChapter key={section.id} section={section} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
      {!study && (!story || fileOpen) && <ChapterRail sections={project.sections} />}
      <ProjectNav prev={prev} next={next} />
    </article>
  )
}
