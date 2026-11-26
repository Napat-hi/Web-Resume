import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/scroll'
import { useInViewOnce } from './useInViewOnce'

const easeOut = (t) => 1 - (1 - t) ** 3

// Counts from 0 to `value` the first time the element scrolls into view (requestAnimationFrame).
export function useCountUp(value, { duration = 1.1 } = {}) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  const decimals = String(value).split('.')[1]?.length ?? 0
  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return undefined
    const target = Number(value)
    if (prefersReducedMotion()) {
      setDisplay(target.toFixed(decimals))
      return undefined
    }
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      setDisplay((target * easeOut(t)).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
    }
  }, [inView, value, decimals, duration])

  return [ref, display]
}
