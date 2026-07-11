import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CountUpProps {
  value: string
  className?: string
}

/**
 * Counts numeric values up from 0 when scrolled into view; non-numeric
 * prefixes/suffixes (e.g. "+", "2027") are handled gracefully — a pure
 * number animates, anything else renders as-is.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null

  useEffect(() => {
    const el = ref.current
    if (!el || numeric === null) return
    if (!inView) return
    if (reducedMotion) {
      el.textContent = String(numeric)
      return
    }
    const controls = animate(0, numeric, {
      duration: Math.min(1.4, 0.5 + numeric * 0.05),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        el.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, numeric, reducedMotion])

  return (
    <p ref={ref} className={className}>
      {numeric === null ? value : reducedMotion ? value : '0'}
    </p>
  )
}
