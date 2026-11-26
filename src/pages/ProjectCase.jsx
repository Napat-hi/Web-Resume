import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { animate, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { getProject, projects, statusLabel } from '../data/projects'
import { known } from '../lib/content'
import { useSeo } from '../lib/seo'
import { prefersReducedMotion } from '../lib/scroll'
import ProjectCover from '../components/ProjectCover/ProjectCover'
import BrandIcon from '../components/ui/BrandIcon'
import Todo from '../components/ui/Todo'
import HalluChart from '../components/HalluChart/HalluChart'
import NotFound from './NotFound'
import MotionScope from '../components/ui/MotionScope'
import styles from './ProjectCase.module.css'

// Shared-element transition: the cover grows from the card's on-screen rect (passed in
// router state) to its place here. Manual FLIP, so it survives the scroll jump to top.
function useCoverFlip(ref, rect, key) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    const el = ref.current
    if (!el || !rect || prefersReducedMotion()) return undefined
    const to = el.getBoundingClientRect()
    const sx = rect.width / to.width
    const sy = rect.height / to.height
    const dx = rect.x - to.left
    const dy = rect.y - to.top
    el.style.transformOrigin = '0 0'
    const controls = animate(
      el,
      {
        transform: [`translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, 'translate(0px, 0px) scale(1, 1)'],
      },
      { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] },
    )
    return () => controls.stop()
  }, [ref, rect, key])
}

// Main content animates on mount; scroll-reveal would hide it until the reader scrolls.
function Section({ index, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.section>
  )
}

function MetaItem({ label, value }) {
  if (!known(value)) {
    return value ? (
      <div>
        <dt>{label}</dt>
        <dd><Todo value={value} /></dd>
      </div>
    ) : null
  }
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export default function ProjectCase() {
  const { slug } = useParams()
  const project = getProject(slug)
  const location = useLocation()
  const navigate = useNavigate()
  const coverRef = useRef(null)
  useCoverFlip(coverRef, location.state?.rect, slug)
  useSeo(project ? { title: project.title, description: project.tagline } : { title: 'Not found' })

  if (!project) return <NotFound />

  const i = projects.indexOf(project)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  const backToProjects = (e) => {
    e.preventDefault()
    // Came straight from a home-page card: go back so Home restores the scroll position.
    if (location.state?.rect && window.history.state?.idx > 0) navigate(-1)
    else navigate('/', { state: { section: 'projects' } })
  }

  return (
    <MotionScope>
    <article className={styles.page}>
      <div className="container">
        <Link to="/" state={{ section: 'projects' }} onClick={backToProjects} className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>

        <header className={styles.header}>
          <p className="eyebrow">
            {project.context}
            {known(project.year) && ` · ${project.year}`}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.tagline}</p>
        </header>

        <ProjectCover ref={coverRef} project={project} className={styles.cover} />

        <div className={styles.layout}>
          <div className={styles.aside}>
            <dl className={styles.meta}>
              <MetaItem label="Status" value={statusLabel[project.status]} />
              <MetaItem label="Role" value={project.role} />
              <MetaItem label="Team" value={project.team} />
            </dl>
            <div>
              <h2 className="eyebrow">Stack</h2>
              <ul className={`tag-list ${styles.stack}`}>
                {project.stack.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </div>
            {project.links.length > 0 && (
              <ul className={styles.links}>
                {project.links.map((l) => (
                  <li key={l.url}>
                    <a className="btn btn-ghost btn-sm" href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.kind === 'github' ? <BrandIcon name="github" size={14} /> : <ArrowUpRight size={14} aria-hidden="true" />}
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.content}>
            {project.confidential && (
              <p className={styles.notice}>
                <Lock size={16} aria-hidden="true" />
                Internal company work. I describe it at a high level and show no internal data or screenshots.
              </p>
            )}

            <Section index={0}>
              <h2>Problem</h2>
              {known(project.problem) ? <p>{project.problem}</p> : <Todo value={project.problem} />}
            </Section>

            <Section index={1}>
              <h2>What I did</h2>
              <ul className={styles.list}>
                {project.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Section>

            {project.chart === 'hallutrace' && (
              <Section index={2}>
                <h2>Result</h2>
                <HalluChart />
              </Section>
            )}

            {known(project.outcome) && (
              <Section index={3}>
                <h2>Outcome</h2>
                <p>{project.outcome}</p>
              </Section>
            )}
          </div>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          <Link to={`/projects/${prev.slug}`} className={styles.pagerLink}>
            <span className={styles.pagerLabel}><ArrowLeft size={14} aria-hidden="true" /> Previous</span>
            {prev.title}
          </Link>
          <Link to={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerLabel}>Next <ArrowRight size={14} aria-hidden="true" /></span>
            {next.title}
          </Link>
        </nav>
      </div>
    </article>
    </MotionScope>
  )
}
