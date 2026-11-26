// Weekly health check of the live site (.github/workflows/site-check.yml). Run locally with
//   node scripts/check-site.mjs [--lighthouse] [--base https://napat-hi.github.io/Web-Resume/]
// Fails (exit 1) when a page or preview image is down, an outside link is dead, the About
// "Now" box is stale, or (with --lighthouse) a score drops below its floor or the console logs
// errors. Writes a Markdown report to $GITHUB_STEP_SUMMARY when it runs in Actions.
import { register } from 'node:module'
import { appendFileSync, mkdtempSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { nowStatus } from './now-check.mjs'

register('./asset-hooks.mjs', import.meta.url)
const { projects } = await import('../src/data/projects.js')
const { profile } = await import('../src/data/profile.js')

const args = process.argv.slice(2)
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'https://napat-hi.github.io/Web-Resume/'
const LIGHTHOUSE = 'lighthouse@12.3.0'
// CI runners are noisy, so the performance floor sits below the ~90-95 the site scores.
const FLOORS = { performance: 80, accessibility: 95, 'best-practices': 95, seo: 95 }
const UA = 'Mozilla/5.0 (compatible; portfolio-site-check)'

const failures = []
const warnings = []
const lines = []
const log = (s) => {
  console.log(s)
  lines.push(s)
}

async function get(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) })
    return { status: res.status, type: res.headers.get('content-type') || '', text: () => res.text() }
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.message }
  }
}

// 1. Every page in the sitemap loads, and so does its link-preview image.
log('## Pages')
const sitemap = await get(new URL('sitemap.xml', base).href)
if (sitemap.status !== 200) {
  failures.push(`sitemap.xml returned ${sitemap.status || sitemap.error}`)
} else {
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  for (const url of urls) {
    const page = await get(url)
    const html = page.status === 200 ? await page.text() : ''
    const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
    const img = image ? await get(image) : { status: 0, error: 'no og:image tag' }
    const fine = page.status === 200 && html.includes('id="root"') && img.status === 200 && img.type.startsWith('image/')
    if (!fine) failures.push(`${url}: page ${page.status || page.error}, preview image ${img.status || img.error}`)
    log(`- ${fine ? '✅' : '❌'} ${url.replace(base, '/')}`)
  }
}

// 2. Outside links on the site still resolve. Sites that block bots (LinkedIn's 999, 403, 429)
// count as warnings: a person can still open them.
log('\n## Outside links')
const outside = new Set([
  ...profile.links.map((l) => l.url),
  ...projects.flatMap((p) => p.links.map((l) => l.url)),
  profile.formspreeEndpoint,
])
for (const url of outside) {
  if (!url.startsWith('http') || url.startsWith(base)) continue
  const res = await get(url)
  let mark = '✅'
  if (res.status === 999 || res.status === 403 || res.status === 429 || (url.includes('formspree') && res.status === 405)) {
    mark = '⚠️'
    if (!url.includes('formspree')) warnings.push(`${url} answered ${res.status} (bot blocking; open it by hand to be sure)`)
  } else if (res.status === 0 || res.status === 404 || res.status === 410 || res.status >= 500) {
    mark = '❌'
    failures.push(`${url}: ${res.status || res.error}`)
  }
  log(`- ${mark} ${res.status || res.error} ${url}`)
}

// 3. The About "Now" box is not stale.
log('\n## Now box')
const now = nowStatus(profile.now?.updated)
if (now.stale) failures.push(now.message)
log(`- ${now.stale ? '❌ ' + now.message : `✅ updated ${profile.now?.updated ?? '(no box)'}`}`)

// 4. Lighthouse (mobile) on three representative pages.
if (args.includes('--lighthouse')) {
  log('\n## Lighthouse (mobile)')
  const dir = mkdtempSync(join(tmpdir(), 'lh-'))
  const featured = projects.find((p) => p.featured === 1)?.slug ?? projects[0].slug
  for (const path of ['', `projects/${featured}/`, 'journey/']) {
    const url = new URL(path, base).href
    const out = join(dir, `${path.replace(/\W+/g, '-') || 'home'}.json`)
    try {
      execFileSync('npx', ['--yes', LIGHTHOUSE, url, '--quiet', '--output=json', `--output-path=${out}`, '--chrome-flags=--headless=new --no-sandbox'], { stdio: 'ignore', shell: process.platform === 'win32' })
    } catch {
      failures.push(`Lighthouse could not run on ${url}`)
      continue
    }
    const report = JSON.parse(readFileSync(out, 'utf8'))
    const scores = Object.fromEntries(Object.values(report.categories).map((c) => [c.id, Math.round(c.score * 100)]))
    const low = Object.entries(FLOORS).filter(([id, floor]) => scores[id] < floor)
    low.forEach(([id, floor]) => failures.push(`${url}: ${id} ${scores[id]} < ${floor}`))
    const consoleErrors = report.audits['errors-in-console']?.details?.items?.length ?? 0
    if (consoleErrors) failures.push(`${url}: ${consoleErrors} console error(s)`)
    log(`- ${low.length || consoleErrors ? '❌' : '✅'} ${url.replace(base, '/')}  perf ${scores.performance} · a11y ${scores.accessibility} · best practices ${scores['best-practices']} · SEO ${scores.seo}${consoleErrors ? ` · ${consoleErrors} console errors` : ''}`)
  }
}

log(`\n## Result\n${failures.length ? `❌ ${failures.length} problem(s)` : '✅ All good'}${warnings.length ? `, ${warnings.length} warning(s)` : ''}`)
failures.forEach((f) => log(`- ❌ ${f}`))
warnings.forEach((w) => log(`- ⚠️ ${w}`))
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `# Site check\n\n${lines.join('\n')}\n`)
process.exit(failures.length ? 1 : 0)
