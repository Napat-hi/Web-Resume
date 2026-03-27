import React from 'react'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'CSS/HTML', level: 90 },
        { name: 'Responsive Design', level: 88 }
      ]
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'Git', level: 80 },
        { name: 'Vite', level: 85 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 75 }
      ]
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Communication', level: 85 },
        { name: 'Teamwork', level: 88 },
        { name: 'Creativity', level: 90 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies and abilities I've developed</p>
        </div>
        
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
