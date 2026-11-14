import { Reveal } from '../components/ui/Reveal'

export default function SectionHead({ index, id, title, children }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">
        {String(index).padStart(2, '0')} · {title}
      </span>
      <h2 id={`${id}-title`}>{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}
