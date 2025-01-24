import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    origin: 'http://localhost:5174',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
