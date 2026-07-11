import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroCopyOverlay } from './HeroCopyOverlay'
import { HeroFallback } from './HeroFallback'

const HeroCanvas = lazy(() => import('./HeroCanvas').then((mod) => ({ default: mod.HeroCanvas })))

export function Hero() {
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
            'radial-gradient(ellipse 45% 50% at 78% 30%, rgba(210,96,58,0.10), transparent 70%), radial-gradient(ellipse 40% 45% at 15% 80%, rgba(26,36,64,0.07), transparent 70%), radial-gradient(ellipse 30% 35% at 60% 85%, rgba(231,205,171,0.25), transparent 70%)',
        }}
      />

      <Suspense fallback={<HeroFallback />}>
        <HeroCanvas scrollProgress={scrollYProgress} />
      </Suspense>
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
