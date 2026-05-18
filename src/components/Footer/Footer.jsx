import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import './Footer.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">Napat Hirunsak</p>
            <p className="footer-tagline">AI Engineer & Systems Developer</p>
          </div>

          <nav className="footer-nav">
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} className="footer-link">{label}</Link>
            ))}
          </nav>

          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/napat-hirunsak-340b9838a/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/Napat-hi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="mailto:napat6603@gmail.com"
              className="footer-social-icon"
              aria-label="Email"
            >
              ✉️
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Napat Hirunsak · Built with React & Vite</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
