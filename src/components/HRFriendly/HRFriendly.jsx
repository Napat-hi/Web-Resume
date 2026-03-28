import React from 'react'
import './HRFriendly.css'

function HRFriendly() {
  const highlights = [
    {
      icon: '🎓',
      title: 'Education',
      items: [
        'Grade 1-12 at Bangkok Christian College (BCC) - Business Track, GPA 3.79',
        'Bachelor of Computer Engineering at SIIT - GPA 3.2, AI Major',
        'Core Knowledge: SQL, Microcontroller, Digital & Circuit Analysis, Network Engineering',
        'Software Engineering, AI, NLP, and Machine Learning specialization'
      ]
    },
    {
      icon: '🏆',
      title: 'Achievements',
      items: ['Employee of the Month', 'Best Project Award 2024', 'Team Leadership Recognition']
    },
    {
      icon: '💼',
      title: 'Soft Skills',
      items: ['Team Leadership', 'Communication', 'Project Management', 'Problem Solving']
    },
    {
      icon: '🌍',
      title: 'Languages',
      items: ['English (Fluent)', 'Thai (Native)', 'Japanese (Intermediate)']
    }
  ]

  return (
    <section className="hr-friendly-section">
      <div className="hr-container">
        <div className="section-header">
          <h2>Professional Profile</h2>
          <p>Comprehensive overview of qualifications and achievements</p>
        </div>

        <div className="hr-grid">
          {highlights.map((highlight, index) => (
            <div key={index} className="hr-card">
              <div className="hr-icon">{highlight.icon}</div>
              <h3>{highlight.title}</h3>
              <ul className="hr-items">
                {highlight.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="checkmark">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3>Ready to Connect?</h3>
          <p>I'm looking for exciting opportunities to contribute my skills and grow with a dynamic team.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">Download Resume</a>
            <a href="#contact" className="btn btn-secondary">Schedule a Call</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HRFriendly
