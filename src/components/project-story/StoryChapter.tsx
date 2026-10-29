import { useState } from 'react'
import type { ProjectImage, ProjectSection } from '@/types/project'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProjectSpecs } from '@/components/project-detail/ProjectSpecs'
import { CompareSlider } from './CompareSlider'

/** First sentence becomes the chapter's statement; the rest is an aside. */
function splitLead(body?: string): { lead: string; rest: string } {
  if (!body) return { lead: '', rest: '' }
  const m = body.match(/^(.+?[.!?])(\s+|$)([\s\S]*)$/)
  if (!m) return { lead: body, rest: '' }
  return { lead: m[1], rest: m[3].trim() }
}

interface StoryChapterProps {
  section: ProjectSection
  index: number
}

/**
 * One section of the case study told as a chapter: a kicker, a single large
 * statement, a short aside that expands on demand, and media arranged by what
 * it is — a collage, a compare slider, a strip of findings, a stat sheet.
 * Chapters alternate sides so the page reads as a path, not a stack.
 */
export function StoryChapter({ section, index }: StoryChapterProps) {
  const { lead, rest } = splitLead(section.body)
  const flip = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')
  const media = renderMedia(section)
  const textOnly = !media

  return (
    <section id={section.id} data-chapter={index} className="relative scroll-mt-24 py-[14vh]">
      {/* Ghost chapter numeral, offset to the chapter's side. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-[8vh] select-none font-display text-[16rem] leading-none text-navy/[0.04] ${
          flip ? 'right-0' : 'left-0'
        }`}
      >
        {number}
      </span>

      <div
        className={`relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 ${
          textOnly ? '' : 'lg:grid-cols-12'
        }`}
      >
        <RevealOnScroll
          className={
            textOnly
              ? 'mx-auto max-w-3xl text-center'
              : `lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`
          }
        >
          <p
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.3em] text-terracotta-dark ${textOnly ? 'justify-center' : ''}`}
          >
            <span className="whitespace-nowrap">Chapter {number}</span>
            <span aria-hidden className="h-px w-8 bg-terracotta/50" />
            <span className="text-warm-gray">{section.heading}</span>
          </p>
          {lead && (
            <p
              className={`mt-6 font-display leading-[1.15] text-navy ${
                lead.length > 120
                  ? 'text-2xl sm:text-3xl'
                  : textOnly
                    ? 'text-3xl sm:text-5xl'
                    : 'text-3xl sm:text-4xl'
              }`}
            >
              {lead}
            </p>
          )}
          {rest && <Aside text={rest} center={textOnly} />}
        </RevealOnScroll>

        {media && (
          <RevealOnScroll
            delay={0.1}
            className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}
          >
            {media}
          </RevealOnScroll>
        )}
      </div>
    </section>
  )
}

/** Remaining body copy: two lines by default, the rest on request. */
function Aside({ text, center }: { text: string; center: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`mt-6 ${center ? 'mx-auto max-w-xl' : 'max-w-md'}`}>
      <p className={`text-sm leading-relaxed text-warm-gray ${open ? '' : 'line-clamp-2'}`}>{text}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-terracotta-dark hover:text-terracotta"
      >
        {open ? 'Less' : 'Read more'}
      </button>
    </div>
  )
}

function renderMedia(section: ProjectSection) {
  const images = section.images ?? []

  if (section.type === 'beforeAfter' && images.length >= 2) {
    return (
      <div className="space-y-8">
        <CompareSlider before={images[0]} after={images[1]} />
        {section.metrics && section.metrics.length > 0 && <Stats metrics={section.metrics} />}
        {section.bullets && section.bullets.length > 0 && <Chips items={section.bullets} />}
      </div>
    )
  }

  if (section.type === 'observations' && section.observations) {
    return (
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [mask-image:linear-gradient(to_right,black_85%,transparent)]">
        {section.observations.map((o, i) => (
          <article
            key={o.title}
            className="w-64 shrink-0 snap-start rounded-2xl border border-navy/10 bg-white-soft/60 p-5 backdrop-blur-sm"
          >
            <p className="font-display text-3xl text-terracotta">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-display text-lg leading-snug text-navy">{o.title}</h3>
            <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-warm-gray">{o.body}</p>
          </article>
        ))}
      </div>
    )
  }

  if (section.type === 'specs' && section.specGroups) {
    return (
      <div className="space-y-6">
        <ProjectSpecs groups={section.specGroups} />
        {section.bullets && section.bullets.length > 0 && <Chips items={section.bullets} />}
      </div>
    )
  }

  if (images.length > 0) {
    return (
      <div className="space-y-6">
        <Collage images={images} />
        {section.bullets && section.bullets.length > 0 && <Chips items={section.bullets} />}
      </div>
    )
  }

  if (section.bullets && section.bullets.length > 0) return <Chips items={section.bullets} />
  return null
}

/**
 * Up to four images as a loose, staggered collage — smaller than full-width
 * plates, offset and slightly turned, with captions as margin notes.
 */
function Collage({ images }: { images: ProjectImage[] }) {
  const shown = images.slice(0, 4)
  if (shown.length === 1) {
    return <Figure image={shown[0]} className="mx-auto max-w-lg" />
  }
  const tilt = ['-rotate-[1.5deg]', 'rotate-[1.2deg]', 'rotate-[0.8deg]', '-rotate-[1deg]']
  const offset = ['', 'sm:mt-16', 'sm:-mt-10', 'sm:mt-6']
  return (
    <div className={`grid grid-cols-2 gap-5 ${shown.length === 3 ? 'sm:grid-cols-3' : ''}`}>
      {shown.map((image, i) => (
        <Figure
          key={`${image.src}-${i}`}
          image={image}
          className={`${tilt[i]} ${offset[i]} transition-transform duration-500 hover:rotate-0 hover:scale-[1.04]`}
        />
      ))}
    </div>
  )
}

function Figure({ image, className = '' }: { image: ProjectImage; className?: string }) {
  return (
    <figure className={className}>
      <div className={`overflow-hidden rounded-xl shadow-soft ${image.fit === 'contain' ? 'bg-cream-dark/60' : ''}`}>
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className={`w-full ${image.fit === 'contain' ? 'aspect-[4/3] object-contain p-2' : 'aspect-[4/3] object-cover'}`}
        />
      </div>
      {(image.label || image.caption) && (
        <figcaption className="mt-2 text-[11px] leading-snug text-warm-gray">
          {image.label && <span className="mr-1 uppercase tracking-[0.15em] text-terracotta-dark">{image.label}</span>}
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function Stats({ metrics }: { metrics: NonNullable<ProjectSection['metrics']> }) {
  return (
    <dl className="grid grid-cols-3 gap-6">
      {metrics.map((m) => (
        <div key={m.label}>
          <dd className="font-display text-3xl leading-none text-navy sm:text-4xl">{m.value}</dd>
          <dt className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-terracotta-dark">{m.label}</dt>
        </div>
      ))}
    </dl>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-navy/15 px-3.5 py-1.5 text-xs text-ink/80">
          {item}
        </li>
      ))}
    </ul>
  )
}
