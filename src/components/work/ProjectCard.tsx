import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ProjectData } from '@/types/project'
import { Tag } from '@/components/ui/Tag'
import { useProjectCardTilt } from './useProjectCardTilt'
import { SITE_THEME, THEME_CLASSES } from '@/theme'

/**
 * In the space themes the cards sit on the starfield, so they become dark
 * glass: translucent, a hairline border, the cover image inset and dimmed
 * until hover — instead of solid panels (and a cream poster) that pop out.
 */
const SPACE = THEME_CLASSES[SITE_THEME].includes('theme-deepspace')

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
      className={`group block h-full ${project.theme === 'technical' && !SPACE ? 'theme-technical' : ''}`}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className={
          SPACE
            ? 'relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md transition-[border-color,box-shadow] duration-500 group-hover:border-terracotta/45 group-hover:shadow-[0_0_60px_-20px_var(--color-terracotta)]'
            : 'relative flex h-full flex-col overflow-hidden rounded-2xl bg-white-soft shadow-soft'
        }
      >
        <div
          className={
            SPACE
              ? 'relative m-3 aspect-[16/10] shrink-0 overflow-hidden rounded-xl'
              : 'relative aspect-[4/3] w-full shrink-0 overflow-hidden'
          }
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className={`h-full w-full object-cover transition-[transform,filter] duration-500 group-hover:scale-105 ${
                SPACE ? 'brightness-[0.72] saturate-[0.8] group-hover:brightness-100 group-hover:saturate-100' : ''
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta/20 via-cream-dark to-navy/10 text-center">
              <span className="px-6 text-xs font-medium uppercase tracking-wider text-warm-gray">
                {project.isPlaceholder ? 'Case study coming soon' : project.title}
              </span>
            </div>
          )}
          {SPACE && (
            // Lets the image sink into the glass instead of ending in a hard edge.
            // A vignette also sinks light poster backgrounds (the Dementia Aid
            // cover is cream) into the glass; it lifts away on hover.
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse 70% 75% at 50% 45%, transparent 40%, rgba(5,5,10,0.7) 100%), linear-gradient(to top, rgba(5,5,10,0.55), transparent 40%)',
              }}
            />
          )}
        </div>

        <div className={SPACE ? 'px-6 pb-6 pt-3' : 'p-6'}>
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
          <p className={`mt-2 text-sm text-warm-gray ${SPACE ? 'line-clamp-2' : ''}`}>{project.tagline}</p>
        </div>
      </motion.div>
    </Link>
  )
}
