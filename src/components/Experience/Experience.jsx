import React from 'react'
import './Experience.css'

function Experience() {
  const experiences = [
    {
      id: 1,
      role: 'Junior Developer',
      company: 'Tech Company',
      duration: '2023 - Present',
      description: 'Building responsive web applications with React and modern JavaScript.',
      highlights: ['React', 'JavaScript', 'CSS', 'Team Collaboration']
    },
    {
      id: 2,
      role: 'Freelance Developer',
      company: 'Self-employed',
      duration: '2022 - 2023',
      description: 'Developed custom websites for clients, focusing on design and functionality.',
      highlights: ['Web Design', 'Client Communication', 'Problem Solving']
    },
    {
      id: 3,
      role: 'Student Developer',
      company: 'University',
      duration: '2021 - Present',
      description: 'Learning and practicing full-stack development while studying.',
      highlights: ['Learning', 'Projects', 'Growth']
    }
  ]

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2>Experience</h2>
          <p>My professional journey and accomplishments</p>
        </div>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{exp.role}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">{exp.duration}</p>
                <p className="description">{exp.description}</p>
                <div className="highlights">
                  {exp.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
