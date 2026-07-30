import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '@/data/site'
import { useScrollToSection } from '@/hooks/useScrollToSection'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const scrollToSection = useScrollToSection()

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Hide when scrolling down past the hero, reveal on any upward scroll.
      if (y > lastY + 6 && y > 400) setHidden(true)
      else if (y < lastY - 6) setHidden(false)
      lastY = y
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return

    const sectionIds = ['home', 'about', 'work', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  function handleNavClick(event: MouseEvent, href: string) {
    event.preventDefault()
    setMenuOpen(false)
    scrollToSection(href.replace('#', ''))
  }

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
    >
      {/* The bar's fill is a token-driven layer whose opacity animates, rather
          than an animated backgroundColor: Framer needs concrete colour values,
          which would pin the nav to cream and break it on a themed case study. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: menuOpen ? 1 : scrolled ? 0.9 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 border-b border-navy/10 bg-cream"
      />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link to="/" className="font-display text-lg font-medium text-navy">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {site.navLinks.map((link) => {
            const isActive = location.pathname === '/' && activeSection === link.href.replace('#', '')
            return (
              <li key={link.href}>
                <a
                  href={location.pathname === '/' ? link.href : `/${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-terracotta-dark ${
                    isActive ? 'text-terracotta-dark' : 'text-ink/80'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-full border border-navy/20 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-terracotta hover:text-terracotta-dark sm:inline-flex"
        >
          Say hello
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
            className="h-px w-6 origin-center bg-ink"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="h-px w-6 bg-ink"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
            className="h-px w-6 origin-center bg-ink"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border-t border-navy/10 sm:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {site.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block py-3 text-base font-medium text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="block py-3 text-base font-medium text-terracotta-dark">
                  Say hello
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
