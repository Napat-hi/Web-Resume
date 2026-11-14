import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/scroll'
import styles from './DotGrid.module.css'

const GAP = 28
const RADIUS = 160 // cursor influence radius in px

function readColors() {
  const cs = getComputedStyle(document.documentElement)
  return {
    dot: cs.getPropertyValue('--border-strong').trim() || '#343c47',
    accent: cs.getPropertyValue('--accent').trim() || '#00c9b1',
  }
}

// Quiet dot grid that brightens and links dots near the cursor.
// Draws only while the pointer moves, pauses off-screen, and stays static under reduced motion.
export default function DotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()
    let colors = readColors()
    let w = 0
    let h = 0
    let dots = []
    let pointer = { x: -9999, y: -9999 }
    let target = { ...pointer }
    let frame = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const offX = (w % GAP) / 2
      const offY = (h % GAP) / 2
      for (let y = offY; y <= h; y += GAP) for (let x = offX; x <= w; x += GAP) dots.push(x, y)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const lit = []
      for (let i = 0; i < dots.length; i += 2) {
        const x = dots[i]
        const y = dots[i + 1]
        const d = Math.hypot(x - pointer.x, y - pointer.y)
        const t = d < RADIUS ? 1 - d / RADIUS : 0
        if (t > 0.35) lit.push(x, y, t)
        ctx.globalAlpha = 0.55 + t * 0.45
        ctx.fillStyle = t > 0.05 ? colors.accent : colors.dot
        ctx.beginPath()
        ctx.arc(x, y, 1 + t * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      // Thin links between neighbouring lit dots: a small graph around the cursor.
      ctx.strokeStyle = colors.accent
      ctx.lineWidth = 1
      for (let a = 0; a < lit.length; a += 3) {
        for (let b = a + 3; b < lit.length; b += 3) {
          const dx = lit[a] - lit[b]
          const dy = lit[a + 1] - lit[b + 1]
          if (dx * dx + dy * dy <= GAP * GAP * 2.1) {
            ctx.globalAlpha = Math.min(lit[a + 2], lit[b + 2]) * 0.35
            ctx.beginPath()
            ctx.moveTo(lit[a], lit[a + 1])
            ctx.lineTo(lit[b], lit[b + 1])
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      pointer.x += (target.x - pointer.x) * 0.18
      pointer.y += (target.y - pointer.y) * 0.18
      draw()
      if (Math.abs(target.x - pointer.x) > 0.5 || Math.abs(target.y - pointer.y) > 0.5) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onMove = (e) => {
      if (reduce || !visible) return
      const rect = canvas.getBoundingClientRect()
      target = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (pointer.x < -1000) pointer = { ...target }
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      target = { x: -9999, y: -9999 }
      pointer = { ...target }
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    io.observe(canvas)
    const mo = new MutationObserver(() => {
      colors = readColors()
      draw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const host = canvas.parentElement
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
