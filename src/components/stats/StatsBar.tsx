import { skills } from '@/data/skills'
import { timeline } from '@/data/timeline'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { CountUp } from '@/components/ui/CountUp'

const educationCount = timeline.filter((entry) => entry.kind === 'education').length
const experienceCount = timeline.filter((entry) => entry.kind === 'experience').length

const stats = [
  { value: `${educationCount}`, label: 'Degrees in progress & completed' },
  { value: `${experienceCount}`, label: 'Research internship' },
  { value: `${skills.length}`, label: 'Core tools & skills' },
  { value: '2027', label: 'Expected graduation, UPES' },
]

export function StatsBar() {
  return (
    <div className="border-y border-navy/10 bg-cream-dark/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:px-10 md:grid-cols-4">
        {stats.map((stat, index) => (
          <RevealOnScroll key={stat.label} delay={index * 0.06}>
            <CountUp value={stat.value} className="font-display text-4xl text-navy sm:text-5xl" />
            <p className="mt-2 text-xs uppercase tracking-wider text-warm-gray">{stat.label}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
