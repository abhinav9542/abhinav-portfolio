import { useEffect } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'

export function PageShell() {
  const location = useLocation()
  const outlet = useOutlet()

  // Every page starts at its top; otherwise a case study opens at the
  // footer, wherever the page before it was scrolled to.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <div className="flex min-h-screen flex-col">
          <Nav />
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              {outlet}
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
