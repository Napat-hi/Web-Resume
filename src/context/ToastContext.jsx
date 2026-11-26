import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import styles from './Toast.module.css'

const ToastContext = createContext(null)
const SHOW_MS = 2400
const EXIT_MS = 200

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null) // { id, message, leaving }
  const timers = useRef([])

  const showToast = useCallback((message) => {
    timers.current.forEach(clearTimeout)
    setToast({ id: Date.now(), message, leaving: false })
    timers.current = [
      setTimeout(() => setToast((t) => t && { ...t, leaving: true }), SHOW_MS),
      setTimeout(() => setToast(null), SHOW_MS + EXIT_MS),
    ]
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className={styles.toast} data-leaving={toast.leaving || undefined}>
            <Check size={16} aria-hidden="true" />
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
