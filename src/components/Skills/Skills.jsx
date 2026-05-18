import React from 'react'
import './Skills.css'

const skillGroups = [
  {
    title: 'AI / Machine Learning',
    icon: '🤖',
    accent: '#6366f1',
    skills: [
      'Python', 'PyTorch', 'TensorFlow', 'scikit-learn',
      'HuggingFace Transformers', 'LangChain', 'FAISS',
      'Pandas', 'NumPy', 'OpenAI API', 'NLP / NLTK', 'CNN',
    ],
  },
  {
    title: 'Backend & Infrastructure',
    icon: '⚙️',
    accent: '#0891b2',
    skills: [
      'Django', 'Node.js', 'MySQL', 'Docker',
      'Linux', 'Git / GitHub', 'REST APIs', 'SAP',
    ],
  },
  {
    title: 'Frontend & Design',
    icon: '🎨',
    accent: '#34c759',
    skills: [
      'React', 'JavaScript (ES6+)', 'HTML5 / CSS3',
      'Vite', 'Figma', 'Responsive Design', 'Bootstrap',
    ],
  },
  {
    title: 'Network Engineering',
    icon: '🌐',
    accent: '#ff9500',
    skills: [
      'LAN / WAN', 'Routing Tables', 'Hub & Switch',
      'Firewall Configuration', 'Subnetting / CIDR',
      'Network Topology', 'VPN', 'TCP/IP', 'OSI Model',
    ],
  },
  {
    title: 'Cybersecurity',
    icon: '🔐',
    accent: '#ef4444',
    skills: [
      'Vulnerability Scanning', 'Risk Assessment',
      'Cloud Security', 'Wazuh', 'Cloudflare',
      'Security Documentation', 'Incident Response',
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with</p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="skill-group"
              style={{ '--skill-accent': group.accent }}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon">{group.icon}</span>
                <h3 className="skill-group-title">{group.title}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
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
