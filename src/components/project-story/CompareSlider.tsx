import { useRef, useState, type PointerEvent } from 'react'
import type { ProjectImage } from '@/types/project'

interface CompareSliderProps {
  before: ProjectImage
  after: ProjectImage
}

/**
 * Before / after as one frame with a draggable divider — the redesign is
 * revealed by the reader's own hand instead of read off two side-by-side tiles.
 */
export function CompareSlider({ before, after }: CompareSliderProps) {
  const [split, setSplit] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const moveTo = (clientX: number) => {
    const el = frame.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setSplit(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  const onDown = (e: PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    moveTo(e.clientX)
  }

  const fit = (img: ProjectImage) => (img.fit === 'contain' ? 'object-contain' : 'object-cover')

  return (
    <figure>
      <div
        ref={frame}
        onPointerDown={onDown}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-cream-dark"
      >
        <img src={after.src} alt={after.alt} draggable={false} className={`absolute inset-0 h-full w-full ${fit(after)}`} />
        <img
          src={before.src}
          alt={before.alt}
          draggable={false}
          className={`absolute inset-0 h-full w-full ${fit(before)}`}
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        />
        <div aria-hidden className="absolute inset-y-0 w-px bg-terracotta" style={{ left: `${split}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta bg-cream text-xs text-terracotta">
            ⇆
          </span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-terracotta px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
          After
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Compare before and after"
          className="sr-only"
        />
      </div>
      <figcaption className="mt-3 text-xs text-warm-gray">Drag to compare the current product with the redesign.</figcaption>
    </figure>
  )
}
