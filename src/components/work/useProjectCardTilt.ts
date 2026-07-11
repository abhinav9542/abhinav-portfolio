import type { PointerEvent } from 'react'
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

interface ProjectCardTilt {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  handlePointerMove: (event: PointerEvent<HTMLElement>) => void
  handlePointerLeave: () => void
}

export function useProjectCardTilt(maxTilt = 8): ProjectCardTilt {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  })

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, handlePointerMove, handlePointerLeave }
}
