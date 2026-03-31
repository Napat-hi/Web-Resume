import React from 'react'
import { Card, ProgressBar, Container, Row, Col, Badge } from 'react-bootstrap'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'CSS/HTML', level: 90 },
        { name: 'Responsive Design', level: 88 }
      ]
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'Git', level: 80 },
        { name: 'Vite', level: 85 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 75 }
      ]
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Communication', level: 85 },
        { name: 'Teamwork', level: 88 },
        { name: 'Creativity', level: 90 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills-section">
      <Container className="skills-container">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies and abilities I've developed</p>
        </div>
        
        <Row className="g-4">
          {skillCategories.map((category, idx) => (
            <Col key={idx} md={6} lg={4} className="mb-4">
              <Card 
                className="skill-category h-100 shadow-sm border-0"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-4 d-flex align-items-center">
                    <Badge bg="primary" className="me-2">{idx + 1}</Badge>
                    {category.category}
                  </Card.Title>
                  <div className="skills-list">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="skill-item mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="skill-name fw-500">{skill.name}</span>
                          <Badge bg="light" text="dark">{skill.level}%</Badge>
                        </div>
                        <ProgressBar 
                          now={skill.level} 
                          className="skill-progress-bar"
                          style={{ height: '8px' }}
                        />
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Skills
