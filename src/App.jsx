import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { PaletteProvider } from './context/PaletteContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

const ProjectCase = lazy(() => import('./pages/ProjectCase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const CommandPalette = lazy(() => import('./components/CommandPalette/CommandPalette'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <HashRouter>
            <PaletteProvider>
              <a className="skip-link" href="#main" onClick={(e) => {
                e.preventDefault()
                document.getElementById('main')?.focus()
              }}>
                Skip to content
              </a>
              <Nav />
              <main id="main" tabIndex={-1}>
                <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/:slug" element={<ProjectCase />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <Suspense fallback={null}>
                <CommandPalette />
              </Suspense>
            </PaletteProvider>
          </HashRouter>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
