import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-navy/15 bg-white-soft px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-warm-gray ${className}`}
    >
      {children}
    </span>
  )
}
