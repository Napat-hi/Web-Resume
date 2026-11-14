import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const PaletteContext = createContext(null)

// Holds command-palette open state and binds Ctrl/Cmd+K globally.
export function PaletteProvider({ children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ open, setOpen }), [open])
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
}

export function usePalette() {
  const ctx = useContext(PaletteContext)
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider')
  return ctx
}
