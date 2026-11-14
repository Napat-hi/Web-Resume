import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { isMac } from '../lib/scroll'

export default function NotFound() {
  useSeo({ title: 'Page not found' })
  return (
    <section className="container" style={{ minHeight: '70vh', display: 'grid', alignContent: 'center', gap: 16, paddingBlock: 96 }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 'var(--fs-3xl)' }}>Page not found</h1>
      <p style={{ maxWidth: '52ch' }}>
        This link points to a page that doesn&apos;t exist. Go back home, or press{' '}
        <kbd>{isMac() ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to search projects and sections.
      </p>
      <div>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} aria-hidden="true" /> Back home
        </Link>
      </div>
    </section>
  )
}
