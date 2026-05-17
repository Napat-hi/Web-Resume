import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Contact.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykvgbdd'

const socialLinks = [
  { label: 'LinkedIn',  Icon: FaLinkedin,  url: 'https://www.linkedin.com/in/napat-hirunsak-340b9838a/', color: '#0077B5' },
  { label: 'GitHub',    Icon: FaGithub,    url: 'https://github.com/Napat-hi',                            color: '#181717' },
  { label: 'X',         Icon: FaXTwitter,  url: 'https://x.com/kimjisno1',                                color: '#000000' },
  { label: 'Instagram', Icon: FaInstagram, url: 'https://www.instagram.com/po_napat/',                    color: '#E4405F' },
]

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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
            <Card className="contact-info-card shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
                <Card.Title>Email</Card.Title>
                <a href="mailto:napat6603@gmail.com">napat6603@gmail.com</a>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="contact-info-card shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                <Card.Title>Location</Card.Title>
                <p>Bangkok, Thailand</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="contact-info-card shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
                <Card.Title>Phone</Card.Title>
                <a href="tel:+66909957854">+66 90-995-7854</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <Card.Title className="mb-4 fs-4">Send Me a Message</Card.Title>

                {status === 'success' && (
                  <Alert variant="success" className="mb-4" onClose={() => setStatus('idle')} dismissible>
                    ✓ Message sent! I'll get back to you soon.
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert variant="danger" className="mb-4" onClose={() => setStatus('idle')} dismissible>
                    Something went wrong. Please try again or email me directly.
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
                      disabled={status === 'loading'}
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
                      disabled={status === 'loading'}
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
                      disabled={status === 'loading'}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="fw-bold"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Send Message'}
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
              {socialLinks.map(({ label, Icon, url, color }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  style={{ '--brand-color': color }}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
