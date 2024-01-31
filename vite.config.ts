import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    target: 'esnext', // Ensure that Vite is configured to output ES modules
    outDir: './dist',
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, 
})
