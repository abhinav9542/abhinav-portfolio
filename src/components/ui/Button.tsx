import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ghost'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-navy text-white-soft hover:bg-terracotta',
  ghost: 'border border-navy/20 text-ink hover:border-terracotta hover:text-terracotta-dark',
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  href?: string
}

export function Button({ variant = 'primary', className = '', href, children, ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#')
    if (isInternal && !href.startsWith('#')) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={classes} target={isInternal ? undefined : '_blank'} rel={isInternal ? undefined : 'noreferrer'}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
