import { useEffect, useState } from 'react'

// True once `ref` comes within `rootMargin` of the viewport (then stays true).
// Used to mount heavy, below-the-fold pieces only when the reader gets close.
export function useNear(ref, rootMargin = '300px 0px') {
  const [near, setNear] = useState(false)
  useEffect(() => {
    if (near || !ref.current) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, near, rootMargin])
  return near
}
