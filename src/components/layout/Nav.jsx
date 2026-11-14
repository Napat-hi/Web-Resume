import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { sections } from '../../lib/sections'
import { scrollToId, isMac } from '../../lib/scroll'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useTheme } from '../../context/ThemeContext'
import { usePalette } from '../../context/PaletteContext'
import { profile } from '../../data/profile'
import styles from './Nav.module.css'

const ids = sections.map((s) => s.id)

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div className={styles.progress} style={{ scaleX }} aria-hidden="true" />
}

function SectionLink({ id, label, active, onNavigate, className }) {
  const location = useLocation()
  const onHome = location.pathname === '/'
  return (
    <Link
      to="/"
      state={{ section: id }}
      className={className}
      aria-current={active ? 'true' : undefined}
      onClick={(e) => {
        if (onHome) {
          e.preventDefault()
          scrollToId(id)
        }
        onNavigate?.()
      }}
    >
      {label}
    </Link>
  )
}

export default function Nav() {
  const location = useLocation()
  const onHome = location.pathname === '/'
  const active = useScrollSpy(ids, onHome)
  const { isDark, toggleTheme } = useTheme()
  const { setOpen: setPaletteOpen } = usePalette()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sheetRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useFocusTrap(sheetRef, menuOpen, closeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => closeMenu(), [location.pathname, closeMenu])

  const themeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <ProgressBar />
      <nav className={`container ${styles.bar}`} aria-label="Main">
        <Link
          to="/"
          className={styles.brand}
          onClick={(e) => {
            if (onHome) {
              e.preventDefault()
              scrollToId('top')
            }
          }}
        >
          <span className={styles.mark} aria-hidden="true">NH</span>
          <span className={styles.brandName}>{profile.name}</span>
        </Link>

        <ul className={styles.links}>
          {sections.map((s) => (
            <li key={s.id}>
              <SectionLink {...s} active={active === s.id} className={styles.link} />
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.kbd}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac() ? 'Meta+K' : 'Control+K'}
          >
            <Command size={14} aria-hidden="true" />
            <span>{isMac() ? '⌘K' : 'Ctrl K'}</span>
          </button>
          <button type="button" className={styles.icon} onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={`${styles.icon} ${styles.menuBtn}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.scrim}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              id="mobile-menu"
              ref={sheetRef}
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className={styles.sheetHead}>
                <span className="eyebrow">Menu</span>
                <button type="button" className={styles.icon} onClick={closeMenu} aria-label="Close menu">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <ul className={styles.sheetLinks}>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <SectionLink {...s} active={active === s.id} onNavigate={closeMenu} className={styles.sheetLink} />
                    <span className={styles.sheetIndex} aria-hidden="true">0{i + 1}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.sheetFoot}>
                <a className="btn btn-primary" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
                <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
                  {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                  {isDark ? 'Light theme' : 'Dark theme'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
