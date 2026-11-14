import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scrolls to a home-page section and moves focus there for keyboard/screen-reader users.
export function scrollToId(id) {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
    document.getElementById('main')?.focus({ preventScroll: true })
    return true
  }
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior, block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

// Returns goTo(id): scrolls on the home page, or navigates home first and scrolls after render.
export function useGoToSection() {
  const location = useLocation()
  const navigate = useNavigate()
  return useCallback(
    (id) => {
      if (location.pathname === '/') scrollToId(id)
      else navigate('/', { state: { section: id } })
    },
    [location.pathname, navigate],
  )
}

// Home scroll position saved before opening a case study, restored on Back.
export const homeScroll = { y: 0 }

export const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
