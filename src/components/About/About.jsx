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
              I'm Napat Hirunsak, a passionate Full Stack Developer and engineering-minded problem solver focused on building reliable and scalable digital systems.
            </p>

            <p>
              With over 3 years of experience in web development, I specialize in designing and developing user-centric applications across the full stack.
              Beyond application development, I have a strong foundation in computer engineering concepts, including networking, system design, and performance optimization.
            </p>

            <p>
              I understand how systems work end-to-end — from frontend interfaces to backend services and underlying network communication.
              I’m familiar with key networking concepts such as TCP/IP, HTTP/HTTPS, DNS, subnetting, and basic network troubleshooting, allowing me to build and debug applications more effectively.
            </p>

            <p>
              I’m committed to continuous learning and staying aligned with modern technologies and best practices.
              I enjoy collaborating with teams, writing clean and maintainable code, and delivering solutions that create real business impact.
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
