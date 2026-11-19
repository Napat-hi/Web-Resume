import { useLayoutEffect, useRef, useState } from 'react'
import { Shuffle } from 'lucide-react'
import { photos } from '../../data/photos'
import styles from './PhotoStack.module.css'

// A loose pile of polaroids. Drag any photo around the table; it jumps to the top of the pile.
// The Shuffle button does the same for keyboard and screen-reader users.
// Drag uses plain pointer events (no animation library): nothing is measured on page load,
// which keeps the page's main thread free.
const tilt = [-7, 5, -3, 8]
const start = [
  { x: -46, y: 12 },
  { x: 40, y: -6 },
  { x: -10, y: -18 },
  { x: 58, y: 22 },
]

function Photo({ photo, i, z, onFront, tableRef }) {
  const ref = useRef(null)
  const pos = useRef({ ...start[i] })
  const drag = useRef(null)

  const apply = (dragging) => {
    const el = ref.current
    if (!el) return
    const { x, y } = pos.current
    el.style.transform = `translate(${x}px, ${y}px) rotate(${dragging ? 0 : tilt[i]}deg) scale(${dragging ? 1.08 : 1})`
  }
  useLayoutEffect(() => {
    apply(false)
  })

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const t = tableRef.current.getBoundingClientRect()
    const el = ref.current.getBoundingClientRect()
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: pos.current.x,
      oy: pos.current.y,
      lx: Math.max(0, (t.width - el.width) / 2),
      ly: Math.max(0, (t.height - el.height) / 2),
    }
    ref.current.dataset.dragging = ''
    onFront()
    apply(true)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    pos.current = {
      x: Math.min(d.lx, Math.max(-d.lx, d.ox + e.clientX - d.sx)),
      y: Math.min(d.ly, Math.max(-d.ly, d.oy + e.clientY - d.sy)),
    }
    apply(true)
  }
  const onPointerUp = () => {
    if (!drag.current) return
    drag.current = null
    delete ref.current.dataset.dragging
    apply(false)
  }

  return (
    <figure
      ref={ref}
      className={styles.polaroid}
      style={{ zIndex: z }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable="false" width="360" height="480" />
    </figure>
  )
}

export default function PhotoStack() {
  const tableRef = useRef(null)
  const [order, setOrder] = useState(photos.map((p) => p.id))
  const bringToFront = (id) => setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id]))
  const shuffle = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
  const top = photos.find((p) => p.id === order[order.length - 1])

  return (
    <div className={styles.wrap} data-print="hide">
      <div ref={tableRef} className={styles.table}>
        {photos.map((p, i) => (
          <Photo
            key={p.id}
            photo={p}
            i={i}
            z={order.indexOf(p.id) + 1}
            onFront={() => bringToFront(p.id)}
            tableRef={tableRef}
          />
        ))}
      </div>
      <div className={styles.bar}>
        <span className={styles.hint}>Drag the photos around</span>
        <button type="button" className={styles.shuffle} onClick={shuffle}>
          <Shuffle size={14} aria-hidden="true" /> Shuffle
        </button>
      </div>
      <p className="sr-only" aria-live="polite">Top photo: {top?.alt}</p>
    </div>
  )
}
