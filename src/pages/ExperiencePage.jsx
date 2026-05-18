import Experience from '../components/Experience'
import Education from '../components/Education/Education'
import PageTransition from '../components/PageTransition/PageTransition'

function ExperiencePage() {
  return (
    <PageTransition>
      <Experience />
      <Education />
    </PageTransition>
  )
}

export default ExperiencePage
