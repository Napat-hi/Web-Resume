import { useEffect, useState } from 'react'
import { ArrowDown, Copy, FileText } from 'lucide-react'
import { profile } from '../data/profile'
import { internshipCount } from '../data/experience'
import { projectCount } from '../data/projects'
import { scrollToId, prefersReducedMotion } from '../lib/scroll'
import { useCopy } from '../hooks/useCopy'
import { useCountUp } from '../hooks/useCountUp'
import DotGrid from '../components/DotGrid/DotGrid'
import { useMotionPref } from '../context/MotionContext'
import photo320 from '../assets/profile-320.webp'
import photo640 from '../assets/profile-640.webp'
import styles from './Hero.module.css'

const ielts = profile.languages.find((l) => l.name === 'English')?.note?.match(/IELTS ([\d.]+)/)?.[1]

const stats = [
  { value: internshipCount, label: 'Internships' },
  { value: projectCount, label: 'Projects' },
  ielts && { value: ielts, label: 'IELTS band' },
  { value: profile.languages.length, label: 'Languages' },
].filter(Boolean)

// The old word slides up and out, then the new one slides up into the window (CSS keyframes).
function RotatingRole() {
  const [{ i, prev }, setRole] = useState({ i: 0, prev: null })
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const id = setInterval(() => setRole((s) => ({ prev: s.i, i: (s.i + 1) % profile.roles.length })), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <p className={styles.role}>
      <span className="sr-only">{profile.roles.join(', ')}</span>
      <span className={styles.roleWindow} aria-hidden="true">
        {prev !== null && (
          <span key={`out-${i}`} className={`${styles.roleText} ${styles.roleOut}`}>
            {profile.roles[prev]}
          </span>
        )}
        <span key={`in-${i}`} className={`${styles.roleText} ${prev !== null ? styles.roleIn : ''}`}>
          {profile.roles[i]}
        </span>
      </span>
    </p>
  )
}

function Stat({ value, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div className={styles.stat}>
      <dt className={styles.statLabel}>{label}</dt>
      <dd className={styles.statValue}>
        <span ref={ref} aria-hidden="true">{display}</span>
        <span className="sr-only">{value}</span>
      </dd>
    </div>
  )
}

export default function Hero() {
  const copy = useCopy()
  const { reduce } = useMotionPref()
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" data-print="hide">
      <div className={styles.aurora} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <DotGrid key={reduce ? 'still' : 'live'} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.status}
          </p>
          <h1 id="hero-title" className={styles.title}>{profile.name}</h1>
          <RotatingRole key={reduce ? 'still' : 'live'} />
          <p className={styles.headline}>{profile.headline}</p>
          <p className={styles.intro}>
            I research LLM hallucinations at SIIT and build vision-language pipelines. Before that, I worked in IT
            security and frontend development.
          </p>
          <div className={styles.actions}>
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('projects')}>
              View projects <ArrowDown size={16} aria-hidden="true" />
            </button>
            <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={16} aria-hidden="true" /> Resume
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => copy(profile.email, 'Email copied')}>
              <Copy size={16} aria-hidden="true" /> Copy email
            </button>
          </div>
        </div>

        <figure className={styles.photo}>
          <div className={styles.frame}>
          <img
            src={photo320}
            srcSet={`${photo320} 320w, ${photo640} 640w`}
            sizes="(max-width: 767px) 160px, 280px"
            width="320"
            height="320"
            alt={`Portrait of ${profile.name}`}
            fetchPriority="high"
            decoding="async"
          />
          </div>
          <figcaption className={styles.caption}>{profile.location}</figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className={styles.stats}>
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>
    </section>
  )
}
