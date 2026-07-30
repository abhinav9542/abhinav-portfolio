import type { ProjectData } from '@/types/project'
import { Tag } from '@/components/ui/Tag'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'

interface ProjectHeroProps {
  project: ProjectData
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <header className="px-6 pb-16 pt-36 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <AnimatedHeading
          as="h1"
          text={project.title}
          className="mt-6 font-display text-5xl leading-tight text-navy sm:text-6xl"
        />

        <p className="mt-6 max-w-2xl text-lg text-warm-gray">{project.tagline}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 text-sm text-ink/70">
          {[
            { label: 'Role', value: project.role },
            { label: 'Year', value: project.year },
            ...(project.meta ?? []),
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wider text-terracotta-dark">
                {item.label}
              </dt>
              <dd className="mt-1">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-cream-dark">
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta/15 via-cream-dark to-navy/10">
            <span className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              {project.isPlaceholder ? 'Case study coming soon' : project.title}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
