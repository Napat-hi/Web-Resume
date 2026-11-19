// Runs after `vite build`. GitHub Pages serves static files only, so every route gets its own
// dist/<route>/index.html with the right <title>, description, canonical URL and Open Graph
// tags. Link previews (LinkedIn, Slack) and search engines read those without running JS;
// the React app then boots on top as usual. Also writes 404.html (unknown paths still load the
// app, which shows NotFound) and sitemap.xml.
import { register } from 'node:module'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

register('./asset-hooks.mjs', import.meta.url)
const { projects } = await import('../src/data/projects.js')
const { journeySeo } = await import('../src/data/journey.js')

const SITE = 'https://napat-hi.github.io/Web-Resume/'
const NAME = 'Napat Hirunsak'
const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const shell = readFileSync(join(dist, 'index.html'), 'utf8')

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page({ path, title, description }) {
  const url = SITE + path
  const fullTitle = `${title} · ${NAME}`
  const t = escapeAttr(fullTitle)
  const d = escapeAttr(description)
  const html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
  if (!html.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`prerender: head tags not found for ${path}`)
  const file = join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  return url
}

const routes = [
  { path: 'journey/', ...journeySeo },
  ...projects.map((p) => ({ path: `projects/${p.slug}/`, title: p.title, description: p.tagline })),
]
const urls = [SITE, ...routes.map(page)]

writeFileSync(join(dist, '404.html'), shell)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log(`prerender: ${routes.length} pages, 404.html, sitemap.xml (${urls.length} URLs)`)
