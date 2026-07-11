import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'

export function PageShell() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <div className="flex min-h-screen flex-col">
          <Nav />
          <AnimatePresence mode="wait">
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
