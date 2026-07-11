import { motion, useTransform, type MotionValue } from 'framer-motion'
import { site } from '@/data/site'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { useScrollToSection } from '@/hooks/useScrollToSection'

interface HeroCopyOverlayProps {
  scrollProgress: MotionValue<number>
}

export function HeroCopyOverlay({ scrollProgress }: HeroCopyOverlayProps) {
  const opacity = useTransform(scrollProgress, [0, 0.6], [1, 0])
  const labelY = useTransform(scrollProgress, [0, 1], [0, -30])
  const headlineY = useTransform(scrollProgress, [0, 1], [0, -70])
  const subtextY = useTransform(scrollProgress, [0, 1], [0, -45])
  const ctaY = useTransform(scrollProgress, [0, 1], [0, -20])
  const scrollToSection = useScrollToSection()

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none relative z-10 flex h-full flex-col justify-center px-6 sm:px-10"
    >
      {/* Soft cream halo guarantees the headline stays legible regardless of
          where the 3D sculpture drifts underneath it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-4xl"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 22% 48%, rgba(245,239,230,0.96), rgba(245,239,230,0.55) 60%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          style={{ y: labelY }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark"
        >
          {site.role} · {site.roleSub}
        </motion.p>

        <motion.div style={{ y: headlineY }}>
          <AnimatedHeading
            as="h1"
            text={site.tagline}
            className="max-w-2xl font-display text-5xl leading-[1.05] text-navy sm:text-7xl lg:text-8xl"
          />
        </motion.div>

        <motion.p style={{ y: subtextY }} className="mt-6 max-w-md text-base text-warm-gray sm:text-lg">
          {site.subtagline}
        </motion.p>

        <motion.div
          style={{ y: ctaY }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-6"
        >
          <button
            type="button"
            onClick={() => scrollToSection('work')}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white-soft transition-colors duration-200 hover:bg-terracotta"
          >
            View Work
          </button>
          <span className="text-xs text-warm-gray">hold to blast — dare to touch the lines</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
