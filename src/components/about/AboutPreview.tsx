import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Avatar } from './Avatar'
import { SkillsStrip } from './SkillsStrip'
import { Timeline } from './Timeline'
import { site } from '@/data/site'

export function AboutPreview() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: avatarRef,
    offset: ['start end', 'end start'],
  })
  const avatarY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[320px_1fr] md:items-start">
        <RevealOnScroll className="w-full">
          <motion.div ref={avatarRef} className="w-full" style={{ y: avatarY }}>
            <Avatar />
          </motion.div>
        </RevealOnScroll>

        <div>
          <RevealOnScroll>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
              About
            </p>
            <AnimatedHeading
              as="h2"
              text={'Behavior first,\ninterface second.'}
              className="font-display text-4xl leading-tight text-navy sm:text-5xl"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-2xl text-base text-ink/80 sm:text-lg">{site.bio}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-10">
            <SkillsStrip />
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="mt-16">
            <Timeline />
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  )
}
