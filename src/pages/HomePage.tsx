import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/hero/Hero'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
import { AboutPreview } from '@/components/about/AboutPreview'
import { ExperienceSection } from '@/components/experience/ExperienceSection'
import { WorkGrid } from '@/components/work/WorkGrid'
import { StatsBar } from '@/components/stats/StatsBar'
import { ContactSection } from '@/components/contact/ContactSection'
import { useLenis } from '@/hooks/useLenis'

// Three.js is heavy; keep it out of the initial bundle.
const SculptureCanvas = lazy(() =>
  import('@/components/sculpture/SculptureCanvas').then((mod) => ({ default: mod.SculptureCanvas })),
)

export function HomePage() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const timer = setTimeout(() => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) lenis.scrollTo(target, { offset: -88 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }, 150)
    return () => clearTimeout(timer)
  }, [location.hash, lenis])

  return (
    <>
      {/* The sculpture travels between SculptureStops placed in the sections below. */}
      <Suspense fallback={null}>
        <SculptureCanvas />
      </Suspense>
      <Hero />
      <MarqueeStrip />
      <AboutPreview />
      <ExperienceSection />
      <StatsBar />
      <WorkGrid />
      <ContactSection />
    </>
  )
}
