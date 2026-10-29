import { motion } from 'framer-motion'
import type { ProjectData } from '@/types/project'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The case study's title screen: the name set large, a few facts as margin
 * notes, and the cover as a small framed artefact rather than a page-wide
 * banner — then an invitation to begin.
 */
export function StoryHero({ project }: { project: ProjectData }) {
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Year', value: project.year },
    ...(project.meta ?? []),
  ]
  const minutes = Math.max(2, Math.round(project.sections.length * 0.5))

  return (
    <header className="relative mx-auto grid min-h-[78vh] max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-medium uppercase tracking-[0.35em] text-terracotta-dark"
        >
          A case study in {project.sections.length} chapters · {minutes} min
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-6 font-display text-6xl leading-[0.95] text-navy sm:text-7xl lg:text-8xl"
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-xl font-display text-xl italic leading-snug text-ink/75"
        >
          {project.tagline}
        </motion.p>
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
        >
          {facts.map((f) => (
            <div key={f.label} className="border-l border-terracotta/40 pl-3">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-warm-gray">{f.label}</dt>
              <dd className="mt-1 text-sm text-ink">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.figure
        initial={{ opacity: 0, rotate: 0, y: 30 }}
        animate={{ opacity: 1, rotate: 2, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: EASE }}
        className="mx-auto w-full max-w-sm lg:col-span-5"
      >
        <div className="overflow-hidden rounded-2xl border border-navy/10 p-2 shadow-soft">
          <img src={project.coverImage} alt={project.title} className="aspect-[4/5] w-full rounded-xl object-cover" />
        </div>
      </motion.figure>

      <motion.a
        href={`#${project.sections[0]?.id ?? ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute -bottom-4 left-0 text-xs font-medium uppercase tracking-[0.3em] text-warm-gray hover:text-terracotta-dark"
      >
        Begin the story ↓
      </motion.a>
    </header>
  )
}
