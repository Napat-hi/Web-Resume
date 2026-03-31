import React, { useState } from 'react'
import { Card, Badge, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import './Projects.css'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  
  const handleShowModal = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }
  
  const handleCloseModal = () => setShowModal(false)

  const projects = [
    {
      id: 1,
      title: 'Database Academic Project',
      description: 'Developed a functional web application for a database laboratory course as part of a team project.',
      fullDescription: 'Built with Node.js, React, SQL, and API integration to manage patient records, appointments, and staff operations. Designed normalized MySQL database schema with CRUD functionalities, role-based access control, and full debugging support.',
      technologies: ['React', 'Node.js', 'SQL', 'MySQL', 'API Integration'],
      image: '🗄️',
      link: '#',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'SAP Frontend Development',
      description: 'Enhanced responsive web interfaces for a financial solutions platform at Humanica Public Company.',
      fullDescription: 'Built and improved frontend components using HTML, CSS, JavaScript, and React. Collaborated with UX designers and developers to implement new features and ensure smooth frontend-backend integration across multiple devices.',
      technologies: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Git/GitHub'],
      image: '💰',
      link: '#',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'This Portfolio Website',
      description: 'A modern, fully responsive portfolio website with Apple-inspired design and 3D animations.',
      fullDescription: 'Built with React and Vite featuring smooth animations, interactive components, organized component structure, and modern web best practices. Showcases projects, skills, and professional achievements.',
      technologies: ['React', 'Vite', 'CSS3', 'Canvas API', 'JavaScript'],
      image: '🎨',
      link: '#',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Security Analysis & Documentation',
      description: 'Contributed to IT security operations including vulnerability scanning and security incident response.',
      fullDescription: 'Assisted in securing internal systems through risk assessments, vulnerability scanning with tools like Wazuh and Cloudflare, and security incident documentation. Improved internal communication and security recommendations.',
      technologies: ['Cybersecurity', 'Wazuh', 'Cloudflare', 'Risk Assessment', 'Documentation'],
      image: '🔒',
      link: '#',
      status: 'Completed'
    }
  ]

  return (
    <section id="projects" className="projects">
      <Container className="projects-container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Showcasing my recent work and accomplishments</p>
        </div>
        
        <Row className="g-4">
          {projects.map((project) => (
            <Col key={project.id} md={6} lg={6} className="mb-4">
              <Card 
                className="project-card h-100 shadow-sm border-0 cursor-pointer"
                style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)'
                }}
                onClick={() => handleShowModal(project)}
              >
                <div className="project-header">
                  <div className="project-image">{project.image}</div>
                  <Badge bg="success" className="position-absolute top-0 end-0 m-3">{project.status}</Badge>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2">{project.title}</Card.Title>
                  <Card.Text className="project-description flex-grow-1">
                    {project.description}
                  </Card.Text>
                  <div className="tech-tags mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(project)}>
                    View Details →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered className="project-modal">
          <Modal.Header closeButton className="bg-light border-0">
            <Modal.Title>{selectedProject?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <div className="modal-image text-center mb-4" style={{ fontSize: '4rem' }}>
              {selectedProject?.image}
            </div>
            <p className="modal-description mb-4">{selectedProject?.fullDescription}</p>
            <div className="mb-3">
              <p className="text-muted mb-2">
                <strong>Status:</strong> <Badge bg="success">{selectedProject?.status}</Badge>
              </p>
            </div>
            <div className="modal-tech">
              {selectedProject?.technologies.map((tech, idx) => (
                <Badge key={idx} bg="primary" className="me-2 mb-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light border-0">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary">View Live Project</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  )
}

export default Projects
