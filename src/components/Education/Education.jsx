import React from 'react'
import './Education.css'

const degrees = [
  {
    degree: 'B.Eng. Computer Engineering',
    school: 'SIIT — Sirindhorn International Institute of Technology, Thammasat University',
    duration: '2023 – 2027',
    detail: 'GPA 3.2 / 4.0 · AI / Machine Learning Specialization',
    coursework: [
      'Machine Learning', 'Natural Language Processing', 'Computer Networks',
      'Cybersecurity & Information Security', 'Database Systems', 'Software Engineering',
      'Data Structures & Algorithms', 'Digital Circuits & Electronics',
      'Microcontroller Programming', 'Operating Systems', 'Linear Algebra',
    ],
  },
  {
    degree: 'High School — Business Track',
    school: 'Bangkok Christian College (BCC)',
    duration: '2011 – 2022',
    detail: 'GPA 3.79 / 4.0',
    coursework: [],
  },
]

function Education() {
  return (
    <section className="education-section">
      <div className="education-container">
        <div className="section-header">
          <h2>Education</h2>
          <p>Academic background and relevant coursework</p>
        </div>

        <div className="education-list">
          {degrees.map((edu, i) => (
            <div key={i} className="education-card">
              <div className="edu-meta">
                <span className="edu-duration">{edu.duration}</span>
              </div>
              <div className="edu-body">
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-school">{edu.school}</p>
                <p className="edu-detail">{edu.detail}</p>
                {edu.coursework.length > 0 && (
                  <div className="edu-coursework">
                    <p className="coursework-label">Relevant Coursework</p>
                    <div className="coursework-tags">
                      {edu.coursework.map((c) => (
                        <span key={c} className="coursework-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
