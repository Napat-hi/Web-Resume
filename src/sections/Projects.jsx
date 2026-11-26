import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { flushSync } from 'react-dom'
import { ArrowUpRight, Award, ChevronDown, Lock } from 'lucide-react'
import { categories, projects, statusLabel } from '../data/projects'
import { homeScroll, prefersReducedMotion } from '../lib/scroll'
import { known } from '../lib/content'
import { spotlightMove } from '../hooks/useSpotlight'
import ProjectCover from '../components/ProjectCover/ProjectCover'
import BrandIcon from '../components/ui/BrandIcon'
import SectionHead from './SectionHead'
import styles from './Projects.module.css'

const MAX_TILT = 4
const INITIAL_MORE = 6
export const preloadCase = () => import('../pages/ProjectCase')

const featured = projects.filter((p) => p.featured).sort((a, b) => a.featured - b.featured)
const rest = projects.filter((p) => !p.featured)

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

// variant: 'lead' (large, featured #1) | 'feature' | 'compact'
function ProjectCard({ project, variant = 'compact' }) {
  const navigate = useNavigate()
  const coverRef = useRef(null)
  const [canTilt, setCanTilt] = useState(false)
  const cardRef = useRef(null)
  const isLead = variant === 'lead'
  const tilt = isLead ? MAX_TILT / 2 : MAX_TILT // large cards tilt less so edges stay calm

  useEffect(() => {
    setCanTilt(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion())
  }, [])

  const onMove = (e) => {
    spotlightMove(e)
    if (!canTilt) return
    // Tilt through CSS variables (no re-render); the card's CSS transition smooths it.
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * tilt * 2}deg`)
    e.currentTarget.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * tilt * 2}deg`)
  }
  const onLeave = () => {
    cardRef.current?.style.setProperty('--rx', '0deg')
    cardRef.current?.style.setProperty('--ry', '0deg')
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

  const maxTags = isLead ? 6 : 4
  const coverClass = isLead ? styles.coverLead : variant === 'compact' ? styles.coverStrip : ''

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[variant]} spotlight print-card`}
      style={{ viewTransitionName: `project-${project.slug}` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={preloadCase}
      onFocus={preloadCase}
    >
      <ProjectCover ref={coverRef} project={project} className={coverClass} fit={isLead ? 'meet' : 'slice'} />
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={`${styles.status} ${project.status === 'published' ? styles.statusAccent : ''}`}>
            {statusLabel[project.status]}
          </span>
          <span className={styles.context} title={project.context}>{project.context}</span>
        </div>
        <h3 className={styles.title}>
          <Link to={`/projects/${project.slug}`} onClick={open} className={styles.stretched}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.tagline}>{project.tagline}</p>
        {isLead && known(project.outcome) && (
          <p className={styles.outcome}>
            <Award size={16} aria-hidden="true" /> {project.outcome}
          </p>
        )}
        <ul className="tag-list" aria-label="Stack">
          {project.stack.slice(0, maxTags).map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
          {project.stack.length > maxTags && <li className="tag">+{project.stack.length - maxTags}</li>}
        </ul>
        {(project.confidential || project.links.length > 0) && (
          <div className={styles.foot} data-print="hide">
            {project.confidential && (
              <span className={styles.confidential}>
                <Lock size={12} aria-hidden="true" /> Company work · high-level only
              </span>
            )}
            <ProjectLinks links={project.links} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const moreRef = useRef(null)

  const chips = useMemo(() => {
    const used = categories
      .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
      .filter((c) => c.count > 0)
    return [{ id: 'all', label: 'All', count: projects.length }, ...used]
  }, [])

  const filtered = filter === 'all' ? null : projects.filter((p) => p.categories.includes(filter))
  const hiddenCount = rest.length - INITIAL_MORE

  // Cards morph to their new places with the View Transitions API (each card has its own
  // view-transition-name). Browsers without it, or reduced motion, switch at once.
  const changeFilter = (id) => {
    if (id === filter) return
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(() => {
        flushSync(() => setFilter(id))
      })
    } else {
      setFilter(id)
    }
  }

  const toggleMore = () => {
    const next = !expanded
    setExpanded(next)
    // Move focus to the first card that just appeared, so keyboard users land on new content.
    if (next) requestAnimationFrame(() => moreRef.current?.querySelector(`li:nth-child(${INITIAL_MORE + 1}) a`)?.focus())
  }

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
              onClick={() => changeFilter(c.id)}
            >
              {c.label}
              <span className={styles.count}>{c.count}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {filtered ? `Showing ${filtered.length} of ${projects.length} projects` : `Showing all ${projects.length} projects`}
        </p>

        {filtered ? (
          <ul className={styles.grid}>
            {filtered.map((p) => (
              <li key={p.slug} data-print={p.print === false ? 'hide' : undefined}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h3 className={styles.groupTitle}>Featured</h3>
            <ul className={styles.featured}>
              {featured.map((p, i) => (
                <li key={p.slug} className={i === 0 ? styles.leadItem : undefined}>
                  <ProjectCard project={p} variant={i === 0 ? 'lead' : 'feature'} />
                </li>
              ))}
            </ul>

            <h3 className={styles.groupTitle}>
              More projects <span className={styles.groupCount}>{rest.length}</span>
            </h3>
            <ul id="more-projects" ref={moreRef} className={styles.grid}>
              {rest.map((p, i) => {
                const collapsed = !expanded && i >= INITIAL_MORE
                return (
                  <li
                    key={p.slug}
                    className={collapsed ? styles.collapsed : i >= INITIAL_MORE ? styles.appear : undefined}
                    data-collapsed={collapsed || undefined}
                    data-print={p.print === false ? 'hide' : undefined}
                  >
                    <ProjectCard project={p} />
                  </li>
                )
              })}
            </ul>
            {hiddenCount > 0 && (
              <div className={styles.moreRow} data-print="hide">
                <button
                  type="button"
                  className="btn btn-ghost"
                  aria-expanded={expanded}
                  aria-controls="more-projects"
                  onClick={toggleMore}
                >
                  {expanded ? 'Show fewer' : `Show all ${rest.length}`}
                  <ChevronDown size={16} aria-hidden="true" className={expanded ? styles.flip : undefined} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
