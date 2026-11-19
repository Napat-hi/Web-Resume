import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

// Site-level animation preference.
//   pref null  -> follow the system (prefers-reduced-motion)
//   pref 'on'  -> animate even if the system asks for reduced motion (the reader opted in)
//   pref 'off' -> no animation
// The inline script in index.html sets <html data-motion> before first paint; CSS keys off it.
const KEY = 'motion-pref'
const MotionPrefContext = createContext(null)

const systemReduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const readPref = () => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'on' || v === 'off' ? v : null
  } catch {
    return null
  }
}
const computeReduce = (pref) => (pref === 'on' ? false : pref === 'off' ? true : systemReduce())

export function MotionPrefProvider({ children }) {
  const [pref, setPref] = useState(readPref)
  const [reduce, setReduce] = useState(() => computeReduce(readPref()))

  useEffect(() => {
    setReduce(computeReduce(pref))
    if (pref) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(computeReduce(null))
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [pref])

  useEffect(() => {
    document.documentElement.dataset.motion = reduce ? 'reduce' : 'full'
  }, [reduce])

  const setMotion = useCallback((on) => {
    const next = on ? 'on' : 'off'
    try { localStorage.setItem(KEY, next) } catch { /* storage blocked */ }
    setPref(next)
  }, [])

  return (
    <MotionPrefContext.Provider value={{ reduce, setMotion, systemReduce: systemReduce() }}>
      <MotionConfig reducedMotion={reduce ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionPrefContext.Provider>
  )
}

export function useMotionPref() {
  const ctx = useContext(MotionPrefContext)
  if (!ctx) throw new Error('useMotionPref must be used within MotionPrefProvider')
  return ctx
}
