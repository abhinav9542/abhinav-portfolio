import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { heroMorphStore, useHeroMorphed } from '@/three/sculptureStore'

/**
 * Turns the landing page's black hole into the logo (and back).
 *
 * Two real <button>s sit over the sculpture: a large transparent one covering
 * the whole black hole, and a visible label beneath it. They are ordinary DOM
 * elements, so the browser delivers the click itself — no hit-testing against
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
      <button
        {...shared}
        className="pointer-events-auto absolute left-1/2 top-[calc(50%+30vh)] flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-terracotta hover:text-terracotta-dark"
      >
        <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta motion-reduce:animate-none" />
        {morphed ? 'Back to the black hole' : 'Tap to reveal my logo'}
      </button>
    </>
  )
}
