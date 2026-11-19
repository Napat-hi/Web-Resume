import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { homeScroll, scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'
import Hero from '../sections/Hero'
import About from '../sections/About'
import JourneyTeaser from '../sections/JourneyTeaser'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Education from '../sections/Education'
import Contact from '../sections/Contact'

// Shown only when printing: a compact resume header with plain-text contact details.
function PrintHeader() {
  return (
    <header className="print-only print-header">
      <h1>{profile.name}</h1>
      <p>{profile.headline}</p>
      <p>
        {profile.email} · {profile.location} · {profile.siteUrl.replace('https://', '')}
      </p>
      <p>{profile.links.filter((l) => l.id !== 'instagram').map((l) => l.url.replace('https://', '')).join(' · ')}</p>
    </header>
  )
}

export default function Home() {
  useSeo()
  const location = useLocation()
  const navigate = useNavigate()
  const navType = useNavigationType()

  // Back from a case study: restore the previous scroll position.
  useLayoutEffect(() => {
    if (navType === 'POP' && homeScroll.y > 0 && !location.state?.section) {
      window.scrollTo(0, homeScroll.y)
    } else if (navType === 'PUSH' && !location.state?.section) {
      window.scrollTo(0, 0) // e.g. coming back from the journey page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Arriving from another route with a target section (nav link or palette).
  useEffect(() => {
    const id = location.state?.section
    if (!id) return
    requestAnimationFrame(() => scrollToId(id))
    navigate('.', { replace: true, state: null })
  }, [location.state, navigate])

  return (
    <>
      <PrintHeader />
      <Hero />
      <About />
      <JourneyTeaser />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  )
}
