import type { SpecGroup } from '@/types/project'

interface ProjectSpecsProps {
  groups: SpecGroup[]
}

/**
 * Measured facts — dimensions, materials, percentile bands. Rendered as
 * label/value rows on a hairline rhythm rather than a table, so a group of
 * three reads as comfortably as a group of eight.
 */
export function ProjectSpecs({ groups }: ProjectSpecsProps) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-terracotta-dark">
            {group.title}
          </h3>

          <dl className="mt-5">
            {group.items.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-6 border-b border-navy/10 py-3.5 last:border-b-0"
              >
                <dt className="text-xs uppercase tracking-wider text-warm-gray">
                  {item.label}
                  {item.note && (
                    <span className="mt-1 block text-[11px] normal-case tracking-normal opacity-80">
                      {item.note}
                    </span>
                  )}
                </dt>
                <dd className="shrink-0 font-display text-xl text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
