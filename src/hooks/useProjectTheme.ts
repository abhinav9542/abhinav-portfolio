import { useEffect } from 'react'
import type { ProjectData } from '@/types/project'

/**
 * Themed case studies re-point the palette on <html> rather than on the
 * article, so the fixed nav, the footer and the body field come along —
 * otherwise a dark case study would sit inside a cream frame.
 */
export function useProjectTheme(theme: ProjectData['theme']) {
  useEffect(() => {
    if (theme !== 'technical') return
    const root = document.documentElement
    root.classList.add('theme-technical')
    return () => root.classList.remove('theme-technical')
  }, [theme])
}
