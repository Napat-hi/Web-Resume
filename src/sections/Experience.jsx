import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { sortedExperience, internshipCount } from '../data/experience'
import { getProject } from '../data/projects'
import { known } from '../lib/content'
import { Reveal } from '../components/ui/Reveal'
import SectionHead from './SectionHead'
import styles from './Experience.module.css'

function Entry({ job, open, onToggle }) {
  const panelId = `exp-${job.id}`
  const related = job.projects.map(getProject).filter(Boolean)
  const hasDetails = job.bullets.length > 0 || related.length > 0

  return (
    <Reveal as="li" className={styles.item} data-open={open || undefined} data-undated={!known(job.period) || undefined}>
      <span className={styles.node} aria-hidden="true" />
      <div className={styles.meta}>
        {known(job.period) ? (
          <span className={styles.period}>{job.period}</span>
        ) : (
          // Undated by choice: show the entry type so the rail column is not empty.
          <span className={styles.undated}>{job.type === 'internship' ? 'Internship' : ''}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.role}>{job.role}</h3>
        <p className={styles.company}>{job.company}</p>
        <p className={styles.summary}>{job.summary}</p>

        {hasDetails ? (
          <>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={onToggle}
            >
              {open ? 'Hide details' : 'Show details'}
              <ChevronDown size={16} aria-hidden="true" className={styles.chevron} />
            </button>
            <div id={panelId} className={`${styles.panel} print-expand`}>
              <div className={`${styles.panelInner} print-expand-inner`}>
                <ul className={styles.bullets}>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {related.length > 0 && (
                  <p className={styles.related} data-print="hide">
                    Related:{' '}
                    {related.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && ', '}
                        <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : null}

        <ul className={`tag-list ${styles.tags}`} aria-label="Skills used">
          {job.tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const listRef = useRef(null)
  const [open, setOpen] = useState(() => new Set([sortedExperience[0]?.id]))
  const fillRef = useRef(null)

  // Timeline fill: 0 when the list top reaches 75% of the viewport, 1 when its bottom reaches 60%.
  // Written straight to the element once per frame; CSS smooths it.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const list = listRef.current
      const fill = fillRef.current
      if (!list || !fill) return
      const r = list.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (0.75 * vh - r.top) / (0.15 * vh + r.height)))
      fill.style.transform = `scaleY(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead index={2} id="experience" title="Experience">
          {internshipCount} internships in AI research, business analysis, security, frontend and UX.
        </SectionHead>
        <div className={styles.timeline}>
          <div className={styles.track} aria-hidden="true" data-print="hide">
            <div ref={fillRef} className={styles.fill} />
          </div>
          <ol ref={listRef} className={styles.list}>
            {sortedExperience.map((job) => (
              <Entry key={job.id} job={job} open={open.has(job.id)} onToggle={() => toggle(job.id)} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
