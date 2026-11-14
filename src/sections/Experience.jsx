import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { sortedExperience, internshipCount } from '../data/experience'
import { getProject } from '../data/projects'
import { known } from '../lib/content'
import { Reveal } from '../components/ui/Reveal'
import Todo from '../components/ui/Todo'
import SectionHead from './SectionHead'
import styles from './Experience.module.css'

function Entry({ job, open, onToggle }) {
  const panelId = `exp-${job.id}`
  const related = job.projects.map(getProject).filter(Boolean)
  const hasDetails = job.bullets.length > 0 || related.length > 0

  return (
    <Reveal as="li" className={styles.item} data-open={open || undefined}>
      <span className={styles.node} aria-hidden="true" />
      <div className={styles.meta}>
        {known(job.period) ? <span className={styles.period}>{job.period}</span> : <Todo value={job.period} />}
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
            <div id={panelId} className={styles.panel} role="region" aria-label={`${job.company} details`}>
              <div className={styles.panelInner}>
                <ul className={styles.bullets}>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {related.length > 0 && (
                  <p className={styles.related}>
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
        ) : (
          <Todo value="TODO(Po): bullets for this role" />
        )}

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
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

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
          <div className={styles.track} aria-hidden="true">
            <motion.div className={styles.fill} style={{ scaleY }} />
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
