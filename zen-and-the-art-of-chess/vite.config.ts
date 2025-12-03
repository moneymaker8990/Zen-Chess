import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Prompt user to refresh instead of auto-updating
      includeAssets: [
        'favicon.svg', 
        'favicon-32x32.png',
        'favicon-16x16.png',
        'apple-touch-icon.png',
        'stockfish.js', 
        'stockfish.wasm'
      ],
      manifest: {
        name: 'Zen Chess',
        short_name: 'Zen Chess',
        description: 'Master chess through mindfulness. A 365-day journey combining spiritual training, chess mastery, and psychological insight.',
        theme_color: '#161512',
        background_color: '#161512',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: 'zen-chess-app',
        categories: ['games', 'education', 'lifestyle'],
        lang: 'en',
        dir: 'ltr',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-wide.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Zen Chess Dashboard'
          },
          {
            src: 'screenshot-narrow.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Zen Chess Mobile'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,html,ico,png,svg,wasm}'],
        globIgnores: ['**/data/**', '**/assets/index-*.js'],
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100 MB
        // Clean up old caches on activation
        cleanupOutdatedCaches: true,
        // Skip waiting for old service worker to finish
        skipWaiting: true,
        // Take control of all clients immediately
        clientsClaim: true,
        runtimeCaching: [
          // Network-first for navigation requests (HTML)
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              networkTimeoutSeconds: 3
            }
          },
          // Network-first for JS bundles to always get fresh code
          {
            urlPattern: /\/assets\/.*\.js$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              networkTimeoutSeconds: 3
            }
          },
          // Cache-first for fonts (they rarely change)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Stale-while-revalidate for images and other assets
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['stockfish.wasm']
  },
  assetsInclude: ['**/*.wasm'],
})
