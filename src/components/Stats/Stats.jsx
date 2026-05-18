import React from 'react'
import './Stats.css'

const facts = [
  { icon: '🎓', value: '3.2', unit: '/ 4.0', label: 'GPA at SIIT' },
  { icon: '📜', value: '6.5', unit: 'Band', label: 'IELTS English' },
  { icon: '💼', value: '3', unit: 'Internships', label: 'Humanica × 2, CP ALL' },
  { icon: '🚀', value: '6', unit: 'Projects', label: 'Full-Stack, AI/ML, Security' },
]

function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2>Quick Facts</h2>
          <p>Real numbers, no guesses</p>
        </div>
        <div className="stats-grid">
          {facts.map((fact, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{fact.icon}</div>
              <div className="stat-value">
                {fact.value} <span className="stat-unit">{fact.unit}</span>
              </div>
              <div className="stat-label">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
