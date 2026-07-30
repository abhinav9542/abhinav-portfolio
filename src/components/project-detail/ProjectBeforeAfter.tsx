import type { Metric, ProjectImage } from '@/types/project'
import { ProjectImageBlock } from './ProjectImageBlock'
import { ProjectBullets } from './ProjectBullets'

interface ProjectBeforeAfterProps {
  images: ProjectImage[]
  extras?: ProjectImage[]
  metrics?: Metric[]
  bullets?: string[]
  bulletsHeading?: string
}

/**
 * The core move of an ergonomics proposal: show the current condition against
 * the proposed one, then quantify the delta. The "after" figure carries an
 * accent ring so the eye lands on the proposal, not the baseline.
 */
export function ProjectBeforeAfter({
  images,
  extras,
  metrics,
  bullets,
  bulletsHeading,
}: ProjectBeforeAfterProps) {
  const hasExtras = Boolean(extras?.length)

  return (
    <div className="space-y-10">
      {/* items-start matters: without it a grid item stretches to the row
          height and drags the "after" accent ring below its own image. */}
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={image.src || image.alt}
            className={index === 1 ? 'rounded-3xl p-1 ring-1 ring-terracotta/40' : 'p-1'}
          >
            <ProjectImageBlock image={image} />
          </div>
        ))}
      </div>

      {/* Supporting drawings get their own row rather than a narrow side rail:
          stacked beside the pair they were twice its height, leaving a void. */}
      {hasExtras && (
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
          {extras?.map((extra) => (
            <ProjectImageBlock key={extra.src || extra.alt} image={extra} />
          ))}
        </div>
      )}

      {metrics && metrics.length > 0 && (
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-navy/10 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-cream px-6 py-7">
              <dd className="font-display text-4xl leading-none text-navy">{metric.value}</dd>
              <dt className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-terracotta-dark">
                {metric.label}
              </dt>
              {metric.note && (
                <p className="mt-2 text-xs leading-relaxed text-warm-gray">{metric.note}</p>
              )}
            </div>
          ))}
        </dl>
      )}

      {bullets && bullets.length > 0 && (
        <ProjectBullets heading={bulletsHeading} items={bullets} />
      )}
    </div>
  )
}
