import { site } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-navy/10 bg-cream-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-navy">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-warm-gray">{site.subtagline}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-ink md:items-end">
          <a href={`mailto:${site.email}`} className="hover:text-terracotta-dark">
            {site.email}
          </a>
          <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="hover:text-terracotta-dark">
            {site.phone}
          </a>
          <span className="text-warm-gray">{site.location}</span>
          {site.social.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-terracotta-dark"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-navy/10">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-2 px-6 py-6 text-xs text-warm-gray sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>{site.role} · {site.roleSub}</span>
        </div>
      </div>
    </footer>
  )
}
