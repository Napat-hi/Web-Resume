import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Let's create something amazing together</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Location</h3>
                <p>Your City, Country</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">💼</div>
              <div className="info-content">
                <h3>Availability</h3>
                <p>Available for freelance & full-time</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
            {submitted && <p className="success-message">✓ Message sent successfully!</p>}
          </form>
        </div>

        <div className="social-links">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>GitHub</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
