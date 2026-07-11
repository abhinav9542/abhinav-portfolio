import { useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { LenisContext } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafId = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      instance.destroy()
      setLenis(null)
    }
  }, [prefersReducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
