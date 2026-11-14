import { useCallback } from 'react'
import { useToast } from '../context/ToastContext'

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers without async clipboard access.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export function useCopy() {
  const showToast = useToast()
  return useCallback(
    async (text, message = 'Copied') => {
      const ok = await writeClipboard(text)
      showToast(ok ? message : 'Copy failed. Select the text instead.')
    },
    [showToast],
  )
}
