import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { journey } from '../data/journey'
import { useNear } from '../hooks/useNear'
import { Reveal } from '../components/ui/Reveal'
import SectionHead from './SectionHead'
import styles from './JourneyTeaser.module.css'

const Scene = lazy(() => import('./JourneyTeaserScene'))

// Home-page doorway to the full-screen pixel drive at /journey.
// Text and button render right away; the pixel picture loads when the reader gets close.
export default function JourneyTeaser() {
  const sceneRef = useRef(null)
  const near = useNear(sceneRef)
  const first = journey[0]
  const last = journey[journey.length - 1]
  return (
    <section id="journey" className="section" aria-labelledby="journey-title" data-print="hide">
      <div className="container">
        <SectionHead id="journey" title="Journey">
          My story from {first.year.split('–')[0]} to {last.year}, told as a pixel-art drive.
        </SectionHead>
        <Reveal>
          <Link to="/journey" className={styles.banner}>
            <span ref={sceneRef} className={styles.scene} aria-hidden="true">
              {near && (
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              )}
            </span>
            <span className={styles.copy}>
              <span className={styles.title}>Po&apos;s Journey</span>
              <span className={styles.text}>
                {journey.length} stops, from Bangkok Christian College to an exchange semester in Tokyo and graduation.
              </span>
              <span className={styles.cta}>
                Take the drive <ArrowRight size={16} aria-hidden="true" />
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
