import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function Timeline() {
  return (
    <ol className="relative space-y-10 pl-8">
      {/* Spine draws itself in as the timeline scrolls into view */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-navy/15"
      />
      {timeline.map((entry, index) => (
        <RevealOnScroll key={entry.id} delay={index * 0.05}>
          <li className="relative">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4, ease: 'backOut' }}
              className={`absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full ${
                entry.kind === 'education' ? 'bg-navy' : 'bg-terracotta'
              }`}
            />
            <p className="text-xs font-medium uppercase tracking-wider text-terracotta-dark">
              {entry.period}
            </p>
            <p className="mt-1 font-display text-xl text-navy">{entry.title}</p>
            <p className="text-sm text-warm-gray">{entry.place}</p>
            {entry.detail && <p className="mt-2 max-w-xl text-sm text-ink/80">{entry.detail}</p>}
          </li>
        </RevealOnScroll>
      ))}
    </ol>
  )
}
