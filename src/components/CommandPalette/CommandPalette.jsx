import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, CornerDownLeft, FileText, FolderOpen, Hash, Moon, Search, Sun } from 'lucide-react'
import { usePalette } from '../../context/PaletteContext'
import { useTheme } from '../../context/ThemeContext'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useCopy } from '../../hooks/useCopy'
import { useGoToSection } from '../../lib/scroll'
import { sections } from '../../lib/sections'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import BrandIcon from '../ui/BrandIcon'
import styles from './CommandPalette.module.css'

function matches(item, q) {
  if (!q) return true
  const hay = `${item.label} ${item.keywords ?? ''} ${item.group}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => hay.includes(word))
}

export default function CommandPalette() {
  const { open, setOpen } = usePalette()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const goTo = useGoToSection()
  const copy = useCopy()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const dialogRef = useRef(null)
  const listRef = useRef(null)
  const close = useCallback(() => setOpen(false), [setOpen])
  useFocusTrap(dialogRef, open, close)

  const items = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `s-${s.id}`,
        group: 'Sections',
        label: s.label,
        icon: <Hash size={16} aria-hidden="true" />,
        run: () => goTo(s.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: p.context,
        keywords: `${p.tagline} ${p.stack.join(' ')}`,
        icon: <FolderOpen size={16} aria-hidden="true" />,
        run: () => navigate(`/projects/${p.slug}`),
      })),
      {
        id: 'a-copy',
        group: 'Actions',
        label: 'Copy email',
        hint: profile.email,
        keywords: 'mail contact',
        icon: <Copy size={16} aria-hidden="true" />,
        run: () => copy(profile.email, 'Email copied'),
      },
      {
        id: 'a-theme',
        group: 'Actions',
        label: isDark ? 'Switch to light theme' : 'Switch to dark theme',
        keywords: 'theme dark light mode toggle',
        icon: isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />,
        run: toggleTheme,
      },
      {
        id: 'a-resume',
        group: 'Actions',
        label: 'Open resume',
        keywords: 'cv download pdf',
        icon: <FileText size={16} aria-hidden="true" />,
        run: () => window.open(profile.resumeUrl, '_blank', 'noopener'),
      },
      ...profile.links.map((l) => ({
        id: `l-${l.id}`,
        group: 'Links',
        label: l.label,
        hint: l.handle,
        icon: <BrandIcon name={l.id} size={16} />,
        run: () => window.open(l.url, '_blank', 'noopener'),
      })),
    ],
    [goTo, navigate, copy, isDark, toggleTheme],
  )

  const results = useMemo(() => items.filter((i) => matches(i, query.trim())), [items, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])
  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = (item) => {
    close()
    // Let the dialog close and restore focus before navigating or scrolling.
    requestAnimationFrame(() => item.run())
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(Math.max(results.length - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      run(results[active])
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.scrim}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className={styles.inputRow}>
              <Search size={18} aria-hidden="true" />
              <input
                data-autofocus
                className={styles.input}
                placeholder="Search sections, projects and actions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd>Esc</kbd>
            </div>

            <ul id="palette-list" ref={listRef} className={styles.list} role="listbox" aria-label="Results">
              {results.length === 0 && <li className={styles.empty}>No results for “{query}”</li>}
              {results.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null
                lastGroup = item.group
                return (
                  <li key={item.id} role="presentation">
                    {header && (
                      <div className={styles.group} aria-hidden="true">
                        {header}
                      </div>
                    )}
                    <div
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      className={styles.option}
                      onMouseMove={() => i !== active && setActive(i)}
                      onClick={() => run(item)}
                    >
                      <span className={styles.icon}>{item.icon}</span>
                      <span className={styles.label}>{item.label}</span>
                      {item.hint && <span className={styles.hint}>{item.hint}</span>}
                      {i === active ? (
                        <CornerDownLeft size={14} className={styles.enter} aria-hidden="true" />
                      ) : (
                        <ArrowRight size={14} className={styles.arrow} aria-hidden="true" />
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className={styles.foot} aria-hidden="true">
              <span><kbd>↑</kbd> <kbd>↓</kbd> move</span>
              <span><kbd>Enter</kbd> open</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
