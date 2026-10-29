import { useEffect, useState } from 'react'
import type { ProjectSection } from '@/types/project'

/**
 * A slim chapter index pinned to the left edge: where you are in the story
 * and a jump to any chapter. Desktop only.
 */
export function ChapterRail({ sections }: { sections: ProjectSection[] }) {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Chapters"
      className={`fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${
        active < 0 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <ol className="space-y-3">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="group flex items-center gap-3">
              <span
                className={`h-px transition-all duration-300 ${
                  i === active ? 'w-8 bg-terracotta' : 'w-4 bg-navy/25 group-hover:w-6'
                }`}
              />
              <span
                className={`text-[10px] uppercase tracking-[0.2em] ${i === active ? 'text-terracotta-dark' : 'text-warm-gray'}`}
              >
                <span className={i === active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Names only on hover, so the rail never crowds the chapter beside it. */}
                <span className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.heading.replace(/^Improvement [A-Z] · /, '')}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
