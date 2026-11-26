// Runs after `vite build`. GitHub Pages serves static files only, so every route gets its own
// dist/<route>/index.html with the right <title>, description, canonical URL and Open Graph
// tags. Link previews (LinkedIn, Slack) and search engines read those without running JS;
// the React app then boots on top as usual. Also writes 404.html (unknown paths still load the
// app, which shows NotFound) and sitemap.xml.
import { register } from 'node:module'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderOg } from './og.mjs'
import { nowStatus } from './now-check.mjs'

register('./asset-hooks.mjs', import.meta.url)
const { projects, statusLabel } = await import('../src/data/projects.js')
const { journey, journeySeo } = await import('../src/data/journey.js')
const { profile } = await import('../src/data/profile.js')

const SITE = 'https://napat-hi.github.io/Web-Resume/'
const BASE = '/Web-Resume/'
const NAME = 'Napat Hirunsak'
const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const shell = readFileSync(join(dist, 'index.html'), 'utf8')

// Lazy routes load main -> route chunk -> shared chunks one after another. Listing the route's
// chunks in its own HTML lets the browser fetch them in parallel from the start.
const manifestDir = join(dist, '.vite')
const manifest = JSON.parse(readFileSync(join(manifestDir, 'manifest.json'), 'utf8'))
function preloadTags(src) {
  const seen = new Set()
  const js = []
  const css = []
  const walk = (key) => {
    const c = manifest[key]
    if (seen.has(key) || !c || c.isEntry) return
    seen.add(key)
    js.push(c.file)
    css.push(...(c.css || []))
    ;(c.imports || []).forEach(walk)
  }
  walk(src)
  if (!js.length) throw new Error(`prerender: ${src} not in the Vite manifest`)
  return [
    ...css.map((f) => `<link rel="stylesheet" crossorigin href="${BASE}${f}">`),
    ...js.map((f) => `<link rel="modulepreload" crossorigin href="${BASE}${f}">`),
  ].join('\n    ')
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

async function page({ path, title, description, og, chunk }) {
  const url = SITE + path
  const fullTitle = `${title} · ${NAME}`
  const t = escapeAttr(fullTitle)
  const d = escapeAttr(description)
  // Own preview image per page (dist/og/<name>.png).
  const bare = path.replace(/\/$/, '')
  const ogName = bare.replace(/\//g, '-')
  mkdirSync(join(dist, 'og'), { recursive: true })
  writeFileSync(join(dist, 'og', `${ogName}.png`), await renderOg({ title, description, path: bare, ...og }))
  const img = `${SITE}og/${ogName}.png`
  const html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${img}$2`)
    .replace('</head>', `    ${preloadTags(chunk)}\n  </head>`)
  if (!html.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`prerender: head tags not found for ${path}`)
  const file = join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  return url
}

const routes = [
  { path: 'journey/', ...journeySeo, chunk: 'src/pages/Journey/JourneyPage.jsx', og: { eyebrow: 'Pixel-art drive', chips: ['2011 – 2027', `${journey.length} stops`] } },
  ...projects.map((p) => ({
    path: `projects/${p.slug}/`,
    chunk: 'src/pages/ProjectCase.jsx',
    title: p.title,
    description: p.tagline,
    og: { eyebrow: [p.context, p.year].filter((x) => x && !String(x).startsWith('TODO')).join(' · '), chips: [statusLabel[p.status], ...p.stack.filter((t) => !t.startsWith('TODO'))] },
  })),
]
const urls = [SITE]
for (const r of routes) urls.push(await page(r))

writeFileSync(join(dist, '404.html'), shell)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
rmSync(manifestDir, { recursive: true, force: true }) // build-only; don't publish it
console.log(`prerender: ${routes.length} pages + preview images, 404.html, sitemap.xml (${urls.length} URLs)`)

// The About "Now" box shows a month. Flag it once it is more than two months old.
const now = nowStatus(profile.now?.updated)
if (now.stale) console.warn(`\n⚠  ${now.message}\n`)
