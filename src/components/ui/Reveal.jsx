import { useRef } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'

// Fades and lifts content into view once. Plain CSS (global.css, [data-reveal]) driven by an
// IntersectionObserver, so the home page needs no animation library. Reduced motion and print
// show everything at once.
export function Reveal({ children, delay = 0, as: Tag = 'div', className, style, ...rest }) {
  const ref = useRef(null)
  const shown = useInViewOnce(ref)
  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-shown={shown || undefined}
      style={delay ? { ...style, '--reveal-delay': `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Children marked with RevealItem fade in one after another (stagger set in CSS).
export function RevealGroup({ children, as: Tag = 'div', className, ...rest }) {
  const ref = useRef(null)
  const shown = useInViewOnce(ref)
  return (
    <Tag ref={ref} className={className} data-reveal-group="" data-shown={shown || undefined} {...rest}>
      {children}
    </Tag>
  )
}

export function RevealItem({ children, as: Tag = 'div', className, ...rest }) {
  return (
    <Tag className={className} data-reveal-item="" {...rest}>
      {children}
    </Tag>
  )
}
