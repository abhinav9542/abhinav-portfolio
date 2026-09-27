import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Avatar } from './Avatar'
import { SkillsStrip } from './SkillsStrip'
import { SculptureStop } from '@/components/sculpture/SculptureStop'
import { site } from '@/data/site'

export function AboutPreview() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: avatarRef,
    offset: ['start end', 'end start'],
  })
  const avatarY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <SectionWrapper id="about" className="overflow-x-clip">
      <div className="relative grid grid-cols-1 gap-16 md:grid-cols-[320px_1fr] md:items-start">
        <RevealOnScroll className="w-full">
          <motion.div ref={avatarRef} className="w-full" style={{ y: avatarY }}>
            <Avatar />
          </motion.div>
        </RevealOnScroll>

        {/* min-w-0 stops the w-max skills marquee from widening this grid column past the margin */}
        <div className="min-w-0">
          <RevealOnScroll>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
              About
            </p>
            <div className="relative">
              {/* Sculpture rests here faded. From xl up it sits just after
                  "interface second.", its bottom level with the heading’s — positioned in em
                  (same font size as the heading) so it tracks the text. Below
                  xl the line is too long for that, so it keeps to the corner. */}
              <SculptureStop
                opacity={0.25}
                className="absolute right-0 top-0 h-[7.2rem] w-[7.2rem] -translate-y-3/4 text-4xl sm:text-5xl md:h-[10.4rem] md:w-[10.4rem] xl:left-[9.4em] xl:right-auto xl:top-[2.5em] xl:-translate-y-full"
              />
              <AnimatedHeading
                as="h2"
                text={'Behavior first,\ninterface second.'}
                className="font-display text-4xl leading-tight text-navy sm:text-5xl"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-2xl text-base text-ink/80 sm:text-lg">{site.bio}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-10">
            <SkillsStrip />
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  )
}
