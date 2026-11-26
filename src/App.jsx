import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { MotionPrefProvider } from './context/MotionContext'
import { ToastProvider } from './context/ToastContext'
import { PaletteProvider, usePalette } from './context/PaletteContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import { useEasterEgg } from './hooks/useEasterEgg'

const ProjectCase = lazy(() => import('./pages/ProjectCase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const JourneyPage = lazy(() => import('./pages/Journey/JourneyPage'))
const CommandPalette = lazy(() => import('./components/CommandPalette/CommandPalette'))
const EasterCar = lazy(() => import('./components/EasterCar/EasterCar'))

// The journey is a full-screen story: no site nav or footer around it.
function Shell() {
  const { pathname } = useLocation()
  // GitHub Pages serves /journey/ (trailing slash), so compare without it.
  const immersive = pathname.replace(/\/$/, '') === '/journey'
  // The palette (and framer-motion with it) loads the first time someone opens it.
  const { open: paletteOpen } = usePalette()
  const [paletteUsed, setPaletteUsed] = useState(false)
  useEffect(() => {
    if (paletteOpen) setPaletteUsed(true)
  }, [paletteOpen])
  // Easter egg: type "beep" or tap the footer name five times (not on the journey itself).
  const egg = useEasterEgg(!immersive)
  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Skip to content
      </a>
      {!immersive && <Nav />}
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/projects/:slug" element={<ProjectCase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!immersive && <Footer />}
      {egg.run > 0 && (
        <Suspense fallback={null}>
          <EasterCar key={egg.run} onDone={egg.done} />
        </Suspense>
      )}
      {paletteUsed && (
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
      )}
    </>
  )
}

export default function App() {
  return (
    <MotionPrefProvider>
      <ThemeProvider>
        <ToastProvider>
          {/* Real paths (/projects/<slug>) so each page has its own URL and preview.
              scripts/prerender.mjs writes an HTML file per route; index.html redirects old #/ links. */}
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <PaletteProvider>
              <Shell />
            </PaletteProvider>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </MotionPrefProvider>
  )
}
