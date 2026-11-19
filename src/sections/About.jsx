import { lazy, Suspense, useRef } from 'react'
import { Brain, Layers, Shield } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHead from './SectionHead'
import { useNear } from '../hooks/useNear'

// The photo pile (and its four images) loads only when the reader scrolls near it.
const PhotoStack = lazy(() => import('../components/PhotoStack/PhotoStack'))

function DeferredPhotoStack() {
  const ref = useRef(null)
  const near = useNear(ref)
  return (
    <div ref={ref} className={styles.photoSlot} data-print="hide">
      {near && (
        <Suspense fallback={null}>
          <PhotoStack />
        </Suspense>
      )}
    </div>
  )
}
import styles from './About.module.css'

const icons = { brain: Brain, shield: Shield, layers: Layers }

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index={1} id="about" title="About" />
        <div className={`${styles.grid} print-about`}>
          <div>
            <Reveal className={styles.summary}>
              {profile.summary.map((p, i) => (
                <p key={i} className={i === 0 ? styles.lead : undefined}>{p}</p>
              ))}
            </Reveal>
            <DeferredPhotoStack />
          </div>

          <div className={styles.side}>
            <Reveal className={styles.now} data-print="hide">
              <h3 className="eyebrow">
                Now <span className={styles.nowDate}>· updated {profile.now.updated}</span>
              </h3>
              <ul>
                {profile.now.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>

            <RevealGroup as="ul" className={styles.focus} data-print="hide">
              {profile.focus.map((f) => {
                const Icon = icons[f.icon]
                return (
                  <RevealItem as="li" key={f.title} className={styles.card}>
                    {Icon && <Icon size={20} className={styles.icon} aria-hidden="true" />}
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>

            <Reveal className={styles.langs}>
              <h3 className="eyebrow">Languages</h3>
              <ul>
                {profile.languages.map((l) => (
                  <li key={l.name}>
                    <span className={styles.langName}>{l.name}</span>
                    <span className={styles.langLevel}>
                      {l.level}
                      {l.note && ` · ${l.note}`}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
