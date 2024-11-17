import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify(),
  ],
  optimizeDeps: {
    include: ['@mdi/font'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@mdi/font': fileURLToPath(new URL('node_modules/@mdi/font/css', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // Ensure Vite listens on all interfaces
    port: 5173,       // Ensure Vite is running on port 5173
    strictPort: true, // Fail if the port is already in use
    watch: {
      usePolling: true, // Necessary for Docker on some systems
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
