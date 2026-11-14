import { useEffect, useState } from 'react'

// Returns the id of the section that crosses the upper-middle band of the viewport.
export function useScrollSpy(ids, enabled = true) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return undefined
    }
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return undefined

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        const first = ids.find((id) => visible.get(id))
        setActive(first ?? null)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
