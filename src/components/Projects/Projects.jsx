import React, { useState } from 'react'
import './Projects.css'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

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
      <div className="projects-container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Showcasing my recent work and accomplishments</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${selectedProject?.id === project.id ? 'active' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-header">
                <div className="project-image">{project.image}</div>
                <span className="project-status">{project.status}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <a href={project.link} className="project-link">
                View Project <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>✕</button>
              <div className="modal-image">{selectedProject.image}</div>
              <h2>{selectedProject.title}</h2>
              <p className="modal-status">Status: <strong>{selectedProject.status}</strong></p>
              <p className="modal-description">{selectedProject.fullDescription}</p>
              <div className="modal-tech">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={selectedProject.link} className="btn btn-primary">
                View Live Project
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
