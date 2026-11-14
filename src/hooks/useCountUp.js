import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { prefersReducedMotion } from '../lib/scroll'

// Counts from 0 to `value` the first time the element scrolls into view.
export function useCountUp(value, { duration = 1.1 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const decimals = String(value).split('.')[1]?.length ?? 0
  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return undefined
    if (prefersReducedMotion()) {
      setDisplay(Number(value).toFixed(decimals))
      return undefined
    }
    const controls = animate(0, Number(value), {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals, duration])

  return [ref, display]
}
