import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import { ProjectHero } from '@/components/project-detail/ProjectHero'
import { ProjectSection } from '@/components/project-detail/ProjectSection'
import { ProjectNav } from '@/components/project-detail/ProjectNav'
import { useProjectTheme } from '@/hooks/useProjectTheme'
import { useLenis } from '@/hooks/useLenis'

/** /work/:slug/details — the full case study; the mind map at /work/:slug links in here. */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const location = useLocation()
  const lenis = useLenis()
  useProjectTheme(project?.theme)

  // A mind-map branch links to its section via the hash.
  useEffect(() => {
    if (!location.hash) return
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

  return (
    <article>
      {project.overview && (
        <div className="px-6 pt-28 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <Link
              to={`/work/${project.slug}`}
              className="text-sm font-medium text-warm-gray transition-colors hover:text-terracotta-dark"
            >
              ← Back to overview
            </Link>
          </div>
        </div>
      )}
      <ProjectHero project={project} compactTop={Boolean(project.overview)} />
      <div className="px-6 sm:px-10">
        {project.sections.map((section) => (
          <ProjectSection key={section.id} section={section} />
        ))}
      </div>
      <ProjectNav prev={prev} next={next} />
    </article>
  )
}
