import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id?: string
  children: ReactNode
  className?: string
  tight?: boolean
}

export function SectionWrapper({ id, children, className = '', tight = false }: SectionWrapperProps) {
  return (
    <section id={id} className={`px-6 sm:px-10 ${tight ? 'py-section-sm' : 'py-section'} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
