import type { ProjectSection as ProjectSectionData } from '@/types/project'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProjectImageBlock } from './ProjectImageBlock'
import { ProjectMoodboard } from './ProjectMoodboard'
import { ProjectSpecs } from './ProjectSpecs'
import { ProjectObservations } from './ProjectObservations'
import { ProjectBeforeAfter } from './ProjectBeforeAfter'
import { ProjectBullets } from './ProjectBullets'

interface ProjectSectionProps {
  section: ProjectSectionData
}

/**
 * Each entry carries its own base column count. Emitting `grid-cols-1` in the
 * shared base and a second unprefixed `grid-cols-N` here would leave the winner
 * to CSS source order rather than intent.
 */
const COLUMN_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
}

export function ProjectSection({ section }: ProjectSectionProps) {
  const { wide } = section

  const heading = (
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
      {section.heading}
    </p>
  )

  const content = (
    <div className="space-y-8">
      {section.body && (
        <p className="max-w-2xl text-base text-ink/80 sm:text-lg">{section.body}</p>
      )}

      {section.type === 'moodboard' && section.images && (
        <ProjectMoodboard images={section.images} />
      )}

      {section.type === 'specs' && section.specGroups && (
        <ProjectSpecs groups={section.specGroups} />
      )}

      {section.type === 'specs' && section.images && (
        <div className={`grid gap-6 ${COLUMN_CLASS[section.columns ?? 2]}`}>
          {section.images.map((image, index) => (
            <ProjectImageBlock key={`${image.alt}-${index}`} image={image} />
          ))}
        </div>
      )}

      {section.type === 'observations' && section.observations && (
        <ProjectObservations observations={section.observations} note={section.note} />
      )}

      {section.type === 'beforeAfter' && section.images && (
        <ProjectBeforeAfter
          images={section.images}
          extras={section.extras}
          metrics={section.metrics}
          bullets={section.bullets}
          bulletsHeading={section.bulletsHeading}
        />
      )}

      {section.type === 'imageRow' && section.images && (
        <div className={`grid gap-6 ${COLUMN_CLASS[section.columns ?? 3]}`}>
          {section.images.map((image, index) => (
            <ProjectImageBlock key={`${image.alt}-${index}`} image={image} />
          ))}
        </div>
      )}

      {section.type === 'imageGrid' && section.images && (
        <div
          className={`grid grid-cols-1 gap-6 ${
            section.images.length === 3
              ? // Three-up rows (e.g. the challenge storyboards) reclaim the
                // label column so each panel renders ~25% larger. Only in the
                // narrow layout — the wide one has no label column to reclaim.
                `sm:grid-cols-3 ${wide ? '' : 'md:-ml-[166px]'}`
              : 'sm:grid-cols-2'
          }`}
        >
          {section.images.map((image, index) => (
            <ProjectImageBlock key={`${image.alt}-${index}`} image={image} />
          ))}
        </div>
      )}

      {section.type === 'twoColumn' && section.images && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
          {section.images.map((image, index) => (
            <ProjectImageBlock key={`${image.alt}-${index}`} image={image} />
          ))}
        </div>
      )}

      {/* beforeAfter renders its own bullets between the metrics and the fold. */}
      {section.type !== 'beforeAfter' && section.bullets && section.bullets.length > 0 && (
        <ProjectBullets heading={section.bulletsHeading} items={section.bullets} />
      )}
    </div>
  )

  return (
    <RevealOnScroll className="border-t border-navy/10 py-16 first:border-none first:pt-0">
      <div className={`mx-auto ${wide ? 'max-w-6xl' : 'max-w-4xl'}`}>
        {wide ? (
          // Wide case studies stack the label above the content so figures get
          // the full measure — a technical deck needs the drawing room.
          <>
            <div className="mb-8">{heading}</div>
            {content}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
            {heading}
            {content}
          </div>
        )}
      </div>
    </RevealOnScroll>
  )
}
