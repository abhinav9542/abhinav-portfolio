import type { ProjectImage } from '@/types/project'

interface ProjectImageBlockProps {
  image: ProjectImage
  aspect?: string
}

export function ProjectImageBlock({ image, aspect = 'aspect-[4/3]' }: ProjectImageBlockProps) {
  const aspectClass = image.aspect ?? aspect

  return (
    <figure>
      <div className={`overflow-hidden rounded-2xl bg-cream-dark ${aspectClass}`}>
        {image.src ? (
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy/10 via-cream-dark to-terracotta/10 p-4 text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              {image.alt}
            </span>
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-warm-gray">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}
