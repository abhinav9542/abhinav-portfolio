import type { ProjectImage } from '@/types/project'

interface FigureProps {
  image: ProjectImage
  /** Tailwind aspect class used when the image doesn't set its own. */
  aspect?: string
  className?: string
  priority?: boolean
}

/**
 * A framed image with an optional caption. An empty `src` draws a labelled
 * placeholder in the same frame, so a layout can be judged before the final
 * artwork arrives.
 */
export function Figure({ image, aspect = 'aspect-[4/3]', className = '', priority }: FigureProps) {
  const ratio = image.aspect ?? aspect
  return (
    <figure className={`${className} ${image.width ? 'mx-auto' : ''}`} style={image.width ? { width: image.width } : undefined}>
      <div
        className={`relative ${ratio} ${
          image.bare ? '' : 'overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-[0_30px_80px_-40px_rgba(255,106,40,0.35)]'
        }`}
      >
        {image.src ? (
          <img
            src={image.src}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            draggable={false}
            className={`h-full w-full ${image.fit === 'contain' ? `object-contain ${image.bare ? '' : 'p-5'}` : 'object-cover'}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,106,40,0.10),transparent_70%)] text-center">
            <span aria-hidden className="h-8 w-8 rounded-full border border-terracotta/60" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-warm-gray">Image goes here</span>
            <span className="max-w-[18rem] px-4 text-xs text-warm-gray/70">{image.alt}</span>
          </div>
        )}
        {!image.bare && (
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        )}
      </div>
      {(image.caption || image.label) && (
        <figcaption className="mt-3 flex gap-3 text-xs text-warm-gray">
          {image.label && <span className="uppercase tracking-[0.2em] text-terracotta-dark">{image.label}</span>}
          {image.caption && <span>{image.caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}
