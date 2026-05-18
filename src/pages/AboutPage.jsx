import About from '../components/About'
import Skills from '../components/Skills'
import PageTransition from '../components/PageTransition/PageTransition'

function AboutPage() {
  return (
    <PageTransition>
      <About />
      <Skills />
    </PageTransition>
  )
}

export default AboutPage
