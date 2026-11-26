import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource/pixelify-sans/600.css'
import { CAR_H, CAR_W, CarBody, PixelSvg, Wheel } from '../../pages/Journey/pixel'
import { prefersReducedMotion } from '../../lib/scroll'
import styles from './EasterCar.module.css'

// Easter egg (see hooks/useEasterEgg.js): the journey car drives across the bottom of the
// screen and links to /journey. Loaded only when triggered. With reduced motion it parks
// in the corner for a few seconds instead. It honks only if the reader turned journey sound on.
export default function EasterCar({ onDone }) {
  const still = prefersReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (still) {
      const t = setTimeout(onDone, 3500)
      return () => {
        clearTimeout(t)
      }
    }
    const id = setInterval(() => setFrame((f) => (f + 1) % 4), 90)
    return () => {
      clearInterval(id)
    }
  }, [still, onDone])

  useEffect(() => {
    let soundOn = false
    try {
      soundOn = localStorage.getItem('journey-sound') === 'on'
    } catch {
      /* storage blocked */
    }
    if (soundOn) {
      import('../../pages/Journey/effects').then((m) => {
        m.honk()
      })
    }
  }, [])

  return (
    <div className={styles.lane} data-still={still || undefined} aria-hidden="true">
      <Link to="/journey" tabIndex={-1} className={styles.car} onAnimationEnd={onDone}>
        <span className={styles.bubble}>BEEP BEEP! Take the full drive →</span>
        <PixelSvg w={CAR_W} h={CAR_H} px={3}>
          <CarBody />
          <Wheel x={7} y={12} frame={frame} />
          <Wheel x={31} y={12} frame={frame} />
        </PixelSvg>
      </Link>
    </div>
  )
}
