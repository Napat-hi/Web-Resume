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
      items: ['Designed and Developed Full Stack Projects', 'Implemented Responsive UI/UX Designs', 'Applied Problem-Solving in Real-World Coding Tasks', 'Developed Baka UX/UI Design Project']
    },
    {
      icon: '💼',
      title: 'Soft Skills',
      items: ['Problem Solving', 'Analytical Thinking', 'Self-Learning', 'Adaptability', 'Communication', 'Critical Thinking']
    },
    {
      icon: '🌍',
      title: 'Languages',
      items: ['English (Fluent, IELTS 6.5, Tu-get 650)', 'Thai (Native)', 'Chinese (Beginner, HSK 3)']
    },
    {
      icon: '🚀',
      title: 'Current Projects',
      items: ['Leading AI Conference Planning and Coordination', 'Designing and Improving UX/UI for Baka Company Platform']
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
