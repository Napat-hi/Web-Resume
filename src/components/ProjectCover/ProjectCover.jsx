import { forwardRef } from 'react'
import styles from './ProjectCover.module.css'

// Generated, theme-aware cover art. No screenshots exist yet, and company work must not
// show any, so each project gets an abstract diagram matched to its main category.
// TODO(Po): drop real screenshots into src/assets/projects/<slug>.webp for public projects.

function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

function Graph({ rnd }) {
  const nodes = Array.from({ length: 11 }, () => [40 + rnd() * 320, 30 + rnd() * 165])
  const edges = []
  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 120) edges.push([a, b])
    })
  })
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={styles.line} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 6 : 3.5} className={i % 4 === 0 ? styles.accentFill : styles.fill} />
      ))}
    </g>
  )
}

function Chart({ rnd }) {
  const pts = Array.from({ length: 28 }, (_, i) => [30 + i * 12.5, 60 + rnd() * 120])
  const trend = Array.from({ length: 8 }, (_, i) => `${30 + i * 48},${170 - i * 14 - rnd() * 16}`).join(' ')
  return (
    <g>
      {[60, 105, 150, 195].map((y) => (
        <line key={y} x1="24" x2="376" y1={y} y2={y} className={styles.grid} />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" className={styles.fill} />
      ))}
      <polyline points={trend} className={styles.accentLine} />
    </g>
  )
}

function Rings() {
  return (
    <g>
      {[22, 44, 66, 88].map((r) => (
        <circle key={r} cx="200" cy="112" r={r} className={styles.line} fill="none" />
      ))}
      <path d="M200 70 l30 12 v24 c0 20 -14 34 -30 40 c-16 -6 -30 -20 -30 -40 v-24 z" className={styles.accentStroke} fill="none" />
      <rect x="191" y="104" width="18" height="16" rx="3" className={styles.accentFill} />
    </g>
  )
}

function Layers({ rnd }) {
  const cols = 2 + Math.floor(rnd() * 2)
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={70 + i * 20} y={40 + i * 22} width="220" height="120" rx="8" className={i === 2 ? styles.panelTop : styles.panel} />
      ))}
      {Array.from({ length: cols }, (_, i) => (
        <rect key={i} x={126 + i * (176 / cols)} y="112" width={176 / cols - 12} height="40" rx="4" className={styles.fill} opacity="0.5" />
      ))}
      <rect x="126" y="96" width="70" height="6" rx="3" className={styles.accentFill} />
    </g>
  )
}

function Table({ rnd }) {
  const rows = 6
  return (
    <g>
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          <rect x="60" y={36 + r * 26} width="280" height="20" rx="3" className={r === 0 ? styles.panelTop : styles.panel} />
          {r > 0 && (rnd() > 0.25 ? (
            <path d={`M314 ${46 + r * 26} l5 5 l9 -10`} className={styles.accentStroke} fill="none" />
          ) : (
            <circle cx="320" cy={46 + r * 26} r="4" className={styles.fill} />
          ))}
          {r > 0 && <rect x="72" y={43 + r * 26} width={60 + rnd() * 120} height="6" rx="3" className={styles.fill} opacity="0.6" />}
        </g>
      ))}
    </g>
  )
}

const art = { ai: Graph, research: Chart, security: Rings, fullstack: Layers, automation: Table }

const ProjectCover = forwardRef(function ProjectCover({ project, className = '' }, ref) {
  const Art = art[project.categories[0]] ?? Graph
  // Fresh generator per render so the same slug always draws the same picture.
  const rnd = seeded(project.slug)
  return (
    <div ref={ref} className={`${styles.cover} ${className}`}>
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <Art rnd={rnd} />
      </svg>
      <span className={styles.label}>{project.slug}</span>
    </div>
  )
})

export default ProjectCover
