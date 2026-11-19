import { useState } from 'react'
import { countText, models, points, shareText, source } from '../../data/hallutrace'
import styles from './HalluChart.module.css'

// HalluTrace's main result as range bars: solid = slots counted at that point,
// light = how far the share could reach where the corpus counts leave it open.
// One hue, two steps (validated with the dataviz ordinal check in light and dark).

const pct = (x, n) => (n ? (x / n) * 100 : 0)

// Small, static version for the project card cover (all five models, no controls).
export function HalluCover() {
  const m = models[0]
  const x0 = 158
  const w = 168
  return (
    <svg viewBox="0 0 400 225" className={styles.coverSvg} aria-hidden="true" focusable="false">
      <text x="20" y="34" className={styles.coverTitle}>Where wrong years started</text>
      <text x="20" y="53" className={styles.coverSub}>{m.n} wrong birth and death years · 5 open LLMs</text>
      {points.map((p, i) => {
        const [lo, hi] = m[p.id]
        const y = 80 + i * 27
        return (
          <g key={p.id}>
            <text x="20" y={y + 9} className={styles.coverLabel}>{p.short}</text>
            <rect x={x0} y={y} width={w} height="11" rx="3" className={styles.track} />
            {hi > lo && <rect x={x0} y={y} width={(w * pct(hi, m.n)) / 100} height="11" rx="3" className={styles.soft} />}
            {lo > 0 && <rect x={x0} y={y} width={(w * pct(lo, m.n)) / 100} height="11" rx="3" className={styles.strong} />}
            <text x={x0 + w + 8} y={y + 9} className={styles.coverValue}>{shareText([lo, hi], m.n)}</text>
          </g>
        )
      })}
    </svg>
  )
}

// Interactive version for the case study: pick a model, hover or focus a row for counts.
export default function HalluChart() {
  const [modelId, setModelId] = useState('all')
  const [active, setActive] = useState('inference')
  const m = models.find((x) => x.id === modelId)
  const activePoint = points.find((p) => p.id === active)

  return (
    <figure className={styles.chart}>
      <figcaption className={styles.head}>
        <span className={styles.title}>Where wrong birth and death years started</span>
        <span className={styles.sub}>
          Biographies task, judged against Wikidata. Pick a model; hover, tap or focus a row for the counts.
        </span>
      </figcaption>

      <div className={styles.filters} role="group" aria-label="Model">
        {models.map((x) => (
          <button
            key={x.id}
            type="button"
            className={styles.filter}
            aria-pressed={x.id === modelId}
            onClick={() => setModelId(x.id)}
          >
            {x.label} <span className={styles.n}>{x.n}</span>
          </button>
        ))}
      </div>

      <ul className={styles.rows}>
        {points.map((p) => {
          const [lo, hi] = m[p.id]
          return (
            <li
              key={p.id}
              className={styles.row}
              data-active={p.id === active || undefined}
              tabIndex={0}
              aria-label={`${p.label}: ${shareText([lo, hi], m.n)}, ${countText([lo, hi], m.n)}`}
              onMouseEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
              onClick={() => setActive(p.id)}
            >
              <span className={styles.label}>{p.label}</span>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.barSoft} style={{ width: `${pct(hi, m.n)}%` }} />
                <span className={styles.barStrong} style={{ width: `${pct(lo, m.n)}%` }} />
              </span>
              <span className={styles.value}>{shareText([lo, hi], m.n)}</span>
            </li>
          )
        })}
      </ul>

      <p className={styles.detail} aria-live="polite">
        <strong>{activePoint.label}</strong> · {m.label}: {countText(m[active], m.n)}
        {activePoint.note && ` (${activePoint.note})`}.
      </p>

      <div className={styles.foot}>
        <span className={styles.legend}>
          <span className={styles.key}><span className={styles.swatchStrong} /> counted</span>
          <span className={styles.key}><span className={styles.swatchSoft} /> could reach, where the counts leave it open</span>
        </span>
        <a href={source.url} target="_blank" rel="noopener noreferrer" className={styles.source}>
          Data: {source.label}
        </a>
      </div>

      <details className={styles.tableWrap}>
        <summary>Show as a table</summary>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Model</th>
                {points.map((p) => (
                  <th key={p.id} scope="col">{p.short}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((x) => (
                <tr key={x.id}>
                  <th scope="row">{x.label} <span className={styles.n}>({x.n})</span></th>
                  {points.map((p) => (
                    <td key={p.id}>{shareText(x[p.id], x.n)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}
