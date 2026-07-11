import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'

export function WorkGrid() {
  return (
    <SectionWrapper id="work" className="bg-cream-dark/40">
      <RevealOnScroll>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">Work</p>
        <AnimatedHeading
          as="h2"
          text="Selected case studies"
          className="font-display text-4xl text-navy sm:text-5xl"
        />
      </RevealOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <RevealOnScroll key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  )
}
