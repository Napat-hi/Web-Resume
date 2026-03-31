import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import './Navigation.css'
import profilePhoto from '../Photo/D0A5CF0D-F912-4CDB-B596-13ECF679D2F6_1_105_c.jpeg'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={profilePhoto} alt="Napat" className="navbar-profile-photo" />
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
          <li className="nav-item theme-item">
            <div className="theme-switch-container">
              <label className="theme-switch" htmlFor="theme-checkbox">
                <input
                  type="checkbox"
                  id="theme-checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
                <div className="slider">
                  <span className="icon light-icon">☀️</span>
                  <span className="icon dark-icon">🌙</span>
                </div>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
