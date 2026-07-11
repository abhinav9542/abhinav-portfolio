import { Navigate, useParams } from 'react-router-dom'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import { ProjectHero } from '@/components/project-detail/ProjectHero'
import { ProjectSection } from '@/components/project-detail/ProjectSection'
import { ProjectNav } from '@/components/project-detail/ProjectNav'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <Navigate to="/404" replace />
  }

  const { prev, next } = getAdjacentProjects(project.slug)

  return (
    <article>
      <ProjectHero project={project} />
      <div className="px-6 sm:px-10">
        <div className="mx-auto max-w-4xl">
          {project.sections.map((section) => (
            <ProjectSection key={section.id} section={section} />
          ))}
        </div>
      </div>
      <ProjectNav prev={prev} next={next} />
    </article>
  )
}
