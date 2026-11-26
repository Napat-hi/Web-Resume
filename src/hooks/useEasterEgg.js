import { useCallback, useEffect, useRef, useState } from 'react'

const WORD = 'beep'

// Secret: type "beep" anywhere (outside form fields), or tap the footer name ([data-easter])
// five times within two seconds. `run` counts triggers; App mounts the pixel car while it is > 0.
export function useEasterEgg(enabled) {
  const [run, setRun] = useState(0)
  const taps = useRef([])

  useEffect(() => {
    if (!enabled) return undefined
    let typed = ''
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      typed = (typed + e.key.toLowerCase()).slice(-WORD.length)
      if (typed === WORD) {
        typed = ''
        setRun((n) => n + 1)
      }
    }
    const onClick = (e) => {
      if (!e.target.closest?.('[data-easter]')) return
      const now = Date.now()
      taps.current = [...taps.current.filter((t) => now - t < 2000), now]
      if (taps.current.length >= 5) {
        taps.current = []
        setRun((n) => n + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [enabled])

  const done = useCallback(() => setRun(0), [])
  return { run, done }
}
