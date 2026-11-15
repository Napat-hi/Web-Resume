import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { categories, projects, statusLabel } from '../data/projects'
import { homeScroll, prefersReducedMotion } from '../lib/scroll'
import ProjectCover from '../components/ProjectCover/ProjectCover'
import BrandIcon from '../components/ui/BrandIcon'
import SectionHead from './SectionHead'
import styles from './Projects.module.css'

const MAX_TILT = 4
export const preloadCase = () => import('../pages/ProjectCase')

function ProjectLinks({ links }) {
  if (!links.length) return null
  return (
    <ul className={styles.links}>
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
            {l.kind === 'github' ? <BrandIcon name="github" size={14} /> : <ArrowUpRight size={14} aria-hidden="true" />}
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project }) {
  const navigate = useNavigate()
  const coverRef = useRef(null)
  const [canTilt, setCanTilt] = useState(false)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22 })

  useEffect(() => {
    setCanTilt(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion())
  }, [])

  const onMove = (e) => {
    if (!canTilt) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * MAX_TILT * 2)
    rx.set(-py * MAX_TILT * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const open = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    homeScroll.y = window.scrollY
    const r = coverRef.current?.getBoundingClientRect()
    navigate(`/projects/${project.slug}`, {
      state: r ? { rect: { x: r.left, y: r.top, width: r.width, height: r.height } } : null,
    })
  }

  return (
    <motion.div
      className={`${styles.card} print-card`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={preloadCase}
      onFocus={preloadCase}
    >
      <ProjectCover ref={coverRef} project={project} />
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={`${styles.status} ${project.status === 'published' ? styles.statusAccent : ''}`}>
            {statusLabel[project.status]}
          </span>
          <span className={styles.context}>{project.context}</span>
        </div>
        <h3 className={styles.title}>
          <Link to={`/projects/${project.slug}`} onClick={open} className={styles.stretched}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.tagline}>{project.tagline}</p>
        <ul className="tag-list" aria-label="Stack">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
          {project.stack.length > 4 && <li className="tag">+{project.stack.length - 4}</li>}
        </ul>
        <div className={styles.foot} data-print="hide">
          {project.confidential && (
            <span className={styles.confidential}>
              <Lock size={12} aria-hidden="true" /> Company work · high-level only
            </span>
          )}
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const chips = useMemo(() => {
    const used = categories
      .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
      .filter((c) => c.count > 0)
    return [{ id: 'all', label: 'All', count: projects.length }, ...used]
  }, [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead index={3} id="projects" title="Projects">
          Research, internship work and university projects. Open a card for the full case study.
        </SectionHead>

        <div className={styles.chips} data-print="hide" role="group" aria-label="Filter projects by category">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.chip}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
              <span className={styles.count}>{c.count}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {projects.length} projects
        </p>

        <motion.ul layout className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
