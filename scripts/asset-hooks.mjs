// Node module hooks for scripts/prerender.mjs: image and style imports in src/data/*.js
// resolve to an empty string, so the script can read titles and slugs without Vite.
const ASSET = /\.(png|jpe?g|webp|avif|gif|svg|css)$/

export async function load(url, context, nextLoad) {
  if (ASSET.test(url)) return { format: 'module', source: 'export default ""', shortCircuit: true }
  return nextLoad(url, context)
}
