import { motion } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1]

// Fades and lifts content into view once. MotionPrefProvider disables the movement when motion is reduced.
export function Reveal({ children, delay = 0, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.32, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const group = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
}

export function RevealGroup({ children, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({ children, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={item} {...rest}>
      {children}
    </Tag>
  )
}
