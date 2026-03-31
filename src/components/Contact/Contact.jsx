import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
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
      <Container className="contact-container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Let's create something amazing together</p>
        </div>

        <Row className="g-4 mb-5">
          <Col md={4} className="mb-4">
            <Card className="contact-info-card shadow-sm border-0 h-100" style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
              }}
            >
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
                <Card.Title>Email</Card.Title>
                <a href="mailto:napat6603@gmail.com" className="text-decoration-none">
                  napat6603@gmail.com
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="contact-info-card shadow-sm border-0 h-100" style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
              }}
            >
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                <Card.Title>Location</Card.Title>
                <p>Bangkok, Thailand</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="contact-info-card shadow-sm border-0 h-100" style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
              }}
            >
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💼</div>
                <Card.Title>Phone</Card.Title>
                <a href="tel:+66909957854" className="text-decoration-none">
                  +66 90-995-7854
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <Card.Title className="mb-4 fs-4">Send Me a Message</Card.Title>
                {submitted && (
                  <Alert variant="success" className="mb-4" dismissible>
                    ✓ Message sent successfully! I'll get back to you soon.
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      placeholder="Tell me about your project or opportunity"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      type="submit"
                      className="fw-bold"
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <h3 className="mb-4">Connect With Me</h3>
            <div className="social-icons-container">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <span>💼 LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <span>🐙 GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <span>𝕏 Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <span>📸 Instagram</span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
