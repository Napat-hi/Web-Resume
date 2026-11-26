// Node module hooks for the build scripts (prerender.mjs, check-site.mjs): image and style
// imports in src/data/*.js resolve to an empty string, and Vite's import.meta.env is stubbed,
// so the scripts can read the site data without Vite.
const ASSET = /\.(png|jpe?g|webp|avif|gif|svg|css)$/
const ENV = JSON.stringify({ BASE_URL: '/Web-Resume/', PROD: true, DEV: false, MODE: 'production' })

export async function load(url, context, nextLoad) {
  if (ASSET.test(url)) return { format: 'module', source: 'export default ""', shortCircuit: true }
  const result = await nextLoad(url, context)
  if (url.includes('/src/') && result.source) {
    const source = String(result.source)
    if (source.includes('import.meta.env')) {
      return { ...result, source: source.replaceAll('import.meta.env', `(${ENV})`), shortCircuit: true }
    }
  }
  return result
}
