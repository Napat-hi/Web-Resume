import { Reveal } from '../components/ui/Reveal'
import { sections } from '../lib/sections'

// Mono index badge beside the h2. The number comes from the section order in lib/sections.js,
// so adding a section renumbers the rest automatically.
export default function SectionHead({ id, title, children }) {
  const index = sections.findIndex((s) => s.id === id) + 1
  return (
    <Reveal className="section-head">
      <h2 id={`${id}-title`}>
        {index > 0 && (
          <span className="section-index" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        )}
        {title}
      </h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}
