import React from 'react'
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap'
import './Experience.css'

function Experience() {
  const experiences = [
    {
      id: 1,
      role: 'Financial Solutions - SAP Development',
      company: 'Humanica Public Company Limited',
      duration: 'June - August 2024',
      description: 'Developed responsive web interfaces using React, HTML, CSS, and JavaScript. Enhanced platform features with improved accessibility and usability across multiple devices.',
      highlights: ['React', 'Frontend Development', 'UX/UI Enhancement', 'Git/GitHub', 'Team Collaboration']
    },
    {
      id: 2,
      role: 'IT Security Intern',
      company: 'Humanica Public Company Limited',
      duration: 'June - August 2025',
      description: 'Assisted in securing internal systems and cloud servers through risk assessments. Performed vulnerability scanning and collaborated on security implementations.',
      highlights: ['Cloud Security', 'Network Monitoring', 'Cybersecurity', 'Risk Assessment', 'Problem Solving']
    },
    {
      id: 3,
      role: 'Computer Engineering Student',
      company: 'SIIT - Sirindhorn International Institute of Technology',
      duration: '2023 - Current',
      description: 'Focused on full-stack development, AI, and system design. Actively building projects with modern technologies including React, Node.js, and machine learning.',
      highlights: ['Full-Stack Development', 'AI/ML', 'System Design', 'Database Design', 'Team Projects']
    }
  ]

  return (
    <section id="experience" className="experience">
      <Container className="experience-container">
        <div className="section-header">
          <h2>Professional Experience</h2>
          <p>My professional journey and accomplishments</p>
        </div>
        
        <Row className="position-relative">
          <div className="timeline-line"></div>
          {experiences.map((exp, index) => (
            <Col key={exp.id} md={12} className="mb-5">
              <Row className={`align-items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <Col md={6} className={`text-${index % 2 === 0 ? 'end' : 'start'} pe-md-4 ps-md-4`}>
                  <Card 
                    className="experience-card shadow-sm border-0 h-100"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)'
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="mb-2">
                        {exp.role}
                      </Card.Title>
                      <p className="company mb-2">
                        <strong>{exp.company}</strong>
                      </p>
                      <Badge bg="info" text="dark" className="mb-3">
                        📅 {exp.duration}
                      </Badge>
                      <Card.Text className="experience-description mb-3">
                        {exp.description}
                      </Card.Text>
                      <div className="highlights">
                        {exp.highlights.map((highlight, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="me-2 mb-2">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="text-center">
                  <div className="timeline-dot-large">
                    <div className="timeline-dot"></div>
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="timeline-connector"></div>
                  )}
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Experience
