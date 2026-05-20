import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Closet',
        short_name: 'Closet',
        start_url: '/',
        display: 'standalone',
        background_color: '#f0ebe1',
        theme_color: '#1e3a2f',
        icons: [
          {src: '/icon-192.png', sizes: '192x192', type: 'image/png'},
          {src: '/icon-512.png', sizes: '512x512', type: 'image/png'}
        ]
      }
    })
  ]
})