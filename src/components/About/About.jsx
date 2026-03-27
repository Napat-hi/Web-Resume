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
              I'm Napat Hirunsak, a passionate Full Stack Developer and digital innovator dedicated to creating exceptional digital experiences.
            </p>
            <p>
              With 3+ years of professional experience in web development, I specialize in building scalable, user-centric applications. 
              I combine technical expertise with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            <p>
              I'm committed to continuous learning, staying updated with industry trends, and collaborating effectively with teams. 
              My approach focuses on clean code, best practices, and delivering measurable business value through technology.
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
