import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// The inline script in index.html sets data-theme before first paint (no flash).
// Order: saved choice > system preference > dark.
const STORAGE_KEY = 'theme-mode'
const ThemeContext = createContext(null)

function readInitial() {
  const attr = document.documentElement.dataset.theme
  return attr === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f8fa' : '#0a0c0f')
  }, [theme])

  // Follow system changes until the user picks a theme.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      let saved = null
      try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* storage blocked */ }
      if (!saved) setTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage blocked */ }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
