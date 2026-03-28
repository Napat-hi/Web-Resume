import React from 'react'
import './Experience.css'

function Experience() {
  const experiences = [
    {
      id: 1,
      role: 'Financial Solutions - SAP Development',
      company: 'Humanica Public Company Limited',
      duration: 'June - August 2024',
      description: 'Developed responsive web interfaces using React, HTML, CSS, and JavaScript. Enhanced platform features with improved accessibility and usability across multiple devices.',
      highlights: ['React', 'Frontend Development', 'UX/UI Enhancement', 'Git/GitHub', 'Team Collaboration']
    },
    {
      id: 2,
      role: 'IT Security Intern',
      company: 'Humanica Public Company Limited',
      duration: 'June - August 2025',
      description: 'Assisted in securing internal systems and cloud servers through risk assessments. Performed vulnerability scanning and collaborated on security implementations.',
      highlights: ['Cloud Security', 'Network Monitoring', 'Cybersecurity', 'Risk Assessment', 'Problem Solving']
    },
    {
      id: 3,
      role: 'Computer Engineering Student',
      company: 'SIIT - Sirindhorn International Institute of Technology',
      duration: '2023 - Current',
      description: 'Focused on full-stack development, AI, and system design. Actively building projects with modern technologies including React, Node.js, and machine learning.',
      highlights: ['Full-Stack Development', 'AI/ML', 'System Design', 'Database Design', 'Team Projects']
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
