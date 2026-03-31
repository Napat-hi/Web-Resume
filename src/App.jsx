import React from 'react'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import HRFriendly from './components/HRFriendly'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navigation />
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <HRFriendly />
        <Testimonials />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
