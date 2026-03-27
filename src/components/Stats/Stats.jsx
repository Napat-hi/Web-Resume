import React, { useEffect, useState } from 'react'
import './Stats.css'

function Stats() {
  const [stats, setStats] = useState([
    { label: 'Projects Completed', value: 0, target: 15, icon: '🎯' },
    { label: 'Years of Experience', value: 0, target: 3, icon: '⭐' },
    { label: 'Happy Clients', value: 0, target: 25, icon: '😊' },
    { label: 'Code Commits', value: 0, target: 500, icon: '💻' }
  ])

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      let current = 0
      const interval = setInterval(() => {
        if (current < stat.target) {
          current += Math.ceil(stat.target / 50)
          setStats(prev => {
            const newStats = [...prev]
            newStats[index].value = Math.min(current, stat.target)
            return newStats
          })
        }
      }, 30)
      return interval
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2>By The Numbers</h2>
          <p>Professional achievements and milestones</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}+</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(stat.value / stat.target) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
