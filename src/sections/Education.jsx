import { certifications, education } from '../data/education'
import { Reveal } from '../components/ui/Reveal'
import SectionHead from './SectionHead'
import styles from './Education.module.css'

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHead index={5} id="education" title="Education" />
        <ol className={styles.list}>
          {education.map((e) => (
            <Reveal as="li" key={e.id} className={styles.item}>
              <div className={styles.head}>
                <div>
                  <h3 className={styles.degree}>{e.degree}</h3>
                  <p className={styles.school}>{e.school}</p>
                </div>
                <dl className={styles.facts}>
                  <div>
                    <dt>Years</dt>
                    <dd>{e.period}</dd>
                  </div>
                  {e.gpa && (
                    <div>
                      <dt>GPA</dt>
                      <dd>{e.gpa}</dd>
                    </div>
                  )}
                  {e.status && (
                    <div>
                      <dt>Status</dt>
                      <dd>{e.status}</dd>
                    </div>
                  )}
                </dl>
              </div>
              {e.currentCourses.length > 0 && (
                <div className={styles.block}>
                  <h4 className="eyebrow">This semester</h4>
                  <ul className="tag-list">
                    {e.currentCourses.map((c) => (
                      <li key={c} className={`tag ${styles.current}`}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {e.coursework.length > 0 && (
                <div className={styles.block}>
                  <h4 className="eyebrow">Relevant coursework</h4>
                  <ul className="tag-list">
                    {e.coursework.map((c) => (
                      <li key={c} className="tag">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          ))}
        </ol>

        {certifications.length > 0 && (
          <Reveal className={styles.certs}>
            <h3 className="eyebrow">Certifications</h3>
            <ul className={styles.certList}>
              {certifications.map((c) => (
                <li key={c.id} className={styles.cert}>
                  <span className={styles.certName}>{c.name}</span>
                  <span className={styles.certMeta}>
                    {c.issuer} · {c.status}
                    {c.date && ` · ${c.date}`}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}
