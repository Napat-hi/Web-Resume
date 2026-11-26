import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Resume/',
  // scripts/prerender.mjs reads the manifest to preload each route's lazy chunks, then deletes it.
  build: { manifest: true },
  server: {
    // Building while the dev server runs rewrites dist/ and crashed the watcher (EBUSY on Windows).
    watch: { ignored: ['**/dist/**'] },
  },
})
