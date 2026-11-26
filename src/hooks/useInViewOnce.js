import { useEffect, useState } from 'react'

// True from the first time the element enters the viewport (IntersectionObserver).
// Replaces framer-motion's useInView so the home page ships without framer.
export function useInViewOnce(ref, rootMargin = '0px 0px -10% 0px') {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => {
      io.disconnect()
    }
  }, [ref, rootMargin, seen])
  return seen
}
