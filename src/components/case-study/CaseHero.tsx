import { motion } from 'framer-motion'
import type { CaseStudy, ProjectData } from '@/types/project'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Full-bleed opening: the cover sinks into the page's dark, the title is set
 * large on the left, and role / team / tools / year sit in a glass panel.
 *
 * With `heroMirrored` the cover is flipped and the facts panel is left out, so
 * a product pictured at the bottom of the photo stays clear of the title
 * instead of sitting behind it.
 */
export function CaseHero({ project, study }: { project: ProjectData; study: CaseStudy }) {
  const image = study.heroImage ?? { src: project.coverImage, alt: project.title }
  const mirrored = Boolean(study.heroMirrored)

  const facts = (
    <motion.dl
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
      className={
        mirrored
          ? 'grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-white/12 bg-black/35 p-6 backdrop-blur-md'
          : 'rounded-2xl border border-white/12 bg-black/35 p-6 backdrop-blur-md lg:col-span-5'
      }
    >
      {study.facts.map((fact, i) => (
        <div key={fact.label} className={!mirrored && i ? 'mt-4 border-t border-white/10 pt-4' : ''}>
          <dt className="text-[11px] font-medium uppercase tracking-[0.28em] text-terracotta">{fact.label}</dt>
          <dd className="mt-1.5 text-[15px] leading-snug text-ink">{fact.value}</dd>
        </div>
      ))}
    </motion.dl>
  )

  return (
    <header className="relative isolate flex min-h-[92vh] items-end overflow-hidden px-6 pb-16 pt-40 sm:px-10">
      {image.src && (
        <img
          src={image.src}
          alt=""
          aria-hidden
          className={`absolute inset-0 -z-20 h-full w-full object-cover ${mirrored ? 'opacity-75' : 'opacity-45'}`}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: mirrored
            ? 'linear-gradient(to bottom, rgba(5,5,7,0.5) 0%, rgba(5,5,7,0.1) 30%, rgba(5,5,7,0.15) 60%, rgba(5,5,7,0.8) 88%, #050507 100%), linear-gradient(to right, rgba(5,5,7,0.55) 0%, transparent 55%)'
            : 'linear-gradient(to bottom, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.25) 35%, rgba(5,5,7,0.85) 82%, #050507 100%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(255,90,31,0.18), transparent 70%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
            className="mt-6 font-display text-6xl leading-[0.95] text-navy sm:text-8xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
          >
            {project.tagline}
          </motion.p>
        </div>

        {!mirrored && facts}
      </div>
    </header>
  )
}
