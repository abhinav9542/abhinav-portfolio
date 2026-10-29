import { motion, useScroll, useSpring } from 'framer-motion'
import type { ProjectData, StoryBeat } from '@/types/project'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The case study as a short story: a title, then a handful of full-screen
 * moments — one line each, at most one quiet sentence and one image —
 * revealed as you scroll. Built for impact, not completeness; the full design
 * file lives in an appendix below.
 */
export function StoryBeats({ project, beats }: { project: ProjectData; beats: StoryBeat[] }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      {/* Reading progress. */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-terracotta"
        style={{ scaleX: progress }}
      />

      <header className="flex min-h-[86vh] flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.4em] text-warm-gray"
        >
          {project.role} · {project.year}
        </motion.p>
        <AnimatedHeading
          as="h1"
          text={project.title}
          className="mt-8 font-display text-6xl leading-[0.95] text-navy sm:text-8xl lg:text-9xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
          className="mt-10 text-xs uppercase tracking-[0.35em] text-terracotta-dark"
        >
          A story in {beats.length} moments ↓
        </motion.p>
      </header>

      {beats.map((beat, i) => (
        <Beat key={beat.line} beat={beat} index={i} />
      ))}
    </>
  )
}

function Beat({ beat, index }: { beat: StoryBeat; index: number }) {
  const flip = index % 2 === 1

  if (!beat.image) {
    // A breath: one line alone in the middle of the screen.
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        <Act text={beat.act} center />
        <AnimatedHeading
          as="h2"
          text={beat.line}
          className="mt-8 max-w-4xl font-display text-4xl leading-[1.08] text-navy sm:text-6xl"
        />
        {beat.aside && <Aside text={beat.aside} center />}
      </section>
    )
  }

  return (
    <section className="flex min-h-[75vh] items-center py-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-12">
        <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
          <Act text={beat.act} />
          <AnimatedHeading
            as="h2"
            text={beat.line}
            className="mt-8 font-display text-4xl leading-[1.08] text-navy sm:text-6xl"
          />
          {beat.aside && <Aside text={beat.aside} />}
        </div>
        <motion.figure
          initial={{ opacity: 0, y: 40, rotate: flip ? -3 : 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: flip ? -1.5 : 1.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE }}
          className={`mx-auto w-full max-w-xs md:col-span-5 ${flip ? 'md:order-1' : ''}`}
        >
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img
              src={beat.image.src}
              alt={beat.image.alt}
              loading="lazy"
              className={`aspect-[4/5] w-full ${beat.image.fit === 'contain' ? 'bg-cream-dark object-contain p-4' : 'object-cover'}`}
            />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

function Act({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-terracotta-dark ${
        center ? 'justify-center' : ''
      }`}
    >
      <span aria-hidden className="h-px w-8 bg-terracotta/60" />
      {text}
    </motion.p>
  )
}

function Aside({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
      className={`mt-8 max-w-md font-display text-lg italic leading-relaxed text-warm-gray ${center ? 'mx-auto' : ''}`}
    >
      {text}
    </motion.p>
  )
}
