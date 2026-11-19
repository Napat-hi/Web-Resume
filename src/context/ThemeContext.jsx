import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// The inline script in index.html sets data-theme before first paint (no flash).
// Order: saved choice > light (the site's default look is sky blue on white).
const STORAGE_KEY = 'theme-mode'
const THEME_COLOR = { light: '#f6f9fe', dark: '#07111f' }
const ThemeContext = createContext(null)

function readInitial() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

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
