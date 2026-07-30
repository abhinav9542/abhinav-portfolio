import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ProjectData } from '@/types/project'
import { Tag } from '@/components/ui/Tag'
import { useProjectCardTilt } from './useProjectCardTilt'

interface ProjectCardProps {
  project: ProjectData
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { rotateX, rotateY, handlePointerMove, handlePointerLeave } = useProjectCardTilt()

  return (
    // A themed project previews its own world in the grid: the same palette
    // override the case study uses, scoped to this one card.
    <Link
      to={`/work/${project.slug}`}
      className={`group block h-full ${project.theme === 'technical' ? 'theme-technical' : ''}`}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white-soft shadow-soft"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta/20 via-cream-dark to-navy/10 text-center">
              <span className="px-6 text-xs font-medium uppercase tracking-wider text-warm-gray">
                {project.isPlaceholder ? 'Case study coming soon' : project.title}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <h3 className="font-display text-2xl text-navy">{project.title}</h3>
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-navy/15 text-navy opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:border-terracotta group-hover:text-terracotta group-hover:opacity-100"
            >
              →
            </span>
          </div>
          <p className="mt-2 text-sm text-warm-gray">{project.tagline}</p>
        </div>
      </motion.div>
    </Link>
  )
}
