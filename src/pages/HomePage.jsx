import Hero from '../components/Hero'
import Stats from '../components/Stats'
import PageTransition from '../components/PageTransition/PageTransition'

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
    </PageTransition>
  )
}

export default HomePage
