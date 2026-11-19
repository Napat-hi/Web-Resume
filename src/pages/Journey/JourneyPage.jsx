import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Play } from 'lucide-react'
import '@fontsource/pixelify-sans/400.css'
import '@fontsource/pixelify-sans/600.css'
import { useSeo } from '../../lib/seo'
import { useMotionPref } from '../../context/MotionContext'
import { journey } from '../../data/journey'
import Drive, { StopCard } from './Drive'
import styles from './Journey.module.css'

// Reduced motion: the same stops as a plain pixel-styled list, plus a way to opt in.
function StaticJourney() {
  const { setMotion } = useMotionPref()
  return (
    <div className={styles.static}>
      <header className={styles.staticHead}>
        <Link to="/" className={styles.pixelBtn}>
          <ArrowLeft size={14} aria-hidden="true" /> Portfolio
        </Link>
        <p className={styles.introTitle} aria-hidden="true">PO&apos;S JOURNEY</p>
        <div className={styles.staticNote}>
          <p>Animations are off on this device, so the drive is paused.</p>
          <button type="button" className={styles.pixelBtn} onClick={() => setMotion(true)}>
            <Play size={14} aria-hidden="true" /> Turn on animations
          </button>
        </div>
      </header>
      <ol className={styles.staticList}>
        {journey.map((s) => (
          <li key={s.id}>
            <StopCard stop={s} active />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function JourneyPage() {
  const { reduce } = useMotionPref()
  // The story starts at the beginning of the road.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useSeo({
    title: 'Journey',
    description: 'Napat Hirunsak from high school in 2011 to graduation in 2027, told as a pixel-art drive.',
  })
  return (
    <div className={styles.page}>
      <h1 className="sr-only">Po&apos;s journey, 2011 to 2027</h1>
      {reduce ? <StaticJourney /> : <Drive />}
    </div>
  )
}
