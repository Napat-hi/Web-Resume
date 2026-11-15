import { skillGroups } from '../data/skills'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHead from './SectionHead'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead index={4} id="skills" title="Skills">
          Each skill here comes from a job, a project or a course listed on this page.
        </SectionHead>
        <RevealGroup className={styles.grid}>
          {skillGroups.map((g, i) => (
            <RevealItem key={g.id} className={`${styles.group} ${i === 0 ? styles.primary : ''}`}>
              <h3 className={styles.title}>
                {g.title}
                <span className={styles.count}>{g.skills.length}</span>
              </h3>
              <ul className="tag-list">
                {g.skills.map((s) => (
                  <li key={s.name} className="tag" title={s.from}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
