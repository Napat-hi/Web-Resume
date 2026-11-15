import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Resume/',
  server: {
    // Building while the dev server runs rewrites dist/ and crashed the watcher (EBUSY on Windows).
    watch: { ignored: ['**/dist/**'] },
  },
})
