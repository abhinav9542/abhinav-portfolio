import { Link } from 'react-router-dom'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Tag } from '@/components/ui/Tag'
import { SculptureStop } from '@/components/sculpture/SculptureStop'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="overflow-x-clip bg-cream-dark/40">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr] md:gap-16">
        {/* Sculpture passes through here faded, set in from the left margin under the heading */}
        <SculptureStop
          opacity={0.25}
          className="absolute bottom-0 left-8 h-[7.2rem] w-[7.2rem] translate-y-1/3 md:bottom-[3vh] md:left-[calc(4rem-5%)] md:h-[11.2rem] md:w-[11.2rem]"
        />
        <RevealOnScroll>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
            Experience
          </p>
          <AnimatedHeading
            as="h2"
            text={'From\nbehaviour\nto *design*.'}
            className="font-display text-4xl leading-tight text-navy sm:text-5xl"
          />
        </RevealOnScroll>

        <div className="md:pt-10">
          <RevealOnScroll delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-wider text-terracotta-dark">
              {experience.period}
            </p>
            <p className="mt-2 font-display text-3xl text-navy sm:text-4xl">{experience.role}</p>
            <p className="mt-1 text-sm text-warm-gray">{experience.place}</p>
            <p className="mt-6 max-w-xl text-base text-ink/80 sm:text-lg">{experience.summary}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-8 flex max-w-xl flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </RevealOnScroll>

          {experience.appliedIn && (
            <RevealOnScroll delay={0.2} className="mt-10">
              <Link
                to={`/work/${experience.appliedIn.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-navy underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-terracotta-dark hover:decoration-terracotta"
              >
                {experience.appliedIn.label}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
