// Effects for the pixel drive. No assets: sound is synthesized, confetti is drawn on a canvas.

let audio
function ctx() {
  audio = audio || new (window.AudioContext || window.webkitAudioContext)()
  if (audio.state === 'suspended') audio.resume()
  return audio
}

// 8-bit car horn: two short square-wave beeps.
export function honk() {
  try {
    const a = ctx()
    const t = a.currentTime
    ;[0, 0.18].forEach((delay) => {
      ;[392, 494].forEach((freq) => {
        const osc = a.createOscillator()
        const gain = a.createGain()
        osc.type = 'square'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.0001, t + delay)
        gain.gain.exponentialRampToValueAtTime(0.06, t + delay + 0.01)
        gain.gain.setValueAtTime(0.06, t + delay + 0.12)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.15)
        osc.connect(gain).connect(a.destination)
        osc.start(t + delay)
        osc.stop(t + delay + 0.16)
      })
    })
  } catch {
    /* audio unavailable: the visual honk still plays */
  }
}

// Rising 8-bit arpeggio for the confetti moment.
export function fanfare() {
  try {
    const a = ctx()
    const t = a.currentTime
    ;[523, 659, 784, 1047].forEach((freq, i) => {
      const osc = a.createOscillator()
      const gain = a.createGain()
      osc.type = 'square'
      osc.frequency.value = freq
      const s = t + i * 0.1
      gain.gain.setValueAtTime(0.0001, s)
      gain.gain.exponentialRampToValueAtTime(0.05, s + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, s + (i === 3 ? 0.4 : 0.09))
      osc.connect(gain).connect(a.destination)
      osc.start(s)
      osc.stop(s + 0.45)
    })
  } catch {
    /* ignore */
  }
}

// Square pixel confetti, snapped to a `px` grid so it matches the art. Returns a cancel function.
export function pixelConfetti(canvas, originX, originY, px = 4) {
  const c = canvas.getContext('2d')
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width
  canvas.height = height
  c.imageSmoothingEnabled = false
  const colors = ['#38bdf8', '#fde047', '#f43f5e', '#22c55e', '#ffffff', '#a78bfa']
  const parts = Array.from({ length: 90 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.95
    const speed = 6 + Math.random() * 8
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: px * (Math.random() > 0.5 ? 2 : 1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  })
  let frame = 0
  let raf = 0
  const snap = (v) => Math.round(v / px) * px
  const tick = () => {
    frame++
    c.clearRect(0, 0, width, height)
    for (const p of parts) {
      p.vy += 0.3
      p.vx *= 0.985
      p.x += p.vx
      p.y += p.vy
      if (frame > 70 && frame % 6 < 3) continue // blink out like a sprite
      c.fillStyle = p.color
      c.fillRect(snap(p.x), snap(p.y), p.size, p.size)
    }
    if (frame < 100) raf = requestAnimationFrame(tick)
    else c.clearRect(0, 0, width, height)
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}
