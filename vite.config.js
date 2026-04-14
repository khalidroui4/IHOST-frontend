import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['reshoot-dirtiness-limb.ngrok-free.dev'],
    proxy: {
      '/IHOST-backend': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
