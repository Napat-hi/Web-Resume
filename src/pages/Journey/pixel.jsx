// Pixel-art building blocks. Everything is drawn on an integer grid (1 unit = 1 art pixel) and
// rendered as SVG rects with crisp edges, then scaled up by PX css pixels per art pixel.
import { memo } from 'react'
import face from '../../assets/driver-face.webp'

export const INK = '#14213d'

export function PixelSvg({ w, h, px, className, style, children }) {
  return (
    <svg
      className={className}
      style={style}
      width={w * px}
      height={h * px}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const R = ({ x, y, w = 1, h = 1, c }) => <rect x={x} y={y} width={w} height={h} fill={c} />

// Pixels inside a circle of radius r centred in a (2r+1) box, as [x, y] pairs.
function disc(r, inner = -1) {
  const out = []
  const s = r * 2 + 1
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const d = (x - r) ** 2 + (y - r) ** 2
      if (d <= r * r + r * 0.6 && d > inner) out.push([x, y])
    }
  }
  return out
}

/* ---------- Car ---------- */

// Wheel: radius 5 (11x11). `frame` 0..3 rotates the spoke by 45 degree steps.
const WHEEL_R = 5
const tire = disc(WHEEL_R, 2.8 * 2.8)
const rim = disc(WHEEL_R).filter(([x, y]) => (x - WHEEL_R) ** 2 + (y - WHEEL_R) ** 2 <= 2.8 * 2.8)
const spokes = [0, 1, 2, 3].map((f) => {
  const a = (f * Math.PI) / 4
  const pts = new Set()
  for (let t = -2.6; t <= 2.6; t += 0.5) pts.add(`${Math.round(WHEEL_R + Math.cos(a) * t)},${Math.round(WHEEL_R + Math.sin(a) * t)}`)
  return [...pts].map((p) => p.split(',').map(Number))
})

export function Wheel({ x, y, frame }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {tire.map(([px, py]) => <R key={`t${px}-${py}`} x={px} y={py} c="#1f2937" />)}
      {rim.map(([px, py]) => <R key={`r${px}-${py}`} x={px} y={py} c="#cbd5e1" />)}
      {spokes[frame % 4].map(([px, py]) => <R key={`s${px}-${py}`} x={px} y={py} c="#64748b" />)}
      <R x={WHEEL_R} y={WHEEL_R} c={INK} />
    </g>
  )
}

export const CAR_W = 48
export const CAR_H = 23

// Static car body (cabin, glass, driver's face, body panels, lights). Wheels are drawn separately
// so only they re-render as the car moves.
export const CarBody = memo(function CarBody() {
  const px = []
  // Cabin: rows 0..8, widening for the first 4 rows.
  for (let r = 0; r <= 8; r++) {
    const x0 = Math.max(10, 14 - r)
    const x1 = Math.min(35, 31 + r)
    if (r === 0) {
      px.push(<R key="roof" x={x0} y={0} w={x1 - x0 + 1} c={INK} />)
      continue
    }
    px.push(<R key={`gl${r}`} x={x0 + 1} y={r} w={x1 - x0 - 1} c={r < 3 ? '#e0f2fe' : '#bae6fd'} />)
  }
  return (
    <g>
      {px}
      {/* Driver: a normal, sharp face photo in the 8x8 window patch (only the car itself is pixel art). */}
      <image href={face} x={24} y={1} width={8} height={8} style={{ imageRendering: 'auto' }} preserveAspectRatio="xMidYMid slice" />
      {/* Cabin outline drawn over the glass and face */}
      {Array.from({ length: 8 }, (_, i) => {
        const r = i + 1
        const x0 = Math.max(10, 14 - r)
        const x1 = Math.min(35, 31 + r)
        return (
          <g key={`ol${r}`}>
            <R x={x0} y={r} c={INK} />
            <R x={x1} y={r} c={INK} />
          </g>
        )
      })}
      <R x={23} y={1} h={8} c={INK} />
      {/* Body */}
      <R x={2} y={9} w={44} c={INK} />
      <R x={1} y={10} w={46} h={6} c="#38bdf8" />
      <R x={4} y={11} w={38} c="#bae6fd" />
      <R x={1} y={15} w={46} c="#0284c7" />
      <R x={1} y={10} h={6} c={INK} />
      <R x={46} y={10} h={6} c={INK} />
      <R x={2} y={16} w={44} c={INK} />
      <R x={23} y={10} h={5} c="#0369a1" />
      <R x={26} y={12} w={2} c="#e2e8f0" />
      <R x={45} y={11} h={2} c="#fde047" />
      <R x={2} y={11} h={2} c="#f43f5e" />
      <R x={43} y={14} w={3} h={2} c="#e2e8f0" />
      <R x={2} y={14} w={3} h={2} c="#e2e8f0" />
      <R x={0} y={14} w={2} c="#475569" />
    </g>
  )
})

/* ---------- Scenery sprites ---------- */

export function Cloud({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#ffffff">
      <rect x={4} y={0} width={8} height={2} />
      <rect x={2} y={2} width={14} height={2} />
      <rect x={0} y={4} width={22} height={3} />
      <rect x={14} y={1} width={6} height={3} />
      <rect x={1} y={7} width={20} height={1} fill="#dbeafe" />
    </g>
  )
}

export function Building({ x, h, w, tone, lit }) {
  const wins = []
  for (let wy = 3; wy < h - 3; wy += 4) {
    for (let wx = 2; wx < w - 2; wx += 4) wins.push(<rect key={`${wx}-${wy}`} x={wx} y={wy} width={2} height={2} fill={lit ? '#fde68a' : '#e0f2fe'} />)
  }
  return (
    <g transform={`translate(${x} ${-h})`}>
      <rect width={w} height={h} fill={tone} />
      <rect width={w} height={1} fill="#ffffff" opacity="0.25" />
      {wins}
    </g>
  )
}

export function Tree({ x, blossom }) {
  const leaf = blossom ? '#f9a8d4' : '#22c55e'
  const dark = blossom ? '#ec4899' : '#15803d'
  return (
    <g transform={`translate(${x} -16)`}>
      <rect x={4} y={10} width={2} height={6} fill="#92400e" />
      <rect x={2} y={0} width={6} height={2} fill={leaf} />
      <rect x={0} y={2} width={10} height={6} fill={leaf} />
      <rect x={1} y={8} width={8} height={2} fill={dark} />
      <rect x={2} y={3} width={2} height={2} fill="#ffffff" opacity="0.35" />
    </g>
  )
}

export function Cane({ x }) {
  return (
    <g transform={`translate(${x} -14)`}>
      <rect x={1} y={0} width={1} height={14} fill="#16a34a" />
      <rect x={4} y={3} width={1} height={11} fill="#22c55e" />
      <rect x={2} y={2} width={2} height={1} fill="#4ade80" />
      <rect x={0} y={5} width={1} height={1} fill="#4ade80" />
      <rect x={5} y={6} width={2} height={1} fill="#4ade80" />
    </g>
  )
}

export function Torii({ x }) {
  return (
    <g transform={`translate(${x} -22)`}>
      <rect x={0} y={0} width={20} height={2} fill="#dc2626" />
      <rect x={-1} y={0} width={1} height={1} fill="#dc2626" />
      <rect x={20} y={0} width={1} height={1} fill="#dc2626" />
      <rect x={2} y={5} width={16} height={1} fill="#b91c1c" />
      <rect x={4} y={2} width={2} height={20} fill="#dc2626" />
      <rect x={14} y={2} width={2} height={20} fill="#dc2626" />
      <rect x={9} y={2} width={2} height={3} fill="#b91c1c" />
    </g>
  )
}

export function Fuji({ x }) {
  const rows = []
  for (let r = 0; r < 34; r++) {
    const half = 6 + r * 1.6
    const snow = r < 9 || (r < 12 && r % 2 === 0)
    rows.push(<rect key={r} x={Math.round(-half)} y={r} width={Math.round(half * 2)} height={1} fill={snow ? '#f8fafc' : r % 6 === 0 ? '#7c93b8' : '#8aa2c7'} />)
  }
  return <g transform={`translate(${x} -34)`}>{rows}</g>
}

export function Hill({ x, w, h, tone }) {
  const rows = []
  for (let r = 0; r < h; r++) {
    const half = (w / 2) * Math.sqrt(1 - ((h - r) / h) ** 2)
    rows.push(<rect key={r} x={Math.round(-half)} y={r} width={Math.max(1, Math.round(half * 2))} height={1} fill={tone} />)
  }
  return <g transform={`translate(${x} ${-h})`}>{rows}</g>
}

const sunPixels = disc(7)
const moonPixels = disc(5)
export function Sun() {
  return (
    <svg width="60" height="60" viewBox="0 0 15 15" shapeRendering="crispEdges" aria-hidden="true">
      {sunPixels.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={(x + y) % 5 === 0 ? '#fcd34d' : '#fde047'} />)}
    </svg>
  )
}
export function Moon() {
  return (
    <svg width="44" height="44" viewBox="0 0 11 11" shapeRendering="crispEdges" aria-hidden="true">
      {moonPixels.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={x > 6 && y < 6 ? '#cbd5e1' : '#f1f5f9'} />)}
    </svg>
  )
}

/* ---------- Badges for stops without a logo ---------- */

export function Trophy() {
  return (
    <svg width="44" height="44" viewBox="0 0 11 11" shapeRendering="crispEdges" aria-hidden="true">
      <rect x={2} y={0} width={7} height={1} fill={INK} />
      <rect x={2} y={1} width={7} height={4} fill="#fbbf24" />
      <rect x={3} y={1} width={1} height={3} fill="#fde68a" />
      <rect x={0} y={1} width={2} height={1} fill="#fbbf24" />
      <rect x={9} y={1} width={2} height={1} fill="#fbbf24" />
      <rect x={0} y={2} width={1} height={2} fill="#fbbf24" />
      <rect x={10} y={2} width={1} height={2} fill="#fbbf24" />
      <rect x={3} y={5} width={5} height={1} fill="#f59e0b" />
      <rect x={5} y={6} width={1} height={2} fill="#f59e0b" />
      <rect x={3} y={8} width={5} height={1} fill="#b45309" />
      <rect x={2} y={9} width={7} height={2} fill={INK} />
    </svg>
  )
}

export function JapanFlag() {
  return (
    <svg width="60" height="40" viewBox="0 0 15 10" shapeRendering="crispEdges" aria-hidden="true">
      <rect width={15} height={10} fill="#ffffff" />
      <rect width={15} height={10} fill="none" stroke={INK} strokeWidth="1" />
      {disc(2).map(([x, y]) => <rect key={`${x}-${y}`} x={x + 5} y={y + 3} width={1} height={1} fill="#dc2626" />)}
    </svg>
  )
}
