import { Link } from 'react-router-dom'
import type { ProjectData } from '@/types/project'
import { useScrollToSection } from '@/hooks/useScrollToSection'

interface ProjectNavProps {
  prev?: ProjectData
  next?: ProjectData
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  const scrollToSection = useScrollToSection()

  return (
    <nav className="border-t border-navy/10 px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('work')}
          className="text-left text-sm font-medium text-warm-gray hover:text-terracotta-dark"
        >
          ← Back to all work
        </button>

        <div className="flex gap-6">
          {prev && (
            <Link to={`/work/${prev.slug}`} className="text-sm font-medium text-ink hover:text-terracotta-dark">
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link to={`/work/${next.slug}`} className="text-sm font-medium text-ink hover:text-terracotta-dark">
              {next.title} →
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
