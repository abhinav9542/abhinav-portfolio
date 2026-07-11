import { useLocation, useNavigate } from 'react-router-dom'
import { useLenis } from './useLenis'

export function useScrollToSection() {
  const location = useLocation()
  const navigate = useNavigate()
  const lenis = useLenis()

  return function scrollToSection(id: string) {
    if (location.pathname === '/') {
      const target = document.getElementById(id)
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -88 })
        else target.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(`/#${id}`)
    }
  }
}
