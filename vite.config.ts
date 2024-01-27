import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './dashboard-react/',
  build:{
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api2': {
        target: 'http://api.sl.se',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, '/api2')
      }
    }
  },
})
