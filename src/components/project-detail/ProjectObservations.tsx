import type { Observation } from '@/types/project'

interface ProjectObservationsProps {
  observations: Observation[]
  note?: string
}

/**
 * Numbered research findings. The oversized index sits behind the title as a
 * ghost numeral so the grid scans as a catalogue of problems rather than a
 * bulleted list.
 */
export function ProjectObservations({ observations, note }: ProjectObservationsProps) {
  return (
    <div>
      {note && (
        <p className="mb-8 border-l-2 border-terracotta pl-5 text-sm leading-relaxed text-warm-gray">
          {note}
        </p>
      )}

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {observations.map((observation, index) => (
          <li
            key={observation.title}
            className="relative overflow-hidden rounded-2xl border border-navy/10 bg-white-soft p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 top-1 font-display text-6xl leading-none text-navy/[0.07]"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-terracotta-dark">
              Observation {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="relative mt-3 font-display text-xl leading-snug text-navy">
              {observation.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{observation.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
