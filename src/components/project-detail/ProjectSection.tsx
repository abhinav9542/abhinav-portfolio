import type { ProjectSection as ProjectSectionData } from '@/types/project'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProjectImageBlock } from './ProjectImageBlock'
import { ProjectMoodboard } from './ProjectMoodboard'

interface ProjectSectionProps {
  section: ProjectSectionData
}

export function ProjectSection({ section }: ProjectSectionProps) {
  return (
    <RevealOnScroll className="border-t border-navy/10 py-16 first:border-none first:pt-0">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
          {section.heading}
        </p>

        <div className="space-y-8">
          {section.body && (
            <p className="max-w-2xl text-base text-ink/80 sm:text-lg">{section.body}</p>
          )}

          {section.type === 'moodboard' && section.images && (
            <ProjectMoodboard images={section.images} />
          )}

          {section.type === 'imageGrid' && section.images && (
            <div
              className={`grid grid-cols-1 gap-6 ${
                section.images.length === 3
                  ? // Three-up rows (e.g. the challenge storyboards) reclaim the
                    // label column so each panel renders ~25% larger.
                    'sm:grid-cols-3 md:-ml-[166px]'
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
        </div>
      </div>
    </RevealOnScroll>
  )
}
