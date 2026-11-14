import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Keeps Tab focus inside `ref` while active, closes on Escape, restores focus on close,
// and locks page scroll.
export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active) return undefined
    const previous = document.activeElement
    const node = ref.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusables = () => [...(node?.querySelectorAll(FOCUSABLE) ?? [])]
    requestAnimationFrame(() => {
      const auto = node?.querySelector('[data-autofocus]')
      ;(auto || focusables()[0])?.focus()
    })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.({ preventScroll: true })
    }
  }, [ref, active, onClose])
}
