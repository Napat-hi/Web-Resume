import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import { journey, journeyIntro } from '../../data/journey'
import {
  Building, CAR_H, CAR_W, CarBody, Cane, Cloud, Fuji, Hill, JapanFlag, Moon, PixelSvg, Sun, Torii, Tree, Trophy, Wheel,
} from './pixel'
import { fanfare, honk, pixelConfetti } from './effects'
import styles from './Journey.module.css'

const SOUND_KEY = 'journey-sound'

// Sky in hard bands (top, horizon): morning -> noon -> golden hour -> sunset -> dusk.
// Soft pastels (Po asked for an easy-on-the-eyes tone); dusk stays mid-dark, never black.
const SKY = [
  ['#dcebf6', '#f1f7fb'],
  ['#cfe4f3', '#ebf4fa'],
  ['#c3ddef', '#e5f1f8'],
  ['#c9d9ec', '#f6eadb'],
  ['#d2cde6', '#f3dfd0'],
  ['#b9b3d8', '#eccdc4'],
  ['#8790b8', '#b4aed3'],
  ['#6a7399', '#8790b8'],
  ['#5a6389', '#737ca3'],
]

/* ---------- Layout ---------- */

export function computeLayout(w, h) {
  const narrow = w < 640
  const px = narrow ? 4 : 5
  const carPx = narrow ? 5 : 7 // the car is drawn larger than the world so the driver's face reads
  const carW = CAR_W * carPx
  const carX = narrow ? 8 : Math.round(w * 0.1)
  const front = carX + carW * 0.8
  // Billboards are 300px (phone) / 480px wide; keep a clear gap between neighbours.
  const spacing = narrow ? 390 : Math.min(780, Math.max(620, w * 0.5))
  const firstX = carX + carW + (narrow ? 140 : 220)
  const stopsX = journey.map((_, i) => firstX + i * spacing)
  const travel = stopsX[stopsX.length - 1] - front + 30
  const roadH = 22 * px
  return { w, h, narrow, px, carPx, carW, carX, front, spacing, stopsX, travel, trackW: travel + w + 300, roadH }
}

function useLayout(stageRef) {
  const [size, setSize] = useState(() => ({ w: document.documentElement.clientWidth, h: Math.max(560, window.innerHeight) }))
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [stageRef])
  return useMemo(() => computeLayout(size.w, size.h), [size])
}

/* ---------- Scenery (deterministic) ---------- */

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

// Mid layer moves at 0.6x. Each stop owns a stretch of it, centred where the car meets the stop,
// filled with that stop's scene (city blocks, campus trees, cane field, Tokyo).
function buildMid(L) {
  const r = rng(11)
  const speed = 0.6
  const items = []
  const segW = (speed * L.spacing) / L.px
  journey.forEach((stop, i) => {
    const d = L.stopsX[i] - L.front
    const centre = (L.front + speed * d) / L.px
    const from = i === 0 ? 0 : centre - segW / 2
    const to = i === journey.length - 1 ? centre + segW / 2 + L.w / L.px : centre + segW / 2
    let x = from
    while (x < to) {
      if (stop.scene === 'city') {
        const w = 10 + Math.floor(r() * 9)
        items.push(<Building key={`b${i}-${x}`} x={Math.round(x)} w={w} h={18 + Math.floor(r() * 30)} tone={r() > 0.5 ? '#aabdd5' : '#bacbe0'} lit={i >= 6} />)
        x += w + 1 + Math.floor(r() * 3)
      } else if (stop.scene === 'campus') {
        if (r() > 0.55) {
          items.push(<Building key={`h${i}-${x}`} x={Math.round(x)} w={22} h={16} tone="#e8cdb3" lit={i >= 6} />)
          x += 24
        } else {
          items.push(<Tree key={`t${i}-${x}`} x={Math.round(x)} />)
          x += 11 + Math.floor(r() * 4)
        }
      } else if (stop.scene === 'field') {
        items.push(<Cane key={`c${i}-${x}`} x={Math.round(x)} />)
        x += 3 + Math.floor(r() * 2)
      } else if (stop.scene === 'tokyo') {
        const pick = r()
        if (pick < 0.15) {
          items.push(<Torii key={`g${i}-${x}`} x={Math.round(x)} />)
          x += 26
        } else if (pick < 0.6) {
          items.push(<Tree key={`s${i}-${x}`} x={Math.round(x)} blossom />)
          x += 11
        } else {
          const w = 8 + Math.floor(r() * 6)
          items.push(<Building key={`k${i}-${x}`} x={Math.round(x)} w={w} h={24 + Math.floor(r() * 26)} tone="#b8c1d8" lit />)
          x += w + 1
        }
      }
    }
  })
  return items
}

// Far layer (0.3x): soft hills everywhere, Mt. Fuji where the Tokyo stop is.
function buildFar(L) {
  const r = rng(5)
  const speed = 0.3
  const width = (L.trackW * speed + L.w) / L.px
  const items = []
  for (let x = 0; x < width; x += 40 + Math.floor(r() * 30)) {
    items.push(<Hill key={`h${x}`} x={Math.round(x)} w={50 + Math.floor(r() * 30)} h={10 + Math.floor(r() * 10)} tone="#cfdcec" />)
  }
  const ti = journey.findIndex((s) => s.scene === 'tokyo')
  if (ti >= 0) {
    const d = L.stopsX[ti] - L.front
    items.push(<Fuji key="fuji" x={Math.round((L.front + L.w * 0.25 + speed * d) / L.px)} />)
  }
  return { items, width }
}

function buildClouds(L) {
  const r = rng(3)
  const width = (L.trackW * 0.15 + L.w) / L.px
  const items = []
  for (let x = 4; x < width; x += 50 + Math.floor(r() * 40)) items.push(<Cloud key={x} x={Math.round(x)} y={4 + Math.floor(r() * 24)} />)
  return { items, width }
}

/* ---------- Stop card ---------- */

// A billboard: photo panel (when the stop has one) beside the text panel. On the drive it
// stands on two legs (rendered by the stop, see `styles.legs`); the static list shows it flat.
export function StopCard({ stop, active, onCta }) {
  return (
    <article className={styles.card} data-active={active || undefined} data-photo={stop.photo ? '' : undefined}>
      {stop.photo && <img className={styles.photo} src={stop.photo} alt={stop.photoAlt} width="360" height="480" />}
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          {stop.logo && <img className={styles.logo} src={stop.logo} alt={stop.logoAlt} />}
          {stop.badge === 'trophy' && <Trophy />}
          {stop.badge === 'japan' && <JapanFlag />}
          {stop.year && <span className={styles.year}>{stop.year}</span>}
        </div>
        <h2 className={styles.cardTitle}>{stop.title}</h2>
        <p className={styles.cardLine}>{stop.line}</p>
        {stop.cta && (
          <Link to="/" state={{ section: 'contact' }} className={styles.pixelBtn} onClick={onCta}>
            Say hi
          </Link>
        )}
      </div>
    </article>
  )
}

/* ---------- The drive ---------- */

export default function Drive() {
  const rideRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const celebrated = useRef(false)
  const movingTimer = useRef(0)
  const L = useLayout(stageRef)
  const [active, setActive] = useState(-1)
  const [frame, setFrame] = useState(0)
  const [band, setBand] = useState(0)
  const [moving, setMoving] = useState(false)
  const [honking, setHonking] = useState(0)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [sound, setSound] = useState(() => {
    try { return localStorage.getItem(SOUND_KEY) === 'on' } catch { return false }
  })

  const { scrollYProgress } = useScroll({ target: rideRef, offset: ['start start', 'end end'] })
  const distance = useTransform(scrollYProgress, (p) => p * L.travel)
  const snap = (v) => Math.round(v / L.px) * L.px
  const trackX = useTransform(distance, (d) => -snap(d))
  const midX = useTransform(distance, (d) => -snap(d * 0.6))
  const farX = useTransform(distance, (d) => -snap(d * 0.3))
  const cloudX = useTransform(distance, (d) => -snap(d * 0.15))
  const sunX = useTransform(scrollYProgress, (p) => snap(L.w * (0.08 + p * 0.74)))
  const sunY = useTransform(scrollYProgress, (p) => snap(L.h * 0.5 - Math.sin(p * Math.PI) * L.h * 0.34))

  const mid = useMemo(() => buildMid(L), [L])
  const far = useMemo(() => buildFar(L), [L])
  const clouds = useMemo(() => buildClouds(L), [L])

  useMotionValueEvent(distance, 'change', (d) => {
    const reach = d + L.front
    let idx = -1
    L.stopsX.forEach((x, i) => { if (reach >= x - 30) idx = i })
    setActive((prev) => (prev === idx ? prev : idx))
    const f = Math.floor(d / (L.px * 3)) % 4
    setFrame((prev) => (prev === f ? prev : f))
    setMoving(true)
    clearTimeout(movingTimer.current)
    movingTimer.current = setTimeout(() => setMoving(false), 160)
  })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const b = Math.min(SKY.length - 1, Math.floor(p * SKY.length))
    setBand((prev) => (prev === b ? prev : b))
    setDone(p > 0.985)
    setStarted(p > 0.03)
  })

  useEffect(() => {
    const stop = journey[active]
    if (!stop?.celebrate || celebrated.current || !canvasRef.current) return undefined
    celebrated.current = true
    if (sound) fanfare()
    return pixelConfetti(canvasRef.current, L.carX + L.carW * 0.6, L.h - L.roadH - CAR_H * L.carPx, L.px)
  }, [active, L, sound])

  useEffect(() => {
    if (!honking) return undefined
    const t = setTimeout(() => setHonking(0), 1000)
    return () => clearTimeout(t)
  }, [honking])

  const toggleSound = () => {
    setSound((s) => {
      const next = !s
      try { localStorage.setItem(SOUND_KEY, next ? 'on' : 'off') } catch { /* blocked */ }
      if (next) honk()
      return next
    })
  }
  const onHonk = useCallback(() => {
    setHonking((n) => n + 1)
    if (sound) honk()
  }, [sound])

  const jumpTo = (i) => {
    const top = rideRef.current.getBoundingClientRect().top + window.scrollY
    const need = L.stopsX[i] - L.front + 10
    const p = Math.min(1, Math.max(0, need / L.travel))
    const smooth = document.documentElement.dataset.motion !== 'reduce'
    window.scrollTo({ top: top + p * L.travel, behavior: smooth ? 'smooth' : 'auto' })
  }

  // Keyboard driving: → / ← jump to the next / previous stop, H honks. Ignored while typing
  // or when a modifier is held (so Ctrl+K and browser shortcuts still work).
  const jumpRef = useRef(jumpTo)
  jumpRef.current = jumpTo
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const next = e.key === 'ArrowRight' ? active + 1 : active - 1
        jumpRef.current(Math.min(journey.length - 1, Math.max(0, next)))
      } else if (e.key === 'h' || e.key === 'H') {
        onHonk()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [active, onHonk])

  const [skyTop, skyLow] = SKY[band]
  const night = band >= 6
  const current = journey[active]
  const bubble = honking ? 'BEEP BEEP!' : current ? current.say : journeyIntro
  const bounce = moving && frame % 2 === 1 ? -L.carPx : 0

  return (
    <div
      ref={rideRef}
      className={styles.ride}
      style={{ height: `calc(var(--stage-h) + ${Math.round(L.travel)}px)`, '--px': `${L.px}px`, '--road-h': `${L.roadH}px`, '--car-h': `${CAR_H * L.carPx}px` }}
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.sky} style={{ background: `linear-gradient(${skyTop} 0 58%, ${skyLow} 58% 100%)` }} aria-hidden="true" />
        <div className={styles.stars} data-on={night || undefined} aria-hidden="true" />
        <motion.div className={styles.sun} style={{ x: sunX, y: sunY }} data-hide={night || undefined} aria-hidden="true"><Sun /></motion.div>
        <motion.div className={styles.moon} style={{ x: sunX, y: sunY }} data-show={night || undefined} aria-hidden="true"><Moon /></motion.div>

        <motion.div className={styles.layer} style={{ x: cloudX }} aria-hidden="true">
          <PixelSvg w={Math.ceil(clouds.width)} h={40} px={L.px} className={styles.clouds}>{clouds.items}</PixelSvg>
        </motion.div>
        <motion.div className={styles.layer} style={{ x: farX }} aria-hidden="true">
          <PixelSvg w={Math.ceil(far.width)} h={36} px={L.px} className={styles.far}>
            <g transform="translate(0 36)">{far.items}</g>
          </PixelSvg>
        </motion.div>
        <motion.div className={styles.layer} style={{ x: midX }} aria-hidden="true">
          <PixelSvg w={Math.ceil((L.trackW * 0.6 + L.w) / L.px)} h={52} px={L.px} className={styles.mid}>
            <g transform="translate(0 52)">{mid}</g>
          </PixelSvg>
        </motion.div>

        <motion.div className={styles.track} style={{ x: trackX, width: L.trackW }}>
          <div className={styles.road} aria-hidden="true"><div className={styles.lane} /></div>
          <ol className={styles.stops} aria-label="Journey milestones">
            {journey.map((stop, i) => (
              <li key={stop.id} className={styles.stop} style={{ left: L.stopsX[i] }}>
                <span className={styles.legs} aria-hidden="true" />
                <StopCard stop={stop} active={i <= active} />
              </li>
            ))}
          </ol>
        </motion.div>

        {/* The car stays put while the world scrolls past. */}
        <div className={styles.car} style={{ left: L.carX, width: L.carW }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={bubble}
              className={styles.bubble}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: 'linear' }}
              aria-live="polite"
            >
              {bubble}
            </motion.p>
          </AnimatePresence>
          <motion.div
            className={styles.carBody}
            animate={honking ? { y: [0, -3 * L.carPx, 0, -L.carPx, 0] } : { y: bounce }}
            transition={honking ? { duration: 0.5, ease: 'linear' } : { duration: 0 }}
          >
            <PixelSvg w={CAR_W} h={CAR_H} px={L.carPx}>
              <CarBody />
              <Wheel x={7} y={12} frame={frame} />
              <Wheel x={31} y={12} frame={frame} />
            </PixelSvg>
            <span className={styles.puffs} data-on={moving || undefined} aria-hidden="true">
              <i /><i /><i />
            </span>
            <button type="button" className={styles.horn} onClick={onHonk} aria-label="Honk the horn">
              HONK
            </button>
          </motion.div>
        </div>

        <canvas ref={canvasRef} className={styles.confetti} aria-hidden="true" />

        <div className={styles.intro} data-hide={started || undefined} aria-hidden="true">
          <p className={styles.introTitle}>PO&apos;S JOURNEY</p>
          <p className={styles.introHint}>SCROLL TO DRIVE ▼</p>
          <p className={styles.introKeys}>or press → · H to honk</p>
        </div>

        <div className={styles.end} data-show={done || undefined}>
          {/* Title only: Portfolio sits in the top bar and the last billboard has "Say hi". */}
          <p className={styles.endTitle}>THE END... FOR NOW</p>
        </div>

        <header className={styles.topbar}>
          <Link to="/" className={styles.pixelBtn}>
            <ArrowLeft size={14} aria-hidden="true" /> Portfolio
          </Link>
          <button type="button" className={styles.pixelBtn} onClick={toggleSound} aria-pressed={sound}>
            {sound ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}
            {sound ? 'Sound on' : 'Sound off'}
          </button>
        </header>

        <nav className={styles.dots} aria-label="Jump to a milestone">
          {journey.map((stop, i) => (
            <button
              key={stop.id}
              type="button"
              className={styles.dot}
              data-on={i <= active || undefined}
              aria-current={i === active ? 'step' : undefined}
              aria-label={`Drive to ${stop.title}${stop.year ? `, ${stop.year}` : ''}`}
              onClick={() => jumpTo(i)}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
