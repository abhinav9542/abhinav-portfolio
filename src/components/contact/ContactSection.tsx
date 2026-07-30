import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { site } from '@/data/site'

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <RevealOnScroll>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-dark">
          Contact
        </p>
        <AnimatedHeading
          as="h2"
          text={site.closing.heading}
          className="max-w-3xl font-display text-4xl leading-tight text-navy sm:text-5xl lg:text-6xl"
        />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <p className="mt-6 max-w-xl text-base text-ink/80 sm:text-lg">{site.closing.body}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2} className="mt-14">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex flex-wrap items-baseline gap-4 font-display text-3xl text-navy transition-colors hover:text-terracotta-dark sm:text-5xl"
        >
          <span className="underline decoration-terracotta/40 decoration-2 underline-offset-8 transition-colors group-hover:decoration-terracotta">
            {site.email}
          </span>
          <span
            aria-hidden
            className="inline-block text-2xl text-terracotta transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl"
          >
            →
          </span>
        </a>
        <p className="mt-6">
          <a
            href={`tel:${site.phone.replace(/\s+/g, '')}`}
            className="text-base text-warm-gray transition-colors hover:text-terracotta-dark"
          >
            {site.phone}
          </a>
        </p>

        {site.social.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/social inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-terracotta hover:text-terracotta-dark"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover/social:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </RevealOnScroll>
    </SectionWrapper>
  )
}
