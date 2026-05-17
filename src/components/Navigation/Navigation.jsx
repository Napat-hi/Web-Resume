import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import './Navigation.css'
import profilePhoto from '../Photo/D0A5CF0D-F912-4CDB-B596-13ECF679D2F6_1_105_c.jpeg'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={profilePhoto} alt="Napat" className="navbar-profile-photo" />
        </Link>
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path} className="nav-item">
              <Link
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
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
        {isOpen && <div className="nav-overlay" onClick={closeMenu} />}
      </div>
    </nav>
  )
}

export default Navigation
