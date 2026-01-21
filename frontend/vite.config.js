import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures assets are loaded relative to the root domain
  base: '/', 
  build: {
    // Explicitly tell Vite where to put the build
    outDir: 'dist',
    // Ensures the folder is cleaned before every build
    emptyOutDir: true,
    // Optional: ensures assets are easy to find
    assetsDir: 'assets',
  },
  server: {
    historyApiFallback: true,
  }
})
