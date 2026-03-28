import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know who I am</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="intro-text">
              I'm Napat Hirunsak, a passionate Full Stack Developer and Computer Engineering student at SIIT with strong interest in web development, cybersecurity, and AI/ML.
            </p>

            <p>
              Third-year Computer Engineering student with hands-on experience in React, Django, Node.js, Docker, Git, and Linux. 
              Passionate about building scalable applications and exploring network technologies with practical experience in real-world projects.
            </p>

            <p>
              Worked on SAP platform development and IT security operations. I understand backend systems, SQL/MySQL database design, microcontroller programming, and digital circuit analysis. 
              Actively seeking internship opportunities to contribute technical skills and grow with a dynamic team.
            </p>

            <p>
              Quick learner with strong problem-solving skills and the ability to adapt to new technologies. I enjoy collaborating in teams, writing clean code, and creating solutions that deliver real value.
              Currently exploring AI/Machine Learning and cybersecurity best practices.
            </p>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🎨</div>
                <div className="feature-content">
                  <h4>Design Focused</h4>
                  <p>Creating intuitive and beautiful interfaces</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h4>Performance Driven</h4>
                  <p>Building fast and scalable solutions</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🤝</div>
                <div className="feature-content">
                  <h4>Team Player</h4>
                  <p>Excellent communication and collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
