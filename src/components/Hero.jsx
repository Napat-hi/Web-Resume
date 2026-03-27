import React, { useEffect, useRef } from 'react'
import './Hero.css'

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw 3D spheres
      const sphere1 = {
        x: canvas.width * 0.25,
        y: canvas.height * 0.4,
        radius: 100,
        color: '#0071e3'
      }

      const sphere2 = {
        x: canvas.width * 0.75,
        y: canvas.height * 0.5,
        radius: 80,
        color: '#a2845e'
      }

      const sphere3 = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.7,
        radius: 60,
        color: '#555b62'
      }

      // Animate spheres
      const offset = Math.sin(time * 0.0005) * 20

      drawSphere(ctx, sphere1.x + offset, sphere1.y + offset, sphere1.radius, sphere1.color)
      drawSphere(ctx, sphere2.x - offset, sphere2.y, sphere2.radius, sphere2.color)
      drawSphere(ctx, sphere3.x, sphere3.y - offset, sphere3.radius, sphere3.color)

      animationId = requestAnimationFrame(draw)
    }

    const drawSphere = (ctx, x, y, radius, color) => {
      // Create gradient for 3D effect
      const gradient = ctx.createRadialGradient(x - 20, y - 20, 0, x, y, radius)
      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(0.4, color)
      gradient.addColorStop(1, '#000000')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Add shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, Math.PI * 2)
      ctx.fill()
    }

    draw(0)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Napat Hirunsak</span>
          </h1>
          <p className="hero-subtitle">
            Creative Developer & Digital Creator
          </p>
          <p className="hero-description">
            Crafting beautiful, innovative digital experiences with cutting-edge technology
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToProjects}>
              Explore My Work
            </button>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
