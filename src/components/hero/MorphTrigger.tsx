import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { heroMorphStore, useHeroMorphed } from '@/three/sculptureStore'

/**
 * Turns the landing page's black hole into the logo (and back).
 *
 * A large transparent <button> sits over the black hole. It is an ordinary DOM
 * element, so the browser delivers the click itself — no hit-testing against
 * the 3D scene — and mouse, touch and keyboard all work.
 *
 * A long press is the "blast" gesture instead, so a click only counts if the
 * press was short. Press and release are timed by their own event timestamps,
 * not the clock when our handler runs: the 3D scene can stall a few frames,
 * and a quick click must not look like a long press.
 */
const TAP_MS = 450

export function MorphTrigger() {
  const morphed = useHeroMorphed()
  const down = useRef(0)
  const up = useRef(0)

  const onPointerDown = (e: PointerEvent) => {
    down.current = e.timeStamp
    up.current = 0
  }
  const onPointerUp = (e: PointerEvent) => {
    up.current = e.timeStamp
  }
  const onClick = (e: MouseEvent) => {
    const end = up.current || e.timeStamp
    const held = down.current ? end - down.current : 0
    down.current = 0
    up.current = 0
    if (held > TAP_MS) return // a long press is "blast", handled by the scene
    heroMorphStore.toggle()
  }

  const shared = {
    type: 'button' as const,
    'aria-pressed': morphed,
    onPointerDown,
    onPointerUp,
    onClick,
  }

  return (
    <>
      <button
        {...shared}
        aria-label={morphed ? 'Return the logo to the black hole' : 'Turn the black hole into my logo'}
        className="pointer-events-auto absolute left-1/2 top-1/2 h-[46vh] w-[68vh] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
      />
    </>
  )
}
