interface ProjectBulletsProps {
  heading?: string
  items: string[]
}

/** Conclusion list — rationale, outcomes, applied principles. */
export function ProjectBullets({ heading, items }: ProjectBulletsProps) {
  return (
    <div>
      {heading && (
        <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-terracotta-dark">
          {heading}
        </h3>
      )}
      <ul className={`grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 ${heading ? 'mt-5' : ''}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
            <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-terracotta" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
