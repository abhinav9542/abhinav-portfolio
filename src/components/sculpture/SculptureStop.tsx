import type { Ref } from 'react'

export type SculptureMode = 'press' | 'reveal' | 'none'

interface SculptureStopProps {
  /** What pointer input does while the sculpture rests here. */
  mode?: SculptureMode
  /** 1 = full colour, lower values fade it behind surrounding text. */
  opacity?: number
  /** Strength of the orbiting particle field, 0–1. */
  particles?: number
  /** 1 = the wire shell has dissolved and re-formed as the logo on the core. */
  form?: number
  className?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * An invisible box marking where the shared 3D sculpture should sit. The
 * sculpture's wire shell is fitted to this box, and it glides from stop to
 * stop (in document order) as each one crosses the middle of the viewport.
 * Position and size it with ordinary responsive classes.
 */
export function SculptureStop({
  mode = 'none',
  opacity = 1,
  particles = 0,
  form = 0,
  className = '',
  ref,
}: SculptureStopProps) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-sculpture-stop=""
      data-mode={mode}
      data-opacity={opacity}
      data-particles={particles}
      data-form={form}
      className={`pointer-events-none ${className}`}
    />
  )
}
