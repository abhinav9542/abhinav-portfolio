import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroCopyOverlay } from './HeroCopyOverlay'
import { SculptureStop } from '@/components/sculpture/SculptureStop'
import { MorphTrigger } from './MorphTrigger'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SCULPTURE_STYLE } from '@/theme'

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section id="home" ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Atmosphere: soft color washes behind the 3D scene */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 50% at 78% 30%, color-mix(in srgb, var(--color-terracotta) 10%, transparent), transparent 70%), radial-gradient(ellipse 40% 45% at 15% 80%, color-mix(in srgb, var(--color-navy) 7%, transparent), transparent 70%), radial-gradient(ellipse 30% 35% at 60% 85%, color-mix(in srgb, var(--color-sand) 25%, transparent), transparent 70%)',
        }}
      />

      {/* First stop of the travelling sculpture (drawn by SculptureCanvas):
          centred in the right-hand area, 72vh across. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-center justify-center md:w-[72%] lg:w-[60%]">
        {/* On phones the sculpture sits behind the headline; the bright black
            hole is dimmed there so the text stays readable. */}
        <SculptureStop
          mode={SCULPTURE_STYLE === 'blackhole' && !isMobile ? 'morph' : 'press'}
          opacity={isMobile && SCULPTURE_STYLE === 'blackhole' ? 0.35 : 1}
          particles={1}
          className="h-[72vh] w-[72vh] shrink-0"
        />
        {/* Real buttons over the black hole turn it into the logo (see MorphTrigger). */}
        {SCULPTURE_STYLE === 'blackhole' && !isMobile && <MorphTrigger />}
      </div>
      <HeroCopyOverlay scrollProgress={scrollYProgress} />

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-warm-gray">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-navy/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-terracotta"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
