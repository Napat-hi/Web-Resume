import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/scroll'

// Keeps an element mounted for `ms` after `open` turns false, so a CSS exit animation can run.
// `closing` is true during that window (style it with [data-closing]).
export function usePresence(open, ms) {
  const [mounted, setMounted] = useState(open)
  useEffect(() => {
    if (open) {
      setMounted(true)
      return undefined
    }
    const t = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : ms)
    return () => {
      clearTimeout(t)
    }
  }, [open, ms])
  return { mounted: open || mounted, closing: !open && mounted }
}
