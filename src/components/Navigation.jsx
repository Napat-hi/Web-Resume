import React, { useState } from 'react'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">Napat</span>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
