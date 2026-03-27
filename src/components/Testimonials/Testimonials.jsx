import React, { useState } from 'react'
import './Testimonials.css'

function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      image: '👩‍💼',
      text: 'Napat delivered exceptional work on our project. Their attention to detail and ability to solve complex problems made a real difference to our team.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO at StartupXYZ',
      image: '👨‍💻',
      text: 'Working with Napat was a pleasure. They brought innovative solutions and maintained excellent communication throughout the project.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'HR Manager at Global Solutions',
      image: '👩‍💼',
      text: 'Napat is a professional and dedicated developer. Great problem-solving skills and very easy to work with.',
      rating: 5
    }
  ]

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>What People Say</h2>
          <p>Feedback from colleagues and clients</p>
        </div>

        <div className="testimonials-carousel">
          <div className="testimonial-card active">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[activeTestimonial].image}</div>
                <div className="author-info">
                  <h4>{testimonials[activeTestimonial].name}</h4>
                  <p>{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
