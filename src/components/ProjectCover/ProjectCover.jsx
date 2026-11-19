import { forwardRef } from 'react'
import { HalluCover } from '../HalluChart/HalluChart'
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

// Security: concentric scan rings around one of three glyphs (shield, lock, terminal),
// with position, ring count and sweep angle driven by the slug.
function Rings({ rnd }) {
  const cx = 110 + Math.round(rnd() * 180)
  const cy = 90 + Math.round(rnd() * 45)
  const rings = 2 + Math.floor(rnd() * 3)
  const sweep = rnd() * Math.PI * 2
  const R = 26 + rings * 22
  const glyph = Math.floor(rnd() * 3)
  const blips = Array.from({ length: 3 + Math.floor(rnd() * 4) }, () => {
    const a = rnd() * Math.PI * 2
    const d = 30 + rnd() * (R - 30)
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d]
  })
  return (
    <g>
      {Array.from({ length: rings }, (_, i) => (
        <circle key={i} cx={cx} cy={cy} r={26 + (i + 1) * 22} className={styles.line} fill="none" />
      ))}
      <path
        d={`M${cx} ${cy} L${cx + Math.cos(sweep) * R} ${cy + Math.sin(sweep) * R} A${R} ${R} 0 0 1 ${cx + Math.cos(sweep + 0.6) * R} ${cy + Math.sin(sweep + 0.6) * R} Z`}
        className={styles.accentFill}
        opacity="0.14"
      />
      {blips.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 2.5} className={i === 0 ? styles.accentFill : styles.fill} />
      ))}
      <g transform={`translate(${cx - 20} ${cy - 22})`}>
        {glyph === 0 && (
          <>
            <path d="M20 0 l20 8 v16 c0 14 -9 23 -20 28 c-11 -5 -20 -14 -20 -28 v-16 z" className={styles.accentStroke} fill="none" />
            <rect x="14" y="18" width="12" height="11" rx="2" className={styles.accentFill} />
          </>
        )}
        {glyph === 1 && (
          <>
            <path d="M10 20 v-6 a10 10 0 0 1 20 0 v6" className={styles.accentStroke} fill="none" />
            <rect x="4" y="20" width="32" height="24" rx="4" className={styles.accentStroke} fill="none" />
            <circle cx="20" cy="31" r="3" className={styles.accentFill} />
          </>
        )}
        {glyph === 2 && (
          <>
            <rect x="0" y="6" width="40" height="32" rx="5" className={styles.accentStroke} fill="none" />
            <path d="M8 17 l6 5 l-6 5 M18 28 h10" className={styles.accentStroke} fill="none" />
          </>
        )}
      </g>
    </g>
  )
}

// Full-stack: stacked app windows. Panel count, offset direction and the content of the
// top window (columns, list or chart) vary by slug.
function Layers({ rnd }) {
  const count = 2 + Math.floor(rnd() * 2)
  const dir = rnd() > 0.5 ? 1 : -1
  const w = 190 + Math.round(rnd() * 50)
  const h = 110 + Math.round(rnd() * 20)
  const x0 = 200 - w / 2 - (dir * (count - 1) * 18) / 2
  const y0 = 112 - h / 2 - ((count - 1) * 18) / 2
  const top = { x: x0 + dir * (count - 1) * 18, y: y0 + (count - 1) * 18 }
  const kind = Math.floor(rnd() * 3)
  const cols = 2 + Math.floor(rnd() * 2)
  const innerW = w - 40
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <rect key={i} x={x0 + dir * i * 18} y={y0 + i * 18} width={w} height={h} rx="8" className={i === count - 1 ? styles.panelTop : styles.panel} />
      ))}
      <circle cx={top.x + 14} cy={top.y + 12} r="3" className={styles.fill} />
      <circle cx={top.x + 24} cy={top.y + 12} r="3" className={styles.fill} />
      <rect x={top.x + 20} y={top.y + 28} width={40 + rnd() * 50} height="6" rx="3" className={styles.accentFill} />
      {kind === 0 &&
        Array.from({ length: cols }, (_, i) => (
          <rect key={i} x={top.x + 20 + i * (innerW / cols)} y={top.y + 46} width={innerW / cols - 10} height={h - 66} rx="4" className={styles.fill} opacity="0.45" />
        ))}
      {kind === 1 &&
        Array.from({ length: 4 }, (_, i) => (
          <rect key={i} x={top.x + 20} y={top.y + 46 + i * 15} width={innerW * (0.45 + rnd() * 0.5)} height="6" rx="3" className={styles.fill} opacity="0.55" />
        ))}
      {kind === 2 && (
        <polyline
          points={Array.from({ length: 7 }, (_, i) => `${top.x + 20 + (i * innerW) / 6},${top.y + h - 20 - rnd() * (h - 70)}`).join(' ')}
          className={styles.accentLine}
        />
      )}
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

const art = { ai: Graph, data: Chart, research: Chart, security: Rings, fullstack: Layers, automation: Table }

const ProjectCover = forwardRef(function ProjectCover({ project, className = '', fit = 'slice' }, ref) {
  if (project.chart === 'hallutrace') {
    return (
      <div ref={ref} className={`${styles.cover} ${styles.chart} ${className}`} data-print="hide">
        <HalluCover />
      </div>
    )
  }
  if (project.image) {
    return (
      <div ref={ref} className={`${styles.cover} ${styles.photo} ${className}`} data-print="hide">
        <img
          src={project.image}
          alt={project.imageAlt || ''}
          loading="lazy"
          decoding="async"
          style={{ objectFit: project.imageFit || 'cover' }}
        />
      </div>
    )
  }
  const Art = art[project.categories[0]] ?? Graph
  // Fresh generator per render so the same slug always draws the same picture.
  const rnd = seeded(project.slug)
  return (
    <div ref={ref} className={`${styles.cover} ${className}`} data-print="hide">
      <svg viewBox="0 0 400 225" preserveAspectRatio={`xMidYMid ${fit}`} aria-hidden="true" focusable="false">
        <Art rnd={rnd} />
      </svg>
    </div>
  )
})

export default ProjectCover
