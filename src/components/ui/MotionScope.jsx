import { MotionConfig } from 'framer-motion'
import { useMotionPref } from '../../context/MotionContext'

// framer-motion loads only with the lazy routes (case study, journey, command palette).
// Each wraps its tree in MotionScope so framer follows the site's motion setting.
export default function MotionScope({ children }) {
  const { reduce } = useMotionPref()
  return <MotionConfig reducedMotion={reduce ? 'always' : 'never'}>{children}</MotionConfig>
}
