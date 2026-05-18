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
              I'm Napat Hirunsak — a Computer Engineering student at SIIT finishing Year 3, with hands-on internship experience in frontend development, IT security, and enterprise digital systems.
            </p>

            <p>
              My core focus sits at the intersection of AI/ML and systems engineering: building intelligent applications with PyTorch, HuggingFace, and LangChain, while maintaining strong fundamentals in backend infrastructure (Django, Node.js, Docker, Linux) and network security.
            </p>

            <p>
              I've completed two internships at Humanica — contributing to SAP frontend development and IT security operations — and will be joining CP ALL's Digital Solution department in June 2026. Each role has sharpened my ability to work across the full stack in real production environments.
            </p>

            <p>
              I write clean, maintainable code and take ownership from design to deployment. Whether I'm building an AI hallucination detection pipeline or configuring a secure network topology, I approach problems the same way: understand the system, then solve it properly.
            </p>

            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h4>AI / ML Engineering</h4>
                  <p>PyTorch, HuggingFace, LangChain, FAISS, NLP pipelines</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🌐</div>
                <div className="feature-content">
                  <h4>Network & Security</h4>
                  <p>LAN/WAN, firewall config, vulnerability scanning, Wazuh</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">⚙️</div>
                <div className="feature-content">
                  <h4>Full-Stack Systems</h4>
                  <p>React, Django, Node.js, MySQL, Docker, Linux</p>
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
