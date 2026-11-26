import '@fontsource/pixelify-sans/600.css'
import { CAR_H, CAR_W, CarBody, Cloud, PixelSvg, Tree, Building, Wheel } from '../pages/Journey/pixel'
import styles from './JourneyTeaser.module.css'

// The pixel picture inside the home-page Journey banner. Loaded lazily (with the pixel font)
// so the home page's first paint does not wait for it. Its box has a fixed height.
export default function JourneyTeaserScene() {
  return (
    <>
      <PixelSvg w={140} h={40} px={4} className={styles.backdrop}>
        <Cloud x={8} y={4} />
        <Cloud x={92} y={9} />
        <g transform="translate(0 40)">
          <Building x={44} w={12} h={22} tone="#bacbe0" />
          <Building x={57} w={10} h={30} tone="#aabdd5" />
          <Building x={68} w={14} h={18} tone="#bacbe0" />
          <Tree x={100} />
          <Tree x={114} blossom />
          <Tree x={6} />
          <Tree x={20} />
        </g>
      </PixelSvg>
      <span className={styles.road} />
      <span className={styles.car}>
        <PixelSvg w={CAR_W} h={CAR_H} px={4}>
          <CarBody />
          <Wheel x={7} y={12} frame={0} />
          <Wheel x={31} y={12} frame={0} />
        </PixelSvg>
      </span>
    </>
  )
}
