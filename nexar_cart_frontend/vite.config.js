import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NexAR Cart',
        short_name: 'NexAR',
        theme_color: '#1a1a2e',
        background_color: '#f8f9fa',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png', // డెమో యాప్ ఐకాన్
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})