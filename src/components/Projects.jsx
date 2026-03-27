import React, { useState } from 'react'
import './Projects.css'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern, fully responsive portfolio website built with React, showcasing projects and skills with smooth animations and interactive UI.',
      fullDescription: 'This portfolio website features a clean design, smooth scrolling navigation, animated components, and responsive layout that works perfectly on all devices.',
      technologies: ['React', 'CSS3', 'JavaScript', 'Vite'],
      image: '🎨',
      link: '#',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce application with product listing, shopping cart, and checkout functionality.',
      fullDescription: 'Built with React and modern state management, featuring product filters, cart persistence, and a smooth checkout experience.',
      technologies: ['React', 'Redux', 'CSS', 'JavaScript'],
      image: '🛍️',
      link: '#',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      fullDescription: 'A powerful task manager with drag-and-drop functionality, team collaboration, notifications, and cloud synchronization.',
      technologies: ['React', 'Firebase', 'Tailwind', 'JavaScript'],
      image: '✅',
      link: '#',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A beautiful weather application displaying real-time weather data with interactive maps.',
      fullDescription: 'Features real-time weather data, interactive maps, forecasts, and a sleek user interface built with React.',
      technologies: ['React', 'API Integration', 'CSS', 'JavaScript'],
      image: '🌤️',
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
