import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),  VitePWA({
    registerType: 'autoUpdate', // Auto-updates the service worker
    devOptions: {
      enabled: false, // Enable PWA in development
    },
    selfDestroying: false,
    workbox: {
      
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          
          options: {
            
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'script',
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-cache',
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'style',
          handler: 'CacheFirst',
          options: {
            cacheName: 'css-cache',
            backgroundSync: {
              name: 'css-cacheRefresh',
              options: {
                maxRetentionTime: 24 * 60
              }
            }
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            backgroundSync: {
              name: 'image-cacheRefresh',
              options: {
                maxRetentionTime: 24 * 60
              }
            }
          },
        },
      ],
    },
    manifest: {
      name: 'Fire Note',
      short_name: 'Fire Note',
      description: 'Fire Note for Fire Fighters',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/fire_note_logo_192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/fire_note_logo_512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  })],
})
