import { useEffect } from 'react'

const DEFAULT_TITLE = 'Napat Hirunsak · AI & Systems Engineer'
const DEFAULT_DESCRIPTION =
  'Napat Hirunsak, Computer Engineering student at SIIT (AI specialization). LLM hallucination research, VLM pipelines, IT security and full-stack work.'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Sets per-route title, description and Open Graph text.
export function useSeo({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Napat Hirunsak` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)
  }, [title, description])
}
