import { Reveal } from '../components/ui/Reveal'

// Mono index sits beside the h2 ("01 About") instead of repeating the title in an eyebrow.
export default function SectionHead({ index, id, title, children }) {
  return (
    <Reveal className="section-head">
      <h2 id={`${id}-title`}>
        <span className="section-index" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        {title}
      </h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}
