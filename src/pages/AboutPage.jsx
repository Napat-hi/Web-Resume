import About from '../components/About'
import Skills from '../components/Skills'
import Testimonials from '../components/Testimonials'
import PageTransition from '../components/PageTransition/PageTransition'

function AboutPage() {
  return (
    <PageTransition>
      <About />
      <Skills />
      <Testimonials />
    </PageTransition>
  )
}

export default AboutPage
