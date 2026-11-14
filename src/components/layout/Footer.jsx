import { useEffect, useState } from 'react'
import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { scrollToId, isMac } from '../../lib/scroll'
import BrandIcon from '../ui/BrandIcon'
import styles from './Footer.module.css'

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      type="button"
      className={`${styles.top} ${show ? styles.topVisible : ''}`}
      onClick={() => scrollToId('top')}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.small}>
            © {new Date().getFullYear()} · Built with React and Vite · Press <kbd>{isMac() ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to jump anywhere
          </p>
        </div>
        <ul className={styles.social}>
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} aria-hidden="true" />
            </a>
          </li>
          {profile.links.map((l) => (
            <li key={l.id}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                <BrandIcon name={l.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <BackToTop />
    </footer>
  )
}
