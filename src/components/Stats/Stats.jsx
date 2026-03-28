import React, { useEffect, useState } from 'react'
import './Stats.css'

function Stats() {
  const [stats, setStats] = useState([
    { label: 'Technologies Mastered', value: 0, target: 20, icon: '⚙️' },
    { label: 'Years of Experience', value: 0, target: 3, icon: '📈' },
    { label: 'Projects Built', value: 0, target: 12, icon: '🚀' },
    { label: 'Client Satisfaction', value: 0, target: 99, icon: '⭐' }
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
          <h2>Key Metrics</h2>
          <p>Track record of excellence and innovation</p>
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
